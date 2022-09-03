import { FC, useState } from "react";
import { ResourceManager } from "../../utils/ResourceManager";
import { SolverFormComponent } from "../solver-form-component";
import './landing-page.css';

const LandingPage: FC = () => {

    const [languageContext,setLanguageContext] = useState('EN');

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
                <SolverFormComponent/>
            </div>
        </div>
    );
}

export default LandingPage;