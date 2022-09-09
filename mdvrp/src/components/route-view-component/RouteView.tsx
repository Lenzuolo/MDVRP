import { FC } from "react";
import { RouteInformation } from "../../types/RouteInformation";
import { NumberUtils } from "../../utils/NumberUtils";
import './route-view.css';

interface RouteViewProps {
    routeInfo: RouteInformation;
    showDistanceUp: boolean;
}

const RouteView: FC<RouteViewProps> = (props: RouteViewProps) => {
    
    const mapRoute = () => {
        return props.routeInfo.route.map((r,i) => {
            const number = Number(r);
            if(isNaN(number)) {
                return <h4 key={`${r}-${i}`}>{r}</h4>;
            } else {
                return (
                    <div key={`distance-${number}-${i}`} className={`arrow-distance ${props.showDistanceUp ? '' : 'down'}`}>
                        <h5>{NumberUtils.roundFloat(number,2)}</h5>
                        <h5>→</h5>
                    </div>
                )
            }
        })
    }


    return (
        <div className="route-box">
            {mapRoute()}
            <span>{`Total: ${NumberUtils.roundFloat(props.routeInfo.totalDistance)}`}</span>
        </div>
    );
}

export default RouteView;