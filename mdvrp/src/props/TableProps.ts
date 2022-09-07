import { Column } from "../types/Column";

export class TableProps {
    columnDef: Column[];
    dataProvider: any[];
    label: string;
    additionalButtonsVisible?: boolean;
    dataType: string;
    onDataUpdate?: (arr: any[],dataType: string) => void;

    constructor(label: string, columnDef: Column[], dataProvider: any[], dataType: string){
        this.label = label;
        this.columnDef =columnDef;
        this.dataProvider = dataProvider;
        this.dataType = dataType;
    }
}