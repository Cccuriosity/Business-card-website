import Image from "next/image";
import styles from "./MiniReview.module.css"
import { Review } from "@/app/types/review";

interface ReviewProps {
    review: Review;
}

export default function MiniReview({ review }: ReviewProps) {
    return (
        <div className={styles.Review}>
            <div className={styles.User}>
                <div className={styles.Avatar}>
                    <Image src={review.user.avatar} alt={"Аватар"} width={30} height={30}/>
                </div>
                <span>{review.user.firstName} {review.user.lastName}</span>
            </div>
            <div className={styles.Stars}>
                {[...Array(5)].map((_, i) => (
                    <Image key={i} src={i < review.stars? "/GoldStar.png" : "/GrayStar.png"} alt={"star"} width={20} height={20} />
                ))}
            </div>
            <div className={styles.Comment}>
                {review.content}
            </div>
            <div className={styles.Date}>
                {review.date}
            </div>
        </div>
    )
}
