// import {
//     addContactFailure,
//     addContactRequest,
//     addContactSuccess,
//     fetchContactsFailure,
//     fetchContactsRequest,
//     fetchContactsSuccess
// } from "../actions";
// import Contact from "../model/contact";
// import { get } from 'lodash';
// const initialState = {
//     isLoading:false,
//     contact :{ },
//     isEdit : false
// }
//
//
// const newContactReducer = (state = {}, action) =>
// {
//     console.log('in add action', action)
//
//     switch (action.type) {
//         case 'SET_EDIT':
//             return {
//                 ...state,
//                 isEdit : get(action, 'payload.isEdit', false )
//             }
//         case 'ADD_CONTACT_REQUEST':
//             return {
//                 ...state,
//                 isLoading: true
//             }
//
//         case 'ADD_CONTACT_SUCCESS':
//             return {
//                 ...state,
//                 contact: get(action , 'payload', {}),
//                 isLoading: false
//             }
//
//         case 'ADD_CONTACT_FAILURE':
//             return {
//                 ...state,
//                 contact: get(action , 'payload', ''),
//                 isLoading: false
//             }
//         default: return state;
//     }
// }
// export default newContactReducer;
//
// // can be deleted
// export const addContact = (contact, isEdit = false)=>{
//     return function (dispatch) {
//         dispatch(addContactRequest());
//         let promise ;
//         if(isEdit )
//         {
//             promise = Contact.putContact(contact);
//         }
//         else{
//             promise = Contact.postContact(contact);
//         }
//        promise.then( response => {
//             dispatch(addContactSuccess(contact))
//         })
//             .catch(error =>{
//                 dispatch(addContactFailure(error))
//             })
//     }
// }
