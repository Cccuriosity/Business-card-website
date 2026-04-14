import Image from "next/image";
import styles from "./FullReview.module.css"

interface FullReviewProps {
    avatar: string;
    userName: string;
    stars: number;
    review: string;
    date: string;
    footerText: string;
}

export default function FullReview({avatar, userName, stars, review, date, footerText}: FullReviewProps) {
    return (
        <div className={styles.Review}>
            <div className={styles.Header}>
                <div className={styles.User}>
                    <div className={styles.Avatar}>
                        <Image src={avatar} alt={"Аватар"} width={40} height={40}/>
                    </div>
                    <span>{userName}</span>
                </div>
                <span className={styles.Date}>{date}</span>
            </div>

            <div className={styles.Stars}>
                {[...Array(5)].map((_, i) => (
                    <Image
                        key={i}
                        src={i < stars ? "/GoldStar.png" : "/GrayStar.png"}
                        alt={"star"}
                        width={35}
                        height={35}
                    />
                ))}
            </div>
            <div className={styles.Comment}>
                {review}
            </div>
            <div className={styles.Footer}>
                <div className={styles.Divider}/>
                {footerText}
            </div>
        </div>
    )
}