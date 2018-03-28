'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const crypto = require('crypto');
const axios = require('axios');
// const unescape = require('lodash.unescape');

exports.sourceNodes = (() => {
  var _ref = _asyncToGenerator(function* ({ boundActionCreators: { createNode } }, {
    subdomain,
    apiKey,
    queryParams = {
      filter: 'published',
      sinceTime: 0,
      sort: 'desc',
      pageSize: 50,
      pageNumber: 1
    }
  }) {
    const filter = queryParams.filter,
          sinceTime = queryParams.sinceTime,
          sort = queryParams.sort,
          pageSize = queryParams.pageSize,
          pageNumber = queryParams.pageNumber;

    const axiosClient = axios.create({
      baseURL: `https://${subdomain}.asknice.ly/api/v1/responses/`
    });

    // Get list of all testimonials

    var _ref2 = yield axiosClient.get(`/${sort}/${pageSize}/${pageNumber}/${sinceTime}/json/${filter}`, { params: { 'X-apikey': apiKey } });

    const data = _ref2.data.data;

    // Create nodes for testimonials

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const testimonial = _step.value;

        const jsonString = JSON.stringify(testimonial);
        const gatsbyNode = _extends({}, testimonial, {
          id: testimonial.response_id,
          comment: unescape(testimonial.comment),
          children: [],
          parent: '__SOURCE__',
          internal: {
            type: 'AskNicelyTestimonial',
            content: jsonString,
            contentDigest: crypto.createHash('md5').update(jsonString).digest('hex')
          }
        });
        // Insert data into gatsby
        createNode(gatsbyNode);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();