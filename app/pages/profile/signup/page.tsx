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
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!lastName.trim()) newErrors.lastName = "Введите фамилию";
        if (!firstName.trim()) newErrors.firstName = "Введите имя";
        if (!email.trim()) newErrors.email = "Введите почту";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Некорректная почта";
        if (!phone.trim()) newErrors.phone = "Введите телефон";
        if (!password) newErrors.password = "Введите пароль";
        else if (password.length < 6) newErrors.password = "Минимум 6 символов";
        if (password !== confirmPassword) newErrors.confirm = "Пароли не совпадают";
        return newErrors;
    };
    const handleRegister = async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
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
            setErrors({ general: "Ошибка при регистрации" });
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
                            {errors.lastName && (
                                <span className={styles.Error}>{errors.lastName}</span>
                            )}
                            <Input
                                type="text"
                                placeholder="Фамилия"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className={styles.Wrapper}>
                            {errors.email && <span className={styles.Error}>{errors.email}</span>}
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
                            {errors.firstName && (
                                <span className={styles.Error}>{errors.firstName}</span>
                            )}
                            <Input
                                type="text"
                                placeholder="Имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className={styles.Wrapper}>
                            {errors.phone && <span className={styles.Error}>{errors.phone}</span>}
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
                            {errors.password && (
                                <span className={styles.Error}>{errors.password}</span>
                            )}
                            <Input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.Wrapper}>
                            {errors.confirm && (
                                <span className={styles.Error}>{errors.confirm}</span>
                            )}
                            <Input
                                type="password"
                                placeholder="Повторите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {errors.general && <span className={styles.Error}>{errors.general}</span>}
                    <Button variant={"Dark"} type={"button"} onClick={handleRegister}>
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        </>
    );
}
