import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} 
      className={`bg-secondary text-white cursor-pointer py-2 px-6 sm:px-3 sm:py-1 rounded-md shadow-md
        transition duration-400 hover:scale-110
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
