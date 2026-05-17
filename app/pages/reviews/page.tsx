import Header from "@/app/components/Header";
import styles from './ReviewsPage.module.css'
import ReviewForm from "@/app/components/Review/ReviewForm";
import SortMenu from "@/app/components/SortMenu";
import FullReview from "@/app/components/Review/FullReview";
import { mockReviews } from "@/app/mocks/reviews";
import PhoneBanner from "@/app/components/PhoneBanner";

export default function ReviewsPage() {
    return (
        <>
            <Header/>
            <PhoneBanner number={"+79025223190"}/>
            <div className={styles.ReviewsPage}>
                <ReviewForm/>
                <SortMenu/>
                <div className={styles.ReviewsList}>
                    {mockReviews.map((review, index) => (
                        <FullReview key={index} review={review}/>
                    ))}
                </div>
            </div>
        </>
    )
}
