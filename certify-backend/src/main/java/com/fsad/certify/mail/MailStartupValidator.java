package com.fsad.certify.mail;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
public class MailStartupValidator {

    private static final Logger log = LoggerFactory.getLogger(MailStartupValidator.class);
    private static final String PLACEHOLDER_EMAIL = "your-business-email@gmail.com";
    private static final String PLACEHOLDER_PASSWORD = "your-app-password";

    private final MailProperties mailProperties;
    private final Environment environment;
    private final JavaMailSender mailSender;

    public MailStartupValidator(MailProperties mailProperties, Environment environment, JavaMailSender mailSender) {
        this.mailProperties = mailProperties;
        this.environment = environment;
        this.mailSender = mailSender;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void validateMailConfiguration() {
        if (!mailProperties.enabled()) {
            log.warn("Email notifications are disabled because app.mail.enabled=false.");
            return;
        }

        String username = environment.getProperty("spring.mail.username", "");
        String password = environment.getProperty("spring.mail.password", "");
        List<String> problems = new ArrayList<>();

        if (username.isBlank() || PLACEHOLDER_EMAIL.equalsIgnoreCase(username)) {
            problems.add("spring.mail.username is missing or still using the placeholder value");
        }
        if (password.isBlank() || PLACEHOLDER_PASSWORD.equals(password)) {
            problems.add("spring.mail.password is missing or still using the placeholder value");
        }
        if (mailProperties.from() == null || mailProperties.from().isBlank() || PLACEHOLDER_EMAIL.equalsIgnoreCase(mailProperties.from())) {
            problems.add("app.mail.from is missing or still using the placeholder value");
        }

        if (!problems.isEmpty()) {
            log.error(
                "Email notifications are enabled but not configured correctly: {}. Configure certify-backend/.env or your IDE run configuration with SPRING_MAIL_USERNAME, SPRING_MAIL_PASSWORD, and APP_MAIL_FROM.",
                String.join("; ", problems)
            );
            return;
        }

        log.info(
            "Email notifications enabled. from={}, smtpUser={}, expiryAlertDays={}, expiryAlertCron={}",
            mailProperties.from(),
            mask(username),
            mailProperties.expiryAlertDays(),
            mailProperties.expiryAlertCron()
        );

        if (mailSender instanceof JavaMailSenderImpl javaMailSender) {
            try {
                javaMailSender.testConnection();
                log.info(
                    "SMTP connection test succeeded for {}:{} using {}.",
                    javaMailSender.getHost(),
                    javaMailSender.getPort(),
                    mask(username)
                );
            } catch (Exception exception) {
                log.error(
                    "SMTP connection test failed for {}:{} using {}. Check your Gmail app password, 2-step verification, and APP_MAIL_FROM value.",
                    javaMailSender.getHost(),
                    javaMailSender.getPort(),
                    mask(username),
                    exception
                );
            }
        }
    }

    private String mask(String email) {
        int atIndex = email.indexOf('@');
        if (atIndex <= 1) {
            return "***";
        }
        return email.charAt(0) + "***" + email.substring(atIndex);
    }
}
