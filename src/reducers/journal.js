import {
    FETCH_JOURNAL_SUCCESS,
    FETCH_JOURNAL_ERROR,
    UPDATE_JOURNAL_SUCCESS,
    UPDATE_JOURNAL_ERROR
} from '../actions/journal';

const initialState = {
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_JOURNAL_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_JOURNAL_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    if (action.type === UPDATE_JOURNAL_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === UPDATE_JOURNAL_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
