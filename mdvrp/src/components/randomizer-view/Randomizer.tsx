import { FC, useState } from "react"
import { NumberInput, AppButton } from "../inputs";
import './randomizer-view.css';

interface RandomizerProps{
    carsVisible?: boolean;
    onGenerate: (amount: number, cars?: number) => void;
}


const Randomizer: FC<RandomizerProps> = (props: RandomizerProps) => {

    const [amount, setAmount] = useState(0 as any);
    const [cars, setCars] = useState(0 as any)

    const onSubmit = () => {
        if(props.carsVisible) {
            props.onGenerate(amount,cars);
        } else {
            props.onGenerate(amount);
        }
    } 

    return (
        <div className="randomizer-body">
            <label htmlFor="niAmount">Amount to generate:</label>
            <NumberInput minValue={1} id="niAmount" data={amount} onChange={(val) => setAmount(val)}/>  
            { props.carsVisible && (<>
            <label htmlFor="niCars">Max. cars: </label>
            <NumberInput minValue={1} id='niCars' data={cars} onChange={(val) => setCars(val)}/></>)}
            <AppButton type="button" label={'Randomize data'} onClick={()=>onSubmit()}/>
        </div>
    )
}

export default Randomizer;