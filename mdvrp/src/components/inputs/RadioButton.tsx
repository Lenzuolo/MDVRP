import { FC } from 'react';
import './inputs.css';

interface RadioButtonProps {
    id: string;
    label: string;
    value: string | number;
    name: string;
    checked?: boolean;
    disabled?: boolean
}

const RadioButton: FC<RadioButtonProps> = (props: RadioButtonProps) => {
    return (
        <div id='radiobutton'>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type='radio' name={props.name} value={props.value} checked={props.checked} disabled={props.disabled}/>
        </div>
    );
}

export default RadioButton;