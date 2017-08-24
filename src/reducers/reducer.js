import {
    UDPATE_PERSONAL_DATA
} from '../actions/actions';

const initialState = {
    personalData: '',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === UDPATE_PERSONAL_DATA) {
        return Object.assign({}, state, {
            personalData: action.data,
            error: null
        });
    }
    return state;
}