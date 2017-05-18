export const UPDATE_VIEW_MODEL = 'UPDATE_VIEW_MODEL';

export function updateViewModel(model) {
    return {
        type: UPDATE_VIEW_MODEL,
        model
    };
}
