"use client";

import { useState } from "react";
import styles from "./ReviewForm.module.css";
import Button from "@/app/components/Buttons/Button";
import Image from "next/image";
import TextArea from "@/app/components/Inputs/TextArea";
import { ReviewRepository } from "@/app/repositories/review.repository";

interface ReviewFormProps {
    onSubmit: () => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (!rating || !comment) return;
        await ReviewRepository.createReview({ rating, comment });
        setRating(0);
        setComment("");
        onSubmit?.();
    };

    return (
        <form className={styles.ReviewForm}>
            <span className={styles.Title}>Приобрели авто из Японии? Оставьте отзыв!</span>
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
