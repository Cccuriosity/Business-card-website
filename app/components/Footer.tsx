import styles from './Footer.module.css'
import Image from "next/image";

export default function Footer() {

    return (
        <div className={styles.Footer}>
            <a className={styles.Link}>
                <Image src={"/Whatsapp.png"} alt={"Ватсапп"} width={80} height={80}/>
            </a>
            <a className={styles.Link}>
                <Image src={"/Max.png"} alt={"Макс"} width={80} height={80}/>
            </a>
            <a className={styles.Link}>
                <Image src={"/Telegram.png"} alt={"Телеграмм"} width={80} height={80}/>
            </a>
        </div>
    )
}
