// sort product
export const sortBy = (attr, order) => {
  order == undefined
    ? (order = 1)
    : order === "asc"
    ? (order = 1)
    : (order = -1);
  return (object1, object2) => {
    var value1 = object1[attr];
    var value2 = object2[attr];
    if (value1 < value2) {
      return order * -1;
    } else if (value1 > value2) {
      return order * 1;
    } else {
      return 0;
    }
  };
};

// divide products to diffent page
export const paginate = (dataSource, pageSize) => {
  let totalPageSection = [];
  let pageNumber = Math.ceil(dataSource.length / pageSize) || 1;
  for (let i = 0; i < pageNumber; i++) {
    totalPageSection[i] = dataSource.slice(pageSize * i, pageSize * (i + 1));
  }
  return totalPageSection;
};

// error reminder
export const errorHandle = (result) => {
  if (result.unifiedErrorCode) {
    alert(result.errorMessage);
    return true;
  }
};
