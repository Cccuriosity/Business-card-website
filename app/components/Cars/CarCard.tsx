"use client"

import {useState} from "react"
import { Car } from "@/app/types/car"
import Image from "next/image"
import ScrollButton from "@/app/components/Buttons/ScrollButton"
import styles from "./CarCard.module.css"

interface CarCardProps {
    car: Car;
    onClick?: () => void;
}

export default function CarCard({car, onClick}: CarCardProps) {
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
        setCurrentImage((prevImage) =>
            prevImage === car.images.length - 1? 0 : prevImage + 1)
    }

    const prevImage = () => {
        setCurrentImage((prevImage) =>
            prevImage === 0? car.images.length - 1 : prevImage - 1)
    }

    return (
        <div className={styles.CarCard}>
            <div className={styles.CarPhotos}>
                <ScrollButton direction={"left"} onClick={prevImage}></ScrollButton>
                <Image src={car.images[currentImage]} alt={"title"} width={200} height={150} />
                <ScrollButton direction={"right"} onClick={nextImage}></ScrollButton>
            </div>
            <div className={styles.Description}>
                <span>{car.brand}{car.model}</span>
                <span>{car.price} ₽</span>
                <span>{car.year} г. {car.engineVolume} л.</span>
            </div>
        </div>
    )
}
