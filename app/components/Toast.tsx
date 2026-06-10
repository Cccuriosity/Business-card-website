import styles from "./Toast.module.css";
import { ToastType } from "@/app/hooks/useToast";

interface ToastProps {
    message: string;
    type: ToastType;
}

export default function Toast({ message, type }: ToastProps) {
    return (
        <div className={`${styles.Toast} ${type === "error" ? styles.Error : styles.Success}`}>
            {message}
        </div>
    );
}
