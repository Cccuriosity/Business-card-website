"use client";
import Header from "@/app/components/Header";
import styles from "./ConfirmationPage.module.css";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthRepository } from "@/app/repositories/auth.repository";

function ConfirmationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromParams = searchParams.get("email") || "";
    const type = searchParams.get("type") || "forgot";

    const [email, setEmail] = useState(emailFromParams);
    const [code, setCode] = useState("");
    const [codeSent, setCodeSent] = useState(!!emailFromParams);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(emailFromParams ? 60 : 0);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

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
            if (type === "register") {
                await AuthRepository.verifyResend({ email });
            } else {
                await AuthRepository.forgotPasswordRequest({ email });
            }
            setCodeSent(true);
            setCountdown(60);
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
                router.push("/pages/profile/signin");
            } else {
                const resetToken = await AuthRepository.forgotPasswordVerify({ email, code });
                if (!resetToken) {
                    setError("Не удалось получить токен сброса. Попробуйте ещё раз.");
                    return;
                }
                router.push("/pages/profile/resetpassword?token=" + encodeURIComponent(resetToken));
            }
        } catch {
            setError("Неверный код");
        }
    };

    return (
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
                        <span className={styles.Hint}>
                            Если письмо не пришло — проверьте папку «Спам»
                        </span>
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
                        {countdown > 0 ? (
                            <span className={styles.Hint}>
                                Отправить повторно через {countdown} сек
                            </span>
                        ) : (
                            <span className={styles.Link} onClick={handleSendCode}>
                                Отправить повторно
                            </span>
                        )}
                    </>
                )}
            </form>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <>
            <Header />
            <Suspense fallback={null}>
                <ConfirmationForm />
            </Suspense>
        </>
    );
}
