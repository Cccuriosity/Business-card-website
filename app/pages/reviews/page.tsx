import Header from "@/app/components/Header";
import styles from './ReviewsPage.module.css'
import ReviewForm from "@/app/components/Review/ReviewForm";
import SortMenu from "@/app/components/SortMenu";
import FullReview from "@/app/components/Review/FullReview";

const Reviews = [
    {
        avatar: "/ProfileWhite.png",
        userName: "Анна Петрова",
        stars: 5,
        review: "Отличный сервис, всё понравилось!",
        date: "12.04.2026",
        footerText: "Купила BMW X5"
    },
    {
        avatar: "/ProfileWhite.png",
        userName: "Сергей Иванов",
        stars: 4,
        review: "Хорошая консультация, но долго ждал звонка",
        date: "10.04.2026",
        footerText: "Консультация по Kia K5"
    }
];

export default function ReviewsPage() {
    return (
        <>
            <Header/>
            <div className={styles.ReviewsPage}>
                <ReviewForm/>
                <SortMenu/>
                <div className={styles.ReviewsList}>
                    {Reviews.map((review, index) => (
                        <FullReview key={index} {...review} />
                    ))}
                </div>
            </div>
        </>
    )
}