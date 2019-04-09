import { Subject, Observable } from 'rxjs';

export class HtmlButton{
    private _height:number = 2;
    private height$ = new Subject<number>(); // Altura del botón en rem. Es un Observable



    public getHeight$(): Observable<number> {
        return this.height$.asObservable();
      }
      public setHeight$(value: number) {
        this._height = value;
        this.height$.next(this._height);
      }
}