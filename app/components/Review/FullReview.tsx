import Image from "next/image"
import { Review } from "@/app/types/review";
import styles from "./FullReview.module.css"

interface FullReviewProps {
    review: Review;
}

export default function FullReview({review}: FullReviewProps) {
    return (
        <div className={styles.Review}>
            <div className={styles.Header}>
                <div className={styles.User}>
                    <div className={styles.Avatar}>
                        <Image src={review.user.avatar} alt={"Аватар"} width={40} height={40}/>
                    </div>
                    <span>{review.user.firstName} {review.user.lastName}</span>
                </div>
                <span className={styles.Date}>{review.date}</span>
            </div>

            <div className={styles.Stars}>
                {[...Array(5)].map((_, i) => (
                    <Image
                        key={i}
                        src={i < review.stars ? "/GoldStar.png" : "/GrayStar.png"}
                        alt={"star"}
                        width={35}
                        height={35}
                    />
                ))}
            </div>
            <div className={styles.Comment}>
                {review.content}
            </div>
            <div className={styles.Footer}>
                <div className={styles.Divider}/>
                Купил(а) {review.car.brand} {review.car.model}
            </div>
        </div>
    )
}
