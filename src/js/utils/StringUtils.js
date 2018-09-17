export default class StringUtils {

    /**
     * 检测是否含有中文
     * @return true if has
     */
    static hasChinaChar = (str) => {
        return /.*[\u4e00-\u9fa5]+.*/.test(str);
    }

}