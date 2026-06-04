import Header from "@/app/components/Header";
import styles from "./PrivacyPage.module.css";

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <div className={styles.PrivacyPage}>
                <h1 className={styles.Title}>Политика обработки персональных данных</h1>

                <section>
                    <h2 className={styles.Subtitle}>Какие данные мы собираем</h2>
                    <p>Мы собираем следующие персональные данные при регистрации:</p>
                    <ul>
                        <li>Имя и фамилия</li>
                        <li>Адрес электронной почты</li>
                        <li>Номер телефона</li>
                        <li>Фотография профиля (по желанию)</li>
                    </ul>
                </section>

                <section>
                    <h2 className={styles.Subtitle}>Для чего мы используем данные</h2>
                    <ul>
                        <li>Идентификация пользователя на сайте</li>
                        <li>Связь с пользователем по заявкам на консультацию</li>
                        <li>Отображение имени и фото в профиле и отзывах</li>
                    </ul>
                </section>

                <section>
                    <h2 className={styles.Subtitle}>Как мы храним данные</h2>
                    <p>Данные хранятся на защищённых серверах и не передаются третьим лицам.</p>
                </section>

                <section>
                    <h2 className={styles.Subtitle}>Ваши права</h2>
                    <p>
                        Вы можете запросить удаление своих данных, обратившись к администратору
                        сайта.
                    </p>
                </section>
            </div>
        </>
    );
}
