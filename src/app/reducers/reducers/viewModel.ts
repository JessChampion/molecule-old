import {CREATE_PERSON_VIEW, UPDATE_VIEW_MODEL} from '../../actions/viewModel';
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

const parseModel = (people) => {
    console.log('create view model from model');
    return processPeople(people);
};

const getTeamFromAtom = R.path(['person', 'team']);

const isInTeam = (team, atom) => {
    return R.compose(R.contains(team), getTeamFromAtom)(atom);
};

const setTeamColor = (team, color, atoms) => {
    atoms = R.map((atom) => {
        if (isInTeam(team, atom)) {
            atom = R.assoc('color', color)(atom);
        }
        return atom;
    }, atoms);
    return atoms;
};
const getTeams = R.useWith(R.compose(R.prop('team'), R.find), [R.propEq('id'), R.identity]);

const createPersonView = (target, people) => {
    const teams = getTeams(target, people);
    let atoms = processPeople(people);
    R.forEach((team) => {
        atoms = setTeamColor(team, 'yellow', atoms);
    }, teams);
    return atoms;
};

export default function modelReducer(state: IViewModelState = {atoms: []}, action): IViewModelState {
    switch (action.type) {
        case UPDATE_VIEW_MODEL: {
            state.atoms = parseModel(action.people);
            return state;
        }
        case CREATE_PERSON_VIEW: {
            state.atoms = createPersonView(action.target, action.people);
            return state;
        }
    }
    return state;
};
