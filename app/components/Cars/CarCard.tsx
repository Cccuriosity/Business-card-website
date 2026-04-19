"use client"

import {useState} from "react";
import Image from "next/image";
import ScrollButton from "@/app/components/Buttons/ScrollButton";
import styles from "./CarCard.module.css"

interface CarCardProps {
    images: string[]
    title: string
    price: number
    year: number
    engineVolume: number
    onClick?: () => void
}

export default function CarCard({images, title, price, year, engineVolume, onClick}: CarCardProps) {
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
        setCurrentImage((prevImage) =>
            prevImage === images.length - 1? 0 : prevImage + 1)
    }

    const prevImage = () => {
        setCurrentImage((prevImage) =>
            prevImage === 0? images.length - 1 : prevImage - 1)
    }

    return (
        <div className={styles.CarCard}>
            <div className={styles.CarPhotos}>
                <ScrollButton direction={"left"} onClick={() => prevImage()}></ScrollButton>
                <Image src={images[currentImage]} alt={"title"} width={200} height={150} />
                <ScrollButton direction={"right"} onClick={() => nextImage()}></ScrollButton>
            </div>
            <div className={styles.Description}>
                <span>{title}</span>
                <span>{price + " ₽"}</span>
                <span>{year + " г."} {engineVolume + " л."}</span>
            </div>
        </div>
    )
}
