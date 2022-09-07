import { FC } from 'react';
import { PollingWatchKind } from 'typescript';
import './inputs.css';

interface NumberInputProps {
    data: number;
    modelName: string;
    objectId: number;
    onChange: (value: number, modelName: string, objId: number) => void;
    kind?: string;
    minValue?: number;
    maxValue?: number;
    precisionFloat?: number;
    precisionInteger?: number;
}


const NumberInput: FC<NumberInputProps> = (props: NumberInputProps) => {
     
    const onValueChange = (event: any) => {
        let value = event.target.value;
        if( props.kind === 'float') {
            value.replace(',','.');
            const arr = value.split('.');
            if(props.precisionFloat && arr[1]?.length > props.precisionFloat) {
                const pow = Math.pow(10,arr[1].length - props.precisionFloat);
                arr[1] = Math.round((parseInt(arr[1]) + Number.EPSILON) / pow).toString();
            }
            value = arr.join('.');
        }
        event.target.value = value;
        props.onChange(Number(value), props.modelName, props.objectId);
    }

    let max,min;
    if (props.precisionInteger) {
        max = Math.pow(10,props.precisionInteger) - 1;
        min = -max;
    }
    switch(props.kind) {
        case 'float':
            const stepPrecision = props.precisionFloat && Number(1/Math.pow(10,props.precisionFloat));
            return <input type="number" min={props.minValue ? props.minValue : min ? min : undefined} 
                    max={props.maxValue ? props.maxValue : max ? max : undefined}
                    step={stepPrecision ? stepPrecision : 0.1} value={props.data}
                    onChange={(event: any)=> onValueChange(event)}/>
        case 'integer':
        default:    
            return <input type="number" 
                    min={props.minValue ? props.minValue : min ? min : undefined}
                    max={props.maxValue ? props.maxValue : max ? max: undefined} 
                    step={1} value={props.data} onChange={(event: any)=> onValueChange(event)}/>
    }

}

export default NumberInput;