package com.fsad.certify.certificate;

import com.fsad.certify.user.AppUser;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import org.springframework.stereotype.Component;

@Component
public class CertificateMapper {

    public CertificateResponse toResponse(Certificate certificate) {
        AppUser user = certificate.getUser();

        return new CertificateResponse(
            certificate.getId(),
            user.getId(),
            certificate.getTitle(),
            certificate.getOrganization(),
            certificate.getIssueDate(),
            certificate.getExpiryDate(),
            certificate.getCredentialId(),
            certificate.getCategory(),
            certificate.getDescription(),
            certificate.getBadgeUrl(),
            certificate.getCertificateUrl(),
            deriveStatus(certificate.getExpiryDate()),
            new CertificateOwnerResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name().toLowerCase(Locale.ROOT),
                user.getDesignation(),
                user.getDepartment(),
                user.getAvatarUrl(),
                user.isActive()
            ),
            certificate.getCreatedAt(),
            certificate.getUpdatedAt()
        );
    }

    private String deriveStatus(LocalDate expiryDate) {
        long daysRemaining = ChronoUnit.DAYS.between(LocalDate.now(), expiryDate);
        if (daysRemaining < 0) {
            return "expired";
        }
        if (daysRemaining <= 90) {
            return "expiring_soon";
        }
        return "active";
    }
}
