"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./DropDownInput.module.css";
import Image from "next/image";

type DropDownInputProps = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function DropDownInput({
    options,
    value,
    onChange,
    placeholder,
}: DropDownInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(value);
    const [isTyping, setIsTyping] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setIsOpen(false);
                setIsTyping(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setSearch(value);
    }, [value]);

    const filtered = isTyping
        ? options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase()))
        : options;

    const handleSelect = (opt: string) => {
        setSearch(opt);
        setIsTyping(false);
        onChange(opt);
        setIsOpen(false);
    };

    return (
        <div className={styles.Container} ref={ref}>
            <div className={styles.InputWrapper}>
                <input
                    className={styles.Input}
                    value={search}
                    onChange={(e) => {
                        const next = e.target.value;
                        setSearch(next);
                        setIsTyping(true);
                        setIsOpen(true);

                        if (next === "") {
                            onChange("");
                        }
                    }}
                    placeholder={placeholder}
                />
                <div
                    className={styles.Arrow}
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                    }}
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                        setIsTyping(false);
                    }}
                >
                    <Image src="/DropDown.png" alt="dropdown" width={20} height={20} />
                </div>
            </div>

            {isOpen && (
                <div className={styles.List}>
                    {filtered.length ? (
                        filtered.map((opt) => (
                            <div
                                key={opt}
                                className={`${styles.Item} ${opt === value ? styles.Active : ""}`}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt}
                            </div>
                        ))
                    ) : (
                        <div className={styles.Empty}>Ничего не найдено</div>
                    )}
                </div>
            )}
        </div>
    );
}
