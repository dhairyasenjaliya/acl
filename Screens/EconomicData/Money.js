import {Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,Toast } from 'native-base';
import {Image,ImageBackground,StatusBar,AsyncStorage} from "react-native";
import {withNavigation} from 'react-navigation';
import React from 'react';
// import {LinearGradient} from "expo";
import { LinearGradient } from 'expo-linear-gradient';

import Loader from "../Account/Loader";

 class Money extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
          items:[],
          uid:'',
          thirty:null,
          ninety:null,
          year:null,
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
      return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/get_market_rates.php")
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson !== 'No Data')
        {
        this.setState({
         thirty:responseJson[0].thirty,
         ninety:responseJson[0].ninety,
         year:responseJson[0].year,
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
        return (              
                <Content padder>
                    <Loader
                        loading={this.state.loading} />
                       <View style={{alignItems:"center",width:"100%"}}>
                       <Text note>Our Rates</Text>
                       <View style={{margin:20,width:"100%"}}>
                         <LinearGradient
                                    start={[0.1,1.0]}
                                      end={[0.4,0.4]}
                                    colors={['#274180','#fff']}
                                    style={{
                                    margin:10,
                                    height:2
                                    }}
                                  />
                       <Text style={{alignSelf:"center"}}>30 Days</Text>
                        <Text style={{fontSize:25,color:"red",alignSelf:"center"}}>{this.state.thirty} %</Text>
                        </View>
                         <View style={{margin:20,width:"100%"}}>
                           <LinearGradient
                                     start={[0.1,1.0]}
                                      end={[0.4,0.4]}
                                    colors={['#1d3060','transparent']}
                                    style={{
                                    margin:10,
                                    height:2
                                    }}
                                  />
                       <Text style={{alignSelf:"center"}}>90 Days</Text>
                        <Text style={{fontSize:25,color:"red",alignSelf:"center"}}>{this.state.ninety} %</Text>                      
                        </View>
                         <View style={{margin:20,width:"100%"}}>
                           <LinearGradient
                                    start={[0.1,1.0]}
                                      end={[0.4,0.4]}
                                    colors={['#33b5e5','transparent']}
                                    style={{
                                    margin:10,
                                    height:2
                                    }}
                                  />
                       <Text style={{alignSelf:"center"}}>365 Days</Text>
                        <Text style={{fontSize:25,color:"red",alignSelf:"center"}}>{this.state.year} %</Text>
                        </View>
                       </View>
                       <Button block rounded onPress={() => this.props.navigation.navigate('Quotes')}><Text>Get Quote</Text></Button>
                </Content>
        );
    }
}

export default withNavigation(Money)