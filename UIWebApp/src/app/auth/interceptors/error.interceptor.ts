import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e) => {
        if (e.status === 401) {
          this.authService.logout();
          this.messageService.add({severity:'error', summary:'Error', detail:'Unauthorized'});
        }       
        const error = e.error?.message || e.statusText;
        this.messageService.add({severity:'error', summary:'Error', detail:error});
        return throwError(() => new Error(error));
      })  
    );
  }
}