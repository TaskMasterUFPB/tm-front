import React from 'react';
import './Button.css';

// Definindo o tipo das props
interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    // Tamanho do Button opcional como prop
    width?: string;
    height?: string
    color?: string
    backgroundColor?: string
    border?: string
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, height = 'auto', width = 'auto', color, backgroundColor, border }) => {
    return (
        <button
            className={`button-customizavel ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
            // Usando a prop width para definir a largura
            style={{ width, height, color, backgroundColor, border, borderRadius: '8px' }}
        >
            {label}
        </button>
    );
};

export default Button;