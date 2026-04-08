package com.fsad.certify.config;

import com.fsad.certify.certificate.Certificate;
import com.fsad.certify.certificate.CertificateRepository;
import com.fsad.certify.common.Role;
import com.fsad.certify.user.AppUser;
import com.fsad.certify.user.UserRepository;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDemoData(
        UserRepository userRepository,
        CertificateRepository certificateRepository,
        PasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (userRepository.count() > 0) {
                return;
            }

            AppUser ashish = createUser(
                "Ashish Dohare",
                "ashish@gmail.com",
                passwordEncoder.encode("user123"),
                Role.USER,
                "Software Engineer",
                "Engineering"
            );
            AppUser sohan = createUser(
                "Sohan Kumar Sahu",
                "sohan@gmail.com",
                passwordEncoder.encode("user123"),
                Role.USER,
                "Data Analyst",
                "Analytics"
            );
            AppUser deepak = createUser(
                "T Deepak",
                "deepak@gmail.com",
                passwordEncoder.encode("user123"),
                Role.USER,
                "DevOps Engineer",
                "Infrastructure"
            );
            AppUser admin = createUser(
                "Admin User",
                "admin@gmail.com",
                passwordEncoder.encode("admin123"),
                Role.ADMIN,
                "Platform Administrator",
                "Management"
            );

            userRepository.save(ashish);
            userRepository.save(sohan);
            userRepository.save(deepak);
            userRepository.save(admin);

            certificateRepository.save(createCertificate(
                ashish,
                "AWS Certified Solutions Architect - Associate",
                "Amazon Web Services",
                LocalDate.of(2024, 8, 10),
                LocalDate.of(2027, 8, 10),
                "AWS-SAA-2024-0810",
                "Cloud",
                "Validates expertise in designing distributed, scalable systems on AWS.",
                null,
                "https://aws.amazon.com/verification"
            ));
            certificateRepository.save(createCertificate(
                ashish,
                "Meta React Developer Certification",
                "Meta",
                LocalDate.of(2024, 3, 15),
                LocalDate.of(2026, 5, 10),
                "META-RD-2024-0315",
                "Frontend",
                "Demonstrates proficiency in building modern React applications.",
                null,
                "https://coursera.org/verify/meta-react"
            ));
            certificateRepository.save(createCertificate(
                ashish,
                "Google Cloud Professional Cloud Architect",
                "Google Cloud",
                LocalDate.of(2022, 11, 20),
                LocalDate.of(2024, 11, 20),
                "GCP-PCA-2022-1120",
                "Cloud",
                "Validates the ability to design and manage robust GCP solutions.",
                null,
                "https://cloud.google.com/certification"
            ));

            certificateRepository.save(createCertificate(
                sohan,
                "Tableau Desktop Specialist",
                "Tableau",
                LocalDate.of(2025, 5, 18),
                LocalDate.of(2028, 5, 18),
                "TAB-DS-2025-0518",
                "Data",
                "Foundational Tableau dashboard and data visualization skills.",
                null,
                "https://www.credly.com/badges/tableau"
            ));
            certificateRepository.save(createCertificate(
                sohan,
                "Microsoft Power BI Data Analyst Associate",
                "Microsoft",
                LocalDate.of(2024, 4, 1),
                LocalDate.of(2026, 5, 8),
                "MS-PBI-2024-0401",
                "Data",
                "Transforms raw data into insights with Power BI, DAX, and Power Query.",
                null,
                "https://learn.microsoft.com/credentials"
            ));
            certificateRepository.save(createCertificate(
                sohan,
                "IBM Data Science Professional Certificate",
                "IBM",
                LocalDate.of(2022, 7, 14),
                LocalDate.of(2024, 7, 14),
                "IBM-DS-2022-0714",
                "Data",
                "Covers Python, SQL, visualization, and applied data science projects.",
                null,
                "https://coursera.org/verify/ibm-data-science"
            ));

            certificateRepository.save(createCertificate(
                deepak,
                "Certified Kubernetes Administrator (CKA)",
                "CNCF / Linux Foundation",
                LocalDate.of(2025, 9, 5),
                LocalDate.of(2028, 9, 5),
                "CKA-2025-0905",
                "DevOps",
                "Validates production-grade Kubernetes administration and troubleshooting.",
                null,
                "https://training.linuxfoundation.org/certification/cka"
            ));
            certificateRepository.save(createCertificate(
                deepak,
                "Docker Certified Associate (DCA)",
                "Docker Inc.",
                LocalDate.of(2024, 6, 20),
                LocalDate.of(2026, 5, 15),
                "DCA-2024-0620",
                "DevOps",
                "Proves expertise in Docker image, networking, and security workflows.",
                null,
                "https://www.docker.com/certification"
            ));
            certificateRepository.save(createCertificate(
                deepak,
                "HashiCorp Certified: Terraform Associate",
                "HashiCorp",
                LocalDate.of(2022, 3, 30),
                LocalDate.of(2024, 3, 30),
                "HCP-TF-2022-0330",
                "DevOps",
                "Validates Terraform concepts for infrastructure as code.",
                null,
                "https://www.credly.com/badges/hashicorp-terraform"
            ));
        };
    }

    private AppUser createUser(
        String name,
        String email,
        String passwordHash,
        Role role,
        String designation,
        String department
    ) {
        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setPasswordHash(passwordHash);
        user.setRole(role);
        user.setDesignation(designation);
        user.setDepartment(department);
        user.setActive(true);
        return user;
    }

    private Certificate createCertificate(
        AppUser user,
        String title,
        String organization,
        LocalDate issueDate,
        LocalDate expiryDate,
        String credentialId,
        String category,
        String description,
        String badgeUrl,
        String certificateUrl
    ) {
        Certificate certificate = new Certificate();
        certificate.setUser(user);
        certificate.setTitle(title);
        certificate.setOrganization(organization);
        certificate.setIssueDate(issueDate);
        certificate.setExpiryDate(expiryDate);
        certificate.setCredentialId(credentialId);
        certificate.setCategory(category);
        certificate.setDescription(description);
        certificate.setBadgeUrl(badgeUrl);
        certificate.setCertificateUrl(certificateUrl);
        return certificate;
    }
}
