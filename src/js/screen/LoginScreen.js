import BaseScreen from "../base/BaseScreen";
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    TextInput,
    StyleSheet,
    Animated,
    Easing
} from 'react-native'
import PublicComponent from "../component/PublicComponent";
import PublicStyles from "../../res/style/styles";
import Colors from "../../res/style/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ToastUtils from "../utils/ToastUtils";
import TouchID from 'react-native-touch-id'

export default class LoginScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            user: "111",
            password: "",

            userFocus: false,
            passFocus: false,
            inputComplete: false, // 用于判断用户名/密码是否都输入了

            anim: new Animated.Value(1)
        }
    }

    /**
     * 处理登陆按钮的背景色渐变动画
     * @private
     */
    _handleLoginButtonColor() {
        if (this.state.user === "" || this.state.password === "") {
            if (this.state.inputComplete) {
                this.state.inputComplete = false;
                this._startAnimatedToGray();
            }
        } else {
            if (!this.state.inputComplete) {
                this.state.inputComplete = true;
                this._startAnimatedToBlue()
            }
        }
    }

    _startAnimatedToBlue() {
        this.state.anim.setValue(1);
        Animated.timing(this.state.anim, {
            toValue: 0.6,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    _startAnimatedToGray() {
        this.state.anim.setValue(0.6);
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar(false)}
            {PublicComponent.initTitleBar("登录")}

            <View style={[styles.inputView, {marginTop: 14}]}>
                <Ionicons
                    style={styles.fieldImage}
                    name='md-person'
                    size={25}
                    color={this.state.userFocus || this.state.user !== "" ? Colors.darkBlue : Colors.blueGray}
                />
                <TextInput
                    ref={'tiUser'}
                    style={styles.fieldTextInput}
                    placeholder={'帐号'}
                    defaultValue={this.state.user}
                    underlineColorAndroid={Colors.transparent}
                    autoFocus={false}
                    onChangeText={(text) => {
                        this.state.user = text;
                        this._handleLoginButtonColor()
                    }}
                    onFocus={() => {
                        if (!this.state.userFocus) {
                            this.setState({userFocus: true})
                        }
                    }
                    }
                    onBlur={() => {
                        if (this.state.userFocus && this.props.user === "") {
                            this.setState({userFocus: false})
                        }
                    }
                    }/>
            </View>
            <View style={styles.inputView}>
                <Ionicons
                    style={[styles.fieldImage, {paddingLeft: 1, paddingRight: 1}]}
                    name='md-lock'
                    size={25}
                    color={this.state.passFocus || this.state.password !== "" ? Colors.darkBlue : Colors.blueGray}
                />
                <TextInput
                    ref={'tiPass'}
                    style={styles.fieldTextInput}
                    placeholder={'密码'}
                    defaultValue={this.state.password}
                    underlineColorAndroid={Colors.transparent}
                    autoFocus={false}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.state.password = text;
                        this._handleLoginButtonColor();
                    }}
                    onFocus={() => {
                        if (!this.state.passFocus) {
                            this.setState({passFocus: true})
                        }
                    }
                    }
                    onBlur={() => {
                        if (this.state.passFocus && this.state.password === "") {
                            this.setState({passFocus: false})
                        }
                    }
                    }/>
            </View>
            <TouchableNativeFeedback
                onPress={() => {
                    this.refs.tiUser.blur();
                    this.refs.tiPass.blur();
                    if (this.state.user === this.state.password) {
                        this.props.navigation.navigate('Main');
                    } else {
                        ToastUtils.showShortToast("登陆失败")
                    }
                }}>
                <Animated.View style={[styles.loginButton, {
                    opacity: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.6]
                    })
                }]}>
                    <Text style={styles.loginText}>登录</Text>
                </Animated.View>
            </TouchableNativeFeedback>
            <TouchableOpacity
                onPress={() => {
                    this.refs.tiUser.blur();
                    this.refs.tiPass.blur();
                    if (TouchID.isSupported()) {
                        const optionalConfigObject = {
                            title: "请按指纹", // Android
                            color: Colors.blue, // Android,
                            fallbackLabel: "" // iOS (if empty, then label is hidden)
                        };
                        TouchID.authenticate(null, optionalConfigObject)
                            .then(() => {
                                ToastUtils.showShortToast("登陆成功")
                            })
                            .catch(error => {
                                switch (error.toString()) {
                                    case "LAErrorAuthenticationFailed":
                                        ToastUtils.showShortToast("指纹不匹配");
                                        break;
                                    case "LAErrorUserFallback":
                                        ToastUtils.showShortToast("tapped the fallback button (Enter Password)");
                                        break;
                                    case "LAErrorPasscodeNotSet":
                                        ToastUtils.showShortToast("指纹不可用, 因为您还没有设置密码");
                                        break;
                                    case "LAErrorTouchIDNotAvailable":
                                        ToastUtils.showShortToast("指纹不可用");
                                        break;
                                    case "LAErrorTouchIDNotEnrolled":
                                        ToastUtils.showShortToast("没有识别到指纹");
                                        break;
                                    case "RCTTouchIDNotSupported":
                                        ToastUtils.showShortToast("设备不支持指纹功能");
                                        break;
                                    case "LAErrorUserCancel":
                                    case "LAErrorSystemCancel":
                                        ToastUtils.showShortToast("已取消");
                                        break;
                                    case "RCTTouchIDUnknownError":
                                    default:
                                        ToastUtils.showShortToast("指纹识别失败");
                                        break;
                                }
                            });
                    } else {
                        ToastUtils.showShortToast("设备不支持指纹功能")
                    }
                }}>
                <Text style={styles.lockText}>指纹解锁</Text>
            </TouchableOpacity>

        </View>
    }
}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        borderColor: Colors.darkGray,
        borderWidth: 1,
        borderRadius: 5,
        margin: 7,
    },
    loginButton: {
        height: 45,
        justifyContent: 'center',
        borderWidth: 1,
        margin: 7,
        borderRadius: 5,
        backgroundColor: Colors.blue,
        borderColor: '#3079C5',
    },
    loginText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.white,
        fontSize: 16,
    },

    fieldImage: {
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    fieldTextInput: {
        flex: 1,
        height: 45,
        fontSize: 16,
    },

    lockText: {
        margin: 7,
        color: Colors.darkBlue
    },
});