export interface UserState {
    userName: string;
    password: string;
    newPassword1: string;
    newPassword2: string;
}


export function newUserState() {
    return {
        userName: '',
        password: '',
        newPassword1: '',
        newPassword2: '',
    }
}