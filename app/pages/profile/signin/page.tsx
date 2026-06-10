"use client";
import Header from "@/app/components/Header";
import styles from "./SignInPage.module.css";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthRepository } from "@/app/repositories/auth.repository";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const validate = () => {
        if (!email.trim()) return "Введите почту";
        if (!/\S+@\S+\.\S+/.test(email)) return "Некорректная почта";
        if (!password) return "Введите пароль";
        return "";
    };
    const handleLogin = async () => {
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        setError("");
        try {
            await AuthRepository.login({ email, password });
            const isAdmin = localStorage.getItem("isAdmin") === "true";
            router.push(isAdmin ? "/pages/admin" : "/pages/profile/user");
        } catch {
            setError("Неверная почта или пароль");
        }
    };

    return (
        <>
            <Header />
            <div className={styles.SignInPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>С возвращением!</span>
                    <Input
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <span className={styles.Error}>{error}</span>}
                    <Button variant={"Dark"} type={"button"} onClick={handleLogin}>
                        Войти
                    </Button>
                    <span
                        onClick={() => router.push("/pages/profile/confirmation")}
                        className={styles.Link}
                    >
                        Забыли пароль?
                    </span>
                </form>
            </div>
        </>
    );
}
