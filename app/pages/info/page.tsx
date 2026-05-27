'use client'

import Header from "@/app/components/Header";
import styles from './InfoPage.module.css'
import Button from "@/app/components/Buttons/Button";
import Image from "next/image";
import ConsultationForm from "@/app/components/ConsultationForm";
import StatsBlock from "@/app/components/StatsBlock";
import MiniReview from "@/app/components/Review/MiniReview";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { mockReviews } from "@/app/mocks/reviews";
import PhoneBanner from "@/app/components/PhoneBanner";

export default function InfoPage() {
    const router = useRouter();

    return (
        <>
            <Header/>
            <PhoneBanner number={"+79025223190"}/>
            <div className={styles.InfoPage}>
                <div>
                    <span className={styles.Title}>Самойлов Аркадий Викторович</span>
                    <div className={styles.Seller}>
                        <div className={styles.Text}>
                            <span className={styles.Content}>
                                Консультант продавец японских авто
                            </span>
                            <span className={styles.Content}>
                                Консультант сопровождает клиента на всех
                                этапах покупки автомобиля с японских
                                аукционов — от подбора до подготовки
                                машины после прибытия.
                            </span>
                        </div>
                        <div className={styles.Photo}>
                            <Image src={"/ProfileWhite.png"} alt={"Фото"} width={120} height={120}></Image>
                        </div>
                    </div>
                </div>
                <div className={styles.Info}>
                    <span className={`${styles.Title} ${styles.CenteredTitle}`}>Почему выбирают меня?</span>
                    <div className={styles.Stats}>
                        <StatsBlock content={"Каждый покупатель доволен"} image={"/Driver.png"}/>
                        <StatsBlock content={"35 Лет опыта работы"} image={"/Bag.png"}/>
                        <StatsBlock content={"4500 + Проданных автомобилей"} image={"/Transport.png"}/>
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
                                Индивидуальный подход<br />
                                к каждому клиенту
                            </li>
                            <li>
                                Желание заказчика<br />
                                на первом месте
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.Info}>
                    <span className={styles.Title}>Отзывы</span>
                    <div className={styles.Reviews}>
                        {mockReviews.map((review, index) => (
                            <MiniReview key={index} review={review} />
                        ))}
                        <Button variant={"Dark"} onClick={() => router.push("/pages/reviews")}>
                            Отзывы ›
                        </Button>
                    </div>
                </div>
                <ConsultationForm authorized={false}/>
                <Footer/>
            </div>
        </>
    )
}
