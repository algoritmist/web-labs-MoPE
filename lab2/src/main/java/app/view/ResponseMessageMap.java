package app.view;

import java.util.HashMap;

public class ResponseMessageMap {
    private final HashMap<Integer, String> messageMap = new HashMap<>();
    private final String DEFAULT_SUCCESS = "The request has been handled.";
    private final String DEFAULT_ERROR = "Unknown error.";
    private final HashMap<Integer, String> errorCats = new HashMap<>();

    public ResponseMessageMap() {
        initialize();
    }

    private void initialize() {
        initializeMessages();
        initializeCats();
    }

    private void initializeMessages() {
        messageMap.put(207, "Partial success. One or more of your arguments are invalid.");
        messageMap.put(400, "Invalid request. Check the coordinates requirements.");
        messageMap.put(404, "Resource not found.");
    }

    private void initializeCats() {
        errorCats.put(400, "https://http.cat/400");
        errorCats.put(404, "https://http.cat/404");
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

    public String getCat(int responseCode) {
        if (errorCats.containsKey(responseCode)) {
            return errorCats.get(responseCode);
        }
        return null;
    }
}
