import React, { FC, useState } from "react";
import { Customer } from "../types/Customer";
import { Warehouse } from "../types/Warehouse"

export type DefaultContextState = {
    warehouses: Warehouse[];
    customers: Customer[];
    method: string;
    step: number;
    updateWarehouses?: (arr: Warehouse[]) => void;
    updateCustomers?: (arr: Customer[]) => void;
    updateMethod?: (value: string) => void; 
    updateStep?: (value: number) => void;
}

const defaultState = () => {
    return {
        warehouses: [],
        customers: [],
        method: 'tabu',
        step: 1,
    } as DefaultContextState;
}

interface ContextProps {
    children: React.ReactNode;
}

const MainContext = React.createContext<DefaultContextState>(defaultState());

const MainContextProvider: FC<ContextProps> = ({children}) => {
    
    const [warehouses, setWarehouses] = useState([] as Warehouse[]);
    const [customers, setCustomers] = useState([] as Customer[]);
    const [method, setMethod] = useState('tabu');
    const [step, setStep] = useState(1);

    const updateWarehouses = (arr: Warehouse[]) => {
        setWarehouses(arr);
    }

    const updateCustomers = (arr: Customer[]) => {
        setCustomers(arr);
    }

    const updateMethod = (value: string) => {
        setMethod(value);
    }

    const updateStep = (value: number) => {
        setStep(value);
    }

    return (
        <MainContext.Provider value={{warehouses,customers,method,step,updateWarehouses,updateCustomers,updateMethod,updateStep}}>
            {children}
        </MainContext.Provider>
    );
}

export {MainContext, MainContextProvider};