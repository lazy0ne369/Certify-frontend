package com.fsad.certify.certificate;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping
    public List<CertificateResponse> getCertificates() {
        return certificateService.getCurrentUserCertificates();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CertificateResponse createCertificate(@Valid @RequestBody CertificateRequest request) {
        return certificateService.createCertificate(request);
    }

    @GetMapping("/{id}")
    public CertificateResponse getCertificate(@PathVariable Long id) {
        return certificateService.getCertificate(id);
    }

    @PutMapping("/{id}")
    public CertificateResponse updateCertificate(@PathVariable Long id, @Valid @RequestBody CertificateRequest request) {
        return certificateService.updateCertificate(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCertificate(@PathVariable Long id) {
        certificateService.deleteCertificate(id);
    }
}
