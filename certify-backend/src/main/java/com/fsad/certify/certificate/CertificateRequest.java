package com.fsad.certify.certificate;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record CertificateRequest(
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must be 200 characters or less")
    String title,

    @NotBlank(message = "Organization is required")
    @Size(max = 200, message = "Organization must be 200 characters or less")
    String organization,

    @NotNull(message = "Issue date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate issueDate,

    @NotNull(message = "Expiry date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate expiryDate,

    @Size(max = 120, message = "Credential ID must be 120 characters or less")
    String credentialId,

    @NotBlank(message = "Category is required")
    @Size(max = 80, message = "Category must be 80 characters or less")
    String category,

    @Size(max = 1000, message = "Description must be 1000 characters or less")
    String description,

    @Size(max = 255, message = "Badge URL must be 255 characters or less")
    String badgeUrl,

    @Size(max = 255, message = "Certificate URL must be 255 characters or less")
    String certificateUrl
) {
}
