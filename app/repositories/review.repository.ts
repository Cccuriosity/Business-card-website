import { ReviewDTO } from "@/app/dto/review.dto";
import { mapReviewToDomain } from "@/app/dao/review.dao";
import { getAuthHeaders } from "@/app/utils/auth";
import { Review } from "@/app/types/review";

const USE_MOCK = true;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

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
    {
        id: 3,
        lot_id: 3,
        manufacturer: "BMW",
        model: "X5",
        first_name: "Сергей",
        last_name: "Кузнецов",
        avatar_url: "/ProfileWhite.png",
        rating: 5,
        comment: "Мечта, а не машина!",
        created_at: "2025-03-20",
    },
];

export const ReviewRepository = {
    async getReviews(): Promise<Review[]> {
        if (USE_MOCK) return MOCK_REVIEWS.map(mapReviewToDomain);

        const res = await fetch(`${API_BASE}/reviews`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: ReviewDTO[] = await res.json();
        return data.map(mapReviewToDomain);
    },

    async createReview(data: { lot_id?: number; rating: number; comment: string }): Promise<void> {
        if (USE_MOCK) return;

        const res = await fetch(`${API_BASE}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    },
};
