package weblabs.lab4.backend.rest.filters;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.SneakyThrows;
import weblabs.lab4.backend.ResponseStatus;
import weblabs.lab4.backend.auth.TokenService;
import weblabs.lab4.backend.auth.UserDAO;
import weblabs.lab4.backend.entities.User;

import javax.annotation.Priority;
import javax.ejb.EJB;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.Optional;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;

@Authorized
@Priority(Priorities.AUTHENTICATION)
@Provider
public class TokenFilter implements ContainerRequestFilter {
    private static final String AUTHENTICATION_SCHEME = "Bearer";
    private final TokenService tokenService = new TokenService();
    @EJB
    private UserDAO userDAO;
    Gson toJson = new Gson();


    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        Optional<String> token = getTokenFromContext(containerRequestContext);
        long userId = token.map(tokenService::getIdFromToken).orElse(-1L);
        User user = userDAO.findUserById(userId);

        if (token.isEmpty() || user == null || !tokenService.validateToken(token.get())
                || tokenService.isExpired(token.get())) {
            containerRequestContext.abortWith(
                    Response.status(ResponseStatus.INVALID_TOKEN.httpStatus())
                            .build()
            );
        }

        containerRequestContext.getHeaders().add("userId", Long.toString(userId));
    }

    private Optional<String> getTokenFromContext(ContainerRequestContext containerRequestContext) {
        String authHeaderString = containerRequestContext.getHeaderString(AUTHORIZATION);
        return authHeaderString == null ?
                Optional.empty() : Optional.of(authHeaderString.split(" ")[1]);
    }
}
