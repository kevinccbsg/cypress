const $ = require('jquery')
const _ = require('lodash')

// wrap the object in jquery
const wrap = (obj) => {
  return $(obj)
}

const query = (selector, context) => {
  return new $.fn.init(selector, context)
}

// pull out the raw elements if this is wrapped
const unwrap = function (obj) {
  if (isJquery(obj)) {
    // return an array of elements
    return obj.toArray()
  }

  return obj
}

const isJquery = (obj) => {
  let hasJqueryProperty = false

  try {
    // chai will throw if trying to access jquery on an assertion
    hasJqueryProperty = obj && ('jquery' in obj || obj.jquery)
  } catch (e) {} // eslint-disable-line no-empty

  // does it have the jquery property and does this
  // instance have a constructor with a jquery property
  // on its prototype?
  return hasJqueryProperty && !!_.get(obj, 'constructor.prototype.jquery')
}

// doing a little jiggle wiggle here
// to avoid circular dependencies
module.exports = {
  wrap,

  query,

  unwrap,

  isJquery,
}
