import { Customer } from "./Customer";
import { Warehouse } from "./Warehouse";

export class DepotRegionCluster {
    warehouse: Warehouse;
    customers: Customer[];

    constructor(warehouse: Warehouse, customers: Customer[]) {
        this.warehouse = warehouse;
        this.customers = customers;
    }

}