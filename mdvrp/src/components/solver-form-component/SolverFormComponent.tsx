import { FC, useContext } from "react";
import { DefaultContextState, MainContext } from "../../contexts";
import { Column } from "../../types/Column";
import { ResourceManager } from "../../utils/ResourceManager";
import { AppButton, RadioButton } from "../inputs";
import { MdvrpTableComponent } from "../mdvrp-table-component";
import './solver-form-component.css';
import '../../App.css';
import { MethodUtils } from "../../utils/MethodUtils";

const SolverFormComponent: FC = () => {

    const {warehouses,customers,method,updateMethod,updateWarehouses,updateCustomers,updateStep} = useContext(MainContext) as DefaultContextState;
    const columnDef: Column[] = [
        {dataName: 'name',labelName: 'Name', inputType: 'text'}, 
        {dataName: 'xPos', labelName: 'X-Pos', inputType: 'number', kind: 'float'},
        {dataName: 'yPos', labelName: 'Y-Pos', inputType: 'number', kind: 'float'}
    ];
    const warehousesColumns: Column[] = columnDef.concat({dataName: 'cars',labelName: 'Cars', inputType: 'number', kind: 'integer'});

    const collectData = (event: any) => {
        event.preventDefault();
        console.table(warehouses);
        console.table(customers);
        console.log(method);
        if(updateStep) {
            updateStep(2);
        }
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
                <RadioButton id={MethodUtils.TABU_EXTENSIVE} formModel={method} 
                    label={ResourceManager.getLabel('TabuExtensiveSearch','EN')} name='method' 
                    value={MethodUtils.TABU_EXTENSIVE} onChange={handleRadioButton}/>
                <RadioButton id={MethodUtils.TABU_EXCHANGE} formModel={method} 
                    label={ResourceManager.getLabel('TabuExchangeSearch','EN')} name='method' 
                    value={MethodUtils.TABU_EXCHANGE} onChange={handleRadioButton}/>    
                <RadioButton id={MethodUtils.SIMULATE_ANNEALING} formModel={method} 
                    label={ResourceManager.getLabel('SimulatingAnnealing','EN')} name='method' 
                    value={MethodUtils.SIMULATE_ANNEALING} onChange={handleRadioButton} disabled/>
            </div>
            <AppButton type="submit" label={ResourceManager.getLabel('Calculate','EN')} />
        </form>
    );
}

export default SolverFormComponent;