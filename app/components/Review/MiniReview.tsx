import Image from "next/image";
import styles from "./MiniReview.module.css";
import { Review } from "@/app/types/review";

interface ReviewProps {
    review: Review;
}

export default function MiniReview({ review }: ReviewProps) {
    return (
        <div className={styles.Review}>
            <div className={styles.User}>
                <div className={styles.Avatar}>
                    <Image
                        src={review.avatarUrl ?? "/ProfileWhite.png"}
                        alt="Аватар"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <span>
                    {review.authorName} {review.authorLastName}
                </span>
            </div>
            <div className={styles.Stars}>
                {[...Array(5)].map((_, i) => (
                    <Image
                        key={i}
                        src={i < review.rating ? "/GoldStar.png" : "/GrayStar.png"}
                        alt="star"
                        width={20}
                        height={20}
                    />
                ))}
            </div>
            <div className={styles.Comment}>{review.comment}</div>
            <div className={styles.Date}>{review.createdAt}</div>
        </div>
    );
}
