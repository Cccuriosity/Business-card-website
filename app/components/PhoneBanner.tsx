"use client"

import {useState, useEffect} from "react";
import styles from './PhoneBanner.module.css'
import Image from "next/image"

interface PhoneBannerProps {
    number: string;
}

export default function PhoneBanner({number}: PhoneBannerProps) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => {
                setVisible(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [visible]);
    
    if (!visible) return null;
    
    return (
        <div className={styles.Banner}>
            <Image src={"/Phone.png"} alt={"Phone Image"} width={30} height={30}/>
            <span>{number}</span>
            <button className={styles.Close} onClick={() => {setVisible(false)}}>
                <Image src={"/close.png"} alt={"close"} width={10} height={10}/>
            </button>
        </div>
    )
}
