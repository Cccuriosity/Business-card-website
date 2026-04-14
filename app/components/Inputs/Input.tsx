import styles from "./Input.module.css"

interface InputProps {
    type: string
    placeholder: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string
}

export default function Input ({type, placeholder, name, value, onChange}: InputProps) {
    return (
        <input className={styles.Input} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
    )
}