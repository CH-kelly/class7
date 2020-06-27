(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 156:
/*!************************************************************************!*\
  !*** D:/微品匠心/qiketang/wxcomponents/mlvb-live-room/mlvbliveroomcore.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file liveroom.js 直播模式房间管理sdk
 * @author binniexu
 */
var webim = __webpack_require__(/*! ./webim_wx.js */ 157);
var webimhandler = __webpack_require__(/*! ./webim_handler.js */ 158);

var app = getApp();

//移动直播（<mlvb-live-room>）使用此地址实现房间服务和连麦功能
var RoomServiceUrl = "https://liveroom.qcloud.com/weapp/live_room/",

heart = '', // 判断心跳变量
requestSeq = 0, // 请求id
requestTask = [], // 请求task
// 用户信息
accountInfo = {
  userID: '', // 用户ID
  userName: '', // 用户昵称
  userAvatar: '', // 用户头像URL
  userSig: '', // IM登录凭证
  sdkAppID: '', // IM应用ID
  accountType: '', // 账号集成类型
  accountMode: 0, //帐号模式，0-表示独立模式，1-表示托管模式
  token: '' //登录RoomService后使用的票据
},
// 房间信息
roomInfo = {
  roomID: '', // 视频位房间ID
  roomInfo: '', // 房间名称
  mixedPlayURL: '', // 混流地址
  isCreator: false, // 是否为创建者
  pushers: [], // 当前用户信息
  isLoginIM: false, // 是否登录IM
  isJoinGroup: false, // 是否加入群
  isDestory: false, // 是否已解散
  hasJoinAnchor: false,
  roomStatusCode: 0 },

// 事件
event = {
  onAnchorEnter: function onAnchorEnter() {}, // 进房通知
  onAnchorExit: function onAnchorExit() {}, // 退房通知
  onRoomDestroy: function onRoomDestroy() {}, // 群解散通知
  onRecvRoomTextMsg: function onRecvRoomTextMsg() {}, // 消息通知
  onRequestJoinAnchor: function onRequestJoinAnchor() {}, //大主播收到小主播连麦请求通知
  onKickoutJoinAnchor: function onKickoutJoinAnchor() {}, //小主播被踢通知
  onRecvRoomCustomMsg: function onRecvRoomCustomMsg() {}, //自定义消息通知
  onSketchpadData: function onSketchpadData() {} };

// 随机昵称
var userName = ['林静晓', '陆杨', '江辰', '付小司', '陈小希', '吴柏松', '肖奈', '芦苇微微', '一笑奈何', '立夏'];
// 请求数
var requestNum = 0;
var requestJoinCallback = null;
var bigAnchorStreamID = '';
var bigAnchorWidth = 360;
var bigAnchorHeight = 640;
var gTimeoutID = null;
var mTimeDiff = 0;

/**
                    * [request 封装request请求]
                    * @param {options}
                    *   url: 请求接口url
                    *   data: 请求参数
                    *   success: 成功回调
                    *   fail: 失败回调
                    *   complete: 完成回调
                    */
function request(options) {
  requestNum++;

  accountInfo = app.globalData.accountInfo;

  requestTask[requestSeq++] = wx.request({
    url: RoomServiceUrl + options.url + (options.params ? '?' + formatParams(options.params) + '&' : '?') + 'userID=' + accountInfo.userID + (accountInfo.token ? '&token=' + accountInfo.token : ""),
    data: options.data || {},
    method: 'POST',
    header: {
      'content-type': 'application/json' // 默认值
    },
    // dataType: 'json',
    success: options.success || function () {},
    fail: options.fail || function () {},
    complete: options.complete || function () {
      requestNum--;
      // console.log('complete requestNum: ',requestNum);
    } });

}

//url encode编码
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  return arr.join("&");
}

/**
   * [login 初始化登录信息]
   * @param {options}
   *   data: {
   *    userID: 用户ID
   *    userSig: 用户sig
   *    sdkAppID: IM应用ID
   *    userName: 用户昵称
   *    userAvatar: 用户头像地址
   *   }
   *   success: 成功回调
   *   fail: 失败回调
   *
   * @return success
   *   userName: 用户昵称
   */
function login(options) {
  if (!options || !options.data.sdkAppID || !options.data.userID || !options.data.userSig) {
    console.log('init参数错误', options);
    options.fail && options.fail({
      errCode: -9,
      errMsg: 'init参数错误' });

    return;
  }
  accountInfo.userID = options.data.userID;
  accountInfo.userSig = options.data.userSig;
  accountInfo.sdkAppID = options.data.sdkAppID;
  accountInfo.userName = options.data.userName || userName[Math.floor(Math.random() * 10)] || accountInfo.userID;
  accountInfo.userAvatar = options.data.userAvatar || '123';

  app.globalData.accountInfo = accountInfo;

  request({
    url: 'login',
    params: {
      accountType: '0',
      sdkAppID: accountInfo.sdkAppID,
      userSig: accountInfo.userSig,
      platform: "WeChat" },

    data: {},
    success: function success(ret) {
      if (ret.data.code) {
        console.error("登录到RoomService后台失败:", JSON.stringify(ret));
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message });

        return;
      }
      accountInfo.token = ret.data.token;
      accountInfo.userID = ret.data.userID;

      app.globalData.accountInfo = accountInfo;


      mTimeDiff = Math.round(Date.now()) - ret.data.timestamp;
      // 登录IM
      loginIM({
        success: function success(ret) {
          options.success && options.success({
            userID: accountInfo.userID,
            userName: accountInfo.userName });

        },
        fail: function fail(ret) {
          console.error("IM登录失败:", JSON.stringify(ret));
          options.fail && options.fail({
            errCode: -999,
            errMsg: "IM登录失败" });

        } });

    },
    fail: function fail(ret) {
      console.error("登录到RoomService后台失败:", JSON.stringify(ret));
      options.fail && options.fail(ret);
    } });

}

/**
   * [logout 结束初始化信息]
   */
function logout() {
  request({
    url: "logout",
    success: function success(ret) {},
    fail: function fail(ret) {} });

  accountInfo.userID = '';
  accountInfo.userSig = '';
  accountInfo.sdkAppID = '';
  accountInfo.userName = '';
  accountInfo.userAvatar = '';
  accountInfo.token = '';
  // 退出IM登录
  webimhandler.logout();
}

/**
   * [loginIM 登录IM]
   * @param {options}
   *   data: {
   *   	roomID: 房间ID
   *   }
   *   success: 成功回调
   *   fail: 失败回调
   */
function loginIM(options) {
  // 初始化设置参数
  webimhandler.init({
    accountMode: accountInfo.accountMode,
    accountType: '0',
    sdkAppID: accountInfo.sdkAppID,
    avChatRoomId: options.roomID || 0,
    selType: webim.SESSION_TYPE.GROUP,
    selToID: options.roomID || 0,
    selSess: null //当前聊天会话
  });
  //当前用户身份
  var loginInfo = {
    'sdkAppID': accountInfo.sdkAppID, //用户所属应用id,必填
    'appIDAt3rd': accountInfo.sdkAppID, //用户所属应用id，必填
    'accountType': "0", //用户所属应用帐号类型，填0
    'identifier': accountInfo.userID, //当前用户ID,必须是否字符串类型，选填
    'identifierNick': accountInfo.userID, //当前用户昵称，选填
    'userSig': accountInfo.userSig //当前用户身份凭证，必须是字符串类型，选填
  };
  //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
  var onGroupSystemNotifys = {
    // 群被解散(全员接收)
    "5": function _(notify) {
      roomInfo.isDestory = true;

      app.globalData.roomInfo.isDestory = roomInfo.isDestory;

      event.onRoomDestroy = app.globalData.event.onRoomDestroy;
      event.onRoomDestroy();
    },
    "11": webimhandler.onRevokeGroupNotify, //群已被回收(全员接收)
    // 用户自定义通知(默认全员接收)
    "255": function _(notify) {
      // console.error('收到系统通知：', notify.UserDefinedField);
      // var content = JSON.parse(notify.UserDefinedField);
      // if (content && content.cmd == 'notifyPusherChange') {
      // 	mergeAnchors();
      // }
    } };


  //监听连接状态回调变化事件
  var onConnNotify = function onConnNotify(resp) {
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        //webim.Log.warn('连接状态正常...');
        break;
      case webim.CONNECTION_STATUS.OFF:
        webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
        break;
      default:
        webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
        break;}

  };

  //监听事件
  var listeners = {
    "onConnNotify": webimhandler.onConnNotify, //选填
    "onBigGroupMsgNotify": function onBigGroupMsgNotify(msg) {
      webimhandler.onBigGroupMsgNotify(msg, function (msgs) {
        receiveMsg(msgs);
      }, function (datas) {
        //收到白板数据
        console.log("LiveRoom callback --> 收到白板数据");

        onSketchpadData(datas);
      });
      // webimhandler.onBigGroupMsgNotify(msg, function (msgs) {
      // 	receiveMsg(msgs);
      // })
    }, //监听新消息(大群)事件，必填
    "onMsgNotify": function onMsgNotify(newMsgList) {//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
      webimhandler.onMsgNotify(newMsgList, function (msg) {
        recvC2CMsg(msg);
      });
    },
    "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
    "onGroupInfoChangeNotify": webimhandler.onGroupInfoChangeNotify
    // 'onKickedEventCall': self.onKickedEventCall // 踢人操作
  };

  //其他对象，选填
  var others = {
    'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
    'isLogOn': false //是否开启控制台打印日志,默认开启，选填
  };

  if (accountInfo.accountMode == 1) {//托管模式
    webimhandler.sdkLogin(loginInfo, listeners, others, 0, afterLoginIM, options);
  } else {//独立模式
    //sdk登录
    webimhandler.sdkLogin(loginInfo, listeners, others, 0, afterLoginIM, options);
  }
}
function afterLoginIM(options) {
  if (options.errCode) {
    // webim登录失败
    console.log('webim登录失败:', options);
    options.callback.fail && options.callback.fail({
      errCode: -2,
      errMsg: 'IM登录失败，如果你是在配置线上环境，请将IM域名[https://webim.tim.qq.com]配置到小程序request合法域名' });

    return;
  }
  // webim登录成功
  console.log('webim登录成功');
  roomInfo.isLoginIM = true;

  app.globalData.roomInfo.isLoginIM = roomInfo.isLoginIM;

  options.callback.success && options.callback.success({
    userName: accountInfo.userName });

}
function afterJoinBigGroup(options) {
  if (options.errCode && options.errCode != 10025) {
    console.log('webim进群失败: ', options);
    options.callback.fail && options.callback.fail({
      errCode: -2,
      errMsg: 'IM进群失败' });

    return;
  }
  roomInfo.isJoinGroup = true;

  app.globalData.roomInfo.isJoinGroup = roomInfo.isJoinGroup;

  console.log('进入IM房间成功: ', roomInfo.roomID);
  options.callback.success && options.callback.success({});
}

function onSketchpadData(data) {

  event.onSketchpadData = app.globalData.event.onSketchpadData;
  event.onSketchpadData(data);
}

/**
   * [receiveMsg 接收消息处理]
   * @param {options}
   *
   * @return event.onRecvRoomTextMsg
   *   roomID: 房间ID
   *   userID: 用户ID
   *   nickName: 用户昵称
   *   headPic: 用户头像
   *   textMsg: 文本消息
   *   time: 消息时间
   */
function receiveMsg(msg) {
  if (!msg.content) {return;}
  console.log('IM消息: ', JSON.stringify(msg));
  var time = new Date();
  var h = time.getHours() + '',m = time.getMinutes() + '',s = time.getSeconds() + '';
  h.length == 1 ? h = '0' + h : '';
  m.length == 1 ? m = '0' + m : '';
  s.length == 1 ? s = '0' + s : '';
  time = h + ':' + m + ':' + s;
  msg.time = time;

  if (msg.fromAccountNick == '@TIM#SYSTEM') {
    msg.fromAccountNick = '';
    msg.content = msg.content.split(';');
    msg.content = msg.content[0];


    roomInfo.roomID = app.globalData.roomInfo.roomID;


    event.onRecvRoomTextMsg = app.globalData.event.onRecvRoomTextMsg;

    event.onRecvRoomTextMsg && event.onRecvRoomTextMsg({
      roomID: roomInfo.roomID,
      userID: msg.fromAccountNick,
      userName: msg.userName,
      userAvatar: msg.userAvatar,
      message: msg.content,
      time: msg.time });

  } else {
    var contentObj, newContent;
    try {
      newContent = msg.content.split('}}');
      contentObj = JSON.parse(newContent[0] + '}}');
    } catch (e) {
      console.warn("IM消息解析异常，重新按json格式解析");
      newContent = new Array(1);
      newContent[0] = msg.content;
      contentObj = JSON.parse(msg.content);
    }
    if (contentObj.cmd == 'CustomTextMsg') {
      msg.userName = contentObj.data.nickName;
      msg.userAvatar = contentObj.data.headPic;
      var content = '';
      for (var i = 1; i < newContent.length; i++) {
        if (i == newContent.length - 1)
        content += newContent[i];else
        content += newContent[i] + '}}';
      }
      msg.content = content;


      roomInfo.roomID = app.globalData.roomInfo.roomID;

      event.onRecvRoomTextMsg = app.globalData.event.onRecvRoomTextMsg;
      event.onRecvRoomTextMsg && event.onRecvRoomTextMsg({
        roomID: roomInfo.roomID,
        userID: msg.fromAccountNick,
        userName: msg.userName,
        userAvatar: msg.userAvatar,
        message: msg.content,
        time: msg.time });

    } else if (contentObj.cmd == 'CustomCmdMsg') {
      msg.userName = contentObj.data.nickName;
      msg.userAvatar = contentObj.data.headPic;
      msg.cmd = contentObj.data.cmd;
      var content = '';
      for (var i = 1; i < newContent.length; i++) {
        if (i == newContent.length - 1)
        content += newContent[i];else
        content += newContent[i] + '}}';
      }
      msg.content = content;


      roomInfo.roomID = app.globalData.roomInfo.roomID;

      event.onRecvRoomCustomMsg = app.globalData.event.onRecvRoomCustomMsg;
      event.onRecvRoomCustomMsg && event.onRecvRoomCustomMsg({
        roomID: roomInfo.roomID,
        userID: msg.fromAccountNick,
        userName: msg.userName,
        userAvatar: msg.userAvatar,
        cmd: msg.cmd,
        message: msg.content,
        time: msg.time });

    } else if (contentObj.cmd == 'notifyPusherChange') {
      mergeAnchors();
    }
  }

};

function recvC2CMsg(msg) {
  console.log("收到C2C消息:", JSON.stringify(msg));
  var contentObj = JSON.parse(msg.content);
  if (contentObj) {

    requestJoinCallback = app.globalData.requestJoinCallback;


    if (contentObj.cmd == 'linkmic') {
      if (contentObj.data.type && contentObj.data.type == 'request') {

        event.onRequestJoinAnchor = app.globalData.event.onRequestJoinAnchor;

        event.onRequestJoinAnchor({
          userID: msg.fromAccountNick,
          userName: contentObj.data.userName,
          userAvatar: contentObj.data.userAvatar });

      } else if (contentObj.data.type && contentObj.data.type == 'response') {

        if (contentObj.data.result == 'accept') {
          requestJoinCallback && requestJoinCallback({
            errCode: 0,
            errMsg: '' });

        } else if (contentObj.data.result == 'reject') {
          requestJoinCallback && requestJoinCallback({
            errCode: -999,
            errMsg: '主播拒绝了你的请求' });

        }
      } else if (contentObj.data.type && contentObj.data.type == 'kickout') {


        event.onKickoutJoinAnchor = app.globalData.event.onKickoutJoinAnchor;

        event.onKickoutJoinAnchor && event.onKickoutJoinAnchor({
          roomID: contentObj.data.roomID });

      }
    }
  }
}

function notifyPusherChange() {
  var customMsg = {
    cmd: "notifyPusherChange",
    data: {} };

  var strCustomMsg = JSON.stringify(customMsg);
  webimhandler.sendCustomMsg({ data: strCustomMsg, text: "notify" }, null);
}

function mergeAnchors() {

  roomInfo.hasJoinAnchor = app.globalData.roomInfo.hasJoinAnchor;

  if (!roomInfo.hasJoinAnchor) {
    return;
  }

  roomInfo.roomID = app.globalData.roomInfo.roomID;

  getAnchors({
    data: {
      roomID: roomInfo.roomID },

    success: function success(ret) {
      ret = ret.data;

      innerMergerAnchors(ret);
    },
    fail: function fail(ret) {
      // event.onRoomDestroy && event.onRoomDestroy({
      // 	errCode: ret.errCode,
      // 	errMsg: ret.errMsg
      // });
    } });

};

function innerMergerAnchors(data) {
  /**
                                    * enterPushers：新进推流人员信息
                                    * leavePushers：退出推流人员信息
                                    * ishave：用于判断去重操作
                                    */
  var enterPushers = [],leavePushers = [],ishave = 0;
  console.log('去重操作');


  roomInfo.pushers = app.globalData.roomInfo.pushers;

  console.log('旧', JSON.stringify(roomInfo.pushers));
  console.log('新', JSON.stringify(data.pushers));
  console.log('用户信息:', JSON.stringify(accountInfo));
  data.pushers && data.pushers.forEach(function (val1) {
    ishave = 0;
    roomInfo.pushers && roomInfo.pushers.forEach(function (val2) {
      if (val1.userID == val2.userID) {
        ishave = 1;
      }
    });
    if (!ishave && val1.userID != accountInfo.userID)
    enterPushers.push(val1);
    ishave = 0;
  });
  roomInfo.pushers && roomInfo.pushers.forEach(function (val1) {
    ishave = 0;
    data.pushers && data.pushers.forEach(function (val2) {
      if (val1.userID == val2.userID) {
        ishave = 1;
      }
    });
    if (!ishave)
    leavePushers.push(val1);
    ishave = 0;
  });
  if (data.roomStatusCode) {
    roomInfo.roomStatusCode = data.roomStatusCode;

    app.globalData.roomInfo.roomStatusCode = roomInfo.roomStatusCode;


  }
  // 重置roomInfo.pushers
  roomInfo.pushers = data.pushers;

  app.globalData.roomInfo.pushers = roomInfo.pushers;

  // 通知有人进入房间
  if (enterPushers.length) {
    console.log('进房:', JSON.stringify(enterPushers));

    event.onAnchorEnter = app.globalData.event.onAnchorEnter;

    event.onAnchorEnter && event.onAnchorEnter({
      pushers: enterPushers });

    //混流
    mergeStream(1);
  }
  // 通知有人退出房间
  if (leavePushers.length) {
    console.log('退房:', JSON.stringify(leavePushers));


    event.onAnchorExit = app.globalData.event.onAnchorExit;

    event.onAnchorExit && event.onAnchorExit({
      pushers: leavePushers });

    //混流
    mergeStream(1);
  }
}


function getAnchors(object) {
  var data = {};


  roomInfo.roomID = app.globalData.roomInfo.roomID;

  if (object.data && object.data.roomID) {
    data.roomID = object.data.roomID;
  } else if (roomInfo.roomID) {
    data.roomID = roomInfo.roomID;
  } else {
    object.fail && object.fail({
      errCode: -999,
      errMsg: '无roomID' });

    return;
  }
  //获取房间信息
  request({
    url: 'get_anchors',
    data: data,
    success: function success(ret) {
      if (ret.data.code) {
        console.log('请求CGI:get_anchors失败', ret);
        object.fail && object.fail({ errCode: ret.data.code, errMsg: '请求CGI:get_anchors失败:' + ret.data.message + +'[' + ret.data.code + ']' });
        return;
      }
      console.log("房间信息：", JSON.stringify(ret));
      object.success && object.success(ret);
    },
    fail: object.fail });

}

/**
   * [sendRoomTextMsg 发送文本消息]
   * @param {options}
   *   data: {
   *   	msg: 文本消息
   *   }
   */
function sendRoomTextMsg(options) {
  if (!options || !options.data.msg || !options.data.msg.replace(/^\s*|\s*$/g, '')) {
    console.log('sendRoomTextMsg参数错误', options);
    options.fail && options.fail({
      errCode: -9,
      errMsg: 'sendRoomTextMsg参数错误' });

    return;
  }
  accountInfo.userName = app.globalData.accountInfo.userName;
  accountInfo.userAvatar = app.globalData.accountInfo.userAvatar;

  webimhandler.sendCustomMsg({
    data: '{"cmd":"CustomTextMsg","data":{"nickName":"' + accountInfo.userName + '","headPic":"' + accountInfo.userAvatar + '"}}',
    text: options.data.msg },
  function () {
    options.success && options.success();
  });
}

/**
   * [pusherHeartBeat 推流者心跳]
   * @param {options}
   */
function pusherHeartBeat(options) {
  if (options) {
    setTimeout(function () {
      proto_pusherHeartBeat();
    }, 3000);
  }
  if (heart) {
    setTimeout(function () {
      proto_pusherHeartBeat();
      pusherHeartBeat();
    }, 7000);
  }
}
function proto_pusherHeartBeat() {
  console.log('心跳请求');


  roomInfo.roomID = app.globalData.roomInfo.roomID;
  roomInfo.roomStatusCode = app.globalData.roomInfo.roomStatusCode;

  request({
    url: 'anchor_heartbeat',
    data: {
      roomID: roomInfo.roomID,
      userID: accountInfo.userID,
      roomStatusCode: roomInfo.roomStatusCode },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('心跳失败：', ret);
        return;
      }
      if (ret.data.pushers) {
        innerMergerAnchors(ret.data);
      }
      console.log('心跳成功', ret);
    },
    fail: function fail(ret) {
      console.log('心跳失败：', ret);
    } });

}

/**
   * [stopPusherHeartBeat 停止推流者心跳]
   * @param {options}
   */
function stopPusherHeartBeat() {
  heart = false;
}

/**
   * [getRoomList 获取房间列表]
   * @param {options}
   *   data: {
   *   	index: 获取的房间开始索引，从0开始计算
   *   	cnt: 获取的房间个数
   *   }
   *   success: 成功回调
   *   fail: 失败回调
   *
   * @return success
   *   rooms: 房间列表信息
   */
function getRoomList(options) {
  if (!options) {
    console.log('getRoomList参数错误', options);
    options.fail && options.fail({
      errCode: -9,
      errMsg: 'getRoomList参数错误' });

    return;
  }
  request({
    url: 'get_room_list',
    data: {
      index: options.data.index || 0,
      cnt: options.data.cnt || 20 },

    success: function success(ret) {
      if (ret.data.code) {
        console.error('获取房间列表失败: ', ret);
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message + '[' + ret.data.code + ']' });

        return;
      }
      console.log("房间列表信息:", ret);
      options.success && options.success({
        rooms: ret.data.rooms });

    },
    fail: function fail(ret) {
      console.log('获取房间列表失败: ', ret);
      if (ret.errMsg == 'request:fail timeout') {
        var errCode = -1;
        var errMsg = '网络请求超时，请检查网络状态';
      }
      options.fail && options.fail({
        errCode: errCode || -1,
        errMsg: errMsg || '获取房间列表失败' });

    } });

}


/**
   * [getPushURL 获取推流地址]
   * @param {options}
   *   success: 成功回调
   *   fail: 失败回调
   *
   * @return success
   *   pushURL: 推流地址
   */
function getPushURL(options) {
  if (!options) {
    console.log('getPushURL参数错误', options);
    options.fail && options.fail({
      errCode: -9,
      errMsg: 'getPushURL参数错误' });

    return;
  }
  request({
    url: 'get_anchor_url',
    data: {
      userID: accountInfo.userID },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('获取推流地址失败: ', ret);
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message + '[' + ret.data.code + ']' });

        return;
      }
      console.log('获取推流地址成功：', ret.data.pushURL);
      options.success && options.success({
        pushURL: ret.data.pushURL });

    },
    fail: function fail(ret) {
      if (ret.errMsg == 'request:fail timeout') {
        var errCode = -1;
        var errMsg = '网络请求超时，请检查网络状态';
      }
      options.fail && options.fail({
        errCode: errCode || -1,
        errMsg: errMsg || '获取推流地址失败' });

    } });

};


/**
    * [setListener 设置监听事件]
    * @param {options}
    *   onRoomDestroy: 群解散通知
    *   onRecvRoomTextMsg: 消息通知
    */
function setListener(options) {
  if (!options) {console.log('setListener参数错误', options);return;}

  // app.globalData.event = options

  event.onAnchorEnter = options.onAnchorEnter || function () {};
  event.onAnchorExit = options.onAnchorExit || function () {};
  event.onRoomDestroy = options.onRoomDestroy || function () {};
  event.onRecvRoomTextMsg = options.onRecvRoomTextMsg || function () {};
  event.onRequestJoinAnchor = options.onRequestJoinAnchor || function () {};
  event.onKickoutJoinAnchor = options.onKickoutJoinAnchor || function () {};
  event.onRecvRoomCustomMsg = options.onRecvRoomCustomMsg || function () {};
  event.onSketchpadData = options.onSketchpadData || function () {};



  app.globalData.event.onAnchorEnter = options.onAnchorEnter || function () {};
  app.globalData.event.onAnchorExit = options.onAnchorExit || function () {};
  app.globalData.event.onRoomDestroy = options.onRoomDestroy || function () {};
  app.globalData.event.onRecvRoomTextMsg = options.onRecvRoomTextMsg || function () {};
  app.globalData.event.onRequestJoinAnchor = options.onRequestJoinAnchor || function () {};
  app.globalData.event.onKickoutJoinAnchor = options.onKickoutJoinAnchor || function () {};
  app.globalData.event.onRecvRoomCustomMsg = options.onRecvRoomCustomMsg || function () {};
  app.globalData.event.onSketchpadData = options.onSketchpadData || function () {};



}

/**
   * [createRoom 创建房间]
   * @param {options}
   *   data: {
   *   	roomInfo: 房间名称
   *    	pushURL: 推流地址
   *   }
   *   success: 成功回调
   *   fail: 失败回调
   */
function createRoom(options) {
  roomInfo.isCreator = true;
  roomInfo.isDestory = false;
  roomInfo.isJoinGroup = false;



  app.globalData.roomInfo.isCreator = roomInfo.isCreator;
  app.globalData.roomInfo.isDestory = roomInfo.isDestory;
  app.globalData.roomInfo.isJoinGroup = roomInfo.isJoinGroup;

  if (!options || !options.data.roomInfo || !options.data.pushURL) {
    console.log('createRoom参数错误', options);
    options.fail && options.fail({
      errCode: -9,
      errMsg: 'createRoom参数错误' });

    return;
  }
  roomInfo.roomInfo = options.data.roomInfo;

  app.globalData.roomInfo.roomInfo = options.data.roomInfo;


  proto_createRoom(options);
}
function proto_createRoom(options) {

  roomInfo.roomInfo = app.globalData.roomInfo.roomInfo;

  var createRoomInfo = {
    userID: accountInfo.userID,
    roomInfo: roomInfo.roomInfo };

  if (options.data.roomID && options.data.roomID.length > 0) {
    createRoomInfo.roomID = options.data.roomID;
  }
  request({
    url: 'create_room',
    data: createRoomInfo,
    success: function success(ret) {
      if (ret.data.code) {
        console.log('创建房间失败:', ret);
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message + '[' + ret.data.code + ']' });

        return;
      }
      console.log('--->创建房间成功:', ret);
      roomInfo.roomID = ret.data.roomID;
      roomInfo.roomCreator = accountInfo.userID;


      app.globalData.roomInfo.roomID = ret.data.roomID;
      app.globalData.roomInfo.roomCreator = accountInfo.userID;

      roomInfo.isDestory = app.globalData.roomInfo.isDestory;

      if (roomInfo.isDestory) {
        roomInfo.isDestory = false;

        app.globalData.roomInfo.isDestory = roomInfo.isDestory;

        destoryRoom({});
        return;
      }
      options.data.roomID = ret.data.roomID;
      // 创建IM群
      var createIMGroupInfo = {
        roomID: options.data.roomID,
        userID: accountInfo.userID,
        roomName: options.data.roomID };


      webimhandler.createBigGroup(createIMGroupInfo, afterJoinBigGroup, {
        success: function success() {
          joinAnchor(options);
        },
        fail: options.fail });

    },
    fail: function fail(ret) {
      console.log('创建后台房间失败:', ret);
      if (ret.errMsg == 'request:fail timeout') {
        var errCode = -1;
        var errMsg = '网络请求超时，请检查网络状态';
      }
      options.fail && options.fail({
        errCode: errCode || -3,
        errMsg: errMsg || '创建房间失败' });

    } });

}
/**
   * [joinAnchor 加入推流]
   * @param {options}
   *   data: {
   *   	roomID: 房间ID
   *   	pushURL: 推流地址
   *   }
   *   success: 成功回调
   *   fail: 失败回调
   */
function joinAnchor(options) {
  if (!options || !options.data.roomID || !options.data.pushURL) {
    console.log('joinAnchor参数错误', options);
    options.fail && options.fail({
      errCode: -9,
      errMsg: 'joinAnchor参数错误' });

    return;
  }
  roomInfo.roomID = options.data.roomID;
  roomInfo.isDestory = false;


  app.globalData.roomInfo.roomID = options.data.roomID;
  app.globalData.roomInfo.isDestory = false;

  proto_joinAnchor(options);
}
function proto_joinAnchor(options) {


  roomInfo.roomID = app.globalData.roomInfo.roomID;

  request({
    url: 'add_anchor',
    data: {
      roomID: roomInfo.roomID,
      userID: accountInfo.userID,
      userName: accountInfo.userName,
      userAvatar: accountInfo.userAvatar,
      pushURL: options.data.pushURL },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('进入房间失败:', ret);
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message + '[' + ret.data.code + ']' });

        return;
      }
      roomInfo.hasJoinAnchor = true;
      app.globalData.roomInfo.hasJoinAnchor = roomInfo.hasJoinAnchor;
      mergeAnchors();
      console.log('加入推流成功');
      // 开始心跳
      heart = true;
      pusherHeartBeat(1);
      //通知房间内其他主播
      notifyPusherChange();

      roomInfo.roomID = app.globalData.roomInfo.roomID;

      options.success && options.success({ roomID: roomInfo.roomID });
    },
    fail: function fail(ret) {
      console.log('进入房间失败:', ret);
      if (ret.errMsg == 'request:fail timeout') {
        var errCode = -1;
        var errMsg = '网络请求超时，请检查网络状态';
      }
      options.fail && options.fail({
        errCode: errCode || -4,
        errMsg: errMsg || '进入房间失败' });

    } });

}

/**
   * [enterRoom 进入房间]
   * @param {options}
   *   data: {
   *   	roomID: 房间ID
   *   }
   *   success: 成功回调
   *   fail: 失败回调
   */
function enterRoom(options) {
  roomInfo.isCreator = false;
  roomInfo.isJoinGroup = false;


  app.globalData.roomInfo.isCreator = roomInfo.isCreator;
  app.globalData.roomInfo.isJoinGroup = roomInfo.isJoinGroup;

  if (!options || !options.data.roomID) {
    console.log('enterRoom参数错误', options);
    options.fail && options.fail({
      errCode: -9,
      errMsg: 'enterRoom参数错误' });

    return;
  }
  roomInfo.roomID = options.data.roomID;
  app.globalData.roomInfo.roomID = options.data.roomID;

  proto_enterRoom({
    success: function success(ret) {
      options.success && options.success(ret);
      var userInfo = {
        userName: accountInfo.userName,
        userAvatar: accountInfo.userAvatar };

      addAudience({
        data: {
          roomID: options.data.roomID,
          userID: accountInfo.userID,
          userInfo: JSON.stringify(userInfo) } });


    },
    fail: options.fail });

}
function proto_enterRoom(options) {


  roomInfo.roomID = app.globalData.roomInfo.roomID;

  console.log('开始IM: ', roomInfo.roomID);
  webimhandler.applyJoinBigGroup(roomInfo.roomID, afterJoinBigGroup, {
    success: function success(ret) {
      getAnchors({
        data: {
          roomID: roomInfo.roomID },

        success: function success(ret) {
          roomInfo.roomID = ret.data.roomID;
          roomInfo.roomInfo = ret.data.roomInfo;
          roomInfo.roomCreator = ret.data.roomCreator;
          roomInfo.mixedPlayURL = ret.data.mixedPlayURL;


          app.globalData.roomInfo.roomID = ret.data.roomID;
          app.globalData.roomInfo.roomInfo = ret.data.roomInfo;
          app.globalData.roomInfo.roomCreator = ret.data.roomCreator;
          app.globalData.roomInfo.mixedPlayURL = ret.data.mixedPlayURL;


          options.success && options.success({
            roomID: roomInfo.roomID,
            roomCreator: roomInfo.roomCreator,
            mixedPlayURL: roomInfo.mixedPlayURL,
            pushers: ret.data.pushers });

        },
        fail: function fail(ret) {
          options.fail && options.fail({
            errCode: ret.errCode,
            errMsg: ret.errMsg || '拉取主播信息失败' });

        } });

    },
    fail: options.fail });

}

/**
   * [clearRequest 中断请求]
   * @param {options}
   */
function clearRequest() {
  for (var i = 0; i < requestSeq; i++) {
    requestTask[i].abort();
  }
  requestTask = [];
  requestSeq = 0;
}

/**
   * [exitRoom 退出房间]
   * @param {options}
   */
function exitRoom(options) {

  roomInfo.isCreator = app.globalData.roomInfo.isCreator;

  if (roomInfo.isCreator) {
    destoryRoom(options);
  } else {
    leaveRoom(options);
  }
  roomInfo.isDestory = true;
  roomInfo.roomID = '';
  roomInfo.pushers = [];
  roomInfo.mixedPlayURL = "";
  roomInfo.roomInfo = "";


  app.globalData.roomInfo.isDestory = true;
  app.globalData.roomInfo.roomID = '';
  app.globalData.roomInfo.pushers = [];
  app.globalData.roomInfo.mixedPlayURL = "";
  app.globalData.roomInfo.roomInfo = "";


  accountInfo.pushURL = "";
  accountInfo.isCreator = false;
}

/**
   * [leaveRoom 退出房间]
   */
function leaveRoom(options) {
  // 停止心跳
  stopPusherHeartBeat();
  //通知房间内其他主播
  notifyPusherChange();
  // clearRequest();

  roomInfo.isJoinGroup = app.globalData.roomInfo.isJoinGroup;
  roomInfo.roomID = app.globalData.roomInfo.roomID;


  roomInfo.isJoinGroup && webimhandler.quitBigGroup();
  request({
    url: 'delete_anchor',
    data: {
      roomID: roomInfo.roomID,
      userID: accountInfo.userID },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('退出推流失败:', ret);
        console.error('退房信息: roomID:' + roomInfo.roomID + ", userID:" + accountInfo.userID);
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message + '[' + ret.data.code + ']' });

        return;
      }
      console.log('退出推流成功');
      options.success && options.success({});
    },
    fail: function fail(ret) {
      console.log('退出推流失败:', ret);
      var errCode = ret.errCode || -1;
      var errMsg = ret.errMsg || '退出房间失败';
      if (ret.errMsg == 'request:fail timeout') {
        errCode = -1;
        errMsg = '网络请求超时，请检查网络状态';
      }
      options.fail && options.fail({
        errCode: errCode,
        errMsg: errMsg });

    } });


  delAudience({
    data: {
      userID: accountInfo.userID,
      roomID: roomInfo.roomID } });


}

/**
   * [destoryRoom 销毁房间]
   */
