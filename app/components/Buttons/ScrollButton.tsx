import styles from './Button.module.css'
import Image from "next/image";

interface ButtonProps {
    direction: "right" | "left";
    onClick?: () => void
}
export default function ScrollButton ({direction, onClick}: ButtonProps) {
    return (
        <button className={`${styles.Button} ${styles.ScrollButton}`} onClick={onClick}>
            <Image src={direction === "right"? "/ArrowRight.png" : "/ArrowLeft.png"} alt={"Arrow"} width={12} height={20}></Image>
        </button>
    )
}