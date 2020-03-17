import { connect } from 'react-redux';
import { saveContact } from './AddContact.Screen.Action';
import AddContact from './AddContact.Screen';
import { StoreState } from '../../../types/index'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';


const mapStateToProps = (state: StoreState) => {
    console.log('mapStateToProps');
    console.log(state);
    return {
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading,
        contact: state.pushNewContact,
        contacts: state.items,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, Action>) => {
    console.log('mapDispatchToProps');
    return {
        saveContact: (name: string, email: string, mobile: string, avatar: string) => dispatch(saveContact(name, email, mobile, avatar)),
    };
};

const AddContactScreenContainer = connect(mapStateToProps, mapDispatchToProps)(AddContact);
export default AddContactScreenContainer;