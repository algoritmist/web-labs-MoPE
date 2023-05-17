package com.weblabs.lab3.util;

import com.weblabs.lab3.beans.PointBean;

public class PointChecker {
    private static boolean checkFirstQuarter(double x, double y, double r) {
        return false;
    }

    private static boolean checkSecondQuarter(double x, double y, double r) {
        if (x > 0 || y < 0) return false;
        return (2*y - x <= r);
    }

    private static boolean checkThirdQuarter(double x, double y, double r) {
        if (x > 0 || y > 0) return false;
        return (x >= -r/2) && (y >= -r);
    }

    private static boolean checkFourthQuarter(double x, double y, double r) {
        if (x < 0 || y > 0) return false;
        return (x*x + y*y <= r/2);
    }

    public static boolean checkPoint(double x, double y, double r) {
        return checkFirstQuarter(x, y, r) || checkSecondQuarter(x, y, r) || checkThirdQuarter(x, y, r) || checkFourthQuarter(x, y, r);
    }

    public static boolean checkPoint(PointBean p) {
        return checkPoint(p.getX(), p.getY(), p.getR());
    }
}
