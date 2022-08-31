class Apifeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const querycopy = { ...this.querystr };

    // removing some fields for category

    const removefilds = ["keyword", "page", "limit"];
    removefilds.forEach((key) => delete querycopy[key]);

    // filter for price and rating
    let quertystr = JSON.stringify(querycopy);
    quertystr = quertystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(quertystr));
    return this;
  }

  // pagination 

  pagination(resultperpage){
    const currentpage=Number(this.querystr.page )|| 1;
    let skip=resultperpage*(currentpage-1);

    this.query=this.query.limit(resultperpage).skip(skip);  // monngo db query  for limit and skip
    return this;
  }
}

module.exports = Apifeatures;
