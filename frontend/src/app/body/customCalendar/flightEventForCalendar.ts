import { CalendarEvent } from "calendar-utils";
import { User } from 'src/app/user/user.model';
import { Plane } from '../plane/plane.model';

export interface FlightEvent extends CalendarEvent {
    user: User;
    plane: Plane;
    APDeparture: string;
    APArrival: string;
    peopleOnBoard:  number;
    askingForInstructor: boolean;
    comments: string;
    
  }