"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/app/components/Profile";
import Header from "@/app/components/Header";
import styles from "./UserPage.module.css";
import { UserRepository } from "@/app/repositories/user.repository";
import { User } from "@/app/types/user";
import { useToast } from "@/app/hooks/useToast";
import Toast from "@/app/components/Toast";

export default function UserPage() {
    const router = useRouter();
    const { toast, showToast } = useToast();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        UserRepository.getProfile().then((user) => {
            if (user.isAdmin) router.push("/pages/admin");
            else setUser(user);
        });
    }, []);

    const handleSave = async (data: Partial<User>, avatarFile?: File) => {
        try {
            const updated = await UserRepository.updateProfile(data, avatarFile);
            setUser(updated);
            showToast("Профиль обновлён");
        } catch {
            showToast("Ошибка при сохранении", "error");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        router.push("/pages/profile");
    };

    if (!user) return null;

    return (
        <>
            <Header />
            <div className={styles.UserPage}>
                <Profile user={user} onSave={handleSave} onLogout={handleLogout} />
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </>
    );
}
