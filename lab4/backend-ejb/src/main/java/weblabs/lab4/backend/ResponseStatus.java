package weblabs.lab4.backend;

public enum ResponseStatus {
    OK,
    INVALID_REQUEST,
    INVALID_TOKEN,
    SERVER_ERROR;

    public int httpStatus() {
        return switch (this) {
            case OK -> 200;
            case INVALID_REQUEST -> 400;
            case INVALID_TOKEN -> 401;
            case SERVER_ERROR -> 500;
        };
    }
}
