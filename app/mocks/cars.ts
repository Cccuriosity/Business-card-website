import { Car } from '@/app/types/car';

export const mockCars: Car[] = [
    {
        brand: 'Toyota',
        model: 'Tundra',
        year: 2023,
        price: 5500000,
        mileage: 15000,
        engineVolume: 3.0,
        color: 'Чёрный',
        transmission: 'Автомат',
        drive: 'Полный',
        vin: '5TFDY5F19PX123456',
        isSold: true,
        soldAt: '15.06.2026',
        images: ['/tundra1.jpg', '/tundra2.jpg', '/tundra3.jpg', '/tundra4.jpg']
    },
    {
        brand: 'Honda',
        model: 'Civic',
        year: 2022,
        price: 2100000,
        mileage: 42000,
        engineVolume: 1.5,
        color: 'Белый',
        transmission: 'Вариатор',
        drive: 'Передний',
        vin: 'JHMCV1234PZ654321',
        isSold: false,
        images: ['/civic1.jpg', '/civic2.jpg', '/civic3.jpg'],
    },
    {
        brand: 'BMW',
        model: 'X5',
        year: 2021,
        price: 6800000,
        mileage: 35000,
        engineVolume: 3.0,
        color: 'Серый металлик',
        transmission: 'Автомат',
        drive: 'Полный',
        vin: '5UXCR6C51L9D98765',
        isSold: false,
        images: ['/bmw1.jpg', '/bmw2.jpg', '/bmw3.jpg']
    }
];