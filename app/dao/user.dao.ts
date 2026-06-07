import { ProfileDTO, UserListItemDTO } from "@/app/dto/user.dto";
import { RequestDTO } from "@/app/dto/request.dto";
import { mapRequestToDomain } from "@/app/dao/request.dao";
import { User, UserListItem } from "@/app/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function mapProfileToDomain(dto: ProfileDTO, requests: RequestDTO[] = []): User {
    return {
        id: dto.id,
        firstName: dto.first_name,
        lastName: dto.last_name,
        email: dto.email,
        phone: dto.phone_number,
        avatar: dto.avatar_url ? `${BASE_URL}/${dto.avatar_url}` : "/ProfileWhite.png",
        isAdmin: dto.is_admin,
        requests: requests.map(mapRequestToDomain),
    };
}

export function mapUserListItemToDomain(dto: UserListItemDTO): UserListItem {
    return {
        id: dto.id,
        firstName: dto.first_name,
        lastName: dto.last_name,
        phone: dto.phone_number,
        avatarUrl: dto.avatar_url ? `${BASE_URL}/${dto.avatar_url}` : null,
        activeRequestsCount: dto.active_requests_count,
        isAdmin: dto.is_admin,
    };
}
