import React from "react";
import PropTypes from "prop-types";
import { Image, View} from "react-native";
import { withNavigation} from "react-navigation";
import { Container, Content, Text, List, ListItem, Icon, Right,Body,StyleProvider } from "native-base";
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

const routes = [{text:"Services",icon:"box","route":"Services"},{text:"Economic Data",icon:"trending-up","route":"TabsClass"},
    {text:"Contact Us",icon:"mail","route":"Contact"},{text:"Find Us",icon:"map-pin","route":"Map"},{text: "Downloads",icon:"download","route":"Downloads"}
    , {text:"News",icon:"align-center","route":"News"},{text: "Notifications",icon:"bell","route":"NotificationsClass"},{text: "Settings",icon:"gear","route":"UserProfile"}];
class UserSideBar extends React.Component {
    navigateToScreen(route){
        this.props.navigation.navigate(route)
    }
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
            <Container style={{flex:1}}>
                <Content>
                    <View style={{height:150,justifyContent:"center"}}>
                        <Image source={require('../Assets/cdhlogo.png')} style={{width:100,height:80,alignSelf:"center",resizeMode:'contain'}}/>
                        <Text style={{ fontFamily: 'Roboto'}}></Text>
                        <Text note></Text>
                    </View>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem icon onPress={() => this.navigateToScreen(data.route)}>
                                    <Body>
                                    <Text style={{ fontFamily: 'Roboto'}}>{data.text}</Text>
                                    </Body>
                                    <Right>
                                        <Icon active name={data.icon} style={{fontSize: 20, color: "#444"}}/>
                                    </Right>
                                </ListItem>
                            );
                        }}
                    />
                    <Text style={{fontSize:12,color:"#444",alignSelf:"center",marginTop:10}}>Powered by App Farm</Text>
                </Content>
            </Container>
            </StyleProvider>
        );
    }
}
UserSideBar.propTypes = {
    navigation: PropTypes.object
};

export default withNavigation(UserSideBar)