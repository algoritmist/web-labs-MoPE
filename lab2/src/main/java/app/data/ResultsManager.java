package app.data;

import javax.servlet.http.HttpSession;
import java.util.LinkedList;

public abstract class ResultsManager implements ResultsManagerInterface {
    private final String ATTRIBUTE_NAME;

    public ResultsManager(String attribute_name) {
        ATTRIBUTE_NAME = attribute_name;
    }

    public synchronized LinkedList<Point> getResults(HttpSession session) {
        return getResults(session, ATTRIBUTE_NAME);
    }

    public synchronized void updateResults(HttpSession session, LinkedList<Point> results) {
        updateResults(session, results, ATTRIBUTE_NAME);
    }
}
