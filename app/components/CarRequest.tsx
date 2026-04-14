import styles from './Request.module.css'

interface CarRequestProps {
    car: string;
    date: string;
    status: string;
}

export default function CarRequest({car, date, status}: CarRequestProps) {
    return (
        <div className={styles.Request}>
            <span className={styles.Title}>Заявка на автомобиль</span>
            <div>
                <span className={styles.Label}>Автомобиль: </span>
                <span className={styles.Content}>{car}</span>
            </div>
            <div>
                <span className={styles.Label}>Дата: </span>
                <span className={styles.Content}>{date}</span>
            </div>
            <div className={styles.Status}>
                <span className={styles.Label}>Статус: </span>
                <span className={styles.Content}>{status}</span>
            </div>
        </div>
    )
}