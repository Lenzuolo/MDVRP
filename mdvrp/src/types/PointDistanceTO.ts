import { Point } from "./Point";

export class PointDistanceTO {
    point: Point;
    distance: number;

    constructor(point: Point, distance: number) {
        this.point = point;
        this.distance = distance;
    }
}