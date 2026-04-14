import Profile from "@/app/components/Profile";
import Header from "@/app/components/Header";
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
    return (
        <>
            <Header/>
            <div className={styles.ProfilePage}>
                <Profile
                    avatar={"/ProfileWhite.png"}
                    firstName={"Алексей"}
                    lastName={"Смирнов"}
                    email={"a.smirnov@example.com"}
                    phone={"+7 (999) 123-45-67"}

                    carRequests={[
                        {car: 'BMW X5', date: '2026-04-10', status: 'В обработке'},
                        {car: 'Kia K5', date: '2026-03-28', status: 'Завершено'}
                    ]}
                    consultationRequests={[
                        {callTime: '14:30', car: 'Audi A4', date: '2026-04-15', status: 'Ожидает'},
                        {
                            callTime: '10:00',
                            car: 'Toyota Camry',
                            comment: 'Интересует кредит',
                            date: '2026-04-12',
                            status: 'Подтверждено'
                        }
                    ]}
                />
            </div>

        </>
    )
}
