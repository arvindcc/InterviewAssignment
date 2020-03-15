import { ContactSchema } from '../models/Contact';
import getContactRepository from '../Repository';

class ContactService {

    save = (contact) => {
        console.log('save')
        console.log(contact);
        return new Promise((resolve, reject) => {
            getContactRepository().then(realm => {
                realm.write(() => {
                    const newContact = realm.create(ContactSchema.name, contact);
                    //realm.close();
                    if (!newContact) {
                        //TODO: Create Custom Error 
                        reject({
                            msg: 'Unable to save new contact object.'
                        });
                    } else {
                        resolve(newContact);
                    }
                });
            }).catch(error => {
                console.log('Error ContactService.save');
                console.log(error);

                reject(error);
            });
        });
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            getContactRepository().then(realm => {
                const allContacts = realm.objects(ContactSchema.name);
                console.log('allContants Length:');
                console.log(...allContacts);
                if (!allContacts) {
                    reject({
                        msg: 'Unable to find contacts.'
                    });
                } else {
                    resolve(allContacts);
                }
            }).catch(error => {
                console.log('Error ContactService.findAll');
                console.log(error);
                reject(error);
            });
        });
    }

    maxId = () => {
        return new Promise((resolve, reject) => {
            getContactRepository().then(realm => {
                const latestContact = realm.objects(ContactSchema.name).sorted('id', true)[0];
                console.log('Max Id:');
                console.log(latestContact);
                if (latestContact == null) {
                    resolve(0)
                } else {
                    resolve(latestContact.id);
                }
            }).catch(error => {
                console.log('Error ContactService.maxId');
                console.log(error);
                reject(error);
            });
        });
    }

};

export default ContactService;