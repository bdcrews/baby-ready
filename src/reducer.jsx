import {
  LOG_IN,
} from './actions';

const initialState = {
  loggedIn: false
};

export default (state=initialState, action) => {
  if (action.type === LOG_IN) {
  	state = Object.assign({},initialState,{loggedIn: true});
    return state;
  }
  return state;
};

