import * as constants from '../constants'

export interface ItemsHaveError {
    type: constants.ITEMS_HAVE_ERROR,
    hasError: boolean,
}

export interface ItemsAreLoading {
    type: constants.ITEMS_ARE_LOADING,
    isLoading: boolean,
}

export interface ItemsFetchDataSuccess {
    type: constants.ITEMS_FETCH_DATA_SUCCESS,
    items: any[],
}

export type GlobalAction = ItemsHaveError | ItemsAreLoading | ItemsFetchDataSuccess

export function itemsHaveError(bool: boolean): ItemsHaveError {
    return {
        type: constants.ITEMS_HAVE_ERROR,
        hasError: bool,
    };
}

export function itemsAreLoading(bool: boolean): ItemsAreLoading {
    return {
        type: constants.ITEMS_ARE_LOADING,
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items: any[]): ItemsFetchDataSuccess {
    return {
        type: constants.ITEMS_FETCH_DATA_SUCCESS,
        items: items
    };
}