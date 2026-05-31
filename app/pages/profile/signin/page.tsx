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
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!email.trim()) newErrors.email = "Введите почту";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Некорректная почта";
        if (!password) newErrors.password = "Введите пароль";
        return newErrors;
    };
    const handleLogin = async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            await AuthRepository.login({ email, password });
            const isAdmin = localStorage.getItem("isAdmin") === "true";
            router.push(isAdmin ? "/pages/admin" : "/pages/profile/user");
        } catch {
            setErrors({ general: "Неверная почта или пароль" });
        }
    };
    return (
        <>
            <Header />
            <div className={styles.SignInPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>С возвращением!</span>
                    {errors.email && <span className={styles.Error}>{errors.email}</span>}
                    <Input
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.password && <span className={styles.Error}>{errors.password}</span>}
                    <Input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.general && <span className={styles.Error}>{errors.general}</span>}
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
