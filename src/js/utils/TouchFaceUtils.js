import TouchID from "react-native-touch-id";
import Constants from "./Constants";
import Colors from "../../res/style/colors";
import ToastUtils from "./ToastUtils";

/**
 * 验证TouchID/FaceID
 */
export default class TouchFaceUtils {

    static authenticate = (callBack: Function) => {
        let type;
        TouchID.isSupported()
            .then(biometryType => {
                type = biometryType === 'FaceID' ? "面容" : "指纹";
                const optionalConfigObject = {
                    title: "\"" + Constants.appName + "\" 的" + type + "ID", // Android
                    color: Colors.active, // Android,
                    fallbackLabel: "" // iOS (if empty, then label is hidden)
                };
                return TouchID.authenticate('通过验证手机' + type + '进行登录', optionalConfigObject)
            })
            .then(() =>
                callBack()  // 不能简写为then(callBack()). 否则不会等待Touch验证, 而是直接调用callBack
            )
            .catch((error) => {
                switch (error.message) {
                    case "LAErrorAuthenticationFailed":
                        ToastUtils.showShortToast(type + "不匹配");
                        break;
                    case "LAErrorUserFallback":
                        ToastUtils.showShortToast("您输入了密码");
                        break;
                    case "LAErrorPasscodeNotSet":
                        ToastUtils.showShortToast(type + "不可用, 因为您还没有设置密码");
                        break;
                    case "LAErrorTouchIDNotAvailable":
                        ToastUtils.showShortToast(type + "不可用");
                        break;
                    case "LAErrorTouchIDNotEnrolled":
                        ToastUtils.showShortToast("没有识别到" + type);
                        break;
                    case "RCTTouchIDNotSupported":
                        ToastUtils.showShortToast("设备不支持" + type + "识别");
                        break;
                    case "LAErrorUserCancel":
                    case "LAErrorSystemCancel":
                        ToastUtils.showShortToast("已取消");
                        break;
                    case "RCTTouchIDUnknownError":
                    case "Touch ID Error":
                        ToastUtils.showShortToast(error.details);
                        break;
                    default:
                        ToastUtils.showShortToast(error.message);
                        break;
                }
            });
    }

}