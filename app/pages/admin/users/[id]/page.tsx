"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import styles from "./AdminUserPage.module.css";
import Profile from "@/app/components/Profile";
import { AdminRepository } from "@/app/repositories/admin.repository";
import { User } from "@/app/types/user";

export default function AdminUserPage() {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        AdminRepository.getUserById(Number(id)).then(setUser);
    }, [id]);

    const handleDeleteUser = async () => {
        if (!user) return;
        await AdminRepository.deleteUser(user.id);
        router.push("/pages/admin/users");
    };

    const handleSaveRequest = async (
        requestId: number,
        data: { is_solved?: boolean; comment?: string }
    ) => {
        await AdminRepository.updateRequest(requestId, data);
        const updated = await AdminRepository.getUserById(Number(id));
        setUser(updated);
    };

    if (!user) return null;

    return (
        <>
            <Header />
            <div className={styles.Page}>
                <Profile
                    user={user}
                    onDeleteUser={handleDeleteUser}
                    onSaveRequest={handleSaveRequest}
                    viewerIsAdmin={true}
                />
            </div>
        </>
    );
}
