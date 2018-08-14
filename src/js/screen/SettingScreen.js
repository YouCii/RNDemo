import BaseScreen from "../base/BaseScreen";
import React from 'react'
import {View} from 'react-native'
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import SettingItem from "../component/SettingItem";

export default class SettingScreen extends BaseScreen {

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar('设置')}

            <SettingItem
                text={'登录设置'}
                showBottomDivider={false}
            />
            <SettingItem
                text={'其他设置'}
            />

        </View>
    }

}