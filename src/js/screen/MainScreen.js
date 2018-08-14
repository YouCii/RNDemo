import {createBottomTabNavigator} from "react-navigation";
import ListScreen from "./ListScreen";
import React from "react";
import Colors from "../../res/style/colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import NetScreen from "./NetScreen";
import PhotoScreen from "./PhotoScreen";
import MyScreen from "./MyScreen";

export default createBottomTabNavigator({
        Net: {
            screen: NetScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'forms',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name={'wpforms'}
                        size={30}
                        color={tintColor}
                    />
                ),
                tabBarOnPress: () => {
                    route(navigation)
                }
            }),
        },
        Photo: {
            screen: PhotoScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'face',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons
                        name={'face'}
                        size={30}
                        color={tintColor}
                    />
                ),
                tabBarOnPress: () => {
                    route(navigation)
                }
            }),
        },
        List1: {
            screen: ListScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'list',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons
                        name={'format-list-bulleted'}
                        size={30}
                        color={tintColor}
                    />
                ),
                tabBarOnPress: () => {
                    route(navigation)
                }
            }),
        },
        My: {
            screen: MyScreen,
            navigationOptions: {
                tabBarLabel: 'setting',
                tabBarIcon: ({tintColor}) => (
                    <Feather
                        name={'settings'}
                        size={30}
                        color={tintColor}
                    />
                ),
            }
        },
    }, {
        initialRouteName: 'Net', // 设置默认的页面组件
        initialRouteParams: {title: 'Net'}, // 找这条命令不容易, 翻github翻了一个小时

        lazy: true, // 在app打开的时候将底部标签栏全部加载，默认false, 推荐改成true
        backBehavior: null, // 点击返回退到上级界面

        tabBarOptions: {
            activeTintColor: Colors.active, // 选中的颜色
            inactiveTintColor: Colors.inactive, // 未选中的颜色

            showLabel: true,
            showIcon: true,
            style: {
                backgroundColor: Colors.tabBar,
                height: 54,
            },
            tabStyle: {
                height: 54,
            },
            labelStyle: {
                fontSize: 12,
            },
        }
    },
);

/**
 * Tab点击跳转调用的公共方法
 */
const route = (navigation) => {
    if (!navigation.isFocused()) {
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        })
    }
};