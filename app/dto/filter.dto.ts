export interface ManufacturerDTO {
    id: number;
    name: string;
}

export interface CarModelDTO {
    id: number;
    name: string;
    manufacturer_id: number;
}

export interface ColorDTO {
    id: number;
    name: string;
}

export interface EngineVolumeDTO {
    id: number;
    volume: number;
}

export interface PriceRangeDTO {
    min: number;
    max: number;
}

export interface MileageRangeDTO {
    min: number;
    max: number;
}

export interface FilterOptionsDTO {
    manufacturers: ManufacturerDTO[];
    car_models: CarModelDTO[];
    colors: ColorDTO[];
    engine_volumes: EngineVolumeDTO[];
    transmissions: string[];
    drive_types: string[];
    years: number[];
    price_range: PriceRangeDTO;
    mileage_range: MileageRangeDTO;
}
