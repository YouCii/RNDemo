import {createBottomTabNavigator} from "react-navigation";
import ListScreen from "./ListScreen";
import React from "react";
import Colors from "../../res/style/colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export default createBottomTabNavigator({
        List: {
            screen: ListScreen,
            navigationOptions: {
                tabBarLabel: 'forms',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name={'wpforms'}
                        size={30}
                        color={tintColor}
                    />
                ),
            }
        },
        List2: {
            screen: ListScreen,
            navigationOptions: {
                tabBarLabel: 'face',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons
                        name={'face'}
                        size={30}
                        color={tintColor}
                    />
                ),
            },
        },
        List3: {
            screen: ListScreen,
            navigationOptions: {
                tabBarLabel: 'list',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons
                        name={'format-list-bulleted'}
                        size={30}
                        color={tintColor}
                    />
                ),
            },
        },
        List4: {
            screen: ListScreen,
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
        initialRouteName: 'List', // 设置默认的页面组件
        tabBarPosition: 'bottom', // 设置tabBar的位置，iOS默认在底部，安卓默认在顶部
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