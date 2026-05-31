"use client";

import Image from "next/image";
import styles from "./SortMenu.module.css";

interface SortMenuProps {
    dateOrder: "asc" | "desc";
    ratingOrder: "asc" | "desc";
    onDateOrder: (val: "asc" | "desc") => void;
    onRatingOrder: (val: "asc" | "desc") => void;
}

export default function SortMenu({
    dateOrder,
    ratingOrder,
    onDateOrder,
    onRatingOrder,
}: SortMenuProps) {
    return (
        <div className={styles.Container}>
            <span>Сортировка по:</span>
            <button
                className={styles.Button}
                onClick={() => onDateOrder(dateOrder === "asc" ? "desc" : "asc")}
            >
                <span>Дате</span>
                <Image
                    src={dateOrder === "asc" ? "/Up.png" : "/Down.png"}
                    alt="sort"
                    width={24}
                    height={24}
                />
            </button>
            <button
                className={styles.Button}
                onClick={() => onRatingOrder(ratingOrder === "asc" ? "desc" : "asc")}
            >
                <span>Оценке</span>
                <Image
                    src={ratingOrder === "asc" ? "/Up.png" : "/Down.png"}
                    alt="sort"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}
