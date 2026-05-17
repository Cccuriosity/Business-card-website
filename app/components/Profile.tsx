'use client';

import {useState} from 'react';
import Image from "next/image";
import ConsultationRequest from './ConsultationRequest';
import Button from './Buttons/Button';
import styles from './Profile.module.css';
import Input from "@/app/components/Inputs/Input";
import {useRouter} from "next/navigation";
import {User} from "@/app/types/user";

interface ProfileProps {
    user: User;
    onEditProfile?: () => void;
    onLogout?: () => void;
    onDeleteUser?: () => void;
}

export default function Profile( { user, onDeleteUser }: ProfileProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    if (isEditing) {
        return (
            <div className={styles.Container}>
                <div className={styles.Profile}>
                    <div className={styles.LeftColumnEdit}>
                        <div className={styles.ProfileIcon}>
                            <Image src={user.avatar} alt="Аватар" width={200} height={200}/>
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
                    <Image src={user.avatar} alt="Аватар" width={200} height={200}/>
                </div>
                <span className={styles.Content}>{user.lastName} {user.firstName}</span>
                <div><span className={styles.Label}>Почта</span><span className={styles.Content}> {user.email}</span></div>
                <div><span className={styles.Label}>Телефон</span><span className={styles.Content}> {user.phone}</span></div>

                {!user.isAdmin && (
                    <Button variant={"Light"} onClick={() => setIsEditing(true)}>Редактировать профиль</Button>
                )}

            </div>
            <div className={styles.RightColumn}>
                <span>Мои заявки</span>
                <div className={styles.Requests}>
                    {user.Requests?.length ? (
                        user.Requests.map((req, index) => (
                            <ConsultationRequest key={index} request={req}  isAdmin={user.isAdmin} />
                        ))
                    ) : (
                        <span>У вас пока нет заявок на консультацию</span>
                    )}
                </div>

                {!user.isAdmin && ( /* НАДО ПЕРЕДЕЛАТЬ ПОД АВТОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ**/
                    <Button variant={"Dark"} onClick={() => router.push("/pages/profile")}>
                        Выйти
                    </Button>
                )}

                {user.isAdmin && ( /* ТУТ ТАК ЖЕ**/
                    <Button variant={"Dark"} onClick={onDeleteUser}>
                        Удалить пользователя
                    </Button>
                )}
            </div>
        </div>
    );
}
