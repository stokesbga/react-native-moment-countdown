'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactNative = require('react-native');

var _formatDate3 = require('./format-date');

var _formatDate4 = _interopRequireDefault(_formatDate3);

var _reactNativeSmartTimerEnhance = require('react-native-smart-timer-enhance');

var _reactNativeSmartTimerEnhance2 = _interopRequireDefault(_reactNativeSmartTimerEnhance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactMomentCountDown = function (_Component) {
  _inherits(ReactMomentCountDown, _Component);

  function ReactMomentCountDown(props) {
    _classCallCheck(this, ReactMomentCountDown);

    var _this = _possibleConstructorReturn(this, (ReactMomentCountDown.__proto__ || Object.getPrototypeOf(ReactMomentCountDown)).call(this, props));

    _this.state = {
      countdown: null
    };
    return _this;
  }

  _createClass(ReactMomentCountDown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.tick();

      this.timer = this.setInterval(this.tick.bind(this), 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearInterval(this.timer);
    }
  }, {
    key: 'tick',
    value: function tick() {
      var _props = this.props,
          toDate = _props.toDate,
          sourceFormatMask = _props.sourceFormatMask,
          targetFormatMask = _props.targetFormatMask,
          onCountdownEnd = _props.onCountdownEnd,
          onTick = _props.onTick;

      var _formatDate = (0, _formatDate4.default)(toDate, targetFormatMask, sourceFormatMask),
          _formatDate2 = _slicedToArray(_formatDate, 2),
          delta = _formatDate2[0],
          countdown = _formatDate2[1];

      if (delta <= 0) {
        this.clearInterval(this.timer);

        if (onCountdownEnd) {
          onCountdownEnd();
        }
      }

      this.setState({
        countdown: countdown
      });

      if (onTick) {
        onTick(delta);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.Text,
        { style: this.props.timeStyle },
        this.state.countdown == "Invalid date" ? this.props.expiredLabel : this.state.countdown
      );
    }
  }]);

  return ReactMomentCountDown;
}(_react.Component);

;

ReactMomentCountDown.propTypes = {
  toDate: (0, _propTypes.oneOfType)([_reactMomentProptypes.momentObj, (0, _propTypes.instanceOf)(Date), _propTypes.string]).isRequired,
  expiredLabel: _propTypes.string,
  sourceFormatMask: _propTypes.string,
  targetFormatMask: _propTypes.string,
  onTick: _propTypes.func,
  onCountdownEnd: _propTypes.func
};

ReactMomentCountDown.defaultProps = {
  sourceFormatMask: 'YYYY-MM-DD',
  targetFormatMask: 'HH:mm:ss',
  expiredLabel: "Expired",
  onTick: null,
  onCountdownEnd: null
};

exports.default = (0, _reactNativeSmartTimerEnhance2.default)(ReactMomentCountDown);