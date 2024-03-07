// src/app/auth/state/auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/user-management/models/user.model';

export const login = createAction('[Auth] Login', props<{ user: User }>());
export const logout = createAction('[Auth] Logout');
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
