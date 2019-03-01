import { callJsonApi } from './callApi';
import { User } from '../model';


export function loginUser(apiServerUrl: string, name: string, password: string): Promise<User> {
    return callJsonApi<User>(apiServerUrl + '/users/login', undefined, {
        method: 'post',
        body: JSON.stringify({username: name, password: password})
    })
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
