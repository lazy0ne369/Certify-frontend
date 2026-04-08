package com.fsad.certify.user;

import java.time.Instant;

public record UserResponse(
    Long id,
    String name,
    String email,
    String role,
    String designation,
    String department,
    String avatar,
    boolean active,
    Instant createdAt,
    Instant updatedAt
) {
}
