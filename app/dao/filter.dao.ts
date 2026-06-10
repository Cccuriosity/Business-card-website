import { FilterOptionsDTO } from "@/app/dto/filter.dto";
import { FilterOptions } from "@/app/types/filter";

export function mapFiltersToDomain(dto: FilterOptionsDTO): FilterOptions {
    return {
        brands: dto.manufacturers.map((m) => ({ id: m.id, name: m.name })),
        models: dto.car_models.map((m) => ({
            id: m.id,
            name: m.name,
            manufacturerId: m.manufacturer_id,
        })),
        colors: dto.colors.map((c) => ({ id: c.id, name: c.name })),
        engineVolumes: dto.engine_volumes.map((e) => ({ id: e.id, volume: e.volume })),
        transmissions: dto.transmissions,
        driveTypes: dto.drive_types,
        years: dto.years,
        priceRange: { min: dto.price_range.min, max: dto.price_range.max },
        mileageRange: { min: dto.mileage_range.min, max: dto.mileage_range.max },
    };
}
