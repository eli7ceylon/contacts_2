
export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';

export const ADD_CONTACT = 'ADD_CONTACT';


export const cancelError = () =>
{
    return {
        type: 'CANCEL_ERROR'
    }
}

export const fetchContactsRequest = () => {
    return {
        type : FETCH_CONTACTS_REQUEST,
    }
}

export const fetchContactsSuccess = contacts => {
    return {
        type : FETCH_CONTACTS_SUCCESS,
        payload : contacts

    }
}

export const fetchContactsFailure = error => {
    return {
        type : FETCH_CONTACTS_FAILURE,
        payload : error
    }
}


export const addContactRequest = () => {
    return {
        type : ADD_CONTACT_REQUEST,
    }
}


export const addContact = contact => {
    return {
        type : ADD_CONTACT,
        payload : contact

    }
};
//
// export const addContactFailure = error => {
//     return {
//         type : ADD_CONTACT_FAILURE,
//         payload : error
//     }
// }
export const deleteContact = (index) =>{
    return {
        type: 'DELETE',
        payload: index
    }
}
