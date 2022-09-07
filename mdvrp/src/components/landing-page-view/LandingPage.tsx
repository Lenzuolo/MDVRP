import { FC, useContext, useState } from "react";
import { MainContext } from "../../contexts";
import { ResourceManager } from "../../utils/ResourceManager";
import { Case, Switch } from "../helpers";
import { SolverFormComponent } from "../solver-form-component";
import './landing-page.css';

const LandingPage: FC = () => {

    const [languageContext,setLanguageContext] = useState('EN');
    const { step } = useContext(MainContext);

    return (
        <div className="landing-page">
            <div className="header">
                <h1>{ResourceManager.getLabel('Title',languageContext)}</h1>
                <div id="spacer"/>
                <div className="language-button-group">
                    <button id='btnENG' onClick={() => setLanguageContext('EN')}>
                        {ResourceManager.getLabel('EN',languageContext)}
                    </button>
                    <button id='btnPL' onClick={() => setLanguageContext('PL')}>
                        {ResourceManager.getLabel('PL',languageContext)}
                    </button>
                </div>
            </div>
            <div className="body">
                <Switch value={step} defaultComponent={<div/>}>
                    <Case value={1}>
                        <SolverFormComponent/>
                    </Case>
                    <Case value={2}>
                        
                    </Case>
                </Switch>
            </div>
        </div>
    );
}

export default LandingPage;