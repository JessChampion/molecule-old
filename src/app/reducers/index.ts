import { Store } from 'redux';

import { IModelState } from './reducers/model';
import { IViewModelState } from './reducers/viewModel';

//
// Store interfaces
//
// The interfaces may be used by reducers to help enforce type safety.
// They may also be used by components that have state mappers that
// subscribe to store changes.
//

export interface IStore {
    viewModel: IViewModelState;
    model: IModelState;
}

export interface IStoreContext { store: Store<any>; }

export { default as model } from './reducers/model';
export { default as viewModel } from './reducers/viewModel';
