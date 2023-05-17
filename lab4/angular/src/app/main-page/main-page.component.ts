import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth-utils/auth.service';
import { GraphDrawerService } from './graph/graph-drawer.service';
import { GraphComponent } from './graph/graph.component';
import { MainFormComponent } from './main-form/main-form.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { PointsService } from './points-utils/points.service';
import { Point } from './points-utils/point';
import { Subject } from 'rxjs';
import { DisplayModeService } from '../display-mode.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [GraphDrawerService],
})
export class MainPageComponent {
  constructor(private authService: AuthService, private graphDrawer: GraphDrawerService, private pointService: PointsService,
    private displayMode: DisplayModeService) {}
  $points: Subject<Point[]> = new Subject<Point[]>();

  public r_value= -1;

  @Input()
  public points: Point[] = [];

  init() {
    this.pointService.loadPoints().subscribe(
      res => res.forEach(p => this.points.push(p)));
  }

  getPoints() {
    this.pointService.loadPoints().subscribe(
      points => this.$points.next(points as Point[])
    );
  }

  updatePoints(value: Point[]) {
    this.points = value;
  }

  changeR(r: number) {
    this.r_value = r;
  }

  onAddPoint(p: Point[]) {
    this.points = p;
  }

  logout(): void {
    this.authService.logout();
    console.log("Auth token deleted.");
  }

  isDesktop(): boolean {
    return this.displayMode.updateMode() === "desktop";
  }
}
