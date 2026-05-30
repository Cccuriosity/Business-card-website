import React from "react";
import styles from "./Input.module.css";

interface TextAreaProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    rows?: number;
}

export default function TextArea({ placeholder, name, value, onChange }: TextAreaProps) {
    return (
        <textarea
            className={styles.Input}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={3}
        />
    );
}
