import styles from './Button.module.css'
import BaseButton from './BaseButton'
import { ReactNode } from 'react'

interface ButtonProps {
    variant: string;
    children: ReactNode;
    onClick: () => void;
    type?: "button" | "submit";
}

export default function Button({ variant, children, onClick, type }: ButtonProps) {
    return (
        <BaseButton className={`${styles.Button} ${styles[variant]}`} onClick={onClick} type={type}>
            {children}
        </BaseButton>
    )
}
