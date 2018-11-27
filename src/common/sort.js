const getSort = (option) => {
  const options = option.split(',')
  let sort = {}
  options.map(item => {
    let field = item.startsWith('-') || item.startsWith('+') ? item.substring(1) : item
    sort[field] = item.startsWith('-') ? 'desc' : 'asc'
  })
  return sort
}

module.exports = getSort
