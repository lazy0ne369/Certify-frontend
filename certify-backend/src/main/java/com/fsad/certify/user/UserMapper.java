package com.fsad.certify.user;

import java.util.Locale;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(AppUser user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name().toLowerCase(Locale.ROOT),
            user.getDesignation(),
            user.getDepartment(),
            user.getAvatarUrl(),
            user.isActive(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }
}
