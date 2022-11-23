package app.view;

import app.data.Point;

public class TablePointWriter implements PointWriter {
    @Override
    public String writePoint(Point p) {
        String rowClass = p.result() ? "hit" : "miss";
        return "<tr class=" + rowClass + ">" +
                "<td>" + p.x() + "</td>" +
                "<td>" + p.y() + "</td>" +
                "<td>" + p.r() + "</td>" +
                "<td>" + rowClass + "</td>" +
                "</tr>";
    }
}
