import {Request} from "@/app/types/request";

export interface User {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    Requests?: Request[];
    isAdmin: boolean;
}