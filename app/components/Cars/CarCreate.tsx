"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Car } from "@/app/types/car";
import { AdminRepository } from "@/app/repositories/admin.repository";
import Image from "next/image";
import styles from "./CarDetail.module.css";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import DropDownInput from "@/app/components/Inputs/DropDownInput";
import { validateCar } from "@/app/utils/validateCar";
import { useToast } from "@/app/hooks/useToast";
import Toast from "@/app/components/Toast";
import { FilterRepository } from "@/app/repositories/filter.repository";
import { FilterOptions } from "@/app/types/filter";

export default function CarCreate() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<Car>({
        id: 0,
        manufacturer: "",
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
        soldAt: undefined,
        images: [],
    });

    const [activeImage, setActiveImage] = useState<string>("/DefaultImage.png");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast, showToast } = useToast();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

    useEffect(() => {
        FilterRepository.getFilters().then(setFilterOptions);
    }, []);

    const availableModels =
        filterOptions?.models
            .filter((m) => {
                const manufacturer = filterOptions.brands.find(
                    (b) => b.name === formData.manufacturer
                );
                return manufacturer ? m.manufacturerId === manufacturer.id : false;
            })
            .map((m) => m.name) ?? [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImageFiles((prev) => [...prev, ...files]);
        setImagePreviews((prev) => {
            const updated = [...prev, ...newPreviews];
            setActiveImage(updated[0]);
            return updated;
        });
    };

    const handleDeleteImage = (src: string) => {
        const index = imagePreviews.indexOf(src);
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
        const remaining = imagePreviews.filter((p) => p !== src);
        setImagePreviews(remaining);
        setActiveImage(remaining.length > 0 ? remaining[0] : "/DefaultImage.png");
    };

    const handleSubmit = async () => {
        const err = validateCar({ ...formData, images: imagePreviews });
        if (err) {
            setError(err);
            return;
        }
        setError("");
        try {
            await AdminRepository.createCar(formData, imageFiles);
            showToast("Машина добавлена");
            router.push("/pages/catalog");
        } catch {
            showToast("Ошибка при добавлении", "error");
        }
    };

    return (
        <div className={styles.Details}>
            <div className={styles.EditHeader}>
                <div className={styles.EditHeaderItem}>
                    <span>Марка</span>
                    <DropDownInput
                        options={filterOptions?.brands.map((b) => b.name) ?? []}
                        value={formData.manufacturer}
                        onChange={(val) =>
                            setFormData({ ...formData, manufacturer: val, model: "" })
                        }
                        placeholder="Марка"
                    />
                </div>
                <div className={styles.EditHeaderItem}>
                    <span>Модель</span>
                    <DropDownInput
                        options={availableModels}
                        value={formData.model}
                        onChange={(val) => setFormData({ ...formData, model: val })}
                        placeholder="Модель"
                    />
                </div>
                <div className={styles.EditHeaderItem}>
                    <span>Год</span>
                    <Input
                        type="number"
                        placeholder=""
                        value={formData.year}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                year: e.target.value ? parseInt(e.target.value) : 0,
                            })
                        }
                    />
                </div>
            </div>

            <div className={styles.Content}>
                <div className={styles.Photos}>
                    <div className={styles.ImageWrapper}>
                        <Image src={activeImage} alt="car" fill style={{ objectFit: "cover" }} />
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
                            placeholder=""
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value ? parseInt(e.target.value) : 0,
                                })
                            }
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Пробег</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="number"
                            placeholder=""
                            value={formData.mileage}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    mileage: e.target.value ? parseInt(e.target.value) : 0,
                                })
                            }
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Объем</span>
                        <span className={styles.Dots}></span>
                        <DropDownInput
                            options={
                                filterOptions?.engineVolumes.map((e) => e.volume.toString()) ?? []
                            }
                            value={formData.engineVolume.toString()}
                            onChange={(val) =>
                                setFormData({ ...formData, engineVolume: Number(val) })
                            }
                            placeholder="Объем"
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Цвет</span>
                        <span className={styles.Dots}></span>
                        <DropDownInput
                            options={filterOptions?.colors.map((c) => c.name) ?? []}
                            value={formData.color}
                            onChange={(val) => setFormData({ ...formData, color: val })}
                            placeholder="Цвет"
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>КПП</span>
                        <span className={styles.Dots}></span>
                        <DropDownInput
                            options={filterOptions?.transmissions ?? []}
                            value={formData.transmission}
                            onChange={(val) => setFormData({ ...formData, transmission: val })}
                            placeholder="КПП"
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Привод</span>
                        <span className={styles.Dots}></span>
                        <DropDownInput
                            options={filterOptions?.driveTypes ?? []}
                            value={formData.drive}
                            onChange={(val) => setFormData({ ...formData, drive: val })}
                            placeholder="Привод"
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Кузов</span>
                        <span className={styles.Dots}></span>
                        <Input
                            type="text"
                            placeholder=""
                            value={formData.vin}
                            onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                        />
                    </div>
                    <div className={styles.Row}>
                        <span className={styles.Label}>Статус</span>
                        <span className={styles.Dots}></span>
                        <DropDownInput
                            options={["Доступен", "Продан"]}
                            value={formData.isSold ? "Продан" : "Доступен"}
                            onChange={(val) =>
                                setFormData({ ...formData, isSold: val === "Продан" })
                            }
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
                                value={formData.soldAt ?? ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, soldAt: e.target.value })
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.Actions}>
                {error && <span className={styles.Error}>{error}</span>}
                <Button variant="Dark" type="button" onClick={handleSubmit}>
                    Добавить
                </Button>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
}
