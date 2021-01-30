export const sortBy = (attr, order) => {
  console.log("order", order);
  order == undefined
    ? (order = 1)
    : order === "asc"
    ? (order = 1)
    : (order = -1);
  console.log(order);
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

export const paginate = (dataSource, pageSize) => {
  let totalPageSection = [];
  let pageNumber = Math.ceil(dataSource.length / pageSize) || 1;
  for (let i = 0; i < pageNumber; i++) {
    totalPageSection[i] = dataSource.slice(pageSize * i, pageSize * (i + 1));
  }
  return totalPageSection;
};
