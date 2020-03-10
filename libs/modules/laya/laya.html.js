"use strict";

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (exports, Laya) {
    'use strict';

    var HTMLExtendStyle = function () {
        function HTMLExtendStyle() {
            _classCallCheck(this, HTMLExtendStyle);

            this.reset();
        }

        _createClass(HTMLExtendStyle, [{
            key: "reset",
            value: function reset() {
                this.stroke = 0;
                this.strokeColor = "#000000";
                this.leading = 0;
                this.lineHeight = 0;
                this.letterSpacing = 0;
                this.href = null;
                return this;
            }
        }, {
            key: "recover",
            value: function recover() {
                if (this == HTMLExtendStyle.EMPTY) return;
                Laya.Pool.recover("HTMLExtendStyle", this.reset());
            }
        }], [{
            key: "create",
            value: function create() {
                return Laya.Pool.getItemByClass("HTMLExtendStyle", HTMLExtendStyle);
            }
        }]);

        return HTMLExtendStyle;
    }();

    HTMLExtendStyle.EMPTY = new HTMLExtendStyle();
    Laya.ClassUtils.regClass("laya.html.utils.HTMLExtendStyle", HTMLExtendStyle);
    Laya.ClassUtils.regClass("Laya.HTMLExtendStyle", HTMLExtendStyle);

    var HTMLStyle = function () {
        function HTMLStyle() {
            _classCallCheck(this, HTMLStyle);

            this.padding = HTMLStyle._PADDING;
            this.reset();
        }

        _createClass(HTMLStyle, [{
            key: "_getExtendStyle",
            value: function _getExtendStyle() {
                if (this._extendStyle === HTMLExtendStyle.EMPTY) this._extendStyle = HTMLExtendStyle.create();
                return this._extendStyle;
            }
        }, {
            key: "reset",
            value: function reset() {
                this.ower = null;
                this._type = 0;
                this.wordWrap = true;
                this.fontSize = Laya.ILaya.Text.defaultFontSize;
                this.family = Laya.ILaya.Text.defaultFont;
                this.color = "#000000";
                this.valign = HTMLStyle.VALIGN_TOP;
                this.padding = HTMLStyle._PADDING;
                this.bold = false;
                this.italic = false;
                this.align = HTMLStyle.ALIGN_LEFT;
                this.textDecoration = null;
                this.bgColor = null;
                this.borderColor = null;
                if (this._extendStyle) this._extendStyle.recover();
                this._extendStyle = HTMLExtendStyle.EMPTY;
                return this;
            }
        }, {
            key: "recover",
            value: function recover() {
                Laya.Pool.recover("HTMLStyle", this.reset());
            }
        }, {
            key: "inherit",
            value: function inherit(src) {
                var i, len;
                var props;
                props = HTMLStyle._inheritProps;
                len = props.length;
                var key;
                for (i = 0; i < len; i++) {
                    key = props[i];
                    this[key] = src[key];
                }
            }
        }, {
            key: "_widthAuto",
            value: function _widthAuto() {
                return (this._type & HTMLStyle._WIDTHAUTO) !== 0;
            }
        }, {
            key: "widthed",
            value: function widthed(sprite) {
                return (this._type & HTMLStyle._WIDTH_SET) != 0;
            }
        }, {
            key: "_calculation",
            value: function _calculation(type, value) {
                return false;
            }
        }, {
            key: "heighted",
            value: function heighted(sprite) {
                return (this._type & HTMLStyle._HEIGHT_SET) != 0;
            }
        }, {
            key: "size",
            value: function size(w, h) {
                var ower = this.ower;
                var resize = false;
                if (w !== -1 && w != ower.width) {
                    this._type |= HTMLStyle._WIDTH_SET;
                    ower.width = w;
                    resize = true;
                }
                if (h !== -1 && h != ower.height) {
                    this._type |= HTMLStyle._HEIGHT_SET;
                    ower.height = h;
                    resize = true;
                }
                if (resize) {
                    ower._layoutLater();
                }
            }
        }, {
            key: "getLineElement",
            value: function getLineElement() {
                return (this._type & HTMLStyle._LINE_ELEMENT) != 0;
            }
        }, {
            key: "setLineElement",
            value: function setLineElement(value) {
                value ? this._type |= HTMLStyle._LINE_ELEMENT : this._type &= ~HTMLStyle._LINE_ELEMENT;
            }
        }, {
            key: "_enableLayout",
            value: function _enableLayout() {
                return (this._type & HTMLStyle._DISPLAY_NONE) === 0 && (this._type & HTMLStyle._ABSOLUTE) === 0;
            }
        }, {
            key: "cssText",
            value: function cssText(text) {
                this.attrs(HTMLStyle.parseOneCSS(text, ';'));
            }
        }, {
            key: "attrs",
            value: function attrs(_attrs) {
                if (_attrs) {
                    for (var i = 0, n = _attrs.length; i < n; i++) {
                        var attr = _attrs[i];
                        this[attr[0]] = attr[1];
                    }
                }
            }
        }, {
            key: "href",
            get: function get() {
                return this._extendStyle.href;
            },
            set: function set(value) {
                if (value === this._extendStyle.href) return;
                this._getExtendStyle().href = value;
            }
        }, {
            key: "stroke",
            get: function get() {
                return this._extendStyle.stroke;
            },
            set: function set(value) {
                if (this._extendStyle.stroke === value) return;
                this._getExtendStyle().stroke = value;
            }
        }, {
            key: "strokeColor",
            get: function get() {
                return this._extendStyle.strokeColor;
            },
            set: function set(value) {
                if (this._extendStyle.strokeColor === value) return;
                this._getExtendStyle().strokeColor = value;
            }
        }, {
            key: "leading",
            get: function get() {
                return this._extendStyle.leading;
            },
            set: function set(value) {
                if (this._extendStyle.leading === value) return;
                this._getExtendStyle().leading = value;
            }
        }, {
            key: "lineHeight",
            get: function get() {
                return this._extendStyle.lineHeight;
            },
            set: function set(value) {
                if (this._extendStyle.lineHeight === value) return;
                this._getExtendStyle().lineHeight = value;
            }
        }, {
            key: "align",
            set: function set(v) {
                if (!(v in HTMLStyle.alignVDic)) return;
                this._type &= ~HTMLStyle._ALIGN;
                this._type |= HTMLStyle.alignVDic[v];
            },
            get: function get() {
                var v = this._type & HTMLStyle._ALIGN;
                return HTMLStyle.align_Value[v];
            }
        }, {
            key: "valign",
            set: function set(v) {
                if (!(v in HTMLStyle.alignVDic)) return;
                this._type &= ~HTMLStyle._VALIGN;
                this._type |= HTMLStyle.alignVDic[v];
            },
            get: function get() {
                var v = this._type & HTMLStyle._VALIGN;
                return HTMLStyle.vAlign_Value[v];
            }
        }, {
            key: "font",
            set: function set(value) {
                var strs = value.split(' ');
                for (var i = 0, n = strs.length; i < n; i++) {
                    var str = strs[i];
                    switch (str) {
                        case 'italic':
                            this.italic = true;
                            continue;
                        case 'bold':
                            this.bold = true;
                            continue;
                    }
                    if (str.indexOf('px') > 0) {
                        this.fontSize = parseInt(str);
                        this.family = strs[i + 1];
                        i++;
                        continue;
                    }
                }
            },
            get: function get() {
                return (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + (Laya.ILaya.Browser.onIPhone ? Laya.ILaya.Text.fontFamilyMap[this.family] || this.family : this.family);
            }
        }, {
            key: "block",
            set: function set(value) {
                value ? this._type |= HTMLStyle._CSS_BLOCK : this._type &= ~HTMLStyle._CSS_BLOCK;
            },
            get: function get() {
                return (this._type & HTMLStyle._CSS_BLOCK) != 0;
            }
        }, {
            key: "wordWrap",
            get: function get() {
                return (this._type & HTMLStyle._NOWARP) === 0;
            },
            set: function set(value) {
                value ? this._type &= ~HTMLStyle._NOWARP : this._type |= HTMLStyle._NOWARP;
            }
        }, {
            key: "bold",
            get: function get() {
                return (this._type & HTMLStyle._BOLD) != 0;
            },
            set: function set(value) {
                value ? this._type |= HTMLStyle._BOLD : this._type &= ~HTMLStyle._BOLD;
            }
        }, {
            key: "italic",
            get: function get() {
                return (this._type & HTMLStyle._ITALIC) != 0;
            },
            set: function set(value) {
                value ? this._type |= HTMLStyle._ITALIC : this._type &= ~HTMLStyle._ITALIC;
            }
        }, {
            key: "whiteSpace",
            set: function set(type) {
                type === "nowrap" && (this._type |= HTMLStyle._NOWARP);
                type === "none" && (this._type &= ~HTMLStyle._NOWARP);
            },
            get: function get() {
                return this._type & HTMLStyle._NOWARP ? "nowrap" : "";
            }
        }, {
            key: "width",
            set: function set(w) {
                this._type |= HTMLStyle._WIDTH_SET;
                if (typeof w == 'string') {
                    var offset = w.indexOf('auto');
                    if (offset >= 0) {
                        this._type |= HTMLStyle._WIDTHAUTO;
                        w = w.substr(0, offset);
                    }
                    if (this._calculation("width", w)) return;
                    w = parseInt(w);
                }
                this.size(w, -1);
            }
        }, {
            key: "height",
            set: function set(h) {
                this._type |= HTMLStyle._HEIGHT_SET;
                if (typeof h == 'string') {
                    if (this._calculation("height", h)) return;
                    h = parseInt(h);
                }
                this.size(-1, h);
            }
        }, {
            key: "letterSpacing",
            get: function get() {
                return this._extendStyle.letterSpacing;
            },
            set: function set(d) {
                typeof d == 'string' && (d = parseInt(d + ""));
                if (d == this._extendStyle.letterSpacing) return;
                this._getExtendStyle().letterSpacing = d;
            }
        }, {
            key: "position",
            set: function set(value) {
                value === "absolute" ? this._type |= HTMLStyle._ABSOLUTE : this._type &= ~HTMLStyle._ABSOLUTE;
            },
            get: function get() {
                return this._type & HTMLStyle._ABSOLUTE ? "absolute" : "";
            }
        }, {
            key: "absolute",
            get: function get() {
                return (this._type & HTMLStyle._ABSOLUTE) !== 0;
            }
        }, {
            key: "paddingLeft",
            get: function get() {
                return this.padding[3];
            }
        }, {
            key: "paddingTop",
            get: function get() {
                return this.padding[0];
            }
        }], [{
            key: "create",
            value: function create() {
                return Laya.Pool.getItemByClass("HTMLStyle", HTMLStyle);
            }
        }, {
            key: "parseOneCSS",
            value: function parseOneCSS(text, clipWord) {
                var out = [];
                var attrs = text.split(clipWord);
                var valueArray;
                for (var i = 0, n = attrs.length; i < n; i++) {
                    var attr = attrs[i];
                    var ofs = attr.indexOf(':');
                    var name = attr.substr(0, ofs).replace(/^\s+|\s+$/g, '');
                    if (name.length === 0) continue;
                    var value = attr.substr(ofs + 1).replace(/^\s+|\s+$/g, '');
                    var one = [name, value];
                    switch (name) {
                        case 'italic':
                        case 'bold':
                            one[1] = value == "true";
                            break;
                        case "font-weight":
                            if (value == "bold") {
                                one[1] = true;
                                one[0] = "bold";
                            }
                            break;
                        case 'line-height':
                            one[0] = 'lineHeight';
                            one[1] = parseInt(value);
                            break;
                        case 'font-size':
                            one[0] = 'fontSize';
                            one[1] = parseInt(value);
                            break;
                        case 'stroke':
                            one[0] = 'stroke';
                            one[1] = parseInt(value);
                            break;
                        case 'padding':
                            valueArray = value.split(' ');
                            valueArray.length > 1 || (valueArray[1] = valueArray[2] = valueArray[3] = valueArray[0]);
                            one[1] = [parseInt(valueArray[0]), parseInt(valueArray[1]), parseInt(valueArray[2]), parseInt(valueArray[3])];
                            break;
                        default:
                            (one[0] = HTMLStyle._CSSTOVALUE[name]) || (one[0] = name);
                    }
                    out.push(one);
                }
                return out;
            }
        }, {
            key: "parseCSS",
            value: function parseCSS(text, uri) {
                var one;
                while ((one = HTMLStyle._parseCSSRegExp.exec(text)) != null) {
                    HTMLStyle.styleSheets[one[1]] = HTMLStyle.parseOneCSS(one[2], ';');
                }
            }
        }]);

        return HTMLStyle;
    }();

    HTMLStyle._CSSTOVALUE = { 'letter-spacing': 'letterSpacing', 'white-space': 'whiteSpace', 'line-height': 'lineHeight', 'font-family': 'family', 'vertical-align': 'valign', 'text-decoration': 'textDecoration', 'background-color': 'bgColor', 'border-color': 'borderColor' };
    HTMLStyle._parseCSSRegExp = new RegExp("([\.\#]\\w+)\\s*{([\\s\\S]*?)}", "g");
    HTMLStyle._inheritProps = ["italic", "align", "valign", "leading", "stroke", "strokeColor", "bold", "fontSize", "lineHeight", "wordWrap", "color"];
    HTMLStyle.ALIGN_LEFT = "left";
    HTMLStyle.ALIGN_CENTER = "center";
    HTMLStyle.ALIGN_RIGHT = "right";
    HTMLStyle.VALIGN_TOP = "top";
    HTMLStyle.VALIGN_MIDDLE = "middle";
    HTMLStyle.VALIGN_BOTTOM = "bottom";
    HTMLStyle.styleSheets = {};
    HTMLStyle.ADDLAYOUTED = 0x200;
    HTMLStyle._PADDING = [0, 0, 0, 0];
    HTMLStyle._HEIGHT_SET = 0x2000;
    HTMLStyle._LINE_ELEMENT = 0x10000;
    HTMLStyle._NOWARP = 0x20000;
    HTMLStyle._WIDTHAUTO = 0x40000;
    HTMLStyle._BOLD = 0x400;
    HTMLStyle._ITALIC = 0x800;
    HTMLStyle._CSS_BLOCK = 0x1;
    HTMLStyle._DISPLAY_NONE = 0x2;
    HTMLStyle._ABSOLUTE = 0x4;
    HTMLStyle._WIDTH_SET = 0x8;
    HTMLStyle.alignVDic = { "left": 0, "center": 0x10, "right": 0x20, "top": 0, "middle": 0x40, "bottom": 0x80 };
    HTMLStyle.align_Value = { 0: "left", 0x10: "center", 0x20: "right" };
    HTMLStyle.vAlign_Value = { 0: "top", 0x40: "middle", 0x80: "bottom" };
    HTMLStyle._ALIGN = 0x30;
    HTMLStyle._VALIGN = 0xc0;
    Laya.ClassUtils.regClass("laya.html.utils.HTMLStyle", HTMLStyle);
    Laya.ClassUtils.regClass("Laya.HTMLStyle", HTMLStyle);

    var HTMLDocument = function () {
        function HTMLDocument() {
            _classCallCheck(this, HTMLDocument);

            this.all = [];
            this.styleSheets = HTMLStyle.styleSheets;
        }

        _createClass(HTMLDocument, [{
            key: "getElementById",
            value: function getElementById(id) {
                return this.all[id];
            }
        }, {
            key: "setElementById",
            value: function setElementById(id, e) {
                this.all[id] = e;
            }
        }]);

        return HTMLDocument;
    }();

    HTMLDocument.document = new HTMLDocument();
    Laya.ClassUtils.regClass("laya.html.dom.HTMLDocument", HTMLDocument);
    Laya.ClassUtils.regClass("Laya.HTMLDocument", HTMLDocument);

    var HTMLHitRect = function () {
        function HTMLHitRect() {
            _classCallCheck(this, HTMLHitRect);

            this.rec = new Laya.Rectangle();
            this.reset();
        }

        _createClass(HTMLHitRect, [{
            key: "reset",
            value: function reset() {
                this.rec.reset();
                this.href = null;
                return this;
            }
        }, {
            key: "recover",
            value: function recover() {
                Laya.Pool.recover("HTMLHitRect", this.reset());
            }
        }], [{
            key: "create",
            value: function create() {
                return Laya.Pool.getItemByClass("HTMLHitRect", HTMLHitRect);
            }
        }]);

        return HTMLHitRect;
    }();

    Laya.ClassUtils.regClass("laya.html.dom.HTMLHitRect", HTMLHitRect);
    Laya.ClassUtils.regClass("Laya.HTMLHitRect", HTMLHitRect);

    var IHtml = function IHtml() {
        _classCallCheck(this, IHtml);
    };

    IHtml.HTMLDivElement = null;
    IHtml.HTMLImageElement = null;
    IHtml.HTMLBrElement = null;
    IHtml.HTMLDivParser = null;
    IHtml.HTMLParse = null;
    IHtml.HTMLElementType = null;

    var LayoutLine = function () {
        function LayoutLine() {
            _classCallCheck(this, LayoutLine);

            this.elements = [];
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.wordStartIndex = 0;
            this.minTextHeight = 99999;
            this.mWidth = 0;
        }

        _createClass(LayoutLine, [{
            key: "updatePos",
            value: function updatePos(left, width, lineNum, dy, align, valign, lineHeight) {
                var w = 0;
                var one;
                if (this.elements.length > 0) {
                    one = this.elements[this.elements.length - 1];
                    w = one.x + one.width - this.elements[0].x;
                }
                lineHeight = lineHeight || this.h;
                var dx = 0,
                    ddy;
                if (align === HTMLStyle.ALIGN_CENTER) dx = (width - w) / 2;
                if (align === HTMLStyle.ALIGN_RIGHT) dx = width - w;
                for (var i = 0, n = this.elements.length; i < n; i++) {
                    one = this.elements[i];
                    var tCSSStyle = one._getCSSStyle();
                    dx !== 0 && (one.x += dx);
                    switch (tCSSStyle.valign) {
                        case "top":
                            one.y = dy;
                            break;
                        case "middle":
                            var tMinTextHeight = 0;
                            if (this.minTextHeight != 99999) tMinTextHeight = this.minTextHeight;
                            var tBottomLineY = (tMinTextHeight + lineHeight) / 2;
                            tBottomLineY = Math.max(tBottomLineY, this.h);
                            if (one.eletype == IHtml.HTMLElementType.IMAGE) ddy = dy + tBottomLineY - one.height;else ddy = dy + tBottomLineY - one.height;
                            one.y = ddy;
                            break;
                        case "bottom":
                            one.y = dy + (lineHeight - one.height);
                            break;
                    }
                }
            }
        }]);

        return LayoutLine;
    }();

    Laya.ClassUtils.regClass("laya.html.utils.LayoutLine", LayoutLine);
    Laya.ClassUtils.regClass("Laya.LayoutLine", LayoutLine);

    var Layout = function () {
        function Layout() {
            _classCallCheck(this, Layout);
        }

        _createClass(Layout, null, [{
            key: "later",
            value: function later(element) {
                if (Layout._will == null) {
                    Layout._will = [];
                    Laya.ILaya.stage.frameLoop(1, null, function () {
                        if (Layout._will.length < 1) return;
                        for (var i = 0; i < Layout._will.length; i++) {
                            Layout.layout(Layout._will[i]);
                        }
                        Layout._will.length = 0;
                    });
                }
                Layout._will.push(element);
            }
        }, {
            key: "layout",
            value: function layout(element) {
                if (!element || !element._style) return null;
                var style = element._style;
                if ((style._type & HTMLStyle.ADDLAYOUTED) === 0) return null;
                element.style._type &= ~HTMLStyle.ADDLAYOUTED;
                var arr = Layout._multiLineLayout(element);
                return arr;
            }
        }, {
            key: "_multiLineLayout",
            value: function _multiLineLayout(element) {
                var elements = [];
                element._addChildsToLayout(elements);
                var i,
                    n = elements.length;
                var style = element._getCSSStyle();
                var letterSpacing = style.letterSpacing;
                var leading = style.leading;
                var lineHeight = style.lineHeight;
                var widthAuto = style._widthAuto() || !style.wordWrap;
                var width = widthAuto ? 999999 : element.width;
                var height = element.height;
                var maxWidth = 0;
                var exWidth = style.italic ? style.fontSize / 3 : 0;
                var align = style.align;
                var valign = style.valign;
                var endAdjust = valign !== HTMLStyle.VALIGN_TOP || align !== HTMLStyle.ALIGN_LEFT || lineHeight != 0;
                var oneLayout;
                var x = 0;
                var y = 0;
                var w = 0;
                var h = 0;
                var lines = [];
                var curStyle;
                var curPadding;
                var curLine = lines[0] = new LayoutLine();
                var newLine,
                    nextNewline = false;
                var htmlWord;
                var sprite;
                curLine.h = 0;
                if (style.italic) width -= style.fontSize / 3;
                var tWordWidth = 0;
                var tLineFirstKey = true;
                function addLine() {
                    curLine.y = y;
                    y += curLine.h + leading;
                    curLine.mWidth = tWordWidth;
                    tWordWidth = 0;
                    curLine = new LayoutLine();
                    lines.push(curLine);
                    curLine.h = 0;
                    x = 0;
                    tLineFirstKey = true;
                    newLine = false;
                }
                for (i = 0; i < n; i++) {
                    oneLayout = elements[i];
                    if (oneLayout == null) {
                        if (!tLineFirstKey) {
                            x += Layout.DIV_ELEMENT_PADDING;
                        }
                        curLine.wordStartIndex = curLine.elements.length;
                        continue;
                    }
                    tLineFirstKey = false;
                    if (oneLayout instanceof IHtml.HTMLBrElement) {
                        addLine();
                        curLine.y = y;
                        curLine.h = lineHeight;
                        continue;
                    } else if (oneLayout._isChar()) {
                        htmlWord = oneLayout;
                        if (!htmlWord.isWord) {
                            if (lines.length > 0 && x + w > width && curLine.wordStartIndex > 0) {
                                var tLineWord = 0;
                                tLineWord = curLine.elements.length - curLine.wordStartIndex + 1;
                                curLine.elements.length = curLine.wordStartIndex;
                                i -= tLineWord;
                                addLine();
                                continue;
                            }
                            newLine = false;
                            tWordWidth += htmlWord.width;
                        } else {
                            newLine = nextNewline || htmlWord.char === '\n';
                            curLine.wordStartIndex = curLine.elements.length;
                        }
                        w = htmlWord.width + htmlWord.style.letterSpacing;
                        h = htmlWord.height;
                        nextNewline = false;
                        newLine = newLine || x + w > width;
                        newLine && addLine();
                        curLine.minTextHeight = Math.min(curLine.minTextHeight, oneLayout.height);
                    } else {
                        curStyle = oneLayout._getCSSStyle();
                        sprite = oneLayout;
                        curPadding = curStyle.padding;
                        newLine = nextNewline || curStyle.getLineElement();
                        w = sprite.width + curPadding[1] + curPadding[3] + curStyle.letterSpacing;
                        h = sprite.height + curPadding[0] + curPadding[2];
                        nextNewline = curStyle.getLineElement();
                        newLine = newLine || x + w > width && curStyle.wordWrap;
                        newLine && addLine();
                    }
                    curLine.elements.push(oneLayout);
                    curLine.h = Math.max(curLine.h, h);
                    oneLayout.x = x;
                    oneLayout.y = y;
                    x += w;
                    curLine.w = x - letterSpacing;
                    curLine.y = y;
                    maxWidth = Math.max(x + exWidth, maxWidth);
                }
                y = curLine.y + curLine.h;
                if (endAdjust) {
                    var tY = 0;
                    var tWidth = width;
                    if (widthAuto && element.width > 0) {
                        tWidth = element.width;
                    }
                    for (i = 0, n = lines.length; i < n; i++) {
                        lines[i].updatePos(0, tWidth, i, tY, align, valign, lineHeight);
                        tY += Math.max(lineHeight, lines[i].h + leading);
                    }
                    y = tY;
                }
                widthAuto && (element.width = maxWidth);
                y > element.height && (element.height = y);
                return [maxWidth, y];
            }
        }]);

        return Layout;
    }();

    Layout.DIV_ELEMENT_PADDING = 0;
    Laya.ClassUtils.regClass("laya.html.utils.Layout", Layout);
    Laya.ClassUtils.regClass("Laya.Layout", Layout);

    (function (HTMLElementType) {
        HTMLElementType[HTMLElementType["BASE"] = 0] = "BASE";
        HTMLElementType[HTMLElementType["IMAGE"] = 1] = "IMAGE";
    })(exports.HTMLElementType || (exports.HTMLElementType = {}));

    var HTMLElement = function () {
        function HTMLElement() {
            _classCallCheck(this, HTMLElement);

            this.eletype = exports.HTMLElementType.BASE;
            this._creates();
            this.reset();
        }

        _createClass(HTMLElement, [{
            key: "_creates",
            value: function _creates() {
                this._style = HTMLStyle.create();
            }
        }, {
            key: "reset",
            value: function reset() {
                this.URI = null;
                this.parent = null;
                this._style.reset();
                this._style.ower = this;
                this._style.valign = "middle";
                if (this._text && this._text.words) {
                    var words = this._text.words;
                    var i, len;
                    len = words.length;
                    var tChar;
                    for (i = 0; i < len; i++) {
                        tChar = words[i];
                        if (tChar) tChar.recover();
                    }
                }
                this._text = HTMLElement._EMPTYTEXT;
                if (this._children) this._children.length = 0;
                this._x = this._y = this._width = this._height = 0;
                return this;
            }
        }, {
            key: "_getCSSStyle",
            value: function _getCSSStyle() {
                return this._style;
            }
        }, {
            key: "_addChildsToLayout",
            value: function _addChildsToLayout(out) {
                var words = this._getWords();
                if (words == null && (!this._children || this._children.length == 0)) return false;
                if (words) {
                    for (var i = 0, n = words.length; i < n; i++) {
                        out.push(words[i]);
                    }
                }
                if (this._children) this._children.forEach(function (o, index, array) {
                    var _style = o._style;
                    _style._enableLayout && _style._enableLayout() && o._addToLayout(out);
                });
                return true;
            }
        }, {
            key: "_addToLayout",
            value: function _addToLayout(out) {
                if (!this._style) return;
                var style = this._style;
                if (style.absolute) return;
                style.block ? out.push(this) : this._addChildsToLayout(out) && (this.x = this.y = 0);
            }
        }, {
            key: "repaint",
            value: function repaint() {
                var recreate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                this.parentRepaint(recreate);
            }
        }, {
            key: "parentRepaint",
            value: function parentRepaint() {
                var recreate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (this.parent) this.parent.repaint(recreate);
            }
        }, {
            key: "_setParent",
            value: function _setParent(value) {
                if (value instanceof HTMLElement) {
                    var p = value;
                    this.URI || (this.URI = p.URI);
                    if (this.style) this.style.inherit(p.style);
                }
            }
        }, {
            key: "appendChild",
            value: function appendChild(c) {
                return this.addChild(c);
            }
        }, {
            key: "addChild",
            value: function addChild(c) {
                if (c.parent) c.parent.removeChild(c);
                if (!this._children) this._children = [];
                this._children.push(c);
                c.parent = this;
                c._setParent(this);
                this.repaint();
                return c;
            }
        }, {
            key: "removeChild",
            value: function removeChild(c) {
                if (!this._children) return null;
                var i, len;
                len = this._children.length;
                for (i = 0; i < len; i++) {
                    if (this._children[i] == c) {
                        this._children.splice(i, 1);
                        return c;
                    }
                }
                return null;
            }
        }, {
            key: "destroy",
            value: function destroy() {
                if (this._children) {
                    this.destroyChildren();
                    this._children.length = 0;
                }
                Laya.Pool.recover(HTMLElement.getClassName(this), this.reset());
            }
        }, {
            key: "destroyChildren",
            value: function destroyChildren() {
                if (this._children) {
                    for (var i = this._children.length - 1; i > -1; i--) {
                        this._children[i].destroy();
                    }
                    this._children.length = 0;
                }
            }
        }, {
            key: "_getWords",
            value: function _getWords() {
                if (!this._text) return null;
                var txt = this._text.text;
                if (!txt || txt.length === 0) return null;
                var words = this._text.words;
                if (words && words.length === txt.length) return words;
                words === null && (this._text.words = words = []);
                words.length = txt.length;
                var size;
                var style = this.style;
                var fontStr = style.font;
                for (var i = 0, n = txt.length; i < n; i++) {
                    size = Laya.ILaya.Browser.measureText(txt.charAt(i), fontStr);
                    words[i] = Laya.HTMLChar.create().setData(txt.charAt(i), size.width, size.height || style.fontSize, style);
                }
                return words;
            }
        }, {
            key: "_isChar",
            value: function _isChar() {
                return false;
            }
        }, {
            key: "_layoutLater",
            value: function _layoutLater() {
                var style = this.style;
                if (style._type & HTMLStyle.ADDLAYOUTED) return;
                if (style.widthed(this) && (this._children && this._children.length > 0 || this._getWords() != null) && style.block) {
                    Layout.later(this);
                    style._type |= HTMLStyle.ADDLAYOUTED;
                } else {
                    this.parent && this.parent._layoutLater();
                }
            }
        }, {
            key: "_setAttributes",
            value: function _setAttributes(name, value) {
                switch (name) {
                    case 'style':
                        this.style.cssText(value);
                        break;
                    case 'class':
                        this.className = value;
                        break;
                    case 'x':
                        this.x = parseFloat(value);
                        break;
                    case 'y':
                        this.y = parseFloat(value);
                        break;
                    case 'width':
                        this.width = parseFloat(value);
                        break;
                    case 'height':
                        this.height = parseFloat(value);
                        break;
                    default:
                        this[name] = value;
                }
            }
        }, {
            key: "formatURL",
            value: function formatURL(url) {
                if (!this.URI) return url;
                return HTMLElement.formatURL1(url, this.URI ? this.URI.path : null);
            }
        }, {
            key: "drawToGraphic",
            value: function drawToGraphic(graphic, gX, gY, recList) {
                gX += this.x;
                gY += this.y;
                var cssStyle = this.style;
                if (cssStyle.paddingLeft) {
                    gX += cssStyle.paddingLeft;
                }
                if (cssStyle.paddingTop) {
                    gY += cssStyle.paddingTop;
                }
                if (cssStyle.bgColor != null || cssStyle.borderColor) {
                    graphic.drawRect(gX, gY, this.width, this.height, cssStyle.bgColor, cssStyle.borderColor, 1);
                }
                this.renderSelfToGraphic(graphic, gX, gY, recList);
                var i, len;
                var tChild;
                if (this._children && this._children.length > 0) {
                    len = this._children.length;
                    for (i = 0; i < len; i++) {
                        tChild = this._children[i];
                        if (tChild.drawToGraphic != null) tChild.drawToGraphic(graphic, gX, gY, recList);
                    }
                }
            }
        }, {
            key: "renderSelfToGraphic",
            value: function renderSelfToGraphic(graphic, gX, gY, recList) {
                var cssStyle = this.style;
                var words = this._getWords();
                var len;
                if (words) {
                    len = words.length;
                    if (cssStyle) {
                        var font = cssStyle.font;
                        var color = cssStyle.color;
                        if (cssStyle.stroke) {
                            var stroke = cssStyle.stroke;
                            stroke = parseInt(stroke);
                            var strokeColor = cssStyle.strokeColor;
                            graphic.fillBorderWords(words, gX, gY, font, color, strokeColor, stroke);
                        } else {
                            graphic.fillWords(words, gX, gY, font, color);
                        }
                        if (this.href) {
                            var lastIndex = words.length - 1;
                            var lastWords = words[lastIndex];
                            var lineY = lastWords.y + lastWords.height;
                            if (lastWords.y == words[0].y) {
                                if (cssStyle.textDecoration != "none") graphic.drawLine(words[0].x, lineY, lastWords.x + lastWords.width, lineY, color, 1);
                                var hitRec = HTMLHitRect.create();
                                hitRec.rec.setTo(words[0].x, lastWords.y, lastWords.x + lastWords.width - words[0].x, lastWords.height);
                                hitRec.href = this.href;
                                recList.push(hitRec);
                            } else {
                                this.workLines(words, graphic, recList);
                            }
                        }
                    }
                }
            }
        }, {
            key: "workLines",
            value: function workLines(wordList, g, recList) {
                var cssStyle = this.style;
                var hasLine;
                hasLine = cssStyle.textDecoration != "none";
                var i, len;
                len = wordList.length;
                var tStartWord;
                tStartWord = wordList[i];
                var tEndWord;
                tEndWord = tStartWord;
                if (!tStartWord) return;
                var tword;
                for (i = 1; i < len; i++) {
                    tword = wordList[i];
                    if (tword.y != tStartWord.y) {
                        this.createOneLine(tStartWord, tEndWord, hasLine, g, recList);
                        tStartWord = tword;
                        tEndWord = tword;
                    } else {
                        tEndWord = tword;
                    }
                }
                this.createOneLine(tStartWord, tEndWord, hasLine, g, recList);
            }
        }, {
            key: "createOneLine",
            value: function createOneLine(startWord, lastWords, hasLine, graphic, recList) {
                var lineY = lastWords.y + lastWords.height;
                if (hasLine) graphic.drawLine(startWord.x, lineY, lastWords.x + lastWords.width, lineY, this.style.color, 1);
                var hitRec = HTMLHitRect.create();
                hitRec.rec.setTo(startWord.x, lastWords.y, lastWords.x + lastWords.width - startWord.x, lastWords.height);
                hitRec.href = this.href;
                recList.push(hitRec);
            }
        }, {
            key: "id",
            set: function set(value) {
                HTMLDocument.document.setElementById(value, this);
            }
        }, {
            key: "innerTEXT",
            set: function set(value) {
                if (this._text === HTMLElement._EMPTYTEXT) {
                    this._text = { text: value, words: null };
                } else {
                    this._text.text = value;
                    this._text.words && (this._text.words.length = 0);
                }
                this.repaint();
            },
            get: function get() {
                return this._text.text;
            }
        }, {
            key: "style",
            get: function get() {
                return this._style;
            }
        }, {
            key: "x",
            set: function set(v) {
                if (this._x != v) {
                    this._x = v;
                    this.parentRepaint();
                }
            },
            get: function get() {
                return this._x;
            }
        }, {
            key: "y",
            set: function set(v) {
                if (this._y != v) {
                    this._y = v;
                    this.parentRepaint();
                }
            },
            get: function get() {
                return this._y;
            }
        }, {
            key: "width",
            get: function get() {
                return this._width;
            },
            set: function set(value) {
                if (this._width !== value) {
                    this._width = value;
                    this.repaint();
                }
            }
        }, {
            key: "height",
            get: function get() {
                return this._height;
            },
            set: function set(value) {
                if (this._height !== value) {
                    this._height = value;
                    this.repaint();
                }
            }
        }, {
            key: "href",
            set: function set(url) {
                if (!this._style) return;
                if (url != this._style.href) {
                    this._style.href = url;
                    this.repaint();
                }
            },
            get: function get() {
                if (!this._style) return null;
                return this._style.href;
            }
        }, {
            key: "color",
            set: function set(value) {
                this.style.color = value;
            }
        }, {
            key: "className",
            set: function set(value) {
                this.style.attrs(HTMLDocument.document.styleSheets['.' + value]);
            }
        }], [{
            key: "formatURL1",
            value: function formatURL1(url) {
                var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                if (!url) return "null path";
                if (!basePath) basePath = Laya.URL.basePath;
                if (url.indexOf(":") > 0) return url;
                if (Laya.URL.customFormat != null) url = Laya.URL.customFormat(url);
                if (url.indexOf(":") > 0) return url;
                var char1 = url.charAt(0);
                if (char1 === ".") {
                    return Laya.URL._formatRelativePath(basePath + url);
                } else if (char1 === '~') {
                    return Laya.URL.rootPath + url.substring(1);
                } else if (char1 === "d") {
                    if (url.indexOf("data:image") === 0) return url;
                } else if (char1 === "/") {
                    return url;
                }
                return basePath + url;
            }
        }, {
            key: "getClassName",
            value: function getClassName(tar) {
                if (tar instanceof Function) return tar.name;
                return tar["constructor"].name;
            }
        }]);

        return HTMLElement;
    }();

    HTMLElement._EMPTYTEXT = { text: null, words: null };
    Laya.ILaya.regClass(HTMLElement);
    IHtml.HTMLElementType = exports.HTMLElementType;
    Laya.ClassUtils.regClass("laya.html.dom.HTMLElement", HTMLElement);
    Laya.ClassUtils.regClass("Laya.HTMLElement", HTMLElement);

    var HTMLBrElement = function () {
        function HTMLBrElement() {
            _classCallCheck(this, HTMLBrElement);
        }

        _createClass(HTMLBrElement, [{
            key: "_addToLayout",
            value: function _addToLayout(out) {
                out.push(this);
            }
        }, {
            key: "reset",
            value: function reset() {
                return this;
            }
        }, {
            key: "destroy",
            value: function destroy() {
                Laya.Pool.recover(HTMLElement.getClassName(this), this.reset());
            }
        }, {
            key: "_setParent",
            value: function _setParent(value) {}
        }, {
            key: "_getCSSStyle",
            value: function _getCSSStyle() {
                if (!HTMLBrElement.brStyle) {
                    HTMLBrElement.brStyle = new HTMLStyle();
                    HTMLBrElement.brStyle.setLineElement(true);
                    HTMLBrElement.brStyle.block = true;
                }
                return HTMLBrElement.brStyle;
            }
        }, {
            key: "renderSelfToGraphic",
            value: function renderSelfToGraphic(graphic, gX, gY, recList) {}
        }, {
            key: "parent",
            set: function set(value) {}
        }, {
            key: "URI",
            set: function set(value) {}
        }, {
            key: "href",
            set: function set(value) {}
        }]);

        return HTMLBrElement;
    }();

    IHtml.HTMLBrElement = HTMLBrElement;
    Laya.ILaya.regClass(HTMLBrElement);
    Laya.ClassUtils.regClass("laya.html.dom.HTMLBrElement", HTMLBrElement);
    Laya.ClassUtils.regClass("Laya.HTMLBrElement", HTMLBrElement);

    var HTMLStyleElement = function (_HTMLElement) {
        _inherits(HTMLStyleElement, _HTMLElement);

        function HTMLStyleElement() {
            _classCallCheck(this, HTMLStyleElement);

            return _possibleConstructorReturn(this, (HTMLStyleElement.__proto__ || Object.getPrototypeOf(HTMLStyleElement)).apply(this, arguments));
        }

        _createClass(HTMLStyleElement, [{
            key: "_creates",
            value: function _creates() {}
        }, {
            key: "drawToGraphic",
            value: function drawToGraphic(graphic, gX, gY, recList) {}
        }, {
            key: "reset",
            value: function reset() {
                return this;
            }
        }, {
            key: "innerTEXT",
            set: function set(value) {
                HTMLStyle.parseCSS(value, null);
            },
            get: function get() {
                return _get(HTMLStyleElement.prototype.__proto__ || Object.getPrototypeOf(HTMLStyleElement.prototype), "innerTEXT", this);
            }
        }]);

        return HTMLStyleElement;
    }(HTMLElement);

    Laya.ILaya.regClass(HTMLStyleElement);
    Laya.ClassUtils.regClass("laya.html.dom.HTMLStyleElement", HTMLStyleElement);
    Laya.ClassUtils.regClass("Laya.HTMLStyleElement", HTMLStyleElement);

    var HTMLLinkElement = function (_HTMLElement2) {
        _inherits(HTMLLinkElement, _HTMLElement2);

        function HTMLLinkElement() {
            _classCallCheck(this, HTMLLinkElement);

            return _possibleConstructorReturn(this, (HTMLLinkElement.__proto__ || Object.getPrototypeOf(HTMLLinkElement)).apply(this, arguments));
        }

        _createClass(HTMLLinkElement, [{
            key: "_creates",
            value: function _creates() {}
        }, {
            key: "drawToGraphic",
            value: function drawToGraphic(graphic, gX, gY, recList) {}
        }, {
            key: "reset",
            value: function reset() {
                if (this._loader) this._loader.off(Laya.Event.COMPLETE, this, this._onload);
                this._loader = null;
                return this;
            }
        }, {
            key: "_onload",
            value: function _onload(data) {
                if (this._loader) this._loader = null;
                switch (this.type) {
                    case 'text/css':
                        HTMLStyle.parseCSS(data, this.URI);
                        break;
                }
                this.repaint(true);
            }
        }, {
            key: "href",
            set: function set(url) {
                if (!url) return;
                url = this.formatURL(url);
                this.URI = new Laya.URL(url);
                if (this._loader) this._loader.off(Laya.Event.COMPLETE, this, this._onload);
                if (Laya.Loader.getRes(url)) {
                    if (this.type == "text/css") {
                        HTMLStyle.parseCSS(Laya.Loader.getRes(url), this.URI);
                    }
                    return;
                }
                this._loader = new Laya.Loader();
                this._loader.once(Laya.Event.COMPLETE, this, this._onload);
                this._loader.load(url, Laya.Loader.TEXT);
            },
            get: function get() {
                return _get(HTMLLinkElement.prototype.__proto__ || Object.getPrototypeOf(HTMLLinkElement.prototype), "href", this);
            }
        }]);

        return HTMLLinkElement;
    }(HTMLElement);

    HTMLLinkElement._cuttingStyle = new RegExp("((@keyframes[\\s\\t]+|)(.+))[\\t\\n\\r\\\s]*{", "g");
    Laya.ILaya.regClass(HTMLLinkElement);
    Laya.ClassUtils.regClass("laya.html.dom.HTMLLinkElement", HTMLLinkElement);
    Laya.ClassUtils.regClass("Laya.HTMLLinkElement", HTMLLinkElement);

    var HTMLDivParser = function (_HTMLElement3) {
        _inherits(HTMLDivParser, _HTMLElement3);

        function HTMLDivParser() {
            _classCallCheck(this, HTMLDivParser);

            var _this3 = _possibleConstructorReturn(this, (HTMLDivParser.__proto__ || Object.getPrototypeOf(HTMLDivParser)).apply(this, arguments));

            _this3.repaintHandler = null;
            return _this3;
        }

        _createClass(HTMLDivParser, [{
            key: "reset",
            value: function reset() {
                _get(HTMLDivParser.prototype.__proto__ || Object.getPrototypeOf(HTMLDivParser.prototype), "reset", this).call(this);
                this._style.block = true;
                this._style.setLineElement(true);
                this._style.width = 200;
                this._style.height = 200;
                this.repaintHandler = null;
                this.contextHeight = 0;
                this.contextWidth = 0;
                return this;
            }
        }, {
            key: "appendHTML",
            value: function appendHTML(text) {
                IHtml.HTMLParse.parse(this, text, this.URI);
                this.layout();
            }
        }, {
            key: "_addChildsToLayout",
            value: function _addChildsToLayout(out) {
                var words = this._getWords();
                if (words == null && (!this._children || this._children.length == 0)) return false;
                words && words.forEach(function (o) {
                    out.push(o);
                });
                var tFirstKey = true;
                for (var i = 0, len = this._children.length; i < len; i++) {
                    var o = this._children[i];
                    if (tFirstKey) {
                        tFirstKey = false;
                    } else {
                        out.push(null);
                    }
                    o._addToLayout(out);
                }
                return true;
            }
        }, {
            key: "_addToLayout",
            value: function _addToLayout(out) {
                this.layout();
                !this.style.absolute && out.push(this);
            }
        }, {
            key: "getBounds",
            value: function getBounds() {
                if (!this._htmlBounds) return null;
                if (!this._boundsRec) this._boundsRec = Laya.Rectangle.create();
                return this._boundsRec.copyFrom(this._htmlBounds);
            }
        }, {
            key: "parentRepaint",
            value: function parentRepaint() {
                var recreate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                _get(HTMLDivParser.prototype.__proto__ || Object.getPrototypeOf(HTMLDivParser.prototype), "parentRepaint", this).call(this);
                if (this.repaintHandler) this.repaintHandler.runWith(recreate);
            }
        }, {
            key: "layout",
            value: function layout() {
                this.style._type |= HTMLStyle.ADDLAYOUTED;
                var tArray = Layout.layout(this);
                if (tArray) {
                    if (!this._htmlBounds) this._htmlBounds = Laya.Rectangle.create();
                    var tRectangle = this._htmlBounds;
                    tRectangle.x = tRectangle.y = 0;
                    tRectangle.width = this.contextWidth = tArray[0];
                    tRectangle.height = this.contextHeight = tArray[1];
                }
            }
        }, {
            key: "innerHTML",
            set: function set(text) {
                this.destroyChildren();
                this.appendHTML(text);
            }
        }, {
            key: "width",
            set: function set(value) {
                var changed;
                if (value === 0) {
                    changed = value != this._width;
                } else {
                    changed = value != this.width;
                }
                _set(HTMLDivParser.prototype.__proto__ || Object.getPrototypeOf(HTMLDivParser.prototype), "width", value, this);
                if (changed) this.layout();
            },
            get: function get() {
                if (this._width) return this._width;
                return this.contextWidth;
            }
        }, {
            key: "height",
            get: function get() {
                if (this._height) return this._height;
                return this.contextHeight;
            },
            set: function set(value) {
                _set(HTMLDivParser.prototype.__proto__ || Object.getPrototypeOf(HTMLDivParser.prototype), "height", value, this);
            }
        }]);

        return HTMLDivParser;
    }(HTMLElement);

    IHtml.HTMLDivParser = HTMLDivParser;
    Laya.ILaya.regClass(HTMLDivParser);
    Laya.ClassUtils.regClass("laya.html.dom.HTMLDivParser", HTMLDivParser);
    Laya.ClassUtils.regClass("Laya.HTMLDivParser", HTMLDivParser);

    var HTMLImageElement = function (_HTMLElement4) {
        _inherits(HTMLImageElement, _HTMLElement4);

        function HTMLImageElement() {
            _classCallCheck(this, HTMLImageElement);

            var _this4 = _possibleConstructorReturn(this, (HTMLImageElement.__proto__ || Object.getPrototypeOf(HTMLImageElement)).call(this));

            _this4.eletype = exports.HTMLElementType.IMAGE;
            return _this4;
        }

        _createClass(HTMLImageElement, [{
            key: "reset",
            value: function reset() {
                _get(HTMLImageElement.prototype.__proto__ || Object.getPrototypeOf(HTMLImageElement.prototype), "reset", this).call(this);
                if (this._tex) {
                    this._tex.off(Laya.Event.LOADED, this, this.onloaded);
                }
                this._tex = null;
                this._url = null;
                return this;
            }
        }, {
            key: "onloaded",
            value: function onloaded() {
                if (!this._style) return;
                var style = this._style;
                var w = style.widthed(this) ? -1 : this._tex.width;
                var h = style.heighted(this) ? -1 : this._tex.height;
                if (!style.widthed(this) && this._width != this._tex.width) {
                    this.width = this._tex.width;
                    this.parent && this.parent._layoutLater();
                }
                if (!style.heighted(this) && this._height != this._tex.height) {
                    this.height = this._tex.height;
                    this.parent && this.parent._layoutLater();
                }
                this.repaint();
            }
        }, {
            key: "_addToLayout",
            value: function _addToLayout(out) {
                var style = this._style;
                !style.absolute && out.push(this);
            }
        }, {
            key: "renderSelfToGraphic",
            value: function renderSelfToGraphic(graphic, gX, gY, recList) {
                if (!this._tex) return;
                graphic.drawImage(this._tex, gX, gY, this.width || this._tex.width, this.height || this._tex.height);
            }
        }, {
            key: "src",
            set: function set(url) {
                url = this.formatURL(url);
                if (this._url === url) return;
                this._url = url;
                var tex = this._tex = Laya.Loader.getRes(url);
                if (!tex) {
                    this._tex = tex = new Laya.Texture();
                    tex.load(url);
                    Laya.Loader.cacheTexture(url, tex);
                }
                tex.getIsReady() ? this.onloaded() : tex.once(Laya.Event.READY, this, this.onloaded);
            }
        }]);

        return HTMLImageElement;
    }(HTMLElement);

    IHtml.HTMLImageElement = HTMLImageElement;
    Laya.ILaya.regClass(HTMLImageElement);
    Laya.ClassUtils.regClass("laya.html.dom.HTMLImageElement", HTMLImageElement);
    Laya.ClassUtils.regClass("Laya.HTMLImageElement", HTMLImageElement);

    var HTMLParse = function () {
        function HTMLParse() {
            _classCallCheck(this, HTMLParse);
        }

        _createClass(HTMLParse, null, [{
            key: "getInstance",
            value: function getInstance(type) {
                var rst = Laya.Pool.getItem(HTMLParse._htmlClassMapShort[type]);
                if (!rst) {
                    rst = Laya.ClassUtils.getInstance(type);
                }
                return rst;
            }
        }, {
            key: "parse",
            value: function parse(ower, xmlString, url) {
                xmlString = xmlString.replace(/<br>/g, "<br/>");
                xmlString = "<root>" + xmlString + "</root>";
                xmlString = xmlString.replace(HTMLParse.spacePattern, HTMLParse.char255);
                var xml = Laya.Utils.parseXMLFromString(xmlString);
                HTMLParse._parseXML(ower, xml.childNodes[0].childNodes, url);
            }
        }, {
            key: "_parseXML",
            value: function _parseXML(parent, xml, url) {
                var href = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

                var i, n;
                if (xml.join || xml.item) {
                    for (i = 0, n = xml.length; i < n; ++i) {
                        HTMLParse._parseXML(parent, xml[i], url, href);
                    }
                } else {
                    var node;
                    var nodeName;
                    if (xml.nodeType == 3) {
                        var txt;
                        if (parent instanceof IHtml.HTMLDivParser) {
                            if (xml.nodeName == null) {
                                xml.nodeName = "#text";
                            }
                            nodeName = xml.nodeName.toLowerCase();
                            txt = xml.textContent.replace(/^\s+|\s+$/g, '');
                            if (txt.length > 0) {
                                node = HTMLParse.getInstance(nodeName);
                                if (node) {
                                    parent.addChild(node);
                                    node.innerTEXT = txt.replace(HTMLParse.char255AndOneSpacePattern, " ");
                                }
                            }
                        } else {
                            txt = xml.textContent.replace(/^\s+|\s+$/g, '');
                            if (txt.length > 0) {
                                var containNode = parent;
                                if (parent instanceof HTMLElement && parent.innerTEXT && parent.innerTEXT.length > 0) {
                                    var cnode = HTMLParse.getInstance('p');
                                    if (cnode) {
                                        parent.addChild(cnode);
                                        containNode = cnode;
                                    }
                                }
                                containNode.innerTEXT = txt.replace(HTMLParse.char255AndOneSpacePattern, " ");
                            }
                        }
                        return;
                    } else {
                        nodeName = xml.nodeName.toLowerCase();
                        if (nodeName == "#comment") return;
                        node = HTMLParse.getInstance(nodeName);
                        if (node) {
                            if (nodeName == "p") {
                                parent.addChild(HTMLParse.getInstance("br"));
                                node = parent.addChild(node);
                                parent.addChild(HTMLParse.getInstance("br"));
                            } else {
                                node = parent.addChild(node);
                            }
                            node.URI = url;
                            node.href = href;
                            var attributes = xml.attributes;
                            if (attributes && attributes.length > 0) {
                                for (i = 0, n = attributes.length; i < n; ++i) {
                                    var attribute = attributes[i];
                                    var attrName = attribute.nodeName;
                                    var value = attribute.value;
                                    node._setAttributes(attrName, value);
                                }
                            }
                            HTMLParse._parseXML(node, xml.childNodes, url, node.href);
                        } else {
                            HTMLParse._parseXML(parent, xml.childNodes, url, href);
                        }
                    }
                }
            }
        }]);

        return HTMLParse;
    }();

    HTMLParse.char255 = String.fromCharCode(255);
    HTMLParse.spacePattern = /&nbsp;|&#160;/g;
    HTMLParse.char255AndOneSpacePattern = new RegExp(String.fromCharCode(255) + "|(\\s+)", "g");
    HTMLParse._htmlClassMapShort = {
        'div': HTMLDivParser,
        'p': HTMLElement,
        'img': HTMLImageElement,
        'span': HTMLElement,
        'br': HTMLBrElement,
        'style': HTMLStyleElement,
        'font': HTMLElement,
        'a': HTMLElement,
        '#text': HTMLElement,
        'link': HTMLLinkElement
    };
    IHtml.HTMLParse = HTMLParse;
    Laya.ClassUtils.regClass('div', HTMLDivParser);
    Laya.ClassUtils.regClass('p', HTMLElement);
    Laya.ClassUtils.regClass('img', HTMLImageElement);
    Laya.ClassUtils.regClass('span', HTMLElement);
    Laya.ClassUtils.regClass('br', HTMLBrElement);
    Laya.ClassUtils.regClass('style', HTMLStyleElement);
    Laya.ClassUtils.regClass('font', HTMLElement);
    Laya.ClassUtils.regClass('a', HTMLElement);
    Laya.ClassUtils.regClass('#text', HTMLElement);
    Laya.ClassUtils.regClass('link', HTMLLinkElement);
    Laya.ClassUtils.regClass("laya.html.utils.HTMLParse", HTMLParse);
    Laya.ClassUtils.regClass("Laya.HTMLParse", HTMLParse);

    var HTMLDivElement = function (_Laya$Sprite) {
        _inherits(HTMLDivElement, _Laya$Sprite);

        function HTMLDivElement() {
            _classCallCheck(this, HTMLDivElement);

            var _this5 = _possibleConstructorReturn(this, (HTMLDivElement.__proto__ || Object.getPrototypeOf(HTMLDivElement)).call(this));

            _this5._recList = [];
            _this5._repaintState = 0;
            _this5._element = new HTMLDivParser();
            _this5._element.repaintHandler = new Laya.Handler(_this5, _this5._htmlDivRepaint);
            _this5.mouseEnabled = true;
            _this5.on(Laya.Event.CLICK, _this5, _this5._onMouseClick);
            return _this5;
        }

        _createClass(HTMLDivElement, [{
            key: "destroy",
            value: function destroy() {
                var destroyChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                if (this._element) this._element.reset();
                this._element = null;
                this._doClears();
                _get(HTMLDivElement.prototype.__proto__ || Object.getPrototypeOf(HTMLDivElement.prototype), "destroy", this).call(this, destroyChild);
            }
        }, {
            key: "_htmlDivRepaint",
            value: function _htmlDivRepaint() {
                var recreate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (recreate) {
                    if (this._repaintState < 2) this._repaintState = 2;
                } else {
                    if (this._repaintState < 1) this._repaintState = 1;
                }
                if (this._repaintState > 0) this._setGraphicDirty();
            }
        }, {
            key: "_updateGraphicWork",
            value: function _updateGraphicWork() {
                switch (this._repaintState) {
                    case 1:
                        this._updateGraphic();
                        break;
                    case 2:
                        this._refresh();
                        break;
                }
            }
        }, {
            key: "_setGraphicDirty",
            value: function _setGraphicDirty() {
                this.callLater(this._updateGraphicWork);
            }
        }, {
            key: "_doClears",
            value: function _doClears() {
                if (!this._recList) return;
                var i,
                    len = this._recList.length;
                var tRec;
                for (i = 0; i < len; i++) {
                    tRec = this._recList[i];
                    tRec.recover();
                }
                this._recList.length = 0;
            }
        }, {
            key: "_updateGraphic",
            value: function _updateGraphic() {
                this._doClears();
                this.graphics.clear(true);
                this._repaintState = 0;
                this._element.drawToGraphic(this.graphics, -this._element.x, -this._element.y, this._recList);
                var bounds = this._element.getBounds();
                if (bounds) this.setSelfBounds(bounds);
                this.size(bounds.width, bounds.height);
            }
        }, {
            key: "_refresh",
            value: function _refresh() {
                this._repaintState = 1;
                if (this._innerHTML) this._element.innerHTML = this._innerHTML;
                this._setGraphicDirty();
            }
        }, {
            key: "_onMouseClick",
            value: function _onMouseClick() {
                var tX = this.mouseX;
                var tY = this.mouseY;
                var i, len;
                var tHit;
                len = this._recList.length;
                for (i = 0; i < len; i++) {
                    tHit = this._recList[i];
                    if (tHit.rec.contains(tX, tY)) {
                        this._eventLink(tHit.href);
                    }
                }
            }
        }, {
            key: "_eventLink",
            value: function _eventLink(href) {
                this.event(Laya.Event.LINK, [href]);
            }
        }, {
            key: "style",
            get: function get() {
                return this._element.style;
            }
        }, {
            key: "innerHTML",
            set: function set(text) {
                if (this._innerHTML == text) return;
                this._repaintState = 1;
                this._innerHTML = text;
                this._element.innerHTML = text;
                this._setGraphicDirty();
            }
        }, {
            key: "contextWidth",
            get: function get() {
                return this._element.contextWidth;
            }
        }, {
            key: "contextHeight",
            get: function get() {
                return this._element.contextHeight;
            }
        }]);

        return HTMLDivElement;
    }(Laya.Sprite);

    IHtml.HTMLDivElement = HTMLDivElement;
    IHtml.HTMLParse = HTMLParse;
    Laya.ClassUtils.regClass("laya.html.dom.HTMLDivElement", HTMLDivElement);
    Laya.ClassUtils.regClass("Laya.HTMLDivElement", HTMLDivElement);

    var HTMLIframeElement = function (_HTMLDivElement) {
        _inherits(HTMLIframeElement, _HTMLDivElement);

        function HTMLIframeElement() {
            _classCallCheck(this, HTMLIframeElement);

            var _this6 = _possibleConstructorReturn(this, (HTMLIframeElement.__proto__ || Object.getPrototypeOf(HTMLIframeElement)).call(this));

            _this6._element._getCSSStyle().valign = "middle";
            return _this6;
        }

        _createClass(HTMLIframeElement, [{
            key: "href",
            set: function set(url) {
                var _this7 = this;

                url = this._element.formatURL(url);
                var l = new Laya.Loader();
                l.once(Laya.Event.COMPLETE, null, function (data) {
                    var pre = _this7._element.URI;
                    _this7._element.URI = new Laya.URL(url);
                    _this7.innerHTML = data;
                    !pre || (_this7._element.URI = pre);
                });
                l.load(url, Laya.Loader.TEXT);
            }
        }]);

        return HTMLIframeElement;
    }(HTMLDivElement);

    Laya.ClassUtils.regClass("laya.html.dom.HTMLIframeElement", HTMLIframeElement);
    Laya.ClassUtils.regClass("Laya.HTMLIframeElement", HTMLIframeElement);

    exports.HTMLBrElement = HTMLBrElement;
    exports.HTMLDivElement = HTMLDivElement;
    exports.HTMLDivParser = HTMLDivParser;
    exports.HTMLDocument = HTMLDocument;
    exports.HTMLElement = HTMLElement;
    exports.HTMLExtendStyle = HTMLExtendStyle;
    exports.HTMLHitRect = HTMLHitRect;
    exports.HTMLIframeElement = HTMLIframeElement;
    exports.HTMLImageElement = HTMLImageElement;
    exports.HTMLLinkElement = HTMLLinkElement;
    exports.HTMLParse = HTMLParse;
    exports.HTMLStyle = HTMLStyle;
    exports.HTMLStyleElement = HTMLStyleElement;
    exports.IHtml = IHtml;
    exports.Layout = Layout;
    exports.LayoutLine = LayoutLine;
})(window.Laya = window.Laya || {}, Laya);
