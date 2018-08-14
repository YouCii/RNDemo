import BaseScreen from "../base/BaseScreen";
import React from "react"
import {View} from "react-native"
import PublicComponent from "../component/PublicComponent";
import UserInfoCard from "../component/UserInfoCard";

export default class MyScreen extends BaseScreen {

    render() {
        return <View>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar("我")}
            <UserInfoCard
                name={"特朗普"}
                post={"后勤"}
                department={"阿里巴巴"}
            />
        </View>;
    }

}