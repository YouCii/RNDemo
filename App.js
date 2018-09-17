import React from "react";
import {createStackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";
import LoginScreen from './src/js/screen/LoginScreen';
import MainScreen from './src/js/screen/MainScreen';
import CameraScreen from "./src/js/screen/CameraScreen";
import SettingScreen from "./src/js/screen/SettingScreen";
import SettingLoginScreen from "./src/js/screen/SettingLoginScreen";

import {YellowBox} from 'react-native';
import TabViewScreen from "./src/js/screen/TabViewScreen";
import PhotoUpScreen from "./src/js/screen/PhotoUpScreen";
import GalleryScreen from "./src/js/screen/GalleryScreen";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Main: {
            screen: MainScreen,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Camera: CameraScreen,
        Setting: SettingScreen,
        SettingLogin: SettingLoginScreen,
        Tab: {
            screen: TabViewScreen,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        PhotoUp: PhotoUpScreen,
        Gallery: GalleryScreen,
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            header: null,
            animationEnabled: true,
            gesturesEnabled: true,
        },
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal, // 统一安卓和苹果页面跳转的动画
        }),
    }
)
