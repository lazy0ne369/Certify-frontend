package com.fsad.certify.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Name is required")
    @Size(max = 120, message = "Name must be 120 characters or less")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    String email,

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    String password,

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
