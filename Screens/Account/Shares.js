import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,List,ListItem,Card,CardItem,Toast} from 'native-base';
import {Image,ImageBackground,StatusBar,View,AsyncStorage} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Loader from "./Loader";

const bg_image = require("../../Assets/logbg.png");


export default class Shares extends React.Component {
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
                 return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/share_transactions_data.php?uid="+value)
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
        return true;
    };

     componentDidMount() {
      this._retrieveData();
    }
  
  
    render() {
      const {navigation} = this.props;
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
                                        <Text style={{color:"#fff"}}>Share Transactions</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                                    <Text style={{fontWeight: 'bold',color:"#1d3060",marginTop:30,marginLeft:20}}>Total Market Value</Text>
                                   <Text style={{fontWeight: 'bold', fontSize:25,color:"#fff",marginLeft:20,marginBottom:20}}>MWK {market_value}</Text>
                            </View>
                            <Content padder>
                            <List
                                dataArray={this.state.items}
                                renderRow={(item) =>
                                  <View style={{backgroundColor:"#FFF",margin:10,borderTopRightRadius:50}}>
                                  <ListItem header>
                                  <Text style={{color:"#1d3060"}}>{item.counter}</Text>
                                  </ListItem>
                                  <ListItem button onPress={() => this.props.navigation.navigate('ShareDetails',{counter:item.counter})}>
                                  <Body>
                                    <Text style={{color:"#274180",fontSize:12}}>{item.number_of_shares} Shares</Text>
                                    <Text style={{color:"#274180",fontSize:12}}>Current Price: {item.current_price}</Text>
                                    <Text style={{color:"#33b5e5",fontSize:12}}>Market Value: MWK {item.market_value}</Text>
                                    </Body>
                                    <Right>
                                    <Icon name="chevron-right"/>
                                    </Right>
                                  </ListItem>
                                   </View>
                                }>
                              </List>
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}