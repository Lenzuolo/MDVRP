import { ActiveClass } from "./ActiveClass";

export class Warehouse implements ActiveClass {
    id: number;
    name?: string;
    xPos?: number;
    yPos?: number;
    cars?: number;
    isActive?: boolean;
    constructor(id: number) {
        this.id = id;
    }
}