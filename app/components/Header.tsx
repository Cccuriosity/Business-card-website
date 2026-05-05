"use client"
import { usePathname, useRouter } from "next/navigation";
import HeaderButton from "@/app/components/Buttons/HeaderButton";
import Image from "next/image";
import styles from './Header.module.css'

const ROUTES = {
    seller: "/pages/info",
    catalog: "/pages/catalog",
    reviews: "/pages/reviews",
    profile: "/pages/profile"
}

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: (typeof ROUTES)[keyof typeof ROUTES]) => pathname === path;
    const isProfileActive = pathname?.startsWith('/pages/profile');
    const isCatalogActive = pathname?.startsWith('/pages/catalog');

    return (
        <div className={styles.Header}>
            <span className={styles.Title}>Авто из Японии</span>
            <div className={styles.Buttons}>
                <HeaderButton
                    active={isActive(ROUTES.seller)}
                    onClick={() => router.push(ROUTES.seller)}
                >
                    О продавце
                </HeaderButton>

                <HeaderButton
                    active={isCatalogActive}
                    onClick={() => router.push(ROUTES.catalog)}
                >
                    Каталог
                </HeaderButton>

                <HeaderButton
                    active={isActive(ROUTES.reviews)}
                    onClick={() => router.push(ROUTES.reviews)}
                >
                    Отзывы
                </HeaderButton>

                <HeaderButton
                    active={isProfileActive}
                    isProfile
                    onClick={() => router.push(ROUTES.profile)}
                >
                    <Image
                        src={isProfileActive ? "/ProfileBlack.png" : "/ProfileWhite.png"}
                        alt="profile"
                        width={32}
                        height={32}
                    />
                </HeaderButton>
            </div>
        </div>
    )
}
