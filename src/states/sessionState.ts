import { User } from '../model';
//import { UserRole } from "../types/user";

//const testRoles: UserRole[] = ['admin', 'submit'];

export interface SessionState {
    user: User | null;
    userLoginError: string | null;
    userLoginInProgress: boolean;
}

export function newSessionState() {
    return {
        user: null,
        userLoginError: null,
        userLoginInProgress: false,
    }
}