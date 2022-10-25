package main.java.app.assets;

public final class PointChecker {
    private boolean checkFirstQuarter(double x, double y, double r) {
        if (x < 0 || y < 0) return false;
        return (x + y <= r/2);
    }

    private boolean checkSecondQuarter(double x, double y, double r) {
        if (x > 0 | y < 0) return false;
        return (x*x + y*y <= r*r);
    }

    private boolean checkThirdQuarter(double x, double y, double r) {
        return false;
    }

    private boolean checkFourthQuarter(double x, double y, double r) {
        if (x < 0 | y > 0) return false;
        return (x <= r/2 && y >= r);
    }

    public boolean checkPoint(double x, double y, double r) {
        return checkFirstQuarter(x, y, r) || checkSecondQuarter(x, y, r) || checkThirdQuarter(x, y, r) || checkFourthQuarter(x, y, r);
    }
}
