/* eslint-disable no-loop-func */
import { TabuMemoryUnit } from "../params/TabuMemoryUnit";
import { TabuMoveCosts } from "../params/TabuMoveCosts";
import { TabuParams } from "../params/TabuParams";
import { Customer } from "../types/Customer";
import { Point } from "../types/Point";
import { PointDistanceTO } from "../types/PointDistanceTO";
import { RouteDistanceTO } from "../types/RouteDistanceTO";
import { RouteInformation } from "../types/RouteInformation";
import { Warehouse } from "../types/Warehouse";
import { DistanceUtils } from "../utils/DistanceUtils";
import { TabuUtils } from "../utils/TabuUtils";

const recursiveTabu = (points: Point[], routeOrder: PointDistanceTO[]) => {
    if(points.length === 1) {
        return routeOrder;
    } 
    const mainPoint = points[0];
    const pointsCopy = [...points];
    pointsCopy.shift();
    const distances = DistanceUtils.getDistancesList(mainPoint,pointsCopy);
    const params = new TabuParams(distances.length);
    const memoryStructure: TabuMemoryUnit[] = [];
    const currentMovesTable: TabuMoveCosts[] = [];
    let currentMinValue = distances[params.initialSolutionIndex];

    if (distances.length !== 1) {
        params.neighborhood.forEach(m => {
            memoryStructure.push(new TabuMemoryUnit(m, 0, 0));
            currentMovesTable.push({move: m, difference: 0, z: 0} as TabuMoveCosts);
        });

        for(let i = 0; i < params.iterations; i++) {
            currentMovesTable.forEach(cm => {
                const searchedIndex = params.initialSolutionIndex - parseInt(cm.move);
                let value;
                if(searchedIndex >= 0 && searchedIndex < distances.length) {
                    value = distances[searchedIndex];
                } else {
                    value = Number.MAX_SAFE_INTEGER;
                }
                cm.index = searchedIndex;
                cm.difference = value - currentMinValue;
                const moveMemoryValues = memoryStructure.find(m => m.move === cm.move);
                if(moveMemoryValues) {
                    if (moveMemoryValues.frequency > 0) {
                        if(cm.difference > 0) {
                            cm.z = TabuUtils.calculateZ(cm.difference, moveMemoryValues.frequency, params.zCalculationType[1]);
                        } else if(cm.difference < 0) {
                            cm.z = TabuUtils.calculateZ(cm.difference, moveMemoryValues.frequency, params.zCalculationType[0]);
                        }
                    } else {
                        cm.z = cm.difference;
                    }
                }
            });

            currentMovesTable.sort((a,b) => { return a.z - b.z });
            
            for(let j = 0; j < currentMovesTable.length; j++) {
                const currentMove = currentMovesTable[j]
                const memoryUnit = memoryStructure.find(m => m.move === currentMove.move);
                if (memoryUnit != null) { 
                    if(TabuUtils.isAspirationCriterion(currentMove, memoryUnit) || memoryUnit.tabuTenure === 0) {
                        currentMinValue = distances[currentMove.index];
                        params.initialSolutionIndex = currentMove.index;
                        memoryUnit.tabuTenure = params.tenure;
                        memoryUnit.frequency += 1;
                        break;
                    } else if (memoryUnit.tabuTenure > 0) {
                        memoryUnit.tabuTenure--;
                    }
                }
            }
        }
    }

    const indexOfDistance = distances.findIndex(d => d === currentMinValue);

    routeOrder.push(new PointDistanceTO(pointsCopy[indexOfDistance],distances[indexOfDistance]));
    const newMainPoint = pointsCopy.splice(indexOfDistance,1);
    pointsCopy.unshift(newMainPoint[0]);
    recursiveTabu(pointsCopy, routeOrder);
    return routeOrder
}

