import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayModeService } from 'src/app/display-mode.service';
import { Point } from 'src/app/main-page/points-utils/point';
import { PointsService } from '../points-utils/points.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {
  constructor(private dmService: DisplayModeService) {}
  @Input()
  points: Point[] = [];

  resultToString(p: Point): string {
    return p.result ? 'hit' : 'miss';
  }

  isPhone() {
    return this.dmService.updateMode() === 'mobile';
  }
  convertTimestamp(timestamp: number) {
    return new Date(+timestamp).toLocaleString();
  }
}
