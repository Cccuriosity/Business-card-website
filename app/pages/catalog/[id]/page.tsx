"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import styles from "./PreviewPage.module.css";
import CarDetail from "@/app/components/Cars/CarDetail";
import { CarRepository } from "@/app/repositories/car.repository";
import { Car } from "@/app/types/car";
import { AdminRepository } from "@/app/repositories/admin.repository";
import Button from "@/app/components/Buttons/Button";
import MiniReview from "@/app/components/Review/MiniReview";

export default function PreviewPage() {
    const router = useRouter();
    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);
    const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

    useEffect(() => {
        if (id) CarRepository.getCarById(Number(id)).then(setCar);
    }, [id]);

    const handleSave = async (carData: Car) => {
        await AdminRepository.updateCar(carData.id, {
            manufacturer: carData.manufacturer,
            model: carData.model,
            price: carData.price,
            year: carData.year,
            mileage: carData.mileage,
            engine_volume: carData.engineVolume,
            color: carData.color,
            transmission: carData.transmission,
            drive: carData.drive,
            body_number: carData.vin,
            is_sold: carData.isSold,
            sold_date: carData.soldAt ?? null,
        });
    };

    const handleDeleteCar = async () => {
        if (!car) return;
        await AdminRepository.deleteCar(car.id);
        router.push("/pages/catalog");
    };

    if (!car) return null;

    return (
        <>
            <Header />
            <div className={styles.PreviewPage}>
                <CarDetail
                    car={car}
                    isAdmin={isAdmin}
                    onSave={handleSave}
                    onDelete={handleDeleteCar}
                />
                {!isAdmin && (
                    <div className={styles.OrderButton}>
                        <Button
                            variant="Dark"
                            onClick={() =>
                                router.push(`/pages/info?car=${car.manufacturer} ${car.model}`)
                            }
                        >
                            Оставить заявку
                        </Button>
                    </div>
                )}
                {!isAdmin && car.review && (
                    <div className={styles.Review}>
                        <MiniReview review={car.review} />
                    </div>
                )}
            </div>
        </>
    );
}
