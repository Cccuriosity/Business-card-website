export interface ReviewDTO {
    id: number;
    lot_id: number | null;
    manufacturer: string | null;
    model: string | null;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    rating: number;
    comment: string;
    created_at: string;
}
