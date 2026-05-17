import Header from "@/app/components/Header";
import styles from './ConfirmationPage.module.css'
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";

export default function ConfirmationPage() {
    return (
        <>
            <Header/>
            <div className={styles.ConfirmationPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Введите код подверждения отправленный на вашу почту</span>
                    <Input type={"text"} placeholder={"Код подтверждения"}/>
                    <Button variant={"Dark"}>Проверить</Button>
                </form>
            </div>
        </>
    )
}
