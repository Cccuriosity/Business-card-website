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
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
        await AuthRepository.register({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
        });
        router.push("/pages/profile/confirmation?email=${email}&type=register");
    };
    return (
        <>
            <Header />
            <div className={styles.SignUpPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Добро пожаловать!</span>
                    <div className={styles.Row}>
                        <Input
                            type={"text"}
                            placeholder={"Фамилия"}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Input
                            type={"email"}
                            placeholder={"Почта"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.Row}>
                        <Input
                            type={"text"}
                            placeholder={"Имя"}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            type={"text"}
                            placeholder={"Номер телефона"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={styles.Row}>
                        <Input
                            type={"text"}
                            placeholder={"Пароль"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            type={"text"}
                            placeholder={"Повторите пароль"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
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
