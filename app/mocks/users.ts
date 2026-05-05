import { User } from '@/app/types/user';

export const mockUsers: User[] = [
    {
        avatar: '/ProfileWhite.png',
        firstName: 'Алексей',
        lastName: 'Смирнов',
        email: 'a.smirnov@example.com',
        phone: '+7 (999) 123-45-67',
        isAdmin: true,
        Requests: [
            { callTime: '14:30', car: 'Audi A4', date: '2026-04-15', status: 'Ожидает' },
        ],
    },
    {
        avatar: '/ProfileWhite.png',
        firstName: 'Мария',
        lastName: 'Петрова',
        email: 'm.petrova@example.com',
        phone: '+7 (999) 000-11-22',
        isAdmin: false,
        Requests: [
            { callTime: '10:00', car: 'Toyota Corolla', date: '2026-05-01', status: 'В работе' },
        ],
    },
];