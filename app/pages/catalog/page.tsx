"use client";

import Header from "@/app/components/Header";
import styles from "./CatalogPage.module.css";
import DropDownInput from "@/app/components/Inputs/DropDownInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Inputs/Input";
import SearchBar from "@/app/components/Inputs/SearchBar";
import CarCard from "@/app/components/Cars/CarCard";
import PhoneBanner from "@/app/components/PhoneBanner";
import { Car } from "@/app/types/car";
import { CarRepository } from "@/app/repositories/car.repository";
import { FilterRepository } from "@/app/repositories/filter.repository";
import { FilterOptions } from "@/app/types/filter";
import Button from "@/app/components/Buttons/Button";
import { router } from "next/client";

export default function CatalogPage() {
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [cars, setCars] = useState<Car[]>([]);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [transmission, setTransmission] = useState("");
    const [engineVolume, setEngineVolume] = useState("");
    const [driveType, setDriveType] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [mileageFrom, setMileageFrom] = useState("");
    const [mileageTo, setMileageTo] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
    const router = useRouter();

    useEffect(() => {
        FilterRepository.getFilters().then(setFilterOptions);
    }, []);

    useEffect(() => {
        CarRepository.getCars(
            {
                search,
                brand: brand || undefined,
                model: model || undefined,
                year: year ? Number(year) : undefined,
                color: color || undefined,
                transmission: transmission || undefined,
                engineVolume: engineVolume ? Number(engineVolume) : undefined,
                driveType: driveType || undefined,
                priceFrom: priceFrom ? Number(priceFrom) : undefined,
                priceTo: priceTo ? Number(priceTo) : undefined,
                mileageFrom: mileageFrom ? Number(mileageFrom) : undefined,
                mileageTo: mileageTo ? Number(mileageTo) : undefined,
            },
            filterOptions
        ).then(setCars);
    }, [
        brand,
        model,
        year,
        color,
        transmission,
        engineVolume,
        driveType,
        priceFrom,
        priceTo,
        mileageFrom,
        mileageTo,
    ]);

    const availableCars = cars.filter((car) => !car.isSold);
    const soldCars = cars.filter((car) => car.isSold);

    const availableModels =
        filterOptions?.models
            .filter((m) => {
                const selectedBrand = filterOptions.brands.find((b) => b.name === brand);
                return selectedBrand ? m.manufacturerId === selectedBrand.id : false;
            })
            .map((m) => m.name) ?? [];

    const handleBrandChange = (val: string) => {
        setBrand(val);
        setModel("");
    };

    return (
        <>
            <Header />
            <PhoneBanner number={"+79025223190"} />
            <div className={styles.CatalogPage}>
                <button
                    className={styles.FiltersToggle}
                    onClick={() => setFiltersOpen((prev) => !prev)}
                >
                    {filtersOpen ? "Скрыть фильтры" : "Фильтры"}
                </button>
                <div className={`${styles.Filters} ${filtersOpen ? styles.FiltersOpen : ""}`}>
                    <span className={styles.Title}>Фильтры</span>
                    <DropDownInput
                        options={filterOptions?.brands.map((b) => b.name) ?? []}
                        value={brand}
                        onChange={handleBrandChange}
                        placeholder="Марка"
                    />
                    <DropDownInput
                        options={availableModels}
                        value={model}
                        onChange={setModel}
                        placeholder="Модель"
                    />
                    <div className={styles.Divider}></div>
                    <DropDownInput
                        options={filterOptions?.years.map((y) => y.toString()) ?? []}
                        value={year}
                        onChange={setYear}
                        placeholder="Год"
                    />
                    <DropDownInput
                        options={filterOptions?.colors.map((c) => c.name) ?? []}
                        value={color}
                        onChange={setColor}
                        placeholder="Цвет"
                    />
                    <DropDownInput
                        options={filterOptions?.transmissions ?? []}
                        value={transmission}
                        onChange={setTransmission}
                        placeholder="КПП"
                    />
                    <DropDownInput
                        options={filterOptions?.engineVolumes.map((e) => e.volume.toString()) ?? []}
                        value={engineVolume}
                        onChange={setEngineVolume}
                        placeholder="Объем"
                    />
                    <DropDownInput
                        options={filterOptions?.driveTypes ?? []}
                        value={driveType}
                        onChange={setDriveType}
                        placeholder="Привод"
                    />
                    <span className={styles.Placeholder}>Пробег</span>
                    <div className={styles.Range}>
                        <Input
                            type="text"
                            placeholder="1000"
                            value={mileageFrom}
                            onChange={(e) => setMileageFrom(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="67000"
                            value={mileageTo}
                            onChange={(e) => setMileageTo(e.target.value)}
                        />
                    </div>
                    <span className={styles.Placeholder}>Цена</span>
                    <div className={styles.Range}>
                        <Input
                            type="text"
                            placeholder="1500000"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="9000000"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                        />
                    </div>
                    {isAdmin && (
                        <Button variant="Dark" onClick={() => router.push("/pages/admin/create")}>
                            Добавить автомобиль
                        </Button>
                    )}
                </div>

                <div className={styles.Catalog}>
                    <SearchBar onSearch={setSearch} />

                    {availableCars.length > 0 && (
                        <>
                            <div className={styles.SectionTitle}>В наличии:</div>
                            <div className={styles.Divider}></div>

                            <div className={styles.Cars}>
                                {availableCars.map((car) => (
                                    <CarCard key={car.id} car={car} />
                                ))}
                            </div>
                        </>
                    )}

                    {soldCars.length > 0 && (
                        <>
                            <div className={styles.SectionTitle}>Проданные:</div>
                            <div className={styles.Divider}></div>
                            <div className={styles.Cars}>
                                {soldCars.map((car) => (
                                    <CarCard key={car.id} car={car} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
