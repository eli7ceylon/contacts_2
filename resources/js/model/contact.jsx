import axios from 'axios';

export default class Contact {
    // static apiPathAll = 'http://127.0.0.1:8000/api/contacts';
    // static apiPathUnique = 'http://127.0.0.1:8000/api/contact/';

    static getApiPathAll()
    {
        return 'http://127.0.0.1:8000/api/contacts';
    }

    static getApiPathUnique()
    {
        return 'http://127.0.0.1:8000/api/contact/';
    }
    static getAll(filter)
    {
        if(filter)
        {
            return axios.get(this.getApiPathAll()+'?filter='+ filter);
        }
        else{
            return axios.get(this.getApiPathAll());
        }
    }

    static get(contactId)
    {
        return axios.get(this.getApiPathUnique() + contactId);

    }
    static postContact(contact)
    {
       return axios.post(this.getApiPathUnique(), {...contact});
    }

    static putContact(contact)
    {
        return axios.put(this.getApiPathUnique() + contact.id, contact);
    }

    static  createUser(contact)
    {
        return axios.post('http://127.0.0.1:8000/api/contact', contact);
    }

    static deleteContact(contactId){
        return axios.delete(this.getApiPathUnique() + contactId)
    }

    static getRandomUser()
    {
        return axios.get('https://randomuser.me/api?inc=name,phone,email,picture') ;
    }

}
