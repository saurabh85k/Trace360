package com.example.Trace360.dto;

import com.example.Trace360.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Role is required")
    private Role role;  // Jackson auto-deserializes "ADMIN" / "USER" / "DELIVERY_AGENT"
                        // Invalid values return 400 automatically
}