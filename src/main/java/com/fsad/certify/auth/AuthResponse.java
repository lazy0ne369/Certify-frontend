package com.fsad.certify.auth;

import com.fsad.certify.user.UserResponse;

public record AuthResponse(
    String token,
    UserResponse user
) {
}
