import {LOAD_MODEL} from '../../actions/model';

export interface IModelState {
  people: any[];
}

const parseJSON = (jsonModel) => {
  console.log('load model from JSON');
  return jsonModel.people;
};

export default function modelReducer(state: IModelState = {people: []}, action): IModelState {
  switch (action.type) {
    case LOAD_MODEL: {
      state.people = parseJSON(action.model);
      return state;
    }
  }
  return state;
}
