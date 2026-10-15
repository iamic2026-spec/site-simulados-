import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function EscSimuladosLogo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Exact emblem matching Image 5: Open book inside shield with checkmark */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Outer shield outline with gradient green */}
          <path
            d="M50 94C50 94 84 80 84 46V18L50 8L16 18V46C16 80 50 94 50 94Z"
            stroke="url(#shield-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Open Book Pages inside */}
          <path
            d="M26 30V62C34 57 44 57 50 63C56 57 66 57 74 62V30C66 26 56 26 50 31C44 26 34 26 26 30Z"
            stroke="#15803D"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Central spine of book */}
          <path
            d="M50 31V63"
            stroke="#15803D"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Prominent Checkmark overlapping center */}
          <path
            d="M40 45L49 54L68 32"
            stroke="#15803D"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="shield-grad" x1="16" y1="8" x2="84" y2="94" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15803D" />
              <stop offset="1" stopColor="#0D9488" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <span className={`font-display font-bold tracking-tight text-[#15803D] ${textSizes[size]}`}>
          Esc<span className="text-[#1E293B]">Simulados</span>
        </span>
      )}
    </div>
  );
}
