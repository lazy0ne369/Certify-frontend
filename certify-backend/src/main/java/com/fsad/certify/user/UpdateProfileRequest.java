package com.fsad.certify.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @NotBlank(message = "Name is required")
    @Size(max = 120, message = "Name must be 120 characters or less")
    String name,

    @NotBlank(message = "Designation is required")
    @Size(max = 120, message = "Designation must be 120 characters or less")
    String designation,

    @NotBlank(message = "Department is required")
    @Size(max = 120, message = "Department must be 120 characters or less")
    String department,

    @Size(max = 255, message = "Avatar URL must be 255 characters or less")
    String avatar
) {
}
