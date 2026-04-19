'use client';

import {useState} from 'react';
import Image from "next/image";
import Request from './Request';
import Button from './Buttons/Button';
import styles from './Profile.module.css';
import Input from "@/app/components/Inputs/Input";
import {useRouter} from "next/navigation";

type ConsultationRequest = {
    callTime: string;
    car: string;
    comment?: string;
    date: string;
    status: string;
}

interface ProfileProps {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    consultationRequests?: ConsultationRequest[];
    onEditProfile?: () => void;
    onLogout?: () => void;
}

export default function Profile({
                                    avatar,
                                    firstName,
                                    lastName,
                                    email,
                                    phone,
                                    consultationRequests,
                                }: ProfileProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({firstName, lastName, email, phone});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    if (isEditing) {
        return (
            <div className={styles.Container}>
                <div className={styles.Profile}>
                    <div className={styles.LeftColumnEdit}>
                        <div className={styles.ProfileIcon}>
                            <Image src={avatar} alt="Аватар" width={200} height={200}/>
                        </div>
                        <a href={""} className={styles.Link}>Загрузить</a>
                    </div>
                    <div className={styles.RightColumn}>
                        {['lastName', 'firstName', 'email', 'phone'].map((field) => (
                            <div key={field} className={styles.FormItem}>
                            <span className={styles.Label}>
                                {field === 'lastName' ? 'Фамилия' : field === 'firstName' ? 'Имя' : field === 'email' ? 'Почта' : 'Телефон'}
                            </span>
                                <Input name={field} value={formData[field as keyof typeof formData]}
                                       onChange={handleInputChange} type={"text"} placeholder={field}/>
                            </div>
                        ))}
                    </div>
                </div>
                <Button variant={"Dark"} onClick={() => setIsEditing(false)}>Сохринть изменения</Button>
            </div>
        );
    }

    return (
        <div className={styles.Profile}>
            <div className={styles.LeftColumn}>
                <div className={styles.ProfileIcon}>
                    <Image src={avatar} alt="Аватар" width={200} height={200}/>
                </div>
                <span className={styles.Content}>{lastName} {firstName}</span>
                <div><span className={styles.Label}>Почта</span><span className={styles.Content}> {email}</span></div>
                <div><span className={styles.Label}>Телефон</span><span className={styles.Content}> {phone}</span></div>
                <Button variant={"Light"} onClick={() => setIsEditing(true)}>Редактировать профиль</Button>
            </div>
            <div className={styles.RightColumn}>
                <span>Мои заявки</span>
                <div className={styles.Requests}>
                    {consultationRequests?.length ? (
                        consultationRequests.map((req, index) => (
                            <Request key={index} {...req} />
                        ))
                    ) : (
                        <span>У вас пока нет заявок на консультацию</span>
                    )}
                </div>
                <Button variant={"Dark"} onClick={() => router.push("/pages/profile")}>Выйти</Button>
            </div>
        </div>
    );
}
