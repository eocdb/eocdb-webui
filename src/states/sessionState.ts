import { User } from '../model';

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