import BaseScreen from "../base/BaseScreen";
import React from 'react'
import {Text, TouchableWithoutFeedback, View, DeviceEventEmitter} from 'react-native'
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import SettingItem from "../component/SettingItem";
import Colors from "../../res/style/colors";
import EmitterEvents from "../utils/EmitterEvents";

export default class SettingScreen extends BaseScreen {

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar('设置')}

            <SettingItem
                style={{marginTop: 20}}
                text={'登录设置'}
                showBottomDivider={false}
                onPress={() => this.props.navigation.navigate('SettingLogin')}/>
            <SettingItem
                style={{marginTop: 10}}
                text={'其他设置'}/>

            <View style={{flex: 1}}/>

            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.navigation.navigate('Login');
                    DeviceEventEmitter.emit(EmitterEvents.BACK_TO_LOGIN);
                }}>
                <View style={[PublicStyles.settingItemStyle, {
                    paddingRight: 16,
                    marginBottom: 40,
                    justifyContent: 'center'
                }]}>
                    <Text style={{
                        fontSize: 16,
                        color: Colors.black,
                    }}> 退出登录</Text>
                </View>
            </TouchableWithoutFeedback>

        </View>
    }

}