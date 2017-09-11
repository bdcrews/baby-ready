import {
    OPEN_POP_UP,
    CLOSE_POP_UP
} from '../actions/pop-up';

const initialState = {
    status: 'closed',
    title: '',
    description: ''
};

export default function reducer(state = initialState, action) {
    if (action.type === OPEN_POP_UP) {
        return Object.assign({}, state, action.popup);
    }
    if (action.type === CLOSE_POP_UP) {
        return Object.assign({}, state, initialState);
    }
    return state;
}
