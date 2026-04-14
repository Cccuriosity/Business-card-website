"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "./CarDetail.module.css"

type CarImage = {
    id: string
    src: string
}

function InfoRow({label, value,}: { label: string; value: string; }) {
    return (
        <div className={styles.Row}>
            <span className={styles.Label}>{label}</span>
            <span className={styles.Dots}></span>
            <span className={styles.Value}>{value}</span>
        </div>
    )
}

interface CarDetailProps {
    brand: string
    model: string
    year: number

    price: number
    mileage: number
    engineVolume: number
    color: string
    transmission: string
    drive: string
    vin: string

    images: CarImage[]

    isSold?: boolean
    soldAt?: string
}

export default function CarDetail({brand, model, year, price, mileage, engineVolume, color, transmission,
                                      drive, vin, images, isSold = false, soldAt}: CarDetailProps) {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className={styles.Details}>
            <div className={styles.Title}>
                {brand} {model} {year}
            </div>
            <div className={styles.Content}>
                <div className={styles.Photos}>
                    <Image
                        src={activeImage.src}
                        alt="car"
                        width={320}
                        height={240}
                    />
                    <div className={styles.Miniatures}>
                        {images.map((img) => (
                            <div key={img.id} onClick={() => setActiveImage(img)}>
                                <Image src={img.src} alt="thumb" width={104} height={78}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.Info}>
                    <div className={styles.Price}>
                        {price + " ₽"}
                    </div>
                    <InfoRow label="Пробег" value={`${mileage} км`} />
                    <InfoRow label="Объем" value={`${engineVolume}`} />
                    <InfoRow label="Цвет" value={color} />
                    <InfoRow label="КПП" value={transmission} />
                    <InfoRow label="Привод" value={drive} />
                    <InfoRow label="Кузов" value={vin} />
                </div>
            </div>

            {isSold && (
                <>
                    <div className={styles.SoldBar}/>
                    <span className={styles.Date}>Дата продажи: {soldAt}</span>
                </>
            )}
        </div>
    );
}