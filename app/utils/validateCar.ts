import { Car } from "@/app/types/car";

export function validateCar(data: Partial<Car>): string {
    if (!data.manufacturer?.trim()) return "Введите марку";
    if (!data.model?.trim()) return "Введите модель";
    if (!data.year) return "Введите год";
    if (!data.price) return "Введите цену";
    if (!data.mileage) return "Введите пробег";
    if (!data.engineVolume) return "Введите объем";
    if (!data.color?.trim()) return "Введите цвет";
    if (!data.transmission?.trim()) return "Введите КПП";
    if (!data.drive?.trim()) return "Введите привод";
    if (!data.vin?.trim()) return "Введите номер кузова";
    if (!data.images?.length) return "Добавьте фото";
    return "";
}
