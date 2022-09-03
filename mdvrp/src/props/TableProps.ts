import { Column } from "../types/Column";

export class TableProps {
    columnDef: Column[];
    label: string;
    additionalButtonsVisible?: boolean;
    dataType?: string;

    constructor(label: string, columnDef: Column[]){
        this.label = label;
        this.columnDef =columnDef;
    }
}