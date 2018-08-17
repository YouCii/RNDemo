import React from 'react'
import BaseScreen from "../base/BaseScreen";
import {View} from 'react-native'
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import SettingItem from "../component/SettingItem";
import ToastUtils from "../utils/ToastUtils";
import TouchFaceUtils from "../utils/TouchFaceUtils";
import StorageUtils from "../utils/StorageUtils";

export default class SettingLoginScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            touchState: false,
        }
    }

    componentWillMount() {
        this._initTouchState();
    }

    _initTouchState() {
        StorageUtils.getTouchConfig()
            .then((result) =>
                this.setState({touchState: result === "true"})
            )
            .catch((error) => ToastUtils.showShortToast("获取设置状态失败:" + error))
    }

    _saveSetting(isChecked: Boolean) {
        StorageUtils.setTouchConfig(isChecked)
            .then(() => {
                if (isChecked) {
                    ToastUtils.showShortToast("设置成功")
                }
            })
            .catch((error) => {
                ToastUtils.showShortToast("设置失败:" + error)
                this.setState({touchState: !isChecked})
            })
    }

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar("登录设置")}
            <SettingItem
                style={{marginTop: 20}}
                text={'使用指纹/面容登录'}
                isChecked={this.state.touchState}
                onCheckChange={(isChecked: Boolean) => {
                    if (isChecked) {
                        TouchFaceUtils.authenticate(() =>
                            this._saveSetting(isChecked)
                        );
                    } else {
                        this._saveSetting(isChecked)
                    }
                }}
            />
        </View>
    }
}