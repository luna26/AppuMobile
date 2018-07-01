import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux';

import Home from './components/home/Home';
import Splash from './components/splash/Splash';
import Carrers from './components/carrers/Carrers';
import Menu from './components/menu/menu';

const RouterComponent = () => {
    return (
        <Router >
            <Stack key='root'>
                <Scene key="splash" component={Splash} hideNavBar={true} />
                <Scene key="home" component={Home} hideNavBar={true}  initial/>
                <Scene key="carrers" component={Carrers} hideNavBar={true} />
            </Stack>
        </Router>
    );
};


export default RouterComponent;
