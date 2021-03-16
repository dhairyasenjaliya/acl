import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,List,ListItem,Card,CardItem,Toast} from 'native-base';
import {Image,ImageBackground,StatusBar,View,AsyncStorage,  ActivityIndicator, Modal} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Loader from "./Loader";

const bg_image = require("../../Assets/tree.jpg");


export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          uid:'',
          data:null,
          last_update:'',
          last_money_tr:'',
          total_market_money:'',
          total_active_investments:'',
          last_share_date:'',
          share_amount:'',
          total_amount_invested:'',
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
                 return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/dash_details.php?uid="+value)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson !== 'No Data')
        {
        this.setState({
          last_update:responseJson[0].last_update,
          last_money_tr:responseJson[0].last_money_tr,
          total_market_money:responseJson[0].total_market_money,
          total_active_investments:responseJson[0].total_active_investments,
          last_share_date:responseJson[0].last_share_date,
          share_amount:responseJson[0].share_amount,
          total_amount_invested:responseJson[0].total_amount_invested,
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
        return (
                <StyleProvider style={getTheme(platform)}>
                    <Container style={{backgroundColor:"#FFF"}}>
                        <Content>
                        <Loader
                          loading={this.state.loading} />
                            <ImageBackground source={bg_image}  style={{width:   "100%", height:300}}>
                                    <Header transparent >
                                        <Left>
                                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                                <Icon name='chevron-left' style={{fontSize:25}}/>
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Text style={{color:"#fff"}}>My Account</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                                   <Text style={{fontWeight: 'bold',color:"#fff",alignSelf:"center",marginTop:30}}>Investor ID</Text>
                                   <Text style={{fontWeight: 'bold', fontSize:30,color:"#fff",alignSelf:"center"}}>{this.state.uid}</Text>
                                   <Text style={{color:"#fff",alignSelf:"center"}}>Account Information::</Text>
                                   <Text style={{color:"#fff",alignSelf:"center"}}>{this.state.last_update}</Text>
                            </ImageBackground>
                            </Content>
                            <Content padder>
                              <List>
                              <ListItem onPress={() => this.props.navigation.navigate('MoneyMarket',{market_value:this.state.total_market_money,last_date:this.state.last_money_tr})}>
                                <Body>
                                  <Text style={{color:"#1d3060"}}>Money Market Transactions</Text>
                                  <Text note numberOfLines={1}>Last Transaction: {this.state.last_money_tr}</Text>
                                  <Text note numberOfLines={1}>Total Market Value: MWK {this.state.total_market_money}</Text>
                                </Body>
                                <Right>
                                  <Button transparent>
                                    <Text style={{ fontFamily: 'Roboto'}}>View</Text>
                                  </Button>
                                </Right>
                              </ListItem>
                               <ListItem onPress={() => this.props.navigation.navigate('Shares',{market_value:this.state.share_amount,last_date:this.state.last_share_date})}>
                                <Body>
                                  <Text style={{color:"#1d3060"}}>Share Transactions</Text>
                                  <Text note numberOfLines={1}>Last Transaction: {this.state.last_share_date}</Text>
                                  <Text note numberOfLines={1}>Total Market Value: MWK {this.state.share_amount}</Text>
                                </Body>
                                <Right>
                                  <Button transparent>
                                    <Text style={{ fontFamily: 'Roboto'}}>View</Text>
                                  </Button>
                                </Right>
                              </ListItem>
                               <ListItem onPress={() => this.props.navigation.navigate('Summary')}>
                                <Body>
                                  <Text style={{color:"#1d3060"}}>Market Summary</Text>
                                  <Text note numberOfLines={1}>{this.state.total_active_investments}</Text>
                                  <Text note numberOfLines={1}>Total Market Value: MWK {this.state.total_amount_invested}</Text>
                                </Body>
                                <Right>
                                  <Button transparent>
                                    <Text style={{ fontFamily: 'Roboto'}}>View</Text>
                                  </Button>
                                </Right>
                              </ListItem>
                            </List>
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}