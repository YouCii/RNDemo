import React from "react";
import BaseScreen from "../base/BaseScreen";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import {
    View,
    Button,
    Vibration,
    InteractionManager,
} from 'react-native'
import {RNCamera} from 'react-native-camera'
import AlertUtils from "../utils/AlertUtils";
import Sound from 'react-native-sound';
import ToastUtils from "../utils/ToastUtils";

export default class CameraScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            created: false
        }
    }

    componentDidMount() {
        super.componentDidMount();

        // 延迟处理
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                created: true
            });
        });
    }

    render() {

        const pageType = this.props.navigation.getParam("type", PAGE_TYPE.PHOTO);
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar('Camera')}

            <View style={{flex: 1}}>
                {!this.state.created ? null :
                    <RNCamera
                        ref='camera'
                        style={{flex: 1}}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        onBarCodeRead={(data) => {
                            if (pageType === PAGE_TYPE.CODE) {
                                const sound = new Sound('ding.wav', Sound.MAIN_BUNDLE, (error) => {
                                    if (error !== null) {
                                        return;
                                    }

                                    // 震动/提示音
                                    sound.play(() =>
                                        sound.release()
                                    );
                                    Vibration.vibrate();

                                    if(data.type !== RNCamera.Constants.BarCodeType.qr){
                                        ToastUtils.showShortToast("只支持二维码");
                                        return;
                                    }

                                    // 页面回传 扫描字符
                                    this.props.navigation.state.params.callback(data.data);
                                    this.props.navigation.goBack();
                                });
                            }
                        }}
                    />
                }
            </View>

            {pageType !== PAGE_TYPE.PHOTO ? null :
                <Button
                    title={'点击拍照'}
                    onPress={() => {
                        const options = {quality: 0.5, base64: false, fixOrientation: true};
                        this.refs.camera.takePictureAsync(options)
                            .then((data: TakePictureResponse) => {
                                // 页面回传 扫描字符
                                this.props.navigation.state.params.callback(data.uri);
                                this.props.navigation.goBack();
                            })
                            .catch((error: Error) => {
                                AlertUtils.showSimpleAlert(error.toString())
                            })
                    }}
                />
            }

        </View>
    }
}

/**
 * 类似Enum的实现
 */
export const PAGE_TYPE = {PHOTO: 'PHOTO', CODE: 'CODE'};