'use client'
import Button from "@/app/components/Buttons/Button";
import Header from "@/app/components/Header";
import CarCard from "@/app/components/Cars/CarCard";
import { Car } from "@/app/types/car";
import CarDetail from "@/app/components/Cars/CarDetail";
import StatsBlock from "@/app/components/StatsBlock";
import ReviewForm from "@/app/components/Review/ReviewForm";
import Input from "@/app/components/Inputs/Input";
import SearchBar from "@/app/components/Inputs/SearchBar";
import PhoneBanner from "@/app/components/PhoneBanner";
import ConsultationForm from "@/app/components/ConsultationForm";
import SortMenu from "@/app/components/SortMenu";
import DropDownInput from "@/app/components/Inputs/DropDownInput";
import {useState} from "react";

export default function Home () {
    const [brand, setBrand] = useState('')
    const brands = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Kia', 'Lada']
    const demo: Car = {
        brand: 'Toyota',
        model: 'Tundra',
        year: 2023,
        price: 5500000,
        mileage: 15000,
        engineVolume: 3.0,
        color: 'Чёрный',
        transmission: 'Автомат',
        drive: 'Полный',
        vin: '5TFDY5F19PX123456',
        isSold: false,
        soldAt: '',
        images: ['/tundra1.jpg', '/tundra2.jpg', '/tundra3.jpg', '/tundra4.jpg']
    }
    return (<div style={{ display: "flex", flexDirection: "column", gap: 15, alignItems: "start" }}>
            <Button variant={'Dark'}>Темная</Button>
            <Button variant={'Light'}>Светлая</Button>
            <Header></Header>
            <CarCard car={demo}/>
            <CarDetail car={demo}/>
            <DropDownInput
                options={brands}
                value={brand}
                onChange={setBrand}
                placeholder="Выберите марку"
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
            <SortMenu/>
        </div>
        )
    }
