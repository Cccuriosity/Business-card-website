export interface LotShort {
    id: number;
    manufacturer: string;
    model: string;
    year: number;
    bodyNumber: string;
}

export interface Request {
    id: number;
    carName?: string;
    lot?: LotShort;
    callTime?: string;
    comment?: string;
    isSolved: boolean;
    createdAt: string;
}
