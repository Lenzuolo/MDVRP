import { FC } from 'react';
import './inputs.css';

interface RadioButtonProps {
    id: string;
    label: string;
    formModel: any;
    value: string | number;
    name: string;
    onChange: (event: any)=> void;
    disabled?: boolean
}

const RadioButton: FC<RadioButtonProps> = (props: RadioButtonProps) => {
    return (
        <div id='radiobutton'>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type='radio' name={props.name} value={props.value} checked={props.formModel === props.value} disabled={props.disabled} onChange={props.onChange}/>
        </div>
    );
}

export default RadioButton;