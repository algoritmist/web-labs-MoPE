import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './services/auth-utils/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor  {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem("token");

    if (!token) {
      return next.handle(req);
    }

    req = this.addTokenHeader(req, token);

    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !req.url.includes('auth') && error.status === 401) {
        return this.handle401Error(req, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    let token;
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      this.authService.refresh(localStorage.getItem("token")!).subscribe(
        data => {
          token = data;
          this.isRefreshing = false;
          this.authService.setSession(token);
          this.refreshTokenSubject.next(token);  
          return next.handle(this.addTokenHeader(request, token.token));
        }
      ),catchError((err) => {
            this.isRefreshing = false;
            
            this.authService.logout();
            return throwError(err);
          });
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }


  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });    
  }
}
