import Image from "next/image";
import styles from "./StatsBlock.module.css";

interface StatsBlockProps {
    content: string;
    image: string;
}

export default function StatsBlock({ content, image }: StatsBlockProps) {
    return (
        <div className={styles.StatsBlock}>
            {content}
            <Image src={image} alt={"img"} width={120} height={120} />
        </div>
    );
}
