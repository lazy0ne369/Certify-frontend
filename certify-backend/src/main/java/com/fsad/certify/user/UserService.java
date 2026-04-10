package com.fsad.certify.user;

import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;
    private final UserMapper userMapper;

    public UserService(
        UserRepository userRepository,
        CurrentUserService currentUserService,
        UserMapper userMapper
    ) {
        this.userRepository = userRepository;
        this.currentUserService = currentUserService;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {
        return userMapper.toResponse(currentUserService.getCurrentUser());
    }

    public UserResponse updateCurrentUser(UpdateProfileRequest request) {
        AppUser user = currentUserService.getCurrentUser();
        user.setName(request.name().trim());
        user.setDesignation(request.designation().trim());
        user.setDepartment(request.department().trim());
        user.setAvatarUrl(blankToNull(request.avatar()));
        return userMapper.toResponse(userRepository.save(user));
    }

    public void deleteCurrentUser() {
        AppUser user = currentUserService.getCurrentUser();
        userRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
            .sorted(Comparator.comparing(AppUser::getName, String.CASE_INSENSITIVE_ORDER))
            .map(userMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long userId) {
        return userMapper.toResponse(findEntityById(userId));
    }

    @Transactional(readOnly = true)
    public AppUser findEntityById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new NoSuchElementException("User not found."));
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
