package weblabs.lab4.backend.rest;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/api")
public class Lab4 extends Application {
}

/*
TODO:
- intercept 401 responses, send refresh requests
- load points from table
- adaptivity
- pagination
- fix weird jump at invalid Y values (non-numbers, for example)
 */