export const UPDATE_VIEW_MODEL = 'UPDATE_VIEW_MODEL';

export function updateViewModel(people) {
    return {
        type: UPDATE_VIEW_MODEL,
        people
    };
}

export const CREATE_PERSON_VIEW = 'CREATE_PERSON_VIEW';

export function createPersonView(target, people) {
    return {
        type: CREATE_PERSON_VIEW,
        target,
        people
    };
}
