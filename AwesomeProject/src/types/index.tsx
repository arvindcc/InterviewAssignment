
export interface IContact {
    id?: string;
    name: string;
    mobile: string;
    avatar: string;
    email: string;
}

export interface StoreState {
    itemsHaveError: boolean;
    itemsAreLoading: boolean;
    items: any[];
    pushNewContact: IContact;
}

