package app.data;

import javax.servlet.http.HttpSession;
import java.util.LinkedList;

public interface ResultsManagerInterface {
    default LinkedList<Point> getResults(HttpSession session, String ATTRIBUTE_NAME) {
        LinkedList<Point> results;
        if (session.getAttribute(ATTRIBUTE_NAME) != null) {
            try {
                results = (LinkedList<Point>) session.getAttribute(ATTRIBUTE_NAME);
            } catch (ClassCastException e) {
                results = new LinkedList<Point>();
            }
        } else {
            results = new LinkedList<Point>();
        }
        return results;
    }

    default void updateResults(HttpSession session, LinkedList<Point> results, String ATTRIBUTE_NAME) {
        session.setAttribute(ATTRIBUTE_NAME, results);
    }

}
