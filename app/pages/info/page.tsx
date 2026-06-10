"use client";

import { useState, useEffect, Suspense } from "react";
import Header from "@/app/components/Header";
import styles from "./InfoPage.module.css";
import Button from "@/app/components/Buttons/Button";
import Image from "next/image";
import ConsultationForm from "@/app/components/ConsultationForm";
import StatsBlock from "@/app/components/StatsBlock";
import MiniReview from "@/app/components/Review/MiniReview";
import Footer from "@/app/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneBanner from "@/app/components/PhoneBanner";
import { ReviewRepository } from "@/app/repositories/review.repository";
import { UserRepository } from "@/app/repositories/user.repository";
import { Review } from "@/app/types/review";

export default function InfoPage() {
    const router = useRouter();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [authorized, setAuthorized] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        ReviewRepository.getReviews().then(setReviews);
        UserRepository.getProfile()
            .then(() => setAuthorized(true))
            .catch(() => setAuthorized(false));
    }, []);

    return (
        <>
            <Header />
            <PhoneBanner number={"+79025223190"} />
            <div className={styles.InfoPage}>
                <div>
                    <span className={styles.Title}>Самойлов Аркадий Викторович</span>
                    <div className={styles.Seller}>
                        <div className={styles.Text}>
                            <span className={styles.Content}>
                                Консультант продавец японских авто
                            </span>
                            <span className={styles.Content}>
                                Консультант сопровождает клиента на всех этапах покупки автомобиля с
                                японских аукционов — от подбора до подготовки машины после прибытия.
                            </span>
                        </div>
                        <div className={styles.Photo}>
                            <Image
                                src="/Seller.jpg"
                                alt="Фото"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.Info}>
                    <span className={`${styles.Title} ${styles.CenteredTitle}`}>
                        Почему выбирают меня?
                    </span>
                    <div className={styles.Stats}>
                        <StatsBlock content={"Каждый покупатель доволен"} image={"/Driver.png"} />
                        <StatsBlock content={"35 Лет опыта работы"} image={"/Bag.png"} />
                        <StatsBlock
                            content={"4500 + Проданных автомобилей"}
                            image={"/Transport.png"}
                        />
                    </div>
                    <div className={styles.Lists}>
                        <ul className={`${styles.Content} ${styles.List}`}>
                            <li>Низкая комиссия</li>
                            <li>Честность</li>
                            <li>Принципиальность</li>
                            <li>Ответственность</li>
                        </ul>
                        <ul className={`${styles.Content} ${styles.List}`}>
                            <li>
                                Индивидуальный подход
                                <br />к каждому клиенту
                            </li>
                            <li>
                                Желание заказчика
                                <br />
                                на первом месте
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.Info}>
                    <span className={styles.Title}>Отзывы</span>
                    <div className={styles.Reviews}>
                        {reviews.slice(0, 3).map((review) => (
                            <MiniReview key={review.id} review={review} />
                        ))}
                        <Button variant="Dark" onClick={() => router.push("/pages/reviews")}>
                            Отзывы ›
                        </Button>
                    </div>
                </div>
                <Suspense fallback={null}>
                    <ConsultationForm authorized={authorized} />
                </Suspense>
                <Footer />
            </div>
        </>
    );
}
