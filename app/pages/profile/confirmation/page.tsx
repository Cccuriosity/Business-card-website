'use client';

import Header from "@/app/components/Header";
import styles from './ConfirmationPage.module.css'
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import {useRouter} from "next/navigation";

export default function ConfirmationPage() {
    const router = useRouter();
    return (
        <>
            <Header/>
            <div className={styles.ConfirmationPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Введите код подверждения отправленный на вашу почту</span>
                    <div className={styles.Form}>
                        <Input type={"text"} placeholder={"Код подтверждения"}/>
                        <Button type={"button"} onClick={() => router.push("/pages/profile/passwordchange")} variant={"Dark"}>Проверить</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
