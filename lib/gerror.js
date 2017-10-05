'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GError = function (_GraphQLError) {
  _inherits(GError, _GraphQLError);

  function GError(error) {
    _classCallCheck(this, GError);

    var _this = _possibleConstructorReturn(this, (GError.__proto__ || Object.getPrototypeOf(GError)).call(this, error));

    _this.code = 'BAD_REQUEST';
    return _this;
  }

  return GError;
}(_graphql.GraphQLError);

exports.default = GError;