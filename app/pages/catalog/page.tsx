'use client'
import Header from "@/app/components/Header"
import styles from './CatalogPage.module.css'
import DropDownInput from "@/app/components/DropDownInput"
import { useState } from "react"
import Input from "@/app/components/Inputs/Input"
import SearchBar from "@/app/components/Inputs/SearchBar"
import CarCard from "@/app/components/Cars/CarCard"

type Car = {
    id: number
    title: string
    price: number
    year: number
    engineVolume: number
}

const CARS_IN_STOCK: Car[] = [
    { id: 1, title: "Toyota Tundra", price: 7000000, year: 2023, engineVolume: 4.5 },
    { id: 2, title: "Toyota Tundra", price: 7500000, year: 2024, engineVolume: 5.0 },
    { id: 3, title: "Toyota Tundra", price: 6800000, year: 2023, engineVolume: 4.5 },
]

const CARS_SOLD: Car[] = [
    { id: 4, title: "Toyota Tundra", price: 6500000, year: 2022, engineVolume: 4.5 },
    { id: 5, title: "Toyota Tundra", price: 6200000, year: 2022, engineVolume: 4.0 },
    { id: 6, title: "Toyota Tundra", price: 6800000, year: 2023, engineVolume: 4.5 },
]

const FILTER_DATA = {
    brands: ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Kia', 'Lada', 'Volkswagen', 'Hyundai', 'Nissan', 'Mazda', 'Lexus', 'Porsche'],
    models: {
        'BMW': ['X5', 'X6', 'X7', '3 Series', '5 Series', '7 Series', 'M5', 'M8'],
        'Mercedes': ['E-Class', 'S-Class', 'C-Class', 'GLE', 'GLS', 'G-Class', 'AMG GT'],
        'Audi': ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'RS6', 'RS7'],
        'Toyota': ['Camry', 'RAV4', 'Land Cruiser', 'Prado', 'Corolla', 'Highlander'],
        'Kia': ['Sportage', 'Sorento', 'K5', 'Mohave', 'Ceed', 'Seltos'],
        'Lada': ['Vesta', 'Granta', 'Niva', 'XRAY', 'Largus'],
        'Volkswagen': ['Tiguan', 'Touareg', 'Passat', 'Polo', 'Golf'],
        'Hyundai': ['Solaris', 'Tucson', 'Santa Fe', 'Palisade', 'Creta'],
        'Nissan': ['X-Trail', 'Qashqai', 'Patrol', 'Murano', 'Altima'],
        'Mazda': ['CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'CX-30'],
        'Lexus': ['RX', 'LX', 'GX', 'NX', 'ES', 'LS'],
        'Porsche': ['Cayenne', 'Macan', '911', 'Panamera', 'Taycan']
    },
    years: Array.from({ length: 30 }, (_, i) => (2025 - i).toString()),
    colors: ['Белый', 'Черный', 'Серый', 'Серебристый', 'Красный', 'Синий', 'Темно-синий', 'Зеленый', 'Бежевый', 'Коричневый', 'Золотой', 'Оранжевый'],
    mileage: ['До 10 000 км', '10 000 - 50 000 км', '50 000 - 100 000 км', '100 000 - 150 000 км', '150 000 - 200 000 км', 'Более 200 000 км'],
    transmission: ['Автомат', 'Механика', 'Робот', 'Вариатор'],
    engineVolume: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '2.4', '2.5', '3.0', '3.5', '4.0', '4.4', '5.0', '5.5', '6.0'],
    driveType: ['Передний', 'Задний', 'Полный']
}

export default function CatalogPage() {
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [color, setColor] = useState('')
    const [mileage, setMileage] = useState('')
    const [transmission, setTransmission] = useState('')
    const [engineVolume, setEngineVolume] = useState('')
    const [driveType, setDriveType] = useState('')

    const availableModels = brand ? (FILTER_DATA.models[brand as keyof typeof FILTER_DATA.models] || []) : []

    const handleBrandChange = (val: string) => {
        setBrand(val)
        setModel('')
    }

    const carImages = ["/tundra1.jpg", "/tundra2.jpg", "/tundra3.jpg", "/tundra4.jpg"]

    return (
        <>
            <Header />
            <div className={styles.CatalogPage}>
                <div className={styles.Filters}>
                    <span className={styles.Title}>Фильтры</span>
                    <DropDownInput options={FILTER_DATA.brands} value={brand} onChange={handleBrandChange} placeholder="Марка" />
                    <DropDownInput options={availableModels} value={model} onChange={setModel} placeholder="Модель" />
                    <div className={styles.Divider}></div>
                    <DropDownInput options={FILTER_DATA.years} value={year} onChange={setYear} placeholder="Год" />
                    <DropDownInput options={FILTER_DATA.colors} value={color} onChange={setColor} placeholder="Цвет" />
                    <DropDownInput options={FILTER_DATA.mileage} value={mileage} onChange={setMileage} placeholder="Пробег" />
                    <DropDownInput options={FILTER_DATA.transmission} value={transmission} onChange={setTransmission} placeholder="КПП" />
                    <DropDownInput options={FILTER_DATA.engineVolume} value={engineVolume} onChange={setEngineVolume} placeholder="Объем" />
                    <DropDownInput options={FILTER_DATA.driveType} value={driveType} onChange={setDriveType} placeholder="Привод" />
                    <span className={styles.Placeholder}>Цена</span>
                    <div className={styles.Price}>
                        <Input type="text" placeholder="1500000" />
                        <Input type="text" placeholder="9000000" />
                    </div>
                </div>
                <div className={styles.Catalog}>
                    <SearchBar />
                    {CARS_IN_STOCK.length > 0 && (
                        <>
                            <div className={styles.SectionTitle}>В наличии:</div>
                            <div className={styles.Divider}></div>
                            <div className={styles.Cars}>
                                {CARS_IN_STOCK.map(car => (
                                    <CarCard key={car.id} images={carImages} title={car.title} price={car.price} year={car.year} engineVolume={car.engineVolume} />
                                ))}
                            </div>
                        </>
                    )}
                    {CARS_SOLD.length > 0 && (
                        <>
                            <div className={styles.SectionTitle}>Проданные:</div>
                            <div className={styles.Divider}></div>
                            <div className={styles.Cars}>
                                {CARS_SOLD.map(car => (
                                    <CarCard key={car.id} images={carImages} title={car.title} price={car.price} year={car.year} engineVolume={car.engineVolume} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
