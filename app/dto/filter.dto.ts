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

export interface FilterOptionsDTO {
    manufacturers: ManufacturerDTO[];
    car_models: CarModelDTO[];
    colors: ColorDTO[];
    engine_volumes: EngineVolumeDTO[];
    transmissions: string[];
    drive_types: string[];
    years: number[];
}
