package com.fsad.certify.certificate;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    List<Certificate> findAllByUserIdOrderByExpiryDateAsc(Long userId);

    List<Certificate> findAllByOrderByExpiryDateAsc();
}
