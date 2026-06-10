"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car } from "@/app/types/car";
import Image from "next/image";
import ScrollButton from "@/app/components/Buttons/ScrollButton";
import styles from "./CarCard.module.css";

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const router = useRouter();

    console.log("Car ID:", car.id, "Images:", car.images);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prevImage) => (prevImage === car.images.length - 1 ? 0 : prevImage + 1));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prevImage) => (prevImage === 0 ? car.images.length - 1 : prevImage - 1));
    };

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
    };

    return (
        <div className={styles.CarCard} onClick={() => router.push(`/pages/catalog/${car.id}`)}>
            <div className={styles.CarPhotos}>
                <ScrollButton direction="left" onClick={prevImage} />
                <Image
                    src={car.images[currentImage]}
                    alt={`${car.manufacturer} ${car.model}`}
                    fill
                    style={{ objectFit: "cover" }}
                />
                <ScrollButton direction="right" onClick={nextImage} />
            </div>
            <div className={styles.Description}>
                <span>
                    {car.manufacturer} {car.model}
                </span>
                <span>{formatPrice(car.price)} ₽</span>
                <span>
                    {car.year} г. {car.engineVolume} л.
                </span>
            </div>
        </div>
    );
}
