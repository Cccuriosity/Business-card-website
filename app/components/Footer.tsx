import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
    return (
        <div className={styles.Footer}>
            <a className={styles.Link} href="https://wa.me/79025223190" target="_blank">
                <Image
                    src="/Whatsapp.png"
                    alt="Ватсапп"
                    width={80}
                    height={80}
                    className={styles.Icon}
                />
            </a>
            <a
                className={styles.Link}
                href="https://max.ru/u/f9LHodD0cOKmeDbUrFsPQhIzbS9plAyv5aCbRIsvm4Ata9x7KlVfC28ZFaY"
                target="_blank"
            >
                <Image src="/Max.png" alt="Макс" width={80} height={80} className={styles.Icon} />
            </a>
        </div>
    );
}
