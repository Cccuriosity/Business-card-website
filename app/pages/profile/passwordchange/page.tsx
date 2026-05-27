"use client"
import Header from "@/app/components/Header";
import styles from './PasswordChange.module.css'
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import { useRouter } from "next/navigation";

export default function PasswordChangePage() {
    const router = useRouter();
    return (
        <>
            <Header/>
            <div className={styles.PasswordChangePage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Изменение пароля</span>
                    <Input type={"email"} placeholder={"Новый пароль"}/>
                    <Input type={"password"} placeholder={"Повторите пароль"}/>
                    <Button variant={"Dark"} type={"button"} onClick={() => router.push("/pages/profile/user")}>Сохранить</Button>
                </form>
            </div>
        </>
    )
}
