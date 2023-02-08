package com.weblabs.lab3.beans;

import com.weblabs.lab3.util.PointChecker;
import com.weblabs.lab3.util.PointValidator;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class PointBean implements Serializable {
    int id;
    private double x, y, r = -25;
    private boolean result;
    private long currentTime;
    private long executionTime;

    private final PointValidator pointValidator =
            new PointValidator(-5, 5, -5, 5, 1, 5);

    public double getR() {
        return r;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean getResult() {
        return result;
    }

    public long getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(long currentTime) {
        this.currentTime = currentTime;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }

    public boolean calcResult() {
        long start = System.nanoTime();
        if (!pointValidator.validatePoint(this)) {
            return false;
        }
        result = PointChecker.checkPoint(this);
        long end = System.nanoTime();
        this.currentTime = System.currentTimeMillis();
        this.executionTime = end - start;
        return true;
    }
}
