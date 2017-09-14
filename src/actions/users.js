import {SubmissionError} from 'redux-form';

import {normalizeResponseErrors} from './utils';
import {openPopUp} from '../actions/pop-up';


export const registerUser = user => dispatch => {
    return fetch(`/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
     //   .then(data => {dispatch(fetchUserDataSuccess(data))})
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const fetchUserDataSuccess = data => ({
    type: FETCH_USER_DATA_SUCCESS,
    data
});

export const FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR';
export const fetchUserDataError = error => ({
    type: FETCH_USER_DATA_ERROR,
    error
});

export const fetchUserData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    var params = {
        username: getState().auth.currentUser.username
    };

    var query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

     //   dispatch(fetchUserDataAttempt({title, discription,}));
    return fetch(`/users?` + query, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(userdata => {
            dispatch(fetchUserDataSuccess(userdata));
        })
        .catch(err => {
            dispatch(fetchUserDataError(err));
        });
};

export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const updateUserDataSuccess = data => ({
    type: UPDATE_USER_DATA_SUCCESS,
    data
});

export const UPDATE_USER_DATA_ERROR = 'UPDATE_USER_DATA_ERROR';
export const updateUserDataError = error => ({
    type: UPDATE_USER_DATA_ERROR,
    error
});

export const updateUserData = (record) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`/users/` + getState().user.data.id, {
        method: 'PUT',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(userdata => {
            dispatch(updateUserDataSuccess(userdata));
        })
        .then(() => {
            dispatch(openPopUp({
              status: 'Update Successful',
              title: 'Update Results',
              description: 'Update Successful',
              returnTo: '/Dashboard'
            }));
        })
        .catch(err => {
            dispatch(updateUserDataError(err));
        });
};
