import styles from './Button.module.css'

interface ButtonProps {
    variant: string
    children: string | React.ReactElement<HTMLImageElement>;
    onClick?: () => void
    type?: "button" | "submit" | "reset"
}
export default function Button ({variant, children, onClick, type}: ButtonProps) {
    return (
        <button className={`${styles.Button} ${styles[variant]}`} onClick={onClick} type={type}>{children}</button>
    )
}
