"use client";
import Header from "@/app/components/Header";
import styles from "./CreatePage.module.css";
import CarCreate from "@/app/components/Cars/CarCreate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackButton from "@/app/components/Buttons/BackButton";

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
                <BackButton />
                <CarCreate />
            </div>
        </>
    );
}
