
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ContactModel } from '../realm/models/Contact'

export type AppStackParamList = {
  ContactList: undefined;
  AddContact: { isEdit: boolean, contact: ContactModel };
  EditContact: { isEdit: boolean, contact: ContactModel };
};

export type ContactListScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ContactList'
>;

export type ContactListScreenRouteProp = RouteProp<
  AppStackParamList,
  'ContactList'
>;

export type AddContactScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'AddContact'
>;

export type AddContactScreenRouteProp = RouteProp<
  AppStackParamList,
  'AddContact'
>;

export type EditContactScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'EditContact'
>;