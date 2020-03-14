export class ContactModel {
    constructor(id, name, mobile, avatar) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.avatar = avatar;
    }

}
export const ContactSchema = {
    name: 'Contact',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        mobile: 'string',
        avatar: 'string'
    }
}

var contactId = 0

export const getContactId = () => { return this.contactId }

export const incrementContactId = () => { return this.contactId += 1 }