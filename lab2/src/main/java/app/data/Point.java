package app.data;

public record Point(double x, double y, double r, boolean result) {
    /*
    public String toTableRow() {
        return "<tr>" +
                "<td>" + this.x + "</td>" +
                "<td>" + this.y + "</td>" +
                "<td>" + this.r + "</td>" +
                "<td>" + this.result + "</td>" +
                "</tr>";
    } //todo mvc*/
}
