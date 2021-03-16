import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,Toast,List,ListItem} from 'native-base';
import {Image,ImageBackground,StatusBar, AsyncStorage,ListView} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Loader from "../Account/Loader";


class Eshares extends React.Component {
    constructor(props) {
        super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          items:[],
          uid:'',
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
            }
        } catch (error) {
            // Error retrieving data
        }
    };

     componentDidMount() {
      this._retrieveData();
      return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/get_shares.php")
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson !== 'No Data')
        {
        this.setState({
         items:responseJson,
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
  
  
    render() {
                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
                            <Content padder>
                                <Loader
                                    loading={this.state.loading} />
                            <Text note style={{alignSelf:"center"}}>Swipe from the left to add to watchlist or tap to get quote</Text>
                               <List 
                                leftOpenValue={75}
                                rightOpenValue={-75}
                                dataSource={this.ds.cloneWithRows(this.state.items)}
                                renderRow={(item) =>{
                                if(item.symbol === "white")
                               {
                                 return(
                                   <ListItem avatar button onPress={() => this.props.navigation.navigate('ShareQuote',{mse:item.mse,price:item.opening})}>
                                <Body>
                                  <Text numberOfLines={1}>{item.company}</Text>
                                  <Text note style={{color:"#274180"}}>{item.mse}</Text>
                                </Body>
                                 <Right>
                                  <Text note>{item.change}</Text>
                                <Text style={{color:"#33b5e5"}}>{item.opening}</Text>
                              </Right>
                              </ListItem>
                                 )}else if(item.symbol === "green_caret"){
                                     return(
                                   <ListItem avatar button onPress={() => this.props.navigation.navigate('ShareQuote',{mse:item.mse,price:item.opening})}>
                                <Body>
                                  <Text numberOfLines={1}>{item.company}</Text>
                                  <Text note style={{color:"#274180"}}>{item.mse}</Text>
                                </Body>
                                 <Right>
                                  <Text style={{color:"green"}} note>{item.change}</Text>
                                   <Text style={{color:"green"}}>{item.opening}</Text>
                              </Right>
                              </ListItem>
                                     )}else{
                                         return(
                                   <ListItem avatar button onPress={() => this.props.navigation.navigate('ShareQuote',{mse:item.mse,price:item.opening})}>
                                <Body>
                                  <Text numberOfLines={1}>{item.company}</Text>
                                  <Text note style={{color:"#274180"}}>{item.mse}</Text>
                                </Body>
                                 <Right>
                                  <Text style={{color:"red"}} note>{item.change}</Text>
                                  <Text note style={{color:"red"}}>{item.opening}</Text>
                              </Right>
                              </ListItem>
                                         )
                         
                               }

                              }
                          }  renderLeftHiddenRow={item =>
                            <Button full success>
                              <Icon active name="plus-circle" />
                            </Button>}
                          />
                            </Content>
        );
    }
}
export default withNavigation(Eshares);