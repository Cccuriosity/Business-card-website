"use client";

import { useState, useRef, useEffect } from "react";
import { Car } from "@/app/types/car";
import Image from "next/image";
import styles from "./CarDetail.module.css";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import DropDownInput from "@/app/components/Inputs/DropDownInput";
import { validateCar } from "@/app/utils/validateCar";
import { FilterRepository } from "@/app/repositories/filter.repository";
import { FilterOptions } from "@/app/types/filter";

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className={styles.Row}>
            <span className={styles.Label}>{label}</span>
            <span className={styles.Dots}></span>
            <span className={styles.Value}>{value}</span>
        </div>
    );
}

interface CarDetailProps {
    car: Car;
    isAdmin?: boolean;
    onSave?: (carData: Car, newImageFiles: File[], deletedImages: string[]) => void | Promise<void>;
    onDelete?: () => void;
}

export default function CarDetail({ car, isAdmin = false, onSave, onDelete }: CarDetailProps) {
    const [activeImage, setActiveImage] = useState(car.images[0]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState<Car>({ ...car });
    const [error, setError] = useState("");
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>(car.images);
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setImagePreviews(car.images);
        setActiveImage(car.images[0]);
        setNewImageFiles([]);
        setDeletedImages([]);
    }, [car]);

    useEffect(() => {
        FilterRepository.getFilters().then(setFilterOptions);
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEdit = () => {
        setIsEditMode(true);
        setEditData({ ...car });
        setImagePreviews(car.images);
        setActiveImage(car.images[0]);
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setImagePreviews(car.images);
        setActiveImage(car.images[0]);
    };

    const handleSave = async () => {
        const err = validateCar({ ...editData, images: imagePreviews });
        if (err) {
            setError(err);
            return;
        }
        setError("");

        await onSave?.({ ...editData, images: imagePreviews }, newImageFiles, deletedImages);

        setIsEditMode(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const newPreviews = files.map((file) => URL.createObjectURL(file));

        const shouldUpdateActive =
            imagePreviews.length === 0 || activeImage === "/DefaultImage.png";

        setNewImageFiles((prev) => [...prev, ...files]);
        setImagePreviews((prev) => [...prev, ...newPreviews]);

        if (shouldUpdateActive) {
            setActiveImage(newPreviews[0]);
        }
    };

    const handleDelete = () => {
        if (confirm("Вы уверены, что хотите удалить этот автомобиль?")) {
            onDelete?.();
        }
    };

    const handleDeleteImage = (src: string) => {
        if (car.images.includes(src)) {
            setDeletedImages((prev) => [...prev, src]);
        } else {
            const index = imagePreviews.indexOf(src);
            setNewImageFiles((prev) =>
                prev.filter((_, i) => i !== index - car.images.length + deletedImages.length)
            );
        }
        const remaining = imagePreviews.filter((p) => p !== src);
        setImagePreviews(remaining);
        setActiveImage(remaining.length > 0 ? remaining[0] : "/DefaultImage.png");
    };

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
    };

    const availableModels =
        filterOptions?.models
            .filter((m) => {
                const manufacturer = filterOptions.brands.find(
                    (b) => b.name === editData.manufacturer
                );
                return manufacturer ? m.manufacturerId === manufacturer.id : false;
            })
            .map((m) => m.name) ?? [];

    if (isEditMode) {
        return (
            <div className={styles.Details}>
                <div className={styles.EditHeader}>
                    <div className={styles.EditHeaderItem}>
                        <span>Марка</span>
                        <DropDownInput
                            options={filterOptions?.brands.map((b) => b.name) ?? []}
                            value={editData.manufacturer}
                            onChange={(val) =>
                                setEditData({ ...editData, manufacturer: val, model: "" })
                            }
                            placeholder="Марка"
                        />
                    </div>
                    <div className={styles.EditHeaderItem}>
                        <span>Модель</span>
                        <DropDownInput
                            options={availableModels}
                            value={editData.model}
                            onChange={(val) => setEditData({ ...editData, model: val })}
                            placeholder="Модель"
                        />
                    </div>
                    <div className={styles.EditHeaderItem}>
                        <span>Год</span>
                        <Input
                            type="number"
                            placeholder={""}
                            value={editData.year}
                            onChange={(e) =>
                                setEditData({ ...editData, year: parseInt(e.target.value) })
                            }
                        />
                    </div>
                </div>

                <div className={styles.Content}>
                    <div className={styles.Photos}>
                        <div className={styles.ImageWrapper}>
                            <Image
                                src={activeImage}
                                alt="car"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className={styles.Miniatures}>
                                {imagePreviews.map((src, index) => (
                                    <div
                                        key={src + index}
                                        className={`${styles.Miniature} ${activeImage === src ? styles.Active : ""}`}
                                    >
                                        <Image
                                            src={src}
                                            alt={`thumb-${index}`}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            onClick={() => setActiveImage(src)}
                                        />
                                        <button
                                            className={styles.Delete}
                                            onClick={() => handleDeleteImage(src)}
                                        >
                                            <Image
                                                src={"/close.png"}
                                                alt={"close"}
                                                width={10}
                                                height={10}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <a
                            onClick={() => fileInputRef.current?.click()}
                            className={styles.Link}
                            style={{ cursor: "pointer" }}
                        >
                            Загрузить
                        </a>
                    </div>

                    <div className={styles.Info}>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Цена</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="number"
                                placeholder={""}
                                value={editData.price}
                                onChange={(e) =>
                                    setEditData({ ...editData, price: parseInt(e.target.value) })
                                }
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Пробег</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="number"
                                placeholder={""}
                                value={editData.mileage}
                                onChange={(e) =>
                                    setEditData({ ...editData, mileage: parseInt(e.target.value) })
                                }
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Объем</span>
                            <span className={styles.Dots}></span>
                            <DropDownInput
                                options={
                                    filterOptions?.engineVolumes.map((e) => e.volume.toString()) ??
                                    []
                                }
                                value={editData.engineVolume.toString()}
                                onChange={(val) =>
                                    setEditData({ ...editData, engineVolume: Number(val) })
                                }
                                placeholder="Объем"
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Цвет</span>
                            <span className={styles.Dots}></span>
                            <DropDownInput
                                options={filterOptions?.colors.map((c) => c.name) ?? []}
                                value={editData.color}
                                onChange={(val) => setEditData({ ...editData, color: val })}
                                placeholder="Цвет"
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>КПП</span>
                            <span className={styles.Dots}></span>
                            <DropDownInput
                                options={filterOptions?.transmissions ?? []}
                                value={editData.transmission}
                                onChange={(val) => setEditData({ ...editData, transmission: val })}
                                placeholder="КПП"
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Привод</span>
                            <span className={styles.Dots}></span>
                            <DropDownInput
                                options={filterOptions?.driveTypes ?? []}
                                value={editData.drive}
                                onChange={(val) => setEditData({ ...editData, drive: val })}
                                placeholder="Привод"
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Кузов</span>
                            <span className={styles.Dots}></span>
                            <Input
                                type="string"
                                placeholder={""}
                                value={editData.vin}
                                onChange={(e) => setEditData({ ...editData, vin: e.target.value })}
                            />
                        </div>
                        <div className={styles.Row}>
                            <span className={styles.Label}>Статус</span>
                            <span className={styles.Dots}></span>
                            <DropDownInput
                                options={["Доступен", "Продан"]}
                                value={editData.isSold ? "Продан" : "Доступен"}
                                onChange={(val) =>
                                    setEditData({ ...editData, isSold: val === "Продан" })
                                }
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
                                    onChange={(e) =>
                                        setEditData({ ...editData, soldAt: e.target.value })
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
                {error && <span className={styles.Error}>{error}</span>}
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
                {car.manufacturer} {car.model} {car.year}
            </div>
            <div className={styles.Content}>
                <div className={styles.Photos}>
                    <div className={styles.ImageWrapper}>
                        <Image src={activeImage} alt="car" fill style={{ objectFit: "cover" }} />
                    </div>
                    <div className={styles.Miniatures}>
                        {car.images.map((imgSrc, index) => (
                            <div
                                key={imgSrc + index}
                                onClick={() => setActiveImage(imgSrc)}
                                className={`${styles.Miniature} ${activeImage === imgSrc ? styles.Active : ""}`}
                            >
                                <Image
                                    src={imgSrc}
                                    alt={`thumb-${index}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.Info}>
                    <div className={styles.Price}>{formatPrice(car.price)}</div>
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
                    <div className={styles.SoldBar} />
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
