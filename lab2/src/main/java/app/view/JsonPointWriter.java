package app.view;

import app.data.Point;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonPointWriter implements PointWriter{
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String writePoint(Point p) {
        try {
            return mapper.writeValueAsString(p);
        } catch (JsonProcessingException e) {
            return "{}";
        }
    }

    @Override
    public String writePoints(Iterable<Point> points) {
        try {
            return mapper.writeValueAsString(points);
        } catch (JsonProcessingException e) {
            return e.getMessage(); // "[]" todo
        }
    }
}
