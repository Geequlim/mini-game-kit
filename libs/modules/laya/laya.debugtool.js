"use strict";

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (exports, Laya) {
	'use strict';

	var StringTool = function () {
		function StringTool() {
			_classCallCheck(this, StringTool);
		}

		_createClass(StringTool, null, [{
			key: "toUpCase",
			value: function toUpCase(str) {
				return str.toUpperCase();
			}
		}, {
			key: "toLowCase",
			value: function toLowCase(str) {
				return str.toLowerCase();
			}
		}, {
			key: "toUpHead",
			value: function toUpHead(str) {
				var rst;
				if (str.length <= 1) return str.toUpperCase();
				rst = str.charAt(0).toUpperCase() + str.substr(1);
				return rst;
			}
		}, {
			key: "toLowHead",
			value: function toLowHead(str) {
				var rst;
				if (str.length <= 1) return str.toLowerCase();
				rst = str.charAt(0).toLowerCase() + str.substr(1);
				return rst;
			}
		}, {
			key: "packageToFolderPath",
			value: function packageToFolderPath(packageName) {
				var rst;
				rst = packageName.replace(".", "/");
				return rst;
			}
		}, {
			key: "insert",
			value: function insert(str, iStr, index) {
				return str.substring(0, index) + iStr + str.substr(index);
			}
		}, {
			key: "insertAfter",
			value: function insertAfter(str, iStr, tarStr) {
				var isLast = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

				var i;
				if (isLast) {
					i = str.lastIndexOf(tarStr);
				} else {
					i = str.indexOf(tarStr);
				}
				if (i >= 0) {
					return StringTool.insert(str, iStr, i + tarStr.length);
				}
				return str;
			}
		}, {
			key: "insertBefore",
			value: function insertBefore(str, iStr, tarStr) {
				var isLast = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

				var i;
				if (isLast) {
					i = str.lastIndexOf(tarStr);
				} else {
					i = str.indexOf(tarStr);
				}
				if (i >= 0) {
					return StringTool.insert(str, iStr, i);
				}
				return str;
			}
		}, {
			key: "insertParamToFun",
			value: function insertParamToFun(funStr, params) {
				var oldParam;
				oldParam = StringTool.getParamArr(funStr);
				var inserStr;
				inserStr = params.join(",");
				if (oldParam.length > 0) {
					inserStr = "," + inserStr;
				}
				return StringTool.insertBefore(funStr, inserStr, ")", true);
			}
		}, {
			key: "trim",
			value: function trim(str) {
				var vList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (!vList) {
					vList = [" ", "\r", "\n", "\t", String.fromCharCode(65279)];
				}
				var rst;
				var i;
				var len;
				rst = str;
				len = vList.length;
				for (i = 0; i < len; i++) {
					rst = StringTool.getReplace(rst, vList[i], "");
				}
				return rst;
			}
		}, {
			key: "isEmpty",
			value: function isEmpty(str) {
				if (str.length < 1) return true;
				return StringTool.emptyStrDic.hasOwnProperty(str);
			}
		}, {
			key: "trimLeft",
			value: function trimLeft(str) {
				var i;
				i = 0;
				var len;
				len = str.length;
				while (StringTool.isEmpty(str.charAt(i)) && i < len) {
					i++;
				}
				if (i < len) {
					return str.substr(i);
				}
				return "";
			}
		}, {
			key: "trimRight",
			value: function trimRight(str) {
				var i;
				i = str.length - 1;
				while (StringTool.isEmpty(str.charAt(i)) && i >= 0) {
					i--;
				}
				var rst;
				rst = str.substring(0, i);
				if (i >= 0) {
					return str.substring(0, i + 1);
				}
				return "";
			}
		}, {
			key: "trimSide",
			value: function trimSide(str) {
				var rst;
				rst = StringTool.trimLeft(str);
				rst = StringTool.trimRight(rst);
				return rst;
			}
		}, {
			key: "isOkFileName",
			value: function isOkFileName(fileName) {
				if (StringTool.trimSide(fileName) == "") return false;
				var i, len;
				len = fileName.length;
				for (i = 0; i < len; i++) {
					if (StringTool.specialChars[fileName.charAt(i)]) return false;
				}
				return true;
			}
		}, {
			key: "trimButEmpty",
			value: function trimButEmpty(str) {
				return StringTool.trim(str, ["\r", "\n", "\t"]);
			}
		}, {
			key: "removeEmptyStr",
			value: function removeEmptyStr(strArr) {
				var i;
				i = strArr.length - 1;
				var str;
				for (i = i; i >= 0; i--) {
					str = strArr[i];
					str = StringTool.trimSide(str);
					if (StringTool.isEmpty(str)) {
						strArr.splice(i, 1);
					} else {
						strArr[i] = str;
					}
				}
				return strArr;
			}
		}, {
			key: "ifNoAddToTail",
			value: function ifNoAddToTail(str, sign) {
				if (str.indexOf(sign) >= 0) {
					return str;
				}
				return str + sign;
			}
		}, {
			key: "trimEmptyLine",
			value: function trimEmptyLine(str) {
				var i;
				var tLines;
				var tLine;
				tLines = str.split("\n");
				for (i = tLines.length - 1; i >= 0; i--) {
					tLine = tLines[i];
					if (StringTool.isEmptyLine(tLine)) {
						tLines.splice(i, 1);
					}
				}
				return tLines.join("\n");
			}
		}, {
			key: "isEmptyLine",
			value: function isEmptyLine(str) {
				str = StringTool.trim(str);
				if (str == "") return true;
				return false;
			}
		}, {
			key: "removeCommentLine",
			value: function removeCommentLine(lines) {
				var rst;
				rst = [];
				var i;
				var tLine;
				var adptLine;
				i = 0;
				var len;
				var index;
				len = lines.length;
				while (i < len) {
					adptLine = tLine = lines[i];
					index = tLine.indexOf("/**");
					if (index >= 0) {
						adptLine = tLine.substring(0, index - 1);
						StringTool.addIfNotEmpty(rst, adptLine);
						while (i < len) {
							tLine = lines[i];
							index = tLine.indexOf("*/");
							if (index >= 0) {
								adptLine = tLine.substring(index + 2);
								StringTool.addIfNotEmpty(rst, adptLine);
								break;
							}
							i++;
						}
					} else if (tLine.indexOf("//") >= 0) {
						if (StringTool.trim(tLine).indexOf("//") == 0) ;else {
							StringTool.addIfNotEmpty(rst, adptLine);
						}
					} else {
						StringTool.addIfNotEmpty(rst, adptLine);
					}
					i++;
				}
				return rst;
			}
		}, {
			key: "addIfNotEmpty",
			value: function addIfNotEmpty(arr, str) {
				if (!str) return;
				var tStr;
				tStr = StringTool.trim(str);
				if (tStr != "") {
					arr.push(str);
				}
			}
		}, {
			key: "trimExt",
			value: function trimExt(str, vars) {
				var rst;
				rst = StringTool.trim(str);
				var i;
				var len;
				len = vars.length;
				for (i = 0; i < len; i++) {
					rst = StringTool.getReplace(rst, vars[i], "");
				}
				return rst;
			}
		}, {
			key: "getBetween",
			value: function getBetween(str, left, right) {
				var ifMax = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

				if (!str) return "";
				if (!left) return "";
				if (!right) return "";
				var lId;
				var rId;
				lId = str.indexOf(left);
				if (lId < 0) return "";
				if (ifMax) {
					rId = str.lastIndexOf(right);
					if (rId < lId) return "";
				} else {
					rId = str.indexOf(right, lId + 1);
				}
				if (rId < 0) return "";
				return str.substring(lId + left.length, rId);
			}
		}, {
			key: "getSplitLine",
			value: function getSplitLine(line) {
				var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

				return line.split(split);
			}
		}, {
			key: "getLeft",
			value: function getLeft(str, sign) {
				var i;
				i = str.indexOf(sign);
				return str.substr(0, i);
			}
		}, {
			key: "getRight",
			value: function getRight(str, sign) {
				var i;
				i = str.indexOf(sign);
				return str.substr(i + 1);
			}
		}, {
			key: "delelteItem",
			value: function delelteItem(arr) {
				while (arr.length > 0) {
					if (arr[0] == "") {
						arr.shift();
					} else {
						break;
					}
				}
			}
		}, {
			key: "getWords",
			value: function getWords(line) {
				var rst = StringTool.getSplitLine(line);
				StringTool.delelteItem(rst);
				return rst;
			}
		}, {
			key: "getLinesI",
			value: function getLinesI(startLine, endLine, lines) {
				var i;
				var rst = [];
				for (i = startLine; i <= endLine; i++) {
					rst.push(lines[i]);
				}
				return rst;
			}
		}, {
			key: "structfy",
			value: function structfy(str) {
				var inWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
				var removeEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				if (removeEmpty) {
					str = StringTool.trimEmptyLine(str);
				}
				var lines;
				var tIn;
				tIn = 0;
				var tInStr;
				tInStr = StringTool.getEmptyStr(0);
				lines = str.split("\n");
				var i;
				var len;
				var tLineStr;
				len = lines.length;
				for (i = 0; i < len; i++) {
					tLineStr = lines[i];
					tLineStr = StringTool.trimLeft(tLineStr);
					tLineStr = StringTool.trimRight(tLineStr);
					tIn += StringTool.getPariCount(tLineStr);
					if (tLineStr.indexOf("}") >= 0) {
						tInStr = StringTool.getEmptyStr(tIn * inWidth);
					}
					tLineStr = tInStr + tLineStr;
					lines[i] = tLineStr;
					tInStr = StringTool.getEmptyStr(tIn * inWidth);
				}
				return lines.join("\n");
			}
		}, {
			key: "getEmptyStr",
			value: function getEmptyStr(width) {
				if (!StringTool.emptyDic.hasOwnProperty(width)) {
					var i;
					var len;
					len = width;
					var rst;
					rst = "";
					for (i = 0; i < len; i++) {
						rst += " ";
					}
					StringTool.emptyDic[width] = rst;
				}
				return StringTool.emptyDic[width];
			}
		}, {
			key: "getPariCount",
			value: function getPariCount(str) {
				var inChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "{";
				var outChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "}";

				var varDic;
				varDic = {};
				varDic[inChar] = 1;
				varDic[outChar] = -1;
				var i;
				var len;
				var tChar;
				len = str.length;
				var rst;
				rst = 0;
				for (i = 0; i < len; i++) {
					tChar = str.charAt(i);
					if (varDic.hasOwnProperty(tChar)) {
						rst += varDic[tChar];
					}
				}
				return rst;
			}
		}, {
			key: "readInt",
			value: function readInt(str) {
				var startI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				var rst;
				rst = 0;
				var tC;
				var i;
				var isBegin;
				isBegin = false;
				var len;
				len = str.length;
				for (i = startI; i < len; i++) {
					tC = str.charAt(i);
					if (Number(tC) > 0 || tC == "0") {
						rst = 10 * rst + Number(tC);
						if (rst > 0) isBegin = true;
					} else {
						if (isBegin) return rst;
					}
				}
				return rst;
			}
		}, {
			key: "getReplace",
			value: function getReplace(str, oStr, nStr) {
				if (!str) return "";
				var rst;
				rst = str.replace(new RegExp(oStr, "g"), nStr);
				return rst;
			}
		}, {
			key: "getWordCount",
			value: function getWordCount(str, findWord) {
				var rg = new RegExp(findWord, "g");
				return str.match(rg).length;
			}
		}, {
			key: "getResolvePath",
			value: function getResolvePath(path, basePath) {
				if (StringTool.isAbsPath(path)) {
					return path;
				}
				var tSign;
				tSign = "\\";
				if (basePath.indexOf("/") >= 0) {
					tSign = "/";
				}
				if (basePath.charAt(basePath.length - 1) == tSign) {
					basePath = basePath.substr(0, basePath.length - 1);
				}
				var parentSign;
				parentSign = ".." + tSign;
				var tISign;
				tISign = "." + tSign;
				var pCount;
				pCount = StringTool.getWordCount(path, parentSign);
				path = StringTool.getReplace(path, parentSign, "");
				path = StringTool.getReplace(path, tISign, "");
				var i;
				var len;
				len = pCount;
				for (i = 0; i < len; i++) {
					basePath = StringTool.removeLastSign(path, tSign);
				}
				return basePath + tSign + path;
			}
		}, {
			key: "isAbsPath",
			value: function isAbsPath(path) {
				if (path.indexOf(":") >= 0) return true;
				return false;
			}
		}, {
			key: "removeLastSign",
			value: function removeLastSign(str, sign) {
				var iPos;
				iPos = str.lastIndexOf(sign);
				str = str.substring(0, iPos);
				return str;
			}
		}, {
			key: "getParamArr",
			value: function getParamArr(str) {
				var paramStr;
				paramStr = StringTool.getBetween(str, "(", ")", true);
				if (StringTool.trim(paramStr).length < 1) return [];
				return paramStr.split(",");
			}
		}, {
			key: "copyStr",
			value: function copyStr(str) {
				return str.substring(0);
			}
		}, {
			key: "ArrayToString",
			value: function ArrayToString(arr) {
				var rst;
				rst = "[{items}]".replace(new RegExp("\\{items\\}", "g"), StringTool.getArrayItems(arr));
				return rst;
			}
		}, {
			key: "getArrayItems",
			value: function getArrayItems(arr) {
				var rst;
				if (arr.length < 1) return "";
				rst = StringTool.parseItem(arr[0]);
				var i;
				var len;
				len = arr.length;
				for (i = 1; i < len; i++) {
					rst += "," + StringTool.parseItem(arr[i]);
				}
				return rst;
			}
		}, {
			key: "parseItem",
			value: function parseItem(item) {
				return "";
			}
		}, {
			key: "initAlphaSign",
			value: function initAlphaSign() {
				if (StringTool.alphaSigns) return;
				StringTool.alphaSigns = {};
				StringTool.addSign("a", "z", StringTool.alphaSigns);
				StringTool.addSign("A", "Z", StringTool.alphaSigns);
				StringTool.addSign("0", "9", StringTool.alphaSigns);
			}
		}, {
			key: "addSign",
			value: function addSign(ss, e, tar) {
				var i;
				var len;
				var s;
				s = ss.charCodeAt(0);
				len = e.charCodeAt(0);
				for (i = s; i <= len; i++) {
					tar[String.fromCharCode(i)] = true;
					console.log("add :" + String.fromCharCode(i));
				}
			}
		}, {
			key: "isPureAlphaNum",
			value: function isPureAlphaNum(str) {
				StringTool.initAlphaSign();
				if (!str) return true;
				var i, len;
				len = str.length;
				for (i = 0; i < len; i++) {
					if (!StringTool.alphaSigns[str.charAt(i)]) return false;
				}
				return true;
			}
		}]);

		return StringTool;
	}();

	StringTool.emptyStrDic = {
		" ": true,
		"\r": true,
		"\n": true,
		"\t": true
	};
	StringTool.specialChars = { "*": true, "&": true, "%": true, "#": true, "?": true };
	StringTool.emptyDic = {};
	StringTool.alphaSigns = null;

	var ObjectTools = function () {
		function ObjectTools() {
			_classCallCheck(this, ObjectTools);
		}

		_createClass(ObjectTools, null, [{
			key: "getFlatKey",
			value: function getFlatKey(tKey, aKey) {
				if (tKey == "") return aKey;
				return tKey + ObjectTools.sign + aKey;
			}
		}, {
			key: "flatObj",
			value: function flatObj(obj) {
				var rst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var tKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

				rst = rst ? rst : {};
				var key;
				var tValue;
				for (key in obj) {
					if (obj[key] instanceof Object) {
						ObjectTools.flatObj(obj[key], rst, ObjectTools.getFlatKey(tKey, key));
					} else {
						tValue = obj[key];
						rst[ObjectTools.getFlatKey(tKey, key)] = obj[key];
					}
				}
				return rst;
			}
		}, {
			key: "recoverObj",
			value: function recoverObj(obj) {
				var rst = {};
				var tKey;
				for (tKey in obj) {
					ObjectTools.setKeyValue(rst, tKey, obj[tKey]);
				}
				return rst;
			}
		}, {
			key: "differ",
			value: function differ(objA, objB) {
				var tKey;
				objA = ObjectTools.flatObj(objA);
				objB = ObjectTools.flatObj(objB);
				var rst = {};
				for (tKey in objA) {
					if (!objB.hasOwnProperty(tKey)) {
						rst[tKey] = "被删除";
					}
				}
				for (tKey in objB) {
					if (objB[tKey] != objA[tKey]) {
						rst[tKey] = { "pre": objA[tKey], "now": objB[tKey] };
					}
				}
				return rst;
			}
		}, {
			key: "traceDifferObj",
			value: function traceDifferObj(obj) {
				var key;
				var tO;
				for (key in obj) {
					if (obj[key] instanceof String) {
						console.log(key + ":", obj[key]);
					} else {
						tO = obj[key];
						console.log(key + ":", "now:", tO["now"], "pre:", tO["pre"]);
					}
				}
			}
		}, {
			key: "setKeyValue",
			value: function setKeyValue(obj, flatKey, value) {
				if (flatKey.indexOf(ObjectTools.sign) >= 0) {
					var keys = flatKey.split(ObjectTools.sign);
					var tKey;
					while (keys.length > 1) {
						tKey = keys.shift();
						if (!obj[tKey]) {
							obj[tKey] = {};
							console.log("addKeyObj:", tKey);
						}
						obj = obj[tKey];
						if (!obj) {
							console.log("wrong flatKey:", flatKey);
							return;
						}
					}
					obj[keys.shift()] = value;
				} else {
					obj[flatKey] = value;
				}
			}
		}, {
			key: "clearObj",
			value: function clearObj(obj) {
				var key;
				for (key in obj) {
					delete obj[key];
				}
			}
		}, {
			key: "copyObjFast",
			value: function copyObjFast(obj) {
				var jsStr;
				jsStr = ObjectTools.getJsonString(obj);
				return ObjectTools.getObj(jsStr);
			}
		}, {
			key: "copyObj",
			value: function copyObj(obj) {
				if (obj instanceof Array) return ObjectTools.copyArr(obj);
				var rst = {};
				var key;
				for (key in obj) {
					if (obj[key] === null || obj[key] === undefined) {
						rst[key] = obj[key];
					} else if (obj[key] instanceof Array) {
						rst[key] = ObjectTools.copyArr(obj[key]);
					} else if (obj[key] instanceof Object) {
						rst[key] = ObjectTools.copyObj(obj[key]);
					} else {
						rst[key] = obj[key];
					}
				}
				return rst;
			}
		}, {
			key: "copyArr",
			value: function copyArr(arr) {
				var rst;
				rst = [];
				var i, len;
				len = arr.length;
				for (i = 0; i < len; i++) {
					rst.push(ObjectTools.copyObj(arr[i]));
				}
				return rst;
			}
		}, {
			key: "concatArr",
			value: function concatArr(src, a) {
				if (!a) return src;
				if (!src) return a;
				var i,
				    len = a.length;
				for (i = 0; i < len; i++) {
					src.push(a[i]);
				}
				return src;
			}
		}, {
			key: "insertArrToArr",
			value: function insertArrToArr(src, insertArr) {
				var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				if (pos < 0) pos = 0;
				if (pos > src.length) pos = src.length;
				var preLen = src.length;
				var i, len;
				src.length += insertArr.length;
				var moveLen;
				moveLen = insertArr.length;
				for (i = src.length - 1; i >= pos; i--) {
					src[i] = src[i - moveLen];
				}
				len = insertArr.length;
				for (i = 0; i < len; i++) {
					src[pos + i] = insertArr[i];
				}
				return src;
			}
		}, {
			key: "clearArr",
			value: function clearArr(arr) {
				if (!arr) return arr;
				arr.length = 0;
				return arr;
			}
		}, {
			key: "removeFromArr",
			value: function removeFromArr(arr, item) {
				var i, len;
				len = arr.length;
				for (i = 0; i < len; i++) {
					if (arr[i] == item) {
						arr[i].splice(i, 1);
						return;
					}
				}
			}
		}, {
			key: "setValueArr",
			value: function setValueArr(src, v) {
				src || (src = []);
				src.length = 0;
				return ObjectTools.concatArr(src, v);
			}
		}, {
			key: "getFrom",
			value: function getFrom(rst, src, count) {
				var i;
				for (i = 0; i < count; i++) {
					rst.push(src[i]);
				}
				return rst;
			}
		}, {
			key: "getFromR",
			value: function getFromR(rst, src, count) {
				var i;
				for (i = 0; i < count; i++) {
					rst.push(src.pop());
				}
				return rst;
			}
		}, {
			key: "enableDisplayTree",
			value: function enableDisplayTree(dis) {
				while (dis) {
					dis.mouseEnabled = true;
					dis = dis.parent;
				}
			}
		}, {
			key: "getJsonString",
			value: function getJsonString(obj) {
				var rst;
				rst = JSON.stringify(obj);
				return rst;
			}
		}, {
			key: "getObj",
			value: function getObj(jsonStr) {
				var rst;
				rst = JSON.parse(jsonStr);
				return rst;
			}
		}, {
			key: "getKeyArr",
			value: function getKeyArr(obj) {
				var rst;
				var key;
				rst = [];
				for (key in obj) {
					rst.push(key);
				}
				return rst;
			}
		}, {
			key: "getObjValues",
			value: function getObjValues(dataList, key) {
				var rst;
				var i, len;
				len = dataList.length;
				rst = [];
				for (i = 0; i < len; i++) {
					rst.push(dataList[i][key]);
				}
				return rst;
			}
		}, {
			key: "hasKeys",
			value: function hasKeys(obj, keys) {
				var i, len;
				len = keys.length;
				for (i = 0; i < len; i++) {
					if (!obj.hasOwnProperty(keys[i])) return false;
				}
				return true;
			}
		}, {
			key: "copyValueByArr",
			value: function copyValueByArr(tar, src, keys) {
				var i,
				    len = keys.length;
				for (i = 0; i < len; i++) {
					if (!(src[keys[i]] === null)) tar[keys[i]] = src[keys[i]];
				}
			}
		}, {
			key: "getNoSameArr",
			value: function getNoSameArr(arr) {
				var i, len;
				var rst;
				rst = [];
				var tItem;
				len = arr.length;
				for (i = 0; i < len; i++) {
					tItem = arr[i];
					if (rst.indexOf(tItem) < 0) {
						rst.push(tItem);
					}
				}
				return rst;
			}
		}, {
			key: "insertValue",
			value: function insertValue(tar, src) {
				var key;
				for (key in src) {
					tar[key] = src[key];
				}
			}
		}, {
			key: "replaceValue",
			value: function replaceValue(obj, replaceO) {
				var key;
				for (key in obj) {
					if (replaceO.hasOwnProperty(obj[key])) {
						obj[key] = replaceO[obj[key]];
					}
					if (obj[key] instanceof Object) {
						ObjectTools.replaceValue(obj[key], replaceO);
					}
				}
			}
		}, {
			key: "setKeyValues",
			value: function setKeyValues(items, key, value) {
				var i, len;
				len = items.length;
				for (i = 0; i < len; i++) {
					items[i][key] = value;
				}
			}
		}, {
			key: "findItemPos",
			value: function findItemPos(items, sign, value) {
				var i, len;
				len = items.length;
				for (i = 0; i < len; i++) {
					if (items[i][sign] == value) {
						return i;
					}
				}
				return -1;
			}
		}, {
			key: "setObjValue",
			value: function setObjValue(obj, key, value) {
				obj[key] = value;
				return obj;
			}
		}, {
			key: "setAutoTypeValue",
			value: function setAutoTypeValue(obj, key, value) {
				if (obj.hasOwnProperty(key)) {
					if (ObjectTools.isNumber(obj[key])) {
						obj[key] = parseFloat(value);
					} else {
						obj[key] = value;
					}
				} else {
					obj[key] = value;
				}
				return obj;
			}
		}, {
			key: "getAutoValue",
			value: function getAutoValue(value) {
				var tFloat = parseFloat(value);
				if (typeof value == "string") {
					if (tFloat + "" === StringTool.trimSide(value)) return tFloat;
				}
				return value;
			}
		}, {
			key: "isNumber",
			value: function isNumber(value) {
				return parseFloat(value) == value;
			}
		}, {
			key: "isNaNS",
			value: function isNaNS(value) {
				return value.toString() == "NaN";
			}
		}, {
			key: "isNaN",
			value: function isNaN(value) {
				if (typeof value == "number") return false;
				if (typeof value == "string") {
					if (parseFloat(value).toString() != "NaN") {
						return false;
					}
				}
				return true;
			}
		}, {
			key: "getStrTypedValue",
			value: function getStrTypedValue(value) {
				if (value == "false") {
					return false;
				} else if (value == "true") {
					return true;
				} else if (value == "null") {
					return null;
				} else if (value == "undefined") {
					return null;
				} else {
					return ObjectTools.getAutoValue(value);
				}
			}
		}, {
			key: "createKeyValueDic",
			value: function createKeyValueDic(dataList, keySign) {
				var rst;
				rst = {};
				var i, len;
				len = dataList.length;
				var tItem;
				var tKey;
				for (i = 0; i < len; i++) {
					tItem = dataList[i];
					tKey = tItem[keySign];
					rst[tKey] = tItem;
				}
				return rst;
			}
		}]);

		return ObjectTools;
	}();

	ObjectTools.sign = "_";

	var ClassTool = function () {
		function ClassTool() {
			_classCallCheck(this, ClassTool);
		}

		_createClass(ClassTool, null, [{
			key: "defineProperty",
			value: function defineProperty(obj, name, des) {
				Object.defineProperty(obj, name, des);
			}
		}, {
			key: "getOwnPropertyDescriptor",
			value: function getOwnPropertyDescriptor(obj, name) {
				var rst;
				rst = Object.getOwnPropertyDescriptor(obj, name);
				return rst;
			}
		}, {
			key: "getOwnPropertyDescriptors",
			value: function getOwnPropertyDescriptors(obj) {
				var rst;
				rst = Object.getOwnPropertyDescriptors(obj);
				return rst;
			}
		}, {
			key: "getOwnPropertyNames",
			value: function getOwnPropertyNames(obj) {
				var rst;
				rst = Object.getOwnPropertyNames(obj);
				return rst;
			}
		}, {
			key: "getObjectGetSetKeys",
			value: function getObjectGetSetKeys(obj) {
				var rst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (!rst) rst = [];
				var keys;
				keys = ClassTool.getOwnPropertyNames(obj);
				var key;
				for (key in keys) {
					key = keys[key];
					if (key.indexOf("_$get_") >= 0) {
						key = key.replace("_$get_", "");
						rst.push(key);
					}
				}
				if (obj["__proto__"]) {
					ClassTool.getObjectGetSetKeys(obj["__proto__"], rst);
				}
				return rst;
			}
		}, {
			key: "getObjectDisplayAbleKeys",
			value: function getObjectDisplayAbleKeys(obj) {
				var rst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (!rst) rst = [];
				var key;
				var tValue;
				for (key in obj) {
					tValue = obj[key];
					if (key.charAt(0) == "_") continue;
					rst.push(key);
				}
				ClassTool.getObjectGetSetKeys(obj, rst);
				rst = ObjectTools.getNoSameArr(rst);
				return rst;
			}
		}, {
			key: "getClassName",
			value: function getClassName(tar) {
				if (tar instanceof Function) return tar.name;
				return tar["constructor"].name;
			}
		}, {
			key: "getNodeClassAndName",
			value: function getNodeClassAndName(tar) {
				if (!tar) return "null";
				var rst;
				if (tar.name) {
					rst = ClassTool.getClassName(tar) + "(" + tar.name + ")";
				} else {
					rst = ClassTool.getClassName(tar);
				}
				return rst;
			}
		}, {
			key: "getClassNameByClz",
			value: function getClassNameByClz(clz) {
				return clz["name"];
			}
		}, {
			key: "getClassByName",
			value: function getClassByName(className) {
				var rst;
				rst = window["eval"](className);
				return rst;
			}
		}, {
			key: "createObjByName",
			value: function createObjByName(className) {
				var clz;
				clz = ClassTool.getClassByName(className);
				return new clz();
			}
		}]);

		return ClassTool;
	}();

	ClassTool.displayTypes = { "boolean": true, "number": true, "string": true };

	var TraceTool = function () {
		function TraceTool() {
			_classCallCheck(this, TraceTool);
		}

		_createClass(TraceTool, null, [{
			key: "closeAllLog",
			value: function closeAllLog() {
				var logFun;
				logFun = TraceTool.emptyLog;
				Laya.Browser.window.console.log = logFun;
			}
		}, {
			key: "emptyLog",
			value: function emptyLog() {}
		}, {
			key: "traceObj",
			value: function traceObj(obj) {
				TraceTool.tempArr.length = 0;
				var key;
				for (key in obj) {
					TraceTool.tempArr.push(key + ":" + obj[key]);
				}
				var rst;
				rst = TraceTool.tempArr.join("\n");
				console.log(rst);
				return rst;
			}
		}, {
			key: "traceObjR",
			value: function traceObjR(obj) {
				TraceTool.tempArr.length = 0;
				var key;
				for (key in obj) {
					TraceTool.tempArr.push(obj[key] + ":" + key);
				}
				var rst;
				rst = TraceTool.tempArr.join("\n");
				console.log(rst);
				return rst;
			}
		}, {
			key: "traceSize",
			value: function traceSize(tar) {
				TraceTool._debugtrace("Size: x:" + tar.x + " y:" + tar.y + " w:" + tar.width + " h:" + tar.height + " scaleX:" + tar.scaleX + " scaleY:" + tar.scaleY);
			}
		}, {
			key: "traceSplit",
			value: function traceSplit(msg) {
				console.log("---------------------" + msg + "---------------------------");
			}
		}, {
			key: "group",
			value: function group(gName) {
				console.group(gName);
			}
		}, {
			key: "groupEnd",
			value: function groupEnd() {
				console.groupEnd();
			}
		}, {
			key: "getCallStack",
			value: function getCallStack() {
				var life = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
				var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				var caller;
				caller = TraceTool.getCallStack;
				caller = caller.caller.caller;
				var msg;
				msg = "";
				while (caller && life > 0) {
					if (s <= 0) {
						msg += caller + "<-";
						life--;
					}
					caller = caller.caller;
					s--;
				}
				return msg;
			}
		}, {
			key: "getCallLoc",
			value: function getCallLoc() {
				var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

				var loc;
				try {
					TraceTool.Erroer.i++;
				} catch (e) {
					var arr;
					arr = this.e.stack.replace(/Error\n/).split(/\n/);
					if (arr[index]) {
						loc = arr[index].replace(/^\s+|\s+$/, "");
					} else {
						loc = "unknow";
					}
				}
				return loc;
			}
		}, {
			key: "traceCallStack",
			value: function traceCallStack() {
				var loc;
				try {
					TraceTool.Erroer.i++;
				} catch (e) {
					loc = this.e.stack;
				}
				console.log(loc);
				return loc;
			}
		}, {
			key: "getPlaceHolder",
			value: function getPlaceHolder(len) {
				if (!TraceTool.holderDic.hasOwnProperty(len)) {
					var rst;
					rst = "";
					var i;
					for (i = 0; i < len; i++) {
						rst += "-";
					}
					TraceTool.holderDic[len] = rst;
				}
				return TraceTool.holderDic[len];
			}
		}, {
			key: "traceTree",
			value: function traceTree(tar) {
				var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var isFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				if (isFirst) {
					console.log("traceTree");
				}
				if (!tar) return;
				var i;
				var len;
				if (tar.numChildren < 1) {
					console.log(tar);
					return;
				}
				TraceTool.group(tar);
				len = tar.numChildren;
				depth++;
				for (i = 0; i < len; i++) {
					TraceTool.traceTree(tar.getChildAt(i), depth, false);
				}
				TraceTool.groupEnd();
			}
		}, {
			key: "getClassName",
			value: function getClassName(tar) {
				return tar["constructor"].name;
			}
		}, {
			key: "traceSpriteInfo",
			value: function traceSpriteInfo(tar) {
				var showBounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var showSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
				var showTree = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

				if (!(tar instanceof Laya.Sprite)) {
					console.log("not Sprite");
					return;
				}
				if (!tar) {
					console.log("null Sprite");
					return;
				}
				TraceTool.traceSplit("traceSpriteInfo");
				TraceTool._debugtrace(TraceTool.getClassName(tar) + ":" + tar.name);
				if (showTree) {
					TraceTool.traceTree(tar);
				} else {
					console.log(tar);
				}
				if (showSize) {
					TraceTool.traceSize(tar);
				}
				if (showBounds) {
					console.log("bounds:" + tar.getBounds());
				}
			}
		}]);

		return TraceTool;
	}();

	TraceTool.tempArr = [];
	TraceTool.Erroer = null;
	TraceTool.holderDic = {};

	var CountTool = function () {
		function CountTool() {
			_classCallCheck(this, CountTool);

			this.data = {};
			this.preO = {};
			this.changeO = {};
		}

		_createClass(CountTool, [{
			key: "reset",
			value: function reset() {
				this.data = {};
				this.count = 0;
			}
		}, {
			key: "add",
			value: function add(name) {
				var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				this.count++;
				if (!this.data.hasOwnProperty(name)) {
					this.data[name] = 0;
				}
				this.data[name] = this.data[name] + num;
			}
		}, {
			key: "getKeyCount",
			value: function getKeyCount(key) {
				if (!this.data.hasOwnProperty(key)) {
					this.data[key] = 0;
				}
				return this.data[key];
			}
		}, {
			key: "getKeyChange",
			value: function getKeyChange(key) {
				if (!this.changeO[key]) return 0;
				return this.changeO[key];
			}
		}, {
			key: "record",
			value: function record() {
				var key;
				for (key in this.changeO) {
					this.changeO[key] = 0;
				}
				for (key in this.data) {
					if (!this.preO[key]) this.preO[key] = 0;
					this.changeO[key] = this.data[key] - this.preO[key];
					this.preO[key] = this.data[key];
				}
			}
		}, {
			key: "getCount",
			value: function getCount(dataO) {
				var rst = 0;
				var key;
				for (key in dataO) {
					rst += dataO[key];
				}
				return rst;
			}
		}, {
			key: "traceSelf",
			value: function traceSelf() {
				var dataO = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!dataO) dataO = this.data;
				var tCount;
				tCount = this.getCount(dataO);
				console.log("total:" + tCount);
				return "total:" + tCount + "\n" + TraceTool.traceObj(dataO);
			}
		}, {
			key: "traceSelfR",
			value: function traceSelfR() {
				var dataO = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!dataO) dataO = this.data;
				var tCount;
				tCount = this.getCount(dataO);
				console.log("total:" + tCount);
				return "total:" + tCount + "\n" + TraceTool.traceObjR(dataO);
			}
		}]);

		return CountTool;
	}();

	var RecInfo = function () {
		function RecInfo() {
			_classCallCheck(this, RecInfo);

			this.oX = 0;
			this.oY = 0;
			this.hX = 1;
			this.hY = 0;
			this.vX = 0;
			this.vY = 1;
		}

		_createClass(RecInfo, [{
			key: "initByPoints",
			value: function initByPoints(oPoint, ePoint, vPoint) {
				this.oX = oPoint.x;
				this.oY = oPoint.y;
				this.hX = ePoint.x;
				this.hY = ePoint.y;
				this.vX = vPoint.x;
				this.vY = vPoint.y;
			}
		}, {
			key: "x",
			get: function get() {
				return this.oX;
			}
		}, {
			key: "y",
			get: function get() {
				return this.oY;
			}
		}, {
			key: "width",
			get: function get() {
				return Math.sqrt((this.hX - this.oX) * (this.hX - this.oX) + (this.hY - this.oY) * (this.hY - this.oY));
			}
		}, {
			key: "height",
			get: function get() {
				return Math.sqrt((this.vX - this.oX) * (this.vX - this.oX) + (this.vY - this.oY) * (this.vY - this.oY));
			}
		}, {
			key: "rotation",
			get: function get() {
				return this.rotationRad / Math.PI * 180;
			}
		}, {
			key: "rotationRad",
			get: function get() {
				var dx = this.hX - this.oX;
				var dy = this.hY - this.oY;
				return Math.atan2(dy, dx);
			}
		}, {
			key: "rotationV",
			get: function get() {
				return this.rotationRadV / Math.PI * 180;
			}
		}, {
			key: "rotationRadV",
			get: function get() {
				var dx = this.vX - this.oX;
				var dy = this.vY - this.oY;
				return Math.atan2(dy, dx);
			}
		}], [{
			key: "createByPoints",
			value: function createByPoints(oPoint, ePoint, vPoint) {
				var rst;
				rst = new RecInfo();
				rst.initByPoints(oPoint, ePoint, vPoint);
				return rst;
			}
		}, {
			key: "getGlobalPoints",
			value: function getGlobalPoints(sprite, x, y) {
				return sprite.localToGlobal(new Laya.Point(x, y));
			}
		}, {
			key: "getGlobalRecInfo",
			value: function getGlobalRecInfo(sprite) {
				var x0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var y0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				var x1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
				var y1 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
				var x2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
				var y2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;

				return RecInfo.createByPoints(RecInfo.getGlobalPoints(sprite, x0, y0), RecInfo.getGlobalPoints(sprite, x1, y1), RecInfo.getGlobalPoints(sprite, x2, y2));
			}
		}]);

		return RecInfo;
	}();

	var SimpleResizer = function () {
		function SimpleResizer() {
			_classCallCheck(this, SimpleResizer);
		}

		_createClass(SimpleResizer, null, [{
			key: "setResizeAble",
			value: function setResizeAble(clickItem, tar) {
				var minWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;
				var minHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 150;

				clickItem.on(Laya.Event.MOUSE_DOWN, null, SimpleResizer.onMouseDown, [tar, minWidth, minHeight]);
			}
		}, {
			key: "onMouseDown",
			value: function onMouseDown(tar, minWidth, minHeight, e) {
				SimpleResizer.clearEvents();
				if (!tar) return;
				SimpleResizer.preMousePoint.setTo(Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY);
				SimpleResizer.preTarSize.setTo(tar.width, tar.height);
				SimpleResizer.preScale.setTo(1, 1);
				var rTar;
				rTar = tar;
				while (rTar && rTar != Laya.Laya.stage) {
					SimpleResizer.preScale.x *= rTar.scaleX;
					SimpleResizer.preScale.y *= rTar.scaleY;
					rTar = rTar.parent;
				}
				Laya.Laya.stage.on(Laya.Event.MOUSE_UP, null, SimpleResizer.onMouseMoveEnd);
				Laya.Laya.timer.loop(100, null, SimpleResizer.onMouseMoving, [tar, minWidth, minHeight]);
			}
		}, {
			key: "onMouseMoving",
			value: function onMouseMoving(tar, minWidth, minHeight, e) {
				var tWidth = (Laya.Laya.stage.mouseX - SimpleResizer.preMousePoint.x) / SimpleResizer.preScale.x + SimpleResizer.preTarSize.x;
				var tHeight = (Laya.Laya.stage.mouseY - SimpleResizer.preMousePoint.y) / SimpleResizer.preScale.y + SimpleResizer.preTarSize.y;
				tar.width = tWidth > minWidth ? tWidth : minWidth;
				tar.height = tHeight > minHeight ? tHeight : minHeight;
			}
		}, {
			key: "onMouseMoveEnd",
			value: function onMouseMoveEnd(e) {
				SimpleResizer.clearEvents();
			}
		}, {
			key: "clearEvents",
			value: function clearEvents() {
				Laya.Laya.timer.clear(null, SimpleResizer.onMouseMoving);
				Laya.Laya.stage.off(Laya.Event.MOUSE_UP, null, SimpleResizer.onMouseMoveEnd);
			}
		}]);

		return SimpleResizer;
	}();

	SimpleResizer.preMousePoint = new Laya.Point();
	SimpleResizer.preTarSize = new Laya.Point();
	SimpleResizer.preScale = new Laya.Point();

	var DisControlTool = function () {
		function DisControlTool() {
			_classCallCheck(this, DisControlTool);
		}

		_createClass(DisControlTool, null, [{
			key: "getObjectsUnderPoint",
			value: function getObjectsUnderPoint(sprite, x, y) {
				var rst = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
				var filterFun = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

				rst = rst ? rst : [];
				if (filterFun != null && !filterFun(sprite)) return rst;
				if (sprite.getBounds().contains(x, y)) {
					rst.push(sprite);
					var tempP = new Laya.Point();
					tempP.setTo(x, y);
					tempP = sprite.fromParentPoint(tempP);
					x = tempP.x;
					y = tempP.y;
					for (var i = sprite._children.length - 1; i > -1; i--) {
						var child = sprite._children[i];
						if (child instanceof Laya.Sprite) DisControlTool.getObjectsUnderPoint(child, x, y, rst, filterFun);
					}
				}
				return rst;
			}
		}, {
			key: "getObjectsUnderGlobalPoint",
			value: function getObjectsUnderGlobalPoint(sprite) {
				var filterFun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				var point = new Laya.Point();
				point.setTo(Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY);
				if (sprite.parent) point = sprite.parent.globalToLocal(point);
				return DisControlTool.getObjectsUnderPoint(sprite, point.x, point.y, null, filterFun);
			}
		}, {
			key: "findFirstObjectsUnderGlobalPoint",
			value: function findFirstObjectsUnderGlobalPoint() {
				var disList;
				disList = DisControlTool.getObjectsUnderGlobalPoint(Laya.Laya.stage);
				if (!disList) return null;
				var i, len;
				var tDis;
				len = disList.length;
				for (i = len - 1; i >= 0; i--) {
					tDis = disList[i];
					if (tDis && tDis.numChildren < 1) {
						return tDis;
					}
				}
				return tDis;
			}
		}, {
			key: "visibleAndEnableObjFun",
			value: function visibleAndEnableObjFun(tar) {
				return tar.visible && tar.mouseEnabled;
			}
		}, {
			key: "visibleObjFun",
			value: function visibleObjFun(tar) {
				return tar.visible;
			}
		}, {
			key: "getMousePoint",
			value: function getMousePoint(sprite) {
				var point = new Laya.Point();
				point.setTo(Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY);
				point = sprite.globalToLocal(point);
				return point;
			}
		}, {
			key: "isChildE",
			value: function isChildE(parent, child) {
				if (!parent) return false;
				while (child) {
					if (child.parent == parent) return true;
					child = child.parent;
				}
				return false;
			}
		}, {
			key: "isInTree",
			value: function isInTree(pNode, child) {
				return pNode == child || DisControlTool.isChildE(pNode, child);
			}
		}, {
			key: "setTop",
			value: function setTop(tar) {
				if (tar && tar.parent) {
					var tParent;
					tParent = tar.parent;
					tParent.setChildIndex(tar, tParent.numChildren - 1);
				}
			}
		}, {
			key: "clearItemRelativeInfo",
			value: function clearItemRelativeInfo(item) {
				var Nan = "NaN";
				item.getLayout().left = Nan;
				item.getLayout().right = Nan;
				item.getLayout().top = Nan;
				item.getLayout().bottom = Nan;
			}
		}, {
			key: "swap",
			value: function swap(tarA, tarB) {
				if (tarA == tarB) return;
				var iA;
				iA = tarA.parent.getChildIndex(tarA);
				var iB;
				iB = tarB.parent.getChildIndex(tarB);
				var bP;
				bP = tarB.parent;
				tarA.parent.addChildAt(tarB, iA);
				bP.addChildAt(tarA, iB);
			}
		}, {
			key: "insertToTarParent",
			value: function insertToTarParent(tarA, tars) {
				var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

				var tIndex;
				var parent;
				if (!tarA) return;
				parent = tarA.parent;
				if (!parent) return;
				tIndex = parent.getChildIndex(tarA);
				if (after) tIndex++;
				DisControlTool.insertToParent(parent, tars, tIndex);
			}
		}, {
			key: "insertToParent",
			value: function insertToParent(parent, tars) {
				var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

				if (!parent) return;
				if (index < 0) index = parent.numChildren;
				var i, len;
				len = tars.length;
				for (i = 0; i < len; i++) {
					DisControlTool.transParent(tars[i], parent);
					parent.addChildAt(tars[i], index);
				}
			}
		}, {
			key: "transParent",
			value: function transParent(tar, newParent) {
				if (!tar || !newParent) return;
				if (!tar.parent) return;
				var preParent;
				preParent = tar.parent;
				var pos;
				pos = new Laya.Point(tar.x, tar.y);
				pos = preParent.localToGlobal(pos);
				pos = newParent.globalToLocal(pos);
				tar.pos(pos.x, pos.y);
			}
		}, {
			key: "transPoint",
			value: function transPoint(nowParent, tarParent, point) {
				point = nowParent.localToGlobal(point);
				point = tarParent.globalToLocal(point);
				return point;
			}
		}, {
			key: "removeItems",
			value: function removeItems(itemList) {
				var i, len;
				len = itemList.length;
				for (i = 0; i < len; i++) {
					itemList[i].removeSelf();
				}
			}
		}, {
			key: "addItems",
			value: function addItems(itemList, parent) {
				var i, len;
				len = itemList.length;
				for (i = 0; i < len; i++) {
					parent.addChild(itemList[i]);
				}
			}
		}, {
			key: "getAllChild",
			value: function getAllChild(tar) {
				if (!tar) return [];
				var i;
				var len;
				var rst = [];
				len = tar.numChildren;
				for (i = 0; i < len; i++) {
					rst.push(tar.getChildAt(i));
				}
				return rst;
			}
		}, {
			key: "upDis",
			value: function upDis(child) {
				if (child && child.parent) {
					var tParent;
					tParent = child.parent;
					var newIndex;
					newIndex = tParent.getChildIndex(child) + 1;
					if (newIndex >= tParent.numChildren) {
						newIndex = tParent.numChildren - 1;
					}
					console.log("setChildIndex:" + newIndex);
					tParent.setChildIndex(child, newIndex);
				}
			}
		}, {
			key: "downDis",
			value: function downDis(child) {
				if (child && child.parent) {
					var tParent;
					tParent = child.parent;
					var newIndex;
					newIndex = tParent.getChildIndex(child) - 1;
					if (newIndex < 0) newIndex = 0;
					console.log("setChildIndex:" + newIndex);
					tParent.setChildIndex(child, newIndex);
				}
			}
		}, {
			key: "setResizeAbleEx",
			value: function setResizeAbleEx(node) {
				var clickItem;
				clickItem = node.getChildByName("resizeBtn");
				if (clickItem) {
					SimpleResizer.setResizeAble(clickItem, node);
				}
			}
		}, {
			key: "setResizeAble",
			value: function setResizeAble(node) {
				node.on(Laya.Event.CLICK, null, DisControlTool.resizeHandler, [node]);
			}
		}, {
			key: "setDragingItem",
			value: function setDragingItem(dragBar, tar) {
				dragBar.on(Laya.Event.MOUSE_DOWN, null, DisControlTool.dragingHandler, [tar]);
				tar.on(Laya.Event.DRAG_END, null, DisControlTool.dragingEnd, [tar]);
			}
		}, {
			key: "dragingHandler",
			value: function dragingHandler(tar) {
				if (tar) {
					tar.startDrag();
				}
			}
		}, {
			key: "dragingEnd",
			value: function dragingEnd(tar) {
				DisControlTool.intFyDisPos(tar);
				console.log(tar.x, tar.y);
			}
		}, {
			key: "showToStage",
			value: function showToStage(dis) {
				var offX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var offY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				var rec = dis.getBounds();
				dis.x = Laya.Laya.stage.mouseX + offX;
				dis.y = Laya.Laya.stage.mouseY + offY;
				if (dis.x + rec.width > Laya.Laya.stage.width) {
					dis.x -= rec.width + offX;
				}
				if (dis.y + rec.height > Laya.Laya.stage.height) {
					dis.y -= rec.height + offY;
				}
				DisControlTool.intFyDisPos(dis);
			}
		}, {
			key: "intFyDisPos",
			value: function intFyDisPos(dis) {
				if (!dis) return;
				dis.x = Math.round(dis.x);
				dis.y = Math.round(dis.y);
			}
		}, {
			key: "showOnly",
			value: function showOnly(disList, showItem) {
				var i, len;
				len = disList.length;
				for (i = 0; i < len; i++) {
					disList[i].visible = disList[i] == showItem;
				}
			}
		}, {
			key: "showOnlyByIndex",
			value: function showOnlyByIndex(disList, index) {
				DisControlTool.showOnly(disList, disList[index]);
			}
		}, {
			key: "addOnly",
			value: function addOnly(disList, showItem, parent) {
				var i, len;
				len = disList.length;
				for (i = 0; i < len; i++) {
					if (disList[i] != showItem) {
						disList[i].removeSelf();
					} else {
						parent.addChild(disList[i]);
					}
				}
			}
		}, {
			key: "addOnlyByIndex",
			value: function addOnlyByIndex(disList, index, parent) {
				DisControlTool.addOnly(disList, disList[index], parent);
			}
		}]);

		return DisControlTool;
	}();

	DisControlTool.tempP = new Laya.Point();

	var Rect = function (_Laya$Sprite) {
		_inherits(Rect, _Laya$Sprite);

		function Rect() {
			_classCallCheck(this, Rect);

			var _this2 = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this));

			_this2.recWidth = 10;
			_this2.drawMe();
			return _this2;
		}

		_createClass(Rect, [{
			key: "drawMe",
			value: function drawMe() {
				var g;
				g = this.graphics;
				g.clear();
				g.drawRect(0, 0, this.recWidth, this.recWidth, "#22ff22");
				this.size(this.recWidth, this.recWidth);
			}
		}, {
			key: "posTo",
			value: function posTo(x, y) {
				this.x = x - this.recWidth * 0.5;
				this.y = y - this.recWidth * 0.5;
			}
		}]);

		return Rect;
	}(Laya.Sprite);

	var ValueChanger = function () {
		function ValueChanger() {
			_classCallCheck(this, ValueChanger);

			this.preValue = 0;
		}

		_createClass(ValueChanger, [{
			key: "record",
			value: function record() {
				this.preValue = this.value;
			}
		}, {
			key: "showValueByAdd",
			value: function showValueByAdd(addValue) {
				this.value = this.preValue + addValue;
			}
		}, {
			key: "showValueByScale",
			value: function showValueByScale(scale) {
				this.value = this.preValue * scale;
			}
		}, {
			key: "recover",
			value: function recover() {
				this.value = this.preValue;
			}
		}, {
			key: "dispose",
			value: function dispose() {
				this.target = null;
			}
		}, {
			key: "value",
			get: function get() {
				if (this.target) {
					this._tValue = this.target[this.key];
				}
				return this._tValue;
			},
			set: function set(nValue) {
				this._tValue = nValue;
				if (this.target) {
					this.target[this.key] = nValue;
				}
			}
		}, {
			key: "dValue",
			get: function get() {
				return this.value - this.preValue;
			}
		}, {
			key: "scaleValue",
			get: function get() {
				return this.value / this.preValue;
			}
		}], [{
			key: "create",
			value: function create(target, key) {
				var rst;
				rst = new ValueChanger();
				rst.target = target;
				rst.key = key;
				return rst;
			}
		}]);

		return ValueChanger;
	}();

	var ArrowLine = function (_Laya$Sprite2) {
		_inherits(ArrowLine, _Laya$Sprite2);

		function ArrowLine() {
			var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "X";

			_classCallCheck(this, ArrowLine);

			var _this3 = _possibleConstructorReturn(this, (ArrowLine.__proto__ || Object.getPrototypeOf(ArrowLine)).call(this));

			_this3.lineLen = 160;
			_this3.arrowLen = 10;
			_this3.lenControl = new Rect();
			_this3.rotationControl = new Rect();
			_this3.sign = "Y";
			_this3.lenChanger = ValueChanger.create(_this3, "lineLen");
			_this3.lenControlXChanger = ValueChanger.create(_this3.lenControl, "x");
			_this3._isMoving = false;
			_this3.sign = sign;
			_this3.addChild(_this3.lenControl);
			_this3.addChild(_this3.rotationControl);
			_this3.lenControl.on(Laya.Event.MOUSE_DOWN, _this3, _this3.controlMouseDown);
			_this3.drawMe();
			return _this3;
		}

		_createClass(ArrowLine, [{
			key: "drawMe",
			value: function drawMe() {
				var g;
				g = this.graphics;
				g.clear();
				g.drawLine(0, 0, this.lineLen, 0, "#ffff00");
				g.drawLine(this.lineLen, 0, this.lineLen - this.arrowLen, -this.arrowLen, "#ff0000");
				g.drawLine(this.lineLen, 0, this.lineLen - this.arrowLen, this.arrowLen, "#ff0000");
				g.fillText(this.sign, 50, -5, "", "#ff0000", "left");
				if (this._isMoving && this._targetChanger) {
					g.fillText(this._targetChanger.key + ":" + this._targetChanger.value.toFixed(2), this.lineLen - 15, -25, "", "#ffff00", "center");
				}
				this.lenControl.posTo(this.lineLen - 15, 0);
				this.rotationControl.posTo(this.lineLen + 10, 0);
				this.size(this.arrowLen, this.lineLen);
			}
		}, {
			key: "clearMoveEvents",
			value: function clearMoveEvents() {
				Laya.Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.stageMouseMove);
				Laya.Laya.stage.off(Laya.Event.MOUSE_UP, this, this.stageMouseUp);
			}
		}, {
			key: "controlMouseDown",
			value: function controlMouseDown(e) {
				this.clearMoveEvents();
				this.lenControlXChanger.record();
				this.lenChanger.record();
				if (this.targetChanger) {
					this.targetChanger.record();
				}
				this._isMoving = true;
				Laya.Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.stageMouseMove);
				Laya.Laya.stage.on(Laya.Event.MOUSE_UP, this, this.stageMouseUp);
			}
		}, {
			key: "stageMouseMove",
			value: function stageMouseMove(e) {
				this.lenControlXChanger.value = this.mouseX;
				this.lenChanger.showValueByScale(this.lenControlXChanger.scaleValue);
				if (this.targetChanger) {
					this.targetChanger.showValueByScale(this.lenControlXChanger.scaleValue);
				}
				this.drawMe();
			}
		}, {
			key: "stageMouseUp",
			value: function stageMouseUp(e) {
				this._isMoving = false;
				this.noticeChange();
				this.clearMoveEvents();
				this.lenControlXChanger.recover();
				this.lenChanger.recover();
				this.drawMe();
			}
		}, {
			key: "noticeChange",
			value: function noticeChange() {
				var dLen;
				dLen = this.lenChanger.dValue;
				console.log("lenChange:", dLen);
			}
		}, {
			key: "targetChanger",
			set: function set(changer) {
				if (this._targetChanger) {
					this._targetChanger.dispose();
				}
				this._targetChanger = changer;
			},
			get: function get() {
				return this._targetChanger;
			}
		}]);

		return ArrowLine;
	}(Laya.Sprite);

	var Axis = function (_Laya$Sprite3) {
		_inherits(Axis, _Laya$Sprite3);

		function Axis() {
			_classCallCheck(this, Axis);

			var _this4 = _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this));

			_this4.xAxis = new ArrowLine("X");
			_this4.yAxis = new ArrowLine("Y");
			_this4.controlBox = new Rect();
			_this4._lenType = [["width", "height"], ["scaleX", "scaleY"]];
			_this4._type = 1;
			_this4._point = new Laya.Point();
			_this4.oPoint = new Laya.Point();
			_this4.myRotationChanger = ValueChanger.create(_this4, "rotation");
			_this4.targetRotationChanger = ValueChanger.create(null, "rotation");
			_this4.stageMouseRotationChanger = new ValueChanger();
			_this4.mouseEnabled = true;
			_this4.size(1, 1);
			_this4.initMe();
			_this4.xAxis.rotationControl.on(Laya.Event.MOUSE_DOWN, _this4, _this4.controlMouseDown);
			_this4.yAxis.rotationControl.on(Laya.Event.MOUSE_DOWN, _this4, _this4.controlMouseDown);
			_this4.controlBox.on(Laya.Event.MOUSE_DOWN, _this4, _this4.controlBoxMouseDown);
			_this4.on(Laya.Event.DRAG_MOVE, _this4, _this4.dragging);
			return _this4;
		}

		_createClass(Axis, [{
			key: "updateChanges",
			value: function updateChanges() {
				if (this._target) {
					var params;
					params = this._lenType[this._type];
					this.xAxis.targetChanger = ValueChanger.create(this._target, params[0]);
					this.yAxis.targetChanger = ValueChanger.create(this._target, params[1]);
				}
			}
		}, {
			key: "switchType",
			value: function switchType() {
				this._type++;
				this._type = this._type % this._lenType.length;
				this.type = this._type;
			}
		}, {
			key: "controlBoxMouseDown",
			value: function controlBoxMouseDown(e) {
				this.startDrag();
			}
		}, {
			key: "dragging",
			value: function dragging() {
				if (this._target) {
					this._point.setTo(this.x, this.y);
					DisControlTool.transPoint(this.parent, this._target.parent, this._point);
					this._target.pos(this._point.x, this._point.y);
				}
			}
		}, {
			key: "initMe",
			value: function initMe() {
				this.addChild(this.xAxis);
				this.addChild(this.yAxis);
				this.yAxis.rotation = 90;
				this.addChild(this.controlBox);
				this.controlBox.posTo(0, 0);
			}
		}, {
			key: "clearMoveEvents",
			value: function clearMoveEvents() {
				Laya.Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.stageMouseMove);
				Laya.Laya.stage.off(Laya.Event.MOUSE_UP, this, this.stageMouseUp);
			}
		}, {
			key: "controlMouseDown",
			value: function controlMouseDown(e) {
				this.targetRotationChanger.target = this.target;
				this.clearMoveEvents();
				this.oPoint.setTo(0, 0);
				this.myRotationChanger.record();
				this.oPoint = this.localToGlobal(this.oPoint);
				this.stageMouseRotationChanger.value = this.getStageMouseRatation();
				this.stageMouseRotationChanger.record();
				this.targetRotationChanger.record();
				Laya.Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.stageMouseMove);
				Laya.Laya.stage.on(Laya.Event.MOUSE_UP, this, this.stageMouseUp);
			}
		}, {
			key: "getStageMouseRatation",
			value: function getStageMouseRatation() {
				return Laya.MathUtil.getRotation(this.oPoint.x, this.oPoint.y, Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY);
			}
		}, {
			key: "stageMouseMove",
			value: function stageMouseMove(e) {
				this.stageMouseRotationChanger.value = this.getStageMouseRatation();
				var dRotation;
				dRotation = -this.stageMouseRotationChanger.dValue;
				if (this.target) {
					this.targetRotationChanger.showValueByAdd(dRotation);
				} else {
					this.myRotationChanger.showValueByAdd(dRotation);
				}
			}
		}, {
			key: "stageMouseUp",
			value: function stageMouseUp(e) {
				this.noticeChange();
				this.clearMoveEvents();
			}
		}, {
			key: "noticeChange",
			value: function noticeChange() {
				console.log("rotate:", -this.stageMouseRotationChanger.dValue);
			}
		}, {
			key: "target",
			set: function set(tar) {
				this._target = tar;
				this.updateChanges();
			},
			get: function get() {
				return this._target;
			}
		}, {
			key: "type",
			set: function set(lenType) {
				this._type = lenType;
				this.updateChanges();
			},
			get: function get() {
				return this._type;
			}
		}]);

		return Axis;
	}(Laya.Sprite);

	var DisController = function () {
		function DisController() {
			_classCallCheck(this, DisController);

			DisController.init();
			this.arrowAxis = new Axis();
			this.arrowAxis.mouseEnabled = true;
		}

		_createClass(DisController, [{
			key: "switchType",
			value: function switchType() {
				this.arrowAxis.switchType();
			}
		}, {
			key: "updateMe",
			value: function updateMe() {
				if (!this._target) return;
				this.recInfo = RecInfo.getGlobalRecInfo(this._target, 0, 0, 1, 0, 0, 1);
				console.log("rotation:", this.recInfo.rotation);
				console.log("pos:", this.recInfo.x, this.recInfo.y);
				console.log("scale:", this.recInfo.width, this.recInfo.height);
				this.arrowAxis.x = this.recInfo.x;
				this.arrowAxis.y = this.recInfo.y;
				this.arrowAxis.rotation = this.recInfo.rotation;
				this.arrowAxis.yAxis.rotation = this.recInfo.rotationV - this.recInfo.rotation;
			}
		}, {
			key: "target",
			set: function set(target) {
				this._target = target;
				if (target) {
					DisController._container.addChild(this.arrowAxis);
					Laya.Laya.timer.loop(100, this, this.updateMe);
				} else {
					this.arrowAxis.removeSelf();
					Laya.Laya.timer.clear(this, this.updateMe);
				}
				this.arrowAxis.target = target;
				this.updateMe();
			},
			get: function get() {
				return this._target;
			}
		}, {
			key: "type",
			set: function set(lenType) {
				this.arrowAxis.type = lenType;
			},
			get: function get() {
				return this.arrowAxis.type;
			}
		}], [{
			key: "init",
			value: function init() {
				if (DisController._container) {
					DisControlTool.setTop(DisController._container);
					return;
				}
				DisController._container = new Laya.Sprite();
				DisController._container.mouseEnabled = true;
				Laya.Laya.stage.addChild(DisController._container);
			}
		}, {
			key: "I",
			get: function get() {
				if (!DisController._instance) {
					DisController._instance = new DisController();
				}
				return DisController._instance;
			},
			set: function set(value) {
				DisController._instance = value;
			}
		}]);

		return DisController;
	}();

	var DTrace = function () {
		function DTrace() {
			_classCallCheck(this, DTrace);
		}

		_createClass(DTrace, null, [{
			key: "getArgArr",
			value: function getArgArr(arg) {
				var rst;
				rst = [];
				var i,
				    len = arg.length;
				for (i = 0; i < len; i++) {
					rst.push(arg[i]);
				}
				return rst;
			}
		}, {
			key: "dTrace",
			value: function dTrace() {
				for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
					arg[_key] = arguments[_key];
				}

				arg = DTrace.getArgArr(arg);
				arg.push(TraceTool.getCallLoc(2));
				console.log.apply(console, arg);
				var str;
				str = arg.join(" ");
			}
		}, {
			key: "timeStart",
			value: function timeStart(sign) {
				console.time(sign);
			}
		}, {
			key: "timeEnd",
			value: function timeEnd(sign) {
				console.timeEnd(sign);
			}
		}, {
			key: "traceTable",
			value: function traceTable(data) {
				console.table(data);
			}
		}]);

		return DTrace;
	}();

	var RunProfile = function () {
		function RunProfile() {
			_classCallCheck(this, RunProfile);
		}

		_createClass(RunProfile, null, [{
			key: "run",
			value: function run(funName) {
				var callLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

				var tCount;
				if (!RunProfile.infoDic.hasOwnProperty(funName)) {
					RunProfile.infoDic[funName] = new CountTool();
				}
				tCount = RunProfile.infoDic[funName];
				var msg;
				msg = TraceTool.getCallLoc(callLen) + "\n" + TraceTool.getCallStack(1, callLen - 3);
				tCount.add(msg);
				if (RunProfile._runShowDic[funName]) {
					console.log("Create:" + funName);
					console.log(msg);
				}
			}
		}, {
			key: "showClassCreate",
			value: function showClassCreate(funName) {
				RunProfile._runShowDic[funName] = true;
			}
		}, {
			key: "hideClassCreate",
			value: function hideClassCreate(funName) {
				RunProfile._runShowDic[funName] = false;
			}
		}, {
			key: "getRunInfo",
			value: function getRunInfo(funName) {
				var rst;
				rst = RunProfile.infoDic[funName];
				return RunProfile.infoDic[funName];
			}
		}, {
			key: "runTest",
			value: function runTest(fun, count) {
				var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "runTest";

				DTrace.timeStart(sign);
				var i;
				for (i = 0; i < count; i++) {
					fun();
				}
				DTrace.timeEnd(sign);
			}
		}, {
			key: "runTest2",
			value: function runTest2(fun, count) {
				var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "runTest";

				var preTime;
				preTime = Laya.Browser.now();
				var i;
				for (i = 0; i < count; i++) {
					fun();
				}
				return Laya.Browser.now() - preTime;
			}
		}]);

		return RunProfile;
	}();

	RunProfile.infoDic = {};
	RunProfile._runShowDic = {};

	var WalkTools = function () {
		function WalkTools() {
			_classCallCheck(this, WalkTools);
		}

		_createClass(WalkTools, null, [{
			key: "walkTarget",
			value: function walkTarget(target, fun) {
				var _this = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				fun.apply(_this, [target]);
				var i;
				var len;
				var tChild;
				len = target.numChildren;
				for (i = 0; i < len; i++) {
					tChild = target.getChildAt(i);
					WalkTools.walkTarget(tChild, fun, tChild);
				}
			}
		}, {
			key: "walkTargetEX",
			value: function walkTargetEX(target, fun) {
				var _this = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				var filterFun = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				if (filterFun != null && !filterFun(target)) return;
				fun.apply(_this, [target]);
				var i;
				var len;
				var tChild;
				var childs;
				childs = target._children;
				len = childs.length;
				for (i = 0; i < len; i++) {
					tChild = childs[i];
					WalkTools.walkTarget(tChild, fun, tChild);
				}
			}
		}, {
			key: "walkChildren",
			value: function walkChildren(target, fun) {
				var _this = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (!target || target.numChildren < 1) return;
				WalkTools.walkArr(DisControlTool.getAllChild(target), fun, _this);
			}
		}, {
			key: "walkArr",
			value: function walkArr(arr, fun) {
				var _this = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (!arr) return;
				var i;
				var len;
				len = arr.length;
				for (i = 0; i < len; i++) {
					fun.apply(_this, [arr[i], i]);
				}
			}
		}]);

		return WalkTools;
	}();

	var DebugInfoLayer = function (_Laya$Sprite4) {
		_inherits(DebugInfoLayer, _Laya$Sprite4);

		function DebugInfoLayer() {
			_classCallCheck(this, DebugInfoLayer);

			var _this5 = _possibleConstructorReturn(this, (DebugInfoLayer.__proto__ || Object.getPrototypeOf(DebugInfoLayer)).call(this));

			_this5.nodeRecInfoLayer = new Laya.Sprite();
			_this5.lineLayer = new Laya.Sprite();
			_this5.txtLayer = new Laya.Sprite();
			_this5.popLayer = new Laya.Sprite();
			_this5.graphicLayer = new Laya.Sprite();
			_this5.cacheViewLayer = new Laya.Sprite();
			_this5.nodeRecInfoLayer.name = "nodeRecInfoLayer";
			_this5.lineLayer.name = "lineLayer";
			_this5.txtLayer.name = "txtLayer";
			_this5.popLayer.name = "popLayer";
			_this5.graphicLayer.name = "graphicLayer";
			_this5.cacheViewLayer.name = "cacheViewLayer";
			_this5.addChild(_this5.lineLayer);
			_this5.addChild(_this5.cacheViewLayer);
			_this5.addChild(_this5.nodeRecInfoLayer);
			_this5.addChild(_this5.txtLayer);
			_this5.addChild(_this5.popLayer);
			_this5.addChild(_this5.graphicLayer);
			DebugInfoLayer.I = _this5;
			_this5.zOrder = 999;
			Laya.Laya.stage.on(Laya.Event.DOUBLE_CLICK, _this5, _this5.setTop);
			return _this5;
		}

		_createClass(DebugInfoLayer, [{
			key: "setTop",
			value: function setTop() {
				DisControlTool.setTop(this);
			}
		}, {
			key: "isDebugItem",
			value: function isDebugItem(sprite) {
				return DisControlTool.isInTree(this, sprite);
			}
		}], [{
			key: "init",
			value: function init() {
				if (!DebugInfoLayer.I) {
					new DebugInfoLayer();
					Laya.Laya.stage.addChild(DebugInfoLayer.I);
				}
			}
		}]);

		return DebugInfoLayer;
	}(Laya.Sprite);

	var IDTools = function () {
		function IDTools() {
			_classCallCheck(this, IDTools);

			this.tID = 1;
		}

		_createClass(IDTools, [{
			key: "getID",
			value: function getID() {
				return this.tID++;
			}
		}], [{
			key: "getAID",
			value: function getAID() {
				return IDTools._ID.getID();
			}
		}, {
			key: "idObjE",
			value: function idObjE(obj) {
				var sign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";

				if (obj[IDTools.idSign]) return obj;
				if (!sign) {
					sign = "default";
				}
				if (!IDTools._idDic[sign]) {
					IDTools._idDic[sign] = new IDTools();
				}
				obj[IDTools.idSign] = IDTools._idDic[sign].getAID();
				return obj;
			}
		}, {
			key: "setObjID",
			value: function setObjID(obj, id) {
				obj[IDTools.idSign] = id;
				return obj;
			}
		}, {
			key: "idObj",
			value: function idObj(obj) {
				if (obj[IDTools.idSign]) return obj;
				obj[IDTools.idSign] = IDTools.getAID();
				return obj;
			}
		}, {
			key: "getObjID",
			value: function getObjID(obj) {
				if (!obj) return -1;
				return obj[IDTools.idSign];
			}
		}]);

		return IDTools;
	}();

	IDTools._ID = new IDTools();
	IDTools._idDic = { "default": new IDTools() };
	IDTools.idSign = "_M_id_";

	var NodeInfosItem = function (_Laya$Sprite5) {
		_inherits(NodeInfosItem, _Laya$Sprite5);

		function NodeInfosItem() {
			_classCallCheck(this, NodeInfosItem);

			var _this6 = _possibleConstructorReturn(this, (NodeInfosItem.__proto__ || Object.getPrototypeOf(NodeInfosItem)).call(this));

			_this6._infoTxt = new Laya.Text();
			_this6._infoTxt.color = "#ff0000";
			_this6._infoTxt.bgColor = "#00ff00";
			_this6._infoTxt.fontSize = 12;
			return _this6;
		}

		_createClass(NodeInfosItem, [{
			key: "removeSelf",
			value: function removeSelf() {
				this._infoTxt.removeSelf();
				return _get(NodeInfosItem.prototype.__proto__ || Object.getPrototypeOf(NodeInfosItem.prototype), "removeSelf", this).call(this);
			}
		}, {
			key: "showToUI",
			value: function showToUI() {
				NodeInfosItem.NodeInfoContainer.nodeRecInfoLayer.addChild(this);
				this._infoTxt.removeSelf();
				NodeInfosItem.NodeInfoContainer.txtLayer.addChild(this._infoTxt);
				this.findOkPos();
			}
		}, {
			key: "randomAPos",
			value: function randomAPos(r) {
				this._infoTxt.x = this.x + Laya.Laya.stage.width * Math.random();
				this._infoTxt.y = this.y + r * Math.random();
			}
		}, {
			key: "findOkPos",
			value: function findOkPos() {
				var len;
				len = 20;
				this.randomAPos(len);
				return;
				var count;
				count = 1;
				while (!this.isPosOk()) {
					count++;
					if (count >= 500) {
						len += 10;
						count = 0;
					}
					this.randomAPos(len);
				}
			}
		}, {
			key: "isPosOk",
			value: function isPosOk() {
				var tParent;
				tParent = NodeInfosItem.NodeInfoContainer.nodeRecInfoLayer;
				var i, len;
				var cList;
				cList = tParent._children;
				len = cList.length;
				var tChild;
				var mRec;
				mRec = this._infoTxt.getBounds();
				if (mRec.x < 0) return false;
				if (mRec.y < 0) return false;
				if (mRec.right > Laya.Laya.stage.width) return false;
				for (i = 0; i < len; i++) {
					tChild = cList[i];
					if (tChild == this._infoTxt) continue;
					if (mRec.intersects(tChild.getBounds())) return false;
				}
				return true;
			}
		}, {
			key: "showInfo",
			value: function showInfo(node) {
				this._tar = node;
				if (!node) return;
				NodeInfosItem._txts.length = 0;
				var i, len;
				var tKey;
				len = NodeInfosItem.showValues.length;
				if (node.name) {
					NodeInfosItem._txts.push(ClassTool.getClassName(node) + "(" + node.name + ")");
				} else {
					NodeInfosItem._txts.push(ClassTool.getClassName(node));
				}
				for (i = 0; i < len; i++) {
					tKey = NodeInfosItem.showValues[i];
					NodeInfosItem._txts.push(tKey + ":" + NodeInfosItem.getNodeValue(node, tKey));
				}
				this._infoTxt.text = NodeInfosItem._txts.join("\n");
				this.graphics.clear();
				var pointList;
				pointList = node._getBoundPointsM(true);
				if (!pointList || pointList.length < 1) return;
				pointList = Laya.GrahamScan.pListToPointList(pointList, true);
				WalkTools.walkArr(pointList, node.localToGlobal, node);
				pointList = Laya.GrahamScan.pointListToPlist(pointList);
				NodeInfosItem._disBoundRec = Laya.Rectangle._getWrapRec(pointList, NodeInfosItem._disBoundRec);
				this.graphics.drawRect(0, 0, NodeInfosItem._disBoundRec.width, NodeInfosItem._disBoundRec.height, null, "#00ffff");
				this.pos(NodeInfosItem._disBoundRec.x, NodeInfosItem._disBoundRec.y);
			}
		}, {
			key: "fresh",
			value: function fresh() {
				this.showInfo(this._tar);
			}
		}, {
			key: "clearMe",
			value: function clearMe() {
				this._tar = null;
			}
		}, {
			key: "recover",
			value: function recover() {
				Laya.Pool.recover("NodeInfosItem", this);
			}
		}], [{
			key: "init",
			value: function init() {
				if (!NodeInfosItem.NodeInfoContainer) {
					DebugInfoLayer.init();
					NodeInfosItem.NodeInfoContainer = DebugInfoLayer.I;
					Laya.Laya.stage.addChild(NodeInfosItem.NodeInfoContainer);
				}
			}
		}, {
			key: "getNodeInfoByNode",
			value: function getNodeInfoByNode(node) {
				IDTools.idObj(node);
				var key;
				key = IDTools.getObjID(node);
				if (!NodeInfosItem._nodeInfoDic[key]) {
					NodeInfosItem._nodeInfoDic[key] = new NodeInfosItem();
				}
				return NodeInfosItem._nodeInfoDic[key];
			}
		}, {
			key: "hideAllInfos",
			value: function hideAllInfos() {
				var key;
				var tInfo;
				for (key in NodeInfosItem._nodeInfoDic) {
					tInfo = NodeInfosItem._nodeInfoDic[key];
					tInfo.removeSelf();
				}
				NodeInfosItem.clearRelations();
			}
		}, {
			key: "showNodeInfo",
			value: function showNodeInfo(node) {
				var nodeInfo;
				nodeInfo = NodeInfosItem.getNodeInfoByNode(node);
				nodeInfo.showInfo(node);
				nodeInfo.showToUI();
			}
		}, {
			key: "showDisInfos",
			value: function showDisInfos(node) {
				var _node;
				_node = node;
				if (!node) return;
				while (node) {
					NodeInfosItem.showNodeInfo(node);
					node = node.parent;
				}
				DisControlTool.setTop(NodeInfosItem.NodeInfoContainer);
				NodeInfosItem.apdtTxtInfoPoss(_node);
				NodeInfosItem.updateRelations();
			}
		}, {
			key: "apdtTxtInfoPoss",
			value: function apdtTxtInfoPoss(node) {
				var disList;
				disList = [];
				while (node) {
					disList.push(node);
					node = node.parent;
				}
				var i, len;
				var tInfo;
				var tTxt;
				len = disList.length;
				var xPos;
				xPos = Laya.Laya.stage.width - 150;
				var heightLen;
				heightLen = 100;
				node = disList[0];
				if (node) {
					tInfo = NodeInfosItem.getNodeInfoByNode(node);
					if (tInfo) {
						tTxt = tInfo._infoTxt;
						xPos = Laya.Laya.stage.width - tTxt.width - 10;
						heightLen = tTxt.height + 10;
					}
				}
				disList = disList.reverse();
				for (i = 0; i < len; i++) {
					node = disList[i];
					tInfo = NodeInfosItem.getNodeInfoByNode(node);
					if (tInfo) {
						tTxt = tInfo._infoTxt;
						tTxt.pos(xPos, heightLen * i);
					}
				}
			}
		}, {
			key: "clearRelations",
			value: function clearRelations() {
				var g;
				g = NodeInfosItem.NodeInfoContainer.lineLayer.graphics;
				g.clear();
			}
		}, {
			key: "updateRelations",
			value: function updateRelations() {
				var g;
				g = NodeInfosItem.NodeInfoContainer.lineLayer.graphics;
				g.clear();
				var key;
				var tInfo;
				for (key in NodeInfosItem._nodeInfoDic) {
					tInfo = NodeInfosItem._nodeInfoDic[key];
					if (tInfo.parent) {
						g.drawLine(tInfo.x, tInfo.y, tInfo._infoTxt.x, tInfo._infoTxt.y, "#0000ff");
					}
				}
			}
		}, {
			key: "getNodeValue",
			value: function getNodeValue(node, key) {
				var rst;
				NodeInfosItem._nodePoint.setTo(0, 0);
				switch (key) {
					case "x":
						rst = node["x"] + " (g:" + node.localToGlobal(NodeInfosItem._nodePoint).x + ")";
						break;
					case "y":
						rst = node["y"] + " (g:" + node.localToGlobal(NodeInfosItem._nodePoint).y + ")";
						break;
					default:
						rst = node[key];
				}
				return rst;
			}
		}]);

		return NodeInfosItem;
	}(Laya.Sprite);

	NodeInfosItem.showValues = ["x", "y", "scaleX", "scaleY", "width", "height", "visible", "mouseEnabled"];
	NodeInfosItem._nodeInfoDic = {};
	NodeInfosItem._disBoundRec = new Laya.Rectangle();
	NodeInfosItem._txts = [];
	NodeInfosItem._nodePoint = new Laya.Point();

	var NodeInfoPanel = function (_Laya$Sprite6) {
		_inherits(NodeInfoPanel, _Laya$Sprite6);

		function NodeInfoPanel() {
			_classCallCheck(this, NodeInfoPanel);

			var _this7 = _possibleConstructorReturn(this, (NodeInfoPanel.__proto__ || Object.getPrototypeOf(NodeInfoPanel)).call(this));

			_this7._stateDic = {};
			_this7.isWorkState = false;
			return _this7;
		}

		_createClass(NodeInfoPanel, [{
			key: "showDisInfo",
			value: function showDisInfo(node) {
				this.recoverNodes();
				NodeInfosItem.showDisInfos(node);
				this.showOnly(node);
				this.isWorkState = true;
			}
		}, {
			key: "showOnly",
			value: function showOnly(node) {
				if (!node) return;
				this.hideBrothers(node);
				this.showOnly(node.parent);
			}
		}, {
			key: "recoverNodes",
			value: function recoverNodes() {
				NodeInfosItem.hideAllInfos();
				var key;
				var data;
				var tTar;
				for (key in this._stateDic) {
					data = this._stateDic[key];
					tTar = data["target"];
					if (tTar) {
						try {
							tTar.visible = data.visible;
						} catch (e) {}
					}
				}
				this.isWorkState = false;
			}
		}, {
			key: "hideOtherChain",
			value: function hideOtherChain(node) {
				if (!node) return;
				while (node) {
					this.hideBrothers(node);
					node = node.parent;
				}
			}
		}, {
			key: "hideChilds",
			value: function hideChilds(node) {
				if (!node) return;
				var i, len;
				var cList;
				cList = node._children;
				len = cList.length;
				var tChild;
				for (i = 0; i < len; i++) {
					tChild = cList[i];
					if (tChild == NodeInfosItem.NodeInfoContainer) continue;
					this.saveNodeInfo(tChild);
					tChild.visible = false;
				}
			}
		}, {
			key: "hideBrothers",
			value: function hideBrothers(node) {
				if (!node) return;
				var p;
				p = node.parent;
				if (!p) return;
				var i, len;
				var cList;
				cList = p._children;
				len = cList.length;
				var tChild;
				for (i = 0; i < len; i++) {
					tChild = cList[i];
					if (tChild == NodeInfosItem.NodeInfoContainer) continue;
					if (tChild != node) {
						this.saveNodeInfo(tChild);
						tChild.visible = false;
					}
				}
			}
		}, {
			key: "saveNodeInfo",
			value: function saveNodeInfo(node) {
				IDTools.idObj(node);
				if (this._stateDic.hasOwnProperty(IDTools.getObjID(node))) return;
				var data;
				data = {};
				data.target = node;
				data.visible = node.visible;
				this._stateDic[IDTools.getObjID(node)] = data;
			}
		}, {
			key: "recoverNodeInfo",
			value: function recoverNodeInfo(node) {
				IDTools.idObj(node);
				if (this._stateDic.hasOwnProperty(IDTools.getObjID(node))) {
					var data;
					data = this._stateDic[IDTools.getObjID(node)];
					node["visible"] = data.visible;
				}
			}
		}], [{
			key: "init",
			value: function init() {
				if (!NodeInfoPanel.I) {
					NodeInfoPanel.I = new NodeInfoPanel();
					NodeInfosItem.init();
				}
			}
		}]);

		return NodeInfoPanel;
	}(Laya.Sprite);

	var NodeConsts = function NodeConsts() {
		_classCallCheck(this, NodeConsts);
	};

	NodeConsts.defaultFitlerStr = "x,y,width,height,scaleX,scaleY,alpha,renderCost";
	NodeConsts.RenderCostMaxTime = 3000;

	var RenderAnalyser = function () {
		function RenderAnalyser() {
			_classCallCheck(this, RenderAnalyser);

			this.timeDic = {};
			this.resultDic = {};
			this.countDic = {};
			this.resultCountDic = {};
			this.nodeDic = {};
			this.isWorking = false;
			this.working = true;
		}

		_createClass(RenderAnalyser, [{
			key: "render",
			value: function render(sprite, time) {
				this.addTime(sprite, time);
			}
		}, {
			key: "addTime",
			value: function addTime(sprite, time) {
				IDTools.idObj(sprite);
				var key;
				key = IDTools.getObjID(sprite);
				if (!this.timeDic.hasOwnProperty(key)) {
					this.timeDic[key] = 0;
				}
				this.timeDic[key] = this.timeDic[key] + time;
				if (!this.countDic.hasOwnProperty(key)) {
					this.countDic[key] = 0;
				}
				this.countDic[key] = this.countDic[key] + 1;
				this.nodeDic[key] = sprite;
			}
		}, {
			key: "getTime",
			value: function getTime(sprite) {
				IDTools.idObj(sprite);
				var key;
				key = IDTools.getObjID(sprite);
				if (!this.resultDic[key]) return 0;
				return this.resultDic[key];
			}
		}, {
			key: "getCount",
			value: function getCount(sprite) {
				IDTools.idObj(sprite);
				var key;
				key = IDTools.getObjID(sprite);
				return this.resultCountDic[key];
			}
		}, {
			key: "reset",
			value: function reset() {
				var key;
				for (key in this.timeDic) {
					this.timeDic[key] = 0;
					this.countDic[key] = 0;
				}
				ObjectTools.clearObj(this.nodeDic);
			}
		}, {
			key: "updates",
			value: function updates() {
				ObjectTools.clearObj(this.resultDic);
				ObjectTools.insertValue(this.resultDic, this.timeDic);
				ObjectTools.clearObj(this.resultCountDic);
				ObjectTools.insertValue(this.resultCountDic, this.countDic);
				this.reset();
			}
		}, {
			key: "working",
			set: function set(v) {
				this.isWorking = v;
				if (v) {
					Laya.Laya.timer.loop(NodeConsts.RenderCostMaxTime, this, this.updates);
				} else {
					Laya.Laya.timer.clear(this, this.updates);
				}
			}
		}], [{
			key: "I",
			get: function get() {
				if (!RenderAnalyser._instance) {
					RenderAnalyser._instance = new RenderAnalyser();
				}
				return RenderAnalyser._instance;
			},
			set: function set(value) {
				RenderAnalyser._instance = value;
			}
		}]);

		return RenderAnalyser;
	}();

	var NodeUtils = function () {
		function NodeUtils() {
			_classCallCheck(this, NodeUtils);
		}

		_createClass(NodeUtils, null, [{
			key: "getFilterdTree",
			value: function getFilterdTree(sprite, keys) {
				if (!keys) keys = NodeUtils.defaultKeys;
				var me;
				me = {};
				var key;
				var i, len;
				len = keys.length;
				for (i = 0; i < len; i++) {
					key = keys[i];
					me[key] = sprite[key];
				}
				var cList;
				var tChild;
				cList = sprite._children;
				len = cList.length;
				var mClist;
				mClist = [];
				for (i = 0; i < len; i++) {
					tChild = cList[i];
					mClist.push(NodeUtils.getFilterdTree(tChild, keys));
				}
				me.childs = mClist;
				return me;
			}
		}, {
			key: "getNodeValue",
			value: function getNodeValue(node, key) {
				var rst;
				if (node instanceof Laya.Sprite) {
					var tNode;
					tNode = node;
					switch (key) {
						case "gRec":
							rst = NodeUtils.getGRec(tNode).toString();
							break;
						case "gAlpha":
							rst = NodeUtils.getGAlpha(tNode) + "";
							break;
						case "cmdCount":
							rst = NodeUtils.getNodeCmdCount(tNode) + "";
							break;
						case "cmdAll":
							rst = NodeUtils.getNodeCmdTotalCount(tNode) + "";
							break;
						case "nodeAll":
							rst = "" + NodeUtils.getNodeCount(tNode);
							break;
						case "nodeVisible":
							rst = "" + NodeUtils.getNodeCount(tNode, true);
							break;
						case "nodeRender":
							rst = "" + NodeUtils.getRenderNodeCount(tNode);
							break;
						case "nodeReCache":
							rst = "" + NodeUtils.getReFreshRenderNodeCount(tNode);
							break;
						case "renderCost":
							rst = "" + RenderAnalyser.I.getTime(tNode);
							break;
						case "renderCount":
							rst = "" + RenderAnalyser.I.getCount(tNode);
							break;
						default:
							rst = node[key] + "";
					}
				} else {
					rst = node[key] + "";
				}
				return rst;
			}
		}, {
			key: "getPropertyDesO",
			value: function getPropertyDesO(tValue, keys) {
				if (!keys) keys = NodeUtils.defaultKeys;
				var rst = {};
				if ((typeof tValue === "undefined" ? "undefined" : _typeof(tValue)) == 'object') {
					rst.label = "" + ClassTool.getNodeClassAndName(tValue);
				} else {
					rst.label = "" + tValue;
				}
				rst.type = "";
				rst.path = tValue;
				rst.childs = [];
				rst.isDirectory = false;
				var key;
				var i, len;
				var tChild;
				if (tValue instanceof Laya.Node) {
					rst.des = ClassTool.getNodeClassAndName(tValue);
					rst.isDirectory = true;
					len = keys.length;
					for (i = 0; i < len; i++) {
						key = keys[i];
						tChild = NodeUtils.getPropertyDesO(tValue[key], keys);
						if (tValue.hasOwnProperty(key)) {
							tChild.label = "" + key + ":" + tChild.des;
						} else {
							tChild.label = "" + key + ":" + NodeUtils.getNodeValue(tValue, key);
						}
						rst.childs.push(tChild);
					}
					key = "_children";
					tChild = NodeUtils.getPropertyDesO(tValue[key], keys);
					tChild.label = "" + key + ":" + tChild.des;
					tChild.isChilds = true;
					rst.childs.push(tChild);
				} else if (tValue instanceof Array) {
					rst.des = "Array[" + tValue.length + "]";
					rst.isDirectory = true;
					var tList;
					tList = tValue;
					len = tList.length;
					for (i = 0; i < len; i++) {
						tChild = NodeUtils.getPropertyDesO(tList[i], keys);
						tChild.label = "" + i + ":" + tChild.des;
						rst.childs.push(tChild);
					}
				} else if ((typeof tValue === "undefined" ? "undefined" : _typeof(tValue)) == 'object') {
					rst.des = ClassTool.getNodeClassAndName(tValue);
					rst.isDirectory = true;
					for (key in tValue) {
						tChild = NodeUtils.getPropertyDesO(tValue[key], keys);
						tChild.label = "" + key + ":" + tChild.des;
						rst.childs.push(tChild);
					}
				} else {
					rst.des = "" + tValue;
				}
				rst.hasChild = rst.childs.length > 0;
				return rst;
			}
		}, {
			key: "adptShowKeys",
			value: function adptShowKeys(keys) {
				var i, len;
				len = keys.length;
				for (i = len - 1; i >= 0; i--) {
					keys[i] = StringTool.trimSide(keys[i]);
					if (keys[i].length < 1) {
						keys.splice(i, 1);
					}
				}
				return keys;
			}
		}, {
			key: "getNodeTreeData",
			value: function getNodeTreeData(sprite, keys) {
				NodeUtils.adptShowKeys(keys);
				var treeO;
				treeO = NodeUtils.getPropertyDesO(sprite, keys);
				var treeArr;
				treeArr = [];
				NodeUtils.getTreeArr(treeO, treeArr);
				return treeArr;
			}
		}, {
			key: "getTreeArr",
			value: function getTreeArr(treeO, arr) {
				var add = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				if (add) arr.push(treeO);
				var tArr = treeO.childs;
				var i,
				    len = tArr.length;
				for (i = 0; i < len; i++) {
					if (!add) {
						tArr[i].nodeParent = null;
					} else {
						tArr[i].nodeParent = treeO;
					}
					if (tArr[i].isDirectory) {
						NodeUtils.getTreeArr(tArr[i], arr);
					} else {
						arr.push(tArr[i]);
					}
				}
			}
		}, {
			key: "traceStage",
			value: function traceStage() {
				console.log(NodeUtils.getFilterdTree(Laya.Laya.stage, null));
				console.log("treeArr:", NodeUtils.getNodeTreeData(Laya.Laya.stage, null));
			}
		}, {
			key: "getNodeCount",
			value: function getNodeCount(node) {
				var visibleRequire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (visibleRequire) {
					if (!node.visible) return 0;
				}
				var rst;
				rst = 1;
				var i, len;
				var cList;
				cList = node._children;
				len = cList.length;
				for (i = 0; i < len; i++) {
					rst += NodeUtils.getNodeCount(cList[i], visibleRequire);
				}
				return rst;
			}
		}, {
			key: "getGVisible",
			value: function getGVisible(node) {
				while (node) {
					if (!node.visible) return false;
					node = node.parent;
				}
				return true;
			}
		}, {
			key: "getGAlpha",
			value: function getGAlpha(node) {
				var rst;
				rst = 1;
				while (node) {
					rst *= node.alpha;
					node = node.parent;
				}
				return rst;
			}
		}, {
			key: "getGPos",
			value: function getGPos(node) {
				var point;
				point = new Laya.Point();
				node.localToGlobal(point);
				return point;
			}
		}, {
			key: "getGRec",
			value: function getGRec(node) {
				var pointList;
				pointList = node._getBoundPointsM(true);
				if (!pointList || pointList.length < 1) return Laya.Rectangle.TEMP.setTo(0, 0, 0, 0);
				pointList = Laya.GrahamScan.pListToPointList(pointList, true);
				WalkTools.walkArr(pointList, node.localToGlobal, node);
				pointList = Laya.GrahamScan.pointListToPlist(pointList);
				var _disBoundRec;
				_disBoundRec = Laya.Rectangle._getWrapRec(pointList, _disBoundRec);
				return _disBoundRec;
			}
		}, {
			key: "getGGraphicRec",
			value: function getGGraphicRec(node) {
				var pointList;
				pointList = node.getGraphicBounds()._getBoundPoints();
				if (!pointList || pointList.length < 1) return Laya.Rectangle.TEMP.setTo(0, 0, 0, 0);
				pointList = Laya.GrahamScan.pListToPointList(pointList, true);
				WalkTools.walkArr(pointList, node.localToGlobal, node);
				pointList = Laya.GrahamScan.pointListToPlist(pointList);
				var _disBoundRec;
				_disBoundRec = Laya.Rectangle._getWrapRec(pointList, _disBoundRec);
				return _disBoundRec;
			}
		}, {
			key: "getNodeCmdCount",
			value: function getNodeCmdCount(node) {
				var rst;
				if (node.graphics) {
					if (node.graphics.cmds) {
						rst = node.graphics.cmds.length;
					} else {
						if (node.graphics._one) {
							rst = 1;
						} else {
							rst = 0;
						}
					}
				} else {
					rst = 0;
				}
				return rst;
			}
		}, {
			key: "getNodeCmdTotalCount",
			value: function getNodeCmdTotalCount(node) {
				var rst;
				var i, len;
				var cList;
				cList = node._children;
				len = cList.length;
				rst = NodeUtils.getNodeCmdCount(node);
				for (i = 0; i < len; i++) {
					rst += NodeUtils.getNodeCmdTotalCount(cList[i]);
				}
				return rst;
			}
		}, {
			key: "getRenderNodeCount",
			value: function getRenderNodeCount(node) {
				if (node.cacheAs != "none") return 1;
				var rst;
				var i, len;
				var cList;
				cList = node._children;
				len = cList.length;
				rst = 1;
				for (i = 0; i < len; i++) {
					rst += NodeUtils.getRenderNodeCount(cList[i]);
				}
				return rst;
			}
		}, {
			key: "getReFreshRenderNodeCount",
			value: function getReFreshRenderNodeCount(node) {
				var rst;
				var i, len;
				var cList;
				cList = node._children;
				len = cList.length;
				rst = 1;
				for (i = 0; i < len; i++) {
					rst += NodeUtils.getRenderNodeCount(cList[i]);
				}
				return rst;
			}
		}, {
			key: "showCachedSpriteRecs",
			value: function showCachedSpriteRecs() {
				NodeUtils.g = DebugInfoLayer.I.graphicLayer.graphics;
				NodeUtils.g.clear();
				WalkTools.walkTarget(Laya.Laya.stage, NodeUtils.drawCachedBounds, null);
			}
		}, {
			key: "drawCachedBounds",
			value: function drawCachedBounds(sprite) {
				if (sprite.cacheAs == "none") return;
				if (DebugInfoLayer.I.isDebugItem(sprite)) return;
				var rec;
				rec = NodeUtils.getGRec(sprite);
				NodeUtils.g.drawRect(rec.x, rec.y, rec.width, rec.height, null, "#0000ff", 2);
			}
		}]);

		return NodeUtils;
	}();

	NodeUtils.defaultKeys = ["x", "y", "width", "height"];

	var DifferTool = function () {
		function DifferTool() {
			var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
			var autoTrace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			_classCallCheck(this, DifferTool);

			this.autoTrace = true;
			this.sign = "";
			this.sign = sign;
			this.autoTrace = autoTrace;
		}

		_createClass(DifferTool, [{
			key: "update",
			value: function update(data) {
				var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (msg) {
					console.log(msg);
				}
				var tObj = ObjectTools.copyObj(data);
				if (!this.obj) this.obj = {};
				var rst;
				rst = ObjectTools.differ(this.obj, tObj);
				this.obj = tObj;
				if (this.autoTrace) {
					console.log(this.sign + " differ:");
					ObjectTools.traceDifferObj(rst);
				}
				return rst;
			}
		}], [{
			key: "differ",
			value: function differ(sign, data) {
				var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (!DifferTool._differO[sign]) DifferTool._differO[sign] = new DifferTool(sign, true);
				var tDiffer;
				tDiffer = DifferTool._differO[sign];
				return tDiffer.update(data, msg);
			}
		}]);

		return DifferTool;
	}();

	DifferTool._differO = {};

	var FunHook = function () {
		function FunHook() {
			_classCallCheck(this, FunHook);
		}

		_createClass(FunHook, null, [{
			key: "hook",
			value: function hook(obj, funName) {
				var preFun = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var aftFun = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				FunHook.hookFuns(obj, funName, [preFun, obj[funName], aftFun], 1);
			}
		}, {
			key: "hookAllFun",
			value: function hookAllFun(obj) {
				var key;
				var arr;
				arr = ClassTool.getOwnPropertyNames(obj);
				for (key in arr) {
					key = arr[key];
					if (FunHook.special[key]) continue;
					console.log("try hook:", key);
					if (obj[key] instanceof Function) {
						console.log("hook:", key);
						FunHook.hookFuns(obj, key, [FunHook.getTraceMsg("call:" + key), obj[key]], 1);
					}
				}
				if (obj["__proto__"]) {
					FunHook.hookAllFun(obj["__proto__"]);
				} else {
					console.log("end:", obj);
				}
			}
		}, {
			key: "getTraceMsg",
			value: function getTraceMsg(msg) {
				var rst;
				rst = function rst() {
					console.log(msg);
				};
				return rst;
			}
		}, {
			key: "hookFuns",
			value: function hookFuns(obj, funName, funList) {
				var rstI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

				var _preFun = obj[funName];
				var newFun;
				newFun = function newFun() {
					var rst;
					var i;
					var len;
					len = funList.length;

					for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						args[_key2] = arguments[_key2];
					}

					for (i = 0; i < len; i++) {
						if (!funList[i]) continue;
						if (i == rstI) {
							rst = funList[i].apply(this, args);
						} else {
							funList[i].apply(this, args);
						}
					}
					return rst;
				};
				newFun["pre"] = _preFun;
				obj[funName] = newFun;
			}
		}, {
			key: "removeHook",
			value: function removeHook(obj, funName) {
				if (obj[funName].pre != null) {
					obj[funName] = obj[funName].pre;
				}
			}
		}, {
			key: "debugHere",
			value: function debugHere() {
				debugger;
			}
		}, {
			key: "traceLoc",
			value: function traceLoc() {
				var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

				console.log(msg, "fun loc:", TraceTool.getCallLoc(3 + level));
			}
		}, {
			key: "getLocFun",
			value: function getLocFun() {
				var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

				level += 1;
				var rst;
				rst = function rst() {
					FunHook.traceLoc(level, msg);
				};
				return rst;
			}
		}]);

		return FunHook;
	}();

	FunHook.special = {
		"length": true,
		"name": true,
		"arguments": true,
		"caller": true,
		"prototype": true,
		"is": true,
		"isExtensible": true,
		"isFrozen": true,
		"isSealed": true,
		"preventExtensions": true,
		"seal": true,
		"apply": true,
		"call": true,
		"bind": true,
		"freeze": true,
		"unobserve": true
	};

	var VarHook = function () {
		function VarHook() {
			_classCallCheck(this, VarHook);
		}

		_createClass(VarHook, null, [{
			key: "hookVar",
			value: function hookVar(obj, name) {
				var setHook = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var getHook = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				if (!setHook) setHook = [];
				if (!getHook) getHook = [];
				var preO = obj;
				var preValue = obj[name];
				var des;
				des = ClassTool.getOwnPropertyDescriptor(obj, name);
				var ndes = {};
				var mSet = function mSet(value) {
					console.log("var hook set " + name + ":", value);
					preValue = value;
				};
				var mGet = function mGet() {
					console.log("var hook get" + name + ":", preValue);
					return preValue;
				};
				if (des) {
					ndes.set = mSet;
					ndes.get = mGet;
					ndes.enumerable = des.enumerable;
					setHook.push(ndes.set);
					getHook.push(ndes.get);
					FunHook.hookFuns(ndes, "set", setHook);
					FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
					ClassTool.defineProperty(obj, name, ndes);
					return;
				}
				while (!des && obj["__proto__"]) {
					obj = obj["__proto__"];
					des = ClassTool.getOwnPropertyDescriptor(obj, name);
				}
				if (des) {
					ndes.set = des.set ? des.set : mSet;
					ndes.get = des.get ? des.get : mGet;
					ndes.enumerable = des.enumerable;
					setHook.push(ndes.set);
					getHook.push(ndes.get);
					FunHook.hookFuns(ndes, "set", setHook);
					FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
					ClassTool.defineProperty(preO, name, ndes);
				}
				if (!des) {
					console.log("get des fail add directly");
					ndes.set = mSet;
					ndes.get = mGet;
					setHook.push(ndes.set);
					getHook.push(ndes.get);
					FunHook.hookFuns(ndes, "set", setHook);
					FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
					ClassTool.defineProperty(obj, name, ndes);
				}
			}
		}, {
			key: "getLocFun",
			value: function getLocFun() {
				var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
				var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				level += 1;
				var rst;
				rst = function rst() {
					FunHook.traceLoc(level, msg);
				};
				return rst;
			}
		}]);

		return VarHook;
	}();

	var Watcher = function () {
		function Watcher() {
			_classCallCheck(this, Watcher);
		}

		_createClass(Watcher, null, [{
			key: "watch",
			value: function watch(obj, name, funs) {
				VarHook.hookVar(obj, name, funs);
			}
		}, {
			key: "traceChange",
			value: function traceChange(obj, name) {
				var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "var changed:";

				VarHook.hookVar(obj, name, [Watcher.getTraceValueFun(name), VarHook.getLocFun(sign)]);
			}
		}, {
			key: "debugChange",
			value: function debugChange(obj, name) {
				VarHook.hookVar(obj, name, [VarHook.getLocFun("debug loc"), FunHook.debugHere]);
			}
		}, {
			key: "differChange",
			value: function differChange(obj, name, sign) {
				var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

				VarHook.hookVar(obj, name, [Watcher.getDifferFun(obj, name, sign, msg)]);
			}
		}, {
			key: "getDifferFun",
			value: function getDifferFun(obj, name, sign) {
				var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

				var rst;
				rst = function rst() {
					DifferTool.differ(sign, obj[name], msg);
				};
				return rst;
			}
		}, {
			key: "traceValue",
			value: function traceValue(value) {
				console.log("value:", value);
			}
		}, {
			key: "getTraceValueFun",
			value: function getTraceValueFun(name) {
				var rst;
				rst = function rst(value) {
					console.log("set " + name + " :", value);
				};
				return rst;
			}
		}]);

		return Watcher;
	}();

	var DebugTool = function () {
		function DebugTool() {
			_classCallCheck(this, DebugTool);
		}

		_createClass(DebugTool, null, [{
			key: "getMenuShowEvent",
			value: function getMenuShowEvent() {
				if (Laya.Browser.onMobile) {
					return Laya.Event.DOUBLE_CLICK;
				} else {
					return Laya.Event.RIGHT_CLICK;
				}
			}
		}, {
			key: "initBasicFunctions",
			value: function initBasicFunctions() {
				if (!DebugTool.debugLayer) {
					DebugInfoLayer.init();
					DebugTool.debugLayer = DebugInfoLayer.I.graphicLayer;
					DebugTool.debugLayer.mouseEnabled = false;
					DebugTool.debugLayer.mouseThrough = true;
					DebugTool.showStatu = true;
					Laya.Laya.stage.on(Laya.Event.KEY_DOWN, null, DebugTool.keyHandler);
					DebugTool.export();
				}
			}
		}, {
			key: "dTrace",
			value: function dTrace(str) {
				if (DebugTool._traceFun != null) {
					DebugTool._traceFun(str);
				}
				console.log(str);
			}
		}, {
			key: "keyHandler",
			value: function keyHandler(e) {
				var key;
				key = String.fromCharCode(e.keyCode);
				if (!e.altKey) return;
				switch (e.keyCode) {
					case 38:
						DebugTool.showParent();
						break;
					case 40:
						DebugTool.showChild();
						break;
					case 37:
						DebugTool.showBrother(DebugTool.target, 1);
						break;
					case 39:
						DebugTool.showBrother(DebugTool.target, -1);
						break;
				}
				DebugTool.dealCMDKey(key);
			}
		}, {
			key: "dealCMDKey",
			value: function dealCMDKey(key) {
				switch (key) {
					case "上":
						DebugTool.showParent();
						break;
					case "下":
						DebugTool.showChild();
						break;
					case "左":
						DebugTool.showBrother(DebugTool.target, 1);
						break;
					case "右":
						DebugTool.showBrother(DebugTool.target, -1);
						break;
					case "B":
						DebugTool.showAllBrother();
						break;
					case "C":
						DebugTool.showAllChild();
						break;
					case "E":
						DebugTool.traceDisMouseEnable();
						break;
					case "S":
						DebugTool.traceDisSizeChain();
						break;
					case "D":
						DisControlTool.downDis(DebugTool.target);
						break;
					case "U":
						DisControlTool.upDis(DebugTool.target);
						break;
					case "N":
						DebugTool.getNodeInfo();
						break;
					case "M":
						DebugTool.showAllUnderMosue();
						break;
					case "I":
						break;
					case "O":
						break;
					case "L":
						DisController.I.switchType();
						break;
					case "Q":
						DebugTool.showNodeInfo();
						break;
					case "F":
						DebugTool.showToolPanel();
						break;
					case "P":
						DebugTool.showToolFilter();
						break;
					case "V":
						DebugTool.selectNodeUnderMouse();
						break;
					case "A":
						break;
					case "K":
						NodeUtils.traceStage();
						break;
					case "T":
						DebugTool.switchNodeTree();
						break;
					case "R":
						break;
					case "X":
						break;
					case "mCMD":
						DebugTool.traceCMD();
						break;
					case "allCMD":
						DebugTool.traceCMDR();
						break;
				}
			}
		}, {
			key: "switchNodeTree",
			value: function switchNodeTree() {}
		}, {
			key: "selectNodeUnderMouse",
			value: function selectNodeUnderMouse() {
				DebugTool.showDisBound();
				return;
			}
		}, {
			key: "showToolPanel",
			value: function showToolPanel() {}
		}, {
			key: "showToolFilter",
			value: function showToolFilter() {}
		}, {
			key: "showNodeInfo",
			value: function showNodeInfo() {
				if (NodeInfoPanel.I.isWorkState) {
					NodeInfoPanel.I.recoverNodes();
				} else {
					NodeInfoPanel.I.showDisInfo(DebugTool.target);
				}
			}
		}, {
			key: "switchDisController",
			value: function switchDisController() {
				if (DisController.I.target) {
					DisController.I.target = null;
				} else {
					if (DebugTool.target) {
						DisController.I.target = DebugTool.target;
					}
				}
			}
		}, {
			key: "showParent",
			value: function showParent() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return null;
				}
				DebugTool.target = sprite.parent;
				DebugTool.autoWork();
			}
		}, {
			key: "showChild",
			value: function showChild() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return null;
				}
				if (sprite.numChildren > 0) {
					DebugTool.target = sprite.getChildAt(0);
					DebugTool.autoWork();
				}
			}
		}, {
			key: "showAllChild",
			value: function showAllChild() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return null;
				}
				DebugTool.selectedNodes = DisControlTool.getAllChild(sprite);
				DebugTool.showSelected();
			}
		}, {
			key: "showAllUnderMosue",
			value: function showAllUnderMosue() {
				DebugTool.selectedNodes = DisControlTool.getObjectsUnderGlobalPoint(Laya.Laya.stage);
				DebugTool.showSelected();
			}
		}, {
			key: "showParentChain",
			value: function showParentChain() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!sprite) return;
				DebugTool.selectedNodes = [];
				var tar;
				tar = sprite.parent;
				while (tar) {
					DebugTool.selectedNodes.push(tar);
					tar = tar.parent;
				}
				DebugTool.showSelected();
			}
		}, {
			key: "showAllBrother",
			value: function showAllBrother() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return null;
				}
				if (!sprite.parent) return;
				DebugTool.selectedNodes = DisControlTool.getAllChild(sprite.parent);
				DebugTool.showSelected();
			}
		}, {
			key: "showBrother",
			value: function showBrother(sprite) {
				var dID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return null;
				}
				var p;
				p = sprite.parent;
				if (!p) return;
				var n;
				n = p.getChildIndex(sprite);
				n += dID;
				if (n < 0) n += p.numChildren;
				if (n >= p.numChildren) n -= p.numChildren;
				DebugTool.target = p.getChildAt(n);
				DebugTool.autoWork();
			}
		}, {
			key: "clearDebugLayer",
			value: function clearDebugLayer() {
				if (DebugTool.debugLayer.graphics) DebugTool.debugLayer.graphics.clear();
			}
		}, {
			key: "showSelected",
			value: function showSelected() {
				if (!DebugTool.autoShowSelected) return;
				if (!DebugTool.selectedNodes || DebugTool.selectedNodes.length < 1) return;
				console.log("selected:", DebugTool.selectedNodes);
				var i;
				var len;
				len = DebugTool.selectedNodes.length;
				DebugTool.clearDebugLayer();
				for (i = 0; i < len; i++) {
					DebugTool.showDisBound(DebugTool.selectedNodes[i], false);
				}
			}
		}, {
			key: "getClassCreateInfo",
			value: function getClassCreateInfo(className) {
				return RunProfile.getRunInfo(className);
			}
		}, {
			key: "autoWork",
			value: function autoWork() {
				if (!DebugTool.isThisShow) return;
				if (DebugTool.showBound) DebugTool.showDisBound();
				if (DebugTool.autoTraceSpriteInfo && DebugTool.target) {
					TraceTool.traceSpriteInfo(DebugTool.target, DebugTool.autoTraceBounds, DebugTool.autoTraceSize, DebugTool.autoTraceTree);
				}
				if (!DebugTool.target) return;
				if (DebugTool.autoTraceCMD) {
					DebugTool.traceCMD();
				}
				if (DebugTool.autoTraceCMDR) {
					DebugTool.traceCMDR();
				}
				if (DebugTool.autoTraceEnable) {
					DebugTool.traceDisMouseEnable(DebugTool.target);
				}
			}
		}, {
			key: "traceDisMouseEnable",
			value: function traceDisMouseEnable() {
				var tar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				console.log("----------------traceDisMouseEnable--------------------");
				if (!tar) tar = DebugTool.target;
				if (!tar) {
					console.log("no targetAvalible");
					return null;
				}
				var strArr;
				strArr = [];
				DebugTool.selectedNodes = [];
				while (tar) {
					strArr.push(ClassTool.getNodeClassAndName(tar) + ": mouseEnabled:" + tar.mouseEnabled + " hitFirst:" + tar.hitTestPrior);
					DebugTool.selectedNodes.push(tar);
					tar = tar.parent;
				}
				console.log(strArr.join("\n"));
				DebugTool.showSelected();
				return strArr.join("\n");
			}
		}, {
			key: "traceDisSizeChain",
			value: function traceDisSizeChain() {
				var tar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				console.log("---------------------traceDisSizeChain-------------------");
				if (!tar) tar = DebugTool.target;
				if (!tar) {
					console.log("no targetAvalible");
					return null;
				}
				DebugTool.selectedNodes = [];
				var strArr;
				strArr = [];
				while (tar) {
					strArr.push(ClassTool.getNodeClassAndName(tar) + ": x:" + tar.x + " y:" + tar.y + " w:" + tar.width + " h:" + tar.height + " scaleX:" + tar.scaleX + " scaleY:" + tar.scaleY);
					DebugTool.selectedNodes.push(tar);
					tar = tar.parent;
				}
				console.log(strArr.join("\n"));
				DebugTool.showSelected();
				return strArr.join("\n");
			}
		}, {
			key: "showDisBound",
			value: function showDisBound() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var clearPre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#ff0000";

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return null;
				}
				if (clearPre) DebugTool.clearDebugLayer();
				var pointList;
				pointList = sprite._getBoundPointsM(true);
				if (!pointList || pointList.length < 1) return;
				pointList = Laya.GrahamScan.pListToPointList(pointList, true);
				WalkTools.walkArr(pointList, sprite.localToGlobal, sprite);
				pointList = Laya.GrahamScan.pointListToPlist(pointList);
				DebugTool._disBoundRec = Laya.Rectangle._getWrapRec(pointList, DebugTool._disBoundRec);
				DebugTool.debugLayer.graphics.drawRect(DebugTool._disBoundRec.x, DebugTool._disBoundRec.y, DebugTool._disBoundRec.width, DebugTool._disBoundRec.height, null, color);
				DebugInfoLayer.I.setTop();
			}
		}, {
			key: "showDisBoundToSprite",
			value: function showDisBoundToSprite() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var graphicSprite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#ff0000";
				var lineWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

				var pointList;
				pointList = sprite._getBoundPointsM(true);
				if (!pointList || pointList.length < 1) return;
				pointList = Laya.GrahamScan.pListToPointList(pointList, true);
				WalkTools.walkArr(pointList, sprite.localToGlobal, sprite);
				pointList = Laya.GrahamScan.pointListToPlist(pointList);
				DebugTool._disBoundRec = Laya.Rectangle._getWrapRec(pointList, DebugTool._disBoundRec);
				graphicSprite.graphics.drawRect(DebugTool._disBoundRec.x, DebugTool._disBoundRec.y, DebugTool._disBoundRec.width, DebugTool._disBoundRec.height, null, color, lineWidth);
			}
		}, {
			key: "getNodeInfo",
			value: function getNodeInfo() {
				DebugTool.counter.reset();
				WalkTools.walkTarget(Laya.Laya.stage, DebugTool.addNodeInfo);
				console.log("node info:");
				DebugTool.counter.traceSelf();
				return DebugTool.counter.data;
			}
		}, {
			key: "findByClass",
			value: function findByClass(className) {
				DebugTool._classList = [];
				DebugTool._tFindClass = className;
				WalkTools.walkTarget(Laya.Laya.stage, DebugTool.addClassNode);
				DebugTool.selectedNodes = DebugTool._classList;
				DebugTool.showSelected();
				return DebugTool._classList;
			}
		}, {
			key: "addClassNode",
			value: function addClassNode(node) {
				var type;
				type = node["constructor"].name;
				if (type == DebugTool._tFindClass) {
					DebugTool._classList.push(node);
				}
			}
		}, {
			key: "traceCMD",
			value: function traceCMD() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return null;
				}
				console.log("self CMDs:");
				console.log(sprite.graphics.cmds);
				var renderSprite;
				renderSprite = Laya.RenderSprite.renders[sprite._renderType];
				console.log("renderSprite:", renderSprite);
				DebugTool._rSpList.length = 0;
				while (renderSprite && renderSprite["_sign"] > 0) {
					DebugTool._rSpList.push(DebugTool.cmdToTypeO[renderSprite["_sign"]]);
					renderSprite = renderSprite._next;
				}
				console.log("fun:", DebugTool._rSpList.join(","));
				DebugTool.counter.reset();
				DebugTool.addCMDs(sprite.graphics.cmds);
				DebugTool.counter.traceSelf();
				return DebugTool.counter.data;
			}
		}, {
			key: "addCMDs",
			value: function addCMDs(cmds) {
				WalkTools.walkArr(cmds, DebugTool.addCMD);
			}
		}, {
			key: "addCMD",
			value: function addCMD(cmd) {
				DebugTool.counter.add(cmd.callee);
			}
		}, {
			key: "traceCMDR",
			value: function traceCMDR() {
				var sprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				if (!sprite) sprite = DebugTool.target;
				if (!sprite) {
					console.log("no targetAvalible");
					return 0;
				}
				DebugTool.counter.reset();
				WalkTools.walkTarget(sprite, DebugTool.getCMdCount);
				console.log("cmds include children");
				DebugTool.counter.traceSelf();
				return DebugTool.counter.data;
			}
		}, {
			key: "getCMdCount",
			value: function getCMdCount(target) {
				if (!target) return 0;
				if (!(target instanceof Laya.Sprite)) return 0;
				if (!target.graphics.cmds) return 0;
				DebugTool.addCMDs(target.graphics.cmds);
				var rst = target.graphics.cmds.length;
				return rst;
			}
		}, {
			key: "addNodeInfo",
			value: function addNodeInfo(node) {
				var type;
				type = node["constructor"].name;
				DebugTool.counter.add(type);
			}
		}, {
			key: "find",
			value: function find(filter) {
				var ifShowSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				var rst;
				rst = DebugTool.findTarget(Laya.Laya.stage, filter);
				DebugTool.selectedNodes = rst;
				if (DebugTool.selectedNodes) {
					DebugTool.target = DebugTool.selectedNodes[0];
				}
				if (ifShowSelected) DebugTool.showSelected();
				return rst;
			}
		}, {
			key: "findByName",
			value: function findByName(name) {
				DebugTool.nameFilter.name = name;
				return DebugTool.find(DebugTool.nameFilter);
			}
		}, {
			key: "findNameStartWith",
			value: function findNameStartWith(startStr) {
				DebugTool.nameFilter.name = DebugTool.getStartWithFun(startStr);
				return DebugTool.find(DebugTool.nameFilter);
			}
		}, {
			key: "findNameHas",
			value: function findNameHas(hasStr) {
				var showSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				DebugTool.nameFilter.name = DebugTool.getHasFun(hasStr);
				return DebugTool.find(DebugTool.nameFilter, showSelected);
			}
		}, {
			key: "getStartWithFun",
			value: function getStartWithFun(startStr) {
				var rst = function rst(str) {
					if (!str) return false;
					if (str.indexOf(startStr) == 0) return true;
					return false;
				};
				return rst;
			}
		}, {
			key: "getHasFun",
			value: function getHasFun(hasStr) {
				var rst = function rst(str) {
					if (!str) return false;
					if (str.indexOf(hasStr) >= 0) return true;
					return false;
				};
				return rst;
			}
		}, {
			key: "findTarget",
			value: function findTarget(target, filter) {
				var rst = [];
				if (DebugTool.isFit(target, filter)) rst.push(target);
				var i;
				var len;
				var tChild;
				len = target.numChildren;
				for (i = 0; i < len; i++) {
					tChild = target.getChildAt(i);
					if (tChild instanceof Laya.Sprite) {
						rst = rst.concat(DebugTool.findTarget(tChild, filter));
					}
				}
				return rst;
			}
		}, {
			key: "findClassHas",
			value: function findClassHas(target, str) {
				var rst = [];
				if (ClassTool.getClassName(target).indexOf(str) >= 0) rst.push(target);
				var i;
				var len;
				var tChild;
				len = target.numChildren;
				for (i = 0; i < len; i++) {
					tChild = target.getChildAt(i);
					if (tChild instanceof Laya.Sprite) {
						rst = rst.concat(DebugTool.findClassHas(tChild, str));
					}
				}
				return rst;
			}
		}, {
			key: "isFit",
			value: function isFit(tar, filter) {
				if (!tar) return false;
				if (!filter) return true;
				if (filter instanceof Function) {
					return filter(tar);
				}
				var key;
				for (key in filter) {
					if (filter[key] instanceof Function) {
						if (!filter[key](tar[key])) return false;
					} else {
						if (tar[key] != filter[key]) return false;
					}
				}
				return true;
			}
		}, {
			key: "log",
			value: function log() {
				var arr;

				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				arr = DTrace.getArgArr(args);
				if (DebugTool._logFun != null) {
					DebugTool._logFun(arr.join(" "));
				}
			}
		}, {
			key: "export",
			value: function _export() {
				var _window;
				_window = window;
				var key;
				for (key in DebugTool._exportsDic) {
					_window[key] = DebugTool._exportsDic[key];
				}
			}
		}, {
			key: "isThisShow",
			get: function get() {
				return false;
			}
		}, {
			key: "showStatu",
			set: function set(value) {
				if (value) {
					Laya.Stat.show();
				} else {
					Laya.Stat.hide();
					DebugTool.clearDebugLayer();
				}
			}
		}, {
			key: "target",
			set: function set(v) {
				DebugTool._target = v;
			},
			get: function get() {
				return DebugTool._target;
			}
		}, {
			key: "showBound",
			set: function set(value) {
				DebugTool._showBound = value;
				if (!DebugTool._showBound) {
					DebugTool.clearDebugLayer();
				}
			},
			get: function get() {
				return DebugTool._showBound;
			}
		}]);

		return DebugTool;
	}();

	DebugTool.enableCacheAnalyse = false;
	DebugTool.enableNodeCreateAnalyse = true;
	DebugTool.text = new Laya.Stat();
	DebugTool.selectedNodes = [];
	DebugTool.autoShowSelected = true;
	DebugTool._showBound = true;
	DebugTool.autoTraceEnable = false;
	DebugTool.autoTraceBounds = false;
	DebugTool.autoTraceSize = false;
	DebugTool.autoTraceTree = true;
	DebugTool.autoTraceCMD = true;
	DebugTool.autoTraceCMDR = false;
	DebugTool.autoTraceSpriteInfo = true;
	DebugTool.cmdToTypeO = {};
	DebugTool._rSpList = [];
	DebugTool.counter = new CountTool();
	DebugTool.nameFilter = { "name": "name" };
	DebugTool._exportsDic = {
		"DebugTool": DebugTool,
		"Watcher": Watcher
	};
	TraceTool._debugtrace = DebugTool.dTrace;

	var ByteEx = function () {
		function ByteEx() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			_classCallCheck(this, ByteEx);

			this._xd_ = true;
			this._allocated_ = 8;
			this._pos_ = 0;
			this._length = 0;
			if (data) {
				this._u8d_ = new Uint8Array(data);
				this._d_ = new DataView(this._u8d_.buffer);
				this._length = this._d_.byteLength;
			} else {
				this._resizeBuffer(this._allocated_);
			}
		}

		_createClass(ByteEx, [{
			key: "_resizeBuffer",
			value: function _resizeBuffer(len) {
				try {
					var newByteView = new Uint8Array(len);
					if (this._u8d_ != null) {
						if (this._u8d_.length <= len) newByteView.set(this._u8d_);else newByteView.set(this._u8d_.subarray(0, len));
					}
					this._u8d_ = newByteView;
					this._d_ = new DataView(newByteView.buffer);
				} catch (err) {
					throw "Invalid typed array length:" + len;
				}
			}
		}, {
			key: "getString",
			value: function getString() {
				return this.readString();
			}
		}, {
			key: "readString",
			value: function readString() {
				return this._rUTF(this.getUint16());
			}
		}, {
			key: "getFloat32Array",
			value: function getFloat32Array(start, len) {
				return this.readFloat32Array(start, len);
			}
		}, {
			key: "readFloat32Array",
			value: function readFloat32Array(start, len) {
				var end = start + len;
				end = end > this._length ? this._length : end;
				var v = new Float32Array(this._d_.buffer.slice(start, end));
				this._pos_ = end;
				return v;
			}
		}, {
			key: "getUint8Array",
			value: function getUint8Array(start, len) {
				return this.readUint8Array(start, len);
			}
		}, {
			key: "readUint8Array",
			value: function readUint8Array(start, len) {
				var end = start + len;
				end = end > this._length ? this._length : end;
				var v = new Uint8Array(this._d_.buffer.slice(start, end));
				this._pos_ = end;
				return v;
			}
		}, {
			key: "getInt16Array",
			value: function getInt16Array(start, len) {
				return this.readInt16Array(start, len);
			}
		}, {
			key: "readInt16Array",
			value: function readInt16Array(start, len) {
				var end = start + len;
				end = end > this._length ? this._length : end;
				var v = new Int16Array(this._d_.buffer.slice(start, end));
				this._pos_ = end;
				return v;
			}
		}, {
			key: "getFloat32",
			value: function getFloat32() {
				return this.readFloat32();
			}
		}, {
			key: "readFloat32",
			value: function readFloat32() {
				if (this._pos_ + 4 > this._length) throw "getFloat32 error - Out of bounds";
				var v = this._d_.getFloat32(this._pos_, this._xd_);
				this._pos_ += 4;
				return v;
			}
		}, {
			key: "getFloat64",
			value: function getFloat64() {
				return this.readFloat64();
			}
		}, {
			key: "readFloat64",
			value: function readFloat64() {
				if (this._pos_ + 8 > this._length) throw "getFloat64 error - Out of bounds";
				var v = this._d_.getFloat64(this._pos_, this._xd_);
				this._pos_ += 8;
				return v;
			}
		}, {
			key: "writeFloat32",
			value: function writeFloat32(value) {
				this._ensureWrite(this._pos_ + 4);
				this._d_.setFloat32(this._pos_, value, this._xd_);
				this._pos_ += 4;
			}
		}, {
			key: "writeFloat64",
			value: function writeFloat64(value) {
				this._ensureWrite(this._pos_ + 8);
				this._d_.setFloat64(this._pos_, value, this._xd_);
				this._pos_ += 8;
			}
		}, {
			key: "getInt32",
			value: function getInt32() {
				return this.readInt32();
			}
		}, {
			key: "readInt32",
			value: function readInt32() {
				if (this._pos_ + 4 > this._length) throw "getInt32 error - Out of bounds";
				var float = this._d_.getInt32(this._pos_, this._xd_);
				this._pos_ += 4;
				return float;
			}
		}, {
			key: "getUint32",
			value: function getUint32() {
				return this.readUint32();
			}
		}, {
			key: "readUint32",
			value: function readUint32() {
				if (this._pos_ + 4 > this._length) throw "getUint32 error - Out of bounds";
				var v = this._d_.getUint32(this._pos_, this._xd_);
				this._pos_ += 4;
				return v;
			}
		}, {
			key: "writeInt32",
			value: function writeInt32(value) {
				this._ensureWrite(this._pos_ + 4);
				this._d_.setInt32(this._pos_, value, this._xd_);
				this._pos_ += 4;
			}
		}, {
			key: "writeUint32",
			value: function writeUint32(value) {
				this._ensureWrite(this._pos_ + 4);
				this._d_.setUint32(this._pos_, value, this._xd_);
				this._pos_ += 4;
			}
		}, {
			key: "getInt16",
			value: function getInt16() {
				return this.readInt16();
			}
		}, {
			key: "readInt16",
			value: function readInt16() {
				if (this._pos_ + 2 > this._length) throw "getInt16 error - Out of bounds";
				var us = this._d_.getInt16(this._pos_, this._xd_);
				this._pos_ += 2;
				return us;
			}
		}, {
			key: "getUint16",
			value: function getUint16() {
				return this.readUint16();
			}
		}, {
			key: "readUint16",
			value: function readUint16() {
				if (this._pos_ + 2 > this._length) throw "getUint16 error - Out of bounds";
				var us = this._d_.getUint16(this._pos_, this._xd_);
				this._pos_ += 2;
				return us;
			}
		}, {
			key: "writeUint16",
			value: function writeUint16(value) {
				this._ensureWrite(this._pos_ + 2);
				this._d_.setUint16(this._pos_, value, this._xd_);
				this._pos_ += 2;
			}
		}, {
			key: "writeInt16",
			value: function writeInt16(value) {
				this._ensureWrite(this._pos_ + 2);
				this._d_.setInt16(this._pos_, value, this._xd_);
				this._pos_ += 2;
			}
		}, {
			key: "getUint8",
			value: function getUint8() {
				return this.readUint8();
			}
		}, {
			key: "readUint8",
			value: function readUint8() {
				if (this._pos_ + 1 > this._length) throw "getUint8 error - Out of bounds";
				return this._d_.getUint8(this._pos_++);
			}
		}, {
			key: "writeUint8",
			value: function writeUint8(value) {
				this._ensureWrite(this._pos_ + 1);
				this._d_.setUint8(this._pos_, value);
				this._pos_++;
			}
		}, {
			key: "_getUInt8",
			value: function _getUInt8(pos) {
				return this._readUInt8(pos);
			}
		}, {
			key: "_readUInt8",
			value: function _readUInt8(pos) {
				return this._d_.getUint8(pos);
			}
		}, {
			key: "_getUint16",
			value: function _getUint16(pos) {
				return this._readUint16(pos);
			}
		}, {
			key: "_readUint16",
			value: function _readUint16(pos) {
				return this._d_.getUint16(pos, this._xd_);
			}
		}, {
			key: "_getMatrix",
			value: function _getMatrix() {
				return this._readMatrix();
			}
		}, {
			key: "_readMatrix",
			value: function _readMatrix() {
				var rst = new Laya.Matrix(this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32());
				return rst;
			}
		}, {
			key: "_rUTF",
			value: function _rUTF(len) {
				var v = "",
				    max = this._pos_ + len,
				    c,
				    c2,
				    c3,
				    f = String.fromCharCode;
				var u = this._u8d_;
				while (this._pos_ < max) {
					c = u[this._pos_++];
					if (c < 0x80) {
						if (c != 0) v += f(c);
					} else if (c < 0xE0) {
						v += f((c & 0x3F) << 6 | u[this._pos_++] & 0x7F);
					} else if (c < 0xF0) {
						c2 = u[this._pos_++];
						v += f((c & 0x1F) << 12 | (c2 & 0x7F) << 6 | u[this._pos_++] & 0x7F);
					} else {
						c2 = u[this._pos_++];
						c3 = u[this._pos_++];
						v += f((c & 0x0F) << 18 | (c2 & 0x7F) << 12 | c3 << 6 & 0x7F | u[this._pos_++] & 0x7F);
					}
				}
				return v;
			}
		}, {
			key: "getCustomString",
			value: function getCustomString(len) {
				return this.readCustomString(len);
			}
		}, {
			key: "readCustomString",
			value: function readCustomString(len) {
				var v = "",
				    ulen = 0,
				    c,
				    c2,
				    f = String.fromCharCode;
				var u = this._u8d_;
				while (len > 0) {
					c = u[this._pos_];
					if (c < 0x80) {
						v += f(c);
						this._pos_++;
						len--;
					} else {
						ulen = c - 0x80;
						this._pos_++;
						len -= ulen;
						while (ulen > 0) {
							c = u[this._pos_++];
							c2 = u[this._pos_++];
							v += f(c2 << 8 | c);
							ulen--;
						}
					}
				}
				return v;
			}
		}, {
			key: "clear",
			value: function clear() {
				this._pos_ = 0;
				this.length = 0;
			}
		}, {
			key: "__getBuffer",
			value: function __getBuffer() {
				return this._d_.buffer;
			}
		}, {
			key: "writeUTFBytes",
			value: function writeUTFBytes(value) {
				value = value + "";
				for (var i = 0, sz = value.length; i < sz; i++) {
					var c = value.charCodeAt(i);
					if (c <= 0x7F) {
						this.writeByte(c);
					} else if (c <= 0x7FF) {
						this._ensureWrite(this._pos_ + 2);
						this._u8d_.set([0xC0 | c >> 6, 0x80 | c & 0x3F], this._pos_);
						this._pos_ += 2;
					} else if (c <= 0xFFFF) {
						this._ensureWrite(this._pos_ + 3);
						this._u8d_.set([0xE0 | c >> 12, 0x80 | c >> 6 & 0x3F, 0x80 | c & 0x3F], this._pos_);
						this._pos_ += 3;
					} else {
						this._ensureWrite(this._pos_ + 4);
						this._u8d_.set([0xF0 | c >> 18, 0x80 | c >> 12 & 0x3F, 0x80 | c >> 6 & 0x3F, 0x80 | c & 0x3F], this._pos_);
						this._pos_ += 4;
					}
				}
			}
		}, {
			key: "writeUTFString",
			value: function writeUTFString(value) {
				var tPos = this.pos;
				this.writeUint16(1);
				this.writeUTFBytes(value);
				var dPos = this.pos - tPos - 2;
				this._d_.setUint16(tPos, dPos, this._xd_);
			}
		}, {
			key: "readUTFString",
			value: function readUTFString() {
				return this.readUTFBytes(this.getUint16());
			}
		}, {
			key: "getUTFString",
			value: function getUTFString() {
				return this.readUTFString();
			}
		}, {
			key: "readUTFBytes",
			value: function readUTFBytes() {
				var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

				if (len === 0) return "";
				var lastBytes = this.bytesAvailable;
				if (len > lastBytes) throw "readUTFBytes error - Out of bounds";
				len = len > 0 ? len : lastBytes;
				return this._rUTF(len);
			}
		}, {
			key: "getUTFBytes",
			value: function getUTFBytes() {
				var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

				return this.readUTFBytes(len);
			}
		}, {
			key: "writeByte",
			value: function writeByte(value) {
				this._ensureWrite(this._pos_ + 1);
				this._d_.setInt8(this._pos_, value);
				this._pos_ += 1;
			}
		}, {
			key: "readByte",
			value: function readByte() {
				if (this._pos_ + 1 > this._length) throw "readByte error - Out of bounds";
				return this._d_.getInt8(this._pos_++);
			}
		}, {
			key: "getByte",
			value: function getByte() {
				return this.readByte();
			}
		}, {
			key: "_ensureWrite",
			value: function _ensureWrite(lengthToEnsure) {
				if (this._length < lengthToEnsure) this._length = lengthToEnsure;
				if (this._allocated_ < lengthToEnsure) this.length = lengthToEnsure;
			}
		}, {
			key: "writeArrayBuffer",
			value: function writeArrayBuffer(arraybuffer) {
				var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				if (offset < 0 || length < 0) throw "writeArrayBuffer error - Out of bounds";
				if (length == 0) length = arraybuffer.byteLength - offset;
				this._ensureWrite(this._pos_ + length);
				var uint8array = new Uint8Array(arraybuffer);
				this._u8d_.set(uint8array.subarray(offset, offset + length), this._pos_);
				this._pos_ += length;
			}
		}, {
			key: "buffer",
			get: function get() {
				var rstBuffer = this._d_.buffer;
				if (rstBuffer.byteLength === this._length) return rstBuffer;
				return rstBuffer.slice(0, this._length);
			}
		}, {
			key: "endian",
			get: function get() {
				return this._xd_ ? ByteEx.LITTLE_ENDIAN : ByteEx.BIG_ENDIAN;
			},
			set: function set(value) {
				this._xd_ = value === ByteEx.LITTLE_ENDIAN;
			}
		}, {
			key: "length",
			set: function set(value) {
				if (this._allocated_ < value) this._resizeBuffer(this._allocated_ = Math.floor(Math.max(value, this._allocated_ * 2)));else if (this._allocated_ > value) this._resizeBuffer(this._allocated_ = value);
				this._length = value;
			},
			get: function get() {
				return this._length;
			}
		}, {
			key: "pos",
			get: function get() {
				return this._pos_;
			},
			set: function set(value) {
				this._pos_ = value;
			}
		}, {
			key: "bytesAvailable",
			get: function get() {
				return this._length - this._pos_;
			}
		}], [{
			key: "getSystemEndian",
			value: function getSystemEndian() {
				if (!ByteEx._sysEndian) {
					var buffer = new ArrayBuffer(2);
					new DataView(buffer).setInt16(0, 256, true);
					ByteEx._sysEndian = new Int16Array(buffer)[0] === 256 ? ByteEx.LITTLE_ENDIAN : ByteEx.BIG_ENDIAN;
				}
				return ByteEx._sysEndian;
			}
		}]);

		return ByteEx;
	}();

	ByteEx.BIG_ENDIAN = "bigEndian";
	ByteEx.LITTLE_ENDIAN = "littleEndian";
	ByteEx._sysEndian = null;

	var Base64Tool = function () {
		function Base64Tool() {
			_classCallCheck(this, Base64Tool);
		}

		_createClass(Base64Tool, null, [{
			key: "init",
			value: function init() {
				if (Base64Tool.lookup) return;
				Base64Tool.lookup = new Uint8Array(256);
				for (var i = 0; i < Base64Tool.chars.length; i++) {
					Base64Tool.lookup[Base64Tool.chars.charCodeAt(i)] = i;
				}
			}
		}, {
			key: "encode",
			value: function encode(arraybuffer) {
				var bytes = new Uint8Array(arraybuffer),
				    i,
				    len = bytes["length"],
				    base64 = "";
				for (i = 0; i < len; i += 3) {
					base64 += Base64Tool.chars[bytes[i] >> 2];
					base64 += Base64Tool.chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
					base64 += Base64Tool.chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
					base64 += Base64Tool.chars[bytes[i + 2] & 63];
				}
				if (len % 3 === 2) {
					base64 = base64.substring(0, base64.length - 1) + "=";
				} else if (len % 3 === 1) {
					base64 = base64.substring(0, base64.length - 2) + "==";
				}
				return base64;
			}
		}, {
			key: "encodeStr",
			value: function encodeStr(str) {
				var byte;
				byte = new ByteEx();
				byte.writeUTFString(str);
				return Base64Tool.encodeByte(byte);
			}
		}, {
			key: "encodeStr2",
			value: function encodeStr2(str) {
				var byte;
				byte = new ByteEx();
				byte.writeUTFBytes(str);
				return Base64Tool.encodeByte(byte);
			}
		}, {
			key: "encodeByte",
			value: function encodeByte(byte) {
				var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

				if (end < 0) {
					end = byte.length;
				}
				return Base64Tool.encode(byte.buffer.slice(start, end));
			}
		}, {
			key: "decodeToByte",
			value: function decodeToByte(base64) {
				return new ByteEx(Base64Tool.decode(base64));
			}
		}, {
			key: "decode",
			value: function decode(base64) {
				Base64Tool.init();
				var bufferLength = base64.length * 0.75,
				    len = base64.length,
				    i,
				    p = 0,
				    encoded1,
				    encoded2,
				    encoded3,
				    encoded4;
				if (base64[base64.length - 1] === "=") {
					bufferLength--;
					if (base64[base64.length - 2] === "=") {
						bufferLength--;
					}
				}
				var arraybuffer = new ArrayBuffer(bufferLength),
				    bytes = new Uint8Array(arraybuffer);
				for (i = 0; i < len; i += 4) {
					encoded1 = Base64Tool.lookup[base64.charCodeAt(i)];
					encoded2 = Base64Tool.lookup[base64.charCodeAt(i + 1)];
					encoded3 = Base64Tool.lookup[base64.charCodeAt(i + 2)];
					encoded4 = Base64Tool.lookup[base64.charCodeAt(i + 3)];
					bytes[p++] = encoded1 << 2 | encoded2 >> 4;
					bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
					bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
				}
				return arraybuffer;
			}
		}]);

		return Base64Tool;
	}();

	Base64Tool.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	Base64Tool.lookup = null;

	var DivScripts = function () {
		function DivScripts() {
			_classCallCheck(this, DivScripts);
		}

		_createClass(DivScripts, null, [{
			key: "init",
			value: function init() {
				var script;
				script = Base64Tool.decodeToByte(DivScripts.data).readUTFBytes();
				window["eval"](script);
			}
		}]);

		return DivScripts;
	}();

	DivScripts.data = "ZnVuY3Rpb24gZGh0bWx4RXZlbnQoZSx0LGkpe2UuYWRkRXZlbnRMaXN0ZW5lcj9lLmFkZEV2ZW50TGlzdGVuZXIodCxpLCExKTplLmF0dGFjaEV2ZW50JiZlLmF0dGFjaEV2ZW50KCJvbiIrdCxpKX1mdW5jdGlvbiBkaHRtbFhUcmVlT2JqZWN0KGUsdCxpLG4pe2lmKGRodG1seEV2ZW50LmluaXRUb3VjaCYmZGh0bWx4RXZlbnQuaW5pdFRvdWNoKCksX2lzSUUpdHJ5e2RvY3VtZW50LmV4ZWNDb21tYW5kKCJCYWNrZ3JvdW5kSW1hZ2VDYWNoZSIsITEsITApfWNhdGNoKG8pe310aGlzLnBhcmVudE9iamVjdD0ib2JqZWN0IiE9dHlwZW9mIGU/ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZSk6ZSx0aGlzLnBhcmVudE9iamVjdC5zdHlsZS5vdmVyZmxvdz0iaGlkZGVuIix0aGlzLl9pdGltX2RnPSEwLHRoaXMuZGxtdHI9IiwiLHRoaXMuZHJvcExvd2VyPSExLHRoaXMuZW5hYmxlSUVJbWFnZUZpeCghMCksdGhpcy54bWxzdGF0ZT0wLHRoaXMubXl0eXBlPSJ0cmVlIix0aGlzLnNtY2hlY2s9ITAsdGhpcy53aWR0aD10LHRoaXMuaGVpZ2h0PWksdGhpcy5yb290SWQ9bix0aGlzLmNoaWxkQ2FsYz1udWxsLHRoaXMuZGVmX2ltZ194PSIxOHB4Iix0aGlzLmRlZl9pbWdfeT0iMThweCIsdGhpcy5kZWZfbGluZV9pbWdfeD0iMThweCIsdGhpcy5kZWZfbGluZV9pbWdfeT0iMjRweCIsdGhpcy5fZHJhZ2dlZD1uZXcgQXJyYXksdGhpcy5fc2VsZWN0ZWQ9bmV3IEFycmF5LHRoaXMuc3R5bGVfcG9pbnRlcj0icG9pbnRlciIsdGhpcy5fYWltZ3M9ITAsdGhpcy5odG1sY0E9IiBbIix0aGlzLmh0bWxjQj0iXSIsdGhpcy5sV2luPXdpbmRvdyx0aGlzLmNNZW51PTAsdGhpcy5tbGl0ZW1zPTAsdGhpcy5pY29uVVJMPSIiLHRoaXMuZGFkbW9kZT0wLHRoaXMuc2xvd1BhcnNlPSExLHRoaXMuYXV0b1Njcm9sbD0hMCx0aGlzLmhmTW9kZT0wLHRoaXMubm9kZUN1dD1uZXcgQXJyYXksdGhpcy5YTUxzb3VyY2U9MCx0aGlzLlhNTGxvYWRpbmdXYXJuaW5nPTAsdGhpcy5faWRwdWxsPXt9LHRoaXMuX3B1bGxTaXplPTAsdGhpcy50cmVlTGluZXNPbj0hMCx0aGlzLnRzY2hlY2s9ITEsdGhpcy50aW1nZW49ITAsdGhpcy5kcGNweT0hMSx0aGlzLl9sZF9pZD1udWxsLHRoaXMuX2R5bkRlbGV0ZUJyYW5jaGVzPXt9LHRoaXMuX29pZV9vblhMRT1bXSx0aGlzLmltUGF0aD13aW5kb3cuZGh4X2dsb2JhbEltZ1BhdGh8fCIiLHRoaXMuY2hlY2tBcnJheT1uZXcgQXJyYXkoImljb25VbmNoZWNrQWxsLmdpZiIsImljb25DaGVja0FsbC5naWYiLCJpY29uQ2hlY2tHcmF5LmdpZiIsImljb25VbmNoZWNrRGlzLmdpZiIsImljb25DaGVja0Rpcy5naWYiLCJpY29uQ2hlY2tEaXMuZ2lmIiksdGhpcy5yYWRpb0FycmF5PW5ldyBBcnJheSgicmFkaW9fb2ZmLmdpZiIsInJhZGlvX29uLmdpZiIsInJhZGlvX29uLmdpZiIsInJhZGlvX29mZi5naWYiLCJyYWRpb19vbi5naWYiLCJyYWRpb19vbi5naWYiKSx0aGlzLmxpbmVBcnJheT1uZXcgQXJyYXkoImxpbmUyLmdpZiIsImxpbmUzLmdpZiIsImxpbmU0LmdpZiIsYmxhbmtfYmFzZTY0LGJsYW5rX2Jhc2U2NCwibGluZTEuZ2lmIiksdGhpcy5taW51c0FycmF5PW5ldyBBcnJheSgibWludXMyLmdpZiIsIm1pbnVzMy5naWYiLCJtaW51czQuZ2lmIiwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRWdBWUFKRUNBTEd2clo2ZG5mVDA5QUFBQUNINUJBRUFBQUlBTEFBQUFBQVNBQmdBQUFJY2xJK3B5KzBQbzV5MFdoc0NEV0IzbUdYZnd3SG1oYWJxeXJaVEFRQTciLCJtaW51czUuZ2lmIiksdGhpcy5wbHVzQXJyYXk9bmV3IEFycmF5KCJwbHVzMi5naWYiLCJwbHVzMy5naWYiLCJwbHVzNC5naWYiLCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFZ0FZQUpFQ0FLR2duN0d2cmZUMDlBQUFBQ0g1QkFFQUFBSUFMQUFBQUFBU0FCZ0FBQUljbEkrcHkrMFBvNXkwVW5CRHlIc0NMUUZmT0U2ZGhhYnF5clpKQVFBNyIsInBsdXM1LmdpZiIpLHRoaXMuaW1hZ2VBcnJheT1uZXcgQXJyYXkoImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEVnQVNBS0VDQUplWGw3R3ZyZi8vLy8vLy95SDVCQUVLQUFJQUxBQUFBQUFTQUJJQUFBSXpsSStwQXUyOURBaTAxamlUWFJuTm0zVEhCNDVCYUoyZXVsQm94TENTL0s2d09OODBYcHQ2citCOUhrU2FJSVdFS1EwRkFEcz0iLCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFZ0FTQUtFQ0FKZVhsN0d2cmYvLy8vLy8veUg1QkFFS0FBSUFMQUFBQUFBU0FCSUFBQUl6bEkrcHl3Y1BtM21oV2drQ3NqQk92VmtpbUVsRzlabENCbFhkKzJYampMS2c1R3FvZVpYcXZzT1FYSy9palVaVEtWVUZBRHM9IiwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRWdBU0FLRUNBSmVYbDdHdnJmLy8vLy8vL3lINUJBRUtBQUlBTEFBQUFBQVNBQklBQUFJd2xJK3B5d2NQbTNtaFdna0NzakJPdlZraW1FbEc5WmxDdVlJWTZUWXMrNmJtSERPNGlnZmREM0dOaGhlVjBWUUFBRHM9IiksdGhpcy5jdXRJbWc9bmV3IEFycmF5KDAsMCwwKSx0aGlzLmN1dEltYWdlPSJidXRfY3V0LmdpZiIsZGh4NC5fZXZlbnRhYmxlKHRoaXMpLHRoaXMuaHRtbE5vZGU9bmV3IGRodG1sWFRyZWVJdGVtT2JqZWN0KHRoaXMucm9vdElkLCIiLDAsdGhpcyksdGhpcy5odG1sTm9kZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uc3R5bGUuZGlzcGxheT0ibm9uZSIsdGhpcy5odG1sTm9kZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jbGFzc05hbWU9ImhpZGRlblJvdyIsdGhpcy5hbGxUcmVlPXRoaXMuX2NyZWF0ZVNlbGYoKSx0aGlzLmFsbFRyZWUuYXBwZW5kQ2hpbGQodGhpcy5odG1sTm9kZS5odG1sTm9kZSksZGh0bWx4LiRjdXN0b21TY3JvbGwmJmRodG1seC5DdXN0b21TY3JvbGwuZW5hYmxlKHRoaXMpLF9pc0ZGJiYodGhpcy5hbGxUcmVlLmNoaWxkTm9kZXNbMF0ud2lkdGg9IjEwMCUiLHRoaXMuYWxsVHJlZS5jaGlsZE5vZGVzWzBdLnN0eWxlLm92ZXJmbG93PSJoaWRkZW4iKTt2YXIgcj10aGlzO2lmKHRoaXMuYWxsVHJlZS5vbnNlbGVjdHN0YXJ0PW5ldyBGdW5jdGlvbigicmV0dXJuIGZhbHNlOyIpLF9pc01hY09TJiYodGhpcy5hbGxUcmVlLm9uY29udGV4dG1lbnU9ZnVuY3Rpb24oZSl7cmV0dXJuIHIuX2RvQ29udENsaWNrKGV8fHdpbmRvdy5ldmVudCwhMCl9KSx0aGlzLmFsbFRyZWUub25tb3VzZWRvd249ZnVuY3Rpb24oZSl7cmV0dXJuIHIuX2RvQ29udENsaWNrKGV8fHdpbmRvdy5ldmVudCl9LHRoaXMuWE1MTG9hZGVyPXRoaXMuX3BhcnNlWE1MVHJlZSxfaXNJRSYmdGhpcy5wcmV2ZW50SUVDYXNoaW5nKCEwKSx0aGlzLnNlbGVjdGlvbkJhcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJESVYiKSx0aGlzLnNlbGVjdGlvbkJhci5jbGFzc05hbWU9InNlbGVjdGlvbkJhciIsdGhpcy5zZWxlY3Rpb25CYXIuaW5uZXJIVE1MPSImbmJzcDsiLHRoaXMuc2VsZWN0aW9uQmFyLnN0eWxlLmRpc3BsYXk9Im5vbmUiLHRoaXMuYWxsVHJlZS5hcHBlbmRDaGlsZCh0aGlzLnNlbGVjdGlvbkJhciksd2luZG93LmFkZEV2ZW50TGlzdGVuZXImJndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJ1bmxvYWQiLGZ1bmN0aW9uKCl7dHJ5e3IuZGVzdHJ1Y3RvcigpfWNhdGNoKGUpe319LCExKSx3aW5kb3cuYXR0YWNoRXZlbnQmJndpbmRvdy5hdHRhY2hFdmVudCgib251bmxvYWQiLGZ1bmN0aW9uKCl7dHJ5e3IuZGVzdHJ1Y3RvcigpfWNhdGNoKGUpe319KSx0aGlzLnNldEltYWdlc1BhdGg9dGhpcy5zZXRJbWFnZVBhdGgsdGhpcy5zZXRJY29uc1BhdGg9dGhpcy5zZXRJY29uUGF0aCx0aGlzLnNldFNraW4oIm1hdGVyaWFsIiksZGh0bWx4LmltYWdlX3BhdGgpe3ZhciBsPWRodG1seC5pbWFnZV9wYXRoLHM9dGhpcy5wYXJlbnRPYmplY3QuY2xhc3NOYW1lLm1hdGNoKC9kaHh0cmVlX2RoeF8oW2Etel9dKikvaSk7bnVsbCE9cyYmbnVsbCE9c1sxXSYmKGwrPSJkaHh0cmVlXyIrc1sxXSsiLyIpLHRoaXMuc2V0SW1hZ2VQYXRoKGwpfXJldHVybiB0aGlzfWZ1bmN0aW9uIGNPYmplY3QoKXtyZXR1cm4gdGhpc31mdW5jdGlvbiBkaHRtbFhUcmVlSXRlbU9iamVjdChlLHQsaSxuLG8scil7cmV0dXJuIHRoaXMuaHRtbE5vZGU9IiIsdGhpcy5hY29sb3I9IiIsdGhpcy5zY29sb3I9IiIsdGhpcy50cj0wLHRoaXMuY2hpbGRzQ291bnQ9MCx0aGlzLnRlbXBET01NPTAsdGhpcy50ZW1wRE9NVT0wLHRoaXMuZHJhZ1NwYW49MCx0aGlzLmRyYWdNb3ZlPTAsdGhpcy5zcGFuPTAsdGhpcy5jbG9zZWJsZT0xLHRoaXMuY2hpbGROb2Rlcz1uZXcgQXJyYXksdGhpcy51c2VyRGF0YT1uZXcgY09iamVjdCx0aGlzLmNoZWNrc3RhdGU9MCx0aGlzLnRyZWVOb2Q9bix0aGlzLmxhYmVsPXQsdGhpcy5wYXJlbnRPYmplY3Q9aSx0aGlzLmFjdGlvbkhhbmRsZXI9byx0aGlzLmltYWdlcz1uZXcgQXJyYXkobi5pbWFnZUFycmF5WzBdLG4uaW1hZ2VBcnJheVsxXSxuLmltYWdlQXJyYXlbMl0pLHRoaXMuaWQ9bi5fZ2xvYmFsSWRTdG9yYWdlQWRkKGUsdGhpcyksdGhpcy5odG1sTm9kZT10aGlzLnRyZWVOb2QuY2hlY2tCb3hPZmY/dGhpcy50cmVlTm9kLl9jcmVhdGVJdGVtKDEsdGhpcyxyKTp0aGlzLnRyZWVOb2QuX2NyZWF0ZUl0ZW0oMCx0aGlzLHIpLHRoaXMuaHRtbE5vZGUub2JqQmVsb25nPXRoaXMsdGhpc31mdW5jdGlvbiBqc29uUG9pbnRlcihlLHQpe3RoaXMuZD1lLHRoaXMuZHA9dH1mdW5jdGlvbiBkaHhfaW5pdF90cmVlcygpe2Zvcih2YXIgZT1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgiZGl2IiksdD0wO3Q8ZS5sZW5ndGg7dCsrKSJkaHRtbHhUcmVlIj09ZVt0XS5jbGFzc05hbWUmJmRodG1sWFRyZWVGcm9tSFRNTChlW3RdKX12YXIgYmxhbmtfYmFzZTY0PSJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFZ0FTQUlBQUFQLy8vLy8vL3lINUJBVVVBQUVBTEFBQUFBQVNBQklBQUFJUGpJK3B5KzBQbzV5MDJvdXozcHdYQURzPSI7InVuZGVmaW5lZCI9PXR5cGVvZiB3aW5kb3cuZGh4JiYod2luZG93LmRoeD13aW5kb3cuZGh4ND17dmVyc2lvbjoiNS4wIixza2luOm51bGwsbGFzdElkOjEsbmV3SWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sYXN0SWQrK30semltOntkYXRhOnt9LHN0ZXA6NSxmaXJzdDpmdW5jdGlvbigpe3JldHVybiAxMDB9LGxhc3Q6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmZpcnN0KCk7Zm9yKHZhciB0IGluIHRoaXMuZGF0YSllPU1hdGgubWF4KGUsdGhpcy5kYXRhW3RdKTtyZXR1cm4gZX0scmVzZXJ2ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5kYXRhW2VdPXRoaXMubGFzdCgpK3RoaXMuc3RlcCx0aGlzLmRhdGFbZV19LGNsZWFyOmZ1bmN0aW9uKGUpe251bGwhPXRoaXMuZGF0YVtlXSYmKHRoaXMuZGF0YVtlXT1udWxsLGRlbGV0ZSB0aGlzLmRhdGFbZV0pfX0sczJiOmZ1bmN0aW9uKGUpe3JldHVybiJzdHJpbmciPT10eXBlb2YgZSYmKGU9ZS50b0xvd2VyQ2FzZSgpKSwxPT1lfHwxPT1lfHwidHJ1ZSI9PWV8fCIxIj09ZXx8InllcyI9PWV8fCJ5Ij09ZXx8Im9uIj09ZX0sczJqOmZ1bmN0aW9uKHMpe3ZhciBvYmo9bnVsbDtkaHg0LnRlbXA9bnVsbDt0cnl7ZXZhbCgiZGh4NC50ZW1wPSIrcyl9Y2F0Y2goZSl7ZGh4NC50ZW1wPW51bGx9cmV0dXJuIG9iaj1kaHg0LnRlbXAsZGh4NC50ZW1wPW51bGwsb2JqfSxhYnNMZWZ0OmZ1bmN0aW9uKGUpe3JldHVybiJzdHJpbmciPT10eXBlb2YgZSYmKGU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZSkpLHRoaXMuZ2V0T2Zmc2V0KGUpLmxlZnR9LGFic1RvcDpmdW5jdGlvbihlKXtyZXR1cm4ic3RyaW5nIj09dHlwZW9mIGUmJihlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUpKSx0aGlzLmdldE9mZnNldChlKS50b3B9LF9hT2ZzOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0wLGk9MDtlOyl0Kz1wYXJzZUludChlLm9mZnNldFRvcCksaSs9cGFyc2VJbnQoZS5vZmZzZXRMZWZ0KSxlPWUub2Zmc2V0UGFyZW50O3JldHVybnt0b3A6dCxsZWZ0Oml9fSxfYU9mc1JlY3Q6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxpPWRvY3VtZW50LmJvZHksbj1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsbz13aW5kb3cucGFnZVlPZmZzZXR8fG4uc2Nyb2xsVG9wfHxpLnNjcm9sbFRvcCxyPXdpbmRvdy5wYWdlWE9mZnNldHx8bi5zY3JvbGxMZWZ0fHxpLnNjcm9sbExlZnQsbD1uLmNsaWVudFRvcHx8aS5jbGllbnRUb3B8fDAscz1uLmNsaWVudExlZnR8fGkuY2xpZW50TGVmdHx8MCxhPXQudG9wK28tbCxkPXQubGVmdCtyLXM7cmV0dXJue3RvcDpNYXRoLnJvdW5kKGEpLGxlZnQ6TWF0aC5yb3VuZChkKX19LGdldE9mZnNldDpmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3Q/dGhpcy5fYU9mc1JlY3QoZSk6dGhpcy5fYU9mcyhlKX0sX2lzT2JqOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lJiYib2JqZWN0Ij09dHlwZW9mIGUmJiJ1bmRlZmluZWQiPT10eXBlb2YgZS5sZW5ndGh9LF9jb3B5T2JqOmZ1bmN0aW9uKGUpe2lmKHRoaXMuX2lzT2JqKGUpKXt2YXIgdD17fTtmb3IodmFyIGkgaW4gZSl0W2ldPSJvYmplY3QiPT10eXBlb2YgZVtpXSYmbnVsbCE9ZVtpXT90aGlzLl9jb3B5T2JqKGVbaV0pOmVbaV19ZWxzZSBmb3IodmFyIHQ9W10saT0wO2k8ZS5sZW5ndGg7aSsrKXRbaV09Im9iamVjdCI9PXR5cGVvZiBlW2ldJiZudWxsIT1lW2ldP3RoaXMuX2NvcHlPYmooZVtpXSk6ZVtpXTtyZXR1cm4gdH19LHdpbmRvdy5kaHg0LmlzSUU9bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJNU0lFIik+PTB8fG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiVHJpZGVudCIpPj0wLHdpbmRvdy5kaHg0LmlzSUU2PW51bGw9PXdpbmRvdy5YTUxIdHRwUmVxdWVzdCYmbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJNU0lFIik+PTAsd2luZG93LmRoeDQuaXNJRTc9bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJNU0lFIDcuMCIpPj0wJiZuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIlRyaWRlbnQiKTwwLHdpbmRvdy5kaHg0LmlzSUU4PW5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiTVNJRSA4LjAiKT49MCYmbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJUcmlkZW50Iik+PTAsd2luZG93LmRoeDQuaXNJRTk9bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJNU0lFIDkuMCIpPj0wJiZuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIlRyaWRlbnQiKT49MCx3aW5kb3cuZGh4NC5pc0lFMTA9bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJNU0lFIDEwLjAiKT49MCYmbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJUcmlkZW50Iik+PTAmJjEhPXdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQsd2luZG93LmRoeDQuaXNJRTExPW5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiVHJpZGVudCIpPj0wJiYxPT13aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkLHdpbmRvdy5kaHg0LmlzRWRnZT1uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIkVkZ2UiKT49MCx3aW5kb3cuZGh4NC5pc09wZXJhPW5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiT3BlcmEiKT49MCx3aW5kb3cuZGh4NC5pc0Nocm9tZT1uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIkNocm9tZSIpPj0wJiYhd2luZG93LmRoeDQuaXNFZGdlLHdpbmRvdy5kaHg0LmlzS0hUTUw9KG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiU2FmYXJpIik+PTB8fG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiS29ucXVlcm9yIik+PTApJiYhd2luZG93LmRoeDQuaXNFZGdlLHdpbmRvdy5kaHg0LmlzRkY9bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJGaXJlZm94Iik+PTAsd2luZG93LmRoeDQuaXNJUGFkPW5hdmlnYXRvci51c2VyQWdlbnQuc2VhcmNoKC9pUGFkL2dpKT49MCx3aW5kb3cuZGh4NC5kbmQ9e2V2czp7fSxwX2VuOih3aW5kb3cuZGh4NC5pc0lFfHx3aW5kb3cuZGh4NC5pc0VkZ2UpJiYod2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZHx8d2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkKSxfbVRvdWNoOmZ1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuZGh4NC5pc0lFMTAmJmUucG9pbnRlclR5cGU9PWUuTVNQT0lOVEVSX1RZUEVfTU9VU0V8fHdpbmRvdy5kaHg0LmlzSUUxMSYmIm1vdXNlIj09ZS5wb2ludGVyVHlwZXx8d2luZG93LmRoeDQuaXNFZGdlJiYibW91c2UiPT1lLnBvaW50ZXJUeXBlfSxfdG91Y2hPbjpmdW5jdGlvbihlKXtudWxsPT1lJiYoZT1kb2N1bWVudC5ib2R5KSxlLnN0eWxlLnRvdWNoQWN0aW9uPWUuc3R5bGUubXNUb3VjaEFjdGlvbj0iIixlPW51bGx9LF90b3VjaE9mZjpmdW5jdGlvbihlKXtudWxsPT1lJiYoZT1kb2N1bWVudC5ib2R5KSxlLnN0eWxlLnRvdWNoQWN0aW9uPWUuc3R5bGUubXNUb3VjaEFjdGlvbj0ibm9uZSIsZT1udWxsfX0sMT09d2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZD93aW5kb3cuZGh4NC5kbmQuZXZzPXtzdGFydDoicG9pbnRlcmRvd24iLG1vdmU6InBvaW50ZXJtb3ZlIixlbmQ6InBvaW50ZXJ1cCJ9OjE9PXdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZD93aW5kb3cuZGh4NC5kbmQuZXZzPXtzdGFydDoiTVNQb2ludGVyRG93biIsbW92ZToiTVNQb2ludGVyTW92ZSIsZW5kOiJNU1BvaW50ZXJVcCJ9OiJ1bmRlZmluZWQiIT10eXBlb2Ygd2luZG93LmFkZEV2ZW50TGlzdGVuZXImJih3aW5kb3cuZGh4NC5kbmQuZXZzPXtzdGFydDoidG91Y2hzdGFydCIsbW92ZToidG91Y2htb3ZlIixlbmQ6InRvdWNoZW5kIn0pKSwidW5kZWZpbmVkIj09dHlwZW9mIHdpbmRvdy5kaHg0Ll9ldmVudGFibGUmJih3aW5kb3cuZGh4NC5fZXZlbnRhYmxlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuImNsZWFyIj09dD8oZS5kZXRhY2hBbGxFdmVudHMoKSxlLmRoeGV2cz1udWxsLGUuYXR0YWNoRXZlbnQ9bnVsbCxlLmRldGFjaEV2ZW50PW51bGwsZS5jaGVja0V2ZW50PW51bGwsZS5jYWxsRXZlbnQ9bnVsbCxlLmRldGFjaEFsbEV2ZW50cz1udWxsLGU9bnVsbCx2b2lkIDApOihlLmRoeGV2cz17ZGF0YTp7fX0sZS5hdHRhY2hFdmVudD1mdW5jdGlvbihlLHQpe2U9U3RyaW5nKGUpLnRvTG93ZXJDYXNlKCksdGhpcy5kaHhldnMuZGF0YVtlXXx8KHRoaXMuZGh4ZXZzLmRhdGFbZV09e30pO3ZhciBpPXdpbmRvdy5kaHg0Lm5ld0lkKCk7cmV0dXJuIHRoaXMuZGh4ZXZzLmRhdGFbZV1baV09dCxpfSxlLmRldGFjaEV2ZW50PWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCBpbiB0aGlzLmRoeGV2cy5kYXRhKXt2YXIgaT0wO2Zvcih2YXIgbiBpbiB0aGlzLmRoeGV2cy5kYXRhW3RdKW49PWU/KHRoaXMuZGh4ZXZzLmRhdGFbdF1bbl09bnVsbCxkZWxldGUgdGhpcy5kaHhldnMuZGF0YVt0XVtuXSk6aSsrOzA9PWkmJih0aGlzLmRoeGV2cy5kYXRhW3RdPW51bGwsZGVsZXRlIHRoaXMuZGh4ZXZzLmRhdGFbdF0pfX0sZS5jaGVja0V2ZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlPVN0cmluZyhlKS50b0xvd2VyQ2FzZSgpLG51bGwhPXRoaXMuZGh4ZXZzLmRhdGFbZV19LGUuY2FsbEV2ZW50PWZ1bmN0aW9uKGUsdCl7aWYoZT1TdHJpbmcoZSkudG9Mb3dlckNhc2UoKSxudWxsPT10aGlzLmRoeGV2cy5kYXRhW2VdKXJldHVybiEwO3ZhciBpPSEwO2Zvcih2YXIgbiBpbiB0aGlzLmRoeGV2cy5kYXRhW2VdKWk9dGhpcy5kaHhldnMuZGF0YVtlXVtuXS5hcHBseSh0aGlzLHQpJiZpO3JldHVybiBpfSxlLmRldGFjaEFsbEV2ZW50cz1mdW5jdGlvbigpe2Zvcih2YXIgZSBpbiB0aGlzLmRoeGV2cy5kYXRhKXtmb3IodmFyIHQgaW4gdGhpcy5kaHhldnMuZGF0YVtlXSl0aGlzLmRoeGV2cy5kYXRhW2VdW3RdPW51bGwsZGVsZXRlIHRoaXMuZGh4ZXZzLmRhdGFbZV1bdF07dGhpcy5kaHhldnMuZGF0YVtlXT1udWxsLGRlbGV0ZSB0aGlzLmRoeGV2cy5kYXRhW2VdfX0sZT1udWxsLHZvaWQgMCl9LGRoeDQuX2V2ZW50YWJsZShkaHg0KSksInVuZGVmaW5lZCI9PXR5cGVvZiB3aW5kb3cuZGh0bWx4JiYod2luZG93LmRodG1seD17ZXh0ZW5kOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBpIGluIHQpZVtpXXx8KGVbaV09dFtpXSk7cmV0dXJuIGV9LGV4dGVuZF9hcGk6ZnVuY3Rpb24oZSx0LGkpe3ZhciBuPXdpbmRvd1tlXTtuJiYod2luZG93W2VdPWZ1bmN0aW9uKGUpe2lmKGUmJiJvYmplY3QiPT10eXBlb2YgZSYmIWUudGFnTmFtZSl7dmFyIGk9bi5hcHBseSh0aGlzLHQuX2luaXQ/dC5faW5pdChlKTphcmd1bWVudHMpO2Zvcih2YXIgbyBpbiBkaHRtbHgpdFtvXSYmdGhpc1t0W29dXShkaHRtbHhbb10pO2Zvcih2YXIgbyBpbiBlKXRbb10/dGhpc1t0W29dXShlW29dKTowPT09by5pbmRleE9mKCJvbiIpJiZ0aGlzLmF0dGFjaEV2ZW50KG8sZVtvXSl9ZWxzZSB2YXIgaT1uLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtyZXR1cm4gdC5fcGF0Y2gmJnQuX3BhdGNoKHRoaXMpLGl8fHRoaXN9LHdpbmRvd1tlXS5wcm90b3R5cGU9bi5wcm90b3R5cGUsaSYmZGh0bWx4LmV4dGVuZCh3aW5kb3dbZV0ucHJvdG90eXBlLGkpKX0sdXJsOmZ1bmN0aW9uKGUpe3JldHVybi0xIT1lLmluZGV4T2YoIj8iKT8iJiI6Ij8ifX0pLF9pc0ZGPSExLF9pc0lFPSExLF9pc09wZXJhPSExLF9pc0tIVE1MPSExLF9pc01hY09TPSExLF9pc0Nocm9tZT0hMSxfRkZydj0hMSxfS0hUTUxydj0hMSxfT3BlcmFSdj0hMSwtMSE9bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJNYWNpbnRvc2giKSYmKF9pc01hY09TPSEwKSxuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZigiY2hyb21lIik+LTEmJihfaXNDaHJvbWU9ITApLC0xIT1uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIlNhZmFyaSIpfHwtMSE9bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCJLb25xdWVyb3IiKT8oX0tIVE1McnY9cGFyc2VGbG9hdChuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIlNhZmFyaSIpKzcsNSkpLF9LSFRNTHJ2PjUyNT8oX2lzRkY9ITAsX0ZGcnY9MS45KTpfaXNLSFRNTD0hMCk6LTEhPW5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiT3BlcmEiKT8oX2lzT3BlcmE9ITAsX09wZXJhUnY9cGFyc2VGbG9hdChuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIk9wZXJhIikrNiwzKSkpOi0xIT1uYXZpZ2F0b3IuYXBwTmFtZS5pbmRleE9mKCJNaWNyb3NvZnQiKT8oX2lzSUU9ITAsKC0xIT1uYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCJNU0lFIDguMCIpfHwtMSE9bmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZigiTVNJRSA5LjAiKXx8LTEhPW5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoIk1TSUUgMTAuMCIpfHxkb2N1bWVudC5kb2N1bWVudE1vZGU+NykmJiJCYWNrQ29tcGF0IiE9ZG9jdW1lbnQuY29tcGF0TW9kZSYmKF9pc0lFPTgpKToiTmV0c2NhcGUiPT1uYXZpZ2F0b3IuYXBwTmFtZSYmLTEhPW5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZigiVHJpZGVudCIpP19pc0lFPTg6KF9pc0ZGPSEwLF9GRnJ2PXBhcnNlRmxvYXQobmF2aWdhdG9yLnVzZXJBZ2VudC5zcGxpdCgicnY6IilbMV0pKSwidW5kZWZpbmVkIj09dHlwZW9mIHdpbmRvdy5kaHRtbHhFdmVudCxudWxsPT1kaHRtbHhFdmVudC50b3VjaERlbGF5JiYoZGh0bWx4RXZlbnQudG91Y2hEZWxheT0yZTMpLCJ1bmRlZmluZWQiPT10eXBlb2YgZGh0bWx4RXZlbnQuaW5pdFRvdWNoJiYoZGh0bWx4RXZlbnQuaW5pdFRvdWNoPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe2lmKGkpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUV2ZW50KCJIVE1MRXZlbnRzIik7ZS5pbml0RXZlbnQoImRibGNsaWNrIiwhMCwhMCksaS5kaXNwYXRjaEV2ZW50KGUpLHQ9aT1udWxsfX12YXIgdCxpLG4sbztkaHRtbHhFdmVudChkb2N1bWVudC5ib2R5LCJ0b3VjaHN0YXJ0IixmdW5jdGlvbihyKXtpPXIudG91Y2hlc1swXS50YXJnZXQsbj1yLnRvdWNoZXNbMF0uY2xpZW50WCxvPXIudG91Y2hlc1swXS5jbGllbnRZLHQ9d2luZG93LnNldFRpbWVvdXQoZSxkaHRtbHhFdmVudC50b3VjaERlbGF5KX0pLGRodG1seEV2ZW50KGRvY3VtZW50LmJvZHksInRvdWNobW92ZSIsZnVuY3Rpb24oZSl7dCYmKE1hdGguYWJzKGUudG91Y2hlc1swXS5jbGllbnRYLW4pPjUwfHxNYXRoLmFicyhlLnRvdWNoZXNbMF0uY2xpZW50WS1vKT41MCkmJih3aW5kb3cuY2xlYXJUaW1lb3V0KHQpLHQ9aT0hMSl9KSxkaHRtbHhFdmVudChkb2N1bWVudC5ib2R5LCJ0b3VjaGVuZCIsZnVuY3Rpb24oKXt0JiYod2luZG93LmNsZWFyVGltZW91dCh0KSx0PWk9ITEpfSksZGh0bWx4RXZlbnQuaW5pdFRvdWNoPWZ1bmN0aW9uKCl7fX0pLGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9kb0NvbnRDbGljaz1mdW5jdGlvbihlLHQpe2lmKCF0JiYyIT1lLmJ1dHRvbilyZXR1cm4gdGhpcy5fYWNNZW51JiYodGhpcy5fYWNNZW51LmhpZGVDb250ZXh0TWVudT90aGlzLl9hY01lbnUuaGlkZUNvbnRleHRNZW51KCk6dGhpcy5jTWVudS5fY29udGV4dEVuZCgpKSwhMDtmb3IodmFyIGk9X2lzSUU/ZS5zcmNFbGVtZW50OmUudGFyZ2V0O2kmJiJCT0RZIiE9aS50YWdOYW1lJiYhaS5wYXJlbnRPYmplY3Q7KWk9aS5wYXJlbnROb2RlO2lmKCFpfHwhaS5wYXJlbnRPYmplY3QpcmV0dXJuITA7dmFyIG49aS5wYXJlbnRPYmplY3Q7aWYodGhpcy5jYWxsRXZlbnQoIm9uUmlnaHRDbGljayIsW24uaWQsZV0pfHwoKGUuc3JjRWxlbWVudHx8ZS50YXJnZXQpLm9uY29udGV4dG1lbnU9ZnVuY3Rpb24oZSl7cmV0dXJuKGV8fGV2ZW50KS5jYW5jZWxCdWJibGU9ITAsITF9KSx0aGlzLl9hY01lbnU9bi5jTWVudXx8dGhpcy5jTWVudSx0aGlzLl9hY01lbnUpe2lmKCF0aGlzLmNhbGxFdmVudCgib25CZWZvcmVDb250ZXh0TWVudSIsW24uaWRdKSlyZXR1cm4hMDtpZihfaXNNYWNPU3x8KChlLnNyY0VsZW1lbnR8fGUudGFyZ2V0KS5vbmNvbnRleHRtZW51PWZ1bmN0aW9uKGUpe3JldHVybihlfHxldmVudCkuY2FuY2VsQnViYmxlPSEwLCExfSksdGhpcy5fYWNNZW51LnNob3dDb250ZXh0TWVudSl7dmFyIG89d2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxyPXdpbmRvdy5kb2N1bWVudC5ib2R5LGw9bmV3IEFycmF5KG8uc2Nyb2xsTGVmdHx8ci5zY3JvbGxMZWZ0LG8uc2Nyb2xsVG9wfHxyLnNjcm9sbFRvcCk7aWYoX2lzSUUpdmFyIHM9ZS5jbGllbnRYK2xbMF0sYT1lLmNsaWVudFkrbFsxXTtlbHNlIHZhciBzPWUucGFnZVgsYT1lLnBhZ2VZO3RoaXMuX2FjTWVudS5zaG93Q29udGV4dE1lbnUocy0xLGEtMSksdGhpcy5jb250ZXh0SUQ9bi5pZCxlLmNhbmNlbEJ1YmJsZT0hMCx0aGlzLl9hY01lbnUuX3NraXBfaGlkZT0hMH1lbHNlIGkuY29udGV4dE1lbnVJZD1uLmlkLGkuY29udGV4dE1lbnU9dGhpcy5fYWNNZW51LGkuYT10aGlzLl9hY01lbnUuX2NvbnRleHRTdGFydCxpLmEoaSxlKSxpLmE9bnVsbDtyZXR1cm4hMX1yZXR1cm4hMH0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuZW5hYmxlSUVJbWFnZUZpeD1mdW5jdGlvbihlKXtlPyh0aGlzLl9nZXRJbWc9ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJESVYiKTtyZXR1cm4gZS5pbm5lckhUTUw9IiZuYnNwOyIsZS5jbGFzc05hbWU9ImRoeF9iZ19pbWdfZml4IixlfSx0aGlzLl9zZXRTcmM9ZnVuY3Rpb24oZSx0KXtlLnN0eWxlLmJhY2tncm91bmRJbWFnZT0idXJsKCIrdCsiKSJ9LHRoaXMuX2dldFNyYz1mdW5jdGlvbihlKXt2YXIgdD1lLnN0eWxlLmJhY2tncm91bmRJbWFnZTtyZXR1cm4gdC5zdWJzdHIoNCx0Lmxlbmd0aC01KS5yZXBsYWNlKC8oXiIpfCgiJCkvZywiIil9KToodGhpcy5fZ2V0SW1nPWZ1bmN0aW9uKGUpe3JldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGU9PXRoaXMucm9vdElkPyJkaXYiOiJpbWciKX0sdGhpcy5fc2V0U3JjPWZ1bmN0aW9uKGUsdCl7ZS5zcmM9dH0sdGhpcy5fZ2V0U3JjPWZ1bmN0aW9uKGUpe3JldHVybiBlLnNyY30pfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5kZXN0cnVjdG9yPWZ1bmN0aW9uKCl7Zm9yKHZhciBlIGluIHRoaXMuX2lkcHVsbCl7dmFyIHQ9dGhpcy5faWRwdWxsW2VdO3QmJih0LnBhcmVudE9iamVjdD1udWxsLHQudHJlZU5vZD1udWxsLHQuY2hpbGROb2Rlcz1udWxsLHQuc3Bhbj1udWxsLHQudHIubm9kZW09bnVsbCx0LnRyPW51bGwsdC5odG1sTm9kZS5vYmpCZWxvbmc9bnVsbCx0Lmh0bWxOb2RlPW51bGwsdGhpcy5faWRwdWxsW2VdPW51bGwpfXRoaXMucGFyZW50T2JqZWN0LmlubmVySFRNTD0iIix0aGlzLmFsbFRyZWUub25zZWxlY3RzdGFydD1udWxsLHRoaXMuYWxsVHJlZS5vbmNvbnRleHRtZW51PW51bGwsdGhpcy5hbGxUcmVlLm9ubW91c2Vkb3duPW51bGw7Zm9yKHZhciBlIGluIHRoaXMpdGhpc1tlXT1udWxsfSxjT2JqZWN0LnByb3RvdHlwZT1uZXcgT2JqZWN0LGNPYmplY3QucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe31yZXR1cm4gZS5wcm90b3R5cGU9dGhpcyxuZXcgZX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2dsb2JhbElkU3RvcmFnZUFkZD1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKGUsMSwxKT8oZT1lKyJfIisobmV3IERhdGUpLnZhbHVlT2YoKSx0aGlzLl9nbG9iYWxJZFN0b3JhZ2VBZGQoZSx0KSk6KHRoaXMuX2lkcHVsbFtlXT10LHRoaXMuX3B1bGxTaXplKyssZSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9nbG9iYWxJZFN0b3JhZ2VTdWI9ZnVuY3Rpb24oZSl7dGhpcy5faWRwdWxsW2VdJiYodGhpcy5fdW5zZWxlY3RJdGVtKHRoaXMuX2lkcHVsbFtlXSksdGhpcy5faWRwdWxsW2VdPW51bGwsdGhpcy5fcHVsbFNpemUtLSksdGhpcy5fbG9ja2VyJiZ0aGlzLl9sb2NrZXJbZV0mJih0aGlzLl9sb2NrZXJbZV09ITEpfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5fZ2xvYmFsSWRTdG9yYWdlRmluZD1mdW5jdGlvbihlLHQsaSxuKXt2YXIgbz10aGlzLl9pZHB1bGxbZV07aWYobyl7aWYoby51blBhcnNlZCYmIWkmJnRoaXMucmVQYXJzZShvLDApLHRoaXMuX3NybmQmJiFvLmh0bWxOb2RlJiZ0aGlzLl9idWlsZFNSTkQobyxpKSxuJiZ0aGlzLl9lZHNicHNBKWZvcih2YXIgcj0wO3I8dGhpcy5fZWRzYnBzQS5sZW5ndGg7cisrKWlmKHRoaXMuX2Vkc2Jwc0Fbcl1bMl09PWUpcmV0dXJuIGRoeDQuY2FsbEV2ZW50KCJvbmdldEl0ZW1FcnJvciIsWyJSZXF1ZXN0ZWQgaXRlbSBzdGlsbCBpbiBwYXJzaW5nIHByb2Nlc3MuIixlXSksbnVsbDtyZXR1cm4gb31yZXR1cm4gdGhpcy5zbG93UGFyc2UmJjAhPWUmJiF0P3RoaXMucHJlUGFyc2UoZSk6bnVsbH0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2RyYXdOZXdUcj1mdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ciIpLGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgidGQiKSxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInRkIik7cmV0dXJuIGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoIiAiKSksbi5jb2xTcGFuPTMsbi5hcHBlbmRDaGlsZChlKSx0LmFwcGVuZENoaWxkKGkpLHQuYXBwZW5kQ2hpbGQobiksdH0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUucGFyc2U9ZnVuY3Rpb24oZSx0LGkpe2lmKCJzdHJpbmciPT10eXBlb2YgdCYmKGk9dCx0PW51bGwpLCJqc29uIj09PWkpcmV0dXJuIHRoaXMuX2xvYWRKU09OT2JqZWN0KGUsdCk7aWYoImNzdiI9PT1pKXJldHVybiB0aGlzLl9sb2FkQ1NWU3RyaW5nKGUsdCk7aWYoImpzYXJyYXkiPT09aSlyZXR1cm4gdGhpcy5fbG9hZEpTQXJyYXkoZSx0KTt2YXIgbj10aGlzO3RoaXMucGFyc0NvdW50fHx0aGlzLmNhbGxFdmVudCgib25YTFMiLFtuLG51bGxdKSx0aGlzLnhtbHN0YXRlPTEsdGhpcy5YTUxMb2FkZXIoe3Jlc3BvbnNlWE1MOmRoeDQuYWpheC5wYXJzZShlKX0sdCl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9hdHRhY2hDaGlsZE5vZGU9ZnVuY3Rpb24oZSx0LGksbixvLHIsbCxzLGEsZCxoKXtkJiZkLnBhcmVudE9iamVjdCYmKGU9ZC5wYXJlbnRPYmplY3QpLDA9PWUuWE1MbG9hZCYmdGhpcy5YTUxzb3VyY2UmJiF0aGlzLlhNTGxvYWRpbmdXYXJuaW5nJiYoZS5YTUxsb2FkPTEsdGhpcy5fbG9hZER5blhNTChlLmlkKSk7dmFyIGM9ZS5jaGlsZHNDb3VudCx1PWUuY2hpbGROb2RlcztpZihoJiZoLnRyLnByZXZpb3VzU2libGluZyYmKGgudHIucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZz9kPWgudHIucHJldmlvdXNTaWJsaW5nLm5vZGVtOnM9cy5yZXBsYWNlKCJUT1AiLCIiKSsiLFRPUCIpLGQpe3ZhciBwLF87Zm9yKHA9MDtjPnA7cCsrKWlmKHVbcF09PWQpe2ZvcihfPWM7XyE9cDtfLS0pdVsxK19dPXVbX107YnJlYWt9cCsrLGM9cH1pZihzKWZvcih2YXIgbT1zLnNwbGl0KCIsIiksZz0wO2c8bS5sZW5ndGg7ZysrKXN3aXRjaChtW2ddKXtjYXNlIlRPUCI6Zm9yKGUuY2hpbGRzQ291bnQ+MCYmKGQ9bmV3IE9iamVjdCxkLnRyPWUuY2hpbGROb2Rlc1swXS50ci5wcmV2aW91c1NpYmxpbmcpLGUuX2hhc190b3A9ITAscD1jO3A+MDtwLS0pdVtwXT11W3AtMV07Yz0wfXZhciBmOyhmPXRoaXMuX2lkcHVsbFt0XSkmJi0xPT1mLnNwYW58fChmPXVbY109bmV3IGRodG1sWFRyZWVJdGVtT2JqZWN0KHQsaSxlLHRoaXMsbiwxKSx0PXVbY10uaWQsZS5jaGlsZHNDb3VudCsrKSxmLmh0bWxOb2RlfHwoZi5sYWJlbD1pLGYuaHRtbE5vZGU9dGhpcy5fY3JlYXRlSXRlbSh0aGlzLmNoZWNrQm94T2ZmPzE6MCxmKSxmLmh0bWxOb2RlLm9iakJlbG9uZz1mKSxvJiYoZi5pbWFnZXNbMF09byksciYmKGYuaW1hZ2VzWzFdPXIpLGwmJihmLmltYWdlc1syXT1sKTt2YXIgYj10aGlzLl9kcmF3TmV3VHIoZi5odG1sTm9kZSk7aWYoKHRoaXMuWE1MbG9hZGluZ1dhcm5pbmd8fHRoaXMuX2hBZEkpJiYoZi5odG1sTm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheT0ibm9uZSIpLGQmJmQudHImJmQudHIubmV4dFNpYmxpbmc/ZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmluc2VydEJlZm9yZShiLGQudHIubmV4dFNpYmxpbmcpOnRoaXMucGFyc2luZ09uPT1lLmlkP3RoaXMucGFyc2VkQXJyYXlbdGhpcy5wYXJzZWRBcnJheS5sZW5ndGhdPWI6ZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKGIpLGQmJiFkLnNwYW4mJihkPW51bGwpLHRoaXMuWE1Mc291cmNlJiYoZi5YTUxsb2FkPWEmJjAhPWE/MDoxKSxmLnRyPWIsYi5ub2RlbT1mLDA9PWUuaXRlbUlkJiYoYi5jaGlsZE5vZGVzWzBdLmNsYXNzTmFtZT0iaGlkZGVuUm93IiksKGUuX3JfbG9naWN8fHRoaXMuX2ZyYnRyKSYmdGhpcy5fc2V0U3JjKGYuaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1swXSx0aGlzLmltUGF0aCt0aGlzLnJhZGlvQXJyYXlbMF0pLHMpZm9yKHZhciBtPXMuc3BsaXQoIiwiKSxnPTA7ZzxtLmxlbmd0aDtnKyspc3dpdGNoKG1bZ10pe2Nhc2UiU0VMRUNUIjp0aGlzLnNlbGVjdEl0ZW0odCwhMSk7YnJlYWs7Y2FzZSJDQUxMIjp0aGlzLnNlbGVjdEl0ZW0odCwhMCk7YnJlYWs7Y2FzZSJDSElMRCI6Zi5YTUxsb2FkPTA7YnJlYWs7Y2FzZSJDSEVDS0VEIjp0aGlzLlhNTGxvYWRpbmdXYXJuaW5nP3RoaXMuc2V0Q2hlY2tMaXN0Kz10aGlzLmRsbXRyK3Q6dGhpcy5zZXRDaGVjayh0LDEpO2JyZWFrO2Nhc2UiSENIRUNLRUQiOnRoaXMuX3NldENoZWNrKGYsInVuc3VyZSIpO2JyZWFrO2Nhc2UiT1BFTiI6Zi5vcGVuTWU9MX1pZighdGhpcy5YTUxsb2FkaW5nV2FybmluZyYmKHRoaXMuX2dldE9wZW5TdGF0ZShlKTwwJiYhdGhpcy5faEFkSSYmdGhpcy5vcGVuSXRlbShlLmlkKSxkJiYodGhpcy5fY29ycmVjdFBsdXMoZCksdGhpcy5fY29ycmVjdExpbmUoZCkpLHRoaXMuX2NvcnJlY3RQbHVzKGUpLHRoaXMuX2NvcnJlY3RMaW5lKGUpLHRoaXMuX2NvcnJlY3RQbHVzKGYpLGUuY2hpbGRzQ291bnQ+PTImJih0aGlzLl9jb3JyZWN0UGx1cyh1W2UuY2hpbGRzQ291bnQtMl0pLHRoaXMuX2NvcnJlY3RMaW5lKHVbZS5jaGlsZHNDb3VudC0yXSkpLDIhPWUuY2hpbGRzQ291bnQmJnRoaXMuX2NvcnJlY3RQbHVzKHVbMF0pLHRoaXMudHNjaGVjayYmdGhpcy5fY29ycmVjdENoZWNrU3RhdGVzKGUpLHRoaXMuX29ucmFkaCkpaWYoMT09dGhpcy54bWxzdGF0ZSl7dmFyIHY9dGhpcy5vblhMRTt0aGlzLm9uWExFPWZ1bmN0aW9uKGUpe3RoaXMuX29ucmFkaCh0KSx2JiZ2KGUpfX1lbHNlIHRoaXMuX29ucmFkaCh0KTtyZXR1cm4gZn0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX3BhcnNlSXRlbT1mdW5jdGlvbihlLHQsaSxuKXt2YXIgbztpZih0aGlzLl9zcm5kJiYoIXRoaXMuX2lkcHVsbFtvPWUuZ2V0KCJpZCIpXXx8IXRoaXMuX2lkcHVsbFtvXS5zcGFuKSlyZXR1cm4gdGhpcy5fYWRkSXRlbVNSTkQodC5pZCxvLGUpLHZvaWQgMDt2YXIgcj1lLmdldF9hbGwoKTtpZigib2JqZWN0Ij09dHlwZW9mIHRoaXMud2FpdFVwZGF0ZVhNTCYmIXRoaXMud2FpdFVwZGF0ZVhNTFtyLmlkXSlyZXR1cm4gdGhpcy5fcGFyc2UoZSxyLmlkLDEpLHZvaWQgMDsobnVsbD09PXIudGV4dHx8InVuZGVmaW5lZCI9PXR5cGVvZiByLnRleHQpJiYoci50ZXh0PWUuc3ViKCJpdGVtdGV4dCIpLHIudGV4dCYmKHIudGV4dD1yLnRleHQuY29udGVudCgpKSk7dmFyIGw9W107aWYoci5zZWxlY3QmJmwucHVzaCgiU0VMRUNUIiksci50b3AmJmwucHVzaCgiVE9QIiksci5jYWxsJiYodGhpcy5ub2RlQXNraW5nQ2FsbD1yLmlkKSwtMT09ci5jaGVja2VkP2wucHVzaCgiSENIRUNLRUQiKTpyLmNoZWNrZWQmJmwucHVzaCgiQ0hFQ0tFRCIpLHIub3BlbiYmbC5wdXNoKCJPUEVOIiksdGhpcy53YWl0VXBkYXRlWE1MKWlmKHRoaXMuX2dsb2JhbElkU3RvcmFnZUZpbmQoci5pZCkpdmFyIHM9dGhpcy51cGRhdGVJdGVtKHIuaWQsci50ZXh0LHIuaW0wLHIuaW0xLHIuaW0yLHIuY2hlY2tlZCxyLmNoaWxkKTtlbHNlezA9PXRoaXMubnBsP2wucHVzaCgiVE9QIik6aT10LmNoaWxkTm9kZXNbdGhpcy5ucGxdO3ZhciBzPXRoaXMuX2F0dGFjaENoaWxkTm9kZSh0LHIuaWQsci50ZXh0LDAsci5pbTAsci5pbTEsci5pbTIsbC5qb2luKCIsIiksci5jaGlsZCwwLGkpO3IuaWQ9cy5pZCxpPW51bGx9ZWxzZSB2YXIgcz10aGlzLl9hdHRhY2hDaGlsZE5vZGUodCxyLmlkLHIudGV4dCwwLHIuaW0wLHIuaW0xLHIuaW0yLGwuam9pbigiLCIpLHIuY2hpbGQsbnx8MCxpKTtpZihyLnRvb2x0aXAmJihzLnNwYW4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLnRpdGxlPXIudG9vbHRpcCksci5zdHlsZSYmKHMuc3Bhbi5zdHlsZS5jc3NUZXh0P3Muc3Bhbi5zdHlsZS5jc3NUZXh0Kz0iOyIrci5zdHlsZTpzLnNwYW4uc2V0QXR0cmlidXRlKCJzdHlsZSIscy5zcGFuLmdldEF0dHJpYnV0ZSgic3R5bGUiKSsiOyAiK3Iuc3R5bGUpKSxyLnJhZGlvJiYocy5fcl9sb2dpYz0hMCksci5ub2NoZWNrYm94KXt2YXIgYT1zLnNwYW4ucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO2Euc3R5bGUuZGlzcGxheT0ibm9uZSIscy5ub2NoZWNrYm94PSEwfXIuZGlzYWJsZWQmJihudWxsIT1yLmNoZWNrZWQmJnRoaXMuX3NldENoZWNrKHMsci5jaGVja2VkKSx0aGlzLmRpc2FibGVDaGVja2JveChzLDEpKSxzLl9hY2M9ci5jaGlsZHx8MCx0aGlzLnBhcnNlckV4dGVuc2lvbiYmdGhpcy5wYXJzZXJFeHRlbnNpb24uX3BhcnNlRXh0ZW5zaW9uLmNhbGwodGhpcyxlLHIsdD90LmlkOjApLHRoaXMuc2V0SXRlbUNvbG9yKHMsci5hQ29sLHIuc0NvbCksIjEiPT1yLmxvY2tlZCYmdGhpcy5sb2NrSXRlbShzLmlkLCEwLCEwKSwoci5pbXdpZHRofHxyLmltaGVpZ2h0KSYmdGhpcy5zZXRJY29uU2l6ZShyLmltd2lkdGgsci5pbWhlaWdodCxzKSwoIjAiPT1yLmNsb3NlYWJsZXx8IjEiPT1yLmNsb3NlYWJsZSkmJnRoaXMuc2V0SXRlbUNsb3NlYWJsZShzLHIuY2xvc2VhYmxlKTt2YXIgZD0iIjtyLnRvcG9mZnNldCYmdGhpcy5zZXRJdGVtVG9wT2Zmc2V0KHMsci50b3BvZmZzZXQpLHRoaXMuc2xvd1BhcnNlJiYib2JqZWN0IiE9dHlwZW9mIHRoaXMud2FpdFVwZGF0ZVhNTD8oIXMuY2hpbGRzQ291bnQmJmUuc3ViX2V4aXN0cygiaXRlbSIpJiYocy51blBhcnNlZD1lLmNsb25lKCkpLGUuZWFjaCgidXNlcmRhdGEiLGZ1bmN0aW9uKGUpe3RoaXMuc2V0VXNlckRhdGEoci5pZCxlLmdldCgibmFtZSIpLGUuY29udGVudCgpKX0sdGhpcykpOmUuc3ViX2V4aXN0cygiaXRlbSIpJiYoZD10aGlzLl9wYXJzZShlLHIuaWQsMSkpLCIiIT1kJiYodGhpcy5ub2RlQXNraW5nQ2FsbD1kKSxlLmVhY2goInVzZXJkYXRhIixmdW5jdGlvbih0KXt0aGlzLnNldFVzZXJEYXRhKGUuZ2V0KCJpZCIpLHQuZ2V0KCJuYW1lIiksdC5jb250ZW50KCkpfSx0aGlzKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX3BhcnNlPWZ1bmN0aW9uKGUsdCxpLG4pe2lmKHRoaXMuX3NybmQmJiF0aGlzLnBhcmVudE9iamVjdC5vZmZzZXRIZWlnaHQpe3ZhciBvPXRoaXM7cmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7by5fcGFyc2UoZSx0LGksbil9LDEwMCl9aWYoZS5leGlzdHMoKSl7aWYodGhpcy5za2lwTG9jaz0hMCwhdCl7dD1lLmdldCgiaWQiKSx0aGlzLl9keW5EZWxldGVCcmFuY2hlc1t0XSYmKHRoaXMuZGVsZXRlQ2hpbGRJdGVtcyh0KSx0aGlzLl9keW5EZWxldGVCcmFuY2hlc1t0XS0tLHRoaXMuX2R5bkRlbGV0ZUJyYW5jaGVzW3RdfHxkZWxldGUgdGhpcy5fZHluRGVsZXRlQnJhbmNoZXNbdF0pO3ZhciByPWUuZ2V0KCJkaHhfc2VjdXJpdHkiKTtyJiYoZGh0bWx4LnNlY3VyaXR5X2tleT1yKSxlLmdldCgicmFkaW8iKSYmKHRoaXMuaHRtbE5vZGUuX3JfbG9naWM9ITApLHRoaXMucGFyc2luZ09uPXQsdGhpcy5wYXJzZWRBcnJheT1uZXcgQXJyYXksdGhpcy5zZXRDaGVja0xpc3Q9IiIsdGhpcy5ub2RlQXNraW5nQ2FsbD0iIn12YXIgbD10aGlzLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKHQpO2lmKCFsKXJldHVybiBkaHg0LmNhbGxFdmVudCgib25EYXRhU3RydWN0dXJlRXJyb3IiLFsiWE1MIHJlZmVycyB0byBub3QgZXhpc3RpbmcgcGFyZW50Il0pO2lmKHRoaXMucGFyc0NvdW50PXRoaXMucGFyc0NvdW50P3RoaXMucGFyc0NvdW50KzE6MSx0aGlzLlhNTGxvYWRpbmdXYXJuaW5nPTEsIWwuY2hpbGRzQ291bnR8fG58fHRoaXMuX2Vkc2Jwc3x8bC5faGFzX3RvcCl2YXIgcz0wO2Vsc2UgdmFyIHM9MDtpZih0aGlzLm5wbD0wLGUuZWFjaCgiaXRlbSIsZnVuY3Rpb24obixvKXtyZXR1cm4gbC5YTUxsb2FkPTEsdGhpcy5fcGFyc2VJdGVtKG4sbCwwLHMpLHRoaXMuX2Vkc2JwcyYmdGhpcy5ucGw9PXRoaXMuX2Vkc2Jwc0M/KHRoaXMuX2Rpc3RyaWJ1dGVkU3RhcnQoZSxvKzEsdCxpLGwuY2hpbGRzQ291bnQpLC0xKToodGhpcy5ucGwrKyx2b2lkIDApfSx0aGlzLG4pLCFpKXtpZihlLmVhY2goInVzZXJkYXRhIixmdW5jdGlvbih0KXt0aGlzLnNldFVzZXJEYXRhKGUuZ2V0KCJpZCIpLHQuZ2V0KCJuYW1lIiksdC5jb250ZW50KCkpfSx0aGlzKSxsLlhNTGxvYWQ9MSx0aGlzLndhaXRVcGRhdGVYTUwpe3RoaXMud2FpdFVwZGF0ZVhNTD0hMTtmb3IodmFyIGE9bC5jaGlsZHNDb3VudC0xO2E+PTA7YS0tKWwuY2hpbGROb2Rlc1thXS5fZG1hcmsmJnRoaXMuZGVsZXRlSXRlbShsLmNoaWxkTm9kZXNbYV0uaWQpfWZvcih2YXIgYT0odGhpcy5fZ2xvYmFsSWRTdG9yYWdlRmluZCh0aGlzLnBhcnNpbmdPbiksMCk7YTx0aGlzLnBhcnNlZEFycmF5Lmxlbmd0aDthKyspbC5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKHRoaXMucGFyc2VkQXJyYXlbYV0pO3RoaXMucGFyc2VkQXJyYXk9W10sdGhpcy5sYXN0TG9hZGVkWE1MSWQ9dCx0aGlzLlhNTGxvYWRpbmdXYXJuaW5nPTA7Zm9yKHZhciBkPXRoaXMuc2V0Q2hlY2tMaXN0LnNwbGl0KHRoaXMuZGxtdHIpLGg9MDtoPGQubGVuZ3RoO2grKylkW2hdJiZ0aGlzLnNldENoZWNrKGRbaF0sMSk7dGhpcy5YTUxzb3VyY2UmJnRoaXMudHNjaGVjayYmdGhpcy5zbWNoZWNrJiZsLmlkIT10aGlzLnJvb3RJZCYmKDA9PT1sLmNoZWNrc3RhdGU/dGhpcy5fc2V0U3ViQ2hlY2tlZCgwLGwpOjE9PT1sLmNoZWNrc3RhdGUmJnRoaXMuX3NldFN1YkNoZWNrZWQoMSxsKSksdGhpcy5fcmVkcmF3RnJvbSh0aGlzLG51bGwsbiksZS5nZXQoIm9yZGVyIikmJiJub25lIiE9ZS5nZXQoIm9yZGVyIikmJnRoaXMuX3Jlb3JkZXJCcmFuY2gobCxlLmdldCgib3JkZXIiKSwhMCksIiIhPXRoaXMubm9kZUFza2luZ0NhbGwmJnRoaXMuY2FsbEV2ZW50KCJvbkNsaWNrIixbdGhpcy5ub2RlQXNraW5nQ2FsbCx0aGlzLmdldFNlbGVjdGVkSXRlbUlkKCldKSx0aGlzLl9icmFuY2hVcGRhdGUmJnRoaXMuX2JyYW5jaFVwZGF0ZU5leHQoZSl9aWYoMT09dGhpcy5wYXJzQ291bnQpe2lmKHRoaXMucGFyc2luZ09uPW51bGwsdGhpcy5fc3JuZCYmbC5pZCE9dGhpcy5yb290SWQmJih0aGlzLnByZXBhcmVTUihsLmlkKSx0aGlzLlhNTHNvdXJjZSYmdGhpcy5vcGVuSXRlbShsLmlkKSksZS50aHJvdWdoKCJpdGVtIiwib3BlbiIsbnVsbCxmdW5jdGlvbihlKXt0aGlzLm9wZW5JdGVtKGUuZ2V0KCJpZCIpKX0sdGhpcyksIXRoaXMuX2Vkc2Jwc3x8IXRoaXMuX2Vkc2Jwc0EubGVuZ3RoKXt2YXIgYz10aGlzO3dpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Yy5jYWxsRXZlbnQoIm9uWExFIixbYyx0XSl9LDEpLHRoaXMueG1sc3RhdGU9MH10aGlzLnNraXBMb2NrPSExfXRoaXMucGFyc0NvdW50LS07dmFyIGM9dGhpcztyZXR1cm4gdGhpcy5fZWRzYnBzJiZ3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe2MuX2Rpc3RyaWJ1dGVkU3RlcCh0KX0sdGhpcy5fZWRzYnBzRCksIWkmJnRoaXMub25YTEUmJnRoaXMub25YTEUodGhpcyx0KSx0aGlzLm5vZGVBc2tpbmdDYWxsfX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX3JlZHJhd0Zyb209ZnVuY3Rpb24oZSx0LGksbil7aWYodClvPXQ7ZWxzZXt2YXIgbz1lLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKGUubGFzdExvYWRlZFhNTElkKTtpZihlLmxhc3RMb2FkZWRYTUxJZD0tMSwhbylyZXR1cm4gMH1mb3IodmFyIHI9MCxsPWk/aS0xOjA7bDxvLmNoaWxkc0NvdW50O2wrKylpZih0aGlzLl9icmFuY2hVcGRhdGUmJjEhPXRoaXMuX2dldE9wZW5TdGF0ZShvKXx8dCYmMSE9bnx8KG8uY2hpbGROb2Rlc1tsXS5odG1sTm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheT0iIiksMT09by5jaGlsZE5vZGVzW2xdLm9wZW5NZSYmKHRoaXMuX29wZW5JdGVtKG8uY2hpbGROb2Rlc1tsXSksby5jaGlsZE5vZGVzW2xdLm9wZW5NZT0wKSxlLl9yZWRyYXdGcm9tKGUsby5jaGlsZE5vZGVzW2xdKSxudWxsIT10aGlzLmNoaWxkQ2FsYyl7aWYoKG8uY2hpbGROb2Rlc1tsXS51blBhcnNlZHx8IW8uY2hpbGROb2Rlc1tsXS5YTUxsb2FkJiZ0aGlzLlhNTHNvdXJjZSkmJihvLmNoaWxkTm9kZXNbbF0uc3Bhbi5pbm5lckhUTUw9by5jaGlsZE5vZGVzW2xdLl9hY2M/by5jaGlsZE5vZGVzW2xdLmxhYmVsK3RoaXMuaHRtbGNBK28uY2hpbGROb2Rlc1tsXS5fYWNjK3RoaXMuaHRtbGNCOm8uY2hpbGROb2Rlc1tsXS5sYWJlbCksby5jaGlsZE5vZGVzW2xdLmNoaWxkTm9kZXMubGVuZ3RoJiZ0aGlzLmNoaWxkQ2FsYyl7aWYoMT09dGhpcy5jaGlsZENhbGMmJihvLmNoaWxkTm9kZXNbbF0uc3Bhbi5pbm5lckhUTUw9by5jaGlsZE5vZGVzW2xdLmxhYmVsK3RoaXMuaHRtbGNBK28uY2hpbGROb2Rlc1tsXS5jaGlsZHNDb3VudCt0aGlzLmh0bWxjQiksMj09dGhpcy5jaGlsZENhbGMpe3ZhciBzPW8uY2hpbGROb2Rlc1tsXS5jaGlsZHNDb3VudC0oby5jaGlsZE5vZGVzW2xdLnB1cmVDaGlsZHN8fDApO3MmJihvLmNoaWxkTm9kZXNbbF0uc3Bhbi5pbm5lckhUTUw9by5jaGlsZE5vZGVzW2xdLmxhYmVsK3RoaXMuaHRtbGNBK3MrdGhpcy5odG1sY0IpLG8ucHVyZUNoaWxkcz9vLnB1cmVDaGlsZHMrKzpvLnB1cmVDaGlsZHM9MX1pZigzPT10aGlzLmNoaWxkQ2FsYyYmKG8uY2hpbGROb2Rlc1tsXS5zcGFuLmlubmVySFRNTD1vLmNoaWxkTm9kZXNbbF0ubGFiZWwrdGhpcy5odG1sY0Erby5jaGlsZE5vZGVzW2xdLl9hY2MrdGhpcy5odG1sY0IpLDQ9PXRoaXMuY2hpbGRDYWxjKXt2YXIgcz1vLmNoaWxkTm9kZXNbbF0uX2FjYztzJiYoby5jaGlsZE5vZGVzW2xdLnNwYW4uaW5uZXJIVE1MPW8uY2hpbGROb2Rlc1tsXS5sYWJlbCt0aGlzLmh0bWxjQStzK3RoaXMuaHRtbGNCKX19ZWxzZSA0PT10aGlzLmNoaWxkQ2FsYyYmcisrO3IrPW8uY2hpbGROb2Rlc1tsXS5fYWNjLDM9PXRoaXMuY2hpbGRDYWxjJiZyKyt9by51blBhcnNlZHx8IW8uWE1MbG9hZCYmdGhpcy5YTUxzb3VyY2V8fChvLl9hY2M9ciksZS5fY29ycmVjdExpbmUobyksZS5fY29ycmVjdFBsdXMobyksdGhpcy5jaGlsZENhbGMmJiF0JiZlLl9maXhDaGlsZENvdW50TGFiZWwobyl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9jcmVhdGVTZWxmPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7cmV0dXJuIGUuY2xhc3NOYW1lPSJjb250YWluZXJUYWJsZVN0eWxlIixlLnN0eWxlLndpZHRoPXRoaXMud2lkdGgsZS5zdHlsZS5oZWlnaHQ9dGhpcy5oZWlnaHQsdGhpcy5wYXJlbnRPYmplY3QuYXBwZW5kQ2hpbGQoZSksZX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX3hjbG9zZUFsbD1mdW5jdGlvbihlKXtpZighZS51blBhcnNlZCl7aWYodGhpcy5yb290SWQhPWUuaWQpe2lmKCFlLmh0bWxOb2RlKXJldHVybjtmb3IodmFyIHQ9ZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXMsaT10Lmxlbmd0aCxuPTE7aT5uO24rKyl0W25dLnN0eWxlLmRpc3BsYXk9Im5vbmUiO3RoaXMuX2NvcnJlY3RQbHVzKGUpfWZvcih2YXIgbj0wO248ZS5jaGlsZHNDb3VudDtuKyspZS5jaGlsZE5vZGVzW25dLmNoaWxkc0NvdW50JiZ0aGlzLl94Y2xvc2VBbGwoZS5jaGlsZE5vZGVzW25dKX19LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl94b3BlbkFsbD1mdW5jdGlvbihlKXt0aGlzLl9IaWRlU2hvdyhlLDIpO2Zvcih2YXIgdD0wO3Q8ZS5jaGlsZHNDb3VudDt0KyspdGhpcy5feG9wZW5BbGwoZS5jaGlsZE5vZGVzW3RdKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2NvcnJlY3RQbHVzPWZ1bmN0aW9uKGUpe2lmKGUuaHRtbE5vZGUpe3ZhciB0PWUuaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0ubGFzdENoaWxkLGk9ZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1syXS5jaGlsZE5vZGVzWzBdLG49dGhpcy5saW5lQXJyYXk7aWYodGhpcy5YTUxzb3VyY2UmJiFlLlhNTGxvYWQpe3ZhciBuPXRoaXMucGx1c0FycmF5O2lmKHRoaXMuX3NldFNyYyhpLHRoaXMuaWNvblVSTCtlLmltYWdlc1syXSksdGhpcy5fdHh0aW1nKXJldHVybiB0LmlubmVySFRNTD0iWytdIn1lbHNlIGlmKGUuY2hpbGRzQ291bnR8fGUudW5QYXJzZWQpaWYoZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0mJiJub25lIiE9ZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0uc3R5bGUuZGlzcGxheSl7aWYoIWUud3NpZ24pdmFyIG49dGhpcy5taW51c0FycmF5O2lmKHRoaXMuX3NldFNyYyhpLHRoaXMuaWNvblVSTCtlLmltYWdlc1sxXSksdGhpcy5fdHh0aW1nKXJldHVybiB0LmlubmVySFRNTD0iWy1dIn1lbHNle2lmKCFlLndzaWduKXZhciBuPXRoaXMucGx1c0FycmF5O2lmKHRoaXMuX3NldFNyYyhpLHRoaXMuaWNvblVSTCtlLmltYWdlc1syXSksdGhpcy5fdHh0aW1nKXJldHVybiB0LmlubmVySFRNTD0iWytdIn1lbHNlIHRoaXMuX3NldFNyYyhpLHRoaXMuaWNvblVSTCtlLmltYWdlc1swXSk7dmFyIG89MjtlLnRyZWVOb2QudHJlZUxpbmVzT24/KGUucGFyZW50T2JqZWN0JiYobz10aGlzLl9nZXRDb3VudFN0YXR1cyhlLmlkLGUucGFyZW50T2JqZWN0KSksdGhpcy5fc2V0U3JjKHQsdGhpcy5pbVBhdGgrbltvXSkpOnRoaXMuX3NldFNyYyh0LHRoaXMuaW1QYXRoK25bM10pfX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2NvcnJlY3RMaW5lPWZ1bmN0aW9uKGUpe2lmKGUuaHRtbE5vZGUpe3ZhciB0PWUucGFyZW50T2JqZWN0O2lmKHQpaWYoMCE9dGhpcy5fZ2V0TGluZVN0YXR1cyhlLmlkLHQpJiZ0aGlzLnRyZWVMaW5lc09uKWZvcih2YXIgaT0xO2k8PWUuY2hpbGRzQ291bnQmJmUuaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzW2ldO2krKyllLmh0bWxOb2RlLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzWzBdLnN0eWxlLmJhY2tncm91bmRJbWFnZT0idXJsKCIrdGhpcy5pbVBhdGgrdGhpcy5saW5lQXJyYXlbNV0rIikiLGUuaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbMF0uc3R5bGUuYmFja2dyb3VuZFJlcGVhdD0icmVwZWF0LXkiO2Vsc2UgZm9yKHZhciBpPTE7aTw9ZS5jaGlsZHNDb3VudCYmZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbaV07aSsrKWUuaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbMF0uc3R5bGUuYmFja2dyb3VuZEltYWdlPSIiLGUuaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbMF0uc3R5bGUuYmFja2dyb3VuZFJlcGVhdD0iIn19LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9nZXRMaW5lU3RhdHVzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQuY2hpbGROb2Rlc1t0LmNoaWxkc0NvdW50LTFdLmlkPT1lPzA6MX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX0hpZGVTaG93PWZ1bmN0aW9uKGUsdCl7aWYoIXRoaXMuX2xvY2tlcnx8dGhpcy5za2lwTG9ja3x8IXRoaXMuX2xvY2tlcltlLmlkXSl7aWYodGhpcy5YTUxzb3VyY2UmJiFlLlhNTGxvYWQpe2lmKDE9PXQpcmV0dXJuO3JldHVybiBlLlhNTGxvYWQ9MSx0aGlzLl9sb2FkRHluWE1MKGUuaWQpLHZvaWQgMH1lLnVuUGFyc2VkJiZ0aGlzLnJlUGFyc2UoZSk7dmFyIGk9ZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXMsbj1pLmxlbmd0aDtpZihuPjEpeyJub25lIj09aVsxXS5zdHlsZS5kaXNwbGF5JiYxIT10fHwyPT10P25vZGVzdHlsZT0iIjoodGhpcy5hbGxUcmVlLmNoaWxkTm9kZXNbMF0uYm9yZGVyPSIxIix0aGlzLmFsbFRyZWUuY2hpbGROb2Rlc1swXS5ib3JkZXI9IjAiLG5vZGVzdHlsZT0ibm9uZSIpO2Zvcih2YXIgbz0xO24+bztvKyspaVtvXS5zdHlsZS5kaXNwbGF5PW5vZGVzdHlsZX10aGlzLl9jb3JyZWN0UGx1cyhlKX19LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9nZXRPcGVuU3RhdGU9ZnVuY3Rpb24oZSl7aWYoIWUuaHRtbE5vZGUpcmV0dXJuIDA7dmFyIHQ9ZS5odG1sTm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXM7cmV0dXJuIHQubGVuZ3RoPD0xPzA6Im5vbmUiIT10WzFdLnN0eWxlLmRpc3BsYXk/MTotMX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUub25Sb3dDbGljazI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnBhcmVudE9iamVjdC50cmVlTm9kO3JldHVybiBlLmNhbGxFdmVudCgib25EYmxDbGljayIsW3RoaXMucGFyZW50T2JqZWN0LmlkLGVdKT8odGhpcy5wYXJlbnRPYmplY3QuY2xvc2VibGUmJiIwIiE9dGhpcy5wYXJlbnRPYmplY3QuY2xvc2VibGU/ZS5fSGlkZVNob3codGhpcy5wYXJlbnRPYmplY3QpOmUuX0hpZGVTaG93KHRoaXMucGFyZW50T2JqZWN0LDIpLGUuY2hlY2tFdmVudCgib25PcGVuRW5kIikmJihlLnhtbHN0YXRlPyhlLl9vaWVfb25YTEUucHVzaChlLm9uWExFKSxlLm9uWExFPWUuX2VwbkZIZSk6ZS5jYWxsRXZlbnQoIm9uT3BlbkVuZCIsW3RoaXMucGFyZW50T2JqZWN0LmlkLGUuX2dldE9wZW5TdGF0ZSh0aGlzLnBhcmVudE9iamVjdCldKSksITEpOiExfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5vblJvd0NsaWNrPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wYXJlbnRPYmplY3QudHJlZU5vZDtyZXR1cm4gZS5jYWxsRXZlbnQoIm9uT3BlblN0YXJ0IixbdGhpcy5wYXJlbnRPYmplY3QuaWQsZS5fZ2V0T3BlblN0YXRlKHRoaXMucGFyZW50T2JqZWN0KV0pPyh0aGlzLnBhcmVudE9iamVjdC5jbG9zZWJsZSYmIjAiIT10aGlzLnBhcmVudE9iamVjdC5jbG9zZWJsZT9lLl9IaWRlU2hvdyh0aGlzLnBhcmVudE9iamVjdCk6ZS5fSGlkZVNob3codGhpcy5wYXJlbnRPYmplY3QsMiksZS5jaGVja0V2ZW50KCJvbk9wZW5FbmQiKSYmKGUueG1sc3RhdGU/KGUuX29pZV9vblhMRS5wdXNoKGUub25YTEUpLGUub25YTEU9ZS5fZXBuRkhlKTplLmNhbGxFdmVudCgib25PcGVuRW5kIixbdGhpcy5wYXJlbnRPYmplY3QuaWQsZS5fZ2V0T3BlblN0YXRlKHRoaXMucGFyZW50T2JqZWN0KV0pKSx2b2lkIDApOjB9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLmdldFNlbGVjdGVkSXRlbUlkPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPW5ldyBBcnJheSx0PTA7dDx0aGlzLl9zZWxlY3RlZC5sZW5ndGg7dCsrKWVbdF09dGhpcy5fc2VsZWN0ZWRbdF0uaWQ7cmV0dXJuIGUuam9pbih0aGlzLmRsbXRyKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX3NlbGVjdEl0ZW09ZnVuY3Rpb24oZSx0KXtpZih0aGlzLmNoZWNrRXZlbnQoIm9uU2VsZWN0IikmJih0aGlzLl9vblNTQ0ZvbGQ9dGhpcy5nZXRTZWxlY3RlZEl0ZW1JZCgpKSx0aGlzLl9hbXNlbCYmdCYmKHQuY3RybEtleXx8dC5tZXRhS2V5fHx0LnNoaWZ0S2V5KXx8dGhpcy5fdW5zZWxlY3RJdGVtcygpLGUuaV9zZWwmJnRoaXMuX2Ftc2VsJiZ0JiYodC5jdHJsS2V5fHx0Lm1ldGFLZXkpKXRoaXMuX3Vuc2VsZWN0SXRlbShlKTtlbHNlIGlmKCEoZS5pX3NlbHx8dGhpcy5fYW1zZWxTJiYwIT10aGlzLl9zZWxlY3RlZC5sZW5ndGgmJnRoaXMuX3NlbGVjdGVkWzBdLnBhcmVudE9iamVjdCE9ZS5wYXJlbnRPYmplY3QpKWlmKHRoaXMuX2Ftc2VsJiZ0JiZ0LnNoaWZ0S2V5JiYwIT10aGlzLl9zZWxlY3RlZC5sZW5ndGgmJnRoaXMuX3NlbGVjdGVkW3RoaXMuX3NlbGVjdGVkLmxlbmd0aC0xXS5wYXJlbnRPYmplY3Q9PWUucGFyZW50T2JqZWN0KXt2YXIgaT10aGlzLl9nZXRJbmRleCh0aGlzLl9zZWxlY3RlZFt0aGlzLl9zZWxlY3RlZC5sZW5ndGgtMV0pLG49dGhpcy5fZ2V0SW5kZXgoZSk7aWYoaT5uKXt2YXIgbz1pO2k9bixuPW99Zm9yKHZhciByPWk7bj49cjtyKyspZS5wYXJlbnRPYmplY3QuY2hpbGROb2Rlc1tyXS5pX3NlbHx8dGhpcy5fbWFya0l0ZW0oZS5wYXJlbnRPYmplY3QuY2hpbGROb2Rlc1tyXSl9ZWxzZSB0aGlzLl9tYXJrSXRlbShlKTtpZih0aGlzLmNoZWNrRXZlbnQoIm9uU2VsZWN0Iikpe3ZhciBsPXRoaXMuZ2V0U2VsZWN0ZWRJdGVtSWQoKTtsIT10aGlzLl9vblNTQ0ZvbGQmJnRoaXMuY2FsbEV2ZW50KCJvblNlbGVjdCIsW2xdKX19LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9tYXJrSXRlbT1mdW5jdGlvbihlKXtlLnNjb2xvciYmKGUuc3Bhbi5zdHlsZS5jb2xvcj1lLnNjb2xvciksZS5zcGFuLmNsYXNzTmFtZT0ic2VsZWN0ZWRUcmVlUm93IixlLnNwYW4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZT0ic2VsZWN0ZWRUcmVlUm93RnVsbCIsZS5pX3NlbD0hMCx0aGlzLl9zZWxlY3RlZFt0aGlzLl9zZWxlY3RlZC5sZW5ndGhdPWV9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLmdldEluZGV4QnlJZD1mdW5jdGlvbihlKXt2YXIgdD10aGlzLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKGUpO3JldHVybiB0P3RoaXMuX2dldEluZGV4KHQpOm51bGx9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9nZXRJbmRleD1mdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5wYXJlbnRPYmplY3QsaT0wO2k8dC5jaGlsZHNDb3VudDtpKyspaWYodC5jaGlsZE5vZGVzW2ldPT1lKXJldHVybiBpfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5fdW5zZWxlY3RJdGVtPWZ1bmN0aW9uKGUpe2lmKGUmJmUuaV9zZWwpe2Uuc3Bhbi5jbGFzc05hbWU9InN0YW5kYXJ0VHJlZVJvdyIsZS5zcGFuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWU9IiIsZS5hY29sb3ImJihlLnNwYW4uc3R5bGUuY29sb3I9ZS5hY29sb3IpLGUuaV9zZWw9ITE7Zm9yKHZhciB0PTA7dDx0aGlzLl9zZWxlY3RlZC5sZW5ndGg7dCsrKWlmKCF0aGlzLl9zZWxlY3RlZFt0XS5pX3NlbCl7dGhpcy5fc2VsZWN0ZWQuc3BsaWNlKHQsMSk7YnJlYWt9fX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX3Vuc2VsZWN0SXRlbXM9ZnVuY3Rpb24oKXtmb3IodmFyIGU9MDtlPHRoaXMuX3NlbGVjdGVkLmxlbmd0aDtlKyspe3ZhciB0PXRoaXMuX3NlbGVjdGVkW2VdO3Quc3Bhbi5jbGFzc05hbWU9InN0YW5kYXJ0VHJlZVJvdyIsdC5zcGFuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWU9IiIsdC5hY29sb3ImJih0LnNwYW4uc3R5bGUuY29sb3I9dC5hY29sb3IpLHQuaV9zZWw9ITF9dGhpcy5fc2VsZWN0ZWQ9bmV3IEFycmF5fSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5vblJvd1NlbGVjdD1mdW5jdGlvbihlLHQsaSl7ZT1lfHx3aW5kb3cuZXZlbnQ7dmFyIG49dGhpcy5wYXJlbnRPYmplY3Q7dCYmKG49dC5wYXJlbnRPYmplY3QpO3ZhciBvPW4udHJlZU5vZCxyPW8uZ2V0U2VsZWN0ZWRJdGVtSWQoKTtlJiZlLnNraXBVblNlbHx8by5fc2VsZWN0SXRlbShuLGUpLGl8fChuLmFjdGlvbkhhbmRsZXI/bi5hY3Rpb25IYW5kbGVyKG4uaWQscik6by5jYWxsRXZlbnQoIm9uQ2xpY2siLFtuLmlkLHJdKSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLl9jcmVhdGVJdGVtPWZ1bmN0aW9uKGUsdCxpKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0YWJsZSIpO24uY2VsbFNwYWNpbmc9MCxuLmNlbGxQYWRkaW5nPTAsbi5ib3JkZXI9MCx0aGlzLmhmTW9kZSYmKG4uc3R5bGUudGFibGVMYXlvdXQ9ImZpeGVkIiksbi5zdHlsZS5tYXJnaW49MCxuLnN0eWxlLnBhZGRpbmc9MDt2YXIgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0Ym9keSIpLHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgidHIiKSxsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInRkIik7aWYobC5jbGFzc05hbWU9InN0YW5kYXJ0VHJlZUltYWdlIix0aGlzLl90eHRpbWcpe3ZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImRpdiIpO2wuYXBwZW5kQ2hpbGQocykscy5jbGFzc05hbWU9ImRoeF90cmVlX3RleHRTaWduIn1lbHNle3ZhciBzPXRoaXMuX2dldEltZyh0LmlkKTtzLmJvcmRlcj0iMCIsIklNRyI9PXMudGFnTmFtZSYmKHMuYWxpZ249ImFic21pZGRsZSIpLGwuYXBwZW5kQ2hpbGQocykscy5zdHlsZS5wYWRkaW5nPTAscy5zdHlsZS5tYXJnaW49MCxzLnN0eWxlLndpZHRoPXRoaXMuZGVmX2xpbmVfaW1nX3h9dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgidGQiKSxkPXRoaXMuX2dldEltZyh0aGlzLmNCUk9mP3RoaXMucm9vdElkOnQuaWQpO2QuY2hlY2tlZD0wLHRoaXMuX3NldFNyYyhkLHRoaXMuaW1QYXRoK3RoaXMuY2hlY2tBcnJheVswXSksZC5zdHlsZS53aWR0aD0iMThweCIsZC5zdHlsZS5oZWlnaHQ9IjE4cHgiLGV8fChhLnN0eWxlLmRpc3BsYXk9Im5vbmUiKSxhLmFwcGVuZENoaWxkKGQpLHRoaXMuY0JST2Z8fCJJTUciIT1kLnRhZ05hbWV8fChkLmFsaWduPSJhYnNtaWRkbGUiKSxkLm9uY2xpY2s9dGhpcy5vbkNoZWNrQm94Q2xpY2ssZC50cmVlTm9kPXRoaXMsZC5wYXJlbnRPYmplY3Q9dCxhLndpZHRoPXdpbmRvdy5fS0hUTUxydj8iMTZweCI6IjIwcHgiO3ZhciBoPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInRkIik7aC5jbGFzc05hbWU9InN0YW5kYXJ0VHJlZUltYWdlIjt2YXIgYz10aGlzLl9nZXRJbWcodGhpcy50aW1nZW4/dC5pZDp0aGlzLnJvb3RJZCk7Yy5vbm1vdXNlZG93bj10aGlzLl9wcmV2ZW50TnNEcmFnLGMub25kcmFnc3RhcnQ9dGhpcy5fcHJldmVudE5zRHJhZyxjLmJvcmRlcj0iMCIsdGhpcy5fYWltZ3MmJihjLnBhcmVudE9iamVjdD10LCJJTUciPT1jLnRhZ05hbWUmJihjLmFsaWduPSJhYnNtaWRkbGUiKSxjLm9uY2xpY2s9dGhpcy5vblJvd1NlbGVjdCksaXx8dGhpcy5fc2V0U3JjKGMsdGhpcy5pY29uVVJMK3RoaXMuaW1hZ2VBcnJheVswXSksaC5hcHBlbmRDaGlsZChjKSxjLnN0eWxlLnBhZGRpbmc9MCxjLnN0eWxlLm1hcmdpbj0wLHRoaXMudGltZ2VuPyhoLnN0eWxlLndpZHRoPWMuc3R5bGUud2lkdGg9dGhpcy5kZWZfaW1nX3gsYy5zdHlsZS5oZWlnaHQ9dGhpcy5kZWZfaW1nX3kpOihjLnN0eWxlLndpZHRoPSIwcHgiLGMuc3R5bGUuaGVpZ2h0PSIwcHgiLChfaXNPcGVyYXx8d2luZG93Ll9LSFRNTHJ2KSYmKGguc3R5bGUuZGlzcGxheT0ibm9uZSIpKTsKdmFyIHU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgidGQiKTtyZXR1cm4gdS5jbGFzc05hbWU9ImRoeFRleHRDZWxsIHN0YW5kYXJ0VHJlZVJvdyIsdC5zcGFuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNwYW4iKSx0LnNwYW4uY2xhc3NOYW1lPSJzdGFuZGFydFRyZWVSb3ciLHRoaXMubWxpdGVtcz8odC5zcGFuLnN0eWxlLndpZHRoPXRoaXMubWxpdGVtcyx0LnNwYW4uc3R5bGUuZGlzcGxheT0iYmxvY2siKTp1Lm5vV3JhcD0hMCxkaHg0LmlzSUU4P3Uuc3R5bGUud2lkdGg9Ijk5OTk5cHgiOndpbmRvdy5fS0hUTUxydnx8KHUuc3R5bGUud2lkdGg9IjEwMCUiKSx0LnNwYW4uaW5uZXJIVE1MPXQubGFiZWwsdS5hcHBlbmRDaGlsZCh0LnNwYW4pLHUucGFyZW50T2JqZWN0PXQsbC5wYXJlbnRPYmplY3Q9dCx1Lm9uY2xpY2s9dGhpcy5vblJvd1NlbGVjdCxsLm9uY2xpY2s9dGhpcy5vblJvd0NsaWNrLHUub25kYmxjbGljaz10aGlzLm9uUm93Q2xpY2syLHRoaXMuZXR0aXAmJihyLnRpdGxlPXQubGFiZWwpLHRoaXMuZHJhZ0FuZERyb3BPZmYmJih0aGlzLl9haW1ncyYmKHRoaXMuZHJhZ2dlci5hZGREcmFnZ2FibGVJdGVtKGgsdGhpcyksaC5wYXJlbnRPYmplY3Q9dCksdGhpcy5kcmFnZ2VyLmFkZERyYWdnYWJsZUl0ZW0odSx0aGlzKSksdC5zcGFuLnN0eWxlLnBhZGRpbmdMZWZ0PSI1cHgiLHQuc3Bhbi5zdHlsZS5wYWRkaW5nUmlnaHQ9IjVweCIsdS5zdHlsZS52ZXJ0aWNhbEFsaWduPSIiLHUuc3R5bGUuZm9udFNpemU9IjEwcHQiLHUuc3R5bGUuY3Vyc29yPXRoaXMuc3R5bGVfcG9pbnRlcixyLmFwcGVuZENoaWxkKGwpLHIuYXBwZW5kQ2hpbGQoYSksci5hcHBlbmRDaGlsZChoKSxyLmFwcGVuZENoaWxkKHUpLG8uYXBwZW5kQ2hpbGQociksbi5hcHBlbmRDaGlsZChvKSwodGhpcy5laGx0fHx0aGlzLmNoZWNrRXZlbnQoIm9uTW91c2VJbiIpfHx0aGlzLmNoZWNrRXZlbnQoIm9uTW91c2VPdXQiKSkmJihyLm9ubW91c2Vtb3ZlPXRoaXMuX2l0ZW1Nb3VzZUluLHJbX2lzSUU/Im9ubW91c2VsZWF2ZSI6Im9ubW91c2VvdXQiXT10aGlzLl9pdGVtTW91c2VPdXQpLG59LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLnNldE9uUmlnaHRDbGlja0hhbmRsZXI9ZnVuY3Rpb24oZSl7dGhpcy5hdHRhY2hFdmVudCgib25SaWdodENsaWNrIixlKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuc2V0T25DbGlja0hhbmRsZXI9ZnVuY3Rpb24oZSl7dGhpcy5hdHRhY2hFdmVudCgib25DbGljayIsZSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLnNldE9uU2VsZWN0U3RhdGVDaGFuZ2U9ZnVuY3Rpb24oZSl7dGhpcy5hdHRhY2hFdmVudCgib25TZWxlY3QiLGUpfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5zZXRYTUxBdXRvTG9hZGluZz1mdW5jdGlvbihlKXt0aGlzLlhNTHNvdXJjZT1lfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5zZXRPbkNoZWNrSGFuZGxlcj1mdW5jdGlvbihlKXt0aGlzLmF0dGFjaEV2ZW50KCJvbkNoZWNrIixlKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuc2V0T25PcGVuSGFuZGxlcj1mdW5jdGlvbihlKXt0aGlzLmF0dGFjaEV2ZW50KCJvbk9wZW5TdGFydCIsZSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLnNldE9uT3BlblN0YXJ0SGFuZGxlcj1mdW5jdGlvbihlKXt0aGlzLmF0dGFjaEV2ZW50KCJvbk9wZW5TdGFydCIsZSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLnNldE9uT3BlbkVuZEhhbmRsZXI9ZnVuY3Rpb24oZSl7dGhpcy5hdHRhY2hFdmVudCgib25PcGVuRW5kIixlKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuc2V0T25EYmxDbGlja0hhbmRsZXI9ZnVuY3Rpb24oZSl7dGhpcy5hdHRhY2hFdmVudCgib25EYmxDbGljayIsZSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLm9wZW5BbGxJdGVtcz1mdW5jdGlvbihlKXt2YXIgdD10aGlzLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKGUpO3JldHVybiB0Pyh0aGlzLl94b3BlbkFsbCh0KSx2b2lkIDApOjB9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLmdldE9wZW5TdGF0ZT1mdW5jdGlvbihlKXt2YXIgdD10aGlzLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKGUpO3JldHVybiB0P3RoaXMuX2dldE9wZW5TdGF0ZSh0KToiIn0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuY2xvc2VBbGxJdGVtcz1mdW5jdGlvbihlKXtlPT09d2luZG93LnVuZGVmaW5lZCYmKGU9dGhpcy5yb290SWQpO3ZhciB0PXRoaXMuX2dsb2JhbElkU3RvcmFnZUZpbmQoZSk7cmV0dXJuIHQ/KHRoaXMuX3hjbG9zZUFsbCh0KSx0aGlzLmFsbFRyZWUuY2hpbGROb2Rlc1swXS5ib3JkZXI9IjEiLHRoaXMuYWxsVHJlZS5jaGlsZE5vZGVzWzBdLmJvcmRlcj0iMCIsdm9pZCAwKTowfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5zZXRVc2VyRGF0YT1mdW5jdGlvbihlLHQsaSl7dmFyIG49dGhpcy5fZ2xvYmFsSWRTdG9yYWdlRmluZChlLDAsITApO24mJigiaGludCI9PXQmJihuLmh0bWxOb2RlLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS50aXRsZT1pKSwidW5kZWZpbmVkIj09dHlwZW9mIG4udXNlckRhdGFbInRfIit0XSYmKG4uX3VzZXJkYXRhbGlzdD9uLl91c2VyZGF0YWxpc3QrPSIsIit0Om4uX3VzZXJkYXRhbGlzdD10KSxuLnVzZXJEYXRhWyJ0XyIrdF09aSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLmdldFVzZXJEYXRhPWZ1bmN0aW9uKGUsdCl7dmFyIGk9dGhpcy5fZ2xvYmFsSWRTdG9yYWdlRmluZChlLDAsITApO2lmKGkpcmV0dXJuIGkudXNlckRhdGFbInRfIit0XX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuZ2V0SXRlbUNvbG9yPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuX2dsb2JhbElkU3RvcmFnZUZpbmQoZSk7aWYoIXQpcmV0dXJuIDA7dmFyIGk9bmV3IE9iamVjdDtyZXR1cm4gdC5hY29sb3ImJihpLmFjb2xvcj10LmFjb2xvciksdC5zY29sb3ImJihpLnNjb2xvcj10LnNjb2xvciksaX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuc2V0SXRlbUNvbG9yPWZ1bmN0aW9uKGUsdCxpKXtpZihlJiZlLnNwYW4pdmFyIG49ZTtlbHNlIHZhciBuPXRoaXMuX2dsb2JhbElkU3RvcmFnZUZpbmQoZSk7cmV0dXJuIG4/KG4uaV9zZWw/KGl8fHQpJiYobi5zcGFuLnN0eWxlLmNvbG9yPWl8fHQpOnQmJihuLnNwYW4uc3R5bGUuY29sb3I9dCksaSYmKG4uc2NvbG9yPWkpLHQmJihuLmFjb2xvcj10KSx2b2lkIDApOjB9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLnNldE9uTW91c2VJbkhhbmRsZXI9ZnVuY3Rpb24oZSl7dGhpcy5laGx0PSEwLHRoaXMuYXR0YWNoRXZlbnQoIm9uTW91c2VJbiIsZSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLnNldE9uTW91c2VPdXRIYW5kbGVyPWZ1bmN0aW9uKGUpe3RoaXMuZWhsdD0hMCx0aGlzLmF0dGFjaEV2ZW50KCJvbk1vdXNlT3V0IixlKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuZW5hYmxlVHJlZUxpbmVzPWZ1bmN0aW9uKGUpe3RoaXMudHJlZUxpbmVzT249ZGh4NC5zMmIoZSl9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLm9wZW5JdGVtPWZ1bmN0aW9uKGUpe3RoaXMuc2tpcExvY2s9ITA7dmFyIHQ9dGhpcy5fZ2xvYmFsSWRTdG9yYWdlRmluZChlKTtyZXR1cm4gdD90aGlzLl9vcGVuSXRlbSh0KTowfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5fb3Blbkl0ZW09ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5fZ2V0T3BlblN0YXRlKGUpO2lmKDA+dHx8dGhpcy5YTUxzb3VyY2UmJiFlLlhNTGxvYWQpe2lmKCF0aGlzLmNhbGxFdmVudCgib25PcGVuU3RhcnQiLFtlLmlkLHRdKSlyZXR1cm4gMDt0aGlzLl9IaWRlU2hvdyhlLDIpLHRoaXMuY2hlY2tFdmVudCgib25PcGVuRW5kIikmJih0aGlzLm9uWExFPT10aGlzLl9lcG5GSGUmJnRoaXMuX2VwbkZIZSh0aGlzLGUuaWQsITApLHRoaXMueG1sc3RhdGUmJnRoaXMuWE1Mc291cmNlPyh0aGlzLl9vaWVfb25YTEUucHVzaCh0aGlzLm9uWExFKSx0aGlzLm9uWExFPXRoaXMuX2VwbkZIZSk6dGhpcy5jYWxsRXZlbnQoIm9uT3BlbkVuZCIsW2UuaWQsdGhpcy5fZ2V0T3BlblN0YXRlKGUpXSkpfWVsc2UgdGhpcy5fc3JuZCYmdGhpcy5fSGlkZVNob3coZSwyKTtlLnBhcmVudE9iamVjdCYmIXRoaXMuX3NraXBfb3Blbl9wYXJlbnQmJnRoaXMuX29wZW5JdGVtKGUucGFyZW50T2JqZWN0KX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2dldEFsbEZhdEl0ZW1zPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0iIixpPTA7aTxlLmNoaWxkc0NvdW50O2krKylpZihlLmNoaWxkTm9kZXNbaV0udW5QYXJzZWR8fGUuY2hpbGROb2Rlc1tpXS5jaGlsZHNDb3VudD4wKXtpZih0P3QrPXRoaXMuZGxtdHIrZS5jaGlsZE5vZGVzW2ldLmlkOnQ9IiIrZS5jaGlsZE5vZGVzW2ldLmlkLGUuY2hpbGROb2Rlc1tpXS51blBhcnNlZCl2YXIgbj10aGlzLl9nZXRBbGxGYXRJdGVtc1hNTChlLmNoaWxkTm9kZXNbaV0udW5QYXJzZWQsMSk7ZWxzZSB2YXIgbj10aGlzLl9nZXRBbGxGYXRJdGVtcyhlLmNoaWxkTm9kZXNbaV0pO24mJih0Kz10aGlzLmRsbXRyK24pfXJldHVybiB0fSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5zZWxlY3RJdGVtPWZ1bmN0aW9uKGUsdCxpKXt0PWRoeDQuczJiKHQpO3ZhciBuPXRoaXMuX2dsb2JhbElkU3RvcmFnZUZpbmQoZSk7aWYoIW58fCFuLnBhcmVudE9iamVjdClyZXR1cm4gMDt0aGlzLlhNTGxvYWRpbmdXYXJuaW5nP24ucGFyZW50T2JqZWN0Lm9wZW5NZT0xOnRoaXMuX29wZW5JdGVtKG4ucGFyZW50T2JqZWN0KTt2YXIgbz1udWxsO2kmJihvPW5ldyBPYmplY3Qsby5jdHJsS2V5PSEwLG4uaV9zZWwmJihvLnNraXBVblNlbD0hMCkpLHQ/dGhpcy5vblJvd1NlbGVjdChvLG4uaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbM10sITEpOnRoaXMub25Sb3dTZWxlY3QobyxuLmh0bWxOb2RlLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzNdLCEwKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2NvbXByZXNzQ2hpbGRMaXN0PWZ1bmN0aW9uKGUsdCl7ZS0tO2Zvcih2YXIgaT0wO2U+aTtpKyspMD09dFtpXSYmKHRbaV09dFtpKzFdLHRbaSsxXT0wKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2RlbGV0ZU5vZGU9ZnVuY3Rpb24oZSx0LGkpe2lmKCF0fHwhdC5wYXJlbnRPYmplY3QpcmV0dXJuIDA7dmFyIG49MCxvPTA7dC50ci5uZXh0U2libGluZyYmKG49dC50ci5uZXh0U2libGluZy5ub2RlbSksdC50ci5wcmV2aW91c1NpYmxpbmcmJihvPXQudHIucHJldmlvdXNTaWJsaW5nLm5vZGVtKTtmb3IodmFyIHI9dC5wYXJlbnRPYmplY3QsbD1yLmNoaWxkc0NvdW50LHM9ci5jaGlsZE5vZGVzLGE9MDtsPmE7YSsrKWlmKHNbYV0uaWQ9PWUpe2l8fHIuaHRtbE5vZGUuY2hpbGROb2Rlc1swXS5yZW1vdmVDaGlsZChzW2FdLnRyKSxzW2FdPTA7YnJlYWt9dGhpcy5fY29tcHJlc3NDaGlsZExpc3QobCxzKSxpfHxyLmNoaWxkc0NvdW50LS0sbiYmKHRoaXMuX2NvcnJlY3RQbHVzKG4pLHRoaXMuX2NvcnJlY3RMaW5lKG4pKSxvJiYodGhpcy5fY29ycmVjdFBsdXMobyksdGhpcy5fY29ycmVjdExpbmUobykpLHRoaXMudHNjaGVjayYmdGhpcy5fY29ycmVjdENoZWNrU3RhdGVzKHIpLGl8fHRoaXMuX2dsb2JhbElkU3RvcmFnZVJlY1N1Yih0KX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuZGVsZXRlQ2hpbGRJdGVtcz1mdW5jdGlvbihlKXt2YXIgdD10aGlzLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKGUpO2lmKHQpZm9yKHZhciBpPXQuY2hpbGRzQ291bnQsbj0wO2k+bjtuKyspdGhpcy5fZGVsZXRlTm9kZSh0LmNoaWxkTm9kZXNbMF0uaWQsdC5jaGlsZE5vZGVzWzBdKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2dsb2JhbElkU3RvcmFnZVJlY1N1Yj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9MDt0PGUuY2hpbGRzQ291bnQ7dCsrKXRoaXMuX2dsb2JhbElkU3RvcmFnZVJlY1N1YihlLmNoaWxkTm9kZXNbdF0pLHRoaXMuX2dsb2JhbElkU3RvcmFnZVN1YihlLmNoaWxkTm9kZXNbdF0uaWQpO3RoaXMuX2dsb2JhbElkU3RvcmFnZVN1YihlLmlkKTt2YXIgaT1lO2kuc3Bhbj1udWxsLGkudHIubm9kZW09bnVsbCxpLnRyPW51bGwsaS5odG1sTm9kZT1udWxsfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5fYXV0b1Njcm9sbD1mdW5jdGlvbihlLHQsaSl7dGhpcy5hdXRvU2Nyb2xsJiYoZSYmKHQ9ZGh4NC5hYnNUb3AoZSksaT1kaHg0LmFic1RvcCh0aGlzLmFsbFRyZWUpLXRoaXMuYWxsVHJlZS5zY3JvbGxUb3ApLHQtaS1wYXJzZUludCh0aGlzLmFsbFRyZWUuc2Nyb2xsVG9wKT5wYXJzZUludCh0aGlzLmFsbFRyZWUub2Zmc2V0SGVpZ2h0KS01MCYmKHRoaXMuYWxsVHJlZS5zY3JvbGxUb3A9cGFyc2VJbnQodGhpcy5hbGxUcmVlLnNjcm9sbFRvcCkrMjApLHQtaTxwYXJzZUludCh0aGlzLmFsbFRyZWUuc2Nyb2xsVG9wKSszMCYmKHRoaXMuYWxsVHJlZS5zY3JvbGxUb3A9cGFyc2VJbnQodGhpcy5hbGxUcmVlLnNjcm9sbFRvcCktMjApKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuZW5hYmxlVGV4dFNpZ25zPWZ1bmN0aW9uKGUpe3RoaXMuX3R4dGltZz1kaHg0LnMyYihlKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUucHJldmVudElFQ2FjaGluZz1mdW5jdGlvbihlKXtkaHg0LmFqYXguY2FjaGU9IWV9LGRodG1sWFRyZWVPYmplY3QucHJvdG90eXBlLnByZXZlbnRJRUNhc2hpbmc9ZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUucHJldmVudElFQ2FjaGluZyxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5zZXRJY29uU2l6ZT1mdW5jdGlvbihlLHQsaSl7aWYoaSl7aWYoaSYmaS5zcGFuKXZhciBuPWk7ZWxzZSB2YXIgbj10aGlzLl9nbG9iYWxJZFN0b3JhZ2VGaW5kKGkpO2lmKCFuKXJldHVybiAwO3ZhciBvPW4uc3Bhbi5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5jaGlsZE5vZGVzWzBdO2UmJihvLnN0eWxlLndpZHRoPWUrInB4Iix3aW5kb3cuX0tIVE1McnYmJihvLnBhcmVudE5vZGUuc3R5bGUud2lkdGg9ZSsicHgiKSksdCYmKG8uc3R5bGUuaGVpZ2h0PXQrInB4Iix3aW5kb3cuX0tIVE1McnYmJihvLnBhcmVudE5vZGUuc3R5bGUuaGVpZ2h0PXQrInB4IikpfWVsc2UgdGhpcy5kZWZfaW1nX3g9ZSsicHgiLHRoaXMuZGVmX2ltZ195PXQrInB4In0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuZW5hYmxlU2luZ2xlUmFkaW9Nb2RlPWZ1bmN0aW9uKGUpe3RoaXMuX2ZyYnRycz1kaHg0LnMyYihlKX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUub3Blbk9uSXRlbUFkZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX2hBZEk9IWRoeDQuczJiKGUpfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5vcGVuT25JdGVtQWRkaW5nPWZ1bmN0aW9uKGUpe3RoaXMuX2hBZEk9IWRoeDQuczJiKGUpfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5nZXRBbGxJdGVtc1dpdGhLaWRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2dldEFsbEZhdEl0ZW1zKHRoaXMuaHRtbE5vZGUpfSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5zZXRTa2luPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGFyZW50T2JqZWN0LmNsYXNzTmFtZS5yZXBsYWNlKC9kaHh0cmVlX1teIF0qL2dpLCIiKTt0aGlzLnBhcmVudE9iamVjdC5jbGFzc05hbWU9dCsiIGRoeHRyZWVfIitlLCgiZGh4X3RlcnJhY2UiPT1lfHwiZGh4X3dlYiI9PWV8fCJtYXRlcmlhbCI9PWUpJiZ0aGlzLmVuYWJsZVRyZWVMaW5lcyghMSksIm1hdGVyaWFsIj09ZSYmdGhpcy5zZXRJY29uU2l6ZSgiMjUiLCIyNSIpfSxqc29uUG9pbnRlci5wcm90b3R5cGU9e3RleHQ6ZnVuY3Rpb24oKXt2YXIgZT1mdW5jdGlvbihlKXtmb3IodmFyIGk9W10sbj0wO248ZS5sZW5ndGg7bisrKWkucHVzaCgieyIrdChlW25dKSsifSIpO3JldHVybiBpLmpvaW4oIiwiKX0sdD1mdW5jdGlvbihpKXt2YXIgbj1bXTtmb3IodmFyIG8gaW4gaSkib2JqZWN0Ij09dHlwZW9mIGlbb10/by5sZW5ndGg/bi5wdXNoKCciJytvKyciOlsnK2UoaVtvXSkrIl0iKTpuLnB1c2goJyInK28rJyI6eycrdChpW29dKSsifSIpOm4ucHVzaCgnIicrbysnIjoiJytpW29dKyciJyk7cmV0dXJuIG4uam9pbigiLCIpfTtyZXR1cm4ieyIrdCh0aGlzLmQpKyJ9In0sZ2V0OmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRbZV19LGV4aXN0czpmdW5jdGlvbigpe3JldHVybiEhdGhpcy5kfSxjb250ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZC5jb250ZW50fSxlYWNoOmZ1bmN0aW9uKGUsdCxpKXt2YXIgbj10aGlzLmRbZV0sbz1uZXcganNvblBvaW50ZXI7aWYobilmb3IodmFyIHI9MDtyPG4ubGVuZ3RoO3IrKylvLmQ9bltyXSx0LmFwcGx5KGksW28scl0pfSxnZXRfYWxsOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZH0sc3ViOmZ1bmN0aW9uKGUpe3JldHVybiBuZXcganNvblBvaW50ZXIodGhpcy5kW2VdLHRoaXMuZCl9LHN1Yl9leGlzdHM6ZnVuY3Rpb24oZSl7cmV0dXJuISF0aGlzLmRbZV19LGVhY2hfeDpmdW5jdGlvbihlLHQsaSxuLG8pe3ZhciByPXRoaXMuZFtlXSxsPW5ldyBqc29uUG9pbnRlcigwLHRoaXMuZCk7aWYocilmb3Iobz1vfHwwO288ci5sZW5ndGg7bysrKWlmKHJbb11bdF0mJihsLmQ9cltvXSwtMT09aS5hcHBseShuLFtsLG9dKSkpcmV0dXJufSx1cDpmdW5jdGlvbigpe3JldHVybiBuZXcganNvblBvaW50ZXIodGhpcy5kcCx0aGlzLmQpfSxzZXQ6ZnVuY3Rpb24oZSx0KXt0aGlzLmRbZV09dH0sY2xvbmU6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGpzb25Qb2ludGVyKHRoaXMuZCx0aGlzLmRwKX0sdGhyb3VnaDpmdW5jdGlvbihlLHQsaSxuLG8pe3ZhciByPXRoaXMuZFtlXTtpZihyLmxlbmd0aClmb3IodmFyIGw9MDtsPHIubGVuZ3RoO2wrKyl7aWYobnVsbCE9cltsXVt0XSYmIiIhPXJbbF1bdF0mJighaXx8cltsXVt0XT09aSkpe3ZhciBzPW5ldyBqc29uUG9pbnRlcihyW2xdLHRoaXMuZCk7bi5hcHBseShvLFtzLGxdKX12YXIgYT10aGlzLmQ7dGhpcy5kPXJbbF0sdGhpcy5zdWJfZXhpc3RzKGUpJiZ0aGlzLnRocm91Z2goZSx0LGksbixvKSx0aGlzLmQ9YX19fSxkaHRtbFhUcmVlT2JqZWN0LnByb3RvdHlwZS5sb2FkSlNPTk9iamVjdD1mdW5jdGlvbihlLHQpe3JldHVybiB3aW5kb3cuY29uc29sZSYmd2luZG93LmNvbnNvbGUuaW5mbyYmd2luZG93LmNvbnNvbGUuaW5mbygibG9hZEpTT05PYmplY3Qgd2FzIGRlcHJlY2F0ZWQiLCJodHRwOi8vZG9jcy5kaHRtbHguY29tL21pZ3JhdGlvbl9faW5kZXguaHRtbCNtaWdyYXRpb25mcm9tNDN0bzQ0IiksdGhpcy5fbG9hZEpTT05PYmplY3QoZSx0KX0sZGh0bWxYVHJlZU9iamVjdC5wcm90b3R5cGUuX2xvYWRKU09OT2JqZWN0PWZ1bmN0aW9uKGUsdCl7dGhpcy5wYXJzQ291bnR8fHRoaXMuY2FsbEV2ZW50KCJvblhMUyIsW3RoaXMsbnVsbF0pLHRoaXMueG1sc3RhdGU9MTt2YXIgaT1uZXcganNvblBvaW50ZXIoZSk7dGhpcy5fcGFyc2UoaSksdGhpcy5fcD1pLHQmJnQoKX0sd2luZG93LmFkZEV2ZW50TGlzdGVuZXI/d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoImxvYWQiLGRoeF9pbml0X3RyZWVzLCExKTp3aW5kb3cuYXR0YWNoRXZlbnQmJndpbmRvdy5hdHRhY2hFdmVudCgib25sb2FkIixkaHhfaW5pdF90cmVlcyk7dmFyIHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInN0eWxlIik7c3R5bGUuaW5uZXJIVE1MPSdAa2V5ZnJhbWVzIGRoeF9sb2FkZXJfcm90YXRlezEwMCV7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO319QGtleWZyYW1lcyBkaHhfbG9hZGVyX2Rhc2h7MCV7c3Ryb2tlLWRhc2hhcnJheToxLDIwMDtzdHJva2UtZGFzaG9mZnNldDowO301MCV7c3Ryb2tlLWRhc2hhcnJheTo4OSwyMDA7c3Ryb2tlLWRhc2hvZmZzZXQ6LTM1cHg7fTEwMCV7c3Ryb2tlLWRhc2hhcnJheTo4OSwyMDA7c3Ryb2tlLWRhc2hvZmZzZXQ6LTEyNHB4O319LmRodG1seE1lbnVfbWF0ZXJpYWxfTWlkZGxle3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoyOHB4O2xpbmUtaGVpZ2h0OjI4cHg7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O292ZXJmbG93OmhpZGRlbjtib3JkZXI6bm9uZTtmb250LXNpemU6MTRweDtmb250LWZhbWlseTpSb2JvdG8sQXJpYWwsSGVsdmV0aWNhO2NvbG9yOiM0MDQwNDA7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1raHRtbC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7fS5kaHRtbHhNZW51X21hdGVyaWFsX01pZGRsZSBkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9Ub3BMZXZlbF9JdGVtX05vcm1hbCwuZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfVG9wTGV2ZWxfSXRlbV9EaXNhYmxlZCwuZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfVG9wTGV2ZWxfSXRlbV9TZWxlY3RlZHtwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O2ZvbnQ6aW5oZXJpdDtoZWlnaHQ6MjhweDtsaW5lLWhlaWdodDoyOHB4O21hcmdpbjowO3BhZGRpbmc6MCA4cHg7Y3Vyc29yOmRlZmF1bHQ7d2hpdGUtc3BhY2U6bm93cmFwOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTsta2h0bWwtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO30uZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfVG9wTGV2ZWxfSXRlbV9Ob3JtYWwgZGl2LnRvcF9sZXZlbF90ZXh0LC5kaHRtbHhNZW51X21hdGVyaWFsX01pZGRsZSBkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9Ub3BMZXZlbF9JdGVtX0Rpc2FibGVkIGRpdi50b3BfbGV2ZWxfdGV4dCwuZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfVG9wTGV2ZWxfSXRlbV9TZWxlY3RlZCBkaXYudG9wX2xldmVsX3RleHR7ZmxvYXQ6bGVmdDttYXJnaW46MCAzcHg7fS5kaHRtbHhNZW51X21hdGVyaWFsX01pZGRsZSBkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9Ub3BMZXZlbF9JdGVtX05vcm1hbCBpLC5kaHRtbHhNZW51X21hdGVyaWFsX01pZGRsZSBkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9Ub3BMZXZlbF9JdGVtX0Rpc2FibGVkIGksLmRodG1seE1lbnVfbWF0ZXJpYWxfTWlkZGxlIGRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1RvcExldmVsX0l0ZW1fU2VsZWN0ZWQgaXtoZWlnaHQ6aW5oZXJpdDtsaW5lLWhlaWdodDppbmhlcml0O2Zsb2F0OmxlZnQ7Y29sb3I6aW5oZXJpdDttYXJnaW46MCA0cHg7Zm9udC1zaXplOjEuMmVtO30uZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfVG9wTGV2ZWxfSXRlbV9EaXNhYmxlZHtjb2xvcjojYTZhNmE2O30uZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfVG9wTGV2ZWxfSXRlbV9TZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlYmViZWI7fS5kaHRtbHhNZW51X21hdGVyaWFsX01pZGRsZSBpbWcuZGh0bWx4TWVudV9Ub3BMZXZlbF9JdGVtX0ljb257ZmxvYXQ6bGVmdDttYXJnaW46NXB4IDNweCAwIDNweDt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2N1cnNvcjpkZWZhdWx0O30uZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LnRvcF9zZXB7cG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtoZWlnaHQ6MjJweDt3aWR0aDowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZGZkZmRmO21hcmdpbjozcHggOHB4IDAgOHB4O2ZvbnQtc2l6ZToxcHg7b3ZlcmZsb3c6aGlkZGVuO2N1cnNvcjpkZWZhdWx0Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTsta2h0bWwtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO30uZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfVG9wTGV2ZWxfVGV4dF9yaWdodCwuZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfVG9wTGV2ZWxfVGV4dF9sZWZ0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2hlaWdodDoyOHB4O2xpbmUtaGVpZ2h0OjI4cHg7Y3Vyc29yOmRlZmF1bHQ7Zm9udC1zaXplOjE0cHg7Zm9udC1mYW1pbHk6Um9ib3RvLEFyaWFsLEhlbHZldGljYTtjb2xvcjojNDA0MDQwOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTsta2h0bWwtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO30uZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUgZGl2LmRodG1seE1lbnVfVG9wTGV2ZWxfVGV4dF9yaWdodHtyaWdodDo2cHg7fS5kaHRtbHhNZW51X21hdGVyaWFsX01pZGRsZSBkaXYuZGh0bWx4TWVudV9Ub3BMZXZlbF9UZXh0X2xlZnR7bGVmdDo2cHg7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29ue3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmc6NXB4IDA7YmFja2dyb3VuZC1jb2xvcjojZmFmYWZhO292ZXJmbG93OmhpZGRlbjtjdXJzb3I6ZGVmYXVsdDtsaW5lLWhlaWdodDpub3JtYWw7b3ZlcmZsb3cteTphdXRvOy13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOnRvdWNoOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsMC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsMC4yNCk7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1raHRtbC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRke3BhZGRpbmc6MDttYXJnaW46MDtsaW5lLWhlaWdodDpub3JtYWw7d2hpdGUtc3BhY2U6bm93cmFwO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtZmFtaWx5OlJvYm90byxBcmlhbCxIZWx2ZXRpY2E7Y29sb3I6IzQwNDA0MDt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gdGQuc3ViX2l0ZW1faWNvbnt3aWR0aDoxOHB4O3RleHQtYWxpZ246Y2VudGVyO31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ZC5zdWJfaXRlbV9pY29uIGltZy5zdWJfaWNvbnttYXJnaW46NHB4IDZweCAwIDZweDt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ZC5zdWJfaXRlbV9pY29uIGl7d2lkdGg6MThweDtoZWlnaHQ6MzBweDtsaW5lLWhlaWdodDoyOXB4O21hcmdpbjowIDZweDtmb250LXNpemU6MS4yZW07dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6aW5oZXJpdDt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gdGQuc3ViX2l0ZW1faWNvbiBkaXYuc3ViX2ljb257bWFyZ2luOjAgNnB4O3dpZHRoOjE4cHg7aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgNXB4O2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLWltYWdlOnVybCgiaW1ncy9kaHhtZW51X21hdGVyaWFsL2RoeG1lbnVfY2hyZC5wbmciKTt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gdGQuc3ViX2l0ZW1faWNvbiBkaXYuc3ViX2ljb24uY2hieF8we2JhY2tncm91bmQtcG9zaXRpb246MCA1cHg7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRkLnN1Yl9pdGVtX2ljb24gZGl2LnN1Yl9pY29uLmNoYnhfMXtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0xOHB4IDVweDt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gdGQuc3ViX2l0ZW1faWNvbiBkaXYuc3ViX2ljb24ucmRidF8we2JhY2tncm91bmQtcG9zaXRpb246LTcycHggNXB4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ZC5zdWJfaXRlbV9pY29uIGRpdi5zdWJfaWNvbi5yZGJ0XzF7YmFja2dyb3VuZC1wb3NpdGlvbjotOTBweCA1cHg7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRkLnN1Yl9pdGVtX3RleHQgZGl2LnN1Yl9pdGVtX3RleHR7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweDtwYWRkaW5nOjAgMjJweCAwIDFweDtvdmVyZmxvdzpoaWRkZW47fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRkLnN1Yl9pdGVtX2hre3BhZGRpbmc6MCAxMHB4IDAgOHB4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ZC5zdWJfaXRlbV9oayBkaXYuc3ViX2l0ZW1faGt7Y29sb3I6IzhkOGQ4ZDtmb250LXNpemU6MTJweDt0ZXh0LWFsaWduOnJpZ2h0O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ZCBkaXYuY29tcGxleF9hcnJvd3tmbG9hdDpyaWdodDt3aWR0aDoxMHB4O21hcmdpbjowIDFweCAwIDExcHg7aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweDtiYWNrZ3JvdW5kLWltYWdlOnVybCgiaW1ncy9kaHhtZW51X21hdGVyaWFsL2RoeG1lbnVfc3ViYXIucG5nIik7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246MCAxMHB4O292ZXJmbG93OmhpZGRlbjtmb250LXNpemU6MXB4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ZCBkaXYuY29tcGxleF9hcnJvd19sb2FkaW5ne3dpZHRoOjE2cHg7aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlciBjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtaW1hZ2U6dXJsKCJpbWdzL2RoeG1lbnVfbWF0ZXJpYWwvZGh4bWVudV9sb2FkZXIuZ2lmIik7ZmxvYXQ6cmlnaHQ7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRyLnN1Yl9pdGVtX3NlbGVjdGVkIHRke2JhY2tncm91bmQtY29sb3I6I2ViZWJlYjt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gdHIuc3ViX2l0ZW1fc2VsZWN0ZWQgdGQgZGl2LmNvbXBsZXhfYXJyb3d7YmFja2dyb3VuZC1wb3NpdGlvbjotMTBweCAxMHB4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ci5zdWJfaXRlbV9kaXMgdGQuc3ViX2l0ZW1faGsgZGl2LnN1Yl9pdGVtX2hre2NvbG9yOiNjMGMwYzA7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRyLnN1Yl9pdGVtX2RpcyB0ZCBkaXYuc3ViX2l0ZW1fdGV4dCxkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ci5zdWJfaXRlbV9kaXMgdGQgdGQuc3ViX2l0ZW1faWNvbiBpe2NvbG9yOiNhNmE2YTY7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRyLnN1Yl9pdGVtX2RpcyB0ZCBkaXYuY29tcGxleF9hcnJvd3tiYWNrZ3JvdW5kLXBvc2l0aW9uOi0yMHB4IDEwcHg7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRyLnN1Yl9pdGVtX2RpcyB0ZCBkaXYuc3ViX2ljb24uY2hieF8we2JhY2tncm91bmQtcG9zaXRpb246LTM2cHggNXB4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ci5zdWJfaXRlbV9kaXMgdGQgZGl2LnN1Yl9pY29uLmNoYnhfMXtiYWNrZ3JvdW5kLXBvc2l0aW9uOi01NHB4IDVweDt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gdHIuc3ViX2l0ZW1fZGlzIHRkIGRpdi5zdWJfaWNvbi5yZGJ0XzB7YmFja2dyb3VuZC1wb3NpdGlvbjotMTA4cHggNXB4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ci5zdWJfaXRlbV9kaXMgdGQgZGl2LnN1Yl9pY29uLnJkYnRfMXtiYWNrZ3JvdW5kLXBvc2l0aW9uOi0xMjZweCA1cHg7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRyLnN1Yl9pdGVtX2RpcyB0ZCBpe2NvbG9yOiNhNmE2YTY7fWRpdi5kaHRtbHhNZW51X21hdGVyaWFsX1N1YkxldmVsQXJlYV9Qb2x5Z29uIHRyLnN1Yl9zZXAgdGR7cGFkZGluZzo1cHggM3B4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiB0ci5zdWJfc2VwIHRkIGRpdi5zdWJfc2Vwe3Bvc2l0aW9uOnJlbGF0aXZlO2ZvbnQtc2l6ZToxcHg7bGluZS1oZWlnaHQ6MXB4O2hlaWdodDowO3dpZHRoOjEwMCU7Ym9yZGVyLXRvcDoxcHggc29saWQgI2RmZGZkZjt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX0Fycm93VXAsZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX0Fycm93VXBfT3ZlcixkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiBkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfQXJyb3dVcF9EaXNhYmxlZHtwb3NpdGlvbjpyZWxhdGl2ZTtmb250LXNpemU6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkZmRmZGY7YmFja2dyb3VuZC1pbWFnZTp1cmwoImltZ3MvZGh4bWVudV9tYXRlcmlhbC9kaHhtZW51X2Fycm93X3VwLnBuZyIpO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlciAycHg7cGFkZGluZzo4cHggMDttYXJnaW4tYm90dG9tOjNweDt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX0Fycm93VXBfRGlzYWJsZWR7YmFja2dyb3VuZC1pbWFnZTp1cmwoImltZ3MvZGh4bWVudV9tYXRlcmlhbC9kaHhtZW51X2Fycm93X3VwX2Rpcy5wbmciKTt9ZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX0Fycm93RG93bixkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiBkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfQXJyb3dEb3duX092ZXIsZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX1BvbHlnb24gZGl2LmRodG1seE1lbnVfbWF0ZXJpYWxfU3ViTGV2ZWxBcmVhX0Fycm93RG93bl9EaXNhYmxlZHtwb3NpdGlvbjpyZWxhdGl2ZTtmb250LXNpemU6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkZmRmZGY7YmFja2dyb3VuZC1pbWFnZTp1cmwoImltZ3MvZGh4bWVudV9tYXRlcmlhbC9kaHhtZW51X2Fycm93X2Rvd24ucG5nIik7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyIDZweDtwYWRkaW5nOjhweCAwO21hcmdpbi10b3A6M3B4O31kaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfUG9seWdvbiBkaXYuZGh0bWx4TWVudV9tYXRlcmlhbF9TdWJMZXZlbEFyZWFfQXJyb3dEb3duX0Rpc2FibGVke2JhY2tncm91bmQtaW1hZ2U6dXJsKCJpbWdzL2RoeG1lbnVfbWF0ZXJpYWwvZGh4bWVudV9hcnJvd19kb3duX2Rpcy5wbmciKTt9aWZyYW1lLmRodG1seE1lbnVfSUU2Q292ZXJGaXhfbWF0ZXJpYWx7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyOm5vbmU7YmFja2dyb3VuZDojMDAwO2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEob3BhY2l0eT0xMDApO30uZGh0bWx4TWVudV9tYXRlcmlhbF9NaWRkbGUuZGlyX2xlZnQgZGl2LmFsaWduX2xlZnR7ZmxvYXQ6bGVmdDt9LmRodG1seE1lbnVfbWF0ZXJpYWxfTWlkZGxlLmRpcl9sZWZ0IGRpdi5hbGlnbl9yaWdodHtmbG9hdDpyaWdodDt9LmRoeG1lbnVfc2tpbl9kZXRlY3R7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDotMTAwcHg7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowIHNvbGlkIHdoaXRlO3dpZHRoOjQwcHg7aGVpZ2h0OjEwcHg7b3ZlcmZsb3c6aGlkZGVuO31Aa2V5ZnJhbWVzIGRoeF9sb2FkZXJfcm90YXRlezEwMCV7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO319QGtleWZyYW1lcyBkaHhfbG9hZGVyX2Rhc2h7MCV7c3Ryb2tlLWRhc2hhcnJheToxLDIwMDtzdHJva2UtZGFzaG9mZnNldDowO301MCV7c3Ryb2tlLWRhc2hhcnJheTo4OSwyMDA7c3Ryb2tlLWRhc2hvZmZzZXQ6LTM1cHg7fTEwMCV7c3Ryb2tlLWRhc2hhcnJheTo4OSwyMDA7c3Ryb2tlLWRhc2hvZmZzZXQ6LTEyNHB4O319LmRlZmF1bHRUcmVlVGFibGV7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO30uY29udGFpbmVyVGFibGVTdHlsZXtvdmVyZmxvdzphdXRvOy13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOnRvdWNoO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDowO2ZvbnQtc2l6ZToxMnB4Oy1raHRtbC11c2VyLXNlbGVjdDpub25lO30uY29udGFpbmVyVGFibGVTdHlsZVJUTCBzcGFue2RpcmVjdGlvbjpydGw7dW5pY29kZS1iaWRpOmJpZGktb3ZlcnJpZGU7fS5jb250YWluZXJUYWJsZVN0eWxlUlRMe2RpcmVjdGlvbjpydGw7b3ZlcmZsb3c6YXV0bztwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MDtmb250LXNpemU6MTJweDt9LnN0YW5kYXJ0VHJlZVJvd3tmb250LWZhbWlseTpSb2JvdG8sQXJpYWwsSGVsdmV0aWNhO2ZvbnQtc2l6ZTo7LW1vei11c2VyLXNlbGVjdDpub25lO2xpbmUtaGVpZ2h0OjI0cHg7fS5zZWxlY3RlZFRyZWVSb3d7Zm9udC1mYW1pbHk6Um9ib3RvLEFyaWFsLEhlbHZldGljYTtmb250LXNpemU6Oy1tb3otdXNlci1zZWxlY3Q6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7Y29sb3I6IzM5Yzt9LmRoeHRyZWVfbWF0ZXJpYWwgLnNlbGVjdGVkVHJlZVJvd0Z1bGwgLmRoeFRleHRDZWxse2JhY2tncm91bmQtY29sb3I6I2VlZTtjb2xvcjojMzljO30uZHJhZ0FuZERyb3BSb3d7Y29sb3I6IzM5Yzt9LnN0YW5kYXJ0VHJlZVJvd19sb3J7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTtiYWNrZ3JvdW5kLWNvbG9yOjtmb250LWZhbWlseTpSb2JvdG8sQXJpYWwsSGVsdmV0aWNhO2ZvbnQtc2l6ZTo7LW1vei11c2VyLXNlbGVjdDpub25lO30uc3RhbmRhcnRUcmVlSW1hZ2V7aGVpZ2h0OjI0cHg7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlcjowO3BhZGRpbmc6MDttYXJnaW46MDtmb250LXNpemU6MXB4O30uc3RhbmRhcnRUcmVlSW1hZ2UgaW1ne3dpZHRoOjE4cHg7aGVpZ2h0OjI0cHg7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXIgY2VudGVyO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtib3JkZXI6MDtwYWRkaW5nOjA7bWFyZ2luOjA7Zm9udC1zaXplOjFweDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LWtodG1sLXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lOy1vLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTt9LmhpZGRlblJvd3t3aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO30uZHJhZ1NwYW5EaXYsLmRyYWdTcGFuRGl2IHRke2ZvbnQtZmFtaWx5OlJvYm90byxBcmlhbCxIZWx2ZXRpY2E7Zm9udC1zaXplOjtsaW5lLWhlaWdodDo7dmVydGljYWwtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6d2hpdGU7ei1pbmRleDo5OTk7fS5kcmFnU3BhbkRpdiB0ZHtwYWRkaW5nOjVweDt9LmFfZGh4X2hpZGRlbl9pbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTFweDtsZWZ0Oi0xcHg7d2lkdGg6MXB4O2hlaWdodDoxcHg7Ym9yZGVyOm5vbmU7YmFja2dyb3VuZDpub25lO30uYV9kaHhfaGlkZGVuX2lucHV0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMXB4O2xlZnQ6LTFweDt3aWR0aDoxcHg7aGVpZ2h0OjFweDtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOm5vbmU7fS5zZWxlY3Rpb25CYXJ7dG9wOjA7YmFja2dyb3VuZC1jb2xvcjpibGFjaztwb3NpdGlvbjphYnNvbHV0ZTtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjJweDt6LWluZGV4OjExO30uaW50cmVlZWRpdFJvd3tmb250LXNpemU6OHB0O2hlaWdodDoxNnB4O2JvcmRlcjoxcHggc29saWQgc2lsdmVyO3BhZGRpbmc6MDttYXJnaW46MDttYXJnaW4tbGVmdDo0cHg7LW1vei11c2VyLXNlbGVjdDp0ZXh0Oy1raHRtbC11c2VyLXNlbGVjdDp0ZXh0O30uZGh4X3RyZWVfdGV4dFNpZ257Zm9udC1zaXplOjhwdDtmb250LWZhbWlseTptb25vc3BhY2U7d2lkdGg6MjFweDtjb2xvcjo7cGFkZGluZzowO21hcmdpbjowO2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO30uZGh4X3RyZWVfb3BhY2l0eXtvcGFjaXR5OjA7ZmlsdGVyOnByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShvcGFjaXR5PTApOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTsta2h0bWwtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO30uZGh4X2JnX2ltZ19maXh7d2lkdGg6MThweDtoZWlnaHQ6MjRweDtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YmFja2dyb3VuZC1wb3NpdGlvbi14OmNlbnRlcjtiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6Y2VudGVyO30uZGh4dHJlZV9za2luX2RldGVjdHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOi0xMDBweDttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjAgc29saWQgd2hpdGU7d2lkdGg6NDBweDtoZWlnaHQ6MTBweDtvdmVyZmxvdzpoaWRkZW47fScsZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7dmFyIGxheWFhaXJfZGVidWdfdmlldz17fTt3aW5kb3cubGF5YWFpcl9kZWJ1Z192aWV3PWxheWFhaXJfZGVidWdfdmlldyxsYXlhYWlyX2RlYnVnX3ZpZXcuaW5pdExheWFBaXJEZWJ1Z1ZpZXc9ZnVuY3Rpb24oZSl7ZS5zdHlsZS5ib3JkZXI9IjFweCBzb2xpZCBibGFjayI7dmFyIHQ9TWF0aC5taW4oMjUwLC4zKmUub2Zmc2V0V2lkdGgpLGk9JzxkaXYgY2xhc3M9InRvcC1iYW5uZXIiPlxuPC9kaXY+XG48ZGl2PlxuPGRpdiBzdHlsZT0ib3ZlcmZsb3c6aGlkZGVuOyBib3JkZXItYm90dG9tOjFweCBzb2xpZCAjNDQ0OyBwYWRkaW5nOjVweCI+XG48ZGl2IHN0eWxlPSJmbG9hdDpsZWZ0Ij5cbjxidXR0b24gaWQ9Im5vZGVfZnVuY3Rpb25hbGl0eV9jb250cm9sIj7lrqHmn6XlhYPntKA8L2J1dHRvbj5cbjxidXR0b24gaWQ9InJlZnJlc2hfY29udHJvbCI+5Yi35pawPC9idXR0b24+XG48L2Rpdj5cbjxkaXYgc3R5bGU9ImZsb2F0OnJpZ2h0Ij5cbjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9InNob3dfY3VycmVudF9jYWNoZV9jb250cm9sIj7mmL7npLpjYWNoZemHjee7mDwvaW5wdXQ+XG48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJzaG93X2FsbF9jYWNoZV9jb250cm9sIj7mmL7npLpjYWNoZeWMuuWfnzwvaW5wdXQ+XG48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJzaG93X2F0bGFzX2NvbnRyb2wiPuaYvuekuuaWh+Wtl+WbvumbhjwvaW5wdXQ+XG48L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz0iaGdyb3VwIj5cbjxkaXYgc3R5bGU9ImZsb2F0OmxlZnQ7d2lkdGg6Jyt0KydweDsgYm9yZGVyLXJpZ2h0OjFweCBzb2xpZCBibGFjayIgaWQ9InRyZWVfY29udGFpbmVyIj48L2Rpdj5cbjxkaXYgc3R5bGU9Im92ZXJmbG93OmhpZGRlbiI+XG48ZGl2IGlkPSJjb250ZW50X3Rvb2xiYXIiIHN0eWxlPSJ3aWR0aDoxMDAlO21hcmdpbjoxMHB4Ij48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJ2aXNpYmlsaXR5X2NvbnRyb2wiPuWPr+ingTwvaW5wdXQ+XG48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJzaG93X2JvcmRlcl9jb250cm9sIj7mmL7npLrovrnmoYY8L2lucHV0PlxuPGJ1dHRvbiBpZD0ibG9nX2luZm9fY29udHJvbCI+5omT5Y2w5Yiw5o6n5Yi25Y+wPC9idXR0b24+XG48YnV0dG9uIGlkPSJlbmFibGVkX25vZGVfY2hhaW5fY29udHJvbCI+ZW5hYmxl6ZO+PC9idXR0b24+XG48YnV0dG9uIGlkPSJzaXplX2NoYWluX2NvbnRyb2wiPnNpemXpk748L2J1dHRvbj5cbjwvZGl2PjxkaXYgc3R5bGU9Im92ZXJmbG93OmF1dG8iPjx0YWJsZSBpZD0iY29udGVudF90YWJsZSIgc3R5bGU9ImJvcmRlcjoxcHggc29saWQgI2NjY2NjYztib3JkZXItY29sbGFwc2U6Y29sbGFwc2UiPjwvdGFibGU+XG48L2Rpdj48L2Rpdj5cbjwvZGl2PlxuPC9kaXY+JztlLmlubmVySFRNTD1pLHRoaXMuY29udGFpbmVyPWUsdGhpcy50cmVlPW5ldyBkaHRtbFhUcmVlT2JqZWN0KHRyZWVfY29udGFpbmVyLCIxMDAlIiwiMTAwJSIsMCksbm9kZV9mdW5jdGlvbmFsaXR5X2NvbnRyb2wub25jbGljaz1mdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpLGxheWFhaXJfZGVidWdfdmlldy5vbl9pbnNwZWN0X2VsZW1lbnRfY2FsbGJhY2soKSxub2RlX2Z1bmN0aW9uYWxpdHlfY29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9IiNGRkYiLG5vZGVfZnVuY3Rpb25hbGl0eV9jb250cm9sLnN0eWxlLmNvbG9yPSJyZ2IoMTA3LCAxNjMsIDI1NSkifX0sbGF5YWFpcl9kZWJ1Z192aWV3LnNldFRyZWU9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PXRoaXMudHJlZS5nZXRBbGxJdGVtc1dpdGhLaWRzKCkuc3BsaXQoIiwiKSxpPVtdLG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIG89dFtuXSxyPXRoaXMudHJlZS5nZXRPcGVuU3RhdGUobyk7MT09ciYmaS5wdXNoKG8pfXRoaXMudHJlZS5kZWxldGVDaGlsZEl0ZW1zKDApLHRoaXMudHJlZS5wYXJzZShlLCJqc29uIik7Zm9yKHZhciBuPTA7bjxpLmxlbmd0aDtuKyspdGhpcy50cmVlLm9wZW5JdGVtKGlbbl0pfSxsYXlhYWlyX2RlYnVnX3ZpZXcucmVzaXplPWZ1bmN0aW9uKGUsdCl7dGhpcy5jb250YWluZXIuc3R5bGUud2lkdGg9ZSsicHgiLHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodD10KyJweCI7dmFyIGk9dGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0LXRyZWVfY29udGFpbmVyLm9mZnNldFRvcDt0cmVlX2NvbnRhaW5lci5zdHlsZS5oZWlnaHQ9aSsicHgiLGNvbnRlbnRfdG9vbGJhci5zdHlsZS53aWR0aD1lLXRyZWVfY29udGFpbmVyLm9mZnNldFdpZHRoKyJweCIsY29udGVudF90YWJsZS5wYXJlbnRFbGVtZW50LnN0eWxlLmhlaWdodD1pLWNvbnRlbnRfdG9vbGJhci5vZmZzZXRIZWlnaHQtMjErInB4Iixjb250ZW50X3RhYmxlLnN0eWxlLndpZHRoPWUtdHJlZV9jb250YWluZXIub2Zmc2V0V2lkdGgtMTYrInB4In0sbGF5YWFpcl9kZWJ1Z192aWV3LmJvdW5jZVVwSW5zcGVjdEJ1dHRvbj1mdW5jdGlvbigpe25vZGVfZnVuY3Rpb25hbGl0eV9jb250cm9sLnN0eWxlLmJhY2tncm91bmRDb2xvcj0iYnV0dG9uZmFjZSIsbm9kZV9mdW5jdGlvbmFsaXR5X2NvbnRyb2wuc3R5bGUuY29sb3I9ImJsYWNrIn0sbGF5YWFpcl9kZWJ1Z192aWV3LnNldFZhbHVlSW5wdXRIYW5kbGVyPWZ1bmN0aW9uKGUpe3RoaXMudmFsdWVfaW5wdXRfY2FsbGJhY2s9ZX0sbGF5YWFpcl9kZWJ1Z192aWV3LnNldFZhbHVlQ2hhbmdlSGFuZGxlcj1mdW5jdGlvbihlKXt0aGlzLnZhbHVlX2NoYW5nZV9jYWxsYmFjaz1lfSxsYXlhYWlyX2RlYnVnX3ZpZXcuYWRkQ29udGVudD1mdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ciIpO3QuaW5uZXJIVE1MPSc8dGQgc3R5bGU9IndpZHRoOjEwMHB4O2ZvbnQtc2l6ZToxM3B4O2JvcmRlcjoxcHggc29saWQgI0NDQztwYWRkaW5nLWxlZnQ6MTBweCI+JytlLmtleSsnPC90ZD5cbjx0ZCBzdHlsZT0id2lkdGg6MjAwcHg7Ym9yZGVyOjFweCBzb2xpZCAjQ0NDOyI+PGlucHV0IHN0eWxlPSJib3JkZXI6bm9uZTt3aWR0aDoxMDAlO2hlaWdodDoyNXB4O3BhZGRpbmctbGVmdDoxMHB4OyIgdmFsdWU9JytlLnZhbHVlKyI+PC90ZD4iLGNvbnRlbnRfdGFibGUuYXBwZW5kQ2hpbGQodCk7dmFyIGk9dC5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ7aS5kYXRhPWUsaS5vbmlucHV0PWZ1bmN0aW9uKGUpe3RoaXMudmFsdWVfaW5wdXRfY2FsbGJhY2smJnRoaXMudmFsdWVfaW5wdXRfY2FsbGJhY2soZS50YXJnZXQuZGF0YSxlLnRhcmdldC52YWx1ZSl9LmJpbmQodGhpcyksaS5vbmNoYW5nZT1mdW5jdGlvbihlKXt0aGlzLnZhbHVlX2NoYW5nZV9jYWxsYmFjayYmdGhpcy52YWx1ZV9jaGFuZ2VfY2FsbGJhY2soZS50YXJnZXQuZGF0YSxlLnRhcmdldC52YWx1ZSl9LmJpbmQodGhpcyl9LGxheWFhaXJfZGVidWdfdmlldy5zZXRDb250ZW50cz1mdW5jdGlvbihlKXtjb250ZW50X3RhYmxlLmlubmVySFRNTD0iIjtmb3IodmFyIHQ9MDt0PGUubGVuZ3RoO3QrKyl7dmFyIGk9ZVt0XTt0aGlzLmFkZENvbnRlbnQoaSl9fSxsYXlhYWlyX2RlYnVnX3ZpZXcuY2hhbmdlVmFsdWVBdD1mdW5jdGlvbihlLHQpe2NvbnRlbnRfdGFibGUuY2hpbGRyZW5bZV0ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZT10fSxsYXlhYWlyX2RlYnVnX3ZpZXcuY2hhbmdlVmFsdWVCeUxhYmVsPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBpPWNvbnRlbnRfdGFibGUuY2hpbGRyZW4ubGVuZ3RoLTE7aT49MDtpLS0paWYoY29udGVudF90YWJsZS5jaGlsZHJlbltpXS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQ9PWUpe2NvbnRlbnRfdGFibGUuY2hpbGRyZW5baV0ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZT10O2JyZWFrfX0sbGF5YWFpcl9kZWJ1Z192aWV3LnNldFZpc2liaWxpdHk9ZnVuY3Rpb24oZSl7dmlzaWJpbGl0eV9jb250cm9sLmNoZWNrZWQ9ISFlfSxsYXlhYWlyX2RlYnVnX3ZpZXcuc2V0U2hvd0RlYnVnQm9yZGVyPWZ1bmN0aW9uKGUpe3Nob3dfYm9yZGVyX2NvbnRyb2wuY2hlY2tlZD0hIWV9LGxheWFhaXJfZGVidWdfdmlldy5nZXRWaXNpYmlsaXR5PWZ1bmN0aW9uKCl7cmV0dXJuIHZpc2liaWxpdHlfY29udHJvbC5jaGVja2VkfSxsYXlhYWlyX2RlYnVnX3ZpZXcuZ2V0U2hvd0RlYnVnQm9yZGVyPWZ1bmN0aW9uKCl7cmV0dXJuIHNob3dfYm9yZGVyX2NvbnRyb2wuY2hlY2tlZH0sbGF5YWFpcl9kZWJ1Z192aWV3LmdldFNob3dDdXJyZW50Q2FjaGU9ZnVuY3Rpb24oKXtyZXR1cm4gc2hvd19jdXJyZW50X2NhY2hlX2NvbnRyb2wuY2hlY2tlZH0sbGF5YWFpcl9kZWJ1Z192aWV3LmdldFNob3dBbGxDYWNoZT1mdW5jdGlvbigpe3JldHVybiBzaG93X2FsbF9jYWNoZV9jb250cm9sLmNoZWNrZWR9LGxheWFhaXJfZGVidWdfdmlldy5nZXRTaG93QXRsYXM9ZnVuY3Rpb24oKXtyZXR1cm4gc2hvd19hdGxhc19jb250cm9sLmNoZWNrZWR9LGxheWFhaXJfZGVidWdfdmlldy5vbkluc3BlY3RFbGVtZW50PWZ1bmN0aW9uKGUpe3RoaXMub25faW5zcGVjdF9lbGVtZW50X2NhbGxiYWNrPWV9LGxheWFhaXJfZGVidWdfdmlldy5vbkxvZ0luZm89ZnVuY3Rpb24oZSl7bG9nX2luZm9fY29udHJvbC5vbmNsaWNrPWV9LGxheWFhaXJfZGVidWdfdmlldy5vblJlZnJlc2g9ZnVuY3Rpb24oZSl7cmVmcmVzaF9jb250cm9sLm9uY2xpY2s9ZX0sbGF5YWFpcl9kZWJ1Z192aWV3Lm9uUHJpbnRFbmFibGVkTm9kZUNoYWluPWZ1bmN0aW9uKGUpe2VuYWJsZWRfbm9kZV9jaGFpbl9jb250cm9sLm9uY2xpY2s9ZX0sbGF5YWFpcl9kZWJ1Z192aWV3Lm9uUHJpbnRTaXplQ2hhaW49ZnVuY3Rpb24oZSl7c2l6ZV9jaGFpbl9jb250cm9sLm9uY2xpY2s9ZX0sbGF5YWFpcl9kZWJ1Z192aWV3Lm9uVG9nZ2xlVmlzaWJpbGl0eT1mdW5jdGlvbihlKXt2aXNpYmlsaXR5X2NvbnRyb2wub25jaGFuZ2U9ZX0sbGF5YWFpcl9kZWJ1Z192aWV3Lm9uVG9nZ2xlRGVidWdCb3JkZXI9ZnVuY3Rpb24oZSl7c2hvd19ib3JkZXJfY29udHJvbC5vbmNoYW5nZT1lfSxsYXlhYWlyX2RlYnVnX3ZpZXcub25Ub2dnbGVTaG93Q3VycmVudENhY2hlPWZ1bmN0aW9uKGUpe3Nob3dfY3VycmVudF9jYWNoZV9jb250cm9sLm9uY2hhbmdlPWV9LGxheWFhaXJfZGVidWdfdmlldy5vblRvZ2dsZVNob3dBbGxDYWNoZT1mdW5jdGlvbihlKXtzaG93X2FsbF9jYWNoZV9jb250cm9sLm9uY2hhbmdlPWV9LGxheWFhaXJfZGVidWdfdmlldy5vblRvZ2dsZVNob3dBdGxhcz1mdW5jdGlvbihlKXtzaG93X2F0bGFzX2NvbnRyb2wub25jaGFuZ2U9ZX07";

	var AtlasTools = function () {
		function AtlasTools() {
			_classCallCheck(this, AtlasTools);

			this.mIndex = 0;
			this.mTextureDic = {};
		}

		_createClass(AtlasTools, [{
			key: "start",
			value: function start() {
				if (this.mSprite == null) {
					this.mSprite = new Laya.Sprite();
				}
				Laya.Laya.stage.addChild(this.mSprite);
				this.showNext();
			}
		}, {
			key: "end",
			value: function end() {
				if (this.mSprite) {
					Laya.Laya.stage.removeChild(this.mSprite);
				}
			}
		}, {
			key: "showNext",
			value: function showNext() {
				if (this.mSprite == null) {
					this.mSprite = new Laya.Sprite();
				}
				Laya.Laya.stage.addChild(this.mSprite);
				this.mIndex++;
				var tTexture;
				if (this.mTextureDic[this.mIndex]) {
					tTexture = this.mTextureDic[this.mIndex];
				}
			}
		}], [{
			key: "getInstance",
			value: function getInstance() {
				return AtlasTools.mInstance = AtlasTools.mInstance || new AtlasTools();
			}
		}]);

		return AtlasTools;
	}();

	var ObjTimeCountTool = function () {
		function ObjTimeCountTool() {
			_classCallCheck(this, ObjTimeCountTool);

			this.timeDic = {};
			this.resultDic = {};
			this.countDic = {};
			this.resultCountDic = {};
			this.nodeDic = {};
			this.resultNodeDic = {};
		}

		_createClass(ObjTimeCountTool, [{
			key: "addTime",
			value: function addTime(sprite, time) {
				IDTools.idObj(sprite);
				var key;
				key = IDTools.getObjID(sprite);
				if (!this.timeDic.hasOwnProperty(key)) {
					this.timeDic[key] = 0;
				}
				this.timeDic[key] = this.timeDic[key] + time;
				if (!this.countDic.hasOwnProperty(key)) {
					this.countDic[key] = 0;
				}
				this.countDic[key] = this.countDic[key] + 1;
				this.nodeDic[key] = sprite;
			}
		}, {
			key: "getTime",
			value: function getTime(sprite) {
				IDTools.idObj(sprite);
				var key;
				key = IDTools.getObjID(sprite);
				if (!this.resultDic[key]) return 0;
				return this.resultDic[key];
			}
		}, {
			key: "getCount",
			value: function getCount(sprite) {
				IDTools.idObj(sprite);
				var key;
				key = IDTools.getObjID(sprite);
				return this.resultCountDic[key];
			}
		}, {
			key: "reset",
			value: function reset() {
				var key;
				for (key in this.timeDic) {
					this.timeDic[key] = 0;
					this.countDic[key] = 0;
				}
				ObjectTools.clearObj(this.nodeDic);
			}
		}, {
			key: "updates",
			value: function updates() {
				ObjectTools.clearObj(this.resultDic);
				ObjectTools.insertValue(this.resultDic, this.timeDic);
				ObjectTools.clearObj(this.resultCountDic);
				ObjectTools.insertValue(this.resultCountDic, this.countDic);
				ObjectTools.insertValue(this.resultNodeDic, this.nodeDic);
				this.reset();
			}
		}]);

		return ObjTimeCountTool;
	}();

	var DebugConsts = function DebugConsts() {
		_classCallCheck(this, DebugConsts);
	};

	DebugConsts.CLICK_SELECT_COLOR = "#ff0000";
	DebugConsts.CANVAS_REC_COLOR = "#FF00FF";
	DebugConsts.RECACHE_REC_COLOR = "#00ff00";
	DebugConsts.SPRITE_REC_COLOR = "#ff0000";
	DebugConsts.SPRITE_REC_LINEWIDTH = 2;

	var NodeRecInfo = function (_Laya$Sprite7) {
		_inherits(NodeRecInfo, _Laya$Sprite7);

		function NodeRecInfo() {
			_classCallCheck(this, NodeRecInfo);

			var _this8 = _possibleConstructorReturn(this, (NodeRecInfo.__proto__ || Object.getPrototypeOf(NodeRecInfo)).call(this));

			_this8.recColor = "#00ff00";
			_this8.txt = new Laya.Text();
			_this8.txt.color = "#ff0000";
			_this8.txt.bgColor = "#00ff00";
			_this8.txt.fontSize = 12;
			_this8.addChild(_this8.txt);
			return _this8;
		}

		_createClass(NodeRecInfo, [{
			key: "setInfo",
			value: function setInfo(str) {
				this.txt.text = str;
			}
		}, {
			key: "setTarget",
			value: function setTarget(tar) {
				this._tar = tar;
			}
		}, {
			key: "showInfo",
			value: function showInfo(node) {
				this._tar = node;
				if (!node) return;
				if (node.destroyed) return;
				this.graphics.clear();
				var pointList;
				pointList = node._getBoundPointsM(true);
				if (!pointList || pointList.length < 1) return;
				pointList = Laya.GrahamScan.pListToPointList(pointList, true);
				WalkTools.walkArr(pointList, node.localToGlobal, node);
				pointList = Laya.GrahamScan.pointListToPlist(pointList);
				NodeRecInfo._disBoundRec = Laya.Rectangle._getWrapRec(pointList, NodeRecInfo._disBoundRec);
				this.graphics.drawRect(0, 0, NodeRecInfo._disBoundRec.width, NodeRecInfo._disBoundRec.height, null, DebugConsts.RECACHE_REC_COLOR, 2);
				this.pos(NodeRecInfo._disBoundRec.x, NodeRecInfo._disBoundRec.y);
			}
		}, {
			key: "fresh",
			value: function fresh() {
				this.showInfo(this._tar);
			}
		}, {
			key: "clearMe",
			value: function clearMe() {
				this._tar = null;
			}
		}]);

		return NodeRecInfo;
	}(Laya.Sprite);

	NodeRecInfo._disBoundRec = new Laya.Rectangle();

	var ReCacheRecInfo = function (_NodeRecInfo) {
		_inherits(ReCacheRecInfo, _NodeRecInfo);

		function ReCacheRecInfo() {
			_classCallCheck(this, ReCacheRecInfo);

			var _this9 = _possibleConstructorReturn(this, (ReCacheRecInfo.__proto__ || Object.getPrototypeOf(ReCacheRecInfo)).call(this));

			_this9.isWorking = false;
			_this9.mTime = 0;
			_this9.txt.fontSize = 12;
			return _this9;
		}

		_createClass(ReCacheRecInfo, [{
			key: "addCount",
			value: function addCount() {
				var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

				this.count++;
				this.mTime += time;
				if (!this.isWorking) {
					this.working = true;
				}
			}
		}, {
			key: "updates",
			value: function updates() {
				if (!this._tar["displayedInStage"]) {
					this.working = false;
					this.removeSelf();
				}
				this.txt.text = ClassTool.getNodeClassAndName(this._tar) + "\n" + "reCache:" + this.count + "\ntime:" + this.mTime;
				if (this.count > 0) {
					this.fresh();
					Laya.Laya.timer.clear(this, this.removeSelfLater);
				} else {
					this.working = false;
					Laya.Laya.timer.once(ReCacheRecInfo.showTime, this, this.removeSelfLater);
				}
				this.count = 0;
				this.mTime = 0;
			}
		}, {
			key: "removeSelfLater",
			value: function removeSelfLater() {
				this.working = false;
				this.removeSelf();
			}
		}, {
			key: "working",
			set: function set(v) {
				this.isWorking = v;
				if (v) {
					Laya.Laya.timer.loop(1000, this, this.updates);
				} else {
					Laya.Laya.timer.clear(this, this.updates);
				}
			}
		}]);

		return ReCacheRecInfo;
	}(NodeRecInfo);

	ReCacheRecInfo.showTime = 3000;

	var CacheAnalyser = function () {
		function CacheAnalyser() {
			_classCallCheck(this, CacheAnalyser);
		}

		_createClass(CacheAnalyser, [{
			key: "renderCanvas",
			value: function renderCanvas(sprite) {
				var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				if (!CacheAnalyser.showCacheSprite) return;
				if (DebugInfoLayer.I.isDebugItem(sprite)) return;
				DebugTool.showDisBoundToSprite(sprite, DebugInfoLayer.I.cacheViewLayer, DebugConsts.CANVAS_REC_COLOR, 4);
			}
		}, {
			key: "reCacheCanvas",
			value: function reCacheCanvas(sprite) {
				var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				if (!CacheAnalyser.showRecacheSprite) return;
				if (DebugInfoLayer.I.isDebugItem(sprite)) return;
				var info;
				info = CacheAnalyser.getNodeInfoByNode(sprite);
				info.addCount(time);
				CacheAnalyser.counter.addTime(sprite, time);
				if (!info.parent) {
					DebugInfoLayer.I.nodeRecInfoLayer.addChild(info);
				}
			}
		}], [{
			key: "renderLoopBegin",
			value: function renderLoopBegin() {
				DebugInfoLayer.I.cacheViewLayer.graphics.clear();
			}
		}, {
			key: "getNodeInfoByNode",
			value: function getNodeInfoByNode(node) {
				IDTools.idObj(node);
				var key;
				key = IDTools.getObjID(node);
				if (!CacheAnalyser._nodeInfoDic[key]) {
					CacheAnalyser._nodeInfoDic[key] = new ReCacheRecInfo();
				}
				CacheAnalyser._nodeInfoDic[key].setTarget(node);
				return CacheAnalyser._nodeInfoDic[key];
			}
		}, {
			key: "I",
			get: function get() {
				if (!CacheAnalyser._instance) {
					CacheAnalyser._instance = new CacheAnalyser();
				}
				return CacheAnalyser._instance;
			},
			set: function set(value) {
				CacheAnalyser._instance = value;
			}
		}]);

		return CacheAnalyser;
	}();

	CacheAnalyser.counter = new ObjTimeCountTool();
	CacheAnalyser._nodeInfoDic = {};
	CacheAnalyser.showCacheSprite = false;
	CacheAnalyser.showRecacheSprite = true;

	var Notice = function (_Laya$EventDispatcher) {
		_inherits(Notice, _Laya$EventDispatcher);

		function Notice() {
			_classCallCheck(this, Notice);

			return _possibleConstructorReturn(this, (Notice.__proto__ || Object.getPrototypeOf(Notice)).call(this));
		}

		_createClass(Notice, null, [{
			key: "notify",
			value: function notify(type) {
				var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				Notice.I.event(type, data);
			}
		}, {
			key: "listen",
			value: function listen(type, _scope, fun) {
				var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
				var cancelBefore = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

				if (cancelBefore) Notice.cancel(type, _scope, fun);
				Notice.I.on(type, _scope, fun, args);
			}
		}, {
			key: "cancel",
			value: function cancel(type, _scope, fun) {
				Notice.I.off(type, _scope, fun);
			}
		}, {
			key: "I",
			get: function get() {
				if (!Notice._instance) {
					Notice._instance = new Notice();
				}
				return Notice._instance;
			},
			set: function set(value) {
				Notice._instance = value;
			}
		}]);

		return Notice;
	}(Laya.EventDispatcher);

	var DButton = function (_Laya$Text) {
		_inherits(DButton, _Laya$Text);

		function DButton() {
			_classCallCheck(this, DButton);

			var _this11 = _possibleConstructorReturn(this, (DButton.__proto__ || Object.getPrototypeOf(DButton)).call(this));

			_this11.bgColor = "#ffff00";
			_this11.wordWrap = false;
			_this11.mouseEnabled = true;
			return _this11;
		}

		return DButton;
	}(Laya.Text);

	var DisplayHook = function () {
		function DisplayHook() {
			_classCallCheck(this, DisplayHook);

			this._matrix = new Laya.Matrix();
			this._point = new Laya.Point();
			this._rect = new Laya.Rectangle();
			this._event = Laya.Event.EMPTY;
			this.isGetting = false;
			this._stage = Laya.Laya.stage;
			this.init(Laya.Render.context.canvas);
		}

		_createClass(DisplayHook, [{
			key: "init",
			value: function init(canvas) {
				var _this12 = this;

				if (window.navigator.msPointerEnabled) {
					canvas.style['-ms-content-zooming'] = 'none';
					canvas.style['-ms-touch-action'] = 'none';
				}
				var _this = this;
				document.addEventListener('mousedown', function (e) {
					_this12._event._stoped = false;
					DisplayHook.isFirst = true;
					_this.check(_this._stage, e.offsetX, e.offsetY, _this.onMouseDown, true, false);
				}, true);
				document.addEventListener('touchstart', function (e) {
					_this12._event._stoped = false;
					DisplayHook.isFirst = true;
					var touches = e.changedTouches;
					for (var i = 0, n = touches.length; i < n; i++) {
						var touch = touches[i];
						initEvent(touch, e);
						_this.check(_this._stage, _this.mouseX, _this.mouseY, _this.onMouseDown, true, false);
					}
				}, true);
				function initEvent(e) {
					var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

					_this._event._stoped = false;
					_this._event.nativeEvent = event || e;
					_this._target = null;
					if (e.offsetX) {
						_this.mouseX = e.offsetX;
						_this.mouseY = e.offsetY;
					} else {
						_this.mouseX = e.clientX - Laya.Laya.stage.offset.x;
						_this.mouseY = e.clientY - Laya.Laya.stage.offset.y;
					}
				}
			}
		}, {
			key: "onMouseMove",
			value: function onMouseMove(ele, hit) {
				this.sendEvent(ele, Laya.Event.MOUSE_MOVE);
				return;
				if (hit && ele != this._stage && ele !== this._target) {
					if (this._target) {
						if (this._target.$_MOUSEOVER) {
							this._target.$_MOUSEOVER = false;
							this._target.event(Laya.Event.MOUSE_OUT);
						}
					}
					this._target = ele;
					if (!ele.$_MOUSEOVER) {
						ele.$_MOUSEOVER = true;
						this.sendEvent(ele, Laya.Event.MOUSE_OVER);
					}
				} else if (!hit && this._target && ele === this._target) {
					this._target = null;
					if (ele.$_MOUSEOVER) {
						ele.$_MOUSEOVER = false;
						this.sendEvent(ele, Laya.Event.MOUSE_OUT);
					}
				}
			}
		}, {
			key: "onMouseUp",
			value: function onMouseUp(ele, hit) {
				hit && this.sendEvent(ele, Laya.Event.MOUSE_UP);
			}
		}, {
			key: "onMouseDown",
			value: function onMouseDown(ele, hit) {
				if (hit) {
					ele.$_MOUSEDOWN = true;
					this.sendEvent(ele, Laya.Event.MOUSE_DOWN);
				}
			}
		}, {
			key: "sendEvent",
			value: function sendEvent(ele, type) {
				if (!this._event._stoped) {
					ele.event(type, this._event.setTo(type, ele, ele));
					if (type === Laya.Event.MOUSE_UP && ele.$_MOUSEDOWN) {
						ele.$_MOUSEDOWN = false;
						ele.event(Laya.Event.CLICK, this._event.setTo(Laya.Event.CLICK, ele, ele));
					}
				}
			}
		}, {
			key: "selectDisUnderMouse",
			value: function selectDisUnderMouse() {
				DisplayHook.isFirst = true;
				this.check(Laya.Laya.stage, Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY, null, true, false);
			}
		}, {
			key: "getDisUnderMouse",
			value: function getDisUnderMouse() {
				this.isGetting = true;
				DisplayHook.isFirst = true;
				DebugTool.target = null;
				this.check(Laya.Laya.stage, Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY, null, true, false);
				this.isGetting = false;
				return DebugTool.target;
			}
		}, {
			key: "check",
			value: function check(sp, mouseX, mouseY, callBack, hitTest, mouseEnable) {
				if (sp == DebugTool.debugLayer) return false;
				if (sp == DebugInfoLayer.I) return false;
				if (this.isGetting && sp == DebugInfoLayer.I) return false;
				if (!sp.visible || sp.getSelfBounds().width <= 0) return false;
				var isHit = false;
				mouseEnable = true;
				if (mouseEnable) {
					var graphicHit = false;
					if (hitTest) {
						this._rect = sp.getBounds();
						isHit = this._rect.contains(mouseX, mouseY);
						this._point.setTo(mouseX, mouseY);
						sp.fromParentPoint(this._point);
						mouseX = this._point.x;
						mouseY = this._point.y;
					}
					if (isHit) {
						var flag = false;
						for (var i = sp._children.length - 1; i > -1; i--) {
							var child = sp._children[i];
							flag = this.check(child, mouseX, mouseY, callBack, hitTest, true);
							if (flag) break;
						}
						graphicHit = sp.getGraphicBounds().contains(mouseX, mouseY);
						isHit = flag || graphicHit;
						if (isHit && !flag && DisplayHook.isFirst) {
							DisplayHook.isFirst = false;
							if (!(sp instanceof DButton)) {
								DebugTool.target = sp;
								if (!this.isGetting) {
									DebugTool.autoWork();
									Notice.notify(DisplayHook.ITEM_CLICKED, sp);
								}
							}
						}
					}
				}
				return isHit;
			}
		}], [{
			key: "initMe",
			value: function initMe() {
				if (!DisplayHook.instance) {
					DisplayHook.instance = new DisplayHook();
					DisplayHook.selectNodeUnderMouse = DebugTool.selectNodeUnderMouse;
					DebugTool.selectNodeUnderMouse = function () {
						DisplayHook.instance.selectDisUnderMouse();
						DisplayHook.selectNodeUnderMouse();
					};
				}
			}
		}]);

		return DisplayHook;
	}();

	DisplayHook.ITEM_CLICKED = "ItemClicked";
	DisplayHook.isFirst = false;

	var ClickSelectTool = function () {
		function ClickSelectTool() {
			_classCallCheck(this, ClickSelectTool);

			this._selectTip = new Laya.Sprite();
			this._selectTip.setSelfBounds(new Laya.Rectangle(0, 0, 0, 0));
			Notice.listen(DisplayHook.ITEM_CLICKED, this, this.itemClicked);
		}

		_createClass(ClickSelectTool, [{
			key: "beginClickSelect",
			value: function beginClickSelect() {
				var complete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.completeHandler = complete;
				ClickSelectTool.isClickSelectState = true;
				this.clickSelectChange();
			}
		}, {
			key: "clickSelectChange",
			value: function clickSelectChange() {
				if (!Laya.Browser.onPC) return;
				this.tSelectTar = null;
				this.clearSelectTip();
				if (ClickSelectTool.isClickSelectState) {
					Laya.Laya.timer.loop(200, this, this.updateSelectTar, null, true);
				} else {
					Laya.Laya.timer.clear(this, this.updateSelectTar);
				}
			}
		}, {
			key: "clearSelectTip",
			value: function clearSelectTip() {
				this._selectTip.removeSelf();
			}
		}, {
			key: "updateSelectTar",
			value: function updateSelectTar() {
				this.clearSelectTip();
				this.tSelectTar = DisplayHook.instance.getDisUnderMouse();
				if (!this.tSelectTar) {
					return;
				}
				if (DebugInfoLayer.I.isDebugItem(this.tSelectTar)) return;
				var g;
				g = this._selectTip.graphics;
				g.clear();
				var rec;
				rec = NodeUtils.getGRec(this.tSelectTar);
				DebugInfoLayer.I.popLayer.addChild(this._selectTip);
				g.drawRect(0, 0, rec.width, rec.height, null, DebugConsts.CLICK_SELECT_COLOR, 2);
				this._selectTip.pos(rec.x, rec.y);
			}
		}, {
			key: "itemClicked",
			value: function itemClicked(tar) {
				if (!ClickSelectTool.isClickSelectState) return;
				if (ClickSelectTool.ignoreDebugTool) {
					if (DebugInfoLayer.I.isDebugItem(tar)) return;
				}
				DebugTool.showDisBound(tar);
				if (this.completeHandler) {
					this.completeHandler.runWith(tar);
				}
				ClickSelectTool.isClickSelectState = false;
				this.clickSelectChange();
			}
		}], [{
			key: "I",
			get: function get() {
				if (!ClickSelectTool._I) ClickSelectTool._I = new ClickSelectTool();
				return ClickSelectTool._I;
			}
		}]);

		return ClickSelectTool;
	}();

	ClickSelectTool.isClickSelectState = false;
	ClickSelectTool.ignoreDebugTool = false;

	var RenderSpriteHook = function () {
		function RenderSpriteHook() {
			_classCallCheck(this, RenderSpriteHook);
		}

		_createClass(RenderSpriteHook, [{
			key: "_canvas",
			value: function _canvas(sprite, context, x, y) {
				var _cacheStyle = sprite._cacheStyle;
				var _next = this._next;
				var _repaint;
				if (!_cacheStyle.enableCanvasRender) {
					RenderSpriteHook._oldCanvas.call(this, sprite, context, x, y);
					return;
				}
				if (sprite._needRepaint() || !_cacheStyle.canvas) {
					_repaint = true;
				} else {
					_repaint = false;
				}
				var preTime;
				preTime = Laya.Browser.now();
				RenderSpriteHook._oldCanvas.call(this, sprite, context, x, y);
				if (_repaint) {
					CacheAnalyser.I.reCacheCanvas(sprite, Laya.Browser.now() - preTime);
				} else {
					CacheAnalyser.I.renderCanvas(sprite, Laya.Browser.now() - preTime);
				}
			}
		}], [{
			key: "init",
			value: function init() {
				if (RenderSpriteHook._oldCanvas) return;
				RenderSpriteHook._oldCanvas = Laya.RenderSprite["prototype"]["_canvas"];
				Laya.RenderSprite["prototype"]["_canvas"] = RenderSpriteHook["prototype"]["_canvas"];
			}
		}]);

		return RenderSpriteHook;
	}();

	RenderSpriteHook.IMAGE = 0x01;
	RenderSpriteHook.FILTERS = 0x02;
	RenderSpriteHook.ALPHA = 0x04;
	RenderSpriteHook.TRANSFORM = 0x08;
	RenderSpriteHook.CANVAS = 0x10;
	RenderSpriteHook.BLEND = 0x20;
	RenderSpriteHook.CLIP = 0x40;
	RenderSpriteHook.STYLE = 0x80;
	RenderSpriteHook.GRAPHICS = 0x100;
	RenderSpriteHook.CUSTOM = 0x200;
	RenderSpriteHook.ENABLERENDERMERGE = 0x400;
	RenderSpriteHook.CHILDS = 0x800;
	RenderSpriteHook.INIT = 0x11111;
	RenderSpriteHook.renders = [];

	var SpriteRenderHook = function () {
		function SpriteRenderHook() {
			_classCallCheck(this, SpriteRenderHook);

			this._repaint = 1;
			this._renderType = 1;
		}

		_createClass(SpriteRenderHook, [{
			key: "render",
			value: function render(context, x, y) {
				if (this == Laya.Laya.stage) {
					CacheAnalyser.renderLoopBegin();
				}
				var preTime;
				preTime = Laya.Browser.now();
				if (this[SpriteRenderHook.ShowBorderSign]) {
					DebugTool.showDisBoundToSprite(this, DebugInfoLayer.I.cacheViewLayer, DebugConsts.SPRITE_REC_COLOR, DebugConsts.SPRITE_REC_LINEWIDTH);
				}
				Laya.RenderSprite.renders[this._renderType]._fun(this, context, x + this._x, y + this._y);
				this._repaint = 0;
				RenderAnalyser.I.render(this, Laya.Browser.now() - preTime);
			}
		}], [{
			key: "init",
			value: function init() {
				if (SpriteRenderHook.I) return;
				SpriteRenderHook.I = new SpriteRenderHook();
				SpriteRenderHook.setRenderHook();
			}
		}, {
			key: "setRenderHook",
			value: function setRenderHook() {
				Laya.Sprite["prototype"]["render"] = SpriteRenderHook.I.render;
			}
		}, {
			key: "showDisplayBorder",
			value: function showDisplayBorder(sprite) {
				var ifShowBorder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				sprite[SpriteRenderHook.ShowBorderSign] = ifShowBorder;
			}
		}, {
			key: "isDisplayShowBorder",
			value: function isDisplayShowBorder(sprite) {
				return sprite[SpriteRenderHook.ShowBorderSign];
			}
		}]);

		return SpriteRenderHook;
	}();

	SpriteRenderHook.ShowBorderSign = "ShowBorderSign";

	var JSTools = function () {
		function JSTools() {
			_classCallCheck(this, JSTools);
		}

		_createClass(JSTools, null, [{
			key: "showToBody",
			value: function showToBody(el) {
				var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				Laya.Browser.document.body.appendChild(el);
				var style;
				style = el.style;
				style.position = "absolute";
				style.top = y + "px";
				style.left = x + "px";
			}
		}, {
			key: "showToParent",
			value: function showToParent(el) {
				var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				parent.appendChild(el);
				var style;
				style = el.style;
				style.position = "absolute";
				style.top = y + "px";
				style.left = x + "px";
			}
		}, {
			key: "addToBody",
			value: function addToBody(el) {
				Laya.Browser.document.body.appendChild(el);
			}
		}, {
			key: "setPos",
			value: function setPos(el, x, y) {
				var style;
				style = el.style;
				style.top = y + "px";
				style.left = x + "px";
			}
		}, {
			key: "setSize",
			value: function setSize(el, width, height) {
				var style;
				style = el.style;
				style.width = width + "px";
				style.height = height + "px";
			}
		}, {
			key: "setTransform",
			value: function setTransform(el, mat) {
				var style;
				style = el.style;
				style.transformOrigin = style.webkitTransformOrigin = style.msTransformOrigin = style.mozTransformOrigin = style.oTransformOrigin = "0px 0px 0px";
				style.transform = style.webkitTransform = style.msTransform = style.mozTransform = style.oTransform = "matrix(" + mat.toString() + ")";
			}
		}, {
			key: "noMouseEvent",
			value: function noMouseEvent(el) {
				var style;
				style = el.style;
				style["pointer-events"] = "none";
			}
		}, {
			key: "setMouseEnable",
			value: function setMouseEnable(el, enable) {
				var style;
				style = el.style;
				style["pointer-events"] = enable ? "auto" : "none";
			}
		}, {
			key: "setZIndex",
			value: function setZIndex(el, zIndex) {
				var style;
				style = el.style;
				style["z-index"] = zIndex;
			}
		}, {
			key: "showAboveSprite",
			value: function showAboveSprite(el, sprite) {
				var dx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				var dy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var pos;
				pos = new Laya.Point();
				pos = sprite.localToGlobal(pos);
				pos.x += dx;
				pos.y += dy;
				pos.x += Laya.Laya.stage.offset.x;
				pos.y += Laya.Laya.stage.offset.y;
				JSTools.showToBody(el, pos.x, pos.y);
			}
		}, {
			key: "removeElement",
			value: function removeElement(el) {
				Laya.Browser.removeElement(el);
			}
		}, {
			key: "isElementInDom",
			value: function isElementInDom(el) {
				return el && el.parentNode;
			}
		}, {
			key: "getImageSpriteByFile",
			value: function getImageSpriteByFile(file) {
				var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				var reader;
				reader = new FileReader();
				reader.readAsDataURL(file);
				var sprite;
				sprite = new Laya.Sprite();
				reader.onload = function (e) {
					var txt;
					txt = new Laya.Texture();
					txt.load(reader.result);
					sprite.graphics.drawTexture(txt, 0, 0, width, height);
				};
				return sprite;
			}
		}, {
			key: "getPixelRatio",
			value: function getPixelRatio() {
				if (JSTools._pixelRatio > 0) return JSTools._pixelRatio;
				var canvas = Laya.Browser.createElement("canvas");
				var context = canvas.getContext('2d');
				var devicePixelRatio = Laya.Browser.window.devicePixelRatio || 1;
				var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
				var ratio = devicePixelRatio / backingStoreRatio;
				console.log("pixelRatioc:", ratio);
				JSTools._pixelRatio = ratio;
				return ratio;
			}
		}]);

		return JSTools;
	}();

	JSTools._pixelRatio = -1;

	var DebugPanel = function () {
		function DebugPanel() {
			_classCallCheck(this, DebugPanel);

			this.preValueO = {};
			this.height = 300;
			this.width = 600;
			this.dragArea = 10;
			this.fromMe = false;
			this._init();
		}

		_createClass(DebugPanel, [{
			key: "removeNoDisplayKeys",
			value: function removeNoDisplayKeys(arr) {
				var i;
				for (i = arr.length - 1; i >= 0; i--) {
					if (DebugPanel.noDisplayKeys[arr[i]]) {
						arr.splice(i, 1);
					}
				}
			}
		}, {
			key: "updateShowKeys",
			value: function updateShowKeys() {
				DebugPanel.tObjKeys.length = 0;
				if (!this.tShowObj) return;
				DebugPanel.tObjKeys = ClassTool.getObjectDisplayAbleKeys(this.tShowObj, DebugPanel.tObjKeys);
				if (this.tShowObj == Laya.Laya.stage) {
					this.removeNoDisplayKeys(DebugPanel.tObjKeys);
				}
				DebugPanel.tObjKeys.sort(Laya.MathUtil.sortSmallFirst);
			}
		}, {
			key: "_init",
			value: function _init() {
				var _this13 = this;

				this.div = Laya.Browser.document.createElement('div');
				Laya.Browser.document.body.appendChild(this.div);
				this.clickedHandler = new Laya.Handler(this, this.onClickSelected);
				this.debug_view = Laya.Browser.window.layaair_debug_view;
				this.debug_view.initLayaAirDebugView(this.div);
				this.debug_view.tree.attachEvent("onSelect", function (id) {
					var dataO;
					dataO = _this13.getDataByID(id, _this13._treeDataList[0]);
					if (dataO.target) {
						DebugTool.showDisBound(dataO.target);
						_this13.showTargetInfo(dataO.target);
					}
				});
				this.debug_view.setValueChangeHandler(function (data, new_value) {
					_this13.onValueChange(data, new_value);
				});
				this.debug_view.onRefresh(function () {
					DebugPanel.I.setRoot(Laya.Laya.stage);
				});
				this.debug_view.onInspectElement(function () {
					ClickSelectTool.I.beginClickSelect(_this13.clickedHandler);
				});
				this.debug_view.onLogInfo(function () {
					console.log(_this13.tShowObj);
				});
				this.debug_view.onPrintEnabledNodeChain(function () {
					DebugTool.traceDisMouseEnable(_this13.tShowObj);
				});
				this.debug_view.onPrintSizeChain(function () {
					DebugTool.traceDisSizeChain(_this13.tShowObj);
				});
				this.debug_view.onToggleVisibility(function (selectd) {
					if (_this13.tShowObj) {
						_this13.tShowObj.visible = _this13.debug_view.getVisibility();
					}
				});
				this.debug_view.onToggleDebugBorder(function (selectd) {
					if (!_this13.tShowObj) return;
					SpriteRenderHook.showDisplayBorder(_this13.tShowObj, _this13.debug_view.getShowDebugBorder());
				});
				this.debug_view.onToggleShowCurrentCache(function (selectd) {
					CacheAnalyser.showRecacheSprite = _this13.debug_view.getShowCurrentCache();
				});
				this.debug_view.onToggleShowAllCache(function (selectd) {
					CacheAnalyser.showCacheSprite = _this13.debug_view.getShowAllCache();
				});
				this.debug_view.onToggleShowAtlas(function (selectd) {
					console.log("toggle show atlas:", _this13.debug_view.getShowAtlas());
					if (_this13.debug_view.getShowAtlas()) {
						AtlasTools.getInstance().start();
					} else {
						AtlasTools.getInstance().end();
					}
				});
				JSTools.showToBody(this.div, 0, 0);
				this.initNewDivs();
				this.initDragWork();
				this.initTreeWidthDrag();
				Laya.Laya.stage.on(Laya.Event.RESIZE, this, this.adptPos);
				this.adptPos();
			}
		}, {
			key: "initNewDivs",
			value: function initNewDivs() {
				var parentNode;
				parentNode = Laya.Browser.document.getElementById("show_current_cache_control").parentNode;
				var switchNode;
				switchNode = Laya.Browser.createElement("input");
				switchNode.type = "checkbox";
				parentNode.appendChild(switchNode);
				parentNode.append("右侧");
				function onSwitchChange(e) {
					if (e.target.checked) {
						DebugPanel.sideType = DebugPanel.Right;
					} else {
						DebugPanel.sideType = DebugPanel.Bottom;
					}
					this.adptPos();
				}
				switchNode.addEventListener("change", onSwitchChange.bind(this));
			}
		}, {
			key: "initTreeWidthDrag",
			value: function initTreeWidthDrag() {
				var leftDiv;
				var rightDiv;
				leftDiv = Laya.Browser.document.getElementById("tree_container");
				var parentNode;
				parentNode = leftDiv.parentNode;
				rightDiv = parentNode.children[1];
				var isMouseDown = false;
				function onDivMouseMove(e) {
					var abs;
					abs = Math.abs(DebugPanel.getOffset(e, "X") - leftDiv.clientWidth);
					if (abs < this.dragArea) {
						this.div.style.cursor = "e-resize";
					} else {
						this.div.style.cursor = "auto";
					}
				}
				function onDivMouseDown(e) {
					var abs;
					abs = Math.abs(DebugPanel.getOffset(e, "X") - leftDiv.clientWidth);
					if (abs < this.dragArea) {
						this.div.style.cursor = "e-resize";
						isMouseDown = true;
					} else {
						isMouseDown = false;
						return;
					}
					e.stopPropagation();
				}
				function onBodyMouseMove(e) {
					if (!isMouseDown) return;
					leftDiv.style.width = DebugPanel.getOffset(e, "X") + "px";
					e.stopPropagation();
				}
				function onDivMouseUp(e) {
					if (!isMouseDown) return;
					isMouseDown = false;
					e.stopPropagation();
				}
				parentNode.addEventListener("mousedown", onDivMouseDown.bind(this), true);
				parentNode.addEventListener("mousemove", onDivMouseMove.bind(this), true);
				Laya.Browser.document.body.addEventListener("mousemove", onBodyMouseMove.bind(this));
				Laya.Browser.document.body.addEventListener("mouseup", onDivMouseUp.bind(this));
			}
		}, {
			key: "initDragWork",
			value: function initDragWork() {
				var isMouseDown = false;
				var preX;
				var preY;
				function onDivMouseMove(e) {
					if (DebugPanel.sideType == DebugPanel.Bottom) {
						if (DebugPanel.getOffset(e, "Y") < this.dragArea) {
							this.div.style.cursor = "n-resize";
						} else {
							this.div.style.cursor = "auto";
						}
					} else {
						if (DebugPanel.getOffset(e, "X") < this.dragArea) {
							this.div.style.cursor = "e-resize";
						} else {
							this.div.style.cursor = "auto";
						}
					}
				}
				function onDivMouseDown(e) {
					if (DebugPanel.sideType == DebugPanel.Bottom) {
						if (DebugPanel.getOffset(e, "Y") > this.dragArea) return;
					} else {
						if (DebugPanel.getOffset(e, "X") > this.dragArea) return;
					}
					isMouseDown = true;
					preX = e.pageX;
					preY = e.pageY;
					e.stopPropagation();
				}
				function onBodyMouseMove(e) {
					if (!isMouseDown) return;
					var curX;
					var curY;
					var dX;
					var dY;
					curX = e.pageX;
					curY = e.pageY;
					dX = curX - preX;
					dY = curY - preY;
					if (DebugPanel.sideType == DebugPanel.Bottom) {
						this.height -= dY;
					} else {
						this.width -= dX;
					}
					this.adptPos();
					preX = curX;
					preY = curY;
					e.stopPropagation();
				}
				function onDivMouseUp(e) {
					if (!isMouseDown) return;
					isMouseDown = false;
					e.stopPropagation();
				}
				this.div.addEventListener("mousedown", onDivMouseDown.bind(this), true);
				this.div.addEventListener("mousemove", onDivMouseMove.bind(this), true);
				Laya.Browser.document.body.addEventListener("mousemove", onBodyMouseMove.bind(this));
				Laya.Browser.document.body.addEventListener("mouseup", onDivMouseUp.bind(this));
			}
		}, {
			key: "onClickSelected",
			value: function onClickSelected(target) {
				if (!this._treeDataList) return;
				this.debug_view.tree.selectItem(IDTools.getObjID(target));
				this.debug_view.bounceUpInspectButton();
			}
		}, {
			key: "updateLoop",
			value: function updateLoop() {
				if (this.tShowObj) {
					this.showTargetInfo(this.tShowObj);
				}
			}
		}, {
			key: "onSelectItem",
			value: function onSelectItem(obj) {
				var tTarget;
				tTarget = obj.target;
				this.showTargetInfo(tTarget);
			}
		}, {
			key: "onValueChange",
			value: function onValueChange(obj, newValue) {
				if (obj["type"] == "number") {
					newValue = DebugPanel.mParseFloat(newValue);
				}
				if (obj["type"] == "boolean") {
					newValue = newValue.toString() == "true";
				}
				if (this.tShowObj) {
					var key;
					key = obj["key"];
					this.preValueO[key] = this.tShowObj[key] = newValue;
				}
			}
		}, {
			key: "showTargetInfo",
			value: function showTargetInfo(tTarget) {
				if (!tTarget) return;
				this.debug_view.setVisibility(tTarget.visible);
				this.debug_view.setShowDebugBorder(SpriteRenderHook.isDisplayShowBorder(tTarget));
				var i, len;
				len = DebugPanel.tObjKeys.length;
				var key;
				if (this.tShowObj == tTarget) {
					for (i = 0; i < len; i++) {
						key = DebugPanel.tObjKeys[i];
						if (this.preValueO[key] != tTarget[key]) {
							this.debug_view.changeValueByLabel(key, tTarget[key]);
						}
					}
				} else {
					this.tShowObj = tTarget;
					this.updateShowKeys();
					var dataList;
					dataList = DebugPanel.getObjectData(tTarget);
					this.debug_view.setContents(dataList);
				}
				for (i = 0; i < len; i++) {
					key = DebugPanel.tObjKeys[i];
					this.preValueO[key] = tTarget[key];
				}
			}
		}, {
			key: "adptPos",
			value: function adptPos() {
				if (this.fromMe) return;
				this.fromMe = true;
				if (DebugPanel.sideType == DebugPanel.Bottom) {
					JSTools.setPos(this.div, 0, Laya.Browser.clientHeight - this.height);
					this.debug_view.resize(Laya.Browser.clientWidth, this.height);
					if (!DebugPanel.overlay) {
						Laya.Laya.stage.setScreenSize(Laya.Browser.clientWidth * Laya.Browser.pixelRatio, (Laya.Browser.clientHeight - this.height) * Laya.Browser.pixelRatio);
					}
				} else {
					JSTools.setPos(this.div, Laya.Browser.clientWidth - this.width, 0);
					this.debug_view.resize(this.width, Laya.Browser.clientHeight);
					if (!DebugPanel.overlay) {
						var newWidth = 0;
						if (Laya.Browser.clientWidth > this.width) {
							newWidth = (Laya.Browser.clientWidth - this.width) * Laya.Browser.pixelRatio;
						}
						Laya.Laya.stage.setScreenSize(newWidth, Laya.Browser.clientHeight * Laya.Browser.pixelRatio);
					}
				}
				this.fromMe = false;
			}
		}, {
			key: "setRoot",
			value: function setRoot(sprite) {
				var mtreeo;
				mtreeo = DebugPanel.getSpriteTreeArr(sprite);
				this._treeDataList = [mtreeo];
				var wraped;
				wraped = {};
				wraped.id = 0;
				wraped.item = [mtreeo];
				this.debug_view.setTree(wraped);
				Laya.Laya.timer.loop(500, this, this.updateLoop);
			}
		}, {
			key: "getDataByID",
			value: function getDataByID(targetID, nodeO) {
				if (!nodeO) return null;
				if (targetID == nodeO.id) return nodeO;
				var childs;
				childs = nodeO[DebugPanel.ChildrenSign];
				if (!childs) return null;
				var i, len;
				len = childs.length;
				var tRst;
				for (i = 0; i < len; i++) {
					tRst = this.getDataByID(targetID, childs[i]);
					if (tRst) return tRst;
				}
				return null;
			}
		}, {
			key: "getDataByTarget",
			value: function getDataByTarget(target, nodeO) {
				if (!nodeO) return null;
				if (target == nodeO.target) return nodeO;
				var childs;
				childs = nodeO[DebugPanel.ChildrenSign];
				if (!childs) return null;
				var i, len;
				len = childs.length;
				var tRst;
				for (i = 0; i < len; i++) {
					tRst = this.getDataByTarget(target, childs[i]);
					if (tRst) return tRst;
				}
				return null;
			}
		}], [{
			key: "enable",
			value: function enable() {
				var underGame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
				var bgColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#ffffff";

				if (!DebugPanel._enable && !DebugPanel.I) {
					DebugPanel._enable = true;
					DebugPanel.overlay = !underGame;
					DivScripts.init();
					DisplayHook.initMe();
					DebugTool.initBasicFunctions();
					RenderSpriteHook.init();
					SpriteRenderHook.init();
					DebugPanel.I = new DebugPanel();
					DebugPanel.I.setRoot(Laya.Laya.stage);
					CacheAnalyser.showRecacheSprite = false;
					if (bgColor) {
						DebugPanel.I.div.style.background = bgColor;
					}
				}
			}
		}, {
			key: "getSpriteTreeArr",
			value: function getSpriteTreeArr(sprite) {
				var rst;
				rst = {};
				rst[DebugPanel.LabelSign] = "" + ClassTool.getNodeClassAndName(sprite);
				rst.target = sprite;
				IDTools.idObj(sprite);
				rst.id = IDTools.getObjID(sprite);
				var childs;
				childs = sprite._children;
				var i, len;
				len = childs.length;
				var childsList;
				childsList = [];
				rst[DebugPanel.ChildrenSign] = childsList;
				for (i = 0; i < len; i++) {
					childsList.push(DebugPanel.getSpriteTreeArr(childs[i]));
				}
				return rst;
			}
		}, {
			key: "getObjectData",
			value: function getObjectData(data) {
				var dataList;
				var tData;
				var key;
				var tValue;
				var tType;
				dataList = [];
				var keys;
				keys = DebugPanel.tObjKeys;
				var i, len;
				len = keys.length;
				for (i = 0; i < len; i++) {
					key = keys[i];
					tValue = data[key];
					tType = typeof tValue === "undefined" ? "undefined" : _typeof(tValue);
					if (key.charAt(0) == "_") continue;
					if (DebugPanel.displayTypes[tType]) {
						tData = {};
						tData["key"] = key;
						tData["value"] = tValue;
						tData["type"] = tType;
						dataList.push(tData);
					}
				}
				return dataList;
			}
		}, {
			key: "getOffset",
			value: function getOffset(e, sign) {
				var target;
				target = e.target;
				var cTarget;
				cTarget = e.currentTarget;
				var kSign;
				if (sign == "X") {
					kSign = "offsetLeft";
				} else {
					kSign = "offsetTop";
				}
				var value;
				value = e["offset" + sign];
				while (target && target != cTarget) {
					value += target[kSign];
					target = target.offsetParent;
				}
				return value;
			}
		}, {
			key: "mParseFloat",
			value: function mParseFloat(v) {
				var rst;
				rst = parseFloat(v);
				if (isNaN(rst)) return 0;
				return rst;
			}
		}]);

		return DebugPanel;
	}();

	DebugPanel._enable = false;
	DebugPanel.ChildrenSign = "item";
	DebugPanel.LabelSign = "text";
	DebugPanel.displayTypes = { "boolean": true, "number": true, "string": true };
	DebugPanel.displayKeys = [["x", "number"], ["y", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"], ["width", "number"]];
	DebugPanel.tObjKeys = [];
	DebugPanel.noDisplayKeys = { "desginWidth": true, "desginHeight": true };
	DebugPanel.Bottom = "bottom";
	DebugPanel.Right = "right";
	DebugPanel.sideType = DebugPanel.Bottom;

	var Base64ImageTool = function () {
		function Base64ImageTool() {
			_classCallCheck(this, Base64ImageTool);
		}

		_createClass(Base64ImageTool, null, [{
			key: "getCanvasPic",
			value: function getCanvasPic(img) {
				img = img.bitmap;
				var canvas = Laya.Browser.createElement("canvas");
				var ctx = canvas.getContext('2d');
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img.bitmap, 0, 0);
				return canvas;
			}
		}, {
			key: "getBase64Pic",
			value: function getBase64Pic(img) {
				return Base64ImageTool.getCanvasPic(img).toDataURL("image/png");
			}
		}, {
			key: "getPreloads",
			value: function getPreloads(base64Data) {
				var rst;
				rst = [];
				var key;
				for (key in base64Data) {
					rst.push({ url: base64Data[key], type: Laya.Loader.IMAGE });
				}
				return rst;
			}
		}]);

		return Base64ImageTool;
	}();

	var Base64Atlas = function () {
		function Base64Atlas(data) {
			var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			_classCallCheck(this, Base64Atlas);

			this.data = data;
			if (!idKey) idKey = Math.random() + "key";
			this.idKey = idKey;
			this.init();
		}

		_createClass(Base64Atlas, [{
			key: "init",
			value: function init() {
				this.replaceO = {};
				var key;
				for (key in this.data) {
					this.replaceO[key] = this.idKey + "/" + key;
				}
			}
		}, {
			key: "getAdptUrl",
			value: function getAdptUrl(url) {
				return this.replaceO[url];
			}
		}, {
			key: "preLoad",
			value: function preLoad() {
				var completeHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this._loadedHandler = completeHandler;
				Laya.Laya.loader.load(Base64ImageTool.getPreloads(this.data), new Laya.Handler(this, this.preloadEnd));
			}
		}, {
			key: "preloadEnd",
			value: function preloadEnd() {
				var key;
				for (key in this.data) {
					var tx;
					tx = Laya.Laya.loader.getRes(this.data[key]);
					Laya.Loader.cacheRes(this.replaceO[key], tx);
				}
				if (this._loadedHandler) {
					this._loadedHandler.run();
				}
			}
		}, {
			key: "replaceRes",
			value: function replaceRes(uiObj) {
				ObjectTools.replaceValue(uiObj, this.replaceO);
			}
		}]);

		return Base64Atlas;
	}();

	var Base64AtlasManager = function () {
		function Base64AtlasManager() {
			_classCallCheck(this, Base64AtlasManager);
		}

		_createClass(Base64AtlasManager, null, [{
			key: "replaceRes",
			value: function replaceRes(uiO) {
				Base64AtlasManager.base64.replaceRes(uiO);
			}
		}]);

		return Base64AtlasManager;
	}();

	Base64AtlasManager.dataO = { "comp/button1.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABRCAYAAAApS3MNAAABSUlEQVR4Xu3a0QmFMADFUJ1JXM0h3moPZ6qg4AoNeLqAIenFn65jjLE40w2sQkxvcAMI0eggRKSDEEJUDEQ4/COEiBiIYFiEEBEDEQyLECJiIIJhEUJEDEQwLEKIiIEIhkUIETEQwbAIISIGIhgWIUTEQATDIoSIGIhgWIQQEQMRDIsQImIggnEvYvv9IzjfxDiP/XlgJsTcCyDEXP/v14UQImIggmERQkQMRDAsQoiIgQiGRQgRMRDBsAghIgYiGBYhRMRABMMihIgYiGBYhBARAxEMixAiYiCCYRFCRAxEMCxCiIiBCMa7iAjPpzG8fY3kF0KIiIEIhkUIETEQwbAIISIGIhgWIUTEQATDIoSIGIhgWIQQEQMRDIsQImIggmERQkQMRDAsQoiIgQiGRQgRMRDBsAghIgYiGBYhRMRABMMihIgYiGBcGJiOHTRZjZAAAAAASUVORK5CYII=", "comp/line2.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAG0lEQVQYV2NkoDJgpLJ5DIxtra3/qWko1V0IAJvgApS1libIAAAAAElFTkSuQmCC", "view/create.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAAAdElEQVQ4T2NkwAIWLFjwH5t4QkICIyM2CXQxmAHka/j///9mXDYxMjL6YtgwBDUg+w8crIT8MBQ0oEca55JvWNPS9xgu4tISzADyNfz///8MnrRkgmHDENSALWng9fRQ0DA40xLecglbWhpqGoZCMUNKUQkANAHAJVkE5XwAAAAASUVORK5CYII=", "view/rendertime.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAABeUlEQVQ4T+2Uv0tCURSAvyNdcwiXBlsaaomWFgeHlqAtCPsDJHwIiUtDSxERtErtmQ6CjkHo4FpDBQ0tbVFR0BYE0eQvOnFF7T17QlOTd3m88873OD8+rtA9uVzOBIPBlIisAwvd8B1QajQahXQ63bIx6QHFYrEEJHrv7qeqZhzHOfYA+Xw+Yow5B+YHoGwymdxW1QAQEFWNAk8i8uEDuZM3gUcLZIEJYNcNqWrVcZyd7p9t8jLwYIFTYBx47UHlcjmcSCQ+B5JtpU0LnAFj3br7kE+yTalb4BCYczVqoT3AjteW4T73FlgFNgY+1IGQz4hPLGCAI2DGbweu2Auw1Vmcqk4C+8DsEOgZOBCR9/6mVdU2vgIsAdOuIVwANRFpezatuahpTYVSop1m+y6pasm8NQqSvvW61KwslkSHuCRkgvErr0taiUXaal1Sr0siWRO/9HfpF+RN9nfpB/qqmrXrv7mktVhYVm5GLo1cct9LI5e8d84/3UvfAgdlKH0EO7MAAAAASUVORK5CYII=", "view/cache.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAkCAYAAABSSLCCAAAAcElEQVQ4T2NcsGDB/4SEBEYGBgYGYtmMxCpENhhsA6mA8f///5tHNTEwkBcQpIYcSD15kUtWigi51vR/jVYdOGUQy2YkViGywWSnvTOkhiAonkY1gZIRqSEHTntkRe4g10RWQIyWe5Bgo2O5R7dkBADztyP+yFzirAAAAABJRU5ErkJggg==", "comp/clip_selectBox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAAAIeF9DAAAAsElEQVRoQ+3ZQQ0AMQzEwAuqEgh/Sj2pKObhIrBsrfLonHPu12MMTEGYFg+kIFaPgmA9ClIQzQDG0w0pCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBmd/tTh6IUBIrx/tRbiFWkIFaPFoL1KEhBNAMYTzekIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LwYL8U/BE1dCJ3PsAAAAASUVORK5CYII=", "comp/label.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAASCAYAAACQCxruAAAAmElEQVRoQ+3aMQqAQBBDUef+hx4Zq1mrbPnhWylECHmghVZ397OOqqp97TlugdNzgEXFIaaFuwROt0LmBEay5aXb920+FjIpMJItLy1wvhUyKTCSLS8tcL4VMikwki0vLXC+FTIpMJItLy1wvhUyKTCSLS89wPP1Qeh8M0zy+84gMMbruqjA15OxbtjAu7mPa5bj0fb/A8cLgD4n/wQKNiIAAAAASUVORK5CYII=", "comp/clip_tree_arrow.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAwUlEQVQoU5WRPRKCMBCFWUt6vYQeB06RUDpoBbFDa7yDwm30FGi9dHnOMiQDBgvT5c3b7+0PRVEUlVV9A3NmzL6T//SRfMz5CgCdtVafjlmzaHAigAbM2tE8YVo1pf0yvABoc9D3wACgBbMKIgD4qqDJsqqlMV8VGL5n/88geCJKlijSMBXFZUNx/CSi9WwX1r7R99thzKKqkxXRbMUWSE2u2sEwHsxHCbrMVSq6N4xRD9HAvJstylEkarhurlqnfQC58YP5+CvQNwAAAABJRU5ErkJggg==", "view/bg_panel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMUlEQVRYR+3QQREAAAjDMGZk/l2CDD6pgl7SduexGCBAgAABAgQIECBAgAABAgS+BQ4oyStBhXcy5AAAAABJRU5ErkJggg==", "view/bg_top.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMUlEQVRYR+3QQREAAAjDMKZp/rWBDD6pgl7SduexGCBAgAABAgQIECBAgAABAgS+BQ6WyDMhXMLeQgAAAABJRU5ErkJggg==", "view/clickselect.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAACfElEQVRIS8WVO2iTYRSGn5OWqpMOurg0VRBdVVCsg7GgDjpZECyirl4GEYfSgBlaB5VSpApdxCJIoeKgg7dKC21ALahIiyiKKUjxAiI4qCH1lRP/hPhfAnHpGZPv+c4573nP95ukO/xHmINmtq8RtswsPiipB/gAPAFem5nCbcSWKukIsD84/A2YBh4DL8ysWLkk0qOkDcD5GLF+Ac+Ap35ZHGjAdWB5gtJvgZFYVSWdBHaFwBlg1Mw8K0ngFiAbAm+a2XBij/6HpBbgBrAEmAVeAZ1AFU40QDCWrcBZL0/S4Vq4HtgB7DWzU5XyauDBMhhWz70ryVVdb2ZuhGpI2g1MODjfiMFrxZk3s9WNwJ6snHFxQUlXgXfAPeC5mf2O2Y5oqZLcMceCw1+AseCSSTP7mSiOpM3A7RixfvgYgAd+WUQcSSnfPWBlgtIvgf5YVSVdBA6GQF/mS2bmWcvbERmHJF+payFw0MzO1TWApKXBViwL3h5/Pk4AVTjRAMFY9njJXl6wLccrcD3wAHDUzBwuRw18JtbkbkFJruomM7sf2o4u4Jals/mFRgxeFcfBQm97UyOwM+WMiwums/k3QnMps+HWpuLIRC5TCrcRW2pbT35MRiY4XDRsVmiU5uJQIZfxb0k5Ij229eQPySJ287MLGO8Rd1M0XY6AO3LjzYVSy3fAH+VICL4a6o9VtTWbnzbYGKI+IrtQ6Ns2EFuq/5jOTnWD9f4DikeFvvbqhyg2Yzo3voJSy2fAjfEJMYPRQQ2caAAfC7AW2WkvrzU79dCwnRW4Hjgg6JrrbV9VKbkKw1Csyd2Ca7on1y2krHOub3t16//2n79SarbsH7BKtfejoCjmAAAAAElFTkSuQmCC", "view/resize.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAABeUlEQVRIS+2UvUpdURCFvxXRKJpIEBURsVAIiiBoaaGCjY2VLyH4MBaCPoWlnQlpI6SxsQmkURQL5eK/6JK57iuRnMPZtxAkuOFUhzWz96xvjcg8tluAT5LOQqJMHba/AgPAD0nOEtruAOaB6Lon6U+ucAoYTLe7Bb5XCm1/BCaAXqAVOAHyOkYn27PA5/TGWmXHxvBeT2i7TVIM4MUp7ZhGPlY3V/pVKUxEjAIjyac74LIAjK70PwCoyfYXYDJwyqDoHtiRdFOfql0naBgIrILF/ZIi1yH6h1XbYXCPpKOq7s34GEX7JB00m445YBzYlPSQ1dF2N7CaWN2W9DNXuJxAj1uGVeuVQtvh32LyuR34DexWCv+CfAXoBzYkHb8Boe1OSRcFkBdfNY18IQiUtFUpTJjNAPEFHVfAaQFyjZ3zNBzbQ8BSWkZViEbk1uIpjXR8AKbT7jwEvpVUqEk6L0pHLN5hSWWxeq7XjI/v6Sgz0vZ7Ov7DdDwCkcb1m86tSukAAAAASUVORK5CYII=", "view/clickanalyse.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAAC7UlEQVRIS5WWT2hUZxTFfyfGFolkoUVKrHQiEaX+IfgHa54UQzUqpWYhLbQU6ULNwgYXuog6yiiTgK2LgtAu6yqbFkpRBEURQzJEBN200NqKkxoDLnQhFUrizJU7vje8SSbzZr7FwDy+c75z7z3nfU80uMxMDin9JC0zewvYAHwIrAH65wWaWQuwOdy8CVgUHnBd0sUKoJktBbYC24B1QHMVNeck3ZWZrYhtXpUg/3/gS0kzDnT2/cDqpFqBUUnnK5pjZutDgo01Tr0g6XbVrprZypBgO9AUU/EK+ErSyzLQzC5XkTkCfBR7fl/Smeh/qasOlPRp9DAkOgp8H5P9o6SriUAnMrOzgNdswNeSntcL9IYNAQ8kHYuXU5Y6u8ZIupldAO5I+nkOsNb8wjk/ljTZKFCSvMbSMrPSiOpNx9uAz3UP4IbfWSsdrcDH4eZuYHF46LCk47PT8S6wG9gbJmRhlfoPSLrhJvdERJs7E+S73dZKmnagsx8JB50UEHdY3+x0dIUEO2qcekTSr/OlY21I4N5dEJMwA6yX9CKejqkqGn8DemPPb0v6YrZXpyS1xYbsRD3AtZjsk5IuJQKdyMyGAa/ZnbNR0tN6gd6wXwAP8SfV0jGnxki6mV1xyf4ubdTkPue/Jf3TEJCMNZFRMQLtyNwqvaTrSkdHZry1MFM8bLLPgY5U8/SyeYHvncotb5b1A/t8c2QGg3sT2WBLBbD95PiGogr9Ej0Gbap8r4ZJ5kR+MPhW7WdGd5npEFaa15IE+YWW5uklf2S6/1N7OnfasG+Ad5KiAfyVzwYfVDQnlc71YTaA8Ntrvtq/y2eDgapdTZ0a60UMhjdvmcCgWDClJge7npSBqfRYYY5M6U/M/NqO1mQ+G7xf4VUH5rNBOXtviLQfzH0afizop0fZroOJQCdKpcfyUKrZFhTpfDgU/F4nMNcH9gPwLJ8Nls3xarUaI+mp9NhTg5GJbPBZQyb3OReayP17rutmHPga1PpCOk+zrlEAAAAASUVORK5CYII=", "view/res.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAADwUlEQVRIS+3WT2gcdRQH8O/b2SwNC7l4MAEPvbilUkoPOUmLjSDrZn4hxYKH/kGwyB4tQogiu/N+GymyoWguhVBQKKkHQTHsW9fUQwqKp4AgtMXkInhILl4CkoTdmSe/6XZp2pntLli8uMedt9/3mze/33yW8Jw+9Jxy0TeYmV8FcFVVTxPRiwA6AP5U1TvZbHapUqn8nrawxGBVJWvtNVWdJ6K05h1V/dhaW08KT/wRM1sAVQCRqn5JRLdyudw9Iora7faJKIrKqnrBNSWiahAEC0+GHwpm5utEdD+KopsuBMDbzPxt0oqstRdV9Za7lslkzlar1Z8erzsUHATBJhG93C34fmJi4ly5XG6nzTEIgjoRzanqkrX2amowM98F8Fq3wK34PWb+Ii14cXExv7e3V6hWq78+axQrANwt/kVEl5j5h0G2IzMfUdWCtfa3R/VPzvhTAG8AOM/MfwwYehTANwB+ZOYPE4ODIDhJRJvMvD9IqLW2GEXRbSJ6AcBtZr6UGPzoS2Y+lc/nt+bm5v5Oa2CtvaKqywC8bs06M7+eGszMn7nTBqDOzPNpwcvLyyPb29vfAZh2Naq6Za0tpAbXarUzURS53eGKL1trv0oKZ+a3AHytqplMJlOOoui4tfaDvqOw1lZUtabubBOtqOqN0dHRB/v7++62XwHwDoB33dkAUGPmoO92e/yitXZeVT8BkE1acbdpPQiCj4hIBw52hQsLC8c6nc77AN4E8FK3yQ4R/Qzgc2b+Je0ZDPU+fjiZp1eXFD5U8CB7u+/DGybgXxnFMA3/m1GISGwegNMAeuYBuON53lKpVBrePBG5RkTuSPc1b2ZmZnDzRKRnHoDYvIODg3u5XM69/E8AKAO40G1aNcb0N6/ZbF5X1fsAbjpInXnGmETzGo3GRdew+0DPGmPSzRORTQA988bHx89NTk6mmtdoNGLziGjJ9/1085rN5l1VPWSeMSbVvLW1tXwYhoXp6en+5olIbB6A2Dzf9wcyb319/cju7m5hdnY22TwRic3zPO98qVQayLxWq3U0DMPYPGNMsnmrq6snx8bGNqempgYyT0SKzjoAsXnGmP7mNZvNU9lsdqtYLKaaJyJXABwyzxiTbp6IxOYRUd33/VTzNjY2RnZ2dnrmAdgyxqSbJyJnAMTmEdFl3/cTzROR2DzHk6qWiei4Maa/eSJScZY99FRXPM+7MTIy8iAMQ6/dbsfmEVHPPGPM4OaJiBtDqnmuqfuL4Pv+8Oa1Wq1jYRg+ZR6A2DxjzP/mPRupfwAf56Q4urCh6QAAAABJRU5ErkJggg==", "view/tab_panel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAABICAYAAADyMAW8AAAAcUlEQVRYR+3WsQ3AMAhE0TCMeyTvP1tShRQo7lxYegxA8fUPLuac97VhwuKXKhTlFxRQ9GPDClawYvGEDwxIZu7pFRZXr4ACinY1ghWsYMX/NxWQr22edyvGGHt6hcV1NqGAon8QVrCCFYteISDnBuQB3xJuQcDkEngAAAAASUVORK5CYII=", "view/btn_close.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAqCAYAAACz+XvQAAACmUlEQVRIS7WWS0/bUBCFz7mJmyZxENm06mNVoVZC7LqGn9FNqy55/BSWSEhs2/4uuqFVoA150JLKJvGdaiIH2TfXNoKQpeP5PHPO3GMTK/5xxTwsAUWkBeBZ+qAByb/Zh4pIA8CL9NqY5Dj7vw9YA/ABwDsAfwB8ITnUIhF5CuATgNcAfgH4RnJSCkwLl6AA/lXBtLZQQxFxoTr6q6LOFl2WmuJAtcY7ZuXIixsczfRyTlPfhpSN7BpwBeBtFdQLFJE2gI8AXi7GBBBl3Fdnv5L87XbpWxuFfQbw3NXM0dQLLdrDIH3ylGTiLLYB8CS9lpCc3tmU+xzL1Z9lEXl/n06KavjowCiK1uM4fqMd1Ov1s3a7fZntZjabtSeTiQYHgiC4aLVavZwpbofT6TQYDAaH1tod3bMwDHc7nc5PLZrNZmG/3z8WkS1jzGm32z1oNBqjUqD+6YM2m81xFWyeNkUaulAAlyKyWdTZbdqUmZKFakEVrLRDV7P5zY6m3rQp6tA1AMC5tXY7he51Op0fdwbGcdwdDodHWc2MMdcL9wGM1tbW9sMw/L6UNm6HChuNRifW2g1XM0dTL3TJZS1KkkTDFbVaLQqCIJcm6k0URRpxuvg39Xo9rtzDh5zt1Z/lXq+32rR5dKC1dt0YM08bAGd65BxN1ZB52ojIBcl82rgdWmsDkocAdgDoW22X5DxtSIZJkhyT3AJwCuCAZD5tfCP7oMaYcRVs/tAiDT1QHX2zqLPbtCkzxYFqjXfM3GKXAR3NtC6nqTccioAeA84BbCuU5B4Af9r4gCLSBXCU1UxErjPuj0Rk3xiznDYuMIWdANhwNXM09UKXXNai9LtQ9y4yxuS/XUijr9L0lXBDMp82j370HhJdWvsftiHJYFPSIqEAAAAASUVORK5CYII=", "comp/combobox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABCCAYAAAA476rKAAACfElEQVR4Xu3bMYsTURQF4PMmExgIWkgEU5hskyJYxGYKY5VS7NzCylL8Bftj3NbKQjuxTBWbaUwhKdIYLCJotlACA5m8kQTZZZkkeN9dbuNJOXPPu/DN5ZHkMa7dbpfgx0TAEdvEedeE2HbWxDa0JjaxLQUMe3HPJrahQECrNE3RarUOJheLBbIsq9znZAdgJ0mC4XCIer1eSa/Xa4xGI+R5TuwA272RTqeDfr9fuTeZTDCfz/dmONkK/cFggGazebnCcrnEeDw+uCKxFdiNRmO3nURRBO/9bvtYrVbEVpgejXa7XfR6PUynU8xms6O1nGzlU3DO7fbu7V5dlsf/0yO2ElsSJ7ZES1lLbCWgJE5siZaylthKQEmc2BItZS2xlYCSOLElWspaYisBJXFiS7SUtcRWAkrixJZoKWuJrQSUxIkt0VLWElsJKIkTW6L1t5an6wFooRGerofKBeZ4uh4IFxrj6XqoXECOp+sBaJoIT9c1esIsT9eFYFbl/J5tJc13agyliU1sWwHDbtyziW0oYNiKk22JfXJ6xnfXjcDdFttnb43a/b9tovQ5iG30/IltBL1tQ2xiGwoYtuJkE9tQILBV/ugl4rh2MF1sPJJP59fuc7IDsTe37mHz8Bki+MoKHhFqn9+j9vs7sQN9K7G89xRx837levHzG5Lph8p1TrZK3iF//ApxdLVI4YFk/BpA9Uc5sVXYwObOCfyDJ3AoUcIh+vIRtYuve1clthJ7G8/7p4hv30Xx6weSybuDKxL7BrARxcjTF0iyN4AviH0Tpto1ONlaQUGe2AIsbSmxtYKCPLEFWNpSYmsFBXliC7C0pZfY2oWY/zeBP8uaLni/AFTVAAAAAElFTkSuQmCC", "comp/textinput.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAWCAYAAACv8OArAAAAZElEQVRYR+3UQQkAMAwEwcZI/LtsoSL2NTGwMByZ3b3HJQIDO3H+EdidNezQGjbsUiBs+dmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4Ew9QBe0R29X9x+dwAAAABJRU5ErkJggg==", "comp/vscroll.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAhCAYAAAA/F0BXAAAAOklEQVRIS2N8+OzVf2YWFgYmJiYGcgHjqCEYQTcaJpipaTRMRsOEmDJmNJ2MppPRdEJMCIymE2JCCQAYonwDuu2VMAAAAABJRU5ErkJggg==", "comp/vscroll$down.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAzCAYAAABxCePHAAAC/klEQVRIS+2WS0wTURSG/zszBcrLFVvjio0LiAqRRDAmGpRodFE1MQQQkOKGqBujRo3ExLjB4MaKgDzUaGQhvoJGYwAjYoioERcuDGxYEIwPkBY6nWvObXuLnXZaSklYOIu5M/fxzZn/nvPPsInJKa5qGhRFQaIH+w8xSbcymtTd+gBFYXAdyjM9sf7ORxgGR0t5/j9jpkhq2t5B0xQwBrgqNsnJ9V0j4BzQdQNtNYXWkKz0NDiaXkBTFTCFoaWmCHVtQ+AGh+4z0HNiO2bmPNYQGiXQvkuPoaqqiIgi8Pl8eHBqtwlA86MKS6Cy8z1gjIFzjqcXHBEBlpBgRNuOd+HVlYqogJiQIChcg/BtW5k8SaSSkxPJ5PRPTttHfkI7kcghIpn8NYfp33NLXp+TnYG1OWvA3ox9499nPSjdkCsgHJxOIjc43VMrugL9dEUD4Oj/PA4CsUfDX/jOjbmisHTDCCzi4t4QgLDrQF+qTYOmqhgYGw9BvLpv0ZNjQwieaU9b7ZCDriFhSt3VBSZNartHA6aUJ7SK+jqO5n5pSp1HiqSw1e3Di0ypwBpiU1XsudwnTanraDEqrg2GmZLbGkJh2jQVZY29JlPqPe03JX/uxLE7Nk3DjjP3pCn1Ne7HrNsjdYoLQsmWYtNQ3NCBgeZKzLrn/foEoogbQgvSUmz4454P7VQikGhpHzGSZdVOUqqYTGli6gemZ9yJ+0lSTalk/TrxtQOYaBnESbTinokev4UG+p+9/xoyJQKQn8x7vf7JjEFZ1FJBBvuC12RINIdAwtkIQuksnxgHhKBUZ6scQtLSNyiWJpav47z9STjbjfJ8k5iVN0eEs911bhZjUTWpbR+RztZ6uFBERNCq1rfS2e43lFhDsjPscDS9lM7W4dyCquuvpbM9PFkq0iHm7mSl2yP+bj05uxdeXZe5FHOL6Xdr17nQ79bziwew4NXFqwUTMiaEtKBPwtZjnRi8WgXPglfqsyQITc60pwpAeNpH1GRZtRM0pWVVcTJM6S+dYaRsIf025wAAAABJRU5ErkJggg==", "comp/vscroll$bar.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA/CAYAAAAGyyO8AAABYElEQVRYR+2Wv0sDMRTH30tarCg6dRWnQnFT6OiqoP+tk+Cig+AiHayDiNSlg+jgD47K1US+Lwm5s4o/mkElN1xy73KfcF/efTi+Ht3Y0X1Btw8FffdoLy3QSnuZ+HhwZe+exrS13hGGJYsTWSszN0rJ1zHDDbJ0eDYkgHjv5Nxub3TIGEsTY/xDVq6NAN7MfW2u2aCG1nQ0GEZIOXmp7Pw5BPDF+VaGIGQfbM6k0ng5kw8/wF/eJzP5JInZkjg2CSS8zk6vCys7Wb8r5qqsncAP+pdR1Lu9rvgVT4uYg+3F+PCtAzjzu/taKdKKBSS2/wkEMBg/Q+rB50zqzZb7ZPoD/GeZ1HySxGxJHJsEEl5nc22VmCFalpFJTjLKNUtFxlDfP72IogYAP8PPZekWM5OqjErFWpjjbxprABJRA/JYjOOOX4Bgo6bWGYKsfMg5k+lmy5n8uUxm8kkSs6Vw7Cstibc9Fv5vWQAAAABJRU5ErkJggg==", "comp/vscroll$up.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAzCAYAAABxCePHAAADF0lEQVRIS92WTUhUURTHz31vPv0KKmkXrtxUGNomkCANLdCUpEatJFuIClIEFRl9kGH0BYWQElLpotGKEJXAtKQooYUFpi1axLQZMCyyZJqv926cM2/uTM288emoUHfx3v16v3fuuef+72Hume/c7/cBAwaLKWaLBZjLPc0Zk0CSJGBs4SDOObDP7i9ckuXkIbLJRJDFFrJk2SGNvZNwy7ExoZEJLWnqfQ+4SlUFaHNs0gXpQhq6x0GWGe0Y7oCicGivyYsLigup7XgFJlkCJjFwNm2HqrZR4CqHoKLC3fr8GFAMpPLqEJhMoZjpay6Bnx4vpKfYoLx1kCwKBlXoOV78BygGsudCH1nwtNVBgHBBUFFzL1n0+Gx5YghOxhINiAbFG1uZODESxf+bJShKrulv8HUusp1G/IBz1qTZIGvdamBjU584Aopzs+lbDhwfFFgc2/imLq0fazgAHF5MumBtuh3YwJsPfGdeNqgY1qqqfcSprRLgr7rWZzWbwCTL8HLKFYEEgkrUn+eHIDzNbltBSG33O+jcnxNZmrYcw5Yc7hoXotRenRPyz0IgBzrGYkTp9qEtxiEV10eEKD08Wgh7bzwTonSvIV/soK5jd53rE6I0eGY3/PL5wWYxQ+nFgShRKqK6LqTwhJNEafRKNQHCcWK3WmDHqR5NlMoSQzAWUV+9vkBMsKXYLCSbs3Oe+SGqqupGrIL3h3YclifYkjo7yZ7izIzUUGrhnvXAzA+PURkR8xCwPnMVsCUVpW0bsiCUKOH9S0980JvaLJSQUTal9Q+9/RgRJQSgnvgCgdBkxkCKektSpC9cR0HCOQgiZUMI3njijwYg+COzLP9rkLr7E3Dn4Gbhp7BPDC+n0TkhlK2zJpccuSBIfVdsutVdt9U4pLbjtVC2B0cKYN/N50LZHh0rFGGguztV14aFsvWfLiVhSrVboaSlXyjbk/NlBNKFVLT0k7INX3KAx+sXfkBlKzjpJItGLlcmhmSkptAB83h9MTuCICxBRUkMwUmY5+uFPY7LmJ7GW05SZycsSos9xUsmSr8BfgGeWI6+BgEAAAAASUVORK5CYII=", "comp/button.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABFCAYAAAAPWmvdAAABA0lEQVR4Xu3ZMRGDUBRFwXwfKSgxFhfRgAbUxEakkCEO3qmX+p9m5w7NW9v7cz18I4EFbeT1fwxtbgYtmEGDVgRC458GLQiExNKgBYGQWBq0IBASS4MWBEJiadCCQEgsDVoQCImlQQsCIbE0aEEgJJZW0Pbj64Q3hFvQhmL3CQ8atLlAKCwNWhAIiaVBCwIhsTRoQSAklgYtCITE0qAFgZBYGrQgEBJLgxYEQmJp0IJASCwNWhAIiaUVtOfrdMIbwi1oQ7H7hAcN2lwgFJYGLQiExNKgBYGQWBq0IBASS4MWBEJiadCCQEgsDVoQCImlQQsCIbE0aEEgJJYGLQiExNIC2g/MxaMp6CSauwAAAABJRU5ErkJggg==", "view/bg_tool.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMklEQVRYR+3QQREAAAjDMCYG/DsEGXxSBb2ke7YeiwECBAgQIECAAAECBAgQIEDgW+AAAeIuAVS/mngAAAAASUVORK5CYII=", "comp/minBtn.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA8CAYAAAB1odqiAAAArUlEQVRYR+3X0QmAMAwE0GQN19B9nM193CmiIH7ZXOAoRc/fpjl8jVDdOj/eOc8USBcXqUjLAtDQRMSOdHb3JatTYCZUXodIy10bGxTI1Lx6/YA0Ima6W2tKFcjmdpGKtCow7NBAdxozy+804Gfx/cDqbLzWDzs0ekNY4B9nOMEehMKTVIEEyKeFSKmc18+MppRtipJuYPCa1SkwEyqvo6Tlxm8bFEijvBt9n/QA/fOPydLHcUIAAAAASUVORK5CYII=", "view/zoom_out.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAACy0lEQVRIS92WQU8TQRTH/28oQkj0CL0QOMAJQkz4DkS6A+GA+A00Hrhj0uy8NiTwEdBPAOrB0Fnq3U8g6gkOSjxUjpCQCu08M5u2qaVAt7YmOqfNZPa3b9/+Z35L6NOgPnHx98Gbm5sTlUplA0AGQBpACcBBKpXazmaz3+5607YVM/MjEXlNRPdbASJyTkRrzPz+Nvg1MDNPAvgI4AGA10qpvHPuSCk17ZwLAazV4HPM/PUmeDvwSwBPAbxl5sf+RmYWZo7XMvOehwPYYebnScAnAMaVUrNhGH5pBefz+Rnn3GcAJ8w8kQT8E8A9AEMA/HXrqM9fMrO/bjvataJvFdd7/IaZfS9/67ExZpeIngB4xczPklQ8KSKHPmoispdKpXKjo6PHp6enU5VKxXhoV6moVXhnjpVS5wDOwjD81K7qG7e033lXV1cviMjvvDEAP0TkYHBwcKtarT4UkXcALolo1RhTaIV3dVYYY9aIyOfZDw9fMcYUm+FdgWvtYgCmBisrpRbCMPxQh3cNbgM3zJzvCdhDcrncuojMA8gy8/eegTvO8U0Lk87/UY9ve9h/BI6iyJ+1GyLScB4RHQDYDoKgO+dFURSfFQCuOQ9A7LwgCJI5r1gsTlar1YbznHP5crl8NDw8PK2Uip3n4QMDA3OLi4udO89a23Ce1jp2nrVWtNbxh7bWxs4jop0gCDp3XhRFJyIy7pybXV5ejp3XDN7f359RSsXO01p37jxrbey8i4uLoZGRkWvOa5q/1Fp37rx+VtxwntY6dl5zK6Io2hWR2Hla686dV0vFoY+aP8xFJJdOp49LpdIUEZkaNHkqfIWd5JiIzkXkLAiCZM7zO09EYueJyBgRxc4joi0ADeeJyOrS0lJvnBdFkf8xbDhPKbWSyWR647xCocC+53XnAVjQWvfGeS1wo7XunfOstesA5pVS2Uwm8w877xeHf444cscwYAAAAABJRU5ErkJggg==", "view/refresh2.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA/CAYAAAAPIIPGAAAEIElEQVRYR+2XTUhjVxTH/+fGpBrGT/xoBQdFFMMQLNLNbLooLbaFzqKMUhCSZwsuhGG6KCNd6DuRLgqzmGVxUd8LUrpoYWZTKO1yNi2F1oVtceEHflSLqNEav8bklPuqgsl75sUPSsucTQj33v895+R/7y+XcA1B16CJ/6GoYRiDItKfzWZjExMTv5/XtoLlx2Kxm0qp1wH0AHgTwC4RfWRZ1mdewp6ig4ODN9Lp9CMieh+AchH41Lbtj92EXUUHBgaCh4eH3wJ4zSObGSLqtSzrZ9+ihmF8CODR8YIflFL3MplMNxF9IiJWIBC4Pz4+/ldR5RuG8QuAlwGsAWi3bTsVj8dvAWhOJpPfFPK2a/mGYewDeAHAV7Zt9+aK9PX1VYRCoVcApNxa4CX6J4B6AE9t2341V9QwjO8AvAFg27btytxxL9EvAbynJxNRj2VZX58sjMfjd4joyT9D9NiyrHf9iup+/gggBCALQPfxVwARAO8cWywD4LZt2z/5EtWT+vv774rIBIBSlx/mmT5dyWTyC9+WOpkYi8XalVIPRKQbwItEpHv9PRE9tCzrt6IsVcgyhcYLnv1CAkWXfxFBxzEXXXipq+8imz7P9CJdO3+N754y86A+vYFAIDY8PHw58DHzTQB54DNNs3jwMfONY6R4go+Z/YNvbGwsuLKyci74APQys3/wMfMZ8InIPaVUt4g44AuHw/eHhoaKAx8znwEfM6dGR0dviUizaZoXA59pmvtE5ICPmfPAx8wVABzwubXA1VLM7IBPRJ4mEok88DHzKfiY2R/4mPkUfCLSk0gkTsHHzHdE5Immnog8TiQS/sDHzK7gE5EIEZ2CTyl1e2RkxD/4TNO8S0Su4BORZ0qpftM0iwefaZrtAB4QkQM+AA74ADxk5ufgc78CfV99xdy61yMajUbfAvA5gJeKycZj7gqADygajf5xRYIn+6xoUbmCDM9I/LuidXV1qK2txdzcHPb39ZPAOwpmGgqFUFFRgerqauczm81iaWkJa2v64eLhU6+eKqXQ1NTkZOcWq6urWF5edh1zzZSI0NbWhvLyctdFBwcHmJ2dxe7urn/R+vp6J0sd6XQaCwsLqKysRGNjI9bX17G4uIhMRr8jiig/EokgHA7j6OgIU1NTjkBZWRl0f7e2tgo60LX8rq4u/UjC5uamU2ZuBAIBZ1O9mVsLXEU7OztRUlKCnZ0dTE9P54nqfmsnaNHJycm8cVfRlpYW1NTUOJN1pjrjk6iqqkJra6vzNZVKYWZmxp+oLq2jo8NpgQ7dx729PZSWlkKL6hARpwr9Q+aGp/m12Zubm6H9mhtacH5+HhsbG/4tdTJTZ9bQ0OD0LxgMOm7Y3t6GNv55R7XgMS3oH5cJ/y3Rq775V3X5bx8zSv8DuWzoa2vgb5tumbHGlerDAAAAAElFTkSuQmCC", "view/settings2.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA/CAYAAAAPIIPGAAAD2ElEQVRYR+1Xz08bRxT+ZjAGYQoH4rS9IBJBQJEsUC8VKNdQtamUE0fLayqhKHeOaGbFkT8gFVLZtXzk1qqKSs4NUg8RXCIQVoOQ2jRFHHCwBRj2VW+zttY/14BXVaPOyR7NfPN9771536xACEOEgImPDHRhYaHv/Pz8kEMVjUbjq6urxVZhayo/lUo9chzndTabfWMYxkMAGx7QrG3bL5LJ5B0p5f1MJvNz7QENQdPp9LdE9CMAZrcHYAaoxJ8AvARwD8AtAI9t2/7JD9wQdH5+/q7jOLzx04DqeCelnFlbW/s9EJQXGIbxq8eQ//4mhPieiJjlEwBf8qQQYtOyLFZRNeqYJpPJWCQSeUBEzz3JrwqFwvT6+vo575ybm4vGYrFNAF8AICnlbKlU2sxms4Uych2oYRh5AJ9UFggxb1mW5aeSTqfTRLTmm3tv2/bAVUCfWpb1zA9qGAaHwD/XGjQU+WVGHU0Ug4ZSUjXFnwMwXVP8nP1RAPG2i5/Z+q9pKpWaFUL8wvNE9FUmk9m48jWtLWavofztNZTb124oN2neH1mTvmoo/pcfHDGtdZ9nLbw4rrW+nvGZpvlISvl6aWnpjWmaD4nINT4hxKxS6sXy8vIdx3HuK6XaMz6ttWt8QohDInKNTwjhJtWzlJdCiHtEdEtK+VgpFWx8Wuu7RMQbWxofEb0TQsxordszPq11Q+MjoidCCNf4AGxqrYONb2VlJVYsFh84jvPck/yKW5/W2jU+rXWUwdj4OBQcYzbCxcXF5sanlMoLIaqMTylVZXymaVYZHxG9N02zufE1AH2qlKoyPqUUh6AyFwgaivzyVehoorxkdL6k/MUPIEdE0/7i5zcUGx8Rxdsufmbrv6ZKqSrjM01z48rXtLbFeA3FNT4At6/dUIJ7V/MV/6HOn0gkvgbwA4DPbyLZ2/sWwHcikUj82SHAMqe3DMrv+I6Ofw9USonJyUlXzfb2NhzHaamsKdPBwUGcnp7i7OwMAwMDGBsbc4H29vaQz+fR09OD3t5eHB8f1x3QEJQBR0dHcXFx4QL39/dXbTw5OXEBI5EIcrlcHXBDUGYxPj6O7u7uljJLpRJ2d3ddNf7RVD6DlhkWCgUcHrof0YjH44jFYu5vnt/Z2QmWz0lhsHIMi8Wiu/HDF6T7mMDExAT6+vjR8iHGHA5/8uqYTk1Noaurq3L6/v4+jo6OqtgMDQ1hZGSkMnd5eYmtra3K/0DQg4ODivTyLg7B8PBw+6ChyC8f39FEMWgoJRVK8TPbjl/T2mruWEO5SYMNo/P/xaDfeB712U3YeXv/ALDwD+TbY8Dbd9BBAAAAAElFTkSuQmCC", "view/setting.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAACAklEQVQ4T5XUS4iOcRTH8c9xCeVeiiiXhSJRJFIusRO2lEtZKFlgY6GxZDUrk2TFwii22JJLlERRLKRQJmXBkHIb8+hM/2d6ememed93957n93v+55zf9/mHll9VVTNxopTPR8T3piTyT1VVs7AL9zEd+4roOn5gK25HxLfacAjL8A8TWw6ta28jorc2LMLhIu7Ds2Jah4XlRVci4mNUVTUDadiLFF/G5GL4iyOYjxsYMnQ1BDfxujk0VmJPecFAO4bV2Nk05Bqzz3Za6ut86JJDx2vN4Hbj3hjBbcOt4eCaQZXUj5daT4pGoNFimI1zpdYVEf2jsTQX+5MX5NaOFdFFJHzJ2bWI+FJv6SRWYACTWliqa68ioqc2LMWpwtJ7PCymzVhSWOqOiHeZdPachqNIcXdBJV/2B6cLa5cwZLjQYOkqnuNsOeEM1uJgE43xDBsaH9QQfJ21VNBoHfpBaWHLiKGLoeO1ZnAHkpcxgkvOeoeDa0FjTnNLEfF1PJamYkcR3YmIX6OxNA35Kb7BFKwvoqf4jeV4GRE/azQ2Yh4GMaGFpbr2OSKe1Ibse1MRJ84fimkxMqc0Pc55MrjsOYvZRoofNW6/vPUSwEQ+2+tPQ14h9fX4Ap+aQ2MB1pQTB9sx5K24qmnorKWCRvtDF0PHa+0suBaW0ry91O5mus3n/wHmQwUTIH+tVgAAAABJRU5ErkJggg==", "view/refresh.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAACiElEQVQ4T4WVS4iPYRTGf4/7/X6XcivXcktEUhTKQkqyYCOKjWyUhezFThbIlJ3LYrIRkoWGUhhhTMko4zJujYRpxgxHj9737/P3zfh239c57/uc5/zO+UQ3T0QsBRYCtZI+5jBVx0fEcGA6MA+YCXQCVyXddWwlISL6ARuARcXvhQPrJF3/nRARvYHtwLRuFLYCFyW15ITl6XTHvwIuJzlrgHrgiqSOiqSI2ANMAL4BxyW1R8RYYKSkp8Vb8w2HgD7AE0kXSozoD0wC2nPCAWAw0CyppiRhBzAD6MgJW4D5KdDFNeSkiJgFbEvONeYE698N2K0ArPsDMAZwguN+AmeKfZgLbAb6llj7A7gk6eFfnY6I0cDKpNc1tQFNwG1JvvFPp0sKXQ2sAGokveuJpVHAHGBJ4ul76vLNapbs9dYk6R8oU7driyztA2Z3w5L1n5LUnBPWptMd/xw4l+RscsHAeeNSZMloTAG+AIcltUXERPdB0qMylk4klu5LOlni2ABgqm3Oko4BQ4Fnko6WJOxPzlXg2wV4hv2czuOYhmsBsDf1rD7fYP0HkyyzZN0twHjACZmlI0WWFgM7e2DprKQ71SyNA9YDBnFYcq0RuOZ5/h9LdsVS6yV97YmlgYDn2X3wjUa7QdKLapY8015ePrWMJVtembhewLI0YWU4eZvck/Q525pXo4M/AY+TLMP40u+SuooseVjsitm/IakzItz5QcXhKSZsBCyrpdjlwuZwfSO8mLOkdYAHqFXSrRKWvErtXFdOcJcnp0AX96ZwuldQ5uxtTrD+VUmWWXqfujwk8eQ4f68rsuRG+d/gZVb9eIk9kPS6miXvIv91rNc12TXPc5MkTyO/AFhJCujHqZlCAAAAAElFTkSuQmCC", "comp/checkbox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAABbUlEQVRIS+2TP0gCURzHv88GRYsrExyOo5cEQVEtWdQQpE4N0R+HxmirXXCrKYigqMF2IRqCQByaLJqNIFpyUIzu4rIwpExODy88ITD/cJ603Rsf7/OGz+/zI5TSEAE20cZRgBMySKni8XrbwICrWAwG2ESZIadFS53J0R25brCyHZNud1vbcRuPV7fDAOu9GXJatNSZHN2R6wb/PfJCrxOZCR8Gbk6hWc6Xg8PrcgBETMIVPdIGSjYG/NoOSHcfkLqDK3qsBSRIrgRAuBF1quUPEUPhYGMwb2dhywrqQ3F0Dt++jSokJMBdhmDO52pB2WwFP7OK8rgH9os99IgppNf3QWwMFP4RNHKALrmoflIj53l6CaWpRcBkgiIkYHl6gDTrh5JJg57v/kJ1YOUixw7jfWELxMpAKUmAXAR7tg3LZ7am3IbjKDBOvPiDqkUmcoj+9H1d7k3nmHdweBubB70ON9wRzQH8pVVQb+Q/zZAEfpwDCU4AAAAASUVORK5CYII=", "comp/btn_close.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA8CAYAAAB1odqiAAAE6UlEQVRYR+3Y30+bVRgH8G/T0t/0Jy0USrIsC0E2GMKAVYcRpmSbEzIGZhqyxCxeceGVF3pjvJl/wYyJWZYY4hZBFnBuBBUW2ewYAxlsSMiyLKH8aEt/0vZtSxvM+562We15C6jlxr53zfO8z+ec5z2nOTmCk598tY19fAQs+Hlvz76QX1zpAwd+1NMNXzieU1QtFeKbvn4CXvqgC95wLKegRirC1e8GCPjh+53wMnRwedkG54aLG4yhSI/ycnPawHaKJ5M1MhGuXR8k4MX3OnjBx3NPcLX3DPfepSu3odfrYC4r5X7bVlbhcrnT4kdrjlA7xYLffj9EwJ6udnhCW9TEJ08XUgWTqE6n5XLdbk9G7MjhKmodrbwAfQPDBLxw7h1ecH3dDq/Xm1GYrZqceXIgGo0GJSXFvOCNmz8RsLv9NNyhKO+icTqc8Pl8acDLyWyr1Wo1DEYDbw2dXIz+4TsE7DzbBneQH2SruDZc8Pv9GSiLqVQq6Iv0WVe5TiHG4K1RAnaceguuYCTrCx63G4FAgAoqlUpodbqs7+sVEgyN/ELAs20t2Ajwgz6vF6FgMGtL5QoF1BoNL1qklODW6DgBT518gxcM+P1gQqFdLRqZXA6lSkVFWXDk198I2NZyAs7NMDXR7XRmYBKZjMuNMEzmljHQF46hUIrR8XsEbG228IJ+T/rGFkskkMoVHBgOBRGNRNI2vkpL/5YsODZhJeCbJ47D4WeoM4wyDLai5PsWiCUQJ2aXTN4pnswzqmS4e+8BAZstDbxg1qW3hyALTlinCPh6Uz1C0Rg2w/S/tz3UpaYWSgsgF4twf3IagvOXr297PR5YGuv+bd2s71sfzkCj1ULQe+3u9vraGlg0lw+LlZhMEIzUNu7vmYYFmz/9LJeTS9We+PIymaGl6wLizo2cokJDEawDNxLg+W7EHTkGjUWw/tBPwOMdnYg7nNQZep4/Q2B9jYspS0zQHjyUlrdTPJksNBrwYGiQgE3vtiNup4O2SSuOzk5y7z2ubYKyuBiaAwe5394XzxGw29Pi5iYLdeDCYgMmfxxOgKfPIG53UBNt049SBVNo4g864HRmxMz1x3hAIybv3CZg49ttiK/bqYneFRuCLldGYTY5OfPkQBR6PTRl6cfIVEtLivHw51ECNrS2Ir62zrtKfWtrCHo8acDLyWyrFVot1CYTbw2hqQRTY2MJsLk5K8hW8TkcCPp8GSiHqdVQG41ZtxUHTkwQ8NhrFsRXyUrke3wuF0L+TSooVxVCrc9+iBKWmvDodysB65saEFtZ5cX8Hi+YQDBrS2VKBVRa/jONqKwU05NTBKyrexWxlRUquOnfBBNidrVoZHIZClWF1DqisjLMzPxBwNraasRsdHDD6c7ApDIJVzTMRDJiRQb6EUNkLsPs7DwBa6qrELPZqCNzu/1pG1siEUOhkHK5wWAYkUg0La7T0U9tIrMZc/MLBKw+XImtZTrIMBFEouQkIBEXQJaYXXJ0O8WTeQXlZsw/XSRg1SsVvGDWpbuHIAsu/LlEwMrKCsQDAcQ93j2U2H2qUKuBUKnE4uISBF9f/Hj7wJwVhyordl/hH2Q+W1zCixoLOdNUj98Ei+byYbH5lnPkmJhL6O+18/c0/1m38/c0qVbm72nYVuTvadgu5O9pUtsif0+Tv6dhF8P/657mLz4NfQVdLmZiAAAAAElFTkSuQmCC", "comp/textarea.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAXCAYAAABkrDOOAAAA4klEQVRoQ+3ZvQrCMBiF4e9rU+sPOErRqxDRe/KG9Fp0EAc3VzuIg1ML4uDmlkaaquDenMUTyJoDD+8W3ZyKlaoshSeogHOy1m1euOmoI1EU+auqQUf/8XHnnBzLp3jsWdaVJEnEGEPsADXU2Ifro8Gej/uSpqnHruvmaVegqirZX+4N9mIy8Nh13XEct7vE18RaK7vzjdiIFoiNUH5vEJvYQAHgFMsmNlAAOMWyiQ0UAE6xbGIDBYBTLJvYQAHgFMsmNlAAOMWyiQ0UAE79lM2fmrDy358a/q6Hhf68ng175QueKdEXxUGVVwAAAABJRU5ErkJggg==", "view/re.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAACpklEQVRIS+WWPUgcQRiG3+8O70QEUwTB1EJgsTGdRRrhOMjOtEtSRbBIBMFKuCtkZleES2uRQoWQJggKKW7Of7GyTRvBLkVShhS73OXMfWGOU85Es7uXs0m2XeZh+OZ95xnCHX10R1ykBvu+P5fP59+VSqVvf9pUarBS6jWAR0Q0rbWOboP3BCaiOQAHAKTW+vtN8L8BW96W4zjPPM/78Ss8FlypVEYajYbHzALAJIAHALJdoDWl1Esi4m74rWBmpiAI5pk5AHAvJj0VrXU5Fmyhvu+/AfA8YRxfaa1LsWDf92eZeSMJlJnXtdYvEo1Ca30G4GEH/ImI1lqt1nE+nz9vNBrLnVTY39uO4zxNdHgrKytjzWbzs13FzKfDw8PFxcXF8HL3Nscd8BEAN3HcgiCYbLVaHyyIiGaUUm+7R9JzQZRSo0T0BUCGmRd831/tBttK53K5zXK5/DV1pZVSG0Q0C2BXa/0kySEmKojWeoiZD4hoKpvNTiwtLX1MC7+1IFrrQWZeJaJxx3EKN5186lF0LwiC4DEz31dKvU+z69i7Ig0stnm9wv4zsDGm7bxCodBf5xlj2s5j5mkpZf+c1wHPEdFBGIbS87z+OO8S3EnAVhRFvTnv8PBwpF6ve0QkiGiSmX9znuu66ZxXq9XmAcQ6j5krUspkzqvVaqmcJ4SId54xxl6ZiZwHYN113WTOq1arZ0R05TwAa5lM5rher5/ncrllAPYl1HZeFEXJnLe3tzd2cXHRdh6A04GBgWKxWLxyXlcqjqIochPHbWdn58p5AGaEENec13NB9vf3R5vNZtt5RLTguu4159lKA9gUQqR3njHGHpx9tOxKKfvnvGq1OmQrC2AKwIQQon/OOzk5GQzD0I5hPIqi/jvPGNN2npTyH3feTzoJOzgswwlqAAAAAElFTkSuQmCC", "view/search.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAqCAYAAABcOxDuAAABX0lEQVRIS+3VsUrEQBAG4H9HiDZiJQg+gJVaiKAoWClYXWeZ7D6CtbWFr5Ai2ayQxkLQRgsLGwtBUQsRC6sDCxHxEIvIZSRwxRGSu83pNUe23c0H+89kR2AISwzBxAiinuctCSH2AawD+AFwRkR7QRC85CO0ur5SaoOZzwGM54A3IlrJw1aolPIewEJJUY+01jvde31RKeUMgNceXdLSWk9VQl3XnSWiZhnKzF9RFE1WQrPDUsonAHNFsBDiJAzDRmXUdd1tIjoFMJaDW0KI1TAMH61RpdQ0Mx8z8zMzHxLRAYBlAG0Al2ma7hpjHqxbqgNeAJgHcKW1XutEMeE4Ttv3/axXC1dh9XPgbZqmW8aYd9t3ohCVUt4BWARwkyTJZhzHH7Zgdq4MvQbw7ThOw/f9zypgKVoVsS7UX+C+v+kgeI0Oklrvb0Yw03rwlZW8Hnz14OvqjXrw1e/pPyfwCww91CttlMG7AAAAAElFTkSuQmCC", "view/save.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAA1klEQVRIS+2VzQ3DIAyFwxwdoMMAA/VQ8ZByyEBhmA7QOVxxKLIaOcIoSZUfrlifHw/wM91Ky6zE7SZgANTaDEDhzYJ5odSMC7nA5U7+b4X2dVQr3ic4hHCTlMcY33xPZUUGcwBvdEJwjcfGGIQQ4rd2qenWA3hyAUuABwCP31NtN+i1v02qP4DicRybM885J2ceB/NCyUupfuLxBS4WbmKF9rNUv4p9gq21d0l5SunF91RWZDAH8EYnBNd4nDPPWitnXst0I6Leez+feVowEQ3e+wNk3ge7C/Qp3GfwkgAAAABJRU5ErkJggg==" };
	Base64AtlasManager.base64 = new Base64Atlas(Base64AtlasManager.dataO);

	var CallLaterTool = function () {
		function CallLaterTool() {
			_classCallCheck(this, CallLaterTool);
		}

		_createClass(CallLaterTool, [{
			key: "callLater",
			value: function callLater(caller, method) {
				var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (this._getHandler(caller, method) == null) {
					CallLaterTool.oldCallLater.call(this, caller, method, args);
					if (CallLaterTool._isRecording) {
						CallLaterTool._recordedCallLaters.push(this._laters[this._laters.length - 1]);
					}
				}
			}
		}], [{
			key: "initCallLaterRecorder",
			value: function initCallLaterRecorder() {
				if (CallLaterTool.oldCallLater) return;
				CallLaterTool.oldCallLater = Laya.Laya.timer["callLater"];
				Laya.Laya.timer["callLater"] = CallLaterTool["prototype"]["callLater"];
			}
		}, {
			key: "beginRecordCallLater",
			value: function beginRecordCallLater() {
				CallLaterTool.initCallLaterRecorder();
				CallLaterTool._isRecording = true;
			}
		}, {
			key: "runRecordedCallLaters",
			value: function runRecordedCallLaters() {
				CallLaterTool._isRecording = false;
				var timer;
				timer = Laya.Laya.timer;
				var laters = timer["_laters"];
				laters = CallLaterTool._recordedCallLaters;
				for (var i = 0, n = laters.length - 1; i <= n; i++) {
					var handler = laters[i];
					if (CallLaterTool._recordedCallLaters.indexOf(handler) < 0) continue;
					handler.method !== null && handler.run(false);
					timer["_recoverHandler"](handler);
					laters.splice(i, 1);
				}
				CallLaterTool._recordedCallLaters.length = 0;
			}
		}]);

		return CallLaterTool;
	}();

	CallLaterTool._recordedCallLaters = [];
	CallLaterTool._isRecording = false;

	var CanvasTools = function () {
		function CanvasTools() {
			_classCallCheck(this, CanvasTools);
		}

		_createClass(CanvasTools, null, [{
			key: "createCanvas",
			value: function createCanvas(width, height) {
				return null;
			}
		}, {
			key: "renderSpriteToCanvas",
			value: function renderSpriteToCanvas(sprite, canvas, offsetX, offsetY) {
				Laya.RenderSprite.renders[sprite._renderType]._fun(sprite, canvas.context, offsetX, offsetY);
			}
		}, {
			key: "getImageDataFromCanvas",
			value: function getImageDataFromCanvas(canvas) {
				var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
				var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

				if (width <= 0) width = canvas.width;
				if (height <= 0) height = canvas.height;
				var imgdata = canvas.context.getImageData(x, y, width, height);
				return imgdata;
			}
		}, {
			key: "getImageDataFromCanvasByRec",
			value: function getImageDataFromCanvasByRec(canvas, rec) {
				var imgdata = canvas.context.getImageData(rec.x, rec.y, rec.width, rec.height);
				return imgdata;
			}
		}, {
			key: "getDifferCount",
			value: function getDifferCount(imageData1, imageData2) {
				var data1 = imageData1.data;
				var data2 = imageData2.data;
				var differCount;
				differCount = 0;
				CanvasTools.walkImageData(imageData1, myWalkFun);
				return differCount;
				function myWalkFun(i, j, tarPos, data) {
					if (!CanvasTools.isPoinSame(tarPos, data1, data2)) differCount++;
				}
			}
		}, {
			key: "getDifferRate",
			value: function getDifferRate(imageData1, imageData2) {
				return CanvasTools.getDifferCount(imageData1, imageData2) / (imageData1.width * imageData1.height);
			}
		}, {
			key: "getCanvasDisRec",
			value: function getCanvasDisRec(canvas) {
				var rst;
				rst = new Laya.Rectangle();
				var imgdata;
				imgdata = CanvasTools.getImageDataFromCanvas(canvas, 0, 0);
				var maxX;
				var minX;
				var maxY;
				var minY;
				maxX = maxY = 0;
				minX = imgdata.width;
				minY = imgdata.height;
				var i, iLen;
				var j, jLen;
				iLen = imgdata.width;
				jLen = imgdata.height;
				var data;
				data = imgdata.data;
				var tarPos = 0;
				for (j = 0; j < jLen; j++) {
					for (i = 0; i < iLen; i++) {
						if (!CanvasTools.isEmptyPoint(data, tarPos)) {
							if (minX > i) minX = i;
							if (maxX < i) maxX = i;
							if (minY > j) minY = j;
							if (maxY < j) maxY = j;
						}
						tarPos += 4;
					}
				}
				rst.setTo(minX, minY, maxX - minX + 1, maxY - minY + 1);
				return rst;
			}
		}, {
			key: "fillCanvasRec",
			value: function fillCanvasRec(canvas, rec, color) {
				var ctx = canvas.context;
				ctx.fillStyle = color;
				ctx.fillRect(rec.x, rec.y, rec.width, rec.height);
			}
		}, {
			key: "isEmptyPoint",
			value: function isEmptyPoint(data, pos) {
				if (data[pos] == 0 && data[pos + 1] == 0 && data[pos + 2] == 0 && data[pos + 3] == 0) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: "isPoinSame",
			value: function isPoinSame(pos, data1, data2) {
				if (data1[pos] == data2[pos] && data1[pos + 1] == data2[pos + 1] && data1[pos + 2] == data2[pos + 2] && data1[pos + 3] == data2[pos + 3]) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: "walkImageData",
			value: function walkImageData(imgdata, walkFun) {
				var i, iLen;
				var j, jLen;
				iLen = imgdata.width;
				jLen = imgdata.height;
				var tarPos = 0;
				var data = imgdata.data;
				for (i = 0; i < iLen; i++) {
					for (j = 0; j < jLen; j++) {
						walkFun(i, j, tarPos, data);
						tarPos += 4;
					}
				}
			}
		}, {
			key: "renderSpritesToCanvas",
			value: function renderSpritesToCanvas(canvas, sprites) {
				var offx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				var offy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
				var startIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

				var i, len;
				len = sprites.length;
				for (i = startIndex; i < len; i++) {
					CanvasTools.renderSpriteToCanvas(sprites[i], canvas, offx, offy);
				}
			}
		}, {
			key: "clearCanvas",
			value: function clearCanvas(canvas) {
				var preWidth;
				var preHeight;
				preWidth = canvas.width;
				preHeight = canvas.height;
				canvas.size(preWidth + 1, preHeight);
				canvas.size(preWidth, preHeight);
			}
		}, {
			key: "getImagePixels",
			value: function getImagePixels(x, y, width, data) {
				var colorLen = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;

				var pos;
				pos = (x * width + y) * colorLen;
				var i, len;
				var rst;
				rst = [];
				len = colorLen;
				for (i = 0; i < len; i++) {
					rst.push(data[pos + i]);
				}
				return rst;
			}
		}]);

		return CanvasTools;
	}();

	var MathTools = function () {
		function MathTools() {
			_classCallCheck(this, MathTools);
		}

		_createClass(MathTools, null, [{
			key: "sortBigFirst",
			value: function sortBigFirst(a, b) {
				if (a == b) return 0;
				return b > a ? 1 : -1;
			}
		}, {
			key: "sortSmallFirst",
			value: function sortSmallFirst(a, b) {
				if (a == b) return 0;
				return b > a ? -1 : 1;
			}
		}, {
			key: "sortNumBigFirst",
			value: function sortNumBigFirst(a, b) {
				return parseFloat(b) - parseFloat(a);
			}
		}, {
			key: "sortNumSmallFirst",
			value: function sortNumSmallFirst(a, b) {
				return parseFloat(a) - parseFloat(b);
			}
		}, {
			key: "sortByKey",
			value: function sortByKey(key) {
				var bigFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var forceNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				var _sortFun;
				if (bigFirst) {
					_sortFun = forceNum ? MathTools.sortNumBigFirst : MathTools.sortBigFirst;
				} else {
					_sortFun = forceNum ? MathTools.sortNumSmallFirst : MathTools.sortSmallFirst;
				}
				return function (a, b) {
					return _sortFun(a[key], b[key]);
				};
			}
		}]);

		return MathTools;
	}();

	var ColorTool = function () {
		function ColorTool() {
			_classCallCheck(this, ColorTool);
		}

		_createClass(ColorTool, null, [{
			key: "toHexColor",
			value: function toHexColor(color) {
				return Laya.Utils.toHexColor(color);
			}
		}, {
			key: "getRGBByRGBStr",
			value: function getRGBByRGBStr(str) {
				str.charAt(0) == '#' && (str = str.substr(1));
				var color = parseInt(str, 16);
				var flag = str.length == 8;
				var _color;
				_color = [(0x00FF0000 & color) >> 16, (0x0000FF00 & color) >> 8, 0x000000FF & color];
				return _color;
			}
		}, {
			key: "getColorBit",
			value: function getColorBit(value) {
				var rst;
				rst = Math.floor(value).toString(16);
				rst = rst.length > 1 ? rst : "0" + rst;
				return rst;
			}
		}, {
			key: "getRGBStr",
			value: function getRGBStr(rgb) {
				var coefficient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				return "#" + ColorTool.getColorBit(rgb[0] * coefficient) + ColorTool.getColorBit(rgb[1] * coefficient) + ColorTool.getColorBit(rgb[2] * coefficient);
			}
		}, {
			key: "traseHSB",
			value: function traseHSB(hsb) {
				console.log("hsb:", hsb[0], hsb[1], hsb[2]);
			}
		}, {
			key: "rgb2hsb",
			value: function rgb2hsb(rgbR, rgbG, rgbB) {
				var rgb = [rgbR, rgbG, rgbB];
				rgb.sort(MathTools.sortNumSmallFirst);
				var max = rgb[2];
				var min = rgb[0];
				var hsbB = max / 255.0;
				var hsbS = max == 0 ? 0 : (max - min) / max;
				var hsbH = 0;
				if (max == min) {
					hsbH = 1;
				} else if (rgbR == 0 && rgbG == 0 && rgbB == 0) ;else if (max == rgbR && rgbG >= rgbB) {
					hsbH = (rgbG - rgbB) * 60 / (max - min) + 0;
				} else if (max == rgbR && rgbG < rgbB) {
					hsbH = (rgbG - rgbB) * 60 / (max - min) + 360;
				} else if (max == rgbG) {
					hsbH = (rgbB - rgbR) * 60 / (max - min) + 120;
				} else if (max == rgbB) {
					hsbH = (rgbR - rgbG) * 60 / (max - min) + 240;
				}
				return [hsbH, hsbS, hsbB];
			}
		}, {
			key: "hsb2rgb",
			value: function hsb2rgb(h, s, v) {
				var r = 0,
				    g = 0,
				    b = 0;
				var i = Math.floor(h / 60 % 6);
				var f = h / 60 - i;
				var p = v * (1 - s);
				var q = v * (1 - f * s);
				var t = v * (1 - (1 - f) * s);
				switch (i) {
					case 0:
						r = v;
						g = t;
						b = p;
						break;
					case 1:
						r = q;
						g = v;
						b = p;
						break;
					case 2:
						r = p;
						g = v;
						b = t;
						break;
					case 3:
						r = p;
						g = q;
						b = v;
						break;
					case 4:
						r = t;
						g = p;
						b = v;
						break;
					case 5:
						r = v;
						g = p;
						b = q;
						break;
					default:
						break;
				}
				return [Math.floor(r * 255.0), Math.floor(g * 255.0), Math.floor(b * 255.0)];
			}
		}]);

		return ColorTool;
	}();

	var CommonTools = function () {
		function CommonTools() {
			_classCallCheck(this, CommonTools);
		}

		_createClass(CommonTools, null, [{
			key: "bind",
			value: function bind(fun, scope) {
				var rst;
				rst = fun.bind(scope);
				return rst;
			}
		}, {
			key: "insertP",
			value: function insertP(tar, x, y, scaleX, scaleY, rotation) {
				var nSp;
				nSp = new Laya.Sprite();
				tar.parent.addChild(nSp);
				nSp.x = x;
				nSp.y = y;
				nSp.scaleX = scaleX;
				nSp.scaleY = scaleY;
				nSp.rotation = rotation;
				nSp.addChild(tar);
				CommonTools.count++;
				nSp.name = "insertP:" + CommonTools.count;
			}
		}, {
			key: "insertChild",
			value: function insertChild(tar, x, y, scaleX, scaleY, rotation) {
				var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "#ff00ff";

				var nSp;
				nSp = new Laya.Sprite();
				tar.addChild(nSp);
				nSp.x = x;
				nSp.y = y;
				nSp.scaleX = scaleX;
				nSp.scaleY = scaleY;
				nSp.rotation = rotation;
				nSp.graphics.drawRect(0, 0, 20, 20, color);
				nSp.name = "child:" + tar.numChildren;
				return nSp;
			}
		}, {
			key: "createSprite",
			value: function createSprite(width, height) {
				var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#ff0000";

				var sp;
				sp = new Laya.Sprite();
				sp.graphics.drawRect(0, 0, width, height, color);
				sp.size(width, height);
				return sp;
			}
		}, {
			key: "createBtn",
			value: function createBtn(txt) {
				var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
				var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;

				var sp;
				sp = new Laya.Sprite();
				sp.size(width, height);
				sp.graphics.drawRect(0, 0, sp.width, sp.height, "#ff0000");
				sp.graphics.fillText(txt, sp.width * 0.5, sp.height * 0.5, null, "#ffff00", "center");
				return sp;
			}
		}]);

		return CommonTools;
	}();

	CommonTools.count = 0;

	var DebugTxt = function () {
		function DebugTxt() {
			_classCallCheck(this, DebugTxt);
		}

		_createClass(DebugTxt, null, [{
			key: "init",
			value: function init() {
				if (DebugTxt._txt) return;
				DebugTxt._txt = new Laya.Text();
				DebugTxt._txt.pos(100, 100);
				DebugTxt._txt.color = "#ff00ff";
				DebugTxt._txt.zOrder = 999;
				DebugTxt._txt.fontSize = 24;
				DebugTxt._txt.text = "debugTxt inited";
				Laya.Laya.stage.addChild(DebugTxt._txt);
			}
		}, {
			key: "getArgArr",
			value: function getArgArr(arg) {
				var rst;
				rst = [];
				var i,
				    len = arg.length;
				for (i = 0; i < len; i++) {
					rst.push(arg[i]);
				}
				return rst;
			}
		}, {
			key: "dTrace",
			value: function dTrace() {
				for (var _len4 = arguments.length, arg = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					arg[_key4] = arguments[_key4];
				}

				arg = DebugTxt.getArgArr(arg);
				var str;
				str = arg.join(" ");
				if (DebugTxt._txt) {
					DebugTxt._txt.text = str + "\n" + DebugTxt._txt.text;
				}
			}
		}, {
			key: "getTimeStr",
			value: function getTimeStr() {
				var dateO = new Date();
				return dateO.toTimeString();
			}
		}, {
			key: "traceTime",
			value: function traceTime(msg) {
				DebugTxt.dTrace(DebugTxt.getTimeStr());
				DebugTxt.dTrace(msg);
			}
		}, {
			key: "show",
			value: function show() {
				for (var _len5 = arguments.length, arg = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
					arg[_key5] = arguments[_key5];
				}

				arg = DebugTxt.getArgArr(arg);
				var str;
				str = arg.join(" ");
				if (DebugTxt._txt) {
					DebugTxt._txt.text = str;
				}
			}
		}]);

		return DebugTxt;
	}();

	var DisEditor = function () {
		function DisEditor() {
			_classCallCheck(this, DisEditor);

			this.rec = new Laya.Sprite();
			this.rootContainer = new Laya.Sprite();
		}

		_createClass(DisEditor, [{
			key: "setTarget",
			value: function setTarget(target) {
				this.tar = target;
				var g;
				g = this.rec.graphics;
				g.clear();
				var bounds;
				bounds = this.tar.getSelfBounds();
				g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height, null, "#00ff00");
				this.createSameDisChain();
				Laya.Laya.stage.addChild(this.rootContainer);
			}
		}, {
			key: "createSameDisChain",
			value: function createSameDisChain() {
				var tParent;
				var cpParent;
				var preTar;
				preTar = this.rec;
				tParent = this.tar;
				while (tParent && tParent != Laya.Laya.stage) {
					cpParent = new Laya.Sprite();
					cpParent.addChild(preTar);
					cpParent.x = tParent.x;
					cpParent.y = tParent.y;
					cpParent.scaleX = tParent.scaleX;
					cpParent.scaleY = tParent.scaleY;
					cpParent.rotation = tParent.rotation;
					cpParent.scrollRect = tParent.scrollRect;
					preTar = cpParent;
					tParent = tParent.parent;
				}
				this.rootContainer.removeChildren();
				this.rootContainer.addChild(preTar);
			}
		}]);

		return DisEditor;
	}();

	var DisPool = function () {
		function DisPool() {
			_classCallCheck(this, DisPool);
		}

		_createClass(DisPool, null, [{
			key: "getDis",
			value: function getDis(clz) {
				var clzName;
				clzName = ClassTool.getClassNameByClz(clz);
				if (!DisPool._objDic[clzName]) {
					DisPool._objDic[clzName] = [];
				}
				var disList;
				disList = DisPool._objDic[clzName];
				var i, len;
				len = disList.length;
				for (i = 0; i < len; i++) {
					if (!disList[i].parent) {
						return disList[i];
					}
				}
				disList.push(new clz());
				return disList[disList.length - 1];
			}
		}]);

		return DisPool;
	}();

	DisPool._objDic = {};

	var DragBox = function (_Laya$Sprite8) {
		_inherits(DragBox, _Laya$Sprite8);

		function DragBox(type) {
			_classCallCheck(this, DragBox);

			var _this14 = _possibleConstructorReturn(this, (DragBox.__proto__ || Object.getPrototypeOf(DragBox)).call(this));

			_this14._left = _this14.drawBlock();
			_this14._right = _this14.drawBlock();
			_this14._top = _this14.drawBlock();
			_this14._bottom = _this14.drawBlock();
			_this14._topLeft = _this14.drawBlock();
			_this14._topRight = _this14.drawBlock();
			_this14._bottomLeft = _this14.drawBlock();
			_this14._bottomRight = _this14.drawBlock();
			_this14._lastPoint = new Laya.Point();
			_this14._type = type = 3;
			_this14.addChild(_this14._box = _this14.drawBorder(0, 0, 0xff0000));
			if (type == 1 || type == 3) {
				_this14.addChild(_this14._left);
				_this14.addChild(_this14._right);
			}
			if (type == 2 || type == 3) {
				_this14.addChild(_this14._top);
				_this14.addChild(_this14._bottom);
			}
			if (type == 3) {
				_this14.addChild(_this14._topLeft);
				_this14.addChild(_this14._topRight);
				_this14.addChild(_this14._bottomLeft);
				_this14.addChild(_this14._bottomRight);
			}
			_this14.on(Laya.Event.MOUSE_DOWN, _this14, _this14.onMouseDown);
			_this14.mouseThrough = true;
			return _this14;
		}

		_createClass(DragBox, [{
			key: "onMouseDown",
			value: function onMouseDown(e) {
				this._currDir = e.target;
				if (e.nativeEvent.shiftKey) {
					this.initFixScale();
				}
				if (this._currDir != this) {
					this._lastPoint.x = Laya.Laya.stage.mouseX;
					this._lastPoint.y = Laya.Laya.stage.mouseY;
					Laya.Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
					Laya.Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
					e.stopPropagation();
				}
			}
		}, {
			key: "onMouseUp",
			value: function onMouseUp(e) {
				Laya.Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
				Laya.Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
			}
		}, {
			key: "initFixScale",
			value: function initFixScale() {
				this.fixScale = this._target.height / this._target.width;
			}
		}, {
			key: "onMouseMove",
			value: function onMouseMove(e) {
				var scale = 1;
				var tx = (Laya.Laya.stage.mouseX - this._lastPoint.x) / scale;
				var ty = (Laya.Laya.stage.mouseY - this._lastPoint.y) / scale;
				var sameScale = false;
				var adptX;
				var adptY;
				if (e.nativeEvent.shiftKey) {
					if (this.fixScale < 0) this.initFixScale();
					adptY = tx * this.fixScale;
					adptX = ty / this.fixScale;
					sameScale = true;
					switch (this._currDir) {
						case this._topLeft:
						case this._bottomLeft:
							this._currDir = this._left;
							break;
						case this._topRight:
						case this._bottomRight:
							this._currDir = this._right;
							break;
					}
				}
				if (tx != 0 || ty != 0) {
					this._lastPoint.x += tx * scale;
					this._lastPoint.y += ty * scale;
					var tw = tx / this._target.scaleX;
					var th = ty / this._target.scaleY;
					if (this._currDir == this._left) {
						this._target.x += tx;
						this._target.width -= tw;
						if (sameScale) {
							this._target.height = this._target.width * this.fixScale;
						}
					} else if (this._currDir == this._right) {
						this._target.width += tw;
						if (sameScale) {
							this._target.height = this._target.width * this.fixScale;
						}
					} else if (this._currDir == this._top) {
						this._target.y += ty;
						this._target.height -= th;
						if (sameScale) {
							this._target.width = this._target.height / this.fixScale;
						}
					} else if (this._currDir == this._bottom) {
						this._target.height += th;
						if (sameScale) {
							this._target.width = this._target.height / this.fixScale;
						}
					} else if (this._currDir == this._topLeft) {
						this._target.x += tx;
						this._target.y += ty;
						this._target.width -= tw;
						this._target.height -= th;
					} else if (this._currDir == this._topRight) {
						this._target.y += ty;
						this._target.width += tw;
						this._target.height -= th;
					} else if (this._currDir == this._bottomLeft) {
						this._target.x += tx;
						this._target.width -= tw;
						this._target.height += th;
					} else if (this._currDir == this._bottomRight) {
						this._target.width += tw;
						this._target.height += th;
					}
					if (this._target.width < 1) {
						this._target.width = 1;
					}
					if (this._target.height < 1) {
						this._target.height = 1;
					}
					this._target.width = Math.round(this._target.width);
					this._target.x = Math.round(this._target.x);
					this._target.y = Math.round(this._target.y);
					this._target.height = Math.round(this._target.height);
					this.refresh();
				}
			}
		}, {
			key: "drawBorder",
			value: function drawBorder(width, height, color) {
				var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

				var box = new Laya.Sprite();
				var g = box.graphics;
				g.clear();
				g.drawRect(0, 0, width, height, null, "#" + color);
				return box;
			}
		}, {
			key: "drawBlock",
			value: function drawBlock() {
				var box = new Laya.Sprite();
				var g = box.graphics;
				g.clear();
				box.width = DragBox.BLOCK_WIDTH;
				box.height = DragBox.BLOCK_WIDTH;
				g.drawRect(-DragBox.BLOCK_WIDTH * 0.5, -DragBox.BLOCK_WIDTH * 0.5, DragBox.BLOCK_WIDTH, DragBox.BLOCK_WIDTH, "#ffffff", "#ff0000", 1);
				box.mouseEnabled = true;
				box.mouseThrough = true;
				return box;
			}
		}, {
			key: "setTarget",
			value: function setTarget(target) {
				this._target = target;
				this.refresh();
			}
		}, {
			key: "refresh",
			value: function refresh() {
				this.changePoint();
				this.changeSize();
			}
		}, {
			key: "changePoint",
			value: function changePoint() {
				var p = this._target.localToGlobal(new Laya.Point());
				var np = this.parent.globalToLocal(p);
				this.x = np.x;
				this.y = np.y;
			}
		}, {
			key: "changeSize",
			value: function changeSize() {
				var width = this._target.width * this._target.scaleX;
				var height = this._target.height * this._target.scaleY;
				console.log("change size");
				this.rotation = this._target.rotation;
				if (this._box.width != width || this._box.height != height) {
					this._box.graphics.clear();
					this._box.graphics.drawRect(0, 0, Math.abs(width), Math.abs(height), null, "#ff0000");
					this._box.size(width, height);
					this.size(width, height);
					this._box.scaleX = Math.abs(this._box.scaleX) * (this._target.scaleX > 0 ? 1 : -1);
					this._box.scaleY = Math.abs(this._box.scaleY) * (this._target.scaleY > 0 ? 1 : -1);
					this._left.x = 0;
					this._left.y = height * 0.5;
					this._right.x = width;
					this._right.y = height * 0.5;
					this._top.x = width * 0.5;
					this._top.y = 0;
					this._bottom.x = width * 0.5;
					this._bottom.y = height;
					this._topLeft.x = this._topLeft.y = 0;
					this._topRight.x = width;
					this._topRight.y = 0;
					this._bottomLeft.x = 0;
					this._bottomLeft.y = height;
					this._bottomRight.x = width;
					this._bottomRight.y = height;
				}
			}
		}]);

		return DragBox;
	}(Laya.Sprite);

	DragBox.BLOCK_WIDTH = 6;

	var FilterTool = function () {
		function FilterTool() {
			_classCallCheck(this, FilterTool);
		}

		_createClass(FilterTool, null, [{
			key: "getArrByFilter",
			value: function getArrByFilter(arr, filterFun) {
				var i,
				    len = arr.length;
				var rst = [];
				for (i = 0; i < len; i++) {
					if (filterFun(arr[i])) rst.push(arr[i]);
				}
				return rst;
			}
		}, {
			key: "getArr",
			value: function getArr(arr, sign, value) {
				var i,
				    len = arr.length;
				var rst = [];
				for (i = 0; i < len; i++) {
					if (arr[i][sign] == value) rst.push(arr[i]);
				}
				return rst;
			}
		}]);

		return FilterTool;
	}();

	var GetSetProfile = function () {
		function GetSetProfile() {
			_classCallCheck(this, GetSetProfile);
		}

		_createClass(GetSetProfile, null, [{
			key: "removeNoDisplayKeys",
			value: function removeNoDisplayKeys(arr) {
				var i;
				for (i = arr.length - 1; i >= 0; i--) {
					if (GetSetProfile.noDisplayKeys[arr[i]]) {
						arr.splice(i, 1);
					}
				}
			}
		}, {
			key: "getClassCount",
			value: function getClassCount(className) {
				return GetSetProfile.countDic[className];
			}
		}, {
			key: "addClassCount",
			value: function addClassCount(className) {
				if (!GetSetProfile.countDic[className]) {
					GetSetProfile.countDic[className] = 1;
				} else {
					GetSetProfile.countDic[className] = GetSetProfile.countDic[className] + 1;
				}
			}
		}, {
			key: "init",
			value: function init() {
				if (GetSetProfile._inited) return;
				GetSetProfile._inited = true;
				var createFun = function createFun(sp) {
					GetSetProfile.classCreated(sp);
				};
				FunHook.hook(Node, "call", null, createFun);
				GetSetProfile.handlerO = {};
				GetSetProfile.handlerO["get"] = function (target, key, receiver) {
					console.log("get", target, key, receiver);
					return Reflect.get(target, key, receiver);
				};
				GetSetProfile.handlerO["set"] = function (target, key, value, receiver) {
					console.log("set", target, key, value, receiver);
					return Reflect.set(target, key, value, receiver);
				};
			}
		}, {
			key: "classCreated",
			value: function classCreated(obj) {
				var oClas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (GetSetProfile.fromMe) return;
				var className;
				className = ClassTool.getClassName(obj);
				GetSetProfile.addClassCount(className);
				GetSetProfile.addClassCount(GetSetProfile.ALL);
				IDTools.idObj(obj);
				var classDes;
				classDes = GetSetProfile.hookClassDic[className];
				if (!classDes) {
					GetSetProfile.profileClass(obj["constructor"]);
					classDes = GetSetProfile.hookClassDic[className];
					if (!classDes) return;
				}
				GetSetProfile.hookObj2(obj, classDes);
			}
		}, {
			key: "hookObj",
			value: function hookObj(obj, keys) {
				var handler = GetSetProfile.handlerO;
				new Proxy(obj, handler);
			}
		}, {
			key: "hookObj2",
			value: function hookObj2(obj, keys) {
				var i, len;
				len = keys.length;
				for (i = 0; i < len; i++) {
					GetSetProfile.hookVar(obj, keys[i]);
				}
			}
		}, {
			key: "profileClass",
			value: function profileClass(clz) {
				var className;
				className = ClassTool.getClassName(clz);
				GetSetProfile.fromMe = true;
				var tO = new clz();
				GetSetProfile.fromMe = false;
				var keys;
				keys = ClassTool.getObjectDisplayAbleKeys(tO);
				keys = ObjectTools.getNoSameArr(keys);
				var i, len;
				len = keys.length;
				var tV;
				var key;
				for (i = len - 1; i >= 0; i--) {
					key = keys[i];
					tV = tO[key];
					if (tV instanceof Function) {
						keys.splice(i, 1);
					}
				}
				len = keys.length;
				GetSetProfile.removeNoDisplayKeys(keys);
				GetSetProfile.hookClassDic[className] = keys;
			}
		}, {
			key: "hookPrototype",
			value: function hookPrototype(tO, key) {
				console.log("hook:", key);
				try {
					GetSetProfile.hookVar(tO, key);
				} catch (e) {
					console.log("fail", key);
				}
			}
		}, {
			key: "reportCall",
			value: function reportCall(obj, name, type) {
				IDTools.idObj(obj);
				var objID;
				objID = IDTools.getObjID(obj);
				var className;
				className = ClassTool.getClassName(obj);
				GetSetProfile.recordInfo(className, name, type, objID);
				GetSetProfile.recordInfo(GetSetProfile.ALL, name, type, objID);
			}
		}, {
			key: "recordInfo",
			value: function recordInfo(className, name, type, objID) {
				var propCallsDic;
				if (!GetSetProfile.infoDic[className]) {
					GetSetProfile.infoDic[className] = {};
				}
				propCallsDic = GetSetProfile.infoDic[className];
				var propCalls;
				if (!propCallsDic[name]) {
					propCallsDic[name] = {};
				}
				propCalls = propCallsDic[name];
				var propCallO;
				if (!propCalls[type]) {
					propCalls[type] = {};
				}
				propCallO = propCalls[type];
				if (!propCallO[objID]) {
					propCallO[objID] = 1;
					if (!propCallO["objCount"]) {
						propCallO["objCount"] = 1;
					} else {
						propCallO["objCount"] = propCallO["objCount"] + 1;
					}
				} else {
					propCallO[objID] = propCallO[objID] + 1;
				}
				if (!propCallO["count"]) {
					propCallO["count"] = 1;
				} else {
					propCallO["count"] = propCallO["count"] + 1;
				}
			}
		}, {
			key: "showInfo",
			value: function showInfo() {
				var rstO;
				rstO = {};
				var rstO1;
				rstO1 = {};
				var arr;
				arr = [];
				var arr1;
				arr1 = [];
				var className;
				var keyName;
				var type;
				for (className in GetSetProfile.infoDic) {
					var tClassO;
					var tClassO1;
					tClassO = GetSetProfile.infoDic[className];
					rstO[className] = tClassO1 = {};
					for (keyName in tClassO) {
						var tKeyO;
						var tKeyO1;
						tKeyO = tClassO[keyName];
						tClassO1[keyName] = tKeyO1 = {};
						for (type in tKeyO) {
							var tDataO;
							tDataO = tKeyO[type];
							tDataO["rate"] = tDataO["objCount"] / GetSetProfile.getClassCount(className);
							tKeyO1[type] = tDataO["rate"];
							var tSKey;
							tSKey = className + "_" + keyName + "_" + type;
							rstO1[tSKey] = tDataO["rate"];
							if (className == GetSetProfile.ALL) {
								if (type == "get") {
									arr.push([tSKey, tDataO["rate"], tDataO["count"]]);
								} else {
									arr1.push([tSKey, tDataO["rate"], tDataO["count"]]);
								}
							}
						}
					}
				}
				console.log(GetSetProfile.infoDic);
				console.log(GetSetProfile.countDic);
				console.log(rstO);
				console.log(rstO1);
				console.log("nodeCount:", GetSetProfile.getClassCount(GetSetProfile.ALL));
				console.log("sort by rate");
				GetSetProfile.showStaticInfo(arr, arr1, "1");
				console.log("sort by count");
				GetSetProfile.showStaticInfo(arr, arr1, "2");
			}
		}, {
			key: "showStaticInfo",
			value: function showStaticInfo(arr, arr1, sortKey) {
				console.log("get:");
				GetSetProfile.showStaticArray(arr, sortKey);
				console.log("set:");
				GetSetProfile.showStaticArray(arr1, sortKey);
			}
		}, {
			key: "showStaticArray",
			value: function showStaticArray(arr) {
				var sortKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "1";

				arr.sort(Laya.MathUtil.sortByKey(sortKey, true, true));
				var i, len;
				len = arr.length;
				var tArr;
				for (i = 0; i < len; i++) {
					tArr = arr[i];
					console.log(tArr[0], Math.floor(tArr[1] * 100), tArr[2]);
				}
			}
		}, {
			key: "hookVar",
			value: function hookVar(obj, name) {
				var setHook = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var getHook = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				if (!setHook) setHook = [];
				if (!getHook) getHook = [];
				var preO = obj;
				var preValue;
				var des;
				des = ClassTool.getOwnPropertyDescriptor(obj, name);
				var ndes = {};
				var mSet = function mSet(value) {
					preValue = value;
				};
				var mGet = function mGet() {
					return preValue;
				};
				var mSet1 = function mSet1(value) {
					var _t = this;
					GetSetProfile.reportCall(_t, name, "set");
				};
				var mGet1 = function mGet1() {
					var _t = this;
					GetSetProfile.reportCall(_t, name, "get");
					return preValue;
				};
				getHook.push(mGet1);
				setHook.push(mSet1);
				while (!des && obj["__proto__"]) {
					obj = obj["__proto__"];
					des = ClassTool.getOwnPropertyDescriptor(obj, name);
				}
				if (des) {
					ndes.set = des.set ? des.set : mSet;
					ndes.get = des.get ? des.get : mGet;
					if (!des.get) {
						preValue = preO[name];
					}
					ndes.enumerable = des.enumerable;
					setHook.push(ndes.set);
					getHook.push(ndes.get);
					FunHook.hookFuns(ndes, "set", setHook);
					FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
					ClassTool.defineProperty(preO, name, ndes);
				}
				if (!des) {
					ndes.set = mSet;
					ndes.get = mGet;
					preValue = preO[name];
					setHook.push(ndes.set);
					getHook.push(ndes.get);
					FunHook.hookFuns(ndes, "set", setHook);
					FunHook.hookFuns(ndes, "get", getHook, getHook.length - 1);
					ClassTool.defineProperty(preO, name, ndes);
				}
			}
		}]);

		return GetSetProfile;
	}();

	GetSetProfile._inited = false;
	GetSetProfile.noDisplayKeys = { "conchModel": true };
	GetSetProfile.ALL = "ALL";
	GetSetProfile.countDic = {};
	GetSetProfile.fromMe = false;
	GetSetProfile.hookClassDic = {};
	GetSetProfile.infoDic = {};

	var JsonTool = function () {
		function JsonTool() {
			_classCallCheck(this, JsonTool);

			this.meta = {
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"': '\\"',
				'\\': '\\\\'
			};
		}

		_createClass(JsonTool, null, [{
			key: "getJsonString",
			value: function getJsonString(obj) {
				var singleLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var split = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "\n";
				var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
				var Width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;

				var preStr = "";
				preStr = JsonTool.getEmptyStr(depth * Width);
				var rst;
				var keyValues;
				keyValues = {};
				var tKey;
				var tValue;
				var keys;
				keys = [];
				for (tKey in obj) {
					keys.push(tKey);
					tValue = obj[tKey];
					if (JsonTool.singleLineKey[tKey]) {
						keyValues[tKey] = JsonTool.getValueStr(tValue, true, split, depth + 1, Width);
					} else {
						keyValues[tKey] = JsonTool.getValueStr(tValue, singleLine, split, depth + 1, Width);
					}
				}
				var i, len;
				len = keys.length;
				keys.sort();
				keys = keys.reverse();
				var keyPreStr;
				keyPreStr = JsonTool.getEmptyStr((depth + 1) * Width);
				if (singleLine) {
					split = "";
					preStr = "";
					keyPreStr = "";
				}
				var keyValueStrArr;
				keyValueStrArr = [];
				for (i = 0; i < len; i++) {
					tKey = keys[i];
					keyValueStrArr.push(keyPreStr + JsonTool.wrapValue(tKey) + ":" + keyValues[tKey]);
				}
				rst = "{" + split + keyValueStrArr.join("," + split) + split + preStr + "}";
				return rst;
			}
		}, {
			key: "wrapValue",
			value: function wrapValue(value) {
				var wraper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "\"";

				return wraper + value + wraper;
			}
		}, {
			key: "getArrStr",
			value: function getArrStr(arr) {
				var singleLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var split = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "\n";
				var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
				var Width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;

				var rst;
				var i, len;
				len = arr.length;
				var valueStrArr;
				valueStrArr = [];
				for (i = 0; i < len; i++) {
					valueStrArr.push(JsonTool.getValueStr(arr[i], singleLine, split, depth + 1, Width));
				}
				var preStr = "";
				preStr = JsonTool.getEmptyStr((depth + 1) * Width);
				if (singleLine) {
					split = "";
					preStr = "";
				}
				rst = "[" + split + preStr + valueStrArr.join("," + split + preStr) + "]";
				return rst;
			}
		}, {
			key: "quote",
			value: function quote(string) {
				JsonTool.escapable.lastIndex = 0;
				return JsonTool.escapable.test(string) ? '"' + string.replace(JsonTool.escapable, function (a) {
					var c = this.meta[a];
					return typeof c === 'string' ? c : "\\u" + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' : '"' + string + '"';
			}
		}, {
			key: "getValueStr",
			value: function getValueStr(tValue) {
				var singleLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var split = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "\n";
				var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
				var Width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

				var rst;
				if (typeof tValue == 'string') {
					rst = JsonTool.quote(tValue);
				} else if (tValue == null) {
					rst = "null";
				} else if (typeof tValue == 'number' || typeof tValue == 'number' || tValue instanceof Boolean) {
					rst = tValue;
				} else if (tValue instanceof Array) {
					rst = JsonTool.getArrStr(tValue, singleLine, split, depth, Width);
				} else if ((typeof tValue === "undefined" ? "undefined" : _typeof(tValue)) == 'object') {
					rst = JsonTool.getJsonString(tValue, singleLine, split, depth, Width);
				} else {
					rst = tValue;
				}
				return rst;
			}
		}, {
			key: "getEmptyStr",
			value: function getEmptyStr(width) {
				if (!JsonTool.emptyDic.hasOwnProperty(width)) {
					var i;
					var len;
					len = width;
					var rst;
					rst = "";
					for (i = 0; i < len; i++) {
						rst += " ";
					}
					JsonTool.emptyDic[width] = rst;
				}
				return JsonTool.emptyDic[width];
			}
		}]);

		return JsonTool;
	}();

	JsonTool.singleLineKey = {
		"props": true
	};
	JsonTool.escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	JsonTool.emptyDic = {};

	var LayoutTools = function () {
		function LayoutTools() {
			_classCallCheck(this, LayoutTools);
		}

		_createClass(LayoutTools, null, [{
			key: "layoutToXCount",
			value: function layoutToXCount(items) {
				var xCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
				var dx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				var dY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
				var sx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
				var sy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

				var tX, tY;
				var tItem;
				var i, len;
				var tCount;
				var maxHeight;
				tCount = 0;
				maxHeight = 0;
				tX = sx;
				tY = sy;
				len = items.length;
				for (i = 0; i < len; i++) {
					tItem = items[i];
					tItem.x = tX;
					tItem.y = tY;
					if (tItem.height > maxHeight) {
						maxHeight = tItem.height;
					}
					tCount++;
					if (tCount >= xCount) {
						tCount = tCount % xCount;
						tItem.y += maxHeight + dY;
						maxHeight = 0;
					} else {
						tX += tItem.width + dx;
					}
				}
			}
		}, {
			key: "layoutToWidth",
			value: function layoutToWidth(items, width, dX, dY, sx, sy) {
				var tX, tY;
				var tItem;
				var i, len;
				tX = sx;
				tY = sy;
				len = items.length;
				for (i = 0; i < len; i++) {
					tItem = items[i];
					if (tX + tItem.width + dX > width) {
						tX = sx;
						tY += dY + tItem.height;
					}
					tItem.x = tX;
					tItem.y = tY;
					tX += dX + tItem.width;
				}
			}
		}]);

		return LayoutTools;
	}();

	var MouseEventAnalyser = function () {
		function MouseEventAnalyser() {
			_classCallCheck(this, MouseEventAnalyser);
		}

		_createClass(MouseEventAnalyser, null, [{
			key: "analyseNode",
			value: function analyseNode(node) {
				DebugTool.showDisBound(node, true);
				var _node;
				_node = node;
				ObjectTools.clearObj(MouseEventAnalyser.infoO);
				ObjectTools.clearObj(MouseEventAnalyser.nodeO);
				ObjectTools.clearObj(MouseEventAnalyser.hitO);
				var nodeList;
				nodeList = [];
				while (node) {
					IDTools.idObj(node);
					MouseEventAnalyser.nodeO[IDTools.getObjID(node)] = node;
					nodeList.push(node);
					node = node.parent;
				}
				MouseEventAnalyser.check(Laya.Laya.stage, Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY, null);
				var canStr;
				if (MouseEventAnalyser.hitO[IDTools.getObjID(_node)]) {
					console.log("can hit");
					canStr = "can hit";
				} else {
					console.log("can't hit");
					canStr = "can't hit";
				}
				var i, len;
				nodeList = nodeList.reverse();
				len = nodeList.length;
				var rstTxts;
				rstTxts = ["[分析对象]:" + ClassTool.getNodeClassAndName(_node) + ":" + canStr];
				for (i = 0; i < len; i++) {
					node = nodeList[i];
					if (MouseEventAnalyser.hitO[IDTools.getObjID(node)]) {
						console.log("can hit:", ClassTool.getNodeClassAndName(node));
						console.log("原因:", MouseEventAnalyser.infoO[IDTools.getObjID(node)]);
						rstTxts.push("can hit:" + " " + ClassTool.getNodeClassAndName(node));
						rstTxts.push("原因:" + " " + MouseEventAnalyser.infoO[IDTools.getObjID(node)]);
					} else {
						console.log("can't hit:" + ClassTool.getNodeClassAndName(node));
						console.log("原因:", MouseEventAnalyser.infoO[IDTools.getObjID(node)] ? MouseEventAnalyser.infoO[IDTools.getObjID(node)] : "鼠标事件在父级已停止派发");
						rstTxts.push("can't hit:" + " " + ClassTool.getNodeClassAndName(node));
						rstTxts.push("原因:" + " " + (MouseEventAnalyser.infoO[IDTools.getObjID(node)] ? MouseEventAnalyser.infoO[IDTools.getObjID(node)] : "鼠标事件在父级已停止派发"));
					}
				}
				var rstStr;
				rstStr = rstTxts.join("\n");
			}
		}, {
			key: "check",
			value: function check(sp, mouseX, mouseY, callBack) {
				IDTools.idObj(sp);
				var isInAnlyseChain;
				isInAnlyseChain = MouseEventAnalyser.nodeO[IDTools.getObjID(sp)];
				MouseEventAnalyser._point.setTo(mouseX, mouseY);
				sp.fromParentPoint(MouseEventAnalyser._point);
				mouseX = MouseEventAnalyser._point.x;
				mouseY = MouseEventAnalyser._point.y;
				var scrollRect = sp.scrollRect;
				if (scrollRect) {
					MouseEventAnalyser._rect.setTo(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
					var isHit = MouseEventAnalyser._rect.contains(mouseX, mouseY);
					if (!isHit) {
						if (isInAnlyseChain) {
							MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "scrollRect没有包含鼠标" + MouseEventAnalyser._rect.toString() + ":" + mouseX + "," + mouseY;
						}
						return false;
					}
				}
				var i, len;
				var cList;
				cList = sp._children;
				len = cList.length;
				var child;
				var childInChain;
				childInChain = null;
				for (i = 0; i < len; i++) {
					child = cList[i];
					IDTools.idObj(child);
					if (MouseEventAnalyser.nodeO[IDTools.getObjID(child)]) {
						childInChain = child;
						break;
					}
				}
				var coverByOthers;
				coverByOthers = childInChain ? true : false;
				var flag = false;
				if (sp.hitTestPrior && !sp.mouseThrough && !MouseEventAnalyser.hitTest(sp, mouseX, mouseY)) {
					MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "hitTestPrior=true，宽高区域不包含鼠标:" + ":" + mouseX + "," + mouseY + " size:" + sp.width + "," + sp.height;
					return false;
				}
				for (i = sp._children.length - 1; i > -1; i--) {
					child = sp._children[i];
					if (child == childInChain) {
						if (!childInChain.mouseEnabled) {
							MouseEventAnalyser.infoO[IDTools.getObjID(childInChain)] = "mouseEnabled=false";
						}
						if (!childInChain.visible) {
							MouseEventAnalyser.infoO[IDTools.getObjID(childInChain)] = "visible=false";
						}
						coverByOthers = false;
					}
					if (child.mouseEnabled && child.visible) {
						flag = MouseEventAnalyser.check(child, mouseX, mouseY, callBack);
						if (flag) {
							MouseEventAnalyser.hitO[IDTools.getObjID(sp)] = true;
							MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "子对象被击中";
							if (child == childInChain) {
								MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "子对象被击中," + "击中对象在分析链中";
							} else {
								MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "子对象被击中," + "击中对象不在分析链中";
								if (coverByOthers) {
									MouseEventAnalyser.infoO[IDTools.getObjID(childInChain)] = "被兄弟节点挡住,兄弟节点信息:" + ClassTool.getNodeClassAndName(child) + "," + child.getBounds().toString();
									DebugTool.showDisBound(child, false, "#ffff00");
								}
							}
							return true;
						} else {
							if (child == childInChain) {
								coverByOthers = false;
							}
						}
					}
				}
				var mHitRect = new Laya.Rectangle();
				var graphicHit = false;
				graphicHit = sp.getGraphicBounds().contains(mouseX, mouseY);
				if (sp.width > 0 && sp.height > 0) {
					var hitRect = MouseEventAnalyser._rect;
					if (!sp.mouseThrough) {
						if (sp.hitArea) hitRect = sp.hitArea;else hitRect.setTo(0, 0, sp.width, sp.height);
						mHitRect.copyFrom(hitRect);
						isHit = hitRect.contains(mouseX, mouseY);
					} else {
						isHit = graphicHit;
						mHitRect.copyFrom(sp.getGraphicBounds());
					}
					if (isHit) {
						MouseEventAnalyser.hitO[IDTools.getObjID(sp)] = true;
					}
				}
				if (!isHit) {
					if (graphicHit) {
						MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "子对象未包含鼠标，实际绘图区域包含鼠标，设置的宽高区域不包含鼠标:" + ":" + mouseX + "," + mouseY + " hitRec:" + mHitRect.toString() + " graphicBounds:" + sp.getGraphicBounds().toString() + "，设置mouseThrough=true或将宽高设置到实际绘图区域可解决问题";
					} else {
						MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "子对象未包含鼠标，实际绘图区域不包含鼠标，设置的宽高区域不包含鼠标:" + ":" + mouseX + "," + mouseY + " hitRec:" + mHitRect.toString() + " graphicBounds:" + sp.getGraphicBounds().toString();
					}
				} else {
					MouseEventAnalyser.infoO[IDTools.getObjID(sp)] = "自身区域被击中";
				}
				return isHit;
			}
		}, {
			key: "hitTest",
			value: function hitTest(sp, mouseX, mouseY) {
				var isHit = false;
				if (sp.hitArea instanceof Laya.HitArea) {
					return Laya.MouseManager.instance.hitTest(sp, mouseX, mouseY);
				}
				if (sp.width > 0 && sp.height > 0 || sp.mouseThrough || sp.hitArea) {
					var hitRect = MouseEventAnalyser._rect;
					if (!sp.mouseThrough) {
						if (sp.hitArea) hitRect = sp.hitArea;else hitRect.setTo(0, 0, sp.width, sp.height);
						isHit = hitRect.contains(mouseX, mouseY);
					} else {
						isHit = sp.getGraphicBounds().contains(mouseX, mouseY);
					}
				}
				return isHit;
			}
		}]);

		return MouseEventAnalyser;
	}();

	MouseEventAnalyser.infoO = {};
	MouseEventAnalyser.nodeO = {};
	MouseEventAnalyser.hitO = {};
	MouseEventAnalyser._matrix = new Laya.Matrix();
	MouseEventAnalyser._point = new Laya.Point();
	MouseEventAnalyser._rect = new Laya.Rectangle();
	DebugTool.analyseMouseHit = function () {
		if (DebugTool.target) MouseEventAnalyser.analyseNode(DebugTool.target);
	};

	var ResTools = function () {
		function ResTools() {
			_classCallCheck(this, ResTools);
		}

		_createClass(ResTools, null, [{
			key: "getCachedResList",
			value: function getCachedResList() {
				return ResTools.getWebGlResList();
			}
		}, {
			key: "getWebGlResList",
			value: function getWebGlResList() {
				var rst;
				rst = [];
				return rst;
			}
		}, {
			key: "getCanvasResList",
			value: function getCanvasResList() {
				var picDic;
				picDic = {};
				var dataO;
				dataO = Laya.Loader.loadedMap;
				ResTools.collectPics(dataO, picDic);
				return ResTools.getArrFromDic(picDic);
			}
		}, {
			key: "getArrFromDic",
			value: function getArrFromDic(dic) {
				var key;
				var rst;
				rst = [];
				for (key in dic) {
					rst.push(key);
				}
				return rst;
			}
		}, {
			key: "collectPics",
			value: function collectPics(dataO, picDic) {
				if (!dataO) return;
				var key;
				var tTexture;
				for (key in dataO) {
					tTexture = dataO[key];
					if (tTexture) {
						if (tTexture.bitmap && tTexture.bitmap.src) {
							var url = tTexture.bitmap.src;
							if (url.indexOf("data:image/png;base64") < 0) picDic[tTexture.bitmap.src] = true;
						}
					}
				}
			}
		}]);

		return ResTools;
	}();

	var SingleTool = function () {
		function SingleTool() {
			_classCallCheck(this, SingleTool);

			this._objDic = {};
		}

		_createClass(SingleTool, [{
			key: "getArr",
			value: function getArr(sign) {
				var dic;
				dic = this.getTypeDic("Array");
				if (!dic[sign]) dic[sign] = [];
				return dic[sign];
			}
		}, {
			key: "getObject",
			value: function getObject(sign) {
				var dic;
				dic = this.getTypeDic("Object");
				if (!dic[sign]) dic[sign] = {};
				return dic[sign];
			}
		}, {
			key: "getByClass",
			value: function getByClass(sign, clzSign, clz) {
				var dic;
				dic = this.getTypeDic(clzSign);
				if (!dic[sign]) dic[sign] = new clz();
				return dic[sign];
			}
		}, {
			key: "getTypeDic",
			value: function getTypeDic(type) {
				if (!this._objDic[type]) this._objDic[type] = {};
				return this._objDic[type];
			}
		}], [{
			key: "I",
			get: function get() {
				if (!SingleTool._instance) {
					SingleTool._instance = new SingleTool();
				}
				return SingleTool._instance;
			},
			set: function set(value) {
				SingleTool._instance = value;
			}
		}]);

		return SingleTool;
	}();

	var TimeTool = function () {
		function TimeTool() {
			_classCallCheck(this, TimeTool);
		}

		_createClass(TimeTool, null, [{
			key: "getTime",
			value: function getTime(sign) {
				var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				if (!TimeTool.timeDic[sign]) {
					TimeTool.timeDic[sign] = 0;
				}
				var tTime;
				tTime = Laya.Browser.now();
				var rst;
				rst = tTime - TimeTool.timeDic[sign];
				TimeTool.timeDic[sign] = tTime;
				return rst;
			}
		}, {
			key: "runAllCallLater",
			value: function runAllCallLater() {
				if (TimeTool._deep > 0) debugger;
				TimeTool._deep++;
				var timer;
				timer = Laya.Laya.timer;
				var laters = timer["_laters"];
				for (var i = 0, n = laters.length - 1; i <= n; i++) {
					var handler = laters[i];
					if (handler) {
						handler.method !== null && handler.run(false);
						timer["_recoverHandler"](handler);
					} else {
						debugger;
					}
					i === n && (n = laters.length - 1);
				}
				laters.length = 0;
				TimeTool._deep--;
			}
		}]);

		return TimeTool;
	}();

	TimeTool.timeDic = {};
	TimeTool._deep = 0;

	var TimerControlTool = function () {
		function TimerControlTool() {
			_classCallCheck(this, TimerControlTool);
		}

		_createClass(TimerControlTool, null, [{
			key: "now",
			value: function now() {
				if (TimerControlTool._timeRate != 1) return TimerControlTool.getRatedNow();
				return Date.now();
			}
		}, {
			key: "getRatedNow",
			value: function getRatedNow() {
				var dTime;
				dTime = TimerControlTool.getNow() - TimerControlTool._startTime;
				return dTime * TimerControlTool._timeRate + TimerControlTool._startTime;
			}
		}, {
			key: "getNow",
			value: function getNow() {
				return Date.now();
			}
		}, {
			key: "setTimeRate",
			value: function setTimeRate(rate) {
				if (TimerControlTool._browerNow == null) TimerControlTool._browerNow = Laya.Browser["now"];
				TimerControlTool._startTime = TimerControlTool.getNow();
				TimerControlTool._timeRate = rate;
				if (rate != 1) {
					Laya.Browser["now"] = TimerControlTool.now;
				} else {
					if (TimerControlTool._browerNow != null) Laya.Browser["now"] = TimerControlTool._browerNow;
				}
			}
		}, {
			key: "recoverRate",
			value: function recoverRate() {
				TimerControlTool.setTimeRate(1);
			}
		}]);

		return TimerControlTool;
	}();

	TimerControlTool._timeRate = 1;

	var TouchDebugTools = function () {
		function TouchDebugTools() {
			_classCallCheck(this, TouchDebugTools);
		}

		_createClass(TouchDebugTools, null, [{
			key: "getTouchIDs",
			value: function getTouchIDs(events) {
				var rst;
				rst = [];
				var i, len;
				len = events.length;
				for (i = 0; i < len; i++) {
					rst.push(events[i].identifier || 0);
				}
				return rst;
			}
		}, {
			key: "traceTouchIDs",
			value: function traceTouchIDs(msg, events) {
				DebugTxt.dTrace(msg + ":" + TouchDebugTools.getTouchIDs(events).join(","));
			}
		}]);

		return TouchDebugTools;
	}();

	var UVTools = function () {
		function UVTools() {
			_classCallCheck(this, UVTools);
		}

		_createClass(UVTools, null, [{
			key: "getUVByRec",
			value: function getUVByRec(x, y, width, height) {
				return [x, y, x + width, y, x + width, y + height, x, y + height];
			}
		}, {
			key: "getRecFromUV",
			value: function getRecFromUV(uv) {
				var rst;
				rst = new Laya.Rectangle(uv[0], uv[1], uv[2] - uv[0], uv[5] - uv[1]);
				return rst;
			}
		}, {
			key: "isUVRight",
			value: function isUVRight(uv) {
				if (uv[0] != uv[6]) return false;
				if (uv[1] != uv[3]) return false;
				if (uv[2] != uv[4]) return false;
				if (uv[5] != uv[7]) return false;
				return true;
			}
		}, {
			key: "getTextureRec",
			value: function getTextureRec(texture) {
				var rst;
				rst = UVTools.getRecFromUV(texture.uv);
				rst.x *= texture.bitmap.width;
				rst.y *= texture.bitmap.height;
				rst.width *= texture.bitmap.width;
				rst.height *= texture.bitmap.height;
				return rst;
			}
		}]);

		return UVTools;
	}();

	var VisibleAnalyser = function () {
		function VisibleAnalyser() {
			_classCallCheck(this, VisibleAnalyser);
		}

		_createClass(VisibleAnalyser, null, [{
			key: "analyseTarget",
			value: function analyseTarget(node) {
				var isInstage;
				isInstage = node.displayedInStage;
				var gRec;
				gRec = NodeUtils.getGRec(node);
				var stageRec = new Laya.Rectangle();
				stageRec.setTo(0, 0, Laya.Laya.stage.width, Laya.Laya.stage.height);
				var isInVisibleRec;
				var visibleRec;
				visibleRec = stageRec.intersection(gRec);
				if (visibleRec.width > 0 && visibleRec.height > 0) {
					isInVisibleRec = true;
				} else {
					isInVisibleRec = false;
				}
				var gAlpha;
				gAlpha = NodeUtils.getGAlpha(node);
				var gVisible;
				gVisible = NodeUtils.getGVisible(node);
				var msg;
				msg = "";
				msg += "isInstage:" + isInstage + "\n";
				msg += "isInVisibleRec:" + isInVisibleRec + "\n";
				msg += "gVisible:" + gVisible + "\n";
				msg += "gAlpha:" + gAlpha + "\n";
				if (isInstage && isInVisibleRec && gVisible && gAlpha > 0) {
					VisibleAnalyser.anlyseRecVisible(node);
					msg += "coverRate:" + VisibleAnalyser.coverRate + "\n";
					if (VisibleAnalyser._coverList.length > 0) {
						Laya.Laya.timer.once(1000, null, VisibleAnalyser.showListLater);
					}
				}
				console.log(msg);
			}
		}, {
			key: "showListLater",
			value: function showListLater() {}
		}, {
			key: "isCoverByBrother",
			value: function isCoverByBrother(node) {
				var parent = node.parent;
				if (!parent) return;
				var _childs = parent._children;
				var index;
				index = _childs.indexOf(node);
				if (index < 0) return;
				var rec;
				rec = parent.getSelfBounds();
				if (rec.width <= 0 || rec.height <= 0) return;
			}
		}, {
			key: "anlyseRecVisible",
			value: function anlyseRecVisible(node) {
				VisibleAnalyser.isNodeWalked = false;
				VisibleAnalyser._analyseTarget = node;
				if (!VisibleAnalyser.mainCanvas) VisibleAnalyser.mainCanvas = CanvasTools.createCanvas(Laya.Laya.stage.width, Laya.Laya.stage.height);
				CanvasTools.clearCanvas(VisibleAnalyser.mainCanvas);
				VisibleAnalyser.tColor = 1;
				VisibleAnalyser.resetCoverList();
				WalkTools.walkTargetEX(Laya.Laya.stage, VisibleAnalyser.recVisibleWalker, null, VisibleAnalyser.filterFun);
				if (!VisibleAnalyser.isTarRecOK) {
					VisibleAnalyser.coverRate = 0;
				} else {
					VisibleAnalyser.coverRate = CanvasTools.getDifferRate(VisibleAnalyser.preImageData, VisibleAnalyser.tarImageData);
				}
				console.log("coverRate:", VisibleAnalyser.coverRate);
			}
		}, {
			key: "getRecArea",
			value: function getRecArea(rec) {
				return rec.width * rec.height;
			}
		}, {
			key: "addCoverNode",
			value: function addCoverNode(node, coverRate) {
				var data;
				data = {};
				data.path = node;
				data.label = ClassTool.getNodeClassAndName(node) + ":" + coverRate;
				data.coverRate = coverRate;
				VisibleAnalyser._coverList.push(data);
				console.log("coverByNode:", node, coverRate);
			}
		}, {
			key: "resetCoverList",
			value: function resetCoverList() {
				VisibleAnalyser._coverList.length = 0;
			}
		}, {
			key: "recVisibleWalker",
			value: function recVisibleWalker(node) {
				if (node == VisibleAnalyser._analyseTarget) {
					VisibleAnalyser.isNodeWalked = true;
					VisibleAnalyser.tarRec.copyFrom(NodeUtils.getGRec(node));
					console.log("tarRec:", VisibleAnalyser.tarRec.toString());
					if (VisibleAnalyser.tarRec.width > 0 && VisibleAnalyser.tarRec.height > 0) {
						VisibleAnalyser.isTarRecOK = true;
						VisibleAnalyser.tColor++;
						CanvasTools.fillCanvasRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec, ColorTool.toHexColor(VisibleAnalyser.tColor));
						VisibleAnalyser.preImageData = CanvasTools.getImageDataFromCanvasByRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec);
						VisibleAnalyser.tarImageData = CanvasTools.getImageDataFromCanvasByRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec);
					} else {
						console.log("tarRec Not OK:", VisibleAnalyser.tarRec);
					}
				} else {
					if (VisibleAnalyser.isTarRecOK) {
						var tRec;
						tRec = NodeUtils.getGRec(node);
						VisibleAnalyser.interRec = VisibleAnalyser.tarRec.intersection(tRec, VisibleAnalyser.interRec);
						if (VisibleAnalyser.interRec && VisibleAnalyser.interRec.width > 0 && VisibleAnalyser.interRec.height > 0) {
							VisibleAnalyser.tColor++;
							CanvasTools.fillCanvasRec(VisibleAnalyser.mainCanvas, tRec, ColorTool.toHexColor(VisibleAnalyser.tColor));
							VisibleAnalyser.tImageData = CanvasTools.getImageDataFromCanvasByRec(VisibleAnalyser.mainCanvas, VisibleAnalyser.tarRec);
							var dRate;
							dRate = CanvasTools.getDifferRate(VisibleAnalyser.preImageData, VisibleAnalyser.tImageData);
							VisibleAnalyser.preImageData = VisibleAnalyser.tImageData;
							VisibleAnalyser.addCoverNode(node, dRate);
						}
					}
				}
			}
		}, {
			key: "filterFun",
			value: function filterFun(node) {
				if (node.visible == false) return false;
				if (node.alpha < 0) return false;
				if (DebugInfoLayer.I.isDebugItem(node)) return false;
				return true;
			}
		}]);

		return VisibleAnalyser;
	}();

	VisibleAnalyser.tarRec = new Laya.Rectangle();
	VisibleAnalyser.interRec = new Laya.Rectangle();
	VisibleAnalyser._coverList = [];

	var XML2Object = function () {
		function XML2Object() {
			_classCallCheck(this, XML2Object);
		}

		_createClass(XML2Object, null, [{
			key: "parse",
			value: function parse(node) {
				var isFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				var obj = {};
				if (isFirst) obj.Name = node.localName;
				var numOfChilds = node.children.length;
				var childs = [];
				var children = {};
				obj.c = children;
				obj.cList = childs;
				for (var i = 0; i < numOfChilds; i++) {
					var childNode = node.children[i];
					var childNodeName = childNode.localName;
					var value;
					var numOfAttributes;
					value = XML2Object.parse(childNode, true);
					childs.push(value);
					if (children[childNodeName]) {
						if (XML2Object.getTypeof(children[childNodeName]) == "array") {
							children[childNodeName].push(value);
						} else {
							children[childNodeName] = [children[childNodeName], value];
						}
					} else if (XML2Object.isArray(childNodeName)) {
						children[childNodeName] = [value];
					} else {
						children[childNodeName] = value;
					}
				}
				numOfAttributes = 0;
				if (node.attributes) {
					numOfAttributes = node.attributes.length;
					var prop = {};
					obj.p = prop;
					for (i = 0; i < numOfAttributes; i++) {
						prop[node.attributes[i].name.toString()] = String(node.attributes[i].nodeValue);
					}
				}
				if (numOfChilds == 0) {
					if (numOfAttributes == 0) {
						obj = "";
					}
				}
				return obj;
			}
		}, {
			key: "getArr",
			value: function getArr(v) {
				if (!v) return [];
				if (XML2Object.getTypeof(v) == "array") return v;
				return [v];
			}
		}, {
			key: "isArray",
			value: function isArray(nodeName) {
				var numOfArrays = XML2Object._arrays ? XML2Object._arrays.length : 0;
				for (var i = 0; i < numOfArrays; i++) {
					if (nodeName == XML2Object._arrays[i]) {
						return true;
					}
				}
				return false;
			}
		}, {
			key: "getTypeof",
			value: function getTypeof(o) {
				if ((typeof o === "undefined" ? "undefined" : _typeof(o)) == "object") {
					if (o.length == null) {
						return "object";
					} else if (typeof o.length == "number") {
						return "array";
					} else {
						return "object";
					}
				} else {
					return typeof o === "undefined" ? "undefined" : _typeof(o);
				}
			}
		}, {
			key: "arrays",
			get: function get() {
				if (!XML2Object._arrays) {
					XML2Object._arrays = [];
				}
				return XML2Object._arrays;
			},
			set: function set(a) {
				XML2Object._arrays = a;
			}
		}]);

		return XML2Object;
	}();

	var XML2ObjectNodejs = function () {
		function XML2ObjectNodejs() {
			_classCallCheck(this, XML2ObjectNodejs);
		}

		_createClass(XML2ObjectNodejs, null, [{
			key: "parse",
			value: function parse(node) {
				var isFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				var obj = {};
				if (isFirst) obj.Name = node.localName;
				var numOfChilds = node[XML2ObjectNodejs.ChildrenSign] ? node[XML2ObjectNodejs.ChildrenSign].length : 0;
				var childs = [];
				var children = {};
				obj.c = children;
				obj.cList = childs;
				for (var i = 0; i < numOfChilds; i++) {
					var childNode = node[XML2ObjectNodejs.ChildrenSign][i];
					var childNodeName = childNode.localName;
					var value;
					var numOfAttributes;
					if (!childNodeName) continue;
					value = XML2ObjectNodejs.parse(childNode, true);
					childs.push(value);
					if (children[childNodeName]) {
						if (XML2ObjectNodejs.getTypeof(children[childNodeName]) == "array") {
							children[childNodeName].push(value);
						} else {
							children[childNodeName] = [children[childNodeName], value];
						}
					} else if (XML2ObjectNodejs.isArray(childNodeName)) {
						children[childNodeName] = [value];
					} else {
						children[childNodeName] = value;
					}
				}
				numOfAttributes = 0;
				if (node.attributes) {
					numOfAttributes = node.attributes.length;
					var prop = {};
					obj.p = prop;
					for (i = 0; i < numOfAttributes; i++) {
						prop[node.attributes[i].name.toString()] = String(node.attributes[i].nodeValue);
					}
				}
				return obj;
			}
		}, {
			key: "getArr",
			value: function getArr(v) {
				if (!v) return [];
				if (XML2ObjectNodejs.getTypeof(v) == "array") return v;
				return [v];
			}
		}, {
			key: "isArray",
			value: function isArray(nodeName) {
				var numOfArrays = XML2ObjectNodejs._arrays ? XML2ObjectNodejs._arrays.length : 0;
				for (var i = 0; i < numOfArrays; i++) {
					if (nodeName == XML2ObjectNodejs._arrays[i]) {
						return true;
					}
				}
				return false;
			}
		}, {
			key: "getTypeof",
			value: function getTypeof(o) {
				if ((typeof o === "undefined" ? "undefined" : _typeof(o)) == "object") {
					if (o.length == null) {
						return "object";
					} else if (typeof o.length == "number") {
						return "array";
					} else {
						return "object";
					}
				} else {
					return typeof o === "undefined" ? "undefined" : _typeof(o);
				}
			}
		}, {
			key: "arrays",
			get: function get() {
				if (!XML2ObjectNodejs._arrays) {
					XML2ObjectNodejs._arrays = [];
				}
				return XML2ObjectNodejs._arrays;
			},
			set: function set(a) {
				XML2ObjectNodejs._arrays = a;
			}
		}]);

		return XML2ObjectNodejs;
	}();

	XML2ObjectNodejs.ChildrenSign = "childNodes";

	var Arrow = function (_Laya$Sprite9) {
		_inherits(Arrow, _Laya$Sprite9);

		function Arrow() {
			_classCallCheck(this, Arrow);

			var _this15 = _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call(this));

			_this15.drawMe();
			return _this15;
		}

		_createClass(Arrow, [{
			key: "drawMe",
			value: function drawMe() {
				var g;
				g = this.graphics;
				g.clear();
				g.drawLine(0, 0, -1, -1, "#ff0000");
				g.drawLine(0, 0, 1, -1, "#ff0000");
			}
		}]);

		return Arrow;
	}(Laya.Sprite);

	var AutoSizeRec = function (_Laya$Sprite10) {
		_inherits(AutoSizeRec, _Laya$Sprite10);

		function AutoSizeRec(type) {
			_classCallCheck(this, AutoSizeRec);

			var _this16 = _possibleConstructorReturn(this, (AutoSizeRec.__proto__ || Object.getPrototypeOf(AutoSizeRec)).call(this));

			_this16._color = "#ffffff";
			return _this16;
		}

		_createClass(AutoSizeRec, [{
			key: "setColor",
			value: function setColor(color) {
				this._color = color;
				this.reRender();
			}
		}, {
			key: "changeSize",
			value: function changeSize() {
				this.reRender();
			}
		}, {
			key: "reRender",
			value: function reRender() {
				var g = this.graphics;
				g.clear();
				g.drawRect(0, 0, this.width, this.height, this._color);
			}
		}, {
			key: "record",
			value: function record() {
				this.preX = this.x;
				this.preY = this.y;
			}
		}, {
			key: "getDx",
			value: function getDx() {
				return this.x - this.preX;
			}
		}, {
			key: "getDy",
			value: function getDy() {
				return this.y - this.preY;
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(AutoSizeRec.prototype.__proto__ || Object.getPrototypeOf(AutoSizeRec.prototype), "height", value, this);
				this.changeSize();
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(AutoSizeRec.prototype.__proto__ || Object.getPrototypeOf(AutoSizeRec.prototype), "width", value, this);
				this.changeSize();
			}
		}]);

		return AutoSizeRec;
	}(Laya.Sprite);

	var DInput = function (_Laya$Input) {
		_inherits(DInput, _Laya$Input);

		function DInput() {
			_classCallCheck(this, DInput);

			var _this17 = _possibleConstructorReturn(this, (DInput.__proto__ || Object.getPrototypeOf(DInput)).call(this));

			_this17.bgColor = "#11ff00";
			return _this17;
		}

		return DInput;
	}(Laya.Input);

	var ClassCreateHook = function () {
		function ClassCreateHook() {
			_classCallCheck(this, ClassCreateHook);

			this.createInfo = {};
		}

		_createClass(ClassCreateHook, [{
			key: "hookClass",
			value: function hookClass(clz) {
				if (ClassCreateHook.isInited) return;
				ClassCreateHook.isInited = true;
				var createFun = function createFun(sp) {
					this.classCreated(sp, clz);
				};
				FunHook.hook(clz, "call", createFun);
			}
		}, {
			key: "classCreated",
			value: function classCreated(clz, oClass) {
				var key;
				key = ClassTool.getNodeClassAndName(clz);
				var depth = 0;
				var tClz;
				tClz = clz;
				while (tClz && tClz != oClass) {
					tClz = tClz.prototype;
					depth++;
				}
				if (!ClassCreateHook.I.createInfo[key]) {
					ClassCreateHook.I.createInfo[key] = 0;
				}
				ClassCreateHook.I.createInfo[key] = ClassCreateHook.I.createInfo[key] + 1;
				RunProfile.run(key, depth + 6);
			}
		}, {
			key: "getClassCreateInfo",
			value: function getClassCreateInfo(clz) {
				var key;
				key = ClassTool.getClassName(clz);
				return RunProfile.getRunInfo(key);
			}
		}], [{
			key: "I",
			get: function get() {
				if (!ClassCreateHook._instance) {
					ClassCreateHook._instance = new ClassCreateHook();
				}
				return ClassCreateHook._instance;
			},
			set: function set(value) {
				ClassCreateHook._instance = value;
			}
		}]);

		return ClassCreateHook;
	}();

	ClassCreateHook.isInited = false;

	var FunctionTimeHook = function () {
		function FunctionTimeHook() {
			_classCallCheck(this, FunctionTimeHook);
		}

		_createClass(FunctionTimeHook, null, [{
			key: "hookFun",
			value: function hookFun(obj, funName) {
				if (!obj) return;
				if (obj.timeHooked) return;
				var myKey;
				FunctionTimeHook.HookID++;
				myKey = ClassTool.getNodeClassAndName(obj) + "." + funName + "():" + FunctionTimeHook.HookID;
				var timePreFun = function timePreFun() {
					FunctionTimeHook.funBegin(myKey);
				};
				var timeEndFun = function timeEndFun() {
					FunctionTimeHook.funEnd(myKey);
				};
				obj.timeHooked = true;
				FunHook.hook(obj, funName, timePreFun, timeEndFun);
			}
		}, {
			key: "funBegin",
			value: function funBegin(funKey) {
				FunctionTimeHook.funPre[funKey] = Laya.Browser.now();
			}
		}, {
			key: "funEnd",
			value: function funEnd(funKey) {
				if (!FunctionTimeHook.funPre[funKey]) FunctionTimeHook.funPre[funKey] = 0;
				FunctionTimeHook.counter.add(funKey, Laya.Browser.now() - FunctionTimeHook.funPre[funKey]);
			}
		}, {
			key: "fresh",
			value: function fresh() {
				FunctionTimeHook.funEnd(FunctionTimeHook.TotalSign);
				FunctionTimeHook.counter.record();
				FunctionTimeHook.funBegin(FunctionTimeHook.TotalSign);
			}
		}]);

		return FunctionTimeHook;
	}();

	FunctionTimeHook.HookID = 1;
	FunctionTimeHook.counter = new CountTool();
	FunctionTimeHook.funPre = {};
	FunctionTimeHook.TotalSign = "TotalSign";

	var LoaderHook = function (_Laya$LoaderManager) {
		_inherits(LoaderHook, _Laya$LoaderManager);

		function LoaderHook() {
			_classCallCheck(this, LoaderHook);

			return _possibleConstructorReturn(this, (LoaderHook.__proto__ || Object.getPrototypeOf(LoaderHook)).call(this));
		}

		_createClass(LoaderHook, [{
			key: "checkUrls",
			value: function checkUrls(url) {
				var tarUrl;
				if (typeof url == 'string') {
					tarUrl = url;
				} else {
					tarUrl = url.url;
				}
				if (LoaderHook.preFails[tarUrl]) {
					if (LoaderHook.enableFailDebugger) {
						debugger;
					}
				}
			}
		}, {
			key: "chekUrlList",
			value: function chekUrlList(urls) {
				var i, len;
				len = urls.length;
				for (i = 0; i < len; i++) {
					this.checkUrls(urls[i]);
				}
			}
		}, {
			key: "load",
			value: function load(url) {
				var complete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var progress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
				var priority = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
				var cache = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
				var group = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
				var ignoreCache = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
				var useWorkerLoader = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;

				if (url instanceof Array) {
					this.chekUrlList(url);
				} else {
					this.checkUrls(url);
				}
				return _get(LoaderHook.prototype.__proto__ || Object.getPrototypeOf(LoaderHook.prototype), "load", this).call(this, url, complete, progress, type, priority, cache, group, ignoreCache, useWorkerLoader);
			}
		}], [{
			key: "init",
			value: function init() {
				if (LoaderHook.isInited) return;
				LoaderHook.isInited = true;
				Laya.Laya.loader = new LoaderHook();
				Laya.Laya.loader.on(Laya.Event.ERROR, null, LoaderHook.onFail);
				LoaderHook.preFails = Laya.LocalStorage.getJSON(LoaderHook.FailSign);
				if (!LoaderHook.preFails) LoaderHook.preFails = {};
			}
		}, {
			key: "onFail",
			value: function onFail(failFile) {
				LoaderHook.nowFails[failFile] = true;
				Laya.LocalStorage.setJSON(LoaderHook.FailSign, LoaderHook.nowFails);
			}
		}, {
			key: "resetFails",
			value: function resetFails() {
				LoaderHook.nowFails = {};
				Laya.LocalStorage.setJSON(LoaderHook.FailSign, LoaderHook.nowFails);
			}
		}]);

		return LoaderHook;
	}(Laya.LoaderManager);

	LoaderHook.preFails = {};
	LoaderHook.nowFails = {};
	LoaderHook.enableFailDebugger = true;
	LoaderHook.FailSign = "LoadFailItems";
	LoaderHook.isInited = false;

	var Observer = function () {
		function Observer() {
			_classCallCheck(this, Observer);
		}

		_createClass(Observer, null, [{
			key: "observe",
			value: function observe(obj, callBack) {}
		}, {
			key: "unobserve",
			value: function unobserve(obj, callBack) {}
		}, {
			key: "observeDiffer",
			value: function observeDiffer(obj, sign) {
				var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "obDiffer";

				var differFun = function differFun() {
					DifferTool.differ(sign, obj, msg);
				};
				Observer.observe(obj, differFun);
			}
		}]);

		return Observer;
	}();

	var Watch = function () {
		function Watch() {
			_classCallCheck(this, Watch);
		}

		_createClass(Watch, null, [{
			key: "watch",
			value: function watch(obj, name, callBack) {
				obj.watch(name, callBack);
			}
		}, {
			key: "unwatch",
			value: function unwatch(obj, name, callBack) {
				obj.unwatch(name, callBack);
			}
		}]);

		return Watch;
	}();

	var Layouter = function () {
		function Layouter() {
			_classCallCheck(this, Layouter);

			this._sX = 0;
			this._width = 0;
		}

		_createClass(Layouter, [{
			key: "layout",
			value: function layout() {
				this.layoutFun(this._width, this._items, this.data, this._sX);
			}
		}, {
			key: "changed",
			value: function changed() {
				Laya.Laya.timer.callLater(this, this.layout);
			}
		}, {
			key: "calSize",
			value: function calSize() {
				var i, len;
				var tItem;
				tItem = this.items[0];
				this._sX = tItem.x;
				var maxX;
				maxX = this._sX + tItem.width;
				len = this.items.length;
				for (i = 1; i < len; i++) {
					tItem = this.items[i];
					if (this._sX > tItem.x) {
						this._sX = tItem.x;
					}
					if (maxX < tItem.x + tItem.width) {
						maxX = tItem.x + tItem.width;
					}
				}
				this._width = maxX - this._sX;
			}
		}, {
			key: "items",
			set: function set(arr) {
				this._items = arr;
				this.calSize();
			},
			get: function get() {
				return this._items;
			}
		}, {
			key: "x",
			set: function set(v) {
				this._sX = v;
				this.changed();
			},
			get: function get() {
				return this._sX;
			}
		}, {
			key: "width",
			set: function set(v) {
				this._width = v;
				this.changed();
			},
			get: function get() {
				return this._width;
			}
		}]);

		return Layouter;
	}();

	var LayoutFuns = function () {
		function LayoutFuns() {
			_classCallCheck(this, LayoutFuns);
		}

		_createClass(LayoutFuns, null, [{
			key: "sameWidth",
			value: function sameWidth(totalWidth, items) {
				var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var sX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var dWidth = 0;
				if (data && data.dWidth) dWidth = data.dWidth;
				var perWidth;
				perWidth = (totalWidth - (items.length - 1) * dWidth) / items.length;
				var tItem;
				var i, len;
				var tX;
				tX = sX;
				len = items.length;
				for (i = 0; i < len; i++) {
					tItem = items[i];
					tItem.x = tX;
					tItem.width = perWidth;
					tX += dWidth + perWidth;
				}
			}
		}, {
			key: "getSameWidthLayout",
			value: function getSameWidthLayout(items, dWidth) {
				var data;
				data = {};
				data.dWidth = dWidth;
				return LayoutFuns.getLayouter(items, data, LayoutFuns.sameWidth);
			}
		}, {
			key: "getLayouter",
			value: function getLayouter(items, data, fun) {
				var layouter;
				layouter = new Layouter();
				layouter.items = items;
				layouter.data = data;
				layouter.layoutFun = fun;
				return layouter;
			}
		}, {
			key: "sameDis",
			value: function sameDis(totalWidth, items) {
				var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var sX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var dWidth;
				dWidth = totalWidth;
				var tItem;
				var i, len;
				len = items.length;
				LayoutFuns.prepareForLayoutWidth(totalWidth, items);
				for (i = 0; i < len; i++) {
					tItem = items[i];
					dWidth -= tItem.width;
				}
				if (items.length > 1) dWidth = dWidth / (items.length - 1);
				var tX;
				tX = sX;
				len = items.length;
				for (i = 0; i < len; i++) {
					tItem = items[i];
					tItem.x = tX;
					tX += dWidth + tItem.width;
				}
			}
		}, {
			key: "getSameDisLayout",
			value: function getSameDisLayout(items) {
				var rateSame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				var data;
				data = {};
				if (rateSame) {
					var i, len;
					len = items.length;
					var tItem;
					var totalWidth;
					totalWidth = 0;
					for (i = 0; i < len; i++) {
						tItem = items[i];
						totalWidth += tItem.width;
					}
					totalWidth = tItem.x + tItem.width;
					for (i = 0; i < len; i++) {
						tItem = items[i];
						LayoutFuns.setItemRate(tItem, tItem.width / totalWidth);
					}
				}
				return LayoutFuns.getLayouter(items, data, LayoutFuns.sameDis);
			}
		}, {
			key: "fullFill",
			value: function fullFill(totalWidth, items) {
				var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var sX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var dL = 0,
				    dR = 0;
				if (data) {
					if (data.dL) dL = data.dL;
					if (data.dR) dR = data.dR;
				}
				var item;
				var i, len;
				len = items.length;
				for (i = 0; i < len; i++) {
					item = items[i];
					item.x = sX + dL;
					item.width = totalWidth - dL - dR;
				}
			}
		}, {
			key: "getFullFillLayout",
			value: function getFullFillLayout(items) {
				var dL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var dR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				var data;
				data = {};
				data.dL = dL;
				data.dR = dR;
				return LayoutFuns.getLayouter(items, data, LayoutFuns.fullFill);
			}
		}, {
			key: "fixPos",
			value: function fixPos(totalWidth, items) {
				var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var sX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var dLen = 0;
				var poss = [];
				var isRate = false;
				if (data) {
					if (data.dLen) dLen = data.dLen;
					if (data.poss) poss = data.poss;
					if (data.isRate) isRate = data.isRate;
				}
				var item;
				var i, len;
				len = poss.length;
				var tValue;
				var preItem;
				preItem = null;
				for (i = 0; i < len; i++) {
					item = items[i];
					tValue = sX + poss[i];
					if (isRate) {
						tValue = sX + poss[i] * totalWidth;
					}
					item.x = tValue;
					if (preItem) {
						preItem.width = item.x - dLen - preItem.x;
					}
					preItem = item;
				}
				var lastItem;
				lastItem = items[items.length - 1];
				lastItem.width = sX + totalWidth - dLen - lastItem.x;
			}
		}, {
			key: "getFixPos",
			value: function getFixPos(items) {
				var dLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var isRate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
				var poss = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				var data;
				data = {};
				var layout;
				layout = LayoutFuns.getLayouter(items, data, LayoutFuns.fixPos);
				var i, len;
				var sX;
				var totalWidth;
				sX = layout.x;
				totalWidth = layout.width;
				if (!poss) {
					poss = [];
					len = items.length;
					var tValue;
					for (i = 0; i < len; i++) {
						tValue = items[i].x - sX;
						if (isRate) {
							tValue = tValue / totalWidth;
						}
						poss.push(tValue);
					}
				}
				data.dLen = dLen;
				data.poss = poss;
				data.isRate = isRate;
				return layout;
			}
		}, {
			key: "clearItemsRelativeInfo",
			value: function clearItemsRelativeInfo(items) {
				var i, len;
				len = items.length;
				for (i = 0; i < len; i++) {
					LayoutFuns.clearItemRelativeInfo(items[i]);
				}
			}
		}, {
			key: "clearItemRelativeInfo",
			value: function clearItemRelativeInfo(item) {
				var Nan = "NaN";
				item.left = Nan;
				item.right = Nan;
			}
		}, {
			key: "prepareForLayoutWidth",
			value: function prepareForLayoutWidth(totalWidth, items) {
				var i, len;
				len = items.length;
				for (i = 0; i < len; i++) {
					LayoutFuns.prepareItemForLayoutWidth(totalWidth, items[i]);
				}
			}
		}, {
			key: "getSumWidth",
			value: function getSumWidth(items) {
				var sum;
				sum = 0;
				var i, len;
				len = items.length;
				for (i = 0; i < len; i++) {
					sum += items[i].width;
				}
				return sum;
			}
		}, {
			key: "prepareItemForLayoutWidth",
			value: function prepareItemForLayoutWidth(totalWidth, item) {
				if (LayoutFuns.getItemRate(item) > 0) {
					item.width = totalWidth * LayoutFuns.getItemRate(item);
				}
			}
		}, {
			key: "setItemRate",
			value: function setItemRate(item, rate) {
				item[LayoutFuns.RateSign] = rate;
			}
		}, {
			key: "getItemRate",
			value: function getItemRate(item) {
				return item[LayoutFuns.RateSign] ? item[LayoutFuns.RateSign] : -1;
			}
		}, {
			key: "setItemFreeSize",
			value: function setItemFreeSize(item) {
				var free = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				item[LayoutFuns.FreeSizeSign] = free;
			}
		}, {
			key: "isItemFreeSize",
			value: function isItemFreeSize(item) {
				return item[LayoutFuns.FreeSizeSign];
			}
		}, {
			key: "lockedDis",
			value: function lockedDis(totalWidth, items) {
				var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var sX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var dists;
				dists = data.dists;
				var sumDis;
				sumDis = data.sumDis;
				var sumWidth;
				var i, len;
				var tItem;
				var preItem;
				LayoutFuns.prepareForLayoutWidth(totalWidth, items);
				sumWidth = LayoutFuns.getSumWidth(items);
				var dWidth;
				dWidth = totalWidth - sumDis - sumWidth;
				var freeItem;
				freeItem = LayoutFuns.getFreeItem(items);
				if (freeItem) {
					freeItem.width += dWidth;
				}
				preItem = items[0];
				preItem.x = sX;
				len = items.length;
				for (i = 1; i < len; i++) {
					tItem = items[i];
					tItem.x = preItem.x + preItem.width + dists[i - 1];
					preItem = tItem;
				}
			}
		}, {
			key: "getFreeItem",
			value: function getFreeItem(items) {
				var i, len;
				len = items.length;
				for (i = 0; i < len; i++) {
					if (LayoutFuns.isItemFreeSize(items[i])) {
						return items[i];
					}
				}
				return null;
			}
		}, {
			key: "getLockedDis",
			value: function getLockedDis(items) {
				var data;
				data = {};
				var dists;
				var i, len;
				var tItem;
				var preItem;
				var sumDis;
				sumDis = 0;
				var tDis;
				preItem = items[0];
				dists = [];
				len = items.length;
				for (i = 1; i < len; i++) {
					tItem = items[i];
					tDis = tItem.x - preItem.x - preItem.width;
					dists.push(tDis);
					sumDis += tDis;
					preItem = tItem;
				}
				data.dists = dists;
				data.sumDis = sumDis;
				return LayoutFuns.getLayouter(items, data, LayoutFuns.lockedDis);
			}
		}]);

		return LayoutFuns;
	}();

	LayoutFuns.RateSign = "layoutRate";
	LayoutFuns.FreeSizeSign = "layoutFreeSize";

	var AutoFillRec = function (_Laya$Sprite11) {
		_inherits(AutoFillRec, _Laya$Sprite11);

		function AutoFillRec(type) {
			_classCallCheck(this, AutoFillRec);

			return _possibleConstructorReturn(this, (AutoFillRec.__proto__ || Object.getPrototypeOf(AutoFillRec)).call(this));
		}

		_createClass(AutoFillRec, [{
			key: "changeSize",
			value: function changeSize() {
				var g = this.graphics;
				g.clear();
				g.drawRect(0, 0, this.width, this.height, "#33c5f5");
			}
		}, {
			key: "record",
			value: function record() {
				this.preX = this.x;
				this.preY = this.y;
			}
		}, {
			key: "getDx",
			value: function getDx() {
				return this.x - this.preX;
			}
		}, {
			key: "getDy",
			value: function getDy() {
				return this.y - this.preY;
			}
		}, {
			key: "width",
			set: function set(value) {
				_set(AutoFillRec.prototype.__proto__ || Object.getPrototypeOf(AutoFillRec.prototype), "width", value, this);
				this.changeSize();
			}
		}, {
			key: "height",
			set: function set(value) {
				_set(AutoFillRec.prototype.__proto__ || Object.getPrototypeOf(AutoFillRec.prototype), "height", value, this);
				this.changeSize();
			}
		}]);

		return AutoFillRec;
	}(Laya.Sprite);

	var DisResizer = function () {
		function DisResizer() {
			_classCallCheck(this, DisResizer);
		}

		_createClass(DisResizer, null, [{
			key: "init",
			value: function init() {
				if (DisResizer._up) return;
				DisResizer._up = new AutoFillRec("T");
				DisResizer._up.height = DisResizer.barWidth;
				DisResizer._up.type = DisResizer.Horizon;
				DisResizer._down = new AutoFillRec("T");
				DisResizer._down.height = DisResizer.barWidth;
				DisResizer._down.type = DisResizer.Horizon;
				DisResizer._left = new AutoFillRec("R");
				DisResizer._left.width = DisResizer.barWidth;
				DisResizer._left.type = DisResizer.Vertical;
				DisResizer._right = new AutoFillRec("R");
				DisResizer._right.width = DisResizer.barWidth;
				DisResizer._right.type = DisResizer.Vertical;
				DisResizer._barList = [DisResizer._up, DisResizer._down, DisResizer._left, DisResizer._right];
				DisResizer.addEvent();
			}
		}, {
			key: "stageDown",
			value: function stageDown(e) {
				var target;
				target = e.target;
				if (DisResizer._tar && DisControlTool.isInTree(DisResizer._tar, target)) {
					return;
				}
				DisResizer.clear();
			}
		}, {
			key: "clear",
			value: function clear() {
				DisResizer._tar = null;
				Laya.Laya.stage.off(Laya.Event.MOUSE_UP, null, DisResizer.stageDown);
				DisControlTool.removeItems(DisResizer._barList);
				DisResizer.clearDragEvents();
			}
		}, {
			key: "addEvent",
			value: function addEvent() {
				var i, len;
				var tBar;
				len = DisResizer._barList.length;
				for (i = 0; i < len; i++) {
					tBar = DisResizer._barList[i];
					tBar.on(Laya.Event.MOUSE_DOWN, null, DisResizer.barDown);
				}
			}
		}, {
			key: "barDown",
			value: function barDown(e) {
				DisResizer.clearDragEvents();
				DisResizer.tBar = e.target;
				if (!DisResizer.tBar) return;
				var area;
				area = new Laya.Rectangle();
				if (DisResizer.tBar.type == DisResizer.Horizon) {
					area.x = DisResizer.tBar.x;
					area.width = 0;
					area.y = DisResizer.tBar.y - 200;
					area.height = 400;
				} else {
					area.x = DisResizer.tBar.x - 200;
					area.width = 400;
					area.y = 0;
					area.height = 0;
				}
				var option;
				option = {};
				option.area = area;
				DisResizer.tBar.record();
				DisResizer.tBar.startDrag(area);
				DisResizer.tBar.on(Laya.Event.DRAG_MOVE, null, DisResizer.draging);
				DisResizer.tBar.on(Laya.Event.DRAG_END, null, DisResizer.dragEnd);
			}
		}, {
			key: "draging",
			value: function draging(e) {
				console.log("draging");
				if (!DisResizer.tBar) return;
				if (!DisResizer._tar) return;
				switch (DisResizer.tBar) {
					case DisResizer._left:
						DisResizer._tar.x += DisResizer.tBar.getDx();
						DisResizer._tar.width -= DisResizer.tBar.getDx();
						DisResizer._up.width -= DisResizer.tBar.getDx();
						DisResizer._down.width -= DisResizer.tBar.getDx();
						DisResizer._right.x -= DisResizer.tBar.getDx();
						DisResizer.tBar.x -= DisResizer.tBar.getDx();
						break;
					case DisResizer._right:
						DisResizer._tar.width += DisResizer.tBar.getDx();
						DisResizer._up.width += DisResizer.tBar.getDx();
						DisResizer._down.width += DisResizer.tBar.getDx();
						break;
					case DisResizer._up:
						DisResizer._tar.y += DisResizer.tBar.getDy();
						DisResizer._tar.height -= DisResizer.tBar.getDy();
						DisResizer._right.height -= DisResizer.tBar.getDy();
						DisResizer._left.height -= DisResizer.tBar.getDy();
						DisResizer._down.y -= DisResizer.tBar.getDy();
						DisResizer.tBar.y -= DisResizer.tBar.getDy();
						break;
					case DisResizer._down:
						DisResizer._tar.height += DisResizer.tBar.getDy();
						DisResizer._right.height += DisResizer.tBar.getDy();
						DisResizer._left.height += DisResizer.tBar.getDy();
						break;
				}
				DisResizer.tBar.record();
			}
		}, {
			key: "dragEnd",
			value: function dragEnd(e) {
				console.log("dragEnd");
				DisResizer.clearDragEvents();
				DisResizer.updates();
			}
		}, {
			key: "clearDragEvents",
			value: function clearDragEvents() {
				if (!DisResizer.tBar) return;
				DisResizer.tBar.off(Laya.Event.DRAG_MOVE, null, DisResizer.draging);
				DisResizer.tBar.off(Laya.Event.DRAG_END, null, DisResizer.dragEnd);
			}
		}, {
			key: "setUp",
			value: function setUp(dis) {
				var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (force && dis == DisResizer._tar) {
					return;
				}
				DisControlTool.removeItems(DisResizer._barList);
				if (DisResizer._tar == dis) {
					DisResizer._tar = null;
					DisResizer.clearDragEvents();
					if (!force) return;
				}
				DisResizer._tar = dis;
				DisResizer.updates();
				DisControlTool.addItems(DisResizer._barList, dis);
				Laya.Laya.stage.off(Laya.Event.MOUSE_UP, null, DisResizer.stageDown);
				Laya.Laya.stage.on(Laya.Event.MOUSE_UP, null, DisResizer.stageDown);
			}
		}, {
			key: "updates",
			value: function updates() {
				var dis;
				dis = DisResizer._tar;
				if (!dis) return;
				var bounds;
				bounds = new Laya.Rectangle(0, 0, dis.width, dis.height);
				DisResizer._up.x = bounds.x;
				DisResizer._up.y = bounds.y;
				DisResizer._up.width = bounds.width;
				DisResizer._down.x = bounds.x;
				DisResizer._down.y = bounds.y + bounds.height - DisResizer.barWidth;
				DisResizer._down.width = bounds.width;
				DisResizer._left.x = bounds.x;
				DisResizer._left.y = bounds.y;
				DisResizer._left.height = bounds.height;
				DisResizer._right.x = bounds.x + bounds.width - DisResizer.barWidth;
				DisResizer._right.y = bounds.y;
				DisResizer._right.height = bounds.height;
			}
		}]);

		return DisResizer;
	}();

	DisResizer.Side = 2;
	DisResizer.Vertical = 1;
	DisResizer.Horizon = 0;
	DisResizer.barWidth = 2;
	DisResizer.useGetBounds = false;
	DisControlTool.resizeHandler = DisResizer.setUp;

	var StyleConsts = function () {
		function StyleConsts() {
			_classCallCheck(this, StyleConsts);
		}

		_createClass(StyleConsts, null, [{
			key: "setViewScale",
			value: function setViewScale(view) {
				view.scaleX = view.scaleY = StyleConsts.PanelScale;
			}
		}]);

		return StyleConsts;
	}();

	StyleConsts.PanelScale = Laya.Browser.onPC ? 1 : Laya.Browser.pixelRatio;

	exports.Arrow = Arrow;
	exports.ArrowLine = ArrowLine;
	exports.AtlasTools = AtlasTools;
	exports.AutoFillRec = AutoFillRec;
	exports.AutoSizeRec = AutoSizeRec;
	exports.Axis = Axis;
	exports.Base64Atlas = Base64Atlas;
	exports.Base64AtlasManager = Base64AtlasManager;
	exports.Base64ImageTool = Base64ImageTool;
	exports.Base64Tool = Base64Tool;
	exports.ByteEx = ByteEx;
	exports.CacheAnalyser = CacheAnalyser;
	exports.CallLaterTool = CallLaterTool;
	exports.CanvasTools = CanvasTools;
	exports.ClassCreateHook = ClassCreateHook;
	exports.ClassTool = ClassTool;
	exports.ClickSelectTool = ClickSelectTool;
	exports.ColorTool = ColorTool;
	exports.CommonTools = CommonTools;
	exports.CountTool = CountTool;
	exports.DButton = DButton;
	exports.DInput = DInput;
	exports.DTrace = DTrace;
	exports.DebugConsts = DebugConsts;
	exports.DebugInfoLayer = DebugInfoLayer;
	exports.DebugPanel = DebugPanel;
	exports.DebugTool = DebugTool;
	exports.DebugTxt = DebugTxt;
	exports.DifferTool = DifferTool;
	exports.DisControlTool = DisControlTool;
	exports.DisController = DisController;
	exports.DisEditor = DisEditor;
	exports.DisPool = DisPool;
	exports.DisResizer = DisResizer;
	exports.DisplayHook = DisplayHook;
	exports.DivScripts = DivScripts;
	exports.DragBox = DragBox;
	exports.FilterTool = FilterTool;
	exports.FunHook = FunHook;
	exports.FunctionTimeHook = FunctionTimeHook;
	exports.GetSetProfile = GetSetProfile;
	exports.IDTools = IDTools;
	exports.JSTools = JSTools;
	exports.JsonTool = JsonTool;
	exports.LayoutFuns = LayoutFuns;
	exports.LayoutTools = LayoutTools;
	exports.Layouter = Layouter;
	exports.LoaderHook = LoaderHook;
	exports.MathTools = MathTools;
	exports.MouseEventAnalyser = MouseEventAnalyser;
	exports.NodeConsts = NodeConsts;
	exports.NodeInfoPanel = NodeInfoPanel;
	exports.NodeInfosItem = NodeInfosItem;
	exports.NodeRecInfo = NodeRecInfo;
	exports.NodeUtils = NodeUtils;
	exports.Notice = Notice;
	exports.ObjTimeCountTool = ObjTimeCountTool;
	exports.ObjectTools = ObjectTools;
	exports.Observer = Observer;
	exports.ReCacheRecInfo = ReCacheRecInfo;
	exports.RecInfo = RecInfo;
	exports.Rect = Rect;
	exports.RenderAnalyser = RenderAnalyser;
	exports.RenderSpriteHook = RenderSpriteHook;
	exports.ResTools = ResTools;
	exports.RunProfile = RunProfile;
	exports.SimpleResizer = SimpleResizer;
	exports.SingleTool = SingleTool;
	exports.SpriteRenderHook = SpriteRenderHook;
	exports.StringTool = StringTool;
	exports.StyleConsts = StyleConsts;
	exports.TimeTool = TimeTool;
	exports.TimerControlTool = TimerControlTool;
	exports.TouchDebugTools = TouchDebugTools;
	exports.TraceTool = TraceTool;
	exports.UVTools = UVTools;
	exports.ValueChanger = ValueChanger;
	exports.VarHook = VarHook;
	exports.VisibleAnalyser = VisibleAnalyser;
	exports.WalkTools = WalkTools;
	exports.Watch = Watch;
	exports.Watcher = Watcher;
	exports.XML2Object = XML2Object;
	exports.XML2ObjectNodejs = XML2ObjectNodejs;
})(undefined.Laya = undefined.Laya || {}, Laya);
