"use strict";

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (exports, Laya) {
	'use strict';

	var UIConfig = function UIConfig() {
		_classCallCheck(this, UIConfig);
	};

	UIConfig.touchScrollEnable = true;
	UIConfig.mouseWheelEnable = true;
	UIConfig.showButtons = true;
	UIConfig.popupBgColor = "#000000";
	UIConfig.popupBgAlpha = 0.5;
	UIConfig.closeDialogOnSide = true;
	window.UIConfig = UIConfig;

	var Styles = function Styles() {
		_classCallCheck(this, Styles);
	};

	Styles.defaultSizeGrid = [4, 4, 4, 4, 0];
	Styles.labelColor = "#000000";
	Styles.labelPadding = [2, 2, 2, 2];
	Styles.inputLabelPadding = [1, 1, 1, 3];
	Styles.buttonStateNum = 3;
	Styles.buttonLabelColors = ["#32556b", "#32cc6b", "#ff0000", "#C0C0C0"];
	Styles.comboBoxItemColors = ["#5e95b6", "#ffffff", "#000000", "#8fa4b1", "#ffffff"];
	Styles.scrollBarMinNum = 15;
	Styles.scrollBarDelayTime = 500;

	var AutoBitmap = function (_Laya$Graphics) {
		_inherits(AutoBitmap, _Laya$Graphics);

		function AutoBitmap() {
			_classCallCheck(this, AutoBitmap);

			var _this2 = _possibleConstructorReturn(this, (AutoBitmap.__proto__ || Object.getPrototypeOf(AutoBitmap)).apply(this, arguments));

			_this2.autoCacheCmd = true;
			_this2._width = 0;
			_this2._height = 0;
			_this2.uv = null;
			return _this2;
		}

		_createClass(AutoBitmap, [{
			key: "destroy",
			value: function destroy() {
				_get(AutoBitmap.prototype.__proto__ || Object.getPrototypeOf(AutoBitmap.prototype), "destroy", this).call(this);
				this._source = null;
				this._sizeGrid = null;
				this._offset = null;
			}
		}, {
			key: "_setChanged",
			value: function _setChanged() {
				if (!this._isChanged) {
					this._isChanged = true;
					Laya.ILaya.timer.callLater(this, this.changeSource);
				}
			}
		}, {
			key: "changeSource",
			value: function changeSource() {
				this._isChanged = false;
				var source = this._source;
				if (!source || !source.bitmap) return;
				var width = this.width;
				var height = this.height;
				var sizeGrid = this._sizeGrid;
				var sw = source.sourceWidth;
				var sh = source.sourceHeight;
				if (!sizeGrid || sw === width && sh === height) {
					this.clear();
					this.drawTexture(source, this._offset ? this._offset[0] : 0, this._offset ? this._offset[1] : 0, width, height, null, 1, null, null, this.uv);
				} else {
					this.clear();
					this.draw9Grid(source, 0, 0, width, height, sizeGrid);
					this._repaint();
					return;
				}
				this._repaint();
			}
		}, {
			key: "drawBitmap",
			value: function drawBitmap(repeat, tex, x, y) {
				var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
				var height = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

				if (width < 0.1 || height < 0.1) return;
				if (repeat && (tex.width != width || tex.height != height)) this.fillTexture(tex, x, y, width, height);else this.drawImage(tex, x, y, width, height);
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				return this._sizeGrid;
			},
			set: function set(value) {
				this._sizeGrid = value.map(function (v) {
					return +v;
				});
				this._setChanged();
			}
		}, {
			key: "width",
			get: function get() {
				if (this._width) return this._width;
				if (this._source) return this._source.sourceWidth;
				return 0;
			},
			set: function set(value) {
				if (this._width != value) {
					this._width = value;
					this._setChanged();
				}
			}
		}, {
			key: "height",
			get: function get() {
				if (this._height) return this._height;
				if (this._source) return this._source.sourceHeight;
				return 0;
			},
			set: function set(value) {
				if (this._height != value) {
					this._height = value;
					this._setChanged();
				}
			}
		}, {
			key: "source",
			get: function get() {
				return this._source;
			},
			set: function set(value) {
				if (value) {
					this._source = value;
					this._setChanged();
				} else {
					this._source = null;
					this.clear();
				}
			}
		}], [{
			key: "getTexture",
			value: function getTexture(tex, x, y, width, height) {
				if (width <= 0) width = 1;
				if (height <= 0) height = 1;
				tex.$_GID || (tex.$_GID = Laya.Utils.getGID());
				var texture;
				if (!texture || !texture._getSource()) {
					texture = Laya.Texture.createFromTexture(tex, x, y, width, height);
				}
				return texture;
			}
		}]);

		return AutoBitmap;
	}(Laya.Graphics);

	Laya.ClassUtils.regClass("laya.ui.AutoBitmap", AutoBitmap);
	Laya.ClassUtils.regClass("Laya.AutoBitmap", AutoBitmap);

	var Widget = function (_Laya$Component) {
		_inherits(Widget, _Laya$Component);

		function Widget() {
			_classCallCheck(this, Widget);

			var _this3 = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).apply(this, arguments));

			_this3._top = NaN;
			_this3._bottom = NaN;
			_this3._left = NaN;
			_this3._right = NaN;
			_this3._centerX = NaN;
			_this3._centerY = NaN;
			return _this3;
		}

		_createClass(Widget, [{
			key: "onReset",
			value: function onReset() {
				this._top = this._bottom = this._left = this._right = this._centerX = this._centerY = NaN;
			}
		}, {
			key: "_onEnable",
			value: function _onEnable() {
				if (this.owner.parent) this._onAdded();else this.owner.once(Laya.Event.ADDED, this, this._onAdded);
			}
		}, {
			key: "_onDisable",
			value: function _onDisable() {
				this.owner.off(Laya.Event.ADDED, this, this._onAdded);
				if (this.owner.parent) this.owner.parent.off(Laya.Event.RESIZE, this, this._onParentResize);
			}
		}, {
			key: "_onAdded",
			value: function _onAdded() {
				if (this.owner.parent) this.owner.parent.on(Laya.Event.RESIZE, this, this._onParentResize);
				this.resetLayoutX();
				this.resetLayoutY();
			}
		}, {
			key: "_onParentResize",
			value: function _onParentResize() {
				if (this.resetLayoutX() || this.resetLayoutY()) this.owner.event(Laya.Event.RESIZE);
			}
		}, {
			key: "resetLayoutX",
			value: function resetLayoutX() {
				var owner = this.owner;
				if (!owner) return false;
				var parent = owner.parent;
				if (parent) {
					if (!isNaN(this.centerX)) {
						owner.x = Math.round((parent.width - owner.displayWidth) * 0.5 + this.centerX + owner.pivotX * owner.scaleX);
					} else if (!isNaN(this.left)) {
						owner.x = Math.round(this.left + owner.pivotX * owner.scaleX);
						if (!isNaN(this.right)) {
							var temp = (parent._width - this.left - this.right) / (owner.scaleX || 0.01);
							if (temp != owner.width) {
								owner.width = temp;
								return true;
							}
						}
					} else if (!isNaN(this.right)) {
						owner.x = Math.round(parent.width - owner.displayWidth - this.right + owner.pivotX * owner.scaleX);
					}
				}
				return false;
			}
		}, {
			key: "resetLayoutY",
			value: function resetLayoutY() {
				var owner = this.owner;
				if (!owner) return false;
				var parent = owner.parent;
				if (parent) {
					if (!isNaN(this.centerY)) {
						owner.y = Math.round((parent.height - owner.displayHeight) * 0.5 + this.centerY + owner.pivotY * owner.scaleY);
					} else if (!isNaN(this.top)) {
						owner.y = Math.round(this.top + owner.pivotY * owner.scaleY);
						if (!isNaN(this.bottom)) {
							var temp = (parent._height - this.top - this.bottom) / (owner.scaleY || 0.01);
							if (temp != owner.height) {
								owner.height = temp;
								return true;
							}
						}
					} else if (!isNaN(this.bottom)) {
						owner.y = Math.round(parent.height - owner.displayHeight - this.bottom + owner.pivotY * owner.scaleY);
					}
				}
				return false;
			}
		}, {
			key: "resetLayout",
			value: function resetLayout() {
				if (this.owner) {
					this.resetLayoutX();
					this.resetLayoutY();
				}
			}
		}, {
			key: "top",
			get: function get() {
				return this._top;
			},
			set: function set(value) {
				if (this._top != value) {
					this._top = value;
					this.resetLayoutY();
				}
			}
		}, {
			key: "bottom",
			get: function get() {
				return this._bottom;
			},
			set: function set(value) {
				if (this._bottom != value) {
					this._bottom = value;
					this.resetLayoutY();
				}
			}
		}, {
			key: "left",
			get: function get() {
				return this._left;
			},
			set: function set(value) {
				if (this._left != value) {
					this._left = value;
					this.resetLayoutX();
				}
			}
		}, {
			key: "right",
			get: function get() {
				return this._right;
			},
			set: function set(value) {
				if (this._right != value) {
					this._right = value;
					this.resetLayoutX();
				}
			}
		}, {
			key: "centerX",
			get: function get() {
				return this._centerX;
			},
			set: function set(value) {
				if (this._centerX != value) {
					this._centerX = value;
					this.resetLayoutX();
				}
			}
		}, {
			key: "centerY",
			get: function get() {
				return this._centerY;
			},
			set: function set(value) {
				if (this._centerY != value) {
					this._centerY = value;
					this.resetLayoutY();
				}
			}
		}]);

		return Widget;
	}(Laya.Component);

	Widget.EMPTY = null;
	Laya.ILaya.regClass(Widget);
	Widget.EMPTY = new Widget();
	Laya.ClassUtils.regClass("laya.ui.Widget", Widget);
	Laya.ClassUtils.regClass("Laya.Widget", Widget);

	var UIEvent = function (_Laya$Event) {
		_inherits(UIEvent, _Laya$Event);

		function UIEvent() {
			_classCallCheck(this, UIEvent);

			return _possibleConstructorReturn(this, (UIEvent.__proto__ || Object.getPrototypeOf(UIEvent)).apply(this, arguments));
		}

		return UIEvent;
	}(Laya.Event);

	UIEvent.SHOW_TIP = "showtip";
	UIEvent.HIDE_TIP = "hidetip";
	Laya.ILaya.regClass(UIEvent);
	Laya.ClassUtils.regClass("laya.ui.UIEvent", UIEvent);
	Laya.ClassUtils.regClass("Laya.UIEvent", UIEvent);

	var UIUtils = function () {
		function UIUtils() {
			_classCallCheck(this, UIUtils);
		}

		_createClass(UIUtils, null, [{
			key: "fillArray",
			value: function fillArray(arr, str) {
				var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				var temp = arr.concat();
				if (str) {
					var a = str.split(",");
					for (var i = 0, n = Math.min(temp.length, a.length); i < n; i++) {
						var value = a[i];
						temp[i] = value == "true" ? true : value == "false" ? false : value;
						if (type != null) temp[i] = type(value);
					}
				}
				return temp;
			}
		}, {
			key: "toColor",
			value: function toColor(color) {
				return Laya.Utils.toHexColor(color);
			}
		}, {
			key: "gray",
			value: function gray(traget) {
				var isGray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				if (isGray) {
					UIUtils.addFilter(traget, UIUtils.grayFilter);
				} else {
					UIUtils.clearFilter(traget, Laya.ColorFilter);
				}
			}
		}, {
			key: "addFilter",
			value: function addFilter(target, filter) {
				var filters = target.filters || [];
				filters.push(filter);
				target.filters = filters;
			}
		}, {
			key: "clearFilter",
			value: function clearFilter(target, filterType) {
				var filters = target.filters;
				if (filters != null && filters.length > 0) {
					for (var i = filters.length - 1; i > -1; i--) {
						var filter = filters[i];
						if (filter instanceof filterType) filters.splice(i, 1);
					}
					target.filters = filters;
				}
			}
		}, {
			key: "_getReplaceStr",
			value: function _getReplaceStr(word) {
				return UIUtils.escapeSequence[word];
			}
		}, {
			key: "adptString",
			value: function adptString(str) {
				return str.replace(/\\(\w)/g, UIUtils._getReplaceStr);
			}
		}, {
			key: "getBindFun",
			value: function getBindFun(value) {
				if (!UIUtils._funMap) {
					UIUtils._funMap = new Laya.WeakObject();
				}
				var fun = UIUtils._funMap.get(value);
				if (fun == null) {
					var temp = "\"" + value + "\"";
					temp = temp.replace(/^"\${|}"$/g, "").replace(/\${/g, "\"+").replace(/}/g, "+\"");
					var str = "(function(data){if(data==null)return;with(data){try{\nreturn " + temp + "\n}catch(e){}}})";
					fun = window.Laya._runScript(str);
					UIUtils._funMap.set(value, fun);
				}
				return fun;
			}
		}]);

		return UIUtils;
	}();

	UIUtils.grayFilter = new Laya.ColorFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
	UIUtils.escapeSequence = { "\\n": "\n", "\\t": "\t" };
	UIUtils._funMap = null;
	Laya.ClassUtils.regClass("laya.ui.UIUtils", UIUtils);
	Laya.ClassUtils.regClass("Laya.UIUtils", UIUtils);

	var UIComponent = function (_Laya$Sprite) {
		_inherits(UIComponent, _Laya$Sprite);

		function UIComponent() {
			var createChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			_classCallCheck(this, UIComponent);

			var _this5 = _possibleConstructorReturn(this, (UIComponent.__proto__ || Object.getPrototypeOf(UIComponent)).call(this));

			_this5._anchorX = NaN;
			_this5._anchorY = NaN;
			_this5._widget = Widget.EMPTY;
			if (createChildren) {
				_this5.preinitialize();
				_this5.createChildren();
				_this5.initialize();
			}
			return _this5;
		}

		_createClass(UIComponent, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "destroy", this).call(this, destroyChild);
				this._dataSource = null;
				this._tag = null;
				this._toolTip = null;
			}
		}, {
			key: "preinitialize",
			value: function preinitialize() {}
		}, {
			key: "createChildren",
			value: function createChildren() {}
		}, {
			key: "initialize",
			value: function initialize() {}
		}, {
			key: "get_width",
			value: function get_width() {
				if (this._width) return this._width;
				return this.measureWidth();
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				var max = 0;
				this.commitMeasure();
				for (var i = this.numChildren - 1; i > -1; i--) {
					var comp = this.getChildAt(i);
					if (comp._visible) {
						max = Math.max(comp._x + comp.width * comp.scaleX, max);
					}
				}
				return max;
			}
		}, {
			key: "commitMeasure",
			value: function commitMeasure() {}
		}, {
			key: "get_height",
			value: function get_height() {
				if (this._height) return this._height;
				return this.measureHeight();
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				var max = 0;
				this.commitMeasure();
				for (var i = this.numChildren - 1; i > -1; i--) {
					var comp = this.getChildAt(i);
					if (comp._visible) {
						max = Math.max(comp._y + comp.height * comp.scaleY, max);
					}
				}
				return max;
			}
		}, {
			key: "get_dataSource",
			value: function get_dataSource() {
				return this._dataSource;
			}
		}, {
			key: "set_dataSource",
			value: function set_dataSource(value) {
				this._dataSource = value;
				for (var prop in this._dataSource) {
					if (prop in this && !(typeof this[prop] == 'function')) {
						this[prop] = this._dataSource[prop];
					}
				}
			}
		}, {
			key: "get_top",
			value: function get_top() {
				return this._widget.top;
			}
		}, {
			key: "set_top",
			value: function set_top(value) {
				if (value != this._widget.top) {
					this._getWidget().top = value;
				}
			}
		}, {
			key: "get_bottom",
			value: function get_bottom() {
				return this._widget.bottom;
			}
		}, {
			key: "set_bottom",
			value: function set_bottom(value) {
				if (value != this._widget.bottom) {
					this._getWidget().bottom = value;
				}
			}
		}, {
			key: "_sizeChanged",
			value: function _sizeChanged() {
				if (!isNaN(this._anchorX)) this.pivotX = this.anchorX * this.width;
				if (!isNaN(this._anchorY)) this.pivotY = this.anchorY * this.height;
				this.event(Laya.Event.RESIZE);
				if (this._widget !== Widget.EMPTY) this._widget.resetLayout();
			}
		}, {
			key: "onMouseOver",
			value: function onMouseOver(e) {
				Laya.ILaya.stage.event(UIEvent.SHOW_TIP, this._toolTip);
			}
		}, {
			key: "onMouseOut",
			value: function onMouseOut(e) {
				Laya.ILaya.stage.event(UIEvent.HIDE_TIP, this._toolTip);
			}
		}, {
			key: "_getWidget",
			value: function _getWidget() {
				this._widget === Widget.EMPTY && (this._widget = this.addComponent(Widget));
				return this._widget;
			}
		}, {
			key: "set_scaleX",
			value: function set_scaleX(value) {
				if (_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "get_scaleX", this).call(this) == value) return;
				_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "set_scaleX", this).call(this, value);
				this.event(Laya.Event.RESIZE);
			}
		}, {
			key: "set_scaleY",
			value: function set_scaleY(value) {
				if (_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "get_scaleY", this).call(this) == value) return;
				_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "set_scaleY", this).call(this, value);
				this.event(Laya.Event.RESIZE);
			}
		}, {
			key: "onCompResize",
			value: function onCompResize() {
				this._sizeChanged();
			}
		}, {
			key: "set_width",
			value: function set_width(value) {
				if (_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "get_width", this).call(this) == value) return;
				_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "set_width", this).call(this, value);
				this.callLater(this._sizeChanged);
			}
		}, {
			key: "set_height",
			value: function set_height(value) {
				if (_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "get_height", this).call(this) == value) return;
				_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "set_height", this).call(this, value);
				this.callLater(this._sizeChanged);
			}
		}, {
			key: "get_anchorX",
			value: function get_anchorX() {
				return this._anchorX;
			}
		}, {
			key: "set_anchorX",
			value: function set_anchorX(value) {
				if (this._anchorX != value) {
					this._anchorX = value;
					this.callLater(this._sizeChanged);
				}
			}
		}, {
			key: "get_anchorY",
			value: function get_anchorY() {
				return this._anchorY;
			}
		}, {
			key: "set_anchorY",
			value: function set_anchorY(value) {
				if (this._anchorY != value) {
					this._anchorY = value;
					this.callLater(this._sizeChanged);
				}
			}
		}, {
			key: "_childChanged",
			value: function _childChanged() {
				var child = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.callLater(this._sizeChanged);
				_get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "_childChanged", this).call(this, child);
			}
		}, {
			key: "width",
			get: function get() {
				return this.get_width();
			},
			set: function set(value) {
				this.set_width(value);
			}
		}, {
			key: "height",
			get: function get() {
				return this.get_height();
			},
			set: function set(value) {
				this.set_height(value);
			}
		}, {
			key: "dataSource",
			get: function get() {
				return this.get_dataSource();
			},
			set: function set(value) {
				this.set_dataSource(value);
			}
		}, {
			key: "top",
			get: function get() {
				return this.get_top();
			},
			set: function set(value) {
				this.set_top(value);
			}
		}, {
			key: "bottom",
			get: function get() {
				return this.get_bottom();
			},
			set: function set(value) {
				this.set_bottom(value);
			}
		}, {
			key: "left",
			get: function get() {
				return this._widget.left;
			},
			set: function set(value) {
				if (value != this._widget.left) {
					this._getWidget().left = value;
				}
			}
		}, {
			key: "right",
			get: function get() {
				return this._widget.right;
			},
			set: function set(value) {
				if (value != this._widget.right) {
					this._getWidget().right = value;
				}
			}
		}, {
			key: "centerX",
			get: function get() {
				return this._widget.centerX;
			},
			set: function set(value) {
				if (value != this._widget.centerX) {
					this._getWidget().centerX = value;
				}
			}
		}, {
			key: "centerY",
			get: function get() {
				return this._widget.centerY;
			},
			set: function set(value) {
				if (value != this._widget.centerY) {
					this._getWidget().centerY = value;
				}
			}
		}, {
			key: "tag",
			get: function get() {
				return this._tag;
			},
			set: function set(value) {
				this._tag = value;
			}
		}, {
			key: "toolTip",
			get: function get() {
				return this._toolTip;
			},
			set: function set(value) {
				if (this._toolTip != value) {
					this._toolTip = value;
					if (value != null) {
						this.on(Laya.Event.MOUSE_OVER, this, this.onMouseOver);
						this.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
					} else {
						this.off(Laya.Event.MOUSE_OVER, this, this.onMouseOver);
						this.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
					}
				}
			}
		}, {
			key: "gray",
			get: function get() {
				return this._gray;
			},
			set: function set(value) {
				if (value !== this._gray) {
					this._gray = value;
					UIUtils.gray(this, value);
				}
			}
		}, {
			key: "disabled",
			get: function get() {
				return this._disabled;
			},
			set: function set(value) {
				if (value !== this._disabled) {
					this.gray = this._disabled = value;
					this.mouseEnabled = !value;
				}
			}
		}, {
			key: "scaleX",
			set: function set(value) {
				this.set_scaleX(value);
			},
			get: function get() {
				return _get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "scaleX", this);
			}
		}, {
			key: "scaleY",
			set: function set(value) {
				this.set_scaleY(value);
			},
			get: function get() {
				return _get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), "scaleY", this);
			}
		}, {
			key: "anchorX",
			get: function get() {
				return this.get_anchorX();
			},
			set: function set(value) {
				this.set_anchorX(value);
			}
		}, {
			key: "anchorY",
			get: function get() {
				return this.get_anchorY();
			},
			set: function set(value) {
				this.set_anchorY(value);
			}
		}]);

		return UIComponent;
	}(Laya.Sprite);

	Laya.ILaya.regClass(UIComponent);
	Laya.ClassUtils.regClass("laya.ui.UIComponent", UIComponent);
	Laya.ClassUtils.regClass("Laya.UIComponent", UIComponent);

	var Image = function (_UIComponent) {
		_inherits(Image, _UIComponent);

		function Image() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, Image);

			var _this6 = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this));

			_this6.skin = skin;
			return _this6;
		}

		_createClass(Image, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), "destroy", this).call(this, true);
				this._bitmap && this._bitmap.destroy();
				this._bitmap = null;
			}
		}, {
			key: "dispose",
			value: function dispose() {
				this.destroy(true);
				Laya.ILaya.loader.clearRes(this._skin);
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.graphics = this._bitmap = new AutoBitmap();
				this._bitmap.autoCacheCmd = false;
			}
		}, {
			key: "setSource",
			value: function setSource(url) {
				var img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (url === this._skin && img) {
					this.source = img;
					this.onCompResize();
				}
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				return this._bitmap.width;
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				return this._bitmap.height;
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (this._skin != value) {
					this._skin = value;
					if (value) {
						var source = Laya.Loader.getRes(value);
						if (source) {
							this.source = source;
							this.onCompResize();
						} else Laya.ILaya.loader.load(this._skin, Laya.Handler.create(this, this.setSource, [this._skin]), null, Laya.Loader.IMAGE, 1, true, this._group);
					} else {
						this.source = null;
					}
				}
			}
		}, {
			key: "source",
			get: function get() {
				return this._bitmap.source;
			},
			set: function set(value) {
				if (!this._bitmap) return;
				this._bitmap.source = value;
				this.event(Laya.Event.LOADED);
				this.repaint();
			}
		}, {
			key: "group",
			get: function get() {
				return this._group;
			},
			set: function set(value) {
				if (value && this._skin) Laya.Loader.setGroup(this._skin, value);
				this._group = value;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), "width", value, this);
				this._bitmap.width = value == 0 ? 0.0000001 : value;
			},
			get: function get() {
				return _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), "height", value, this);
				this._bitmap.height = value == 0 ? 0.0000001 : value;
			},
			get: function get() {
				return _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), "height", this);
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				if (this._bitmap.sizeGrid) return this._bitmap.sizeGrid.join(",");
				return null;
			},
			set: function set(value) {
				this._bitmap.sizeGrid = UIUtils.fillArray(Styles.defaultSizeGrid, value, Number);
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'string') this.skin = value;else _set(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), "dataSource", this);
			}
		}]);

		return Image;
	}(UIComponent);

	Laya.ILaya.regClass(Image);
	Laya.ClassUtils.regClass("laya.ui.Image", Image);
	Laya.ClassUtils.regClass("Laya.Image", Image);

	var AdvImage = function (_Image) {
		_inherits(AdvImage, _Image);

		function AdvImage() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, AdvImage);

			var _this7 = _possibleConstructorReturn(this, (AdvImage.__proto__ || Object.getPrototypeOf(AdvImage)).call(this));

			_this7.advsListArr = [];
			_this7.resUrl = "https://unioncdn.layabox.com/config/iconlist.json";
			_this7._http = new Laya.Browser.window.XMLHttpRequest();
			_this7._data = [];
			_this7._resquestTime = 360000;
			_this7._playIndex = 0;
			_this7._lunboTime = 5000;
			_this7.skin = skin;
			_this7.setLoadUrl();
			_this7.init();
			_this7.size(120, 120);
			return _this7;
		}

		_createClass(AdvImage, [{
			key: "setLoadUrl",
			value: function setLoadUrl() {}
		}, {
			key: "init",
			value: function init() {
				if (this.isSupportJump()) {
					if (Laya.Browser.onMiniGame || Laya.Browser.onBDMiniGame) {
						Laya.ILaya.timer.loop(this._resquestTime, this, this.onGetAdvsListData);
					}
					this.onGetAdvsListData();
					this.initEvent();
				} else this.visible = false;
			}
		}, {
			key: "initEvent",
			value: function initEvent() {
				this.on(Laya.Event.CLICK, this, this.onAdvsImgClick);
			}
		}, {
			key: "onAdvsImgClick",
			value: function onAdvsImgClick() {
				var currentJumpUrl = this.getCurrentAppidObj();
				if (currentJumpUrl) this.jumptoGame();
			}
		}, {
			key: "revertAdvsData",
			value: function revertAdvsData() {
				if (this.advsListArr[this._playIndex]) {
					this.visible = true;
					this.skin = this.advsListArr[this._playIndex];
				}
			}
		}, {
			key: "isSupportJump",
			value: function isSupportJump() {
				if (Laya.Browser.onMiniGame) {
					var isSupperJump = window.wx.navigateToMiniProgram instanceof Function;
					return isSupperJump;
				} else if (Laya.Browser.onBDMiniGame) return true;
				return false;
			}
		}, {
			key: "jumptoGame",
			value: function jumptoGame() {
				var advsObj = this.advsListArr[this._playIndex];
				var desGameId = parseInt(advsObj.gameid);
				var extendInfo = advsObj.extendInfo;
				var path = advsObj.path;
				if (Laya.Browser.onMiniGame) {
					if (this.isSupportJump()) {
						window.wx.navigateToMiniProgram({
							appId: this._appid,
							path: "",
							extraData: "",
							envVersion: "release",
							success: function success() {
								console.log("-------------跳转成功--------------");
							},
							fail: function fail() {
								console.log("-------------跳转失败--------------");
							},
							complete: function complete() {
								console.log("-------------跳转接口调用成功--------------");
								this.updateAdvsInfo();
							}.bind(this)
						});
					}
				} else if (Laya.Browser.onBDMiniGame) ;else {
					this.visible = false;
				}
			}
		}, {
			key: "updateAdvsInfo",
			value: function updateAdvsInfo() {
				this.visible = false;
				this.onLunbo();
				Laya.ILaya.timer.loop(this._lunboTime, this, this.onLunbo);
			}
		}, {
			key: "onLunbo",
			value: function onLunbo() {
				if (this._playIndex >= this.advsListArr.length - 1) this._playIndex = 0;else this._playIndex += 1;
				this.visible = true;
				this.revertAdvsData();
			}
		}, {
			key: "getCurrentAppidObj",
			value: function getCurrentAppidObj() {
				return this.advsListArr[this._playIndex];
			}
		}, {
			key: "onGetAdvsListData",
			value: function onGetAdvsListData() {
				var _this = this;
				var random = AdvImage.randRange(10000, 1000000);
				var url = this.resUrl + "?" + random;
				this._http.open("get", url, true);
				this._http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				this._http.responseType = "text";
				this._http.onerror = function (e) {
					_this._onError(e);
				};
				this._http.onload = function (e) {
					_this._onLoad(e);
				};
				this._http.send(null);
			}
		}, {
			key: "_onError",
			value: function _onError(e) {
				this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText);
			}
		}, {
			key: "_onLoad",
			value: function _onLoad(e) {
				var http = this._http;
				var status = http.status !== undefined ? http.status : 200;
				if (status === 200 || status === 204 || status === 0) {
					this.complete();
				} else {
					this.error("[" + http.status + "]" + http.statusText + ":" + http.responseURL);
				}
			}
		}, {
			key: "error",
			value: function error(message) {
				this.event(Laya.Event.ERROR, message);
			}
		}, {
			key: "complete",
			value: function complete() {
				try {
					this._data = this._http.response || this._http.responseText;
					this._data = JSON.parse(this._data);
					this.advsListArr = this._data.list;
					this._appid = this._data.appid;
					this.updateAdvsInfo();
					this.revertAdvsData();
				} catch (e) {
					this.error(e.message);
				}
			}
		}, {
			key: "getAdvsQArr",
			value: function getAdvsQArr(data) {
				var tempArr = [];
				var gameAdvsObj = Laya.LocalStorage.getJSON("gameObj");
				for (var key in data) {
					var tempObj = data[key];
					if (gameAdvsObj && gameAdvsObj[tempObj.gameid] && !tempObj.isQiangZhi) continue;
					tempArr.push(tempObj);
				}
				return tempArr;
			}
		}, {
			key: "clear",
			value: function clear() {
				var http = this._http;
				http.onerror = http.onabort = http.onprogress = http.onload = null;
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				Laya.ILaya.timer.clear(this, this.onLunbo);
				_get(AdvImage.prototype.__proto__ || Object.getPrototypeOf(AdvImage.prototype), "destroy", this).call(this, true);
				this.clear();
				Laya.ILaya.timer.clear(this, this.onGetAdvsListData);
			}
		}], [{
			key: "randRange",
			value: function randRange(minNum, maxNum) {
				return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
			}
		}]);

		return AdvImage;
	}(Image);

	Laya.ClassUtils.regClass("laya.ui.AdvImage", AdvImage);
	Laya.ClassUtils.regClass("Laya.AdvImage", AdvImage);

	var Box = function (_UIComponent2) {
		_inherits(Box, _UIComponent2);

		function Box() {
			_classCallCheck(this, Box);

			return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
		}

		_createClass(Box, [{
			key: "_onResize",
			value: function _onResize(e) {
				this.graphics.clear();
				this.graphics.drawRect(0, 0, this.width, this.height, this._bgColor);
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				for (var name in value) {
					var comp = this.getChildByName(name);
					if (comp) comp.dataSource = value[name];else if (name in this && !(this[name] instanceof Function)) this[name] = value[name];
				}
			},
			get: function get() {
				return _get(Box.prototype.__proto__ || Object.getPrototypeOf(Box.prototype), "dataSource", this);
			}
		}, {
			key: "bgColor",
			get: function get() {
				return this._bgColor;
			},
			set: function set(value) {
				this._bgColor = value;
				if (value) {
					this._onResize(null);
					this.on(Laya.Event.RESIZE, this, this._onResize);
				} else {
					this.graphics.clear();
					this.off(Laya.Event.RESIZE, this, this._onResize);
				}
			}
		}]);

		return Box;
	}(UIComponent);

	Laya.ILaya.regClass(Box);
	Laya.ClassUtils.regClass("laya.ui.Box", Box);
	Laya.ClassUtils.regClass("Laya.Box", Box);

	var Button = function (_UIComponent3) {
		_inherits(Button, _UIComponent3);

		function Button() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			_classCallCheck(this, Button);

			var _this9 = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

			_this9._labelColors = Styles.buttonLabelColors;
			_this9._state = 0;
			_this9._autoSize = true;
			_this9._stateNum = Styles.buttonStateNum;
			_this9._stateChanged = false;
			_this9.skin = skin;
			_this9.label = label;
			return _this9;
		}

		_createClass(Button, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "destroy", this).call(this, destroyChild);
				this._bitmap && this._bitmap.destroy();
				this._text && this._text.destroy(destroyChild);
				this._bitmap = null;
				this._text = null;
				this._clickHandler = null;
				this._labelColors = this._sources = this._strokeColors = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.graphics = this._bitmap = new AutoBitmap();
			}
		}, {
			key: "createText",
			value: function createText() {
				if (!this._text) {
					this._text = new Laya.Text();
					this._text.overflow = Laya.Text.HIDDEN;
					this._text.align = "center";
					this._text.valign = "middle";
					this._text.width = this._width;
					this._text.height = this._height;
				}
			}
		}, {
			key: "initialize",
			value: function initialize() {
				if (this._mouseState !== 1) {
					this.mouseEnabled = true;
					this._setBit(Laya.Const.HAS_MOUSE, true);
				}
				this._createListener(Laya.Event.MOUSE_OVER, this, this.onMouse, null, false, false);
				this._createListener(Laya.Event.MOUSE_OUT, this, this.onMouse, null, false, false);
				this._createListener(Laya.Event.MOUSE_DOWN, this, this.onMouse, null, false, false);
				this._createListener(Laya.Event.MOUSE_UP, this, this.onMouse, null, false, false);
				this._createListener(Laya.Event.CLICK, this, this.onMouse, null, false, false);
			}
		}, {
			key: "onMouse",
			value: function onMouse(e) {
				if (this.toggle === false && this._selected) return;
				if (e.type === Laya.Event.CLICK) {
					this.toggle && (this.selected = !this._selected);
					this._clickHandler && this._clickHandler.run();
					return;
				}
				!this._selected && (this.state = Button.stateMap[e.type]);
			}
		}, {
			key: "_skinLoaded",
			value: function _skinLoaded() {
				this.callLater(this.changeClips);
				this._setStateChanged();
				this._sizeChanged();
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "changeClips",
			value: function changeClips() {
				var img = Laya.Loader.getRes(this._skin);
				if (!img) {
					console.log("lose skin", this._skin);
					return;
				}
				var width = img.sourceWidth;
				var height = img.sourceHeight / this._stateNum;
				img.$_GID || (img.$_GID = Laya.Utils.getGID());
				var key = img.$_GID + "-" + this._stateNum;
				var clips = Laya.WeakObject.I.get(key);
				if (!Laya.Utils.isOkTextureList(clips)) {
					clips = null;
				}
				if (clips) this._sources = clips;else {
					this._sources = [];
					if (this._stateNum === 1) {
						this._sources.push(img);
					} else {
						for (var i = 0; i < this._stateNum; i++) {
							this._sources.push(Laya.Texture.createFromTexture(img, 0, height * i, width, height));
						}
					}
					Laya.WeakObject.I.set(key, this._sources);
				}
				if (this._autoSize) {
					this._bitmap.width = this._width || width;
					this._bitmap.height = this._height || height;
					if (this._text) {
						this._text.width = this._bitmap.width;
						this._text.height = this._bitmap.height;
					}
				} else {
					this._text && (this._text.x = width);
				}
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				this.runCallLater(this.changeClips);
				if (this._autoSize) return this._bitmap.width;
				this.runCallLater(this.changeState);
				return this._bitmap.width + (this._text ? this._text.width : 0);
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				this.runCallLater(this.changeClips);
				return this._text ? Math.max(this._bitmap.height, this._text.height) : this._bitmap.height;
			}
		}, {
			key: "changeState",
			value: function changeState() {
				this._stateChanged = false;
				this.runCallLater(this.changeClips);
				var index = this._state < this._stateNum ? this._state : this._stateNum - 1;
				this._sources && (this._bitmap.source = this._sources[index]);
				if (this.label) {
					this._text.color = this._labelColors[index];
					if (this._strokeColors) this._text.strokeColor = this._strokeColors[index];
				}
			}
		}, {
			key: "_setStateChanged",
			value: function _setStateChanged() {
				if (!this._stateChanged) {
					this._stateChanged = true;
					this.callLater(this.changeState);
				}
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (this._skin != value) {
					this._skin = value;
					if (value) {
						if (!Laya.Loader.getRes(value)) {
							Laya.ILaya.loader.load(this._skin, Laya.Handler.create(this, this._skinLoaded), null, Laya.Loader.IMAGE, 1);
						} else {
							this._skinLoaded();
						}
					} else {
						this._skinLoaded();
					}
				}
			}
		}, {
			key: "stateNum",
			get: function get() {
				return this._stateNum;
			},
			set: function set(value) {
				if (typeof value == 'string') {
					value = parseInt(value);
				}
				if (this._stateNum != value) {
					this._stateNum = value < 1 ? 1 : value > 3 ? 3 : value;
					this.callLater(this.changeClips);
				}
			}
		}, {
			key: "label",
			get: function get() {
				return this._text ? this._text.text : null;
			},
			set: function set(value) {
				if (!this._text && !value) return;
				this.createText();
				if (this._text.text != value) {
					value && !this._text.parent && this.addChild(this._text);
					this._text.text = (value + "").replace(/\\n/g, "\n");
					this._setStateChanged();
				}
			}
		}, {
			key: "selected",
			get: function get() {
				return this._selected;
			},
			set: function set(value) {
				if (this._selected != value) {
					this._selected = value;
					this.state = this._selected ? 2 : 0;
					this.event(Laya.Event.CHANGE);
				}
			}
		}, {
			key: "state",
			get: function get() {
				return this._state;
			},
			set: function set(value) {
				if (this._state != value) {
					this._state = value;
					this._setStateChanged();
				}
			}
		}, {
			key: "labelColors",
			get: function get() {
				return this._labelColors.join(",");
			},
			set: function set(value) {
				this._labelColors = UIUtils.fillArray(Styles.buttonLabelColors, value, String);
				this._setStateChanged();
			}
		}, {
			key: "strokeColors",
			get: function get() {
				return this._strokeColors ? this._strokeColors.join(",") : "";
			},
			set: function set(value) {
				this._strokeColors = UIUtils.fillArray(Styles.buttonLabelColors, value, String);
				this._setStateChanged();
			}
		}, {
			key: "labelPadding",
			get: function get() {
				this.createText();
				return this._text.padding.join(",");
			},
			set: function set(value) {
				this.createText();
				this._text.padding = UIUtils.fillArray(Styles.labelPadding, value, Number);
			}
		}, {
			key: "labelSize",
			get: function get() {
				this.createText();
				return this._text.fontSize;
			},
			set: function set(value) {
				this.createText();
				this._text.fontSize = value;
			}
		}, {
			key: "labelStroke",
			get: function get() {
				this.createText();
				return this._text.stroke;
			},
			set: function set(value) {
				this.createText();
				this._text.stroke = value;
			}
		}, {
			key: "labelStrokeColor",
			get: function get() {
				this.createText();
				return this._text.strokeColor;
			},
			set: function set(value) {
				this.createText();
				this._text.strokeColor = value;
			}
		}, {
			key: "labelBold",
			get: function get() {
				this.createText();
				return this._text.bold;
			},
			set: function set(value) {
				this.createText();
				this._text.bold = value;
			}
		}, {
			key: "labelFont",
			get: function get() {
				this.createText();
				return this._text.font;
			},
			set: function set(value) {
				this.createText();
				this._text.font = value;
			}
		}, {
			key: "labelAlign",
			get: function get() {
				this.createText();
				return this._text.align;
			},
			set: function set(value) {
				this.createText();
				this._text.align = value;
			}
		}, {
			key: "clickHandler",
			get: function get() {
				return this._clickHandler;
			},
			set: function set(value) {
				this._clickHandler = value;
			}
		}, {
			key: "text",
			get: function get() {
				this.createText();
				return this._text;
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				if (this._bitmap.sizeGrid) return this._bitmap.sizeGrid.join(",");
				return null;
			},
			set: function set(value) {
				this._bitmap.sizeGrid = UIUtils.fillArray(Styles.defaultSizeGrid, value, Number);
			}
		}, {
			key: "width",
			set: function set(value) {
				_get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "set_width", this).call(this, value);
				if (this._autoSize) {
					this._bitmap.width = value;
					this._text && (this._text.width = value);
				}
			},
			get: function get() {
				return _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "get_width", this).call(this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "set_height", this).call(this, value);
				if (this._autoSize) {
					this._bitmap.height = value;
					this._text && (this._text.height = value);
				}
			},
			get: function get() {
				return _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "get_height", this).call(this);
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.label = value + "";else _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "set_dataSource", this).call(this, value);
			},
			get: function get() {
				return _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), "get_dataSource", this).call(this);
			}
		}, {
			key: "iconOffset",
			get: function get() {
				return this._bitmap._offset ? this._bitmap._offset.join(",") : null;
			},
			set: function set(value) {
				if (value) this._bitmap._offset = UIUtils.fillArray([1, 1], value, Number);else this._bitmap._offset = [];
			}
		}]);

		return Button;
	}(UIComponent);

	Button.stateMap = { "mouseup": 0, "mouseover": 1, "mousedown": 2, "mouseout": 0 };
	Laya.ILaya.regClass(Button);
	Laya.ClassUtils.regClass("laya.ui.Button", Button);
	Laya.ClassUtils.regClass("Laya.Button", Button);

	var CheckBox = function (_Button) {
		_inherits(CheckBox, _Button);

		function CheckBox() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			_classCallCheck(this, CheckBox);

			var _this10 = _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this, skin, label));

			_this10.toggle = true;
			_this10._autoSize = false;
			return _this10;
		}

		_createClass(CheckBox, [{
			key: "preinitialize",
			value: function preinitialize() {
				_get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), "preinitialize", this).call(this);
				this.toggle = true;
				this._autoSize = false;
			}
		}, {
			key: "initialize",
			value: function initialize() {
				_get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), "initialize", this).call(this);
				this.createText();
				this._text.align = "left";
				this._text.valign = "top";
				this._text.width = 0;
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (value instanceof Boolean) this.selected = value;else if (typeof value == 'string') this.selected = value === "true";else _set(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), "dataSource", this);
			}
		}]);

		return CheckBox;
	}(Button);

	Laya.ILaya.regClass(CheckBox);
	Laya.ClassUtils.regClass("laya.ui.CheckBox", CheckBox);
	Laya.ClassUtils.regClass("Laya.CheckBox", CheckBox);

	var Clip = function (_UIComponent4) {
		_inherits(Clip, _UIComponent4);

		function Clip() {
			var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var clipX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
			var clipY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

			_classCallCheck(this, Clip);

			var _this11 = _possibleConstructorReturn(this, (Clip.__proto__ || Object.getPrototypeOf(Clip)).call(this));

			_this11._clipX = 1;
			_this11._clipY = 1;
			_this11._clipWidth = 0;
			_this11._clipHeight = 0;
			_this11._interval = 50;
			_this11._index = 0;
			_this11._toIndex = -1;
			_this11._clipX = clipX;
			_this11._clipY = clipY;
			_this11.skin = url;
			return _this11;
		}

		_createClass(Clip, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Clip.prototype.__proto__ || Object.getPrototypeOf(Clip.prototype), "destroy", this).call(this, true);
				this._bitmap && this._bitmap.destroy();
				this._bitmap = null;
				this._sources = null;
			}
		}, {
			key: "dispose",
			value: function dispose() {
				this.destroy(true);
				Laya.ILaya.loader.clearRes(this._skin);
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.graphics = this._bitmap = new AutoBitmap();
			}
		}, {
			key: "_onDisplay",
			value: function _onDisplay(e) {
				if (this._isPlaying) {
					if (this._getBit(Laya.Const.DISPLAYED_INSTAGE)) this.play();else this.stop();
				} else if (this._autoPlay) {
					this.play();
				}
			}
		}, {
			key: "_skinLoaded",
			value: function _skinLoaded() {
				this._setClipChanged();
				this._sizeChanged();
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "changeClip",
			value: function changeClip() {
				this._clipChanged = false;
				if (!this._skin) return;
				var img = Laya.Loader.getRes(this._skin);
				if (img) {
					this.loadComplete(this._skin, img);
				} else {
					Laya.ILaya.loader.load(this._skin, Laya.Handler.create(this, this.loadComplete, [this._skin]));
				}
			}
		}, {
			key: "loadComplete",
			value: function loadComplete(url, img) {
				if (url === this._skin && img) {
					var w = this._clipWidth || Math.ceil(img.sourceWidth / this._clipX);
					var h = this._clipHeight || Math.ceil(img.sourceHeight / this._clipY);
					var key = this._skin + w + h;
					var clips = Laya.WeakObject.I.get(key);
					if (!Laya.Utils.isOkTextureList(clips)) {
						clips = null;
					}
					if (clips) this._sources = clips;else {
						this._sources = [];
						for (var i = 0; i < this._clipY; i++) {
							for (var j = 0; j < this._clipX; j++) {
								this._sources.push(Laya.Texture.createFromTexture(img, w * j, h * i, w, h));
							}
						}
						Laya.WeakObject.I.set(key, this._sources);
					}
					this.index = this._index;
					this.event(Laya.Event.LOADED);
					this.onCompResize();
				}
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				this.runCallLater(this.changeClip);
				return this._bitmap.width;
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				this.runCallLater(this.changeClip);
				return this._bitmap.height;
			}
		}, {
			key: "play",
			value: function play() {
				var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

				this._isPlaying = true;
				this.index = from;
				this._toIndex = to;
				this._index++;
				Laya.ILaya.timer.loop(this.interval, this, this._loop);
				this.on(Laya.Event.DISPLAY, this, this._onDisplay);
				this.on(Laya.Event.UNDISPLAY, this, this._onDisplay);
			}
		}, {
			key: "_loop",
			value: function _loop() {
				if (this._visible && this._sources) {
					this._index++;
					if (this._toIndex > -1 && this._index >= this._toIndex) this.stop();else if (this._index >= this._sources.length) this._index = 0;
					this.index = this._index;
				}
			}
		}, {
			key: "stop",
			value: function stop() {
				this._isPlaying = false;
				Laya.ILaya.timer.clear(this, this._loop);
				this.event(Laya.Event.COMPLETE);
			}
		}, {
			key: "_setClipChanged",
			value: function _setClipChanged() {
				if (!this._clipChanged) {
					this._clipChanged = true;
					this.callLater(this.changeClip);
				}
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (this._skin != value) {
					this._skin = value;
					if (value) {
						if (!Laya.Loader.getRes(value)) {
							Laya.ILaya.loader.load(this._skin, Laya.Handler.create(this, this._skinLoaded), null, Laya.Loader.IMAGE, 1);
						} else {
							this._skinLoaded();
						}
					} else {
						this._bitmap.source = null;
					}
				}
			}
		}, {
			key: "clipX",
			get: function get() {
				return this._clipX;
			},
			set: function set(value) {
				this._clipX = value || 1;
				this._setClipChanged();
			}
		}, {
			key: "clipY",
			get: function get() {
				return this._clipY;
			},
			set: function set(value) {
				this._clipY = value || 1;
				this._setClipChanged();
			}
		}, {
			key: "clipWidth",
			get: function get() {
				return this._clipWidth;
			},
			set: function set(value) {
				this._clipWidth = value;
				this._setClipChanged();
			}
		}, {
			key: "clipHeight",
			get: function get() {
				return this._clipHeight;
			},
			set: function set(value) {
				this._clipHeight = value;
				this._setClipChanged();
			}
		}, {
			key: "sources",
			get: function get() {
				return this._sources;
			},
			set: function set(value) {
				this._sources = value;
				this.index = this._index;
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "group",
			get: function get() {
				return this._group;
			},
			set: function set(value) {
				if (value && this._skin) Laya.Loader.setGroup(this._skin, value);
				this._group = value;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(Clip.prototype.__proto__ || Object.getPrototypeOf(Clip.prototype), "width", value, this);
				this._bitmap.width = value;
			},
			get: function get() {
				return _get(Clip.prototype.__proto__ || Object.getPrototypeOf(Clip.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(Clip.prototype.__proto__ || Object.getPrototypeOf(Clip.prototype), "height", value, this);
				this._bitmap.height = value;
			},
			get: function get() {
				return _get(Clip.prototype.__proto__ || Object.getPrototypeOf(Clip.prototype), "height", this);
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				if (this._bitmap.sizeGrid) return this._bitmap.sizeGrid.join(",");
				return null;
			},
			set: function set(value) {
				this._bitmap.sizeGrid = UIUtils.fillArray(Styles.defaultSizeGrid, value, Number);
			}
		}, {
			key: "index",
			get: function get() {
				return this._index;
			},
			set: function set(value) {
				this._index = value;
				this._bitmap && this._sources && (this._bitmap.source = this._sources[value]);
				this.event(Laya.Event.CHANGE);
			}
		}, {
			key: "total",
			get: function get() {
				this.runCallLater(this.changeClip);
				return this._sources ? this._sources.length : 0;
			}
		}, {
			key: "autoPlay",
			get: function get() {
				return this._autoPlay;
			},
			set: function set(value) {
				if (this._autoPlay != value) {
					this._autoPlay = value;
					value ? this.play() : this.stop();
				}
			}
		}, {
			key: "interval",
			get: function get() {
				return this._interval;
			},
			set: function set(value) {
				if (this._interval != value) {
					this._interval = value;
					if (this._isPlaying) this.play();
				}
			}
		}, {
			key: "isPlaying",
			get: function get() {
				return this._isPlaying;
			},
			set: function set(value) {
				this._isPlaying = value;
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.index = parseInt(value);else _set(Clip.prototype.__proto__ || Object.getPrototypeOf(Clip.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(Clip.prototype.__proto__ || Object.getPrototypeOf(Clip.prototype), "dataSource", this);
			}
		}, {
			key: "bitmap",
			get: function get() {
				return this._bitmap;
			}
		}]);

		return Clip;
	}(UIComponent);

	Laya.ILaya.regClass(Clip);
	Laya.ClassUtils.regClass("laya.ui.Clip", Clip);
	Laya.ClassUtils.regClass("Laya.Clip", Clip);

	var ColorPicker = function (_UIComponent5) {
		_inherits(ColorPicker, _UIComponent5);

		function ColorPicker() {
			_classCallCheck(this, ColorPicker);

			var _this12 = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).apply(this, arguments));

			_this12._gridSize = 11;
			_this12._bgColor = "#ffffff";
			_this12._borderColor = "#000000";
			_this12._inputColor = "#000000";
			_this12._inputBgColor = "#efefef";
			_this12._colors = [];
			_this12._selectedColor = "#000000";
			return _this12;
		}

		_createClass(ColorPicker, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), "destroy", this).call(this, destroyChild);
				this._colorPanel && this._colorPanel.destroy(destroyChild);
				this._colorButton && this._colorButton.destroy(destroyChild);
				this._colorPanel = null;
				this._colorTiles = null;
				this._colorBlock = null;
				this._colorInput = null;
				this._colorButton = null;
				this._colors = null;
				this.changeHandler = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._colorButton = new Button());
				this._colorPanel = new Box();
				this._colorPanel.size(230, 166);
				this._colorPanel.addChild(this._colorTiles = new Laya.Sprite());
				this._colorPanel.addChild(this._colorBlock = new Laya.Sprite());
				this._colorPanel.addChild(this._colorInput = new Laya.Input());
			}
		}, {
			key: "initialize",
			value: function initialize() {
				this._colorButton.on(Laya.Event.CLICK, this, this.onColorButtonClick);
				this._colorBlock.pos(5, 5);
				this._colorInput.pos(60, 5);
				this._colorInput.size(60, 20);
				this._colorInput.on(Laya.Event.CHANGE, this, this.onColorInputChange);
				this._colorInput.on(Laya.Event.KEY_DOWN, this, this.onColorFieldKeyDown);
				this._colorTiles.pos(5, 30);
				this._colorTiles.on(Laya.Event.MOUSE_MOVE, this, this.onColorTilesMouseMove);
				this._colorTiles.on(Laya.Event.CLICK, this, this.onColorTilesClick);
				this._colorTiles.size(20 * this._gridSize, 12 * this._gridSize);
				this._colorPanel.on(Laya.Event.MOUSE_DOWN, this, this.onPanelMouseDown);
				this.bgColor = this._bgColor;
			}
		}, {
			key: "onPanelMouseDown",
			value: function onPanelMouseDown(e) {
				e.stopPropagation();
			}
		}, {
			key: "changePanel",
			value: function changePanel() {
				this._panelChanged = false;
				var g = this._colorPanel.graphics;
				g.clear(true);
				g.drawRect(0, 0, 230, 166, this._bgColor, this._borderColor);
				this.drawBlock(this._selectedColor);
				this._colorInput.borderColor = this._borderColor;
				this._colorInput.bgColor = this._inputBgColor;
				this._colorInput.color = this._inputColor;
				g = this._colorTiles.graphics;
				g.clear(true);
				var mainColors = [0x000000, 0x333333, 0x666666, 0x999999, 0xCCCCCC, 0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0x00FFFF, 0xFF00FF];
				for (var i = 0; i < 12; i++) {
					for (var j = 0; j < 20; j++) {
						var color;
						if (j === 0) color = mainColors[i];else if (j === 1) color = 0x000000;else color = (((i * 3 + j / 6) % 3 << 0) + (i / 6 << 0) * 3) * 0x33 << 16 | j % 6 * 0x33 << 8 | (i << 0) % 6 * 0x33;
						var strColor = UIUtils.toColor(color);
						this._colors.push(strColor);
						var x = j * this._gridSize;
						var y = i * this._gridSize;
						g.drawRect(x, y, this._gridSize, this._gridSize, strColor, "#000000");
					}
				}
			}
		}, {
			key: "onColorButtonClick",
			value: function onColorButtonClick(e) {
				if (this._colorPanel.parent) this.close();else this.open();
			}
		}, {
			key: "open",
			value: function open() {
				var stage = Laya.ILaya.stage;
				var p = this.localToGlobal(new Laya.Point());
				var px = p.x + this._colorPanel.width <= stage.width ? p.x : stage.width - this._colorPanel.width;
				var py = p.y + this._colorButton.height;
				py = py + this._colorPanel.height <= stage.height ? py : p.y - this._colorPanel.height;
				this._colorPanel.pos(px, py);
				this._colorPanel.zOrder = 1001;
				stage.addChild(this._colorPanel);
				stage.on(Laya.Event.MOUSE_DOWN, this, this.removeColorBox);
			}
		}, {
			key: "close",
			value: function close() {
				Laya.ILaya.stage.off(Laya.Event.MOUSE_DOWN, this, this.removeColorBox);
				this._colorPanel.removeSelf();
			}
		}, {
			key: "removeColorBox",
			value: function removeColorBox() {
				var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.close();
			}
		}, {
			key: "onColorFieldKeyDown",
			value: function onColorFieldKeyDown(e) {
				if (e.keyCode == 13) {
					if (this._colorInput.text) this.selectedColor = this._colorInput.text;else this.selectedColor = null;
					this.close();
					e.stopPropagation();
				}
			}
		}, {
			key: "onColorInputChange",
			value: function onColorInputChange() {
				var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (this._colorInput.text) this.drawBlock(this._colorInput.text);else this.drawBlock("#FFFFFF");
			}
		}, {
			key: "onColorTilesClick",
			value: function onColorTilesClick(e) {
				this.selectedColor = this.getColorByMouse();
				this.close();
			}
		}, {
			key: "onColorTilesMouseMove",
			value: function onColorTilesMouseMove(e) {
				this._colorInput.focus = false;
				var color = this.getColorByMouse();
				this._colorInput.text = color;
				this.drawBlock(color);
			}
		}, {
			key: "getColorByMouse",
			value: function getColorByMouse() {
				var point = this._colorTiles.getMousePoint();
				var x = Math.floor(point.x / this._gridSize);
				var y = Math.floor(point.y / this._gridSize);
				return this._colors[y * 20 + x];
			}
		}, {
			key: "drawBlock",
			value: function drawBlock(color) {
				var g = this._colorBlock.graphics;
				g.clear(true);
				var showColor = color ? color : "#ffffff";
				g.drawRect(0, 0, 50, 20, showColor, this._borderColor);
				color || g.drawLine(0, 0, 50, 20, "#ff0000");
			}
		}, {
			key: "changeColor",
			value: function changeColor() {
				var g = this.graphics;
				g.clear(true);
				var showColor = this._selectedColor || "#000000";
				g.drawRect(0, 0, this._colorButton.width, this._colorButton.height, showColor);
			}
		}, {
			key: "_setPanelChanged",
			value: function _setPanelChanged() {
				if (!this._panelChanged) {
					this._panelChanged = true;
					this.callLater(this.changePanel);
				}
			}
		}, {
			key: "selectedColor",
			get: function get() {
				return this._selectedColor;
			},
			set: function set(value) {
				if (this._selectedColor != value) {
					this._selectedColor = this._colorInput.text = value;
					this.drawBlock(value);
					this.changeColor();
					this.changeHandler && this.changeHandler.runWith(this._selectedColor);
					this.event(Laya.Event.CHANGE, Laya.Event.EMPTY.setTo(Laya.Event.CHANGE, this, this));
				}
			}
		}, {
			key: "skin",
			get: function get() {
				return this._colorButton.skin;
			},
			set: function set(value) {
				this._colorButton.once(Laya.Event.LOADED, this, this.changeColor);
				this._colorButton.skin = value;
			}
		}, {
			key: "bgColor",
			get: function get() {
				return this._bgColor;
			},
			set: function set(value) {
				this._bgColor = value;
				this._setPanelChanged();
			}
		}, {
			key: "borderColor",
			get: function get() {
				return this._borderColor;
			},
			set: function set(value) {
				this._borderColor = value;
				this._setPanelChanged();
			}
		}, {
			key: "inputColor",
			get: function get() {
				return this._inputColor;
			},
			set: function set(value) {
				this._inputColor = value;
				this._setPanelChanged();
			}
		}, {
			key: "inputBgColor",
			get: function get() {
				return this._inputBgColor;
			},
			set: function set(value) {
				this._inputBgColor = value;
				this._setPanelChanged();
			}
		}]);

		return ColorPicker;
	}(UIComponent);

	Laya.ILaya.regClass(ColorPicker);
	Laya.ClassUtils.regClass("laya.ui.ColorPicker", ColorPicker);
	Laya.ClassUtils.regClass("Laya.ColorPicker", ColorPicker);

	var Label = function (_UIComponent6) {
		_inherits(Label, _UIComponent6);

		function Label() {
			var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

			_classCallCheck(this, Label);

			var _this13 = _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).call(this));

			_this13.text = text;
			return _this13;
		}

		_createClass(Label, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), "destroy", this).call(this, destroyChild);
				this._tf = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._tf = new Laya.Text());
			}
		}, {
			key: "changeText",
			value: function changeText(text) {
				this._tf.changeText(text);
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				return this._tf.width;
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				return this._tf.height;
			}
		}, {
			key: "text",
			get: function get() {
				return this._tf.text;
			},
			set: function set(value) {
				if (this._tf.text != value) {
					if (value) value = UIUtils.adptString(value + "");
					this._tf.text = value;
					this.event(Laya.Event.CHANGE);
					if (!this._width || !this._height) this.onCompResize();
				}
			}
		}, {
			key: "wordWrap",
			get: function get() {
				return this._tf.wordWrap;
			},
			set: function set(value) {
				this._tf.wordWrap = value;
			}
		}, {
			key: "color",
			get: function get() {
				return this._tf.color;
			},
			set: function set(value) {
				this._tf.color = value;
			}
		}, {
			key: "font",
			get: function get() {
				return this._tf.font;
			},
			set: function set(value) {
				this._tf.font = value;
			}
		}, {
			key: "align",
			get: function get() {
				return this._tf.align;
			},
			set: function set(value) {
				this._tf.align = value;
			}
		}, {
			key: "valign",
			get: function get() {
				return this._tf.valign;
			},
			set: function set(value) {
				this._tf.valign = value;
			}
		}, {
			key: "bold",
			get: function get() {
				return this._tf.bold;
			},
			set: function set(value) {
				this._tf.bold = value;
			}
		}, {
			key: "italic",
			get: function get() {
				return this._tf.italic;
			},
			set: function set(value) {
				this._tf.italic = value;
			}
		}, {
			key: "leading",
			get: function get() {
				return this._tf.leading;
			},
			set: function set(value) {
				this._tf.leading = value;
			}
		}, {
			key: "fontSize",
			get: function get() {
				return this._tf.fontSize;
			},
			set: function set(value) {
				this._tf.fontSize = value;
			}
		}, {
			key: "padding",
			get: function get() {
				return this._tf.padding.join(",");
			},
			set: function set(value) {
				this._tf.padding = UIUtils.fillArray(Styles.labelPadding, value, Number);
			}
		}, {
			key: "bgColor",
			get: function get() {
				return this._tf.bgColor;
			},
			set: function set(value) {
				this._tf.bgColor = value;
			}
		}, {
			key: "borderColor",
			get: function get() {
				return this._tf.borderColor;
			},
			set: function set(value) {
				this._tf.borderColor = value;
			}
		}, {
			key: "stroke",
			get: function get() {
				return this._tf.stroke;
			},
			set: function set(value) {
				this._tf.stroke = value;
			}
		}, {
			key: "strokeColor",
			get: function get() {
				return this._tf.strokeColor;
			},
			set: function set(value) {
				this._tf.strokeColor = value;
			}
		}, {
			key: "textField",
			get: function get() {
				return this._tf;
			}
		}, {
			key: "width",
			get: function get() {
				if (this._width || this._tf.text) return _get(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), "width", this);
				return 0;
			},
			set: function set(value) {
				_set(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), "width", value, this);
				this._tf.width = value;
			}
		}, {
			key: "height",
			get: function get() {
				if (this._height || this._tf.text) return _get(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), "height", this);
				return 0;
			},
			set: function set(value) {
				_set(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), "height", value, this);
				this._tf.height = value;
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.text = value + "";else _set(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), "dataSource", this);
			}
		}, {
			key: "overflow",
			get: function get() {
				return this._tf.overflow;
			},
			set: function set(value) {
				this._tf.overflow = value;
			}
		}, {
			key: "underline",
			get: function get() {
				return this._tf.underline;
			},
			set: function set(value) {
				this._tf.underline = value;
			}
		}, {
			key: "underlineColor",
			get: function get() {
				return this._tf.underlineColor;
			},
			set: function set(value) {
				this._tf.underlineColor = value;
			}
		}]);

		return Label;
	}(UIComponent);

	Laya.ILaya.regClass(Label);
	Laya.ClassUtils.regClass("laya.ui.Label", Label);
	Laya.ClassUtils.regClass("Laya.Label", Label);

	var Slider = function (_UIComponent7) {
		_inherits(Slider, _UIComponent7);

		function Slider() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, Slider);

			var _this14 = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

			_this14.isVertical = true;
			_this14.showLabel = true;
			_this14._max = 100;
			_this14._min = 0;
			_this14._tick = 1;
			_this14._value = 0;
			if (!Slider.label) {
				Slider.label = new Label();
			}
			_this14.skin = skin;
			return _this14;
		}

		_createClass(Slider, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "destroy", this).call(this, destroyChild);
				this._bg && this._bg.destroy(destroyChild);
				this._bar && this._bar.destroy(destroyChild);
				this._progress && this._progress.destroy(destroyChild);
				this._bg = null;
				this._bar = null;
				this._progress = null;
				this.changeHandler = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._bg = new Image());
				this.addChild(this._bar = new Button());
			}
		}, {
			key: "initialize",
			value: function initialize() {
				this._bar.on(Laya.Event.MOUSE_DOWN, this, this.onBarMouseDown);
				this._bg.sizeGrid = this._bar.sizeGrid = "4,4,4,4,0";
				if (this._progress) this._progress.sizeGrid = this._bar.sizeGrid;
				this.allowClickBack = true;
			}
		}, {
			key: "onBarMouseDown",
			value: function onBarMouseDown(e) {
				var Laya$1 = Laya.ILaya;
				this._globalSacle || (this._globalSacle = new Laya.Point());
				this._globalSacle.setTo(this.globalScaleX || 0.01, this.globalScaleY || 0.01);
				this._maxMove = this.isVertical ? this.height - this._bar.height : this.width - this._bar.width;
				this._tx = Laya$1.stage.mouseX;
				this._ty = Laya$1.stage.mouseY;
				Laya$1.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
				Laya$1.stage.once(Laya.Event.MOUSE_UP, this, this.mouseUp);
				Laya$1.stage.once(Laya.Event.MOUSE_OUT, this, this.mouseUp);
				this.showValueText();
			}
		}, {
			key: "showValueText",
			value: function showValueText() {
				if (this.showLabel) {
					var label = Slider.label;
					this.addChild(label);
					label.textField.changeText(this._value + "");
					if (this.isVertical) {
						label.x = this._bar._x + 20;
						label.y = (this._bar.height - label.height) * 0.5 + this._bar._y;
					} else {
						label.y = this._bar._y - 20;
						label.x = (this._bar.width - label.width) * 0.5 + this._bar._x;
					}
				}
			}
		}, {
			key: "hideValueText",
			value: function hideValueText() {
				Slider.label && Slider.label.removeSelf();
			}
		}, {
			key: "mouseUp",
			value: function mouseUp(e) {
				var stage = Laya.ILaya.stage;
				stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
				stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
				stage.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
				this.sendChangeEvent(Laya.Event.CHANGED);
				this.hideValueText();
			}
		}, {
			key: "mouseMove",
			value: function mouseMove(e) {
				var stage = Laya.ILaya.stage;
				var oldValue = this._value;
				if (this.isVertical) {
					this._bar.y += (stage.mouseY - this._ty) / this._globalSacle.y;
					if (this._bar._y > this._maxMove) this._bar.y = this._maxMove;else if (this._bar._y < 0) this._bar.y = 0;
					this._value = this._bar._y / this._maxMove * (this._max - this._min) + this._min;
					if (this._progress) this._progress.height = this._bar._y + 0.5 * this._bar.height;
				} else {
					this._bar.x += (stage.mouseX - this._tx) / this._globalSacle.x;
					if (this._bar._x > this._maxMove) this._bar.x = this._maxMove;else if (this._bar._x < 0) this._bar.x = 0;
					this._value = this._bar._x / this._maxMove * (this._max - this._min) + this._min;
					if (this._progress) this._progress.width = this._bar._x + 0.5 * this._bar.width;
				}
				this._tx = stage.mouseX;
				this._ty = stage.mouseY;
				if (this._tick != 0) {
					var pow = Math.pow(10, (this._tick + "").length - 1);
					this._value = Math.round(Math.round(this._value / this._tick) * this._tick * pow) / pow;
				}
				if (this._value != oldValue) {
					this.sendChangeEvent();
				}
				this.showValueText();
			}
		}, {
			key: "sendChangeEvent",
			value: function sendChangeEvent() {
				var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Laya.Event.CHANGE;

				this.event(type);
				this.changeHandler && this.changeHandler.runWith(this._value);
			}
		}, {
			key: "_skinLoaded",
			value: function _skinLoaded() {
				this._bg.skin = this._skin;
				this._bar.skin = this._skin.replace(".png", "$bar.png");
				var progressSkin = this._skin.replace(".png", "$progress.png");
				if (Laya.Loader.getRes(progressSkin)) {
					if (!this._progress) {
						this.addChild(this._progress = new Image());
						this._progress.sizeGrid = this._bar.sizeGrid;
						this.setChildIndex(this._progress, 1);
					}
					this._progress.skin = progressSkin;
				}
				this.setBarPoint();
				this.callLater(this.changeValue);
				this._sizeChanged();
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "setBarPoint",
			value: function setBarPoint() {
				if (this.isVertical) this._bar.x = Math.round((this._bg.width - this._bar.width) * 0.5);else this._bar.y = Math.round((this._bg.height - this._bar.height) * 0.5);
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				return Math.max(this._bg.width, this._bar.width);
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				return Math.max(this._bg.height, this._bar.height);
			}
		}, {
			key: "_sizeChanged",
			value: function _sizeChanged() {
				_get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "_sizeChanged", this).call(this);
				if (this.isVertical) this._bg.height = this.height;else this._bg.width = this.width;
				this.setBarPoint();
				this.changeValue();
			}
		}, {
			key: "setSlider",
			value: function setSlider(min, max, value) {
				this._value = -1;
				this._min = min;
				this._max = max > min ? max : min;
				this.value = value < min ? min : value > max ? max : value;
			}
		}, {
			key: "changeValue",
			value: function changeValue() {
				if (this.tick != 0) {
					var pow = Math.pow(10, (this._tick + "").length - 1);
					this._value = Math.round(Math.round(this._value / this._tick) * this._tick * pow) / pow;
				}
				this._value = this._value > this._max ? this._max : this._value < this._min ? this._min : this._value;
				var num = this._max - this._min;
				if (num === 0) num = 1;
				if (this.isVertical) {
					this._bar.y = (this._value - this._min) / num * (this.height - this._bar.height);
					if (this._progress) this._progress.height = this._bar._y + 0.5 * this._bar.height;
				} else {
					this._bar.x = (this._value - this._min) / num * (this.width - this._bar.width);
					if (this._progress) this._progress.width = this._bar._x + 0.5 * this._bar.width;
				}
			}
		}, {
			key: "onBgMouseDown",
			value: function onBgMouseDown(e) {
				var point = this._bg.getMousePoint();
				if (this.isVertical) this.value = point.y / (this.height - this._bar.height) * (this._max - this._min) + this._min;else this.value = point.x / (this.width - this._bar.width) * (this._max - this._min) + this._min;
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (this._skin != value) {
					this._skin = value;
					if (this._skin && !Laya.Loader.getRes(this._skin)) {
						Laya.ILaya.loader.load([this._skin, this._skin.replace(".png", "$bar.png")], Laya.Handler.create(this, this._skinLoaded));
					} else {
						this._skinLoaded();
					}
				}
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				return this._bg.sizeGrid;
			},
			set: function set(value) {
				this._bg.sizeGrid = value;
				this._bar.sizeGrid = value;
				if (this._progress) this._progress.sizeGrid = this._bar.sizeGrid;
			}
		}, {
			key: "tick",
			get: function get() {
				return this._tick;
			},
			set: function set(value) {
				if (this._tick != value) {
					this._tick = value;
					this.callLater(this.changeValue);
				}
			}
		}, {
			key: "max",
			get: function get() {
				return this._max;
			},
			set: function set(value) {
				if (this._max != value) {
					this._max = value;
					this.callLater(this.changeValue);
				}
			}
		}, {
			key: "min",
			get: function get() {
				return this._min;
			},
			set: function set(value) {
				if (this._min != value) {
					this._min = value;
					this.callLater(this.changeValue);
				}
			}
		}, {
			key: "value",
			get: function get() {
				return this._value;
			},
			set: function set(num) {
				if (this._value != num) {
					var oldValue = this._value;
					this._value = num;
					this.changeValue();
					if (this._value != oldValue) {
						this.sendChangeEvent();
					}
				}
			}
		}, {
			key: "allowClickBack",
			get: function get() {
				return this._allowClickBack;
			},
			set: function set(value) {
				if (this._allowClickBack != value) {
					this._allowClickBack = value;
					if (value) this._bg.on(Laya.Event.MOUSE_DOWN, this, this.onBgMouseDown);else this._bg.off(Laya.Event.MOUSE_DOWN, this, this.onBgMouseDown);
				}
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.value = Number(value);else _set(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), "dataSource", this);
			}
		}, {
			key: "bar",
			get: function get() {
				return this._bar;
			}
		}]);

		return Slider;
	}(UIComponent);

	Slider.label = null;
	Laya.ILaya.regClass(Slider);
	Laya.ClassUtils.regClass("laya.ui.Slider", Slider);
	Laya.ClassUtils.regClass("Laya.Slider", Slider);

	var ScrollBar = function (_UIComponent8) {
		_inherits(ScrollBar, _UIComponent8);

		function ScrollBar() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ScrollBar);

			var _this15 = _possibleConstructorReturn(this, (ScrollBar.__proto__ || Object.getPrototypeOf(ScrollBar)).call(this));

			_this15.rollRatio = 0.97;
			_this15.scaleBar = true;
			_this15.autoHide = false;
			_this15.elasticDistance = 0;
			_this15.elasticBackTime = 500;
			_this15._showButtons = UIConfig.showButtons;
			_this15._scrollSize = 1;
			_this15._thumbPercent = 1;
			_this15._lastOffset = 0;
			_this15._checkElastic = false;
			_this15._isElastic = false;
			_this15._hide = false;
			_this15._clickOnly = true;
			_this15._touchScrollEnable = UIConfig.touchScrollEnable;
			_this15._mouseWheelEnable = UIConfig.mouseWheelEnable;
			_this15.skin = skin;
			_this15.max = 1;
			return _this15;
		}

		_createClass(ScrollBar, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				this.stopScroll();
				this.target = null;
				_get(ScrollBar.prototype.__proto__ || Object.getPrototypeOf(ScrollBar.prototype), "destroy", this).call(this, destroyChild);
				this.upButton && this.upButton.destroy(destroyChild);
				this.downButton && this.downButton.destroy(destroyChild);
				this.slider && this.slider.destroy(destroyChild);
				this.upButton = this.downButton = null;
				this.slider = null;
				this.changeHandler = null;
				this._offsets = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this.slider = new Slider());
				this.addChild(this.upButton = new Button());
				this.addChild(this.downButton = new Button());
			}
		}, {
			key: "initialize",
			value: function initialize() {
				this.slider.showLabel = false;
				this.slider.tick = 0;
				this.slider.on(Laya.Event.CHANGE, this, this.onSliderChange);
				this.slider.setSlider(0, 0, 0);
				this.upButton.on(Laya.Event.MOUSE_DOWN, this, this.onButtonMouseDown);
				this.downButton.on(Laya.Event.MOUSE_DOWN, this, this.onButtonMouseDown);
			}
		}, {
			key: "onSliderChange",
			value: function onSliderChange() {
				if (this._value != this.slider.value) this.value = this.slider.value;
			}
		}, {
			key: "onButtonMouseDown",
			value: function onButtonMouseDown(e) {
				var isUp = e.currentTarget === this.upButton;
				this.slide(isUp);
				Laya.ILaya.timer.once(Styles.scrollBarDelayTime, this, this.startLoop, [isUp]);
				Laya.ILaya.stage.once(Laya.Event.MOUSE_UP, this, this.onStageMouseUp);
			}
		}, {
			key: "startLoop",
			value: function startLoop(isUp) {
				Laya.ILaya.timer.frameLoop(1, this, this.slide, [isUp]);
			}
		}, {
			key: "slide",
			value: function slide(isUp) {
				if (isUp) this.value -= this._scrollSize;else this.value += this._scrollSize;
			}
		}, {
			key: "onStageMouseUp",
			value: function onStageMouseUp(e) {
				Laya.ILaya.timer.clear(this, this.startLoop);
				Laya.ILaya.timer.clear(this, this.slide);
			}
		}, {
			key: "_skinLoaded",
			value: function _skinLoaded() {
				this.slider.skin = this._skin;
				this.callLater(this.changeScrollBar);
				this._sizeChanged();
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "changeScrollBar",
			value: function changeScrollBar() {
				this.upButton.visible = this._showButtons;
				this.downButton.visible = this._showButtons;
				if (this._showButtons) {
					this.upButton.skin = this._skin.replace(".png", "$up.png");
					this.downButton.skin = this._skin.replace(".png", "$down.png");
				}
				if (this.slider.isVertical) this.slider.y = this._showButtons ? this.upButton.height : 0;else this.slider.x = this._showButtons ? this.upButton.width : 0;
				this.resetPositions();
				this.repaint();
			}
		}, {
			key: "_sizeChanged",
			value: function _sizeChanged() {
				_get(ScrollBar.prototype.__proto__ || Object.getPrototypeOf(ScrollBar.prototype), "_sizeChanged", this).call(this);
				this.repaint();
				this.resetPositions();
				this.event(Laya.Event.CHANGE);
				this.changeHandler && this.changeHandler.runWith(this.value);
			}
		}, {
			key: "resetPositions",
			value: function resetPositions() {
				if (this.slider.isVertical) this.slider.height = this.height - (this._showButtons ? this.upButton.height + this.downButton.height : 0);else this.slider.width = this.width - (this._showButtons ? this.upButton.width + this.downButton.width : 0);
				this.resetButtonPosition();
			}
		}, {
			key: "resetButtonPosition",
			value: function resetButtonPosition() {
				if (this.slider.isVertical) this.downButton.y = this.slider._y + this.slider.height;else this.downButton.x = this.slider._x + this.slider.width;
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				if (this.slider.isVertical) return this.slider.width;
				return 100;
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				if (this.slider.isVertical) return 100;
				return this.slider.height;
			}
		}, {
			key: "setScroll",
			value: function setScroll(min, max, value) {
				this.runCallLater(this._sizeChanged);
				this.slider.setSlider(min, max, value);
				this.slider.bar.visible = max > 0;
				if (!this._hide && this.autoHide) this.visible = false;
			}
		}, {
			key: "onTargetMouseWheel",
			value: function onTargetMouseWheel(e) {
				this.value -= e.delta * this._scrollSize;
				this.target = this._target;
			}
		}, {
			key: "onTargetMouseDown",
			value: function onTargetMouseDown(e) {
				if (this.isLockedFun && !this.isLockedFun(e)) return;
				this.event(Laya.Event.END);
				this._clickOnly = true;
				this._lastOffset = 0;
				this._checkElastic = false;
				this._lastPoint || (this._lastPoint = new Laya.Point());
				this._lastPoint.setTo(Laya.ILaya.stage.mouseX, Laya.ILaya.stage.mouseY);
				Laya.ILaya.timer.clear(this, this.tweenMove);
				Laya.Tween.clearTween(this);
				Laya.ILaya.stage.once(Laya.Event.MOUSE_UP, this, this.onStageMouseUp2);
				Laya.ILaya.stage.once(Laya.Event.MOUSE_OUT, this, this.onStageMouseUp2);
				Laya.ILaya.timer.frameLoop(1, this, this.loop);
			}
		}, {
			key: "startDragForce",
			value: function startDragForce() {
				this._clickOnly = true;
				this._lastOffset = 0;
				this._checkElastic = false;
				this._lastPoint || (this._lastPoint = new Laya.Point());
				this._lastPoint.setTo(Laya.ILaya.stage.mouseX, Laya.ILaya.stage.mouseY);
				Laya.ILaya.timer.clear(this, this.tweenMove);
				Laya.Tween.clearTween(this);
				Laya.ILaya.stage.once(Laya.Event.MOUSE_UP, this, this.onStageMouseUp2);
				Laya.ILaya.stage.once(Laya.Event.MOUSE_OUT, this, this.onStageMouseUp2);
				Laya.ILaya.timer.frameLoop(1, this, this.loop);
			}
		}, {
			key: "cancelDragOp",
			value: function cancelDragOp() {
				Laya.ILaya.stage.off(Laya.Event.MOUSE_UP, this, this.onStageMouseUp2);
				Laya.ILaya.stage.off(Laya.Event.MOUSE_OUT, this, this.onStageMouseUp2);
				Laya.ILaya.timer.clear(this, this.tweenMove);
				Laya.ILaya.timer.clear(this, this.loop);
				this._target.mouseEnabled = true;
			}
		}, {
			key: "checkTriggers",
			value: function checkTriggers() {
				var isTweenMove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (this.value >= 0 && this.value - this._lastOffset <= 0) {
					if (this.triggerDownDragLimit && this.triggerDownDragLimit(isTweenMove)) {
						this.cancelDragOp();
						this.value = 0;
						return true;
					}
				}
				if (this.value <= this.max && this.value - this._lastOffset >= this.max) {
					if (this.triggerUpDragLimit && this.triggerUpDragLimit(isTweenMove)) {
						this.cancelDragOp();
						this.value = this.max;
						return true;
					}
				}
				return false;
			}
		}, {
			key: "startTweenMoveForce",
			value: function startTweenMoveForce(lastOffset) {
				this._lastOffset = lastOffset;
				Laya.ILaya.timer.frameLoop(1, this, this.tweenMove, [200]);
			}
		}, {
			key: "loop",
			value: function loop() {
				var mouseY = Laya.ILaya.stage.mouseY;
				var mouseX = Laya.ILaya.stage.mouseX;
				this._lastOffset = this.isVertical ? mouseY - this._lastPoint.y : mouseX - this._lastPoint.x;
				if (this._clickOnly) {
					if (Math.abs(this._lastOffset * (this.isVertical ? Laya.ILaya.stage._canvasTransform.getScaleY() : Laya.ILaya.stage._canvasTransform.getScaleX())) > 1) {
						this._clickOnly = false;
						if (this.checkTriggers()) return;
						this._offsets || (this._offsets = []);
						this._offsets.length = 0;
						this._target.mouseEnabled = false;
						if (!this.hide && this.autoHide) {
							this.alpha = 1;
							this.visible = true;
						}
						this.event(Laya.Event.START);
					} else return;
				} else {
					if (this.checkTriggers()) return;
				}
				this._offsets.push(this._lastOffset);
				this._lastPoint.x = mouseX;
				this._lastPoint.y = mouseY;
				if (this._lastOffset === 0) return;
				if (!this._checkElastic) {
					if (this.elasticDistance > 0) {
						if (!this._checkElastic && this._lastOffset != 0) {
							if (this._lastOffset > 0 && this._value <= this.min || this._lastOffset < 0 && this._value >= this.max) {
								this._isElastic = true;
								this._checkElastic = true;
							} else {
								this._isElastic = false;
							}
						}
					} else {
						this._checkElastic = true;
					}
				}
				if (this._isElastic) {
					if (this._value <= this.min) {
						if (this._lastOffset > 0) {
							this.value -= this._lastOffset * Math.max(0, 1 - (this.min - this._value) / this.elasticDistance);
						} else {
							this.value -= this._lastOffset * 0.5;
							if (this._value >= this.min) this._checkElastic = false;
						}
					} else if (this._value >= this.max) {
						if (this._lastOffset < 0) {
							this.value -= this._lastOffset * Math.max(0, 1 - (this._value - this.max) / this.elasticDistance);
						} else {
							this.value -= this._lastOffset * 0.5;
							if (this._value <= this.max) this._checkElastic = false;
						}
					}
				} else {
					this.value -= this._lastOffset;
				}
			}
		}, {
			key: "onStageMouseUp2",
			value: function onStageMouseUp2(e) {
				Laya.ILaya.stage.off(Laya.Event.MOUSE_UP, this, this.onStageMouseUp2);
				Laya.ILaya.stage.off(Laya.Event.MOUSE_OUT, this, this.onStageMouseUp2);
				Laya.ILaya.timer.clear(this, this.loop);
				if (this._clickOnly) {
					if (this._value >= this.min && this._value <= this.max) return;
				}
				this._target.mouseEnabled = true;
				if (this._isElastic) {
					if (this._value < this.min) {
						Laya.Tween.to(this, { value: this.min }, this.elasticBackTime, Laya.Ease.sineOut, Laya.Handler.create(this, this.elasticOver));
					} else if (this._value > this.max) {
						Laya.Tween.to(this, { value: this.max }, this.elasticBackTime, Laya.Ease.sineOut, Laya.Handler.create(this, this.elasticOver));
					}
				} else {
					if (!this._offsets) return;
					if (this._offsets.length < 1) {
						this._offsets[0] = this.isVertical ? Laya.ILaya.stage.mouseY - this._lastPoint.y : Laya.ILaya.stage.mouseX - this._lastPoint.x;
					}
					var offset = 0;
					var n = Math.min(this._offsets.length, 3);
					for (var i = 0; i < n; i++) {
						offset += this._offsets[this._offsets.length - 1 - i];
					}
					this._lastOffset = offset / n;
					offset = Math.abs(this._lastOffset);
					if (offset < 2) {
						this.event(Laya.Event.END);
						return;
					}
					if (offset > 250) this._lastOffset = this._lastOffset > 0 ? 250 : -250;
					var dis = Math.round(Math.abs(this.elasticDistance * (this._lastOffset / 150)));
					Laya.ILaya.timer.frameLoop(1, this, this.tweenMove, [dis]);
				}
			}
		}, {
			key: "elasticOver",
			value: function elasticOver() {
				this._isElastic = false;
				if (!this.hide && this.autoHide) {
					Laya.Tween.to(this, { alpha: 0 }, 500);
				}
				this.event(Laya.Event.END);
			}
		}, {
			key: "tweenMove",
			value: function tweenMove(maxDistance) {
				this._lastOffset *= this.rollRatio;
				if (this.checkTriggers(true)) {
					return;
				}
				var tarSpeed;
				if (maxDistance > 0) {
					if (this._lastOffset > 0 && this.value <= this.min) {
						this._isElastic = true;
						tarSpeed = -(this.min - maxDistance - this.value) * 0.5;
						if (this._lastOffset > tarSpeed) this._lastOffset = tarSpeed;
					} else if (this._lastOffset < 0 && this.value >= this.max) {
						this._isElastic = true;
						tarSpeed = -(this.max + maxDistance - this.value) * 0.5;
						if (this._lastOffset < tarSpeed) this._lastOffset = tarSpeed;
					}
				}
				this.value -= this._lastOffset;
				if (Math.abs(this._lastOffset) < 0.1) {
					Laya.ILaya.timer.clear(this, this.tweenMove);
					if (this._isElastic) {
						if (this._value < this.min) {
							Laya.Tween.to(this, { value: this.min }, this.elasticBackTime, Laya.Ease.sineOut, Laya.Handler.create(this, this.elasticOver));
						} else if (this._value > this.max) {
							Laya.Tween.to(this, { value: this.max }, this.elasticBackTime, Laya.Ease.sineOut, Laya.Handler.create(this, this.elasticOver));
						} else {
							this.elasticOver();
						}
						return;
					}
					this.event(Laya.Event.END);
					if (!this.hide && this.autoHide) {
						Laya.Tween.to(this, { alpha: 0 }, 500);
					}
				}
			}
		}, {
			key: "stopScroll",
			value: function stopScroll() {
				this.onStageMouseUp2(null);
				Laya.ILaya.timer.clear(this, this.tweenMove);
				Laya.Tween.clearTween(this);
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (value == " ") return;
				if (this._skin != value) {
					this._skin = value;
					if (this._skin && !Laya.Loader.getRes(this._skin)) {
						Laya.ILaya.loader.load([this._skin, this._skin.replace(".png", "$up.png"), this._skin.replace(".png", "$down.png"), this._skin.replace(".png", "$bar.png")], Laya.Handler.create(this, this._skinLoaded));
					} else {
						this._skinLoaded();
					}
				}
			}
		}, {
			key: "max",
			get: function get() {
				return this.slider.max;
			},
			set: function set(value) {
				this.slider.max = value;
			}
		}, {
			key: "min",
			get: function get() {
				return this.slider.min;
			},
			set: function set(value) {
				this.slider.min = value;
			}
		}, {
			key: "value",
			get: function get() {
				return this._value;
			},
			set: function set(v) {
				if (v !== this._value) {
					this._value = v;
					if (!this._isElastic) {
						if (this.slider["_value"] != v) {
							this.slider["_value"] = v;
							this.slider.changeValue();
						}
						this._value = this.slider["_value"];
					}
					this.event(Laya.Event.CHANGE);
					this.changeHandler && this.changeHandler.runWith(this._value);
				}
			}
		}, {
			key: "isVertical",
			get: function get() {
				return this.slider.isVertical;
			},
			set: function set(value) {
				this.slider.isVertical = value;
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				return this.slider.sizeGrid;
			},
			set: function set(value) {
				this.slider.sizeGrid = value;
			}
		}, {
			key: "scrollSize",
			get: function get() {
				return this._scrollSize;
			},
			set: function set(value) {
				this._scrollSize = value;
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.value = Number(value);else _set(ScrollBar.prototype.__proto__ || Object.getPrototypeOf(ScrollBar.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(ScrollBar.prototype.__proto__ || Object.getPrototypeOf(ScrollBar.prototype), "dataSource", this);
			}
		}, {
			key: "thumbPercent",
			get: function get() {
				return this._thumbPercent;
			},
			set: function set(value) {
				this.runCallLater(this.changeScrollBar);
				this.runCallLater(this._sizeChanged);
				value = value >= 1 ? 0.99 : value;
				this._thumbPercent = value;
				if (this.scaleBar) {
					if (this.slider.isVertical) this.slider.bar.height = Math.max(this.slider.height * value, Styles.scrollBarMinNum);else this.slider.bar.width = Math.max(this.slider.width * value, Styles.scrollBarMinNum);
				}
			}
		}, {
			key: "target",
			get: function get() {
				return this._target;
			},
			set: function set(value) {
				if (this._target) {
					this._target.off(Laya.Event.MOUSE_WHEEL, this, this.onTargetMouseWheel);
					this._target.off(Laya.Event.MOUSE_DOWN, this, this.onTargetMouseDown);
				}
				this._target = value;
				if (value) {
					this._mouseWheelEnable && this._target.on(Laya.Event.MOUSE_WHEEL, this, this.onTargetMouseWheel);
					this._touchScrollEnable && this._target.on(Laya.Event.MOUSE_DOWN, this, this.onTargetMouseDown);
				}
			}
		}, {
			key: "hide",
			get: function get() {
				return this._hide;
			},
			set: function set(value) {
				this._hide = value;
				this.visible = !value;
			}
		}, {
			key: "showButtons",
			get: function get() {
				return this._showButtons;
			},
			set: function set(value) {
				this._showButtons = value;
				this.callLater(this.changeScrollBar);
			}
		}, {
			key: "touchScrollEnable",
			get: function get() {
				return this._touchScrollEnable;
			},
			set: function set(value) {
				this._touchScrollEnable = value;
				this.target = this._target;
			}
		}, {
			key: "mouseWheelEnable",
			get: function get() {
				return this._mouseWheelEnable;
			},
			set: function set(value) {
				this._mouseWheelEnable = value;
				this.target = this._target;
			}
		}, {
			key: "lastOffset",
			get: function get() {
				return this._lastOffset;
			}
		}, {
			key: "tick",
			get: function get() {
				return this.slider.tick;
			},
			set: function set(value) {
				this.slider.tick = value;
			}
		}]);

		return ScrollBar;
	}(UIComponent);

	Laya.ILaya.regClass(ScrollBar);
	Laya.ClassUtils.regClass("laya.ui.ScrollBar", ScrollBar);
	Laya.ClassUtils.regClass("Laya.ScrollBar", ScrollBar);

	var VScrollBar = function (_ScrollBar) {
		_inherits(VScrollBar, _ScrollBar);

		function VScrollBar() {
			_classCallCheck(this, VScrollBar);

			return _possibleConstructorReturn(this, (VScrollBar.__proto__ || Object.getPrototypeOf(VScrollBar)).apply(this, arguments));
		}

		return VScrollBar;
	}(ScrollBar);

	Laya.ILaya.regClass(VScrollBar);
	Laya.ClassUtils.regClass("laya.ui.VScrollBar", VScrollBar);
	Laya.ClassUtils.regClass("Laya.VScrollBar", VScrollBar);

	var HScrollBar = function (_ScrollBar2) {
		_inherits(HScrollBar, _ScrollBar2);

		function HScrollBar() {
			_classCallCheck(this, HScrollBar);

			return _possibleConstructorReturn(this, (HScrollBar.__proto__ || Object.getPrototypeOf(HScrollBar)).apply(this, arguments));
		}

		_createClass(HScrollBar, [{
			key: "initialize",
			value: function initialize() {
				_get(HScrollBar.prototype.__proto__ || Object.getPrototypeOf(HScrollBar.prototype), "initialize", this).call(this);
				this.slider.isVertical = false;
			}
		}]);

		return HScrollBar;
	}(ScrollBar);

	Laya.ILaya.regClass(HScrollBar);
	Laya.ClassUtils.regClass("laya.ui.HScrollBar", HScrollBar);
	Laya.ClassUtils.regClass("Laya.HScrollBar", HScrollBar);

	var List = function (_Box) {
		_inherits(List, _Box);

		function List() {
			_classCallCheck(this, List);

			var _this18 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));

			_this18.selectEnable = false;
			_this18.totalPage = 0;
			_this18._$componentType = "List";
			_this18._repeatX = 0;
			_this18._repeatY = 0;
			_this18._repeatX2 = 0;
			_this18._repeatY2 = 0;
			_this18._spaceX = 0;
			_this18._spaceY = 0;
			_this18._cells = [];
			_this18._startIndex = 0;
			_this18._selectedIndex = -1;
			_this18._page = 0;
			_this18._isVertical = true;
			_this18._cellSize = 20;
			_this18._cellOffset = 0;
			_this18._createdLine = 0;
			_this18._offset = new Laya.Point();
			_this18._usedCache = null;
			_this18._elasticEnabled = false;
			_this18._preLen = 0;
			return _this18;
		}

		_createClass(List, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				this._content && this._content.destroy(destroyChild);
				this._scrollBar && this._scrollBar.destroy(destroyChild);
				_get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "destroy", this).call(this, destroyChild);
				this._content = null;
				this._scrollBar = null;
				this._itemRender = null;
				this._cells = null;
				this._array = null;
				this.selectHandler = this.renderHandler = this.mouseHandler = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._content = new Box());
			}
		}, {
			key: "onScrollStart",
			value: function onScrollStart() {
				this._usedCache || (this._usedCache = _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "cacheAs", this));
				_set(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "cacheAs", "none", this);
				this._scrollBar.once(Laya.Event.END, this, this.onScrollEnd);
			}
		}, {
			key: "onScrollEnd",
			value: function onScrollEnd() {
				_set(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "cacheAs", this._usedCache, this);
			}
		}, {
			key: "_removePreScrollBar",
			value: function _removePreScrollBar() {
				var preNode = this.removeChildByName("scrollBar");
				if (preNode) preNode.destroy(true);
			}
		}, {
			key: "changeCells",
			value: function changeCells() {
				this._cellChanged = false;
				if (this._itemRender) {
					this.scrollBar = this.getChildByName("scrollBar");
					var cell = this._getOneCell();
					var cellWidth = cell.width + this._spaceX || 1;
					var cellHeight = cell.height + this._spaceY || 1;
					if (this._width > 0) this._repeatX2 = this._isVertical ? Math.round(this._width / cellWidth) : Math.ceil(this._width / cellWidth);
					if (this._height > 0) this._repeatY2 = this._isVertical ? Math.ceil(this._height / cellHeight) : Math.round(this._height / cellHeight);
					var listWidth = this._width ? this._width : cellWidth * this.repeatX - this._spaceX;
					var listHeight = this._height ? this._height : cellHeight * this.repeatY - this._spaceY;
					this._cellSize = this._isVertical ? cellHeight : cellWidth;
					this._cellOffset = this._isVertical ? cellHeight * Math.max(this._repeatY2, this._repeatY) - listHeight - this._spaceY : cellWidth * Math.max(this._repeatX2, this._repeatX) - listWidth - this._spaceX;
					if (this._isVertical && this.vScrollBarSkin) this._scrollBar.height = listHeight;else if (!this._isVertical && this.hScrollBarSkin) this._scrollBar.width = listWidth;
					this.setContentSize(listWidth, listHeight);
					var numX = this._isVertical ? this.repeatX : this.repeatY;
					var numY = (this._isVertical ? this.repeatY : this.repeatX) + (this._scrollBar ? 1 : 0);
					this._createItems(0, numX, numY);
					this._createdLine = numY;
					if (this._array) {
						this.array = this._array;
						this.runCallLater(this.renderItems);
					}
				}
			}
		}, {
			key: "_getOneCell",
			value: function _getOneCell() {
				if (this._cells.length === 0) {
					var item = this.createItem();
					this._offset.setTo(item._x, item._y);
					if (this.cacheContent) return item;
					this._cells.push(item);
				}
				return this._cells[0];
			}
		}, {
			key: "_createItems",
			value: function _createItems(startY, numX, numY) {
				var box = this._content;
				var cell = this._getOneCell();
				var cellWidth = cell.width + this._spaceX;
				var cellHeight = cell.height + this._spaceY;
				if (this.cacheContent) {
					var cacheBox = new Box();
					cacheBox.cacheAs = "normal";
					cacheBox.pos((this._isVertical ? 0 : startY) * cellWidth, (this._isVertical ? startY : 0) * cellHeight);
					this._content.addChild(cacheBox);
					box = cacheBox;
				} else {
					var arr = [];
					for (var i = this._cells.length - 1; i > -1; i--) {
						var item = this._cells[i];
						item.removeSelf();
						arr.push(item);
					}
					this._cells.length = 0;
				}
				for (var k = startY; k < numY; k++) {
					for (var l = 0; l < numX; l++) {
						if (arr && arr.length) {
							cell = arr.pop();
						} else {
							cell = this.createItem();
						}
						cell.x = (this._isVertical ? l : k) * cellWidth - box._x;
						cell.y = (this._isVertical ? k : l) * cellHeight - box._y;
						cell.name = "item" + (k * numX + l);
						box.addChild(cell);
						this.addCell(cell);
					}
				}
			}
		}, {
			key: "createItem",
			value: function createItem() {
				var arr = [];
				if (typeof this._itemRender == "function") {
					var box = new this._itemRender();
				} else {
					box = Laya.SceneUtils.createComp(this._itemRender, null, null, arr);
				}
				if (arr.length == 0 && box["_watchMap"]) {
					var watchMap = box["_watchMap"];
					for (var name in watchMap) {
						var a = watchMap[name];
						for (var i = 0; i < a.length; i++) {
							var watcher = a[i];
							arr.push(watcher.comp, watcher.prop, watcher.value);
						}
					}
				}
				if (arr.length) box["_$bindData"] = arr;
				return box;
			}
		}, {
			key: "addCell",
			value: function addCell(cell) {
				cell.on(Laya.Event.CLICK, this, this.onCellMouse);
				cell.on(Laya.Event.RIGHT_CLICK, this, this.onCellMouse);
				cell.on(Laya.Event.MOUSE_OVER, this, this.onCellMouse);
				cell.on(Laya.Event.MOUSE_OUT, this, this.onCellMouse);
				cell.on(Laya.Event.MOUSE_DOWN, this, this.onCellMouse);
				cell.on(Laya.Event.MOUSE_UP, this, this.onCellMouse);
				this._cells.push(cell);
			}
		}, {
			key: "_afterInited",
			value: function _afterInited() {
				this.initItems();
			}
		}, {
			key: "initItems",
			value: function initItems() {
				if (!this._itemRender && this.getChildByName("item0") != null) {
					this.repeatX = 1;
					var count;
					count = 0;
					for (var i = 0; i < 10000; i++) {
						var cell = this.getChildByName("item" + i);
						if (cell) {
							this.addCell(cell);
							count++;
							continue;
						}
						break;
					}
					this.repeatY = count;
				}
			}
		}, {
			key: "setContentSize",
			value: function setContentSize(width, height) {
				this._content.width = width;
				this._content.height = height;
				if (this._scrollBar || this._offset.x != 0 || this._offset.y != 0) {
					this._content._style.scrollRect || (this._content.scrollRect = Laya.Rectangle.create());
					this._content._style.scrollRect.setTo(-this._offset.x, -this._offset.y, width, height);
					this._content.scrollRect = this._content.scrollRect;
				}
				this.event(Laya.Event.RESIZE);
			}
		}, {
			key: "onCellMouse",
			value: function onCellMouse(e) {
				if (e.type === Laya.Event.MOUSE_DOWN) this._isMoved = false;
				var cell = e.currentTarget;
				var index = this._startIndex + this._cells.indexOf(cell);
				if (index < 0) return;
				if (e.type === Laya.Event.CLICK || e.type === Laya.Event.RIGHT_CLICK) {
					if (this.selectEnable && !this._isMoved) this.selectedIndex = index;else this.changeCellState(cell, true, 0);
				} else if ((e.type === Laya.Event.MOUSE_OVER || e.type === Laya.Event.MOUSE_OUT) && this._selectedIndex !== index) {
					this.changeCellState(cell, e.type === Laya.Event.MOUSE_OVER, 0);
				}
				this.mouseHandler && this.mouseHandler.runWith([e, index]);
			}
		}, {
			key: "changeCellState",
			value: function changeCellState(cell, visible, index) {
				var selectBox = cell.getChildByName("selectBox");
				if (selectBox) {
					this.selectEnable = true;
					selectBox.visible = visible;
					selectBox.index = index;
				}
			}
		}, {
			key: "_sizeChanged",
			value: function _sizeChanged() {
				_get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "_sizeChanged", this).call(this);
				this.setContentSize(this.width, this.height);
				if (this._scrollBar) this.callLater(this.onScrollBarChange);
			}
		}, {
			key: "onScrollBarChange",
			value: function onScrollBarChange() {
				var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.runCallLater(this.changeCells);
				var scrollValue = this._scrollBar.value;
				var lineX = this._isVertical ? this.repeatX : this.repeatY;
				var lineY = this._isVertical ? this.repeatY : this.repeatX;
				var scrollLine = Math.floor(scrollValue / this._cellSize);
				if (!this.cacheContent) {
					var index = scrollLine * lineX;
					var num = 0;
					if (index > this._startIndex) {
						num = index - this._startIndex;
						var down = true;
						var toIndex = this._startIndex + lineX * (lineY + 1);
						this._isMoved = true;
					} else if (index < this._startIndex) {
						num = this._startIndex - index;
						down = false;
						toIndex = this._startIndex - 1;
						this._isMoved = true;
					}
					for (var i = 0; i < num; i++) {
						if (down) {
							var cell = this._cells.shift();
							this._cells[this._cells.length] = cell;
							var cellIndex = toIndex + i;
						} else {
							cell = this._cells.pop();
							this._cells.unshift(cell);
							cellIndex = toIndex - i;
						}
						var pos = Math.floor(cellIndex / lineX) * this._cellSize;
						this._isVertical ? cell.y = pos : cell.x = pos;
						this.renderItem(cell, cellIndex);
					}
					this._startIndex = index;
					this.changeSelectStatus();
				} else {
					num = lineY + 1;
					if (this._createdLine - scrollLine < num) {
						this._createItems(this._createdLine, lineX, this._createdLine + num);
						this.renderItems(this._createdLine * lineX, 0);
						this._createdLine += num;
					}
				}
				var r = this._content._style.scrollRect;
				if (this._isVertical) {
					r.y = scrollValue - this._offset.y;
					r.x = -this._offset.x;
				} else {
					r.y = -this._offset.y;
					r.x = scrollValue - this._offset.x;
				}
				this._content.scrollRect = r;
			}
		}, {
			key: "posCell",
			value: function posCell(cell, cellIndex) {
				if (!this._scrollBar) return;
				var lineX = this._isVertical ? this.repeatX : this.repeatY;
				var lineY = this._isVertical ? this.repeatY : this.repeatX;
				var pos = Math.floor(cellIndex / lineX) * this._cellSize;
				this._isVertical ? cell._y = pos : cell.x = pos;
			}
		}, {
			key: "changeSelectStatus",
			value: function changeSelectStatus() {
				for (var i = 0, n = this._cells.length; i < n; i++) {
					this.changeCellState(this._cells[i], this._selectedIndex === this._startIndex + i, 1);
				}
			}
		}, {
			key: "renderItems",
			value: function renderItems() {
				var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				for (var i = from, n = to || this._cells.length; i < n; i++) {
					this.renderItem(this._cells[i], this._startIndex + i);
				}
				this.changeSelectStatus();
			}
		}, {
			key: "renderItem",
			value: function renderItem(cell, index) {
				if (this._array && index >= 0 && index < this._array.length) {
					cell.visible = true;
					if (cell["_$bindData"]) {
						cell["_dataSource"] = this._array[index];
						this._bindData(cell, this._array[index]);
					} else cell.dataSource = this._array[index];
					if (!this.cacheContent) {
						this.posCell(cell, index);
					}
					if (this.hasListener(Laya.Event.RENDER)) this.event(Laya.Event.RENDER, [cell, index]);
					if (this.renderHandler) this.renderHandler.runWith([cell, index]);
				} else {
					cell.visible = false;
					cell.dataSource = null;
				}
			}
		}, {
			key: "_bindData",
			value: function _bindData(cell, data) {
				var arr = cell._$bindData;
				for (var i = 0, n = arr.length; i < n; i++) {
					var ele = arr[i++];
					var prop = arr[i++];
					var value = arr[i];
					var fun = UIUtils.getBindFun(value);
					ele[prop] = fun.call(this, data);
				}
			}
		}, {
			key: "updateArray",
			value: function updateArray(array) {
				this._array = array;
				var freshStart;
				if (this._array) {
					freshStart = this._preLen - this._startIndex;
					if (freshStart >= 0) this.renderItems(freshStart);
					this._preLen = this._array.length;
				}
				if (this._scrollBar) {
					var length = array.length;
					var numX = this._isVertical ? this.repeatX : this.repeatY;
					var numY = this._isVertical ? this.repeatY : this.repeatX;
					var lineCount = Math.ceil(length / numX);
					if (lineCount >= numY) {
						this._scrollBar.thumbPercent = numY / lineCount;
						this._scrollBar.slider["_max"] = (lineCount - numY) * this._cellSize + this._cellOffset;
					}
				}
			}
		}, {
			key: "refresh",
			value: function refresh() {
				this.array = this._array;
			}
		}, {
			key: "getItem",
			value: function getItem(index) {
				if (index > -1 && index < this._array.length) {
					return this._array[index];
				}
				return null;
			}
		}, {
			key: "changeItem",
			value: function changeItem(index, source) {
				if (index > -1 && index < this._array.length) {
					this._array[index] = source;
					if (index >= this._startIndex && index < this._startIndex + this._cells.length) {
						this.renderItem(this.getCell(index), index);
					}
				}
			}
		}, {
			key: "setItem",
			value: function setItem(index, source) {
				this.changeItem(index, source);
			}
		}, {
			key: "addItem",
			value: function addItem(souce) {
				this._array.push(souce);
				this.array = this._array;
			}
		}, {
			key: "addItemAt",
			value: function addItemAt(souce, index) {
				this._array.splice(index, 0, souce);
				this.array = this._array;
			}
		}, {
			key: "deleteItem",
			value: function deleteItem(index) {
				this._array.splice(index, 1);
				this.array = this._array;
			}
		}, {
			key: "getCell",
			value: function getCell(index) {
				this.runCallLater(this.changeCells);
				if (index > -1 && this._cells) {
					return this._cells[(index - this._startIndex) % this._cells.length];
				}
				return null;
			}
		}, {
			key: "scrollTo",
			value: function scrollTo(index) {
				if (this._scrollBar) {
					var numX = this._isVertical ? this.repeatX : this.repeatY;
					this._scrollBar.value = Math.floor(index / numX) * this._cellSize;
				} else {
					this.startIndex = index;
				}
			}
		}, {
			key: "tweenTo",
			value: function tweenTo(index) {
				var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
				var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (this._scrollBar) {
					this._scrollBar.stopScroll();
					var numX = this._isVertical ? this.repeatX : this.repeatY;
					Laya.Tween.to(this._scrollBar, { value: Math.floor(index / numX) * this._cellSize }, time, null, complete, 0, true);
				} else {
					this.startIndex = index;
					if (complete) complete.run();
				}
			}
		}, {
			key: "_setCellChanged",
			value: function _setCellChanged() {
				if (!this._cellChanged) {
					this._cellChanged = true;
					this.callLater(this.changeCells);
				}
			}
		}, {
			key: "commitMeasure",
			value: function commitMeasure() {
				this.runCallLater(this.changeCells);
			}
		}, {
			key: "cacheAs",
			set: function set(value) {
				_set(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "cacheAs", value, this);
				if (this._scrollBar) {
					this._usedCache = null;
					if (value !== "none") this._scrollBar.on(Laya.Event.START, this, this.onScrollStart);else this._scrollBar.off(Laya.Event.START, this, this.onScrollStart);
				}
			},
			get: function get() {
				return _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "cacheAs", this);
			}
		}, {
			key: "content",
			get: function get() {
				return this._content;
			}
		}, {
			key: "vScrollBarSkin",
			get: function get() {
				return this._scrollBar ? this._scrollBar.skin : null;
			},
			set: function set(value) {
				this._removePreScrollBar();
				var scrollBar = new VScrollBar();
				scrollBar.name = "scrollBar";
				scrollBar.right = 0;
				scrollBar.skin = value;
				scrollBar.elasticDistance = this._elasticEnabled ? 200 : 0;
				this.scrollBar = scrollBar;
				this.addChild(scrollBar);
				this._setCellChanged();
			}
		}, {
			key: "hScrollBarSkin",
			get: function get() {
				return this._scrollBar ? this._scrollBar.skin : null;
			},
			set: function set(value) {
				this._removePreScrollBar();
				var scrollBar = new HScrollBar();
				scrollBar.name = "scrollBar";
				scrollBar.bottom = 0;
				scrollBar.skin = value;
				scrollBar.elasticDistance = this._elasticEnabled ? 200 : 0;
				this.scrollBar = scrollBar;
				this.addChild(scrollBar);
				this._setCellChanged();
			}
		}, {
			key: "scrollBar",
			get: function get() {
				return this._scrollBar;
			},
			set: function set(value) {
				if (this._scrollBar != value) {
					this._scrollBar = value;
					if (value) {
						this._isVertical = this._scrollBar.isVertical;
						this.addChild(this._scrollBar);
						this._scrollBar.on(Laya.Event.CHANGE, this, this.onScrollBarChange);
					}
				}
			}
		}, {
			key: "itemRender",
			get: function get() {
				return this._itemRender;
			},
			set: function set(value) {
				if (this._itemRender != value) {
					this._itemRender = value;
					for (var i = this._cells.length - 1; i > -1; i--) {
						this._cells[i].destroy();
					}
					this._cells.length = 0;
					this._setCellChanged();
				}
			}
		}, {
			key: "width",
			set: function set(value) {
				if (value != this._width) {
					_set(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "width", value, this);
					this._setCellChanged();
				}
			},
			get: function get() {
				return _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				if (value != this._height) {
					_set(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "height", value, this);
					this._setCellChanged();
				}
			},
			get: function get() {
				return _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "height", this);
			}
		}, {
			key: "repeatX",
			get: function get() {
				return this._repeatX > 0 ? this._repeatX : this._repeatX2 > 0 ? this._repeatX2 : 1;
			},
			set: function set(value) {
				this._repeatX = value;
				this._setCellChanged();
			}
		}, {
			key: "repeatY",
			get: function get() {
				return this._repeatY > 0 ? this._repeatY : this._repeatY2 > 0 ? this._repeatY2 : 1;
			},
			set: function set(value) {
				this._repeatY = value;
				this._setCellChanged();
			}
		}, {
			key: "spaceX",
			get: function get() {
				return this._spaceX;
			},
			set: function set(value) {
				this._spaceX = value;
				this._setCellChanged();
			}
		}, {
			key: "spaceY",
			get: function get() {
				return this._spaceY;
			},
			set: function set(value) {
				this._spaceY = value;
				this._setCellChanged();
			}
		}, {
			key: "selectedIndex",
			get: function get() {
				return this._selectedIndex;
			},
			set: function set(value) {
				if (this._selectedIndex != value) {
					this._selectedIndex = value;
					this.changeSelectStatus();
					this.event(Laya.Event.CHANGE);
					this.selectHandler && this.selectHandler.runWith(value);
					this.startIndex = this._startIndex;
				}
			}
		}, {
			key: "selectedItem",
			get: function get() {
				return this._selectedIndex != -1 ? this._array[this._selectedIndex] : null;
			},
			set: function set(value) {
				this.selectedIndex = this._array.indexOf(value);
			}
		}, {
			key: "selection",
			get: function get() {
				return this.getCell(this._selectedIndex);
			},
			set: function set(value) {
				this.selectedIndex = this._startIndex + this._cells.indexOf(value);
			}
		}, {
			key: "startIndex",
			get: function get() {
				return this._startIndex;
			},
			set: function set(value) {
				this._startIndex = value > 0 ? value : 0;
				this.callLater(this.renderItems);
			}
		}, {
			key: "array",
			get: function get() {
				return this._array;
			},
			set: function set(value) {
				this.runCallLater(this.changeCells);
				this._array = value || [];
				this._preLen = this._array.length;
				var length = this._array.length;
				this.totalPage = Math.ceil(length / (this.repeatX * this.repeatY));
				this._selectedIndex = this._selectedIndex < length ? this._selectedIndex : length - 1;
				this.startIndex = this._startIndex;
				if (this._scrollBar) {
					this._scrollBar.stopScroll();
					var numX = this._isVertical ? this.repeatX : this.repeatY;
					var numY = this._isVertical ? this.repeatY : this.repeatX;
					var lineCount = Math.ceil(length / numX);
					var total = this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage;
					if (total > 1 && lineCount >= numY) {
						this._scrollBar.scrollSize = this._cellSize;
						this._scrollBar.thumbPercent = numY / lineCount;
						this._scrollBar.setScroll(0, (lineCount - numY) * this._cellSize + this._cellOffset, this._scrollBar.value);
						this._scrollBar.target = this._content;
					} else {
						this._scrollBar.setScroll(0, 0, 0);
						this._scrollBar.target = this._content;
					}
				}
			}
		}, {
			key: "page",
			get: function get() {
				return this._page;
			},
			set: function set(value) {
				this._page = value;
				if (this._array) {
					this._page = value > 0 ? value : 0;
					this._page = this._page < this.totalPage ? this._page : this.totalPage - 1;
					this.startIndex = this._page * this.repeatX * this.repeatY;
				}
			}
		}, {
			key: "length",
			get: function get() {
				return this._array ? this._array.length : 0;
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.selectedIndex = parseInt(value);else if (value instanceof Array) this.array = value;else _set(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), "dataSource", this);
			}
		}, {
			key: "cells",
			get: function get() {
				this.runCallLater(this.changeCells);
				return this._cells;
			}
		}, {
			key: "elasticEnabled",
			get: function get() {
				return this._elasticEnabled;
			},
			set: function set(value) {
				this._elasticEnabled = value;
				if (this._scrollBar) {
					this._scrollBar.elasticDistance = value ? 200 : 0;
				}
			}
		}]);

		return List;
	}(Box);

	Laya.ILaya.regClass(List);
	Laya.ClassUtils.regClass("laya.ui.List", List);
	Laya.ClassUtils.regClass("Laya.List", List);

	var ComboBox = function (_UIComponent9) {
		_inherits(ComboBox, _UIComponent9);

		function ComboBox() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			_classCallCheck(this, ComboBox);

			var _this19 = _possibleConstructorReturn(this, (ComboBox.__proto__ || Object.getPrototypeOf(ComboBox)).call(this));

			_this19._visibleNum = 6;
			_this19._itemColors = Styles.comboBoxItemColors;
			_this19._itemSize = 12;
			_this19._labels = [];
			_this19._selectedIndex = -1;
			_this19.itemRender = null;
			_this19.skin = skin;
			_this19.labels = labels;
			return _this19;
		}

		_createClass(ComboBox, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(ComboBox.prototype.__proto__ || Object.getPrototypeOf(ComboBox.prototype), "destroy", this).call(this, destroyChild);
				this._button && this._button.destroy(destroyChild);
				this._list && this._list.destroy(destroyChild);
				this._button = null;
				this._list = null;
				this._itemColors = null;
				this._labels = null;
				this._selectHandler = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._button = new Button());
				this._button.text.align = "left";
				this._button.labelPadding = "0,0,0,5";
				this._button.on(Laya.Event.MOUSE_DOWN, this, this.onButtonMouseDown);
			}
		}, {
			key: "_createList",
			value: function _createList() {
				this._list = new List();
				if (this._scrollBarSkin) this._list.vScrollBarSkin = this._scrollBarSkin;
				this._setListEvent(this._list);
			}
		}, {
			key: "_setListEvent",
			value: function _setListEvent(list) {
				this._list.selectEnable = true;
				this._list.on(Laya.Event.MOUSE_DOWN, this, this.onListDown);
				this._list.mouseHandler = Laya.Handler.create(this, this.onlistItemMouse, null, false);
				if (this._list.scrollBar) this._list.scrollBar.on(Laya.Event.MOUSE_DOWN, this, this.onScrollBarDown);
			}
		}, {
			key: "onListDown",
			value: function onListDown(e) {
				e.stopPropagation();
			}
		}, {
			key: "onScrollBarDown",
			value: function onScrollBarDown(e) {
				e.stopPropagation();
			}
		}, {
			key: "onButtonMouseDown",
			value: function onButtonMouseDown(e) {
				this.callLater(this.switchTo, [!this._isOpen]);
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				return this._button.width;
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				return this._button.height;
			}
		}, {
			key: "changeList",
			value: function changeList() {
				this._listChanged = false;
				var labelWidth = this.width - 2;
				var labelColor = this._itemColors[2];
				this._itemHeight = this._itemSize + 6;
				this._list.itemRender = this.itemRender || { type: "Box", child: [{ type: "Label", props: { name: "label", x: 1, padding: "3,3,3,3", width: labelWidth, height: this._itemHeight, fontSize: this._itemSize, color: labelColor } }] };
				this._list.repeatY = this._visibleNum;
				this._list.refresh();
			}
		}, {
			key: "onlistItemMouse",
			value: function onlistItemMouse(e, index) {
				var type = e.type;
				if (type === Laya.Event.MOUSE_OVER || type === Laya.Event.MOUSE_OUT) {
					if (this._isCustomList) return;
					var box = this._list.getCell(index);
					if (!box) return;
					var label = box.getChildByName("label");
					if (label) {
						if (type === Laya.Event.ROLL_OVER) {
							label.bgColor = this._itemColors[0];
							label.color = this._itemColors[1];
						} else {
							label.bgColor = null;
							label.color = this._itemColors[2];
						}
					}
				} else if (type === Laya.Event.CLICK) {
					this.selectedIndex = index;
					this.isOpen = false;
				}
			}
		}, {
			key: "switchTo",
			value: function switchTo(value) {
				this.isOpen = value;
			}
		}, {
			key: "changeOpen",
			value: function changeOpen() {
				this.isOpen = !this._isOpen;
			}
		}, {
			key: "changeItem",
			value: function changeItem() {
				this._itemChanged = false;
				this._listHeight = this._labels.length > 0 ? Math.min(this._visibleNum, this._labels.length) * this._itemHeight : this._itemHeight;
				if (!this._isCustomList) {
					var g = this._list.graphics;
					g.clear(true);
					g.drawRect(0, 0, this.width - 1, this._listHeight, this._itemColors[4], this._itemColors[3]);
				}
				var a = this._list.array || [];
				a.length = 0;
				for (var i = 0, n = this._labels.length; i < n; i++) {
					a.push({ label: this._labels[i] });
				}
				this._list.height = this._listHeight;
				this._list.array = a;
			}
		}, {
			key: "changeSelected",
			value: function changeSelected() {
				this._button.label = this.selectedLabel;
			}
		}, {
			key: "_onStageMouseWheel",
			value: function _onStageMouseWheel(e) {
				if (!this._list || this._list.contains(e.target)) return;
				this.removeList(null);
			}
		}, {
			key: "removeList",
			value: function removeList(e) {
				Laya.ILaya.stage.off(Laya.Event.MOUSE_DOWN, this, this.removeList);
				Laya.ILaya.stage.off(Laya.Event.MOUSE_WHEEL, this, this._onStageMouseWheel);
				this.isOpen = false;
			}
		}, {
			key: "skin",
			get: function get() {
				return this._button.skin;
			},
			set: function set(value) {
				if (this._button.skin != value) {
					this._button.skin = value;
					this._listChanged = true;
				}
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(ComboBox.prototype.__proto__ || Object.getPrototypeOf(ComboBox.prototype), "width", value, this);
				this._button.width = this._width;
				this._itemChanged = true;
				this._listChanged = true;
			},
			get: function get() {
				return _get(ComboBox.prototype.__proto__ || Object.getPrototypeOf(ComboBox.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(ComboBox.prototype.__proto__ || Object.getPrototypeOf(ComboBox.prototype), "height", value, this);
				this._button.height = this._height;
			},
			get: function get() {
				return _get(ComboBox.prototype.__proto__ || Object.getPrototypeOf(ComboBox.prototype), "height", this);
			}
		}, {
			key: "labels",
			get: function get() {
				return this._labels.join(",");
			},
			set: function set(value) {
				if (this._labels.length > 0) this.selectedIndex = -1;
				if (value) this._labels = value.split(",");else this._labels.length = 0;
				this._itemChanged = true;
			}
		}, {
			key: "selectedIndex",
			get: function get() {
				return this._selectedIndex;
			},
			set: function set(value) {
				if (this._selectedIndex != value) {
					this._selectedIndex = value;
					if (this._labels.length > 0) this.changeSelected();else this.callLater(this.changeSelected);
					this.event(Laya.Event.CHANGE, [Laya.Event.EMPTY.setTo(Laya.Event.CHANGE, this, this)]);
					this._selectHandler && this._selectHandler.runWith(this._selectedIndex);
				}
			}
		}, {
			key: "selectHandler",
			get: function get() {
				return this._selectHandler;
			},
			set: function set(value) {
				this._selectHandler = value;
			}
		}, {
			key: "selectedLabel",
			get: function get() {
				return this._selectedIndex > -1 && this._selectedIndex < this._labels.length ? this._labels[this._selectedIndex] : null;
			},
			set: function set(value) {
				this.selectedIndex = this._labels.indexOf(value);
			}
		}, {
			key: "visibleNum",
			get: function get() {
				return this._visibleNum;
			},
			set: function set(value) {
				this._visibleNum = value;
				this._listChanged = true;
			}
		}, {
			key: "itemColors",
			get: function get() {
				return String(this._itemColors);
			},
			set: function set(value) {
				this._itemColors = UIUtils.fillArray(this._itemColors, value, String);
				this._listChanged = true;
			}
		}, {
			key: "itemSize",
			get: function get() {
				return this._itemSize;
			},
			set: function set(value) {
				this._itemSize = value;
				this._listChanged = true;
			}
		}, {
			key: "isOpen",
			get: function get() {
				return this._isOpen;
			},
			set: function set(value) {
				if (this._isOpen != value) {
					this._isOpen = value;
					this._button.selected = this._isOpen;
					if (this._isOpen) {
						this._list || this._createList();
						this._listChanged && !this._isCustomList && this.changeList();
						this._itemChanged && this.changeItem();
						var p = this.localToGlobal(Laya.Point.TEMP.setTo(0, 0));
						var py = p.y + this._button.height;
						py = py + this._listHeight <= Laya.ILaya.stage.height ? py : p.y - this._listHeight;
						this._list.pos(p.x, py);
						this._list.zOrder = 1001;
						Laya.ILaya.stage.addChild(this._list);
						Laya.ILaya.stage.once(Laya.Event.MOUSE_DOWN, this, this.removeList);
						Laya.ILaya.stage.on(Laya.Event.MOUSE_WHEEL, this, this._onStageMouseWheel);
						this._list.selectedIndex = this._selectedIndex;
					} else {
						this._list && this._list.removeSelf();
					}
				}
			}
		}, {
			key: "scrollBarSkin",
			get: function get() {
				return this._scrollBarSkin;
			},
			set: function set(value) {
				this._scrollBarSkin = value;
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				return this._button.sizeGrid;
			},
			set: function set(value) {
				this._button.sizeGrid = value;
			}
		}, {
			key: "scrollBar",
			get: function get() {
				return this.list.scrollBar;
			}
		}, {
			key: "button",
			get: function get() {
				return this._button;
			}
		}, {
			key: "list",
			get: function get() {
				this._list || this._createList();
				return this._list;
			},
			set: function set(value) {
				if (value) {
					value.removeSelf();
					this._isCustomList = true;
					this._list = value;
					this._setListEvent(value);
					this._itemHeight = value.getCell(0).height + value.spaceY;
				}
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.selectedIndex = parseInt(value);else if (value instanceof Array) this.labels = value.join(",");else _set(ComboBox.prototype.__proto__ || Object.getPrototypeOf(ComboBox.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(ComboBox.prototype.__proto__ || Object.getPrototypeOf(ComboBox.prototype), "dataSource", this);
			}
		}, {
			key: "labelColors",
			get: function get() {
				return this._button.labelColors;
			},
			set: function set(value) {
				if (this._button.labelColors != value) {
					this._button.labelColors = value;
				}
			}
		}, {
			key: "labelPadding",
			get: function get() {
				return this._button.text.padding.join(",");
			},
			set: function set(value) {
				this._button.text.padding = UIUtils.fillArray(Styles.labelPadding, value, Number);
			}
		}, {
			key: "labelSize",
			get: function get() {
				return this._button.text.fontSize;
			},
			set: function set(value) {
				this._button.text.fontSize = value;
			}
		}, {
			key: "labelBold",
			get: function get() {
				return this._button.text.bold;
			},
			set: function set(value) {
				this._button.text.bold = value;
			}
		}, {
			key: "labelFont",
			get: function get() {
				return this._button.text.font;
			},
			set: function set(value) {
				this._button.text.font = value;
			}
		}, {
			key: "stateNum",
			get: function get() {
				return this._button.stateNum;
			},
			set: function set(value) {
				this._button.stateNum = value;
			}
		}]);

		return ComboBox;
	}(UIComponent);

	Laya.ILaya.regClass(ComboBox);
	Laya.ClassUtils.regClass("laya.ui.ComboBox", ComboBox);
	Laya.ClassUtils.regClass("Laya.ComboBox", ComboBox);

	var ProgressBar = function (_UIComponent10) {
		_inherits(ProgressBar, _UIComponent10);

		function ProgressBar() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ProgressBar);

			var _this20 = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this));

			_this20._value = 0.5;
			_this20.skin = skin;
			return _this20;
		}

		_createClass(ProgressBar, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(ProgressBar.prototype.__proto__ || Object.getPrototypeOf(ProgressBar.prototype), "destroy", this).call(this, destroyChild);
				this._bg && this._bg.destroy(destroyChild);
				this._bar && this._bar.destroy(destroyChild);
				this._bg = this._bar = null;
				this.changeHandler = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._bg = new Image());
				this.addChild(this._bar = new Image());
				this._bar._bitmap.autoCacheCmd = false;
			}
		}, {
			key: "_skinLoaded",
			value: function _skinLoaded() {
				this._bg.skin = this._skin;
				this._bar.skin = this._skin.replace(".png", "$bar.png");
				this.callLater(this.changeValue);
				this._sizeChanged();
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				return this._bg.width;
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				return this._bg.height;
			}
		}, {
			key: "changeValue",
			value: function changeValue() {
				if (this.sizeGrid) {
					var grid = this.sizeGrid.split(",");
					var left = Number(grid[3]);
					var right = Number(grid[1]);
					var max = this.width - left - right;
					var sw = max * this._value;
					this._bar.width = left + right + sw;
					this._bar.visible = this._bar.width > left + right;
				} else {
					this._bar.width = this.width * this._value;
				}
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (this._skin != value) {
					this._skin = value;
					if (this._skin && !Laya.Loader.getRes(this._skin)) {
						Laya.ILaya.loader.load(this._skin, Laya.Handler.create(this, this._skinLoaded), null, Laya.Loader.IMAGE, 1);
					} else {
						this._skinLoaded();
					}
				}
			}
		}, {
			key: "value",
			get: function get() {
				return this._value;
			},
			set: function set(num) {
				if (this._value != num) {
					num = num > 1 ? 1 : num < 0 ? 0 : num;
					this._value = num;
					this.callLater(this.changeValue);
					this.event(Laya.Event.CHANGE);
					this.changeHandler && this.changeHandler.runWith(num);
				}
			}
		}, {
			key: "bar",
			get: function get() {
				return this._bar;
			}
		}, {
			key: "bg",
			get: function get() {
				return this._bg;
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				return this._bg.sizeGrid;
			},
			set: function set(value) {
				this._bg.sizeGrid = this._bar.sizeGrid = value;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(ProgressBar.prototype.__proto__ || Object.getPrototypeOf(ProgressBar.prototype), "width", value, this);
				this._bg.width = this._width;
				this.callLater(this.changeValue);
			},
			get: function get() {
				return _get(ProgressBar.prototype.__proto__ || Object.getPrototypeOf(ProgressBar.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(ProgressBar.prototype.__proto__ || Object.getPrototypeOf(ProgressBar.prototype), "height", value, this);
				this._bg.height = this._height;
				this._bar.height = this._height;
			},
			get: function get() {
				return _get(ProgressBar.prototype.__proto__ || Object.getPrototypeOf(ProgressBar.prototype), "height", this);
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.value = Number(value);else _set(ProgressBar.prototype.__proto__ || Object.getPrototypeOf(ProgressBar.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(ProgressBar.prototype.__proto__ || Object.getPrototypeOf(ProgressBar.prototype), "dataSource", this);
			}
		}]);

		return ProgressBar;
	}(UIComponent);

	Laya.ILaya.regClass(ProgressBar);
	Laya.ClassUtils.regClass("laya.ui.ProgressBar", ProgressBar);
	Laya.ClassUtils.regClass("Laya.ProgressBar", ProgressBar);

	var Radio = function (_Button2) {
		_inherits(Radio, _Button2);

		function Radio() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			_classCallCheck(this, Radio);

			var _this21 = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, skin, label));

			_this21.toggle = false;
			_this21._autoSize = false;
			return _this21;
		}

		_createClass(Radio, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), "destroy", this).call(this, destroyChild);
				this._value = null;
			}
		}, {
			key: "preinitialize",
			value: function preinitialize() {
				_get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), "preinitialize", this).call(this);
				this.toggle = false;
				this._autoSize = false;
			}
		}, {
			key: "initialize",
			value: function initialize() {
				_get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), "initialize", this).call(this);
				this.createText();
				this._text.align = "left";
				this._text.valign = "top";
				this._text.width = 0;
				this.on(Laya.Event.CLICK, this, this.onClick);
			}
		}, {
			key: "onClick",
			value: function onClick(e) {
				this.selected = true;
			}
		}, {
			key: "value",
			get: function get() {
				return this._value != null ? this._value : this.label;
			},
			set: function set(obj) {
				this._value = obj;
			}
		}]);

		return Radio;
	}(Button);

	Laya.ILaya.regClass(Radio);
	Laya.ClassUtils.regClass("laya.ui.Radio", Radio);
	Laya.ClassUtils.regClass("Laya.Radio", Radio);

	var UIGroup = function (_Box2) {
		_inherits(UIGroup, _Box2);

		function UIGroup() {
			var labels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var skin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			_classCallCheck(this, UIGroup);

			var _this22 = _possibleConstructorReturn(this, (UIGroup.__proto__ || Object.getPrototypeOf(UIGroup)).call(this));

			_this22._selectedIndex = -1;
			_this22._direction = "horizontal";
			_this22._space = 0;
			_this22.skin = skin;
			_this22.labels = labels;
			return _this22;
		}

		_createClass(UIGroup, [{
			key: "preinitialize",
			value: function preinitialize() {
				this.mouseEnabled = true;
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(UIGroup.prototype.__proto__ || Object.getPrototypeOf(UIGroup.prototype), "destroy", this).call(this, destroyChild);
				this._items && (this._items.length = 0);
				this._items = null;
				this.selectHandler = null;
			}
		}, {
			key: "addItem",
			value: function addItem(item) {
				var autoLayOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				var display = item;
				var index = this._items.length;
				display.name = "item" + index;
				this.addChild(display);
				this.initItems();
				if (autoLayOut && index > 0) {
					var preItem = this._items[index - 1];
					if (this._direction == "horizontal") {
						display.x = preItem._x + preItem.width + this._space;
					} else {
						display.y = preItem._y + preItem.height + this._space;
					}
				} else {
					if (autoLayOut) {
						display.x = 0;
						display.y = 0;
					}
				}
				return index;
			}
		}, {
			key: "delItem",
			value: function delItem(item) {
				var autoLayOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				var index = this._items.indexOf(item);
				if (index != -1) {
					var display = item;
					this.removeChild(display);
					for (var i = index + 1, n = this._items.length; i < n; i++) {
						var child = this._items[i];
						child.name = "item" + (i - 1);
						if (autoLayOut) {
							if (this._direction == "horizontal") {
								child.x -= display.width + this._space;
							} else {
								child.y -= display.height + this._space;
							}
						}
					}
					this.initItems();
					if (this._selectedIndex > -1) {
						var newIndex;
						newIndex = this._selectedIndex < this._items.length ? this._selectedIndex : this._selectedIndex - 1;
						this._selectedIndex = -1;
						this.selectedIndex = newIndex;
					}
				}
			}
		}, {
			key: "_afterInited",
			value: function _afterInited() {
				this.initItems();
			}
		}, {
			key: "initItems",
			value: function initItems() {
				this._items || (this._items = []);
				this._items.length = 0;
				for (var i = 0; i < 10000; i++) {
					var item = this.getChildByName("item" + i);
					if (item == null) break;
					this._items.push(item);
					item.selected = i === this._selectedIndex;
					item.clickHandler = Laya.Handler.create(this, this.itemClick, [i], false);
				}
			}
		}, {
			key: "itemClick",
			value: function itemClick(index) {
				this.selectedIndex = index;
			}
		}, {
			key: "setSelect",
			value: function setSelect(index, selected) {
				if (this._items && index > -1 && index < this._items.length) this._items[index].selected = selected;
			}
		}, {
			key: "_skinLoaded",
			value: function _skinLoaded() {
				this._setLabelChanged();
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "createItem",
			value: function createItem(skin, label) {
				return null;
			}
		}, {
			key: "changeLabels",
			value: function changeLabels() {
				this._labelChanged = false;
				if (this._items) {
					var left = 0;
					for (var i = 0, n = this._items.length; i < n; i++) {
						var btn = this._items[i];
						this._skin && (btn.skin = this._skin);
						this._labelColors && (btn.labelColors = this._labelColors);
						this._labelSize && (btn.labelSize = this._labelSize);
						this._labelStroke && (btn.labelStroke = this._labelStroke);
						this._labelStrokeColor && (btn.labelStrokeColor = this._labelStrokeColor);
						this._strokeColors && (btn.strokeColors = this._strokeColors);
						this._labelBold && (btn.labelBold = this._labelBold);
						this._labelPadding && (btn.labelPadding = this._labelPadding);
						this._labelAlign && (btn.labelAlign = this._labelAlign);
						this._stateNum && (btn.stateNum = this._stateNum);
						this._labelFont && (btn.labelFont = this._labelFont);
						if (this._direction === "horizontal") {
							btn.y = 0;
							btn.x = left;
							left += btn.width + this._space;
						} else {
							btn.x = 0;
							btn.y = left;
							left += btn.height + this._space;
						}
					}
				}
				this._sizeChanged();
			}
		}, {
			key: "commitMeasure",
			value: function commitMeasure() {
				this.runCallLater(this.changeLabels);
			}
		}, {
			key: "_setLabelChanged",
			value: function _setLabelChanged() {
				if (!this._labelChanged) {
					this._labelChanged = true;
					this.callLater(this.changeLabels);
				}
			}
		}, {
			key: "selectedIndex",
			get: function get() {
				return this._selectedIndex;
			},
			set: function set(value) {
				if (this._selectedIndex != value) {
					this.setSelect(this._selectedIndex, false);
					this._selectedIndex = value;
					this.setSelect(value, true);
					this.event(Laya.Event.CHANGE);
					this.selectHandler && this.selectHandler.runWith(this._selectedIndex);
				}
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (this._skin != value) {
					this._skin = value;
					if (this._skin && !Laya.Loader.getRes(this._skin)) {
						Laya.ILaya.loader.load(this._skin, Laya.Handler.create(this, this._skinLoaded), null, Laya.Loader.IMAGE, 1);
					} else {
						this._skinLoaded();
					}
				}
			}
		}, {
			key: "labels",
			get: function get() {
				return this._labels;
			},
			set: function set(value) {
				if (this._labels != value) {
					this._labels = value;
					this.removeChildren();
					this._setLabelChanged();
					if (this._labels) {
						var a = this._labels.split(",");
						for (var i = 0, n = a.length; i < n; i++) {
							var item = this.createItem(this._skin, a[i]);
							item.name = "item" + i;
							this.addChild(item);
						}
					}
					this.initItems();
				}
			}
		}, {
			key: "labelColors",
			get: function get() {
				return this._labelColors;
			},
			set: function set(value) {
				if (this._labelColors != value) {
					this._labelColors = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "labelStroke",
			get: function get() {
				return this._labelStroke;
			},
			set: function set(value) {
				if (this._labelStroke != value) {
					this._labelStroke = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "labelStrokeColor",
			get: function get() {
				return this._labelStrokeColor;
			},
			set: function set(value) {
				if (this._labelStrokeColor != value) {
					this._labelStrokeColor = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "strokeColors",
			get: function get() {
				return this._strokeColors;
			},
			set: function set(value) {
				if (this._strokeColors != value) {
					this._strokeColors = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "labelSize",
			get: function get() {
				return this._labelSize;
			},
			set: function set(value) {
				if (this._labelSize != value) {
					this._labelSize = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "stateNum",
			get: function get() {
				return this._stateNum;
			},
			set: function set(value) {
				if (this._stateNum != value) {
					this._stateNum = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "labelBold",
			get: function get() {
				return this._labelBold;
			},
			set: function set(value) {
				if (this._labelBold != value) {
					this._labelBold = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "labelFont",
			get: function get() {
				return this._labelFont;
			},
			set: function set(value) {
				if (this._labelFont != value) {
					this._labelFont = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "labelPadding",
			get: function get() {
				return this._labelPadding;
			},
			set: function set(value) {
				if (this._labelPadding != value) {
					this._labelPadding = value;
					this._setLabelChanged();
				}
			}
		}, {
			key: "direction",
			get: function get() {
				return this._direction;
			},
			set: function set(value) {
				this._direction = value;
				this._setLabelChanged();
			}
		}, {
			key: "space",
			get: function get() {
				return this._space;
			},
			set: function set(value) {
				this._space = value;
				this._setLabelChanged();
			}
		}, {
			key: "items",
			get: function get() {
				return this._items;
			}
		}, {
			key: "selection",
			get: function get() {
				return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null;
			},
			set: function set(value) {
				this.selectedIndex = this._items.indexOf(value);
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') this.selectedIndex = parseInt(value);else if (value instanceof Array) this.labels = value.join(",");else _set(UIGroup.prototype.__proto__ || Object.getPrototypeOf(UIGroup.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(UIGroup.prototype.__proto__ || Object.getPrototypeOf(UIGroup.prototype), "dataSource", this);
			}
		}]);

		return UIGroup;
	}(Box);

	Laya.ILaya.regClass(UIGroup);
	Laya.ClassUtils.regClass("laya.ui.UIGroup", UIGroup);
	Laya.ClassUtils.regClass("Laya.UIGroup", UIGroup);

	var RadioGroup = function (_UIGroup) {
		_inherits(RadioGroup, _UIGroup);

		function RadioGroup() {
			_classCallCheck(this, RadioGroup);

			return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
		}

		_createClass(RadioGroup, [{
			key: "createItem",
			value: function createItem(skin, label) {
				return new Radio(skin, label);
			}
		}]);

		return RadioGroup;
	}(UIGroup);

	Laya.ILaya.regClass(RadioGroup);
	Laya.ClassUtils.regClass("laya.ui.RadioGroup", RadioGroup);
	Laya.ClassUtils.regClass("Laya.RadioGroup", RadioGroup);

	var Tab = function (_UIGroup2) {
		_inherits(Tab, _UIGroup2);

		function Tab() {
			_classCallCheck(this, Tab);

			return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
		}

		_createClass(Tab, [{
			key: "createItem",
			value: function createItem(skin, label) {
				return new Button(skin, label);
			}
		}]);

		return Tab;
	}(UIGroup);

	Laya.ILaya.regClass(Tab);
	Laya.ClassUtils.regClass("laya.ui.Tab", Tab);
	Laya.ClassUtils.regClass("Laya.Tab", Tab);

	var ViewStack = function (_Box3) {
		_inherits(ViewStack, _Box3);

		function ViewStack() {
			_classCallCheck(this, ViewStack);

			var _this25 = _possibleConstructorReturn(this, (ViewStack.__proto__ || Object.getPrototypeOf(ViewStack)).apply(this, arguments));

			_this25._setIndexHandler = Laya.Handler.create(_this25, _this25.setIndex, null, false);
			return _this25;
		}

		_createClass(ViewStack, [{
			key: "setItems",
			value: function setItems(views) {
				this.removeChildren();
				var index = 0;
				for (var i = 0, n = views.length; i < n; i++) {
					var item = views[i];
					if (item) {
						item.name = "item" + index;
						this.addChild(item);
						index++;
					}
				}
				this.initItems();
			}
		}, {
			key: "addItem",
			value: function addItem(view) {
				view.name = "item" + this._items.length;
				this.addChild(view);
				this.initItems();
			}
		}, {
			key: "_afterInited",
			value: function _afterInited() {
				this.initItems();
			}
		}, {
			key: "initItems",
			value: function initItems() {
				this._items = [];
				for (var i = 0; i < 10000; i++) {
					var item = this.getChildByName("item" + i);
					if (item == null) {
						break;
					}
					this._items.push(item);
					item.visible = i == this._selectedIndex;
				}
			}
		}, {
			key: "setSelect",
			value: function setSelect(index, selected) {
				if (this._items && index > -1 && index < this._items.length) {
					this._items[index].visible = selected;
				}
			}
		}, {
			key: "setIndex",
			value: function setIndex(index) {
				this.selectedIndex = index;
			}
		}, {
			key: "selectedIndex",
			get: function get() {
				return this._selectedIndex;
			},
			set: function set(value) {
				if (this._selectedIndex != value) {
					this.setSelect(this._selectedIndex, false);
					this._selectedIndex = value;
					this.setSelect(this._selectedIndex, true);
				}
			}
		}, {
			key: "selection",
			get: function get() {
				return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null;
			},
			set: function set(value) {
				this.selectedIndex = this._items.indexOf(value);
			}
		}, {
			key: "setIndexHandler",
			get: function get() {
				return this._setIndexHandler;
			},
			set: function set(value) {
				this._setIndexHandler = value;
			}
		}, {
			key: "items",
			get: function get() {
				return this._items;
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				if (typeof value == 'number' || typeof value == 'string') {
					this.selectedIndex = parseInt(value);
				} else {
					for (var prop in this._dataSource) {
						if (prop in this) {
							this[prop] = this._dataSource[prop];
						}
					}
				}
			},
			get: function get() {
				return _get(ViewStack.prototype.__proto__ || Object.getPrototypeOf(ViewStack.prototype), "dataSource", this);
			}
		}]);

		return ViewStack;
	}(Box);

	Laya.ILaya.regClass(ViewStack);
	Laya.ClassUtils.regClass("laya.ui.ViewStack", ViewStack);
	Laya.ClassUtils.regClass("Laya.ViewStack", ViewStack);

	var TextInput = function (_Label) {
		_inherits(TextInput, _Label);

		function TextInput() {
			var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

			_classCallCheck(this, TextInput);

			var _this26 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this));

			_this26.text = text;
			_this26.skin = _this26.skin;
			return _this26;
		}

		_createClass(TextInput, [{
			key: "preinitialize",
			value: function preinitialize() {
				this.mouseEnabled = true;
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(TextInput.prototype.__proto__ || Object.getPrototypeOf(TextInput.prototype), "destroy", this).call(this, destroyChild);
				this._bg && this._bg.destroy();
				this._bg = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._tf = new Laya.Input());
				this._tf.padding = Styles.inputLabelPadding;
				this._tf.on(Laya.Event.INPUT, this, this._onInput);
				this._tf.on(Laya.Event.ENTER, this, this._onEnter);
				this._tf.on(Laya.Event.BLUR, this, this._onBlur);
				this._tf.on(Laya.Event.FOCUS, this, this._onFocus);
			}
		}, {
			key: "_onFocus",
			value: function _onFocus() {
				this.event(Laya.Event.FOCUS, this);
			}
		}, {
			key: "_onBlur",
			value: function _onBlur() {
				this.event(Laya.Event.BLUR, this);
			}
		}, {
			key: "_onInput",
			value: function _onInput() {
				this.event(Laya.Event.INPUT, this);
			}
		}, {
			key: "_onEnter",
			value: function _onEnter() {
				this.event(Laya.Event.ENTER, this);
			}
		}, {
			key: "initialize",
			value: function initialize() {
				this.width = 128;
				this.height = 22;
			}
		}, {
			key: "_skinLoaded",
			value: function _skinLoaded() {
				this._bg || (this.graphics = this._bg = new AutoBitmap());
				this._bg.source = Laya.Loader.getRes(this._skin);
				this._width && (this._bg.width = this._width);
				this._height && (this._bg.height = this._height);
				this._sizeChanged();
				this.event(Laya.Event.LOADED);
			}
		}, {
			key: "select",
			value: function select() {
				this._tf.select();
			}
		}, {
			key: "setSelection",
			value: function setSelection(startIndex, endIndex) {
				this._tf.setSelection(startIndex, endIndex);
			}
		}, {
			key: "bg",
			get: function get() {
				return this._bg;
			},
			set: function set(value) {
				this.graphics = this._bg = value;
			}
		}, {
			key: "skin",
			get: function get() {
				return this._skin;
			},
			set: function set(value) {
				if (this._skin != value) {
					this._skin = value;
					if (this._skin && !Laya.Loader.getRes(this._skin)) {
						Laya.ILaya.loader.load(this._skin, Laya.Handler.create(this, this._skinLoaded), null, Laya.Loader.IMAGE, 1);
					} else {
						this._skinLoaded();
					}
				}
			}
		}, {
			key: "sizeGrid",
			get: function get() {
				return this._bg && this._bg.sizeGrid ? this._bg.sizeGrid.join(",") : null;
			},
			set: function set(value) {
				this._bg || (this.graphics = this._bg = new AutoBitmap());
				this._bg.sizeGrid = UIUtils.fillArray(Styles.defaultSizeGrid, value, Number);
			}
		}, {
			key: "text",
			set: function set(value) {
				if (this._tf.text != value) {
					value = value + "";
					this._tf.text = value;
					this.event(Laya.Event.CHANGE);
				}
			},
			get: function get() {
				return _get(TextInput.prototype.__proto__ || Object.getPrototypeOf(TextInput.prototype), "text", this);
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(TextInput.prototype.__proto__ || Object.getPrototypeOf(TextInput.prototype), "width", value, this);
				this._bg && (this._bg.width = value);
			},
			get: function get() {
				return _get(TextInput.prototype.__proto__ || Object.getPrototypeOf(TextInput.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(TextInput.prototype.__proto__ || Object.getPrototypeOf(TextInput.prototype), "height", value, this);
				this._bg && (this._bg.height = value);
			},
			get: function get() {
				return _get(TextInput.prototype.__proto__ || Object.getPrototypeOf(TextInput.prototype), "height", this);
			}
		}, {
			key: "multiline",
			get: function get() {
				return this._tf.multiline;
			},
			set: function set(value) {
				this._tf.multiline = value;
			}
		}, {
			key: "editable",
			set: function set(value) {
				this._tf.editable = value;
			},
			get: function get() {
				return this._tf.editable;
			}
		}, {
			key: "restrict",
			get: function get() {
				return this._tf.restrict;
			},
			set: function set(pattern) {
				this._tf.restrict = pattern;
			}
		}, {
			key: "prompt",
			get: function get() {
				return this._tf.prompt;
			},
			set: function set(value) {
				this._tf.prompt = value;
			}
		}, {
			key: "promptColor",
			get: function get() {
				return this._tf.promptColor;
			},
			set: function set(value) {
				this._tf.promptColor = value;
			}
		}, {
			key: "maxChars",
			get: function get() {
				return this._tf.maxChars;
			},
			set: function set(value) {
				this._tf.maxChars = value;
			}
		}, {
			key: "focus",
			get: function get() {
				return this._tf.focus;
			},
			set: function set(value) {
				this._tf.focus = value;
			}
		}, {
			key: "type",
			get: function get() {
				return this._tf.type;
			},
			set: function set(value) {
				this._tf.type = value;
			}
		}]);

		return TextInput;
	}(Label);

	Laya.ILaya.regClass(TextInput);
	Laya.ClassUtils.regClass("laya.ui.TextInput", TextInput);
	Laya.ClassUtils.regClass("Laya.TextInput", TextInput);

	var TextArea = function (_TextInput) {
		_inherits(TextArea, _TextInput);

		function TextArea() {
			var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

			_classCallCheck(this, TextArea);

			var _this27 = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, text));

			_this27.on(Laya.Event.CHANGE, _this27, _this27._onTextChange);
			return _this27;
		}

		_createClass(TextArea, [{
			key: "_onTextChange",
			value: function _onTextChange() {
				this.callLater(this.changeScroll);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				this._vScrollBar && this._vScrollBar.destroy();
				this._hScrollBar && this._hScrollBar.destroy();
				this._vScrollBar = null;
				this._hScrollBar = null;
				_get(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "destroy", this).call(this, destroyChild);
			}
		}, {
			key: "initialize",
			value: function initialize() {
				this.width = 180;
				this.height = 150;
				this._tf.wordWrap = true;
				this.multiline = true;
			}
		}, {
			key: "onVBarChanged",
			value: function onVBarChanged(e) {
				if (this._tf.scrollY != this._vScrollBar.value) {
					this._tf.scrollY = this._vScrollBar.value;
				}
			}
		}, {
			key: "onHBarChanged",
			value: function onHBarChanged(e) {
				if (this._tf.scrollX != this._hScrollBar.value) {
					this._tf.scrollX = this._hScrollBar.value;
				}
			}
		}, {
			key: "changeScroll",
			value: function changeScroll() {
				var vShow = this._vScrollBar && this._tf.maxScrollY > 0;
				var hShow = this._hScrollBar && this._tf.maxScrollX > 0;
				var showWidth = vShow ? this._width - this._vScrollBar.width : this._width;
				var showHeight = hShow ? this._height - this._hScrollBar.height : this._height;
				var padding = this._tf.padding || Styles.labelPadding;
				this._tf.width = showWidth;
				this._tf.height = showHeight;
				if (this._vScrollBar) {
					this._vScrollBar.x = this._width - this._vScrollBar.width - padding[2];
					this._vScrollBar.y = padding[1];
					this._vScrollBar.height = this._height - (hShow ? this._hScrollBar.height : 0) - padding[1] - padding[3];
					this._vScrollBar.scrollSize = 1;
					this._vScrollBar.thumbPercent = showHeight / Math.max(this._tf.textHeight, showHeight);
					this._vScrollBar.setScroll(1, this._tf.maxScrollY, this._tf.scrollY);
					this._vScrollBar.visible = vShow;
				}
				if (this._hScrollBar) {
					this._hScrollBar.x = padding[0];
					this._hScrollBar.y = this._height - this._hScrollBar.height - padding[3];
					this._hScrollBar.width = this._width - (vShow ? this._vScrollBar.width : 0) - padding[0] - padding[2];
					this._hScrollBar.scrollSize = Math.max(showWidth * 0.033, 1);
					this._hScrollBar.thumbPercent = showWidth / Math.max(this._tf.textWidth, showWidth);
					this._hScrollBar.setScroll(0, this.maxScrollX, this.scrollX);
					this._hScrollBar.visible = hShow;
				}
			}
		}, {
			key: "scrollTo",
			value: function scrollTo(y) {
				this.commitMeasure();
				this._tf.scrollY = y;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "width", value, this);
				this.callLater(this.changeScroll);
			},
			get: function get() {
				return _get(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "height", value, this);
				this.callLater(this.changeScroll);
			},
			get: function get() {
				return _get(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "height", this);
			}
		}, {
			key: "vScrollBarSkin",
			get: function get() {
				return this._vScrollBar ? this._vScrollBar.skin : null;
			},
			set: function set(value) {
				if (this._vScrollBar == null) {
					this.addChild(this._vScrollBar = new VScrollBar());
					this._vScrollBar.on(Laya.Event.CHANGE, this, this.onVBarChanged);
					this._vScrollBar.target = this._tf;
					this.callLater(this.changeScroll);
				}
				this._vScrollBar.skin = value;
			}
		}, {
			key: "hScrollBarSkin",
			get: function get() {
				return this._hScrollBar ? this._hScrollBar.skin : null;
			},
			set: function set(value) {
				if (this._hScrollBar == null) {
					this.addChild(this._hScrollBar = new HScrollBar());
					this._hScrollBar.on(Laya.Event.CHANGE, this, this.onHBarChanged);
					this._hScrollBar.mouseWheelEnable = false;
					this._hScrollBar.target = this._tf;
					this.callLater(this.changeScroll);
				}
				this._hScrollBar.skin = value;
			}
		}, {
			key: "vScrollBar",
			get: function get() {
				return this._vScrollBar;
			}
		}, {
			key: "hScrollBar",
			get: function get() {
				return this._hScrollBar;
			}
		}, {
			key: "maxScrollY",
			get: function get() {
				return this._tf.maxScrollY;
			}
		}, {
			key: "scrollY",
			get: function get() {
				return this._tf.scrollY;
			}
		}, {
			key: "maxScrollX",
			get: function get() {
				return this._tf.maxScrollX;
			}
		}, {
			key: "scrollX",
			get: function get() {
				return this._tf.scrollX;
			}
		}]);

		return TextArea;
	}(TextInput);

	Laya.ILaya.regClass(TextArea);
	Laya.ClassUtils.regClass("laya.ui.TextArea", TextArea);
	Laya.ClassUtils.regClass("Laya.TextArea", TextArea);

	var ScaleBox = function (_Box4) {
		_inherits(ScaleBox, _Box4);

		function ScaleBox() {
			_classCallCheck(this, ScaleBox);

			var _this28 = _possibleConstructorReturn(this, (ScaleBox.__proto__ || Object.getPrototypeOf(ScaleBox)).apply(this, arguments));

			_this28._oldW = 0;
			_this28._oldH = 0;
			return _this28;
		}

		_createClass(ScaleBox, [{
			key: "onEnable",
			value: function onEnable() {
				Laya.ILaya.stage.on("resize", this, this.onResize);
				this.onResize();
			}
		}, {
			key: "onDisable",
			value: function onDisable() {
				Laya.ILaya.stage.off("resize", this, this.onResize);
			}
		}, {
			key: "onResize",
			value: function onResize() {
				var stage = Laya.ILaya.stage;
				if (this.width > 0 && this.height > 0) {
					var scale = Math.min(stage.width / this._oldW, stage.height / this._oldH);
					_set(ScaleBox.prototype.__proto__ || Object.getPrototypeOf(ScaleBox.prototype), "width", stage.width, this);
					_set(ScaleBox.prototype.__proto__ || Object.getPrototypeOf(ScaleBox.prototype), "height", stage.height, this);
					this.scale(scale, scale);
				}
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(ScaleBox.prototype.__proto__ || Object.getPrototypeOf(ScaleBox.prototype), "width", value, this);
				this._oldW = value;
			},
			get: function get() {
				return _get(ScaleBox.prototype.__proto__ || Object.getPrototypeOf(ScaleBox.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(ScaleBox.prototype.__proto__ || Object.getPrototypeOf(ScaleBox.prototype), "height", value, this);
				this._oldH = value;
			},
			get: function get() {
				return _get(ScaleBox.prototype.__proto__ || Object.getPrototypeOf(ScaleBox.prototype), "height", this);
			}
		}]);

		return ScaleBox;
	}(Box);

	Laya.ILaya.regClass(ScaleBox);
	Laya.ClassUtils.regClass("laya.ui.ScaleBox", ScaleBox);
	Laya.ClassUtils.regClass("Laya.ScaleBox", ScaleBox);

	var HSlider = function (_Slider) {
		_inherits(HSlider, _Slider);

		function HSlider() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, HSlider);

			var _this29 = _possibleConstructorReturn(this, (HSlider.__proto__ || Object.getPrototypeOf(HSlider)).call(this, skin));

			_this29.isVertical = false;
			return _this29;
		}

		return HSlider;
	}(Slider);

	Laya.ILaya.regClass(HSlider);
	Laya.ClassUtils.regClass("laya.ui.HSlider", HSlider);
	Laya.ClassUtils.regClass("Laya.HSlider", HSlider);

	var Panel = function (_Box5) {
		_inherits(Panel, _Box5);

		function Panel() {
			_classCallCheck(this, Panel);

			var _this30 = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this));

			_this30._usedCache = null;
			_this30._elasticEnabled = false;
			_this30.width = _this30.height = 100;
			return _this30;
		}

		_createClass(Panel, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "destroy", this).call(this, destroyChild);
				this._content && this._content.destroy(destroyChild);
				this._vScrollBar && this._vScrollBar.destroy(destroyChild);
				this._hScrollBar && this._hScrollBar.destroy(destroyChild);
				this._vScrollBar = null;
				this._hScrollBar = null;
				this._content = null;
			}
		}, {
			key: "destroyChildren",
			value: function destroyChildren() {
				this._content.destroyChildren();
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				_get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "addChild", this).call(this, this._content = new Box());
			}
		}, {
			key: "addChild",
			value: function addChild(child) {
				child.on(Laya.Event.RESIZE, this, this.onResize);
				this._setScrollChanged();
				return this._content.addChild(child);
			}
		}, {
			key: "onResize",
			value: function onResize() {
				this._setScrollChanged();
			}
		}, {
			key: "addChildAt",
			value: function addChildAt(child, index) {
				child.on(Laya.Event.RESIZE, this, this.onResize);
				this._setScrollChanged();
				return this._content.addChildAt(child, index);
			}
		}, {
			key: "removeChild",
			value: function removeChild(child) {
				child.off(Laya.Event.RESIZE, this, this.onResize);
				this._setScrollChanged();
				return this._content.removeChild(child);
			}
		}, {
			key: "removeChildAt",
			value: function removeChildAt(index) {
				this.getChildAt(index).off(Laya.Event.RESIZE, this, this.onResize);
				this._setScrollChanged();
				return this._content.removeChildAt(index);
			}
		}, {
			key: "removeChildren",
			value: function removeChildren() {
				var beginIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var endIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0x7fffffff;

				this._content.removeChildren(beginIndex, endIndex);
				this._setScrollChanged();
				return this;
			}
		}, {
			key: "getChildAt",
			value: function getChildAt(index) {
				return this._content.getChildAt(index);
			}
		}, {
			key: "getChildByName",
			value: function getChildByName(name) {
				return this._content.getChildByName(name);
			}
		}, {
			key: "getChildIndex",
			value: function getChildIndex(child) {
				return this._content.getChildIndex(child);
			}
		}, {
			key: "changeScroll",
			value: function changeScroll() {
				this._scrollChanged = false;
				var contentW = this.contentWidth || 1;
				var contentH = this.contentHeight || 1;
				var vscroll = this._vScrollBar;
				var hscroll = this._hScrollBar;
				var vShow = vscroll && contentH > this._height;
				var hShow = hscroll && contentW > this._width;
				var showWidth = vShow ? this._width - vscroll.width : this._width;
				var showHeight = hShow ? this._height - hscroll.height : this._height;
				if (vscroll) {
					vscroll.x = this._width - vscroll.width;
					vscroll.y = 0;
					vscroll.height = this._height - (hShow ? hscroll.height : 0);
					vscroll.scrollSize = Math.max(this._height * 0.033, 1);
					vscroll.thumbPercent = showHeight / contentH;
					vscroll.setScroll(0, contentH - showHeight, vscroll.value);
				}
				if (hscroll) {
					hscroll.x = 0;
					hscroll.y = this._height - hscroll.height;
					hscroll.width = this._width - (vShow ? vscroll.width : 0);
					hscroll.scrollSize = Math.max(this._width * 0.033, 1);
					hscroll.thumbPercent = showWidth / contentW;
					hscroll.setScroll(0, contentW - showWidth, hscroll.value);
				}
			}
		}, {
			key: "_sizeChanged",
			value: function _sizeChanged() {
				_get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "_sizeChanged", this).call(this);
				this.setContentSize(this._width, this._height);
			}
		}, {
			key: "setContentSize",
			value: function setContentSize(width, height) {
				var content = this._content;
				content.width = width;
				content.height = height;
				content._style.scrollRect || (content.scrollRect = Laya.Rectangle.create());
				content._style.scrollRect.setTo(0, 0, width, height);
				content.scrollRect = content.scrollRect;
			}
		}, {
			key: "onScrollBarChange",
			value: function onScrollBarChange(scrollBar) {
				var rect = this._content._style.scrollRect;
				if (rect) {
					var start = Math.round(scrollBar.value);
					scrollBar.isVertical ? rect.y = start : rect.x = start;
					this._content.scrollRect = rect;
				}
			}
		}, {
			key: "scrollTo",
			value: function scrollTo() {
				var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				if (this.vScrollBar) this.vScrollBar.value = y;
				if (this.hScrollBar) this.hScrollBar.value = x;
			}
		}, {
			key: "refresh",
			value: function refresh() {
				this.changeScroll();
			}
		}, {
			key: "onScrollStart",
			value: function onScrollStart() {
				this._usedCache || (this._usedCache = _get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "cacheAs", this));
				_set(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "cacheAs", "none", this);
				this._hScrollBar && this._hScrollBar.once(Laya.Event.END, this, this.onScrollEnd);
				this._vScrollBar && this._vScrollBar.once(Laya.Event.END, this, this.onScrollEnd);
			}
		}, {
			key: "onScrollEnd",
			value: function onScrollEnd() {
				_set(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "cacheAs", this._usedCache, this);
			}
		}, {
			key: "_setScrollChanged",
			value: function _setScrollChanged() {
				if (!this._scrollChanged) {
					this._scrollChanged = true;
					this.callLater(this.changeScroll);
				}
			}
		}, {
			key: "numChildren",
			get: function get() {
				return this._content.numChildren;
			}
		}, {
			key: "contentWidth",
			get: function get() {
				var max = 0;
				for (var i = this._content.numChildren - 1; i > -1; i--) {
					var comp = this._content.getChildAt(i);
					max = Math.max(comp._x + comp.width * comp.scaleX - comp.pivotX, max);
				}
				return max;
			}
		}, {
			key: "contentHeight",
			get: function get() {
				var max = 0;
				for (var i = this._content.numChildren - 1; i > -1; i--) {
					var comp = this._content.getChildAt(i);
					max = Math.max(comp._y + comp.height * comp.scaleY - comp.pivotY, max);
				}
				return max;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "width", value, this);
				this._setScrollChanged();
			},
			get: function get() {
				return _get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "height", value, this);
				this._setScrollChanged();
			},
			get: function get() {
				return _get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "height", this);
			}
		}, {
			key: "vScrollBarSkin",
			get: function get() {
				return this._vScrollBar ? this._vScrollBar.skin : null;
			},
			set: function set(value) {
				if (this._vScrollBar == null) {
					_get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "addChild", this).call(this, this._vScrollBar = new VScrollBar());
					this._vScrollBar.on(Laya.Event.CHANGE, this, this.onScrollBarChange, [this._vScrollBar]);
					this._vScrollBar.target = this._content;
					this._vScrollBar.elasticDistance = this._elasticEnabled ? 200 : 0;
					this._setScrollChanged();
				}
				this._vScrollBar.skin = value;
			}
		}, {
			key: "hScrollBarSkin",
			get: function get() {
				return this._hScrollBar ? this._hScrollBar.skin : null;
			},
			set: function set(value) {
				if (this._hScrollBar == null) {
					_get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "addChild", this).call(this, this._hScrollBar = new HScrollBar());
					this._hScrollBar.on(Laya.Event.CHANGE, this, this.onScrollBarChange, [this._hScrollBar]);
					this._hScrollBar.target = this._content;
					this._hScrollBar.elasticDistance = this._elasticEnabled ? 200 : 0;
					this._setScrollChanged();
				}
				this._hScrollBar.skin = value;
			}
		}, {
			key: "vScrollBar",
			get: function get() {
				return this._vScrollBar;
			}
		}, {
			key: "hScrollBar",
			get: function get() {
				return this._hScrollBar;
			}
		}, {
			key: "content",
			get: function get() {
				return this._content;
			}
		}, {
			key: "cacheAs",
			set: function set(value) {
				_set(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "cacheAs", value, this);
				this._usedCache = null;
				if (value !== "none") {
					this._hScrollBar && this._hScrollBar.on(Laya.Event.START, this, this.onScrollStart);
					this._vScrollBar && this._vScrollBar.on(Laya.Event.START, this, this.onScrollStart);
				} else {
					this._hScrollBar && this._hScrollBar.off(Laya.Event.START, this, this.onScrollStart);
					this._vScrollBar && this._vScrollBar.off(Laya.Event.START, this, this.onScrollStart);
				}
			},
			get: function get() {
				return _get(Panel.prototype.__proto__ || Object.getPrototypeOf(Panel.prototype), "cacheAs", this);
			}
		}, {
			key: "elasticEnabled",
			get: function get() {
				return this._elasticEnabled;
			},
			set: function set(value) {
				this._elasticEnabled = value;
				if (this._vScrollBar) {
					this._vScrollBar.elasticDistance = value ? 200 : 0;
				}
				if (this._hScrollBar) {
					this._hScrollBar.elasticDistance = value ? 200 : 0;
				}
			}
		}]);

		return Panel;
	}(Box);

	Laya.ILaya.regClass(Panel);
	Laya.ClassUtils.regClass("laya.ui.Panel", Panel);
	Laya.ClassUtils.regClass("Laya.Panel", Panel);

	var VSlider = function (_Slider2) {
		_inherits(VSlider, _Slider2);

		function VSlider() {
			_classCallCheck(this, VSlider);

			return _possibleConstructorReturn(this, (VSlider.__proto__ || Object.getPrototypeOf(VSlider)).apply(this, arguments));
		}

		return VSlider;
	}(Slider);

	Laya.ILaya.regClass(VSlider);
	Laya.ClassUtils.regClass("laya.ui.VSlider", VSlider);
	Laya.ClassUtils.regClass("Laya.VSlider", VSlider);

	var Tree = function (_Box6) {
		_inherits(Tree, _Box6);

		function Tree() {
			_classCallCheck(this, Tree);

			var _this32 = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this));

			_this32._spaceLeft = 10;
			_this32._spaceBottom = 0;
			_this32._keepStatus = true;
			_this32.width = _this32.height = 200;
			return _this32;
		}

		_createClass(Tree, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Tree.prototype.__proto__ || Object.getPrototypeOf(Tree.prototype), "destroy", this).call(this, destroyChild);
				this._list && this._list.destroy(destroyChild);
				this._list = null;
				this._source = null;
				this._renderHandler = null;
			}
		}, {
			key: "createChildren",
			value: function createChildren() {
				this.addChild(this._list = new List());
				this._list.renderHandler = Laya.Handler.create(this, this.renderItem, null, false);
				this._list.repeatX = 1;
				this._list.on(Laya.Event.CHANGE, this, this.onListChange);
			}
		}, {
			key: "onListChange",
			value: function onListChange() {
				var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.event(Laya.Event.CHANGE);
			}
		}, {
			key: "getArray",
			value: function getArray() {
				var arr = [];
				for (var key in this._source) {
					var item = this._source[key];
					if (this.getParentOpenStatus(item)) {
						item.x = this._spaceLeft * this.getDepth(item);
						arr.push(item);
					}
				}
				return arr;
			}
		}, {
			key: "getDepth",
			value: function getDepth(item) {
				var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				if (item.nodeParent == null) return num;else return this.getDepth(item.nodeParent, num + 1);
			}
		}, {
			key: "getParentOpenStatus",
			value: function getParentOpenStatus(item) {
				var parent = item.nodeParent;
				if (parent == null) {
					return true;
				} else {
					if (parent.isOpen) {
						if (parent.nodeParent != null) return this.getParentOpenStatus(parent);else return true;
					} else {
						return false;
					}
				}
			}
		}, {
			key: "renderItem",
			value: function renderItem(cell, index) {
				var item = cell.dataSource;
				if (item) {
					cell.left = item.x;
					var arrow = cell.getChildByName("arrow");
					if (arrow) {
						if (item.hasChild) {
							arrow.visible = true;
							arrow.index = item.isOpen ? 1 : 0;
							arrow.tag = index;
							arrow.off(Laya.Event.CLICK, this, this.onArrowClick);
							arrow.on(Laya.Event.CLICK, this, this.onArrowClick);
						} else {
							arrow.visible = false;
						}
					}
					var folder = cell.getChildByName("folder");
					if (folder) {
						if (folder.clipY == 2) {
							folder.index = item.isDirectory ? 0 : 1;
						} else {
							folder.index = item.isDirectory ? item.isOpen ? 1 : 0 : 2;
						}
					}
					this._renderHandler && this._renderHandler.runWith([cell, index]);
				}
			}
		}, {
			key: "onArrowClick",
			value: function onArrowClick(e) {
				var arrow = e.currentTarget;
				var index = arrow.tag;
				this._list.array[index].isOpen = !this._list.array[index].isOpen;
				this.event(Laya.Event.OPEN);
				this._list.array = this.getArray();
			}
		}, {
			key: "setItemState",
			value: function setItemState(index, isOpen) {
				if (!this._list.array[index]) return;
				this._list.array[index].isOpen = isOpen;
				this._list.array = this.getArray();
			}
		}, {
			key: "fresh",
			value: function fresh() {
				this._list.array = this.getArray();
				this.repaint();
			}
		}, {
			key: "parseXml",
			value: function parseXml(xml, source, nodeParent, isRoot) {
				var obj;
				var list = xml.childNodes;
				var childCount = list.length;
				if (!isRoot) {
					obj = {};
					var list2 = xml.attributes;
					for (var key in list2) {
						var attrs = list2[key];
						var prop = attrs.nodeName;
						var value = attrs.nodeValue;
						obj[prop] = value == "true" ? true : value == "false" ? false : value;
					}
					obj.nodeParent = nodeParent;
					if (childCount > 0) obj.isDirectory = true;
					obj.hasChild = childCount > 0;
					source.push(obj);
				}
				for (var i = 0; i < childCount; i++) {
					var node = list[i];
					this.parseXml(node, source, obj, false);
				}
			}
		}, {
			key: "parseOpenStatus",
			value: function parseOpenStatus(oldSource, newSource) {
				for (var i = 0, n = newSource.length; i < n; i++) {
					var newItem = newSource[i];
					if (newItem.isDirectory) {
						for (var j = 0, m = oldSource.length; j < m; j++) {
							var oldItem = oldSource[j];
							if (oldItem.isDirectory && this.isSameParent(oldItem, newItem) && newItem.label == oldItem.label) {
								newItem.isOpen = oldItem.isOpen;
								break;
							}
						}
					}
				}
			}
		}, {
			key: "isSameParent",
			value: function isSameParent(item1, item2) {
				if (item1.nodeParent == null && item2.nodeParent == null) return true;else if (item1.nodeParent == null || item2.nodeParent == null) return false;else {
					if (item1.nodeParent.label == item2.nodeParent.label) return this.isSameParent(item1.nodeParent, item2.nodeParent);else return false;
				}
			}
		}, {
			key: "filter",
			value: function filter(key) {
				if (Boolean(key)) {
					var result = [];
					this.getFilterSource(this._source, result, key);
					this._list.array = result;
				} else {
					this._list.array = this.getArray();
				}
			}
		}, {
			key: "getFilterSource",
			value: function getFilterSource(array, result, key) {
				key = key.toLocaleLowerCase();
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var item = _step.value;

						if (!item.isDirectory && String(item.label).toLowerCase().indexOf(key) > -1) {
							item.x = 0;
							result.push(item);
						}
						if (item.child && item.child.length > 0) {
							this.getFilterSource(item.child, result, key);
						}
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
			}
		}, {
			key: "keepStatus",
			get: function get() {
				return this._keepStatus;
			},
			set: function set(value) {
				this._keepStatus = value;
			}
		}, {
			key: "array",
			get: function get() {
				return this._list.array;
			},
			set: function set(value) {
				if (this._keepStatus && this._list.array && value) {
					this.parseOpenStatus(this._list.array, value);
				}
				this._source = value;
				this._list.array = this.getArray();
			}
		}, {
			key: "source",
			get: function get() {
				return this._source;
			}
		}, {
			key: "list",
			get: function get() {
				return this._list;
			}
		}, {
			key: "itemRender",
			get: function get() {
				return this._list.itemRender;
			},
			set: function set(value) {
				this._list.itemRender = value;
			}
		}, {
			key: "scrollBarSkin",
			get: function get() {
				return this._list.vScrollBarSkin;
			},
			set: function set(value) {
				this._list.vScrollBarSkin = value;
			}
		}, {
			key: "scrollBar",
			get: function get() {
				return this._list.scrollBar;
			}
		}, {
			key: "mouseHandler",
			get: function get() {
				return this._list.mouseHandler;
			},
			set: function set(value) {
				this._list.mouseHandler = value;
			}
		}, {
			key: "renderHandler",
			get: function get() {
				return this._renderHandler;
			},
			set: function set(value) {
				this._renderHandler = value;
			}
		}, {
			key: "spaceLeft",
			get: function get() {
				return this._spaceLeft;
			},
			set: function set(value) {
				this._spaceLeft = value;
			}
		}, {
			key: "spaceBottom",
			get: function get() {
				return this._list.spaceY;
			},
			set: function set(value) {
				this._list.spaceY = value;
			}
		}, {
			key: "selectedIndex",
			get: function get() {
				return this._list.selectedIndex;
			},
			set: function set(value) {
				this._list.selectedIndex = value;
			}
		}, {
			key: "selectedItem",
			get: function get() {
				return this._list.selectedItem;
			},
			set: function set(value) {
				this._list.selectedItem = value;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(Tree.prototype.__proto__ || Object.getPrototypeOf(Tree.prototype), "width", value, this);
				this._list.width = value;
			},
			get: function get() {
				return _get(Tree.prototype.__proto__ || Object.getPrototypeOf(Tree.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(Tree.prototype.__proto__ || Object.getPrototypeOf(Tree.prototype), "height", value, this);
				this._list.height = value;
			},
			get: function get() {
				return _get(Tree.prototype.__proto__ || Object.getPrototypeOf(Tree.prototype), "height", this);
			}
		}, {
			key: "dataSource",
			set: function set(value) {
				this._dataSource = value;
				_set(Tree.prototype.__proto__ || Object.getPrototypeOf(Tree.prototype), "dataSource", value, this);
			},
			get: function get() {
				return _get(Tree.prototype.__proto__ || Object.getPrototypeOf(Tree.prototype), "dataSource", this);
			}
		}, {
			key: "xml",
			set: function set(value) {
				var arr = [];
				this.parseXml(value.childNodes[0], arr, null, true);
				this.array = arr;
			}
		}, {
			key: "selectedPath",
			get: function get() {
				if (this._list.selectedItem) {
					return this._list.selectedItem.path;
				}
				return null;
			}
		}]);

		return Tree;
	}(Box);

	Laya.ILaya.regClass(Tree);
	Laya.ClassUtils.regClass("laya.ui.Tree", Tree);
	Laya.ClassUtils.regClass("Laya.Tree", Tree);

	var LayoutBox = function (_Box7) {
		_inherits(LayoutBox, _Box7);

		function LayoutBox() {
			_classCallCheck(this, LayoutBox);

			var _this33 = _possibleConstructorReturn(this, (LayoutBox.__proto__ || Object.getPrototypeOf(LayoutBox)).apply(this, arguments));

			_this33._space = 0;
			_this33._align = "none";
			_this33._itemChanged = false;
			return _this33;
		}

		_createClass(LayoutBox, [{
			key: "addChild",
			value: function addChild(child) {
				child.on(Laya.Event.RESIZE, this, this.onResize);
				this._setItemChanged();
				return _get(LayoutBox.prototype.__proto__ || Object.getPrototypeOf(LayoutBox.prototype), "addChild", this).call(this, child);
			}
		}, {
			key: "onResize",
			value: function onResize(e) {
				this._setItemChanged();
			}
		}, {
			key: "addChildAt",
			value: function addChildAt(child, index) {
				child.on(Laya.Event.RESIZE, this, this.onResize);
				this._setItemChanged();
				return _get(LayoutBox.prototype.__proto__ || Object.getPrototypeOf(LayoutBox.prototype), "addChildAt", this).call(this, child, index);
			}
		}, {
			key: "removeChildAt",
			value: function removeChildAt(index) {
				this.getChildAt(index).off(Laya.Event.RESIZE, this, this.onResize);
				this._setItemChanged();
				return _get(LayoutBox.prototype.__proto__ || Object.getPrototypeOf(LayoutBox.prototype), "removeChildAt", this).call(this, index);
			}
		}, {
			key: "refresh",
			value: function refresh() {
				this._setItemChanged();
			}
		}, {
			key: "changeItems",
			value: function changeItems() {
				this._itemChanged = false;
			}
		}, {
			key: "sortItem",
			value: function sortItem(items) {
				if (items) items.sort(function (a, b) {
					return a.y - b.y;
				});
			}
		}, {
			key: "_setItemChanged",
			value: function _setItemChanged() {
				if (!this._itemChanged) {
					this._itemChanged = true;
					this.callLater(this.changeItems);
				}
			}
		}, {
			key: "space",
			get: function get() {
				return this._space;
			},
			set: function set(value) {
				this._space = value;
				this._setItemChanged();
			}
		}, {
			key: "align",
			get: function get() {
				return this._align;
			},
			set: function set(value) {
				this._align = value;
				this._setItemChanged();
			}
		}]);

		return LayoutBox;
	}(Box);

	Laya.ILaya.regClass(LayoutBox);
	Laya.ClassUtils.regClass("laya.ui.LayoutBox", LayoutBox);
	Laya.ClassUtils.regClass("Laya.LayoutBox", LayoutBox);

	var HBox = function (_LayoutBox) {
		_inherits(HBox, _LayoutBox);

		function HBox() {
			_classCallCheck(this, HBox);

			return _possibleConstructorReturn(this, (HBox.__proto__ || Object.getPrototypeOf(HBox)).apply(this, arguments));
		}

		_createClass(HBox, [{
			key: "sortItem",
			value: function sortItem(items) {
				if (items) items.sort(function (a, b) {
					return a.x - b.x;
				});
			}
		}, {
			key: "changeItems",
			value: function changeItems() {
				this._itemChanged = false;
				var items = [];
				var maxHeight = 0;
				for (var i = 0, n = this.numChildren; i < n; i++) {
					var item = this.getChildAt(i);
					if (item) {
						items.push(item);
						maxHeight = this._height ? this._height : Math.max(maxHeight, item.height * item.scaleY);
					}
				}
				this.sortItem(items);
				var left = 0;
				for (i = 0, n = items.length; i < n; i++) {
					item = items[i];
					item.x = left;
					left += item.width * item.scaleX + this._space;
					if (this._align == HBox.TOP) {
						item.y = 0;
					} else if (this._align == HBox.MIDDLE) {
						item.y = (maxHeight - item.height * item.scaleY) * 0.5;
					} else if (this._align == HBox.BOTTOM) {
						item.y = maxHeight - item.height * item.scaleY;
					}
				}
				this._sizeChanged();
			}
		}, {
			key: "height",
			set: function set(value) {
				if (this._height != value) {
					_set(HBox.prototype.__proto__ || Object.getPrototypeOf(HBox.prototype), "height", value, this);
					this.callLater(this.changeItems);
				}
			},
			get: function get() {
				return _get(HBox.prototype.__proto__ || Object.getPrototypeOf(HBox.prototype), "height", this);
			}
		}]);

		return HBox;
	}(LayoutBox);

	HBox.NONE = "none";
	HBox.TOP = "top";
	HBox.MIDDLE = "middle";
	HBox.BOTTOM = "bottom";
	Laya.ILaya.regClass(HBox);
	Laya.ClassUtils.regClass("laya.ui.HBox", HBox);
	Laya.ClassUtils.regClass("Laya.HBox", HBox);

	var VBox = function (_LayoutBox2) {
		_inherits(VBox, _LayoutBox2);

		function VBox() {
			_classCallCheck(this, VBox);

			return _possibleConstructorReturn(this, (VBox.__proto__ || Object.getPrototypeOf(VBox)).apply(this, arguments));
		}

		_createClass(VBox, [{
			key: "changeItems",
			value: function changeItems() {
				this._itemChanged = false;
				var items = [];
				var maxWidth = 0;
				for (var i = 0, n = this.numChildren; i < n; i++) {
					var item = this.getChildAt(i);
					if (item) {
						items.push(item);
						maxWidth = this._width ? this._width : Math.max(maxWidth, item.width * item.scaleX);
					}
				}
				this.sortItem(items);
				var top = 0;
				for (i = 0, n = items.length; i < n; i++) {
					item = items[i];
					item.y = top;
					top += item.height * item.scaleY + this._space;
					if (this._align == VBox.LEFT) {
						item.x = 0;
					} else if (this._align == VBox.CENTER) {
						item.x = (maxWidth - item.width * item.scaleX) * 0.5;
					} else if (this._align == VBox.RIGHT) {
						item.x = maxWidth - item.width * item.scaleX;
					}
				}
				this._sizeChanged();
			}
		}, {
			key: "width",
			set: function set(value) {
				if (this._width != value) {
					_set(VBox.prototype.__proto__ || Object.getPrototypeOf(VBox.prototype), "width", value, this);
					this.callLater(this.changeItems);
				}
			},
			get: function get() {
				return _get(VBox.prototype.__proto__ || Object.getPrototypeOf(VBox.prototype), "width", this);
			}
		}]);

		return VBox;
	}(LayoutBox);

	VBox.NONE = "none";
	VBox.LEFT = "left";
	VBox.CENTER = "center";
	VBox.RIGHT = "right";
	Laya.ILaya.regClass(VBox);
	Laya.ClassUtils.regClass("laya.ui.VBox", VBox);
	Laya.ClassUtils.regClass("Laya.VBox", VBox);

	var FontClip = function (_Clip) {
		_inherits(FontClip, _Clip);

		function FontClip() {
			var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var sheet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			_classCallCheck(this, FontClip);

			var _this36 = _possibleConstructorReturn(this, (FontClip.__proto__ || Object.getPrototypeOf(FontClip)).call(this));

			_this36._valueArr = '';
			_this36._indexMap = null;
			_this36._sheet = null;
			_this36._direction = "horizontal";
			_this36._spaceX = 0;
			_this36._spaceY = 0;
			_this36._align = "left";
			_this36._wordsW = 0;
			_this36._wordsH = 0;
			if (skin) _this36.skin = skin;
			if (sheet) _this36.sheet = sheet;
			return _this36;
		}

		_createClass(FontClip, [{
			key: "createChildren",
			value: function createChildren() {
				this._bitmap = new AutoBitmap();
				this.on(Laya.Event.LOADED, this, this._onClipLoaded);
			}
		}, {
			key: "_onClipLoaded",
			value: function _onClipLoaded() {
				this.callLater(this.changeValue);
			}
		}, {
			key: "changeValue",
			value: function changeValue() {
				if (!this._sources) return;
				if (!this._valueArr) return;
				this.graphics.clear(true);
				var texture;
				texture = this._sources[0];
				if (!texture) return;
				var isHorizontal = this._direction === "horizontal";
				if (isHorizontal) {
					this._wordsW = this._valueArr.length * (texture.sourceWidth + this.spaceX);
					this._wordsH = texture.sourceHeight;
				} else {
					this._wordsW = texture.sourceWidth;
					this._wordsH = (texture.sourceHeight + this.spaceY) * this._valueArr.length;
				}
				var dX = 0;
				if (this._width) {
					switch (this._align) {
						case "center":
							dX = 0.5 * (this._width - this._wordsW);
							break;
						case "right":
							dX = this._width - this._wordsW;
							break;
						default:
							dX = 0;
					}
				}
				for (var i = 0, sz = this._valueArr.length; i < sz; i++) {
					var index = this._indexMap[this._valueArr.charAt(i)];
					if (!this.sources[index]) continue;
					texture = this.sources[index];
					if (isHorizontal) this.graphics.drawImage(texture, dX + i * (texture.sourceWidth + this.spaceX), 0, texture.sourceWidth, texture.sourceHeight);else this.graphics.drawImage(texture, 0 + dX, i * (texture.sourceHeight + this.spaceY), texture.sourceWidth, texture.sourceHeight);
				}
				if (!this._width) {
					this._widget.resetLayoutX();
					this.callLater(this._sizeChanged);
				}
				if (!this._height) {
					this._widget.resetLayoutY();
					this.callLater(this._sizeChanged);
				}
			}
		}, {
			key: "measureWidth",
			value: function measureWidth() {
				return this._wordsW;
			}
		}, {
			key: "measureHeight",
			value: function measureHeight() {
				return this._wordsH;
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				this._valueArr = null;
				this._indexMap = null;
				this.graphics.clear(true);
				this.removeSelf();
				this.off(Laya.Event.LOADED, this, this._onClipLoaded);
				_get(FontClip.prototype.__proto__ || Object.getPrototypeOf(FontClip.prototype), "destroy", this).call(this, destroyChild);
			}
		}, {
			key: "sheet",
			get: function get() {
				return this._sheet;
			},
			set: function set(value) {
				value += "";
				this._sheet = value;
				var arr = value.split(" ");
				this._clipX = String(arr[0]).length;
				this.clipY = arr.length;
				this._indexMap = {};
				for (var i = 0; i < this._clipY; i++) {
					var line = arr[i].split("");
					for (var j = 0, n = line.length; j < n; j++) {
						this._indexMap[line[j]] = i * this._clipX + j;
					}
				}
			}
		}, {
			key: "value",
			get: function get() {
				if (!this._valueArr) return "";
				return this._valueArr;
			},
			set: function set(value) {
				value += "";
				this._valueArr = value;
				this.callLater(this.changeValue);
			}
		}, {
			key: "direction",
			get: function get() {
				return this._direction;
			},
			set: function set(value) {
				this._direction = value;
				this.callLater(this.changeValue);
			}
		}, {
			key: "spaceX",
			get: function get() {
				return this._spaceX;
			},
			set: function set(value) {
				this._spaceX = value;
				if (this._direction === "horizontal") this.callLater(this.changeValue);
			}
		}, {
			key: "spaceY",
			get: function get() {
				return this._spaceY;
			},
			set: function set(value) {
				this._spaceY = value;
				if (!(this._direction === "horizontal")) this.callLater(this.changeValue);
			}
		}, {
			key: "align",
			set: function set(v) {
				this._align = v;
				this.callLater(this.changeValue);
			},
			get: function get() {
				return this._align;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(FontClip.prototype.__proto__ || Object.getPrototypeOf(FontClip.prototype), "width", value, this);
				this.callLater(this.changeValue);
			},
			get: function get() {
				return _get(FontClip.prototype.__proto__ || Object.getPrototypeOf(FontClip.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(FontClip.prototype.__proto__ || Object.getPrototypeOf(FontClip.prototype), "height", value, this);
				this.callLater(this.changeValue);
			},
			get: function get() {
				return _get(FontClip.prototype.__proto__ || Object.getPrototypeOf(FontClip.prototype), "height", this);
			}
		}]);

		return FontClip;
	}(Clip);

	Laya.ILaya.regClass(FontClip);
	Laya.ClassUtils.regClass("laya.ui.FontClip", FontClip);
	Laya.ClassUtils.regClass("Laya.FontClip", FontClip);

	var View = function (_Laya$Scene) {
		_inherits(View, _Laya$Scene);

		function View() {
			_classCallCheck(this, View);

			var _this37 = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, false));

			_this37._watchMap = {};
			_this37._anchorX = NaN;
			_this37._anchorY = NaN;
			_this37._widget = Widget.EMPTY;
			_this37.createChildren();
			return _this37;
		}

		_createClass(View, [{
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				this._watchMap = null;
				_get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), "destroy", this).call(this, destroyChild);
			}
		}, {
			key: "changeData",
			value: function changeData(key) {
				var arr = this._watchMap[key];
				if (!arr) return;
				for (var i = 0, n = arr.length; i < n; i++) {
					var watcher = arr[i];
					watcher.exe(this);
				}
			}
		}, {
			key: "_sizeChanged",
			value: function _sizeChanged() {
				if (!isNaN(this._anchorX)) this.pivotX = this.anchorX * this.width;
				if (!isNaN(this._anchorY)) this.pivotY = this.anchorY * this.height;
				this.event(Laya.Event.RESIZE);
			}
		}, {
			key: "_getWidget",
			value: function _getWidget() {
				this._widget === Widget.EMPTY && (this._widget = this.addComponent(Widget));
				return this._widget;
			}
		}, {
			key: "loadUI",
			value: function loadUI(path) {
				var uiView = View.uiMap[path];
				View.uiMap && this.createView(uiView);
			}
		}, {
			key: "top",
			get: function get() {
				return this._widget.top;
			},
			set: function set(value) {
				if (value != this._widget.top) {
					this._getWidget().top = value;
				}
			}
		}, {
			key: "bottom",
			get: function get() {
				return this._widget.bottom;
			},
			set: function set(value) {
				if (value != this._widget.bottom) {
					this._getWidget().bottom = value;
				}
			}
		}, {
			key: "left",
			get: function get() {
				return this._widget.left;
			},
			set: function set(value) {
				if (value != this._widget.left) {
					this._getWidget().left = value;
				}
			}
		}, {
			key: "right",
			get: function get() {
				return this._widget.right;
			},
			set: function set(value) {
				if (value != this._widget.right) {
					this._getWidget().right = value;
				}
			}
		}, {
			key: "centerX",
			get: function get() {
				return this._widget.centerX;
			},
			set: function set(value) {
				if (value != this._widget.centerX) {
					this._getWidget().centerX = value;
				}
			}
		}, {
			key: "centerY",
			get: function get() {
				return this._widget.centerY;
			},
			set: function set(value) {
				if (value != this._widget.centerY) {
					this._getWidget().centerY = value;
				}
			}
		}, {
			key: "anchorX",
			get: function get() {
				return this._anchorX;
			},
			set: function set(value) {
				if (this._anchorX != value) {
					this._anchorX = value;
					this.callLater(this._sizeChanged);
				}
			}
		}, {
			key: "anchorY",
			get: function get() {
				return this._anchorY;
			},
			set: function set(value) {
				if (this._anchorY != value) {
					this._anchorY = value;
					this.callLater(this._sizeChanged);
				}
			}
		}, {
			key: "dataSource",
			get: function get() {
				return this._dataSource;
			},
			set: function set(value) {
				this._dataSource = value;
				for (var name in value) {
					var comp = this.getChildByName(name);
					if (comp instanceof UIComponent) comp.dataSource = value[name];else if (name in this && !(this[name] instanceof Function)) this[name] = value[name];
				}
			}
		}], [{
			key: "__init__",
			value: function __init__() {
				Laya.ILaya.ClassUtils.regShortClassName([ViewStack, Button, TextArea, ColorPicker, Box, ScaleBox, CheckBox, Clip, ComboBox, UIComponent, HScrollBar, HSlider, Image, Label, List, Panel, ProgressBar, Radio, RadioGroup, ScrollBar, Slider, Tab, TextInput, View, VScrollBar, VSlider, Tree, HBox, VBox, Laya.Animation, Laya.Text, FontClip]);
			}
		}, {
			key: "regComponent",
			value: function regComponent(key, compClass) {
				Laya.ILaya.ClassUtils.regClass(key, compClass);
			}
		}, {
			key: "regViewRuntime",
			value: function regViewRuntime(key, compClass) {
				Laya.ILaya.ClassUtils.regClass(key, compClass);
			}
		}, {
			key: "regUI",
			value: function regUI(url, json) {
				Laya.ILaya.loader.cacheRes(url, json);
			}
		}]);

		return View;
	}(Laya.Scene);

	View.uiMap = {};
	Laya.ILaya.regClass(View);
	Laya.ClassUtils.regClass("laya.ui.View", View);
	Laya.ClassUtils.regClass("Laya.View", View);

	var IUI = function IUI() {
		_classCallCheck(this, IUI);
	};

	IUI.Dialog = null;

	var DialogManager = function (_Laya$Sprite2) {
		_inherits(DialogManager, _Laya$Sprite2);

		function DialogManager() {
			_classCallCheck(this, DialogManager);

			var _this38 = _possibleConstructorReturn(this, (DialogManager.__proto__ || Object.getPrototypeOf(DialogManager)).call(this));

			_this38.maskLayer = new Laya.Sprite();
			_this38.popupEffect = function (dialog) {
				dialog.scale(1, 1);
				dialog._effectTween = Laya.Tween.from(dialog, { x: Laya.ILaya.stage.width / 2, y: Laya.ILaya.stage.height / 2, scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut, Laya.Handler.create(_this38, _this38.doOpen, [dialog]), 0, false, false);
			};
			_this38.closeEffect = function (dialog) {
				dialog._effectTween = Laya.Tween.to(dialog, { x: Laya.ILaya.stage.width / 2, y: Laya.ILaya.stage.height / 2, scaleX: 0, scaleY: 0 }, 300, Laya.Ease.strongOut, Laya.Handler.create(_this38, _this38.doClose, [dialog]), 0, false, false);
			};
			_this38.popupEffectHandler = new Laya.Handler(_this38, _this38.popupEffect);
			_this38.closeEffectHandler = new Laya.Handler(_this38, _this38.closeEffect);
			_this38.mouseEnabled = _this38.maskLayer.mouseEnabled = true;
			_this38.zOrder = 1000;
			Laya.ILaya.stage.addChild(_this38);
			Laya.ILaya.stage.on(Laya.Event.RESIZE, _this38, _this38._onResize);
			if (UIConfig.closeDialogOnSide) _this38.maskLayer.on("click", _this38, _this38._closeOnSide);
			_this38._onResize(null);
			return _this38;
		}

		_createClass(DialogManager, [{
			key: "_closeOnSide",
			value: function _closeOnSide() {
				var dialog = this.getChildAt(this.numChildren - 1);
				if (dialog instanceof IUI.Dialog) dialog.close();
			}
		}, {
			key: "setLockView",
			value: function setLockView(value) {
				if (!this.lockLayer) {
					this.lockLayer = new Box();
					this.lockLayer.mouseEnabled = true;
					this.lockLayer.size(Laya.ILaya.stage.width, Laya.ILaya.stage.height);
				}
				this.lockLayer.removeChildren();
				if (value) {
					value.centerX = value.centerY = 0;
					this.lockLayer.addChild(value);
				}
			}
		}, {
			key: "_onResize",
			value: function _onResize() {
				var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				var width = this.maskLayer.width = Laya.ILaya.stage.width;
				var height = this.maskLayer.height = Laya.ILaya.stage.height;
				if (this.lockLayer) this.lockLayer.size(width, height);
				this.maskLayer.graphics.clear(true);
				this.maskLayer.graphics.drawRect(0, 0, width, height, UIConfig.popupBgColor);
				this.maskLayer.alpha = UIConfig.popupBgAlpha;
				for (var i = this.numChildren - 1; i > -1; i--) {
					var item = this.getChildAt(i);
					if (item.isPopupCenter) this._centerDialog(item);
				}
			}
		}, {
			key: "_centerDialog",
			value: function _centerDialog(dialog) {
				dialog.x = Math.round((Laya.ILaya.stage.width - dialog.width >> 1) + dialog.pivotX);
				dialog.y = Math.round((Laya.ILaya.stage.height - dialog.height >> 1) + dialog.pivotY);
			}
		}, {
			key: "open",
			value: function open(dialog) {
				var closeOther = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var showEffect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

				if (closeOther) this._closeAll();
				this._clearDialogEffect(dialog);
				if (dialog.isPopupCenter) this._centerDialog(dialog);
				this.addChild(dialog);
				if (dialog.isModal || this._getBit(Laya.Const.HAS_ZORDER)) Laya.ILaya.timer.callLater(this, this._checkMask);
				if (showEffect && dialog.popupEffect != null) dialog.popupEffect.runWith(dialog);else this.doOpen(dialog);
				this.event(Laya.Event.OPEN);
			}
		}, {
			key: "_clearDialogEffect",
			value: function _clearDialogEffect(dialog) {
				if (dialog._effectTween) {
					Laya.Tween.clear(dialog._effectTween);
					dialog._effectTween = null;
				}
			}
		}, {
			key: "doOpen",
			value: function doOpen(dialog) {
				dialog.onOpened(dialog._param);
			}
		}, {
			key: "lock",
			value: function lock(value) {
				if (this.lockLayer) {
					if (value) this.addChild(this.lockLayer);else this.lockLayer.removeSelf();
				}
			}
		}, {
			key: "close",
			value: function close(dialog) {
				this._clearDialogEffect(dialog);
				if (dialog.isShowEffect && dialog.closeEffect != null) dialog.closeEffect.runWith([dialog]);else this.doClose(dialog);
				this.event(Laya.Event.CLOSE);
			}
		}, {
			key: "doClose",
			value: function doClose(dialog) {
				dialog.removeSelf();
				dialog.isModal && this._checkMask();
				dialog.closeHandler && dialog.closeHandler.runWith(dialog.closeType);
				dialog.onClosed(dialog.closeType);
				if (dialog.autoDestroyAtClosed) dialog.destroy();
			}
		}, {
			key: "closeAll",
			value: function closeAll() {
				this._closeAll();
				this.event(Laya.Event.CLOSE);
			}
		}, {
			key: "_closeAll",
			value: function _closeAll() {
				for (var i = this.numChildren - 1; i > -1; i--) {
					var item = this.getChildAt(i);
					if (item && item.close != null) {
						this.doClose(item);
					}
				}
			}
		}, {
			key: "getDialogsByGroup",
			value: function getDialogsByGroup(group) {
				var arr = [];
				for (var i = this.numChildren - 1; i > -1; i--) {
					var item = this.getChildAt(i);
					if (item && item.group === group) {
						arr.push(item);
					}
				}
				return arr;
			}
		}, {
			key: "closeByGroup",
			value: function closeByGroup(group) {
				var arr = [];
				for (var i = this.numChildren - 1; i > -1; i--) {
					var item = this.getChildAt(i);
					if (item && item.group === group) {
						item.close();
						arr.push(item);
					}
				}
				return arr;
			}
		}, {
			key: "_checkMask",
			value: function _checkMask() {
				this.maskLayer.removeSelf();
				for (var i = this.numChildren - 1; i > -1; i--) {
					var dialog = this.getChildAt(i);
					if (dialog && dialog.isModal) {
						this.addChildAt(this.maskLayer, i);
						return;
					}
				}
			}
		}]);

		return DialogManager;
	}(Laya.Sprite);

	Laya.ClassUtils.regClass("laya.ui.DialogManager", DialogManager);
	Laya.ClassUtils.regClass("Laya.DialogManager", DialogManager);

	var Dialog = function (_View) {
		_inherits(Dialog, _View);

		function Dialog() {
			_classCallCheck(this, Dialog);

			var _this39 = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

			_this39.isShowEffect = true;
			_this39.isPopupCenter = true;
			_this39.popupEffect = Dialog.manager.popupEffectHandler;
			_this39.closeEffect = Dialog.manager.closeEffectHandler;
			_this39._dealDragArea();
			_this39.on(Laya.Event.CLICK, _this39, _this39._onClick);
			return _this39;
		}

		_createClass(Dialog, [{
			key: "_dealDragArea",
			value: function _dealDragArea() {
				var dragTarget = this.getChildByName("drag");
				if (dragTarget) {
					this.dragArea = dragTarget._x + "," + dragTarget._y + "," + dragTarget.width + "," + dragTarget.height;
					dragTarget.removeSelf();
				}
			}
		}, {
			key: "_onMouseDown",
			value: function _onMouseDown(e) {
				var point = this.getMousePoint();
				if (this._dragArea.contains(point.x, point.y)) this.startDrag();else this.stopDrag();
			}
		}, {
			key: "_onClick",
			value: function _onClick(e) {
				var btn = e.target;
				if (btn) {
					switch (btn.name) {
						case Dialog.CLOSE:
						case Dialog.CANCEL:
						case Dialog.SURE:
						case Dialog.NO:
						case Dialog.OK:
						case Dialog.YES:
							this.close(btn.name);
							return;
					}
				}
			}
		}, {
			key: "open",
			value: function open() {
				var closeOther = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
				var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				this._dealDragArea();
				this._param = param;
				Dialog.manager.open(this, closeOther, this.isShowEffect);
				Dialog.manager.lock(false);
			}
		}, {
			key: "close",
			value: function close() {
				var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.closeType = type;
				Dialog.manager.close(this);
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				this.closeHandler = null;
				this.popupEffect = null;
				this.closeEffect = null;
				this._dragArea = null;
				_get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), "destroy", this).call(this, destroyChild);
			}
		}, {
			key: "show",
			value: function show() {
				var closeOther = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var showEffect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				this._open(false, closeOther, showEffect);
			}
		}, {
			key: "popup",
			value: function popup() {
				var closeOther = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var showEffect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				this._open(true, closeOther, showEffect);
			}
		}, {
			key: "_open",
			value: function _open(modal, closeOther, showEffect) {
				this.isModal = modal;
				this.isShowEffect = showEffect;
				Dialog.manager.lock(true);
				this.open(closeOther);
			}
		}, {
			key: "dragArea",
			get: function get() {
				if (this._dragArea) return this._dragArea.toString();
				return null;
			},
			set: function set(value) {
				if (value) {
					var a = UIUtils.fillArray([0, 0, 0, 0], value, Number);
					this._dragArea = new Laya.Rectangle(a[0], a[1], a[2], a[3]);
					this.on(Laya.Event.MOUSE_DOWN, this, this._onMouseDown);
				} else {
					this._dragArea = null;
					this.off(Laya.Event.MOUSE_DOWN, this, this._onMouseDown);
				}
			}
		}, {
			key: "isPopup",
			get: function get() {
				return this.parent != null;
			}
		}, {
			key: "zOrder",
			set: function set(value) {
				_set(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), "zOrder", value, this);
				Dialog.manager._checkMask();
			},
			get: function get() {
				return _get(Dialog.prototype.__proto__ || Object.getPrototypeOf(Dialog.prototype), "zOrder", this);
			}
		}], [{
			key: "setLockView",
			value: function setLockView(view) {
				Dialog.manager.setLockView(view);
			}
		}, {
			key: "lock",
			value: function lock(value) {
				Dialog.manager.lock(value);
			}
		}, {
			key: "closeAll",
			value: function closeAll() {
				Dialog.manager.closeAll();
			}
		}, {
			key: "getDialogsByGroup",
			value: function getDialogsByGroup(group) {
				return Dialog.manager.getDialogsByGroup(group);
			}
		}, {
			key: "closeByGroup",
			value: function closeByGroup(group) {
				return Dialog.manager.closeByGroup(group);
			}
		}, {
			key: "manager",
			get: function get() {
				return Dialog._manager = Dialog._manager || new DialogManager();
			},
			set: function set(value) {
				Dialog._manager = value;
			}
		}]);

		return Dialog;
	}(View);

	Dialog.CLOSE = "close";
	Dialog.CANCEL = "cancel";
	Dialog.SURE = "sure";
	Dialog.NO = "no";
	Dialog.YES = "yes";
	Dialog.OK = "ok";
	IUI.Dialog = Dialog;
	Laya.ILaya.regClass(Dialog);
	Laya.ClassUtils.regClass("laya.ui.Dialog", Dialog);
	Laya.ClassUtils.regClass("Laya.Dialog", Dialog);

	var TipManager = function (_UIComponent11) {
		_inherits(TipManager, _UIComponent11);

		function TipManager() {
			_classCallCheck(this, TipManager);

			var _this40 = _possibleConstructorReturn(this, (TipManager.__proto__ || Object.getPrototypeOf(TipManager)).call(this));

			_this40._tipBox = new UIComponent();
			_this40._tipBox.addChild(_this40._tipText = new Laya.Text());
			_this40._tipText.x = _this40._tipText.y = 5;
			_this40._tipText.color = TipManager.tipTextColor;
			_this40._defaultTipHandler = _this40._showDefaultTip;
			Laya.ILaya.stage.on(UIEvent.SHOW_TIP, _this40, _this40._onStageShowTip);
			Laya.ILaya.stage.on(UIEvent.HIDE_TIP, _this40, _this40._onStageHideTip);
			_this40.zOrder = 1100;
			return _this40;
		}

		_createClass(TipManager, [{
			key: "_onStageHideTip",
			value: function _onStageHideTip(e) {
				Laya.ILaya.timer.clear(this, this._showTip);
				this.closeAll();
				this.removeSelf();
			}
		}, {
			key: "_onStageShowTip",
			value: function _onStageShowTip(data) {
				Laya.ILaya.timer.once(TipManager.tipDelay, this, this._showTip, [data], true);
			}
		}, {
			key: "_showTip",
			value: function _showTip(tip) {
				if (typeof tip == 'string') {
					var text = String(tip);
					if (Boolean(text)) {
						this._defaultTipHandler(text);
					}
				} else if (tip instanceof Laya.Handler) {
					tip.run();
				} else if (tip instanceof Function) {
					tip.apply();
				}
				{
					Laya.ILaya.stage.on(Laya.Event.MOUSE_MOVE, this, this._onStageMouseMove);
					Laya.ILaya.stage.on(Laya.Event.MOUSE_DOWN, this, this._onStageMouseDown);
				}
				this._onStageMouseMove(null);
			}
		}, {
			key: "_onStageMouseDown",
			value: function _onStageMouseDown(e) {
				this.closeAll();
			}
		}, {
			key: "_onStageMouseMove",
			value: function _onStageMouseMove(e) {
				this._showToStage(this, TipManager.offsetX, TipManager.offsetY);
			}
		}, {
			key: "_showToStage",
			value: function _showToStage(dis) {
				var offX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var offY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				var rec = dis.getBounds();
				dis.x = Laya.ILaya.stage.mouseX + offX;
				dis.y = Laya.ILaya.stage.mouseY + offY;
				if (dis._x + rec.width > Laya.ILaya.stage.width) {
					dis.x -= rec.width + offX;
				}
				if (dis._y + rec.height > Laya.ILaya.stage.height) {
					dis.y -= rec.height + offY;
				}
			}
		}, {
			key: "closeAll",
			value: function closeAll() {
				Laya.ILaya.timer.clear(this, this._showTip);
				Laya.ILaya.stage.off(Laya.Event.MOUSE_MOVE, this, this._onStageMouseMove);
				Laya.ILaya.stage.off(Laya.Event.MOUSE_DOWN, this, this._onStageMouseDown);
				this.removeChildren();
			}
		}, {
			key: "showDislayTip",
			value: function showDislayTip(tip) {
				this.addChild(tip);
				this._showToStage(this);
				Laya.ILaya.stage.addChild(this);
			}
		}, {
			key: "_showDefaultTip",
			value: function _showDefaultTip(text) {
				this._tipText.text = text;
				var g = this._tipBox.graphics;
				g.clear(true);
				g.drawRect(0, 0, this._tipText.width + 10, this._tipText.height + 10, TipManager.tipBackColor);
				this.addChild(this._tipBox);
				this._showToStage(this);
				Laya.ILaya.stage.addChild(this);
			}
		}, {
			key: "defaultTipHandler",
			get: function get() {
				return this._defaultTipHandler;
			},
			set: function set(value) {
				this._defaultTipHandler = value;
			}
		}]);

		return TipManager;
	}(UIComponent);

	TipManager.offsetX = 10;
	TipManager.offsetY = 15;
	TipManager.tipTextColor = "#ffffff";
	TipManager.tipBackColor = "#111111";
	TipManager.tipDelay = 200;
	Laya.ILaya.regClass(TipManager);
	Laya.ClassUtils.regClass("laya.ui.TipManager", TipManager);
	Laya.ClassUtils.regClass("Laya.TipManager", TipManager);

	var UILib = function () {
		function UILib() {
			_classCallCheck(this, UILib);
		}

		_createClass(UILib, null, [{
			key: "__init__",
			value: function __init__() {}
		}]);

		return UILib;
	}();

	var WXOpenDataViewer = function (_UIComponent12) {
		_inherits(WXOpenDataViewer, _UIComponent12);

		function WXOpenDataViewer() {
			_classCallCheck(this, WXOpenDataViewer);

			var _this41 = _possibleConstructorReturn(this, (WXOpenDataViewer.__proto__ || Object.getPrototypeOf(WXOpenDataViewer)).call(this));

			_this41._width = _this41._height = 200;
			var tex = new Laya.Texture();
			tex.bitmap = new Laya.Texture2D();
			_this41.texture = tex;
			return _this41;
		}

		_createClass(WXOpenDataViewer, [{
			key: "onEnable",
			value: function onEnable() {
				this.postMsg({ type: "display", rate: Laya.Laya.stage.frameRate });
				if (window.wx && window.sharedCanvas) Laya.Laya.timer.frameLoop(1, this, this._onLoop);
			}
		}, {
			key: "onDisable",
			value: function onDisable() {
				this.postMsg({ type: "undisplay" });
				Laya.Laya.timer.clear(this, this._onLoop);
			}
		}, {
			key: "_onLoop",
			value: function _onLoop() {
				this.texture.bitmap.loadImageSource(window.sharedCanvas);
			}
		}, {
			key: "_postMsg",
			value: function _postMsg() {
				var mat = new Laya.Matrix();
				mat.translate(this.x, this.y);
				var stage = Laya.Laya.stage;
				mat.scale(stage._canvasTransform.getScaleX() * this.globalScaleX * stage.transform.getScaleX(), stage._canvasTransform.getScaleY() * this.globalScaleY * stage.transform.getScaleY());
				this.postMsg({ type: "changeMatrix", a: mat.a, b: mat.b, c: mat.c, d: mat.d, tx: mat.tx, ty: mat.ty, w: this.width, h: this.height });
			}
		}, {
			key: "postMsg",
			value: function postMsg(msg) {
				if (window.wx && window.wx.getOpenDataContext) {
					var openDataContext = window.wx.getOpenDataContext();
					openDataContext.postMessage(msg);
				}
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "width", value, this);
				if (window.sharedCanvas) window.sharedCanvas.width = value;
				this.callLater(this._postMsg);
			},
			get: function get() {
				return _get(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "width", this);
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "height", value, this);
				if (window.sharedCanvas) window.sharedCanvas.height = value;
				this.callLater(this._postMsg);
			},
			get: function get() {
				return _get(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "height", this);
			}
		}, {
			key: "x",
			set: function set(value) {
				_set(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "x", value, this);
				this.callLater(this._postMsg);
			},
			get: function get() {
				return _get(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "x", this);
			}
		}, {
			key: "y",
			set: function set(value) {
				_set(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "y", value, this);
				this.callLater(this._postMsg);
			},
			get: function get() {
				return _get(WXOpenDataViewer.prototype.__proto__ || Object.getPrototypeOf(WXOpenDataViewer.prototype), "y", this);
			}
		}]);

		return WXOpenDataViewer;
	}(UIComponent);

	Laya.ILaya.regClass(WXOpenDataViewer);
	Laya.ClassUtils.regClass("laya.ui.WXOpenDataViewer", WXOpenDataViewer);
	Laya.ClassUtils.regClass("Laya.WXOpenDataViewer", WXOpenDataViewer);

	exports.AdvImage = AdvImage;
	exports.AutoBitmap = AutoBitmap;
	exports.Box = Box;
	exports.Button = Button;
	exports.CheckBox = CheckBox;
	exports.Clip = Clip;
	exports.ColorPicker = ColorPicker;
	exports.ComboBox = ComboBox;
	exports.Dialog = Dialog;
	exports.DialogManager = DialogManager;
	exports.FontClip = FontClip;
	exports.HBox = HBox;
	exports.HScrollBar = HScrollBar;
	exports.HSlider = HSlider;
	exports.IUI = IUI;
	exports.Image = Image;
	exports.Label = Label;
	exports.LayoutBox = LayoutBox;
	exports.List = List;
	exports.Panel = Panel;
	exports.ProgressBar = ProgressBar;
	exports.Radio = Radio;
	exports.RadioGroup = RadioGroup;
	exports.ScaleBox = ScaleBox;
	exports.ScrollBar = ScrollBar;
	exports.Slider = Slider;
	exports.Styles = Styles;
	exports.Tab = Tab;
	exports.TextArea = TextArea;
	exports.TextInput = TextInput;
	exports.TipManager = TipManager;
	exports.Tree = Tree;
	exports.UIComponent = UIComponent;
	exports.UIConfig = UIConfig;
	exports.UIEvent = UIEvent;
	exports.UIGroup = UIGroup;
	exports.UILib = UILib;
	exports.UIUtils = UIUtils;
	exports.VBox = VBox;
	exports.VScrollBar = VScrollBar;
	exports.VSlider = VSlider;
	exports.View = View;
	exports.ViewStack = ViewStack;
	exports.WXOpenDataViewer = WXOpenDataViewer;
	exports.Widget = Widget;
})(window.Laya = window.Laya || {}, Laya);
