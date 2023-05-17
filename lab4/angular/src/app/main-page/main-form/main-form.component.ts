import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PointsService } from '../points-utils/points.service';
import { rNumberValidator } from './r_validator';
import {catchError} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Point } from '../points-utils/point';
import { DisplayModeService } from 'src/app/display-mode.service';

const INVALID_X_VALUE = -10;
const INVALID_R_VALUE = -10;

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent {
  constructor(private pointService: PointsService, private dmService: DisplayModeService) {}

  x = INVALID_X_VALUE;
  r = INVALID_R_VALUE;
  x_values = Array.from({length: 5 - (-3)}, (v, k) => k - 3);
  r_values = Array.from({length: 5}, (v, k) => k + 1)

  warning = '';

  @Output()
  public onRChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  $points: Subject<Point[]> = new Subject<Point[]>();

  y = new FormControl('', [
    Validators.required,
    rNumberValidator()
  ]);

  hideWarning(id: string, hide: boolean): void {
    let warning = document.getElementById(id);
    if (hide) {
      warning!.style.display = "none";
    } else {
      warning!.style.display = "block";
    }
  }

  selectValue(warning_id: string, checkbox_event: Event, invalid_value: number): number {
    let value;
    this.hideWarning(warning_id, (<HTMLInputElement> checkbox_event.target!).checked);
    if ((<HTMLInputElement> checkbox_event.target!).checked) {
      value = parseInt((<HTMLInputElement> checkbox_event.target!).value);
    } else {
      value = invalid_value;
    }
    return value;
  }
  
  selectX(checkbox_event: Event) {
    this.x = this.selectValue("x_warning", checkbox_event, INVALID_X_VALUE);
  }

  selectR(checkbox_event: Event) {
    this.r = this.selectValue("r_warning", checkbox_event, INVALID_R_VALUE);
    this.changeR(this.r);
  }

  changeR(r: number) {
    this.onRChange.emit(r);
  }

  isXValid(): boolean {
    return (this.x >= -3 && this.x <= 5);
  }

  isRValid(): boolean {
    return (this.r > 0 && this.r <= 5);
  }

  isYValid(): boolean {
    return this.y.valid;
  }

  isValid(): boolean {
    return this.isXValid() && this.isYValid() && this.isRValid();
  }

  isWarningPresent(): boolean {
    return this.warning.length !== 0;
  }
  
  submit(): void {
    if (this.isValid()) {
      let attempt = {
        x: this.x,
        y: parseFloat(parseFloat(this.y.value!).toFixed(6)),
        r: this.r
      };
      let attemptJson = JSON.stringify(attempt);
      console.log(attemptJson);
      this.pointService.sendAttempt(attempt).subscribe(data => 
        this.pointService.loadPoints().subscribe(data => this.$points.next(data as Point[])));
    }
  }

  isPhone() {
    return this.dmService.updateMode() === 'mobile';
  }

}
