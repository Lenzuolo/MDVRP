import { FC } from 'react';
import './inputs.css';

interface TextProps {
    content: string;
}


const TextInput: FC<TextProps> = (obj: TextProps) => {
    return (
        <input type="text">{obj.content}</input>
    );
}

export default TextInput;