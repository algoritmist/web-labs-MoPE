package app.view;

import java.util.HashMap;

public class ResponseMessageMap {
    private final HashMap<Integer, String> messageMap = new HashMap<>();
    private final String DEFAULT_SUCCESS = "The request has been handled";
    private final String DEFAULT_ERROR = "Unknown error";

    public ResponseMessageMap() {
        initialize();
    }

    private void initialize() {
        messageMap.put(207, "Partial success. One or more of your arguments are invalid.");
        messageMap.put(400, "Invalid request");
    }

    public String getMessage(int responseCode) {
        String response = messageMap.get(responseCode);
        if (response != null) {
            return response;
        }
        if (responseCode / 100 == 2) {
            return DEFAULT_SUCCESS;
        }
        return DEFAULT_ERROR;
    }
}
