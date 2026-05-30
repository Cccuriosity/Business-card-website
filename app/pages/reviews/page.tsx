"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import styles from "./ReviewsPage.module.css";
import ReviewForm from "@/app/components/Review/ReviewForm";
import SortMenu, { SortType, SortOrder } from "@/app/components/SortMenu";
import FullReview from "@/app/components/Review/FullReview";
import PhoneBanner from "@/app/components/PhoneBanner";
import { ReviewRepository } from "@/app/repositories/review.repository";
import { Review } from "@/app/types/review";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [orders, setOrders] = useState<Record<SortType, SortOrder>>({
        date: "desc",
        rating: "desc",
    });

    const loadReviews = () => {
        ReviewRepository.getReviews().then(setReviews);
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const sortedReviews = [...reviews]
        .sort((a, b) => {
            if (orders.date === "asc") return a.createdAt.localeCompare(b.createdAt);
            return b.createdAt.localeCompare(a.createdAt);
        })
        .sort((a, b) => {
            if (orders.rating === "asc") return a.rating - b.rating;
            return b.rating - a.rating;
        });

    return (
        <>
            <Header />
            <PhoneBanner number={"+79025223190"} />
            <div className={styles.ReviewsPage}>
                <ReviewForm onSubmit={loadReviews} />
                <SortMenu orders={orders} onSort={setOrders} />
                <div className={styles.ReviewsList}>
                    {sortedReviews.map((review) => (
                        <FullReview key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </>
    );
}