function destoryRoom(options) {
  // 停止心跳
  stopPusherHeartBeat();
  // clearRequest();

  roomInfo.isJoinGroup = app.globalData.roomInfo.isJoinGroup;
  roomInfo.roomID = app.globalData.roomInfo.roomID;

  roomInfo.isJoinGroup && webimhandler.destroyGroup();
  if (roomInfo.isDestory) return;
  request({
    url: 'destroy_room',
    data: {
      roomID: roomInfo.roomID,
      userID: accountInfo.userID },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('关闭房间失败:', ret);
        console.error('关闭房间失败: roomID:' + roomInfo.roomID + ", userID:" + accountInfo.userID);
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message + '[' + ret.data.code + ']' });

        return;
      }
      console.log('关闭房间成功');
      options.success && options.success({});
    },
    fail: function fail(ret) {
      console.log('关闭房间失败:', ret);
      var errCode = ret.errCode || -1;
      var errMsg = ret.errMsg || '关闭房间失败';
      if (ret.errMsg == 'request:fail timeout') {
        errCode = -1;
        errMsg = '网络请求超时，请检查网络状态';
      }
      options.fail && options.fail({
        errCode: errCode,
        errMsg: errMsg });

    } });

}

function quitJoinAnchor(options) {

  roomInfo.roomID = app.globalData.roomInfo.roomID;



  stopPusherHeartBeat();
  request({
    url: 'delete_anchor',
    data: {
      roomID: roomInfo.roomID,
      userID: accountInfo.userID },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('退出推流失败:', ret);
        options.fail && options.fail({
          errCode: ret.data.code,
          errMsg: ret.data.message + '[' + ret.data.code + ']' });

        return;
      }
      console.log('退出推流成功');
      roomInfo.pushers = [];
      app.globalData.roomInfo.pushers = roomInfo.pushers;

      //通知房间内其他主播
      notifyPusherChange();
      options.success && options.success({});
    },
    fail: function fail(ret) {
      console.log('退出推流失败:', ret);
      if (ret.errMsg == 'request:fail timeout') {
        var errCode = -1;
        var errMsg = '网络请求超时，请检查网络状态';
      }
      options.fail && options.fail({
        errCode: errCode || -1,
        errMsg: errMsg || '退出房间失败' });

    } });

  roomInfo.hasJoinAnchor = false;

  app.globalData.roomInfo.hasJoinAnchor = roomInfo.hasJoinAnchor;

}

function requestJoinAnchor(object) {

  roomInfo.roomID = app.globalData.roomInfo.roomID;
  accountInfo.userID = app.globalData.accountInfo.userID;
  accountInfo.userName = app.globalData.accountInfo.userName;
  accountInfo.userAvatar = app.globalData.accountInfo.userAvatar;
  accountInfo.userID = app.globalData.accountInfo.userID;

  var body = {
    cmd: 'linkmic',
    data: {
      type: 'request',
      roomID: roomInfo.roomID,
      userID: accountInfo.userID,
      userName: accountInfo.userName,
      userAvatar: accountInfo.userAvatar,
      timestamp: Math.round(Date.now()) - mTimeDiff } };




  requestJoinCallback = function requestJoinCallback(ret) {

    if (gTimeoutID) {
      clearTimeout(gTimeoutID);
      gTimeoutID = null;
    }
    if (ret.errCode) {
      object.fail && object.fail(ret);
    } else {
      object.success && object.success(ret);
    }
  };

  app.globalData.requestJoinCallback = requestJoinCallback;

  var isTimeout = false;
  gTimeoutID = setTimeout(function () {
    gTimeoutID = null;
    console.error('申请连麦超时:', JSON.stringify(object.data));
    isTimeout = true;
    requestJoinCallback && requestJoinCallback({
      errCode: -999,
      errMsg: '申请加入连麦超时' });

  }, object.data && object.data.timeout ? object.data.timeout : 30000);

  var msg = {
    data: JSON.stringify(body) };


  roomInfo.roomCreator = app.globalData.roomInfo.roomCreator;


  webimhandler.sendC2CCustomMsg(roomInfo.roomCreator, msg, function (ret) {
    if (isTimeout) {
      return;
    }
    if (ret && ret.errCode) {
      console.log('请求连麦失败:', JSON.stringify(ret));
      requestJoinCallback && requestJoinCallback(ret);
      return;
    }
  });
}

function acceptJoinAnchor(object) {

  roomInfo.roomID = app.globalData.roomInfo.roomID;


  var body = {
    cmd: 'linkmic',
    data: {
      type: 'response',
      result: 'accept',
      reason: '',
      roomID: roomInfo.roomID,
      timestamp: Math.round(Date.now()) - mTimeDiff } };



  var msg = {
    data: JSON.stringify(body) };

  webimhandler.sendC2CCustomMsg(object.data.userID, msg, function (ret) {});
}

function rejectJoinAnchor(object) {

  roomInfo.roomID = app.globalData.roomInfo.roomID;

  var body = {
    cmd: 'linkmic',
    data: {
      type: 'response',
      result: 'reject',
      reason: object.data.reason || '主播拒绝了您的连麦请求',
      roomID: roomInfo.roomID,
      timestamp: Math.round(Date.now()) - mTimeDiff } };



  var msg = {
    data: JSON.stringify(body) };

  webimhandler.sendC2CCustomMsg(object.data.userID, msg, function (ret) {});
}

function kickoutJoinAnchor(object) {


  roomInfo.roomID = app.globalData.roomInfo.roomID;

  var body = {
    cmd: 'linkmic',
    data: {
      type: 'kickout',
      roomID: roomInfo.roomID,
      timestamp: Math.round(Date.now()) - mTimeDiff } };



  var msg = {
    data: JSON.stringify(body) };

  webimhandler.sendC2CCustomMsg(object.data.userID, msg, function (ret) {
    if (ret && ret.errCode == 0) {
      object.success && object.success(ret);
    } else {
      object.fail && object.fail(ret);
    }
  });
}

function getAccountInfo() {

  accountInfo = app.globalData.accountInfo;

  return accountInfo;
}

/**
   * 
   * @param {Int} retryCount
   */
function mergeStream(retryCount) {


  roomInfo.roomCreator = app.globalData.roomInfo.roomCreator;

  if (accountInfo.userID != roomInfo.roomCreator) {
    //大主播才能混流
    return;
  }
  var mergeStreams = [];


  roomInfo.pushers = app.globalData.roomInfo.pushers;
  roomInfo.roomCreator = app.globalData.roomInfo.roomCreator;


  if (roomInfo.pushers && roomInfo.pushers.length > 0) {
    roomInfo.pushers.forEach(function (val) {
      if (val.userID != roomInfo.roomCreator) {
        //获取流id
        var streamID = getStreamIDByStreamUrl(val.accelerateURL);
        if (streamID) {
          mergeStreams.push({
            userID: val.userID,
            streamID: streamID,
            width: val.width,
            height: val.height });

        }
      } else {
        bigAnchorStreamID = getStreamIDByStreamUrl(val.accelerateURL);
      }
    });
  }
  console.log("混流信息:", JSON.stringify(mergeStreams));

  sendStreamMergeRequest(retryCount, mergeStreams);
}

function getStreamIDByStreamUrl(streamUrl) {
  if (!streamUrl) {
    return null;
  }
  //推流地址格式: rtmp://8888.livepush.myqcloud.com/path/8888_test_12345?txSecret=aaa&txTime=bbb
  //拉流地址格式: rtmp://8888.livepush.myqcloud.com/path/8888_test_12345
  //             http://8888.livepush.myqcloud.com/path/8888_test_12345.flv
  //             http://8888.livepush.myqcloud.com/path/8888_test_12345.m3u8

  var subStr = streamUrl;
  var index = subStr.indexOf('?');
  if (index >= 0) {
    subStr = subStr.substring(0, index);
  }
  if (!subStr) {
    return null;
  }
  index = subStr.lastIndexOf('/');
  if (index >= 0) {
    subStr = subStr.substring(index + 1);
  }
  if (!subStr) {
    return null;
  }
  index = subStr.indexOf('.');
  if (index >= 0) {
    subStr = subStr.substring(0, index);
  }
  if (!subStr) {
    return null;
  }
  return subStr;
}

function sendStreamMergeRequest(retryCount, mergeStreams) {
  if (retryCount < 0) {
    return;
  }

  var mergeInfo = createMergeInfo(mergeStreams);
  console.log('混流信息:', JSON.stringify(mergeInfo));

  doMergeRequest(mergeInfo, function (ret) {
    if (ret) {
      console.log('混流成功');
    } else {
      console.log('混流失败');
      setTimeout(function () {
        retryCount--;
        sendStreamMergeRequest(retryCount, mergeStreams);
      }, 2000);
    }
  });
}

function doMergeRequest(mergeInfo, callback) {

  roomInfo.roomID = app.globalData.roomInfo.roomID;

  request({
    url: 'merge_stream',
    data: {
      userID: accountInfo.userID,
      roomID: roomInfo.roomID,
      mergeParams: JSON.stringify(mergeInfo) },

    success: function success(ret) {
      if (ret.data.code || ret.data.merge_code) {
        console.error('混流失败:', JSON.stringify(ret));
        callback(false);
        return;
      }
      callback(true);
    },
    fail: function fail(ret) {
      callback(false);
    } });

}

function createMergeInfo(mergeStreams) {
  console.log("混流原始信息:", JSON.stringify(mergeStreams));

  var smallAnchorWidth = 160;
  var smallAnchorHeight = 240;
  var offsetHeight = 90;
  if (bigAnchorWidth < 540 || bigAnchorHeight < 960) {
    smallAnchorWidth = 120;
    smallAnchorHeight = 180;
    offsetHeight = 60;
  }

  //组装混流JSON结构体
  var streamInfoArray = [];
  if (mergeStreams && mergeStreams.length > 0) {

    //大主播
    var bigAnchorInfo = {
      input_stream_id: bigAnchorStreamID || '',
      layout_params: {
        image_layer: 1 } };


    streamInfoArray.push(bigAnchorInfo);

    //小主播
    var subLocationX = bigAnchorWidth - smallAnchorWidth;
    var subLocationY = bigAnchorHeight - smallAnchorHeight - offsetHeight;
    if (mergeStreams && mergeStreams.length > 0) {
      var layerIndex = 0;
      mergeStreams.forEach(function (val) {
        //组装JSON
        var smallAchorInfo = {
          input_stream_id: val.streamID,
          layout_params: {
            image_layer: layerIndex + 2,
            image_width: smallAnchorWidth,
            image_height: smallAnchorHeight,
            location_x: subLocationX,
            location_y: subLocationY - layerIndex * smallAnchorHeight } };


        streamInfoArray.push(smallAchorInfo);
        layerIndex++;
      });
    }
  } else {
    var bigAnchorInfo = {
      input_stream_id: bigAnchorStreamID || '',
      layout_params: {
        image_layer: 1 } };


    streamInfoArray.push(bigAnchorInfo);
  }

  var para = {
    app_id: accountInfo.sdkAppID.toString(),
    interface: 'mix_streamv2.start_mix_stream_advanced',
    mix_stream_session_id: bigAnchorStreamID,
    output_stream_id: bigAnchorStreamID,
    input_stream_list: streamInfoArray };


  var interfaceObj = {
    interfaceName: 'Mix_StreamV2',
    para: para };


  var reqParam = {
    timestamp: Math.round(Date.now() / 1000),
    eventId: Math.round(Date.now() / 1000),
    interface: interfaceObj };


  return reqParam;
}

function setVideoRatio(ratio) {
  if (ratio == 1) {
    //9:16
    bigAnchorWidth = 360;
    bigAnchorHeight = 640;
  } else {
    //3:4
    bigAnchorWidth = 480;
    bigAnchorHeight = 640;
  }
}

function sendC2CCustomMsg(object) {
  accountInfo.userID = app.globalData.accountInfo.userID;
  accountInfo.userName = app.globalData.accountInfo.userName;
  accountInfo.userAvatar = app.globalData.accountInfo.userAvatar;
  var body = {
    cmd: object.cmd,
    data: {
      userID: accountInfo.userID,
      userName: accountInfo.userName,
      userAvatar: accountInfo.userAvatar,
      msg: object.msg || '' } };


  var msg = {
    data: JSON.stringify(body) };


  roomInfo.roomCreator = app.globalData.roomInfo.roomCreator;

  webimhandler.sendC2CCustomMsg(object.toUserID ? object.toUserID : roomInfo.roomCreator, msg, function (ret) {
    if (ret && ret.errCode) {
      console.log('请求连麦失败:', JSON.stringify(ret));
      object.fail && object.fail(ret);
      return;
    }
    object.success && object.success({});
  });
}

//观众进房时，向后台发送进房通知
function addAudience(object) {
  request({
    url: 'add_audience',
    data: {
      userID: accountInfo.userID,
      roomID: object.data.roomID,
      userInfo: object.data.userInfo },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('增加观众请求失败', ret);
        object.fail && object.fail({ errCode: ret.data.code, errMsg: '增加观众请求失败:' + ret.data.message + +'[' + ret.data.code + ']' });
        return;
      }
      object.success && object.success(ret);
    },
    fail: object.fail });

}

//观众退房时，向后台发送退房通知
function delAudience(object) {
  request({
    url: 'delete_audience',
    data: {
      userID: object.data.userID,
      roomID: object.data.roomID },

    success: function success(ret) {
      if (ret.data.code) {
        console.log('减少观众请求失败', ret);
        object.fail && object.fail({ errCode: ret.data.code, errMsg: '减少观众请求失败:' + ret.data.message + +'[' + ret.data.code + ']' });
        return;
      }
      object.success && object.success(ret);
    },
    fail: object.fail });

}

/**
   * 对外暴露函数
   * @type {Object}
   */
module.exports = {
  login: login, // 初始化
  logout: logout, // 结束初始化
  getRoomList: getRoomList, // 拉取房间列表
  getPushURL: getPushURL, // 拉取推流地址
  createRoom: createRoom, // 创建房间
  enterRoom: enterRoom, // 加入房间
  exitRoom: exitRoom, // 退出房间
  sendRoomTextMsg: sendRoomTextMsg, // 发送文本消息
  setListener: setListener, // 设置监听事件
  joinAnchor: joinAnchor, //加入连麦
  quitJoinAnchor: quitJoinAnchor, //退出连麦
  requestJoinAnchor: requestJoinAnchor,
  acceptJoinAnchor: acceptJoinAnchor,
  rejectJoinAnchor: rejectJoinAnchor,
  kickoutJoinAnchor: kickoutJoinAnchor,
  getAccountInfo: getAccountInfo,
  setVideoRatio: setVideoRatio,
  sendC2CCustomMsg: sendC2CCustomMsg,
  getAnchors: getAnchors
  // addRemoteView: addRemoteView,
  // deleteRemoteView: deleteRemoteView
};

/***/ }),

