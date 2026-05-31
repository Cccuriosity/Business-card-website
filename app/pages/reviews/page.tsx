"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import styles from "./ReviewsPage.module.css";
import ReviewForm from "@/app/components/Review/ReviewForm";
import SortMenu from "@/app/components/SortMenu";
import FullReview from "@/app/components/Review/FullReview";
import PhoneBanner from "@/app/components/PhoneBanner";
import { ReviewRepository } from "@/app/repositories/review.repository";
import { Review } from "@/app/types/review";
import { User } from "@/app/types/user";
import { UserRepository } from "@/app/repositories/user.repository";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [dateOrder, setDateOrder] = useState<"asc" | "desc">("desc");
    const [ratingOrder, setRatingOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        UserRepository.getProfile()
            .then(setUser)
            .catch(() => setUser(null));
    }, []);

    useEffect(() => {
        ReviewRepository.getReviews({ date_order: dateOrder, rating_order: ratingOrder }).then(
            setReviews
        );
    }, [dateOrder, ratingOrder]);

    const loadReviews = () => {
        ReviewRepository.getReviews({ date_order: dateOrder, rating_order: ratingOrder }).then(
            setReviews
        );
    };

    const availableLots =
        user?.requests
            ?.filter((r) => r.isSolved && r.lot)
            .map((r) => ({
                id: r.lot!.id,
                label: `${r.lot!.manufacturer} ${r.lot!.model} ${r.lot!.year}`,
            })) ?? [];

    return (
        <>
            <Header />
            <PhoneBanner number={"+79025223190"} />
            <div className={styles.ReviewsPage}>
                <ReviewForm onSubmit={loadReviews} availableLots={availableLots} />
                <SortMenu
                    dateOrder={dateOrder}
                    ratingOrder={ratingOrder}
                    onDateOrder={setDateOrder}
                    onRatingOrder={setRatingOrder}
                />
                <div className={styles.ReviewsList}>
                    {reviews.map((review) => (
                        <FullReview key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </>
    );
}
