import { PushContact } from './AddContact.Screen.Action'
import { StoreState } from '../../../types/index';
import * as constants from '../../../constants'
import { Reducer } from 'redux';

const initialState: any = [];

export const pushNewContact: Reducer<StoreState, PushContact> = (state = initialState, action) => {
    switch (action.type) {
        case constants.PUSH_NEW_CONTACT:
            console.log('pushNewContact')
            return {
                ...state,
                contact: action.payload
            };
        default:
            return state;
    }
}