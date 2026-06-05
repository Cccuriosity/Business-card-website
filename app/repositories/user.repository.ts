import { ProfileDTO } from "@/app/dto/user.dto";
import { RequestDTO } from "@/app/dto/request.dto";
import { mapProfileToDomain } from "@/app/dao/user.dao";
import { getAuthHeaders } from "@/app/utils/auth";
import { User } from "@/app/types/user";

const USE_MOCK = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const MOCK_USER: ProfileDTO = {
    id: 1,
    first_name: "Иван",
    last_name: "Петров",
    email: "ivan@example.com",
    phone_number: "+7 (999) 123-45-67",
    avatar_url: "/ProfileWhite.png",
    is_admin: false,
    active_requests_count: 1,
};

const MOCK_REQUESTS: RequestDTO[] = [
    {
        id: 1,
        car_name: "Toyota Tundra",
        lot: {
            id: 1,
            manufacturer: "Toyota",
            model: "Tundra",
            year: 2023,
            body_number: "5TFDY5F19PX123456",
        },
        call_time: "14:00",
        comment: "Хочу узнать подробнее",
        is_solved: true,
        created_at: "2025-05-01",
    },
    {
        id: 2,
        car_name: "BMW X5",
        lot: null,
        call_time: "10:00",
        comment: null,
        is_solved: false,
        created_at: "2025-05-15",
    },
];

export const UserRepository = {
    async getProfile(): Promise<User> {
        if (USE_MOCK) return mapProfileToDomain(MOCK_USER, MOCK_REQUESTS);

        const res = await fetch(`${API_BASE}/profile`, {
            headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);

        const data = await res.json();
        return mapProfileToDomain(data.user, data.requests);
    },

    async updateProfile(data: Partial<User>, avatarFile?: File): Promise<User> {
        if (USE_MOCK) {
            const updated = { ...MOCK_USER, ...data };
            return mapProfileToDomain(updated, MOCK_REQUESTS);
        }

        const formData = new FormData();
        if (data.firstName) formData.append("first_name", data.firstName);
        if (data.lastName) formData.append("last_name", data.lastName);
        if (data.email) formData.append("email", data.email);
        if (data.phone) formData.append("phone_number", data.phone);
        if (avatarFile) formData.append("avatar", avatarFile);

        const res = await fetch(`${API_BASE}/profile`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: formData,
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);

        const newToken = res.headers.get("x-new-auth-token");
        if (newToken) {
            localStorage.setItem("token", newToken);
        }

        return this.getProfile();
    },
};
