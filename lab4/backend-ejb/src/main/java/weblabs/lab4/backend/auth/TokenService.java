package weblabs.lab4.backend.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import weblabs.lab4.backend.entities.User;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.SignatureException;
import java.util.Base64;
import java.util.Date;

import static io.jsonwebtoken.SignatureAlgorithm.HS256;

public class TokenService {
    //private final long EXPIRATION_TIME = Integer.MAX_VALUE; // мне тоже не нравится
    private final long EXPIRATION_TIME = 30 * 1000; // 20 seconds, for testing
    private final long REFRESH_TIME = 60 * 60 * 10 * 1000; // 10 hours
    private final Key key;
    SignatureAlgorithm sa = HS256;

    public TokenService() {
        key = generateKey("asdjbhksfdvhvgc23h342adasdkjlarijowijohferj4363fi2390fsd385dffdgdfgbufu8");
    }

    private Key generateKey(String keyword) {
        return new SecretKeySpec(keyword.getBytes(), 0, keyword.getBytes().length, "HmacSHA256");
    }


    public String generateNewToken(User user) {
        return Jwts.builder()
                .claim("sub", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, sa)
                .compact();
    }

    public String refreshToken(long userId, Date issuedAt) {
        return Jwts.builder()
                .claim("sub", userId)
                .setIssuedAt(issuedAt)
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TIME))
                .signWith(key, sa)
                .compact();
    }

    public boolean validateToken(String token) {
        if (token == null) return false;
        String[] chunks = token.split("\\.");
        if (chunks.length != 3) {
            return false;
        }

        String tokenWithoutSignature = chunks[0] + "." + chunks[1];
        String signature = chunks[2];

        DefaultJwtSignatureValidator validator = new DefaultJwtSignatureValidator(sa, key, Decoders.BASE64URL);

        return validator.isValid(tokenWithoutSignature, signature);
    }

    public boolean isExpired(String token) {
        Date expiresAt = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().getExpiration();
        Date cur = new Date();
        return (expiresAt.toInstant().isBefore(cur.toInstant()) || expiresAt.equals(cur));
    }

    public long getIdFromToken(String token) {
        try {
            return Long.parseLong(Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token).getBody().getSubject());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    public Date getIatFromToken(String token) {
        return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token).getBody().getIssuedAt();
    }
}
