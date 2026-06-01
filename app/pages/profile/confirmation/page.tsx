"use client";

import Header from "@/app/components/Header";
import styles from "./ConfirmationPage.module.css";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthRepository } from "@/app/repositories/auth.repository";

export default function ConfirmationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromParams = searchParams.get("email") || "";
    const type = searchParams.get("type") || "forgot";

    const [email, setEmail] = useState(emailFromParams);
    const [code, setCode] = useState("");
    const [codeSent, setCodeSent] = useState(!!emailFromParams);
    const [error, setError] = useState("");

    const handleSendCode = async () => {
        if (!email.trim()) {
            setError("Введите почту");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Некорректная почта");
            return;
        }

        try {
            await AuthRepository.forgotPasswordRequest({ email });
            setCodeSent(true);
            setError("");
        } catch {
            setError("Ошибка отправки кода");
        }
    };

    const handleVerify = async () => {
        if (!code.trim()) {
            setError("Введите код");
            return;
        }

        try {
            if (type === "register") {
                await AuthRepository.verify({ email, code });
                router.push("/pages/auth/login");
            } else {
                const resetToken = await AuthRepository.forgotPasswordVerify({ email, code });
                router.push(`/pages/profile/passwordchange?token=${resetToken}`);
            }
        } catch {
            setError("Неверный код");
        }
    };

    return (
        <>
            <Header />
            <div className={styles.ConfirmationPage}>
                <form className={styles.Menu}>
                    <span className={styles.Title}>Подтверждение</span>

                    {!emailFromParams && (
                        <>
                            <Input
                                type="email"
                                placeholder="Введите вашу почту"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error && <span className={styles.Error}>{error}</span>}
                            <Button variant="Dark" type="button" onClick={handleSendCode}>
                                Отправить код
                            </Button>
                        </>
                    )}

                    {codeSent && (
                        <>
                            <span className={styles.Title}>Код отправлен на {email}</span>
                            <Input
                                type="text"
                                placeholder="Код подтверждения"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            {error && <span className={styles.Error}>{error}</span>}
                            <Button variant="Dark" type="button" onClick={handleVerify}>
                                Проверить
                            </Button>
                        </>
                    )}
                </form>
            </div>
        </>
    );
}
