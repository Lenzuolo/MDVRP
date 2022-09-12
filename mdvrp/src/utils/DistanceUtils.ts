import { Customer } from "../types/Customer";
import { Point } from "../types/Point";
import { PointDistanceTO } from "../types/PointDistanceTO";
import { Warehouse } from "../types/Warehouse";

const isPointFromObject = (point: Point, obj: any) => {
    if(obj['xPos'] && obj['yPos']) {
        return point.xPos === obj.xPos && point.yPos === obj.yPos 
    }
    return false;
}

export class DistanceUtils {
    public static getDistance(a: Point, b: Point): number {
        const squareSum = Math.pow(b.xPos - a.xPos, 2) + Math.pow(b.yPos - a.yPos, 2);
        return Math.sqrt(squareSum);
    }
    public static toPointList(arr: any[]): Point[] {
        const result: Point[] = [];
        arr.forEach(el => {
            if(el['xPos'] && el['yPos']) {
                result.push({xPos: el['xPos'], yPos: el['yPos']} as Point);
            }
        })
        return result;
    }
    public static getDistancesList(mainPoint: Point, otherPoints: Point[]) {
        const result: number[] = [];
        otherPoints.forEach(op => {
            result.push(DistanceUtils.getDistance(mainPoint, op));
        })
        return result;
    }

    public static createRoutingList(routeOrder: PointDistanceTO[], warehouse: Warehouse, customers: Customer[]) {
        const result: any[] = [warehouse.name,warehouse.name];

        routeOrder.forEach((ro,i) => {
            let customer = customers.find(c => isPointFromObject(ro.point,c));
            const index = result.length-1;
            if(customer != null) {
                if ( i !== routeOrder.length)
                result.splice(index, 0, ro.distance, customer.name);
            } else {
                if (isPointFromObject(ro.point, warehouse)) {
                    result.splice(index, 0, ro.distance);
                }
            }
        })

        return result;
    }
}