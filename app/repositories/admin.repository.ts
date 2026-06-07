import { getAuthHeaders } from "@/app/utils/auth";
import { ProfileDTO, UserListItemDTO } from "@/app/dto/user.dto";
import { Car } from "@/app/types/car";
import { User, UserListItem } from "@/app/types/user";
import { mapProfileToDomain, mapUserListItemToDomain } from "@/app/dao/user.dao";
import { RequestDTO } from "@/app/dto/request.dto";

const USE_MOCK = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function apiRequest<T = void>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...getAuthHeaders(), ...options.headers },
    });
    if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    if (res.status === 204) return undefined as T;

    const text = await res.text();
    if (!text) return undefined as T;

    return JSON.parse(text);
}

function carToFormData(data: Car): FormData {
    const formData = new FormData();
    formData.append("manufacturer", data.manufacturer);
    formData.append("model", data.model);
    formData.append("year", data.year.toString());
    formData.append("price", data.price.toString());
    formData.append("mileage", data.mileage.toString());
    formData.append("engineVolume", data.engineVolume.toString());
    formData.append("color", data.color);
    formData.append("transmission", data.transmission);
    formData.append("drive", data.drive);
    formData.append("bodyNumber", data.vin);
    formData.append("is_sold", data.isSold ? "true" : "false");
    if (data.soldAt) formData.append("sold_date", data.soldAt);
    return formData;
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

    async createCar(data: Car, imageFiles: File[]): Promise<void> {
        const formData = carToFormData(data);
        imageFiles.forEach((file) => formData.append("images[]", file));

        const res = await fetch(`${API_BASE}/catalog`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: formData,
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    },

    async updateCar(
        id: number,
        data: Car,
        newImageFiles: File[],
        deletedImages: string[]
    ): Promise<void> {
        const formData = carToFormData(data);
        deletedImages.forEach((url) => formData.append("deletedImages[]", url));
        newImageFiles.forEach((file) => formData.append("newImages[]", file));

        const res = await fetch(`${API_BASE}/catalog/${id}`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: formData,
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    },

    async deleteCar(id: number): Promise<void> {
        await apiRequest(`/catalog/${id}`, { method: "DELETE" });
    },
};
