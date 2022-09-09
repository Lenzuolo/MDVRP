import { useContext } from 'react';
import { MainContext } from '../../contexts';
import './inputs.css';

const ReturnButton = () => {
    const {step,updateStep} = useContext(MainContext);

    const onClick = () => {
        const value = step - 1;
        if(updateStep) {
            updateStep(value);
        }
    }

    return <button className='return-button' type='button' onClick={()=>onClick()}>←</button>
}

export default ReturnButton;