import { ActiveClass } from "./ActiveClass";

export class Warehouse implements ActiveClass {
    id: number;
    name?: string;
    posX?: number;
    posY?: number;
    cars?: number;
    isActive?: boolean;
    constructor(id: number) {
        this.id = id;
    }
}