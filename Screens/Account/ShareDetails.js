import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,List,ListItem,Card,CardItem,Toast} from 'native-base';
import {Image,ImageBackground,StatusBar,View,AsyncStorage} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Loader from "./Loader";

export default class ShareDetails extends React.Component {
       constructor(props) {
        super(props);
        this.state = {
          items:[],
          uid:'',
          counter:null,
          total:null,
          number_of_shares:null,
          total_purchase_cost:null,
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
                 const {navigation} = this.props;
      const counter = navigation.getParam('counter','');
      return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/share_transactions_data.php?uid="+value+"&counter="+counter)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson !== 'No Data')
        {
        this.setState({
         counter:counter,
         items:responseJson,
         total:responseJson[0].total_market_value,
         number_of_shares:responseJson[0].total_number_of_shares,
         total_purchase_cost:responseJson[0].total_cost,
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
        return true;
    };

     componentDidMount() {
      this._retrieveData();
    }
  
    render() {
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
                                        <Text style={{color:"#fff"}}>Share Transactions</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                                  <Text style={{fontWeight: 'bold',color:"#1d3060",marginTop:30,marginLeft:20}}>Counter</Text>
                                   <Text style={{fontWeight: 'bold', fontSize:25,color:"#fff",marginLeft:20,marginBottom:10}}>{this.state.counter}</Text>
                                    <Text style={{fontWeight: 'bold',color:"#1d3060",marginTop:10,marginLeft:20}}>Total Market Value</Text>
                                   <Text style={{fontWeight: 'bold', fontSize:25,color:"#fff",marginLeft:20,marginBottom:10}}>MWK {this.state.total}</Text>
                                     <View style={{flexDirection:"row",marginTop:10,marginLeft:20,marginRight:20}}>
                                   <Left>
                                   <Text style={{color:"#1d3060"}}>Total Purchase Cost</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#1d3060"}}>Total Number of Shares</Text>
                                   </Right>
                                   </View>
                                    <View style={{flexDirection:"row",marginLeft:20,marginRight:20,marginBottom:20}}>
                                   <Left>
                                   <Text style={{color:"#fff",fontWeight: 'bold', fontSize:15}}>MWK {this.state.total_purchase_cost}</Text>
                                   </Left>
                                   <Right>
                                   <Text style={{color:"#fff",fontWeight: 'bold', fontSize:15}}>{this.state.number_of_shares}</Text>
                                   </Right>
                                   </View>
                            </View>
                            <Content padder>
                            <List
                                dataArray={this.state.items}
                                renderRow={(item) =>
                                <View>
                                 <ListItem itemDivider>
                                 <Text style={{ fontFamily: 'Roboto'}}>Transaction Date {item.date}</Text>
                                  </ListItem>         
                                  <ListItem style={{backgroundColor:"#FFF"}}>
                                  <Body>
                                  <Text style={{ fontFamily: 'Roboto'}}>Number of Shares</Text>
                                  <Text style={{ fontFamily: 'Roboto'}}>Purchase Price</Text>
                                  <Text style={{ fontFamily: 'Roboto'}}>Purchase Cost</Text>
                                  <Text style={{ fontFamily: 'Roboto'}}>Current Price</Text>
                                  <Text style={{ fontFamily: 'Roboto'}}>Market Value</Text>
                                  </Body>
                                  <Body>
                                  <Text style={{color:"#274180"}}>{item.number_of_shares}</Text>           
                                  <Text style={{color:"#274180"}}>{item.price}</Text>                     
                                  <Text style={{color:"#274180"}}>{item.deal_total}</Text>                           
                                  <Text style={{color:"#274180"}}>{item.current_price}</Text>
                                  <Text style={{color:"#274180"}}>{item.market_value}</Text>
                                  </Body>
                                  </ListItem>
                                  </View>
                                }>
                                 <ListItem itemHeader first>
                                  <Text style={{color:"#274180"}}>COMEDY</Text>
                                </ListItem>
                              </List>
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}