import React from 'react';
import Link from 'next/link';

/**
 * Helpaana brand logo — H icon + HELP (white) AANA (yellow) + tagline
 * Matches brand header: navy square, white border, lifestyle tagline
 */
const Logo = ({ className = '', size = 'md', asLink = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8 rounded-lg border-[1.5px] sm:w-9 sm:h-9',
    md: 'w-[38px] h-[38px] rounded-lg border-[1.5px] sm:w-12 sm:h-12 sm:rounded-xl sm:border-2',
    lg: 'w-12 h-12 rounded-xl border-2 sm:w-14 sm:h-14',
  };

  const hSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-[17px] sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const taglineSizes = {
    sm: 'text-[6px] tracking-[0.08em] sm:text-[8px] sm:tracking-[0.12em]',
    md: 'text-[6.5px] tracking-[0.1em] sm:text-[10px] sm:tracking-[0.18em]',
    lg: 'text-[8px] tracking-[0.14em] sm:text-[11px] sm:tracking-[0.2em]',
  };

  const content = (
    <div
      className={`flex items-center gap-2 sm:gap-3 min-w-0 w-[85%] max-w-[85%] sm:w-auto sm:max-w-none ${className}`}
    >
      <div
        className={`${iconSizes[size]} flex-shrink-0 bg-[#002D62] border-white flex items-center justify-center shadow-sm`}
        aria-hidden="true"
      >
        <span className={`${hSizes[size]} font-black text-white leading-none select-none`}>
          H
        </span>
      </div>

      <div className="flex flex-col justify-center min-w-0 flex-1 leading-tight">
        <h1
          className={`${titleSizes[size]} font-extrabold tracking-wide m-0 p-0 leading-none whitespace-nowrap`}
        >
          <span className="text-white">HELP</span>
          <span className="text-[#FFD23F]">AANA</span>
        </h1>
        <p
          className={`${taglineSizes[size]} font-semibold text-white/95 uppercase m-0 mt-0.5 sm:mt-1 leading-none whitespace-nowrap`}
        >
          Where Lifestyle Meets Technology
        </p>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="flex-shrink min-w-0 max-w-[calc(100%-7.5rem)] sm:max-w-none hover:opacity-95 transition-opacity"
        aria-label="Helpaana Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
