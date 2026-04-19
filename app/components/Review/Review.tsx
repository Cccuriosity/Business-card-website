import Image from "next/image";
import styles from "./Review.module.css"

interface ReviewProps {
    avatar: string;
    userName: string;
    stars: number;
    review: string;
    date: string;
}

export default function Review({avatar, userName, stars, review, date}: ReviewProps) {
    return (
        <div className={styles.Review}>
            <div className={styles.User}>
                <div className={styles.Avatar}>
                    <Image src={avatar} alt={"Аватар"} width={30} height={30}/>
                </div>
                <span>{userName}</span>
            </div>
            <div className={styles.Stars}>
                {[...Array(5)].map((_, i) => (
                    <Image key={i} src={i < stars? "/GoldStar.png" : "/GrayStar.png"} alt={"star"} width={20} height={20} />
                ))}
            </div>
            <div className={styles.Comment}>
                {review}
            </div>
            <div className={styles.Date}>
                {date}
            </div>
        </div>
    )
}
