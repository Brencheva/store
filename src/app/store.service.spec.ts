import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { tap } from 'rxjs/operators'
import { StoreService } from './store.service';
import { empty } from '../../node_modules/rxjs';

fdescribe('StoreService', () => {
  let store: StoreService;

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const store: StoreService = TestBed.get(StoreService);

    expect(store).toBeTruthy();
  });

  it('should set state is equal "empty"', () => {
    store = TestBed.get(StoreService);

    const empty = null;
    store.setState(empty);
    const emptyState = store.getState(empty);

    expect(emptyState).toBeNull();
  });

  it('should subscrubed on store and emitted "newState"', fakeAsync(() => {
    store = TestBed.get(StoreService);

    const newState = 'some value';
    let storeLastState;
    store.onStoreSubscribed$.subscribe((state) => storeLastState = state);
    store.setState(newState);

    tick();
    expect(storeLastState).toEqual(newState);
  }));

  it('should subscrubed on store and emitted state primitive values 3 times', fakeAsync(() => {
    store = TestBed.get(StoreService);
    let state;
    let storeLastStateValue;

    store.onStoreSubscribed$.subscribe((stateFromStore) => {
      if (stateFromStore === state) {
        storeLastStateValue = store.getState(state);
      }
    });
    state = "value";
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);

    state = "last value";
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);

    state = 123.45;
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);
  }));

  it('should subscrubed on store and emitted state as object', fakeAsync(() => {
    store = TestBed.get(StoreService);
    let state;
    let storeLastStateValue;

    store.onStoreSubscribed$.subscribe((stateFromStore) => {
      if (stateFromStore === state) {
        storeLastStateValue = store.getState(state);
      }
    });

    state = {
      user: 'Alex',
      years: 22
    };
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);

    state.years = 95;
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);

    state = {
      address: "333, street Main, 94",
      deal: {
        id: 345,
        value: "Ko ko"
      } 
    };
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);
  }));

  it('should subscrubed on store item and emitted item value', fakeAsync(() => {
    store = TestBed.get(StoreService);
    let state;
    let storeLastStateValue;

    store.onStoreSubscribed$.subscribe((stateFromStore) => {
      if (stateFromStore === state) {
        storeLastStateValue = store.getState(state);
      }
    });

    state = {
      user: 'Alex',
      years: 22
    };
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);

    state.years = 95;
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);

    state = {
      address: "333, street Main, 94",
      deal: {
        id: 345,
        value: "Ko ko"
      } 
    };
    store.setState(state);

    tick();
    expect(storeLastStateValue).toEqual(state);
  }));

  it('should subscrubed on store item and emitted item value async', fakeAsync(() => {
    store = TestBed.get(StoreService);
    let state;
    let storeLastStateValue;

    store.onStoreSubscribed$.subscribe((stateFromStore) => {
      if (stateFromStore === state) {
        storeLastStateValue = store.getState(state);
      }
    });

    setTimeout(()=> {
      state = {
        user: 'Alex',
        years: 22
      };

      store.setState(state);
    });  

    tick();
    expect(storeLastStateValue).toEqual(state);
  }));

  it('should subscrubed on store item and get value from store at once', fakeAsync(() => {
    store = TestBed.get(StoreService);
    let state;
    let storeFromStcore;

    state = {
      user: 'Alex',
      years: 22
    };
    store.onStateSubscribed$('state').subscribe((stateFromStore) => storeFromStcore = stateFromStore);

    tick();
    expect(state).toEqual(storeFromStcore);
  }));
});
