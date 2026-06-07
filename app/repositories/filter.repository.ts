import { FilterOptionsDTO } from "@/app/dto/filter.dto";
import { mapFiltersToDomain } from "@/app/dao/filter.dao";
import { FilterOptions } from "@/app/types/filter";

const USE_MOCK = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const MOCK_FILTERS: FilterOptionsDTO = {
    manufacturers: [
        { id: 1, name: "Toyota" },
        { id: 2, name: "Honda" },
        { id: 3, name: "BMW" },
    ],
    car_models: [
        { id: 1, name: "Tundra", manufacturer_id: 1 },
        { id: 2, name: "Camry", manufacturer_id: 1 },
        { id: 3, name: "Civic", manufacturer_id: 2 },
        { id: 4, name: "Accord", manufacturer_id: 2 },
        { id: 5, name: "X5", manufacturer_id: 3 },
        { id: 6, name: "X6", manufacturer_id: 3 },
    ],
    colors: [
        { id: 1, name: "Чёрный" },
        { id: 2, name: "Белый" },
        { id: 3, name: "Серый" },
    ],
    engine_volumes: [
        { id: 1, volume: 1.5 },
        { id: 2, volume: 2.0 },
        { id: 3, volume: 3.0 },
    ],
    transmissions: ["Автомат", "Механика", "Робот", "Вариатор"],
    drive_types: ["Полный", "Передний", "Задний"],
    years: Array.from({ length: 10 }, (_, i) => 2025 - i),
    price_range: { min: 1500000, max: 9000000 },
    mileage_range: { min: 1000, max: 200000 },
};

export const FilterRepository = {
    async getFilters(): Promise<FilterOptions> {
        if (USE_MOCK) return mapFiltersToDomain(MOCK_FILTERS);

        const res = await fetch(`${API_BASE}/catalog/filters`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data: FilterOptionsDTO = await res.json();
        return mapFiltersToDomain(data);
    },
};
