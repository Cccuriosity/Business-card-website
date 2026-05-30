import { Request } from "@/app/types/request";

export interface User {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    requests?: Request[];
    isAdmin: boolean;
}
export interface UserListItem {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    avatarUrl: string | null;
    activeRequestsCount: number;
    isAdmin: boolean;
}