/***/ 157:
/*!****************************************************************!*\
  !*** D:/微品匠心/qiketang/wxcomponents/mlvb-live-room/webim_wx.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var reqSeq = 0,reqNum = 0;

module.exports = function () {
  /* webim javascript SDK
                               * VER 1.7.0
                               */

  /* webim API definitions
                                   */
  var msgCache = {};
  var webim = { // namespace object webim

    /* function init
     *   sdk登录
     * params:
     *   loginInfo      - Object, 登录身份相关参数集合，详见下面
     *   {
     *     sdkAppID     - String, 用户标识接入SDK的应用ID，必填
     *     accountType  - int, 账号类型，必填
     *     identifier   - String, 用户帐号,必须是字符串类型，必填
     *     identifierNick   - String, 用户昵称，选填
     *     userSig      - String, 鉴权Token，必须是字符串类型，必填
     *   }
     *   listeners      - Object, 事件回调函数集合, 详见下面
     *   {
     *     onConnNotify - function(connInfo), 用于收到连接状态相关通知的回调函数,目前未使用
     *     jsonpCallback -function(rspData),//IE9(含)以下浏览器用到的jsonp回调函数
     *     onMsgNotify  - function(newMsgList), 用于收到消息通知的回调函数,
     *      newMsgList为新消息数组，格式为[Msg对象]
     *      使用方有两种处理回调: 1)处理newMsgList中的增量消息,2)直接访问webim.MsgStore获取最新的消息
     *     onGroupInfoChangeNotify  - function(groupInfo), 用于监听群组资料变更的回调函数,
     *          groupInfo为新的群组资料信息
     *     onGroupSystemNotifys - Object, 用于监听（多终端同步）群系统消息的回调函数对象
     *
     *   }
     *   options        - Object, 其它选项, 目前未使用
     * return:
     *   (无)
     */
    login: function login(loginInfo, listeners, options) {
    },

    /* function syncMsgs
        *   拉取最新C2C消息
        *   一般不需要使用方直接调用, SDK底层会自动同步最新消息并通知使用方, 一种有用的调用场景是用户手动触发刷新消息
        * params:
        *   cbOk   - function(msgList)类型, 当同步消息成功时的回调函数, msgList为新消息数组，格式为[Msg对象],
        *            如果此参数为null或undefined则同步消息成功后会像自动同步那样回调cbNotify
        *   cbErr  - function(err)类型, 当同步消息失败时的回调函数, err为错误对象
        * return:
        *   (无)
        */
    syncMsgs: function syncMsgs(cbOk, cbErr) {
    },


    /* function getC2CHistoryMsgs
        * 拉取C2C漫游消息
        * params:
        *   options    - 请求参数
        *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getC2CHistoryMsgs: function getC2CHistoryMsgs(options, cbOk, cbErr) {
    },

    /* function syncGroupMsgs
        * 拉取群漫游消息
        * params:
        *   options    - 请求参数
        *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    syncGroupMsgs: function syncGroupMsgs(options, cbOk, cbErr) {
    },

    /* function sendMsg
        *   发送一条消息
        * params:
        *   msg    - webim.Msg类型, 要发送的消息对象
        *   cbOk   - function()类型, 当发送消息成功时的回调函数
        *   cbErr  - function(err)类型, 当发送消息失败时的回调函数, err为错误对象
        * return:
        *   (无)
        */
    sendMsg: function sendMsg(msg, cbOk, cbErr) {
    },

    /* function logout
        *   sdk登出
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    logout: function logout(cbOk, cbErr) {
    },

    /* function setAutoRead
        * 设置会话自动已读上报标志
        * params:
        *   selSess    - webim.Session类型, 当前会话
        *   isOn   - boolean, 将selSess的自动已读消息标志改为isOn，同时是否上报当前会话已读消息
        *   isResetAll - boolean，是否重置所有会话的自动已读标志
        * return:
        *   (无)
        */
    setAutoRead: function setAutoRead(selSess, isOn, isResetAll) {
    },

    /* function getProfilePortrait
        *   拉取资料（搜索用户）
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getProfilePortrait: function getProfilePortrait(options, cbOk, cbErr) {
    },

    /* function setProfilePortrait
        *   设置个人资料
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    setProfilePortrait: function setProfilePortrait(options, cbOk, cbErr) {
    },

    /* function applyAddFriend
        *   申请添加好友
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    applyAddFriend: function applyAddFriend(options, cbOk, cbErr) {
    },

    /* function getPendency
        *   拉取好友申请
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getPendency: function getPendency(options, cbOk, cbErr) {
    },

    /* function deletePendency
        *   删除好友申请
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deletePendency: function deletePendency(options, cbOk, cbErr) {
    },

    /* function responseFriend
        *   响应好友申请
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    responseFriend: function responseFriend(options, cbOk, cbErr) {
    },

    /* function getAllFriend
        *   拉取我的好友
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getAllFriend: function getAllFriend(options, cbOk, cbErr) {
    },

    /* function deleteFriend
        *   删除好友
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteFriend: function deleteFriend(options, cbOk, cbErr) {
    },

    /* function addBlackList
        *   增加黑名单
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    addBlackList: function addBlackList(options, cbOk, cbErr) {
    },

    /* function getBlackList
        *   删除黑名单
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getBlackList: function getBlackList(options, cbOk, cbErr) {
    },

    /* function deleteBlackList
        *   我的黑名单
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteBlackList: function deleteBlackList(options, cbOk, cbErr) {
    },

    /* function uploadPic
        *   上传图片
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    uploadPic: function uploadPic(options, cbOk, cbErr) {
    },

    /* function createGroup
        *   创建群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    createGroup: function createGroup(options, cbOk, cbErr) {
    },

    /* function applyJoinGroup
        *   申请加群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    applyJoinGroup: function applyJoinGroup(options, cbOk, cbErr) {
    },

    /* function handleApplyJoinGroup
        *   处理申请加群(同意或拒绝)
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    handleApplyJoinGroup: function handleApplyJoinGroup(options, cbOk, cbErr) {
    },

    /* function deleteApplyJoinGroupPendency
        *   删除加群申请
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteApplyJoinGroupPendency: function deleteApplyJoinGroupPendency(options, cbOk, cbErr) {
    },


    /* function quitGroup
        *  主动退群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    quitGroup: function quitGroup(options, cbOk, cbErr) {
    },

    /* function getGroupPublicInfo
        *   读取群公开资料-高级接口
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getGroupPublicInfo: function getGroupPublicInfo(options, cbOk, cbErr) {
    },

    /* function getGroupInfo
        *   读取群详细资料-高级接口
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getGroupInfo: function getGroupInfo(options, cbOk, cbErr) {
    },

    /* function modifyGroupBaseInfo
        *   修改群基本资料
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    modifyGroupBaseInfo: function modifyGroupBaseInfo(options, cbOk, cbErr) {
    },

    /* function destroyGroup
        *  解散群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    destroyGroup: function destroyGroup(options, cbOk, cbErr) {
    },

    /* function getJoinedGroupListHigh
        *   获取我的群组-高级接口
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getJoinedGroupListHigh: function getJoinedGroupListHigh(options, cbOk, cbErr) {
    },

    /* function getGroupMemberInfo
        *   获取群组成员列表
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getGroupMemberInfo: function getGroupMemberInfo(options, cbOk, cbErr) {
    },

    /* function addGroupMember
        *   邀请好友加群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    addGroupMember: function addGroupMember(options, cbOk, cbErr) {
    },

    /* function modifyGroupMember
        *   修改群成员资料（角色或者群消息提类型示）
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    modifyGroupMember: function modifyGroupMember(options, cbOk, cbErr) {
    },

    /* function forbidSendMsg
        *   设置群成员禁言时间
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    forbidSendMsg: function forbidSendMsg(options, cbOk, cbErr) {
    },

    /* function deleteGroupMember
        *   删除群成员
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteGroupMember: function deleteGroupMember(options, cbOk, cbErr) {
    },

    /* function sendCustomGroupNotify
        *   发送自定义群通知
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    sendCustomGroupNotify: function sendCustomGroupNotify(options, cbOk, cbErr) {
    },

    /* class webim.Msg
        *   一条消息的描述类, 消息发送、接收的API中都会涉及此类型的对象
        * properties:
        *   sess   - Session object-ref, 消息所属的会话(e.g:我与好友A的C2C会话，我与群组G的GROUP会话)
        *   isSend - Boolean, true表示是我发出消息, false表示是发给我的消息)
        *   seq    - Integer, 消息序列号, 用于判断消息是否同一条
        *   random - Integer, 消息随机数,用于判断消息是否同一条
        *   time   - Integer, 消息时间戳, 为unix timestamp
        *   fromAccount -String,  消息发送者帐号
        *   subType -Integer,  消息子类型，c2c消息时，0-表示普通消息；群消息时，0-普通消息，1-点赞消息，2-提示消息
        *   fromAccountNick -String,  消息发送者昵称
        *   elems  - Array of webim.Msg.Elem, 描述消息内容的元素列表
        * constructor:
        *   Msg(sess, isSend, seq,random time,fromAccount) - 构造函数, 参数定义同上面properties中定义
        * methods:
        *   addText(text)  - 向elems中添加一个TEXT元素
        *   addFace(face)  - 向elems中添加一个FACE元素
        *   toHtml()       - 转成可展示的html String
        *addFace
        * sub-class webim.Msg.Elem
        *   消息中一个组成元素的描述类, 一条消息的内容被抽象描述为N个元素的有序列表
        * properties:
        *   type   - 元素类型, 目前有TEXT(文本)、FACE(表情)、IMAGE(图片)等
        *   content- 元素内容体, 当TEXT时为String, 当PIC时为UrlString
        * constructor:
        *   Elem(type, content) - 构造函数, 参数定义同上面properties中定义
        *
        * sub-class webim.Msg.Elem.TextElem
        *   文本
        * properties:
        *   text  - String 内容
        * constructor:
        *   TextElem(text) - 构造函数, 参数定义同上面properties中定义
        *
        * sub-class webim.Msg.Elem.FaceElem
        *   表情
        * properties:
        *   index  - Integer 表情索引, 用户自定义
        *   data   - String 额外数据，用户自定义
        * constructor:
        *   FaceElem(index,data) - 构造函数, 参数定义同上面properties中定义
        *
        *
        */
    Msg: function Msg(sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {/*Class constructor*/
    },

    /* singleton object MsgStore
        * webim.MsgStore是消息数据的Model对象(参考MVC概念), 它提供接口访问当前存储的会话和消息数据
        * 下面说明下会话数据类型: Session
        *
        * class Session
        *   一个Session对象描述一个会话，会话可简单理解为最近会话列表的一个条目，它由两个字段唯一标识:
        *     type - String, 会话类型(如"C2C", "GROUP", ...)
        *     id   - String, 会话ID(如C2C类型中为对方帐号,"C2C"时为好友ID,"GROUP"时为群ID)
        * properties:
        *   (Session对象未对外暴露任何属性字段, 所有访问通过下面的getter方法进行)
        * methods:
        *   type()     - String, 返回会话类型,"C2C"表示与好友私聊，"GROUP"表示群聊
        *   id()       - String, 返回会话ID
        *   name()     - String, 返回会话标题(如C2C类型中为对方的昵称,暂不支持)
        *   icon()     - String, 返回会话图标(对C2C类型中为对方的头像URL，暂不支持)
        *   unread()           - Integer, 返回会话未读条数
        *   time()     - Integer, 返回会话最后活跃时间, 为unix timestamp
        *   curMaxMsgSeq() - Integer, 返回会话最大消息序列号
        *   msgCount() - Integer, 返回会话中所有消息条数
        *   msg(index) - webim.Msg, 返回会话中第index条消息
        */
    MsgStore: {
      /* function sessMap
                 *   获取所有会话
                 * return:
                 *   所有会话对象
                 */
      sessMap: function sessMap() {
        return {/*Object*/};
      },
      /* function sessCount
          *   获取当前会话的个数
          * return:
          *   Integer, 会话个数
          */
      sessCount: function sessCount() {
        return 0;
      },

      /* function sessByTypeId
          *   根据会话类型和会话ID取得相应会话
          * params:
          *   type   - String, 会话类型(如"C2C", "GROUP", ...)
          *   id     - String, 会话ID(如对方ID)
          * return:
          *   Session, 会话对象(说明见上面)
          */
      sessByTypeId: function sessByTypeId(type, id) {
        return {/*Session Object*/};
      },
      /* function delSessByTypeId
          *   根据会话类型和会话ID删除相应会话
          * params:
          *   type   - String, 会话类型(如"C2C", "GROUP", ...)
          *   id     - String, 会话ID(如对方ID)
          * return:
          *   Boolean, 布尔类型
          */
      delSessByTypeId: function delSessByTypeId(type, id) {
        return true;
      },

      /* function resetCookieAndSyncFlag
          *   重置上一次读取新c2c消息Cookie和是否继续拉取标记
          * return:
          *
          */
      resetCookieAndSyncFlag: function resetCookieAndSyncFlag() {
      },

      downloadMap: {} } };




  /* webim API implementation
                            */
  (function (webim) {
    //sdk版本
    var SDK = {
      'VERSION': '1.7.0', //sdk版本号
      'APPID': '537048168' //web im sdk 版本 APPID
    };

    //是否启用正式环境，默认启用
    var isAccessFormaEnvironment = true;
    // var isAccessFormaEnvironment = false;

    //后台接口主机
    var SRV_HOST = {
      'FORMAL': {
        'COMMON': 'https://webim.tim.qq.com',
        'PIC': 'https://pic.tim.qq.com' },

      'TEST': {
        'COMMON': 'https://test.tim.qq.com',
        'PIC': 'https://pic.tim.qq.com' } };



    //浏览器版本信息
    var BROWSER_INFO = {};
    //是否为ie9（含）以下
    var lowerBR = false;

    //服务名称
    var SRV_NAME = {
      'OPEN_IM': 'openim', //私聊（拉取未读c2c消息，长轮询，c2c消息已读上报等）服务名
      'GROUP': 'group_open_http_svc', //群组管理（拉取群消息，创建群，群成员管理，群消息已读上报等）服务名
      'FRIEND': 'sns', //关系链管理（好友管理，黑名单管理等）服务名
      'PROFILE': 'profile', //资料管理（查询，设置个人资料等）服务名
      'RECENT_CONTACT': 'recentcontact', //最近联系人服务名
      'PIC': 'openpic', //图片（或文件）服务名
      'BIG_GROUP': 'group_open_http_noauth_svc', //直播大群 群组管理（申请加大群）服务名
      'BIG_GROUP_LONG_POLLING': 'group_open_long_polling_http_noauth_svc', //直播大群 长轮询（拉取消息等）服务名
      'IM_OPEN_STAT': 'imopenstat' //质量上报，统计接口错误率
    };

    //不同服务对应的版本号
    var SRV_NAME_VER = {
      'openim': 'v4',
      'group_open_http_svc': 'v4',
      'sns': 'v4',
      'profile': 'v4',
      'recentcontact': 'v4',
      'openpic': 'v4',
      'group_open_http_noauth_svc': 'v1',
      'group_open_long_polling_http_noauth_svc': 'v1',
      'imopenstat': 'v4' };


    //不同的命令名对应的上报类型ID，用于接口质量上报
    var CMD_EVENT_ID_MAP = {
      'login': 1, //登录
      'pic_up': 3, //上传图片
      'apply_join_group': 9, //申请加入群组
      'create_group': 10, //创建群组
      'longpolling': 18, //普通长轮询
      'send_group_msg': 19, //群聊
      'sendmsg': 20 //私聊
    };

    //聊天类型
    var SESSION_TYPE = {
      'C2C': 'C2C', //私聊
      'GROUP': 'GROUP' //群聊
    };

    //最近联系人类型
    var RECENT_CONTACT_TYPE = {
      'C2C': 1, //好友
      'GROUP': 2 //群
    };

    //消息最大长度（字节）
    var MSG_MAX_LENGTH = {
      'C2C': 12000, //私聊消息
      'GROUP': 8898 //群聊
    };

    //后台接口返回类型
    var ACTION_STATUS = {
      'OK': 'OK', //成功
      'FAIL': 'FAIL' //失败
    };

    var ERROR_CODE_CUSTOM = 99999; //自定义后台接口返回错误码

    //消息元素类型
    var MSG_ELEMENT_TYPE = {
      'TEXT': 'TIMTextElem', //文本
      'FACE': 'TIMFaceElem', //表情
      'IMAGE': 'TIMImageElem', //图片
      'CUSTOM': 'TIMCustomElem', //自定义
      'SOUND': 'TIMSoundElem', //语音,只支持显示
      'FILE': 'TIMFileElem', //文件,只支持显示
      'LOCATION': 'TIMLocationElem', //地理位置
      'GROUP_TIP': 'TIMGroupTipElem' //群提示消息,只支持显示
    };

    //图片类型
    var IMAGE_TYPE = {
      'ORIGIN': 1, //原图
      'LARGE': 2, //缩略大图
      'SMALL': 3 //缩略小图
    };

    //上传资源包类型
    var UPLOAD_RES_PKG_FLAG = {
      'RAW_DATA': 0, //原始数据
      'BASE64_DATA': 1 //base64编码数据
    };

    //下载文件配置
    var DOWNLOAD_FILE = {
      'BUSSINESS_ID': '10001', //下载文件业务ID
      'AUTH_KEY': '617574686b6579', //下载文件authkey
      'SERVER_IP': '182.140.186.147' //下载文件服务器IP
    };

    //下载文件类型
    var DOWNLOAD_FILE_TYPE = {
      "SOUND": 2106, //语音
      "FILE": 2107 //普通文件
    };

    //上传资源类型
    var UPLOAD_RES_TYPE = {
      "IMAGE": 1, //图片
      "FILE": 2, //文件
      "SHORT_VIDEO": 3, //短视频
      "SOUND": 4 //语音，PTT
    };

    //版本号，用于上传图片或文件接口
    var VERSION_INFO = {
      'APP_VERSION': '2.1', //应用版本号
      'SERVER_VERSION': 1 //服务端版本号
    };

    //长轮询消息类型
    var LONG_POLLINNG_EVENT_TYPE = {
      "C2C": 1 //新的c2c消息通知
      , "GROUP_COMMON": 3 //新的群普通消息
      , "GROUP_TIP": 4 //新的群提示消息
      , "GROUP_SYSTEM": 5 //新的群系统消息
      , "GROUP_TIP2": 6 //新的群提示消息2
      , "FRIEND_NOTICE": 7 //好友系统通知
      , "PROFILE_NOTICE": 8 //资料系统通知
      , "C2C_COMMON": 9 //新的C2C消息
      , "C2C_EVENT": 10 };


    //c2c消息子类型
    var C2C_MSG_SUB_TYPE = {
      "COMMON": 0 //普通消息
    };
    //c2c消息子类型
    var C2C_EVENT_SUB_TYPE = {
      "READED": 92 //已读消息同步
    };

    //群消息子类型
    var GROUP_MSG_SUB_TYPE = {
      "COMMON": 0, //普通消息
      "LOVEMSG": 1, //点赞消息
      "TIP": 2, //提示消息
      "REDPACKET": 3 //红包消息
    };

    //群消息优先级类型
    var GROUP_MSG_PRIORITY_TYPE = {
      "REDPACKET": 1, //红包消息
      "COMMON": 2, //普通消息
      "LOVEMSG": 3 //点赞消息
    };

    //群提示消息类型
    var GROUP_TIP_TYPE = {
      "JOIN": 1, //加入群组
      "QUIT": 2, //退出群组
      "KICK": 3, //被踢出群组
      "SET_ADMIN": 4, //被设置为管理员
      "CANCEL_ADMIN": 5, //被取消管理员
      "MODIFY_GROUP_INFO": 6, //修改群资料
      "MODIFY_MEMBER_INFO": 7 //修改群成员信息
    };

    //群提示消息-群资料变更类型
    var GROUP_TIP_MODIFY_GROUP_INFO_TYPE = {
      "FACE_URL": 1, //修改群头像URL
      "NAME": 2, //修改群名称
      "OWNER": 3, //修改群主
      "NOTIFICATION": 4, //修改群公告
      "INTRODUCTION": 5 //修改群简介
    };

    //群系统消息类型
    var GROUP_SYSTEM_TYPE = {
      "JOIN_GROUP_REQUEST": 1, //申请加群请求（只有管理员会收到）
      "JOIN_GROUP_ACCEPT": 2, //申请加群被同意（只有申请人能够收到）
      "JOIN_GROUP_REFUSE": 3, //申请加群被拒绝（只有申请人能够收到）
      "KICK": 4, //被管理员踢出群(只有被踢者接收到)
      "DESTORY": 5, //群被解散(全员接收)
      "CREATE": 6, //创建群(创建者接收, 不展示)
      "INVITED_JOIN_GROUP_REQUEST": 7, //邀请加群(被邀请者接收)
      "QUIT": 8, //主动退群(主动退出者接收, 不展示)
      "SET_ADMIN": 9, //设置管理员(被设置者接收)
      "CANCEL_ADMIN": 10, //取消管理员(被取消者接收)
      "REVOKE": 11, //群已被回收(全员接收, 不展示)
      "READED": 15, //群消息已读同步
      "CUSTOM": 255 //用户自定义通知(默认全员接收)
    };

    //好友系统通知子类型
    var FRIEND_NOTICE_TYPE = {
      "FRIEND_ADD": 1, //好友表增加
      "FRIEND_DELETE": 2, //好友表删除
      "PENDENCY_ADD": 3, //未决增加
      "PENDENCY_DELETE": 4, //未决删除
      "BLACK_LIST_ADD": 5, //黑名单增加
      "BLACK_LIST_DELETE": 6, //黑名单删除
      "PENDENCY_REPORT": 7, //未决已读上报
      "FRIEND_UPDATE": 8 //好友数据更新
    };

    //资料系统通知子类型
    var PROFILE_NOTICE_TYPE = {
      "PROFILE_MODIFY": 1 //资料修改
    };

    //腾讯登录服务错误码（用于托管模式）
    var TLS_ERROR_CODE = {
      'OK': 0, //成功
      'SIGNATURE_EXPIRATION': 11 //用户身份凭证过期
    };

    //长轮询连接状态
    var CONNECTION_STATUS = {
      'INIT': -1, //初始化
      'ON': 0, //连接正常
      'RECONNECT': 1, //连接恢复正常
      'OFF': 9999 //连接已断开,可能是用户网络问题，或者长轮询接口报错引起的
    };

    var UPLOAD_PIC_BUSSINESS_TYPE = { //图片业务类型
      'GROUP_MSG': 1, //私聊图片
      'C2C_MSG': 2, //群聊图片
      'USER_HEAD': 3, //用户头像
      'GROUP_HEAD': 4 //群头像
    };

    var FRIEND_WRITE_MSG_ACTION = { //好友输入消息状态
      'ING': 14, //正在输入
      'STOP': 15 //停止输入
    };

    //ajax默认超时时间，单位：毫秒
    var ajaxDefaultTimeOut = 15000;

    //大群长轮询接口返回正常时，延时一定时间再发起下一次请求
    var OK_DELAY_TIME = 1000;

    //大群长轮询接口发生错误时，延时一定时间再发起下一次请求
    var ERROR_DELAY_TIME = 5000;

    //群提示消息最多显示人数
    var GROUP_TIP_MAX_USER_COUNT = 10;

    //长轮询连接状态
    var curLongPollingStatus = CONNECTION_STATUS.INIT;

    //当长轮询连接断开后，是否已经回调过
    var longPollingOffCallbackFlag = false;

    //当前长轮询返回错误次数
    var curLongPollingRetErrorCount = 0;

    //长轮询默认超时时间，单位：毫秒
    var longPollingDefaultTimeOut = 60000;

    //长轮询返回错误次数达到一定值后，发起新的长轮询请求间隔时间，单位：毫秒
    var longPollingIntervalTime = 5000;

    //没有新消息时，长轮询返回60008错误码是正常的
    var longPollingTimeOutErrorCode = 60008;

    //多实例登录被kick的错误码
    var longPollingKickedErrorCode = 91101;

    var LongPollingId = null;

    //当前大群长轮询返回错误次数
    var curBigGroupLongPollingRetErrorCount = 0;

    //最大允许长轮询返回错误次数
    var LONG_POLLING_MAX_RET_ERROR_COUNT = 10;

    //上传重试累计
    var Upload_Retry_Times = 0;
    //最大上传重试
    var Upload_Retry_Max_Times = 20;

    //ie7/8/9采用jsonp方法解决ajax跨域限制
    var jsonpRequestId = 0; //jsonp请求id
    //最新jsonp请求返回的json数据
    var jsonpLastRspData = null;
    //兼容ie7/8/9,jsonp回调函数
    var jsonpCallback = null;

    var uploadResultIframeId = 0; //用于上传图片的iframe id

    var ipList = []; //文件下载地址
    var authkey = null; //文件下载票据
    var expireTime = null; //文件下载票据超时时间

    //错误码
    var ERROR = {};


    var app = getApp();


    //当前登录用户 
    // var ctx = {
    //      sdkAppID:  app.globalData.ctx.sdkAppID ||  null,
    //      appIDAt3rd: app.globalData.ctx.appIDAt3rd ||  null,
    //      accountType: app.globalData.ctx.accountType ||  null,
    //      identifier: app.globalData.ctx.identifier ||  null,
    //      tinyid: app.globalData.ctx.tinyid ||  null,
    //      identifierNick: app.globalData.ctx.identifierNick ||  null,
    //      userSig: app.globalData.ctx.userSig ||  null,
    //      a2: app.globalData.ctx.a2 ||  null,
    //      contentType: app.globalData.ctx.contentType || 'json',
    //      apn: app.globalData.ctx.apn || 1
    //  };
    var ctx = {
      sdkAppID: null,
      appIDAt3rd: null,
      accountType: null,
      identifier: null,
      tinyid: null,
      identifierNick: null,
      userSig: null,
      a2: null,
      contentType: 'json',
      apn: 1 };

    var opt = {};
    var xmlHttpObjSeq = 0; //ajax请求id
    var xmlHttpObjMap = {}; //发起的ajax请求
    var curSeq = 0; //消息seq
    var tempC2CMsgList = []; //新c2c消息临时缓存
    var tempC2CHistoryMsgList = []; //漫游c2c消息临时缓存

    var maxApiReportItemCount = 20; //一次最多上报条数
    var apiReportItems = []; //暂存api接口质量上报数据

    var Resources = {
      downloadMap: {} };


    //表情标识字符和索引映射关系对象，用户可以自定义
    var emotionDataIndexs = {
      "[惊讶]": 0,
      "[撇嘴]": 1,
      "[色]": 2,
      "[发呆]": 3,
      "[得意]": 4,
      "[流泪]": 5,
      "[害羞]": 6,
      "[闭嘴]": 7,
      "[睡]": 8,
      "[大哭]": 9,
      "[尴尬]": 10,
      "[发怒]": 11,
      "[调皮]": 12,
      "[龇牙]": 13,
      "[微笑]": 14,
      "[难过]": 15,
      "[酷]": 16,
      "[冷汗]": 17,
      "[抓狂]": 18,
      "[吐]": 19,
      "[偷笑]": 20,
      "[可爱]": 21,
      "[白眼]": 22,
      "[傲慢]": 23,
      "[饿]": 24,
      "[困]": 25,
      "[惊恐]": 26,
      "[流汗]": 27,
      "[憨笑]": 28,
      "[大兵]": 29,
      "[奋斗]": 30,
      "[咒骂]": 31,
      "[疑问]": 32,
      "[嘘]": 33,
      "[晕]": 34 };


    //表情对象，用户可以自定义
    var emotions = {};
    //工具类
    var tool = new function () {

      //格式化时间戳
      //format格式如下：
      //yyyy-MM-dd hh:mm:ss 年月日时分秒(默认格式)
      //yyyy-MM-dd 年月日
      //hh:mm:ss 时分秒
      this.formatTimeStamp = function (timestamp, format) {
        if (!timestamp) {
          return 0;
        }
        var formatTime;
        format = format || 'yyyy-MM-dd hh:mm:ss';
        var date = new Date(timestamp * 1000);
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds() //秒
        };
        if (/(y+)/.test(format)) {
          formatTime = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        } else {
          formatTime = format;
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(formatTime))
          formatTime = formatTime.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return formatTime;
      };

      //根据群类型英文名转换成中文名
      this.groupTypeEn2Ch = function (type_en) {
        var type_ch = null;
        switch (type_en) {
          case 'Public':
            type_ch = '公开群';
            break;
          case 'ChatRoom':
            type_ch = '聊天室';
            break;
          case 'Private':
            type_ch = '讨论组';
            break;
          case 'AVChatRoom':
            type_ch = '直播聊天室';
            break;
          default:
            type_ch = type_en;
            break;}

        return type_ch;
      };
      //根据群类型中文名转换成英文名
      this.groupTypeCh2En = function (type_ch) {
        var type_en = null;
        switch (type_ch) {
          case '公开群':
            type_en = 'Public';
            break;
          case '聊天室':
            type_en = 'ChatRoom';
            break;
          case '讨论组':
            type_en = 'Private';
            break;
          case '直播聊天室':
            type_en = 'AVChatRoom';
            break;
          default:
            type_en = type_ch;
            break;}

        return type_en;
      };
      //根据群身份英文名转换成群身份中文名
      this.groupRoleEn2Ch = function (role_en) {
        var role_ch = null;
        switch (role_en) {
          case 'Member':
            role_ch = '成员';
            break;
          case 'Admin':
            role_ch = '管理员';
            break;
          case 'Owner':
            role_ch = '群主';
            break;
          default:
            role_ch = role_en;
            break;}

        return role_ch;
      };
      //根据群身份中文名转换成群身份英文名
      this.groupRoleCh2En = function (role_ch) {
        var role_en = null;
        switch (role_ch) {
          case '成员':
            role_en = 'Member';
            break;
          case '管理员':
            role_en = 'Admin';
            break;
          case '群主':
            role_en = 'Owner';
            break;
          default:
            role_en = role_ch;
            break;}

        return role_en;
      };
      //根据群消息提示类型英文转换中文
      this.groupMsgFlagEn2Ch = function (msg_flag_en) {
        var msg_flag_ch = null;
        switch (msg_flag_en) {
          case 'AcceptAndNotify':
            msg_flag_ch = '接收并提示';
            break;
          case 'AcceptNotNotify':
            msg_flag_ch = '接收不提示';
            break;
          case 'Discard':
            msg_flag_ch = '屏蔽';
            break;
          default:
            msg_flag_ch = msg_flag_en;
            break;}

        return msg_flag_ch;
      };
      //根据群消息提示类型中文名转换英文名
      this.groupMsgFlagCh2En = function (msg_flag_ch) {
        var msg_flag_en = null;
        switch (msg_flag_ch) {
          case '接收并提示':
            msg_flag_en = 'AcceptAndNotify';
            break;
          case '接收不提示':
            msg_flag_en = 'AcceptNotNotify';
            break;
          case '屏蔽':
            msg_flag_en = 'Discard';
            break;
          default:
            msg_flag_en = msg_flag_ch;
            break;}

        return msg_flag_en;
      };
      //将空格和换行符转换成HTML标签
      this.formatText2Html = function (text) {
        var html = text;
        if (html) {
          html = this.xssFilter(html); //用户昵称或群名称等字段会出现脚本字符串
          html = html.replace(/ /g, "&nbsp;");
          html = html.replace(/\n/g, "<br/>");
        }
        return html;
      };
      //将HTML标签转换成空格和换行符
      this.formatHtml2Text = function (html) {
        var text = html;
        if (text) {
          text = text.replace(/&nbsp;/g, " ");
          text = text.replace(/<br\/>/g, "\n");
        }
        return text;
      };
      //获取字符串(UTF-8编码)所占字节数
      //参考：http://zh.wikipedia.org/zh-cn/UTF-8
      this.getStrBytes = function (str) {
        if (str == null || str === undefined) return 0;
        if (typeof str != "string") {
          return 0;
        }
        var total = 0,charCode,i,len;
        for (i = 0, len = str.length; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode <= 0x007f) {
            total += 1; //字符代码在000000 – 00007F之间的，用一个字节编码
          } else if (charCode <= 0x07ff) {
            total += 2; //000080 – 0007FF之间的字符用两个字节
          } else if (charCode <= 0xffff) {
            total += 3; //000800 – 00D7FF 和 00E000 – 00FFFF之间的用三个字节，注: Unicode在范围 D800-DFFF 中不存在任何字符
          } else {
            total += 4; //010000 – 10FFFF之间的用4个字节
          }
        }
        return total;
      };


      //防止XSS攻击
      this.xssFilter = function (val) {
        val = val.toString();
        val = val.replace(/[<]/g, "&lt;");
        val = val.replace(/[>]/g, "&gt;");
        val = val.replace(/"/g, "&quot;");
        //val = val.replace(/'/g, "&#039;");
        return val;
      };

      //去掉头尾空白符
      this.trimStr = function (str) {
        if (!str) return '';
        str = str.toString();
        return str.replace(/(^\s*)|(\s*$)/g, "");
      };
      //判断是否为8位整数
      this.validNumber = function (str) {
        str = str.toString();
        return str.match(/(^\d{1,8}$)/g);
      };
      this.getReturnError = function (errorInfo, errorCode) {
        if (!errorCode) {
          errorCode = -100;
        }
        var error = {
          'ActionStatus': ACTION_STATUS.FAIL,
          'ErrorCode': errorCode,
          'ErrorInfo': errorInfo + "[" + errorCode + "]" };

        return error;
      };
      //设置cookie
      //name 名字
      //value 值
      //expires 有效期(单位：秒)
      //path
      //domain 作用域
      this.setCookie = function (name, value, expires, path, domain) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      };
      //获取cookie
      this.getCookie = function (name) {
        var result = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (result != null) {
          return unescape(result[2]);
        }
        return null;
      };
      //删除cookie
      this.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var value = this.getCookie(name);
        if (value != null)
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      };
      //根据名字获取url参数值
      this.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      };

    }();

    //日志对象
    var log = new function () {

      var on = true;

      this.setOn = function (onFlag) {
        on = onFlag;
      };

      this.getOn = function () {
        return on;
      };

      this.error = function (logStr) {
        try {
          on && console.error(logStr);
        } catch (e) {
        }
      };
      this.warn = function (logStr) {
        try {
          on && console.warn(logStr);
        } catch (e) {
        }
      };
      this.info = function (logStr) {
        try {
          on && console.info(logStr);
        } catch (e) {
        }
      };
      this.debug = function (logStr) {
        try {
          on && console.debug(logStr);
        } catch (e) {
        }
      };
    }();
    //获取unix时间戳
    var unixtime = function unixtime(d) {
      if (!d) d = new Date();
      return Math.round(d.getTime() / 1000);
    };
    //时间戳转日期
    var fromunixtime = function fromunixtime(t) {
      return new Date(t * 1000);
    };
    //获取下一个消息序号
    var nextSeq = function nextSeq() {
      if (curSeq) {
        curSeq = curSeq + 1;
      } else {
        curSeq = Math.round(Math.random() * 10000000);
      }
      return curSeq;
    };
    //产生随机数
    var createRandom = function createRandom() {
      return Math.round(Math.random() * 4294967296);
    };

    //发起ajax请求
    var ajaxRequest = function ajaxRequest(meth, url, req, timeout, isLongPolling, cbOk, cbErr) {
      reqSeq++;
      reqNum++;
      // console.log('IM reqNum: ',reqNum);
      xmlHttpObjMap[xmlHttpObjSeq++] = wx.request({
        url: url + "&reqSeq=" + reqSeq,
        data: req,
        dataType: 'json',
        method: meth,
        header: {
          'Content-Type': 'application/json' },

        success: function success(res) {
          reqNum--;
          // console.log('IM complete reqNum: ',reqNum);
          curLongPollingRetErrorCount = curBigGroupLongPollingRetErrorCount = 0;
          if (cbOk) cbOk(res.data);

        },
        fail: function fail(res) {
          reqNum--;
          // console.log('IM complete reqNum: ',reqNum);
          setTimeout(function () {
            // console.log('IM请求服务器失败:'+reqSeq,url,req,res);
            var errInfo = "请求服务器失败,请检查你的网络是否正常";
            var error = tool.getReturnError(errInfo, -2);
            //if (!isLongPolling && cbErr) cbErr(error);
            if (cbErr) cbErr(error);
          }, 16);
        } });

    };
    //发起ajax请求（json格式数据）
    var ajaxRequestJson = function ajaxRequestJson(meth, url, req, timeout, isLongPolling, cbOk, cbErr) {
      ajaxRequest(meth, url, JSON.stringify(req), timeout, isLongPolling, function (resp) {
        var json = null;
        //if (resp) eval('json=('+resp+');');//将返回的json字符串转换成json对象
        //if (resp) json=eval('('+resp+')');//将返回的json字符串转换成json对象
        if (resp) json = resp; //将返回的json字符串转换成json对象
        if (cbOk) cbOk(json);
      }, cbErr);
    };
    //判断用户是否已登录
    var isLogin = function isLogin() {
      ctx.sdkAppID = app.globalData.accountInfo.sdkAppID;
      ctx.identifier = app.globalData.accountInfo.userID;
      // console.log('ctx.sdkAppID',ctx.sdkAppID,ctx.identifier)
      // console.log(app.globalData.accountInfo)
      // console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

      return ctx.sdkAppID && ctx.identifier;
    };
    //检查是否登录
    var checkLogin = function checkLogin(cbErr, isNeedCallBack) {
      if (!isLogin()) {
        if (isNeedCallBack) {
          var errInfo = "请登录";
          var error = tool.getReturnError(errInfo, -4);

          if (cbErr) cbErr(error);
        }
        return false;
      }
      return true;
    };

    //检查是否访问正式环境
    var isAccessFormalEnv = function isAccessFormalEnv() {
      return isAccessFormaEnvironment;
    };

    //根据不同的服务名和命令，获取对应的接口地址
    var getApiUrl = function getApiUrl(srvName, cmd, cbOk, cbErr) {
      var srvHost = SRV_HOST;
      if (isAccessFormalEnv()) {
        srvHost = SRV_HOST.FORMAL.COMMON;
      } else {
        srvHost = SRV_HOST.TEST.COMMON;
      }

      //if (srvName == SRV_NAME.RECENT_CONTACT) {
      //    srvHost = SRV_HOST.TEST.COMMON;
      //}

      if (srvName == SRV_NAME.PIC) {
        if (isAccessFormalEnv()) {
          srvHost = SRV_HOST.FORMAL.PIC;
        } else {
          srvHost = SRV_HOST.TEST.PIC;
        }
      }

      var url = srvHost + '/' + SRV_NAME_VER[srvName] + '/' + srvName + '/' + cmd + '?websdkappid=' + SDK.APPID + "&v=" + SDK.VERSION;

      if (isLogin()) {

        ctx.identifier = app.globalData.ctx.identifier;
        ctx.userSig = app.globalData.ctx.userSig;

        if (cmd == 'login') {
          url += '&identifier=' + encodeURIComponent(ctx.identifier) + '&usersig=' + ctx.userSig;
        } else {

          ctx.tinyid = app.globalData.ctx.tinyid;
          ctx.a2 = app.globalData.ctx.a2;

          if (ctx.tinyid && ctx.a2) {
            url += '&tinyid=' + ctx.tinyid + '&a2=' + ctx.a2;
          } else {
            if (cbErr) {
              log.error("tinyid或a2为空[" + srvName + "][" + cmd + "]");
              cbErr(tool.getReturnError("tinyid或a2为空[" + srvName + "][" + cmd + "]", -5));
              return false;
            }
          }
        }

        ctx.contentType = app.globalData.ctx.contentType;

        url += '&contenttype=' + ctx.contentType;
      }

      ctx.sdkAppID = app.globalData.ctx.sdkAppID;
      ctx.accountType = app.globalData.ctx.accountType;
      ctx.apn = app.globalData.ctx.apn;

      url += '&sdkappid=' + ctx.sdkAppID + '&accounttype=' + ctx.accountType + '&apn=' + ctx.apn + '&reqtime=' + unixtime();
      return url;
    };

    //获取语音下载url
    var getSoundDownUrl = function getSoundDownUrl(uuid, senderId) {
      var soundUrl = null;
      if (authkey && ipList[0]) {
        soundUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.SOUND + "&openid=" + senderId + "&ver=0";
      } else {
        log.error("拼接语音下载url不报错：ip或者authkey为空");
      }
      return soundUrl;
    };

    //获取文件下载地址
    var getFileDownUrl = function getFileDownUrl(uuid, senderId, fileName) {
      var fileUrl = null;
      if (authkey && ipList[0]) {
        fileUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.FILE + "&openid=" + senderId + "&ver=0&filename=" + encodeURIComponent(fileName);
      } else {
        log.error("拼接文件下载url不报错：ip或者authkey为空");
      }
      Resources.downloadMap["uuid_" + uuid] = fileUrl;
      return fileUrl;
    };

    //获取文件下载地址
    var getFileDownUrlV2 = function getFileDownUrlV2(uuid, senderId, fileName, downFlag, receiverId, busiId, type) {
      var options = {
        "From_Account": senderId, //"identifer_0",       // 类型: String, 发送者tinyid
        "To_Account": receiverId, //"identifer_1",         // 类型: String, 接收者tinyid
        "os_platform": 10, // 类型: Number, 终端的类型 1(android) 2(ios) 3(windows) 10(others...)
        "Timestamp": unixtime().toString(), // 类型: Number, 时间戳
        "Random": createRandom().toString(), // 类型: Number, 随机值
        "request_info": [// 类型: Array
        {
          "busi_id": busiId, // 类型: Number, 群(1) C2C(2) 其他请联系sdk开发者分配
          "download_flag": downFlag, // 类型: Number, 申请下载地址标识  0(申请架平下载地址)  1(申请COS平台下载地址)  2(不需要申请, 直接拿url下载(这里应该不会为2))
          "type": type, // 类型: Number, 0(短视频缩略图), 1(文件), 2(短视频), 3(ptt), 其他待分配
          "uuid": uuid, // 类型: Number, 唯一标识一个文件的uuid
          "version": VERSION_INFO.SERVER_VERSION, // 类型: Number, 架平server版本
          "auth_key": authkey, // 类型: String, 认证签名
          "ip": ipList[0] // 类型: Number, 架平IP
        }] };


      //获取下载地址
      proto_applyDownload(options, function (resp) {
        if (resp.error_code == 0 && resp.response_info) {
          Resources.downloadMap["uuid_" + options.uuid] = resp.response_info.url;
        }
        if (onAppliedDownloadUrl) {
          onAppliedDownloadUrl({
            uuid: options.uuid,
            url: resp.response_info.url,
            maps: Resources.downloadMap });

        }
      }, function (resp) {
        log.error("获取下载地址失败", options.uuid);
      });
    };


    //重置ajax请求
    var clearXmlHttpObjMap = function clearXmlHttpObjMap() {
      //遍历xmlHttpObjMap{}
      for (var seq in xmlHttpObjMap) {
        var xmlHttpObj = xmlHttpObjMap[seq];
        if (xmlHttpObj) {
          xmlHttpObj.abort(); //中断ajax请求(长轮询)
          xmlHttpObjMap[xmlHttpObjSeq] = null; //清空
        }
      }
      xmlHttpObjSeq = 0;
      xmlHttpObjMap = {};
    };

    //重置sdk全局变量
    var clearSdk = function clearSdk() {

      clearXmlHttpObjMap();

      //当前登录用户
      ctx = {
        sdkAppID: null,
        appIDAt3rd: null,
        accountType: null,
        identifier: null,
        identifierNick: null,
        userSig: null,
        contentType: 'json',
        apn: 1 };

      opt = {};

      curSeq = 0;

      //ie8,9采用jsonp方法解决ajax跨域限制
      jsonpRequestId = 0; //jsonp请求id
      //最新jsonp请求返回的json数据
      jsonpLastRspData = null;

      apiReportItems = [];

      MsgManager.clear();

      //重置longpollingId 
      LongPollingId = null;
    };

    //登录
    var _login = function _login(loginInfo, listeners, options, cbOk, cbErr) {

      clearSdk();

      if (options) opt = options;
      if (opt.isAccessFormalEnv == false) {
        log.error("请切换为正式环境");
        isAccessFormaEnvironment = opt.isAccessFormalEnv;
      }
      if (opt.isLogOn == false) {
        log.setOn(opt.isLogOn);
      }
      /*
         if(opt.emotions){
         emotions=opt.emotions;
         webim.Emotions= emotions;
         }
         if(opt.emotionDataIndexs){
         emotionDataIndexs=opt.emotionDataIndexs;
         webim.EmotionDataIndexs= emotionDataIndexs;
         }*/

      if (!loginInfo) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo is empty", -6));
          return;
        }
      }
      if (!loginInfo.sdkAppID) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.sdkAppID is empty", -7));
          return;
        }
      }
      if (!loginInfo.accountType) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.accountType is empty", -8));
          return;
        }
      }

      if (loginInfo.identifier) {
        ctx.identifier = loginInfo.identifier.toString();

        app.globalData.ctx.identifier = loginInfo.identifier.toString();

      }
      if (loginInfo.identifier && !loginInfo.userSig) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.userSig is empty", -9));
          return;
        }
      }
      if (loginInfo.userSig) {
        ctx.userSig = loginInfo.userSig.toString();


        app.globalData.ctx.userSig = loginInfo.userSig.toString();

      }
      ctx.sdkAppID = loginInfo.sdkAppID;
      ctx.accountType = loginInfo.accountType;


      app.globalData.ctx.sdkAppID = loginInfo.sdkAppID;
      app.globalData.ctx.accountType = loginInfo.accountType;

      app.globalData.listeners = listeners;


      if (ctx.identifier && ctx.userSig) {//带登录态
        //登录
        proto_login(
        function (identifierNick, headurl) {
          MsgManager.init(
          listeners,
          function (mmInitResp) {
            if (cbOk) {
              mmInitResp.identifierNick = identifierNick;
              mmInitResp.headurl = headurl;
              cbOk(mmInitResp);
            }
          }, cbErr);

        },
        cbErr);

      } else {//不带登录态，进入直播场景sdk
        MsgManager.init(
        listeners,
        cbOk,
        cbErr);

      }
    };

    //初始化浏览器信息
    var initBrowserInfo = function initBrowserInfo() {
      //初始化浏览器类型
      BROWSER_INFO = "wechat";
    };

    //接口质量上报
    var reportApiQuality = function reportApiQuality(cmd, errorCode, errorInfo) {
      if (cmd == 'longpolling' && (errorCode == longPollingTimeOutErrorCode || errorCode == longPollingKickedErrorCode)) {//longpolling 返回60008错误可以视为正常,可以不上报
        return;
      }
      var eventId = CMD_EVENT_ID_MAP[cmd];
      if (eventId) {
        var reportTime = unixtime();
        var uniqKey = null;
        var msgCmdErrorCode = {
          'Code': errorCode,
          'ErrMsg': errorInfo };

        if (ctx.a2) {
          uniqKey = ctx.a2.substring(0, 10) + "_" + reportTime + "_" + createRandom();
        } else if (ctx.userSig) {
          uniqKey = ctx.userSig.substring(0, 10) + "_" + reportTime + "_" + createRandom();
        }

        if (uniqKey) {

          var rptEvtItem = {
            "UniqKey": uniqKey,
            "EventId": eventId,
            "ReportTime": reportTime,
            "MsgCmdErrorCode": msgCmdErrorCode };


          if (cmd == 'login') {
            var loginApiReportItems = [];
            loginApiReportItems.push(rptEvtItem);
            var loginReportOpt = {
              "EvtItems": loginApiReportItems,
              "MainVersion": SDK.VERSION,
              "Version": "0" };

            proto_reportApiQuality(loginReportOpt,
            function (resp) {
              loginApiReportItems = null; //
            },
            function (err) {
              loginApiReportItems = null; //
            });

          } else {
            apiReportItems.push(rptEvtItem);
            if (apiReportItems.length >= maxApiReportItemCount) {//累计一定条数再上报
              var reportOpt = {
                "EvtItems": apiReportItems,
                "MainVersion": SDK.VERSION,
                "Version": "0" };

              proto_reportApiQuality(reportOpt,
              function (resp) {
                apiReportItems = []; //清空
              },
              function (err) {
                apiReportItems = []; //清空
              });

            }
          }

        }
      }
    };

    // REST API calls
    //上线
    var proto_login = function proto_login(cbOk, cbErr) {
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "login", { "State": "Online" },
      function (loginResp) {
        if (loginResp.TinyId) {
          ctx.tinyid = loginResp.TinyId;


          app.globalData.ctx.tinyid = loginResp.TinyId;

        } else {
          if (cbErr) {
            cbErr(tool.getReturnError("TinyId is empty", -10));
            return;
          }
        }
        if (loginResp.A2Key) {
          ctx.a2 = loginResp.A2Key;


          app.globalData.ctx.a2 = loginResp.A2Key;

        } else {
          if (cbErr) {
            cbErr(tool.getReturnError("A2Key is empty", -11));
            return;
          }
        }
        var tag_list = [
        "Tag_Profile_IM_Nick",
        "Tag_Profile_IM_Image"];



        ctx.identifier = app.globalData.ctx.identifier;

        var options = {
          'From_Account': ctx.identifier,
          'To_Account': [ctx.identifier],
          'LastStandardSequence': 0,
          'TagList': tag_list };

        proto_getProfilePortrait(
        options,
        function (resp) {
          var nick, gender, allowType, image;
          if (resp.UserProfileItem && resp.UserProfileItem.length > 0) {
            for (var i in resp.UserProfileItem) {
              for (var j in resp.UserProfileItem[i].ProfileItem) {
                switch (resp.UserProfileItem[i].ProfileItem[j].Tag) {
                  case 'Tag_Profile_IM_Nick':
                    nick = resp.UserProfileItem[i].ProfileItem[j].Value;
                    if (nick)
                    ctx.identifierNick = nick;
                    app.globalData.ctx.identifierNick = nick;
                    break;
                  case 'Tag_Profile_IM_Image':
                    image = resp.UserProfileItem[i].ProfileItem[j].Value;
                    if (image) ctx.headurl = image;
                    app.globalData.ctx.headurl = image;
                    break;}

              }
            }
          }
          if (cbOk) cbOk(ctx.identifierNick, ctx.headurl); //回传当前用户昵称
        }, cbErr);
      },
      cbErr);
    };
    //下线
    var proto_logout = function proto_logout(type, cbOk, cbErr) {
      if (!checkLogin(cbErr, false)) {//不带登录态
        clearSdk();
        if (cbOk) cbOk({
          'ActionStatus': ACTION_STATUS.OK,
          'ErrorCode': 0,
          'ErrorInfo': 'logout success' });

        return;
      }
      if (type == "all") {
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "logout", {},
        function (resp) {
          clearSdk();
          if (cbOk) cbOk(resp);
        },
        cbErr);
      } else {
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpollinglogout", { LongPollingId: LongPollingId },
        function (resp) {
          clearSdk();
          if (cbOk) cbOk(resp);
        },
        cbErr);
      }
    };
    //发送消息，包括私聊和群聊
    var proto_sendMsg = function proto_sendMsg(msg, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var msgInfo = {
        'MsgBody': [] };

      ctx.identifier = app.globalData.ctx.identifier;
      switch (msg.sess.type()) {
        case SESSION_TYPE.C2C:
          msgInfo = {
            'From_Account': ctx.identifier,
            'To_Account': msg.sess.id().toString(),
            'MsgTimeStamp': msg.time,
            'MsgSeq': msg.seq,
            'MsgRandom': msg.random,
            'MsgBody': [] };

          break;
        case SESSION_TYPE.GROUP:
          var subType = msg.getSubType();
          msgInfo = {
            'GroupId': msg.sess.id().toString(),
            'From_Account': ctx.identifier,
            'Random': msg.random,
            'MsgBody': [] };

          switch (subType) {
            case GROUP_MSG_SUB_TYPE.COMMON:
              msgInfo.MsgPriority = "COMMON";
              break;
            case GROUP_MSG_SUB_TYPE.REDPACKET:
              msgInfo.MsgPriority = "REDPACKET";
              break;
            case GROUP_MSG_SUB_TYPE.LOVEMSG:
              msgInfo.MsgPriority = "LOVEMSG";
              break;
            case GROUP_MSG_SUB_TYPE.TIP:
              log.error("不能主动发送群提示消息,subType=" + subType);
              break;
            default:
              log.error("发送群消息时，出现未知子消息类型：subType=" + subType);
              return;
              break;}

          break;
        default:
          break;}

      for (var i in msg.elems) {
        var elem = msg.elems[i];
        var msgContent = null;
        var msgType = elem.type;
        switch (msgType) {
          case MSG_ELEMENT_TYPE.TEXT: //文本
            msgContent = { 'Text': elem.content.text };
            break;
          case MSG_ELEMENT_TYPE.FACE: //表情
            msgContent = { 'Index': elem.content.index, 'Data': elem.content.data };
            break;
          case MSG_ELEMENT_TYPE.IMAGE: //图片
            var ImageInfoArray = [];
            for (var j in elem.content.ImageInfoArray) {
              ImageInfoArray.push(
              {
                'Type': elem.content.ImageInfoArray[j].type,
                'Size': elem.content.ImageInfoArray[j].size,
                'Width': elem.content.ImageInfoArray[j].width,
                'Height': elem.content.ImageInfoArray[j].height,
                'URL': elem.content.ImageInfoArray[j].url });


            }
            msgContent = { 'UUID': elem.content.UUID, 'ImageInfoArray': ImageInfoArray };
            break;
          case MSG_ELEMENT_TYPE.SOUND: //
            log.warn('web端暂不支持发送语音消息');
            continue;
            break;
          case MSG_ELEMENT_TYPE.LOCATION: //
            log.warn('web端暂不支持发送地理位置消息');
            continue;
            break;
          case MSG_ELEMENT_TYPE.FILE: //
            msgContent = {
              'UUID': elem.content.uuid,
              'FileName': elem.content.name,
              'FileSize': elem.content.size,
              'DownloadFlag': elem.content.downFlag };

            break;
          case MSG_ELEMENT_TYPE.CUSTOM: //
            msgContent = { 'Data': elem.content.data, 'Desc': elem.content.desc, 'Ext': elem.content.ext };
            msgType = MSG_ELEMENT_TYPE.CUSTOM;
            break;
          default:
            log.warn('web端暂不支持发送' + elem.type + '消息');
            continue;
            break;}


        if (msg.PushInfoBoolean) {
          msgInfo.OfflinePushInfo = msg.PushInfo; //当android终端进程被杀掉时才走push，IOS退到后台即可
        }

        msgInfo.MsgBody.push({
          'MsgType': msgType,
          'MsgContent': msgContent });

      }

      if (msg.sess.type() == SESSION_TYPE.C2C) {//私聊
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "sendmsg", msgInfo, cbOk, cbErr);
      } else if (msg.sess.type() == SESSION_TYPE.GROUP) {//群聊
        ConnManager.apiCall(SRV_NAME.GROUP, "send_group_msg", msgInfo, cbOk, cbErr);
      }
    };
    //长轮询接口
    var proto_longPolling = function proto_longPolling(options, cbOk, cbErr) {
      if (!isAccessFormaEnvironment && typeof stopPolling != "undefined" && stopPolling == true) {
        return;
      }
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpolling", options, cbOk, cbErr, longPollingDefaultTimeOut, true);
    };

    //长轮询接口(拉取直播聊天室新消息)
    var proto_bigGroupLongPolling = function proto_bigGroupLongPolling(options, cbOk, cbErr, timeout) {
      ConnManager.apiCall(SRV_NAME.BIG_GROUP_LONG_POLLING, "get_msg", options, cbOk, cbErr, timeout);
    };

    //拉取未读c2c消息接口
    var proto_getMsgs = function proto_getMsgs(cookie, syncFlag, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getmsg", { 'Cookie': cookie, 'SyncFlag': syncFlag },
      function (resp) {

        if (resp.MsgList && resp.MsgList.length) {
          for (var i in resp.MsgList) {
            tempC2CMsgList.push(resp.MsgList[i]);
          }
        }
        if (resp.SyncFlag == 1) {
          proto_getMsgs(resp.Cookie, resp.SyncFlag, cbOk, cbErr);
        } else {
          resp.MsgList = tempC2CMsgList;
          tempC2CMsgList = [];
          if (cbOk) cbOk(resp);
        }
      },
      cbErr);
    };
    //C2C消息已读上报接口
    var proto_c2CMsgReaded = function proto_c2CMsgReaded(cookie, c2CMsgReadedItem, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var tmpC2CMsgReadedItem = [];
      for (var i in c2CMsgReadedItem) {
        var item = {
          'To_Account': c2CMsgReadedItem[i].toAccount,
          'LastedMsgTime': c2CMsgReadedItem[i].lastedMsgTime };

        tmpC2CMsgReadedItem.push(item);
      }
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "msgreaded", {
        C2CMsgReaded: {
          'Cookie': cookie,
          'C2CMsgReadedItem': tmpC2CMsgReadedItem } },

      cbOk, cbErr);
    };

    //删除c2c消息
    var proto_deleteC2CMsg = function proto_deleteC2CMsg(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.OPEN_IM, "deletemsg", options,
      cbOk, cbErr);
    };

    //拉取c2c历史消息接口
    var proto_getC2CHistoryMsgs = function proto_getC2CHistoryMsgs(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getroammsg", options,
      function (resp) {
        var reqMsgCount = options.MaxCnt;
        var complete = resp.Complete;
        var rspMsgCount = resp.MaxCnt;
        var msgKey = resp.MsgKey;
        var lastMsgTime = resp.LastMsgTime;

        if (resp.MsgList && resp.MsgList.length) {
          for (var i in resp.MsgList) {
            tempC2CHistoryMsgList.push(resp.MsgList[i]);
          }
        }
        var netxOptions = null;
        if (complete == 0) {//还有历史消息可拉取
          if (rspMsgCount < reqMsgCount) {
            netxOptions = {
              'Peer_Account': options.Peer_Account,
              'MaxCnt': reqMsgCount - rspMsgCount,
              'LastMsgTime': lastMsgTime,
              'MsgKey': msgKey };

          }
        }

        if (netxOptions) {//继续拉取
          proto_getC2CHistoryMsgs(netxOptions, cbOk, cbErr);
        } else {
          resp.MsgList = tempC2CHistoryMsgList;
          tempC2CHistoryMsgList = [];
          if (cbOk) cbOk(resp);
        }
      },
      cbErr);
    };

    //群组接口
    //创建群组
    //协议参考：https://www.qcloud.com/doc/product/269/1615
    var proto_createGroup = function proto_createGroup(options, cbOk, cbErr) {


      if (!checkLogin(cbErr, true)) return;
      var opt = {
        //必填    群组形态，包括Public（公开群），Private（私密群），ChatRoom（聊天室），AVChatRoom（互动直播聊天室）。
        'Type': options.Type,
        //必填    群名称，最长30字节。
        'Name': options.Name };

      var member_list = [];

      //Array 选填  初始群成员列表，最多500个。成员信息字段详情参见：群成员资料。
      for (var i = 0; i < options.MemberList.length; i++) {
        member_list.push({ 'Member_Account': options.MemberList[i] });
      }
      opt.MemberList = member_list;
      //选填    为了使得群组ID更加简单，便于记忆传播，腾讯云支持APP在通过REST API创建群组时自定义群组ID。详情参见：自定义群组ID。
      if (options.GroupId) {
        opt.GroupId = options.GroupId;
      }
      //选填    群主id，自动添加到群成员中。如果不填，群没有群主。
      if (options.Owner_Account) {
        opt.Owner_Account = options.Owner_Account;
      }
      //选填    群简介，最长240字节。
      if (options.Introduction) {
        opt.Introduction = options.Introduction;
      }
      //选填    群公告，最长300字节。
      if (options.Notification) {
        opt.Notification = options.Notification;
      }
      //选填    最大群成员数量，最大为10000，不填默认为2000个。
      if (options.MaxMemberCount) {
        opt.MaxMemberCount = options.MaxMemberCount;
      }
      //选填    申请加群处理方式。包含FreeAccess（自由加入），NeedPermission（需要验证），DisableApply（禁止加群），不填默认为NeedPermission（需要验证）。
      if (options.ApplyJoinOption) {//
        opt.ApplyJoinOption = options.ApplyJoinOption;
      }
      //Array 选填  群组维度的自定义字段，默认情况是没有的，需要开通，详情参见：自定义字段。
      if (options.AppDefinedData) {
        opt.AppDefinedData = options.AppDefinedData;
      }
      //选填    群头像URL，最长100字节。
      if (options.FaceUrl) {
        opt.FaceUrl = options.FaceUrl;
      }
      ConnManager.apiCall(SRV_NAME.GROUP, "create_group", opt,
      function (resp) {
        if (resp && resp.ErrorCode == 0 && options.Type == "AVChatRoom") {
          if (resp.LongPollingKey) {
            MsgManager.resetBigGroupLongPollingInfo();
            MsgManager.setBigGroupLongPollingOn(true); //开启长轮询
            MsgManager.setBigGroupLongPollingKey(resp.LongPollingKey); //更新大群长轮询key
            MsgManager.setBigGroupLongPollingMsgMap(options.GroupId, 0); //收到的群消息置0
            MsgManager.bigGroupLongPolling(); //开启长轮询
          }
        }
        if (cbOk) cbOk(resp);
      },
      function (err) {
        if (err && err.ErrorCode == 10025 && options.Type == "AVChatRoom") {
          //群组 ID 已被使用，并且操作者为群主，可以直接使用
          if (err.LongPollingKey) {
            MsgManager.resetBigGroupLongPollingInfo();
            MsgManager.setBigGroupLongPollingOn(true); //开启长轮询
            MsgManager.setBigGroupLongPollingKey(err.LongPollingKey); //更新大群长轮询key
            MsgManager.setBigGroupLongPollingMsgMap(options.GroupId, 0); //收到的群消息置0
            MsgManager.bigGroupLongPolling(); //开启长轮询
          }
        }
        if (cbErr) cbErr(err);
      });
    };

    //创建群组-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1615
    var proto_createGroupHigh = function proto_createGroupHigh(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "create_group", options,
      cbOk, cbErr);
    };

    //修改群组基本资料
    //协议参考：https://www.qcloud.com/doc/product/269/1620
    var proto_modifyGroupBaseInfo = function proto_modifyGroupBaseInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_base_info", options,
      cbOk, cbErr);
    };

    //申请加群
    var proto_applyJoinGroup = function proto_applyJoinGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "apply_join_group", {
        'GroupId': options.GroupId,
        'ApplyMsg': options.ApplyMsg,
        'UserDefinedField': options.UserDefinedField },

      cbOk, cbErr);
    };

    //申请加入大群
    var proto_applyJoinBigGroup = function proto_applyJoinBigGroup(options, cbOk, cbErr) {
      var srvName;
      if (!checkLogin(cbErr, false)) {//未登录
        srvName = SRV_NAME.BIG_GROUP;
      } else {//已登录
        srvName = SRV_NAME.GROUP;
      }
      ConnManager.apiCall(srvName, "apply_join_group", {
        'GroupId': options.GroupId,
        'ApplyMsg': options.ApplyMsg,
        'UserDefinedField': options.UserDefinedField },

      function (resp) {
        if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
          if (resp.LongPollingKey) {
            MsgManager.resetBigGroupLongPollingInfo();
            MsgManager.setBigGroupLongPollingOn(true); //开启长轮询
            MsgManager.setBigGroupLongPollingKey(resp.LongPollingKey); //更新大群长轮询key
            MsgManager.setBigGroupLongPollingMsgMap(options.GroupId, 0); //收到的群消息置0
            MsgManager.bigGroupLongPolling(); //开启长轮询
          } else {//没有返回LongPollingKey，说明申请加的群不是直播聊天室(AVChatRoom)
            cbErr && cbErr(tool.getReturnError("The type of group is not AVChatRoom: groupid=" + options.GroupId, -12));
            return;
          }
        }
        if (cbOk) cbOk(resp);
      },
      function (err) {

        if (cbErr) cbErr(err);
      });
    };

    //处理加群申请(同意或拒绝)
    var proto_handleApplyJoinGroupPendency = function proto_handleApplyJoinGroupPendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "handle_apply_join_group", {
        'GroupId': options.GroupId,
        'Applicant_Account': options.Applicant_Account,
        'HandleMsg': options.HandleMsg,
        'Authentication': options.Authentication,
        'MsgKey': options.MsgKey,
        'ApprovalMsg': options.ApprovalMsg,
        'UserDefinedField': options.UserDefinedField },

      cbOk,
      function (err) {
        if (err.ErrorCode == 10024) {//apply has be handled
          if (cbOk) {
            var resp = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0,
              'ErrorInfo': '该申请已经被处理过' };

            cbOk(resp);
          }
        } else {
          if (cbErr) cbErr(err);
        }
      });

    };

    //主动退群
    var proto_quitGroup = function proto_quitGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "quit_group", {
        'GroupId': options.GroupId },

      cbOk, cbErr);
    };

    //退出大群
    var proto_quitBigGroup = function proto_quitBigGroup(options, cbOk, cbErr) {
      var srvName;
      if (!checkLogin(cbErr, false)) {//未登录
        srvName = SRV_NAME.BIG_GROUP;
      } else {//已登录
        srvName = SRV_NAME.GROUP;
      }
      MsgManager.resetBigGroupLongPollingInfo();
      ConnManager.apiCall(srvName, "quit_group",
      { 'GroupId': options.GroupId },
      function (resp) {
        //重置当前再请求中的ajax
        //clearXmlHttpObjMap();
        //退出大群成功之后需要重置长轮询信息
        MsgManager.resetBigGroupLongPollingInfo();
        if (cbOk) cbOk(resp);
      },
      cbErr);
    };
    //查找群(按名称)
    var proto_searchGroupByName = function proto_searchGroupByName(options, cbOk, cbErr) {
      ConnManager.apiCall(SRV_NAME.GROUP, "search_group", options, cbOk, cbErr);
    };

    //获取群组公开资料
    var proto_getGroupPublicInfo = function proto_getGroupPublicInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_public_info", {
        'GroupIdList': options.GroupIdList,
        'ResponseFilter': {
          'GroupBasePublicInfoFilter': options.GroupBasePublicInfoFilter } },


      function (resp) {
        resp.ErrorInfo = '';
        if (resp.GroupInfo) {
          for (var i in resp.GroupInfo) {
            var errorCode = resp.GroupInfo[i].ErrorCode;
            if (errorCode > 0) {
              resp.ActionStatus = ACTION_STATUS.FAIL;
              resp.GroupInfo[i].ErrorInfo = "[" + errorCode + "]" + resp.GroupInfo[i].ErrorInfo;
              resp.ErrorInfo += resp.GroupInfo[i].ErrorInfo + '\n';
            }
          }
        }
        if (resp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) {
            cbErr(resp);
          }
        } else if (cbOk) {
          cbOk(resp);
        }

      },
      cbErr);
    };

    //获取群组详细资料--高级
    //请求协议参考：https://www.qcloud.com/doc/product/269/1616
    var proto_getGroupInfo = function proto_getGroupInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      var opt = {
        'GroupIdList': options.GroupIdList,
        'ResponseFilter': {
          'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
          'MemberInfoFilter': options.MemberInfoFilter } };


      if (options.AppDefinedDataFilter_Group) {
        opt.ResponseFilter.AppDefinedDataFilter_Group = options.AppDefinedDataFilter_Group;
      }
      if (options.AppDefinedDataFilter_GroupMember) {
        opt.ResponseFilter.AppDefinedDataFilter_GroupMember = options.AppDefinedDataFilter_GroupMember;
      }
      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_info", opt,
      cbOk, cbErr);
    };

    //获取群组成员-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1617
    var proto_getGroupMemberInfo = function proto_getGroupMemberInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_member_info", {
        'GroupId': options.GroupId,
        'Offset': options.Offset,
        'Limit': options.Limit,
        'MemberInfoFilter': options.MemberInfoFilter,
        'MemberRoleFilter': options.MemberRoleFilter,
        'AppDefinedDataFilter_GroupMember': options.AppDefinedDataFilter_GroupMember },

      cbOk, cbErr);
    };


    //增加群组成员
    //协议参考：https://www.qcloud.com/doc/product/269/1621
    var proto_addGroupMember = function proto_addGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "add_group_member", {
        'GroupId': options.GroupId,
        'Silence': options.Silence,
        'MemberList': options.MemberList },

      cbOk, cbErr);
    };
    //修改群组成员资料
    //协议参考：https://www.qcloud.com/doc/product/269/1623
    var proto_modifyGroupMember = function proto_modifyGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var opt = {};
      if (options.GroupId) {
        opt.GroupId = options.GroupId;
      }
      if (options.Member_Account) {
        opt.Member_Account = options.Member_Account;
      }
      //Admin或者Member
      if (options.Role) {
        opt.Role = options.Role;
      }
      // AcceptAndNotify代表解收并提示消息，Discard代表不接收也不提示消息，AcceptNotNotify代表接收消息但不提示
      if (options.MsgFlag) {
        opt.MsgFlag = options.MsgFlag;
      }
      if (options.ShutUpTime) {//禁言时间
        opt.ShutUpTime = options.ShutUpTime;
      }
      if (options.NameCard) {//群名片,最大不超过50个字节
        opt.NameCard = options.NameCard;
      }
      if (options.AppMemberDefinedData) {//群成员维度的自定义字段，默认情况是没有的，需要开通
        opt.AppMemberDefinedData = options.AppMemberDefinedData;
      }
      ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_member_info", opt,
      cbOk, cbErr);
    };
    //删除群组成员
    //协议参考：https://www.qcloud.com/doc/product/269/1622
    var proto_deleteGroupMember = function proto_deleteGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "delete_group_member", {
        'GroupId': options.GroupId,
        'Silence': options.Silence,
        'MemberToDel_Account': options.MemberToDel_Account,
        'Reason': options.Reason },

      cbOk, cbErr);
    };
    //解散群组
    //协议参考：https://www.qcloud.com/doc/product/269/1624
    var proto_destroyGroup = function proto_destroyGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "destroy_group", {
        'GroupId': options.GroupId },

      function (resp) {
        if (options.Type == "AVChatRoom") {
          //退出大群成功之后需要重置长轮询信息
          MsgManager.resetBigGroupLongPollingInfo();
        }
        if (cbOk) cbOk(resp);
      }, cbErr);
    };
    //转让群组
    //协议参考：https://www.qcloud.com/doc/product/269/1633
    var proto_changeGroupOwner = function proto_changeGroupOwner(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "change_group_owner", options, cbOk, cbErr);
    };
    //获取用户所加入的群组-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1625
    var proto_getJoinedGroupListHigh = function proto_getJoinedGroupListHigh(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_joined_group_list", {
        'Member_Account': options.Member_Account,
        'Limit': options.Limit,
        'Offset': options.Offset,
        'GroupType': options.GroupType,
        'ResponseFilter': {
          'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
          'SelfInfoFilter': options.SelfInfoFilter } },


      cbOk, cbErr);
    };
    //查询一组UserId在群中的身份
    //协议参考：https://www.qcloud.com/doc/product/269/1626
    var proto_getRoleInGroup = function proto_getRoleInGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_role_in_group", {
        'GroupId': options.GroupId,
        'User_Account': options.User_Account },

      cbOk, cbErr);
    };
    //设置取消成员禁言时间
    //协议参考：https://www.qcloud.com/doc/product/269/1627
    var proto_forbidSendMsg = function proto_forbidSendMsg(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "forbid_send_msg", {
        'GroupId': options.GroupId,
        'Members_Account': options.Members_Account,
        'ShutUpTime': options.ShutUpTime //单位为秒，为0时表示取消禁言
      },
      cbOk, cbErr);
    };

    //发送自定义群系统通知
    var proto_sendCustomGroupNotify = function proto_sendCustomGroupNotify(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "send_group_system_notification", options,
      cbOk, cbErr);
    };

    //拉取群消息接口
    var proto_getGroupMsgs = function proto_getGroupMsgs(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "group_msg_get", {
        "GroupId": options.GroupId,
        "ReqMsgSeq": options.ReqMsgSeq,
        "ReqMsgNumber": options.ReqMsgNumber },

      cbOk, cbErr);
    };
    //群消息已读上报接口
    var proto_groupMsgReaded = function proto_groupMsgReaded(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "msg_read_report", {
        'GroupId': options.GroupId,
        'MsgReadedSeq': options.MsgReadedSeq },

      cbOk, cbErr);
    };
    //end

    //好友接口
    //处理好友接口返回的错误码
    var convertErrorEn2ZhFriend = function convertErrorEn2ZhFriend(resp) {
      var errorAccount = [];
      if (resp.Fail_Account && resp.Fail_Account.length) {
        errorAccount = resp.Fail_Account;
      }
      if (resp.Invalid_Account && resp.Invalid_Account.length) {
        for (var k in resp.Invalid_Account) {
          errorAccount.push(resp.Invalid_Account[k]);
        }
      }
      if (errorAccount.length) {
        resp.ActionStatus = ACTION_STATUS.FAIL;
        resp.ErrorCode = ERROR_CODE_CUSTOM;
        resp.ErrorInfo = '';
        for (var i in errorAccount) {
          var failCount = errorAccount[i];
          for (var j in resp.ResultItem) {
            if (resp.ResultItem[j].To_Account == failCount) {

              var resultCode = resp.ResultItem[j].ResultCode;
              resp.ResultItem[j].ResultInfo = "[" + resultCode + "]" + resp.ResultItem[j].ResultInfo;
              resp.ErrorInfo += resp.ResultItem[j].ResultInfo + "\n";
              break;
            }
          }
        }
      }
      return resp;
    };
    //添加好友
    var proto_applyAddFriend = function proto_applyAddFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;


      ctx.identifier = app.globalData.ctx.identifier;

      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_add", {
        'From_Account': ctx.identifier,
        'AddFriendItem': options.AddFriendItem },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };
    //删除好友
    var proto_deleteFriend = function proto_deleteFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;


      ctx.identifier = app.globalData.ctx.identifier;

      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_delete", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        'DeleteType': options.DeleteType },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };
    //获取好友申请
    var proto_getPendency = function proto_getPendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;


      ctx.identifier = app.globalData.ctx.identifier;

      ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_get", {
        "From_Account": ctx.identifier,
        "PendencyType": options.PendencyType,
        "StartTime": options.StartTime,
        "MaxLimited": options.MaxLimited,
        "LastSequence": options.LastSequence },

      cbOk, cbErr);
    };
    //删除好友申请
    var proto_deletePendency = function proto_deletePendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_delete", {
        "From_Account": ctx.identifier,
        "PendencyType": options.PendencyType,
        "To_Account": options.To_Account },


      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };
    //处理好友申请
    var proto_responseFriend = function proto_responseFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;



      ctx.identifier = app.globalData.ctx.identifier;

      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_response", {
        'From_Account': ctx.identifier,
        'ResponseFriendItem': options.ResponseFriendItem },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };
    //我的好友
    var proto_getAllFriend = function proto_getAllFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;


      ctx.identifier = app.globalData.ctx.identifier;

      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_get_all", {
        'From_Account': ctx.identifier,
        'TimeStamp': options.TimeStamp,
        'StartIndex': options.StartIndex,
        'GetCount': options.GetCount,
        'LastStandardSequence': options.LastStandardSequence,
        'TagList': options.TagList },

      cbOk, cbErr);
    };

    //资料接口
    //查看个人资料
    var proto_getProfilePortrait = function proto_getProfilePortrait(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;


      ctx.identifier = app.globalData.ctx.identifier;

      ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_get", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        //'LastStandardSequence':options.LastStandardSequence,
        'TagList': options.TagList },

      function (resp) {
        var errorAccount = [];
        if (resp.Fail_Account && resp.Fail_Account.length) {
          errorAccount = resp.Fail_Account;
        }
        if (resp.Invalid_Account && resp.Invalid_Account.length) {
          for (var k in resp.Invalid_Account) {
            errorAccount.push(resp.Invalid_Account[k]);
          }
        }
        if (errorAccount.length) {
          resp.ActionStatus = ACTION_STATUS.FAIL;
          resp.ErrorCode = ERROR_CODE_CUSTOM;
          resp.ErrorInfo = '';
          for (var i in errorAccount) {
            var failCount = errorAccount[i];
            for (var j in resp.UserProfileItem) {
              if (resp.UserProfileItem[j].To_Account == failCount) {
                var resultCode = resp.UserProfileItem[j].ResultCode;
                resp.UserProfileItem[j].ResultInfo = "[" + resultCode + "]" + resp.UserProfileItem[j].ResultInfo;
                resp.ErrorInfo += "账号:" + failCount + "," + resp.UserProfileItem[j].ResultInfo + "\n";
                break;
              }
            }
          }
        }
        if (resp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(resp);
        } else if (cbOk) {
          cbOk(resp);
        }
      },
      cbErr);
    };

    //设置个人资料
    var proto_setProfilePortrait = function proto_setProfilePortrait(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_set",
      {
        'From_Account': ctx.identifier,
        'ProfileItem': options.ProfileItem },

      function (resp) {
        for (var i in options.ProfileItem) {
          var profile = options.ProfileItem[i];
          if (profile.Tag == 'Tag_Profile_IM_Nick') {
            ctx.identifierNick = profile.Value; //更新昵称

            app.globalData.ctx.identifierNick = profile.Value;

            break;
          }
        }
        if (cbOk) cbOk(resp);
      },
      cbErr);
    };

    //增加黑名单
    var proto_addBlackList = function proto_addBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_add", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };

    //删除黑名单
    var proto_deleteBlackList = function proto_deleteBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_delete", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };

    //我的黑名单
    var proto_getBlackList = function proto_getBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_get", {
        'From_Account': ctx.identifier,
        'StartIndex': options.StartIndex,
        'MaxLimited': options.MaxLimited,
        'LastSequence': options.LastSequence },

      cbOk, cbErr);
    };

    //获取最近联系人
    var proto_getRecentContactList = function proto_getRecentContactList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.RECENT_CONTACT, "get", {
        'From_Account': ctx.identifier,
        'Count': options.Count },

      cbOk, cbErr);
    };

    //上传图片或文件
    var proto_uploadPic = function proto_uploadPic(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var cmdName;
      if (isAccessFormalEnv()) {
        cmdName = 'pic_up';
      } else {
        cmdName = 'pic_up_test';
      }
      ConnManager.apiCall(SRV_NAME.PIC, cmdName, {
        'App_Version': VERSION_INFO.APP_VERSION,
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        'Seq': options.Seq,
        'Timestamp': options.Timestamp,
        'Random': options.Random,
        'File_Str_Md5': options.File_Str_Md5,
        'File_Size': options.File_Size,
        'File_Type': options.File_Type,
        'Server_Ver': VERSION_INFO.SERVER_VERSION,
        'Auth_Key': authkey,
        'Busi_Id': options.Busi_Id,
        'PkgFlag': options.PkgFlag,
        'Slice_Offset': options.Slice_Offset,
        'Slice_Size': options.Slice_Size,
        'Slice_Data': options.Slice_Data },

      cbOk, cbErr);
    };

    //获取语音和文件下载IP和authkey
    var proto_getIpAndAuthkey = function proto_getIpAndAuthkey(cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "authkey", {}, cbOk, cbErr);
    };

    //接口质量上报
    var proto_reportApiQuality = function proto_reportApiQuality(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.IM_OPEN_STAT, "web_report", options, cbOk, cbErr);
    };


    var proto_getLongPollingId = function proto_getLongPollingId(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getlongpollingid", {},
      function (resp) {
        cbOk && cbOk(resp);
      }, cbErr);
    };


    var proto_applyDownload = function proto_applyDownload(options, cbOk, cbErr) {
      //把下载地址push到map中
      ConnManager.apiCall(SRV_NAME.PIC, "apply_download", options, cbOk, cbErr);
    };

    //end
    initBrowserInfo();
    // singleton object ConnManager
    var ConnManager = lowerBR == false ?
    new function () {
      var onConnCallback = null; //回调函数
      this.init = function (onConnNotify, cbOk, cbErr) {
        if (onConnNotify) onConnCallback = onConnNotify;
      };
      this.callBack = function (info) {
        if (onConnCallback) onConnCallback(info);
      };
      this.clear = function () {
        onConnCallback = null;
      };
      //请求后台服务接口
      this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
        //封装后台服务接口地址
        var url = getApiUrl(type, cmd, cbOk, cbErr);
        if (url == false) return;
        //发起ajax请求
        ajaxRequestJson("POST", url, data, timeout, isLongPolling, function (resp) {
          var errorCode = null,tempErrorInfo = '';
          if (cmd == 'pic_up') {
            data.Slice_Data = '';
          }
          var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp);


          //成功
          if (resp.ActionStatus == ACTION_STATUS.OK) {
            log.info("[" + type + "][" + cmd + "]success: " + info);
            if (cbOk) cbOk(resp); //回调
            errorCode = 0;
            tempErrorInfo = '';
          } else {
            errorCode = resp.ErrorCode;
            tempErrorInfo = resp.ErrorInfo;
            //报错
            if (cbErr) {
              resp.SrcErrorInfo = resp.ErrorInfo;
              resp.ErrorInfo = "[" + type + "][" + cmd + "]failed: " + info;
              if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
                log.error(resp.ErrorInfo);
              }
              cbErr(resp);
            }
          }
          reportApiQuality(cmd, errorCode, tempErrorInfo); //接口质量上报
        }, function (err) {
          cbErr && cbErr(err);
          reportApiQuality(cmd, err.ErrorCode, err.ErrorInfo); //接口质量上报
        });
      };
    }() :
    new function () {
      var onConnCallback = null; //回调函数
      this.init = function (onConnNotify, cbOk, cbErr) {
        if (onConnNotify) onConnCallback = onConnNotify;
      };
      this.callBack = function (info) {
        if (onConnCallback) onConnCallback(info);
      };
      this.clear = function () {
        onConnCallback = null;
      };
      //请求后台服务接口
      this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
        //封装后台服务接口地址
        var url = getApiUrl(type, cmd, cbOk, cbErr);
        if (url == false) return;
        //发起jsonp请求
        var reqId = jsonpRequestId++,
        cbkey = 'jsonpcallback', // the 'callback' key
        cbval = 'jsonpRequest' + reqId, // the 'callback' value
        script = document.createElement('script'),
        loaded = 0;

        window[cbval] = jsonpCallback;
        script.type = 'text/javascript';
        url = url + "&" + cbkey + "=" + cbval + "&jsonpbody=" + encodeURIComponent(JSON.stringify(data));
        script.src = url;
        script.async = true;

        if (typeof script.onreadystatechange !== 'undefined') {
          // need this for IE due to out-of-order onreadystatechange(), binding script
          // execution to an event listener gives us control over when the script
          // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
          script.event = 'onclick';
          script.htmlFor = script.id = '_jsonpRequest_' + reqId;
        }

        script.onload = script.onreadystatechange = function () {
          if (this.readyState && this.readyState !== 'complete' && this.readyState !== 'loaded' || loaded) {
            return false;
          }
          script.onload = script.onreadystatechange = null;
          script.onclick && script.onclick();
          // Call the user callback with the last value stored and clean up values and scripts.
          var resp = jsonpLastRspData;
          var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp);
          if (resp.ActionStatus == ACTION_STATUS.OK) {
            log.info("[" + type + "][" + cmd + "]success: " + info);
            cbOk && cbOk(resp);
          } else {
            resp.ErrorInfo = "[" + type + "][" + cmd + "]failed " + info;
            if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
              log.error(resp.ErrorInfo);
            } else {
              log.warn("[" + type + "][" + cmd + "]success: " + info);
            }
            cbErr && cbErr(resp);
          }
          jsonpLastRspData = undefined;
          document.body.removeChild(script);
          loaded = 1;
        };

        // Add the script to the DOM head
        document.body.appendChild(script);
      };
    }();
    // class Session
    var Session = function Session(type, id, name, icon, time, seq) {
      this._impl = {
        skey: Session.skey(type, id),
        type: type,
        id: id,
        name: name,
        icon: icon,
        unread: 0, //未读消息数
        isAutoRead: false,
        time: time >= 0 ? time : 0,
        curMaxMsgSeq: seq >= 0 ? seq : 0,
        msgs: [],
        isFinished: 1 };

    };
    Session.skey = function (type, id) {
      return type + id;
    };
    Session.prototype.type = function () {
      return this._impl.type;
    };
    Session.prototype.id = function () {
      return this._impl.id;
    };
    Session.prototype.name = function () {
      return this._impl.name;
    };
    Session.prototype.icon = function () {
      return this._impl.icon;
    };
    Session.prototype.unread = function (val) {
      if (typeof val !== 'undefined') {
        this._impl.unread = val;
      } else {
        return this._impl.unread;
      }
    };
    Session.prototype.isFinished = function (val) {
      if (typeof val !== 'undefined') {
        this._impl.isFinished = val;
      } else {
        return this._impl.isFinished;
      }
    };
    Session.prototype.time = function () {
      return this._impl.time;
    };
    Session.prototype.curMaxMsgSeq = function (seq) {
      if (typeof seq !== 'undefined') {
        this._impl.curMaxMsgSeq = seq;
      } else {
        return this._impl.curMaxMsgSeq;
      }
    };
    Session.prototype.msgCount = function () {
      return this._impl.msgs.length;
    };
    Session.prototype.msg = function (index) {
      return this._impl.msgs[index];
    };
    Session.prototype.msgs = function () {
      return this._impl.msgs;
    };
    Session.prototype._impl_addMsg = function (msg) {
      this._impl.msgs.push(msg);
      //if (!msg.isSend && msg.time > this._impl.time)
      if (msg.time > this._impl.time)
      this._impl.time = msg.time;
      //if (!msg.isSend && msg.seq > this._impl.curMaxMsgSeq)
      if (msg.seq > this._impl.curMaxMsgSeq)
      this._impl.curMaxMsgSeq = msg.seq;
      //自己发送的消息不计入未读数
      if (!msg.isSend && !this._impl.isAutoRead) {
        this._impl.unread++;
      }
    };
    //class C2CMsgReadedItem
    var C2CMsgReadedItem = function C2CMsgReadedItem(toAccount, lastedMsgTime) {
      this.toAccount = toAccount;
      this.lastedMsgTime = lastedMsgTime;
    };
    // class Msg
    var Msg = function Msg(sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {
      this.sess = sess;
      this.subType = subType >= 0 ? subType : 0; //消息类型,c2c消息时，type取值为0；group消息时，type取值0和1，0-普通群消息，1-群提示消息
      this.fromAccount = fromAccount;
      this.fromAccountNick = fromAccountNick ? fromAccountNick : fromAccount;
      this.isSend = Boolean(isSend);
      this.seq = seq >= 0 ? seq : nextSeq();
      this.random = random >= 0 ? random : createRandom();
      this.time = time >= 0 ? time : unixtime();
      this.elems = [];
    };
    Msg.prototype.getSession = function () {
      return this.sess;
    };
    Msg.prototype.getType = function () {
      return this.subType;
    };
    Msg.prototype.getSubType = function () {
      return this.subType;
    };
    Msg.prototype.getFromAccount = function () {
      return this.fromAccount;
    };
    Msg.prototype.getFromAccountNick = function () {
      return this.fromAccountNick;
    };
    Msg.prototype.getIsSend = function () {
      return this.isSend;
    };
    Msg.prototype.getSeq = function () {
      return this.seq;
    };
    Msg.prototype.getTime = function () {
      return this.time;
    };
    Msg.prototype.getRandom = function () {
      return this.random;
    };
    Msg.prototype.getElems = function () {
      return this.elems;
    };
    //文本
    Msg.prototype.addText = function (text) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.TEXT, text));
    };
    //表情
    Msg.prototype.addFace = function (face) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FACE, face));
    };
    //图片
    Msg.prototype.addImage = function (image) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.IMAGE, image));
    };
    //地理位置
    Msg.prototype.addLocation = function (location) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.LOCATION, location));
    };
    //文件
    Msg.prototype.addFile = function (file) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FILE, file));
    };
    //自定义
    Msg.prototype.addCustom = function (custom) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.CUSTOM, custom));
    };
    Msg.prototype.addElem = function (elem) {
      this.elems.push(elem);
    };
    Msg.prototype.toHtml = function () {
      var html = "";
      for (var i in this.elems) {
        var elem = this.elems[i];
        html += elem.toHtml();
      }
      return html;
    };

    // class Msg.Elem
    Msg.Elem = function (type, value) {
      this.type = type;
      this.content = value;
    };
    Msg.Elem.prototype.getType = function () {
      return this.type;
    };
    Msg.Elem.prototype.getContent = function () {
      return this.content;
    };
    Msg.Elem.prototype.toHtml = function () {
      var html;
      html = this.content.toHtml();
      return html;
    };

    // class Msg.Elem.Text
    Msg.Elem.Text = function (text) {
      this.text = tool.xssFilter(text);
    };
    Msg.Elem.Text.prototype.getText = function () {
      return this.text;
    };
    Msg.Elem.Text.prototype.toHtml = function () {
      return this.text;
    };

    // class Msg.Elem.Face
    Msg.Elem.Face = function (index, data) {
      this.index = index;
      this.data = data;
    };
    Msg.Elem.Face.prototype.getIndex = function () {
      return this.index;
    };
    Msg.Elem.Face.prototype.getData = function () {
      return this.data;
    };
    Msg.Elem.Face.prototype.toHtml = function () {
      var faceUrl = null;
      var index = emotionDataIndexs[this.data];
      var emotion = emotions[index];
      if (emotion && emotion[1]) {
        faceUrl = emotion[1];
      }
      if (faceUrl) {
        return "<img src='" + faceUrl + "'/>";
      } else {
        return this.data;
      }
    };

    // 地理位置消息 class Msg.Elem.Location
    Msg.Elem.Location = function (longitude, latitude, desc) {
      this.latitude = latitude; //纬度
      this.longitude = longitude; //经度
      this.desc = desc; //描述
    };
    Msg.Elem.Location.prototype.getLatitude = function () {
      return this.latitude;
    };
    Msg.Elem.Location.prototype.getLongitude = function () {
      return this.longitude;
    };
    Msg.Elem.Location.prototype.getDesc = function () {
      return this.desc;
    };
    Msg.Elem.Location.prototype.toHtml = function () {
      return '经度=' + this.longitude + ',纬度=' + this.latitude + ',描述=' + this.desc;
    };

    //图片消息
    // class Msg.Elem.Images
    Msg.Elem.Images = function (imageId) {
      this.UUID = imageId;
      this.ImageInfoArray = [];
    };
    Msg.Elem.Images.prototype.addImage = function (image) {
      this.ImageInfoArray.push(image);
    };
    Msg.Elem.Images.prototype.toHtml = function () {
      var smallImage = this.getImage(IMAGE_TYPE.SMALL);
      var bigImage = this.getImage(IMAGE_TYPE.LARGE);
      var oriImage = this.getImage(IMAGE_TYPE.ORIGIN);
      if (!bigImage) {
        bigImage = smallImage;
      }
      if (!oriImage) {
        oriImage = smallImage;
      }
      return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + this.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";

    };
    Msg.Elem.Images.prototype.getImageId = function () {
      return this.UUID;
    };
    Msg.Elem.Images.prototype.getImage = function (type) {
      for (var i in this.ImageInfoArray) {
        if (this.ImageInfoArray[i].getType() == type) {
          return this.ImageInfoArray[i];
        }
      }
      return null;
    };
    // class Msg.Elem.Images.Image
    Msg.Elem.Images.Image = function (type, size, width, height, url) {
      this.type = type;
      this.size = size;
      this.width = width;
      this.height = height;
      this.url = url;
    };
    Msg.Elem.Images.Image.prototype.getType = function () {
      return this.type;
    };
    Msg.Elem.Images.Image.prototype.getSize = function () {
      return this.size;
    };
    Msg.Elem.Images.Image.prototype.getWidth = function () {
      return this.width;
    };
    Msg.Elem.Images.Image.prototype.getHeight = function () {
      return this.height;
    };
    Msg.Elem.Images.Image.prototype.getUrl = function () {
      return this.url;
    };

    // class Msg.Elem.Sound
    Msg.Elem.Sound = function (uuid, second, size, senderId, receiverId, downFlag, chatType) {
      this.uuid = uuid; //文件id
      this.second = second; //时长，单位：秒
      this.size = size; //大小，单位：字节
      this.senderId = senderId; //发送者
      this.receiverId = receiverId; //接收方id
      this.downFlag = downFlag; //下载标志位
      this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1; //busi_id ( 1：群    2:C2C)

      //根据不同情况拉取数据
      //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载
      if (downFlag !== undefined && busiId !== undefined) {
        getFileDownUrlV2(uuid, senderId, second, downFlag, receiverId, this.busiId, UPLOAD_RES_TYPE.SOUND);
      } else {
        this.downUrl = getSoundDownUrl(uuid, senderId, second); //下载地址
      }
    };
    Msg.Elem.Sound.prototype.getUUID = function () {
      return this.uuid;
    };
    Msg.Elem.Sound.prototype.getSecond = function () {
      return this.second;
    };
    Msg.Elem.Sound.prototype.getSize = function () {
      return this.size;
    };
    Msg.Elem.Sound.prototype.getSenderId = function () {
      return this.senderId;
    };
    Msg.Elem.Sound.prototype.getDownUrl = function () {
      return this.downUrl;
    };
    Msg.Elem.Sound.prototype.toHtml = function () {
      if (BROWSER_INFO.type == 'ie' && parseInt(BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + this.downUrl;
      }
      return '<audio id="uuid_' + this.uuid + '" src="' + this.downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
    };

    // class Msg.Elem.File
    Msg.Elem.File = function (uuid, name, size, senderId, receiverId, downFlag, chatType) {
      this.uuid = uuid; //文件id
      this.name = name; //文件名
      this.size = size; //大小，单位：字节
      this.senderId = senderId; //发送者
      this.receiverId = receiverId; //接收方id
      this.downFlag = downFlag; //下载标志位

      this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1; //busi_id ( 1：群    2:C2C)
      //根据不同情况拉取数据
      //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载
      if (downFlag !== undefined && busiId !== undefined) {
        getFileDownUrlV2(uuid, senderId, name, downFlag, receiverId, this.busiId, UPLOAD_RES_TYPE.FILE);
      } else {
        this.downUrl = getFileDownUrl(uuid, senderId, name); //下载地址
      }
    };
    Msg.Elem.File.prototype.getUUID = function () {
      return this.uuid;
    };
    Msg.Elem.File.prototype.getName = function () {
      return this.name;
    };
    Msg.Elem.File.prototype.getSize = function () {
      return this.size;
    };
    Msg.Elem.File.prototype.getSenderId = function () {
      return this.senderId;
    };
    Msg.Elem.File.prototype.getDownUrl = function () {
      return this.downUrl;
    };
    Msg.Elem.File.prototype.getDownFlag = function () {
      return this.downFlag;
    };
    Msg.Elem.File.prototype.toHtml = function () {
      var fileSize, unitStr;
      fileSize = this.size;
      unitStr = "Byte";
      if (this.size >= 1024) {
        fileSize = Math.round(this.size / 1024);
        unitStr = "KB";
      }
      return '<a href="javascript" onclick="webim.onDownFile("' + this.uuid + '")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + this.name + '(' + fileSize + unitStr + ')</i></a>';
    };

    // class Msg.Elem.GroupTip 群提示消息对象
    Msg.Elem.GroupTip = function (opType, opUserId, groupId, groupName, userIdList) {
      this.opType = opType; //操作类型
      this.opUserId = opUserId; //操作者id
      this.groupId = groupId; //群id
      this.groupName = groupName; //群名称
      this.userIdList = userIdList ? userIdList : []; //被操作的用户id列表
      this.groupInfoList = []; //新的群资料信息，群资料变更时才有值
      this.memberInfoList = []; //新的群成员资料信息，群成员资料变更时才有值
      this.groupMemberNum = null; //群成员数，操作类型为加群或者退群时才有值
    };
    Msg.Elem.GroupTip.prototype.addGroupInfo = function (groupInfo) {
      this.groupInfoList.push(groupInfo);
    };
    Msg.Elem.GroupTip.prototype.addMemberInfo = function (memberInfo) {
      this.memberInfoList.push(memberInfo);
    };
    Msg.Elem.GroupTip.prototype.getOpType = function () {
      return this.opType;
    };
    Msg.Elem.GroupTip.prototype.getOpUserId = function () {
      return this.opUserId;
    };
    Msg.Elem.GroupTip.prototype.getGroupId = function () {
      return this.groupId;
    };
    Msg.Elem.GroupTip.prototype.getGroupName = function () {
      return this.groupName;
    };
    Msg.Elem.GroupTip.prototype.getUserIdList = function () {
      return this.userIdList;
    };
    Msg.Elem.GroupTip.prototype.getGroupInfoList = function () {
      return this.groupInfoList;
    };
    Msg.Elem.GroupTip.prototype.getMemberInfoList = function () {
      return this.memberInfoList;
    };
    Msg.Elem.GroupTip.prototype.getGroupMemberNum = function () {
      return this.groupMemberNum;
    };
    Msg.Elem.GroupTip.prototype.setGroupMemberNum = function (groupMemberNum) {
      return this.groupMemberNum = groupMemberNum;
    };
    Msg.Elem.GroupTip.prototype.toHtml = function () {
      var text = "[群提示消息]";
      var maxIndex = GROUP_TIP_MAX_USER_COUNT - 1;
      switch (this.opType) {
        case GROUP_TIP_TYPE.JOIN: //加入群
          text += this.opUserId + "邀请了";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "加入该群";
          break;
        case GROUP_TIP_TYPE.QUIT: //退出群
          text += this.opUserId + "主动退出该群";
          break;
        case GROUP_TIP_TYPE.KICK: //踢出群
          text += this.opUserId + "将";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "踢出该群";
          break;
        case GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
          text += this.opUserId + "将";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "设为管理员";
          break;
        case GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
          text += this.opUserId + "取消";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "的管理员资格";
          break;


        case GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
          text += this.opUserId + "修改了群资料：";
          for (var m in this.groupInfoList) {
            var type = this.groupInfoList[m].getType();
            var value = this.groupInfoList[m].getValue();
            switch (type) {
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
                text += "群头像为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
                text += "群名称为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
                text += "群主为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
                text += "群公告为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
                text += "群简介为" + value + "; ";
                break;
              default:
                text += "未知信息为:type=" + type + ",value=" + value + "; ";
                break;}

          }
          break;

        case GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
          text += this.opUserId + "修改了群成员资料:";
          for (var m in this.memberInfoList) {
            var userId = this.memberInfoList[m].getUserId();
            var shutupTime = this.memberInfoList[m].getShutupTime();
            text += userId + ": ";
            if (shutupTime != null && shutupTime !== undefined) {
              if (shutupTime == 0) {
                text += "取消禁言; ";
              } else {
                text += "禁言" + shutupTime + "秒; ";
              }
            } else {
              text += " shutupTime为空";
            }
            if (this.memberInfoList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.memberInfoList.length + "人";
              break;
            }
          }
          break;

        case GROUP_TIP_TYPE.READED: //消息已读
          /**/
          Log.info("消息已读同步");
          break;
        default:
          text += "未知群提示消息类型：type=" + this.opType;
          break;}

      return text;
    };

    // class Msg.Elem.GroupTip.GroupInfo，变更的群资料信息对象
    Msg.Elem.GroupTip.GroupInfo = function (type, value) {
      this.type = type; //群资料信息类型
      this.value = value; //对应的值
    };
    Msg.Elem.GroupTip.GroupInfo.prototype.getType = function () {
      return this.type;
    };
    Msg.Elem.GroupTip.GroupInfo.prototype.getValue = function () {
      return this.value;
    };

    // class Msg.Elem.GroupTip.MemberInfo，变更的群成员资料信息对象
    Msg.Elem.GroupTip.MemberInfo = function (userId, shutupTime) {
      this.userId = userId; //群成员id
      this.shutupTime = shutupTime; //群成员被禁言时间，0表示取消禁言，大于0表示被禁言时长，单位：秒
    };
    Msg.Elem.GroupTip.MemberInfo.prototype.getUserId = function () {
      return this.userId;
    };
    Msg.Elem.GroupTip.MemberInfo.prototype.getShutupTime = function () {
      return this.shutupTime;
    };

    // 自定义消息类型 class Msg.Elem.Custom
    Msg.Elem.Custom = function (data, desc, ext) {
      this.data = data; //数据
      this.desc = desc; //描述
      this.ext = ext; //扩展字段
    };
    Msg.Elem.Custom.prototype.getData = function () {
      return this.data;
    };
    Msg.Elem.Custom.prototype.getDesc = function () {
      return this.desc;
    };
    Msg.Elem.Custom.prototype.getExt = function () {
      return this.ext;
    };
    Msg.Elem.Custom.prototype.toHtml = function () {
      return this.data;
    };

    // singleton object MsgStore
    var MsgStore = new function () {
      var sessMap = {}; //跟所有用户或群的聊天记录MAP
      var sessTimeline = []; //按时间降序排列的会话列表
      msgCache = {}; //消息缓存，用于判重
      //C2C
      this.cookie = ""; //上一次拉取新c2c消息的cookie
      this.syncFlag = 0; //上一次拉取新c2c消息的是否继续拉取标记

      var visitSess = function visitSess(visitor) {
        for (var i in sessMap) {
          visitor(sessMap[i]);
        }
      };
      // window.msgCache = msgCache;
      //消息查重
      var checkDupMsg = function checkDupMsg(msg) {
        var dup = false;
        var first_key = msg.sess._impl.skey;
        var second_key = msg.isSend + msg.seq + msg.random;
        var tempMsg = msgCache[first_key] && msgCache[first_key][second_key];
        if (tempMsg) {
          dup = true;
        }
        if (msgCache[first_key]) {
          msgCache[first_key][second_key] = { time: msg.time };
        } else {
          msgCache[first_key] = {};
          msgCache[first_key][second_key] = { time: msg.time };
        }
        return dup;
      };

      this.sessMap = function () {
        return sessMap;
      };
      this.sessCount = function () {
        return sessTimeline.length;
      };
      this.sessByTypeId = function (type, id) {
        var skey = Session.skey(type, id);
        if (skey === undefined || skey == null) return null;
        return sessMap[skey];
      };
      this.delSessByTypeId = function (type, id) {
        var skey = Session.skey(type, id);
        if (skey === undefined || skey == null) return false;
        if (sessMap[skey]) {
          delete sessMap[skey];
          delete msgCache[skey];
        }
        return true;
      };
      this.resetCookieAndSyncFlag = function () {
        this.cookie = "";
        this.syncFlag = 0;
      };

      //切换将当前会话的自动读取消息标志为isOn,重置其他会话的自动读取消息标志为false
      this.setAutoRead = function (selSess, isOn, isResetAll) {
        if (isResetAll)
        visitSess(function (s) {
          s._impl.isAutoRead = false;
        });
        if (selSess) {
          selSess._impl.isAutoRead = isOn; //
          if (isOn) {//是否调用已读上报接口
            selSess._impl.unread = 0;

            if (selSess._impl.type == SESSION_TYPE.C2C) {//私聊消息已读上报
              var tmpC2CMsgReadedItem = [];
              tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(selSess._impl.id, selSess._impl.time));
              //调用C2C消息已读上报接口
              proto_c2CMsgReaded(MsgStore.cookie,
              tmpC2CMsgReadedItem,
              function (resp) {
                log.info("[setAutoRead]: c2CMsgReaded success");
              },
              function (err) {
                log.error("[setAutoRead}: c2CMsgReaded failed:" + err.ErrorInfo);
              });
            } else if (selSess._impl.type == SESSION_TYPE.GROUP) {//群聊消息已读上报
              var tmpOpt = {
                'GroupId': selSess._impl.id,
                'MsgReadedSeq': selSess._impl.curMaxMsgSeq };

              //调用group消息已读上报接口
              proto_groupMsgReaded(tmpOpt,
              function (resp) {
                log.info("groupMsgReaded success");

              },
              function (err) {
                log.error("groupMsgReaded failed:" + err.ErrorInfo);

              });
            }
          }
        }
      };

      this.c2CMsgReaded = function (opts, cbOk, cbErr) {
        var tmpC2CMsgReadedItem = [];
        tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(opts.To_Account, opts.LastedMsgTime));
        //调用C2C消息已读上报接口
        proto_c2CMsgReaded(MsgStore.cookie,
        tmpC2CMsgReadedItem,
        function (resp) {
          if (cbOk) {
            log.info("c2CMsgReaded success");
            cbOk(resp);
          }
        },
        function (err) {
          if (cbErr) {
            log.error("c2CMsgReaded failed:" + err.ErrorInfo);
            cbErr(err);
          }
        });
      };

      this.addSession = function (sess) {
        sessMap[sess._impl.skey] = sess;
      };
      this.delSession = function (sess) {
        delete sessMap[sess._impl.skey];
      };
      this.addMsg = function (msg) {
        if (checkDupMsg(msg)) return false;
        var sess = msg.sess;
        if (!sessMap[sess._impl.skey]) this.addSession(sess);
        sess._impl_addMsg(msg);
        return true;
      };
      this.updateTimeline = function () {
        var arr = new Array();
        visitSess(function (sess) {
          arr.push(sess);
        });
        arr.sort(function (a, b) {
          return b.time - a.time;
        });
        sessTimeline = arr;
      };
    }();
    // singleton object MsgManager
    var MsgManager = new function () {

      var onMsgCallback = null; //新消息(c2c和group)回调

      var onGroupInfoChangeCallback = null; //群资料变化回调
      //收到新群系统消息回调列表
      var onGroupSystemNotifyCallbacks = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
        "10": null,
        "11": null,
        "15": null,
        "255": null };

      //监听好友系统通知函数
      var onFriendSystemNotifyCallbacks = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null };


      var onProfileSystemNotifyCallbacks = {
        "1": null };


      var onKickedEventCall = null;

      var onMsgReadCallback = null;

      //普通长轮询
      var longPollingOn = false; //是否开启普通长轮询
      var isLongPollingRequesting = false; //是否在长轮询ing
      var notifySeq = 0; //c2c通知seq
      var noticeSeq = 0; //群消息seq

      //大群长轮询
      var onBigGroupMsgCallback = null; //大群消息回调
      var bigGroupLongPollingOn = false; //是否开启长轮询
      var bigGroupLongPollingStartSeq = 0; //请求拉消息的起始seq(大群长轮询)
      var bigGroupLongPollingHoldTime = 90; //客户端长轮询的超时时间，单位是秒(大群长轮询)
      var bigGroupLongPollingKey = null; //客户端加入群组后收到的的Key(大群长轮询)
      var bigGroupLongPollingMsgMap = {}; //记录收到的群消息数


      var getLostGroupMsgCount = 0; //补拉丢失的群消息次数
      //我的群当前最大的seq
      var myGroupMaxSeqs = {}; //用于补拉丢失的群消息

      var groupSystemMsgsCache = {}; //群组系统消息缓存,用于判重

      //设置长轮询开关
      //isOn=true 开启
      //isOn=false 停止
      this.setLongPollingOn = function (isOn) {
        longPollingOn = isOn;
      };
      this.getLongPollingOn = function () {
        return longPollingOn;
      };

      //重置长轮询变量
      this.resetLongPollingInfo = function () {
        longPollingOn = false;
        notifySeq = 0;
        noticeSeq = 0;
      };

      //设置大群长轮询开关
      //isOn=true 开启
      //isOn=false 停止
      this.setBigGroupLongPollingOn = function (isOn) {
        bigGroupLongPollingOn = isOn;
      };
      //设置大群长轮询key
      this.setBigGroupLongPollingKey = function (key) {
        bigGroupLongPollingKey = key;
      };
      //重置大群长轮询变量
      this.resetBigGroupLongPollingInfo = function () {
        bigGroupLongPollingOn = false;
        bigGroupLongPollingStartSeq = 0;
        bigGroupLongPollingKey = null;
        bigGroupLongPollingMsgMap = {};
      };

      //设置群消息数据条数
      this.setBigGroupLongPollingMsgMap = function (groupId, count) {
        var bigGroupLongPollingMsgCount = bigGroupLongPollingMsgMap[groupId];
        if (bigGroupLongPollingMsgCount) {
          bigGroupLongPollingMsgCount = parseInt(bigGroupLongPollingMsgCount) + count;
          bigGroupLongPollingMsgMap[groupId] = bigGroupLongPollingMsgCount;
        } else {
          bigGroupLongPollingMsgMap[groupId] = count;
        }
      };
      //重置
      this.clear = function () {
        onGroupInfoChangeCallback = null;
        onGroupSystemNotifyCallbacks = {
          "1": null, //申请加群请求（只有管理员会收到）
          "2": null, //申请加群被同意（只有申请人能够收到）
          "3": null, //申请加群被拒绝（只有申请人能够收到）
          "4": null, //被管理员踢出群(只有被踢者接收到)
          "5": null, //群被解散(全员接收)
          "6": null, //创建群(创建者接收)
          "7": null, //邀请加群(被邀请者接收)
          "8": null, //主动退群(主动退出者接收)
          "9": null, //设置管理员(被设置者接收)
          "10": null, //取消管理员(被取消者接收)
          "11": null, //群已被回收(全员接收)
          "15": null, //群已被回收(全员接收)
          "255": null //用户自定义通知(默认全员接收)
        };
        onFriendSystemNotifyCallbacks = {
          "1": null, //好友表增加
          "2": null, //好友表删除
          "3": null, //未决增加
          "4": null, //未决删除
          "5": null, //黑名单增加
          "6": null, //黑名单删除
          "7": null, //未决已读上报
          "8": null //好友信息(备注，分组)变更
        };
        onProfileSystemNotifyCallbacks = {
          "1": null //资料修改
        };
        //重置普通长轮询参数
        onMsgCallback = null;
        longPollingOn = false;
        notifySeq = 0; //c2c新消息通知seq
        noticeSeq = 0; //group新消息seq

        //重置大群长轮询参数
        onBigGroupMsgCallback = null;
        bigGroupLongPollingOn = false;
        bigGroupLongPollingStartSeq = 0;
        bigGroupLongPollingKey = null;
        bigGroupLongPollingMsgMap = {};

        groupSystemMsgsCache = {};

        ipList = []; //文件下载地址
        authkey = null; //文件下载票据
        expireTime = null; //票据超时时间
      };

      //初始化文件下载ip和票据
      var initIpAndAuthkey = function initIpAndAuthkey(cbOk, cbErr) {
        proto_getIpAndAuthkey(function (resp) {
          ipList = resp.IpList;
          authkey = resp.AuthKey;
          expireTime = resp.ExpireTime;
          if (cbOk) cbOk(resp);
        },
        function (err) {
          log.error("initIpAndAuthkey failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });

      };


      ctx.identifier = app.globalData.ctx.identifier;

      //初始化我的群当前最大的seq，用于补拉丢失的群消息
      var initMyGroupMaxSeqs = function initMyGroupMaxSeqs(cbOk, cbErr) {
        var opts = {
          'Member_Account': ctx.identifier,
          'Limit': 1000,
          'Offset': 0,
          'GroupBaseInfoFilter': [
          'NextMsgSeq'] };


        proto_getJoinedGroupListHigh(opts, function (resp) {
          if (!resp.GroupIdList || resp.GroupIdList.length == 0) {
            log.info("initMyGroupMaxSeqs: 目前还没有加入任何群组");
            if (cbOk) cbOk(resp);
            return;
          }
          for (var i = 0; i < resp.GroupIdList.length; i++) {
            var group_id = resp.GroupIdList[i].GroupId;
            var curMaxSeq = resp.GroupIdList[i].NextMsgSeq - 1;
            myGroupMaxSeqs[group_id] = curMaxSeq;
          }

          if (cbOk) cbOk(resp);

        },
        function (err) {
          log.error("initMyGroupMaxSeqs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });

      };

      //补拉群消息
      var getLostGroupMsgs = function getLostGroupMsgs(groupId, reqMsgSeq, reqMsgNumber) {
        getLostGroupMsgCount++;
        //发起一个拉群群消息请求
        var tempOpts = {
          'GroupId': groupId,
          'ReqMsgSeq': reqMsgSeq,
          'ReqMsgNumber': reqMsgNumber };

        //发起一个拉群群消息请求
        log.warn("第" + getLostGroupMsgCount + "次补齐群消息,参数=" + JSON.stringify(tempOpts));
        MsgManager.syncGroupMsgs(tempOpts);
      };

      //更新群当前最大消息seq
      var updateMyGroupCurMaxSeq = function updateMyGroupCurMaxSeq(groupId, msgSeq) {
        //更新myGroupMaxSeqs中的群最大seq
        var curMsgSeq = myGroupMaxSeqs[groupId];
        if (curMsgSeq) {//如果存在，比较大小
          if (msgSeq > curMsgSeq) {
            myGroupMaxSeqs[groupId] = msgSeq;
          }
        } else {//不存在，新增
          myGroupMaxSeqs[groupId] = msgSeq;
        }
      };

      //添加群消息列表
      var addGroupMsgList = function addGroupMsgList(msgs, new_group_msgs) {
        for (var p in msgs) {
          var newGroupMsg = msgs[p];
          //发群消息时，长轮询接口会返回用户自己发的群消息
          //if(newGroupMsg.From_Account && newGroupMsg.From_Account!=ctx.identifier ){
          if (newGroupMsg.From_Account) {
            //false-不是主动拉取的历史消息
            //true-需要保存到sdk本地session,并且需要判重
            var msg = handlerGroupMsg(newGroupMsg, false, true);
            if (msg) {//不为空，加到新消息里
              new_group_msgs.push(msg);
            }
            //更新myGroupMaxSeqs中的群最大seq
            updateMyGroupCurMaxSeq(newGroupMsg.ToGroupId, newGroupMsg.MsgSeq);
          }
        }
        return new_group_msgs;
      };

      //处理收到的群普通和提示消息
      var handlerOrdinaryAndTipC2cMsgs = function handlerOrdinaryAndTipC2cMsgs(eventType, groupMsgArray) {
        var groupMsgMap = {}; //保存收到的C2c消息信息（群号，最小，最大消息seq，消息列表）
        var new_group_msgs = [];
        var minGroupMsgSeq = 99999999;
        var maxGroupMsgSeq = -1;
        for (var j in groupMsgArray) {

          var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];
          if (!groupMsgs) {
            groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
              "min": minGroupMsgSeq, //收到新消息最小seq
              "max": maxGroupMsgSeq, //收到新消息最大seq
              "msgs": [] //收到的新消息
            };
          }
          //更新长轮询的群NoticeSeq
          if (groupMsgArray[j].NoticeSeq > noticeSeq) {
            log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
            noticeSeq = groupMsgArray[j].NoticeSeq;
          }
          groupMsgArray[j].Event = eventType;
          groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]); //新增一条消息
          if (groupMsgArray[j].MsgSeq < groupMsgs.min) {//记录最小的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
          }
          if (groupMsgArray[j].MsgSeq > groupMsgs.max) {//记录最大的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
          }
        }

        for (var groupId in groupMsgMap) {
          var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1; //收到的新的群消息数
          var curMaxMsgSeq = myGroupMaxSeqs[groupId]; //获取本地保存的群最大消息seq
          if (curMaxMsgSeq) {//存在这个群的最大消息seq
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
            //2、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          } else {//不存在该群的最大消息seq
            log.warn("不存在该群的最大消息seq，群id=" + groupId);
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          }
        }
        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }

        onMsgCallback = app.globalData.listeners.onMsgCallback;

        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);

      };

      //处理收到的群普通和提示消息
      var handlerOrdinaryAndTipGroupMsgs = function handlerOrdinaryAndTipGroupMsgs(eventType, groupMsgArray) {
        var groupMsgMap = {}; //保存收到的群消息信息（群号，最小，最大消息seq，消息列表）
        var new_group_msgs = [];
        var minGroupMsgSeq = 99999999;
        var maxGroupMsgSeq = -1;
        for (var j in groupMsgArray) {

          var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];
          if (!groupMsgs) {
            groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
              "min": minGroupMsgSeq, //收到新消息最小seq
              "max": maxGroupMsgSeq, //收到新消息最大seq
              "msgs": [] //收到的新消息
            };
          }
          //更新长轮询的群NoticeSeq
          if (groupMsgArray[j].NoticeSeq > noticeSeq) {
            log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
            noticeSeq = groupMsgArray[j].NoticeSeq;
          }
          groupMsgArray[j].Event = eventType;
          groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]); //新增一条消息
          if (groupMsgArray[j].MsgSeq < groupMsgs.min) {//记录最小的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
          }
          if (groupMsgArray[j].MsgSeq > groupMsgs.max) {//记录最大的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
          }
        }

        for (var groupId in groupMsgMap) {
          var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1; //收到的新的群消息数
          var curMaxMsgSeq = myGroupMaxSeqs[groupId]; //获取本地保存的群最大消息seq
          if (curMaxMsgSeq) {//存在这个群的最大消息seq
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
            //2、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          } else {//不存在该群的最大消息seq
            log.warn("不存在该群的最大消息seq，群id=" + groupId);
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          }
        }


        onMsgCallback = app.globalData.listeners.onMsgCallback;

        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }
        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);

      };

      //处理新的群提示消息
      var handlerGroupTips = function handlerGroupTips(groupTips) {
        var new_group_msgs = [];
        for (var o in groupTips) {
          var groupTip = groupTips[o];
          //添加event字段
          groupTip.Event = LONG_POLLINNG_EVENT_TYPE.GROUP_TIP;
          //更新群消息通知seq
          if (groupTip.NoticeSeq > noticeSeq) {
            noticeSeq = groupTip.NoticeSeq;
          }
          var msg = handlerGroupMsg(groupTip, false, true);
          if (msg) {
            new_group_msgs.push(msg);
          }
        }
        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }


        onMsgCallback = app.globalData.listeners.onMsgCallback;

        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);
      };

      //处理新的群系统消息
      //isNeedValidRepeatMsg 是否需要判重
      var handlerGroupSystemMsgs = function handlerGroupSystemMsgs(groupSystemMsgs, isNeedValidRepeatMsg) {
        for (var k in groupSystemMsgs) {
          var groupTip = groupSystemMsgs[k];
          var groupReportTypeMsg = groupTip.MsgBody;
          var reportType = groupReportTypeMsg.ReportType;
          //当长轮询返回的群系统消息，才需要更新群消息通知seq
          if (isNeedValidRepeatMsg == false && groupTip.NoticeSeq && groupTip.NoticeSeq > noticeSeq) {
            noticeSeq = groupTip.NoticeSeq;
          }
          var toAccount = groupTip.GroupInfo.To_Account;
          //过滤本不应该给自己的系统消息
          /*if (!toAccount || toAccount != ctx.identifier) {
           log.error("收到本不应该给自己的系统消息: To_Account=" + toAccount);
           continue;
           }*/
          if (isNeedValidRepeatMsg) {
            //var key=groupTip.ToGroupId+"_"+reportType+"_"+groupTip.MsgTimeStamp+"_"+groupReportTypeMsg.Operator_Account;
            var key = groupTip.ToGroupId + "_" + reportType + "_" + groupReportTypeMsg.Operator_Account;
            var isExist = groupSystemMsgsCache[key];
            if (isExist) {
              log.warn("收到重复的群系统消息：key=" + key);
              continue;
            }
            groupSystemMsgsCache[key] = true;
          }

          var notify = {
            "SrcFlag": 0,
            "ReportType": reportType,
            "GroupId": groupTip.ToGroupId,
            "GroupName": groupTip.GroupInfo.GroupName,
            "Operator_Account": groupReportTypeMsg.Operator_Account,
            "MsgTime": groupTip.MsgTimeStamp,
            "groupReportTypeMsg": groupReportTypeMsg };

          switch (reportType) {
            case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST: //申请加群(只有管理员会接收到)
              notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
              notify["MsgKey"] = groupReportTypeMsg.MsgKey;
              notify["Authentication"] = groupReportTypeMsg.Authentication;
              notify["UserDefinedField"] = groupTip.UserDefinedField;
              notify["From_Account"] = groupTip.From_Account;
              notify["MsgSeq"] = groupTip.ClientSeq;
              notify["MsgRandom"] = groupTip.MsgRandom;
              break;
            case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT: //申请加群被同意(只有申请人自己接收到)
            case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE: //申请加群被拒绝(只有申请人自己接收到)
              notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
              break;
            case GROUP_SYSTEM_TYPE.KICK: //被管理员踢出群(只有被踢者接收到)
            case GROUP_SYSTEM_TYPE.DESTORY: //群被解散(全员接收)
            case GROUP_SYSTEM_TYPE.CREATE: //创建群(创建者接收, 不展示)
            case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST: //邀请加群(被邀请者接收)
            case GROUP_SYSTEM_TYPE.QUIT: //主动退群(主动退出者接收, 不展示)
            case GROUP_SYSTEM_TYPE.SET_ADMIN: //群设置管理员(被设置者接收)
            case GROUP_SYSTEM_TYPE.CANCEL_ADMIN: //取消管理员(被取消者接收)
            case GROUP_SYSTEM_TYPE.REVOKE: //群已被回收(全员接收, 不展示)
              break;
            case GROUP_SYSTEM_TYPE.READED: //群消息已读同步
              break;
            case GROUP_SYSTEM_TYPE.CUSTOM: //用户自定义通知(默认全员接收)
              notify["MsgSeq"] = groupTip.MsgSeq;
              notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
              break;
            default:
              log.error("未知群系统消息类型：reportType=" + reportType);
              break;}


          if (isNeedValidRepeatMsg) {
            if (reportType == GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST) {
              //回调
              if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);
            }
          } else {
            //回调
            if (onGroupSystemNotifyCallbacks[reportType]) {
              if (reportType == GROUP_SYSTEM_TYPE.READED) {
                var arr = notify.groupReportTypeMsg.GroupReadInfoArray;
                for (var i = 0, l = arr.length; i < l; i++) {
                  var item = arr[i];
                  onGroupSystemNotifyCallbacks[reportType](item);
                }
              } else {
                onGroupSystemNotifyCallbacks[reportType](notify);
              }
            }
          }
        } //loop
      };


      //处理新的好友系统通知
      //isNeedValidRepeatMsg 是否需要判重
      var handlerFriendSystemNotices = function handlerFriendSystemNotices(friendSystemNotices, isNeedValidRepeatMsg) {
        var friendNotice, type, notify;
        for (var k in friendSystemNotices) {
          friendNotice = friendSystemNotices[k];
          type = friendNotice.PushType;
          //当长轮询返回的群系统消息，才需要更新通知seq
          if (isNeedValidRepeatMsg == false && friendNotice.NoticeSeq && friendNotice.NoticeSeq > noticeSeq) {
            noticeSeq = friendNotice.NoticeSeq;
          }
          notify = { 'Type': type };
          switch (type) {
            case FRIEND_NOTICE_TYPE.FRIEND_ADD: //好友表增加
              notify["Accounts"] = friendNotice.FriendAdd_Account;
              break;
            case FRIEND_NOTICE_TYPE.FRIEND_DELETE: //好友表删除
              notify["Accounts"] = friendNotice.FriendDel_Account;
              break;
            case FRIEND_NOTICE_TYPE.PENDENCY_ADD: //未决增加
              notify["PendencyList"] = friendNotice.PendencyAdd;
              break;
            case FRIEND_NOTICE_TYPE.PENDENCY_DELETE: //未决删除
              notify["Accounts"] = friendNotice.FrienPencydDel_Account;
              break;
            case FRIEND_NOTICE_TYPE.BLACK_LIST_ADD: //黑名单增加
              notify["Accounts"] = friendNotice.BlackListAdd_Account;
              break;
            case FRIEND_NOTICE_TYPE.BLACK_LIST_DELETE: //黑名单删除
              notify["Accounts"] = friendNotice.BlackListDel_Account;
              break;
            /*case FRIEND_NOTICE_TYPE.PENDENCY_REPORT://未决已读上报
                        break;
                      case FRIEND_NOTICE_TYPE.FRIEND_UPDATE://好友数据更新
                        break;
                      */


            default:
              log.error("未知好友系统通知类型：friendNotice=" + JSON.stringify(friendNotice));
              break;}


          if (isNeedValidRepeatMsg) {
            if (type == FRIEND_NOTICE_TYPE.PENDENCY_ADD) {
              //回调
              if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
            }
          } else {
            //回调
            if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
          }
        } //loop
      };

      //处理新的资料系统通知
      //isNeedValidRepeatMsg 是否需要判重
      var handlerProfileSystemNotices = function handlerProfileSystemNotices(profileSystemNotices, isNeedValidRepeatMsg) {
        var profileNotice, type, notify;
        for (var k in profileSystemNotices) {
          profileNotice = profileSystemNotices[k];
          type = profileNotice.PushType;
          //当长轮询返回的群系统消息，才需要更新通知seq
          if (isNeedValidRepeatMsg == false && profileNotice.NoticeSeq && profileNotice.NoticeSeq > noticeSeq) {
            noticeSeq = profileNotice.NoticeSeq;
          }
          notify = { 'Type': type };
          switch (type) {
            case PROFILE_NOTICE_TYPE.PROFILE_MODIFY: //资料修改
              notify["Profile_Account"] = profileNotice.Profile_Account;
              notify["ProfileList"] = profileNotice.ProfileList;
              break;
            default:
              log.error("未知资料系统通知类型：profileNotice=" + JSON.stringify(profileNotice));
              break;}


          if (isNeedValidRepeatMsg) {
            if (type == PROFILE_NOTICE_TYPE.PROFILE_MODIFY) {
              //回调
              if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
            }
          } else {
            //回调
            if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
          }
        } //loop
      };

      //处理新的群系统消息(用于直播大群长轮询)
      var handlerGroupSystemMsg = function handlerGroupSystemMsg(groupTip) {
        var groupReportTypeMsg = groupTip.MsgBody;
        var reportType = groupReportTypeMsg.ReportType;
        var toAccount = groupTip.GroupInfo.To_Account;
        //过滤本不应该给自己的系统消息
        //if(!toAccount || toAccount!=ctx.identifier){
        //    log.error("收到本不应该给自己的系统消息: To_Account="+toAccount);
        //    continue;
        //}
        var notify = {
          "SrcFlag": 1,
          "ReportType": reportType,
          "GroupId": groupTip.ToGroupId,
          "GroupName": groupTip.GroupInfo.GroupName,
          "Operator_Account": groupReportTypeMsg.Operator_Account,
          "MsgTime": groupTip.MsgTimeStamp };

        switch (reportType) {
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST: //申请加群(只有管理员会接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            notify["MsgKey"] = groupReportTypeMsg.MsgKey;
            notify["Authentication"] = groupReportTypeMsg.Authentication;
            notify["UserDefinedField"] = groupTip.UserDefinedField;
            notify["From_Account"] = groupTip.From_Account;
            notify["MsgSeq"] = groupTip.ClientSeq;
            notify["MsgRandom"] = groupTip.MsgRandom;
            break;
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT: //申请加群被同意(只有申请人自己接收到)
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE: //申请加群被拒绝(只有申请人自己接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            break;
          case GROUP_SYSTEM_TYPE.KICK: //被管理员踢出群(只有被踢者接收到)
          case GROUP_SYSTEM_TYPE.DESTORY: //群被解散(全员接收)
          case GROUP_SYSTEM_TYPE.CREATE: //创建群(创建者接收, 不展示)
          case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST: //邀请加群(被邀请者接收)
          case GROUP_SYSTEM_TYPE.QUIT: //主动退群(主动退出者接收, 不展示)
          case GROUP_SYSTEM_TYPE.SET_ADMIN: //群设置管理员(被设置者接收)
          case GROUP_SYSTEM_TYPE.CANCEL_ADMIN: //取消管理员(被取消者接收)
          case GROUP_SYSTEM_TYPE.REVOKE: //群已被回收(全员接收, 不展示)
            break;
          case GROUP_SYSTEM_TYPE.CUSTOM: //用户自定义通知(默认全员接收)
            notify["MsgSeq"] = groupTip.MsgSeq;
            notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
            break;
          default:
            log.error("未知群系统消息类型：reportType=" + reportType);
            break;}

        //回调
        if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);

      };

      //处理C2C EVENT 消息通道Array
      var handlerC2cNotifyMsgArray = function handlerC2cNotifyMsgArray(arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          handlerC2cEventMsg(arr[i]);
        }
      };

      //处理C2C EVENT 消息通道Item
      var handlerC2cEventMsg = function handlerC2cEventMsg(notify) {
        var subType = notify.SubMsgType;
        switch (subType) {
          case C2C_EVENT_SUB_TYPE.READED: //已读通知
            break;
          default:
            log.error("未知C2c系统消息：reportType=" + reportType);
            break;}

        // stopPolling = true;
        //回调onMsgReadCallback
        if (notify.ReadC2cMsgNotify.UinPairReadArray && onC2cEventCallbacks[subType]) {
          for (var i = 0, l = notify.ReadC2cMsgNotify.UinPairReadArray.length; i < l; i++) {
            var item = notify.ReadC2cMsgNotify.UinPairReadArray[i];
            onC2cEventCallbacks[subType](item);
          }
        }
      };

      //长轮询
      this.longPolling = function (cbOk, cbErr) {


        var opts = {
          'Timeout': longPollingDefaultTimeOut / 1000,
          'Cookie': {
            'NotifySeq': notifySeq,
            'NoticeSeq': noticeSeq } };




        if (LongPollingId) {
          opts.Cookie.LongPollingId = LongPollingId;
          doPolling();
        } else {
          proto_getLongPollingId({}, function (resp) {
            LongPollingId = opts.Cookie.LongPollingId = resp.LongPollingId;
            //根据回包设置超时时间，超时时长不能>60秒，因为webkit手机端的最长超时时间不能大于60s
            longPollingDefaultTimeOut = resp.Timeout > 60 ? longPollingDefaultTimeOut : resp.Timeout * 1000;
            doPolling();
          });
        }

        function doPolling() {
          proto_longPolling(opts, function (resp) {
            for (var i in resp.EventArray) {
              var e = resp.EventArray[i];

              switch (e.Event) {
                case LONG_POLLINNG_EVENT_TYPE.C2C: //c2c消息通知
                  //更新C2C消息通知seq
                  notifySeq = e.NotifySeq;
                  log.warn("longpolling: received new c2c msg");
                  //获取新消息
                  MsgManager.syncMsgs();
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON: //普通群消息通知
                  log.warn("longpolling: received new group msgs");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupMsgArray);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP: //（全员广播）群提示消息
                  log.warn("longpolling: received new group tips");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupTips);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM: //（多终端同步）群系统消息
                  log.warn("longpolling: received new group system msgs");
                  //false 表示 通过长轮询收到的群系统消息，可以不判重
                  handlerGroupSystemMsgs(e.GroupTips, false);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.FRIEND_NOTICE: //好友系统通知
                  log.warn("longpolling: received new friend system notice");
                  //false 表示 通过长轮询收到的好友系统通知，可以不判重
                  handlerFriendSystemNotices(e.FriendListMod, false);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.PROFILE_NOTICE: //资料系统通知
                  log.warn("longpolling: received new profile system notice");
                  //false 表示 通过长轮询收到的资料系统通知，可以不判重
                  handlerProfileSystemNotices(e.ProfileDataMod, false);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.C2C_COMMON: //c2c消息通知
                  noticeSeq = e.C2cMsgArray[0].NoticeSeq;
                  //更新C2C消息通知seq
                  console.log("longpolling: received new c2c_common msg", noticeSeq);
                  handlerOrdinaryAndTipC2cMsgs(e.Event, e.C2cMsgArray);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.C2C_EVENT: //c2c已读消息通知
                  noticeSeq = e.C2cNotifyMsgArray[0].NoticeSeq;
                  log.warn("longpolling: received new c2c_event msg");
                  handlerC2cNotifyMsgArray(e.C2cNotifyMsgArray);
                  break;
                default:
                  log.error("longpolling收到未知新消息类型: Event=" + e.Event);
                  break;}

            }
            var successInfo = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0 };

            updatecLongPollingStatus(successInfo);
          }, function (err) {
            //log.error(err);
            updatecLongPollingStatus(err);
            if (cbErr) cbErr(err);
          });
        }
      };


      //大群 长轮询
      this.bigGroupLongPolling = function (cbOk, cbErr) {

        var opts = {
          'StartSeq': bigGroupLongPollingStartSeq, //请求拉消息的起始seq
          'HoldTime': bigGroupLongPollingHoldTime, //客户端长轮询的超时时间，单位是秒
          'Key': bigGroupLongPollingKey //客户端加入群组后收到的的Key
        };

        proto_bigGroupLongPolling(opts, function (resp) {

          var msgObjList = [];
          bigGroupLongPollingStartSeq = resp.NextSeq;
          bigGroupLongPollingHoldTime = resp.HoldTime;
          bigGroupLongPollingKey = resp.Key;

          if (resp.RspMsgList && resp.RspMsgList.length > 0) {
            var msgCount = 0,msgInfo,event,msg;
            for (var i = resp.RspMsgList.length - 1; i >= 0; i--) {
              msgInfo = resp.RspMsgList[i];
              //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
              //IsPlaceMsg=1
              if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
                continue;
              }

              event = msgInfo.Event; //群消息类型
              switch (event) {
                case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON: //群普通消息
                  log.info("bigGroupLongPolling: return new group msg");
                  msg = handlerGroupMsg(msgInfo, false, false);
                  msg && msgObjList.push(msg);
                  msgCount = msgCount + 1;
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP: //群提示消息
                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2: //群提示消息
                  log.info("bigGroupLongPolling: return new group tip");
                  msg = handlerGroupMsg(msgInfo, false, false);
                  msg && msgObjList.push(msg);
                  //msgCount=msgCount+1;
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM: //群系统消息
                  log.info("bigGroupLongPolling: new group system msg");
                  handlerGroupSystemMsg(msgInfo);
                  break;
                default:
                  log.error("bigGroupLongPolling收到未知新消息类型: Event=" + event);
                  break;}

            } // for loop
            if (msgCount > 0) {
              MsgManager.setBigGroupLongPollingMsgMap(msgInfo.ToGroupId, msgCount); //
              log.warn("current bigGroupLongPollingMsgMap: " + JSON.stringify(bigGroupLongPollingMsgMap));
            }
          }
          curBigGroupLongPollingRetErrorCount = 0;
          //返回连接状态
          var successInfo = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': CONNECTION_STATUS.ON,
            'ErrorInfo': 'connection is ok...' };

          ConnManager.callBack(successInfo);

          onBigGroupMsgCallback = app.globalData.listeners.onBigGroupMsgNotify;

          if (cbOk) cbOk(msgObjList);else
          if (onBigGroupMsgCallback) onBigGroupMsgCallback(msgObjList); //返回新消息

          //重新启动长轮询
          bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();

        }, function (err) {
          //
          if (err.ErrorCode != longPollingTimeOutErrorCode) {
            log.error(err.ErrorInfo);
            //记录长轮询返回错误次数
            curBigGroupLongPollingRetErrorCount++;
          }
          if (err.ErrorCode != longPollingKickedErrorCode) {
            //登出
            log.error("多实例登录，被kick");

            if (onKickedEventCall) {onKickedEventCall();}
            /*    return;
                                                          proto_logout(function(){
                                                              if (onKickedEventCall) {onKickedEventCall();}
                                                          });*/
          }
          //累计超过一定次数，不再发起长轮询请求
          if (curBigGroupLongPollingRetErrorCount < LONG_POLLING_MAX_RET_ERROR_COUNT) {
            bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();
          } else {
            var errInfo = {
              'ActionStatus': ACTION_STATUS.FAIL,
              'ErrorCode': CONNECTION_STATUS.OFF,
              'ErrorInfo': 'connection is off' };

            ConnManager.callBack(errInfo);
          }
          if (cbErr) cbErr(err);

        }, bigGroupLongPollingHoldTime * 1000);
      };

      //更新连接状态
      var updatecLongPollingStatus = function updatecLongPollingStatus(errObj) {
        if (errObj.ErrorCode == 0 || errObj.ErrorCode == longPollingTimeOutErrorCode) {
          curLongPollingRetErrorCount = 0;
          longPollingOffCallbackFlag = false;
          var errorInfo;
          var isNeedCallback = false;
          switch (curLongPollingStatus) {
            case CONNECTION_STATUS.INIT:
              isNeedCallback = true;
              curLongPollingStatus = CONNECTION_STATUS.ON;
              errorInfo = "create connection successfully(INIT->ON)";
              break;
            case CONNECTION_STATUS.ON:
              errorInfo = "connection is on...(ON->ON)";
              break;
            case CONNECTION_STATUS.RECONNECT:
              curLongPollingStatus = CONNECTION_STATUS.ON;
              errorInfo = "connection is on...(RECONNECT->ON)";
              break;
            case CONNECTION_STATUS.OFF:
              isNeedCallback = true;
              curLongPollingStatus = CONNECTION_STATUS.RECONNECT;
              errorInfo = "reconnect successfully(OFF->RECONNECT)";
              break;}

          var successInfo = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': curLongPollingStatus,
            'ErrorInfo': errorInfo };

          isNeedCallback && ConnManager.callBack(successInfo);
          longPollingOn && MsgManager.longPolling();
        } else if (errObj.ErrorCode == longPollingKickedErrorCode) {
          //登出
          log.error("多实例登录，被kick");
          if (onKickedEventCall) {onKickedEventCall();}
          //     return;
          // proto_logout(function(){
          //     if (onKickedEventCall) {onKickedEventCall();}
          // });
        } else {
          //记录长轮询返回解析json错误次数
          curLongPollingRetErrorCount++;
          log.warn("longPolling接口第" + curLongPollingRetErrorCount + "次报错: " + errObj.ErrorInfo);
          //累计超过一定次数
          if (curLongPollingRetErrorCount <= LONG_POLLING_MAX_RET_ERROR_COUNT) {
            setTimeout(startNextLongPolling, 100); //
          } else {
            curLongPollingStatus = CONNECTION_STATUS.OFF;
            var errInfo = {
              'ActionStatus': ACTION_STATUS.FAIL,
              'ErrorCode': CONNECTION_STATUS.OFF,
              'ErrorInfo': 'connection is off' };

            longPollingOffCallbackFlag == false && ConnManager.callBack(errInfo);
            longPollingOffCallbackFlag = true;
            log.warn(longPollingIntervalTime + "毫秒之后,SDK会发起新的longPolling请求...");
            setTimeout(startNextLongPolling, longPollingIntervalTime); //长轮询接口报错次数达到一定值，每间隔5s发起新的长轮询
          }
        }
      };

      //处理收到的普通C2C消息
      var handlerOrdinaryAndTipC2cMsgs = function handlerOrdinaryAndTipC2cMsgs(eventType, C2cMsgArray) {
        //处理c2c消息
        var notifyInfo = [];
        var msgInfos = [];
        msgInfos = C2cMsgArray; //返回的消息列表
        // MsgStore.cookie = resp.Cookie;//cookies，记录当前读到的最新消息位置


        ctx.identifier = app.globalData.ctx.identifier;

        for (var i in msgInfos) {
          var msgInfo = msgInfos[i];
          var isSendMsg, id, headUrl;
          if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
            isSendMsg = true;
            id = msgInfo.To_Account; //读取接收者信息
            headUrl = '';
          } else {//当前用户收到的消息
            isSendMsg = false;
            id = msgInfo.From_Account; //读取发送者信息
            headUrl = '';
          }
          var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);
          if (!sess) {
            sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
          }
          var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
          var msgBody = null;
          var msgContent = null;
          var msgType = null;
          for (var mi in msgInfo.MsgBody) {
            msgBody = msgInfo.MsgBody[mi];
            msgType = msgBody.MsgType;
            switch (msgType) {
              case MSG_ELEMENT_TYPE.TEXT:
                msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                break;
              case MSG_ELEMENT_TYPE.FACE:
                msgContent = new Msg.Elem.Face(
                msgBody.MsgContent.Index,
                msgBody.MsgContent.Data);

                break;
              case MSG_ELEMENT_TYPE.IMAGE:
                msgContent = new Msg.Elem.Images(
                msgBody.MsgContent.UUID);

                for (var j in msgBody.MsgContent.ImageInfoArray) {
                  var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                  msgContent.addImage(
                  new Msg.Elem.Images.Image(
                  tempImg.Type,
                  tempImg.Size,
                  tempImg.Width,
                  tempImg.Height,
                  tempImg.URL));


                }
                break;
              case MSG_ELEMENT_TYPE.SOUND:
                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.Sound(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.Second,
                  msgBody.MsgContent.Size,
                  msgInfo.From_Account,
                  msgInfo.To_Account,
                  msgBody.MsgContent.Download_Flag,
                  SESSION_TYPE.C2C);

                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                }
                break;
              case MSG_ELEMENT_TYPE.LOCATION:
                msgContent = new Msg.Elem.Location(
                msgBody.MsgContent.Longitude,
                msgBody.MsgContent.Latitude,
                msgBody.MsgContent.Desc);

                break;
              case MSG_ELEMENT_TYPE.FILE:
              case MSG_ELEMENT_TYPE.FILE + " ":
                msgType = MSG_ELEMENT_TYPE.FILE;
                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.File(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.FileName,
                  msgBody.MsgContent.FileSize,
                  msgInfo.From_Account,
                  msgInfo.To_Account,
                  msgBody.MsgContent.Download_Flag,
                  SESSION_TYPE.C2C);

                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                }
                break;
              case MSG_ELEMENT_TYPE.CUSTOM:
                try {
                  var data = JSON.parse(msgBody.MsgContent.Data);
                  if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {//过滤安卓或ios的正在输入自定义消息
                    continue;
                  }
                } catch (e) {
                }

                msgType = MSG_ELEMENT_TYPE.CUSTOM;
                msgContent = new Msg.Elem.Custom(
                msgBody.MsgContent.Data,
                msgBody.MsgContent.Desc,
                msgBody.MsgContent.Ext);

                break;
              default:
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                break;}

            msg.elems.push(new Msg.Elem(msgType, msgContent));
          }

          if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
            notifyInfo.push(msg);
          }
        } // for loop


        onMsgCallback = app.globalData.listeners.onMsgCallback;

        // console.log('notifyInfo',notifyInfo)
        // console.log('onMsgCallback',onMsgCallback)

        if (notifyInfo.length > 0)
        MsgStore.updateTimeline();
        if (notifyInfo.length > 0) {


          if (onMsgCallback) onMsgCallback(notifyInfo);
        }
      };

      //发起新的长轮询请求
      var startNextLongPolling = function startNextLongPolling() {
        longPollingOn && MsgManager.longPolling();
      };

      //处理未决的加群申请消息列表
      var handlerApplyJoinGroupSystemMsgs = function handlerApplyJoinGroupSystemMsgs(eventArray) {
        for (var i in eventArray) {
          var e = eventArray[i];
          switch (e.Event) {
            case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM: //（多终端同步）群系统消息
              log.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg");
              //true 表示 解决加群申请通知存在重复的问题（已处理的通知，下次登录还会拉到），需要判重
              handlerGroupSystemMsgs(e.GroupTips, true);
              break;
            default:
              log.error("syncMsgs收到未知的群系统消息类型: Event=" + e.Event);
              break;}

        }
      };

      //拉取c2c消息(包含加群未决消息，需要处理)
      this.syncMsgs = function (cbOk, cbErr) {
        var notifyInfo = [];
        var msgInfos = [];
        //读取C2C消息
        proto_getMsgs(MsgStore.cookie, MsgStore.syncFlag, function (resp) {
          //拉取完毕
          if (resp.SyncFlag == 2) {
            MsgStore.syncFlag = 0;
          }
          //处理c2c消息
          msgInfos = resp.MsgList; //返回的消息列表
          MsgStore.cookie = resp.Cookie; //cookies，记录当前读到的最新消息位置


          ctx.identifier = app.globalData.ctx.identifier;


          for (var i in msgInfos) {
            var msgInfo = msgInfos[i];
            var isSendMsg, id, headUrl;
            if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
              isSendMsg = true;
              id = msgInfo.To_Account; //读取接收者信息
              headUrl = '';
            } else {//当前用户收到的消息
              isSendMsg = false;
              id = msgInfo.From_Account; //读取发送者信息
              headUrl = '';
            }
            var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);
            if (!sess) {
              sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
            }
            var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
            var msgBody = null;
            var msgContent = null;
            var msgType = null;
            for (var mi in msgInfo.MsgBody) {
              msgBody = msgInfo.MsgBody[mi];
              msgType = msgBody.MsgType;
              switch (msgType) {
                case MSG_ELEMENT_TYPE.TEXT:
                  msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                  break;
                case MSG_ELEMENT_TYPE.FACE:
                  msgContent = new Msg.Elem.Face(
                  msgBody.MsgContent.Index,
                  msgBody.MsgContent.Data);

                  break;
                case MSG_ELEMENT_TYPE.IMAGE:
                  msgContent = new Msg.Elem.Images(
                  msgBody.MsgContent.UUID);

                  for (var j in msgBody.MsgContent.ImageInfoArray) {
                    var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                    msgContent.addImage(
                    new Msg.Elem.Images.Image(
                    tempImg.Type,
                    tempImg.Size,
                    tempImg.Width,
                    tempImg.Height,
                    tempImg.URL));


                  }
                  break;
                case MSG_ELEMENT_TYPE.SOUND:
                  // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);
                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.Sound(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.Second,
                    msgBody.MsgContent.Size,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                  }
                  break;
                case MSG_ELEMENT_TYPE.LOCATION:
                  msgContent = new Msg.Elem.Location(
                  msgBody.MsgContent.Longitude,
                  msgBody.MsgContent.Latitude,
                  msgBody.MsgContent.Desc);

                  break;
                case MSG_ELEMENT_TYPE.FILE:
                case MSG_ELEMENT_TYPE.FILE + " ":
                  msgType = MSG_ELEMENT_TYPE.FILE;
                  // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);
                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.File(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.FileName,
                    msgBody.MsgContent.FileSize,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                  }
                  break;
                case MSG_ELEMENT_TYPE.CUSTOM:
                  try {
                    var data = JSON.parse(msgBody.MsgContent.Data);
                    if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {//过滤安卓或ios的正在输入自定义消息
                      continue;
                    }
                  } catch (e) {
                  }

                  msgType = MSG_ELEMENT_TYPE.CUSTOM;
                  msgContent = new Msg.Elem.Custom(
                  msgBody.MsgContent.Data,
                  msgBody.MsgContent.Desc,
                  msgBody.MsgContent.Ext);

                  break;
                default:
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                  break;}

              msg.elems.push(new Msg.Elem(msgType, msgContent));
            }

            if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
              notifyInfo.push(msg);
            }
          } // for loop

          //处理加群未决申请消息
          handlerApplyJoinGroupSystemMsgs(resp.EventArray);

          if (notifyInfo.length > 0)
          MsgStore.updateTimeline();
          if (cbOk) cbOk(notifyInfo);else
          if (notifyInfo.length > 0) {

            onMsgCallback = app.globalData.listeners.onMsgCallback;

            if (onMsgCallback) onMsgCallback(notifyInfo);
          }

        }, function (err) {
          log.error("getMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      };


      //拉取C2C漫游消息
      this.getC2CHistoryMsgs = function (options, cbOk, cbErr) {

        if (!options.Peer_Account) {
          if (cbErr) {
            cbErr(tool.getReturnError("Peer_Account is empty", -13));
            return;
          }
        }
        if (!options.MaxCnt) {
          options.MaxCnt = 15;
        }
        if (options.MaxCnt <= 0) {
          if (cbErr) {
            cbErr(tool.getReturnError("MaxCnt should be greater than 0", -14));
            return;
          }
        }
        if (options.MaxCnt > 15) {
          if (cbErr) {
            cbErr(tool.getReturnError("MaxCnt can not be greater than 15", -15));
            return;
          }
          return;
        }
        if (options.MsgKey == null || options.MsgKey === undefined) {
          options.MsgKey = '';
        }
        var opts = {
          'Peer_Account': options.Peer_Account,
          'MaxCnt': options.MaxCnt,
          'LastMsgTime': options.LastMsgTime,
          'MsgKey': options.MsgKey };

        //读取c2c漫游消息
        proto_getC2CHistoryMsgs(opts, function (resp) {
          var msgObjList = [];
          var msgInfos = [];
          //处理c2c消息
          msgInfos = resp.MsgList; //返回的消息列表
          var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, options.Peer_Account);
          if (!sess) {
            sess = new Session(SESSION_TYPE.C2C, options.Peer_Account, options.Peer_Account, '', 0, 0);
          }


          ctx.identifier = app.globalData.ctx.identifier;

          for (var i in msgInfos) {
            var msgInfo = msgInfos[i];
            var isSendMsg, id, headUrl;
            if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
              isSendMsg = true;
              id = msgInfo.To_Account; //读取接收者信息
              headUrl = '';
            } else {//当前用户收到的消息
              isSendMsg = false;
              id = msgInfo.From_Account; //读取发送者信息
              headUrl = '';
            }
            var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
            var msgBody = null;
            var msgContent = null;
            var msgType = null;
            for (var mi in msgInfo.MsgBody) {
              msgBody = msgInfo.MsgBody[mi];
              msgType = msgBody.MsgType;
              switch (msgType) {
                case MSG_ELEMENT_TYPE.TEXT:
                  msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                  break;
                case MSG_ELEMENT_TYPE.FACE:
                  msgContent = new Msg.Elem.Face(
                  msgBody.MsgContent.Index,
                  msgBody.MsgContent.Data);

                  break;
                case MSG_ELEMENT_TYPE.IMAGE:
                  msgContent = new Msg.Elem.Images(
                  msgBody.MsgContent.UUID);

                  for (var j in msgBody.MsgContent.ImageInfoArray) {
                    var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                    msgContent.addImage(
                    new Msg.Elem.Images.Image(
                    tempImg.Type,
                    tempImg.Size,
                    tempImg.Width,
                    tempImg.Height,
                    tempImg.URL));


                  }
                  break;
                case MSG_ELEMENT_TYPE.SOUND:

                  // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);

                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.Sound(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.Second,
                    msgBody.MsgContent.Size,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                  }
                  break;
                case MSG_ELEMENT_TYPE.LOCATION:
                  msgContent = new Msg.Elem.Location(
                  msgBody.MsgContent.Longitude,
                  msgBody.MsgContent.Latitude,
                  msgBody.MsgContent.Desc);

                  break;
                case MSG_ELEMENT_TYPE.FILE:
                case MSG_ELEMENT_TYPE.FILE + " ":
                  msgType = MSG_ELEMENT_TYPE.FILE;
                  // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.File(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.FileName,
                    msgBody.MsgContent.FileSize,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                  }
                  break;
                case MSG_ELEMENT_TYPE.CUSTOM:
                  msgType = MSG_ELEMENT_TYPE.CUSTOM;
                  msgContent = new Msg.Elem.Custom(
                  msgBody.MsgContent.Data,
                  msgBody.MsgContent.Desc,
                  msgBody.MsgContent.Ext);


                  break;
                default:
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                  break;}

              msg.elems.push(new Msg.Elem(msgType, msgContent));
            }
            MsgStore.addMsg(msg);
            msgObjList.push(msg);
          } // for loop

          MsgStore.updateTimeline();
          if (cbOk) {

            var newResp = {
              'Complete': resp.Complete,
              'MsgCount': msgObjList.length,
              'LastMsgTime': resp.LastMsgTime,
              'MsgKey': resp.MsgKey,
              'MsgList': msgObjList };

            sess.isFinished(resp.Complete);
            cbOk(newResp);
          }

        }, function (err) {
          log.error("getC2CHistoryMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      };

      //拉群历史消息
      //不传cbOk 和 cbErr，则会调用新消息回调函数
      this.syncGroupMsgs = function (options, cbOk, cbErr) {
        if (options.ReqMsgSeq <= 0) {
          if (cbErr) {
            var errInfo = "ReqMsgSeq must be greater than 0";
            var error = tool.getReturnError(errInfo, -16);
            cbErr(error);
          }
          return;
        }
        var opts = {
          'GroupId': options.GroupId,
          'ReqMsgSeq': options.ReqMsgSeq,
          'ReqMsgNumber': options.ReqMsgNumber };

        //读群漫游消息
        proto_getGroupMsgs(opts, function (resp) {
          var notifyInfo = [];
          var group_id = resp.GroupId; //返回的群id
          var msgInfos = resp.RspMsgList; //返回的消息列表
          var isFinished = resp.IsFinished;

          if (msgInfos == null || msgInfos === undefined) {
            if (cbOk) {
              cbOk([]);
            }
            return;
          }
          for (var i = msgInfos.length - 1; i >= 0; i--) {
            var msgInfo = msgInfos[i];
            //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
            //IsPlaceMsg=1
            if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
              continue;
            }
            var msg = handlerGroupMsg(msgInfo, true, true, isFinished);
            if (msg) {
              notifyInfo.push(msg);
            }
          } // for loop
          if (notifyInfo.length > 0)
          MsgStore.updateTimeline();
          if (cbOk) cbOk(notifyInfo);else
          if (notifyInfo.length > 0) {


            onMsgCallback = app.globalData.listeners.onMsgCallback;

            if (onMsgCallback) onMsgCallback(notifyInfo);
          }

        }, function (err) {
          log.error("getGroupMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      };

      //处理群消息(普通消息+提示消息)
      //isSyncGroupMsgs 是否主动拉取群消息标志
      //isAddMsgFlag 是否需要保存到MsgStore，如果需要，这里会存在判重逻辑
      var handlerGroupMsg = function handlerGroupMsg(msgInfo, isSyncGroupMsgs, isAddMsgFlag, isFinished) {
        if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
          return null;
        }
        var isSendMsg, id, headUrl, fromAccountNick;
        var group_id = msgInfo.ToGroupId;
        var group_name = group_id;
        if (msgInfo.GroupInfo) {//取出群名称
          if (msgInfo.GroupInfo.GroupName) {
            group_name = msgInfo.GroupInfo.GroupName;
          }
        }
        //取出成员昵称
        fromAccountNick = msgInfo.From_Account;
        if (msgInfo.GroupInfo) {
          if (msgInfo.GroupInfo.From_AccountNick) {
            fromAccountNick = msgInfo.GroupInfo.From_AccountNick;
          }
        }


        ctx.identifier = app.globalData.ctx.identifier;

        if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
          isSendMsg = true;
          id = msgInfo.From_Account; //读取接收者信息
          headUrl = '';
        } else {//当前用户收到的消息
          isSendMsg = false;
          id = msgInfo.From_Account; //读取发送者信息
          headUrl = '';
        }
        var sess = MsgStore.sessByTypeId(SESSION_TYPE.GROUP, group_id);
        if (!sess) {
          sess = new Session(SESSION_TYPE.GROUP, group_id, group_name, headUrl, 0, 0);
        }
        if (typeof isFinished !== "undefined") {
          sess.isFinished(isFinished || 0);
        }
        var subType = GROUP_MSG_SUB_TYPE.COMMON; //消息类型
        //群提示消息,重新封装下
        if (LONG_POLLINNG_EVENT_TYPE.GROUP_TIP == msgInfo.Event || LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2 == msgInfo.Event) {
          subType = GROUP_MSG_SUB_TYPE.TIP;
          var groupTip = msgInfo.MsgBody;
          msgInfo.MsgBody = [];
          msgInfo.MsgBody.push({
            "MsgType": MSG_ELEMENT_TYPE.GROUP_TIP,
            "MsgContent": groupTip });


        } else if (msgInfo.MsgPriority) {//群点赞消息
          if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.REDPACKET) {
            subType = GROUP_MSG_SUB_TYPE.REDPACKET;
          } else if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.LOVEMSG) {
            subType = GROUP_MSG_SUB_TYPE.LOVEMSG;
          }

        }
        var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account, subType, fromAccountNick);
        var msgBody = null;
        var msgContent = null;
        var msgType = null;
        for (var mi in msgInfo.MsgBody) {
          msgBody = msgInfo.MsgBody[mi];
          msgType = msgBody.MsgType;
          switch (msgType) {
            case MSG_ELEMENT_TYPE.TEXT:
              msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
              break;
            case MSG_ELEMENT_TYPE.FACE:
              msgContent = new Msg.Elem.Face(
              msgBody.MsgContent.Index,
              msgBody.MsgContent.Data);

              break;
            case MSG_ELEMENT_TYPE.IMAGE:
              msgContent = new Msg.Elem.Images(
              msgBody.MsgContent.UUID);

              for (var j in msgBody.MsgContent.ImageInfoArray) {
                msgContent.addImage(
                new Msg.Elem.Images.Image(
                msgBody.MsgContent.ImageInfoArray[j].Type,
                msgBody.MsgContent.ImageInfoArray[j].Size,
                msgBody.MsgContent.ImageInfoArray[j].Width,
                msgBody.MsgContent.ImageInfoArray[j].Height,
                msgBody.MsgContent.ImageInfoArray[j].URL));


              }
              break;
            case MSG_ELEMENT_TYPE.SOUND:
              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.Sound(
                msgBody.MsgContent.UUID,
                msgBody.MsgContent.Second,
                msgBody.MsgContent.Size,
                msgInfo.From_Account,
                msgInfo.To_Account,
                msgBody.MsgContent.Download_Flag,
                SESSION_TYPE.GROUP);

              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
              }
              break;
            case MSG_ELEMENT_TYPE.LOCATION:
              msgContent = new Msg.Elem.Location(
              msgBody.MsgContent.Longitude,
              msgBody.MsgContent.Latitude,
              msgBody.MsgContent.Desc);

              break;
            case MSG_ELEMENT_TYPE.FILE:
            case MSG_ELEMENT_TYPE.FILE + " ":
              msgType = MSG_ELEMENT_TYPE.FILE;
              var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.File(
                msgBody.MsgContent.UUID,
                msgBody.MsgContent.FileName,
                msgBody.MsgContent.FileSize,
                msgInfo.From_Account,
                msgInfo.To_Account,
                msgBody.MsgContent.Download_Flag,
                SESSION_TYPE.GROUP);

              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[文件消息]地址解析出错');
              }
              break;
            case MSG_ELEMENT_TYPE.GROUP_TIP:
              var opType = msgBody.MsgContent.OpType;
              msgContent = new Msg.Elem.GroupTip(
              opType,
              msgBody.MsgContent.Operator_Account,
              group_id,
              msgInfo.GroupInfo.GroupName,
              msgBody.MsgContent.List_Account);

              if (GROUP_TIP_TYPE.JOIN == opType || GROUP_TIP_TYPE.QUIT == opType) {//加群或退群时，设置最新群成员数
                msgContent.setGroupMemberNum(msgBody.MsgContent.MemberNum);
              } else if (GROUP_TIP_TYPE.MODIFY_GROUP_INFO == opType) {//群资料变更
                var tempIsCallbackFlag = false;
                var tempNewGroupInfo = {
                  "GroupId": group_id,
                  "GroupFaceUrl": null,
                  "GroupName": null,
                  "OwnerAccount": null,
                  "GroupNotification": null,
                  "GroupIntroduction": null };

                var msgGroupNewInfo = msgBody.MsgContent.MsgGroupNewInfo;
                if (msgGroupNewInfo.GroupFaceUrl) {
                  var tmpNGIFaceUrl = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL,
                  msgGroupNewInfo.GroupFaceUrl);

                  msgContent.addGroupInfo(tmpNGIFaceUrl);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupFaceUrl = msgGroupNewInfo.GroupFaceUrl;
                }
                if (msgGroupNewInfo.GroupName) {
                  var tmpNGIName = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME,
                  msgGroupNewInfo.GroupName);

                  msgContent.addGroupInfo(tmpNGIName);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupName = msgGroupNewInfo.GroupName;
                }
                if (msgGroupNewInfo.Owner_Account) {
                  var tmpNGIOwner = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER,
                  msgGroupNewInfo.Owner_Account);

                  msgContent.addGroupInfo(tmpNGIOwner);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.OwnerAccount = msgGroupNewInfo.Owner_Account;
                }
                if (msgGroupNewInfo.GroupNotification) {
                  var tmpNGINotification = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION,
                  msgGroupNewInfo.GroupNotification);

                  msgContent.addGroupInfo(tmpNGINotification);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupNotification = msgGroupNewInfo.GroupNotification;
                }
                if (msgGroupNewInfo.GroupIntroduction) {
                  var tmpNGIIntroduction = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION,
                  msgGroupNewInfo.GroupIntroduction);

                  msgContent.addGroupInfo(tmpNGIIntroduction);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupIntroduction = msgGroupNewInfo.GroupIntroduction;
                }

                //回调群资料变化通知方法
                if (isSyncGroupMsgs == false && tempIsCallbackFlag && onGroupInfoChangeCallback) {
                  onGroupInfoChangeCallback(tempNewGroupInfo);
                }

              } else if (GROUP_TIP_TYPE.MODIFY_MEMBER_INFO == opType) {//群成员变更
                var memberInfos = msgBody.MsgContent.MsgMemberInfo;
                for (var n in memberInfos) {
                  var memberInfo = memberInfos[n];
                  msgContent.addMemberInfo(
                  new Msg.Elem.GroupTip.MemberInfo(
                  memberInfo.User_Account, memberInfo.ShutupTime));


                }
              }
              break;
            case MSG_ELEMENT_TYPE.CUSTOM:
              msgType = MSG_ELEMENT_TYPE.CUSTOM;
              msgContent = new Msg.Elem.Custom(
              msgBody.MsgContent.Data,
              msgBody.MsgContent.Desc,
              msgBody.MsgContent.Ext);

              break;
            default:
              msgType = MSG_ELEMENT_TYPE.TEXT;
              msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
              break;}

          msg.elems.push(new Msg.Elem(msgType, msgContent));
        }

        if (isAddMsgFlag == false) {//不需要保存消息
          return msg;
        }


        if (MsgStore.addMsg(msg)) {
          // console.log('封装数据：',msg)


          return msg;
        } else {
          return null;
        }
      };

      //初始化
      this.init = function (listeners, cbOk, cbErr) {

        app.globalData.listeners = listeners;

        if (!listeners.onMsgNotify) {
          log.warn('listeners.onMsgNotify is empty');
        }
        onMsgCallback = listeners.onMsgNotify;

        app.globalData.listeners.onMsgCallback = listeners.onMsgNotify;

        if (listeners.onBigGroupMsgNotify) {
          onBigGroupMsgCallback = listeners.onBigGroupMsgNotify;
        } else {
          log.warn('listeners.onBigGroupMsgNotify is empty');
        }

        if (listeners.onC2cEventNotifys) {
          onC2cEventCallbacks = listeners.onC2cEventNotifys;
        } else {
          log.warn('listeners.onC2cEventNotifys is empty');
        }
        if (listeners.onGroupSystemNotifys) {
          onGroupSystemNotifyCallbacks = listeners.onGroupSystemNotifys;
        } else {
          log.warn('listeners.onGroupSystemNotifys is empty');
        }
        if (listeners.onGroupInfoChangeNotify) {
          onGroupInfoChangeCallback = listeners.onGroupInfoChangeNotify;
        } else {
          log.warn('listeners.onGroupInfoChangeNotify is empty');
        }
        if (listeners.onFriendSystemNotifys) {
          onFriendSystemNotifyCallbacks = listeners.onFriendSystemNotifys;
        } else {
          log.warn('listeners.onFriendSystemNotifys is empty');
        }
        if (listeners.onProfileSystemNotifys) {
          onProfileSystemNotifyCallbacks = listeners.onProfileSystemNotifys;
        } else {
          log.warn('listeners.onProfileSystemNotifys is empty');
        }
        if (listeners.onKickedEventCall) {
          onKickedEventCall = listeners.onKickedEventCall;
        } else {
          log.warn('listeners.onKickedEventCall is empty');
        }

        if (listeners.onAppliedDownloadUrl) {
          onAppliedDownloadUrl = listeners.onAppliedDownloadUrl;
        } else {
          log.warn('listeners.onAppliedDownloadUrl is empty');
        }

        ctx.identifier = app.globalData.ctx.identifier;

        if (!ctx.identifier || !ctx.userSig) {
          if (cbOk) {
            var success = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0,
              'ErrorInfo': "login success(no login state)" };

            cbOk(success);
          }
          return;
        }

        //初始化
        initMyGroupMaxSeqs(
        function (resp) {
          log.info('initMyGroupMaxSeqs success');
          //初始化文件
          initIpAndAuthkey(
          function (initIpAndAuthkeyResp) {
            log.info('initIpAndAuthkey success');
            if (cbOk) {
              log.info('login success(have login state))');
              var success = {
                'ActionStatus': ACTION_STATUS.OK,
                'ErrorCode': 0,
                'ErrorInfo': "login success" };

              cbOk(success);
            }
            MsgManager.setLongPollingOn(true); //开启长轮询
            longPollingOn && MsgManager.longPolling(cbOk);
          }, cbErr);
        }, cbErr);
      };

      //发消息（私聊或群聊）
      this.sendMsg = function (msg, cbOk, cbErr) {
        proto_sendMsg(msg, function (resp) {
          //私聊时，加入自己的发的消息，群聊时，由于seq和服务器的seq不一样，所以不作处理
          if (msg.sess.type() == SESSION_TYPE.C2C) {
            if (!MsgStore.addMsg(msg)) {
              var errInfo = "sendMsg: addMsg failed!";
              var error = tool.getReturnError(errInfo, -17);
              log.error(errInfo);
              if (cbErr) cbErr(error);
              return;
            }
            //更新信息流时间
            MsgStore.updateTimeline();
          }
          if (cbOk) cbOk(resp);
        }, function (err) {
          if (cbErr) cbErr(err);
        });
      };
    }();

    //上传文件
    var FileUploader = new function () {
      this.fileMd5 = null;
      //获取文件MD5
      var getFileMD5 = function getFileMD5(file, cbOk, cbErr) {

        //FileReader pc浏览器兼容性
        //Feature   Firefox (Gecko) Chrome  Internet Explorer   Opera   Safari
        //Basic support 3.6 7   10                      12.02   6.0.2
        var fileReader = null;
        try {
          fileReader = new FileReader(); //分块读取文件对象
        } catch (e) {
          if (cbErr) {
            cbErr(tool.getReturnError('当前浏览器不支持FileReader', -18));
            return;
          }
        }
        //file的slice方法，注意它的兼容性，在不同浏览器的写法不同
        var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
        if (!blobSlice) {
          if (cbErr) {
            cbErr(tool.getReturnError('当前浏览器不支持FileAPI', -19));
            return;
          }
        }

        var chunkSize = 2 * 1024 * 1024; //分块大小，2M
        var chunks = Math.ceil(file.size / chunkSize); //总块数
        var currentChunk = 0; //当前块数
        var spark = new SparkMD5(); //获取MD5对象

        fileReader.onload = function (e) {//数据加载完毕事件

          var binaryStr = "";
          var bytes = new Uint8Array(e.target.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binaryStr += String.fromCharCode(bytes[i]); //二进制转换字符串
          }
          spark.appendBinary(binaryStr);
          currentChunk++;
          if (currentChunk < chunks) {
            loadNext(); //读取下一块数据
          } else {
            this.fileMd5 = spark.end(); //得到文件MD5值
            if (cbOk) {
              cbOk(this.fileMd5);
            }
          }
        };
        //分片读取文件
        function loadNext() {
          var start = currentChunk * chunkSize,end = start + chunkSize >= file.size ? file.size : start + chunkSize;
          //根据开始和结束位置，切割文件
          var b = blobSlice.call(file, start, end);
          //readAsBinaryString ie浏览器不兼容此方法
          //fileReader.readAsBinaryString(blobSlice.call(file, start, end));
          fileReader.readAsArrayBuffer(b); //ie，chrome，firefox等主流浏览器兼容此方法

        }

        loadNext(); //开始读取
      };
      //提交上传图片表单(用于低版本IE9以下)
      this.submitUploadFileForm = function (options, cbOk, cbErr) {
        var errInfo;
        var error;
        var formId = options.formId;
        var fileId = options.fileId;
        var iframeNum = uploadResultIframeId++;
        var iframeName = "uploadResultIframe_" + iframeNum;
        var toAccount = options.To_Account;
        var businessType = options.businessType;

        var form = document.getElementById(formId);
        if (!form) {
          errInfo = "获取表单对象为空: formId=" + formId + "(formId非法)";
          error = tool.getReturnError(errInfo, -20);
          if (cbErr) cbErr(error);
          return;
        }

        var fileObj = document.getElementById(fileId);
        if (!fileObj) {
          errInfo = "获取文件对象为空: fileId=" + fileId + "(没有选择文件或者fileId非法)";
          error = tool.getReturnError(errInfo, -21);
          if (cbErr) cbErr(error);
          return;
        }
        //fileObj.type="file";//ie8下不起作用，必须由业务自己设置
        fileObj.name = "file";

        var iframe = document.createElement("iframe");
        iframe.name = iframeName;
        iframe.id = iframeName;
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        var cmdName;
        if (isAccessFormalEnv()) {
          cmdName = 'pic_up';
        } else {
          cmdName = 'pic_up_test';
        }
        var uploadApiUrl = "https://pic.tim.qq.com/v4/openpic/" + cmdName + "?tinyid=" + ctx.tinyid + "&a2=" + ctx.a2 + "&sdkappid=" + ctx.sdkAppID + "&accounttype=" + ctx.accountType + "&contenttype=http";
        form.action = uploadApiUrl;
        form.method = 'post';
        //form.enctype='multipart/form-data';//ie8下不起作用，必须由业务自己设置
        form.target = iframeName;

        function createFormInput(name, value) {
          var tempInput = document.createElement("input");
          tempInput.type = "hidden";
          tempInput.name = name;
          tempInput.value = value;
          form.appendChild(tempInput);
        }


        ctx.identifier = app.globalData.ctx.identifier;

        createFormInput("App_Version", VERSION_INFO.APP_VERSION);
        createFormInput("From_Account", ctx.identifier);
        createFormInput("To_Account", toAccount);
        createFormInput("Seq", nextSeq().toString());
        createFormInput("Timestamp", unixtime().toString());
        createFormInput("Random", createRandom().toString());
        createFormInput("Busi_Id", businessType);
        createFormInput("PkgFlag", UPLOAD_RES_PKG_FLAG.RAW_DATA.toString());
        createFormInput("Auth_Key", authkey);
        createFormInput("Server_Ver", VERSION_INFO.SERVER_VERSION.toString());
        createFormInput("File_Type", options.fileType);


        //检测iframe.contentWindow.name是否有值
        function checkFrameName() {
          var resp;
          try {
            resp = JSON.parse(iframe.contentWindow.name) || {};
          } catch (e) {
            resp = {};
          }
          if (resp.ActionStatus) {//上传接口返回
            // We've got what we need. Stop the iframe from loading further content.
            iframe.src = "about:blank";
            iframe.parentNode.removeChild(iframe);
            iframe = null;

            if (resp.ActionStatus == ACTION_STATUS.OK) {
              cbOk && cbOk(resp);
            } else {
              cbErr && cbErr(resp);
            }
          } else {
            setTimeout(checkFrameName, 100);
          }
        }

        setTimeout(checkFrameName, 500);

        form.submit(); //提交上传图片表单
      };
      //上传图片或文件(用于高版本浏览器，支持FileAPI)
      this.uploadFile = function (options, cbOk, cbErr) {

        var file_upload = {
          //初始化
          init: function init(options, cbOk, cbErr) {
            var me = this;
            me.file = options.file;
            //分片上传进度回调事件
            me.onProgressCallBack = options.onProgressCallBack;
            //停止上传图片按钮
            if (options.abortButton) {
              options.abortButton.onclick = me.abortHandler;
            }


            ctx.identifier = app.globalData.ctx.identifier;

            me.total = me.file.size; //文件总大小
            me.loaded = 0; //已读取字节数
            me.step = 1080 * 1024; //分块大小，1080K
            me.sliceSize = 0; //分片大小
            me.sliceOffset = 0; //当前分片位置
            me.timestamp = unixtime(); //当前时间戳
            me.seq = nextSeq(); //请求seq
            me.random = createRandom(); //请求随机数
            me.fromAccount = ctx.identifier; //发送者
            me.toAccount = options.To_Account; //接收者
            me.fileMd5 = options.fileMd5; //文件MD5
            me.businessType = options.businessType; //图片或文件的业务类型，群消息:1; c2c消息:2; 个人头像：3; 群头像：4;
            me.fileType = options.fileType; //文件类型，不填为默认认为上传的是图片；1：图片；2：文件；3：短视频；4：PTT

            me.cbOk = cbOk; //上传成功回调事件
            me.cbErr = cbErr; //上传失败回调事件

            me.reader = new FileReader(); //读取文件对象
            me.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice; //file的slice方法,不同浏览器不一样

            me.reader.onloadstart = me.onLoadStart; //开始读取回调事件
            me.reader.onprogress = me.onProgress; //读取文件进度回调事件
            me.reader.onabort = me.onAbort; //停止读取回调事件
            me.reader.onerror = me.onerror; //读取发生错误回调事件
            me.reader.onload = me.onLoad; //分片加载完毕回调事件
            me.reader.onloadend = me.onLoadEnd; //读取文件完毕回调事件
          },
          //上传方法
          upload: function upload() {
            var me = file_upload;
            //读取第一块
            me.readBlob(0);
          },
          onLoadStart: function onLoadStart() {
            var me = file_upload;
          },
          onProgress: function onProgress(e) {
            var me = file_upload;
            me.loaded += e.loaded;
            if (me.onProgressCallBack) {
              me.onProgressCallBack(me.loaded, me.total);
            }
          },
          onAbort: function onAbort() {
            var me = file_upload;
          },
          onError: function onError() {
            var me = file_upload;
          },
          onLoad: function onLoad(e) {
            var me = file_upload;
            if (e.target.readyState == FileReader.DONE) {
              var slice_data_base64 = e.target.result;
              //注意，一定要去除base64编码头部
              var pos = slice_data_base64.indexOf(",");
              if (pos != -1) {
                slice_data_base64 = slice_data_base64.substr(pos + 1);
              }
              //封装上传图片接口的请求参数
              var opt = {
                'From_Account': me.fromAccount,
                'To_Account': me.toAccount,
                'Busi_Id': me.businessType,
                'File_Type': me.fileType,
                'File_Str_Md5': me.fileMd5,
                'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
                'File_Size': me.total,
                'Slice_Offset': me.sliceOffset,
                'Slice_Size': me.sliceSize,
                'Slice_Data': slice_data_base64,
                'Seq': me.seq,
                'Timestamp': me.timestamp,
                'Random': me.random };


              //上传成功的成功回调
              var succCallback = function succCallback(resp) {
                if (resp.IsFinish == 0) {
                  me.loaded = resp.Next_Offset;
                  if (me.loaded < me.total) {
                    me.readBlob(me.loaded);
                  } else {
                    me.loaded = me.total;
                  }
                } else {

                  if (me.cbOk) {
                    var tempResp = {
                      'ActionStatus': resp.ActionStatus,
                      'ErrorCode': resp.ErrorCode,
                      'ErrorInfo': resp.ErrorInfo,
                      'File_UUID': resp.File_UUID,
                      'File_Size': resp.Next_Offset,
                      'URL_INFO': resp.URL_INFO,
                      'Download_Flag': resp.Download_Flag };


                    ctx.identifier = app.globalData.ctx.identifier;

                    if (me.fileType == UPLOAD_RES_TYPE.FILE) {//如果上传的是文件，下载地址需要sdk内部拼接
                      tempResp.URL_INFO = getFileDownUrl(resp.File_UUID, ctx.identifier, me.file.name);
                    }
                    me.cbOk(tempResp);
                  }
                }
                Upload_Retry_Times = 0;
              };
              //上传失败的回调
              var errorCallback = function errorCallback(resp) {
                if (Upload_Retry_Times < Upload_Retry_Max_Times) {
                  Upload_Retry_Times++;
                  setTimeout(function () {
                    proto_uploadPic(opt, succCallback, errorCallback);
                  }, 1000);
                } else {
                  me.cbErr(resp);
                }
                //me.cbErr
              };
              //分片上传图片接口
              proto_uploadPic(opt, succCallback, errorCallback);
            }
          },
          onLoadEnd: function onLoadEnd() {
            var me = file_upload;
          },
          //分片读取文件方法
          readBlob: function readBlob(start) {
            var me = file_upload;
            var blob,file = me.file;
            var end = start + me.step;
            if (end > me.total) {
              end = me.total;
              me.sliceSize = end - start;
            } else {
              me.sliceSize = me.step;
            }
            me.sliceOffset = start;
            //根据起始和结束位置，分片读取文件
            blob = me.blobSlice.call(file, start, end);
            //将分片的二进制数据转换为base64编码
            me.reader.readAsDataURL(blob);
          },
          abortHandler: function abortHandler() {
            var me = file_upload;
            if (me.reader) {
              me.reader.abort();
            }
          } };


        //读取文件MD5
        getFileMD5(options.file,
        function (fileMd5) {
          log.info('fileMd5: ' + fileMd5);
          options.fileMd5 = fileMd5;
          //初始化上传参数
          file_upload.init(options, cbOk, cbErr);
          //开始上传文件
          file_upload.upload();
        },
        cbErr);

      };
    }();


    //web im 基础对象

    //常量对象

    //会话类型
    webim.SESSION_TYPE = SESSION_TYPE;

    webim.MSG_MAX_LENGTH = MSG_MAX_LENGTH;

    //c2c消息子类型
    webim.C2C_MSG_SUB_TYPE = C2C_MSG_SUB_TYPE;

    //群消息子类型
    webim.GROUP_MSG_SUB_TYPE = GROUP_MSG_SUB_TYPE;

    //消息元素类型
    webim.MSG_ELEMENT_TYPE = MSG_ELEMENT_TYPE;

    //群提示消息类型
    webim.GROUP_TIP_TYPE = GROUP_TIP_TYPE;

    //图片类型
    webim.IMAGE_TYPE = IMAGE_TYPE;

    //群系统消息类型
    webim.GROUP_SYSTEM_TYPE = GROUP_SYSTEM_TYPE;

    //好友系统通知子类型
    webim.FRIEND_NOTICE_TYPE = FRIEND_NOTICE_TYPE;

    //群提示消息-群资料变更类型
    webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE = GROUP_TIP_MODIFY_GROUP_INFO_TYPE;

    //浏览器信息
    webim.BROWSER_INFO = BROWSER_INFO;

    //表情对象
    webim.Emotions = webim.EmotionPicData = emotions;
    //表情标识符和index Map
    webim.EmotionDataIndexs = webim.EmotionPicDataIndex = emotionDataIndexs;

    //腾讯登录服务错误码(托管模式)
    webim.TLS_ERROR_CODE = TLS_ERROR_CODE;

    //连接状态
    webim.CONNECTION_STATUS = CONNECTION_STATUS;

    //上传图片业务类型
    webim.UPLOAD_PIC_BUSSINESS_TYPE = UPLOAD_PIC_BUSSINESS_TYPE;

    //最近联系人类型
    webim.RECENT_CONTACT_TYPE = RECENT_CONTACT_TYPE;

    //上传资源类型
    webim.UPLOAD_RES_TYPE = UPLOAD_RES_TYPE;


    /**************************************/

    //类对象
    //
    //工具对象
    webim.Tool = tool;
    //控制台打印日志对象
    webim.Log = log;

    //消息对象
    webim.Msg = Msg;
    //会话对象
    webim.Session = Session;
    //会话存储对象
    webim.MsgStore = {
      sessMap: function sessMap() {
        return MsgStore.sessMap();
      },
      sessCount: function sessCount() {
        return MsgStore.sessCount();
      },
      sessByTypeId: function sessByTypeId(type, id) {
        return MsgStore.sessByTypeId(type, id);
      },
      delSessByTypeId: function delSessByTypeId(type, id) {
        return MsgStore.delSessByTypeId(type, id);
      },
      resetCookieAndSyncFlag: function resetCookieAndSyncFlag() {
        return MsgStore.resetCookieAndSyncFlag();
      } };


    webim.Resources = Resources;

    /**************************************/

    // webim API impl
    //
    //基本接口
    //登录
    webim.login = webim.init = function (loginInfo, listeners, opts, cbOk, cbErr) {

      app.globalData.listeners = listeners;


      console.log('loginInfo -----', loginInfo);
      MsgManager.resetLongPollingInfo();
      //初始化连接状态回调函数
      ConnManager.init(listeners.onConnNotify, cbOk, cbErr);

      //设置ie9以下浏览器jsonp回调
      if (listeners.jsonpCallback) jsonpCallback = listeners.jsonpCallback;
      //登录
      _login(loginInfo, listeners, opts, cbOk, cbErr);
    };
    //登出
    //需要传长轮询id
    //这样登出之后其他的登录实例还可以继续收取消息
    webim.logout = webim.offline = function (cbOk, cbErr) {
      return proto_logout('instance', cbOk, cbErr);
    };

    //登出
    //这种登出方式，所有的实例都将不会收到消息推送，直到重新登录
    webim.logoutAll = function (cbOk, cbErr) {
      return proto_logout('all', cbOk, cbErr);
    };


    //消息管理接口
    //发消息接口（私聊和群聊）
    webim.sendMsg = function (msg, cbOk, cbErr) {
      return MsgManager.sendMsg(msg, cbOk, cbErr);
    };
    //拉取未读c2c消息
    webim.syncMsgs = function (cbOk, cbErr) {
      return MsgManager.syncMsgs(cbOk, cbErr);
    };
    //拉取C2C漫游消息
    webim.getC2CHistoryMsgs = function (options, cbOk, cbErr) {
      return MsgManager.getC2CHistoryMsgs(options, cbOk, cbErr);
    };
    //拉取群漫游消息
    webim.syncGroupMsgs = function (options, cbOk, cbErr) {
      return MsgManager.syncGroupMsgs(options, cbOk, cbErr);
    };

    //上报c2c消息已读
    webim.c2CMsgReaded = function (options, cbOk, cbErr) {
      return MsgStore.c2CMsgReaded(options, cbOk, cbErr);
    };

    //上报群消息已读
    webim.groupMsgReaded = function (options, cbOk, cbErr) {
      return proto_groupMsgReaded(options, cbOk, cbErr);
    };

    //设置聊天会话自动标记已读
    webim.setAutoRead = function (selSess, isOn, isResetAll) {
      return MsgStore.setAutoRead(selSess, isOn, isResetAll);
    };

    //群组管理接口
    //
    //创建群
    webim.createGroup = function (options, cbOk, cbErr) {
      return proto_createGroup(options, cbOk, cbErr);
    };
    //创建群-高级接口
    webim.createGroupHigh = function (options, cbOk, cbErr) {
      return proto_createGroupHigh(options, cbOk, cbErr);
    };
    //申请加群
    webim.applyJoinGroup = function (options, cbOk, cbErr) {
      return proto_applyJoinGroup(options, cbOk, cbErr);
    };
    //处理加群申请(同意或拒绝)
    webim.handleApplyJoinGroupPendency = function (options, cbOk, cbErr) {
      return proto_handleApplyJoinGroupPendency(options, cbOk, cbErr);
    };

    //删除加群申请
    webim.deleteApplyJoinGroupPendency = function (options, cbOk, cbErr) {
      return proto_deleteC2CMsg(options, cbOk, cbErr);
    };

    //主动退群
    webim.quitGroup = function (options, cbOk, cbErr) {
      return proto_quitGroup(options, cbOk, cbErr);
    };
    //搜索群组(根据名称)
    webim.searchGroupByName = function (options, cbOk, cbErr) {
      return proto_searchGroupByName(options, cbOk, cbErr);
    };
    //获取群组公开资料(根据群id搜索)
    webim.getGroupPublicInfo = function (options, cbOk, cbErr) {
      return proto_getGroupPublicInfo(options, cbOk, cbErr);
    };
    //获取群组详细资料-高级接口
    webim.getGroupInfo = function (options, cbOk, cbErr) {
      return proto_getGroupInfo(options, cbOk, cbErr);
    };
    //修改群基本资料
    webim.modifyGroupBaseInfo = function (options, cbOk, cbErr) {
      return proto_modifyGroupBaseInfo(options, cbOk, cbErr);
    };
    //获取群成员列表
    webim.getGroupMemberInfo = function (options, cbOk, cbErr) {
      return proto_getGroupMemberInfo(options, cbOk, cbErr);
    };
    //邀请好友加群
    webim.addGroupMember = function (options, cbOk, cbErr) {
      return proto_addGroupMember(options, cbOk, cbErr);
    };
    //修改群成员资料
    webim.modifyGroupMember = function (options, cbOk, cbErr) {
      return proto_modifyGroupMember(options, cbOk, cbErr);
    };
    //删除群成员
    webim.deleteGroupMember = function (options, cbOk, cbErr) {
      return proto_deleteGroupMember(options, cbOk, cbErr);
    };
    //解散群
    webim.destroyGroup = function (options, cbOk, cbErr) {
      return proto_destroyGroup(options, cbOk, cbErr);
    };
    //转让群组
    webim.changeGroupOwner = function (options, cbOk, cbErr) {
      return proto_changeGroupOwner(options, cbOk, cbErr);
    };

    //获取我的群组列表-高级接口
    webim.getJoinedGroupListHigh = function (options, cbOk, cbErr) {
      return proto_getJoinedGroupListHigh(options, cbOk, cbErr);
    };
    //获取群成员角色
    webim.getRoleInGroup = function (options, cbOk, cbErr) {
      return proto_getRoleInGroup(options, cbOk, cbErr);
    };
    //设置群成员禁言时间
    webim.forbidSendMsg = function (options, cbOk, cbErr) {
      return proto_forbidSendMsg(options, cbOk, cbErr);
    };
    //发送自定义群系统通知
    webim.sendCustomGroupNotify = function (options, cbOk, cbErr) {
      return proto_sendCustomGroupNotify(options, cbOk, cbErr);
    };

    //进入大群
    webim.applyJoinBigGroup = function (options, cbOk, cbErr) {
      return proto_applyJoinBigGroup(options, cbOk, cbErr);
    };
    //退出大群
    webim.quitBigGroup = function (options, cbOk, cbErr) {
      return proto_quitBigGroup(options, cbOk, cbErr);
    };

    //资料关系链管理接口
    //
    //获取个人资料接口，可用于搜索用户
    webim.getProfilePortrait = function (options, cbOk, cbErr) {
      return proto_getProfilePortrait(options, cbOk, cbErr);
    };
    //设置个人资料
    webim.setProfilePortrait = function (options, cbOk, cbErr) {
      return proto_setProfilePortrait(options, cbOk, cbErr);
    };
    //申请加好友
    webim.applyAddFriend = function (options, cbOk, cbErr) {
      return proto_applyAddFriend(options, cbOk, cbErr);
    };
    //获取好友申请列表
    webim.getPendency = function (options, cbOk, cbErr) {
      return proto_getPendency(options, cbOk, cbErr);
    };
    //删除好友申请
    webim.deletePendency = function (options, cbOk, cbErr) {
      return proto_deletePendency(options, cbOk, cbErr);
    };
    //处理好友申请
    webim.responseFriend = function (options, cbOk, cbErr) {
      return proto_responseFriend(options, cbOk, cbErr);
    };
    //获取我的好友
    webim.getAllFriend = function (options, cbOk, cbErr) {
      return proto_getAllFriend(options, cbOk, cbErr);
    };
    //删除好友
    webim.deleteFriend = function (options, cbOk, cbErr) {
      return proto_deleteFriend(options, cbOk, cbErr);
    };
    //拉黑
    webim.addBlackList = function (options, cbOk, cbErr) {
      return proto_addBlackList(options, cbOk, cbErr);
    };
    //删除黑名单
    webim.deleteBlackList = function (options, cbOk, cbErr) {
      return proto_deleteBlackList(options, cbOk, cbErr);
    };
    //获取我的黑名单
    webim.getBlackList = function (options, cbOk, cbErr) {
      return proto_getBlackList(options, cbOk, cbErr);
    };

    //获取最近会话
    webim.getRecentContactList = function (options, cbOk, cbErr) {
      return proto_getRecentContactList(options, cbOk, cbErr);
    };

    //图片或文件服务接口
    //
    //上传文件接口（高版本浏览器）
    webim.uploadFile = webim.uploadPic = function (options, cbOk, cbErr) {
      return FileUploader.uploadFile(options, cbOk, cbErr);
    };
    //提交上传图片表单接口（用于低版本ie）
    webim.submitUploadFileForm = function (options, cbOk, cbErr) {
      return FileUploader.submitUploadFileForm(options, cbOk, cbErr);
    };
    //上传图片或文件(Base64)接口
    webim.uploadFileByBase64 = webim.uploadPicByBase64 = function (options, cbOk, cbErr) {
      //请求参数
      var opt = {
        'To_Account': options.toAccount,
        'Busi_Id': options.businessType,
        'File_Type': options.File_Type,
        'File_Str_Md5': options.fileMd5,
        'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
        'File_Size': options.totalSize,
        'Slice_Offset': 0,
        'Slice_Size': options.totalSize,
        'Slice_Data': options.base64Str,
        'Seq': nextSeq(),
        'Timestamp': unixtime(),
        'Random': createRandom() };

      return proto_uploadPic(opt, cbOk, cbErr);
    };

    //设置jsonp返回的值
    webim.setJsonpLastRspData = function (rspData) {
      jsonpLastRspData = typeof rspData == "string" ? JSON.parse(rspData) : rspData;
    };

    //获取长轮询ID
    webim.getLongPollingId = function (options, cbOk, cbErr) {
      return proto_getLongPollingId(options, cbOk, cbErr);
    };

    //获取下载地址
    webim.applyDownload = function (options, cbOk, cbErr) {
      return proto_applyDownload(options, cbOk, cbErr);
    };

    //获取下载地址
    webim.onDownFile = function (uuid) {
      window.open(Resources.downloadMap["uuid_" + uuid]);
    };

    //检查是否登录
    webim.checkLogin = function (cbErr, isNeedCallBack) {
      return checkLogin(cbErr, isNeedCallBack);
    };
  })(webim);
  return webim;
}();

