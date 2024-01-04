function buildQuery(object, type = "query") {
  const rows = Object.values(object);
  const columns = Object.keys(object);
  const objLen = columns.length;
  let queryClause = "";
  let queryArray = [];
  const _seperator = type === "filter" ? "AND " : ", ";
  const _endSep = type === "filter" ? " AND" : "";
  for (let x = 0; x < objLen; x++) {
    queryArray.push(rows[x]);
    if (x === objLen - 1) {
      queryClause = queryClause + `${columns[x]} = $${x + 1}` + _endSep;
    } else {
      queryClause = queryClause + `${columns[x]} = $${x + 1} ` + _seperator;
    }
  }
  return { queryClause, queryArray, objLen };
}

module.exports = {
  buildQuery,
};
