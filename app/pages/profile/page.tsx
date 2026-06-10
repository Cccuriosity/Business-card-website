"use client";
import Header from "@/app/components/Header";
import styles from "./WelcomePage.module.css";
import Button from "@/app/components/Buttons/Button";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const router = useRouter();

    return (
        <>
            <Header />
            <div className={styles.WelcomePage}>
                <div className={styles.Menu}>
                    <span className={styles.Title}>Добро пожаловать!</span>
                    <Button variant={"Dark"} onClick={() => router.push("/pages/profile/signup")}>
                        Зарегистрироваться
                    </Button>
                    <Button variant={"Light"} onClick={() => router.push("/pages/profile/signin")}>
                        Войти
                    </Button>
                </div>
            </div>
        </>
    );
}
