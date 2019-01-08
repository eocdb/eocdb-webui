import { callJsonApi, getRequestInit } from './callApi';
import { User } from '../types/user';


export function loginUser(apiServerUrl: string, apiServerAuth: string, name: string, password: string): Promise<User> {
    const init = {
        ...getRequestInit(apiServerAuth),
        method: 'post',
        body: JSON.stringify({username: name, password: password}),
    };
    return callJsonApi<User>(apiServerUrl + '/users/login', undefined, init)
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
