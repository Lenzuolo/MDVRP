import { TabuMemoryUnit } from "../params/TabuMemoryUnit";
import { TabuMoveCosts } from "../params/TabuMoveCosts";
import { TabuParams } from "../params/TabuParams";
import { Point } from "../types/Point";
import { RouteDistanceTO } from "../types/RouteDistanceTO";
import { DistanceUtils } from "./DistanceUtils";

export class TabuUtils {
    public static calculateZ(difference: number,frequency: number, zCalculationType: string) {
        switch(zCalculationType) {
            case 'df/c':
                return difference/frequency;
            case 'df*c':
                return difference * frequency;
            case 'df':
                return difference;
            default:
                return Number.MAX_SAFE_INTEGER;            
        }
    }
    public static isAspirationCriterion(cost: TabuMoveCosts, memoryUnit: TabuMemoryUnit) {
        if (cost.z < 0 && memoryUnit.tabuTenure > 0) {
            return true;
        } else {
            return false;
        }
    }
    private static tabuSwapper(pointList: Point[], i1: number, i2: number) {
        const copyList = [...pointList];
        if ((i1 > -1 && i1 < pointList.length) && (i2 > -1 && i2 < pointList.length)) {
            let temp = {...copyList[i1]};
            copyList[i1] = {...copyList[i2]};
            copyList[i2] = temp;
        }
        return copyList;
    }

    public static calculateSwappedRoute(move: string, route: RouteDistanceTO) {
        const indices = TabuParams.retrieveIndicesFromNeighborhoodValue(move);
        if (indices.length !== 2 || isNaN(indices[0]) || isNaN(indices[1])) return new RouteDistanceTO([], []);
        const swappedPoints = TabuUtils.tabuSwapper([...route.points], indices[0], indices[1]);
        return new RouteDistanceTO(swappedPoints, DistanceUtils.calculateDistances(swappedPoints));
    }
}