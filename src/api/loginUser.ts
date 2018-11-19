import { callJsonApi } from './callApi';
import { User } from '../types/user';


export function loginUser(apiServerUrl: string, userName: string, userPassword: string): Promise<User> {
    const headers = new Headers();
    headers.append('username', userName);
    headers.append('password', userPassword);
    return callJsonApi<User>(apiServerUrl + '/login', undefined, {headers});
}


