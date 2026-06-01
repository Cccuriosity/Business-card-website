import { getAuthHeaders } from "@/app/utils/auth";
import { CreateRequestDTO } from "@/app/dto/request.dto";

const USE_MOCK = true;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const RequestRepository = {
    async createRequest(data: CreateRequestDTO): Promise<void> {
        if (USE_MOCK) return;

        const res = await fetch(`${API_BASE}/requests`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    },
};
