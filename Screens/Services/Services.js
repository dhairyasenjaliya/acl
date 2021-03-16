import {Container,Icon, Button,Text,StyleProvider,Content,Header,Left,Right,Body,Form,Item,Label,Input,Accordion, View } from 'native-base';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

const data = [{ title: "Pension Fund Asset Management", content: "Pensions are a key aspect of any modern society. And investment returns are crucial for sustainable and effective pension schemes... " },
    { title: "Money Market Brokerage", content: "Our money market broking service is an agency relationship where you, as principal, give us a mandate to invest funds on your behalf for a small fee... " },
    { title: "Property Management", content: "Apart from pension fund asset management, portfolio management and corporate finance advisory services, Alliance Capital is also registered by the Malawi Stock Exchange.... ." },
    { title: "Collective Investment Schemes", content: "We pool money from groups of people in order to make joint investments for better returns... " },
{ title: "Collective Investment Schemes", content: "At Alliance Capital, your transaction is important to us, regardless of size. Whether advising a private seller or managing a corporate divestiture, we provide responsive and insightful advisory... " },
    { title: "Collective Investment Schemes", content: "ACL is authorised by Malawi Stock Exchange to handle share transactions on behalf of its clientsas a non member institution..." }
];

export default class Services extends React.Component {
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
                                        <Text style={{color:"#fff"}}>Services</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </Header>
                            <Content padder>
                             <Accordion
                              dataArray={data}
                              renderHeader={data => {
    return (
      <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between", backgroundColor: "#FFF" }}>
        <Text style={{ fontWeight: "600",color:"#274180" }}>{data.title}</Text>
        {data.expanded
          ? <Icon style={{ fontSize: 18,color:"#274180" }} name="chevron-right" />
          : <Icon style={{ fontSize: 18,color:"#274180" }} name="chevron-down" />}
      </View>
    );
  }}
                              renderContent={data => {
    return (
      <Text style={{ backgroundColor: "#FFF", padding: 10, fontStyle: "italic" }}>
      {data.content}
      </Text>
    );
  }}
                            />
                            </Content>
                    </Container>
                </StyleProvider>
        );
    }
}