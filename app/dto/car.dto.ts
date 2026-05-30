export interface LotListItemDTO {
    id: number;
    manufacturer: string;
    model: string;
    price: number;
    year: number;
    engine_volume: number;
    is_sold: boolean;
    images: string[];
}

export interface LotDetailDTO {
    id: number;
    manufacturer: string;
    model: string;
    price: number;
    year: number;
    mileage: number;
    engine_volume: number;
    color: string;
    transmission: string;
    drive: string;
    body_number: string;
    is_sold: boolean;
    sold_date: string | null;
    images: string[];
}
