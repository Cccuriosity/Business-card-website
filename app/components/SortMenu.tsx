"use client";

import Image from "next/image";
import styles from "./SortMenu.module.css";

export type SortType = "date" | "rating";
export type SortOrder = "asc" | "desc";

interface SortMenuProps {
    orders: Record<SortType, SortOrder>;
    onSort: (orders: Record<SortType, SortOrder>) => void;
}

export default function SortMenu({ orders, onSort }: SortMenuProps) {
    const flip = (type: SortType) => {
        onSort({ ...orders, [type]: orders[type] === "asc" ? "desc" : "asc" });
    };

    return (
        <div className={styles.Container}>
            <span>Сортировка по:</span>
            <button className={styles.Button} onClick={() => flip("date")}>
                <span>Дате</span>
                <Image
                    src={orders.date === "asc" ? "/Up.png" : "/Down.png"}
                    alt="sort"
                    width={24}
                    height={24}
                />
            </button>
            <button className={styles.Button} onClick={() => flip("rating")}>
                <span>Оценке</span>
                <Image
                    src={orders.rating === "asc" ? "/Up.png" : "/Down.png"}
                    alt="sort"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}
