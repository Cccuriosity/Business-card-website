"use client";

import { useState } from "react";
import styles from "./Input.module.css";
import Image from "next/image";
import Input from "@/app/components/Inputs/Input";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [searchText, setSearchText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchText.trim());
    };

    return (
        <form className={styles.SearchBar} onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Поиск автомобиля"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button type={"submit"} className={styles.SearchButton}>
                <Image
                    src={searchText.trim() ? "/BlackMagnifying.png" : "/GrayMagnifying.png"}
                    alt="Поиск"
                    width={30}
                    height={30}
                />
            </button>
        </form>
    );
}
