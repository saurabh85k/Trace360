package com.example.Trace360.dto;
 
import com.example.Trace360.entity.PackageStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
 
@Data
public class UpdateStatusRequest {
 
    @NotNull(message = "Status is required")
    private PackageStatus status;
}
