// src/app/auth/state/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { login, loginFailure } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
        ofType(login),
        mergeMap(action =>
            this.authService.onLogin(action.user).pipe(
            map(user => login({ user })),
            catchError(error => of(loginFailure({ error })))
            )
        )
        )
    );

  // Define other effects such as logout here
}
