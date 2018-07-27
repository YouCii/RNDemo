/**
 * 获取豆瓣Top250数据的回调
 */
export default class TopMovieResponse {
    constructor(start, count, total, title, subjects) {
        this.start = start;         // start
        this.count = count;         // count
        this.total = total;         // 总数
        this.title = title;         // 排行榜名称
        this.subjects = subjects;   // 数据集合
    }
}