package main.java.app.data;

public class Point {
    private final double x;
    private final double y;
    private final double r;
    private final boolean result;

    public Point(double x, double y, double r, boolean result) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.result = result;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getResult() {
        return result;
    }
}
