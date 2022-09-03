import { labelsEN, LabelsENKey } from "../assets/labels_en";
import { labelsPL, LabelsPLKey } from "../assets/labels_pl";

export class ResourceManager {
    public static getLabel(labelName: string, languageContext: string): string {
        switch (languageContext) {
            case 'EN':
                return labelsEN[labelName as LabelsENKey];
            case 'PL':
                return labelsPL[labelName as LabelsPLKey];
            default:
                return '';    
        }
    } 
}