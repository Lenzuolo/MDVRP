export class TabuMemoryUnit {
    move: string;
    tabuTenure: number;
    frequency: number;

    constructor(move: string, tabuTenure: number, frequency: number) {
        this.move = move;
        this.tabuTenure = tabuTenure;
        this.frequency = frequency;
    }
}