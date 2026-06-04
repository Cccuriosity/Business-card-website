"use client";
import Header from "@/app/components/Header";
import styles from "./ResetPassword.module.css";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthRepository } from "@/app/repositories/auth.repository";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleReset = async () => {
        if (!newPassword) {
            setError("Введите новый пароль");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            await AuthRepository.forgotPasswordReset({
                reset_token: token,
                new_password: newPassword,
            });
            router.push("/pages/auth/login");
        } catch (err) {
            setError("Ошибка при смене пароля");
            console.error(err);
        }
    };

    return (
        <div className={styles.PasswordChangePage}>
            <form className={styles.Menu}>
                <span className={styles.Title}>Изменение пароля</span>
                <Input
                    type={"password"}
                    placeholder={"Новый пароль"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                    type={"password"}
                    placeholder={"Повторите пароль"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <span className={styles.Error}>{error}</span>}
                <Button variant={"Dark"} type={"button"} onClick={handleReset}>
                    Сохранить
                </Button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Загрузка...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </>
    );
}
