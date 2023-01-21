package com.weblabs.lab3.beans;

import com.weblabs.lab3.beans.PointBean;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class AttemptBean implements Serializable {
    @Id
    @SequenceGenerator(name = "jpaSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jpaSequence")
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "id", nullable = false)
    int id;
    @Column(nullable = false)
    private double x;
    @Column(nullable = false)
    private double y;
    @Column(nullable = false)
    private double r;
    @Column(nullable = false)
    private boolean result;
    @Column(name = "cur_time", nullable = false)
    private String formattedCurrentTime;
    @Column(name = "exec_time", nullable = false)
    private long executionTime;

    public AttemptBean() {}

    public AttemptBean(PointBean point) {
        this.x = point.getX();
        this.y = point.getY();
        this.r = point.getR();
        this.result = point.getResult();
        this.formattedCurrentTime = point.getFormattedCurrentTime();
        this.executionTime = point.getExecutionTime();
    }

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

    public String getStringResult() {
        return result ? "hit" : "miss";
    }

    public String getFormattedCurrentTime() {
        return formattedCurrentTime;
    }

    public void setFormattedCurrentTime(String formattedCurrentTime) {
        this.formattedCurrentTime = formattedCurrentTime;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }
}
