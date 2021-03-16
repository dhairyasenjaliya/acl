import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,List,ListItem,Toast} from 'native-base';
import {Image,ImageBackground,StatusBar,AsyncStorage} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from "./Loader";



export default class Summary extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
          items:[],
          uid:'',
          deal_total:null,
          all_investments_number:null,
          summary_total:null,
          total_interest_expected:null,
          total_invested:null,
          total_market_investments:null,
          total_shares_bought:null,
          total_share_investments:null,
          total_shares_money:null,
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
      return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/get_summary.php?uid="+value)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson !== 'No Data')
        {
        this.setState({
         deal_total:responseJson[0].deal_total,
         all_investments_number:responseJson[0].all_investments_number,
         summary_total:responseJson[0].summary_total,
         total_interest_expected:responseJson[0].total_interest_expected,
         total_invested:responseJson[0].total_invested,
         total_market_investments:responseJson[0].total_market_investments,
         total_shares_bought:responseJson[0].total_shares_bought,
         total_share_investments:responseJson[0].total_share_investments,
         total_shares_money:responseJson[0].total_shares_money,
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
                    <Container style={{backgroundColor:"#f6f6ff"}}>
                        <Loader
                            loading={this.state.loading} />
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
                            <View style={{width:"100%",backgroundColor:"#fff",borderTopRightRadius:50,marginTop:10,padding:10}}>
                              <Text style={{color:"#274180"}}>Money Market Investments</Text>
                               <LinearGradient
                                     start={[0.1,1.0]}
                                    colors={['#274180','#274180','transparent']}
                                    style={{
                                    margin:2,
                                    height:1
                                    }}
                                  />
                                   <Text style={{color:"#274180",alignSelf:"center"}}>Total Amount Invested: MWK {this.state.total_invested}</Text>
                                   <Text style={{color:"#274180",alignSelf:"center"}}>Total Net Interest: MWK {this.state.total_interest_expected}</Text>
                                   <Text style={{color:"#274180",alignSelf:"center"}}>Number of Investments {this.state.total_market_investments}</Text>
                            </View>

                              <View style={{width:"100%",backgroundColor:"#fff",marginTop:10,padding:10}}>
                              <Text style={{color:"#1d3060"}}>Share Investments</Text>
                                <LinearGradient
                                     start={[0.1,1.0]}
                                    colors={['#1d3060','#1d3060','transparent']}
                                    style={{
                                    margin:2,
                                    height:1
                                    }}
                                  />
                                   <Text style={{alignSelf:"center",color:"#1d3060"}}>Total Amount Invested: MWK {this.state.total_shares_money}</Text>
                                   <Text style={{alignSelf:"center",color:"#1d3060"}}>Total Number of Shares: {this.state.total_shares_bought}</Text>
                                   <Text style={{alignSelf:"center",color:"#1d3060"}}>Total Share Investments: {this.state.total_share_investments} </Text>
                            </View>
                          
                            <View style={{width:"100%",backgroundColor:"#fff",borderBottomRightRadius:50,marginTop:10,padding:10}}>
                              <Text style={{color:"#33b5e5",marginTop:10}}>All Investments Summary</Text>
                                <LinearGradient
                                     start={[0.1,1.0]}
                                    colors={['#33b5e5','#33b5e5','transparent']}
                                    style={{
                                    margin:2,
                                    height:1
                                    }}
                                  />
                                   <Text style={{alignSelf:"center",color:"#33b5e5"}}>Total Amount Invested {this.state.deal_total}</Text>
                                   <Text style={{alignSelf:"center",color:"#33b5e5"}}>Number of Investments {this.state.all_investments_number}</Text>
                            </View>

                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}