import { callJsonApi } from './callApi';
import { User } from '../model';
import {encrypt} from "../tools/encrypt";


export function changeLoginUser(apiServerUrl: string, username: string, password: string,
                                newPassword1: string, newPassword2: string): Promise<User> {
    console.log(username);
    password = encrypt(password)
    newPassword1 = encrypt(newPassword1)
    newPassword2 = encrypt(newPassword2)
    return callJsonApi<User>(apiServerUrl + '/users/login', undefined, {
        method: 'put',
        credentials: "same-origin",
        body: JSON.stringify({
            username: null,
            oldpassword: password,
            newpassword1: newPassword1,
            newpassword2: newPassword2
        })
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
