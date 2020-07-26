import Contact from "../model/contact";
import {
    ADD_CONTACT, FETCH_CONTACTS_FAILURE, FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_REQUEST,
    fetchContactsFailure,
    fetchContactsRequest,
    fetchContactsSuccess, addContactRequest,
} from "../actions";

const initialState = {
    contacts : [],
    error: '',
    isLoading: ''
}

const contactsListReducer = (state = initialState, action) =>
{
    switch(action.type){
        case ADD_CONTACT:
            if( action.payload.isEdit )
            {
                const _contacts = [...state.contacts];
                const targetIndex = _contacts.findIndex(contact =>contact.id === action.payload.contact.id);
                _contacts[targetIndex] =  action.payload.contact;
                console.log('edit', _contacts);
                return {
                    isLoading: false,
                    error:false,
                    contacts:  _contacts
                }
            }
            else
                {
                return {
                    isLoading: false,
                    error:false,
                    contacts: state.contacts.concat([action.payload.contact])
                }
            }

        case FETCH_CONTACTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_CONTACTS_SUCCESS:
            return {
                contacts : action.payload,
                isLoading: false,
                error: ''
            };
        case FETCH_CONTACTS_FAILURE:
            return {
                contacts : [],
                isLoading: false,
                error: action.payload
            };
        case 'DELETE':
            return {
                ...state,
                contacts:[...state.contacts.slice(0,action.payload), ...state.contacts.slice(action.payload+1, state.contacts.length)]
            }
        default: return state;

    }
}
//
// export const fetchRandomUser = () => {
//     return function(dispatch){
//         dispatch(addContactRequest());
//
//         Contact.getRandomUser().then((response) => {
//            let randomContact = response.data.results[0];
//
//             let contact = {
//                 name: randomContact.name.first + ' ' + randomContact.name.last,
//                 phone: randomContact.phone,
//                 avatar: randomContact.picture.large.split("portraits/")[1],
//                 title: randomContact.name.title,
//                 email: randomContact.email
//             };
//
//             Contact.createUser(contact).then((response) => {
//                 dispatch(addContactSuccess(response.data))
//             }).catch(error =>{
//                 dispatch(addContactFailure(error))
//             })
//         })
//
//     }
// };

export const fetchContacts = (filter = '')=>{
    return function (dispatch) {
        dispatch(fetchContactsRequest());
        Contact.getAll(filter).then( response => {
            dispatch(fetchContactsSuccess(response.data))
        })
            .catch(error =>{
               dispatch(fetchContactsFailure(error))
            })
    }
};

export default contactsListReducer;

