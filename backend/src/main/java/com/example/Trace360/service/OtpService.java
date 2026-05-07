package com.example.Trace360.service;

import com.example.Trace360.entity.Otp;
import com.example.Trace360.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

    private static final SecureRandom random = new SecureRandom();
    private static final int OTP_EXPIRY_MINUTES = 5;

    public String generateAndSendOtp(String username, String email) {
        // Delete existing OTP for this username
        otpRepository.deleteByUsername(username);

        // Generate 6-digit OTP
        int otpValue = 100000 + random.nextInt(900000);
        String otpCode = String.valueOf(otpValue);

        // Save to DB
        Otp otp = new Otp();
        otp.setUsername(username);
        otp.setOtpCode(otpCode);
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
        otp.setVerified(false);
        otpRepository.save(otp);

        // Send email
        sendEmailOtp(email, otpCode);

        return otpCode;
    }

    private void sendEmailOtp(String email, String otpCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Trace360 - Your OTP Code");
        message.setText("Your OTP for registration is: " + otpCode + "\nValid for 5 minutes.");
        mailSender.send(message);
    }

    public boolean verifyOtp(String username, String otpCode) {
        Optional<Otp> otpOpt = otpRepository.findByUsernameAndOtpCode(username, otpCode);
        if (otpOpt.isPresent()) {
            Otp otp = otpOpt.get();
            if (otp.getExpiryTime().isAfter(LocalDateTime.now()) && !otp.isVerified()) {
                otp.setVerified(true);
                otpRepository.save(otp);
                return true;
            }
        }
        return false;
    }
}