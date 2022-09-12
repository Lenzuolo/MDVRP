import { FC } from 'react';
import './inputs.css';

interface TextProps {
    content: string;
    modelName: string;
    objectId: number;
    onChange: (content: string, modelName: string, objectId: number) => void;
}


const TextInput: FC<TextProps> = (props: TextProps) => {
    
    const onValueChange = (event: any) => {
        props.onChange(event.target.value, props.modelName, props.objectId);
    }
    
    return (
        <input type="text" value={props.content} onChange={(event: any)=> onValueChange(event)}/>
    );
}

export default TextInput;