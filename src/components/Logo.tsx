import React from 'react';
import { useRouter } from './Router';

// Your actual Conime SVG components
const ConimeMobileIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`w-auto h-12 ${className}`} 
    viewBox="0 0 336 336" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Light mode mobile icon */}
    <g className="dark:hidden">
      <path d="M266.658 48L181.98 168H5.66016L90.3379 48H266.658Z" fill="#FF1545" />
      <path d="M330.34 288L245.661 168H5.66016L90.3389 288H330.34Z" fill="#E9335A" />
    </g>
    {/* Dark mode mobile icon */}
    <g className="hidden dark:block">
      <path d="M266.658 48L181.98 168H5.66016L90.3379 48H266.658Z" fill="#CF012B" />
      <path d="M330.34 288L245.661 168H5.66016L90.3389 288H330.34Z" fill="#FF1545" />
    </g>
  </svg>
);

const ConimeDesktopLogo = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`w-auto h-8 ${className}`} 
    viewBox="0 0 506 126" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Light mode desktop logo */}
    <g className="dark:hidden">
      <path d="M134.304 3L91.9648 63H3.80469L46.1436 3H134.304Z" fill="#FF1545" />
      <path d="M166.145 123L123.806 63H3.80469L46.1436 123H166.145Z" fill="#E9335A" />
    </g>
    {/* Dark mode desktop logo */}
    <g className="hidden dark:block">
      <path d="M134.304 3L91.9648 63H3.80469L46.1436 3H134.304Z" fill="#CF012B" />
      <path d="M166.145 123L123.806 63H3.80469L46.1436 123H166.145Z" fill="#FF1545" />
    </g>
    {/* Text part (same for both modes) */}
    <path
      d="M500.29 47.8789V57.3301H475.194V67.9326H496.089V77.2783H475.194V88.0947H502.391V97.543H463.224V47.8789H500.29Z"
      fill="currentColor" />
    <path
      d="M411.752 47.8789L424.625 76.6191L437.056 47.8789H450.811L453.228 97.543H440.838L440.319 60.8252L427.186 95.0234H420.992L406.695 62.0088L406.921 97.543H395.58L397.892 47.8789H411.752Z"
      fill="currentColor" />
    <path d="M372.478 97.5448V47.8798H385.078V97.5448H372.478Z" fill="currentColor" />
    <path
      d="M311.536 28.4551L348.91 77.0234L347.656 28.4551H359.835V97.5459H349.021L309.362 45.9277L310.695 97.5459H298.514V28.4551H311.536Z"
      fill="currentColor" />
    <path
      d="M262.751 98.2798C257.781 98.2798 253.301 97.1598 249.311 94.9198C245.391 92.6798 242.311 89.6698 240.071 85.8898C237.831 82.1098 236.711 77.9098 236.711 73.2898C236.711 68.5298 237.866 64.1898 240.176 60.2698C242.486 56.2798 245.671 53.0948 249.731 50.7148C253.861 48.3348 258.551 47.1448 263.801 47.1448C268.771 47.1448 273.216 48.2648 277.136 50.5048C281.126 52.6748 284.241 55.6848 286.481 59.5348C288.791 63.3148 289.946 67.6198 289.946 72.4498C289.946 77.4898 288.721 81.9698 286.271 85.8898C283.821 89.7398 280.531 92.7848 276.401 95.0248C272.271 97.1948 267.721 98.2798 262.751 98.2798ZM264.011 89.1448C266.601 89.1448 268.841 88.5148 270.731 87.2548C272.621 85.9948 274.091 84.2098 275.141 81.8998C276.191 79.5898 276.716 76.8248 276.716 73.6048C276.716 70.1048 276.086 67.0598 274.826 64.4698C273.636 61.8798 271.991 59.8848 269.891 58.4848C267.791 57.0148 265.376 56.2798 262.646 56.2798C260.196 56.2798 257.991 56.9098 256.031 58.1698C254.141 59.4298 252.636 61.2498 251.516 63.6298C250.466 65.9398 249.941 68.7398 249.941 72.0298C249.941 75.4598 250.536 78.4698 251.726 81.0598C252.986 83.6498 254.666 85.6448 256.766 87.0448C258.866 88.4448 261.281 89.1448 264.011 89.1448Z"
      fill="currentColor" />
    <path
      d="M211.055 98.9098C203.915 98.9098 197.65 97.4748 192.26 94.6048C186.87 91.6648 182.67 87.6048 179.66 82.4248C176.65 77.1748 175.145 71.1198 175.145 64.2598C175.145 58.3798 176.125 53.1648 178.085 48.6148C180.115 43.9948 182.88 40.1098 186.38 36.9598C189.88 33.7398 193.905 31.2898 198.455 29.6098C203.005 27.9298 207.87 27.0898 213.05 27.0898C216.76 27.0898 220.505 27.6148 224.285 28.6648C228.065 29.6448 231.67 31.1498 235.1 33.1798L229.01 44.9398C225.86 42.2098 222.745 40.2148 219.665 38.9548C216.655 37.6248 213.505 36.9598 210.215 36.9598C205.945 36.9598 202.235 37.9748 199.085 40.0048C196.005 41.9648 193.625 44.8348 191.945 48.6148C190.335 52.3248 189.53 56.7698 189.53 61.9498C189.53 67.4798 190.58 72.3098 192.68 76.4398C194.78 80.4998 197.545 83.6848 200.975 85.9948C204.475 88.2348 208.255 89.3548 212.315 89.3548C215.955 89.3548 219.315 88.6198 222.395 87.1498C225.475 85.6798 228.065 83.7548 230.165 81.3748L235.73 91.8748C232.09 94.2548 228.17 96.0398 223.97 97.2298C219.84 98.3498 215.535 98.9098 211.055 98.9098Z"
      fill="currentColor" />
  </svg>
);

