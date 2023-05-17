import { visitAll } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Point } from '../points-utils/point';
import { PointsService } from '../points-utils/points.service';
import { GraphDrawerService } from './graph-drawer.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  constructor(private pointsProvider: PointsService, private graphDrawer: GraphDrawerService) {}
  ctx?: any;
  canvas?: any;
  private _r = -1;
  @Input() set r(val: number) {
    this._r = val;
    console.log(this._r);
    if (val > 0) {
      this.pointsProvider.loadPoints().subscribe(
        points => {
          this.graphDrawer.redrawPointsWithR(points, this._r);
        });
    }
  }
  private _points: Point[] = [];

  @Input() set points(val: Point[]) {
    this._points = val;
    this.graphDrawer.drawPoints(val);
  }

  @Output()
  addPoint: EventEmitter<Point[]> = new EventEmitter<Point[]>();


  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement> document.getElementById("graph_canvas");
    this.ctx  = this.canvas.getContext("2d");
    this.graphDrawer.setCanvas(this.canvas, this.ctx);
    this.graphDrawer.drawGraph();
    this.pointsProvider.loadPoints().subscribe(
      points => {
        this._points = points;
        this.addPoint.emit(points);
        this.graphDrawer.redrawPointsWithR(points, this._r);
      });
  }

  sendPointRequest(event: MouseEvent) {
    if (this._r > 0) {
      let arr = this.graphDrawer.getCoordinatesFromMouseClick(event, this._r);
      let attempt = {
        x: parseFloat(arr[0].toFixed(6)),
        y: parseFloat(arr[1].toFixed(6)),
        r: this._r
      };
      let attemptJson = JSON.stringify(attempt);
      console.log(attemptJson);
      this.pointsProvider.sendAttempt(attempt).subscribe(
        point => {
          this._points.unshift(point);
          this.graphDrawer.drawPoint(point.x, point.y, point.r, point.result)
          this.addPoint.emit(this._points);
        });
    }
  }
}
