package app.view;

import app.data.Point;

import java.text.SimpleDateFormat;

public class TablePointWriter implements PointWriter {
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");

    @Override
    public String writePoint(Point p) {
        String result = p.getResult() ? "hit" : "miss";
        return "<tr class=" + result + ">" +
                "<td>" + p.getX() + "</td>" +
                "<td>" + p.getY() + "</td>" +
                "<td>" + p.getR() + "</td>" +
                "<td>" + result + "</td>" +
                "<td>" + dateFormat.format(p.getCurTime()) + "</td>" +
                "<td>" + p.getExTime() + " ns" + "</td>" +
                "</tr>";
    }
}
