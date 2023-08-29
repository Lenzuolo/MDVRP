import { Point } from "./Point";

export class RouteDistanceTO {
    points: Point[]
    distances: number[];
    totalDistance = 0;

    constructor(points: Point[], distances: number[]) {
        this.points = points;
        this.distances = distances;
        this.calculateTotalDistance();
    }

    private calculateTotalDistance() {
        this.totalDistance = this.distances.reduce((a,b) => a+b, 0);
    }
}