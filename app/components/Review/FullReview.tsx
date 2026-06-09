import Image from "next/image";
import { Review } from "@/app/types/review";
import { useRouter } from "next/navigation";
import styles from "./FullReview.module.css";

interface FullReviewProps {
    review: Review;
}

export default function FullReview({ review }: FullReviewProps) {
    const router = useRouter();
    return (
        <div className={styles.Review}>
            <div className={styles.Header}>
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
                <span className={styles.Date}>{review.createdAt}</span>
            </div>

            <div className={styles.Stars}>
                {[...Array(5)].map((_, i) => (
                    <Image
                        key={i}
                        src={i < review.rating ? "/GoldStar.png" : "/GrayStar.png"}
                        alt="star"
                        width={35}
                        height={35}
                    />
                ))}
            </div>

            <div className={styles.Comment}>{review.comment}</div>

            <div className={styles.Footer}>
                <div className={styles.Divider} />
                Купил(а){" "}
                <span
                    className={styles.CarLink}
                    onClick={() => review.lotId && router.push(`/pages/catalog/${review.lotId}`)}
                >
                    {review.brand} {review.model}
                </span>
            </div>
        </div>
    );
}
