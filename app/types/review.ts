import { User } from "@/app/types/user";
import { Car } from "@/app/types/car";

export interface Review {
    user: Pick <User, 'avatar' | 'firstName' | 'lastName'>;
    stars: number;
    content: string;
    date: string;
    car: Pick <Car, 'brand' | 'model'>;
}