package weblabs.lab4.backend.points;

import weblabs.lab4.backend.entities.Point;

public class PointService {
    private final PointValidator pointValidator =
            new PointValidator(-5, 5, -5, 5, 1, 5);

    public boolean checkHit(Point p) {
        long start = System.nanoTime();
        if (!pointValidator.validatePoint(p)) {
            return false;
        }
        p.setResult(PointChecker.checkPoint(p));
        p.setCurTime(System.currentTimeMillis());
        long end = System.nanoTime();
        p.setExecTime(end - start);
        return true;
    }
}
