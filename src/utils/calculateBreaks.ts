interface Break {
  hour: number;
  duration: number;
  type: 'short' | 'long' | 'meal';
}

export const calculateBreaks = (
  totalHours: number,
  difficulty: number
): Break[] => {
  const breaks: Break[] = [];

  // Short break every 1 hour
  for (let hour = 1; hour < totalHours; hour++) {
    if (hour % 4 !== 0) {
      // Not on long break hours
      breaks.push({
        hour,
        duration: 10,
        type: 'short',
      });
    }
  }

  // Long break every 4 hours
  for (let hour = 4; hour < totalHours; hour += 4) {
    breaks.push({
      hour,
      duration: 30,
      type: 'long',
    });
  }

  // Meal breaks
  if (totalHours > 6) {
    breaks.push({
      hour: Math.floor(totalHours / 2),
      duration: 45,
      type: 'meal',
    });
  }

  return breaks;
};
