"use client"
import Header from "@/app/components/Header";
import styles from './SignUpPage.module.css'
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import {useRouter} from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    return (
        <>
            <Header/>
            <div className={styles.SignUpPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Добро пожаловать!</span>
                    <div className={styles.Row}>
                        <Input type={"text"} placeholder={"Фамилия"}/>
                        <Input type={"email"} placeholder={"Почта"}/>
                    </div>
                    <div className={styles.Row}>
                        <Input type={"text"} placeholder={"Имя"}/>
                        <Input type={"text"} placeholder={"Номер телефона"}/>
                    </div>
                    <div className={styles.Row}>
                        <Input type={"text"} placeholder={"Пароль"}/>
                        <Input type={"text"} placeholder={"Повторите пароль"}/>
                    </div>
                    <Button variant={"Dark"} type={"button"} onClick={() => router.push("/pages/profile/user")}>Зарегистрироваться</Button>
                </form>
            </div>
        </>
    )
}
