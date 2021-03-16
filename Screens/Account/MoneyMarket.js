import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,List,ListItem,Card,CardItem,Toast} from 'native-base';
import {Image,ImageBackground,StatusBar,View,AsyncStorage} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from "./Loader";
 

const bg_image = require("../../Assets/logbg.png");


export default class MoneyMarket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          items:[],
          uid:'',
          total:'',
            loading:true
        };
    }

      // fetch the data back asyncronously
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('uid');
            if (value !== null) {
              this.setState({
                uid:value
              });
                console.log(value);
                 return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/get_data.php?uid="+value)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson !== 'No Data')
        {
        this.setState({
         items:responseJson,
         total:responseJson[0].total,
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
        } catch (error) {
            // Error retrieving data
        }
    };

     componentDidMount() {
      this._retrieveData()
    }
  
    render() {
       const { navigation } = this.props;
        const market_value = navigation.getParam('market_value', '0.00');
        const last_date = navigation.getParam('last_date','00/00/00');
        return (
                <StyleProvider style={getTheme(platform)}>
                    <Container>
                            <View style={{width:   "100%",backgroundColor:"#3355a8"}}>
                                <Loader
                                    loading={this.state.loading} />
                                    <Header >
                                        <Left>
                                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                                <Icon name='chevron-left' style={{fontSize:25}}/>
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Text style={{color:"#fff"}}>Money Market</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                                    <Text style={{fontWeight: 'bold',color:"#1d3060",marginTop:30,marginLeft:20}}>Total Market Value</Text>
                                   <Text style={{fontWeight: 'bold', fontSize:25,color:"#fff",marginLeft:20}}>MWK {market_value}</Text>
                                   <View style={{flexDirection:"row",marginTop:20,marginLeft:20,marginRight:20}}>
                                   <Left>
                                   <Text style={{color:"##1d3060"}}>Total Amount Invested</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#1d3060"}}>Date</Text>
                                   </Right>
                                   </View>
                                    <View style={{flexDirection:"row",marginLeft:20,marginRight:20,marginBottom:20}}>
                                   <Left>
                                   <Text style={{color:"#fff",fontWeight: 'bold', fontSize:15}}>MWK {this.state.total}</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#fff",fontWeight: 'bold', fontSize:15}}>{last_date}</Text>
                                   </Right>
                                   </View>
                            </View>
                            <Content padder>

                            <List> 
                            <ListItem style={{borderWidth:0}}>
                                  <Left>
                                  <Text style={{color:"#274180"}}>Transaction Date</Text>
                                  </Left>
                                  <Body>
                                   <Text style={{color:"#33b5e5"}}>Amount Invested</Text>
                                   </Body>
                                    <Right>
                                     <Icon name="minus"/>
                                   </Right>
                                   </ListItem>
                                   </List>
                                    <LinearGradient
                                     start={[0.1,1.0,1.0]}
                                    colors={['#33b5e5','#33b5e5','transparent']}
                                    style={{
                                    margin:2,
                                    height:1
                                    }}
                                  />
                            <List
                                dataArray={this.state.items}
                                renderRow={(item) =>
                                  <ListItem onPress={() => this.props.navigation.navigate('MarketDetails',{
                                    date_invested:item.date_invested,amount_invested:item.amount_invested,maturity_date:item.mat_date,interest:item.interest_rate,
                                    withholding:item.withholding_tax,number_of_days:item.number_of_days,total_interest:item.total_interest
                                  })}>
                                  <Left>
                                  <Text style={{color:"#274180"}}>{item.date_invested}</Text>
                                  </Left>
                                  <Body>
                                   <Text style={{color:"#33b5e5"}}>{Number(item.amount_invested).toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                   </Body>
                                   <Right>
                                  <Icon name="chevron-right"/>
                                   </Right>
                                  </ListItem>
                                }>
                              </List>
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}