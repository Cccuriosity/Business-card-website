"use client";
import Header from "@/app/components/Header";
import styles from "./CreatePage.module.css";
import CarCreate from "@/app/components/Cars/CarCreate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatePage() {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.replace("/pages/profile/signin");
        }
    }, [router]);
    return (
        <>
            <Header />
            <div className={styles.CreatePage}>
                <CarCreate />
            </div>
        </>
    );
}
