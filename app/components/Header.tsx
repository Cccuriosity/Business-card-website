"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HeaderButton from "@/app/components/Buttons/HeaderButton";
import Image from "next/image";
import styles from "./Header.module.css";

const ROUTES = {
    seller: "/pages/info",
    catalog: "/pages/catalog",
    reviews: "/pages/reviews",
    profile: "/pages/profile",
};

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path: (typeof ROUTES)[keyof typeof ROUTES]) => pathname === path;
    const isProfileActive = pathname?.startsWith("/pages/profile");
    const isCatalogActive = pathname?.startsWith("/pages/catalog");

    const navigate = (path: string) => {
        router.push(path);
        setMenuOpen(false);
    };

    const handleProfileClick = () => {
        const token = localStorage.getItem("token");
        router.push(token ? "/pages/profile/user" : "/pages/profile");
    };

    return (
        <div className={styles.Header}>
            <span className={styles.Title}>Авто из Японии</span>

            <button className={styles.Burger} onClick={() => setMenuOpen((prev) => !prev)}>
                <span className={styles.BurgerLine} />
                <span className={styles.BurgerLine} />
                <span className={styles.BurgerLine} />
            </button>

            <div className={`${styles.Buttons} ${menuOpen ? styles.ButtonsOpen : ""}`}>
                <HeaderButton
                    active={isActive(ROUTES.seller)}
                    onClick={() => navigate(ROUTES.seller)}
                >
                    О продавце
                </HeaderButton>
                <HeaderButton active={isCatalogActive} onClick={() => navigate(ROUTES.catalog)}>
                    Каталог
                </HeaderButton>
                <HeaderButton
                    active={isActive(ROUTES.reviews)}
                    onClick={() => navigate(ROUTES.reviews)}
                >
                    Отзывы
                </HeaderButton>
                <HeaderButton active={isProfileActive} isProfile onClick={handleProfileClick}>
                    <span className={styles.ProfileText}>Профиль</span>
                    <Image
                        src={isProfileActive ? "/ProfileBlack.png" : "/ProfileWhite.png"}
                        alt="profile"
                        width={32}
                        height={32}
                        className={styles.ProfileIcon}
                    />
                </HeaderButton>
            </div>
        </div>
    );
}
