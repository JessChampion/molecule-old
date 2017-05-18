import {LOAD_MODEL} from '../../actions/model';

export interface IViewModelState {
  atoms: any[];
}

const parseModel = (jsonModel) => {
  console.log('here');
  console.log(jsonModel);
  return jsonModel;
};

export default function modelReducer(state: IViewModelState = {atoms: []}, action): IViewModelState {
  switch (action.type) {
    case LOAD_MODEL: {
      state.atoms = parseModel(action.model);
      return state;
    }
  }
  return state;
};
