package app.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/controller"})
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if
        (req.getParameter("x[]") != null &&
        req.getParameter("y") != null &&
        req.getParameter("r") != null) {
            req.getRequestDispatcher("../check").forward(req, resp);
        }
        else {
            resp.setStatus(404);
            req.getRequestDispatcher("result.jsp").forward(req, resp);
        }
    }
}
