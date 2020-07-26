import React from 'react';
import { faSearch, faPhone, faUserPlus, faRandom, faTimes, faSpider} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import Contact from "../model/contact";
import {connect} from "react-redux";
import {addContact, deleteContact} from '../actions'
import {fetchContacts} from "../reducers/contactsList";
import {get} from 'lodash';

export const imageUrl = 'https://randomuser.me/api/portraits/';
class ContactsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contacts: [],
            isLoading:false,
            search: '',
            addedSuccess: false,
            error: ''
        };
    }

     loadContact(filter = '') {
         this.props.dispatch(fetchContacts(filter));
     }

     componentDidMount() {
         if (!this.props.contacts.length) {
             this.loadContact();
         }
     }


     addRandomUser() {
        Contact.getRandomUser().then((response) => {
             let randomContact = response.data.results[0];
             let contact = {
                 name: randomContact.name.first + ' ' + randomContact.name.last,
                 phone: randomContact.phone,
                 avatar: randomContact.picture.large.split("portraits/")[1],
                 title: randomContact.name.title
             };
           Contact.createUser(contact).then((response) => {
               this.props.dispatch(addContact({contact: response.data}));
               this.setState({ addedSuccess : true});
               setTimeout(()=>{this.setState({addedSuccess: false})
                   }, 3000);
             })
         })
     }

    deleteContact(contactId, index) {
        Contact.deleteContact(contactId).then((response) => {
            this.props.dispatch(deleteContact(index));
        }).catch(error =>{
            this.setState({error: 'Error when deleted' });
            setTimeout(()=>{
                this.setState({error: '' });
            }, 3000)
        })

    }

    search( value)
    {
        this.setState({search: value});
        this.loadContact(value);

    }


    render() {
        return <div className="contact-container">
            <div className="search-input">
                <input value={this.state.search} onChange={(e) =>{this.search( e.target.value);}} type="text" placeholder="search in contacts..."/>
                <button style={{border: 'none', background: 'none'}} onClick={() => this.loadContact()} className="search-icon center-block">
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </div>
            {
                !!this.state.error && <div className="error-message" style={{color: 'red'}}> {this.state.error} </div>
            }

            {
                !!this.props.isLoading &&  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>

            }
            <div className="contacts-container">

                {
                    (!this.props.contacts && !this.props.isLoading) && <span> No result found</span>
                }
                {
                    get(this.props,'contacts') && this.props.contacts.map((contact, index) =>{
                        return  <div className="contact">
                            <div className="contact-avatar">
                                <img src={`${imageUrl}${contact.avatar}`}/>
                            </div>
                            <div className="contact-details">
                                <div className="contact-name"><Link to={'/contacts/' + contact.id}>{contact.name}</Link>
                                    {
                                        (!!this.state.addedSuccess && index == this.props.contacts.length - 1)  && <span>
                                            &nbsp;&nbsp;&nbsp; <span style={{color: 'green'}}>Added!</span>

                                        </span>
                                    }
                                </div>
                                <div className="contact-phone">{contact.phone}</div>
                            </div>
                            <div className="contact-buttons">
                                <button><FontAwesomeIcon icon={faPhone}/></button>
                            </div>
                            <div className="contact-button-close">
                                <span onClick={() => this.deleteContact(contact.id, index)}> <FontAwesomeIcon icon={faTimes}/></span>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="contact-new">
                <Link to='contacts/new'><button>
                    <FontAwesomeIcon icon={faUserPlus}/>
                </button>
                </Link>
                <button onClick={() => this.addRandomUser()}>
                    <FontAwesomeIcon icon={faRandom}/>
                </button>
            </div>
        </div>
    }
}



const mapStateToProps = state => ({
    contacts: state.contacts.contacts,
    isLoading: state.contacts.isLoading,
    error: state.contacts.error
});



export default connect(mapStateToProps)(ContactsList);
