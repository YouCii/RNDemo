import BaseScreen from "../base/BaseScreen";
import React from "react"
import {View} from "react-native"
import PublicComponent from "../component/PublicComponent";
import UserInfoCard from "../component/UserInfoCard";
import SettingItem from "../component/SettingItem";
import PublicStyles from "../../res/style/styles";
import ToastUtils from "../utils/ToastUtils";

export default class MyScreen extends BaseScreen {

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar("我")}
            <UserInfoCard
                name={"特朗普"}
                post={"后勤"}
                department={"中国新闻网"}
            />

            <SettingItem
                style={{marginTop: 10}}
                text={'设置'}
                iconName={'settings-outline'}
                onPress={() => this.props.navigation.navigate('Setting')}
            />

            <SettingItem
                style={{marginTop: 10}}
                text={'关于'}
                iconName={'information-outline'}
                onPress={() => ToastUtils.showShortToast("关于")}
            />

        </View>;
    }

}