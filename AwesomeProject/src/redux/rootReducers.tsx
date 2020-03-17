import { combineReducers, Reducer } from 'redux';
import { pushNewContact } from '../components/screens/AddContact/AddContact.Screen.Reducer';
import { StoreState } from '../types/index';
import * as constants from '../constants';
import { GlobalAction } from './globalActions'

export const itemsHaveError: Reducer<boolean, GlobalAction> = (state = false, action: GlobalAction) => {
    console.log('Items Error');
    switch (action.type) {
        case constants.ITEMS_HAVE_ERROR:
            return action.hasError;
        default:
            return state;
    }
}

export const itemsAreLoading: Reducer<boolean, GlobalAction> = (state = false, action: GlobalAction) => {
    console.log('Items Loading');
    switch (action.type) {
        case constants.ITEMS_ARE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export const items: Reducer<any[], GlobalAction> = (state = [], action: GlobalAction) => {
    console.log('Items reducer');
    switch (action.type) {
        case constants.ITEMS_FETCH_DATA_SUCCESS:
            return action.items;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    items,
    itemsHaveError,
    itemsAreLoading,
    pushNewContact
});
export default rootReducer;