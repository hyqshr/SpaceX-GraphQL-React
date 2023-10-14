import React from 'react';

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ disabled = false, onClick, label }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} transition ease-in-out duration-150`}
    >
      {label}
    </button>
  );
}

export default Button;
