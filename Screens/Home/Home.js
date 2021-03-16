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
    ActionSheet,
    View, H3, H1
} from 'native-base';
import {Image,ImageBackground,StatusBar,AsyncStorage} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

const bg_image = require("../../Assets/page_bg.jpg");
var BUTTONS = ["Settings","Logout", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    
  
    render() {
        return (
                <StyleProvider style={getTheme(platform)}>
                    <Container style={{backgroundColor:"#FFF"}}>
                        <Content>
                            <ImageBackground source={bg_image}  style={{width:   "100%", height:300}}>
                                    <Header >
                                        <Left>
                                            <Button transparent  onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                <Icon name='menu' style={{fontSize:25}}/>
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Text style={{color:"#fff"}}>Alliance Capital Limited</Text>
                                        </Body>
                                        <Right>
                                             <Button transparent    onPress={() =>
                                                 ActionSheet.show(
                                                     {
                                                         options: BUTTONS,
                                                         cancelButtonIndex: CANCEL_INDEX,
                                                         destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                         title: "Actions"
                                                     },
                                                     buttonIndex => {
                                                         if(buttonIndex === 0){
                                                             this.props.navigation.navigate('UserProfile')
                                                         }
                                                         if(buttonIndex === 1){
                                                             try {
                                                                 AsyncStorage.removeItem('uid')
                                                             }catch (e) {
                                                                 console.log(e)
                                                             }
                                                             this.props.navigation.navigate('Index')
                                                         }
                                                     }
                                                 )}
                                             >
                                                <Icon name='more-vertical' style={{fontSize:20}}/>
                                            </Button>
                                        </Right>
                                    </Header>
                                <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',height:'80%'}}>
                                    <H3 style={{color:"#fff"}}>MPICO</H3>
                                    <Text style={{fontSize:20,color:"#fff"}}>13.05</Text>
                                    <Text style={{color:"#F00"}}>▼0.01(-0.08%)</Text>
                                </View>

                            </ImageBackground>
                            </Content>
                            <Content>
                              <Grid>
                                    <Row>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}}  onPress={() => this.props.navigation.navigate('Account')}>
                                                        <Icon name="credit-card"/>
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>My Account</Text>
                                        </Col>
                                        <Col>
                                            <Card style={{alignSelf:"center"}}>
                                                <CardItem>

                                                    <Button transparent style={{alignSelf:"center"}} onPress={() => this.props.navigation.navigate('Services')}>
                                                        <Icon name="gift" />
                                                    </Button>

                                                </CardItem>
                                            </Card>
                                            <Text style={{fontSize:11,alignSelf:"center",fontWeight: 'bold',color:"#24303c"}}>Products/Services</Text>
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