/***/ }),

/***/ 158:
/*!*********************************************************************!*\
  !*** D:/微品匠心/qiketang/wxcomponents/mlvb-live-room/webim_handler.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var webim = __webpack_require__(/*! ./webim_wx.js */ 157);
var selToID,
loginInfo = {},
accountMode,
accountType,
sdkAppID,
avChatRoomId,
selType = "GROUP",
selToID,
selSess,
selSessHeadUrl;



var app = getApp();

//监听大群新消息（普通，点赞，提示，红包）
function onBigGroupMsgNotify(msgList, textMessageCallback, sketchpadDataCallback) {

  for (var i = msgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
    var msg = msgList[i];
    //console.warn(msg);
    webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
    //显示收到的消息
    // callback(showMsg(msg));

    handleGroupMessage(msg, textMessageCallback, sketchpadDataCallback);
    // console.log('监听大群新消息', msg);
    //showMsg(msg);
  }
}

function handleGroupMessage(msg, textMessageCallback, sketchpadDataCallback) {
  console.log('0x256 - handleGroupMessage:', JSON.stringify(msg));
  textMessageCallback && textMessageCallback(showMsg(msg));
  var elems, elem, type, content, ext;
  elems = msg.getElems(); //获取消息包含的元素数组
  // 屏蔽自己的白板消息

  loginInfo.identifier = app.globalData.loginInfo.identifier;

  console.log("----> msg.fromAccount: ".concat(msg.fromAccount, ", identifier: ").concat(loginInfo.identifier));
  if (msg.fromAccount === loginInfo.identifier) {
    console.log('self msg');
    return;
  }
  for (var i in elems) {
    elem = elems[i];
    if (!elem) continue;
    type = elem.getType(); //获取元素类型
    console.log('0x256 - type: ' + type);
    content = elem.getContent(); //获取元素对象
    if (!content) {
      console.log('content is null');
      continue;
    }
    if (type === 'TIMCustomElem') {
      var _ext = content.getExt(); //'白板标签'
      var data = content.getData(); //数据
      if (_ext === 'TXWhiteBoardExt') {
        console.log('无压缩数据类型： TXWhiteBoardExt');
        sketchpadDataCallback && sketchpadDataCallback(data);
        break;
      }
    } else if (type === 'TIMCustomFile') {
      console.warn('已压缩压缩数据类型： TXWhiteBoardExt_gzip_');
    }
  }
}

