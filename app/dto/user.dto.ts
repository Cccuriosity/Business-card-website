export interface ProfileDTO {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    avatar_url: string | null;
    is_admin: boolean;
    active_requests_count: number;
}

export interface UserListItemDTO {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    avatar_url: string | null;
    active_requests_count: number;
    is_admin: boolean;
}
