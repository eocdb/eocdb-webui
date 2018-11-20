import { callJsonApi } from './callApi';
import { User } from '../types/user';


export function loginUser(apiServerUrl: string, name: string, password: string): Promise<User> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Headers', 'username, password');
    headers.append('username', name);
    headers.append('password', password);
    return callJsonApi<User>(apiServerUrl + '/users/login',
        undefined,
        {headers, credentials: 'omit'})
        .then((obj: any) => ({
            id: obj.id,
            name: obj.name,
            roles: obj.roles || [],
            email: obj.email || null,
            phone: obj.phone || null,
            firstName: obj.first_name || null,
            lastName: obj.last_name || null,
        }));
}
