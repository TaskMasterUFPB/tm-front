import {useState}  from "react";
import './Input.css';

// Tipos das props do Input
interface InputProps {
    id?: string;
    name?: string;
    type?: string;
    // Permitir undefined
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    // Tamanho do Input opcional como prop
    width?: string;
    height?: string;
    padding?: string;
    color?: string;
    backgroundColor?: string;
    border?: string;
  }

  const Input: React.FC<InputProps> = ({id, name, type = 'text', value, onChange, placeholder = 'Digite aqui...', disabled = false, width = 'auto', height = 'auto', padding = '10px', color, backgroundColor, border}) => {
    const [focado, setFocado] = useState(false);

    //Controlar o foco
    const handleFocus = () => setFocado(true);
    const handleBlur = () => setFocado(false);
    
    return(
        <input
            id = {id}
            name = {name}
            type = {type}
            className = {`input-customizavel ${focado ? 'inputfocado' : ''}`} 
            value={value || ''} // Garante que value seja sempre string
            onChange = {onChange}
            onFocus = {handleFocus} // Ao clicar (foco), aplica a classe 'inputfocado'
            onBlur = {handleBlur}   // Ao sair do foco, remove a classe 'inputfocado'
            placeholder = {placeholder}
            disabled = {disabled}
            style={{ width, height, padding, color, backgroundColor, border }}
        />
    )
  }

export default Input;