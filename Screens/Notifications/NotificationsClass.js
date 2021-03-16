import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,List,ListItem,Thumbnail } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

export default class NotificationsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        };
    }

    componentDidMount() {

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
                        <Text style={{color:"#fff"}}>Notifications</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Content padder>
                        <List
                            dataArray={this.state.items}
                            renderRow={data => {
                                return (
                                    <ListItem avatar>
                                        <Body>
                                        <Text style={{ fontFamily: 'Roboto'}}>{data.title}</Text>
                                        <Text numberOfLines={1} note>{data.content}</Text>
                                        </Body>
                                        <Right>
                                            <Text numberOfLines={1} note>{data.date}</Text>
                                        </Right>
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