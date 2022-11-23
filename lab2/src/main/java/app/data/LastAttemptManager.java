package app.data;

import javax.servlet.http.HttpSession;
import java.util.LinkedList;

public class LastAttemptManager extends ResultsManager {
    public LastAttemptManager() {
        super("last_attempt");
    }
}
