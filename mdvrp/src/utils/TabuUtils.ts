import { TabuMemoryUnit } from "../params/TabuMemoryUnit";
import { TabuMoveCosts } from "../params/TabuMoveCosts";

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
}