import { User } from "src/app/user-management/models/user.model";

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
  }