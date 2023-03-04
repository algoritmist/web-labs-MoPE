package weblabs.lab4.backend.auth;

import com.google.gson.annotations.Expose;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Map;

@Getter
@Setter
public class AuthResult implements Serializable {
    private int status;
    @Expose
    private String token;
}
