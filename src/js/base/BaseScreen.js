import {Component} from 'react'
import {BackHandler} from 'react-native'
import Orientation from 'react-native-orientation'
import ToastUtils from "../utils/ToastUtils";

export default class BaseScreen extends Component {

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentDidMount() {
        // 固定竖屏
        Orientation.lockToPortrait();

        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => {
        if (this.props.disableBack) {
            // 2秒内再按一次
            if (lastBackPressed !== 0 && lastBackPressed + 2000 >= Date.now()) {
                BackHandler.exitApp();
            }
            lastBackPressed = Date.now();
            ToastUtils.showShortToast("再点一次退出应用");
            return true;
        } else {
            return false;
        }
    };
}

/**
 * 用于暂存上一次点击Back的时间戳
 */
let lastBackPressed = 0;

BaseScreen.defaultProps = {
    /**
     * 如果是true, 则开启双击退出应用功能, 可以在子界面中重写此参数
     */
    disableBack: false
};