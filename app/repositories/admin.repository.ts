import { getAuthHeaders } from "@/app/utils/auth";
import { ProfileDTO, UserListItemDTO } from "@/app/dto/user.dto";
import { Car } from "@/app/types/car";
import { User, UserListItem } from "@/app/types/user";
import { mapProfileToDomain, mapUserListItemToDomain } from "@/app/dao/user.dao";
import { RequestDTO } from "@/app/dto/request.dto";

const USE_MOCK = true;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function apiRequest<T = void>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...getAuthHeaders(), ...options.headers },
    });
    if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    if (res.status === 204) return undefined as T;
    return res.json();
}

const MOCK_USERS: UserListItemDTO[] = [
    {
        id: 1,
        first_name: "Иван",
        last_name: "Петров",
        phone_number: "+7 (999) 123-45-67",
        avatar_url: "/ProfileWhite.png",
        active_requests_count: 1,
        is_admin: false,
    },
    {
        id: 2,
        first_name: "Мария",
        last_name: "Сидорова",
        phone_number: "+7 (999) 765-43-21",
        avatar_url: "/ProfileWhite.png",
        active_requests_count: 0,
        is_admin: false,
    },
    {
        id: 3,
        first_name: "Сергей",
        last_name: "Кузнецов",
        phone_number: "+7 (999) 555-00-11",
        avatar_url: "/ProfileWhite.png",
        active_requests_count: 2,
        is_admin: false,
    },
];

export const AdminRepository = {
    async getUsers(): Promise<UserListItem[]> {
        if (USE_MOCK) return MOCK_USERS.map(mapUserListItemToDomain);

        const data = await apiRequest<UserListItemDTO[]>("/admin/users");
        return data.map(mapUserListItemToDomain);
    },

    async getUserById(id: number): Promise<User> {
        if (USE_MOCK) {
            const mockUser = MOCK_USERS.find((u) => u.id === id);
            if (!mockUser) throw new Error(`Пользователь id=${id} не найден`);
            return {
                id: mockUser.id,
                firstName: mockUser.first_name,
                lastName: mockUser.last_name,
                phone: mockUser.phone_number,
                email: "",
                avatar: mockUser.avatar_url ?? "/ProfileWhite.png",
                isAdmin: mockUser.is_admin,
                requests: [
                    {
                        id: 1,
                        carName: "BMW X5",
                        callTime: "14:00",
                        comment: "Хочу узнать подробнее",
                        isSolved: false,
                        createdAt: "2025-05-01",
                    },
                    {
                        id: 2,
                        carName: "Toyota Tundra",
                        callTime: "10:00",
                        comment: undefined,
                        isSolved: true,
                        createdAt: "2025-04-15",
                    },
                ],
            };
        }
        const data = await apiRequest<{ user: ProfileDTO; requests: RequestDTO[] }>(
            `/admin/users/${id}`
        );
        return mapProfileToDomain(data.user, data.requests);
    },

    async updateRequest(
        id: number,
        data: { comment?: string; is_solved?: boolean; lot_id?: number | null }
    ): Promise<void> {
        await apiRequest(`/requests/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    async deleteUser(id: number): Promise<void> {
        await apiRequest(`/admin/users/${id}`, { method: "DELETE" });
    },

    async updateCar(id: number, data: object): Promise<void> {
        await apiRequest(`/catalog/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },
    async createCar(data: Car): Promise<void> {
        await apiRequest("/catalog", {
            method: "POST",
            body: JSON.stringify({
                manufacturer: data.manufacturer,
                model: data.model,
                price: data.price,
                year: data.year,
                mileage: data.mileage,
                engine_volume: data.engineVolume,
                color: data.color,
                transmission: data.transmission,
                drive: data.drive,
                body_number: data.vin,
                is_sold: data.isSold,
                sold_date: data.soldAt ?? null,
                images: data.images,
            }),
        });
    },

    async deleteCar(id: number): Promise<void> {
        await apiRequest(`/catalog/${id}`, { method: "DELETE" });
    },
};
