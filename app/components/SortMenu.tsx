'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './SortMenu.module.css';

export type SortType = 'date' | 'rating';
export type SortOrder = 'asc' | 'desc';

export default function SortMenu() {
    const [orders, setOrders] = useState<Record<SortType, SortOrder>>({
        date: 'desc',
        rating: 'desc'
    });

    const flip = (type: SortType) => {
        setOrders(prev => ({ ...prev, [type]: prev[type] === 'asc' ? 'desc' : 'asc' }));
    };

    return (
        <div className={styles.Container}>
            <span>Сортировка по:</span>
            <button className={styles.Button} onClick={() => flip('date')}>
                <span>Дате</span>
                <Image
                    src={orders.date === 'asc' ? "/Up.png" : "/Down.png"}
                    alt="sort"
                    width={24}
                    height={24}
                />
            </button>

            <button className={styles.Button} onClick={() => flip('rating')}>
                <span>Оценке</span>
                <Image
                    src={orders.rating === 'asc' ? "/Up.png" : "/Down.png"}
                    alt="sort"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}