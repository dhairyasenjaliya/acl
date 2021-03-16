import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,H3 } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';


export default class ShareQuoteResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  
    render() {
      const {navigation} = this.props;
      const counter = navigation.getParam('counter','');
      const price = navigation.getParam('price','');
      const amount = navigation.getParam('consideration','');
      const shares = navigation.getParam('shares','');
      const first_comm = navigation.getParam('first_comm','');
      const second_comm = navigation.getParam('second_comm','');
      const third_comm = navigation.getParam('third_comm','');
      const totalc = navigation.getParam('total_comm','');
      const vat = navigation.getParam('vat','');
      const consideration = navigation.getParam('totalc','');
      const deal_total = navigation.getParam('deal_total','');

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
                            <View style={{alignItems:"center",margin:20,backgroundColor:"#FFF"}}>
                            <H3>Counter: {counter}</H3>
                            <Text style={{ fontFamily: 'Roboto'}}>Price: {price}</Text>
                            <Text style={{ fontFamily: 'Roboto'}}>Number of Shares: {shares.toLocaleString(undefined, {maximumFractionDigits:0})}</Text>
                            <Text style={{ fontFamily: 'Roboto'}}>Cost: {amount.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                            </View>
                            <View style={{alignItems:"center",margin:20,backgroundColor:"#FFF"}}>
                            <H3>Charges</H3>
                            <View style={{flexDirection:"row"}}>
                            <Left><Text note>Weighting:</Text></Left>
                            <Body><Text note>Rate:</Text></Body>
                            <Right><Text note>Commission:</Text></Right>
                            </View>
                             <View style={{flexDirection:"row"}}>
                            <Left><Text note>0-50,000</Text></Left>
                            <Body><Text note>2</Text></Body>
                            <Right><Text note>{first_comm.toLocaleString(undefined, {maximumFractionDigits:2})}</Text></Right>
                            </View>
                             <View style={{flexDirection:"row"}}>
                            <Left><Text note>0-100,000</Text></Left>
                            <Body><Text note>1.5</Text></Body>
                            <Right><Text note>{second_comm.toLocaleString(undefined, {maximumFractionDigits:2})}</Text></Right>
                            </View>
                             <View style={{flexDirection:"row"}}>
                            <Left><Text note>Excess 100,000</Text></Left>
                            <Body><Text note>1</Text></Body>
                            <Right><Text note>{third_comm}</Text></Right>
                            </View>
                            </View>
                            <View style={{alignItems:"center"}}>
                             <Text style={{ fontFamily: 'Roboto'}}>Total Commission: MWK {totalc.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                            <Text style={{ fontFamily: 'Roboto'}}>Basic Charge: MWK 50.00</Text>
                            <Text style={{ fontFamily: 'Roboto'}}>VAT: MWK {vat.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                             <Text style={{ fontFamily: 'Roboto'}}>Consideration: MWK {consideration.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                            <Text style={{ fontFamily: 'Roboto'}}>Deal Total: MWK {deal_total.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                            </View>
                                <Button block onPress={()=> this.props.navigation.navigate('Invest')}><Text>I'm Interested</Text></Button>
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}