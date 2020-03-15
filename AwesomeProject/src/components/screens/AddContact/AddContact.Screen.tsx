import React, { useState } from 'react';
//import { Button } from 'react-native';
import { Container, Header, Left, Icon, Body, Title, Text, Right, Content, Button, Item, Input, Card, CardItem, View, Thumbnail, Label } from 'native-base';
import { Action } from 'redux';
import { AddContactScreenNavigationProp } from '../../../navigation/type'
import ImagePicker from 'react-native-image-picker';
import { IContact } from '../../../types'

interface Props {
    contact: IContact;
    navigation: AddContactScreenNavigationProp;
    //saveContact(name: string, email: string, mobile: string, avatar: string): Promise<Action>;
    saveContact(name: string, email: string, mobile: string, avatar: string): Promise<Action>;

}

const AddContact: React.FC<Props> = (props) => {

    const [name, setName] = useState('Arvind Chawdhary')
    const [mobile, setMobile] = useState('9820342351')
    const [email, setEmail] = useState('arvind@example.com')
    const [avatar, setAvatar] = useState('')

    const options = {
        title: 'Select Avatar',
        //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const chooseAvatar = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(source)
                setAvatar(response.data)
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // useState({
                //     avatarSource: source,
                // });
            }
        });

    }

    const onSaveContact = () => {
        return props.saveContact(name, email, mobile, avatar)
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent >
                        <Icon name='ios-arrow-back' onPress={() => props.navigation.goBack()} />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        <Text>New Contact</Text>
                    </Title>
                </Body>
                <Right>
                    <Button transparent >
                        <Icon name="ios-checkmark" onPress={() => props.saveContact(name, email, mobile, avatar)} />
                    </Button>
                </Right>
            </Header>
            <Content style={{ margin: 10 }}>
                <Card style={{ padding: 10 }}>
                    <CardItem bordered>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Thumbnail
                                circular
                                source={require('../../../assets/images/defaultAvatar.png')}
                                style={{ height: 300, width: 300, borderWidth: 1, borderColor: 'wheat', borderRadius: 150 }}
                            />
                            <Button transparent onPress={chooseAvatar} style={{ flex: 1 }} >
                                <Text>Choose Avatar</Text>
                            </Button>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Item>
                            <Icon active name='person' />
                            <Input placeholder='Full Name' value={name} onChangeText={text => setName(text)} />
                            <Icon name='checkmark-circle' />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item>
                            <Icon active name='call' />
                            <Input placeholder='Mobile No' value={mobile} onChangeText={text => setMobile(text)} />
                            <Icon name='checkmark-circle' />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item>
                            <Icon active name='mail' />
                            <Input placeholder='E-Mail' value={email} onChangeText={text => setEmail(text)} />
                            <Icon name='checkmark-circle' />
                        </Item>
                    </CardItem>
                </Card>

            </Content>
        </Container>
    )
}

export default AddContact;