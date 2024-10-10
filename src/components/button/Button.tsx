import React from 'react';
import './Button.css';

// Definindo o tipo das props
interface ButtonProps {
    id?: string;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    // Tamanho do Button opcional como prop
    width?: string;
    height?: string;
    color?: string;
    backgroundColor?: string;
    border?: string;
}

const Button: React.FC<ButtonProps> = ({ id, label, onClick, disabled = false, width = 'auto', height = 'auto', color, backgroundColor, border }) => {
    return (
        <button
            id={id}
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