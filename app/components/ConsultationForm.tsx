import styles from './ConsultationForm.module.css'
import Input from "@/app/components/Inputs/Input";
import Button from "@/app/components/Buttons/Button";
import TextArea from "@/app/components/Inputs/TextArea";

interface ConsultationFormProps {
    authorized: boolean;
}

export default function ConsultationForm ({authorized}: ConsultationFormProps) {
    return (
        <div className={styles.Container}>
            <span className={styles.Title}>Закажите бесплатную консультацию</span>
            <form className={styles.Form}>
                <Input type={"text"} placeholder={"Желаемый автомобиль"}/>
                <Input type={"text"} placeholder={"Желаемое время звонка"}/>
                <TextArea placeholder={"Комментарий к заявке (необязательно)"}/>
                <Button variant={"Dark"}>Отправить заявку</Button>
            </form>
            <div className={styles.Content}>
                <span>Мы помогаем подобрать автомобиль под ваш бюджет и требования,
                    ежедневно мониторим аукционы Японии и предлагаем только подходящие варианты.</span>
                <span>Проводим профессиональ-ный анализ аукционных листов, включая проверку
                    отметок о состоянии кузова, наличии повреждений, коррозии и других нюансов.</span>
            </div>
        </div>
    )
}