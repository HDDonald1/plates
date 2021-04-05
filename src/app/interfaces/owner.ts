import { CarEntity } from './car';

export interface OwnerEntity {
    id?: string;
    fName: string;
    lName: string;
    mName: string;
    cars?: CarEntity[];
    }
