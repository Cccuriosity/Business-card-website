import { useState } from 'react';
import styles from './ConsultationRequest.module.css'
import Image from "next/image";
import Button from "@/app/components/Buttons/Button";
import Input from "@/app/components/Inputs/Input";
import TextArea from "@/app/components/Inputs/TextArea";
import {Request} from "@/app/types/request";

interface ConsultationRequestProps {
    request: Request;
    isAdmin?: boolean;
}

export default function ConsultationRequest({ request, isAdmin }: ConsultationRequestProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCallTime, setEditedCallTime] = useState(request.callTime);
    const [editedCar, setEditedCar] = useState(request.car);
    const [editedComment, setEditedComment] = useState(request.comment || '');
    const [editedDate, setEditedDate] = useState(request.date);
    const [editedStatus, setEditedStatus] = useState(request.status);

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedCallTime(request.callTime);
        setEditedCar(request.car);
        setEditedComment(request.comment || '');
        setEditedDate(request.date);
        setEditedStatus(request.status);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className={styles.Request}>
                <span className={styles.Title}>Заявка на бесплатную консультацию</span>
                <div className={styles.Wrapper}>
                    <span className={styles.Label}>Желаемое время звонка: </span>
                    <Input
                        type="text"
                        value={editedCallTime}
                        onChange={(e) => setEditedCallTime(e.target.value)}
                    />
                </div>
                <div className={styles.Wrapper}>
                    <span className={styles.Label}>Автомобиль: </span>
                    <Input
                        type="text"
                        value={editedCar}
                        onChange={(e) => setEditedCar(e.target.value)}
                    />
                </div>
                <div className={styles.CommentWrapper}>
                    <span className={styles.Label}>Комментарий: </span>
                    <TextArea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        rows={3}
                    />
                </div>
                <div className={styles.Wrapper}>
                    <span className={styles.Label}>Дата: </span>
                    <Input
                        type="text"
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                    />
                </div>
                <div className={`${styles.Status} ${styles.Wrapper}`}>
                    <span className={styles.Label}>Статус: </span>
                    <Input
                        type="text"
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <Button variant={"Dark"} onClick={handleSave}>Сохранить</Button>
                    <Button variant={"Dark"} onClick={handleCancel}>Отмена</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.Request}>
            <div className={styles.Header}>
                <span className={styles.Title}>Заявка на бесплатную консультацию</span>
                {isAdmin && (
                    <button className={styles.EditButton} onClick={() => setIsEditing(true)}>
                        <Image src={"/edit.png"} alt={"edit"} width={30} height={30}/>
                    </button>
                )}
            </div>
            <div>
                <span className={styles.Label}>Желаемое время звонка: </span>
                <span className={styles.Content}>{request.callTime}</span>
            </div>
            <div>
                <span className={styles.Label}>Автомобиль: </span>
                <span className={styles.Content}>{request.car}</span>
            </div>
            {request.comment && (
                <div>
                    <span className={styles.Label}>Комментарий: </span>
                    <span className={styles.Content}>{request.comment}</span>
                </div>
            )}
            <div>
                <span className={styles.Label}>Дата: </span>
                <span className={styles.Content}>{request.date}</span>
            </div>
            <div className={styles.Status}>
                <span className={styles.Label}>Статус: </span>
                <span className={styles.Content}>{request.status}</span>
            </div>
        </div>
    )
}
