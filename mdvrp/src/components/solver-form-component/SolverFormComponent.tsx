import { FC, useContext } from "react";
import { DefaultContextState, MainContext } from "../../contexts";
import { Column } from "../../types/Column";
import { ResourceManager } from "../../utils/ResourceManager";
import { RadioButton, SubmitButton } from "../inputs";
import { MdvrpTableComponent } from "../mdvrp-table-component";
import './solver-form-component.css';

const SolverFormComponent: FC = () => {

    const {warehouses,customers,method,updateMethod,updateWarehouses,updateCustomers,updateStep} = useContext(MainContext) as DefaultContextState;
    const columnDef: Column[] = [
        {dataName: 'name',labelName: 'Name', inputType: 'text'}, 
        {dataName: 'xPos', labelName: 'X-Pos', inputType: 'number', kind: 'float'},
        {dataName: 'yPos', labelName: 'Y-Pos', inputType: 'number', kind: 'float'}
    ];
    const warehousesColumns: Column[] = columnDef.concat({dataName: 'cars',labelName: 'Cars', inputType: 'number', kind: 'integer'});

    const collectData = (event: any) => {
        console.table(warehouses);
        console.table(customers);
        console.log(method);
        if(updateStep) {
            updateStep(2);
        }
        event.preventDefault();
    }

    const handleRadioButton = (event: any) => {
        if(updateMethod) {
            updateMethod(event.target.value);
        }
    }

    const onDataProviderUpdate = (arr: any[], type: string) => {
        switch(type) {
            case 'warehouse':
                if (updateWarehouses) {
                    updateWarehouses(arr);
                }
                break;
            case 'customer':
                if (updateCustomers) {
                    updateCustomers(arr);
                }
                break;    
        }
    }

    return (
        <form className="solver-body" onSubmit={(values)=>collectData(values)}>
            <MdvrpTableComponent dataProvider={warehouses} dataType="warehouse"
             additionalButtonsVisible={true} label={ResourceManager.getLabel('Warehouses','EN')} 
             columnDef={warehousesColumns} onDataUpdate={onDataProviderUpdate}/>
            <MdvrpTableComponent dataProvider={customers} dataType="customer" 
            additionalButtonsVisible={true} label={ResourceManager.getLabel('Customers','EN')} 
            columnDef={columnDef} onDataUpdate={onDataProviderUpdate}/>
            <div className="radio-button-group">
                <h4>Method: </h4>
                <RadioButton id='tabu' formModel={method} label={ResourceManager.getLabel('TabuSearch','EN')} name='method' value='tabu' onChange={handleRadioButton}/>
                <RadioButton id='annealing' formModel={method} label={ResourceManager.getLabel('SimulatingAnnealing','EN')} name='method' onChange={handleRadioButton} value='simulatingAnnealing' disabled/>
            </div>
            <SubmitButton label={ResourceManager.getLabel('Calculate','EN')} />
        </form>
    );
}

export default SolverFormComponent;