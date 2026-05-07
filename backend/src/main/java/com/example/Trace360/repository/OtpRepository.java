package com.example.Trace360.repository;

import com.example.Trace360.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByUsernameAndOtpCode(String username, String otpCode);
    void deleteByUsername(String username);
}