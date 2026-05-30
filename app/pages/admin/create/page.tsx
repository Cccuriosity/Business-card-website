import Header from "@/app/components/Header";
import styles from "./CreatePage.module.css";
import CarCreate from "@/app/components/Cars/CarCreate";

export default function CreatePage() {
    return (
        <>
            <Header />
            <div className={styles.CreatePage}>
                <CarCreate />
            </div>
        </>
    );
}
