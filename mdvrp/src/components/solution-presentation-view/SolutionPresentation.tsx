import { useContext } from 'react';
import { MainContext } from '../../contexts';
import { ReturnButton } from '../inputs';
import { RouteView } from '../route-view-component';
import './solution-presentation.css';


const SolutionPresentation = () => {

    const {routes} = useContext(MainContext);

    return (
        <div className="presentation-body">
            <div className='testing-button'>
                <ReturnButton/>
            </div>
            <h2>Following routes have been calculated:</h2>
            <div className='result-list'>
                {
                    routes.map(r => r.map((rr,i) => (
                    <div style={{'display':'flex','justifyContent':'space-between','width':'100%'}}>
                        <RouteView routeInfo={rr} showDistanceUp={false}/>
                    </div>)))
                }
            </div>
        </div>
    );
}

export default SolutionPresentation;