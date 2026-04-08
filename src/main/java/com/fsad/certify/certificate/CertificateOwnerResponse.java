package com.fsad.certify.certificate;

public record CertificateOwnerResponse(
    Long id,
    String name,
    String email,
    String role,
    String designation,
    String department,
    String avatar,
    boolean active
) {
}
