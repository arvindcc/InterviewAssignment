import ContactService from '../../../realm/services/ContactService';
import { itemsAreLoading, itemsFetchDataSuccess, itemsHaveError } from '../../../redux/globalActions';
import { ContactModel } from '../../../realm/models/Contact';
import * as constants from '../../../constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, ActionCreator } from 'redux';
import { StoreState } from '../../../types';

export const getAllContacts: ActionCreator<ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<any>,
    // The type for the data within the last action
    StoreState,
    // The type of the parameter for the nested function
    any,
    // The type of the last action to be dispatched
    Action
>> = () => {
    console.log('getAllContactsThunkAction');
    return async (dispatch: ThunkDispatch<StoreState, void, Action>) => {

        dispatch(itemsAreLoading(true));
        const contactService = new ContactService();
        try {
            let contacts: ContactModel[] = [];
            const allContacts = await contactService.findAll();
            Array.from(allContacts).map((RealmObject: any) => {
                contacts.push(new ContactModel(RealmObject.id, RealmObject.name, RealmObject.email, RealmObject.mobile, RealmObject.avatar))
            })
            dispatch(itemsFetchDataSuccess(contacts));
            dispatch(itemsHaveError(false));
            //dispatch(pushContact(contacts));
            dispatch(itemsAreLoading(false));
        } catch (error) {
            dispatch(itemsFetchDataSuccess(error));
            dispatch(itemsHaveError(true));
            console.log('error');
            console.log(error);
            dispatch(itemsAreLoading(false));
        }

    };
};
