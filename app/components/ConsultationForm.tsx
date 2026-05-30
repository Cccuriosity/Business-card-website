"use client";

import { useState } from "react";
import styles from "./ConsultationForm.module.css";
import Input from "@/app/components/Inputs/Input";
import Button from "@/app/components/Buttons/Button";
import TextArea from "@/app/components/Inputs/TextArea";
import { RequestRepository } from "@/app/repositories/request.repository";

interface ConsultationFormProps {
    authorized: boolean;
}

export default function ConsultationForm({ authorized }: ConsultationFormProps) {
    const [carName, setCarName] = useState("");
    const [callTime, setCallTime] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (!carName || !callTime) return;
        await RequestRepository.createRequest({ car_name: carName, call_time: callTime, comment });
        setCarName("");
        setCallTime("");
        setComment("");
    };

    return (
        <div className={styles.Container}>
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
