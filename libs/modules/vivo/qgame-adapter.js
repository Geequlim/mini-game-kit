'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};
	/******/
	/******/ // The require function
	/******/function __webpack_require__(moduleId) {
		/******/
		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId]) {
			/******/return installedModules[moduleId].exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/i: moduleId,
			/******/l: false,
			/******/exports: {}
			/******/ };
		/******/
		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/
		/******/ // Flag the module as loaded
		/******/module.l = true;
		/******/
		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}
	/******/
	/******/
	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;
	/******/
	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;
	/******/
	/******/ // define getter function for harmony exports
	/******/__webpack_require__.d = function (exports, name, getter) {
		/******/if (!__webpack_require__.o(exports, name)) {
			/******/Object.defineProperty(exports, name, {
				/******/configurable: false,
				/******/enumerable: true,
				/******/get: getter
				/******/ });
			/******/
		}
		/******/
	};
	/******/
	/******/ // getDefaultExport function for compatibility with non-harmony modules
	/******/__webpack_require__.n = function (module) {
		/******/var getter = module && module.__esModule ?
		/******/function getDefault() {
			return module['default'];
		} :
		/******/function getModuleExports() {
			return module;
		};
		/******/__webpack_require__.d(getter, 'a', getter);
		/******/return getter;
		/******/
	};
	/******/
	/******/ // Object.prototype.hasOwnProperty.call
	/******/__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};
	/******/
	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";
	/******/
	/******/ // Load entry module and return exports
	/******/return __webpack_require__(__webpack_require__.s = 15);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	/**
  * The event wrapper.
  * @constructor
  * @param {EventTarget} eventTarget The event target of this dispatching.
  * @param {Event|{type:string}} event The original event to wrap.
  */
	var Event = function () {
		function Event(type, eventInit) {
			_classCallCheck(this, Event);

			this._type = type;
			this._target = null;
			this._eventPhase = 2;
			this._currentTarget = null;
			this._canceled = false;
			this._stopped = false; // The flag to stop propagation immediately.
			this._passiveListener = null;
			this._timeStamp = Date.now();
		}

		/**
   * The type of this event.
   * @type {string}
   */

		_createClass(Event, [{
			key: "composedPath",

			/**
    * @returns {EventTarget[]} The composed path of this event.
    */
			value: function composedPath() {
				var currentTarget = this._currentTarget;
				if (currentTarget === null) {
					return [];
				}
				return [currentTarget];
			}

			/**
    * The target of this event.
    * @type {number}
    */

		}, {
			key: "stopPropagation",

			/**
    * Stop event bubbling.
    * @returns {void}
    */
			value: function stopPropagation() {}

			/**
    * Stop event bubbling.
    * @returns {void}
    */

		}, {
			key: "stopImmediatePropagation",
			value: function stopImmediatePropagation() {
				this._stopped = true;
			}

			/**
    * The flag to be bubbling.
    * @type {boolean}
    */

		}, {
			key: "preventDefault",

			/**
    * Cancel this event.
    * @returns {void}
    */
			value: function preventDefault() {
				if (this._passiveListener !== null) {
					console.warn("Event#preventDefault() was called from a passive listener:", this._passiveListener);
					return;
				}
				if (!this.cancelable) {
					return;
				}

				this._canceled = true;
			}

			/**
    * The flag to indicate cancellation state.
    * @type {boolean}
    */

		}, {
			key: "type",
			get: function get() {
				return this._type;
			}

			/**
    * The target of this event.
    * @type {EventTarget}
    */

		}, {
			key: "target",
			get: function get() {
				return this._target;
			}

			/**
    * The target of this event.
    * @type {EventTarget}
    */

		}, {
			key: "currentTarget",
			get: function get() {
				return this._currentTarget;
			}
		}, {
			key: "isTrusted",
			get: function get() {
				// https://heycam.github.io/webidl/#Unforgeable
				return false;
			}
		}, {
			key: "timeStamp",

			/**
    * The unix time of this event.
    * @type {number}
    */
			get: function get() {
				return this._timeStamp;
			}
		}, {
			key: "eventPhase",
			get: function get() {
				return this._eventPhase;
			}
		}, {
			key: "bubbles",
			get: function get() {
				return false;
			}

			/**
    * The flag to be cancelable.
    * @type {boolean}
    */

		}, {
			key: "cancelable",
			get: function get() {
				return true;
			}
		}, {
			key: "defaultPrevented",
			get: function get() {
				return this._canceled;
			}

			/**
    * The flag to be composed.
    * @type {boolean}
    */

		}, {
			key: "composed",
			get: function get() {
				return false;
			}
		}]);

		return Event;
	}();

	/**
  * Constant of NONE.
  * @type {number}
  */

	Event.NONE = 0;

	/**
  * Constant of CAPTURING_PHASE.
  * @type {number}
  */
	Event.CAPTURING_PHASE = 1;

	/**
  * Constant of AT_TARGET.
  * @type {number}
  */
	Event.AT_TARGET = 2;

	/**
  * Constant of BUBBLING_PHASE.
  * @type {number}
  */
	Event.BUBBLING_PHASE = 3;

	module.exports = Event;

	/***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Element = __webpack_require__(7);

	var HTMLElement = function (_Element) {
		_inherits(HTMLElement, _Element);

		function HTMLElement() {
			var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			_classCallCheck(this, HTMLElement);

			var _this = _possibleConstructorReturn(this, (HTMLElement.__proto__ || Object.getPrototypeOf(HTMLElement)).call(this));

			_this.tagName = tagName.toUpperCase();

			_this.className = '';
			_this.children = [];
			_this.style = {
				width: window.innerWidth + 'px',
				height: window.innerHeight + 'px'
			};

			_this.innerHTML = '';
			_this.parentElement = mainCanvas;
			return _this;
		}

		_createClass(HTMLElement, [{
			key: 'setAttribute',
			value: function setAttribute(name, value) {
				this[name] = value;
			}
		}, {
			key: 'getAttribute',
			value: function getAttribute(name) {
				return this[name];
			}
		}, {
			key: 'focus',
			value: function focus() {}
		}]);

		return HTMLElement;
	}(Element);

	module.exports = HTMLElement;

	/***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var __targetID = 0;

	var __listenerMap = {
		touch: {},
		mouse: {},
		keyboard: {},
		devicemotion: {}
	};

	var __listenerCountMap = {
		touch: 0,
		mouse: 0,
		keyboard: 0,
		devicemotion: 0
	};

	var __enableCallbackMap = {
		touch: null,
		mouse: null,
		keyboard: null,
		devicemotion: null
	};

	var __disableCallbackMap = {
		touch: null,
		mouse: null,
		keyboard: null,
		devicemotion: null
	};

	var __handleEventNames = {
		touch: ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
		mouse: ['mousedown', 'mousemove', 'mouseup', 'mousewheel'],
		keyboard: ['keydown', 'keyup', 'keypress'],
		devicemotion: ['devicemotion']

		// Listener types
	};var CAPTURE = 1;
	var BUBBLE = 2;
	var ATTRIBUTE = 3;

	/**
  * Check whether a given value is an object or not.
  * @param {any} x The value to check.
  * @returns {boolean} `true` if the value is an object.
  */
	function isObject(x) {
		return x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === "object"; //eslint-disable-line no-restricted-syntax
	}

	/**
  * EventTarget.
  * 
  * - This is constructor if no arguments.
  * - This is a function which returns a CustomEventTarget constructor if there are arguments.
  * 
  * For example:
  * 
  *     class A extends EventTarget {}
  */

	var EventTarget = function () {
		function EventTarget() {
			_classCallCheck(this, EventTarget);

			this._targetID = ++__targetID;
			this._listenerCount = {
				touch: 0,
				mouse: 0,
				keyboard: 0,
				devicemotion: 0
			};
			this._listeners = new Map();
		}

		_createClass(EventTarget, [{
			key: '_associateSystemEventListener',
			value: function _associateSystemEventListener(eventName) {
				var handleEventNames;
				for (var key in __handleEventNames) {
					handleEventNames = __handleEventNames[key];
					if (handleEventNames.indexOf(eventName) > -1) {
						if (__enableCallbackMap[key] && __listenerCountMap[key] === 0) {
							__enableCallbackMap[key]();
						}

						if (this._listenerCount[key] === 0) __listenerMap[key][this._targetID] = this;
						++this._listenerCount[key];
						++__listenerCountMap[key];
						break;
					}
				}
			}
		}, {
			key: '_dissociateSystemEventListener',
			value: function _dissociateSystemEventListener(eventName) {
				var handleEventNames;
				for (var key in __handleEventNames) {
					handleEventNames = __handleEventNames[key];
					if (handleEventNames.indexOf(eventName) > -1) {
						if (this._listenerCount[key] <= 0) delete __listenerMap[key][this._targetID];
						--__listenerCountMap[key];

						if (__disableCallbackMap[key] && __listenerCountMap[key] === 0) {
							__disableCallbackMap[key]();
						}
						break;
					}
				}
			}

			/**
    * Add a given listener to this event target.
    * @param {string} eventName The event name to add.
    * @param {Function} listener The listener to add.
    * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
    * @returns {boolean} `true` if the listener was added actually.
    */

		}, {
			key: 'addEventListener',
			value: function addEventListener(eventName, listener, options) {
				if (!listener) {
					return false;
				}
				if (typeof listener !== "function" && !isObject(listener)) {
					throw new TypeError("'listener' should be a function or an object.");
				}

				var listeners = this._listeners;
				var optionsIsObj = isObject(options);
				var capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
				var listenerType = capture ? CAPTURE : BUBBLE;
				var newNode = {
					listener: listener,
					listenerType: listenerType,
					passive: optionsIsObj && Boolean(options.passive),
					once: optionsIsObj && Boolean(options.once),
					next: null

					// Set it as the first node if the first node is null.
				};var node = listeners.get(eventName);
				if (node === undefined) {
					listeners.set(eventName, newNode);
					this._associateSystemEventListener(eventName);
					return true;
				}

				// Traverse to the tail while checking duplication..
				var prev = null;
				while (node) {
					if (node.listener === listener && node.listenerType === listenerType) {
						// Should ignore duplication.
						return false;
					}
					prev = node;
					node = node.next;
				}

				// Add it.
				prev.next = newNode;
				this._associateSystemEventListener(eventName);
				return true;
			}

			/**
    * Remove a given listener from this event target.
    * @param {string} eventName The event name to remove.
    * @param {Function} listener The listener to remove.
    * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
    * @returns {boolean} `true` if the listener was removed actually.
    */

		}, {
			key: 'removeEventListener',
			value: function removeEventListener(eventName, listener, options) {
				if (!listener) {
					return false;
				}

				var listeners = this._listeners;
				var capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
				var listenerType = capture ? CAPTURE : BUBBLE;

				var prev = null;
				var node = listeners.get(eventName);
				while (node) {
					if (node.listener === listener && node.listenerType === listenerType) {
						if (prev) {
							prev.next = node.next;
						} else if (node.next) {
							listeners.set(eventName, node.next);
						} else {
							listeners.delete(eventName);
						}

						this._dissociateSystemEventListener(eventName);

						return true;
					}

					prev = node;
					node = node.next;
				}

				return false;
			}

			/**
    * Dispatch a given event.
    * @param {Event|{type:string}} event The event to dispatch.
    * @returns {boolean} `false` if canceled.
    */

		}, {
			key: 'dispatchEvent',
			value: function dispatchEvent(event) {
				if (!event || typeof event.type !== "string") {
					throw new TypeError("\"event.type\" should be a string.");
				}

				var eventName = event.type;
				var onFunc = this['on' + eventName];
				if (onFunc && typeof onFunc === 'function') {
					event._target = event._currentTarget = this;
					onFunc.call(this, event);
					event._target = event._currentTarget = null;
					event._eventPhase = 0;
					event._passiveListener = null;

					if (event.defaultPrevented) return false;
				}

				// If listeners aren't registered, terminate.
				var listeners = this._listeners;

				var node = listeners.get(eventName);
				if (!node) {
					return true;
				}

				event._target = event._currentTarget = this;

				// This doesn't process capturing phase and bubbling phase.
				// This isn't participating in a tree.
				var prev = null;
				while (node) {
					// Remove this listener if it's once
					if (node.once) {
						if (prev) {
							prev.next = node.next;
						} else if (node.next) {
							listeners.set(eventName, node.next);
						} else {
							listeners.delete(eventName);
						}
					} else {
						prev = node;
					}

					// Call this listener
					event._passiveListener = node.passive ? node.listener : null;
					if (typeof node.listener === "function") {
						node.listener.call(this, event);
					}

					// Break if `event.stopImmediatePropagation` was called.
					if (event._stopped) {
						break;
					}

					node = node.next;
				}
				event._target = event._currentTarget = null;
				event._eventPhase = 0;
				event._passiveListener = null;

				return !event.defaultPrevented;
			}
		}]);

		return EventTarget;
	}();

	function touchEventHandlerFactory(type) {
		return function (touches) {
			var touchEvent = new TouchEvent(type);

			touchEvent.touches = touches;
			touchEvent.targetTouches = Array.prototype.slice.call(touchEvent.touches);
			touchEvent.changedTouches = touches; //event.changedTouches
			// touchEvent.timeStamp = event.timeStamp

			var i = 0,
			    touchCount = touches.length;
			var target;
			var touchListenerMap = __listenerMap.touch;
			for (var key in touchListenerMap) {
				target = touchListenerMap[key];
				for (i = 0; i < touchCount; ++i) {
					touches[i].target = target;
				}
				target.dispatchEvent(touchEvent);
			}
		};
	}

	function mouseEventHandlerFactory(type) {
		return function (event) {
			var button = event.button;
			var x = event.x;
			var y = event.y;

			var mouseEvent = new MouseEvent(type, {
				button: button,
				which: button + 1,
				wheelDelta: event.wheelDeltaY,
				clientX: x,
				clientY: y,
				screenX: x,
				screenY: y,
				pageX: x,
				pageY: y
			});

			var target;
			var mouseListenerMap = __listenerMap.mouse;
			for (var key in mouseListenerMap) {
				target = mouseListenerMap[key];
				target.dispatchEvent(mouseEvent);
			}
		};
	}

	function keyboardEventHandlerFactory(type) {
		return function (event) {
			var keyboardEvent = new KeyboardEvent(type, {
				altKey: event.altKey,
				ctrlKey: event.ctrlKey,
				metaKey: event.metaKey,
				shiftKey: event.shiftKey,
				repeat: event.repeat,
				keyCode: event.keyCode
			});
			var target;
			var keyboardListenerMap = __listenerMap.keyboard;
			for (var key in keyboardListenerMap) {
				target = keyboardListenerMap[key];
				target.dispatchEvent(keyboardEvent);
			}
		};
	}

	module.exports = EventTarget;

	/***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var HTMLElement = __webpack_require__(1);
	var MediaError = __webpack_require__(25);

	var HAVE_NOTHING = 0;
	var HAVE_METADATA = 1;
	var HAVE_CURRENT_DATA = 2;
	var HAVE_FUTURE_DATA = 3;
	var HAVE_ENOUGH_DATA = 4;

	var HTMLMediaElement = function (_HTMLElement) {
		_inherits(HTMLMediaElement, _HTMLElement);

		function HTMLMediaElement(type) {
			_classCallCheck(this, HTMLMediaElement);

			var _this = _possibleConstructorReturn(this, (HTMLMediaElement.__proto__ || Object.getPrototypeOf(HTMLMediaElement)).call(this, type));

			_this._volume = 1.0;
			_this._duration = 0;
			_this._isEnded = false;
			_this._isMute = false;
			_this._readyState = HAVE_NOTHING;
			_this._error = new MediaError();
			return _this;
		}

		_createClass(HTMLMediaElement, [{
			key: 'addTextTrack',
			value: function addTextTrack() {}
		}, {
			key: 'captureStream',
			value: function captureStream() {}
		}, {
			key: 'fastSeek',
			value: function fastSeek() {}
		}, {
			key: 'load',
			value: function load() {}
		}, {
			key: 'pause',
			value: function pause() {}
		}, {
			key: 'play',
			value: function play() {}
		}, {
			key: 'canPlayType',
			value: function canPlayType(mediaType) {
				return '';
			}
		}, {
			key: 'volume',
			set: function set(volume) {
				this._volume = volume;
			},
			get: function get() {
				return this._volume;
			}
		}, {
			key: 'duration',
			get: function get() {
				return this._duration;
			}
		}, {
			key: 'ended',
			get: function get() {
				return this._isEnded;
			}
		}, {
			key: 'muted',
			get: function get() {
				return this._isMute;
			}
		}, {
			key: 'readyState',
			get: function get() {
				return this._readyState;
			}
		}, {
			key: 'error',
			get: function get() {
				return this._error;
			}
		}, {
			key: 'currentTime',
			get: function get() {
				return 0;
			}
		}]);

		return HTMLMediaElement;
	}(HTMLElement);

	module.exports = HTMLMediaElement;

	/***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	/*
  * DOM Level 2
  * Object DOMException
  * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
  * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
  */

	function copy(src, dest) {
		for (var p in src) {
			dest[p] = src[p];
		}
	}
	/**
 ^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
 ^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
  */
	function _extends(Class, Super) {
		var pt = Class.prototype;
		if (!(pt instanceof Super)) {
			var t = function t() {};

			;
			t.prototype = Super.prototype;
			t = new t();
			copy(pt, t);
			Class.prototype = pt = t;
		}
		if (pt.constructor != Class) {
			if (typeof Class != 'function') {
				console.error("unknow Class:" + Class);
			}
			pt.constructor = Class;
		}
	}
	var htmlns = 'http://www.w3.org/1999/xhtml';
	// Node Types
	var NodeType = {};
	var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
	var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
	var TEXT_NODE = NodeType.TEXT_NODE = 3;
	var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
	var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
	var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
	var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
	var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
	var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
	var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
	var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
	var NOTATION_NODE = NodeType.NOTATION_NODE = 12;

	// ExceptionCode
	var ExceptionCode = {};
	var ExceptionMessage = {};
	var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
	var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
	var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
	var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
	var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
	var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
	var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
	var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
	var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
	var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
	//level2
	var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
	var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
	var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
	var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
	var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);

	function DOMException(code, message) {
		if (message instanceof Error) {
			var error = message;
		} else {
			error = this;
			Error.call(this, ExceptionMessage[code]);
			this.message = ExceptionMessage[code];
			if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
		}
		error.code = code;
		if (message) this.message = this.message + ": " + message;
		return error;
	};
	DOMException.prototype = Error.prototype;
	copy(ExceptionCode, DOMException);
	/**
  * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
  * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
  * The items in the NodeList are accessible via an integral index, starting from 0.
  */
	function NodeList() {};
	NodeList.prototype = {
		/**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
		length: 0,
		/**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long 
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
   */
		item: function item(index) {
			return this[index] || null;
		},
		toString: function toString(isHTML, nodeFilter) {
			for (var buf = [], i = 0; i < this.length; i++) {
				serializeToString(this[i], buf, isHTML, nodeFilter);
			}
			return buf.join('');
		}
	};
	function LiveNodeList(node, refresh) {
		this._node = node;
		this._refresh = refresh;
		_updateLiveList(this);
	}
	function _updateLiveList(list) {
		var inc = list._node._inc || list._node.ownerDocument._inc;
		if (list._inc != inc) {
			var ls = list._refresh(list._node);
			//console.log(ls.length)
			__set__(list, 'length', ls.length);
			copy(ls, list);
			list._inc = inc;
		}
	}
	LiveNodeList.prototype.item = function (i) {
		_updateLiveList(this);
		return this[i];
	};

	_extends(LiveNodeList, NodeList);
	/**
  * 
  * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
  * NamedNodeMap objects in the DOM are live.
  * used for attributes or DocumentType entities 
  */
	function NamedNodeMap() {};

	function _findNodeIndex(list, node) {
		var i = list.length;
		while (i--) {
			if (list[i] === node) {
				return i;
			}
		}
	}

	function _addNamedNode(el, list, newAttr, oldAttr) {
		if (oldAttr) {
			list[_findNodeIndex(list, oldAttr)] = newAttr;
		} else {
			list[list.length++] = newAttr;
		}
		if (el) {
			newAttr.ownerElement = el;
			var doc = el.ownerDocument;
			if (doc) {
				oldAttr && _onRemoveAttribute(doc, el, oldAttr);
				_onAddAttribute(doc, el, newAttr);
			}
		}
	}
	function _removeNamedNode(el, list, attr) {
		//console.log('remove attr:'+attr)
		var i = _findNodeIndex(list, attr);
		if (i >= 0) {
			var lastIndex = list.length - 1;
			while (i < lastIndex) {
				list[i] = list[++i];
			}
			list.length = lastIndex;
			if (el) {
				var doc = el.ownerDocument;
				if (doc) {
					_onRemoveAttribute(doc, el, attr);
					attr.ownerElement = null;
				}
			}
		} else {
			throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr));
		}
	}
	NamedNodeMap.prototype = {
		length: 0,
		item: NodeList.prototype.item,
		getNamedItem: function getNamedItem(key) {
			//		if(key.indexOf(':')>0 || key == 'xmlns'){
			//			return null;
			//		}
			//console.log()
			var i = this.length;
			while (i--) {
				var attr = this[i];
				//console.log(attr.nodeName,key)
				if (attr.nodeName == key) {
					return attr;
				}
			}
		},
		setNamedItem: function setNamedItem(attr) {
			var el = attr.ownerElement;
			if (el && el != this._ownerElement) {
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			var oldAttr = this.getNamedItem(attr.nodeName);
			_addNamedNode(this._ownerElement, this, attr, oldAttr);
			return oldAttr;
		},
		/* returns Node */
		setNamedItemNS: function setNamedItemNS(attr) {
			// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
			var el = attr.ownerElement,
			    oldAttr;
			if (el && el != this._ownerElement) {
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
			_addNamedNode(this._ownerElement, this, attr, oldAttr);
			return oldAttr;
		},

		/* returns Node */
		removeNamedItem: function removeNamedItem(key) {
			var attr = this.getNamedItem(key);
			_removeNamedNode(this._ownerElement, this, attr);
			return attr;
		}, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

		//for level2
		removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
			var attr = this.getNamedItemNS(namespaceURI, localName);
			_removeNamedNode(this._ownerElement, this, attr);
			return attr;
		},
		getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
			var i = this.length;
			while (i--) {
				var node = this[i];
				if (node.localName == localName && node.namespaceURI == namespaceURI) {
					return node;
				}
			}
			return null;
		}
	};
	/**
  * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
  */
	function DOMImplementation( /* Object */features) {
		this._features = {};
		if (features) {
			for (var feature in features) {
				this._features = features[feature];
			}
		}
	};

	DOMImplementation.prototype = {
		hasFeature: function hasFeature( /* string */feature, /* string */version) {
			var versions = this._features[feature.toLowerCase()];
			if (versions && (!version || version in versions)) {
				return true;
			} else {
				return false;
			}
		},
		// Introduced in DOM Level 2:
		createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {
			// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
			var doc = new Document();
			doc.implementation = this;
			doc.childNodes = new NodeList();
			doc.doctype = doctype;
			if (doctype) {
				doc.appendChild(doctype);
			}
			if (qualifiedName) {
				var root = doc.createElementNS(namespaceURI, qualifiedName);
				doc.appendChild(root);
			}
			return doc;
		},
		// Introduced in DOM Level 2:
		createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
			// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
			var node = new DocumentType();
			node.name = qualifiedName;
			node.nodeName = qualifiedName;
			node.publicId = publicId;
			node.systemId = systemId;
			// Introduced in DOM Level 2:
			//readonly attribute DOMString        internalSubset;

			//TODO:..
			//  readonly attribute NamedNodeMap     entities;
			//  readonly attribute NamedNodeMap     notations;
			return node;
		}
	};

	/**
  * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
  */

	function Node() {};

	Node.prototype = {
		firstChild: null,
		lastChild: null,
		previousSibling: null,
		nextSibling: null,
		attributes: null,
		parentNode: null,
		childNodes: null,
		ownerDocument: null,
		nodeValue: null,
		namespaceURI: null,
		prefix: null,
		localName: null,
		// Modified in DOM Level 2:
		insertBefore: function insertBefore(newChild, refChild) {
			//raises 
			return _insertBefore(this, newChild, refChild);
		},
		replaceChild: function replaceChild(newChild, oldChild) {
			//raises 
			this.insertBefore(newChild, oldChild);
			if (oldChild) {
				this.removeChild(oldChild);
			}
		},
		removeChild: function removeChild(oldChild) {
			return _removeChild(this, oldChild);
		},
		appendChild: function appendChild(newChild) {
			return this.insertBefore(newChild, null);
		},
		hasChildNodes: function hasChildNodes() {
			return this.firstChild != null;
		},
		cloneNode: function cloneNode(deep) {
			return _cloneNode(this.ownerDocument || this, this, deep);
		},
		// Modified in DOM Level 2:
		normalize: function normalize() {
			var child = this.firstChild;
			while (child) {
				var next = child.nextSibling;
				if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
					this.removeChild(next);
					child.appendData(next.data);
				} else {
					child.normalize();
					child = next;
				}
			}
		},
		// Introduced in DOM Level 2:
		isSupported: function isSupported(feature, version) {
			return this.ownerDocument.implementation.hasFeature(feature, version);
		},
		// Introduced in DOM Level 2:
		hasAttributes: function hasAttributes() {
			return this.attributes.length > 0;
		},
		lookupPrefix: function lookupPrefix(namespaceURI) {
			var el = this;
			while (el) {
				var map = el._nsMap;
				//console.dir(map)
				if (map) {
					for (var n in map) {
						if (map[n] == namespaceURI) {
							return n;
						}
					}
				}
				el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
			}
			return null;
		},
		// Introduced in DOM Level 3:
		lookupNamespaceURI: function lookupNamespaceURI(prefix) {
			var el = this;
			while (el) {
				var map = el._nsMap;
				//console.dir(map)
				if (map) {
					if (prefix in map) {
						return map[prefix];
					}
				}
				el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
			}
			return null;
		},
		// Introduced in DOM Level 3:
		isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
			var prefix = this.lookupPrefix(namespaceURI);
			return prefix == null;
		}
	};

	function _xmlEncoder(c) {
		return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + c.charCodeAt() + ';';
	}

	copy(NodeType, Node);
	copy(NodeType, Node.prototype);

	/**
  * @param callback return true for continue,false for break
  * @return boolean true: break visit;
  */
	function _visitNode(node, callback) {
		if (callback(node)) {
			return true;
		}
		if (node = node.firstChild) {
			do {
				if (_visitNode(node, callback)) {
					return true;
				}
			} while (node = node.nextSibling);
		}
	}

	function Document() {}
	function _onAddAttribute(doc, el, newAttr) {
		doc && doc._inc++;
		var ns = newAttr.namespaceURI;
		if (ns == 'http://www.w3.org/2000/xmlns/') {
			//update namespace
			el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
		}
	}
	function _onRemoveAttribute(doc, el, newAttr, remove) {
		doc && doc._inc++;
		var ns = newAttr.namespaceURI;
		if (ns == 'http://www.w3.org/2000/xmlns/') {
			//update namespace
			delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
		}
	}
	function _onUpdateChild(doc, el, newChild) {
		if (doc && doc._inc) {
			doc._inc++;
			//update childNodes
			var cs = el.childNodes;
			if (newChild) {
				cs[cs.length++] = newChild;
			} else {
				//console.log(1)
				var child = el.firstChild;
				var i = 0;
				while (child) {
					cs[i++] = child;
					child = child.nextSibling;
				}
				cs.length = i;
			}
		}
	}

	/**
  * attributes;
  * children;
  * 
  * writeable properties:
  * nodeValue,Attr:value,CharacterData:data
  * prefix
  */
	function _removeChild(parentNode, child) {
		var previous = child.previousSibling;
		var next = child.nextSibling;
		if (previous) {
			previous.nextSibling = next;
		} else {
			parentNode.firstChild = next;
		}
		if (next) {
			next.previousSibling = previous;
		} else {
			parentNode.lastChild = previous;
		}
		_onUpdateChild(parentNode.ownerDocument, parentNode);
		return child;
	}
	/**
  * preformance key(refChild == null)
  */
	function _insertBefore(parentNode, newChild, nextChild) {
		var cp = newChild.parentNode;
		if (cp) {
			cp.removeChild(newChild); //remove and update
		}
		if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
			var newFirst = newChild.firstChild;
			if (newFirst == null) {
				return newChild;
			}
			var newLast = newChild.lastChild;
		} else {
			newFirst = newLast = newChild;
		}
		var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

		newFirst.previousSibling = pre;
		newLast.nextSibling = nextChild;

		if (pre) {
			pre.nextSibling = newFirst;
		} else {
			parentNode.firstChild = newFirst;
		}
		if (nextChild == null) {
			parentNode.lastChild = newLast;
		} else {
			nextChild.previousSibling = newLast;
		}
		do {
			newFirst.parentNode = parentNode;
		} while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
		_onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
		//console.log(parentNode.lastChild.nextSibling == null)
		if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
			newChild.firstChild = newChild.lastChild = null;
		}
		return newChild;
	}
	function _appendSingleChild(parentNode, newChild) {
		var cp = newChild.parentNode;
		if (cp) {
			var pre = parentNode.lastChild;
			cp.removeChild(newChild); //remove and update
			var pre = parentNode.lastChild;
		}
		var pre = parentNode.lastChild;
		newChild.parentNode = parentNode;
		newChild.previousSibling = pre;
		newChild.nextSibling = null;
		if (pre) {
			pre.nextSibling = newChild;
		} else {
			parentNode.firstChild = newChild;
		}
		parentNode.lastChild = newChild;
		_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
		return newChild;
		//console.log("__aa",parentNode.lastChild.nextSibling == null)
	}
	Document.prototype = {
		//implementation : null,
		nodeName: '#document',
		nodeType: DOCUMENT_NODE,
		doctype: null,
		documentElement: null,
		_inc: 1,

		insertBefore: function insertBefore(newChild, refChild) {
			//raises 
			if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
				var child = newChild.firstChild;
				while (child) {
					var next = child.nextSibling;
					this.insertBefore(child, refChild);
					child = next;
				}
				return newChild;
			}
			if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
				this.documentElement = newChild;
			}

			return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
		},
		removeChild: function removeChild(oldChild) {
			if (this.documentElement == oldChild) {
				this.documentElement = null;
			}
			return _removeChild(this, oldChild);
		},
		// Introduced in DOM Level 2:
		importNode: function importNode(importedNode, deep) {
			return _importNode(this, importedNode, deep);
		},
		// Introduced in DOM Level 2:
		getElementById: function getElementById(id) {
			var rtv = null;
			_visitNode(this.documentElement, function (node) {
				if (node.nodeType == ELEMENT_NODE) {
					if (node.getAttribute('id') == id) {
						rtv = node;
						return true;
					}
				}
			});
			return rtv;
		},

		//document factory method:
		createElement: function createElement(tagName) {
			var node = new Element();
			node.ownerDocument = this;
			node.nodeName = tagName;
			node.tagName = tagName;
			node.childNodes = new NodeList();
			var attrs = node.attributes = new NamedNodeMap();
			attrs._ownerElement = node;
			return node;
		},
		createDocumentFragment: function createDocumentFragment() {
			var node = new DocumentFragment();
			node.ownerDocument = this;
			node.childNodes = new NodeList();
			return node;
		},
		createTextNode: function createTextNode(data) {
			var node = new Text();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createComment: function createComment(data) {
			var node = new Comment();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createCDATASection: function createCDATASection(data) {
			var node = new CDATASection();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createProcessingInstruction: function createProcessingInstruction(target, data) {
			var node = new ProcessingInstruction();
			node.ownerDocument = this;
			node.tagName = node.target = target;
			node.nodeValue = node.data = data;
			return node;
		},
		createAttribute: function createAttribute(name) {
			var node = new Attr();
			node.ownerDocument = this;
			node.name = name;
			node.nodeName = name;
			node.localName = name;
			node.specified = true;
			return node;
		},
		createEntityReference: function createEntityReference(name) {
			var node = new EntityReference();
			node.ownerDocument = this;
			node.nodeName = name;
			return node;
		},
		// Introduced in DOM Level 2:
		createElementNS: function createElementNS(namespaceURI, qualifiedName) {
			var node = new Element();
			var pl = qualifiedName.split(':');
			var attrs = node.attributes = new NamedNodeMap();
			node.childNodes = new NodeList();
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.tagName = qualifiedName;
			node.namespaceURI = namespaceURI;
			if (pl.length == 2) {
				node.prefix = pl[0];
				node.localName = pl[1];
			} else {
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			attrs._ownerElement = node;
			return node;
		},
		// Introduced in DOM Level 2:
		createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
			var node = new Attr();
			var pl = qualifiedName.split(':');
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.name = qualifiedName;
			node.namespaceURI = namespaceURI;
			node.specified = true;
			if (pl.length == 2) {
				node.prefix = pl[0];
				node.localName = pl[1];
			} else {
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			return node;
		}
	};
	_extends(Document, Node);

	function Element() {
		this._nsMap = {};
	};
	Element.prototype = {
		nodeType: ELEMENT_NODE,
		hasAttribute: function hasAttribute(name) {
			return this.getAttributeNode(name) != null;
		},
		getAttribute: function getAttribute(name) {
			var attr = this.getAttributeNode(name);
			return attr && attr.value || '';
		},
		getAttributeNode: function getAttributeNode(name) {
			return this.attributes.getNamedItem(name);
		},
		setAttribute: function setAttribute(name, value) {
			var attr = this.ownerDocument.createAttribute(name);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		removeAttribute: function removeAttribute(name) {
			var attr = this.getAttributeNode(name);
			attr && this.removeAttributeNode(attr);
		},

		//four real opeartion method
		appendChild: function appendChild(newChild) {
			if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
				return this.insertBefore(newChild, null);
			} else {
				return _appendSingleChild(this, newChild);
			}
		},
		setAttributeNode: function setAttributeNode(newAttr) {
			return this.attributes.setNamedItem(newAttr);
		},
		setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
			return this.attributes.setNamedItemNS(newAttr);
		},
		removeAttributeNode: function removeAttributeNode(oldAttr) {
			//console.log(this == oldAttr.ownerElement)
			return this.attributes.removeNamedItem(oldAttr.nodeName);
		},
		//get real attribute name,and remove it by removeAttributeNode
		removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
			var old = this.getAttributeNodeNS(namespaceURI, localName);
			old && this.removeAttributeNode(old);
		},

		hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
			return this.getAttributeNodeNS(namespaceURI, localName) != null;
		},
		getAttributeNS: function getAttributeNS(namespaceURI, localName) {
			var attr = this.getAttributeNodeNS(namespaceURI, localName);
			return attr && attr.value || '';
		},
		setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
			var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
			return this.attributes.getNamedItemNS(namespaceURI, localName);
		},

		getElementsByTagName: function getElementsByTagName(tagName) {
			return new LiveNodeList(this, function (base) {
				var ls = [];
				_visitNode(base, function (node) {
					if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
						ls.push(node);
					}
				});
				return ls;
			});
		},
		getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
			return new LiveNodeList(this, function (base) {
				var ls = [];
				_visitNode(base, function (node) {
					if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
						ls.push(node);
					}
				});
				return ls;
			});
		}
	};
	Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
	Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;

	_extends(Element, Node);
	function Attr() {};
	Attr.prototype.nodeType = ATTRIBUTE_NODE;
	_extends(Attr, Node);

	function CharacterData() {};
	CharacterData.prototype = {
		data: '',
		substringData: function substringData(offset, count) {
			return this.data.substring(offset, offset + count);
		},
		appendData: function appendData(text) {
			text = this.data + text;
			this.nodeValue = this.data = text;
			this.length = text.length;
		},
		insertData: function insertData(offset, text) {
			this.replaceData(offset, 0, text);
		},
		appendChild: function appendChild(newChild) {
			throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
		},
		deleteData: function deleteData(offset, count) {
			this.replaceData(offset, count, "");
		},
		replaceData: function replaceData(offset, count, text) {
			var start = this.data.substring(0, offset);
			var end = this.data.substring(offset + count);
			text = start + text + end;
			this.nodeValue = this.data = text;
			this.length = text.length;
		}
	};
	_extends(CharacterData, Node);
	function Text() {};
	Text.prototype = {
		nodeName: "#text",
		nodeType: TEXT_NODE,
		splitText: function splitText(offset) {
			var text = this.data;
			var newText = text.substring(offset);
			text = text.substring(0, offset);
			this.data = this.nodeValue = text;
			this.length = text.length;
			var newNode = this.ownerDocument.createTextNode(newText);
			if (this.parentNode) {
				this.parentNode.insertBefore(newNode, this.nextSibling);
			}
			return newNode;
		}
	};
	_extends(Text, CharacterData);
	function Comment() {};
	Comment.prototype = {
		nodeName: "#comment",
		nodeType: COMMENT_NODE
	};
	_extends(Comment, CharacterData);

	function CDATASection() {};
	CDATASection.prototype = {
		nodeName: "#cdata-section",
		nodeType: CDATA_SECTION_NODE
	};
	_extends(CDATASection, CharacterData);

	function DocumentType() {};
	DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
	_extends(DocumentType, Node);

	function Notation() {};
	Notation.prototype.nodeType = NOTATION_NODE;
	_extends(Notation, Node);

	function Entity() {};
	Entity.prototype.nodeType = ENTITY_NODE;
	_extends(Entity, Node);

	function EntityReference() {};
	EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
	_extends(EntityReference, Node);

	function DocumentFragment() {};
	DocumentFragment.prototype.nodeName = "#document-fragment";
	DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
	_extends(DocumentFragment, Node);

	function ProcessingInstruction() {}
	ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
	_extends(ProcessingInstruction, Node);
	function XMLSerializer() {}
	XMLSerializer.prototype.serializeToString = function (node, isHtml, nodeFilter) {
		return nodeSerializeToString.call(node, isHtml, nodeFilter);
	};
	Node.prototype.toString = nodeSerializeToString;
	function nodeSerializeToString(isHtml, nodeFilter) {
		var buf = [];
		var refNode = this.nodeType == 9 && this.documentElement || this;
		var prefix = refNode.prefix;
		var uri = refNode.namespaceURI;

		if (uri && prefix == null) {
			//console.log(prefix)
			var prefix = refNode.lookupPrefix(uri);
			if (prefix == null) {
				//isHTML = true;
				var visibleNamespaces = [{ namespace: uri, prefix: null
					//{namespace:uri,prefix:''}
				}];
			}
		}
		serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
		//console.log('###',this.nodeType,uri,prefix,buf.join(''))
		return buf.join('');
	}
	function needNamespaceDefine(node, isHTML, visibleNamespaces) {
		var prefix = node.prefix || '';
		var uri = node.namespaceURI;
		if (!prefix && !uri) {
			return false;
		}
		if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == 'http://www.w3.org/2000/xmlns/') {
			return false;
		}

		var i = visibleNamespaces.length;
		//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
		while (i--) {
			var ns = visibleNamespaces[i];
			// get namespace prefix
			//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
			if (ns.prefix == prefix) {
				return ns.namespace != uri;
			}
		}
		//console.log(isHTML,uri,prefix=='')
		//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
		//	return false;
		//}
		//node.flag = '11111'
		//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
		return true;
	}
	function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
		if (nodeFilter) {
			node = nodeFilter(node);
			if (node) {
				if (typeof node == 'string') {
					buf.push(node);
					return;
				}
			} else {
				return;
			}
			//buf.sort.apply(attrs, attributeSorter);
		}
		switch (node.nodeType) {
			case ELEMENT_NODE:
				if (!visibleNamespaces) visibleNamespaces = [];
				var startVisibleNamespaces = visibleNamespaces.length;
				var attrs = node.attributes;
				var len = attrs.length;
				var child = node.firstChild;
				var nodeName = node.tagName;

				isHTML = htmlns === node.namespaceURI || isHTML;
				buf.push('<', nodeName);

				for (var i = 0; i < len; i++) {
					// add namespaces for attributes
					var attr = attrs.item(i);
					if (attr.prefix == 'xmlns') {
						visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
					} else if (attr.nodeName == 'xmlns') {
						visibleNamespaces.push({ prefix: '', namespace: attr.value });
					}
				}
				for (var i = 0; i < len; i++) {
					var attr = attrs.item(i);
					if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
						var prefix = attr.prefix || '';
						var uri = attr.namespaceURI;
						var ns = prefix ? ' xmlns:' + prefix : " xmlns";
						buf.push(ns, '="', uri, '"');
						visibleNamespaces.push({ prefix: prefix, namespace: uri });
					}
					serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
				}
				// add namespace for current node		
				if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
					var prefix = node.prefix || '';
					var uri = node.namespaceURI;
					var ns = prefix ? ' xmlns:' + prefix : " xmlns";
					buf.push(ns, '="', uri, '"');
					visibleNamespaces.push({ prefix: prefix, namespace: uri });
				}

				if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
					buf.push('>');
					//if is cdata child node
					if (isHTML && /^script$/i.test(nodeName)) {
						while (child) {
							if (child.data) {
								buf.push(child.data);
							} else {
								serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
							}
							child = child.nextSibling;
						}
					} else {
						while (child) {
							serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
							child = child.nextSibling;
						}
					}
					buf.push('</', nodeName, '>');
				} else {
					buf.push('/>');
				}
				// remove added visible namespaces
				//visibleNamespaces.length = startVisibleNamespaces;
				return;
			case DOCUMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var child = node.firstChild;
				while (child) {
					serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
					child = child.nextSibling;
				}
				return;
			case ATTRIBUTE_NODE:
				return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
			case TEXT_NODE:
				return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));
			case CDATA_SECTION_NODE:
				return buf.push('<![CDATA[', node.data, ']]>');
			case COMMENT_NODE:
				return buf.push("<!--", node.data, "-->");
			case DOCUMENT_TYPE_NODE:
				var pubid = node.publicId;
				var sysid = node.systemId;
				buf.push('<!DOCTYPE ', node.name);
				if (pubid) {
					buf.push(' PUBLIC "', pubid);
					if (sysid && sysid != '.') {
						buf.push('" "', sysid);
					}
					buf.push('">');
				} else if (sysid && sysid != '.') {
					buf.push(' SYSTEM "', sysid, '">');
				} else {
					var sub = node.internalSubset;
					if (sub) {
						buf.push(" [", sub, "]");
					}
					buf.push(">");
				}
				return;
			case PROCESSING_INSTRUCTION_NODE:
				return buf.push("<?", node.target, " ", node.data, "?>");
			case ENTITY_REFERENCE_NODE:
				return buf.push('&', node.nodeName, ';');
			//case ENTITY_NODE:
			//case NOTATION_NODE:
			default:
				buf.push('??', node.nodeName);
		}
	}
	function _importNode(doc, node, deep) {
		var node2;
		switch (node.nodeType) {
			case ELEMENT_NODE:
				node2 = node.cloneNode(false);
				node2.ownerDocument = doc;
			//var attrs = node2.attributes;
			//var len = attrs.length;
			//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
			//}
			case DOCUMENT_FRAGMENT_NODE:
				break;
			case ATTRIBUTE_NODE:
				deep = true;
				break;
			//case ENTITY_REFERENCE_NODE:
			//case PROCESSING_INSTRUCTION_NODE:
			////case TEXT_NODE:
			//case CDATA_SECTION_NODE:
			//case COMMENT_NODE:
			//	deep = false;
			//	break;
			//case DOCUMENT_NODE:
			//case DOCUMENT_TYPE_NODE:
			//cannot be imported.
			//case ENTITY_NODE:
			//case NOTATION_NODE：
			//can not hit in level3
			//default:throw e;
		}
		if (!node2) {
			node2 = node.cloneNode(false); //false
		}
		node2.ownerDocument = doc;
		node2.parentNode = null;
		if (deep) {
			var child = node.firstChild;
			while (child) {
				node2.appendChild(_importNode(doc, child, deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}
	//
	//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
	//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
	function _cloneNode(doc, node, deep) {
		var node2 = new node.constructor();
		for (var n in node) {
			var v = node[n];
			if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) != 'object') {
				if (v != node2[n]) {
					node2[n] = v;
				}
			}
		}
		if (node.childNodes) {
			node2.childNodes = new NodeList();
		}
		node2.ownerDocument = doc;
		switch (node2.nodeType) {
			case ELEMENT_NODE:
				var attrs = node.attributes;
				var attrs2 = node2.attributes = new NamedNodeMap();
				var len = attrs.length;
				attrs2._ownerElement = node2;
				for (var i = 0; i < len; i++) {
					node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
				}
				break;;
			case ATTRIBUTE_NODE:
				deep = true;
		}
		if (deep) {
			var child = node.firstChild;
			while (child) {
				node2.appendChild(_cloneNode(doc, child, deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}

	function __set__(object, key, value) {
		object[key] = value;
	}
	//do dynamic
	try {
		if (Object.defineProperty) {
			var getTextContent = function getTextContent(node) {
				switch (node.nodeType) {
					case ELEMENT_NODE:
					case DOCUMENT_FRAGMENT_NODE:
						var buf = [];
						node = node.firstChild;
						while (node) {
							if (node.nodeType !== 7 && node.nodeType !== 8) {
								buf.push(getTextContent(node));
							}
							node = node.nextSibling;
						}
						return buf.join('');
					default:
						return node.nodeValue;
				}
			};

			Object.defineProperty(LiveNodeList.prototype, 'length', {
				get: function get() {
					_updateLiveList(this);
					return this.$$length;
				}
			});
			Object.defineProperty(Node.prototype, 'textContent', {
				get: function get() {
					return getTextContent(this);
				},
				set: function set(data) {
					switch (this.nodeType) {
						case ELEMENT_NODE:
						case DOCUMENT_FRAGMENT_NODE:
							while (this.firstChild) {
								this.removeChild(this.firstChild);
							}
							if (data || String(data)) {
								this.appendChild(this.ownerDocument.createTextNode(data));
							}
							break;
						default:
							//TODO:
							this.data = data;
							this.value = data;
							this.nodeValue = data;
					}
				}
			});

			__set__ = function __set__(object, key, value) {
				//console.log(value)
				object['$$' + key] = value;
			};
		}
	} catch (e) {} //ie8


	//if(typeof require == 'function'){
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
	//}

	/***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var canvas = window.mainCanvas || qg.createCanvas();
	var canvasConstructor = canvas.constructor;

	module.exports = canvasConstructor;

	/***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var location = {
		href: 'game.js',
		pathname: 'game.js',
		search: '',
		hash: '',
		reload: function reload() {}
	};

	module.exports = location;

	/***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Node = __webpack_require__(8);
	var DOMRect = __webpack_require__(24);

	var Element = function (_Node) {
		_inherits(Element, _Node);

		function Element() {
			_classCallCheck(this, Element);

			var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

			_this.className = '';
			_this.children = [];
			_this.clientLeft = 0;
			_this.clientTop = 0;
			_this.scrollLeft = 0;
			_this.scrollTop = 0;
			return _this;
		}

		_createClass(Element, [{
			key: 'getBoundingClientRect',
			value: function getBoundingClientRect() {
				return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
			}

			// attrName is a string that names the attribute to be removed from element.

		}, {
			key: 'removeAttribute',
			value: function removeAttribute(attrName) {}
		}, {
			key: 'clientWidth',
			get: function get() {
				return 0;
			}
		}, {
			key: 'clientHeight',
			get: function get() {
				return 0;
			}
		}]);

		return Element;
	}(Node);

	module.exports = Element;

	/***/
},
/* 8 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var EventTarget = __webpack_require__(2);

	var Node = function (_EventTarget) {
		_inherits(Node, _EventTarget);

		function Node() {
			_classCallCheck(this, Node);

			var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this));

			_this.childNodes = [];
			_this.parentNode = mainCanvas;
			return _this;
		}

		_createClass(Node, [{
			key: 'appendChild',
			value: function appendChild(node) {
				this.childNodes.push(node);
			}
		}, {
			key: 'insertBefore',
			value: function insertBefore(newNode, referenceNode) {
				return newNode;
			}
		}, {
			key: 'replaceChild',
			value: function replaceChild(newChild, oldChild) {
				return oldChild;
			}
		}, {
			key: 'cloneNode',
			value: function cloneNode() {
				var copyNode = Object.create(this);

				Object.assign(copyNode, this);
				return copyNode;
			}
		}, {
			key: 'removeChild',
			value: function removeChild(node) {
				var index = this.childNodes.findIndex(function (child) {
					return child === node;
				});

				if (index > -1) {
					return this.childNodes.splice(index, 1);
				}
				return null;
			}
		}, {
			key: 'contains',
			value: function contains(node) {
				return this.childNodes.indexOf(node) > -1;
			}
		}]);

		return Node;
	}(EventTarget);

	module.exports = Node;

	/***/
},
/* 9 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var image = qg.createImage();

	module.exports = image.constructor;

	/***/
},
/* 10 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var HTMLAudioElement = __webpack_require__(11);

	function Audio(url) {
		return new HTMLAudioElement(url);
	}

	module.exports = Audio;

	/***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var HTMLMediaElement = __webpack_require__(3);

	var HAVE_NOTHING = 0;
	var HAVE_METADATA = 1;
	var HAVE_CURRENT_DATA = 2;
	var HAVE_FUTURE_DATA = 3;
	var HAVE_ENOUGH_DATA = 4;

	var _innerAudioContext = new WeakMap();
	var _src = new WeakMap();
	var _loop = new WeakMap();
	var _autoplay = new WeakMap();

	var HTMLAudioElement = function (_HTMLMediaElement) {
		_inherits(HTMLAudioElement, _HTMLMediaElement);

		function HTMLAudioElement(url) {
			_classCallCheck(this, HTMLAudioElement);

			var _this = _possibleConstructorReturn(this, (HTMLAudioElement.__proto__ || Object.getPrototypeOf(HTMLAudioElement)).call(this, 'audio'));

			_src.set(_this, '');

			var innerAudioContext = qg.createInnerAudioContext();

			_innerAudioContext.set(_this, innerAudioContext);

			innerAudioContext.onEnded(function () {
				_this._paused = _innerAudioContext.get(_this).paused;
				if (_innerAudioContext.get(_this).loop === false) {
					_this.dispatchEvent({ type: 'ended' });
				}
				_this._readyState = HAVE_ENOUGH_DATA;
			});

			if (url) {
				_innerAudioContext.get(_this).src = url;
			}
			_this._paused = innerAudioContext.paused;
			_this._volume = innerAudioContext.volume;
			_this._muted = false;
			return _this;
		}

		_createClass(HTMLAudioElement, [{
			key: 'load',
			value: function load() {
				console.warn('HTMLAudioElement.load() is not implemented.');
			}
		}, {
			key: 'play',
			value: function play() {
				_innerAudioContext.get(this).play();
				if (_innerAudioContext.get(this).id === -1) {
					this.dispatchEvent({ type: 'error' });
				}
			}
		}, {
			key: 'pause',
			value: function pause() {
				_innerAudioContext.get(this).pause();
			}
		}, {
			key: 'destroy',
			value: function destroy() {}
		}, {
			key: 'canPlayType',
			value: function canPlayType() {
				var mediaType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

				if (typeof mediaType !== 'string') {
					return '';
				}

				if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
					return 'probably';
				}
				return '';
			}
		}, {
			key: 'cloneNode',
			value: function cloneNode() {
				var newAudio = new HTMLAudioElement();
				newAudio.loop = _innerAudioContext.get(this).loop;
				newAudio.src = this.src;
				return newAudio;
			}
		}, {
			key: 'currentTime',
			get: function get() {
				return _innerAudioContext.get(this).currentTime;
			},
			set: function set(value) {
				_innerAudioContext.get(this).seek(value);
			}
		}, {
			key: 'duration',
			get: function get() {
				return _innerAudioContext.get(this).duration;
			}
		}, {
			key: 'src',
			get: function get() {
				return _src.get(this);
			},
			set: function set(value) {
				_src.set(this, value);
				_innerAudioContext.get(this).src = value;
			}
		}, {
			key: 'loop',
			get: function get() {
				return _innerAudioContext.get(this).loop;
			},
			set: function set(value) {
				_innerAudioContext.get(this).loop = value;
			}
		}, {
			key: 'autoplay',
			get: function get() {
				return false;
			},
			set: function set(value) {}
		}, {
			key: 'paused',
			get: function get() {
				return _innerAudioContext.get(this).paused;
			}
		}, {
			key: 'volume',
			get: function get() {
				return this._volume;
			},
			set: function set(value) {
				this._volume = value;
				if (!this._muted) {
					_innerAudioContext.get(this).volume = value;
				}
			}
		}, {
			key: 'muted',
			get: function get() {
				return this._muted;
			},
			set: function set(value) {
				this._muted = value;
				if (value) {
					_innerAudioContext.get(this).volume = 0;
				} else {
					_innerAudioContext.get(this).volume = this._volume;
				}
			}
		}]);

		return HTMLAudioElement;
	}(HTMLMediaElement);

	module.exports = HTMLAudioElement;

	/***/
},
/* 12 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var HTMLMediaElement = __webpack_require__(3);

	var HTMLVideoElement = function (_HTMLMediaElement) {
		_inherits(HTMLVideoElement, _HTMLMediaElement);

		function HTMLVideoElement() {
			_classCallCheck(this, HTMLVideoElement);

			return _possibleConstructorReturn(this, (HTMLVideoElement.__proto__ || Object.getPrototypeOf(HTMLVideoElement)).call(this, 'video'));
		}

		_createClass(HTMLVideoElement, [{
			key: 'canPlayType',
			value: function canPlayType(type) {
				return false;
			}
		}]);

		return HTMLVideoElement;
	}(HTMLMediaElement);

	module.exports = HTMLVideoElement;

	/***/
},
/* 13 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var HTMLElement = __webpack_require__(1);
	var Event = __webpack_require__(0);

	var HTMLScriptElement = function (_HTMLElement) {
		_inherits(HTMLScriptElement, _HTMLElement);

		function HTMLScriptElement(width, height) {
			_classCallCheck(this, HTMLScriptElement);

			return _possibleConstructorReturn(this, (HTMLScriptElement.__proto__ || Object.getPrototypeOf(HTMLScriptElement)).call(this, 'script'));
		}

		_createClass(HTMLScriptElement, [{
			key: 'src',
			set: function set(url) {}
		}]);

		return HTMLScriptElement;
	}(HTMLElement);

	module.exports = HTMLScriptElement;

	/***/
},
/* 14 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var EventTarget = __webpack_require__(2);
	var Event = __webpack_require__(0);

	var FontFaceSet = function (_EventTarget) {
		_inherits(FontFaceSet, _EventTarget);

		function FontFaceSet() {
			_classCallCheck(this, FontFaceSet);

			var _this = _possibleConstructorReturn(this, (FontFaceSet.__proto__ || Object.getPrototypeOf(FontFaceSet)).call(this));

			_this._status = 'loading';
			return _this;
		}

		_createClass(FontFaceSet, [{
			key: 'add',
			value: function add(fontFace) {
				var _this2 = this;

				this._status = fontFace._status = 'loading';
				this.dispatchEvent(new Event('loading'));
				// Call native binding method to set the ttf font to native platform.
				var family = qg.loadFont(fontFace.family, fontFace.source);
				setTimeout(function () {
					if (family) {
						fontFace._status = _this2._status = 'loaded';
						fontFace._resolveCB();
						_this2.dispatchEvent(new Event('loadingdone'));
					} else {
						fontFace._status = _this2._status = 'error';
						fontFace._rejectCB();
						_this2.dispatchEvent(new Event('loadingerror'));
					}
				}, 0);
			}
		}, {
			key: 'clear',
			value: function clear() {}
		}, {
			key: 'delete',
			value: function _delete() {}
		}, {
			key: 'load',
			value: function load() {}
		}, {
			key: 'ready',
			value: function ready() {}
		}, {
			key: 'status',
			get: function get() {
				return this._status;
			}
		}, {
			key: 'onloading',
			set: function set(listener) {
				this.addEventListener('loading', listener);
			}
		}, {
			key: 'onloadingdone',
			set: function set(listener) {
				this.addEventListener('loadingdone', listener);
			}
		}, {
			key: 'onloadingerror',
			set: function set(listener) {
				this.addEventListener('loadingerror', listener);
			}
		}]);

		return FontFaceSet;
	}(EventTarget);

	module.exports = FontFaceSet;

	/***/
},
/* 15 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	function inject() {
		__webpack_require__(16);

		window._isAdapted = true;
	}

	if (!window._isAdapted) {
		inject();
	}

	/***/
},
/* 16 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(17),
	    btoa = _require.btoa,
	    atob = _require.atob;

	window.btoa = btoa;
	window.atob = atob;

	var _require2 = __webpack_require__(18),
	    Blob = _require2.Blob,
	    URL = _require2.URL;

	window.Blob = Blob;
	window.URL = URL;
	window.DOMParser = __webpack_require__(20).DOMParser;

	window.CanvasRenderingContext2D = qg.getCanvasRenderingContext2D();
	window.top = window.parent = window;

	window.ontouchstart = null;
	window.ontouchmove = null;
	window.ontouchend = null;
	window.ontouchcancel = null;

	window.pageXOffset = window.pageYOffset = window.clientTop = window.clientLeft = 0;
	window.outerWidth = window.innerWidth;
	window.outerHeight = window.innerHeight;

	// 第一次调用createCanvas创建的是主屏canvas，以后再创建的是离屏canvas
	window.mainCanvas = qg.createCanvas();
	window.HTMLCanvasElement = __webpack_require__(5);

	window.location = __webpack_require__(6);
	window.document = __webpack_require__(23);
	window.Element = __webpack_require__(7);
	window.HTMLElement = __webpack_require__(1);
	window.HTMLImageElement = __webpack_require__(26);
	window.HTMLMediaElement = __webpack_require__(3);
	window.HTMLAudioElement = __webpack_require__(11);
	window.HTMLVideoElement = __webpack_require__(12);
	window.HTMLScriptElement = __webpack_require__(13);
	window.navigator = __webpack_require__(27);
	window.Image = __webpack_require__(9);
	window.Audio = __webpack_require__(10);
	window.FileReader = __webpack_require__(29);
	window.FontFace = __webpack_require__(30);
	window.FontFaceSet = __webpack_require__(14);
	window.EventTarget = __webpack_require__(2);
	window.Event = __webpack_require__(0);
	window.TouchEvent = __webpack_require__(31);
	window.MouseEvent = __webpack_require__(32);
	window.KeyboardEvent = __webpack_require__(33);
	window.DeviceMotionEvent = __webpack_require__(34);

	var ROTATION_0 = 0;
	var ROTATION_90 = 1;
	var ROTATION_180 = 2;
	var ROTATION_270 = 3;
	var orientation = 0;
	var rotation = qg.getDeviceRotation();
	switch (rotation) {
		case ROTATION_90:
			orientation = 90;
			break;
		case ROTATION_180:
			orientation = 180;
			break;
		case ROTATION_270:
			orientation = -90;
			break;
		default:
			break;
	}

	window.orientation = orientation;
	window.devicePixelRatio = 1.0;
	window.screen = {
		availTop: 0,
		availLeft: 0,
		availHeight: window.innerWidth,
		availWidth: window.innerHeight,
		colorDepth: 8,
		pixelDepth: 8,
		left: 0,
		top: 0,
		width: window.innerWidth,
		height: window.innerHeight,
		orientation: { //FIXME:cjh
			type: 'portrait-primary' // portrait-primary, portrait-secondary, landscape-primary, landscape-secondary
		},
		onorientationchange: function onorientationchange(event) {}
	};

	window.addEventListener = function (eventName, listener, options) {
		window.mainCanvas.addEventListener(eventName, listener, options);
	};

	window.removeEventListener = function (eventName, listener, options) {
		window.mainCanvas.removeEventListener(eventName, listener, options);
	};

	window.dispatchEvent = function (event) {
		window.mainCanvas.dispatchEvent(event);
	};

	window.getComputedStyle = function (element) {
		return {
			position: 'absolute',
			left: '0px',
			top: '0px',
			height: '0px'
		};
	};

	window.focus = function () {};
	window.scroll = function () {};
	window.resize = function (width, height) {
		window.innerWidth = width;
		window.innerHeight = height;
		window.outerWidth = window.innerWidth;
		window.outerHeight = window.innerHeight;
		window.mainCanvas._width = window.innerWidth;
		window.mainCanvas._height = window.innerHeight;
		window.screen.availWidth = window.innerWidth;
		window.screen.availHeight = window.innerHeight;
		window.screen.width = window.innerWidth;
		window.screen.height = window.innerHeight;
	};
	window.localStorage = __webpack_require__(35);
	window.alert = console.error.bind(console);
	window.close = qg.getClose ? qg.getClose : function () {};

	/***/
},
/* 17 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	!function () {
		function e(e) {
			this.message = e;
		}var t = true ? exports : "undefined" != typeof self ? self : $.global,
		    r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.prototype = new Error(), e.prototype.name = "InvalidCharacterError", t.btoa || (t.btoa = function (t) {
			for (var o, n, a = String(t), i = 0, f = r, c = ""; a.charAt(0 | i) || (f = "=", i % 1); c += f.charAt(63 & o >> 8 - i % 1 * 8)) {
				if (n = a.charCodeAt(i += .75), n > 255) throw new e("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");o = o << 8 | n;
			}return c;
		}), t.atob || (t.atob = function (t) {
			var o = String(t).replace(/[=]+$/, "");if (o.length % 4 == 1) throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for (var n, a, i = 0, f = 0, c = ""; a = o.charAt(f++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? c += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0) {
				a = r.indexOf(a);
			}return c;
		});
	}();

	/***/
},
/* 18 */
/***/function (module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */
	(function (global) {
		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
		};

		(function (global) {
			(function (factory) {
				if (true) {
					// AMD. Register as an anonymous module.
					!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
				} else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof exports.nodeName !== "string") {
					// CommonJS
					factory(exports);
				} else {
					// Browser globals
					factory(global);
				}
			})(function (exports) {
				"use strict";

				exports.URL = global.URL || global.webkitURL;

				if (global.Blob && global.URL) {
					try {
						new Blob();
						return;
					} catch (e) {}
				}

				// Internally we use a BlobBuilder implementation to base Blob off of
				// in order to support older browsers that only have BlobBuilder
				var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MozBlobBuilder || function () {
					var get_class = function get_class(object) {
						return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
					},
					    FakeBlobBuilder = function BlobBuilder() {
						this.data = [];
					},
					    FakeBlob = function Blob(data, type, encoding) {
						this.data = data;
						this.size = data.length;
						this.type = type;
						this.encoding = encoding;
					},
					    FBB_proto = FakeBlobBuilder.prototype,
					    FB_proto = FakeBlob.prototype,
					    FileReaderSync = global.FileReaderSync,
					    FileException = function FileException(type) {
						this.code = this[this.name = type];
					},
					    file_ex_codes = ("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR " + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),
					    file_ex_code = file_ex_codes.length,
					    real_URL = global.URL || global.webkitURL || exports,
					    real_create_object_URL = real_URL.createObjectURL,
					    real_revoke_object_URL = real_URL.revokeObjectURL,
					    URL = real_URL,
					    btoa = global.btoa,
					    atob = global.atob,
					    ArrayBuffer = global.ArrayBuffer,
					    Uint8Array = global.Uint8Array,
					    origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
					FakeBlob.fake = FB_proto.fake = true;
					while (file_ex_code--) {
						FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
					}
					// Polyfill URL
					if (!real_URL.createObjectURL) {
						URL = exports.URL = function (uri) {
							var uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
							    uri_origin;
							uri_info.href = uri;
							if (!("origin" in uri_info)) {
								if (uri_info.protocol.toLowerCase() === "data:") {
									uri_info.origin = null;
								} else {
									uri_origin = uri.match(origin);
									uri_info.origin = uri_origin && uri_origin[1];
								}
							}
							return uri_info;
						};
					}
					URL.createObjectURL = function (blob) {
						var type = blob.type,
						    data_URI_header;
						if (type === null) {
							type = "application/octet-stream";
						}
						if (blob instanceof FakeBlob) {
							data_URI_header = "data:" + type;
							if (blob.encoding === "base64") {
								return data_URI_header + ";base64," + blob.data;
							} else if (blob.encoding === "URI") {
								return data_URI_header + "," + decodeURIComponent(blob.data);
							}if (btoa) {
								return data_URI_header + ";base64," + btoa(blob.data);
							} else {
								return data_URI_header + "," + encodeURIComponent(blob.data);
							}
						} else if (real_create_object_URL) {
							return real_create_object_URL.call(real_URL, blob);
						}
					};
					URL.revokeObjectURL = function (object_URL) {
						if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
							real_revoke_object_URL.call(real_URL, object_URL);
						}
					};
					FBB_proto.append = function (data /*, endings*/) {
						var bb = this.data;
						// decode data to a binary string
						if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
							var str = "",
							    buf = new Uint8Array(data),
							    i = 0,
							    buf_len = buf.length;
							for (; i < buf_len; i++) {
								str += String.fromCharCode(buf[i]);
							}
							bb.push(str);
						} else if (get_class(data) === "Blob" || get_class(data) === "File") {
							if (FileReaderSync) {
								var fr = new FileReaderSync();
								bb.push(fr.readAsBinaryString(data));
							} else {
								// async FileReader won't work as BlobBuilder is sync
								throw new FileException("NOT_READABLE_ERR");
							}
						} else if (data instanceof FakeBlob) {
							if (data.encoding === "base64" && atob) {
								bb.push(atob(data.data));
							} else if (data.encoding === "URI") {
								bb.push(decodeURIComponent(data.data));
							} else if (data.encoding === "raw") {
								bb.push(data.data);
							}
						} else {
							if (typeof data !== "string") {
								data += ""; // convert unsupported types to strings
							}
							// decode UTF-16 to binary string
							bb.push(unescape(encodeURIComponent(data)));
						}
					};
					FBB_proto.getBlob = function (type) {
						if (!arguments.length) {
							type = null;
						}
						return new FakeBlob(this.data.join(""), type, "raw");
					};
					FBB_proto.toString = function () {
						return "[object BlobBuilder]";
					};
					FB_proto.slice = function (start, end, type) {
						var args = arguments.length;
						if (args < 3) {
							type = null;
						}
						return new FakeBlob(this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding);
					};
					FB_proto.toString = function () {
						return "[object Blob]";
					};
					FB_proto.close = function () {
						this.size = 0;
						delete this.data;
					};
					return FakeBlobBuilder;
				}();

				exports.Blob = function (blobParts, options) {
					var type = options ? options.type || "" : "";
					var builder = new BlobBuilder();
					if (blobParts) {
						for (var i = 0, len = blobParts.length; i < len; i++) {
							if (Uint8Array && blobParts[i] instanceof Uint8Array) {
								builder.append(blobParts[i].buffer);
							} else {
								builder.append(blobParts[i]);
							}
						}
					}
					var blob = builder.getBlob(type);
					if (!blob.slice && blob.webkitSlice) {
						blob.slice = blob.webkitSlice;
					}
					return blob;
				};

				var getPrototypeOf = Object.getPrototypeOf || function (object) {
					return object.__proto__;
				};
				exports.Blob.prototype = getPrototypeOf(new exports.Blob());
			});
		})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || undefined.content || undefined);
		/* WEBPACK VAR INJECTION */
	}).call(exports, __webpack_require__(19));

	/***/
},
/* 19 */
/***/function (module, exports) {

	var g;

	// This works in non-strict mode
	g = function () {
		return this;
	}();

	try {
		// This works if eval is allowed (see CSP)
		g = g || Function("return this")() || (1, eval)("this");
	} catch (e) {
		// This works if the window reference is available
		if ((typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === "object") g = window;
	}

	// g can still be undefined, but nothing to do about it...
	// We return undefined, instead of nothing here, so it's
	// easier to handle this case. if(!global) { ...}

	module.exports = g;

	/***/
},
/* 20 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	function DOMParser(options) {
		this.options = options || { locator: {} };
	}

	DOMParser.prototype.parseFromString = function (source, mimeType) {
		var options = this.options;
		var sax = new XMLReader();
		var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler
		var errorHandler = options.errorHandler;
		var locator = options.locator;
		var defaultNSMap = options.xmlns || {};
		var isHTML = /\/x?html?$/.test(mimeType); //mimeType.toLowerCase().indexOf('html') > -1;
		var entityMap = isHTML ? htmlEntity.entityMap : { 'lt': '<', 'gt': '>', 'amp': '&', 'quot': '"', 'apos': "'" };
		if (locator) {
			domBuilder.setDocumentLocator(locator);
		}

		sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
		sax.domBuilder = options.domBuilder || domBuilder;
		if (isHTML) {
			defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
		}
		defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
		if (source) {
			sax.parse(source, defaultNSMap, entityMap);
		} else {
			sax.errorHandler.error("invalid doc source");
		}
		return domBuilder.doc;
	};
	function buildErrorHandler(errorImpl, domBuilder, locator) {
		if (!errorImpl) {
			if (domBuilder instanceof DOMHandler) {
				return domBuilder;
			}
			errorImpl = domBuilder;
		}
		var errorHandler = {};
		var isCallback = errorImpl instanceof Function;
		locator = locator || {};
		function build(key) {
			var fn = errorImpl[key];
			if (!fn && isCallback) {
				fn = errorImpl.length == 2 ? function (msg) {
					errorImpl(key, msg);
				} : errorImpl;
			}
			errorHandler[key] = fn && function (msg) {
				fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
			} || function () {};
		}
		build('warning');
		build('error');
		build('fatalError');
		return errorHandler;
	}

	//console.log('#\n\n\n\n\n\n\n####')
	/**
  * +ContentHandler+ErrorHandler
  * +LexicalHandler+EntityResolver2
  * -DeclHandler-DTDHandler 
  * 
  * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
  * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
  * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
  */
	function DOMHandler() {
		this.cdata = false;
	}
	function position(locator, node) {
		node.lineNumber = locator.lineNumber;
		node.columnNumber = locator.columnNumber;
	}
	/**
  * @see org.xml.sax.ContentHandler#startDocument
  * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
  */
	DOMHandler.prototype = {
		startDocument: function startDocument() {
			this.doc = new DOMImplementation().createDocument(null, null, null);
			if (this.locator) {
				this.doc.documentURI = this.locator.systemId;
			}
		},
		startElement: function startElement(namespaceURI, localName, qName, attrs) {
			var doc = this.doc;
			var el = doc.createElementNS(namespaceURI, qName || localName);
			var len = attrs.length;
			appendElement(this, el);
			this.currentElement = el;

			this.locator && position(this.locator, el);
			for (var i = 0; i < len; i++) {
				var namespaceURI = attrs.getURI(i);
				var value = attrs.getValue(i);
				var qName = attrs.getQName(i);
				var attr = doc.createAttributeNS(namespaceURI, qName);
				this.locator && position(attrs.getLocator(i), attr);
				attr.value = attr.nodeValue = value;
				el.setAttributeNode(attr);
			}
		},
		endElement: function endElement(namespaceURI, localName, qName) {
			var current = this.currentElement;
			var tagName = current.tagName;
			this.currentElement = current.parentNode;
		},
		startPrefixMapping: function startPrefixMapping(prefix, uri) {},
		endPrefixMapping: function endPrefixMapping(prefix) {},
		processingInstruction: function processingInstruction(target, data) {
			var ins = this.doc.createProcessingInstruction(target, data);
			this.locator && position(this.locator, ins);
			appendElement(this, ins);
		},
		ignorableWhitespace: function ignorableWhitespace(ch, start, length) {},
		characters: function characters(chars, start, length) {
			chars = _toString.apply(this, arguments);
			//console.log(chars)
			if (chars) {
				if (this.cdata) {
					var charNode = this.doc.createCDATASection(chars);
				} else {
					var charNode = this.doc.createTextNode(chars);
				}
				if (this.currentElement) {
					this.currentElement.appendChild(charNode);
				} else if (/^\s*$/.test(chars)) {
					this.doc.appendChild(charNode);
					//process xml
				}
				this.locator && position(this.locator, charNode);
			}
		},
		skippedEntity: function skippedEntity(name) {},
		endDocument: function endDocument() {
			this.doc.normalize();
		},
		setDocumentLocator: function setDocumentLocator(locator) {
			if (this.locator = locator) {
				// && !('lineNumber' in locator)){
				locator.lineNumber = 0;
			}
		},
		//LexicalHandler
		comment: function comment(chars, start, length) {
			chars = _toString.apply(this, arguments);
			var comm = this.doc.createComment(chars);
			this.locator && position(this.locator, comm);
			appendElement(this, comm);
		},

		startCDATA: function startCDATA() {
			//used in characters() methods
			this.cdata = true;
		},
		endCDATA: function endCDATA() {
			this.cdata = false;
		},

		startDTD: function startDTD(name, publicId, systemId) {
			var impl = this.doc.implementation;
			if (impl && impl.createDocumentType) {
				var dt = impl.createDocumentType(name, publicId, systemId);
				this.locator && position(this.locator, dt);
				appendElement(this, dt);
			}
		},
		/**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
		warning: function warning(error) {
			console.warn('[xmldom warning]\t' + error, _locator(this.locator));
		},
		error: function error(_error) {
			console.error('[xmldom error]\t' + _error, _locator(this.locator));
		},
		fatalError: function fatalError(error) {
			console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
			throw error;
		}
	};
	function _locator(l) {
		if (l) {
			return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
		}
	}
	function _toString(chars, start, length) {
		if (typeof chars == 'string') {
			return chars.substr(start, length);
		} else {
			//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
			if (chars.length >= start + length || start) {
				return new java.lang.String(chars, start, length) + '';
			}
			return chars;
		}
	}

	/*
  * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
  * used method of org.xml.sax.ext.LexicalHandler:
  *  #comment(chars, start, length)
  *  #startCDATA()
  *  #endCDATA()
  *  #startDTD(name, publicId, systemId)
  *
  *
  * IGNORED method of org.xml.sax.ext.LexicalHandler:
  *  #endDTD()
  *  #startEntity(name)
  *  #endEntity(name)
  *
  *
  * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
  * IGNORED method of org.xml.sax.ext.DeclHandler
  * 	#attributeDecl(eName, aName, type, mode, value)
  *  #elementDecl(name, model)
  *  #externalEntityDecl(name, publicId, systemId)
  *  #internalEntityDecl(name, value)
  * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
  * IGNORED method of org.xml.sax.EntityResolver2
  *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
  *  #resolveEntity(publicId, systemId)
  *  #getExternalSubset(name, baseURI)
  * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
  * IGNORED method of org.xml.sax.DTDHandler
  *  #notationDecl(name, publicId, systemId) {};
  *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
  */
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (key) {
		DOMHandler.prototype[key] = function () {
			return null;
		};
	});

	/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
	function appendElement(hander, node) {
		if (!hander.currentElement) {
			hander.doc.appendChild(node);
		} else {
			hander.currentElement.appendChild(node);
		}
	} //appendChild and setAttributeNS are preformance key

	//if(typeof require == 'function'){
	var htmlEntity = __webpack_require__(21);
	var XMLReader = __webpack_require__(22).XMLReader;
	var DOMImplementation = exports.DOMImplementation = __webpack_require__(4).DOMImplementation;
	exports.XMLSerializer = __webpack_require__(4).XMLSerializer;
	exports.DOMParser = DOMParser;
	//}

	/***/
},
/* 21 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	exports.entityMap = {
		lt: '<',
		gt: '>',
		amp: '&',
		quot: '"',
		apos: "'",
		Agrave: "À",
		Aacute: "Á",
		Acirc: "Â",
		Atilde: "Ã",
		Auml: "Ä",
		Aring: "Å",
		AElig: "Æ",
		Ccedil: "Ç",
		Egrave: "È",
		Eacute: "É",
		Ecirc: "Ê",
		Euml: "Ë",
		Igrave: "Ì",
		Iacute: "Í",
		Icirc: "Î",
		Iuml: "Ï",
		ETH: "Ð",
		Ntilde: "Ñ",
		Ograve: "Ò",
		Oacute: "Ó",
		Ocirc: "Ô",
		Otilde: "Õ",
		Ouml: "Ö",
		Oslash: "Ø",
		Ugrave: "Ù",
		Uacute: "Ú",
		Ucirc: "Û",
		Uuml: "Ü",
		Yacute: "Ý",
		THORN: "Þ",
		szlig: "ß",
		agrave: "à",
		aacute: "á",
		acirc: "â",
		atilde: "ã",
		auml: "ä",
		aring: "å",
		aelig: "æ",
		ccedil: "ç",
		egrave: "è",
		eacute: "é",
		ecirc: "ê",
		euml: "ë",
		igrave: "ì",
		iacute: "í",
		icirc: "î",
		iuml: "ï",
		eth: "ð",
		ntilde: "ñ",
		ograve: "ò",
		oacute: "ó",
		ocirc: "ô",
		otilde: "õ",
		ouml: "ö",
		oslash: "ø",
		ugrave: "ù",
		uacute: "ú",
		ucirc: "û",
		uuml: "ü",
		yacute: "ý",
		thorn: "þ",
		yuml: "ÿ",
		nbsp: " ",
		iexcl: "¡",
		cent: "¢",
		pound: "£",
		curren: "¤",
		yen: "¥",
		brvbar: "¦",
		sect: "§",
		uml: "¨",
		copy: "©",
		ordf: "ª",
		laquo: "«",
		not: "¬",
		shy: "­­",
		reg: "®",
		macr: "¯",
		deg: "°",
		plusmn: "±",
		sup2: "²",
		sup3: "³",
		acute: "´",
		micro: "µ",
		para: "¶",
		middot: "·",
		cedil: "¸",
		sup1: "¹",
		ordm: "º",
		raquo: "»",
		frac14: "¼",
		frac12: "½",
		frac34: "¾",
		iquest: "¿",
		times: "×",
		divide: "÷",
		forall: "∀",
		part: "∂",
		exist: "∃",
		empty: "∅",
		nabla: "∇",
		isin: "∈",
		notin: "∉",
		ni: "∋",
		prod: "∏",
		sum: "∑",
		minus: "−",
		lowast: "∗",
		radic: "√",
		prop: "∝",
		infin: "∞",
		ang: "∠",
		and: "∧",
		or: "∨",
		cap: "∩",
		cup: "∪",
		'int': "∫",
		there4: "∴",
		sim: "∼",
		cong: "≅",
		asymp: "≈",
		ne: "≠",
		equiv: "≡",
		le: "≤",
		ge: "≥",
		sub: "⊂",
		sup: "⊃",
		nsub: "⊄",
		sube: "⊆",
		supe: "⊇",
		oplus: "⊕",
		otimes: "⊗",
		perp: "⊥",
		sdot: "⋅",
		Alpha: "Α",
		Beta: "Β",
		Gamma: "Γ",
		Delta: "Δ",
		Epsilon: "Ε",
		Zeta: "Ζ",
		Eta: "Η",
		Theta: "Θ",
		Iota: "Ι",
		Kappa: "Κ",
		Lambda: "Λ",
		Mu: "Μ",
		Nu: "Ν",
		Xi: "Ξ",
		Omicron: "Ο",
		Pi: "Π",
		Rho: "Ρ",
		Sigma: "Σ",
		Tau: "Τ",
		Upsilon: "Υ",
		Phi: "Φ",
		Chi: "Χ",
		Psi: "Ψ",
		Omega: "Ω",
		alpha: "α",
		beta: "β",
		gamma: "γ",
		delta: "δ",
		epsilon: "ε",
		zeta: "ζ",
		eta: "η",
		theta: "θ",
		iota: "ι",
		kappa: "κ",
		lambda: "λ",
		mu: "μ",
		nu: "ν",
		xi: "ξ",
		omicron: "ο",
		pi: "π",
		rho: "ρ",
		sigmaf: "ς",
		sigma: "σ",
		tau: "τ",
		upsilon: "υ",
		phi: "φ",
		chi: "χ",
		psi: "ψ",
		omega: "ω",
		thetasym: "ϑ",
		upsih: "ϒ",
		piv: "ϖ",
		OElig: "Œ",
		oelig: "œ",
		Scaron: "Š",
		scaron: "š",
		Yuml: "Ÿ",
		fnof: "ƒ",
		circ: "ˆ",
		tilde: "˜",
		ensp: " ",
		emsp: " ",
		thinsp: " ",
		zwnj: "‌",
		zwj: "‍",
		lrm: "‎",
		rlm: "‏",
		ndash: "–",
		mdash: "—",
		lsquo: "‘",
		rsquo: "’",
		sbquo: "‚",
		ldquo: "“",
		rdquo: "”",
		bdquo: "„",
		dagger: "†",
		Dagger: "‡",
		bull: "•",
		hellip: "…",
		permil: "‰",
		prime: "′",
		Prime: "″",
		lsaquo: "‹",
		rsaquo: "›",
		oline: "‾",
		euro: "€",
		trade: "™",
		larr: "←",
		uarr: "↑",
		rarr: "→",
		darr: "↓",
		harr: "↔",
		crarr: "↵",
		lceil: "⌈",
		rceil: "⌉",
		lfloor: "⌊",
		rfloor: "⌋",
		loz: "◊",
		spades: "♠",
		clubs: "♣",
		hearts: "♥",
		diams: "♦"
	};
	//for(var  n in exports.entityMap){console.log(exports.entityMap[n].charCodeAt())}

	/***/
},
/* 22 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
	//[5]   	Name	   ::=   	NameStartChar (NameChar)*

	var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; //\u10000-\uEFFFF
	var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]');
	var tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$');
	//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
	//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

	//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
	//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
	var S_TAG = 0; //tag name offerring
	var S_ATTR = 1; //attr name offerring 
	var S_ATTR_SPACE = 2; //attr name end and space offer
	var S_EQ = 3; //=space?
	var S_ATTR_NOQUOT_VALUE = 4; //attr value(no quot value only)
	var S_ATTR_END = 5; //attr value end and no space(quot end)
	var S_TAG_SPACE = 6; //(attr value end || tag end ) && (space offer)
	var S_TAG_CLOSE = 7; //closed el<el />

	function XMLReader() {}

	XMLReader.prototype = {
		parse: function parse(source, defaultNSMap, entityMap) {
			var domBuilder = this.domBuilder;
			domBuilder.startDocument();
			_copy(defaultNSMap, defaultNSMap = {});
			_parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
			domBuilder.endDocument();
		}
	};
	function _parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
		function fixedFromCharCode(code) {
			// String.prototype.fromCharCode does not supports
			// > 2 bytes unicode chars directly
			if (code > 0xffff) {
				code -= 0x10000;
				var surrogate1 = 0xd800 + (code >> 10),
				    surrogate2 = 0xdc00 + (code & 0x3ff);

				return String.fromCharCode(surrogate1, surrogate2);
			} else {
				return String.fromCharCode(code);
			}
		}
		function entityReplacer(a) {
			var k = a.slice(1, -1);
			if (k in entityMap) {
				return entityMap[k];
			} else if (k.charAt(0) === '#') {
				return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
			} else {
				errorHandler.error('entity not found:' + a);
				return a;
			}
		}
		function appendText(end) {
			//has some bugs
			if (end > start) {
				var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
				locator && position(start);
				domBuilder.characters(xt, 0, end - start);
				start = end;
			}
		}
		function position(p, m) {
			while (p >= lineEnd && (m = linePattern.exec(source))) {
				lineStart = m.index;
				lineEnd = lineStart + m[0].length;
				locator.lineNumber++;
				//console.log('line++:',locator,startPos,endPos)
			}
			locator.columnNumber = p - lineStart + 1;
		}
		var lineStart = 0;
		var lineEnd = 0;
		var linePattern = /.*(?:\r\n?|\n)|.*$/g;
		var locator = domBuilder.locator;

		var parseStack = [{ currentNSMap: defaultNSMapCopy }];
		var closeMap = {};
		var start = 0;
		while (true) {
			try {
				var tagStart = source.indexOf('<', start);
				if (tagStart < 0) {
					if (!source.substr(start).match(/^\s*$/)) {
						var doc = domBuilder.doc;
						var text = doc.createTextNode(source.substr(start));
						doc.appendChild(text);
						domBuilder.currentElement = text;
					}
					return;
				}
				if (tagStart > start) {
					appendText(tagStart);
				}
				switch (source.charAt(tagStart + 1)) {
					case '/':
						var end = source.indexOf('>', tagStart + 3);
						var tagName = source.substring(tagStart + 2, end);
						var config = parseStack.pop();
						if (end < 0) {

							tagName = source.substring(tagStart + 2).replace(/[\s<].*/, '');
							//console.error('#@@@@@@'+tagName)
							errorHandler.error("end tag name: " + tagName + ' is not complete:' + config.tagName);
							end = tagStart + 1 + tagName.length;
						} else if (tagName.match(/\s</)) {
							tagName = tagName.replace(/[\s<].*/, '');
							errorHandler.error("end tag name: " + tagName + ' maybe not complete');
							end = tagStart + 1 + tagName.length;
						}
						//console.error(parseStack.length,parseStack)
						//console.error(config);
						var localNSMap = config.localNSMap;
						var endMatch = config.tagName == tagName;
						var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
						if (endIgnoreCaseMach) {
							domBuilder.endElement(config.uri, config.localName, tagName);
							if (localNSMap) {
								for (var prefix in localNSMap) {
									domBuilder.endPrefixMapping(prefix);
								}
							}
							if (!endMatch) {
								errorHandler.fatalError("end tag name: " + tagName + ' is not match the current start tagName:' + config.tagName);
							}
						} else {
							parseStack.push(config);
						}

						end++;
						break;
					// end elment
					case '?':
						// <?...?>
						locator && position(tagStart);
						end = parseInstruction(source, tagStart, domBuilder);
						break;
					case '!':
						// <!doctype,<![CDATA,<!--
						locator && position(tagStart);
						end = parseDCC(source, tagStart, domBuilder, errorHandler);
						break;
					default:
						locator && position(tagStart);
						var el = new ElementAttributes();
						var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
						//elStartEnd
						var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
						var len = el.length;

						if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
							el.closed = true;
							if (!entityMap.nbsp) {
								errorHandler.warning('unclosed xml attribute');
							}
						}
						if (locator && len) {
							var locator2 = copyLocator(locator, {});
							//try{//attribute position fixed
							for (var i = 0; i < len; i++) {
								var a = el[i];
								position(a.offset);
								a.locator = copyLocator(locator, {});
							}
							//}catch(e){console.error('@@@@@'+e)}
							domBuilder.locator = locator2;
							if (appendElement(el, domBuilder, currentNSMap)) {
								parseStack.push(el);
							}
							domBuilder.locator = locator;
						} else {
							if (appendElement(el, domBuilder, currentNSMap)) {
								parseStack.push(el);
							}
						}

						if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
							end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
						} else {
							end++;
						}
				}
			} catch (e) {
				errorHandler.error('element parse error: ' + e);
				//errorHandler.error('element parse error: '+e);
				end = -1;
				//throw e;
			}
			if (end > start) {
				start = end;
			} else {
				//TODO: 这里有可能sax回退，有位置错误风险
				appendText(Math.max(tagStart, start) + 1);
			}
		}
	}
	function copyLocator(f, t) {
		t.lineNumber = f.lineNumber;
		t.columnNumber = f.columnNumber;
		return t;
	}

	/**
  * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
  * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
  */
	function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
		var attrName;
		var value;
		var p = ++start;
		var s = S_TAG; //status
		while (true) {
			var c = source.charAt(p);
			switch (c) {
				case '=':
					if (s === S_ATTR) {
						//attrName
						attrName = source.slice(start, p);
						s = S_EQ;
					} else if (s === S_ATTR_SPACE) {
						s = S_EQ;
					} else {
						//fatalError: equal must after attrName or space after attrName
						throw new Error('attribute equal must after attrName');
					}
					break;
				case '\'':
				case '"':
					if (s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
					) {
							//equal
							if (s === S_ATTR) {
								errorHandler.warning('attribute value must after "="');
								attrName = source.slice(start, p);
							}
							start = p + 1;
							p = source.indexOf(c, start);
							if (p > 0) {
								value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
								el.add(attrName, value, start - 1);
								s = S_ATTR_END;
							} else {
								//fatalError: no end quot match
								throw new Error('attribute value no end \'' + c + '\' match');
							}
						} else if (s == S_ATTR_NOQUOT_VALUE) {
						value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
						//console.log(attrName,value,start,p)
						el.add(attrName, value, start);
						//console.dir(el)
						errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
						start = p + 1;
						s = S_ATTR_END;
					} else {
						//fatalError: no equal before
						throw new Error('attribute value must after "="');
					}
					break;
				case '/':
					switch (s) {
						case S_TAG:
							el.setTagName(source.slice(start, p));
						case S_ATTR_END:
						case S_TAG_SPACE:
						case S_TAG_CLOSE:
							s = S_TAG_CLOSE;
							el.closed = true;
						case S_ATTR_NOQUOT_VALUE:
						case S_ATTR:
						case S_ATTR_SPACE:
							break;
						//case S_EQ:
						default:
							throw new Error("attribute invalid close char('/')");
					}
					break;
				case '':
					//end document
					//throw new Error('unexpected end of input')
					errorHandler.error('unexpected end of input');
					if (s == S_TAG) {
						el.setTagName(source.slice(start, p));
					}
					return p;
				case '>':
					switch (s) {
						case S_TAG:
							el.setTagName(source.slice(start, p));
						case S_ATTR_END:
						case S_TAG_SPACE:
						case S_TAG_CLOSE:
							break; //normal
						case S_ATTR_NOQUOT_VALUE: //Compatible state
						case S_ATTR:
							value = source.slice(start, p);
							if (value.slice(-1) === '/') {
								el.closed = true;
								value = value.slice(0, -1);
							}
						case S_ATTR_SPACE:
							if (s === S_ATTR_SPACE) {
								value = attrName;
							}
							if (s == S_ATTR_NOQUOT_VALUE) {
								errorHandler.warning('attribute "' + value + '" missed quot(")!!');
								el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
							} else {
								if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)) {
									errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
								}
								el.add(value, value, start);
							}
							break;
						case S_EQ:
							throw new Error('attribute value missed!!');
					}
					//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
					return p;
				/*xml space '\x20' | #x9 | #xD | #xA; */
				case "\x80":
					c = ' ';
				default:
					if (c <= ' ') {
						//space
						switch (s) {
							case S_TAG:
								el.setTagName(source.slice(start, p)); //tagName
								s = S_TAG_SPACE;
								break;
							case S_ATTR:
								attrName = source.slice(start, p);
								s = S_ATTR_SPACE;
								break;
							case S_ATTR_NOQUOT_VALUE:
								var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
								errorHandler.warning('attribute "' + value + '" missed quot(")!!');
								el.add(attrName, value, start);
							case S_ATTR_END:
								s = S_TAG_SPACE;
								break;
							//case S_TAG_SPACE:
							//case S_EQ:
							//case S_ATTR_SPACE:
							//	void();break;
							//case S_TAG_CLOSE:
							//ignore warning
						}
					} else {
						//not space
						//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
						//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
						switch (s) {
							//case S_TAG:void();break;
							//case S_ATTR:void();break;
							//case S_ATTR_NOQUOT_VALUE:void();break;
							case S_ATTR_SPACE:
								var tagName = el.tagName;
								if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
									errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
								}
								el.add(attrName, attrName, start);
								start = p;
								s = S_ATTR;
								break;
							case S_ATTR_END:
								errorHandler.warning('attribute space is required"' + attrName + '"!!');
							case S_TAG_SPACE:
								s = S_ATTR;
								start = p;
								break;
							case S_EQ:
								s = S_ATTR_NOQUOT_VALUE;
								start = p;
								break;
							case S_TAG_CLOSE:
								throw new Error("elements closed character '/' and '>' must be connected to");
						}
					}
			} //end outer switch
			//console.log('p++',p)
			p++;
		}
	}
	/**
  * @return true if has new namespace define
  */
	function appendElement(el, domBuilder, currentNSMap) {
		var tagName = el.tagName;
		var localNSMap = null;
		//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
		var i = el.length;
		while (i--) {
			var a = el[i];
			var qName = a.qName;
			var value = a.value;
			var nsp = qName.indexOf(':');
			if (nsp > 0) {
				var prefix = a.prefix = qName.slice(0, nsp);
				var localName = qName.slice(nsp + 1);
				var nsPrefix = prefix === 'xmlns' && localName;
			} else {
				localName = qName;
				prefix = null;
				nsPrefix = qName === 'xmlns' && '';
			}
			//can not set prefix,because prefix !== ''
			a.localName = localName;
			//prefix == null for no ns prefix attribute 
			if (nsPrefix !== false) {
				//hack!!
				if (localNSMap == null) {
					localNSMap = {};
					//console.log(currentNSMap,0)
					_copy(currentNSMap, currentNSMap = {});
					//console.log(currentNSMap,1)
				}
				currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
				a.uri = 'http://www.w3.org/2000/xmlns/';
				domBuilder.startPrefixMapping(nsPrefix, value);
			}
		}
		var i = el.length;
		while (i--) {
			a = el[i];
			var prefix = a.prefix;
			if (prefix) {
				//no prefix attribute has no namespace
				if (prefix === 'xml') {
					a.uri = 'http://www.w3.org/XML/1998/namespace';
				}if (prefix !== 'xmlns') {
					a.uri = currentNSMap[prefix || ''];

					//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
				}
			}
		}
		var nsp = tagName.indexOf(':');
		if (nsp > 0) {
			prefix = el.prefix = tagName.slice(0, nsp);
			localName = el.localName = tagName.slice(nsp + 1);
		} else {
			prefix = null; //important!!
			localName = el.localName = tagName;
		}
		//no prefix element has default namespace
		var ns = el.uri = currentNSMap[prefix || ''];
		domBuilder.startElement(ns, localName, tagName, el);
		//endPrefixMapping and startPrefixMapping have not any help for dom builder
		//localNSMap = null
		if (el.closed) {
			domBuilder.endElement(ns, localName, tagName);
			if (localNSMap) {
				for (prefix in localNSMap) {
					domBuilder.endPrefixMapping(prefix);
				}
			}
		} else {
			el.currentNSMap = currentNSMap;
			el.localNSMap = localNSMap;
			//parseStack.push(el);
			return true;
		}
	}
	function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
		if (/^(?:script|textarea)$/i.test(tagName)) {
			var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
			var text = source.substring(elStartEnd + 1, elEndStart);
			if (/[&<]/.test(text)) {
				if (/^script$/i.test(tagName)) {
					//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text, 0, text.length);
					//lexHandler.endCDATA();
					return elEndStart;
					//}
				} //}else{//text area
				text = text.replace(/&#?\w+;/g, entityReplacer);
				domBuilder.characters(text, 0, text.length);
				return elEndStart;
				//}
			}
		}
		return elStartEnd + 1;
	}
	function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
		//if(tagName in closeMap){
		var pos = closeMap[tagName];
		if (pos == null) {
			//console.log(tagName)
			pos = source.lastIndexOf('</' + tagName + '>');
			if (pos < elStartEnd) {
				//忘记闭合
				pos = source.lastIndexOf('</' + tagName);
			}
			closeMap[tagName] = pos;
		}
		return pos < elStartEnd;
		//} 
	}
	function _copy(source, target) {
		for (var n in source) {
			target[n] = source[n];
		}
	}
	function parseDCC(source, start, domBuilder, errorHandler) {
		//sure start with '<!'
		var next = source.charAt(start + 2);
		switch (next) {
			case '-':
				if (source.charAt(start + 3) === '-') {
					var end = source.indexOf('-->', start + 4);
					//append comment source.substring(4,end)//<!--
					if (end > start) {
						domBuilder.comment(source, start + 4, end - start - 4);
						return end + 3;
					} else {
						errorHandler.error("Unclosed comment");
						return -1;
					}
				} else {
					//error
					return -1;
				}
			default:
				if (source.substr(start + 3, 6) == 'CDATA[') {
					var end = source.indexOf(']]>', start + 9);
					domBuilder.startCDATA();
					domBuilder.characters(source, start + 9, end - start - 9);
					domBuilder.endCDATA();
					return end + 3;
				}
				//<!DOCTYPE
				//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
				var matchs = split(source, start);
				var len = matchs.length;
				if (len > 1 && /!doctype/i.test(matchs[0][0])) {
					var name = matchs[1][0];
					var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
					var sysid = len > 4 && matchs[4][0];
					var lastMatch = matchs[len - 1];
					domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'), sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'));
					domBuilder.endDTD();

					return lastMatch.index + lastMatch[0].length;
				}
		}
		return -1;
	}

	function parseInstruction(source, start, domBuilder) {
		var end = source.indexOf('?>', start);
		if (end) {
			var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
			if (match) {
				var len = match[0].length;
				domBuilder.processingInstruction(match[1], match[2]);
				return end + 2;
			} else {
				//error
				return -1;
			}
		}
		return -1;
	}

	/**
  * @param source
  */
	function ElementAttributes(source) {}
	ElementAttributes.prototype = {
		setTagName: function setTagName(tagName) {
			if (!tagNamePattern.test(tagName)) {
				throw new Error('invalid tagName:' + tagName);
			}
			this.tagName = tagName;
		},
		add: function add(qName, value, offset) {
			if (!tagNamePattern.test(qName)) {
				throw new Error('invalid attribute:' + qName);
			}
			this[this.length++] = { qName: qName, value: value, offset: offset };
		},
		length: 0,
		getLocalName: function getLocalName(i) {
			return this[i].localName;
		},
		getLocator: function getLocator(i) {
			return this[i].locator;
		},
		getQName: function getQName(i) {
			return this[i].qName;
		},
		getURI: function getURI(i) {
			return this[i].uri;
		},
		getValue: function getValue(i) {
			return this[i].value;
		}
		//	,getIndex:function(uri, localName)){
		//		if(localName){
		//			
		//		}else{
		//			var qName = uri
		//		}
		//	},
		//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
		//	getType:function(uri,localName){}
		//	getType:function(i){},
	};

	function split(source, start) {
		var match;
		var buf = [];
		var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
		reg.lastIndex = start;
		reg.exec(source); //skip <
		while (match = reg.exec(source)) {
			buf.push(match);
			if (match[1]) return buf;
		}
	}

	exports.XMLReader = XMLReader;

	/***/
},
/* 23 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var HTMLElement = __webpack_require__(1);
	var Image = __webpack_require__(9);
	var Audio = __webpack_require__(10);
	var HTMLCanvasElement = __webpack_require__(5);
	var HTMLVideoElement = __webpack_require__(12);
	var HTMLScriptElement = __webpack_require__(13);
	var Node = __webpack_require__(8);
	var FontFaceSet = __webpack_require__(14);

	var Document = function (_Node) {
		_inherits(Document, _Node);

		function Document() {
			_classCallCheck(this, Document);

			var _this = _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this));

			_this.readyState = 'complete';
			_this.visibilityState = 'visible';
			_this.documentElement = window;
			_this.hidden = false;
			_this.style = {};
			_this.location = __webpack_require__(6);

			_this.head = new HTMLElement('head');
			_this.body = new HTMLElement('body');

			_this.fonts = new FontFaceSet();

			_this.scripts = [];
			return _this;
		}

		_createClass(Document, [{
			key: 'createElementNS',
			value: function createElementNS(namespaceURI, qualifiedName, options) {
				return this.createElement(qualifiedName);
			}
		}, {
			key: 'createElement',
			value: function createElement(tagName) {
				if (tagName === 'canvas') {
					return new HTMLCanvasElement();
				} else if (tagName === 'audio') {
					return new Audio();
				} else if (tagName === 'img') {
					return new Image();
				} else if (tagName === 'video') {
					return new HTMLVideoElement();
				} else if (tagName === 'script') {
					return new HTMLScriptElement();
				}

				return new HTMLElement(tagName);
			}
		}, {
			key: 'getElementById',
			value: function getElementById(id) {
				if (id === mainCanvas.id || id === 'canvas') {
					return mainCanvas;
				}
				return new HTMLElement(id);
			}
		}, {
			key: 'getElementsByTagName',
			value: function getElementsByTagName(tagName) {
				if (tagName === 'head') {
					return [document.head];
				} else if (tagName === 'body') {
					return [document.body];
				} else if (tagName === 'canvas') {
					return [mainCanvas];
				}
				return [new HTMLElement(tagName)];
			}
		}, {
			key: 'getElementsByName',
			value: function getElementsByName(tagName) {
				if (tagName === 'head') {
					return [document.head];
				} else if (tagName === 'body') {
					return [document.body];
				} else if (tagName === 'canvas') {
					return [mainCanvas];
				}
				return [new HTMLElement(tagName)];
			}
		}, {
			key: 'querySelector',
			value: function querySelector(query) {
				if (query === 'head') {
					return document.head;
				} else if (query === 'body') {
					return document.body;
				} else if (query === 'canvas') {
					return mainCanvas;
				} else if (query === '#' + mainCanvas.id) {
					return mainCanvas;
				}
				return new HTMLElement(query);
			}
		}, {
			key: 'querySelectorAll',
			value: function querySelectorAll(query) {
				if (query === 'head') {
					return [document.head];
				} else if (query === 'body') {
					return [document.body];
				} else if (query === 'canvas') {
					return [mainCanvas];
				}
				return [new HTMLElement(query)];
			}
		}, {
			key: 'createTextNode',
			value: function createTextNode() {
				return new HTMLElement('text');
			}
		}, {
			key: 'elementFromPoint',
			value: function elementFromPoint() {
				return window.canvas;
			}
		}, {
			key: 'createEvent',
			value: function createEvent(type) {
				if (window[type]) {
					return new window[type]();
				}
				return null;
			}
		}]);

		return Document;
	}(Node);

	var document = new Document();

	module.exports = document;

	/***/
},
/* 24 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DOMRect = function DOMRect(x, y, width, height) {
		_classCallCheck(this, DOMRect);

		this.x = x ? x : 0;
		this.y = y ? y : 0;
		this.width = width ? width : 0;
		this.height = height ? height : 0;
		this.left = this.x;
		this.top = this.y;
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;
	};

	module.exports = DOMRect;

	/***/
},
/* 25 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var MEDIA_ERR_ABORTED = 1;
	var MEDIA_ERR_NETWORK = 2;
	var MEDIA_ERR_DECODE = 3;
	var MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

	var MediaError = function () {
		function MediaError() {
			_classCallCheck(this, MediaError);
		}

		_createClass(MediaError, [{
			key: "code",
			get: function get() {
				return MEDIA_ERR_ABORTED;
			}
		}, {
			key: "message",
			get: function get() {
				return "";
			}
		}]);

		return MediaError;
	}();

	module.exports = MediaError;

	/***/
},
/* 26 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var image = qg.createImage();

	module.exports = image.constructor;

	/***/
},
/* 27 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(28),
	    noop = _require.noop;

	var navigator = {
		platform: qg.getOS(),
		language: qg.getCurrentLanguage(),
		appVersion: '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		userAgent: qg.getUserAgent(),
		onLine: true,

		geolocation: {
			getCurrentPosition: noop,
			watchPosition: noop,
			clearWatch: noop
		},

		maxTouchPoints: 10
	};

	qg.subscribeNetworkStatus({
		callback: function callback(data) {
			navigator.onLine = data.type !== 'none';
		}
	});

	module.exports = navigator;

	/***/
},
/* 28 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	function noop() {}

	module.exports = noop;

	/***/
},
/* 29 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var EventTarget = __webpack_require__(2);

	var FileReader = function (_EventTarget) {
		_inherits(FileReader, _EventTarget);

		function FileReader() {
			_classCallCheck(this, FileReader);

			return _possibleConstructorReturn(this, (FileReader.__proto__ || Object.getPrototypeOf(FileReader)).apply(this, arguments));
		}

		_createClass(FileReader, [{
			key: 'construct',
			value: function construct() {
				this.result = null;
			}

			// Aborts the read operation. Upon return, the readyState will be DONE.

		}, {
			key: 'abort',
			value: function abort() {}

			// Starts reading the contents of the specified Blob, once finished, the result attribute contains an ArrayBuffer representing the file's data.

		}, {
			key: 'readAsArrayBuffer',
			value: function readAsArrayBuffer() {}

			// Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.

		}, {
			key: 'readAsDataURL',
			value: function readAsDataURL(blob) {
				this.result = 'data:image/png;base64,' + window.btoa(blob);
				var event = new Event('load');
				this.dispatchEvent(event);
			}

			// Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as a text string.

		}, {
			key: 'readAsText',
			value: function readAsText() {}
		}]);

		return FileReader;
	}(EventTarget);

	module.exports = FileReader;

	/***/
},
/* 30 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var FontFace = function () {
		function FontFace(family, source, descriptors) {
			var _this = this;

			_classCallCheck(this, FontFace);

			this.family = family;
			this.source = source;
			this.descriptors = descriptors;

			this._status = 'unloaded';

			this._loaded = new Promise(function (resolve, reject) {
				_this._resolveCB = resolve;
				_this._rejectCB = reject;
			});
		}

		_createClass(FontFace, [{
			key: 'load',
			value: function load() {}
		}, {
			key: 'status',
			get: function get() {
				return this._status;
			}
		}, {
			key: 'loaded',
			get: function get() {
				return this._loaded;
			}
		}]);

		return FontFace;
	}();

	module.exports = FontFace;

	/***/
},
/* 31 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Event = __webpack_require__(0);

	var TouchEvent = function (_Event) {
		_inherits(TouchEvent, _Event);

		function TouchEvent(type, touchEventInit) {
			_classCallCheck(this, TouchEvent);

			var _this = _possibleConstructorReturn(this, (TouchEvent.__proto__ || Object.getPrototypeOf(TouchEvent)).call(this, type));

			_this.touches = [];
			_this.targetTouches = [];
			_this.changedTouches = [];
			return _this;
		}

		return TouchEvent;
	}(Event);

	module.exports = TouchEvent;

	/***/
},
/* 32 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Event = __webpack_require__(0);

	var MouseEvent = function (_Event) {
		_inherits(MouseEvent, _Event);

		function MouseEvent(type, initArgs) {
			_classCallCheck(this, MouseEvent);

			var _this = _possibleConstructorReturn(this, (MouseEvent.__proto__ || Object.getPrototypeOf(MouseEvent)).call(this, type));

			_this._button = initArgs.button;
			_this._which = initArgs.which;
			_this._wheelDelta = initArgs.wheelDelta;
			_this._clientX = initArgs.clientX;
			_this._clientY = initArgs.clientY;
			_this._screenX = initArgs.screenX;
			_this._screenY = initArgs.screenY;
			_this._pageX = initArgs.pageX;
			_this._pageY = initArgs.pageY;
			return _this;
		}

		_createClass(MouseEvent, [{
			key: 'button',
			get: function get() {
				return this._button;
			}
		}, {
			key: 'which',
			get: function get() {
				return this._which;
			}
		}, {
			key: 'wheelDelta',
			get: function get() {
				return this._wheelDelta;
			}
		}, {
			key: 'clientX',
			get: function get() {
				return this._clientX;
			}
		}, {
			key: 'clientY',
			get: function get() {
				return this._clientY;
			}
		}, {
			key: 'screenX',
			get: function get() {
				return this._screenX;
			}
		}, {
			key: 'screenY',
			get: function get() {
				return this._screenY;
			}
		}, {
			key: 'pageX',
			get: function get() {
				return this._pageX;
			}
		}, {
			key: 'pageY',
			get: function get() {
				return this._pageY;
			}
		}]);

		return MouseEvent;
	}(Event);

	module.exports = MouseEvent;

	/***/
},
/* 33 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Event = __webpack_require__(0);

	var __numberShiftMap = {
		'48': ')', // 0
		'49': '!', // 1
		'50': '@', // 2
		'51': '#', // 3
		'52': '$', // 4
		'53': '%', // 5
		'54': '^', // 6
		'55': '&', // 7
		'56': '*', // 8
		'57': '(' // 9
	};

	var __capsLockActive = false;

	var KeyboardEvent = function (_Event) {
		_inherits(KeyboardEvent, _Event);

		function KeyboardEvent(type, KeyboardEventInit) {
			_classCallCheck(this, KeyboardEvent);

			var _this = _possibleConstructorReturn(this, (KeyboardEvent.__proto__ || Object.getPrototypeOf(KeyboardEvent)).call(this, type));

			if ((typeof KeyboardEventInit === 'undefined' ? 'undefined' : _typeof(KeyboardEventInit)) === 'object') {
				_this._altKeyActive = KeyboardEventInit.altKey ? KeyboardEventInit.altKey : false;
				_this._ctrlKeyActive = KeyboardEventInit.ctrlKey ? KeyboardEventInit.ctrlKey : false;
				_this._metaKeyActive = KeyboardEventInit.metaKey ? KeyboardEventInit.metaKey : false;
				_this._shiftKeyActive = KeyboardEventInit.shiftKey ? KeyboardEventInit.shiftKey : false;
				_this._keyCode = KeyboardEventInit.keyCode ? KeyboardEventInit.keyCode : -1;
				_this._repeat = KeyboardEventInit.repeat ? KeyboardEventInit.repeat : false;
			} else {
				_this._altKeyActive = false;
				_this._ctrlKeyActive = false;
				_this._metaKeyActive = false;
				_this._shiftKeyActive = false;
				_this._keyCode = -1;
				_this._repeat = false;
			}

			var keyCode = _this._keyCode;
			if (keyCode >= 48 && keyCode <= 57) {
				// 0 ~ 9
				var number = keyCode - 48;
				_this._code = 'Digit' + number;
				_this._key = _this._shiftKeyActive ? __numberShiftMap[keyCode] : '' + number;
			} else if (keyCode >= 10048 && keyCode <= 10057) {
				// Numberpad 0 ~ 9
				// reset to web keyCode since it's a hack in C++ for distinguish numbers in Numberpad.
				keyCode = _this._keyCode = keyCode - 10000;
				var number = keyCode - 48;
				_this._code = 'Numpad' + number;
				_this._key = '' + number;
			} else if (keyCode >= 65 && keyCode <= 90) {
				// A ~ Z
				var charCode = String.fromCharCode(keyCode);
				_this._code = 'Key' + charCode;
				_this._key = _this._shiftKeyActive || __capsLockActive ? charCode : charCode.toLowerCase();
			} else if (keyCode >= 112 && keyCode <= 123) {
				// F1 ~ F12
				_this._code = _this._key = 'F' + (keyCode - 111);
			} else if (keyCode === 27) {
				_this._code = _this._key = 'Escape';
			} else if (keyCode === 189) {
				_this._code = 'Minus';
				_this._key = _this._shiftKeyActive ? '_' : '-';
			} else if (keyCode === 187) {
				_this._code = 'Equal';
				_this._key = _this._shiftKeyActive ? '+' : '=';
			} else if (keyCode === 220) {
				_this._code = 'Backslash';
				_this._key = _this._shiftKeyActive ? '|' : '\\';
			} else if (keyCode === 192) {
				_this._code = 'Backquote';
				_this._key = _this._shiftKeyActive ? '~' : '`';
			} else if (keyCode === 8) {
				_this._code = _this._key = 'Backspace';
			} else if (keyCode === 13) {
				_this._code = _this._key = 'Enter';
			} else if (keyCode === 219) {
				_this._code = 'BracketLeft';
				_this._key = _this._shiftKeyActive ? '{' : '[';
			} else if (keyCode === 221) {
				_this._code = 'BracketRight';
				_this._key = _this._shiftKeyActive ? '}' : ']';
			} else if (keyCode === 186) {
				_this._code = 'Semicolon';
				_this._key = _this._shiftKeyActive ? ':' : ';';
			} else if (keyCode === 222) {
				_this._code = 'Quote';
				_this._key = _this._shiftKeyActive ? '"' : "'";
			} else if (keyCode === 9) {
				_this._code = _this._key = 'Tab';
			} else if (keyCode === 17) {
				_this._code = 'ControlLeft';
				_this._key = 'Control';
			} else if (keyCode === 20017) {
				_this._keyCode = 17; // Reset to the real value.
				_this._code = 'ControlRight';
				_this._key = 'Control';
			} else if (keyCode === 16) {
				_this._code = 'ShiftLeft';
				_this._key = 'Shift';
			} else if (keyCode === 20016) {
				_this._keyCode = 16; // Reset to the real value.
				_this._code = 'ShiftRight';
				_this._key = 'Shift';
			} else if (keyCode === 18) {
				_this._code = 'AltLeft';
				_this._key = 'Alt';
			} else if (keyCode === 20018) {
				_this._keyCode = 18; // Reset to the real value.
				_this._code = 'AltRight';
				_this._key = 'Alt';
			} else if (keyCode === 91) {
				_this._code = 'MetaLeft';
				_this._key = 'Meta';
			} else if (keyCode === 93) {
				_this._code = 'MetaRight';
				_this._key = 'Meta';
			} else if (keyCode === 37) {
				_this._code = _this._key = 'ArrowLeft';
			} else if (keyCode === 38) {
				_this._code = _this._key = 'ArrowUp';
			} else if (keyCode === 39) {
				_this._code = _this._key = 'ArrowRight';
			} else if (keyCode === 40) {
				_this._code = _this._key = 'ArrowDown';
			} else if (keyCode === 20093) {
				_this._keyCode = 93; // Bug of brower since its keycode is the same as MetaRight.
				_this._code = _this._key = 'ContextMenu';
			} else if (keyCode === 20013) {
				_this._keyCode = 13;
				_this._code = 'NumpadEnter';
				_this._key = 'Enter';
			} else if (keyCode === 107) {
				_this._code = 'NumpadAdd';
				_this._key = '+';
			} else if (keyCode === 109) {
				_this._code = 'NumpadSubtract';
				_this._key = '-';
			} else if (keyCode === 106) {
				_this._code = 'NumpadMultiply';
				_this._key = '*';
			} else if (keyCode === 111) {
				_this._code = 'NumpadDivide';
				_this._key = '/';
			} else if (keyCode === 12) {
				_this._code = 'NumLock';
				_this._key = 'Clear';
			} else if (keyCode === 124) {
				_this._code = _this._key = 'F13';
			} else if (keyCode === 36) {
				_this._code = _this._key = 'Home';
			} else if (keyCode === 33) {
				_this._code = _this._key = 'PageUp';
			} else if (keyCode === 34) {
				_this._code = _this._key = 'PageDown';
			} else if (keyCode === 35) {
				_this._code = _this._key = 'End';
			} else if (keyCode === 188) {
				_this._code = 'Comma';
				_this._key = _this._shiftKeyActive ? '<' : ',';
			} else if (keyCode === 190) {
				_this._code = 'Period';
				_this._key = _this._shiftKeyActive ? '>' : '.';
			} else if (keyCode === 191) {
				_this._code = 'Slash';
				_this._key = _this._shiftKeyActive ? '?' : '/';
			} else if (keyCode === 32) {
				_this._code = 'Space';
				_this._key = ' ';
			} else if (keyCode === 46) {
				_this._code = _this._key = 'Delete';
			} else if (keyCode === 110) {
				_this._code = 'NumpadDecimal';
				_this._key = '.';
			} else if (keyCode === 20) {
				_this._code = _this._key = 'CapsLock';
				if (type === 'keyup') {
					__capsLockActive = !__capsLockActive;
				}
			} else {
				console.log("Unknown keyCode: " + _this._keyCode);
			}
			return _this;
		}

		// Returns a Boolean indicating if the modifier key, like Alt, Shift, Ctrl, or Meta, was pressed when the event was created.


		_createClass(KeyboardEvent, [{
			key: 'getModifierState',
			value: function getModifierState() {
				return false;
			}

			// Returns a Boolean that is true if the Alt ( Option or ⌥ on OS X) key was active when the key event was generated.

		}, {
			key: 'altKey',
			get: function get() {
				return this._altKeyActive;
			}

			// Returns a DOMString with the code value of the key represented by the event.

		}, {
			key: 'code',
			get: function get() {
				return this._code;
			}

			// Returns a Boolean that is true if the Ctrl key was active when the key event was generated.

		}, {
			key: 'ctrlKey',
			get: function get() {
				return this._ctrlKeyActive;
			}

			// Returns a Boolean that is true if the event is fired between after compositionstart and before compositionend.

		}, {
			key: 'isComposing',
			get: function get() {
				return false;
			}

			// Returns a DOMString representing the key value of the key represented by the event.

		}, {
			key: 'key',
			get: function get() {
				return this._key;
			}
		}, {
			key: 'keyCode',
			get: function get() {
				return this._keyCode;
			}

			// Returns a Number representing the location of the key on the keyboard or other input device.

		}, {
			key: 'location',
			get: function get() {
				return 0;
			}

			// Returns a Boolean that is true if the Meta key (on Mac keyboards, the ⌘ Command key; on Windows keyboards, the Windows key (⊞)) was active when the key event was generated.

		}, {
			key: 'metaKey',
			get: function get() {
				return this._metaKeyActive;
			}

			// Returns a Boolean that is true if the key is being held down such that it is automatically repeating.

		}, {
			key: 'repeat',
			get: function get() {
				return this._repeat;
			}

			// Returns a Boolean that is true if the Shift key was active when the key event was generated.

		}, {
			key: 'shiftKey',
			get: function get() {
				return this._shiftKeyActive;
			}
		}]);

		return KeyboardEvent;
	}(Event);

	module.exports = KeyboardEvent;

	/***/
},
/* 34 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Event = __webpack_require__(0);

	var DeviceMotionEvent = function (_Event) {
		_inherits(DeviceMotionEvent, _Event);

		function DeviceMotionEvent(initArgs) {
			_classCallCheck(this, DeviceMotionEvent);

			var _this = _possibleConstructorReturn(this, (DeviceMotionEvent.__proto__ || Object.getPrototypeOf(DeviceMotionEvent)).call(this, 'devicemotion'));

			if (initArgs) {
				_this._acceleration = initArgs.acceleration ? initArgs.acceleration : { x: 0, y: 0, z: 0 };
				_this._accelerationIncludingGravity = initArgs.accelerationIncludingGravity ? initArgs.accelerationIncludingGravity : { x: 0, y: 0, z: 0 };
				_this._rotationRate = initArgs.rotationRate ? initArgs.rotationRate : { alpha: 0, beta: 0, gamma: 0 };
				_this._interval = initArgs.interval;
			} else {
				_this._acceleration = { x: 0, y: 0, z: 0 };
				_this._accelerationIncludingGravity = { x: 0, y: 0, z: 0 };
				_this._rotationRate = { alpha: 0, beta: 0, gamma: 0 };
				_this._interval = 0;
			}
			return _this;
		}

		_createClass(DeviceMotionEvent, [{
			key: 'acceleration',
			get: function get() {
				return this._acceleration;
			}
		}, {
			key: 'accelerationIncludingGravity',
			get: function get() {
				return this._accelerationIncludingGravity;
			}
		}, {
			key: 'rotationRate',
			get: function get() {
				return this._rotationRate;
			}
		}, {
			key: 'interval',
			get: function get() {
				return this._interval;
			}
		}]);

		return DeviceMotionEvent;
	}(Event);

	module.exports = DeviceMotionEvent;

	/***/
},
/* 35 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var localStorage = {
		get length() {
			var _qg$getStorageInfoSyn = qg.getStorageInfoSync(),
			    keys = _qg$getStorageInfoSyn.keys;

			return keys.length;
		},

		key: function key(n) {
			var _qg$getStorageInfoSyn2 = qg.getStorageInfoSync(),
			    keys = _qg$getStorageInfoSyn2.keys;

			return keys[n];
		},
		getItem: function getItem(key) {
			return qg.getStorageSync({ key: key });
		},
		setItem: function setItem(key, value) {
			qg.setStorageSync({
				key: key,
				value: value
			});
		},
		removeItem: function removeItem(key) {
			qg.deleteStorageSync({ key: key });
		},
		clear: function clear() {
			qg.clearStorageSync();
		}
	};

	module.exports = localStorage;

	/***/
}]
/******/);
