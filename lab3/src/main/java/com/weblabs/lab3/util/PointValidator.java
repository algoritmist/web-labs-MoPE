package com.weblabs.lab3.util;

import com.weblabs.lab3.beans.PointBean;

public class PointValidator {
    private final double X_MIN;
    private final double X_MAX;
    private final double Y_MIN;
    private final double Y_MAX;
    private final double R_MIN;
    private final double R_MAX;

    public PointValidator(double X_MIN, double X_MAX, double Y_MIN, double Y_MAX, double R_MIN, double R_MAX) {
        this.X_MIN = X_MIN;
        this.X_MAX = X_MAX;
        this.Y_MIN = Y_MIN;
        this.Y_MAX = Y_MAX;
        this.R_MIN = R_MIN;
        this.R_MAX = R_MAX;
    }

    private boolean validateX(double x) {
        return (x >= X_MIN && x <= X_MAX);
    }

    private boolean validateY(double y) {
        return (y >= Y_MIN && y <= Y_MAX);
    }

    private boolean validateR(double r) {
        return (r >= R_MIN && r <= R_MAX);
    }

    public boolean validatePoint(double x, double y, double r) {
        return validateX(x) && validateY(y) && validateR(r);
    }

    public boolean validatePoint(PointBean p) {
        return validatePoint(p.getX(), p.getY(), p.getR());
    }
}