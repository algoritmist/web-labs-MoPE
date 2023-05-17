package app.data;

import javax.servlet.http.HttpSession;

import java.util.LinkedList;

public class HistoryManager extends ResultsManager {
    public HistoryManager() {
        super("history");
    }

    public void updateResults(HttpSession session, Point p) {
        LinkedList<Point> results = getResults(session);
        results.add(p);
        updateResults(session, results);
    }
}
