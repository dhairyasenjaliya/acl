import React, { Component } from "react";
// import {Asset, AppLoading} from "expo";
import AppLoading from 'expo-app-loading'
import Index from "./Screens/Index";
import SideBar from "./Screens/SideBar";
import Login from "./Screens/Home/Login";
import Services from "./Screens/Services/Services";
import Account from "./Screens/Account/Index";
import MoneyMarket from "./Screens/Account/MoneyMarket";
import MarketDetails from "./Screens/Account/MarketDetails";
import ShareDetails from "./Screens/Account/ShareDetails";
import Shares from "./Screens/Account/Shares";
import Summary from "./Screens/Account/Summary";
import Home from "./Screens/Home/Home";
import TabsClass from "./Screens/EconomicData/TabsClass";
import EShares from "./Screens/EconomicData/EShares";
import Money from "./Screens/EconomicData/Money";
import Quotes from "./Screens/Quotes/Quotes";
import { Root } from "native-base";
import {AsyncStorage} from "react-native";
import ShareQuote from "./Screens/Quotes/ShareQuote";
import ShareQuoteResult from  "./Screens/Quotes/ShareQuoteResult";
import MoneyMarketQuote from "./Screens/Quotes/MoneyMarketQuote";
import MoneyQuote from "./Screens/Quotes/MoneyQuote";
import Invest from "./Screens/Quotes/Invest";
import Contact from "./Screens/Contacts/Contact";
import Map from  "./Screens/Contacts/Map";
import News from  "./Screens/News/News";
import NewsDetails from "./Screens/News/NewsDetails";
import Downloads from "./Screens/Downloads/Downloads";
import NotificationsClass from "./Screens/Notifications/NotificationsClass";
import UserProfile from  "./Screens/User/UserProfile";
import { createDrawerNavigator, createStackNavigator} from "react-navigation";
import {Text} from "react-native";
import * as Font from 'expo-font';


export default class App extends Component {
    constructor() {
        super();
        Text.allowFontScaling = false;
        this.state = {
          uid:null,
          isReady: false,
          isLoggedIn:false
        };
    }
    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Feather: require("native-base/Fonts/Feather.ttf"),
            Ionicons: require("native-base/Fonts/Ionicons.ttf")

        });
        try {
            const value = await AsyncStorage.getItem('uid');
            if (value !== null) {
              this.setState({
                uid:value,
                isReady:true,
                  fontLoaded: true,
                  isLoggedIn:true
              });
                console.log(value);
            }else{
               this.setState({
                   fontLoaded: true,
                isReady:true,
              })
            }
        } catch (error) {
          console.log(error)
        }
    }
    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        if(!this.state.isLoggedIn){
        return <Root>
        <HomeScreenRouter />
        </Root>;
        }else{
          return <Root>
          <UserRouter />
          </Root>;
        }
    }
}

const MainStack = createStackNavigator({
   Index : {
            screen: Index,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        Login : {
          screen: Login,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
         Home : {
          screen: Home,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
           Services : {
          screen: Services,
           navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Contact : {
            screen: Contact,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Map : {
            screen: Map,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        News : {
            screen: News,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        NewsDetails : {
            screen: NewsDetails,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Downloads : {
            screen: Downloads,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        NotificationsClass : {
            screen: NotificationsClass,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
            Quotes : {
          screen: Quotes,
           navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Invest : {
            screen: Invest,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        MoneyQuote : {
            screen: MoneyQuote,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        MoneyMarketQuote : {
            screen: MoneyMarketQuote,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
          TabsClass : {
          screen: TabsClass,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },  EShares : {
          screen: EShares,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },  Money : {
          screen: Money,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
           Account : {
          screen: Account,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
           ShareQuote : {
          screen: ShareQuote,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
           ShareQuoteResult : {
          screen: ShareQuoteResult,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
           MoneyMarket : {
          screen: MoneyMarket,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          MarketDetails : {
          screen: MarketDetails,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          Shares : {
          screen: Shares,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          ShareDetails : {
          screen: ShareDetails,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          Summary : {
          screen: Summary,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        }
})

const HomeScreenRouter = createDrawerNavigator(
    {
     MainStack:{
       screen:MainStack
     }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);

const UserStack = createStackNavigator(
    {
        Home : {
          screen: Home,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
        Index : {
            screen: Index,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        Login : {
          screen: Login,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          TabsClass : {
          screen: TabsClass,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },  EShares : {
          screen: EShares,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },  Money : {
          screen: Money,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
        MoneyQuote : {
            screen: MoneyQuote,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        MoneyMarketQuote : {
            screen: MoneyMarketQuote,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
           Services : {
          screen: Services,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
           Account : {
          screen: Account,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
           MoneyMarket : {
          screen: MoneyMarket,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
        Contact : {
            screen: Contact,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Map : {
            screen: Map,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        News : {
            screen: News,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        NewsDetails : {
            screen: NewsDetails,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Downloads : {
            screen: Downloads,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        NotificationsClass : {
            screen: NotificationsClass,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        UserProfile : {
            screen: UserProfile,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Invest : {
            screen: Invest,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
          MarketDetails : {
          screen: MarketDetails,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
            Quotes : {
          screen: Quotes,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
            ShareQuote : {
          screen: ShareQuote,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
         ShareQuoteResult : {
          screen: ShareQuoteResult,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          Shares : {
          screen: Shares,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          ShareDetails : {
          screen: ShareDetails,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        },
          Summary : {
          screen: Summary,
           navigationOptions: ({navigation}) => ({
                header: null,
            }), 
        }
    }
);

const UserRouter = createDrawerNavigator(
    {
     MainStack:{
       screen:UserStack
     }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);