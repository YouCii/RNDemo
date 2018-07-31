import {Buffer} from "buffer"

export default class EncodeUtils {

    /**
     * 加密
     */
    static encodeBase64Content(content) {
        return new Buffer(content).toString('base64')
    }

    /**
     * 解密
     */
    static decodeBase64Content(base64Content) {
        return new Buffer(base64Content, 'base64').toString();
    }

}