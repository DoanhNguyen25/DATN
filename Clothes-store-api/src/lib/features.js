// Constructors and object instances
function APIfeatures(query, queryString) {
  this.query = query; // Products.find()
  this.queryString = queryString; // req.query

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
    const queryObj = { ...this.queryString };
    console.log({ queryObj });
    const excludedFields = ["page", "sort", "size", "keySearch"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    console.log(queryObj);
    return this;
  };
}

module.exports = { APIfeatures };
