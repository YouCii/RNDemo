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

class MovieEntity {
    constructor(id, title, original_title, alt, images, rating, year, subtype) {
        this.id = id;
        this.title = title;
        this.original_title = original_title;
        this.alt = alt;
        this.images = images;
        this.rating = rating;
        this.year = year;
        this.subtype = subtype;
    }
}

class MovieImages {
    constructor(large, medium, small) {
        this.large = large;
        this.medium = medium;
        this.small = small;
    }
}

class MovieRating {
    constructor(average, max, min, stars) {
        this.average = average;
        this.max = max;
        this.min = min;
        this.stars = stars;
    }
}