import React from 'react'
import '../../contact.css'
import {faSync, faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormGroup, Input } from 'reactstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {imageUrl} from "./ContactsList";
import Contact from "../model/contact";
import { connect } from 'react-redux'
import { addContact} from "../actions";

class NewContact extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            contact :{
                name:'',
                phone:'',
                title:'',
                avatar: '',
            },
            nameKeep: 0,
            errorPhone : false,
            isEdit: false,
            memberNotExist: false,
            submitError: false,
            submitSuccess: false
        }
    }


    componentDidMount() {
        const {match: {params}} =this.props;

        if(params.contactId)
        {
            Contact.get(params.contactId).then((response) =>{
                this.setState({contact:{...response.data}, isEdit :true, nameKeep: 30 - response.data.name.length});
            }).catch(error => {
                this.setState({memberNotExist: true})
            })
        }
        else{
            this.refreshPicture();
        }
    }

    refreshPicture()
    {
        let gender = ['mrs', 'miss'].includes(this.state.contact.title.toLowerCase()) ? 'women' : 'men';
        let randomNumber = Math.floor(Math.random() * 99) + 1;
        let path = gender+'/'+randomNumber+'.jpg';
        let contact = {...this.state.contact};
        contact.avatar = path;
        this.setState({contact});
    }

    displayValidation(key, backToHome= false )
    {
        this.setState({[key]: true});
        setTimeout(()=> {
            this.setState({[key]: false});
            if(backToHome)
            {
                this.props.history.push("/contacts");
            }
        },3000);
    }

    validation()
    {
        if(this.state.contact.phone && !/^(?=.*[0-9])[- ()0-9]+$/.test(this.state.contact.phone))
        {
          this.displayValidation('errorPhone');
          return false;
        }
        return true;
    }

    onSave()
    {
        if(!this.validation())
        {
            return ;
        }
        let promise;
        if(this.state.isEdit)
        {
            promise = Contact.putContact(this.state.contact);
        }
        else{
            promise = Contact.postContact(this.state.contact)
        }
        promise.then( response =>{
            this.props.dispatch(addContact({contact:this.state.contact, isEdit:this.state.isEdit}));
            this.displayValidation('submitSuccess', true);
            console.log('in success')

        })
            .catch(error =>{
                console.log('in error', error)
            this.displayValidation('submitError');

        })
    }

    onChange(key, value)
    {
        if(key == 'name')
        {
            value = value.substr(0,30);
            this.setState({nameKeep: 30 - value.length})
        }
        this.setState((oldState) => {
            oldState.contact[key] = value;
            return oldState;
        })
    }

    render()
    {
        return <form onSubmit={(e) => {e.preventDefault();this.onSave()}}>

            <FormGroup>
                <div className="contact-container">
                    {
                        !!this.state.memberNotExist && <span>
                            <Link to="/contacts"><FontAwesomeIcon icon={faArrowAltCircleLeft}/>&nbsp;Go back to Lists</Link><br/><br/>
                            <span style={{color: 'red', fontWeight: 'bold'}}>Sorry, This contact is not exist</span>
                        </span>
                    }
            {
               !!this.state.submitSuccess && <div className="alert alert-success">
                    <strong>Success!</strong> Contact was saved succesfully!
                </div>
            }
            {
                !!this.state.submitError && <div className="alert alert-danger">
                    <strong>Error!</strong> An error has occurred
                </div>
            }
            <div className="new-contact-container">
                <div className="new-contact-avatar">
                    <img src={imageUrl + this.state.contact.avatar}/>
                    <button type="button" onClick={() => this.refreshPicture()} >
                      <FontAwesomeIcon icon={faSync}/>
                    </button>
            </div>
                <div className="new-contact-inputs">
                    <div className="new-contact-input">
                        <label>Name</label>
                        <input required disabled={this.state.memberNotExist} maxLength={30} value={this.state.contact.name} onChange={(e) => { this.onChange('name',e.target.value)}} />
                        &nbsp;&nbsp;&nbsp;
                        <div className="col-xs-12">{this.state.nameKeep}/30</div>
                    </div>
                    <div className="new-contact-input">
                        <label>Title</label>
                        <Input required disabled={this.state.memberNotExist} id="title" value={this.state.contact.title} onChange={(e) => { { this.onChange('title',e.target.value)}}}/>
                    </div>
                    <div className="new-contact-input form-group has-error input-group error">
                        <label className="control-label" >Phone</label>
                        <Input required disabled={this.state.memberNotExist} className="input-phone" value={this.state.contact.phone} style={{borderRadius: '4px', width : '100px'}} onChange={(e) => { this.onChange('phone',e.target.value)}}/>
                        {
                            !!this.state.errorPhone && <span className="error-message" style={{color: 'red'}}>
                                Please, the phone field has to contain only digits or -</span>
                        }
                    </div>
                </div>
                <div className="new-contact-buttons">
                    <Button disabled={this.state.memberNotExist} type="submit" className="button-ok">Save</Button>
                   <Link to="/contacts">
                       <button disabled={this.state.memberNotExist} type="button" className="button-cancel">Cancel</button>
                   </Link>

                </div>
            </div>
        </div>
       </FormGroup></form>
    }
}

export default connect()(NewContact);
