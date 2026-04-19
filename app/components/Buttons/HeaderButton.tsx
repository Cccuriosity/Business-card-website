import styles from './Button.module.css'

interface HeaderButtonProps {
    active?: boolean
    children?: string | React.ReactElement<HTMLImageElement>;
    onClick?: () => void
    isProfile?: boolean
}

export default function HeaderButton({children, onClick, active, isProfile}: HeaderButtonProps) {
    return (
        <button className={`${styles.HeaderButton} 
        ${active? styles.Light : styles.Dark} 
        ${active? styles.Active : ''} 
        ${isProfile? styles.Profile : ''}`}
                onClick={onClick}>
            {children}
        </button>
    )
}
