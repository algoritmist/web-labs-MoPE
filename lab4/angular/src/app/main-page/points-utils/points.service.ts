import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Point } from 'src/app/main-page/points-utils/point';
import { Attempt } from './attempt';

const POINTS_API = 'http://localhost:34600/api/points';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  constructor(private http: HttpClient) {}


  loadPoints() {
    return this.http.get<Point[]>(POINTS_API, httpOptions)
  }

  sendAttempt(p: Attempt) {
    return this.http.post<Point>(POINTS_API, JSON.stringify(p), httpOptions)
  }
}
