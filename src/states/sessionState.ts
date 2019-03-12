import { User } from '../model';
import { UserRole } from "../types/user";

const submitRole: UserRole = 'submit';

export interface SessionState {
    user: User | null;
    userLoginError: string | null;
    userLoginInProgress: boolean;
}

export function newSessionState() {
    return {
        user: {
            id: 8877827454,
            name: 'scott',
            roles: [submitRole],
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        userLoginError: null,
        userLoginInProgress: false,
    }
}