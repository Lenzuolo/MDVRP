export class RouteInformation {
    route: any[];
    totalDistance: number = 0;

    constructor(route: any[]) {
        this.route = route;
        this.calculateTotal();
    }

    private calculateTotal() {
        this.route.forEach(r => {
            const number = Number(r);
            if(!isNaN(r)) {
                this.totalDistance += number;
            }
        })
    }
}