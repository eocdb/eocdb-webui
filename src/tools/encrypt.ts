import { sha512 } from "js-sha512";

export function encrypt(password: string){
    const hash = sha512.create();
    hash.update(password)
    return hash.hex();
}
