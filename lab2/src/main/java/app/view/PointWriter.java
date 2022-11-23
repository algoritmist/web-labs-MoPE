package app.view;

import app.data.Point;

public interface PointWriter {
    String writePoint(Point p);

    default String writePoints(Iterable<Point> points) {
        StringBuilder res = new StringBuilder();
        for (Point p: points) {
            res.append(writePoint(p));
        }
        return res.toString();
    }
}
