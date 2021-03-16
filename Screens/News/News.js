import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,List,ListItem,Thumbnail,Toast } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Loader from "../Account/Loader";

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            loading:true
        };
    }

    componentDidMount() {
        return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/get_news.php")
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson !== 'No Data')
                {
                    this.setState({
                        items:responseJson,
                        loading:false
                    })
                }
                else{
                    Toast.show({
                        text: responseJson,
                        buttonText: ' ',
                        duration: 3000,
                    })
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
                    <Header >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                <Icon name='chevron-left' style={{fontSize:25}}/>
                            </Button>
                        </Left>
                        <Body>
                        <Text style={{color:"#fff"}}>Economic Reports</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Content padder>
                        <List
                            dataArray={this.state.items}
                            renderRow={data => {
                                return (
                                    <ListItem thumbnail style={{padding:10}} onPress={()=>this.props.navigation.navigate('NewsDetails',{
                                        headline:data.headline,image:data.image,story:data.story,date:data.story
                                    })}>
                                        <Left style={{marginLeft:10}}>
                                            <Thumbnail square source={{uri: data.image}} />
                                        </Left>
                                        <Body>
                                        <Text style={{ fontFamily: 'Roboto'}}>{data.headline}</Text>
                                        <Text numberOfLines={1} note>{data.date}</Text>
                                        </Body>
                                    </ListItem>
                                );
                            }}
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}