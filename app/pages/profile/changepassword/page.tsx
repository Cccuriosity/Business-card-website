"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import styles from "./ChangePasswordPage.module.css";
import Input from "@/app/components/Inputs/Input";
import Button from "@/app/components/Buttons/Button";
import { AuthRepository } from "@/app/repositories/auth.repository";

export default function ChangePasswordPage() {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!oldPassword) {
            setError("Введите старый пароль");
            return;
        }
        if (!newPassword) {
            setError("Введите новый пароль");
            return;
        }
        if (newPassword.length < 6) {
            setError("Минимум 6 символов");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            await AuthRepository.changePassword({
                old_password: oldPassword,
                new_password: newPassword,
            });
            router.push("/pages/profile/user");
        } catch {
            setError("Неверный старый пароль");
        }
    };

    return (
        <>
            <Header />
            <div className={styles.ChangePasswordPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Изменение пароля</span>
                    <Input
                        type="password"
                        placeholder="Старый пароль"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <span className={styles.Error}>{error}</span>}
                    <Button variant="Dark" type="button" onClick={handleSubmit}>
                        Сохранить
                    </Button>
                </form>
            </div>
        </>
    );
}
