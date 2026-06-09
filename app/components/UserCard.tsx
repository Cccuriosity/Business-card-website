"use client";

import Image from "next/image";
import styles from "./UserCard.module.css";
import { UserListItem } from "@/app/types/user";
import { useRouter } from "next/navigation";

interface UserCardProps {
    user: UserListItem;
}

export default function UserCard({ user }: UserCardProps) {
    const router = useRouter();

    return (
        <div className={styles.Card} onClick={() => router.push(`/pages/admin/users/${user.id}`)}>
            <div className={styles.Avatar}>
                <Image
                    src={user.avatarUrl ?? "/ProfileWhite.png"}
                    alt="Аватар"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className={styles.Info}>
                <span className={styles.Name}>
                    {user.lastName} {user.firstName}
                </span>
                <span className={styles.Phone}>{user.phone}</span>
                {user.activeRequestsCount > 0 && (
                    <span className={styles.Requests}>Заявок: {user.activeRequestsCount}</span>
                )}
            </div>
        </div>
    );
}