const exchangeTabu = (initialRoute: RouteDistanceTO) => {
    const routeOrder = [] as PointDistanceTO[];
    const params = new TabuParams(initialRoute.distances.length, true);
    params.setTabuParams(8, 3);
    const memoryStructure: TabuMemoryUnit[] = [];
    const currentMovesTable: TabuMoveCosts[] = [];
    let currentMinValue = initialRoute.totalDistance;
    let currentRoute = initialRoute;
    params.neighborhood.forEach(m => {
        memoryStructure.push(new TabuMemoryUnit(m, 0, 0));
        currentMovesTable.push({move: m, difference: 0, z: 0} as TabuMoveCosts);
    });

    for(let i = 0; i < params.iterations; i++) {
        currentMovesTable.forEach(cm => {
            const swappedRoute = TabuUtils.calculateSwappedRoute(cm.move, currentRoute);
            cm.difference = swappedRoute.totalDistance - currentMinValue;
            const moveMemoryValues = memoryStructure.find(m => m.move === cm.move);
            if(moveMemoryValues) {
                if (moveMemoryValues.frequency > 0) {
                    if(cm.difference > 0) {
                        cm.z = TabuUtils.calculateZ(cm.difference, moveMemoryValues.frequency, params.zCalculationType[1]);
                    } else if(cm.difference < 0) {
                        cm.z = TabuUtils.calculateZ(cm.difference, moveMemoryValues.frequency, params.zCalculationType[0]);
                    }
                } else {
                    cm.z = cm.difference;
                }
            }
        });

        currentMovesTable.sort((a,b) => { return a.z - b.z });
        
        for(let j = 0; j < currentMovesTable.length; j++) {
            const currentMove = currentMovesTable[j]
            const memoryUnit = memoryStructure.find(m => m.move === currentMove.move);
            if (memoryUnit != null) { 
                if(TabuUtils.isAspirationCriterion(currentMove, memoryUnit) || memoryUnit.tabuTenure === 0) {
                    currentRoute = TabuUtils.calculateSwappedRoute(currentMove.move, currentRoute);
                    memoryUnit.tabuTenure = params.tenure;
                    memoryUnit.frequency += 1;
                    break;
                } else if (memoryUnit.tabuTenure > 0) {
                    memoryUnit.tabuTenure--;
                }
            }
        }
    }

    routeOrder.push(new PointDistanceTO(currentRoute.points[0], 0));
    for (let i = 1; i < currentRoute.points.length; i++) {
        routeOrder.push(new PointDistanceTO(currentRoute.points[i], currentRoute.distances[i-1]));
    }
    return routeOrder;
}

export class VehicleRoutingService {
    public static extensiveTabuSearch(warehouse: Warehouse, groupedCustomers: Customer[][]) {
        const routes: RouteInformation[] = [];
        groupedCustomers.forEach((gr,i) => {
            const arr = [{...warehouse}];
            gr.forEach(g => arr.push(g));
            const points = DistanceUtils.toPointList(arr);
            const routeOrder = recursiveTabu(points, [] as PointDistanceTO[]);
            const warehousePoint = {xPos: warehouse.xPos, yPos: warehouse.yPos} as Point
            routeOrder.push({point: warehousePoint, distance: DistanceUtils.getDistance(routeOrder[routeOrder.length-1].point, warehousePoint)});
            const routingList = DistanceUtils.createRoutingList(routeOrder,warehouse, gr);
            const routeInformation = new RouteInformation(routingList);
            routes[i] = routeInformation;
        });


        return routes;
    }

    public static exchangeTabuSearch(warehouse: Warehouse, groupedCustomers: Customer[][]) {
        const routes: RouteInformation[] = [];
        //TODO:
        // 1. Generacja pierwszego losowego rozwiązania
        // 2. Na jakiej podstawie generować tablice ruchów
        // 3. Generacja wielu rozwiązań
        // 4. Co zwrócić po wykonaniu algorytmu - będzie już wiadoma odległośc całkowita
        groupedCustomers.forEach((gr, i) => {
            const initialRoute = DistanceUtils.generateRandomRoute(warehouse, gr);
            const routeOrder = exchangeTabu(initialRoute);
            const routingList = DistanceUtils.createRoutingList(routeOrder,warehouse, gr);
            const routeInformation = new RouteInformation(routingList);
            routes[i] = routeInformation;
        });

        return routes;
    }
}