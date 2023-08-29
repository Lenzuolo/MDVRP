import React, { FC, useState } from "react";
import { ClusterService } from "../services";
import { VehicleRoutingService } from "../services/vehicle-routing-service";
import { Customer } from "../types/Customer";
import { DepotRegionCluster } from "../types/DepotRegionCluster";
import { RouteInformation } from "../types/RouteInformation";
import { Warehouse } from "../types/Warehouse"
import { MethodUtils } from "../utils/MethodUtils";

export type DefaultContextState = {
    warehouses: Warehouse[];
    customers: Customer[];
    method: string;
    step: number;
    depotRegionClusters?: DepotRegionCluster[];
    routes: RouteInformation[][]; 
    updateWarehouses?: (arr: Warehouse[]) => void;
    updateCustomers?: (arr: Customer[]) => void;
    updateMethod?: (value: string) => void; 
    updateStep?: (value: number) => void;
}

const defaultState = () => {
    return {
        warehouses: [],
        customers: [],
        method: MethodUtils.TABU_EXTENSIVE,
        routes: [],
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
    const [routes, setRoutes] = useState([] as RouteInformation[][]);

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
        switch(value) {
            case 2:
                performStep2();
                break;
            case 1:
            default:
                break;    
        }
        setStep(value);
    }

    const performStep2 = () => {
        const clusters = ClusterService.depotClustering(warehouses, customers);
        const newRoutes: RouteInformation[][] = [];
        clusters.forEach(cl => {
            if(cl.warehouse.cars) {
                let groupedCustomers = ClusterService.carKMeansClustering(cl.customers, cl.warehouse.cars);
                let routesLists: RouteInformation[] = [];
                switch(method) {
                    case MethodUtils.TABU_EXTENSIVE:
                        routesLists = VehicleRoutingService.extensiveTabuSearch(cl.warehouse,groupedCustomers);
                        break;
                    case MethodUtils.TABU_EXCHANGE:
                        routesLists = VehicleRoutingService.exchangeTabuSearch(cl.warehouse,groupedCustomers);
                        break;
                    case MethodUtils.SIMULATE_ANNEALING:
                        break;
                    case MethodUtils.GENETIC_ALGORITHM:
                        break;
                    default:
                        break;                
                }
                newRoutes.push(routesLists);
            }});
        setRoutes(newRoutes);
    }

    return (
        <MainContext.Provider value={{warehouses,customers,method,step,routes,updateWarehouses,updateCustomers,updateMethod,updateStep}}>
            {children}
        </MainContext.Provider>
    );
}

export {MainContext, MainContextProvider};