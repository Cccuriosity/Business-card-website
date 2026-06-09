/* eslint-disable react-hooks/set-state-in-effect */
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
import { useToast } from "@/app/hooks/useToast";
import Toast from "@/app/components/Toast";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [user, setUser] = useState<User | null>(null);

    const [dateOrder, setDateOrder] = useState<"asc" | "desc">("desc");
    const [ratingOrder, setRatingOrder] = useState<"asc" | "desc">("desc");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const { toast, showToast } = useToast();

    const loaderRef = useInfiniteScroll(() => setPage((prev) => prev + 1), hasMore, loading);

    useEffect(() => {
        UserRepository.getProfile()
            .then(setUser)
            .catch(() => setUser(null));
    }, []);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
    }, [dateOrder, ratingOrder]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        ReviewRepository.getReviews({
            date_order: dateOrder,
            rating_order: ratingOrder,
            page,
            limit: 10,
        })
            .then((newReviews) => {
                if (cancelled) return;

                // Если вернули меньше 10, значит это последняя страница
                if (newReviews.length < 10) {
                    setHasMore(false);
                }

                setReviews((prev) => (page === 1 ? newReviews : [...prev, ...newReviews]));
            })
            .catch(() => {
                if (!cancelled) {
                    showToast("Ошибка загрузки отзывов", "error");
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [page, dateOrder, ratingOrder, showToast]);

    const handleReviewSubmit = () => {
        UserRepository.getProfile()
            .then(setUser)
            .catch(() => setUser(null));

        setPage(1);
        setHasMore(true);

        showToast("Отзыв отправлен");
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
            <PhoneBanner number="+79025223190" />

            <div className={styles.ReviewsPage}>
                <ReviewForm
                    onSubmit={handleReviewSubmit}
                    availableLots={availableLots}
                    authorized={!!user}
                />

                {toast && <Toast message={toast.message} type={toast.type} />}

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

                <div ref={loaderRef} style={{ height: "1px" }} />

                {loading && <div style={{ textAlign: "center", padding: "1rem" }}>Загрузка...</div>}
            </div>
        </>
    );
}
