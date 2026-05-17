"use client"

import { useState } from "react"
import { Car } from "@/app/types/car"
import Image from "next/image"
import styles from "./CarDetail.module.css"
import Button from "@/app/components/Buttons/Button"
import Input from "@/app/components/Inputs/Input"
import DropDownInput from "@/app/components/Inputs/DropDownInput"

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
    car: Car
    isAdmin?: boolean
    onSave?: (carData: Car) => void
    onDelete?: () => void
}

export default function CarDetail({ car, isAdmin = false, onSave, onDelete }: CarDetailProps) {

    const [activeImage, setActiveImage] = useState( car.images[0] )
    const [isEditMode, setIsEditMode] = useState( false )
    const [editData, setEditData] = useState<Car>( {...car} )
    const handleEdit = () => { setIsEditMode( true ); setEditData( {...car} ) }
    const handleCancel = () => { setIsEditMode( false ) }
    const handleSave = () => { onSave?.( editData ); setIsEditMode( false ) }
    const handleDelete = () => {
        if ( confirm( 'Вы уверены, что хотите удалить этот автомобиль?' ) ) {
            onDelete?.()
        }
    }
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
    }

    if (isEditMode) {
        return (
            <div className={styles.Details}>
                <div className={styles.EditHeader}>
                    <div className={styles.EditHeaderItem}>
                        <span>Марка</span>
                        <Input
                            type="text"
                            placeholder={""}
                            value={editData.brand}
                            onChange={(e) => setEditData({...editData, brand: e.target.value})}
                        />
                    </div>
                    <div className={styles.EditHeaderItem}>
                        <span>Модель</span>
                        <Input
                            type="text"
                            placeholder={""}
                            value={editData.model}
                            onChange={(e) => setEditData({...editData, model: e.target.value})}
                        />
                    </div>
                    <div className={styles.EditHeaderItem}>
                        <span>Год</span>
                        <Input
                            type="number"
                            placeholder={""}
                            value={editData.year}
                            onChange={(e) => setEditData({...editData, year: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                <div className={styles.Content}>
                    <div className={styles.Photos}>
                        <div className={styles.ImageWrapper}>
                            <Image
                                src={activeImage}
                                alt="car"
                                width={640}
                                height={480}
                            />
                        </div>
                        <div className={styles.Miniatures}>
                            {car.images.map((imgSrc, index) => (
                                <div
                                    key={imgSrc + index}
                                    onClick={() => setActiveImage(imgSrc)}
                                    className={activeImage === imgSrc ? styles.Active : ''}
                                >
                                    <Image
                                        src={imgSrc}
                                        alt={`thumb-${index}`}
                                        width={208}
                                        height={156}
                                    />
                                </div>
                            ))}
                        </div>
                        <a href={""} className={styles.Link}> Загрузить </a>
                    </div>

                    <div className={styles.Info}>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Цена</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="number"
                                placeholder={""}
                                value={editData.price}
                                onChange={(e) => setEditData({...editData, price: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Пробег</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="number"
                                placeholder={""}
                                value={editData.mileage}
                                onChange={(e) => setEditData({...editData, mileage: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Объем</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="number"
                                placeholder={""}
                                value={editData.engineVolume}
                                onChange={(e) => setEditData({...editData, engineVolume: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Цвет</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="string"
                                placeholder={""}
                                value={editData.color}
                                onChange={(e) => setEditData({...editData, color: e.target.value})}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>КПП</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="string"
                                placeholder={""}
                                value={editData.transmission}
                                onChange={(e) => setEditData({...editData, transmission: e.target.value})}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Привод</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="string"
                                placeholder={""}
                                value={editData.drive}
                                onChange={(e) => setEditData({...editData, drive: e.target.value})}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Кузов</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="string"
                                placeholder={""}
                                value={editData.vin}
                                onChange={(e) => setEditData({...editData, vin: e.target.value})}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Статус</span>
                            <span className={styles.Dots}></span>
                            <DropDownInput
                                options={['Доступен', 'Продан']}
                                value={editData.isSold ? 'Продан' : 'Доступен'}
                                onChange={(val) => setEditData({...editData, isSold: val === 'Продан'})}
                                placeholder=""
                            />
                        </div>
                        {editData.isSold && (
                            <div className={styles.Row}>
                                <span className={styles.Label}>Дата продажи</span>
                                <span className={styles.Dots}></span>
                                <Input
                                    type="string"
                                    placeholder={""}
                                    value={editData.soldAt}
                                    onChange={(e) => setEditData({...editData, soldAt: e.target.value})}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.AdminActions}>
                    <Button variant={"Light"} onClick={handleCancel}>
                        Отмена
                    </Button>
                    <Button variant={"Dark"} onClick={handleSave}>
                        Сохранить
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.Details}>
            <div className={styles.Title}>
                {car.brand} {car.model} {car.year}
            </div>
            <div className={styles.Content}>
                <div className={styles.Photos}>
                    <Image
                        src={activeImage}
                        alt="car"
                        width={640}
                        height={480}
                    />
                    <div className={styles.Miniatures}>
                        {car.images.map((imgSrc, index) => (
                            <div
                                key={imgSrc + index}
                                onClick={() => setActiveImage(imgSrc)}
                                className={activeImage === imgSrc ? styles.Active : ''}
                            >
                                <Image
                                    src={imgSrc}
                                    alt={`thumb-${index}`}
                                    width={208}
                                    height={156}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.Info}>
                    <div className={styles.Price}>
                        {formatPrice(car.price)}
                    </div>
                    <InfoRow label="Пробег" value={`${car.mileage} км`} />
                    <InfoRow label="Объем" value={`${car.engineVolume}`} />
                    <InfoRow label="Цвет" value={car.color} />
                    <InfoRow label="КПП" value={car.transmission} />
                    <InfoRow label="Привод" value={car.drive} />
                    <InfoRow label="Кузов" value={car.vin} />
                </div>
            </div>

            {car.isSold && (
                <>
                    <div className={styles.SoldBar}/>
                    <span className={styles.Date}>Дата продажи: {car.soldAt}</span>
                </>
            )}

            {isAdmin && (
                <div className={styles.AdminActions}>
                    <Button variant={"Dark"} onClick={handleEdit}>
                        Редактировать
                    </Button>
                    <Button variant={"Light"} onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            )}
        </div>
    );
}
