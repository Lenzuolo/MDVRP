import { Customer } from "../types/Customer";
import { Point } from "../types/Point";
import { PointDistanceTO } from "../types/PointDistanceTO";
import { RouteDistanceTO } from "../types/RouteDistanceTO";
import { Warehouse } from "../types/Warehouse";

const isPointFromObject = (point: Point, obj: any) => {
    if(obj['xPos'] && obj['yPos']) {
        return point.xPos === obj.xPos && point.yPos === obj.yPos 
    }
    return false;
}

const equalPoints = (pointA: Point, pointB: Point) => {
    return pointA.xPos === pointB.xPos && pointA.yPos === pointB.yPos;
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
        const ignoreFirstPoint = equalPoints(routeOrder[0].point, routeOrder[routeOrder.length - 1].point);
        routeOrder.slice(ignoreFirstPoint ? 1 : 0).forEach((ro,i) => {
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
    public static calculateDistances(pointList: Point[]){
        const distances = [];
        for (let i = 0, j = 1; i < pointList.length - 1 && j < pointList.length; i++, j++) {
            distances.push(DistanceUtils.getDistance(pointList[i], pointList[j]));
        }
        return distances;
    }

    public static generateRandomRoute(warehouse: Warehouse, customers: Customer[]): RouteDistanceTO {
        let elementsToConsume = customers.length;
        let customersCopy = [...customers];
        const dynamicPoints: any[] = [];
        while (elementsToConsume > 0) {
            const index = Math.floor(Math.random() * elementsToConsume);
            const point: Point = {xPos: customersCopy[index].xPos, yPos: customersCopy[index].yPos} as Point;
            dynamicPoints.push(point);
            elementsToConsume--;
            customersCopy.splice(index,1);
        }
        const warehousePoint = {xPos: warehouse.xPos, yPos: warehouse.yPos} as Point;
        const points = [warehousePoint, ...dynamicPoints, warehousePoint];
        return new RouteDistanceTO(points,DistanceUtils.calculateDistances(points));
    }
}