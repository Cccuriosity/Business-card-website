export interface RequestDTO {
    id: number;
    car_name: string | null;
    call_time: string | null;
    comment: string | null;
    is_solved: boolean;
    created_at: string;
}
