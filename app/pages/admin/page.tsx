"use client";

import Header from "@/app/components/Header";
import styles from "./AdminPage.module.css";
import Button from "@/app/components/Buttons/Button";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/pages/profile");
    };

    return (
        <>
            <Header />
            <div className={styles.AdminPage}>
                <div className={styles.Menu}>
                    <span className={styles.Title}>Панель администратора</span>
                    <Button variant="Dark" onClick={() => router.push("/pages/catalog")}>
                        Автомобили
                    </Button>
                    <Button variant="Dark" onClick={() => router.push("/pages/admin/users")}>
                        Пользователи
                    </Button>
                    <Button variant="Light" onClick={handleLogout}>
                        Выход
                    </Button>
                </div>
            </div>
        </>
    );
}
