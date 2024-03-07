// src/app/auth/state/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, logout, loginFailure } from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, isAuthenticated: true, user })),
  on(logout, state => ({ ...state, isAuthenticated: false, user: null })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
);