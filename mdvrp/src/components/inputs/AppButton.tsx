import { FC } from 'react';
import './inputs.css';

interface AppButtonProps {
    id?: string;
    type?: "button" | "submit" | "reset" | undefined;
    label: string;
    onClick?: () => void;
}

const AppButton: FC<AppButtonProps> = (props: AppButtonProps) => {
    return (
        <button className='submit-button' id={props.id} type={props.type} onClick={()=>{ if(props.onClick) {props.onClick()}}}>{props.label}</button>
    );
}

export default AppButton;