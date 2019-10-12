import { Injectable, EventEmitter } from '@angular/core';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _store = {};

  private _state$ = new EventEmitter<any>();

  constructor() { }

  private getStore = (): any => {
    return this._store;
  };

  private getState$ = (): EventEmitter<any> => {
    return this._state$;
  }

  private updateState = (state: string): void => {
    this.getState$().emit(state);
  }

  setState = (state: any): void => {
    this.getStore[state] = state;

    this.updateState(state);
  };

  getState = (state: string): any => {
    return this.getStore[state];
  };

  onStoreSubscribed$ = this.getState$();

  onStateSubscribed$ = (stateKey: string) => {
    return this.getState$()
      .pipe(
        startWith(stateKey),
      )
  };
}
