import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Input,Toast,View} from 'native-base';
import {Image, StyleSheet, AsyncStorage, ImageBackground} from "react-native";
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Loader from "../Account/Loader";
import * as SQLite from 'expo-sqlite';


const logo = require("../../Assets/cdhlogo.png");

const db = SQLite.openDatabase('cdh.db');



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password:'',
        user:null,
        token:null,
        badLogin:null,
            loading:false
        };
    }


     handleEmail = (text) => {
        this.setState({email: text})
    };

    handlePassword = (text) => {
        this.setState({password: text})
    };

    send(email,password){
        this.setState({
            loading:true
        });
       Toast.show({
              text: 'Signing In...',
              buttonText: ' ',
              duration: 3000
            });
        const data = {
            "email": email,
            "password": password
        };
        fetch("https://appfarm.000webhostapp.com/acl/acl_app/user_login.php", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(data)
        }).then((response) => response.json())
      .then((responseJson) => {
          this.setState({
              loading:false
          });
        if(responseJson[0].error === "false")
        {
          try {
         AsyncStorage.setItem('uid', responseJson[0].uid);
         this.props.navigation.navigate('Home');
           console.log("Success");
           console.log(responseJson[0].uid)
        } catch (error) {
          console.log(error);
        }
        }
        else{
           Toast.show({
              text: 'Wrong Username or Password',
              buttonText: ' ',
              duration: 3000,
            });
            console.log(responseJson[0].error)
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    
  
    render() {
        return (
                <StyleProvider style={getTheme(platform)}>
                    <Container style={{backgroundColor:"#FFF"}}>
                        <Loader
                            loading={this.state.loading} />
                            <Header style={{backgroundColor:"#FFF"}}>
                                        <Left>
                                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                                <Icon name='chevron-left' style={{fontSize:25,color:"#274180"}}/>
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Text style={{color:"#274180"}}>Login</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                        <View style={{width: "100%",     justifyContent: 'center',
                            alignItems: 'center',}}>
                                <Image
                                    style={styles.logo}
                                    source={logo}
                                    resizeMode={"contain"}
                                />
                        </View>
                            <Content padder>
                              <Form>
                                  <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                                      <Input placeholder='Institution ID' style={{padding:5}}/>
                                  </Item>
                             <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                              <Input onChangeText={this.handleEmail} placeholder='Account No.' style={{padding:5}}/>
                            </Item>
                            <Item rounded  style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                              <Input onChangeText={this.handlePassword} secureTextEntry={true} placeholder='Password' style={{padding:5}}/>
                            </Item>
                            </Form>
                            <Button onPress={()=>this.send(this.state.email,this.state.password)} block style={{marginTop:20,borderRadius:5}}>
                            <Text style={{ fontFamily: 'Roboto'}}>Login</Text>
                          </Button>
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 300,
    },
});