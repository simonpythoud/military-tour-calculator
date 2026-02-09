const BASE_HORIZONTAL_SPEED = 4;

export const getToblerSpeed = (slopePercent: number): number => {
  const slopeDecimal = slopePercent / 100;
  const speed = 6 * Math.exp(-3.5 * Math.abs(slopeDecimal + 0.05));
  return Math.max(0.5, speed);
};

export const getSlopeSpeedMultiplier = (slopePercent: number): number => {
  const toblerSpeed = getToblerSpeed(slopePercent);
  return toblerSpeed / BASE_HORIZONTAL_SPEED;
};

export const estimateAverageSlope = (
  horizontalDistanceKm: number,
  elevationChangeM: number
): number => {
  if (horizontalDistanceKm <= 0) return 0;
  const horizontalDistanceM = horizontalDistanceKm * 1000;
  return (elevationChangeM / horizontalDistanceM) * 100;
};

export const getAscentSpeed = (
  slopePercent: number,
  baseSpeedKmh: number
): number => {
  const absSlope = Math.abs(slopePercent);
  if (absSlope <= 5) return baseSpeedKmh * 0.95;
  if (absSlope <= 15) return baseSpeedKmh * 0.75;
  if (absSlope <= 30) return baseSpeedKmh * 0.50;
  if (absSlope <= 50) return baseSpeedKmh * 0.30;
  return baseSpeedKmh * 0.15;
};

export const getDescentSpeed = (
  slopePercent: number,
  baseSpeedKmh: number
): number => {
  const absSlope = Math.abs(slopePercent);
  if (absSlope <= 5) return baseSpeedKmh * 1.10;
  if (absSlope <= 15) return baseSpeedKmh * 1.05;
  if (absSlope <= 30) return baseSpeedKmh * 0.70;
  if (absSlope <= 50) return baseSpeedKmh * 0.40;
  return baseSpeedKmh * 0.20;
};

export const calculateAdvancedVerticalTime = (
  elevationGainM: number,
  elevationLossM: number,
  horizontalDistanceKm: number,
  baseVerticalSpeedMh: number
): { ascentHours: number; descentHours: number } => {
  if (horizontalDistanceKm <= 0) {
    const ascentHours = elevationGainM > 0 ? elevationGainM / baseVerticalSpeedMh : 0;
    const descentHours = elevationLossM > 0 ? elevationLossM / (baseVerticalSpeedMh * 1.2) : 0;
    return { ascentHours, descentHours };
  }

  const ascentSlopePercent = horizontalDistanceKm > 0
    ? estimateAverageSlope(horizontalDistanceKm, elevationGainM)
    : 0;

  let ascentMultiplier = 1.0;
  if (ascentSlopePercent > 40) ascentMultiplier = 0.6;
  else if (ascentSlopePercent > 25) ascentMultiplier = 0.75;
  else if (ascentSlopePercent > 15) ascentMultiplier = 0.85;

  const ascentHours = elevationGainM > 0
    ? elevationGainM / (baseVerticalSpeedMh * ascentMultiplier)
    : 0;

  const descentSlopePercent = horizontalDistanceKm > 0
    ? estimateAverageSlope(horizontalDistanceKm, elevationLossM)
    : 0;

  let descentMultiplier = 1.2;
  if (descentSlopePercent > 40) descentMultiplier = 0.7;
  else if (descentSlopePercent > 25) descentMultiplier = 0.9;
  else if (descentSlopePercent > 15) descentMultiplier = 1.0;

  const descentHours = elevationLossM > 0
    ? elevationLossM / (baseVerticalSpeedMh * descentMultiplier)
    : 0;

  return { ascentHours, descentHours };
};

export const getAdvancedHorizontalSpeedMultiplier = (
  elevationGainM: number,
  elevationLossM: number,
  horizontalDistanceKm: number
): number => {
  if (horizontalDistanceKm <= 0) return 1.0;

  const totalElevationChange = elevationGainM + elevationLossM;
  const avgSlopePercent = estimateAverageSlope(horizontalDistanceKm, totalElevationChange / 2);

  return getSlopeSpeedMultiplier(avgSlopePercent);
};
