export const filters = {
    brands: ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Kia', 'Lada', 'Volkswagen', 'Hyundai', 'Nissan', 'Mazda', 'Lexus', 'Porsche'],
    models: {
        'BMW': ['X5', 'X6', 'X7', '3 Series', '5 Series', '7 Series', 'M5', 'M8'],
        'Mercedes': ['E-Class', 'S-Class', 'C-Class', 'GLE', 'GLS', 'G-Class', 'AMG GT'],
        'Audi': ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'RS6', 'RS7'],
        'Toyota': ['Camry', 'RAV4', 'Land Cruiser', 'Prado', 'Corolla', 'Highlander'],
        'Kia': ['Sportage', 'Sorento', 'K5', 'Mohave', 'Ceed', 'Seltos'],
        'Lada': ['Vesta', 'Granta', 'Niva', 'XRAY', 'Largus'],
        'Volkswagen': ['Tiguan', 'Touareg', 'Passat', 'Polo', 'Golf'],
        'Hyundai': ['Solaris', 'Tucson', 'Santa Fe', 'Palisade', 'Creta'],
        'Nissan': ['X-Trail', 'Qashqai', 'Patrol', 'Murano', 'Altima'],
        'Mazda': ['CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'CX-30'],
        'Lexus': ['RX', 'LX', 'GX', 'NX', 'ES', 'LS'],
        'Porsche': ['Cayenne', 'Macan', '911', 'Panamera', 'Taycan']
    },
    years: Array.from({ length: 30 }, (_, i) => (2025 - i).toString()),
    colors: ['Белый', 'Черный', 'Серый', 'Серебристый', 'Красный', 'Синий', 'Темно-синий', 'Зеленый', 'Бежевый', 'Коричневый', 'Золотой', 'Оранжевый'],
    mileage: ['До 10 000 км', '10 000 - 50 000 км', '50 000 - 100 000 км', '100 000 - 150 000 км', '150 000 - 200 000 км', 'Более 200 000 км'],
    transmission: ['Автомат', 'Механика', 'Робот', 'Вариатор'],
    engineVolume: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '2.4', '2.5', '3.0', '3.5', '4.0', '4.4', '5.0', '5.5', '6.0'],
    driveType: ['Передний', 'Задний', 'Полный']
};