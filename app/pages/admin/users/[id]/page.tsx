"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import styles from "./AdminUserPage.module.css";
import Profile from "@/app/components/Profile";
import { AdminRepository } from "@/app/repositories/admin.repository";
import { User } from "@/app/types/user";
import { Car } from "@/app/types/car";
import { CarRepository } from "@/app/repositories/car.repository";
import { useToast } from "@/app/hooks/useToast";
import Toast from "@/app/components/Toast";

export default function AdminUserPage() {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [cars, setCars] = useState<Car[]>([]);
    const { toast, showToast } = useToast();

    useEffect(() => {
        AdminRepository.getUserById(Number(id)).then(setUser);
    }, [id]);

    useEffect(() => {
        CarRepository.getCars({}).then(setCars);
    }, []);

    const availableLots = cars.map((car) => ({
        id: car.id,
        label: `${car.manufacturer} ${car.model} ${car.year}`,
    }));

    const handleDeleteUser = async () => {
        if (!user) return;
        try {
            await AdminRepository.deleteUser(user.id);
            router.push("/pages/admin/users");
        } catch {
            showToast("Ошибка при удалении", "error");
        }
    };

    const handleSaveRequest = async (
        requestId: number,
        data: { is_solved?: boolean; comment?: string; lot_id?: number | null }
    ) => {
        try {
            await AdminRepository.updateRequest(requestId, data);
            const updated = await AdminRepository.getUserById(Number(id));
            setUser(updated);
            showToast("Заявка обновлена");
        } catch {
            showToast("Ошибка при обновлении заявки", "error");
        }
    };

    if (!user) return null;

    return (
        <>
            <Header />
            <div className={styles.AdminUserPage}>
                <Profile
                    user={user}
                    onDeleteUser={handleDeleteUser}
                    onSaveRequest={handleSaveRequest}
                    viewerIsAdmin={true}
                    availableLots={availableLots}
                />
                {toast && <Toast message={toast.message} type={toast.type} />}
            </div>
        </>
    );
}
