package com.fsad.certify.user;

import com.fsad.certify.certificate.CertificateResponse;
import com.fsad.certify.certificate.CertificateService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserService userService;
    private final CertificateService certificateService;

    public AdminUserController(UserService userService, CertificateService certificateService) {
        this.userService = userService;
        this.certificateService = certificateService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public UserResponse getUser(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/{userId}/certificates")
    public List<CertificateResponse> getUserCertificates(@PathVariable Long userId) {
        return certificateService.getCertificatesByUserId(userId);
    }
}
