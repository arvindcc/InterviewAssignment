import ContactService from '../../../realm/services/ContactService';
import { itemsAreLoading, itemsFetchDataSuccess, itemsHaveError } from '../../../redux/globalActions';
import { ContactModel } from '../../../realm/models/Contact';
import * as constants from '../../../constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, ActionCreator, Dispatch } from 'redux';
import { StoreState } from '../../../types';

import { incrementContactId, getContactId } from '../../../realm/models/Contact'
var id: number = 3;

export type ConstantListThunk = ActionCreator<ThunkAction<
    Promise<PushContact>,
    any[],
    boolean,
    Action<PushContact>
>>

export interface PushContact {
    type: constants.PUSH_NEW_CONTACT,
    payload: any,
}


export const saveContact: ActionCreator<ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<any>,
    // The type for the data within the last action
    StoreState,
    // The type of the parameter for the nested function
    any,
    // The type of the last action to be dispatched
    Action
>> = () => {
    console.log('saveContactThunkAction');
    return async (dispatch: ThunkDispatch<StoreState, void, Action>) => {

        dispatch(itemsAreLoading(true));
        try {
            const contactService = new ContactService();
            const maxId = await contactService.maxId();
            console.log('getContactMaxId' + maxId);
            const contactModel = new ContactModel((maxId + 1), 'Anil Chawdhary', '9876542332', '');
            const contact = await contactService.save(contactModel);
            dispatch(itemsFetchDataSuccess(contact));
            dispatch(itemsHaveError(false));
            dispatch(pushContact([contact]));
        } catch (error) {
            dispatch(itemsFetchDataSuccess(error));
            dispatch(itemsHaveError(true));
            console.log('error');
            console.log(error);
        }
    };
};


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
                contacts.push(new ContactModel(RealmObject.id, RealmObject.name, RealmObject.mobile, RealmObject.avatar))
            })
            dispatch(itemsFetchDataSuccess(contacts));
            dispatch(itemsHaveError(false));
            dispatch(pushContact(contacts));
        } catch (error) {
            dispatch(itemsFetchDataSuccess(error));
            dispatch(itemsHaveError(true));
            console.log('error');
            console.log(error);
        }
    };
};

export const pushContact: ActionCreator<PushContact> = (contacts: []) => {
    return {
        type: 'PUSH_NEW_CONTACT',
        payload: contacts
    }
}