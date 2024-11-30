import { Reward } from './types';

export const INITIAL_REWARDS: Reward[] = [
  {
    id: '1',
    title: 'Extra Screen Time',
    emoji: '🎮',
    points: 50,
    description: '30 minutes of extra screen time',
    available: true,
  },
  {
    id: '2',
    title: 'Movie Night',
    emoji: '🎬',
    points: 100,
    description: 'Pick a movie for family movie night',
    available: true,
  },
  {
    id: '3',
    title: 'Pizza Party',
    emoji: '🍕',
    points: 150,
    description: 'Choose toppings for family pizza night',
    available: true,
  },
  {
    id: '4',
    title: 'New Game',
    emoji: '🎲',
    points: 300,
    description: 'Get a new board game or video game',
    available: true,
  },
  {
    id: '5',
    title: 'Fun Activity',
    emoji: '🎡',
    points: 500,
    description: 'Choose a special weekend activity',
    available: true,
  },
];