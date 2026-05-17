"use client"
import Header from "@/app/components/Header";
import styles from './SignInPage.module.css'
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    return (
        <>
            <Header/>
            <div className={styles.SignInPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>С возвращением!</span>
                    <Input type={"email"} placeholder={"Почта"}/>
                    <Input type={"password"} placeholder={"Пароль"}/>
                    <Button variant={"Dark"} type={"button"} onClick={() => router.push("/pages/profile/user")}>Войти</Button>
                    <a href={""} className={styles.Link}>Забыли пароль?</a>
                </form>
            </div>
        </>
    )
}
