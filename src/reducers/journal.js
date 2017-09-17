import {
    FETCH_JOURNAL_SUCCESS,
    FETCH_JOURNAL_ERROR,
//    NEW_JOURNAL_SUCCESS,
    CLOSE_UPDATE_JOURNAL_PAGE,
    OPEN_NEW_JOURNAL_PAGE,
    CLOSE_NEW_JOURNAL_PAGE,
    NEW_JOURNAL_ERROR,
    SET_JOURNAL_PAGE,
    FETCH_ONE_JOURNAL_SUCCESS,
    SET_JOURNAL_FILTER
} from '../actions/journal';

const initialState = {
    activePage: 1,
    updatingPage: false,
    addingPage: false,
    pageQuantity: 2,
    data: {
        count: 0,
        pages: []
    },
    filter: {
      title: '',
      doctorCheckbox: 'any',
      importantCheckbox: 'any'
    }
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
    } else if (action.type === CLOSE_NEW_JOURNAL_PAGE) {
        console.log("a");
        return Object.assign({}, state, {
            addingPage: false
        });
    } else if (action.type === OPEN_NEW_JOURNAL_PAGE) {
        console.log("b");
        return Object.assign({}, state, {
            addingPage: true
        });
    }else if (action.type === FETCH_ONE_JOURNAL_SUCCESS) {
        return Object.assign({}, state, {
            singleJournal: action.data,
            updatingPage: true
        });
    }else if (action.type === SET_JOURNAL_FILTER) {
        return Object.assign({}, state, {
            filter: action.data
        });
    }
    return state;
}
