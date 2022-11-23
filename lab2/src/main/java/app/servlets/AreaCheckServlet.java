package app.servlets;

import app.data.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedList;

@WebServlet(urlPatterns = {"/check"})
public class AreaCheckServlet extends HttpServlet {
    private final PointValidator validator = new PointValidator(-5, 3, -3, 5, 1, 3);
    private final PointChecker checker = new PointChecker();
    private final HistoryManager historyManager = new HistoryManager();
    private final LastAttemptManager lastAttemptManager = new LastAttemptManager();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setStatus(200);
        LinkedList<Point> currentAttempt = new LinkedList<>();
        try {
            /*
            Double[] xArray = Arrays.stream(req.getParameterValues("x[]"))
                    .map(Double::parseDouble)
                    .toArray(Double[]::new);*/
            String[] xArray = req.getParameterValues("x[]");
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));

            for (String xString : xArray) {
                try {
                    double x = Double.parseDouble(xString);
                    if (validator.validatePoint(x, y, r)) {
                        boolean res = checker.checkPoint(x, y, r);
                        Point p = new Point(x, y, r, res);
                        historyManager.updateResults(req.getSession(), p);
                        currentAttempt.add(p);
                    } else {
                        resp.setStatus(207);
                    }
                } catch (NumberFormatException e) {
                    resp.setStatus(207);
                }
            }
            lastAttemptManager.updateResults(req.getSession(), currentAttempt);
        } catch (NumberFormatException | NullPointerException e) {
            resp.setStatus(207);
        }
        lastAttemptManager.updateResults(req.getSession(), currentAttempt);
        if (currentAttempt.isEmpty()) {
            resp.setStatus(400);
        }
        req.getRequestDispatcher("result.jsp").forward(req, resp);
    }
}