import {SubmissionError} from 'redux-form';

import {normalizeResponseErrors} from './utils';

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