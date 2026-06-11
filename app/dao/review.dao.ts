import { ReviewDTO } from "@/app/dto/review.dto";
import { Review } from "@/app/types/review";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function mapReviewToDomain(dto: ReviewDTO): Review {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU");
    };

    return {
        id: dto.id,
        lotId: dto.lot_id,
        brand: dto.manufacturer,
        model: dto.model,
        authorName: dto.first_name,
        authorLastName: dto.last_name,
        avatarUrl: dto.avatar_url
            ? `${BASE_URL}/${dto.avatar_url.startsWith("/") ? dto.avatar_url.slice(1) : dto.avatar_url}`
            : null,
        rating: dto.rating,
        comment: dto.comment,
        createdAt: formatDate(dto.created_at),
    };
}
