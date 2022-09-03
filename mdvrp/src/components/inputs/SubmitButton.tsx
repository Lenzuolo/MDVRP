import { FC } from 'react';
import './inputs.css';

interface SubmitButtonProps {
    label: string;
    onClick: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = (props: SubmitButtonProps) => {
    return (
        <button className='submit-button' type='submit' onClick={()=>props.onClick}>{props.label}</button>
    );
}

export default SubmitButton;