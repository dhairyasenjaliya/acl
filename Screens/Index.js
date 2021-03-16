import {
    Container,
    Icon,
    Button,
    Text,
    StyleProvider,
    Content,
    Header,
    Left,
    Right,
    Body,
    Card,
    CardItem,
    Grid,
    Col,
    Row,
    H1,
    H3,
    View,
    Toast
} from 'native-base';
import { ViewPager } from "react-native-viewpager-carousel";
import {ImageBackground} from "react-native";
import {DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
// import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications';

const bg_image = require("../Assets/page_bg.jpg");


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        items: null
    };
    }

     async registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log("Token"+token);
   return fetch("https://appfarm.000webhostapp.com/acl/acl_app/devices.php", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushToken: token,
      }),
    });
}

componentDidMount(){
  this.registerForPushNotificationsAsync();
    return fetch("http://api.mwclassrooms.info/api/get_shares.php")
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson !== 'No Data')
            {
                // console.log('responseJson',responseJson)
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
    _renderPage = ({item}) => {
        if(item.symbol === "white"){
            return (<View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',height:'80%'}}>
                    <H3 style={{color:"#fff"}}>{item.mse}</H3>
                    <Text style={{fontSize:50,color:"#fff"}}>{item.opening}</Text>
                    <Text style={{color:"#FFF"}}>▼{item.change}</Text>
                </View>
            )
        }else if(item.symbol === "green_caret"){
            return (<View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',height:'80%'}}>
                    <H3 style={{color:"#fff"}}>{item.mse}</H3>
                    <Text style={{fontSize:50,color:"#fff"}}>{item.opening}</Text>
                    <Text style={{color:"#0f0"}}>▼{item.change}</Text>
                </View>
            )
}else {
            return (<View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',height:'80%'}}>
                    <H3 style={{color:"#fff"}}>{item.mse}</H3>
                    <Text style={{fontSize:50,color:"#fff"}}>{item.opening}</Text>
                    <Text style={{color:"#F00"}}>▼{item.change}</Text>
                </View>
            )
        }

    }
    
    render() {
        return (
                <StyleProvider style={getTheme(platform)}>
                    <Container style={{backgroundColor:"#FFF"}}>
                        <Content>
                            <ImageBackground source={bg_image}  style={{width:   "100%", height:300}}>
                                    <Header>
                                        <Left>
                                            <Button transparent  onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                <Icon name='menu' style={{fontSize:25}}/>
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Text style={{color:"#fff"}}>Alliance Capital Limited</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                                <ViewPager
                                    data={this.state.items}
                                    renderPage={this._renderPage}
                                />
                            </ImageBackground>
                            </Content>
                            <Content>
                              <Grid>
                                    <Row>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}}  onPress={() => this.props.navigation.navigate('Login')}>
                                                        <Icon name="log-in"/>
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Login</Text>
                                        </Col>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}} onPress={() => this.props.navigation.navigate('Services')}>
                                                        <Icon name="gift" />
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Services</Text>
                                        </Col>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}} onPress={() => this.props.navigation.navigate('TabsClass')}>
                                                        <Icon name="trending-up" />
                                                            </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Market Data</Text>
                                        </Col>

                                    </Row>
                                      <Row>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}}  onPress={() => this.props.navigation.navigate('Quotes')}>
                                                        <Icon name="percent"/>
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Get Quote</Text>
                                        </Col>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}} onPress={() => this.props.navigation.navigate('Downloads')}>
                                                        <Icon name="download" />
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Downloads</Text>
                                        </Col>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}} onPress={() => this.props.navigation.navigate('News')}>
                                                        <Icon name="pie-chart" />
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Economic Reports</Text>
                                        </Col>

                                    </Row>
                                       <Row style={{alignSelf:"center"}}>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}}  onPress={() => this.props.navigation.navigate('Map')}>
                                                        <Icon name="map"/>
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Contact Us</Text>
                                        </Col>
                                      
                            
                                           <Col>
                                               <Card style={{alignSelf:"center"}}>
                                                   <CardItem>

                                                       <Button transparent style={{alignSelf:"center"}} >
                                                           <Icon name="info"/>
                                                       </Button>

                                                   </CardItem>
                                               </Card>
                                               <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>About</Text>
                                           </Col>

                                    </Row>
                                </Grid>
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}