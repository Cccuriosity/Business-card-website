'use client';

import Image from "next/image";
import CarRequest from './CarRequest';
import ConsultationRequest from './ConsultationRequest';
import Button from './Buttons/Button';
import styles from './Profile.module.css';

type carRequest = {
    car: string;
    date: string;
    status: string;
}

type consultationRequest = {
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
    carRequests?: carRequest[];
    consultationRequests?: consultationRequest[];
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
                                    carRequests
                                }: ProfileProps) {
    return (
        <div className={styles.Profile}>
            <div className={styles.LeftColumn}>
                <div className={styles.ProfileIcon}>
                    <Image src={avatar} alt="Аватар пользователя" width={200} height={200}/>
                </div>
                <span className={styles.Content}>{lastName}{firstName}</span>
                <div>
                    <span className={styles.Label}>Почта</span>
                    <span className={styles.Content}> {email}</span>
                </div>
                <div>
                    <span className={styles.Label}>Телефон</span>
                    <span className={styles.Content}> {phone}</span>
                </div>
                <Button variant={"Light"}>Редактировать профиль</Button>
            </div>
            <div className={styles.RightColumn}>
                <span>Мои заявки</span>
                <div className={styles.Requests}>
                    {carRequests?.length ? (
                        <div className={styles.CarRequests}>
                            {carRequests.map((req, index) => (
                                <CarRequest
                                    key={`car-${index}`}
                                    car={req.car}
                                    date={req.date}
                                    status={req.status}
                                />
                            ))}
                        </div>
                    ) : null}

                    {consultationRequests?.length ? (
                        <div className={styles.ConsultationRequests}>
                            {consultationRequests.map((req, index) => (
                                <ConsultationRequest
                                    key={`consult-${index}`}
                                    callTime={req.callTime}
                                    car={req.car}
                                    comment={req.comment}
                                    date={req.date}
                                    status={req.status}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
                <Button variant={"Dark"}>Выйти</Button>
            </div>
        </div>
    );
}