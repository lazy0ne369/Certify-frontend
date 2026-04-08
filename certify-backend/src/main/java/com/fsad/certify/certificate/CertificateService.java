package com.fsad.certify.certificate;

import com.fsad.certify.common.Role;
import com.fsad.certify.user.AppUser;
import com.fsad.certify.user.CurrentUserService;
import com.fsad.certify.user.UserService;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final CertificateMapper certificateMapper;
    private final CurrentUserService currentUserService;
    private final UserService userService;

    public CertificateService(
        CertificateRepository certificateRepository,
        CertificateMapper certificateMapper,
        CurrentUserService currentUserService,
        UserService userService
    ) {
        this.certificateRepository = certificateRepository;
        this.certificateMapper = certificateMapper;
        this.currentUserService = currentUserService;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public List<CertificateResponse> getCurrentUserCertificates() {
        AppUser currentUser = currentUserService.getCurrentUser();
        return certificateRepository.findAllByUserIdOrderByExpiryDateAsc(currentUser.getId()).stream()
            .map(certificateMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public CertificateResponse getCertificate(Long certificateId) {
        return certificateMapper.toResponse(findAuthorizedCertificate(certificateId));
    }

    public CertificateResponse createCertificate(CertificateRequest request) {
        validateDates(request);

        Certificate certificate = new Certificate();
        certificate.setUser(currentUserService.getCurrentUser());
        applyRequest(certificate, request);

        return certificateMapper.toResponse(certificateRepository.save(certificate));
    }

    public CertificateResponse updateCertificate(Long certificateId, CertificateRequest request) {
        validateDates(request);

        Certificate certificate = findAuthorizedCertificate(certificateId);
        applyRequest(certificate, request);
        return certificateMapper.toResponse(certificateRepository.save(certificate));
    }

    public void deleteCertificate(Long certificateId) {
        Certificate certificate = findAuthorizedCertificate(certificateId);
        certificateRepository.delete(certificate);
    }

    @Transactional(readOnly = true)
    public List<CertificateResponse> getAllCertificates() {
        return certificateRepository.findAllByOrderByExpiryDateAsc().stream()
            .map(certificateMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<CertificateResponse> getCertificatesByUserId(Long userId) {
        userService.findEntityById(userId);
        return certificateRepository.findAllByUserIdOrderByExpiryDateAsc(userId).stream()
            .map(certificateMapper::toResponse)
            .toList();
    }

    private Certificate findAuthorizedCertificate(Long certificateId) {
        Certificate certificate = certificateRepository.findById(certificateId)
            .orElseThrow(() -> new NoSuchElementException("Certificate not found."));

        AppUser currentUser = currentUserService.getCurrentUser();
        boolean isOwner = certificate.getUser().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("You can only access your own certificates.");
        }

        return certificate;
    }

    private void validateDates(CertificateRequest request) {
        if (request.expiryDate().isBefore(request.issueDate())) {
            throw new IllegalArgumentException("Expiry date must be after or equal to the issue date.");
        }
    }

    private void applyRequest(Certificate certificate, CertificateRequest request) {
        certificate.setTitle(request.title().trim());
        certificate.setOrganization(request.organization().trim());
        certificate.setIssueDate(request.issueDate());
        certificate.setExpiryDate(request.expiryDate());
        certificate.setCredentialId(blankToNull(request.credentialId()));
        certificate.setCategory(request.category().trim());
        certificate.setDescription(blankToNull(request.description()));
        certificate.setBadgeUrl(blankToNull(request.badgeUrl()));
        certificate.setCertificateUrl(blankToNull(request.certificateUrl()));
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
