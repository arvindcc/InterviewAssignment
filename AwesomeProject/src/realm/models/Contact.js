export class ContactModel {
    constructor(id, name, email, mobile, avatar) {
        this.id = id;
        this.name = name;
        this.email = email
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
        email: 'string',
        mobile: 'string',
        avatar: 'string'
    }
}