"use client";

import { useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import ConsultationRequest from "./ConsultationRequest";
import Button from "./Buttons/Button";
import styles from "./Profile.module.css";
import Input from "@/app/components/Inputs/Input";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/user";
import { AuthRepository } from "@/app/repositories/auth.repository";

interface ProfileProps {
    user: User;
    viewerIsAdmin?: boolean;
    availableLots?: { id: number; label: string }[];
    onSave?: (data: Partial<User>, avatarFile?: File) => void;
    onSaveRequest?: (
        id: number,
        data: { is_solved?: boolean; comment?: string; lot_id?: number | null }
    ) => void;
    onLogout?: () => void;
    onDeleteUser?: () => void;
}

const fieldConfig: Record<string, { label: string; type: string; placeholder: string }> = {
    lastName: { label: "Фамилия", type: "text", placeholder: "Введите фамилию" },
    firstName: { label: "Имя", type: "text", placeholder: "Введите имя" },
    email: { label: "Почта", type: "email", placeholder: "Введите почту" },
    phone: { label: "Телефон", type: "tel", placeholder: "Введите номер телефона" },
};

export default function Profile({
    user,
    viewerIsAdmin = false,
    onSave,
    onLogout,
    onDeleteUser,
    onSaveRequest,
    availableLots,
}: ProfileProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar);
    const [avatarFile, setAvatarFile] = useState<File | undefined>();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    });
    const [verifyStep, setVerifyStep] = useState(false);
    const [verifyCode, setVerifyCode] = useState("");
    const [pendingData, setPendingData] = useState<{
        data: Partial<User>;
        avatarFile?: File;
    } | null>(null);

    const handleVerifyCode = async () => {
        if (!verifyCode.trim()) {
            setError("Введите код");
            return;
        }
        try {
            await AuthRepository.verify({ email: formData.email, code: verifyCode });
            if (pendingData) {
                onSave?.(pendingData.data, pendingData.avatarFile);
            }
            setVerifyStep(false);
            setIsEditing(false);
        } catch {
            setError("Неверный код");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!formData.lastName.trim()) {
            setError("Введите фамилию");
            return;
        }
        if (!formData.firstName.trim()) {
            setError("Введите имя");
            return;
        }
        if (!formData.email.trim()) {
            setError("Введите почту");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Некорректная почта");
            return;
        }
        if (!formData.phone.trim()) {
            setError("Введите телефон");
            return;
        }
        if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s\-()]/g, ""))) {
            setError("Некорректный номер телефона");
            return;
        }
        setError("");

        if (formData.email !== user.email) {
            try {
                await AuthRepository.forgotPasswordRequest({ email: formData.email });
                setPendingData({ data: formData, avatarFile });
                setVerifyStep(true);
            } catch {
                setError("Ошибка отправки кода на почту");
            }
            return;
        }

        onSave?.(formData, avatarFile);
        setIsEditing(false);
    };

    const handleDownloadClick = () => fileInputRef.current?.click();

    if (isEditing) {
        return (
            <div className={styles.Container}>
                <div className={styles.Profile}>
                    <div className={styles.LeftColumnEdit}>
                        <div className={styles.ProfileIconEdit}>
                            <Image
                                src={avatarPreview}
                                alt="Аватар"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <span onClick={handleDownloadClick} className={styles.Link}>
                            Загрузить
                        </span>
                    </div>

                    <div className={styles.RightColumn}>
                        {(["lastName", "firstName", "email", "phone"] as const).map((field) => (
                            <div key={field} className={styles.FormItem}>
                                <span className={styles.Label}>{fieldConfig[field].label}</span>
                                <Input
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    type={fieldConfig[field].type}
                                    placeholder={fieldConfig[field].placeholder}
                                />
                            </div>
                        ))}

                        <span
                            onClick={() => router.push(`/pages/profile/changepassword`)}
                            className={styles.Link}
                        >
                            Изменить пароль
                        </span>
                    </div>
                </div>
                {verifyStep ? (
                    <>
                        <span className={styles.Label}>Код отправлен на {formData.email}</span>
                        <Input
                            type="text"
                            placeholder="Код подтверждения"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value)}
                        />
                        {error && <span className={styles.Error}>{error}</span>}
                        <Button variant="Dark" onClick={handleVerifyCode}>
                            Подтвердить
                        </Button>
                    </>
                ) : (
                    <>
                        {error && <span className={styles.Error}>{error}</span>}
                        <Button variant="Dark" onClick={handleSave}>
                            Сохранить изменения
                        </Button>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={styles.Profile}>
            <div className={styles.LeftColumn}>
                <div className={styles.ProfileIcon}>
                    <Image src={user.avatar} alt="Аватар" fill style={{ objectFit: "cover" }} />
                </div>
                <span className={styles.Content}>
                    {user.lastName} {user.firstName}
                </span>
                <div>
                    <span className={styles.Label}>Почта</span>
                    <span className={styles.Content}> {user.email}</span>
                </div>
                <div>
                    <span className={styles.Label}>Телефон</span>
                    <span className={styles.Content}> {user.phone}</span>
                </div>

                {!viewerIsAdmin && (
                    <Button variant={"Light"} onClick={() => setIsEditing(true)}>
                        Редактировать профиль
                    </Button>
                )}
            </div>

            <div className={styles.RightColumn}>
                <span>{viewerIsAdmin ? "Заявки пользователя" : "Мои заявки"}</span>
                <div className={styles.Requests}>
                    {user.requests?.length ? (
                        user.requests.map((req, index) => (
                            <ConsultationRequest
                                key={index}
                                request={req}
                                isAdmin={viewerIsAdmin}
                                onSave={onSaveRequest}
                                availableLots={availableLots}
                            />
                        ))
                    ) : (
                        <span>У вас пока нет заявок на консультацию</span>
                    )}
                </div>

                {!viewerIsAdmin && (
                    <Button variant={"Dark"} onClick={onLogout}>
                        Выйти
                    </Button>
                )}

                {viewerIsAdmin && (
                    <Button variant={"Dark"} onClick={onDeleteUser}>
                        Удалить пользователя
                    </Button>
                )}
            </div>
        </div>
    );
}
