export const LOAD_MODEL = 'LOAD_MODEL';

export function loadModel(model) {
    return {
        type: LOAD_MODEL,
        model
    };
}
