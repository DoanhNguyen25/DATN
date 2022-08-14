// Constructors and object instances
function APIfeatures(query, queryString, params) {
  this.query = query; // Products.find()
  this.queryString = queryString; // req.query
  this.params = params;
  this.paginating = () => {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.size * 1 || 2;
    const skip = limit * (page - 1);
    this.query = this.query.limit(limit).skip(skip);
    return this;
  };
  this.sorting = () => {
    const sortBy = this.queryString.sort || "-createdAt";
    this.query = this.query
      .sort(sortBy)
      .populate({ path: "categories", select: "category_name" });
    return this;
  };

  this.searching = () => {
    const search = this.queryString.keySearch;
    if (search) {
      this.query = this.query.find({
        $text: {
          $search: search,
        },
      });
    } else {
      this.query = this.query.find();
    }
    return this;
  };

  this.filtering = () => {
    const queryObj = this.queryString;

    if (queryObj.color) {
      this.query = this.query.find({
        $or: [{ color: { $regex: queryObj.color } }],
      });
    } else {
      this.query = this.query.find();
    }
    console.log(queryObj);
    return this;
  };
}

module.exports = { APIfeatures };