interface LogoProps {
  variant?: "icon" | "text" | "full" | "mobile" | "desktop";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function Logo({ 
  variant = "full", 
  size = "md", 
  className = "",
  onClick 
}: LogoProps) {
  const { navigate } = useRouter();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default: navigate to home using Router
      navigate('/');
    }
  };

  const containerClasses = `
    cursor-pointer select-none transition-opacity duration-200
    ${onClick ? 'hover:opacity-80' : 'hover:opacity-90'}
    ${className}
  `;

  return (
    <div className={containerClasses} onClick={handleClick}>
      {/* Mobile Logo (Icon Only) */}
      {variant === "mobile" && (
        <ConimeMobileIcon />
      )}
      
      {/* Desktop Logo (Full Logo with Text) */}
      {variant === "desktop" && (
        <ConimeDesktopLogo />
      )}
      
      {/* Icon Only */}
      {variant === "icon" && (
        <ConimeMobileIcon />
      )}
      
      {/* Full Logo - Responsive behavior (FIXED!) */}
      {variant === "full" && (
        <>
          {/* Desktop: Full Logo with Text (md and above) */}
          <ConimeDesktopLogo className="hidden md:block" />
          
          {/* Mobile: Icon Only (below md) */}
          <ConimeMobileIcon className="block md:hidden" />
        </>
      )}
      
      {/* Text Only - Fallback text version */}
      {variant === "text" && (
        <span className="font-roboto text-xl logo-text">
          CONIME
        </span>
      )}
    </div>
  );
}

// Responsive Logo Component untuk Header (menggunakan logo asli Anda)
export function ResponsiveLogo({ className = "" }: { className?: string }) {
  return (
    <Logo variant="full" className={className} />
  );
}

// Logo untuk Footer
export function FooterLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`opacity-90 hover:opacity-100 transition-opacity ${className}`}>
      <Logo variant="icon" />
    </div>
  );
}

// Logo untuk Loading/Splash Screen
export function SplashLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-conime-pulse ${className}`}>
      <Logo variant="full" />
    </div>
  );
}