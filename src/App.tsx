import React from 'react';
import TourCalculator from './components/TourCalculator';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <TourCalculator />
    </div>
  );
};

export default App; 
