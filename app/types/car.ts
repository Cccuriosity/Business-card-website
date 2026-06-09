import { Review } from "@/app/types/review";

export interface Car {
    id: number;
    manufacturer: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    engineVolume: number;
    color: string;
    transmission: string;
    drive: string;
    vin: string;
    isSold: boolean;
    soldAt?: string;
    images: string[];
    review?: Review;
}

export interface LotShort {
    id: number;
    manufacturer: string;
    model: string;
    year: number;
    bodyNumber: string;
}
