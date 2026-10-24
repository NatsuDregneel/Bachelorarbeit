import { computed } from 'vue'

export type BadgeTier = 'blue' | 'bronze' | 'silver' | 'gold'

// colors per tier; these are estimated values, replace them with the exact ones from Figma
export const tierColors: Record<BadgeTier, string> = {
    blue: '#5B87E6',
    bronze: '#D08A4A',
    silver: '#C4C4C4',
    gold: '#F2C20F',
}


export interface BadgeData {
    id: string;
    title: string;
    tier: BadgeTier;
    description: string;
    currentNumber: number;
    maxNumber: number;
}

export const badges: BadgeData[] = [
    {
        id: 'login',
        title: 'Willkommen',
        description: 'Logge dich zum ersten mal ein.',
        tier: 'blue',
        currentNumber: 0,
        maxNumber: 1,
    },
    {
        id: 'Streak1',
        title: 'Streak Neuling',
        description: 'Starte deine erste Streak.',
        tier: 'blue',
        currentNumber: 0,
        maxNumber: 1,
    },
    {
        id: 'Streak2',
        title: 'Streak Anfänger',
        description: 'Erreiche eine Streak von 4 Tagen.',
        tier: 'bronze',
        currentNumber: 0,
        maxNumber: 4,
    },
    {
        id: 'Streak3',
        title: 'Streak Profi',
        description: 'Erreiche eine Streak von 8 Tagen.',
        tier: 'silver',
        currentNumber: 0,
        maxNumber: 8,
    },
    {
        id: 'Streak4',
        title: 'Zuverlässig',
        description: 'Halte deine Streak für das ganze Experiment.',
        tier: 'gold',
        currentNumber: 0,
        maxNumber: 12,
    },
    {
        id: 'Meal1',
        title: 'Mahlzeiten Neuling',
        description: 'Trage deine erste Mahlzeit ein.',
        tier: 'blue',
        currentNumber: 0,
        maxNumber: 1,
    },
    {
        id: 'Meal2',
        title: 'Mahlzeiten Anfänger',
        description: 'Trage 8 Mahlzeiten ein.',
        tier: 'bronze',
        currentNumber: 0,
        maxNumber: 8,
    },
    {
        id: 'Meal3',
        title: 'Mahlzeiten Profi',
        description: 'Trage 16 Mahlzeiten ein.',
        tier: 'silver',
        currentNumber: 0,
        maxNumber: 16,
    },
    {
        id: 'Meal4',
        title: 'Festmahl',
        description: 'Trage 24 Mahlzeiten ein.',
        tier: 'gold',
        currentNumber: 0,
        maxNumber: 24,
    },
    {
        id: 'Sport1',
        title: 'Sport Neuling',
        description: 'Trage deine erste Sportaktivität ein.',
        tier: 'blue',
        currentNumber: 0,
        maxNumber: 1,
    },
    {
        id: 'Sport2',
        title: 'Sport Anfänger',
        description: 'Trage 2 Sportaktivitäten ein.',
        tier: 'bronze',
        currentNumber: 0,
        maxNumber: 2,
    },
    {
        id: 'Sport3',
        title: 'Sport Profi',
        description: 'Trage 3 Sportaktivitäten ein.',
        tier: 'silver',
        currentNumber: 0,
        maxNumber: 3,
    },
    {
        id: 'Sport4',
        title: 'Pumper',
        description: 'Trage 6 Sportaktivitäten ein.',
        tier: 'gold',
        currentNumber: 0,
        maxNumber: 6,
    },
    {
        id: 'badges1',
        title: 'Abzeichen Anfänger',
        description: 'Schalte dein erstes Abzeichen frei.',
        tier: 'blue',
        currentNumber: 0,
        maxNumber: 1,
    },
    {
        id: 'badges2',
        title: 'Abzeichen Fortgeschrittener',
        description: 'Schalte dein erstes Bronze Abzeichen frei.',
        tier: 'bronze',
        currentNumber: 0,
        maxNumber: 1,
    },
    {
        id: 'badges3',
        title: 'Abzeichen Profi',
        description: 'Schalte drei Silber Abzeichen frei.',
        tier: 'silver',
        currentNumber: 0,
        maxNumber: 3,
    },
    {
        id: 'badges4',
        title: 'Perfektionist',
        description: 'Schalte alle anderen Abzeichen frei.',
        tier: 'gold',
        currentNumber: 0,
        maxNumber: 16,
    },
]