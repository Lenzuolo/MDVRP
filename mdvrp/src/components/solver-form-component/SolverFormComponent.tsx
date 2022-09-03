import { FC } from "react";
import { Column } from "../../types/Column";
import { ResourceManager } from "../../utils/ResourceManager";
import { RadioButton, SubmitButton } from "../inputs";
import { MdvrpTableComponent } from "../mdvrp-table-component";
import './solver-form-component.css';

const SolverFormComponent: FC = () => {

    const columnDef: Column[] = [
        {dataName: 'name',labelName: 'Name', inputType: 'text'}, 
        {dataName: 'xPos', labelName: 'X-Pos', inputType: 'number', kind: 'float'},
        {dataName: 'yPos', labelName: 'Y-Pos', inputType: 'number', kind: 'float'}
    ];

    const warehousesColumns: Column[] = columnDef.concat({dataName: 'cars',labelName: 'Cars', inputType: 'number', kind: 'integer'});

    return (
        <div className="solver-body">
            <MdvrpTableComponent dataType="warehouse" additionalButtonsVisible={true} label={ResourceManager.getLabel('Warehouses','EN')} columnDef={warehousesColumns}/>
            <MdvrpTableComponent dataType="customer" additionalButtonsVisible={true} label={ResourceManager.getLabel('Customers','EN')} columnDef={columnDef}/>
            <div className="radio-button-group">
                <h4>Method: </h4>
                <RadioButton id='tabu' label={ResourceManager.getLabel('TabuSearch','EN')} name='method' value='tabu' checked/>
                <RadioButton id='annealing' label={ResourceManager.getLabel('SimulatingAnnealing','EN')} name='method' value='simulatingAnnealing' disabled/>
            </div>
            <SubmitButton label={ResourceManager.getLabel('Calculate','EN')} onClick={()=>console.log('Submit')} />
        </div>
    );
}

export default SolverFormComponent;