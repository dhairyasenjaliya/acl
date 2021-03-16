import {Container,Icon, Button,Text,StyleProvider,Header,Left,Right,Body,Footer,FooterTab } from 'native-base';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import MoneyQuote from "./MoneyQuote";
import EShares from "../EconomicData/EShares";


export default class Quotes extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
           selectedTab: 'money'
        };
    }
    renderSelectedTab () {
    switch (this.state.selectedTab) {
      case 'money':
        return (<MoneyQuote/>)
      case 'share':
        return (<EShares/>)
      default:
    }
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
                                        <Text style={{color:"#fff"}}>Get Quote</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                          {this.renderSelectedTab()}
                                    <Footer>
                                  <FooterTab>
                                    <Button vertical active={this.state.selectedTab==='money'} onPress={() =>this.setState({selectedTab: 'money'})}>
                                      <Icon  active={this.state.selectedTab==='money'} name="credit-card" />
                                       <Text style={{ fontFamily: 'Roboto'}}>Money Market</Text>
                                    </Button>
                                    <Button vertical active={this.state.selectedTab==='share'} onPress={() =>this.setState({selectedTab: 'share'})}>
                                      <Icon  active={this.state.selectedTab==='share'} name="trending-up" />
                                      <Text style={{ fontFamily: 'Roboto'}}>Shares</Text>
                                    </Button>
                                  </FooterTab>
                                </Footer>
                                </Container>
                                </StyleProvider>
        );
    }
}