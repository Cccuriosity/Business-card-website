export interface FilterOptions {
    brands: { id: number; name: string }[];
    models: { id: number; name: string; manufacturerId: number }[];
    colors: { id: number; name: string }[];
    engineVolumes: { id: number; volume: number }[];
    transmissions: string[];
    driveTypes: string[];
    years: number[];
    priceRange: { min: number; max: number };
    mileageRange: { min: number; max: number };
}
