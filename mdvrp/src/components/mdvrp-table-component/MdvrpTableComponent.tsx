import { FC, useState } from "react";
import { TableProps } from "../../props/TableProps";
import { Customer } from "../../types/Customer";
import { Warehouse } from "../../types/Warehouse";
import './mdvrp-table-component.css';
import { Column } from "../../types/Column";
import { NumberInput, TextInput } from "../inputs";
import { NumberUtils } from "../../utils/NumberUtils";
import { Randomizer } from "../randomizer-view";

const MdvrpTableComponent: FC<TableProps> = (props: TableProps) => {
    
    const [toggled, setToggled] = useState(false);
    const [data,setData] = useState(props.dataProvider);
    const [selectedItem,setSelectedItem]: any = useState();

    const addData = () => {
        const newData = [...data];
        switch(props.dataType?.toLowerCase()){
            case 'warehouse':
                newData.push(new Warehouse(data.length+1));
                break;
            case 'customer':
                newData.push(new Customer(data.length+1));
                break;    
        }
        setData(newData);
        if(props.onDataUpdate) {
            props.onDataUpdate(newData,props.dataType);
        }
    }

    const deleteData = () => {
        const newData = [...data];
        const index = newData.findIndex((o)=>o.id === selectedItem.id);
        newData.splice(index,1);
        setSelectedItem();
        setData(newData);
        if(props.onDataUpdate) {
            props.onDataUpdate(newData,props.dataType);
        }
    }

    const manageSelection = (obj: any) => {
        obj.isActive = true;
        const newData = [...data];
        newData.forEach((o) =>  {
            if(obj.id !== o.id && o.isActive) {
                o.isActive = false;
            }
        })
        setData(newData);
        if(obj.isActive) {
            setSelectedItem(obj);
        }
    }
     
    const onBlur = (e:any) => {
        if (!(e.relatedTarget?.id.toString() === "actionBtn")) {
            const newData = [...data];
            newData.forEach((obj) => {
                if(selectedItem?.id === obj.id) {
                    obj.isActive = false;
                    selectedItem.isActive = false;
                }
            })
            setData(newData);
            setSelectedItem();
        }
    }

    const handleInputChange = (value: any, modelName?: string, objectId?: number) => {
        const newData = [...data];
        if (modelName && objectId) {
            newData.find(o => o.id === objectId)[modelName] = value;
        }
        setData(newData);
        if(props.onDataUpdate) {
            props.onDataUpdate(newData,props.dataType);
        }
    }

    const createInputField = (col: Column, obj: any) => {
        switch(col.inputType){
            case 'text':
                return <TextInput modelName={col.dataName} objectId={obj.id} content={obj[col.dataName]} onChange={handleInputChange}/>
            case 'number':
                return <NumberInput data={obj[col.dataName]} kind={col.kind} 
                modelName={col.dataName} objectId={obj.id} onChange={handleInputChange}
                precisionFloat={2} precisionInteger={2}/>;    
        }
    }

    const toggleRandomizer = () => {
        setToggled(prev => {
            let newState = prev;
            newState = !newState;
            return newState;
        })
    }

    const onRandomize = (amount: number, cars?: number) => {
        const newData = [];
        if(cars != null) {
            for(let i = 0; i < amount; i++) {
                const warehouse = new Warehouse(i+1);
                warehouse.name = 'w' + (i+1).toString();
                warehouse.cars = Math.floor(Math.random() * cars + 1);
                warehouse.xPos = NumberUtils.roundFloat(Math.random() * 99);
                warehouse.yPos = NumberUtils.roundFloat(Math.random() * 99);
                newData.push(warehouse);
            }
        } else {
            for(let i = 0; i < amount; i++) {
                const customer = new Customer(i+1);
                customer.name = 'c' + (i+1).toString();
                customer.xPos = NumberUtils.roundFloat(Math.random() * 99);
                customer.yPos = NumberUtils.roundFloat(Math.random() * 99);
                newData.push(customer);
            }
        }
        setData(newData);
        if(props.onDataUpdate) {
            props.onDataUpdate(newData,props.dataType);
        }
        setToggled(false);
    }

    return (
    <div id='tableBox'>
        <div className="table-header">
            <h3>{props.label}</h3>
            {props.additionalButtonsVisible && 
                <div className="button-bar">
                    <button id="actionBtn" type="button" onClick={()=>addData()}>+ Add</button>
                    <button id="actionBtn" type="button" onClick={()=>deleteData()} disabled={!selectedItem?.id}>- Delete</button>
                    <button id="actionBtn" type="button" onClick={()=>toggleRandomizer()}>{
                        `${toggled ? '▲' : '▼'} Randomizer`
                    }</button>
                </div>}
        </div>
        {toggled && <Randomizer carsVisible={props.dataType === 'warehouse'} onGenerate={props.dataType === 'warehouse' ? 
        (amount,cars) => onRandomize(amount,cars) : (amount) => onRandomize(amount) }/>}
        <div className="table-wrapper">
            <table id='mdvrpTable'>
                <thead>
                    <tr>
                        {props.columnDef.map((col,i)=><th key={`th-${props.dataType}-${i}`}>{col.labelName}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((obj) => {
                        return (
                            <tr key={obj.id} className={obj.isActive ? 'active' : undefined} onBlur={(e: any)=>setTimeout(()=>onBlur(e))} onClick={()=> manageSelection(obj)}>
                                {props.columnDef.map((col)=>
                                <td key={`td-${col.dataName}-${obj.id}`}>
                                    {createInputField(col,obj)}
                                </td>)}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default MdvrpTableComponent;