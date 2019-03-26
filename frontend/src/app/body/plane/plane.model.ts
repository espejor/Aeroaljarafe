import { Model } from '../model/model.model';

export class Plane {
    _id:string;
    plate: string;
    model:Model;
    extension: string;
    status: any;
    availability: any;
    nextMaintenance: Date;
    hours: number;
}