//监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList, callback) {

  var newMsg;
  for (var j in newMsgList) {//遍历新消息
    newMsg = newMsgList[j];
    handlderMsg(newMsg, callback); //处理新消息
  }
}

//处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
function handlderMsg(msg, callback) {
  var fromAccount, fromAccountNick, sessType, subType, contentHtml;

  fromAccount = msg.getFromAccount();
  if (!fromAccount) {
    fromAccount = '';
  }
  fromAccountNick = msg.getFromAccountNick();
  if (!fromAccountNick) {
    fromAccountNick = fromAccount;
  }

  //解析消息
  //获取会话类型
  //webim.SESSION_TYPE.GROUP-群聊，
  //webim.SESSION_TYPE.C2C-私聊，
  sessType = msg.getSession().type();
  //获取消息子类型
  //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
  //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
  subType = msg.getSubType();

  switch (sessType) {
    case webim.SESSION_TYPE.C2C: //私聊消息
      switch (subType) {
        case webim.C2C_MSG_SUB_TYPE.COMMON: //c2c普通消息
          //业务可以根据发送者帐号fromAccount是否为app管理员帐号，来判断c2c消息是否为全员推送消息，还是普通好友消息
          //或者业务在发送全员推送消息时，发送自定义类型(webim.MSG_ELEMENT_TYPE.CUSTOM,即TIMCustomElem)的消息，在里面增加一个字段来标识消息是否为推送消息
          contentHtml = convertMsgtoHtml(msg);
          webim.Log.warn('receive a new c2c msg: fromAccountNick=' + fromAccountNick + ", content=" + contentHtml);
          //c2c消息一定要调用已读上报接口
          var opts = {
            'To_Account': fromAccount, //好友帐号
            'LastedMsgTime': msg.getTime() //消息时间戳
          };
          webim.c2CMsgReaded(opts);
          if (callback) {
            var resMsg = {
              fromAccountNick: fromAccountNick,
              content: contentHtml };

            callback(resMsg);
          }

          console.error('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ", 内容=" + contentHtml);
          break;}

      break;
    case webim.SESSION_TYPE.GROUP: //普通群消息，对于直播聊天室场景，不需要作处理
      break;}

}

//sdk登录
function sdkLogin(userInfo, listeners, options, avChatRoomId, callback, callbackOptions) {
  //web sdk 登录


  webim.login(userInfo, listeners, options,
  function (identifierNick) {
    //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
    webim.Log.info('sdkLogin webim登录成功', userInfo);
    loginInfo = userInfo;

    app.globalData.loginInfo = userInfo;

    setProfilePortrait({
      'ProfileItem': [{
        "Tag": "Tag_Profile_IM_Nick",
        "Value": userInfo.identifierNick }] },

    function (ret) {
      if (ret) {
        // 设置昵称失败
        callback & callback({
          errCode: ret.ErrorCode,
          errMsg: ret.ErrorInfo || '修改昵称失败',
          callback: callbackOptions });

        return;
      }
      if (avChatRoomId)
      applyJoinBigGroup(avChatRoomId); //加入大群
      callback & callback({
        errCode: 0,
        errMsg: '',
        callback: callbackOptions });

    });
    //hideDiscussForm();//隐藏评论表单
    //initEmotionUL();//初始化表情
  },
  function (err) {
    console.error(err.ErrorInfo);
    console.log('webim登录失败');
    callback & callback({
      errCode: err,
      errMsg: err.ErrorInfo,
      callback: callbackOptions });

  });
  //
}

//修改昵称
function setProfilePortrait(options, callback) {
  webim.setProfilePortrait(options,
  function (res) {
    webim.Log.info('修改昵称成功');
    callback && callback();
  },
  function (ret) {
    console.log('修改昵称失败', ret);
    callback && callback(ret);
  });

}

// 创建大群
function createBigGroup(options, callback, callbackOptions) {


  avChatRoomId = options.roomID;
  webim.createGroup({
    GroupId: options.roomID,
    Owner_Account: options.userID,
    Type: 'AVChatRoom', // 默认先是大群
    Name: options.roomName || '',
    MaxMemberCount: 500,
    ApplyJoinOption: 'FreeAccess',
    MemberList: [] },
  function (ret) {
    if (ret.ErrorCode) {
      // 建房失败
      callback && callback({
        errCode: ret.ErrorCode,
        errMsg: ret.err_msg,
        callback: callbackOptions });

      return;
    }
    selToID = options.roomID;
    // 建房成功
    callback && callback({
      errCode: 0,
      callback: callbackOptions });

  }, function (ret) {
    if (ret && ret.ErrorCode == 10025) {
      //群组 ID 已被使用，并且操作者为群主，可以直接使用
      // 建房成功
      callback && callback({
        errCode: 0,
        callback: callbackOptions });

      return;
    }
    // 建房失败
    callback && callback({
      errCode: ret.ErrorCode,
      errMsg: ret.ErrorInfo || 'webim建房失败',
      callback: callbackOptions });

  });
}

//进入大群
function applyJoinBigGroup(groupId, callback, callbackOptions) {
  var options = {
    'GroupId': groupId //群id
  };
  // 做一些预处理
  avChatRoomId = groupId;
  selSess = null;
  webim.applyJoinBigGroup(
  options,
  function (resp) {
    //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
    if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
      webim.Log.info('进群成功');
      selToID = groupId;
      callback && callback({
        errCode: 0,
        callback: callbackOptions });

    } else {
      console.error('进群失败');
      callback && callback({
        errCode: 999,
        errMsg: 'IM进群失败',
        callback: callbackOptions });

    }
  },
  function (err) {
    console.error(err.ErrorInfo);
    console.log('进群请求失败', err.ErrorInfo);
    callback && callback({
      errCode: 999,
      errMsg: err.ErrorInfo || 'IM进群失败',
      callback: callbackOptions });

  });

}

