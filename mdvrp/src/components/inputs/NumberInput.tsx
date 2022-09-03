import { FC } from 'react';
import './inputs.css';

interface NumberInputProps {
    data: number;
    kind?: string;
    minValue?: number
    precisionFloat?: number;
    precisionInteger?: number;
}


const NumberInput: FC<NumberInputProps> = (props: NumberInputProps) => {
     
    let pattern;
    switch(props.kind) {
        case 'float':
            const stepPrecision = props.precisionFloat && Number(1/Math.pow(10,props.precisionFloat));
            pattern = props.precisionInteger ? `([0-9]|[1-9]){${props.precisionInteger}}` : `[0-9]+` + 
                props.precisionFloat ? `.[0-9]{${props.precisionFloat}}` : `.[0-9]+`;
            return <input type="text" min={props.minValue} pattern={pattern} step={stepPrecision ? stepPrecision : 0.1}>{props.data}</input>
        case 'integer':
        default:    
            pattern = props.precisionInteger ? `([0-9]|[1-9]){${props.precisionInteger}}` : `[0-9]+`;
            return <input type="text" pattern={pattern} min={props.minValue} step={1}>{props.data}</input>
    }

}

export default NumberInput;