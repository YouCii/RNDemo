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
    Easing,
    DeviceEventEmitter,
} from 'react-native'
import PublicComponent from "../component/PublicComponent";
import PublicStyles from "../../res/style/styles";
import Colors from "../../res/style/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ToastUtils from "../utils/ToastUtils";
import TouchFaceUtils from "../utils/TouchFaceUtils";
import StorageUtils from "../utils/StorageUtils";
import UserInfo from "../model/UserInfo";
import EmitterEvents from "../utils/EmitterEvents";

export default class LoginScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            savedUser: "", // 用于暂存上次登录的用户名, 是否使能指纹登录

            userFocus: false,
            passFocus: false,
            inputComplete: false, // 用于判断用户名/密码是否都输入了

            anim: new Animated.Value(1)
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.subscription = DeviceEventEmitter.addListener(EmitterEvents.BACK_TO_LOGIN, this._initDateFromStorage);
        this._initDateFromStorage();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.subscription.remove();
    }

    _initDateFromStorage = () => {
        StorageUtils.getLoginUserInfo()
            .then((userInfo) => {
                this.setState({
                    user: userInfo.userName,
                    password: userInfo.password,
                    savedUser: userInfo.userName,

                    inputComplete: true,
                });
                this._startAnimatedToBlue()
            })
            .catch((error) => {
            })
    };

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
        this.state.anim.setValue(TRANSPARENT_DARK);
        Animated.timing(this.state.anim, {
            toValue: TRANSPARENT_LIGHT,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    _startAnimatedToGray() {
        this.state.anim.setValue(TRANSPARENT_LIGHT);
        Animated.timing(this.state.anim, {
            toValue: TRANSPARENT_DARK,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    _loginSuccess = () => {
        StorageUtils.setLoginUserInfo(new UserInfo(this.state.user, this.state.password));
        if (this.state.user !== this.state.savedUser) {
            StorageUtils.setTouchConfig(false).catch()
        }
        this.props.navigation.navigate("Main")
    };

    _onTouchFacePress() {
        this.refs.tiUser.blur();
        this.refs.tiPass.blur();

        StorageUtils.getTouchConfig()
            .then((result) => {
                if (result === "true") { // 传入的 callback 参数如果是 func(){} 样式的话, 必须要 bind(this)
                    // 如果是 () => {} 样式的话, 就不需要.
                    TouchFaceUtils.authenticate(this._loginSuccess)
                } else {
                    ToastUtils.showShortToast("请先在设置中开启此功能")
                }
            })
            .catch((error) => {
                ToastUtils.showShortToast("数据读取错误, 请稍后重试:" + error)
            })
    }

    render() {
        return <View style={[PublicStyles.screenView, {backgroundColor: Colors.white}]}>
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
                        if (this.state.userFocus && this.state.user === "") {
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
                    if (this.state.inputComplete) {
                        this.refs.tiUser.blur();
                        this.refs.tiPass.blur();
                        if (this.state.user === this.state.password) {
                            this._loginSuccess();
                        } else {
                            ToastUtils.showShortToast("登录失败")
                        }
                    }
                }}>
                <Animated.View style={[styles.loginButton, {
                    opacity: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [TRANSPARENT_DARK, TRANSPARENT_LIGHT]
                    })
                }]}>
                    <Text style={styles.loginText}>登录</Text>
                </Animated.View>
            </TouchableNativeFeedback>
            <TouchableOpacity
                onPress={() => {
                    if (this.state.user !== "" && this.state.user === this.state.savedUser) {
                        this._onTouchFacePress()
                    } else {
                        ToastUtils.showShortToast("此帐号暂未开启指纹登录")
                    }
                }}>
                <Text style={styles.lockText}>指纹/面容登录</Text>
            </TouchableOpacity>

        </View>
    }
}

const TRANSPARENT_LIGHT = 0.4, TRANSPARENT_DARK = 0.9;

/**
 * 继承自BaseScreen, 用于控制是否允许Android-Back按键的返回功能
 * @link BaseScreen.defaultProps
 */
LoginScreen.defaultProps = {
    disableBack: true
};

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        borderColor: Colors.mediumGray,
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
        marginLeft: 7,
        marginTop: 10,
        color: Colors.darkBlue
    },
});