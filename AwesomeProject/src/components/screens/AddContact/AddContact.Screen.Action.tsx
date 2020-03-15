import ContactService from '../../../realm/services/ContactService';
import { itemsAreLoading, itemsFetchDataSuccess, itemsHaveError } from '../../../redux/globalActions';
import { ContactModel } from '../../../realm/models/Contact';
import * as constants from '../../../constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, ActionCreator } from 'redux';
import { StoreState } from '../../../types';
import { IContact } from '../../../types'

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
>> = (name, email,mobile, avatar) => {
    console.log('saveContactThunkAction');
    return async (dispatch: ThunkDispatch<StoreState, void, Action>) => {
        dispatch(itemsAreLoading(true));
        try {
            const contactService = new ContactService();
            const maxId = await contactService.maxId();
            console.log('getContactMaxId' + maxId);
            const contactModel = new ContactModel(maxId + 1, name, email, mobile, avatar);
            console.log()
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
export const pushContact: ActionCreator<PushContact> = (contacts: []) => {
    return {
        type: 'PUSH_NEW_CONTACT',
        payload: contacts
    }
}