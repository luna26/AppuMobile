import React from 'react';
import { View } from 'react-native';
import {
    Scene,
    Router,
    Stack,
    Tabs
} from 'react-native-router-flux';
import Home from './components/home/Home';
import Splash from './components/splash/Splash';
import Carrers from './components/carrers/Carrers';
import Menu from './components/menu/menu';
import Info from './components/info/Info';
import Calculator from './components/calculator/Calculator';

const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root" hideNavBar={true}>
                <Scene
                    key="mediaContainerTabs"
                    swipeEnabled={false}
                    backBehavior="none"
                    tabs={true}
                    hideTabBar={true}
                >
                    {/* <Scene key="splash" component={Splash} hideNavBar={true} initial/> */}
                    <Scene key="home" component={Home} hideNavBar={true} />
                    <Scene key="carrers" component={Carrers} hideNavBar={true} />
                    <Scene key="calc" component={Calculator} hideNavBar={true} initial/>
                    <Scene key="info" component={Info} hideNavBar={true}/>
                </Scene>
            </Scene>
        </Router >
    );
};

export default RouterComponent;
