import { LotListItemDTO, LotDetailDTO } from "@/app/dto/car.dto";
import { Car } from "@/app/types/car";
import { mapReviewToDomain } from "@/app/dao/review.dao";

export function mapLotListItemToDomain(dto: LotListItemDTO): Car {
    return {
        id: dto.id,
        manufacturer: dto.manufacturer,
        model: dto.model,
        price: dto.price,
        year: dto.year,
        mileage: 0,
        engineVolume: dto.engine_volume,
        color: "",
        transmission: "",
        drive: "",
        vin: "",
        isSold: dto.is_sold,
        soldAt: undefined,
        images: dto.images,
    };
}

export function mapLotDetailToDomain(dto: LotDetailDTO): Car {
    const parseDate = (d: string | null) => {
        if (!d) return undefined;
        const parts = d.split(".");
        return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : undefined;
    };

    return {
        id: dto.id,
        manufacturer: dto.manufacturer,
        model: dto.model,
        price: dto.price,
        year: dto.year,
        mileage: dto.mileage,
        engineVolume: dto.engine_volume,
        color: dto.color,
        transmission: dto.transmission,
        drive: dto.drive,
        vin: dto.body_number,
        isSold: dto.is_sold,
        soldAt: parseDate(dto.sold_date),
        images: dto.images,
        review: dto.review ? mapReviewToDomain(dto.review) : undefined,
    };
}
