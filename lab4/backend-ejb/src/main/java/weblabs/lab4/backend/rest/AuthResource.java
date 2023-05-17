package weblabs.lab4.backend.rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import weblabs.lab4.backend.auth.AuthResult;
import weblabs.lab4.backend.ResponseStatus;
import weblabs.lab4.backend.auth.UserService;
import weblabs.lab4.backend.entities.User;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.security.NoSuchAlgorithmException;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {
    @EJB
    private final UserService userService = new UserService();
    Gson json = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .create();

    public AuthResource() throws NoSuchAlgorithmException {
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(User user) {
        AuthResult result = userService.register(user);
        if (result.getStatus() == ResponseStatus.OK.httpStatus()) {
            return Response.ok().entity(json.toJson(result)).build();
        } else {
            return Response.status(result.getStatus()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authorize(User user) {
        AuthResult result = userService.authorize(user);
        if (result.getStatus() == ResponseStatus.OK.httpStatus()) {
            return Response.ok().entity(json.toJson(result)).build();
        } else {
            return Response.status(result.getStatus()).build();
        }
    }

    /*
    @GET
    @Path("/refresh")
    @Consumes(MediaType.TEXT_PLAIN)
    public Response refreshToken(String token) {
        AuthResult result = userService.refresh(token);
        if (result.getStatus() == ResponseStatus.OK.httpStatus()) {
            return Response.ok()
                    .entity(json.toJson(result))
                    .build();
        } else {
            return Response.status(result.getStatus())
                    .build();
        }
    }*/
}