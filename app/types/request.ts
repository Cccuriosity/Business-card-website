import { LotShort } from "@/app/types/car";

export interface Request {
    id: number;
    carName?: string;
    lot?: LotShort;
    callTime?: string;
    comment?: string;
    isSolved: boolean;
    createdAt: string;
}
