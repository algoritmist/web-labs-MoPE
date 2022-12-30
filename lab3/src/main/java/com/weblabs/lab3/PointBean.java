package com.weblabs.lab3;

import java.io.Serializable;

public class PointBean implements Serializable {
    private double x, y, r;
    private boolean result;
    private String formattedCurrentTime;
    private String formattedExecutionTime;

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

    public String getFormattedCurrentTime() {
        return formattedCurrentTime;
    }

    public void setFormattedCurrentTime(String formattedCurrentTime) {
        this.formattedCurrentTime = formattedCurrentTime;
    }

    public String getFormattedExecutionTime() {
        return formattedExecutionTime;
    }

    public void setFormattedExecutionTime(String formattedExecutionTime) {
        this.formattedExecutionTime = formattedExecutionTime;
    }

    @Override
    public String toString() {
        return "PointBean{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r; /* +
                "; formattedCurrentTime='" + formattedCurrentTime + '\'' +
                ", formattedExecutionTime='" + formattedExecutionTime + '\'' +
                '}';*/
    }
}
