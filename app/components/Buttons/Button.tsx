import styles from './Button.module.css'

interface ButtonProps {
    variant: string
    children: string | React.ReactElement<HTMLImageElement>;
    onClick?: () => void
}
export default function Button ({variant, children, onClick}: ButtonProps) {
    return (
        <button className={`${styles.Button} ${styles[variant]}`} onClick={onClick}>{children}</button>
    )
}