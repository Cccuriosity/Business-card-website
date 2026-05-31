"use client";

import { useState } from "react";
import styles from "./ReviewForm.module.css";
import Button from "@/app/components/Buttons/Button";
import Image from "next/image";
import TextArea from "@/app/components/Inputs/TextArea";
import { ReviewRepository } from "@/app/repositories/review.repository";
import DropDownInput from "@/app/components/Inputs/DropDownInput";

interface ReviewFormProps {
    onSubmit: () => void;
    availableLots?: { id: number; label: string }[];
}

export default function ReviewForm({ onSubmit, availableLots = [] }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [lotId, setLotId] = useState<number | null>(null);

    const handleSubmit = async () => {
        if (!rating || !comment || !lotId) return;
        await ReviewRepository.createReview({ lot_id: lotId, rating, comment });
        setRating(0);
        setComment("");
        onSubmit?.();
    };

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
            <div className={styles.LotSelect}>
                <DropDownInput
                    options={availableLots.map((l) => l.label)}
                    value={availableLots.find((l) => l.id === lotId)?.label ?? ""}
                    onChange={(val) => {
                        const lot = availableLots.find((l) => l.label === val);
                        setLotId(lot?.id ?? null);
                    }}
                    placeholder="Выберите автомобиль"
                />
            </div>
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
            <Button variant="Dark" type="button" onClick={handleSubmit}>
                Оставить отзыв
            </Button>
        </form>
    );
}
