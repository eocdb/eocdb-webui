import { callJsonApi } from './callApi';
import { User } from '../model';
import { encrypt } from "../tools/encrypt";

export function loginUser(apiServerUrl: string, name: string, password: string): Promise<User> {
    password = encrypt(password)
    return callJsonApi<User>(apiServerUrl + '/users/login', undefined, {
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({username: name, password: password, client_version: "0.2.1", client: "webui"})
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
