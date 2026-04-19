import styles from './Request.module.css'

interface ConsultationRequestProps {
    callTime: string;
    car: string;
    comment?: string;
    date: string;
    status: string;
}

export default function Request({callTime, car, comment, date, status}: ConsultationRequestProps) {
    return (
        <div className={styles.Request}>
            <span className={styles.Title}>Заявка на бесплатную консультацию</span>
            <div>
                <span className={styles.Label}>Желаемое время звонка: </span>
                <span className={styles.Content}>{callTime}</span>
            </div>
            <div>
                <span className={styles.Label}>Автомобиль: </span>
                <span className={styles.Content}>{car}</span>
            </div>
            {comment && (
                <div>
                    <span className={styles.Label}>Комментарий: </span>
                    <span className={styles.Content}>{comment}</span>
                </div>
            )}
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
