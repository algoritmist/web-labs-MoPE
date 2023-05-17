import { Injectable } from '@angular/core';
import { Point } from 'src/app/main-page/points-utils/point';

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

const GRAPH_FILL_COLOR = "white";
const GRAPH_STROKE_COLOR = "grey";

@Injectable({
  providedIn: 'root'
})
export class GraphDrawerService {

  constructor() { }

  canvas: any;
  ctx: any;

  x? : number;
  y? : number;
  r? : number;

  setCanvas(canvas: any, ctx: any) {
    this.canvas = canvas;
    this.ctx = ctx;
    console.log("canvas set");
  }

  drawAxis(): void {
    this.ctx.beginPath();

    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "black";

    this.ctx.moveTo(TOP_GRAPH_BORDER - X_AXIS_OFFSET, Y_MIDDLE);
    this.ctx.lineTo(BOTTOM_GRAPH_BORDER + X_AXIS_OFFSET, Y_MIDDLE);
    this.ctx.stroke();

    this.ctx.moveTo(X_MIDDLE, LEFT_GRAPH_BORDER - Y_AXIS_OFFSET);
    this.ctx.lineTo(X_MIDDLE, RIGHT_GRAPH_BORDER + Y_AXIS_OFFSET);
    this.ctx.stroke();

    this.ctx.beginPath();

    this.ctx.lineWidth = "1";

    this.ctx.moveTo(LEFT_GRAPH_BORDER, Y_MIDDLE - Y_AXIS_OFFSET);
    this.ctx.lineTo(LEFT_GRAPH_BORDER, Y_MIDDLE + Y_AXIS_OFFSET);
    this.ctx.stroke();

    this.ctx.moveTo(LEFT_GRAPH_BORDER + (R/2), Y_MIDDLE - Y_AXIS_OFFSET);
    this.ctx.lineTo(LEFT_GRAPH_BORDER + (R/2), Y_MIDDLE + Y_AXIS_OFFSET);
    this.ctx.stroke();

    this.ctx.moveTo(RIGHT_GRAPH_BORDER - (R/2), Y_MIDDLE - Y_AXIS_OFFSET);
    this.ctx.lineTo(RIGHT_GRAPH_BORDER - (R/2), Y_MIDDLE + Y_AXIS_OFFSET);
    this.ctx.stroke();

    this.ctx.moveTo(RIGHT_GRAPH_BORDER, Y_MIDDLE - Y_AXIS_OFFSET);
    this.ctx.lineTo(RIGHT_GRAPH_BORDER, Y_MIDDLE + Y_AXIS_OFFSET);
    this.ctx.stroke();

    this.ctx.moveTo(105, 10);
    this.ctx.lineTo(115, 10);
    this.ctx.stroke();

    this.ctx.moveTo(105, 60);
    this.ctx.lineTo(115, 60);
    this.ctx.stroke();

    this.ctx.moveTo(105, 160);
    this.ctx.lineTo(115, 160);
    this.ctx.stroke();

    this.ctx.moveTo(105, 210);
    this.ctx.lineTo(115, 210);
    this.ctx.stroke();

    this.ctx.font = '15px monospace';
    this.ctx.fillStyle = "black";
    this.ctx.fillText("R/2", X_MIDDLE + (R/2) - 10, Y_MIDDLE + 20);
    this.ctx.fillText("R", RIGHT_GRAPH_BORDER - 3, Y_MIDDLE + 20);
    this.ctx.fillText("R/2", X_MIDDLE - 35, Y_MIDDLE - (R/2) + 5);
    this.ctx.fillText("R", X_MIDDLE - 20, TOP_GRAPH_BORDER + 5);
}

drawFirstQuarter(): void {
  this.ctx.beginPath();
  this.ctx.strokeStyle = GRAPH_STROKE_COLOR;
  this.ctx.fillStyle = GRAPH_FILL_COLOR;

  this.ctx.moveTo(X_MIDDLE, Y_MIDDLE);
  this.ctx.lineTo(X_MIDDLE + R, Y_MIDDLE);
  this.ctx.lineTo(X_MIDDLE + R, Y_MIDDLE - R/2);
  this.ctx.lineTo(X_MIDDLE, Y_MIDDLE - R/2);

  this.ctx.stroke();
  this.ctx.fill();
}

drawSecondQuarter(): void {
  this.ctx.beginPath();
  this.ctx.strokeStyle = GRAPH_STROKE_COLOR;
  this.ctx.fillStyle = GRAPH_FILL_COLOR;

  this.ctx.moveTo(X_MIDDLE, Y_MIDDLE);
  this.ctx.lineTo(X_MIDDLE - R, Y_MIDDLE);
  this.ctx.lineTo(X_MIDDLE, Y_MIDDLE - R/2);

  this.ctx.stroke();
  this.ctx.fill();
}

drawThirdQuarter(): void {
}

drawFourthQuarter(): void {
  this.ctx.beginPath();
  this.ctx.strokeStyle = GRAPH_STROKE_COLOR;
  this.ctx.fillStyle = GRAPH_FILL_COLOR;

  this.ctx.moveTo(X_MIDDLE, Y_MIDDLE);
  this.ctx.arc(X_MIDDLE, Y_MIDDLE, R/2, 0, Math.PI/2, false)

  this.ctx.stroke();
  this.ctx.fill();
}

drawGraph(): void {
  this.drawFirstQuarter();
  this.drawSecondQuarter();
  this.drawThirdQuarter();
  this.drawFourthQuarter();
  this.drawAxis();
}

getXFromCanvasCoordinates(xCanvasCoord: number, r: number) : number {
  return ((xCanvasCoord - 110) / 100) * r;
}

getYFromCanvasCoordinates(yCanvasCoord: number, r: number) : number {
  return (-(yCanvasCoord - 110) / 100) * r;
}

getCoordinatesFromMouseClick(event: MouseEvent, r: number) {
  const rect = this.canvas.getBoundingClientRect();
  this.x = event.clientX - rect.left;
  this.y = event.clientY - rect.top;
  console.log(this.x, this.y);
  if (this.x >= LEFT_GRAPH_BORDER && this.x <= RIGHT_GRAPH_BORDER && this.y >= TOP_GRAPH_BORDER && this.y <= BOTTOM_GRAPH_BORDER) {
      this.x = this.getXFromCanvasCoordinates(this.x, r);
      this.y = this.getYFromCanvasCoordinates(this.y, r);
      console.log(this.x, this.y);
      return [this.x, this.y];
  }
  return [10, 10];
}

calculateResult(x: number, y: number, r: number) {
  return ((x > 0 && y > 0) && (x <= r && y <= r / 2)) || ((x <= 0 && y >= 0) && (2*y - x <= r)) ||
      (x <= 0 && y <= 0 && false) || ((x >= 0 && y <= 0 && (x*x + y*y <= r*r/4)));
}

drawPoint(x: number, y: number, r1: number, result: boolean) : void {
  // x, y are graph coordinates, not canvas coordinates
  if (typeof this.r !== "undefined") {
      r1 = this.r;
  }
  let xCoord = ((x + r1)/ r1) * 100 + LEFT_GRAPH_BORDER;
  let yCoord = 200 - ((y + r1) / r1) * 100 + TOP_GRAPH_BORDER;

  if (xCoord > WIDTH - POINT_RADIUS || xCoord < POINT_RADIUS ||
      yCoord > HEIGHT - POINT_RADIUS || yCoord < POINT_RADIUS) {
      return;
  }

  result = this.calculateResult(x, y, r1);

  this.ctx.beginPath()
  this.ctx.fillStyle = result ? "white" : "black";
  this.ctx.strokeStyle = "black";

  this.ctx.arc(xCoord, yCoord, 3, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
}

drawPoints(points: Point[]) : void {
  points.forEach(point => this.drawPoint(point.x, point.y, point.r, point.result));
}

redrawPoints(points: Point[]) : void {
  if (typeof this.r !== "undefined") {
      this.ctx.clearRect(0, 0, 220, 220);
      this.drawGraph();
      this.drawPoints(points);
  }
}

redrawPointsWithR(points: Point[], r: number) : void {
  if (typeof r !== "undefined") {
      this.ctx.clearRect(0, 0, 220, 220);
      this.drawGraph();
      this.r = r;
      this.drawPoints(points);
      this.r = undefined;
  }
}
}
