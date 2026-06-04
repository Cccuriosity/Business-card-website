"use client";

import { useState } from "react";
import styles from "./ReviewForm.module.css";
import Button from "@/app/components/Buttons/Button";
import Image from "next/image";
import TextArea from "@/app/components/Inputs/TextArea";
import { ReviewRepository } from "@/app/repositories/review.repository";
import DropDownInput from "@/app/components/Inputs/DropDownInput";
import Input from "@/app/components/Inputs/Input";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
    onSubmit: () => void;
    availableLots?: { id: number; label: string }[];
    authorized?: boolean;
}

export default function ReviewForm({
    onSubmit,
    availableLots = [],
    authorized = false,
}: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [lotId, setLotId] = useState<number | null>(
        availableLots.length === 1 ? availableLots[0].id : null
    );
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        const resolvedLotId = availableLots.length === 1 ? availableLots[0].id : lotId;

        if (!resolvedLotId) {
            setError("Выберите автомобиль");
            return;
        }
        if (!rating) {
            setError("Выберите оценку");
            return;
        }
        if (!comment.trim()) {
            setError("Напишите комментарий");
            return;
        }

        setError("");
        try {
            await ReviewRepository.createReview({ lot_id: resolvedLotId, rating, comment });
            setRating(0);
            setComment("");
            onSubmit?.();
        } catch (err) {
            setError("Ошибка при отправке отзыва");
            console.error(err);
        }
    };

    if (!authorized) {
        return (
            <div className={styles.ReviewForm}>
                <span className={styles.Title}>Приобрели авто из Японии? Оставьте отзыв!</span>
                <span>
                    Чтобы оставить отзыв необходимо{" "}
                    <span className={styles.Link} onClick={() => router.push("/")}>
                        авторизоваться
                    </span>
                </span>
            </div>
        );
    }

    if (!availableLots.length) {
        return (
            <div className={styles.ReviewForm}>
                <span className={styles.Title}>Приобрели авто из Японии? Оставьте отзыв!</span>
                <span>Отзыв можно оставить только после завершения сделки</span>
            </div>
        );
    }

    return (
        <form className={styles.ReviewForm}>
            <span className={styles.Title}>Приобрели авто из Японии? Оставьте отзыв!</span>
            {availableLots.length === 1 ? (
                <div className={styles.LotSelect}>
                    <Input
                        type="text"
                        value={availableLots[0].label}
                        placeholder=""
                        onChange={() => {}}
                        readOnly
                    />
                </div>
            ) : (
                <div className={styles.LotSelect}>
                    <DropDownInput
                        options={availableLots.map((l) => l.label)}
                        value={availableLots.find((l) => l.id === lotId)?.label ?? ""}
                        onChange={(val) =>
                            setLotId(availableLots.find((l) => l.label === val)?.id ?? null)
                        }
                        placeholder="Выберите автомобиль"
                    />
                </div>
            )}
            <div className={styles.Stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={styles.Star}
                    >
                        <Image
                            src={
                                star <= (hoverRating || rating) ? "/GoldStar.png" : "/GrayStar.png"
                            }
                            alt="star"
                            width={45}
                            height={45}
                        />
                    </button>
                ))}
            </div>
            <TextArea
                placeholder="Расскажите о своем впечатлении"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {error && <span className={styles.Error}>{error}</span>}
            <Button variant="Dark" type="button" onClick={handleSubmit}>
                Оставить отзыв
            </Button>
        </form>
    );
}
