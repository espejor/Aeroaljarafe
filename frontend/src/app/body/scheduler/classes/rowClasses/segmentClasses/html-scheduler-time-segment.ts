import { IhtmlSchedulerSegment } from '../../../interfaces/ihtml-scheduler-segment';
import { HtmlSchedulerSegment } from './html-scheduler-segment';

export class HtmlSchedulerTimeSegment {
    
    private _minutes: number;
    private _label: string;

    constructor(type:string,minutes:number){
        this.minutes = minutes;
    }

    set minutes(min:number){
        this._minutes = min;
        this.createStringLabel();
    }

    get minutes():number{
        return this._minutes;
    }


    public get label() : string {
        return this._label;
    }

    
    public set label(v : string) {
        this._label = v;
    }  
    

    private createStringLabel(){
        var date = new Date(0, 0, 0, this._minutes / 60, this._minutes % 60, 0); 
        this._label = `${
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        }:${date.getMinutes() == 0 ? "00" : date.getMinutes()}`;
    }
}
