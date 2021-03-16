import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,H3,Picker,ListItem,Radio } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Loader from "../Account/Loader";


export default class ShareQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected2:undefined,
          itemSelected:'itemOne',
          mse:null,
          price:null,
          amount:null,
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


  UNSAFE_componentWillMount(){
     const {navigation} = this.props;
      const mse = navigation.getParam('mse','');
      const price = navigation.getParam('price');

      this.setState({
        mse:mse,
        price:price
      })
  }

  calculate(){
      this.setState({loading:true});
    var amount = Number(this.state.amount);
    var price = Number(this.state.price);
    var basic_charge = 50;
    var first_comm = 0;
    var second_comm = 0;
    var third_comm = 0;
    var total_comm = 0;
    var vat = 0;
    var totalc = 0;
    var deal_total = 0;
    var consideration = amount;
    var shares = 0;

    if(this.state.itemSelected === "itemOne"){
                   shares = amount/price;
                }else if(this.state.itemSelected == "itemTwo"){
                    consideration = amount * price;
                    shares = amount;
                }

                if(consideration >= 50000){
                    first_comm = 50000 * 0.02;
                    second_comm = 50000 * 0.015;
                    third_comm = 0;
                }else if(consideration < 50000){
                    first_comm =  50000 * 0.02;
                    second_comm = 0;
                    third_comm = 0;
                }else if(consideration > 100000){
                    third_comm = (consideration - 100000)* 0.01;
                }
                total_comm = first_comm + second_comm + third_comm;
                vat = (total_comm + 50) * 0.165;
                totalc = total_comm + vat + basic_charge;
                if(this.state.selected2 == "key1"){
                    deal_total = consideration - totalc;
                }else if(this.state.selected2 == "key0"){
                    deal_total = consideration + totalc;
                }
                this.setState({loading:false});
                this.props.navigation.navigate('ShareQuoteResult',{
                  consideration:consideration,counter:this.state.mse,price:this.state.price,shares:shares,first_comm:first_comm,
                  second_comm:second_comm,third_comm:third_comm,total_comm:total_comm,vat:vat,totalc:totalc,deal_total:deal_total
                });

                console.log("Deal"+deal_total)
                
  }
  
    render() {
     

        return ( <StyleProvider style={getTheme(platform)}>
                    <Container style={{backgroundColor:"#FFF"}}>
                        <Loader
                            loading={this.state.loading} />
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
                            <View style={{alignItems:"center",margin:20}}>
                            <H3>Counter: {this.state.mse}</H3>
                            <Text style={{ fontFamily: 'Roboto'}}>Price: {this.state.price}</Text>
                            </View>
                              <Form>
                              <Right>
                              <Text style={{ fontFamily: 'Roboto'}}>Contract Type: </Text>
                              </Right>
                              <Left>
                            <Item picker>
                              <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="chevron-down" />}
                                iosHeader="Select Contract Type"
                                style={{ width:undefined }}
                                headerTitleStyle={{ color: "#fff" }}
                                placeholder="Select Contract Type"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                              >
                                <Picker.Item label="Purchase" value="key0" />
                                <Picker.Item label="Sell" value="key1" />
                              </Picker>
                            </Item>
                            </Left>
                              </Form>
                            <View style={{alignItems:"center",marginTop:20}}>
                            <Text note>Enter Amount or Number of Shares</Text>
                            </View>
                            <View>
                            <ListItem onPress={() => this.setState({ itemSelected: 'itemOne' })}
                            selected={this.state.itemSelected == 'itemOne'}
                            >
                            <Left>
                              <Text style={{ fontFamily: 'Roboto'}}>Amount</Text>
                            </Left>
                            <Right>
                              <Radio selected={this.state.itemSelected == 'itemOne'}  />
                            </Right>
                          </ListItem>
                          <ListItem  onPress={() => this.setState({ itemSelected: 'itemTwo' })}
                          selected={this.state.itemSelected == 'itemTwo'}
                             >
                            <Left>
                              <Text style={{ fontFamily: 'Roboto'}}>Number of Shares</Text>
                            </Left>
                            <Right>
                              <Radio 
                             selected={this.state.itemSelected == 'itemTwo'} />
                            </Right>
                          </ListItem>
                          </View>
                          <View>
                           <Form>
                             <Item rounded style={{marginTop:20,backgroundColor:"#ececec",borderColor:"#fff"}}>
                              <Input onChangeText={this.handleAmount} placeholder='Amount/Number of Shares' style={{padding:5}}/>
                            </Item>
                            </Form>
                            <Button onPress={()=> this.calculate()} block style={{marginTop:20,borderRadius:5}}>
                             <Text style={{ fontFamily: 'Roboto'}}>Next</Text>
                          </Button>
                          </View>
                            </Content>
                            </Container>
                            </StyleProvider>
              
        );
    }
}