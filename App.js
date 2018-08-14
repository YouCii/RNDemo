import React from "react";

import {createStackNavigator} from 'react-navigation';
import {YellowBox} from 'react-native';
import LoginScreen from './src/js/screen/LoginScreen';
import MainScreen from './src/js/screen/MainScreen';
import CardStackStyleInterpolator
    from "react-navigation/src/views/StackView/StackViewStyleInterpolator";
import CameraScreen from "./src/js/screen/CameraScreen";
import SettingScreen from "./src/js/screen/SettingScreen";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default createStackNavigator(
    {
        Login: LoginScreen,
        Main: MainScreen,
        Camera: CameraScreen,
        Setting: {
            screen: SettingScreen,
            navigationOptions: {
                gesturesEnabled: true,
            }
        },
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            animationEnabled: true,
            gesturesEnabled: false,
            header: null
        },
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal, // 统一安卓和苹果页面跳转的动画
        }),
    }
)
