
import { StackNavigationProp } from '@react-navigation/stack';
export type AppStackParamList = {
    ContactList: undefined;
    AddContact: undefined;
  };

export type ContactListScreenNavigationProp = StackNavigationProp<
AppStackParamList,
'ContactList'
>;

export type AddContactScreenNavigationProp = StackNavigationProp<
AppStackParamList,
'AddContact'
>;