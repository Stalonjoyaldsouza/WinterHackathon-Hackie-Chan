import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  
  const baseStyle = "px-6 py-3 rounded-2xl font-medium transition-all duration-200 ease-in-out flex items-center justify-center gap-2 transform active:scale-95";
  
  const variants = {
    // The requested Dark Grey look
    primary: "bg-primary text-white hover:bg-primaryHover shadow-lg hover:shadow-xl border border-transparent",
    
    // For delete/stop actions
    danger: "bg-red-900/50 text-red-200 hover:bg-red-800/80 border border-red-800",
    
    // Ghost/Outline style
    outline: "bg-transparent border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;