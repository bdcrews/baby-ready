import {
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_ERROR,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_ERROR
} from '../actions/users';

const validColors = ['pink','green','blue'];

const initialState = {
    data: {

    // start with random color theme
      colorTheme: validColors[Math.floor(Math.random()*validColors.length)]
    },
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_USER_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_USER_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    if (action.type === UPDATE_USER_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === UPDATE_USER_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
