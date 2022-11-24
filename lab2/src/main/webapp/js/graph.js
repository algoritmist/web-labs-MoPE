"use strict";

const canvas = document.getElementById("graph_canvas");
const ctx  = canvas.getContext("2d");

let x;
let y;
let r;

const LEFT_GRAPH_BORDER = 10;
const RIGHT_GRAPH_BORDER = 210;
const TOP_GRAPH_BORDER = 10;
const BOTTOM_GRAPH_BORDER = 210;
const X_MIDDLE = 110;
const Y_MIDDLE = 110;
const R = 100;
const X_AXIS_OFFSET = 5;
const Y_AXIS_OFFSET = 5;

const X_VALUE_LEFT_BORDER = -5;
const X_VALUE_RIGHT_BORDER = 3;

function drawAxis() {
    ctx.beginPath();

    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";

    ctx.moveTo(TOP_GRAPH_BORDER - X_AXIS_OFFSET, Y_MIDDLE);
    ctx.lineTo( BOTTOM_GRAPH_BORDER + X_AXIS_OFFSET, Y_MIDDLE);
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
    ctx.beginPath()
    ctx.strokeStyle = "grey";
    ctx.fillStyle = "yellow";

    ctx.moveTo(X_MIDDLE, Y_MIDDLE);
    ctx.lineTo(X_MIDDLE, Y_MIDDLE - (R/2));
    ctx.lineTo(X_MIDDLE + (R/2), Y_MIDDLE);

    ctx.stroke();
    ctx.fill();
}

function drawSecondQuarter() {
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.fillStyle = "yellow";

    ctx.arc(110, 110, 100, Math.PI, 3*Math.PI/2, false);
    ctx.lineTo(110, 110);

    ctx.stroke();
    ctx.fill();
}

function drawThirdQuarter() {
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.fillStyle = "yellow";

    ctx.moveTo(110, 110);
    ctx.lineTo(160, 110);
    ctx.lineTo(160, 210);
    ctx.lineTo(110, 210);

    ctx.stroke();
    ctx.fill();
}

function drawFourthQuarter() {}


function drawGraph() {
    drawFirstQuarter();
    drawSecondQuarter();
    drawThirdQuarter();
    drawFourthQuarter();
    drawAxis();
}

function getR() {
    r = document.querySelector('input[name="r"]:checked');
    r = (r == null) ? undefined : r.value;
}

function getXFromCanvasCoordinates(xCanvasCoord, r) {
    let xValue = ((xCanvasCoord - 110) * r) / 100;
    let minOffset = 10;
    let closestValue = X_VALUE_RIGHT_BORDER;
    for (let i = 0; i < 9; i++) {
        if (Math.abs(xValue - (X_VALUE_LEFT_BORDER + i)) < minOffset) {
            minOffset = Math.abs(xValue - (X_VALUE_LEFT_BORDER + i));
            closestValue = X_VALUE_LEFT_BORDER + i
        }
    }
    return closestValue;
}

function getYFromCanvasCoordinates(yCanvasCoord, r) {
    let yValue = -((yCanvasCoord - 110) * r) / 100;
    return (yValue < -3) ? -3 : yValue;
}

function getCoordinatesFromMouseClick(event) {
    const rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    if (x >= LEFT_GRAPH_BORDER && x <= RIGHT_GRAPH_BORDER && y >= TOP_GRAPH_BORDER && y <= BOTTOM_GRAPH_BORDER && typeof r !== "undefined") {
        x = getXFromCanvasCoordinates(x, r);
        y = getYFromCanvasCoordinates(y, r);
    }
}

function drawPoint(x, y, r, result) {
    // x, y are graph coordinates, not canvas coordinates
    let xCoord = ((x + r)/ r) * 100 + LEFT_GRAPH_BORDER;
    let yCoord = 200 - ((y + r) / r) * 100 + TOP_GRAPH_BORDER;

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

function sendRequest(x, y, r) {
    let reqBody = "x[]=" + x + "&y=" + y + "&r=" + r;
    window.location.replace("controller?" + reqBody);
    // http://127.0.0.1:8080/lab2/127.0.0.1//lab2//controller?x[]=2&y=3.095833587646484&r=2.0
}

function handleClick(event) {
    getR();
    if (typeof r === "undefined") {
        showInvalidRequestWarning(true, "You must set R before interacting with graph");
    } else {
        getCoordinatesFromMouseClick(event);
        sendRequest(x, y, r);
    }
}

drawGraph();

canvas.addEventListener("click", (e) => handleClick(e));