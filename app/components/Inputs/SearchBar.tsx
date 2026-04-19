'use client';

import { useState } from "react";
import styles from "./Input.module.css";
import Image from "next/image";
import Input from "@/app/components/Inputs/Input";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <form className={styles.SearchBar}>
            <Input
                type="text"
                placeholder="Поиск автомобиля"
                value={searchText}
                onChange={handleChange}
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
    )
}
