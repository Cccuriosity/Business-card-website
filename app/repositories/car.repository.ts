import { LotListItemDTO, LotDetailDTO } from "@/app/dto/car.dto";
import { mapLotListItemToDomain, mapLotDetailToDomain } from "@/app/dao/car.dao";
import { Car } from "@/app/types/car";
import { FilterOptions } from "@/app/types/filter";

const USE_MOCK = true;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const MOCK_CARS: LotListItemDTO[] = [
    {
        id: 1,
        manufacturer: "Toyota",
        model: "Tundra",
        year: 2023,
        price: 5500000,
        engine_volume: 3.0,
        is_sold: false,
        images: ["/tundra1.jpg", "/tundra2.jpg", "/tundra3.jpg", "/tundra4.jpg"],
    },
    {
        id: 2,
        manufacturer: "Honda",
        model: "Civic",
        year: 2022,
        price: 2100000,
        engine_volume: 1.5,
        is_sold: true,
        images: ["/civic1.jpg", "/civic2.jpg", "/civic3.jpg"],
    },
    {
        id: 3,
        manufacturer: "BMW",
        model: "X5",
        year: 2021,
        price: 6800000,
        engine_volume: 3.0,
        is_sold: true,
        images: ["/bmw1.jpg", "/bmw2.jpg", "/bmw3.jpg"],
    },
];

const MOCK_CAR_DETAIL: LotDetailDTO[] = [
    {
        id: 1,
        manufacturer: "Toyota",
        model: "Tundra",
        year: 2023,
        price: 5500000,
        mileage: 15000,
        engine_volume: 3.0,
        color: "Чёрный",
        transmission: "Автомат",
        drive: "Полный",
        body_number: "5TFDY5F19PX123456",
        is_sold: true,
        sold_date: "15.06.2026",
        images: ["/tundra1.jpg", "/tundra2.jpg", "/tundra3.jpg", "/tundra4.jpg"],
    },
    {
        id: 2,
        manufacturer: "Honda",
        model: "Civic",
        year: 2022,
        price: 2100000,
        mileage: 42000,
        engine_volume: 1.5,
        color: "Белый",
        transmission: "Вариатор",
        drive: "Передний",
        body_number: "JHMCV1234PZ654321",
        is_sold: false,
        sold_date: "",
        images: ["/civic1.jpg", "/civic2.jpg", "/civic3.jpg"],
    },
    {
        id: 3,
        manufacturer: "BMW",
        model: "X5",
        year: 2021,
        price: 6800000,
        mileage: 35000,
        engine_volume: 3.0,
        color: "Серый металлик",
        transmission: "Автомат",
        drive: "Полный",
        body_number: "5UXCR6C51L9D98765",
        is_sold: false,
        sold_date: "",
        images: ["/bmw1.jpg", "/bmw2.jpg", "/bmw3.jpg"],
    },
];

export const CarRepository = {
    async getCars(
        params: {
            search?: string;
            brand?: string;
            model?: string;
            year?: number;
            color?: string;
            transmission?: string;
            engineVolume?: number;
            driveType?: string;
            priceFrom?: number;
            priceTo?: number;
            mileageFrom?: number;
            mileageTo?: number;
            page?: number;
            limit?: number;
        },
        filterOptions?: FilterOptions | null
    ): Promise<Car[]> {
        if (USE_MOCK) return MOCK_CARS.map(mapLotListItemToDomain);

        const query = new URLSearchParams();
        if (params.page) query.set("page", params.page.toString());
        if (params.limit) query.set("limit", params.limit.toString());

        if (params.search) query.set("search", params.search);
        if (params.brand && filterOptions) {
            const id = filterOptions.brands.find((b) => b.name === params.brand)?.id;
            if (id) query.set("manufacturer_id", id.toString());
        }
        if (params.model && filterOptions) {
            const id = filterOptions.models.find((m) => m.name === params.model)?.id;
            if (id) query.set("model_id", id.toString());
        }
        if (params.color && filterOptions) {
            const id = filterOptions.colors.find((c) => c.name === params.color)?.id;
            if (id) query.set("color_id", id.toString());
        }
        if (params.engineVolume && filterOptions) {
            const id = filterOptions.engineVolumes.find(
                (e) => e.volume === params.engineVolume
            )?.id;
            if (id) query.set("engine_volume_id", id.toString());
        }

        if (params.transmission) query.set("transmission", params.transmission);
        if (params.driveType) query.set("drive", params.driveType);
        if (params.year) query.set("year", params.year.toString());
        if (params.priceFrom) query.set("price_from", params.priceFrom.toString());
        if (params.priceTo) query.set("price_to", params.priceTo.toString());
        if (params.mileageFrom) query.set("mileage_from", params.mileageFrom.toString());
        if (params.mileageTo) query.set("mileage_to", params.mileageTo.toString());

        const res = await fetch(`${API_BASE}/catalog?${query.toString()}`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: LotListItemDTO[] = await res.json();
        return data.map(mapLotListItemToDomain);
    },

    async getCarById(id: number): Promise<Car> {
        if (USE_MOCK) {
            const mock = MOCK_CAR_DETAIL.find((car) => car.id === id);
            if (!mock) throw new Error(`Машина с id=${id} не найдена`);
            return mapLotDetailToDomain(mock);
        }

        const res = await fetch(`${API_BASE}/catalog/${id}`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: LotDetailDTO = await res.json();
        return mapLotDetailToDomain(data);
    },
};
