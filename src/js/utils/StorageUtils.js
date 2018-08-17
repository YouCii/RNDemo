import {AsyncStorage} from "react-native";
import UserInfo from "../model/UserInfo";
import JsonUtils from "./JsonUtils";
import EncodeUtils from "./EncodeUtils";

export default class StorageUtils {

    static getTouchConfig(): Promise<String> {
        return AsyncStorage.getItem(TOUCH_CONFIG)
    }

    static setTouchConfig(isChecked: Boolean): Promise<> {
        return AsyncStorage.setItem(TOUCH_CONFIG, isChecked.toString())
    }

    static getLoginUserInfo(): Promise<UserInfo> {
        return AsyncStorage.getItem(USER_INFO)
            .then((result) => JsonUtils.stringToJson(EncodeUtils.decodeBase64Content(result)))
    }

    static setLoginUserInfo(userInfo: UserInfo) {
        AsyncStorage.setItem(USER_INFO, EncodeUtils.encodeBase64Content(JsonUtils.jsonToString(userInfo)))
            .catch((error) => {
            })
    }

}

const TOUCH_CONFIG = 'TOUCH_CONFIG';
const USER_INFO = 'USER_INFO';