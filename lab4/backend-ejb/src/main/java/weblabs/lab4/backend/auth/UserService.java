package weblabs.lab4.backend.auth;

import weblabs.lab4.backend.ResponseStatus;
import weblabs.lab4.backend.entities.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Optional;

@Stateless
public class UserService {
    private final PasswordService passwordService = new PasswordService();
    @EJB
    private UserDAO dao;
    private final TokenService tokenService = new TokenService();

    public UserService() throws NoSuchAlgorithmException {
    }

    private Optional<User> findUser(String username) {
        User res = dao.findUserByUsername(username);
        return Optional.ofNullable(res);
    }

    private boolean isValidAuthRequest(User user) {
        Optional<User> res = findUser(user.getUsername());
        return res.filter(value -> passwordService.validateUserInfo(value, user.getUsername(), user.getPassword())).isPresent();
    }

    private boolean isValidRegRequest(User user) {
        Optional<User> res = findUser(user.getUsername());
        return res.isEmpty();
    }

    public AuthResult register(User user) {
        AuthResult response = new AuthResult();
        if (isValidRegRequest(user)) {
            dao.create(user);
            response.setToken(tokenService.generateNewToken(user));
            response.setStatus(ResponseStatus.OK.httpStatus());
        } else {
            response.setStatus(ResponseStatus.INVALID_REQUEST.httpStatus());
        }
        return response;
    }

    public AuthResult authorize(User user) {
        AuthResult result = new AuthResult();
        if (isValidAuthRequest(user)) {
            user = dao.findUserByUsername(user.getUsername());
            result.setToken(tokenService.generateNewToken(user));
            result.setStatus(ResponseStatus.OK.httpStatus());
        } else {
            result.setStatus(ResponseStatus.INVALID_REQUEST.httpStatus());
        }
        return result;
    }

    public AuthResult refresh(String token) {
        AuthResult result = new AuthResult();
        long id = tokenService.getIdFromToken(token);
        Date iat = tokenService.getIatFromToken(token);
        if (iat == null) {
            iat = new Date();
        }
        if (id >= 0) {
            result.setStatus(ResponseStatus.OK.httpStatus());
            result.setToken(tokenService.refreshToken(id, iat));
        } else {
            result.setStatus(ResponseStatus.INVALID_REQUEST.httpStatus());
        }
        return result;
    }
}
