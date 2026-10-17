import React from 'react';

export default function Button({ children, onClick, variant = "principal", type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`boton boton--${variant} ${className}`}
    >
      {children}
    </button>
  );
}
