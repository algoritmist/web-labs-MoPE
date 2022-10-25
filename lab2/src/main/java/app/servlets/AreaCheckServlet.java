package main.java.app.servlets;

import main.java.app.assets.PointChecker;
import main.java.app.assets.PointValidator;
import main.java.app.data.Point;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;

public class AreaCheckServlet extends HttpServlet {
    private final PointValidator validator = new PointValidator(-5, 3, -3, 5, 1, 3);
    private final PointChecker checker = new PointChecker();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Double[] xArray = Arrays.stream(req.getParameter("x").split(";"))
                    .map(Double::parseDouble)
                    .toArray(Double[]::new);
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));

            for (double x : xArray) {
                if (validator.validatePoint(x, y, r)) {
                    boolean res = checker.checkPoint(x, y, r);
                    Point p = new Point(x, y, r, res);
                    Object sessionResults = req.getSession().getAttribute("results");
                    LinkedList<Point> results;
                    if (sessionResults == null || sessionResults.getClass() != LinkedList.class) {
                        results = new LinkedList<>(); //todo change :)
                    } else {
                        results = (LinkedList<Point>) sessionResults;
                    }
                    results.add(p);
                    req.getSession().setAttribute("results", results);
                    //todo forward
                }
                else {
                    //todo
                }
            }
        } catch (NumberFormatException | NullPointerException e) {

        }
    }
}