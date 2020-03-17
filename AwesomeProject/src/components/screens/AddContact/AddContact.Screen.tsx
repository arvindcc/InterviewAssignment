import React, { useState } from 'react';
import { Container, Header, Left, Icon, Body, Title, Text, Right, Content, Button, Item, Input, Card, CardItem, View, Thumbnail, Label, Spinner } from 'native-base';
import { Action } from 'redux';
import { AddContactScreenNavigationProp } from '../../../navigation/type'
import ImagePicker from 'react-native-image-picker';
import { IContact } from '../../../types'
import { useDispatch } from 'react-redux';
import { itemsAreLoading } from '../../../redux/globalActions';

interface Props {
    contact: IContact;
    navigation: AddContactScreenNavigationProp;
    //saveContact(name: string, email: string, mobile: string, avatar: string): Promise<Action>;
    saveContact(name: string, email: string, mobile: string, avatar: string): Promise<Action>;
    isLoading: boolean;
    hasError: boolean;

}

const AddContact: React.FC<Props> = (props) => {

    const [name, setName] = useState('Arvind Chawdhary')
    const [mobile, setMobile] = useState('9820342351')
    const [email, setEmail] = useState('arvind@example.com')
    const [avatar, setAvatar] = useState('')
    const [imageLoad, setImageLoad] = useState(false)
    //const dispatch = useDispatch();
    const options = {
        title: 'Select Avatar',
        //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const chooseAvatar = () => {
        setImageLoad(imageLoad => !imageLoad);
        console.log(imageLoad);
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
                setAvatar(response.uri)
            }
            setImageLoad(imageLoad => !imageLoad);
            console.log(imageLoad);
        });

    }

    const onSaveContact = () => {
        props.saveContact(name, email, mobile, avatar)
        props.navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name='ios-arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        <Text>New Contact</Text>
                    </Title>
                </Body>
                <Right>
                    <Button transparent onPress={onSaveContact}>
                        <Icon name="ios-checkmark" />
                    </Button>
                </Right>
            </Header>
            <Content style={{ margin: 10 }}>
                <Card style={{ padding: 10 }}>
                    <CardItem bordered>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                            {
                                imageLoad ? <Spinner /> :
                                    avatar == '' || null ?
                                        <Thumbnail
                                            circular
                                            source={require('../../../assets/images/defaultAvatar.png')}
                                            style={{ height: 300, width: 300, borderWidth: 1, borderColor: 'wheat', borderRadius: 150 }}
                                        /> :
                                        <Thumbnail
                                            circular
                                            source={{ uri: avatar }}
                                            style={{ height: 300, width: 300, borderWidth: 1, borderColor: 'wheat', borderRadius: 150 }}
                                        />
                            }
                            <Button transparent onPress={chooseAvatar} style={{ flex: 1 }} >
                                <Text>Choose Avatar</Text>
                            </Button>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Item>
                            <Icon active name='person' />
                            <Input placeholder='Full Name' value={name} onChangeText={text => setName(text)} />
                            {/* <Icon name='checkmark-circle' /> */}
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item>
                            <Icon active name='call' />
                            <Input placeholder='Mobile No' value={mobile} onChangeText={text => setMobile(text)} />
                            {/* <Icon name='checkmark-circle' /> */}
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item>
                            <Icon active name='mail' />
                            <Input placeholder='E-Mail' value={email} onChangeText={text => setEmail(text)} />
                            {/* <Icon name='checkmark-circle' /> */}
                        </Item>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}

export default AddContact;