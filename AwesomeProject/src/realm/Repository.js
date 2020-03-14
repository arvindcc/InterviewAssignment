import { ContactSchema } from './models/Contact'
import Realm from 'realm';

const getContactRepository = () => {
    console.log('getContactRepository');
    return Realm.open({
        schema: [ContactSchema]
    });
}

export default getContactRepository;

