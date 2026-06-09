"use client";

import { useRouter } from "next/navigation";
import styles from "./Button.module.css";
import BaseButton from "./BaseButton";

interface BackButtonProps {
    type?: "button" | "submit";
}

export default function BackButton({ type = "button" }: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <BaseButton
            className={`${styles.Button} ${styles.BackButton}`}
            onClick={handleClick}
            type={type}
        >
            {"← Назад"}
        </BaseButton>
    );
}
