import {Icon, Button,Text,Content,Left,Right,Form,Item,Input,View,Picker,Toast } from 'native-base';
import {withNavigation} from 'react-navigation';
import React from 'react';
import Loader from "../Account/Loader";


class MoneyQuote extends React.Component {
    constructor(props) {
        super(props);
       this.state = {
          selected2:undefined,
           loading:false
        };
    }

      onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

    handleAmount = (text) => {
        this.setState({amount: text})
    };

    calculate(){
        this.setState({loading:true});
        let rate = 0;
        let invamount = Number(this.state.amount);
        let ten = 0;
        let gross_int = 0;
        let tax = 0;
        let netint = 0;
        let netmat = 0;
        return   fetch("https://appfarm.000webhostapp.com/acl/acl_app/get_market_rates.php")
            .then((response) => response.json())
            .then((responseJson) => {
                    if(this.state.selected2 === "key0"){
                        rate = responseJson[0].thirty;
                        ten = 90;
                    }
                    else if(this.state.selected2 === "key1"){
                        rate = responseJson[0].ninety;
                        ten = 182
                    }
                    else if(this.state.selected2 === "key2"){
                        rate = responseJson[0].year;
                        ten = 364
                    }

                    gross_int = (invamount * rate/100)*ten/365;
                    tax = gross_int * (rate/100);
                    netint = gross_int - tax;
                    netmat = invamount + netint;

                    console.log("netmat"+netmat);
                    this.setState({loading:false});

                    this.props.navigation.navigate('MoneyMarketQuote',{
                        tenor:ten,rate:rate,amount:invamount,gross_int:gross_int,tax:tax,
                        netint:netint,netmat:netmat
                    })
            }).catch((error) => {
                console.error(error);
                 Toast.show({
                        text: 'Connection Error, Try Again',
                        buttonText: ' ',
                        duration: 3000,
                    })
            });
    }
  
    render() {
        return (
           
                            <Content padder>
                                <Loader
                                    loading={this.state.loading} />
                              <Form>
                              <View style={{marginTop:10}}>
                              <Left>
                              <Text style={{ fontFamily: 'Roboto'}}>Tenor: </Text>
                              </Left>
                              <Right>
                            <Item picker>
                              <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="chevron-down" />}
                                iosHeader="Select Tenor"
                                style={{ width: undefined }}
                                headerTitleStyle={{ color: "#fff" }}
                                placeholder="Select Tenor"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                              >
                                <Picker.Item label="90 Days" value="key0" />
                                <Picker.Item label="182 Days" value="key1" />
                                <Picker.Item label="364 Days" value="key2" />
                              </Picker>
                            </Item>
                            </Right>
                              </View>
                              </Form>
                              <Form>
                              <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                              <Input onChangeText={this.handleAmount} placeholder='How much would you like to invest?' style={{padding:5}}/>
                            </Item>
                            </Form>
                            <Button onPress={()=>this.calculate()} block style={{marginTop:20,borderRadius:5}}>
                             <Text style={{ fontFamily: 'Roboto'}}>Next</Text>
                          </Button>
                          
                            </Content>
              
        );
    }
}
export default withNavigation(MoneyQuote);