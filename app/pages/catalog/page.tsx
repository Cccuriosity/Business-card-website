'use client';

import Header from "@/app/components/Header";
import styles from './CatalogPage.module.css';
import DropDownInput from "@/app/components/Inputs/DropDownInput";
import { useState } from "react";
import Input from "@/app/components/Inputs/Input";
import SearchBar from "@/app/components/Inputs/SearchBar";
import CarCard from "@/app/components/Cars/CarCard";
import { mockCars } from "@/app/mocks/cars";
import { filters } from "@/app/mocks/filters";
import PhoneBanner from "@/app/components/PhoneBanner";

export default function CatalogPage() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    const [mileage, setMileage] = useState('');
    const [transmission, setTransmission] = useState('');
    const [engineVolume, setEngineVolume] = useState('');
    const [driveType, setDriveType] = useState('');

    const availableModels = brand ? (filters.models[brand as keyof typeof filters.models] || []) : [];

    const handleBrandChange = (val: string) => {
        setBrand(val);
        setModel('');
    };

    const availableCars = mockCars.filter(car => !car.isSold);
    const soldCars = mockCars.filter(car => car.isSold);

    return (
        <>
            <Header />
            <PhoneBanner number={"+79025223190"}/>
            <div className={styles.CatalogPage}>
                <div className={styles.Filters}>
                    <span className={styles.Title}>Фильтры</span>
                    <DropDownInput options={filters.brands} value={brand} onChange={handleBrandChange} placeholder="Марка" />
                    <DropDownInput options={availableModels} value={model} onChange={setModel} placeholder="Модель" />
                    <div className={styles.Divider}></div>
                    <DropDownInput options={filters.years} value={year} onChange={setYear} placeholder="Год" />
                    <DropDownInput options={filters.colors} value={color} onChange={setColor} placeholder="Цвет" />
                    <DropDownInput options={filters.transmission} value={transmission} onChange={setTransmission} placeholder="КПП" />
                    <DropDownInput options={filters.engineVolume} value={engineVolume} onChange={setEngineVolume} placeholder="Объем" />
                    <DropDownInput options={filters.driveType} value={driveType} onChange={setDriveType} placeholder="Привод" />
                    <span className={styles.Placeholder}>Пробег</span>
                    <div className={styles.Range}>
                        <Input type="text" placeholder="1000" />
                        <Input type="text" placeholder="67000" />
                    </div>
                    <span className={styles.Placeholder}>Цена</span>
                    <div className={styles.Range}>
                        <Input type="text" placeholder="1500000" />
                        <Input type="text" placeholder="9000000" />
                    </div>
                </div>

                <div className={styles.Catalog}>
                    <SearchBar />

                    {availableCars.length > 0 && (
                        <>
                            <div className={styles.SectionTitle}>В наличии:</div>
                            <div className={styles.Divider}></div>
                            <div className={styles.Cars}>
                                {availableCars.map(car => (
                                    <CarCard key={car.vin} car={car} />
                                ))}
                            </div>
                        </>
                    )}

                    {soldCars.length > 0 && (
                        <>
                            <div className={styles.SectionTitle}>Проданные:</div>
                            <div className={styles.Divider}></div>
                            <div className={styles.Cars}>
                                {soldCars.map(car => (
                                    <CarCard key={car.vin} car={car} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}