"use strict";

const canvas = document.getElementById("graph_canvas");
const ctx  = canvas.getContext("2d");

let x;
let y;

const LEFT_GRAPH_BORDER = 10;
const RIGHT_GRAPH_BORDER = 210;
const TOP_GRAPH_BORDER = 10;
const BOTTOM_GRAPH_BORDER = 210;
const X_MIDDLE = 110;
const Y_MIDDLE = 110;
const R = 100;
const X_AXIS_OFFSET = 5;
const Y_AXIS_OFFSET = 5;
const WIDTH = 220;
const HEIGHT = 220;

const POINT_RADIUS = 3;

const X_VALUE_LEFT_BORDER = -5;
const X_VALUE_RIGHT_BORDER = 3;

const graph_color = "white";

function drawAxis() {
    ctx.beginPath();

    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";

    ctx.moveTo(TOP_GRAPH_BORDER - X_AXIS_OFFSET, Y_MIDDLE);
    ctx.lineTo(BOTTOM_GRAPH_BORDER + X_AXIS_OFFSET, Y_MIDDLE);
    ctx.stroke();

    ctx.moveTo(X_MIDDLE, LEFT_GRAPH_BORDER - Y_AXIS_OFFSET);
    ctx.lineTo(X_MIDDLE, RIGHT_GRAPH_BORDER + Y_AXIS_OFFSET);
    ctx.stroke();

    ctx.beginPath();

    ctx.lineWidth = "1";

    ctx.moveTo(LEFT_GRAPH_BORDER, Y_MIDDLE - Y_AXIS_OFFSET);
    ctx.lineTo(LEFT_GRAPH_BORDER, Y_MIDDLE + Y_AXIS_OFFSET);
    ctx.stroke();

    ctx.moveTo(LEFT_GRAPH_BORDER + (R/2), Y_MIDDLE - Y_AXIS_OFFSET);
    ctx.lineTo(LEFT_GRAPH_BORDER + (R/2), Y_MIDDLE + Y_AXIS_OFFSET);
    ctx.stroke();

    ctx.moveTo(RIGHT_GRAPH_BORDER - (R/2), Y_MIDDLE - Y_AXIS_OFFSET);
    ctx.lineTo(RIGHT_GRAPH_BORDER - (R/2), Y_MIDDLE + Y_AXIS_OFFSET);
    ctx.stroke();

    ctx.moveTo(RIGHT_GRAPH_BORDER, Y_MIDDLE - Y_AXIS_OFFSET);
    ctx.lineTo(RIGHT_GRAPH_BORDER, Y_MIDDLE + Y_AXIS_OFFSET);
    ctx.stroke();

    ctx.moveTo(105, 10);
    ctx.lineTo(115, 10);
    ctx.stroke();

    ctx.moveTo(105, 60);
    ctx.lineTo(115, 60);
    ctx.stroke();

    ctx.moveTo(105, 160);
    ctx.lineTo(115, 160);
    ctx.stroke();

    ctx.moveTo(105, 210);
    ctx.lineTo(115, 210);
    ctx.stroke();

    ctx.font = '15px monospace';
    ctx.fillStyle = "black";
    ctx.fillText("R/2", X_MIDDLE + (R/2) - 10, Y_MIDDLE + 20);
    ctx.fillText("R", RIGHT_GRAPH_BORDER - 3, Y_MIDDLE + 20);
    ctx.fillText("R/2", X_MIDDLE - 35, Y_MIDDLE - (R/2) + 5);
    ctx.fillText("R", X_MIDDLE - 20, TOP_GRAPH_BORDER + 5);
}

function drawFirstQuarter() {
}

function drawSecondQuarter() {
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.fillStyle = graph_color;

    ctx.moveTo(X_MIDDLE, Y_MIDDLE)
    ctx.lineTo(X_MIDDLE - R, Y_MIDDLE);
    ctx.lineTo(X_MIDDLE, Y_MIDDLE - R/2);

    ctx.stroke();
    ctx.fill();
}

function drawThirdQuarter() {
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.fillStyle = graph_color;

    ctx.moveTo(X_MIDDLE, Y_MIDDLE);
    ctx.lineTo(X_MIDDLE - R/2, Y_MIDDLE);
    ctx.lineTo(X_MIDDLE - R/2, Y_MIDDLE + R);
    ctx.lineTo(X_MIDDLE, Y_MIDDLE + R);

    ctx.stroke();
    ctx.fill();
}

function drawFourthQuarter() {
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.fillStyle = graph_color;

    ctx.arc(X_MIDDLE, Y_MIDDLE, R/2, 0, Math.PI/2, false);
    ctx.lineTo(X_MIDDLE, Y_MIDDLE);

    ctx.stroke();
    ctx.fill();
}


function drawGraph() {
    drawFirstQuarter();
    drawSecondQuarter();
    drawThirdQuarter();
    drawFourthQuarter();
    drawAxis();
}

function getXFromCanvasCoordinates(xCanvasCoord, r) {
    return ((xCanvasCoord - 110) / 100) * r;
}

function getYFromCanvasCoordinates(yCanvasCoord, r) {
    return (-(yCanvasCoord - 110) / 100) * r;
}

function getCoordinatesFromMouseClick(event) {
    const rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    console.log(x, y);
    if (x >= LEFT_GRAPH_BORDER && x <= RIGHT_GRAPH_BORDER && y >= TOP_GRAPH_BORDER && y <= BOTTOM_GRAPH_BORDER && typeof r !== "undefined") {
        x = getXFromCanvasCoordinates(x, r);
        y = getYFromCanvasCoordinates(y, r);
    }
}

function calculateResult(x, y, r) {
    return ((x > 0 && y > 0) && false) || ((x <= 0 && y >= 0) && (2*y - x <= r)) ||
        (x <= 0 && y <= 0 && (x >= -r/2) && (y >= -r)) || ((x >= 0 && y <= 0 && (x*x + y*y <= r/2)));
}

function drawPoint(x, y, r1, result) {
    // x, y are graph coordinates, not canvas coordinates
    if (typeof r !== "undefined") {
        r1 = r;
    }
    let xCoord = ((x + r1)/ r1) * 100 + LEFT_GRAPH_BORDER;
    let yCoord = 200 - ((y + r1) / r1) * 100 + TOP_GRAPH_BORDER;

    if (xCoord > WIDTH - POINT_RADIUS || xCoord < POINT_RADIUS ||
        yCoord > HEIGHT - POINT_RADIUS || yCoord < POINT_RADIUS) {
        return;
    }

    result = calculateResult(x, y, r1);

    ctx.beginPath()
    ctx.fillStyle = result ? "white" : "black";
    ctx.strokeStyle = "black";

    ctx.arc(xCoord, yCoord, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function drawPoints(points) {
    points.forEach(point => drawPoint(point.x, point.y, point.r, point.result));
}

function redrawPoints(points) {
    if (r !== "undefined") {
        ctx.clearRect(0, 0, 220, 220);
        drawGraph();
        drawPoints(points);
    }
}

function sendRequest(x, y, r) {
    let x_field = document.getElementById("main_form:XValue");
    x_field.setAttribute("value", x);
    document.getElementById('main_form:YInput').value = y;
    document.getElementById("main_form:submit").click();
}

function handleClick(event) {
    if (typeof r !== "undefined") {
        getCoordinatesFromMouseClick(event);
        sendRequest(x, y, r);
    }
}

drawGraph();

canvas.addEventListener("click", (e) => handleClick(e));