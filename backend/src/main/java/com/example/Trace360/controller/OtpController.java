package com.example.Trace360.controller;

import com.example.Trace360.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth/otp")
@CrossOrigin(origins = "*")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");

        if (username == null || email == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username and email required"));
        }

        try {
            String otp = otpService.generateAndSendOtp(username, email);
            // For development, you can return OTP (optional). Remove in production.
            return ResponseEntity.ok(Map.of("message", "OTP sent to email", "otp", otp));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to send OTP: " + e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String otpCode = request.get("otpCode");

        if (username == null || otpCode == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username and OTP required"));
        }

        boolean valid = otpService.verifyOtp(username, otpCode);
        if (valid) {
            return ResponseEntity.ok(Map.of("message", "OTP verified successfully"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
        }
    }
}