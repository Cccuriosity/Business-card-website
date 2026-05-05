import Profile from "@/app/components/Profile";
import Header from "@/app/components/Header";
import styles from './UserPage.module.css'
import {mockUsers} from "@/app/mocks/users";

export default function UserPage() {
    return (
        <>
            <Header/>
            <div className={styles.UserPage}>
                <Profile user={mockUsers[1]} />
            </div>

        </>
    )
}
