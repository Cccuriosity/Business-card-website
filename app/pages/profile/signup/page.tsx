"use client";
import Header from "@/app/components/Header";
import styles from "./SignUpPage.module.css";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthRepository } from "@/app/repositories/auth.repository";

export default function SignUpPage() {
    const router = useRouter();
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const validate = () => {
        if (!lastName.trim()) return "Введите фамилию";
        if (!firstName.trim()) return "Введите имя";
        if (!email.trim()) return "Введите почту";
        if (!/\S+@\S+\.\S+/.test(email)) return "Некорректная почта";
        if (!phone.trim()) return "Введите телефон";
        if (!password) return "Введите пароль";
        if (password !== confirmPassword) return "Пароли не совпадают";
        return "";
    };
    const handleRegister = async () => {
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        setError("");
        try {
            await AuthRepository.register({
                first_name: firstName,
                last_name: lastName,
                email,
                phone_number: phone,
                password,
            });
            router.push(`/pages/auth/confirmation?email=${email}&type=register`);
        } catch {
            setError("Ошибка при регистрации");
        }
    };
    return (
        <>
            <Header />
            <div className={styles.SignUpPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Добро пожаловать!</span>
                    <div className={styles.Row}>
                        <div className={styles.Wrapper}>
                            <Input
                                type="text"
                                placeholder="Фамилия"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className={styles.Wrapper}>
                            <Input
                                type="email"
                                placeholder="Почта"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.Row}>
                        <div className={styles.Wrapper}>
                            <Input
                                type="text"
                                placeholder="Имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className={styles.Wrapper}>
                            <Input
                                type="text"
                                placeholder="Номер телефона"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={`${styles.Row} ${styles.RowBottom}`}>
                        <div className={styles.Wrapper}>
                            <Input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.Wrapper}>
                            <Input
                                type="password"
                                placeholder="Повторите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <span className={styles.Error}>{error}</span>}
                    <Button variant={"Dark"} type={"button"} onClick={handleRegister}>
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        </>
    );
}
