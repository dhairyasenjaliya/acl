import {Container,Content, Header, Button, Icon, Left, Right, Body, Text, Tab, Tabs,StyleProvider } from 'native-base'; //Include Nativebase required components
import React from 'react';
import {  StatusBar} from 'react-native'; //Most of the react native components can be found in NativeBase
import {withNavigation, DrawerActions} from 'react-navigation';
import EShares from "./EShares";
import Money from "./Money";
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';



class TabsClass extends React.Component {
    render() {
        return (
          <StyleProvider style={getTheme(platform)}>
          <Container>
                    <Header hasTabs>

                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.goBack()}>
                                <Icon name='chevron-left' />
                            </Button>
                        </Left>
                        <Body>
                        <Text style={{color:"#fff"}}>Economic Data</Text>
                        </Body>
                        <Right>
                           
                        </Right>
                    </Header>

                    <Content style={{padding:5,flex:1}}>
                     <Tabs locked>
          <Tab heading="Shares">
            <EShares />
          </Tab>
          <Tab heading="Money Market Rates">
            <Money />
          </Tab>
            </Tabs>
                </Content>
                </Container>
                </StyleProvider>
        );
    }
}
export default withNavigation(TabsClass)