import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,H3,List,ListItem } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';


export default class MoneyMarketQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {navigation} = this.props;
        const tenor = navigation.getParam('tenor','');
        const rate = navigation.getParam('rate','');
        const amount = navigation.getParam('amount','');
        const grossint = navigation.getParam('gross_int','');
        const tax = navigation.getParam('tax','');
        const netint = navigation.getParam('netint','');
        const netmat = navigation.getParam('netmat','');

        return (
            <StyleProvider style={getTheme(platform)}>
                <Container style={{backgroundColor:"#fff"}}>
                    <Header >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                <Icon name='chevron-left' style={{fontSize:25}}/>
                            </Button>
                        </Left>
                        <Body>
                        <Text style={{color:"#fff"}}>Get Quote</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Content padder>
                            <List>
                                <ListItem>
                                    <Left>
                                        <Text style={{color:"#444"}}>Amount: MWK</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{ fontFamily: 'Roboto'}}>{amount.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{color:"#444"}}>Tenor</Text>
                                    </Left>
                                    <Body>
                                    <Text style={{ fontFamily: 'Roboto'}}>{tenor} Days</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{color:"#444"}}>Rate</Text>
                                    </Left>
                                    <Body>
                                    <Text style={{ fontFamily: 'Roboto'}}>{rate}%</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{color:"#444"}}>Gross Interest: MWK</Text>
                                    </Left>
                                    <Body>
                                    <Text style={{ fontFamily: 'Roboto'}}>{grossint.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left >
                                        <Text style={{color:"#444"}}>Withholding Tax: MWK</Text>
                                    </Left>
                                    <Body>
                                    <Text style={{ fontFamily: 'Roboto'}}>{tax.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{color:"#444"}}>Net Interest: MWK</Text>
                                    </Left>
                                    <Body>
                                    <Text style={{ fontFamily: 'Roboto'}}>{netint.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{color:"#444"}}>Net Maturity: MWK</Text>
                                    </Left>
                                    <Body>
                                    <Text style={{ fontFamily: 'Roboto'}}>{netmat.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                    </Body>
                                </ListItem>

                            </List>

                            <Button block onPress={()=> this.props.navigation.navigate('Invest')}>
                            <Text style={{ fontFamily: 'Roboto'}}>I'm Interested
                            </Text>
                            </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}