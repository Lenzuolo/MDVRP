import { Customer } from "../types/Customer";
import { DepotRegionCluster } from "../types/DepotRegionCluster";
import { Warehouse } from "../types/Warehouse";
import { DistanceUtils } from "../utils/DistanceUtils";
import kmeans, {KMeans, UniMultiDimensionalArray} from "kmeans-ts";

const vectorizeData = (arr: Customer[]) => {
    const result: UniMultiDimensionalArray = [];
    arr.forEach(c => {
        result.push([c.xPos,c.yPos]);
    })
    return result;
}

const splitIntoIndexedGroups = (indexes: number[], customers: Customer[], numberOfGroups: number) => {
    const arr: Customer[][] = [];
    for(let i = 0; i < numberOfGroups; i++){
        arr.push([]);
    }

    if(indexes.length === customers.length) {
        for(let i = 0; i < indexes.length; i++) {
            arr[indexes[i]].push(customers[i]);
        }
    }

    return arr;
}

export class ClusterService {
    public static depotClustering(warehouses: Warehouse[], customers: Customer[]): DepotRegionCluster[]{
        const clusters: DepotRegionCluster[] = [];

        warehouses.forEach(w => clusters.push(new DepotRegionCluster(w,[])));

        customers.forEach(c => {
            let minDist = 0;
            let warehouse: Warehouse;
            warehouses.forEach(w => {
                if (c.xPos && c.yPos && w.xPos && w.yPos) {
                    const distance = DistanceUtils.getDistance({xPos: c.xPos, yPos: c.yPos}, {xPos: w.xPos, yPos: w.yPos});
                    if(minDist === 0 || minDist > distance) {
                        minDist = distance;
                        warehouse = w;
                    }
                }
            });
            clusters.find(cl => cl.warehouse.id === warehouse.id)?.customers.push(c);
        })

        return clusters;
    }

    public static carKMeansClustering(customers: Customer[], cars: number): Customer[][] {
        const vectorized = vectorizeData(customers);
        const kMeansRes: KMeans = kmeans(vectorized, cars);
        return splitIntoIndexedGroups(kMeansRes.indexes,customers,cars);
    }
}
