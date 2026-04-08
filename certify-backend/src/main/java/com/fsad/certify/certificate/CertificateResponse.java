package com.fsad.certify.certificate;

import java.time.Instant;
import java.time.LocalDate;

public record CertificateResponse(
    Long id,
    Long userId,
    String title,
    String organization,
    LocalDate issueDate,
    LocalDate expiryDate,
    String credentialId,
    String category,
    String description,
    String badgeUrl,
    String certificateUrl,
    String status,
    CertificateOwnerResponse owner,
    Instant createdAt,
    Instant updatedAt
) {
}
