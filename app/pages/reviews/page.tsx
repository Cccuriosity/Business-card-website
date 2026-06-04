"use client";

import { useState, useEffect, useCallback } from "react";
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
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { toast, showToast } = useToast();

    const loadUser = useCallback(() => {
        UserRepository.getProfile()
            .then(setUser)
            .catch(() => setUser(null));
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const loadReviews = useCallback(
        async (targetPage: number, replace = false) => {
            if (loading) return;

            try {
                setLoading(true);

                const newReviews = await ReviewRepository.getReviews({
                    date_order: dateOrder,
                    rating_order: ratingOrder,
                    page: targetPage,
                    limit: 10,
                });

                setHasMore(newReviews.length === 10);

                setReviews((prev) => (replace ? newReviews : [...prev, ...newReviews]));
            } catch {
                showToast("Ошибка загрузки отзывов", "error");
            } finally {
                setLoading(false);
                setIsRefreshing(false);
            }
        },
        [dateOrder, ratingOrder, loading, showToast]
    );

    useEffect(() => {
        loadReviews(page, page === 1);
    }, [page, loadReviews]);

    const handleSortChange = (newDateOrder: "asc" | "desc", newRatingOrder: "asc" | "desc") => {
        setIsRefreshing(true);

        setDateOrder(newDateOrder);
        setRatingOrder(newRatingOrder);

        setPage(1);
        setHasMore(true);
    };

    useEffect(() => {
        if (!isRefreshing) return;

        loadReviews(1, true);
    }, [dateOrder, ratingOrder]);

    const loaderRef = useInfiniteScroll(
        () => setPage((prev) => prev + 1),
        hasMore,
        loading || isRefreshing
    );

    const handleReviewSubmit = () => {
        loadUser();

        setPage(1);
        setHasMore(true);

        loadReviews(1, true);

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
                    onDateOrder={(value) => handleSortChange(value, ratingOrder)}
                    onRatingOrder={(value) => handleSortChange(dateOrder, value)}
                />

                <div
                    className={styles.ReviewsList}
                    style={{
                        opacity: isRefreshing ? 0.6 : 1,
                        transition: "opacity 0.2s",
                    }}
                >
                    {reviews.map((review) => (
                        <FullReview key={review.id} review={review} />
                    ))}
                </div>

                <div ref={loaderRef} style={{ height: 1 }} />

                {(loading || isRefreshing) && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "1rem",
                        }}
                    >
                        Загрузка...
                    </div>
                )}
            </div>
        </>
    );
}
