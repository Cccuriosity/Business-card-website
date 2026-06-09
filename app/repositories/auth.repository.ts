import {
    LoginDTO,
    LoginResponseDTO,
    RegisterDTO,
    ChangePasswordDTO,
    ForgotPasswordRequestDTO,
    VerifyDTO,
    ForgotPasswordVerifyDTO,
    ForgotPasswordResetDTO,
} from "@/app/dto/auth.dto";
import { getAuthHeaders } from "@/app/utils/auth";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function decodeJwtRole(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.roles?.includes("ROLE_ADMIN") ?? false;
    } catch {
        return false;
    }
}

async function apiRequest<T>(endpoint: string, body: unknown): Promise<T> {
    const res = await fetchWithAuth(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Ошибка ${res.status}`);

    const text = await res.text();
    if (!text) return {} as T;
    try {
        return JSON.parse(text);
    } catch {
        return {} as T;
    }
}

export const AuthRepository = {
    async login(data: LoginDTO): Promise<void> {
        const res = await apiRequest<LoginResponseDTO>("/auth/login", data);
        localStorage.setItem("token", res.token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("isAdmin", String(decodeJwtRole(res.token)));
    },

    async register(data: RegisterDTO): Promise<void> {
        await apiRequest("/auth/register", data);
    },

    async verify(data: VerifyDTO): Promise<void> {
        await apiRequest("/auth/verify", data);
    },

    async changePassword(data: ChangePasswordDTO): Promise<void> {
        await apiRequest("/auth/change-password", data);
    },

    async forgotPasswordRequest(data: ForgotPasswordRequestDTO): Promise<void> {
        await apiRequest("/auth/forgot-password/request", data);
    },

    async forgotPasswordVerify(data: ForgotPasswordVerifyDTO): Promise<string> {
        const res = await apiRequest<{ reset_token: string }>("/auth/forgot-password/verify", data);
        return res.reset_token;
    },

    async forgotPasswordReset(data: ForgotPasswordResetDTO): Promise<void> {
        await apiRequest("/auth/forgot-password/reset", data);
    },
};
