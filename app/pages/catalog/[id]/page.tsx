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
import { useToast } from "@/app/hooks/useToast";
import Toast from "@/app/components/Toast";

export default function PreviewPage() {
    const router = useRouter();
    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);
    const [isAdmin] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("isAdmin") === "true";
    });
    const { toast, showToast } = useToast();

    useEffect(() => {
        if (id) CarRepository.getCarById(Number(id)).then(setCar);
    }, [id]);

    const handleSave = async (carData: Car, newImageFiles: File[], deletedImages: string[]) => {
        try {
            await AdminRepository.updateCar(carData.id, carData, newImageFiles, deletedImages);
            showToast("Машина обновлена");
        } catch {
            showToast("Ошибка при сохранении", "error");
        }
    };

    const handleDeleteCar = async () => {
        if (!car) return;
        try {
            await AdminRepository.deleteCar(car.id);
            router.push("/pages/catalog");
        } catch {
            showToast("Ошибка при удалении", "error");
        }
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
                    <>
                        <div className={styles.Review}>
                            <span className={styles.Title}>Отзыв покупателя:</span>
                            <MiniReview review={car.review} />
                        </div>
                    </>
                )}
                {toast && <Toast message={toast.message} type={toast.type} />}
            </div>
        </>
    );
}
