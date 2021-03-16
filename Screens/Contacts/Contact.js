import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,Toast,Textarea } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            phone:'',
            message:''
        };
    }

    handleName = (text) => {
        this.setState({name: text})
    };
    handleEmail = (text) => {
        this.setState({email: text})
    };
    handlePhone = (text) => {
        this.setState({phone: text})
    };
    handleMessage = (text) => {
        this.setState({phone: text})
    };

    send(name,email,phone,message){
        Toast.show({
            text: 'Sending...',
            buttonText: ' ',
            duration: 3000
        });
        const data = {
            "name":name,
            "email": email,
            "phone":phone,
            "messge":message
        };
        fetch("https://appfarm.000webhostapp.com/acl/acl_app/feedback.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                Toast.show({
                    text: 'Message Sent',
                    buttonText: ' ',
                    duration: 3000,
                });
                this.props.navigation.goBack();
            }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container style={{backgroundColor:"#FFF"}}>
                    <Header >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                <Icon name='chevron-left' style={{fontSize:25}}/>
                            </Button>
                        </Left>
                        <Body>
                        <Text style={{color:"#fff"}}>Contact Us</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Content padder>
                        <Text note style={{alignSelf:"center"}}>Fill in all the detail and a representative will contact you</Text>
                        <Form>
                            <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                                <Input onChangeText={this.handleName} placeholder='Name' style={{padding:5}}/>
                            </Item>
                            <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                                <Input onChangeText={this.handleEmail}  placeholder='Email' style={{padding:5}}/>
                            </Item>
                            <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                                <Input onChangeText={this.handlePhone}  placeholder='Phone' style={{padding:5}}/>
                            </Item>
                            <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                                <Input onChangeText = {this.handleMessage} rowSpan={5} placeholder="Message"/>
                            </Item>
                        </Form>
                        <Button onPress={()=>this.send(this.state.name,this.state.email,this.state.phone,this.state.message)} block style={{marginTop:20,borderRadius:5}}>
                            <Text style={{ fontFamily: 'Roboto'}}>Send</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}