//显示消息（群普通+点赞+提示+红包）
function showMsg(msg) {
  var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
  var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;

  fromAccount = msg.getFromAccount();
  if (!fromAccount) {
    fromAccount = '';
  }
  fromAccountNick = msg.getFromAccountNick();
  if (!fromAccountNick) {
    fromAccountNick = '未知用户';
  }
  //解析消息
  //获取会话类型，目前只支持群聊
  //webim.SESSION_TYPE.GROUP-群聊，
  //webim.SESSION_TYPE.C2C-私聊，
  sessType = msg.getSession().type();
  //获取消息子类型
  //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
  //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
  subType = msg.getSubType();

  isSelfSend = msg.getIsSend(); //消息是否为自己发的
  var content = "";
  switch (subType) {

    case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
      content = convertMsgtoHtml(msg);
      break;
    case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
      content = "[群红包消息]" + convertMsgtoHtml(msg);
      break;
    case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
      //业务自己可以增加逻辑，比如展示点赞动画效果
      content = "[群点赞消息]" + convertMsgtoHtml(msg);
      //展示点赞动画
      showLoveMsgAnimation();
      break;
    case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
      content = "[群提示消息]" + convertMsgtoHtml(msg);
      break;}


  return {
    fromAccountNick: fromAccountNick,
    content: content };

}

