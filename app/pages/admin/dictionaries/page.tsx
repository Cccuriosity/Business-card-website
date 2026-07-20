"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import styles from "./DictionariesPage.module.css";
import { FilterRepository } from "@/app/repositories/filter.repository";
import { AdminRepository } from "@/app/repositories/admin.repository";
import { FilterOptions } from "@/app/types/filter";
import Input from "@/app/components/Inputs/Input";
import Button from "@/app/components/Buttons/Button";
import { useToast } from "@/app/hooks/useToast";
import Toast from "@/app/components/Toast";
import BackButton from "@/app/components/Buttons/BackButton";
import DropDownInput from "@/app/components/Inputs/DropDownInput";

type TabType = "manufacturers" | "car_models" | "colors" | "engine_volumes";

const TABS: { key: TabType; label: string }[] = [
    { key: "manufacturers", label: "Марки" },
    { key: "car_models", label: "Модели" },
    { key: "colors", label: "Цвета" },
    { key: "engine_volumes", label: "Объёмы" },
];

export default function DictionariesPage() {
    const [tab, setTab] = useState<TabType>("manufacturers");
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [value, setValue] = useState("");
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const { toast, showToast } = useToast();

    const loadFilters = () => FilterRepository.getFilters().then(setFilterOptions);

    useEffect(() => {
        loadFilters();
    }, []);

    const handleAdd = async () => {
        if (!value.trim()) return;
        try {
            const manufacturerId =
                tab === "car_models"
                    ? filterOptions?.brands.find((b) => b.name === selectedManufacturer)?.id
                    : undefined;
            await AdminRepository.addDictionaryItem(tab, value.trim(), manufacturerId);
            setValue("");
            setSelectedManufacturer("");
            await loadFilters();
            showToast("Добавлено");
        } catch {
            showToast("Ошибка при добавлении", "error");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await AdminRepository.deleteDictionaryItem(tab, id);
            await loadFilters();
            showToast("Удалено");
        } catch {
            showToast("Ошибка при удалении", "error");
        }
    };

    const getItems = () => {
        if (!filterOptions) return [];
        switch (tab) {
            case "manufacturers":
                return filterOptions.brands.map((b) => ({ id: b.id, label: b.name }));
            case "car_models":
                const selectedBrand = filterOptions.brands.find(
                    (b) => b.name === selectedManufacturer
                );
                return filterOptions.models
                    .filter((m) => (selectedBrand ? m.manufacturerId === selectedBrand.id : true))
                    .map((m) => ({ id: m.id, label: m.name }));
            case "colors":
                return filterOptions.colors.map((c) => ({ id: c.id, label: c.name }));
            case "engine_volumes":
                return filterOptions.engineVolumes.map((e) => ({
                    id: e.id,
                    label: e.volume.toString(),
                }));
        }
    };

    return (
        <>
            <Header />
            <div className={styles.Page}>
                <BackButton />
                <span className={styles.Title}>Справочники</span>

                <div className={styles.Tabs}>
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            className={`${styles.Tab} ${tab === t.key ? styles.TabActive : ""}`}
                            onClick={() => {
                                setTab(t.key);
                                setValue("");
                                setSelectedManufacturer("");
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className={styles.AddRow}>
                    {tab === "car_models" && (
                        <DropDownInput
                            options={filterOptions?.brands.map((b) => b.name) ?? []}
                            value={selectedManufacturer}
                            onChange={setSelectedManufacturer}
                            placeholder="Марка"
                        />
                    )}
                    <Input
                        type="text"
                        placeholder="Новое значение"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button variant="Dark" type="button" onClick={handleAdd}>
                        Добавить
                    </Button>
                </div>

                <div className={styles.List}>
                    {getItems().map((item) => (
                        <div key={item.id} className={styles.Item}>
                            <span>{item.label}</span>
                            <button className={styles.Delete} onClick={() => handleDelete(item.id)}>
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </>
    );
}
