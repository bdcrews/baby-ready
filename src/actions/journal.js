import {SubmissionError} from 'redux-form';
import {openPopUp} from '../actions/pop-up';

import {normalizeResponseErrors} from './utils';

export const FETCH_JOURNAL_SUCCESS = 'FETCH_JOURNAL_SUCCESS';
export const fetchJournalSuccess = data => ({
    type: FETCH_JOURNAL_SUCCESS,
    data
});

export const FETCH_JOURNAL_ERROR = 'FETCH_JOURNAL_ERROR';
export const fetchJournalError = error => ({
    type: FETCH_JOURNAL_ERROR,
    error
});

export const fetchJournal = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    var params = {
        username: getState().auth.currentUser.username
    };

    var query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

     //   dispatch(fetchJournalAttempt({title, discription,}));
    return fetch(`/journal?` + query, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }})
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(journaldata => {
            dispatch(fetchJournalSuccess(journaldata));
        })
        .catch(err => {
            dispatch(fetchJournalError(err));
        });
};

export const UPDATE_JOURNAL_SUCCESS = 'UPDATE_JOURNAL_SUCCESS';
export const updateJournalSuccess = data => ({
    type: UPDATE_JOURNAL_SUCCESS,
    data
});

export const UPDATE_JOURNAL_ERROR = 'UPDATE_JOURNAL_ERROR';
export const updateJournalError = error => ({
    type: UPDATE_JOURNAL_ERROR,
    error
});


export const updateJournal = (record) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`/journal/` + getState().user.data.id, {
        method: 'POST',
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
        .then(journal => {
            dispatch(updateJournalSuccess(journal));
        })
        .then(() => {
            dispatch(openPopUp({
              status: 'Update Successful',
              title: 'Update Results',
              description: 'Update Successful'
            }));
        })
        .catch(err => {
            dispatch(updateJournalError(err));
        });
};
