export class TabuParams {
    iterations = 5;
    tenure = 2;
    neighbourhood = ['-1','2','-2','1'];
    initialSolutionIndex: number;
    zCalculationType = ['df/c','df*c','df'];

    constructor(dataLength: number) {
        this.initialSolutionIndex = Math.floor(Math.random() * dataLength);
    }
}