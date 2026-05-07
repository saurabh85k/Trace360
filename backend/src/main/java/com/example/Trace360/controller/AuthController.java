package com.example.Trace360.controller;

import com.example.Trace360.entity.User;
import com.example.Trace360.entity.Role;
import com.example.Trace360.repository.UserRepository;
import com.example.Trace360.security.JwtUtil;
import com.example.Trace360.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Temporary storage for registration data before OTP verification
    private final Map<String, Map<String, String>> tempRegistrationStore = new ConcurrentHashMap<>();

    // ==================== ORIGINAL ENDPOINTS (no OTP) ====================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        String email = request.get("email");
        String roleStr = request.getOrDefault("role", "USER");

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already taken"));
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setRole(Role.valueOf(roleStr));

        userRepository.save(user);

        String token = jwtUtil.generateToken(username, user.getRole().name());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", username);
        response.put("role", user.getRole().name());
        response.put("message", "Registration successful");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(username, user.getRole().name());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", username);
        response.put("role", user.getRole().name());
        response.put("message", "Login successful");

        return ResponseEntity.ok(response);
    }

    // ==================== OTP BASED REGISTRATION ENDPOINTS ====================
    @PostMapping("/register/request-otp")
    public ResponseEntity<?> requestRegistrationOtp(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");
        String role = request.getOrDefault("role", "USER");

        if (username == null || email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username, email and password are required"));
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already taken"));
        }

        // Store registration data temporarily
        Map<String, String> userData = new HashMap<>();
        userData.put("username", username);
        userData.put("email", email);
        userData.put("password", password);
        userData.put("role", role);
        tempRegistrationStore.put(username, userData);

        // Generate OTP and send via email
        String otp = otpService.generateAndSendOtp(username, email);
        return ResponseEntity.ok(Map.of("message", "OTP sent to email", "otp", otp));
    }

    @PostMapping("/register/verify-otp")
    @Transactional
    public ResponseEntity<?> verifyAndCompleteRegistration(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String otpCode = request.get("otpCode");

        if (username == null || otpCode == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username and OTP are required"));
        }

        // Verify OTP
        boolean otpValid = otpService.verifyOtp(username, otpCode);
        if (!otpValid) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
        }

        // Retrieve stored registration data
        Map<String, String> userData = tempRegistrationStore.remove(username);
        if (userData == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Registration session expired, please restart"));
        }

        // Create user
        User user = new User();
        user.setUsername(userData.get("username"));
        user.setEmail(userData.get("email"));
        user.setPassword(passwordEncoder.encode(userData.get("password")));
        user.setRole(Role.valueOf(userData.get("role")));
        userRepository.save(user);

        // Generate JWT
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("role", user.getRole().name());
        response.put("message", "Registration successful");

        return ResponseEntity.ok(response);
    }
}