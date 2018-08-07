import React from "react";
import BaseScreen from "../base/BaseScreen";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import {
    View,
    Button,
    Easing,
    Animated,
    Vibration,
    StyleSheet,
    ImageBackground,
    InteractionManager,
} from 'react-native'
import {RNCamera} from 'react-native-camera'
import AlertUtils from "../utils/AlertUtils";
import Sound from 'react-native-sound';
import ToastUtils from "../utils/ToastUtils";
import Constants from "../utils/Constants";


export default class CameraScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            created: false,
            anim: new Animated.Value(0),
        }
    }

    componentDidMount() {
        super.componentDidMount();
        // 延迟处理
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                created: true,
            });
            if (this.props.navigation.getParam("type", PAGE_TYPE.PHOTO) === PAGE_TYPE.CODE) {
                this._startAnimation()
            }
        });
    }

    componentWillUnmount() {
        this.state.created = false;
    }

    _startAnimation() {
        if (!this.state.created) return;

        this.state.anim.setValue(0);
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => this._startAnimation());
    }

    _getQRCodeView() {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{
                flex: 1,
                width: Constants.width,
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}/>
            <View
                style={{width: Constants.width, flexDirection: 'row'}}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}/>
                <ImageBackground
                    style={styles.rectangle}
                    source={require('../../res/img/qc_scan.png')}>
                    <Animated.View style={[styles.animateStyle, {
                        transform: [{
                            translateY: this.state.anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 200]
                            })
                        }]
                    }]}>
                    </Animated.View>
                </ImageBackground>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}/>
            </View>
            <View style={{
                flex: 1,
                width: Constants.width,
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}/>
        </View>
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

                                    if (data.type !== RNCamera.Constants.BarCodeType.qr) {
                                        ToastUtils.showShortToast("只支持二维码");
                                        return;
                                    }

                                    // 页面回传 扫描字符
                                    this.props.navigation.state.params.callback(data.data);
                                    this.props.navigation.goBack();
                                });
                            }
                        }}>
                        {pageType !== PAGE_TYPE.CODE ? null : this._getQRCodeView()}
                    </RNCamera>
                }
            </View>

            {pageType !== PAGE_TYPE.PHOTO ? null :
                <Button
                    title={'点击拍照'}
                    onPress={() => {
                        if (this.refs.camera) {
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
                        }
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

const styles = StyleSheet.create({
    animateStyle: {
        height: 2,
        backgroundColor: '#00FF00'
    },
    rectangle: {
        height: 200,
        width: 200,
    }
});