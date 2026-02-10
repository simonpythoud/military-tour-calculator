import type React from 'react';
import { useState, useRef, useEffect, useId } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface Props {
  content: string;
}

const InfoTooltip: React.FC<Props> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        className="text-gray-400 text-sm ml-1 cursor-pointer hover:text-gray-600 focus:outline-none focus:text-gray-600 bg-transparent border-none p-0 flex items-center rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="More information"
        aria-expanded={isVisible}
        aria-controls={isVisible ? tooltipId : undefined}
      >
        <FaInfoCircle />
      </button>
      {isVisible && (
        <div
          id={tooltipId}
          className="absolute z-10 w-64 p-3 mt-2 -right-2 text-sm bg-white rounded-lg shadow-lg border border-gray-200"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
