import { ActiveClass } from "./ActiveClass";

export class Customer implements ActiveClass {
    id: number;
    name?: string;
    xPos?: number;
    yPos?: number;

    constructor(id: number) {
        this.id = id;
    }
    isActive?: boolean;
}