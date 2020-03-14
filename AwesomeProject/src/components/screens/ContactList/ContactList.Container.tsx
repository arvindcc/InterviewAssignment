import { connect } from 'react-redux';
import { saveContact, getAllContacts } from './ContactList.Screen.Actions';
import ContactListScreen from './ContactList.Screen';
import { StoreState } from '../../../types/index'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';


const mapStateToProps = (state: StoreState) => {
    console.log('mapStateToProps');
    console.log(state);
    return {
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading,
        contacts: state.pushNewContact,

    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, Action>) => {
    console.log('mapDispatchToProps');
    return {
        saveContact: () => dispatch(saveContact()),
        getAllContacts: () => dispatch(getAllContacts())
    };
};

const ContactListScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ContactListScreen);
export default ContactListScreenContainer;