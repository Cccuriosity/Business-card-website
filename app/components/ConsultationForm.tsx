"use client";

import { useEffect, useState } from "react";
import styles from "./ConsultationForm.module.css";
import Input from "@/app/components/Inputs/Input";
import Button from "@/app/components/Buttons/Button";
import TextArea from "@/app/components/Inputs/TextArea";
import { RequestRepository } from "@/app/repositories/request.repository";
import { useSearchParams } from "next/navigation";

interface ConsultationFormProps {
    authorized: boolean;
}

export default function ConsultationForm({ authorized }: ConsultationFormProps) {
    const searchParams = useSearchParams();
    const [callTime, setCallTime] = useState("");
    const [comment, setComment] = useState("");
    const [carName, setCarName] = useState(searchParams.get("car") ?? "");

    useEffect(() => {
        if (searchParams.get("car")) {
            document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const handleSubmit = async () => {
        if (!carName || !callTime) return;
        await RequestRepository.createRequest({ car_name: carName, call_time: callTime, comment });
        setCarName("");
        setCallTime("");
        setComment("");
    };

    return (
        <div className={styles.Container} id="consultation">
            <span className={styles.Title}>Закажите бесплатную консультацию</span>
            {authorized ? (
                <form className={styles.Form}>
                    <Input
                        type="text"
                        placeholder="Желаемый автомобиль"
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Желаемое время звонка"
                        value={callTime}
                        onChange={(e) => setCallTime(e.target.value)}
                    />
                    <TextArea
                        placeholder="Комментарий к заявке (необязательно)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button variant="Dark" type="button" onClick={handleSubmit}>
                        Отправить заявку
                    </Button>
                </form>
            ) : (
                <div className={styles.Warning}>
                    <span>
                        Для того, чтобы оставить заявку на бесплатную консультацию, необходимо{" "}
                        <span>авторизироваться</span>
                    </span>
                </div>
            )}
            <div className={styles.Content}>
                <span>
                    Мы помогаем подобрать автомобиль под ваш бюджет и требования, ежедневно
                    мониторим аукционы Японии и предлагаем только подходящие варианты.
                </span>
                <span>
                    Проводим профессиональный анализ аукционных листов, включая проверку отметок о
                    состоянии кузова, наличии повреждений, коррозии и других нюансов.
                </span>
            </div>
        </div>
    );
}