//把消息转换成Html
function convertMsgtoHtml(msg) {
  var html = "",elems,elem,type,content;
  elems = msg.getElems(); //获取消息包含的元素数组
  for (var i in elems) {
    elem = elems[i];
    type = elem.getType(); //获取元素类型
    content = elem.getContent(); //获取元素对象
    switch (type) {
      case webim.MSG_ELEMENT_TYPE.TEXT:
        html += convertTextMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.FACE:
        html += convertFaceMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.IMAGE:
        html += convertImageMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.SOUND:
        html += convertSoundMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.FILE:
        html += convertFileMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.LOCATION: //暂不支持地理位置
        //html += convertLocationMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.CUSTOM:
        html += convertCustomMsgToHtml(content);
        break;
      case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
        html += convertGroupTipMsgToHtml(content);
        break;
      default:
        webim.Log.error('未知消息元素类型: elemType=' + type);
        break;}

  }
  return webim.Tool.formatHtml2Text(html);
}

//解析文本消息元素
function convertTextMsgToHtml(content) {
  return content.getText();
}
//解析表情消息元素
function convertFaceMsgToHtml(content) {
  return content.getData();
  return content;
  var faceUrl = null;
  var data = content.getData();
  var index = webim.EmotionDataIndexs[data];

  var emotion = webim.Emotions[index];
  if (emotion && emotion[1]) {
    faceUrl = emotion[1];
  }
  if (faceUrl) {
    return "<img src='" + faceUrl + "'/>";
  } else {
    return data;
  }
}
//解析图片消息元素
function convertImageMsgToHtml(content) {
  var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
  var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
  var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
  if (!bigImage) {
    bigImage = smallImage;
  }
  if (!oriImage) {
    oriImage = smallImage;
  }
  return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";
}
//解析语音消息元素
function convertSoundMsgToHtml(content) {
  var second = content.getSecond(); //获取语音时长
  var downUrl = content.getDownUrl();
  if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
    return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
  }
  return '<audio src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
}
//解析文件消息元素
function convertFileMsgToHtml(content) {
  var fileSize = Math.round(content.getSize() / 1024);
  return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + 'KB)</i></a>';

}
//解析位置消息元素
function convertLocationMsgToHtml(content) {
  return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
}
//解析自定义消息元素
function convertCustomMsgToHtml(content) {
  var data = content.getData();
  var desc = content.getDesc();
  var ext = content.getExt();
  // return "data=" + data + ", desc=" + desc + ", ext=" + ext;
  return data;
}
//解析群提示消息元素
function convertGroupTipMsgToHtml(content) {
  var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
  var text = "";
  var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
  var opType, opUserId, userIdList;
  var memberCount;
  opType = content.getOpType(); //群提示消息类型（操作类型）
  opUserId = content.getOpUserId(); //操作人id
  switch (opType) {
    case webim.GROUP_TIP_TYPE.JOIN: //加入群
      userIdList = content.getUserIdList();
      //text += opUserId + "邀请了";
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text = text.substring(0, text.length - 1);
      text += "进入房间";
      text += ';{"type":' + opType + ',"userIdList":"' + userIdList.join(',') + '"}';
      //房间成员数加1
      // memberCount = $('#user-icon-fans').html();
      memberCount = parseInt(memberCount) + 1;
      break;
    case webim.GROUP_TIP_TYPE.QUIT: //退出群
      text += opUserId + "离开房间";
      text += ';{"type":' + opType + ',"userIdList":"' + opUserId + '"}';
      //房间成员数减1
      if (memberCount > 0) {
        memberCount = parseInt(memberCount) - 1;
      }
      break;
    case webim.GROUP_TIP_TYPE.KICK: //踢出群
      text += opUserId + "将";
      userIdList = content.getUserIdList();
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text += "踢出该群";
      break;
    case webim.GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
      text += opUserId + "将";
      userIdList = content.getUserIdList();
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text += "设为管理员";
      break;
    case webim.GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
      text += opUserId + "取消";
      userIdList = content.getUserIdList();
      for (var m in userIdList) {
        text += userIdList[m] + ",";
        if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + userIdList.length + "人";
          break;
        }
      }
      text += "的管理员资格";
      break;

    case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
      text += opUserId + "修改了群资料：";
      var groupInfoList = content.getGroupInfoList();
      var type, value;
      for (var m in groupInfoList) {
        type = groupInfoList[m].getType();
        value = groupInfoList[m].getValue();
        switch (type) {
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
            text += "群头像为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
            text += "群名称为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
            text += "群主为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
            text += "群公告为" + value + "; ";
            break;
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
            text += "群简介为" + value + "; ";
            break;
          default:
            text += "未知信息为:type=" + type + ",value=" + value + "; ";
            break;}

      }
      break;

    case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
      text += opUserId + "修改了群成员资料:";
      var memberInfoList = content.getMemberInfoList();
      var userId, shutupTime;
      for (var m in memberInfoList) {
        userId = memberInfoList[m].getUserId();
        shutupTime = memberInfoList[m].getShutupTime();
        text += userId + ": ";
        if (shutupTime != null && shutupTime !== undefined) {
          if (shutupTime == 0) {
            text += "取消禁言; ";
          } else {
            text += "禁言" + shutupTime + "秒; ";
          }
        } else {
          text += " shutupTime为空";
        }
        if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
          text += "等" + memberInfoList.length + "人";
          break;
        }
      }
      break;
    default:
      text += "未知群提示消息类型：type=" + opType;
      break;}

  return text;
}

