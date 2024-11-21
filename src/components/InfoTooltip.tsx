import React, { useState, useRef, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface Props {
  content: string;
}

const InfoTooltip: React.FC<Props> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <FaInfoCircle 
        className="text-gray-400 text-sm ml-1 cursor-pointer hover:text-gray-600"
        onClick={() => setIsVisible(!isVisible)}
      />
      {isVisible && (
        <div 
          ref={tooltipRef}
          className="absolute z-10 w-64 p-3 mt-2 -right-2 text-sm bg-white rounded-lg shadow-lg border border-gray-200"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip; 