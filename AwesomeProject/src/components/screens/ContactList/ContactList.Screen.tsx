import React, { useEffect, Component } from 'react';
import { FlatList } from 'react-native';
import { Container, View, List, ListItem, Header, Title, Content, Thumbnail, Text, Left, Body, Right, Icon, Button } from 'native-base';
import { ContactModel } from '../../../realm/models/Contact'
import { StoreState } from '../../../types';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { saveContact, getAllContacts, pushContact } from './ContactList.Screen.Actions';
import { connect } from 'react-redux';

interface IContact {
    id: string;
    name: string;
    mobile: string;
    avatar: string;
}

interface Props {
    contacts: any[];
    saveContact(): Promise<Action>;
    getAllContacts(): Promise<Action>;
}


const ContactListScreen: React.FC<Props> = (props: Props) => {
    const sampleContact: IContact[] = [
        {
            'id': '1',
            'name': 'Arvind Chawdhary',
            'mobile': '7744866241',
            'avatar': ''
        },
        {
            'id': '2',
            'name': 'Savita Chawdhary',
            'mobile': '7744866241',
            'avatar': ''
        },
        {
            'id': '3',
            'name': 'Sumit Chawdhary',
            'mobile': '7744866241',
            'avatar': ''
        },
        {
            'id': '4',
            'name': 'Anil Chawdhary',
            'mobile': '7744866241',
            'avatar': ''
        },
    ]
    const renderContactList = () => {
        let listItem = []
        for (const key in props.contacts) {
            let source = props.contacts[key].avatar == '' ? '../../../assets/images/defaultAvatar.png' : props.contacts[key].avatar;
            console.log(source);
            listItem.push(
                <ListItem avatar key={props.contacts[key].id}>
                    <Left style={{ flex: 1 }}>
                        <Thumbnail small source={require('../../../assets/images/defaultAvatar.png')} />
                    </Left>
                    <Body style={{ flex: 3 }}>
                        <Text>{props.contacts[key].name}</Text>
                        <Text note>{props.contacts[key].mobile}</Text>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Text note>3:43 pm</Text>
                    </Right>
                </ListItem>

            )
        }
        return listItem;
    }
    const contactModel = new ContactModel('Arvind Chawdhary', '1234567890', '');
    console.log('Props');
    console.log(props);
    console.log('Sample Contacts')
    console.log(sampleContact)
    console.log('contacts length');
    console.log(props.contacts.length);
    const contactList: any[] = props.contacts
    return (
        <Container>
            <Header>
                <Left >
                    <Button transparent onPress={props.getAllContacts}>
                        <Icon name='list' onPress={props.getAllContacts} />
                    </Button>
                </Left>
                <Body>
                    <Title>Contact</Title>
                </Body>
                <Right >
                    <Button transparent onPress={props.saveContact}>
                        <Icon fontSize={16} name='add' />
                    </Button>
                </Right>
            </Header>

            <Content>
                <List >
                    {
                        renderContactList()
                    }
                </List>
            </Content>
        </Container>
    );
}

export default ContactListScreen;
