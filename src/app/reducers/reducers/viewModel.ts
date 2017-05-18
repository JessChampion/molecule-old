import {UPDATE_VIEW_MODEL} from '../../actions/viewModel';
import * as R from 'ramda';

export interface IViewModelState {
  atoms: any[];
}

const processPeople = R.map((person) => {
    return {
        color: 'blue',
        person
    };
});

const parseModel = (jsonModel) => {
  console.log('create view model from model');
  return processPeople(jsonModel.people);
};

export default function modelReducer(state: IViewModelState = {atoms: []}, action): IViewModelState {
  switch (action.type) {
    case UPDATE_VIEW_MODEL: {
      state.atoms = parseModel(action.model);
      return state;
    }
  }
  return state;
};
