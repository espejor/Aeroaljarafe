import { User } from 'src/app/user/user.model';
import { Plane } from '../plane/plane.model';

export class Flight {
    _id:string;
    status: [{
        code:   number,
        status: string,
        date:   Date
    }];
    user:   User;
    plane:  Plane;
    comments:    string;
    initScheduled:   Date;
    endScheduled:   Date;
    initActual:     Date;
    endActual:      Date;
    initHourmeter:  number;
    endHourmeter:   number;
    peopleOnBoard:  number;
}
