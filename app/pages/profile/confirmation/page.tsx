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
        try {
            await AuthRepository.forgotPasswordRequest({ email });
            setCodeSent(true);
            setError("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка отправки кода");
        }
    };

    const handleVerify = async () => {
        try {
            if (type === "register") {
                await AuthRepository.verify({ email, code });
                router.push("/pages/auth/login");
            } else {
                const resetToken = await AuthRepository.forgotPasswordVerify({ email, code });
                router.push(`/pages/profile/passwordchange?token=${resetToken}`);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Неверный код");
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
                            <Button variant="Dark" type="button" onClick={handleVerify}>
                                Проверить
                            </Button>
                        </>
                    )}

                    {error && <span className={styles.Error}>{error}</span>}
                </form>
            </div>
        </>
    );
}
