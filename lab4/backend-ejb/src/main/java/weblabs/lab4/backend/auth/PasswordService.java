package weblabs.lab4.backend.auth;

import org.apache.commons.lang3.RandomStringUtils;
import weblabs.lab4.backend.entities.User;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class PasswordService {
    private final String PEPPER = "a!fF#8Er";
    private final int SALT_LENGTH = 8;
    private final MessageDigest md = MessageDigest.getInstance("SHA-384");

    public PasswordService() throws NoSuchAlgorithmException {
    }

    public byte[] encryptPassword(String password, String salt) {
        return md.digest((PEPPER + password + salt).getBytes(StandardCharsets.UTF_8));
    }

    public String generateSalt() {
        return RandomStringUtils.randomAlphanumeric(SALT_LENGTH);
    }

    public boolean validateUserInfo(User user, String username, String password) {
        return (user.getUsername().equals(username)
                && Arrays.equals(user.getPasswordHash(), encryptPassword(password, user.getSalt())));
    }
}
