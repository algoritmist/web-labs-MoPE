package weblabs.lab4.backend.rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import weblabs.lab4.backend.ResponseStatus;
import weblabs.lab4.backend.auth.UserDAO;
import weblabs.lab4.backend.entities.Point;
import weblabs.lab4.backend.entities.User;
import weblabs.lab4.backend.points.PointDAO;
import weblabs.lab4.backend.points.PointService;
import weblabs.lab4.backend.rest.filters.Authorized;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/points")
@Authorized
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PointResource {
    Gson toJson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .create();
    private final PointService pointService = new PointService();
    @EJB
    private PointDAO pointDAO;
    @EJB
    private UserDAO userDAO;

    private User getUserFromHeaders(@Context HttpHeaders headers) {
        try {
            long userId = Long.parseLong(headers.getHeaderString("userId"));
            return userDAO.findUserById(userId);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @GET
    public Response getPoints(@Context HttpHeaders headers) {
        User user = getUserFromHeaders(headers);
        if (user != null) {
            return Response.ok()
                    .entity(toJson.toJson(pointDAO.getPoints(user)))
                    .build();
        }
        return Response.status(ResponseStatus.INVALID_REQUEST.httpStatus())
                .build();
    }

    @POST
    public Response handleRequest(@Context HttpHeaders headers, Point p) {
        User user = getUserFromHeaders(headers);
        if (user == null) {
            return Response.status(ResponseStatus.INVALID_REQUEST.httpStatus())
                    .build();
        }
        p.setUser(user);
        if (pointService.checkHit(p)) {
            pointDAO.create(p);
            return Response.ok()
                    .entity(toJson.toJson(p))
                    .build();
        }
        return Response.status(ResponseStatus.INVALID_REQUEST.httpStatus())
                .build();
    }
}
