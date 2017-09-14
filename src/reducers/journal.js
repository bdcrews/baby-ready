import {
    FETCH_JOURNAL_SUCCESS,
    FETCH_JOURNAL_ERROR,
//    NEW_JOURNAL_SUCCESS,
    CLOSE_UPDATE_JOURNAL_PAGE,
    NEW_JOURNAL_ERROR,
    SET_JOURNAL_PAGE,
    FETCH_ONE_JOURNAL_SUCCESS
} from '../actions/journal';

const initialState = {
    activePage: 1,
    updatingPage: false,
    data: ''
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
 //   }
 //   if (action.type === NEW_JOURNAL_SUCCESS) {
 //       return Object.assign({}, state, {
 //           data: action.data,
 //           error: null
 //       });
    } else if (action.type === NEW_JOURNAL_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === SET_JOURNAL_PAGE) {
        return Object.assign({}, state, {
            activePage: action.data,
            error: null
        });
    } else if (action.type === CLOSE_UPDATE_JOURNAL_PAGE) {
        return Object.assign({}, state, {
            updatingPage: false
        });
    }else if (action.type === FETCH_ONE_JOURNAL_SUCCESS) {
        return Object.assign({}, state, {
            singleJournal: action.data,
            updatingPage: true
        });
    }
    return state;
}
