import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,H3,Toast } from 'native-base';
import {Image,ImageBackground,StatusBar,Dimensions,WebView} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
// import {LinearGradient} from "expo";
import { LinearGradient } from 'expo-linear-gradient';


export default class NewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        };
    }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('headline', '');
        const date = navigation.getParam('date','');
        const content = navigation.getParam('story','');
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
                        <Text style={{color:"#fff"}}>News</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Content padder>
                    <View style={{flex:1}}>
                        <H3 style={{fontWeight: 'bold',color:"#24303c"}}>
                            {title}
                        </H3>
                        <Text note>
                            {date}
                        </Text>
                         <LinearGradient
                                start={[0.1,1.0]}
                                end={[0.4,0.4]}
                                colors={['#1d3060','transparent']}
                                style={{
                                    height:2
                                }}
                            />
                        <WebView
                        source={content}
                        />
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}