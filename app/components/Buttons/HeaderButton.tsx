import styles from "./Button.module.css";
import BaseButton from "./BaseButton";
import { ReactNode } from "react";

interface HeaderButtonProps {
    active: boolean;
    children: ReactNode;
    onClick: () => void;
    isProfile?: boolean;
}

export default function HeaderButton({ children, onClick, active, isProfile }: HeaderButtonProps) {
    return (
        <BaseButton
            className={`${styles.HeaderButton} 
        ${active ? styles.Light : styles.Dark}
        ${active ? styles.Active : ""} 
        ${isProfile ? styles.Profile : ""}`}
            onClick={onClick}
        >
            {children}
        </BaseButton>
    );
}