//tls登录
function tlsLogin() {
  //跳转到TLS登录页面
  console.warn('tlslogin need rewrite');
  // TLSHelper.goLogin({
  //     sdkappid: loginInfo.sdkAppID,
  //     acctype: loginInfo.accountType,
  //     url: window.location.href
  // });
}
//第三方应用需要实现这个函数，并在这里拿到UserSig
function tlsGetUserSig(res) {
  //成功拿到凭证
  if (res.ErrorCode == webim.TLS_ERROR_CODE.OK) {
    //从当前URL中获取参数为identifier的值
    loginInfo.identifier = webim.Tool.getQueryString("identifier");
    app.globalData.loginInfo.identifier = loginInfo.identifier;

    //拿到正式身份凭证
    loginInfo.userSig = res.UserSig;
    app.globalData.loginInfo.userSig = res.UserSig;

    //从当前URL中获取参数为sdkappid的值
    loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(webim.Tool.getQueryString("sdkappid"));
    app.globalData.loginInfo.sdkAppID = loginInfo.sdkAppID;

    //从cookie获取accountType
    var accountType = webim.Tool.getCookie('accountType');
    if (accountType) {
      loginInfo.accountType = accountType;
      app.globalData.loginInfo.accountType = accountType;
      sdkLogin(); //sdk登录
    } else {
      location.href = location.href.replace(/\?.*$/gi, "");
    }
  } else {
    //签名过期，需要重新登录
    if (res.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION) {
      tlsLogin();
    } else {
      console.error("[" + res.ErrorCode + "]" + res.ErrorInfo);
    }
  }
}

//单击图片事件
function imageClick(imgObj) {
  var imgUrls = imgObj.src;
  var imgUrlArr = imgUrls.split("#"); //字符分割
  var smallImgUrl = imgUrlArr[0]; //小图
  var bigImgUrl = imgUrlArr[1]; //大图
  var oriImgUrl = imgUrlArr[2]; //原图
  webim.Log.info("小图url:" + smallImgUrl);
  webim.Log.info("大图url:" + bigImgUrl);
  webim.Log.info("原图url:" + oriImgUrl);
}


//切换播放audio对象
function onChangePlayAudio(obj) {
  if (curPlayAudio) {//如果正在播放语音
    if (curPlayAudio != obj) {//要播放的语音跟当前播放的语音不一样
      curPlayAudio.currentTime = 0;
      curPlayAudio.pause();
      curPlayAudio = obj;
    }
  } else {
    curPlayAudio = obj; //记录当前播放的语音
  }
}

//单击评论图片
function smsPicClick() {

  loginInfo.identifier = app.globalData.loginInfo.identifier;

  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天

      loginInfo.accountType = app.globalData.loginInfo.accountType;

      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      console.error('请填写帐号和票据');
    }
    return;
  } else {
    hideDiscussTool(); //隐藏评论工具栏
    showDiscussForm(); //显示评论表单
  }
}

//发送消息(普通消息)
function onSendMsg(msg, callback) {

  loginInfo.identifier = app.globalData.loginInfo.identifier;

  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天
      loginInfo.accountType = app.globalData.loginInfo.accountType;

      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      console.error('请填写帐号和票据');
    }
    return;
  }

  if (!selToID) {
    console.error("您还没有进入房间，暂不能聊天");
    return;
  }
  //获取消息内容
  var msgtosend = msg;
  var msgLen = webim.Tool.getStrBytes(msg);

  if (msgtosend.length < 1) {
    console.error("发送的消息不能为空!");
    return;
  }

  var maxLen, errInfo;
  if (selType == webim.SESSION_TYPE.GROUP) {
    maxLen = webim.MSG_MAX_LENGTH.GROUP;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  } else {
    maxLen = webim.MSG_MAX_LENGTH.C2C;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  }
  if (msgLen > maxLen) {
    console.error(errInfo);
    return;
  }

  if (!selSess) {
    selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
  }
  var isSend = true; //是否为自己发送
  var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
  var subType; //消息子类型
  if (selType == webim.SESSION_TYPE.GROUP) {
    //群消息子类型如下：
    //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
    //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
    //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
    //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
    subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

  } else {
    //C2C消息子类型如下：
    //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
    subType = webim.C2C_MSG_SUB_TYPE.COMMON;
  }

  loginInfo.identifier = app.globalData.loginInfo.identifier;
  loginInfo.identifierNick = app.globalData.loginInfo.identifierNick;

  var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
  //解析文本和表情
  var expr = /\[[^[\]]{1,3}\]/mg;
  var emotions = msgtosend.match(expr);
  var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
  if (!emotions || emotions.length < 1) {
    text_obj = new webim.Msg.Elem.Text(msgtosend);
    msg.addText(text_obj);
  } else {//有表情

    for (var i = 0; i < emotions.length; i++) {
      tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
      if (tmsg) {
        text_obj = new webim.Msg.Elem.Text(tmsg);
        msg.addText(text_obj);
      }
      emotionIndex = webim.EmotionDataIndexs[emotions[i]];
      emotion = webim.Emotions[emotionIndex];
      if (emotion) {
        face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
        msg.addFace(face_obj);
      } else {
        text_obj = new webim.Msg.Elem.Text(emotions[i]);
        msg.addText(text_obj);
      }
      restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
      msgtosend = msgtosend.substring(restMsgIndex);
    }
    if (msgtosend) {
      text_obj = new webim.Msg.Elem.Text(msgtosend);
      msg.addText(text_obj);
    }
  }

  webim.sendMsg(msg, function (resp) {
    if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
      showMsg(msg);
    }
    webim.Log.info("发消息成功");
    callback && callback();

    //hideDiscussForm();//隐藏评论表单
    //showDiscussTool();//显示评论工具栏
    //hideDiscussEmotion();//隐藏表情
  }, function (err) {
    webim.Log.error("发消息失败:" + err.ErrorInfo);
    console.error("发消息失败:" + err.ErrorInfo);
  });
}

function sendC2CCustomMsg(toUserID, msg, callback) {


  loginInfo.identifier = app.globalData.loginInfo.identifier;

  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天

      loginInfo.accountType = app.globalData.loginInfo.accountType;

      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      console.error('请填写帐号和票据');
    }
    return;
  }

  // custom消息
  var data = msg.data || '';
  var desc = msg.desc || '';
  var ext = msg.ext || '';

  var msgLen = webim.Tool.getStrBytes(data);

  var maxLen = webim.MSG_MAX_LENGTH.C2C;
  var errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  if (msgLen > maxLen) {
    alert(errInfo);
    return;
  }

  var session = new webim.Session(webim.SESSION_TYPE.C2C, toUserID, toUserID, '', Math.round(new Date().getTime() / 1000));

  var isSend = true; //是否为自己发送
  var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
  var subType = webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型 


  loginInfo.identifier = app.globalData.loginInfo.identifier;
  loginInfo.identifierNick = app.globalData.loginInfo.identifierNick;

  var msg = new webim.Msg(session, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);

  var custom_obj = new webim.Msg.Elem.Custom(data, desc, ext);
  msg.addCustom(custom_obj);

  //调用发送消息接口
  webim.sendMsg(msg, function (resp) {
    webim.Log.info("发自定义消息成功");
    console.log('发自定义消息成功');
    callback && callback({
      errCode: 0,
      errMsg: "" });

  }, function (err) {
    webim.Log.info(err.ErrorInfo);
    console.log('发自定义消息失败:', err);
    callback && callback({
      errCode: -1,
      errMsg: '发自定义消息失败:' + err.ErrorInfo });

  });
}

/**
   * 发送自定义消息
   * 一条custom消息+一条text消息
   * 自定义，用于携带头像与昵称（其他端使用精简版text不能携带）
   */
function sendCustomMsg(msg, callback) {
  loginInfo.identifier = app.globalData.loginInfo.identifier;


  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天

      loginInfo.accountType = app.globalData.loginInfo.accountType;

      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      console.error('请填写帐号和票据');
    }
    return;
  }

  if (!selToID) {
    console.error("您还没有进入房间，暂不能聊天");
    return;
  }

  // custom消息
  var data = msg.data || '';
  var desc = msg.desc || '';
  var ext = msg.ext || '';

  var msgLen = webim.Tool.getStrBytes(data);

  if (data.length < 1) {
    alert("发送的消息不能为空!");
    return;
  }
  var maxLen, errInfo;
  if (selType == webim.SESSION_TYPE.C2C) {
    maxLen = webim.MSG_MAX_LENGTH.C2C;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  } else {
    maxLen = webim.MSG_MAX_LENGTH.GROUP;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  }
  if (msgLen > maxLen) {
    alert(errInfo);
    return;
  }

  // text消息
  var msgtosend = msg.text;
  var msgLen = webim.Tool.getStrBytes(msg.text);

  if (msgtosend.length < 1) {
    console.error("发送的消息不能为空!");
    return;
  }

  var maxLen, errInfo;
  if (selType == webim.SESSION_TYPE.GROUP) {
    maxLen = webim.MSG_MAX_LENGTH.GROUP;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  } else {
    maxLen = webim.MSG_MAX_LENGTH.C2C;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  }
  if (msgLen > maxLen) {
    console.error(errInfo);
    return;
  }

  if (!selSess) {
    selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
  }


  var isSend = true; //是否为自己发送
  var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
  var subType; //消息子类型
  if (selType == webim.SESSION_TYPE.GROUP) {
    //群消息子类型如下：
    //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
    //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
    //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
    //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
    subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

  } else {
    //C2C消息子类型如下：
    //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
    subType = webim.C2C_MSG_SUB_TYPE.COMMON;
  }


  loginInfo.identifier = app.globalData.loginInfo.identifier;
  loginInfo.identifierNick = app.globalData.loginInfo.identifierNick;
  var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);

  var custom_obj = new webim.Msg.Elem.Custom(data, desc, ext);
  msg.addCustom(custom_obj);

  //解析文本和表情
  var expr = /\[[^[\]]{1,3}\]/mg;
  var emotions = msgtosend.match(expr);
  var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
  if (!emotions || emotions.length < 1) {
    text_obj = new webim.Msg.Elem.Text(msgtosend);
    msg.addText(text_obj);
  } else {//有表情
    for (var i = 0; i < emotions.length; i++) {
      tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
      if (tmsg) {
        text_obj = new webim.Msg.Elem.Text(tmsg);
        msg.addText(text_obj);
      }
      emotionIndex = webim.EmotionDataIndexs[emotions[i]];
      emotion = webim.Emotions[emotionIndex];
      if (emotion) {
        face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
        msg.addFace(face_obj);
      } else {
        text_obj = new webim.Msg.Elem.Text(emotions[i]);
        msg.addText(text_obj);
      }
      restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
      msgtosend = msgtosend.substring(restMsgIndex);
    }
    if (msgtosend) {
      text_obj = new webim.Msg.Elem.Text(msgtosend);
      msg.addText(text_obj);
    }
  }
  //调用发送消息接口
  webim.sendMsg(msg, function (resp) {
    if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
      addMsg(msg);
    }
    webim.Log.info("发自定义消息成功");
    console.log('发自定义消息成功');
    callback && callback();
  }, function (err) {
    webim.Log.info(err.ErrorInfo);
    console.log('发自定义消息失败:', err);
  });
}

//发送消息(群点赞消息)
function sendGroupLoveMsg() {

  loginInfo.identifier = app.globalData.loginInfo.identifier;

  if (!loginInfo.identifier) {//未登录
    if (accountMode == 1) {//托管模式
      //将account_type保存到cookie中,有效期是1天


      loginInfo.accountType = app.globalData.loginInfo.accountType;

      webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
      //调用tls登录服务
      tlsLogin();
    } else {//独立模式
      console.error('请填写帐号和票据');
    }
    return;
  }

  if (!selToID) {
    console.error("您还没有进入房间，暂不能点赞");
    return;
  }

  if (!selSess) {
    selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
  }
  var isSend = true; //是否为自己发送
  var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
  //群消息子类型如下：
  //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
  //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
  //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
  //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
  var subType = webim.GROUP_MSG_SUB_TYPE.LOVEMSG;



  loginInfo.identifier = app.globalData.loginInfo.identifier;
  loginInfo.identifierNick = app.globalData.loginInfo.identifierNick;


  var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
  var msgtosend = 'love_msg';
  var text_obj = new webim.Msg.Elem.Text(msgtosend);
  msg.addText(text_obj);

  webim.sendMsg(msg, function (resp) {
    if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
      showMsg(msg);
    }
    webim.Log.info("点赞成功");
  }, function (err) {
    webim.Log.error("发送点赞消息失败:" + err.ErrorInfo);
    console.error("发送点赞消息失败:" + err.ErrorInfo);
  });
}
//隐藏评论文本框
function hideDiscussForm() {

} //$(".video-discuss-form").hide();
//显示评论文本框
function showDiscussForm() {

} //$(".video-discuss-form").show();
//隐藏评论工具栏
function hideDiscussTool() {

} //$(".video-discuss-tool").hide();
//显示评论工具栏
function showDiscussTool() {

} //$(".video-discuss-tool").show();
//隐藏表情框
function hideDiscussEmotion() {


} //$(".video-discuss-emotion").hide();
////$(".video-discuss-emotion").fadeOut("slow");
//显示表情框
function showDiscussEmotion() {


} //$(".video-discuss-emotion").show();
//$(".video-discuss-emotion").fadeIn("slow");
//展示点赞动画
function showLoveMsgAnimation() {











} //点赞数加1
// var loveCount = $('#user-icon-like').html();
// $('#user-icon-like').html(parseInt(loveCount) + 1);
// var toolDiv = document.getElementById("video-discuss-tool");
// var loveSpan = document.createElement("span");
// var colorList = ['red', 'green', 'blue'];
// var max = colorList.length - 1;
// var min = 0;
// var index = parseInt(Math.random() * (max - min + 1) + min, max + 1);
// var color = colorList[index];
// loveSpan.setAttribute('class', 'like-icon zoomIn ' + color);
// toolDiv.appendChild(loveSpan);
//初始化表情
function initEmotionUL() {return;for (var index in webim.Emotions) {var emotions = $('<img>').attr({ "id": webim.Emotions[index][0], "src": webim.Emotions[index][1], "style": "cursor:pointer;" }).click(function () {selectEmotionImg(this);});$('<li>').append(emotions).appendTo($('#emotionUL'));
  }
}

//打开或显示表情
function showEmotionDialog() {
  if (openEmotionFlag) {//如果已经打开
    openEmotionFlag = false;
    hideDiscussEmotion(); //关闭
  } else {//如果未打开
    openEmotionFlag = true;
    showDiscussEmotion(); //打开
  }
}
//选中表情
function selectEmotionImg(selImg) {
  $("#send_msg_text").val($("#send_msg_text").val() + selImg.id);
}

// 解散群
function destroyGroup() {
  var options = {
    'GroupId': avChatRoomId, //群id
    Type: 'AVChatRoom' };

  webim.destroyGroup(
  options,
  function (ret) {
    webim.Log.info('解散群成功');
    selSess = null;
  });

}


//退出大群
function quitBigGroup() {
  var options = {
    'GroupId': avChatRoomId //群id
  };
  webim.quitBigGroup(
  options,
  function (resp) {

    webim.Log.info('退群成功');
    console.log('IM退群成功');
    selSess = null;
    //webim.Log.error('进入另一个大群:'+avChatRoomId2);
    //applyJoinBigGroup(avChatRoomId2);//加入大群
  },
  function (err) {
    console.error(err.ErrorInfo);
  });

}

//登出
function logout() {
  //登出
  webim.logout(
  function (resp) {
    webim.Log.info('登出成功');
    console.log('IM登出成功');


    if (loginInfo) {
      loginInfo.identifier = null;
      loginInfo.userSig = null;


      app.globalData.loginInfo.identifier = null;
      app.globalData.loginInfo.userSig = null;

    }
    selSess = null;
  });

}



//监听 申请加群 系统消息
function onApplyJoinGroupRequestNotify(notify) {
  webim.Log.warn("执行 加群申请 回调：" + JSON.stringify(notify));
  var timestamp = notify.MsgTime;
  var reportTypeCh = "[申请加群]";
  var content = notify.Operator_Account + "申请加入你的群";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, timestamp);
}

//监听 申请加群被同意 系统消息
function onApplyJoinGroupAcceptNotify(notify) {
  webim.Log.warn("执行 申请加群被同意 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[申请加群被同意]";
  var content = notify.Operator_Account + "同意你的加群申请，附言：" + notify.RemarkInfo;
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 申请加群被拒绝 系统消息
function onApplyJoinGroupRefuseNotify(notify) {
  webim.Log.warn("执行 申请加群被拒绝 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[申请加群被拒绝]";
  var content = notify.Operator_Account + "拒绝了你的加群申请，附言：" + notify.RemarkInfo;
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被踢出群 系统消息
function onKickedGroupNotify(notify) {
  webim.Log.warn("执行 被踢出群  回调：" + JSON.stringify(notify));
  var reportTypeCh = "[被踢出群]";
  var content = "你被管理员" + notify.Operator_Account + "踢出该群";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 解散群 系统消息
function onDestoryGroupNotify(notify) {
  webim.Log.warn("执行 解散群 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[群被解散]";
  var content = "群主" + notify.Operator_Account + "已解散该群";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 创建群 系统消息
function onCreateGroupNotify(notify) {
  webim.Log.warn("执行 创建群 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[创建群]";
  var content = "你创建了该群";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被邀请加群 系统消息
function onInvitedJoinGroupNotify(notify) {
  webim.Log.warn("执行 被邀请加群  回调: " + JSON.stringify(notify));
  var reportTypeCh = "[被邀请加群]";
  var content = "你被管理员" + notify.Operator_Account + "邀请加入该群";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 主动退群 系统消息
function onQuitGroupNotify(notify) {
  webim.Log.warn("执行 主动退群  回调： " + JSON.stringify(notify));
  var reportTypeCh = "[主动退群]";
  var content = "你退出了该群";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被设置为管理员 系统消息
function onSetedGroupAdminNotify(notify) {
  webim.Log.warn("执行 被设置为管理员  回调：" + JSON.stringify(notify));
  var reportTypeCh = "[被设置为管理员]";
  var content = "你被群主" + notify.Operator_Account + "设置为管理员";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 被取消管理员 系统消息
function onCanceledGroupAdminNotify(notify) {
  webim.Log.warn("执行 被取消管理员 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[被取消管理员]";
  var content = "你被群主" + notify.Operator_Account + "取消了管理员资格";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 群被回收 系统消息
function onRevokeGroupNotify(notify) {
  webim.Log.warn("执行 群被回收 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[群被回收]";
  var content = "该群已被回收";
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}
//监听 用户自定义 群系统消息
function onCustomGroupNotify(notify) {
  webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
  var reportTypeCh = "[用户自定义系统消息]";
  var content = notify.UserDefinedField; //群自定义消息数据
  showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}

//监听 群资料变化 群提示消息
function onGroupInfoChangeNotify(groupInfo) {
  webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(groupInfo));
  var groupId = groupInfo.GroupId;
  var newFaceUrl = groupInfo.GroupFaceUrl; //新群组图标, 为空，则表示没有变化
  var newName = groupInfo.GroupName; //新群名称, 为空，则表示没有变化
  var newOwner = groupInfo.OwnerAccount; //新的群主id, 为空，则表示没有变化
  var newNotification = groupInfo.GroupNotification; //新的群公告, 为空，则表示没有变化
  var newIntroduction = groupInfo.GroupIntroduction; //新的群简介, 为空，则表示没有变化

  if (newName) {
    //更新群组列表的群名称
    //To do
    webim.Log.warn("群id=" + groupId + "的新名称为：" + newName);
  }
}

//显示一条群组系统消息
function showGroupSystemMsg(type, typeCh, group_id, group_name, msg_content, msg_time) {
  var sysMsgStr = "收到一条群系统消息: type=" + type + ", typeCh=" + typeCh + ",群ID=" + group_id + ", 群名称=" + group_name + ", 内容=" + msg_content + ", 时间=" + webim.Tool.formatTimeStamp(msg_time);
  webim.Log.warn(sysMsgStr);
  console.error(sysMsgStr);
}

function init(opts) {


  accountMode = opts.accountMode;
  accountType = opts.accountType;
  sdkAppID = opts.sdkAppID;
  avChatRoomId = opts.avChatRoomId || 0;
  selType = opts.selType;
  selToID = opts.selToID;
}

module.exports = {
  init: init,
  onBigGroupMsgNotify: onBigGroupMsgNotify,
  onMsgNotify: onMsgNotify,
  handlderMsg: handlderMsg,
  sdkLogin: sdkLogin,
  createBigGroup: createBigGroup,
  applyJoinBigGroup: applyJoinBigGroup,
  showMsg: showMsg,
  convertMsgtoHtml: convertMsgtoHtml,
  convertTextMsgToHtml: convertTextMsgToHtml,
  convertFaceMsgToHtml: convertFaceMsgToHtml,
  convertImageMsgToHtml: convertImageMsgToHtml,
  convertSoundMsgToHtml: convertSoundMsgToHtml,
  convertFileMsgToHtml: convertFileMsgToHtml,
  convertLocationMsgToHtml: convertLocationMsgToHtml,
  convertCustomMsgToHtml: convertCustomMsgToHtml,
  convertGroupTipMsgToHtml: convertGroupTipMsgToHtml,
  tlsLogin: tlsLogin,
  tlsGetUserSig: tlsGetUserSig,
  imageClick: imageClick,
  onChangePlayAudio: onChangePlayAudio,
  smsPicClick: smsPicClick,
  onSendMsg: onSendMsg,
  sendCustomMsg: sendCustomMsg,
  sendC2CCustomMsg: sendC2CCustomMsg,
  sendGroupLoveMsg: sendGroupLoveMsg,
  hideDiscussForm: hideDiscussForm,
  showDiscussForm: showDiscussForm,
  hideDiscussTool: hideDiscussTool,
  showDiscussTool: showDiscussTool,
  hideDiscussEmotion: hideDiscussEmotion,
  showDiscussEmotion: showDiscussEmotion,
  showLoveMsgAnimation: showLoveMsgAnimation,
  initEmotionUL: initEmotionUL,
  showEmotionDialog: showEmotionDialog,
  selectEmotionImg: selectEmotionImg,
  quitBigGroup: quitBigGroup,
  destroyGroup: destroyGroup,
  logout: logout,
  onApplyJoinGroupRequestNotify: onApplyJoinGroupRequestNotify,
  onApplyJoinGroupAcceptNotify: onApplyJoinGroupAcceptNotify,
  onApplyJoinGroupRefuseNotify: onApplyJoinGroupRefuseNotify,
  onKickedGroupNotify: onKickedGroupNotify,
  onDestoryGroupNotify: onDestoryGroupNotify,
  onCreateGroupNotify: onCreateGroupNotify,
  onInvitedJoinGroupNotify: onInvitedJoinGroupNotify,
  onQuitGroupNotify: onQuitGroupNotify,
  onSetedGroupAdminNotify: onSetedGroupAdminNotify,
  onCanceledGroupAdminNotify: onCanceledGroupAdminNotify,
  onRevokeGroupNotify: onRevokeGroupNotify,
  onCustomGroupNotify: onCustomGroupNotify,
  onGroupInfoChangeNotify: onGroupInfoChangeNotify,
  showGroupSystemMsg: showGroupSystemMsg };

/***/ }),

/***/ 18:
/*!*************************************!*\
  !*** D:/微品匠心/qiketang/main/main.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var main = {};
main.url = "https://qiketang.shengbokj.com/";
main.ImgUrl = "https://qiketang.shengbokj.com/";
main.userID = '';
main.openID = '';
main.SdkAppid = '';

main.tid = '';
main.t_order = "/teacher/t_order/index";
main.t_course = "/teacher/t_course/index";
main.t_personal = "/teacher/t_personal/index";
// 跳转页面
main.pageJump = function (url, tab) {
  if (tab) {
    uni.switchTab({
      url: url });

  } else {
    uni.navigateTo({
      url: url });

  }
};
main.redirectTo = function (url) {
  uni.redirectTo({
    url: url });

};
//返回上一页
main.navigateBack = function (num) {
  setTimeout(function () {
    uni.navigateBack({
      delta: num });

  }, 2000);
};
// 弹窗提示
main.showToast = function (title) {
  uni.showToast({
    title: title,
    icon: 'none',
    duration: 2000,
    mask: true });

}; // 检验手机号
main.isPhoneNumber = function (number) {
  var reg = /^1[3,4,5,7,8,9]\d{9}$/;
  if (!reg.test(number)) {
    return false;
  } else {
    return true;
  }
};
//去登陆
main.toLoing = function () {
  uni.showModal({
    title: '暂未登陆',
    content: '检测到您暂未登陆，马上去登陆吧！',
    cancelText: '随便看看',
    confirmText: '去登陆',
    confirmColor: '#3FCB85',
    success: function success(res) {
      if (res.confirm) {
        console.log('用户点击确定');
        main.pageJump('/pages/user_S/user', true);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    } });

};var _default =
main;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!****************************************!*\
  !*** D:/微品匠心/qiketang/main/mainFun.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _main = _interopRequireDefault(__webpack_require__(/*! ../main/main */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
module.exports = {
  // GET请求
  Get: function Get(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      uni.showLoading({
        title: '加载中...',
        mask: true });

      uni.request({
        url: _main.default.url + url,
        method: 'GET',
        data: data,
        success: function success(res) {
          uni.hideLoading();
          if (res.data.code === 1) {
            resolve(res.data.data);
          } else {
            _main.default.showToast(res.data.msg);
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          _main.default.showToast('网络出现异常');
          reject(err);
        } });

    });
  },
  // POST请求
  Post: function Post(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      uni.showLoading({
        title: '加载中...',
        mask: true });

      uni.request({
        url: _main.default.url + url,
        method: 'POST',
        data: data,
        // header:{
        // 'content-type':'application/x-www-form-urlencoded',
        // 'content-type':'application/x-www-form-urlencoded'
        // },
        success: function success(res) {
          uni.hideLoading();
          if (res.data.code === 1) {
            resolve(res.data.data);
          } else {
            if (url === "xqcommentList") {
              _main.default.showToast('暂无更多评论');
              return false;
            }
            if (data.page === undefined) {
              if (res.data.msg !== '') {
                _main.default.showToast(res.data.msg);
              }
            } else {
              _main.default.showToast('下面没有了');
            }
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          // main.showToast('网络出现异常')
          reject(err);
        } });

    });
  },
  // 选择图片
  ChooseImage: function ChooseImage() {var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise(function (resolve, reject) {
      uni.chooseImage({
        count: num,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          resolve(tempFilePaths);
        } });

    });
  },
  //上传图片
  uploadImg: function uploadImg() {var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    console.log(list);
    return new Promise(function (resolve, reject) {
      uni.showLoading({
        title: '上传中...',
        mask: true });

      var arr = [];var _loop = function _loop(
      index) {
        uni.uploadFile({
          url: _main.default.url + 'api/upload/uploadfile',
          filePath: list[index],
          name: 'file',
          success: function success(res) {
            console.log(res);
            res.data = JSON.parse(res.data);
            if (res.data.code === 0) {
              _main.default.showToast(res.data.msg);
              return false;
            }
            arr.push(res.data.data);
            if (index === list.length - 1) {
              setTimeout(function () {
                wx.hideLoading();
                resolve(arr);
              }, 2000);
            }
          } });};for (var index = 0; index < list.length; index++) {_loop(index);

      }
    });
  },
  //上传文件
  uploadFile: function uploadFile() {var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    console.log(list);
    return new Promise(function (resolve, reject) {
      uni.showLoading({
        title: '上传中...',
        mask: true });

      var arr = [];var _loop2 = function _loop2(
      index) {
        uni.uploadFile({
          url: _main.default.url + 'uploadFile',
          file: list[index],
          name: 'file',
          success: function success(res) {
            console.log(res);
            res.data = JSON.parse(res.data);
            if (res.data.code === 0) {
              _main.default.showToast(res.data.msg);
              return false;
            }
            arr.push(res.data.data);
            if (index === list.length - 1) {
              setTimeout(function () {
                wx.hideLoading();
                resolve(arr);
              }, 2000);
            }
          } });};for (var index = 0; index < list.length; index++) {_loop2(index);

      }
    });
  },
  previewImage: function previewImage(current, urls) {
    uni.previewImage({
      current: current,
      urls: urls });


  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************!*\
  !*** D:/微品匠心/qiketang/pages.json ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 8:
/*!****************************************!*\
  !*** D:/微品匠心/qiketang/common/utils.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var iphonex = 0;
var bottom = 0;var _default =

{
  iphonex: iphonex,
  bottom: bottom };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map