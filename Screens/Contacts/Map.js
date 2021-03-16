import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View,Toast,Textarea } from 'native-base';
import {Image,ImageBackground,StatusBar} from "react-native";
import {withNavigation, DrawerActions} from 'react-navigation';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
// import {MapView} from "expo";
import MapView from 'react-native-maps';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }


    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container style={{backgroundColor:"#FFF"}}>
                    <Header >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                <Icon name='chevron-left' style={{fontSize:25}}/>
                            </Button>
                        </Left>
                        <Body>
                        <Text style={{color:"#fff"}}>Contact Us</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Content padder>
                        <MapView style={{ flex: 1,height:300 }}
                                 provider="google"
                                 initialRegion={{
                                     latitude:-15.7832574,
                                     longitude:35.0047169,
                                     latitudeDelta: 0.1,
                                     longitudeDelta: 0.001,
                                 }}
                                 zoomEnabled={true}
                        >
                            <MapView.Marker
                                key={1}
                                coordinate={{latitude: -15.7832574, longitude: 35.0047169}}
                                title={"Alliance Capital Limited"}
                                description={"Old Air Malawi Building"}
                            />
                        </MapView>
                        <View style={{alignItems:"center"}}>
                            <Text note>Alliance Capital Limited</Text>
                            <Text note>Air Malawi Building</Text>
                            <Text note>Robins Road, P.O Box 510, Blantyre, Malawi</Text>
                            <Text note>Tel: (+265) 1 830 704 </Text>
                            <Text note>Email: info@alliancecapitalmw.com</Text>
                            <Text note>Website: www.alliancecapitalmw.com</Text>
                            <Button onPress={()=>this.props.navigation.navigate('Contact')} block style={{marginTop:20,borderRadius:5}}>
                            <Text style={{ fontFamily: 'Roboto'}}>Send us a message</Text>
                        </Button>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}