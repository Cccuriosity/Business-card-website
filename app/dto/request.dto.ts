export interface LotShortDTO {
    id: number;
    manufacturer: string;
    model: string;
    year: number;
    body_number: string;
}

export interface RequestDTO {
    id: number;
    car_name: string | null;
    lot: LotShortDTO | null;
    call_time: string | null;
    comment: string | null;
    is_solved: boolean;
    created_at: string;
}

export interface CreateRequestDTO {
    car_name: string;
    call_time: string;
    comment?: string;
}
