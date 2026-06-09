"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import styles from "./AdminUsersPage.module.css";
import UserCard from "@/app/components/UserCard";
import { AdminRepository } from "@/app/repositories/admin.repository";
import { UserListItem } from "@/app/types/user";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserListItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.replace("/pages/profile/signin");
        }
    }, [router]);

    useEffect(() => {
        AdminRepository.getUsers().then(setUsers);
    }, []);

    const usersWithRequests = users.filter((u) => u.activeRequestsCount > 0);
    const usersWithout = users.filter((u) => u.activeRequestsCount === 0);

    return (
        <>
            <Header />
            <div className={styles.AdminUsersPage}>
                <span className={styles.Title}>Администрирование</span>
                <span className={styles.Subtitle}>Пользователи</span>

                {usersWithRequests.length > 0 && (
                    <>
                        <span className={styles.SectionTitle}>С активными заявками</span>
                        <div className={styles.Divider} />
                        <div className={styles.Grid}>
                            {usersWithRequests.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    </>
                )}

                {usersWithout.length > 0 && (
                    <>
                        <span className={styles.SectionTitle}>Остальные</span>
                        <div className={styles.Divider} />
                        <div className={styles.Grid}>
                            {usersWithout.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
