import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,List,ListItem } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import moment from 'moment';


export default class MarketDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          days_rem:0,
          accrued:0,
          gross:0,
          net:0,
          payable:0,
          date_invested:null,
          amount_invested:null,
          interest:null,
          maturity_date:null,
          withholding:null,
          number_of_days:null,
          total_interest:null
        };
    }

    UNSAFE_componentWillMount(){
      const {navigation} = this.props;
      const date_invested = navigation.getParam('date_invested','');
      const amount_invested = navigation.getParam('amount_invested','');
      const interest = navigation.getParam('interest','');
      const maturity_date = navigation.getParam('maturity_date','');
      const withholding = navigation.getParam('withholding','');
      const number_of_days = navigation.getParam('number_of_days','');
      const total_interest = navigation.getParam('total_interest','');

      var tomorrow = moment(maturity_date,"YYYY/MM/DD");
      var today = moment().startOf('day');
      var invested = moment(date_invested,"YYYY/MM/DD");

      var diff = tomorrow.diff(today,'days',false);
      var duration = +diff - 1;
      var days = today.diff(invested,'days',false);

      var rate = +interest/100;
      var before_tax = (+amount_invested * +rate * +days)/365;
      var net = +withholding + +total_interest;
      var accrued_interest = +amount_invested + +before_tax;
      var payable = +amount_invested + +net;



      this.setState({
        date_invested: date_invested,
        amount_invested:amount_invested,
        interest:interest,
        maturity_date:maturity_date,
        withholding:withholding,
        number_of_days:number_of_days, 
        total_interest:total_interest,
        days_rem:duration,
        accrued:accrued_interest,
        gross:total_interest,
        net:net,
        payable:payable
      })
    }

  
    render() {
     


        return (
                <StyleProvider style={getTheme(platform)}>
                    <Container style={{backgroundColor:"#f6f6ff"}}>
                                    <Header >
                                        <Left>
                                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                                <Icon name='chevron-left' style={{fontSize:25}}/>
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Text style={{color:"#fff"}}>Deal Summary</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                            <Content padder>
                            <View style={{width:"100%",backgroundColor:"#fff",borderTopRightRadius:50}}>
                              <Text style={{fontWeight: 'bold',color:"#33b5e5",marginTop:30,marginLeft:20}}>Market Value as at Date</Text>
                                   <Text style={{fontWeight: 'bold', fontSize:25,color:"#274180",marginLeft:20}}>MWK {this.state.accrued.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                   <View style={{flexDirection:"row",marginTop:20,marginLeft:20,marginRight:20}}>
                                   <Left>
                                   <Text style={{color:"#33b5e5"}}>Amount Invested</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#33b5e5"}}>Transaction Date</Text>
                                   </Right>
                                   </View>
                                    <View style={{flexDirection:"row",marginLeft:20,marginRight:20,marginBottom:20}}>
                                   <Left>
                                   <Text style={{color:"#274180",fontWeight: 'bold', fontSize:15}}>MWK {Number(this.state.amount_invested).toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#274180",fontWeight: 'bold', fontSize:15}}>{this.state.date_invested}</Text>
                                   </Right>
                                   </View>
                            </View>
                            <List style={{backgroundColor:"#fff",marginTop:5,padding:15}}>
                             <View style={{flexDirection:"row",margin:5}}>
                                  <Left>
                                  <Text style={{color:"#24303c"}}>Maturity Date:</Text>
                                  </Left>
                                   <Right style={{width:"50%"}}>
                                   <Text style={{color:"#1d3060"}}>{this.state.maturity_date}</Text>
                                   </Right>
                                  </View>
                                   <View style={{flexDirection:"row",margin:5}}>
                                  <Left>
                                  <Text style={{color:"#24303c"}}>Investment Period</Text>
                                  </Left>
                                   <Right style={{width:"50%"}}>
                                   <Text style={{color:"#1d3060"}}>{this.state.number_of_days} Days</Text>
                                   </Right>
                                  </View>
                                  <View style={{flexDirection:"row",margin:5}}>
                                  <Left>
                                  <Text style={{color:"#24303c"}}>Interest Rate</Text>
                                  </Left>                               
                                   <Right style={{width:"50%"}}>
                                   <Text style={{color:"#1d3060"}}>{this.state.interest}</Text>
                                   </Right>
                                  </View>
                                 <View style={{flexDirection:"row",margin:5}}>
                                  <Left>
                                  <Text style={{color:"#24303c"}}>Gross Interest</Text>
                                  </Left>                               
                                   <Right style={{width:"100%"}}>
                                   <Text style={{color:"#1d3060"}}>{Number(this.state.gross).toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                   </Right>
                                  </View>
                                 <View style={{flexDirection:"row",margin:5}}>
                                  <Left>
                                  <Text numberOfLines={1} style={{color:"#24303c"}}>Withholding Tax</Text>
                                  </Left> 
                                   <Right style={{width:"50%"}}>
                                    <Text style={{color:"#1d3060"}}>-{this.state.withholding}</Text>
                                   </Right>
                                  </View>
                                <View style={{flexDirection:"row",margin:5}}>
                                  <Left>
                                  <Text style={{color:"#24303c"}}>Net Interest</Text>
                                  </Left>
                                   <Right style={{width:"50%"}}>
                                     <Text style={{color:"#1d3060"}}>{this.state.net.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                   </Right>
                                  </View>
                            </List>

                            <View style={{width:"100%",backgroundColor:"#fff",borderBottomRightRadius:50}}>
                              <View style={{flexDirection:"row",marginTop:20,marginLeft:20,marginRight:20}}>
                                   <Left>
                                   <Text style={{color:"#33b5e5"}}>Total Amount Payable</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#33b5e5"}}>Days to Maturity</Text>
                                   </Right>
                                   </View>
                                    <View style={{flexDirection:"row",marginLeft:20,marginRight:20,marginBottom:20}}>
                                   <Left>
                                   <Text style={{color:"#274180",fontWeight: 'bold'}}>MWK {this.state.payable.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#274180",fontWeight: 'bold', fontSize:15}}>{this.state.days_rem} Days</Text>
                                   </Right>
                                   </View>
                            </View>

                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}