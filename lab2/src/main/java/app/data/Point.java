package app.data;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Point implements Serializable {
    private final double x;
    private final double y;
    private final double r;
    private final boolean result;
    private Timestamp curTime;
    private long exTime;

    public Point(double x, double y, double r, boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public void setExTime(long exTime) {
        this.exTime = exTime;
    }

    public void setCurTime(Timestamp curTime) {
        this.curTime = curTime;
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

    public Timestamp getCurTime() {
        return curTime;
    }

    public long getExTime() {
        return exTime;
    }
}
