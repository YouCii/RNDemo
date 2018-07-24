import React from "react";

import {createStackNavigator} from 'react-navigation';
import {YellowBox} from 'react-native';
import MainScreen from './src/js/screen/MainScreen';
import ListScreen from './src/js/screen/ListScreen';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default createStackNavigator(
    {
        Home: MainScreen,
        List: ListScreen,
    },
    {
        initialRouteName: 'Home',
    }
)
