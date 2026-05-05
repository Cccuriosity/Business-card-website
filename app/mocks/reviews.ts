import { Review } from '@/app/types/review';

export const mockReviews: Review[] = [
    {
        user: {
            avatar: '/ProfileWhite.png',
            firstName: 'Илья',
            lastName: 'Левшин',
        },
        stars: 4,
        content: 'Классный продавец, всем советую рекомендую, а машина еще лучше',
        date: '08.03.2026',
        car: {
            brand: 'Toyota',
            model: 'Tundra'
        }
    },
    {
        user: {
            avatar: '/ProfileWhite.png',
            firstName: 'Дмитрий',
            lastName: 'Костин',
        },
        stars: 5,
        content: 'Да нормально все будет',
        date: '22.04.2022',
        car: {
            brand: 'Mazda',
            model: 'CX5'
        }
    },
    {
        user: {
            avatar: '/ProfileWhite.png',
            firstName: 'Иван',
            lastName: 'Иванов',
        },
        stars: 3,
        content: 'Ну чета ваще не эстетика конечно, я и лучше у конкурентов видел, а у вас чета не то',
        date: '01.05.2026',
        car: {
            brand: 'BMV',
            model: 'X5'
        }
    },
];
