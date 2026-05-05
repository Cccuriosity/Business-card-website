"use client"

import { useState } from "react"
import { Car } from "@/app/types/car"
import Image from "next/image"
import styles from "./CarDetail.module.css"
import Button from "@/app/components/Buttons/Button"
import Input from "@/app/components/Inputs/Input"
import DropDownInput from "@/app/components/Inputs/DropDownInput"

export default function CarCreate() {
    const [formData, setFormData] = useState<Car>({
        brand: "",
        model: "",
        year: 0,
        price: 0,
        mileage: 0,
        engineVolume: 0,
        color: "",
        transmission: "",
        drive: "",
        vin: "",
        isSold: false,
        soldAt: "",
        images: []
    })

    return (
        <div className={styles.Details}>
            <div className={styles.EditHeader}>
                <div className={styles.EditHeaderItem}>
                    <span>Марка</span>
                    <Input
                        type="text"
                        placeholder=""
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    />
                </div>
                <div className={styles.EditHeaderItem}>
                    <span>Модель</span>
                    <Input
                        type="text"
                        placeholder=""
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                    />
                </div>
                <div className={styles.EditHeaderItem}>
                    <span>Год</span>
                    <Input
                        type="number"
                        placeholder=""
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value ? parseInt(e.target.value) : 0})}
                    />
                </div>
            </div>

            <div className={styles.Content}>
                <div className={styles.Photos}>
                    <div className={styles.ImageWrapper}>
                        <Image
                            src={"/DefaultImage.png"}
                            alt="car"
                            width={240}
                            height={240}
                        />
                    </div>
                    <a href="#" className={styles.Link}>
                        Загрузить
                    </a>
                </div>

                <div className={styles.Info}>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Цена</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="number"
                            placeholder=""
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value ? parseInt(e.target.value) : 0})}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Пробег</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="number"
                            placeholder=""
                            value={formData.mileage}
                            onChange={(e) => setFormData({...formData, mileage: e.target.value ? parseInt(e.target.value) : 0})}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Объем</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="number"
                            placeholder=""
                            value={formData.engineVolume}
                            onChange={(e) => setFormData({...formData, engineVolume: e.target.value ? parseInt(e.target.value) : 0})}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Цвет</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="text"
                            placeholder=""
                            value={formData.color}
                            onChange={(e) => setFormData({...formData, color: e.target.value})}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>КПП</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="text"
                            placeholder=""
                            value={formData.transmission}
                            onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Привод</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="text"
                            placeholder=""
                            value={formData.drive}
                            onChange={(e) => setFormData({...formData, drive: e.target.value})}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Кузов</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="text"
                            placeholder=""
                            value={formData.vin}
                            onChange={(e) => setFormData({...formData, vin: e.target.value})}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Статус</span>
                        <span className={styles.Dots}></span>
                        <DropDownInput
                            options={['Доступен', 'Продан']}
                            value={formData.isSold ? 'Продан' : 'Доступен'}
                            onChange={(val) => setFormData({...formData, isSold: val === 'Продан'})}
                            placeholder=""
                        />
                    </div>
                    {formData.isSold && (
                        <div className={styles.Row}>
                            <span className={styles.Label}>Дата продажи</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="text"
                                placeholder=""
                                value={formData.soldAt}
                                onChange={(e) => setFormData({...formData, soldAt: e.target.value})}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.Actions}>
                <Button variant={"Dark"}>
                    Добавить
                </Button>
            </div>
        </div>
    )
}