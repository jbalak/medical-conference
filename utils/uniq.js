const _ = require('lodash')
module.exports = (conf) => _.uniqBy(conf, _.isEqual)
