import { useState } from "react";
import styles from "./ConsultationRequest.module.css";
import Image from "next/image";
import Button from "@/app/components/Buttons/Button";
import TextArea from "@/app/components/Inputs/TextArea";
import { Request } from "@/app/types/request";
import DropDownInput from "@/app/components/Inputs/DropDownInput";

interface ConsultationRequestProps {
    request: Request;
    isAdmin?: boolean;
    availableLots?: { id: number; label: string }[];
    onSave?: (
        id: number,
        data: { is_solved?: boolean; comment?: string; lot_id?: number | null }
    ) => void;
}

export default function ConsultationRequest({
    request,
    isAdmin,
    availableLots,
    onSave,
}: ConsultationRequestProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(request.comment ?? "");
    const [editedSolved, setEditedSolved] = useState(request.isSolved);
    const [editedLotId, setEditedLotId] = useState<number | null>(request.lot?.id ?? null);

    const handleSave = () => {
        onSave?.(request.id, {
            is_solved: editedSolved,
            comment: editedComment,
            lot_id: editedLotId,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedComment(request.comment ?? "");
        setEditedSolved(request.isSolved);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className={styles.Request}>
                <span className={styles.Title}>Заявка на бесплатную консультацию</span>
                <div className={styles.CommentWrapper}>
                    {availableLots && availableLots.length > 0 && (
                        <div className={styles.Wrapper}>
                            <span className={styles.Label}>Автомобиль: </span>
                            <DropDownInput
                                options={availableLots.map((l) => l.label)}
                                value={availableLots.find((l) => l.id === editedLotId)?.label ?? ""}
                                onChange={(val) => {
                                    const lot = availableLots.find((l) => l.label === val);
                                    setEditedLotId(lot?.id ?? null);
                                }}
                                placeholder="Выберите лот"
                            />
                        </div>
                    )}
                    <span className={styles.Label}>Комментарий: </span>
                    <TextArea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        rows={3}
                    />
                </div>
                <div className={`${styles.Status} ${styles.Wrapper}`}>
                    <span className={styles.Label}>Решена: </span>
                    <input
                        type="checkbox"
                        checked={editedSolved}
                        onChange={(e) => setEditedSolved(e.target.checked)}
                        style={{ width: "24px", height: "24px" }}
                    />
                </div>
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                    <Button variant="Dark" onClick={handleSave}>
                        Сохранить
                    </Button>
                    <Button variant="Dark" onClick={handleCancel}>
                        Отмена
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.Request}>
            <div className={styles.Header}>
                <span className={styles.Title}>Заявка на бесплатную консультацию</span>
                {isAdmin && (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className={styles.EditButton} onClick={() => setIsEditing(true)}>
                            <Image src="/edit.png" alt="edit" width={30} height={30} />
                        </button>
                    </div>
                )}
            </div>
            {request.callTime && (
                <div>
                    <span className={styles.Label}>Желаемое время звонка: </span>
                    <span className={styles.Content}>{request.callTime}</span>
                </div>
            )}
            {(request.lot || request.carName) && (
                <div>
                    <span className={styles.Label}>Автомобиль: </span>
                    <span className={styles.Content}>
                        {request.lot
                            ? `${request.lot.manufacturer} ${request.lot.model} ${request.lot.year}`
                            : request.carName}
                    </span>
                </div>
            )}
            {request.comment && (
                <div>
                    <span className={styles.Label}>Комментарий: </span>
                    <span className={styles.Content}>{request.comment}</span>
                </div>
            )}
            <div>
                <span className={styles.Label}>Дата: </span>
                <span className={styles.Content}>{request.createdAt}</span>
            </div>
            <div className={styles.Status}>
                <span className={styles.Label}>Статус: </span>
                <span className={styles.Content}>{request.isSolved ? "Закрыта" : "В работе"}</span>
            </div>
        </div>
    );
}
