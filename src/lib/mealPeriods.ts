/**
 * Meal period detection utility
 */

export interface MealPeriod {
  name: string;
  startTime: string;
  endTime: string;
  id: 'breakfast' | 'lunch' | 'dinner' | 'all-day';
}

export const MEAL_PERIODS: MealPeriod[] = [
  { id: 'breakfast', name: '早餐时段', startTime: '06:00', endTime: '09:30' },
  { id: 'lunch', name: '午餐时段', startTime: '11:00', endTime: '13:30' },
  { id: 'dinner', name: '晚餐时段', startTime: '17:00', endTime: '19:30' },
];

export function getCurrentMealPeriod(): MealPeriod {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const period of MEAL_PERIODS) {
    const [startH, startM] = period.startTime.split(':').map(Number);
    const [endH, endM] = period.endTime.split(':').map(Number);
    
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (currentMinutes >= startTotal && currentMinutes <= endTotal) {
      return period;
    }
  }

  // Default fallback
  return { id: 'all-day', name: '全天时段', startTime: '00:00', endTime: '23:59' };
}
