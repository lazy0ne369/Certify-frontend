package com.fsad.certify.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fsad.certify.user.AppUser;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final Base64.Encoder URL_ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder URL_DECODER = Base64.getUrlDecoder();

    private final ObjectMapper objectMapper;
    private final byte[] secretKeyBytes;
    private final long expirationMillis;

    public JwtService(
        ObjectMapper objectMapper,
        @Value("${app.jwt.secret}") String secret,
        @Value("${app.jwt.expiration-millis}") long expirationMillis
    ) {
        this.objectMapper = objectMapper;
        this.secretKeyBytes = secret.getBytes(StandardCharsets.UTF_8);
        this.expirationMillis = expirationMillis;
    }

    public String generateToken(AppUser user) {
        try {
            Instant now = Instant.now();
            Instant expiry = now.plusMillis(expirationMillis);

            Map<String, Object> header = Map.of(
                "alg", "HS256",
                "typ", "JWT"
            );

            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("sub", user.getEmail().toLowerCase(Locale.ROOT));
            payload.put("role", user.getRole().name());
            payload.put("userId", user.getId());
            payload.put("iat", now.getEpochSecond());
            payload.put("exp", expiry.getEpochSecond());

            String encodedHeader = encodeJson(header);
            String encodedPayload = encodeJson(payload);
            String signature = sign(encodedHeader + "." + encodedPayload);
            return encodedHeader + "." + encodedPayload + "." + signature;
        } catch (Exception exception) {
            throw new IllegalStateException("Unable to generate authentication token.");
        }
    }

    public String extractUsername(String token) {
        Object subject = extractClaims(token).get("sub");
        if (subject == null) {
            throw new IllegalArgumentException("Token subject is missing.");
        }
        return subject.toString();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        Map<String, Object> claims = extractClaims(token);
        String subject = String.valueOf(claims.get("sub"));
        return subject.equalsIgnoreCase(userDetails.getUsername()) && !isExpired(claims);
    }

    public Map<String, Object> extractClaims(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Malformed token.");
            }

            String unsignedToken = parts[0] + "." + parts[1];
            String expectedSignature = sign(unsignedToken);
            if (!MessageDigest.isEqual(
                expectedSignature.getBytes(StandardCharsets.UTF_8),
                parts[2].getBytes(StandardCharsets.UTF_8)
            )) {
                throw new IllegalArgumentException("Token signature is invalid.");
            }

            byte[] payloadBytes = URL_DECODER.decode(parts[1]);
            return objectMapper.readValue(payloadBytes, new TypeReference<>() {
            });
        } catch (IllegalArgumentException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new IllegalArgumentException("Unable to parse authentication token.");
        }
    }

    private boolean isExpired(Map<String, Object> claims) {
        Object expValue = claims.get("exp");
        if (!(expValue instanceof Number number)) {
            throw new IllegalArgumentException("Token expiry is missing.");
        }
        return Instant.now().isAfter(Instant.ofEpochSecond(number.longValue()));
    }

    private String encodeJson(Map<String, Object> value) throws Exception {
        return URL_ENCODER.encodeToString(objectMapper.writeValueAsBytes(value));
    }

    private String sign(String content) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secretKeyBytes, "HmacSHA256"));
        byte[] signature = mac.doFinal(content.getBytes(StandardCharsets.UTF_8));
        return URL_ENCODER.encodeToString(signature);
    }
}
