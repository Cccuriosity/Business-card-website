export interface Review {
    id: number;
    lotId: number | null;
    brand: string | null;
    model: string | null;
    authorName: string;
    authorLastName: string;
    avatarUrl: string | null;
    rating: number;
    comment: string;
    createdAt: string;
}
