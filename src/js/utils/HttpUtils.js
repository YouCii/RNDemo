import JsonUtils from "./JsonUtils";
import EncodeUtils from "./EncodeUtils";

export default class HttpUtils {

    /**
     * 开启GET请求
     * @param url       请求地址
     * @param params    GET请求参数,Map
     * @return promise对象
     */
    static startGetRequest(url: String, params: Map) {
        if (params != null && params.size !== 0) {
            url += "?";
            params.forEach((value, key) => {
                url += (key + "=" + value + "&");
            });
            url = url.substr(0, url.length - 1)
        }
        return fetch(url, {
            method: "Get",
            credentials: "include"
        })
            .then((response: Response) => checkStatus(response))
            .then((response: Response) => {
                return response.text()
            })
            .then((responseText: String) => {
                return JsonUtils.stringToJson(responseText);
            })
    }

    /**
     * 开启POST请求(测试没有问题)
     * @param url       请求地址
     * @param params    POST请求参数,Map
     * @return promise对象
     */
    static startPostRequest = (url: String, params: Map) => {
        let formData = new FormData();
        if (params != null && params.size !== 0) {
            params.forEach((value, key) => {
                formData.append(key, value);
            })
        }
        return fetch(url, {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((response: Response) => checkStatus(response))
            .then((response: Response) => {
                return response.text()
            })
            .then((responseText: String) => {
                // 根据回调是否被Base64加密进行判断
                if (responseText.indexOf("\"data\"") === -1 && responseText.indexOf("\"message\"") === -1 && responseText.indexOf("\"msg\"") === -1) {
                    responseText = EncodeUtils.decodeBase64Content(responseText);
                }
                return JsonUtils.stringToJson(responseText);
            })
    }

}

/**
 * 解决fetch不提示某些错误的问题
 */
function checkStatus(response) {
    if (response.ok || (response.status >= 200 && response.status < 300)) {
        return response;
    }
    const error = new Error(response.statusText);
    error.message = response;
    throw error;
}