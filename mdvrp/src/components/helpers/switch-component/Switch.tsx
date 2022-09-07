import { FC } from "react";

interface SwitchProps {
    value: string | number;    
    defaultComponent: JSX.Element;
    children: JSX.Element[];
}

interface CaseProps {
    value: string | number;
    children: React.ReactNode
}

export const Switch: FC<SwitchProps> = (props) => {
    return props.children.find(child => child.props['value'] === props.value) ?? props.defaultComponent;
}

export const Case: FC<CaseProps> = (props) => {
    return (<>{props.children}</>);
}

