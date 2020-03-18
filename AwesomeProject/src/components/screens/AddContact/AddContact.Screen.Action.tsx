import ContactService from '../../../realm/services/ContactService';
import { itemsAreLoading, itemsFetchDataSuccess, itemsHaveError } from '../../../redux/globalActions';
import { ContactModel } from '../../../realm/models/Contact';
import * as constants from '../../../constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, ActionCreator } from 'redux';
import { StoreState } from '../../../types';
import { IContact } from '../../../types'

export interface PushContact {
    type: constants.PUSH_NEW_CONTACT,
    payload: ContactModel,
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
>> = (name = '', email = '', mobile = '', avatar = '') => {
    console.log('saveContactThunkAction');
    return async (dispatch: ThunkDispatch<StoreState, void, Action>) => {
        dispatch(itemsAreLoading(true));
        try {
            const contactService = new ContactService();
            const maxId = await contactService.maxId();
            console.log('getContactMaxId' + maxId);
            const contactModel = new ContactModel(maxId + 1, name, email, mobile, avatar);
            const contact = await contactService.save(contactModel);
            if (contact) {
                let contacts: ContactModel[] = [];
                const allContacts = await contactService.findAll();
                Array.from(allContacts).map((RealmObject: any) => {
                    contacts.push(new ContactModel(RealmObject.id, RealmObject.name, RealmObject.email, RealmObject.mobile, RealmObject.avatar))
                })
                dispatch(itemsFetchDataSuccess(contacts));
                dispatch(itemsHaveError(false));
                //dispatch(pushContact(contacts));
            }
            // dispatch(itemsFetchDataSuccess(contact));
            // dispatch(itemsHaveError(false));
            dispatch(pushContact(contact));
        } catch (error) {
            dispatch(itemsFetchDataSuccess(error));
            dispatch(itemsHaveError(true));
            console.log('error');
            console.log(error);
        }
        dispatch(itemsAreLoading(false));
    };
};

export const updateContact: ActionCreator<ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<any>,
    // The type for the data within the last action
    StoreState,
    // The type of the parameter for the nested function
    any,
    // The type of the last action to be dispatched
    Action
>> = (id = 0, name = '', email = '', mobile = '', avatar = '') => {
    console.log('updateContactThunkAction');
    return async (dispatch: ThunkDispatch<StoreState, void, Action>) => {
        dispatch(itemsAreLoading(true));
        try {
            const contactService = new ContactService();
            const contactModel = new ContactModel(id, name, email, mobile, avatar);
            console.log(contactModel)
            const contact = await contactService.update(contactModel);
            if (contact) {
                let contacts: ContactModel[] = [];
                const allContacts = await contactService.findAll();
                Array.from(allContacts).map((RealmObject: any) => {
                    contacts.push(new ContactModel(RealmObject.id, RealmObject.name, RealmObject.email, RealmObject.mobile, RealmObject.avatar))
                })
                dispatch(itemsFetchDataSuccess(contacts));
                dispatch(itemsHaveError(false));
                //dispatch(pushContact(contacts));
            }
            // dispatch(itemsFetchDataSuccess(contact));
            // dispatch(itemsHaveError(false));
            dispatch(pushContact(contact));
        } catch (error) {
            dispatch(itemsFetchDataSuccess(error));
            dispatch(itemsHaveError(true));
            console.log('error');
            console.log(error);
        }
        dispatch(itemsAreLoading(false));
    };
};

export const pushContact: ActionCreator<PushContact> = (contact: ContactModel) => {
    return {
        type: 'PUSH_NEW_CONTACT',
        payload: contact
    }
}