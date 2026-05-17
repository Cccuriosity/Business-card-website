import Header from "@/app/components/Header";
import styles from './PreviewPage.module.css'
import CarDetail from "@/app/components/Cars/CarDetail";
import {mockCars} from "@/app/mocks/cars";

export default function PreviewPage() {
    return (
        <>
            <Header/>
            <div className={styles.PreviewPage}>
                <CarDetail car={mockCars[0]} isAdmin={true} />
            </div>
        </>
    )
}
