import { TourInputs } from '../types';

export const saveCalculation = (name: string, inputs: TourInputs) => {
  const saved = localStorage.getItem('savedCalculations') || '{}';
  const calculations = JSON.parse(saved);
  calculations[name] = {
    inputs,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('savedCalculations', JSON.stringify(calculations));
};

export const loadCalculation = (name: string): TourInputs | null => {
  const saved = localStorage.getItem('savedCalculations') || '{}';
  const calculations = JSON.parse(saved);
  return calculations[name]?.inputs || null;
}; 

