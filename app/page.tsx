import Button from "@/app/components/Buttons/Button";
import Header from "@/app/components/Header";
import Review from "@/app/components/Review/Review";
import CarCard from "@/app/components/Cars/CarCard";
import CarDetail from "@/app/components/Cars/CarDetail";
import StatsBlock from "@/app/components/StatsBlock";
import ReviewForm from "@/app/components/Review/ReviewForm";
import Input from "@/app/components/Inputs/Input";
import SearchBar from "@/app/components/Inputs/SearchBar";
import PhoneBanner from "@/app/components/PhoneBanner";
import ConsultationForm from "@/app/components/ConsultationForm";
import FullReview from "@/app/components/Review/FullReview";
import SortMenu from "@/app/components/SortMenu";
import CarRequest from "@/app/components/CarRequest";
import ConsultationRequest from "@/app/components/ConsultationRequest";
import Profile from "@/app/components/Profile";

export default function Home () {
    return (<div style={{ display: "flex", flexDirection: "column", gap: 15, alignItems: "start" }}>
            <Button variant={'Dark'}>Темная</Button>
            <Button variant={'Light'}>Светлая</Button>
            <Header></Header>
            <div style={{ display: "flex", gap: 16}}>
                <Review avatar={"/ProfileWhite.png"} userName={"Левшин Илья"}
                        stars={4}
                        review={"Классный продавец, всем советую рекомендую, а машина еще лучше"}
                        date={"08.03.2026"}></Review>
                <Review avatar={"/ProfileWhite.png"} userName={"Костин Дмитрий"}
                        stars={5}
                        review={"Да нормально все будет"}
                        date={"22.04.2022"}></Review>
            </div>
            <CarCard images={["/tundra1.jpg", "/tundra2.jpg", "/tundra3.jpg", "/tundra4.jpg"]}
                     title={"Toyota Tundra"} price={7000000} year={2023} engineVolume={4.5}></CarCard>
            <CarDetail
                brand="Toyota"
                model="Tundra III"
                year={2021}
                price={11041840}
                mileage={7642}
                engineVolume={3444}
                color="хаки"
                transmission="автомат"
                drive="полный"
                vin="TMB LJ9NSX H8000138"
                isSold={true}
                soldAt="03.02.2026"
                images={[
                    { id: "1", src: "/tundra1.jpg" },
                    { id: "2", src: "/tundra2.jpg" },
                    { id: "3", src: "/tundra3.jpg" },
                    { id: "4", src: "/tundra4.jpg" },
                ]}
            />
            <div style={{ display: "flex", gap: 16 }}>
                <StatsBlock content={"Каждый покупатель доволен"} image={"/Driver.png"}/>
                <StatsBlock content={"35 Лет опыта работы"} image={"/Bag.png"}/>
                <StatsBlock content={"4500 + Проданных автомобилей"} image={"/Transport.png"}/>
            </div>
            <ReviewForm></ReviewForm>
            <Input type={"email"} placeholder={"Электронная почта"}/>
            <Input type={"password"} placeholder={"Пароль"}/>
            <SearchBar/>
            <PhoneBanner number={"+79242996350"}/>
            <ConsultationForm authorized={true}/>
            <FullReview avatar={"/ProfileWhite.png"} userName={"Икона Илоновна"}
                        stars={5} review={"Ну ваще имба"} date={"15.06.2025"} footerText={"Купил ладу гранту 12.06.2025"}/>
            <SortMenu/>
            <CarRequest car={"Subaru forester"} date={"14.03.2026"} status={"в обработке"}/>
            <ConsultationRequest callTime={"16:35"} car={"Toyota alphard"} date={"16.04.2026"} status={"В обработке"}/>
            <ConsultationRequest callTime={"16:35"} car={"Toyota alphard"} comment={"Хочу розовенькую"}
                                 date={"16.04.2026"} status={"В обработке"}/>
            <Profile
                avatar={"/ProfileWhite.png"}
                firstName={"Алексей"}
                lastName={"Смирнов"}
                email={"a.smirnov@example.com"}
                phone={"+7 (999) 123-45-67"}

                carRequests={[
                    { car: 'BMW X5', date: '2026-04-10', status: 'В обработке' },
                    { car: 'Kia K5', date: '2026-03-28', status: 'Завершено' }
                ]}
                consultationRequests={[
                    { callTime: '14:30', car: 'Audi A4', date: '2026-04-15', status: 'Ожидает' },
                    { callTime: '10:00', car: 'Toyota Camry', comment: 'Интересует кредит', date: '2026-04-12', status: 'Подтверждено' }
                ]}
            />
        </div>
        )
    }
