import {openPopUp} from '../actions/pop-up';

import {normalizeResponseErrors, getFromServer} from './utils';

export const FETCH_JOURNAL_SUCCESS = 'FETCH_JOURNAL_SUCCESS';
export const fetchJournalSuccess = data => ({
    type: FETCH_JOURNAL_SUCCESS,
    data
});

export const FETCH_ONE_JOURNAL_SUCCESS = 'FETCH_ONE_JOURNAL_SUCCESS';
export const fetchOneJournalSuccess = data => ({
    type: FETCH_ONE_JOURNAL_SUCCESS,
    data
});

export const FETCH_JOURNAL_ERROR = 'FETCH_JOURNAL_ERROR';
export const fetchJournalError = error => ({
    type: FETCH_JOURNAL_ERROR,
    error
});

export const fetchJournal = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    const query = {
        username: getState().auth.currentUser.username,
        activePage: getState().journal.activePage,
        pageQuantity: getState().journal.pageQuantity,
        sortfield: "timestamp",
        sortdir: "desc"
    }
    console.log(getState().journal.filter);
    if('title' in getState().journal.filter) query['title'] = getState().journal.filter.title;
    if('doctorCheckbox' in getState().journal.filter) query['doctorCheckbox'] = getState().journal.filter.doctorCheckbox;
    if('importantCheckbox' in getState().journal.filter) query['importantCheckbox'] = getState().journal.filter.importantCheckbox;

    console.log(query);
    
    return getFromServer("/journal", query, authToken)
        .then(journaldata => {
            dispatch(fetchJournalSuccess(journaldata));
        })
        .catch(err => {
            dispatch(fetchJournalError(err));
        });
};

export const fetchOneJournal = (_id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return getFromServer("/journal/" + _id, '', authToken)
        .then(journaldata => {
            dispatch(fetchOneJournalSuccess(journaldata));
        })
        .catch(err => {
            dispatch(fetchJournalError(err));
        });
};

//export const NEW_JOURNAL_SUCCESS = 'NEW_JOURNAL_SUCCESS';
//export const newJournalSuccess = data => ({
//    type: NEW_JOURNAL_SUCCESS,
//    data
//});

export const NEW_JOURNAL_ERROR = 'NEW_JOURNAL_ERROR';
export const newJournalError = error => ({
    type: NEW_JOURNAL_ERROR,
    error
});


export const newJournal = (record) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`/journal/` + getState().user.data.userid, {
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
            dispatch(fetchJournal());
        })
        .then(() => {
            dispatch(openPopUp({
              status: 'Successful',
              title: 'Update Results',
              description: 'New journal entry added.'
            }));
        })
        .catch(err => {
            dispatch(newJournalError(err));
        });
};

export const SET_JOURNAL_PAGE = 'SET_JOURNAL_PAGE';
export const setJournalPage = data => ({
    type: SET_JOURNAL_PAGE,
    data
});

export const CLOSE_UPDATE_JOURNAL_PAGE = 'CLOSE_UPDATE_JOURNAL_PAGE';
export const closeUpdateJournalPage = () => ({
    type: CLOSE_UPDATE_JOURNAL_PAGE
});

export const CLOSE_NEW_JOURNAL_PAGE = 'CLOSE_NEW_JOURNAL_PAGE';
export const closeNewJournalPage = () => ({
    type: CLOSE_NEW_JOURNAL_PAGE
});

export const OPEN_NEW_JOURNAL_PAGE = 'OPEN_NEW_JOURNAL_PAGE';
export const openNewJournalPage = () => ({
    type: OPEN_NEW_JOURNAL_PAGE
});

export const updateJournal = (_id, record) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`/journal/` + _id, {
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
        .then(journal => {
            dispatch(fetchJournal());
        })
        .then(() => {
            dispatch(openPopUp({
              status: 'Successful',
              title: 'Update Results',
              description: 'Journal entry updated.'
            }));
        })
        .then(() => {
            dispatch(closeUpdateJournalPage());
        })
        .catch(err => {
            dispatch(newJournalError(err));
        });
};


export const filterJournal = (filter) => (dispatch, getState) => {
    console.log(filter);
        
    dispatch(setJournalFilter(filter));
    dispatch(setJournalPage(1));

    dispatch(fetchJournal());
}

export const SET_JOURNAL_FILTER = 'SET_JOURNAL_FILTER';
export const setJournalFilter = (filter) => ({
    type: SET_JOURNAL_FILTER,
    data: filter
});
