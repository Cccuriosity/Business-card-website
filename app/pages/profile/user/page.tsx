"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/app/components/Profile";
import Header from "@/app/components/Header";
import styles from "./UserPage.module.css";
import { UserRepository } from "@/app/repositories/user.repository";
import { User } from "@/app/types/user";
import { AdminRepository } from "@/app/repositories/admin.repository";

export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        UserRepository.getProfile().then((user) => {
            if (user.isAdmin) router.push("/pages/admin");
            else setUser(user);
        });
    }, []);

    const handleSave = async (data: Partial<User>, avatarFile?: File) => {
        const updated = await UserRepository.updateProfile(data, avatarFile);
        setUser(updated);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        router.push("/pages/profile");
    };

    const handleDeleteUser = async () => {
        if (!user) return;
        await AdminRepository.deleteUser(user.id);
        router.push("/pages/admin/users");
    };

    const handleSaveRequest = async (id: number, data: { status?: string; comment?: string }) => {
        await AdminRepository.updateRequest(id, data);
    };

    if (!user) return null;

    return (
        <>
            <Header />
            <div className={styles.UserPage}>
                <Profile
                    user={user}
                    onSave={handleSave}
                    onDeleteUser={handleDeleteUser}
                    onLogout={handleLogout}
                    onSaveRequest={handleSaveRequest}
                />
            </div>
        </>
    );
}
