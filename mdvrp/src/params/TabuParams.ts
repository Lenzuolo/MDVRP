export class TabuParams {
    iterations = 5;
    tenure = 2;
    neighborhood = ['-1','2','-2','1'];
    readonly maxNeighborhoodRegionSize = 3;
    neighborhoodRegionSize = this.maxNeighborhoodRegionSize;
    initialSolutionIndex: number;
    readonly zCalculationType = ['df/c','df*c','df'];

    constructor(dataLength: number, suggestNeighborhood: boolean = false) {
        this.initialSolutionIndex = Math.floor(Math.random() * dataLength);
        if (suggestNeighborhood) {
            this.prepareNeighborhoodForDataLength(dataLength);
        }
    }

    setTabuParams(iterations: number, tenure: number) {
        this.iterations = iterations;
        this.tenure = tenure;
    }

    private prepareNeighborhoodForDataLength(dataLength: number) {
        this.neighborhood = []
        const leftBoundary = 1, rightBoundary = dataLength - 1;
        let start = leftBoundary, end = rightBoundary, middle = Math.floor(dataLength / 2);
        this.calculateNeighborhoodSize(dataLength);
        if (dataLength > this.maxNeighborhoodRegionSize &&
            this.neighborhoodRegionSize === this.maxNeighborhoodRegionSize) {
            for (let i = 1; i <= this.maxNeighborhoodRegionSize; i++) {
                this.neighborhood.push(`${start},${++start}`, `${middle},${++middle}`,`${end-1},${end}`);
                if (end === leftBoundary || start === rightBoundary || middle === rightBoundary) break; 
                end--;
            }
        } else {
            const neighborhoodSize = dataLength > this.maxNeighborhoodRegionSize ? 
                this.neighborhoodRegionSize * 3 + dataLength % 3 : this.neighborhoodRegionSize;
            const neighborhoodSizeReminder = neighborhoodSize % 3;
            const isEven = neighborhoodSizeReminder === 0;
            const normalIterations = Math.floor(neighborhoodSize / 3);
            if (isEven) {
                for (let i = 1; i <= normalIterations; i++) {
                    this.neighborhood.push(`${start},${++start}`, `${middle},${++middle}`,`${end-1},${end}`);
                    if (end === leftBoundary || start === rightBoundary || middle === rightBoundary) break; 
                    end--;
                }
            } else {
                const initialMiddle = middle;
                for (let i = 1; i <= normalIterations; i++) {
                    this.neighborhood.push(`${start},${++start}`,`${middle},${++middle}`,`${end-i},${end}`);
                    if (end === leftBoundary || start === rightBoundary || middle === rightBoundary) break; 
                    end--;
                }
                switch(neighborhoodSizeReminder) {
                    case 2:
                        this.neighborhood.push(`${middle},${middle+1}`, `${initialMiddle-1},${initialMiddle}`);
                        break;
                    case 1:
                        this.neighborhood.push(`${middle},${middle+1}`);
                        break;
                    default:
                        break;        
                }
            }
        }
        this.neighborhood = this.neighborhood.filter((n,i) => this.neighborhood.indexOf(n) === i);
    }

    static retrieveIndicesFromNeighborhoodValue(value: string) {
        const split = value.split(',');
        return split.map(s => parseInt(s));
    }

    private calculateNeighborhoodSize(dataLength: number) {
        let power = 3;
        let diff = this.maxNeighborhoodRegionSize - dataLength;
        if (diff < 0) {
            while (power > 0) {
                if (dataLength >= Math.pow(this.maxNeighborhoodRegionSize,power)) {
                    this.neighborhoodRegionSize = power;
                    return;
                }
                power--;
            }
        } else {
            this.neighborhoodRegionSize = this.maxNeighborhoodRegionSize - diff;
        }
    }
}