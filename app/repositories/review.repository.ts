import { ReviewDTO } from "@/app/dto/review.dto";
import { mapReviewToDomain } from "@/app/dao/review.dao";
import { getAuthHeaders } from "@/app/utils/auth";
import { Review } from "@/app/types/review";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";

const USE_MOCK = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const MOCK_REVIEWS: ReviewDTO[] = [
    {
        id: 1,
        lot_id: 1,
        manufacturer: "Toyota",
        model: "Tundra",
        first_name: "Иван",
        last_name: "Петров",
        avatar_url: "/ProfileWhite.png",
        rating: 5,
        comment: "Отличный автомобиль, всем доволен!",
        created_at: "2025-05-01",
    },
    {
        id: 2,
        lot_id: 2,
        manufacturer: "Honda",
        model: "Civic",
        first_name: "Мария",
        last_name: "Сидорова",
        avatar_url: "/ProfileWhite.png",
        rating: 4,
        comment: "Хорошая машина, но расход великоват.",
        created_at: "2025-04-15",
    },
];

export const ReviewRepository = {
    async getReviews(params?: {
        date_order?: "asc" | "desc";
        rating_order?: "asc" | "desc";
        page?: number;
        limit?: number;
    }): Promise<Review[]> {
        if (USE_MOCK) return MOCK_REVIEWS.map(mapReviewToDomain);

        const query = new URLSearchParams();
        if (params?.date_order) query.set("date_order", params.date_order);
        if (params?.rating_order) query.set("rating_order", params.rating_order);
        if (params?.page) query.set("page", params.page.toString());
        if (params?.limit) query.set("limit", params.limit.toString());

        const res = await fetch(`${API_BASE}/reviews?${query.toString()}`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: ReviewDTO[] = await res.json();
        return data.map(mapReviewToDomain);
    },

    async createReview(data: { lot_id?: number; rating: number; comment: string }): Promise<void> {
        if (USE_MOCK) return;

        const res = await fetchWithAuth(`${API_BASE}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    },
};
