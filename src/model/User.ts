import { UserRole } from "../types/user";

export interface User {
    // Mandatory user info
    id: string;
    name: string;
    roles: UserRole[];
    // Optional user info
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
}
