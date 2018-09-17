export default class ImageBean {
    constructor(imgPath) {
        // 图片路径
        this.imgPath = imgPath;
        // 用于记录是否需要删除
        this.toDelete = false;
    }
}