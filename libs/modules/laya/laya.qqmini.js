"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.qqMiniGame = function (exports, Laya) {
	'use strict';

	var MiniFileMgr = function () {
		function MiniFileMgr() {
			_classCallCheck(this, MiniFileMgr);
		}

		_createClass(MiniFileMgr, null, [{
			key: "isLocalNativeFile",
			value: function isLocalNativeFile(url) {
				for (var i = 0, sz = QQMiniAdapter.nativefiles.length; i < sz; i++) {
					if (url.indexOf(QQMiniAdapter.nativefiles[i]) != -1) return true;
				}
				return false;
			}
		}, {
			key: "getFileInfo",
			value: function getFileInfo(fileUrl) {
				var fileNativePath = fileUrl;
				var fileObj = MiniFileMgr.fakeObj[fileNativePath];
				if (fileObj == null) return null;else return fileObj;
				return null;
			}
		}, {
			key: "read",
			value: function read(filePath) {
				var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
				var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var readyUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
				var isSaveFile = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
				var fileType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";

				var fileUrl;
				if (readyUrl != "" && (readyUrl.indexOf("http://") != -1 || readyUrl.indexOf("https://") != -1)) {
					fileUrl = MiniFileMgr.getFileNativePath(filePath);
				} else {
					fileUrl = filePath;
				}
				fileUrl = Laya.URL.getAdptedFilePath(fileUrl);
				MiniFileMgr.fs.readFile({ filePath: fileUrl, encoding: encoding, success: function success(data) {
						callBack != null && callBack.runWith([0, data]);
					}, fail: function fail(data) {
						if (data && readyUrl != "") MiniFileMgr.downFiles(readyUrl, encoding, callBack, readyUrl, isSaveFile, fileType);else callBack != null && callBack.runWith([1]);
					} });
			}
		}, {
			key: "downFiles",
			value: function downFiles(fileUrl) {
				var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
				var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var readyUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
				var isSaveFile = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
				var fileType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
				var isAutoClear = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

				var downloadTask = MiniFileMgr.wxdown({ url: fileUrl, success: function success(data) {
						if (data.statusCode === 200) MiniFileMgr.readFile(data.tempFilePath, encoding, callBack, readyUrl, isSaveFile, fileType, isAutoClear);else if (data.statusCode === 403) {
							callBack != null && callBack.runWith([0, fileUrl]);
						} else {
							callBack != null && callBack.runWith([1, data]);
						}
					}, fail: function fail(data) {
						callBack != null && callBack.runWith([1, data]);
					} });
				downloadTask.onProgressUpdate(function (data) {
					callBack != null && callBack.runWith([2, data.progress]);
				});
			}
		}, {
			key: "readFile",
			value: function readFile(filePath) {
				var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
				var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var readyUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
				var isSaveFile = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
				var fileType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
				var isAutoClear = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

				filePath = Laya.URL.getAdptedFilePath(filePath);
				MiniFileMgr.fs.readFile({ filePath: filePath, encoding: encoding, success: function success(data) {
						if (filePath.indexOf("http://") != -1 || filePath.indexOf("https://") != -1) {
							if (QQMiniAdapter.autoCacheFile || isSaveFile) {
								callBack != null && callBack.runWith([0, data]);
								MiniFileMgr.copyFile(filePath, readyUrl, null, encoding, isAutoClear);
							} else callBack != null && callBack.runWith([0, data]);
						} else callBack != null && callBack.runWith([0, data]);
					}, fail: function fail(data) {
						if (data) callBack != null && callBack.runWith([1, data]);
					} });
			}
		}, {
			key: "downOtherFiles",
			value: function downOtherFiles(fileUrl) {
				var callBack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var readyUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
				var isSaveFile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
				var isAutoClear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

				MiniFileMgr.wxdown({ url: fileUrl, success: function success(data) {
						if (data.statusCode === 200) {
							if ((QQMiniAdapter.autoCacheFile || isSaveFile) && readyUrl.indexOf("qlogo.cn") == -1 && readyUrl.indexOf(".php") == -1) {
								callBack != null && callBack.runWith([0, data.tempFilePath]);
								MiniFileMgr.copyFile(data.tempFilePath, readyUrl, null, "", isAutoClear);
							} else callBack != null && callBack.runWith([0, data.tempFilePath]);
						} else {
							callBack != null && callBack.runWith([1, data]);
						}
					}, fail: function fail(data) {
						callBack != null && callBack.runWith([1, data]);
					} });
			}
		}, {
			key: "downLoadFile",
			value: function downLoadFile(fileUrl) {
				var fileType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
				var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "utf8";

				if (window.navigator.userAgent.indexOf('MiniGame') < 0) {
					Laya.Laya.loader.load(fileUrl, callBack);
				} else {
					if (fileType == Laya.Loader.IMAGE || fileType == Laya.Loader.SOUND) MiniFileMgr.downOtherFiles(fileUrl, callBack, fileUrl, true, false);else MiniFileMgr.downFiles(fileUrl, encoding, callBack, fileUrl, true, fileType, false);
				}
			}
		}, {
			key: "copyFile",
			value: function copyFile(tempFilePath, readyUrl, callBack) {
				var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
				var isAutoClear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

				var temp = tempFilePath.split("/");
				var tempFileName = temp[temp.length - 1];
				var fileurlkey = readyUrl;
				var fileObj = MiniFileMgr.getFileInfo(readyUrl);
				var saveFilePath = MiniFileMgr.getFileNativePath(tempFileName);
				MiniFileMgr.fakeObj[fileurlkey] = { md5: tempFileName, readyUrl: readyUrl, size: 0, times: Laya.Browser.now(), encoding: encoding };
				var totalSize = 50 * 1024 * 1024;
				var chaSize = 4 * 1024 * 1024;
				var fileUseSize = MiniFileMgr.getCacheUseSize();
				if (fileObj) {
					if (fileObj.readyUrl != readyUrl) {
						MiniFileMgr.fs.getFileInfo({
							filePath: tempFilePath,
							success: function success(data) {
								if (isAutoClear && fileUseSize + chaSize + data.size >= totalSize) {
									if (data.size > QQMiniAdapter.minClearSize) QQMiniAdapter.minClearSize = data.size;
									MiniFileMgr.onClearCacheRes();
								}
								MiniFileMgr.deleteFile(tempFilePath, readyUrl, callBack, encoding, data.size);
							},
							fail: function fail(data) {
								callBack != null && callBack.runWith([1, data]);
							}
						});
					} else callBack != null && callBack.runWith([0]);
				} else {
					MiniFileMgr.fs.getFileInfo({
						filePath: tempFilePath,
						success: function success(data) {
							if (isAutoClear && fileUseSize + chaSize + data.size >= totalSize) {
								if (data.size > QQMiniAdapter.minClearSize) QQMiniAdapter.minClearSize = data.size;
								MiniFileMgr.onClearCacheRes();
							}
							MiniFileMgr.fs.copyFile({ srcPath: tempFilePath, destPath: saveFilePath, success: function success(data2) {
									MiniFileMgr.onSaveFile(readyUrl, tempFileName, true, encoding, callBack, data.size);
								}, fail: function fail(data) {
									callBack != null && callBack.runWith([1, data]);
								} });
						},
						fail: function fail(data) {
							callBack != null && callBack.runWith([1, data]);
						}
					});
				}
			}
		}, {
			key: "onClearCacheRes",
			value: function onClearCacheRes() {
				var memSize = QQMiniAdapter.minClearSize;
				var tempFileListArr = [];
				for (var key in MiniFileMgr.filesListObj) {
					if (key != "fileUsedSize") tempFileListArr.push(MiniFileMgr.filesListObj[key]);
				}
				MiniFileMgr.sortOn(tempFileListArr, "times", MiniFileMgr.NUMERIC);
				var clearSize = 0;
				for (var i = 1, sz = tempFileListArr.length; i < sz; i++) {
					var fileObj = tempFileListArr[i];
					if (clearSize >= memSize) break;
					clearSize += fileObj.size;
					MiniFileMgr.deleteFile("", fileObj.readyUrl);
				}
			}
		}, {
			key: "sortOn",
			value: function sortOn(array, name) {
				var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				if (options == MiniFileMgr.NUMERIC) return array.sort(function (a, b) {
					return a[name] - b[name];
				});
				if (options == (MiniFileMgr.NUMERIC | MiniFileMgr.DESCENDING)) return array.sort(function (a, b) {
					return b[name] - a[name];
				});
				return array.sort(function (a, b) {
					return a[name] - b[name];
				});
			}
		}, {
			key: "getFileNativePath",
			value: function getFileNativePath(fileName) {
				return MiniFileMgr.fileNativeDir + "/" + fileName;
			}
		}, {
			key: "deleteFile",
			value: function deleteFile(tempFileName) {
				var readyUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
				var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
				var fileSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

				var fileObj = MiniFileMgr.getFileInfo(readyUrl);
				var deleteFileUrl = MiniFileMgr.getFileNativePath(fileObj.md5);
				var isAdd = tempFileName != "" ? true : false;
				MiniFileMgr.onSaveFile(readyUrl, tempFileName, isAdd, encoding, callBack, fileSize);
				MiniFileMgr.fs.unlink({ filePath: deleteFileUrl, success: function success(data) {
						if (tempFileName != "") {
							var saveFilePath = MiniFileMgr.getFileNativePath(tempFileName);
							MiniFileMgr.fs.copyFile({ srcPath: tempFileName, destPath: saveFilePath, success: function success(data) {}, fail: function fail(data) {
									callBack != null && callBack.runWith([1, data]);
								} });
						}
					}, fail: function fail(data) {} });
			}
		}, {
			key: "deleteAll",
			value: function deleteAll() {
				var tempFileListArr = [];
				for (var key in MiniFileMgr.filesListObj) {
					if (key != "fileUsedSize") tempFileListArr.push(MiniFileMgr.filesListObj[key]);
				}
				for (var i = 1, sz = tempFileListArr.length; i < sz; i++) {
					var fileObj = tempFileListArr[i];
					MiniFileMgr.deleteFile("", fileObj.readyUrl);
				}
				if (MiniFileMgr.filesListObj && MiniFileMgr.filesListObj.fileUsedSize) {
					MiniFileMgr.filesListObj.fileUsedSize = 0;
				}
				MiniFileMgr.writeFilesList("", JSON.stringify({}), false);
			}
		}, {
			key: "onSaveFile",
			value: function onSaveFile(readyUrl, md5Name) {
				var isAdd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
				var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
				var callBack = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
				var fileSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

				var fileurlkey = readyUrl;
				if (MiniFileMgr.filesListObj['fileUsedSize'] == null) MiniFileMgr.filesListObj['fileUsedSize'] = 0;
				if (isAdd) {
					var fileNativeName = MiniFileMgr.getFileNativePath(md5Name);
					MiniFileMgr.filesListObj[fileurlkey] = { md5: md5Name, readyUrl: readyUrl, size: fileSize, times: Laya.Browser.now(), encoding: encoding };
					MiniFileMgr.filesListObj['fileUsedSize'] = parseInt(MiniFileMgr.filesListObj['fileUsedSize']) + fileSize;
					MiniFileMgr.writeFilesList(fileurlkey, JSON.stringify(MiniFileMgr.filesListObj), true);
					callBack != null && callBack.runWith([0]);
				} else {
					if (MiniFileMgr.filesListObj[fileurlkey]) {
						var deletefileSize = parseInt(MiniFileMgr.filesListObj[fileurlkey].size);
						MiniFileMgr.filesListObj['fileUsedSize'] = parseInt(MiniFileMgr.filesListObj['fileUsedSize']) - deletefileSize;
						delete MiniFileMgr.filesListObj[fileurlkey];
						MiniFileMgr.writeFilesList(fileurlkey, JSON.stringify(MiniFileMgr.filesListObj), false);
						callBack != null && callBack.runWith([0]);
					}
				}
			}
		}, {
			key: "writeFilesList",
			value: function writeFilesList(fileurlkey, filesListStr, isAdd) {
				var listFilesPath = MiniFileMgr.fileNativeDir + "/" + MiniFileMgr.fileListName;
				MiniFileMgr.fs.writeFile({ filePath: listFilesPath, encoding: 'utf8', data: filesListStr, success: function success(data) {}, fail: function fail(data) {} });
				if (!QQMiniAdapter.isZiYu && QQMiniAdapter.isPosMsgYu) {
					QQMiniAdapter.window.qq.postMessage({ url: fileurlkey, data: MiniFileMgr.filesListObj[fileurlkey], isLoad: "filenative", isAdd: isAdd });
				}
			}
		}, {
			key: "getCacheUseSize",
			value: function getCacheUseSize() {
				if (MiniFileMgr.filesListObj && MiniFileMgr.filesListObj['fileUsedSize']) return MiniFileMgr.filesListObj['fileUsedSize'];
				return 0;
			}
		}, {
			key: "existDir",
			value: function existDir(dirPath, callBack) {
				MiniFileMgr.fs.mkdir({ dirPath: dirPath, success: function success(data) {
						callBack != null && callBack.runWith([0, { data: JSON.stringify({}) }]);
					}, fail: function fail(data) {
						if (data.errMsg.indexOf("file already exists") != -1) MiniFileMgr.readSync(MiniFileMgr.fileListName, "utf8", callBack);else callBack != null && callBack.runWith([1, data]);
					} });
			}
		}, {
			key: "readSync",
			value: function readSync(filePath) {
				var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
				var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var readyUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

				var fileUrl = MiniFileMgr.getFileNativePath(filePath);
				var filesListStr;
				try {
					filesListStr = MiniFileMgr.fs.readFileSync(fileUrl, encoding);
					callBack != null && callBack.runWith([0, { data: filesListStr }]);
				} catch (error) {
					callBack != null && callBack.runWith([1]);
				}
			}
		}, {
			key: "setNativeFileDir",
			value: function setNativeFileDir(value) {
				MiniFileMgr.fileNativeDir = QQMiniAdapter.window.qq.env.USER_DATA_PATH + value;
			}
		}]);

		return MiniFileMgr;
	}();

	MiniFileMgr.fs = window.qq.getFileSystemManager();
	MiniFileMgr.wxdown = window.qq.downloadFile;
	MiniFileMgr.filesListObj = {};
	MiniFileMgr.fakeObj = {};
	MiniFileMgr.fileListName = "layaairfiles.txt";
	MiniFileMgr.ziyuFileData = {};
	MiniFileMgr.ziyuFileTextureData = {};
	MiniFileMgr.loadPath = "";
	MiniFileMgr.DESCENDING = 2;
	MiniFileMgr.NUMERIC = 16;

	var MiniSoundChannel = function (_Laya$SoundChannel) {
		_inherits(MiniSoundChannel, _Laya$SoundChannel);

		function MiniSoundChannel(audio, miniSound) {
			_classCallCheck(this, MiniSoundChannel);

			var _this = _possibleConstructorReturn(this, (MiniSoundChannel.__proto__ || Object.getPrototypeOf(MiniSoundChannel)).call(this));

			_this._audio = audio;
			_this._miniSound = miniSound;
			_this._onEnd = MiniSoundChannel.bindToThis(_this.__onEnd, _this);
			audio.onEnded(_this._onEnd);
			return _this;
		}

		_createClass(MiniSoundChannel, [{
			key: "__onEnd",
			value: function __onEnd() {
				if (this.loops == 1) {
					if (this.completeHandler) {
						Laya.Laya.systemTimer.once(10, this, this.__runComplete, [this.completeHandler], false);
						this.completeHandler = null;
					}
					this.stop();
					this.event(Laya.Event.COMPLETE);
					return;
				}
				if (this.loops > 0) {
					this.loops--;
				}
				this.startTime = 0;
				this.play();
			}
		}, {
			key: "play",
			value: function play() {
				this.isStopped = false;
				Laya.SoundManager.addChannel(this);
				this._audio.play();
			}
		}, {
			key: "stop",
			value: function stop() {
				this.isStopped = true;
				Laya.SoundManager.removeChannel(this);
				this.completeHandler = null;
				if (!this._audio) return;
				this._audio.stop();
				if (!this.loop) {
					this._audio.offEnded(null);
					this._miniSound.dispose();
					this._audio = null;
					this._miniSound = null;
					this._onEnd = null;
				}
			}
		}, {
			key: "pause",
			value: function pause() {
				this.isStopped = true;
				this._audio.pause();
			}
		}, {
			key: "resume",
			value: function resume() {
				if (!this._audio) return;
				this.isStopped = false;
				Laya.SoundManager.addChannel(this);
				this._audio.play();
			}
		}, {
			key: "startTime",
			set: function set(time) {
				if (this._audio) {
					this._audio.startTime = time;
				}
			}
		}, {
			key: "autoplay",
			set: function set(value) {
				this._audio.autoplay = value;
			},
			get: function get() {
				return this._audio.autoplay;
			}
		}, {
			key: "position",
			get: function get() {
				if (!this._audio) return 0;
				return this._audio.currentTime;
			}
		}, {
			key: "duration",
			get: function get() {
				if (!this._audio) return 0;
				return this._audio.duration;
			}
		}, {
			key: "loop",
			get: function get() {
				return this._audio.loop;
			},
			set: function set(value) {
				this._audio.loop = value;
			}
		}, {
			key: "volume",
			set: function set(v) {
				if (!this._audio) return;
				this._audio.volume = v;
			},
			get: function get() {
				if (!this._audio) return 1;
				return this._audio.volume;
			}
		}], [{
			key: "bindToThis",
			value: function bindToThis(fun, scope) {
				var rst = fun;
				rst = fun.bind(scope);
				return rst;
			}
		}]);

		return MiniSoundChannel;
	}(Laya.SoundChannel);

	var MiniSound = function (_Laya$EventDispatcher) {
		_inherits(MiniSound, _Laya$EventDispatcher);

		function MiniSound() {
			_classCallCheck(this, MiniSound);

			var _this2 = _possibleConstructorReturn(this, (MiniSound.__proto__ || Object.getPrototypeOf(MiniSound)).call(this));

			_this2.loaded = false;
			return _this2;
		}

		_createClass(MiniSound, [{
			key: "load",
			value: function load(url) {
				if (!MiniFileMgr.isLocalNativeFile(url)) {
					url = Laya.URL.formatURL(url);
				} else {
					if (url.indexOf("http://") != -1 || url.indexOf("https://") != -1) {
						if (MiniFileMgr.loadPath != "") {
							url = url.split(MiniFileMgr.loadPath)[1];
						} else {
							var tempStr = Laya.URL.rootPath != "" ? Laya.URL.rootPath : Laya.URL._basePath;
							if (tempStr != "") url = url.split(tempStr)[1];
						}
					}
				}
				this.url = url;
				this.readyUrl = url;
				if (MiniSound._audioCache[this.readyUrl]) {
					this.event(Laya.Event.COMPLETE);
					return;
				}
				if (QQMiniAdapter.autoCacheFile && MiniFileMgr.getFileInfo(url)) {
					this.onDownLoadCallBack(url, 0);
				} else {
					if (!QQMiniAdapter.autoCacheFile) {
						this.onDownLoadCallBack(url, 0);
					} else {
						if (MiniFileMgr.isLocalNativeFile(url)) {
							tempStr = Laya.URL.rootPath != "" ? Laya.URL.rootPath : Laya.URL._basePath;
							var tempUrl = url;
							if (tempStr != "") url = url.split(tempStr)[1];
							if (!url) {
								url = tempUrl;
							}
							if (QQMiniAdapter.subNativeFiles && QQMiniAdapter.subNativeheads.length == 0) {
								for (var key in QQMiniAdapter.subNativeFiles) {
									var tempArr = QQMiniAdapter.subNativeFiles[key];
									QQMiniAdapter.subNativeheads = QQMiniAdapter.subNativeheads.concat(tempArr);
									for (var aa = 0; aa < tempArr.length; aa++) {
										QQMiniAdapter.subMaps[tempArr[aa]] = key + "/" + tempArr[aa];
									}
								}
							}
							if (QQMiniAdapter.subNativeFiles && url.indexOf("/") != -1) {
								var curfileHead = url.split("/")[0] + "/";
								if (curfileHead && QQMiniAdapter.subNativeheads.indexOf(curfileHead) != -1) {
									var newfileHead = QQMiniAdapter.subMaps[curfileHead];
									url = url.replace(curfileHead, newfileHead);
								}
							}
							this.onDownLoadCallBack(url, 0);
						} else {
							if (!MiniFileMgr.isLocalNativeFile(url) && url.indexOf("http://") == -1 && url.indexOf("https://") == -1 || url.indexOf(QQMiniAdapter.window.qq.env.USER_DATA_PATH) != -1) {
								this.onDownLoadCallBack(url, 0);
							} else {
								MiniFileMgr.downOtherFiles(encodeURI(url), Laya.Handler.create(this, this.onDownLoadCallBack, [url]), url);
							}
						}
					}
				}
			}
		}, {
			key: "onDownLoadCallBack",
			value: function onDownLoadCallBack(sourceUrl, errorCode) {
				var tempFilePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (!errorCode) {
					var fileNativeUrl;
					if (QQMiniAdapter.autoCacheFile) {
						if (!tempFilePath) {
							if (MiniFileMgr.isLocalNativeFile(sourceUrl)) {
								var tempStr = Laya.URL.rootPath != "" ? Laya.URL.rootPath : Laya.URL._basePath;
								var tempUrl = sourceUrl;
								if (tempStr != "" && (sourceUrl.indexOf("http://") != -1 || sourceUrl.indexOf("https://") != -1)) fileNativeUrl = sourceUrl.split(tempStr)[1];
								if (!fileNativeUrl) {
									fileNativeUrl = tempUrl;
								}
							} else {
								var fileObj = MiniFileMgr.getFileInfo(sourceUrl);
								if (fileObj && fileObj.md5) {
									var fileMd5Name = fileObj.md5;
									fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
								} else {
									fileNativeUrl = sourceUrl;
								}
							}
						} else {
							fileNativeUrl = tempFilePath;
						}
						this._sound = MiniSound._createSound();
						this._sound.src = this.url = fileNativeUrl;
					} else {
						this._sound = MiniSound._createSound();
						this._sound.src = this.url = sourceUrl;
					}
					this._sound.onCanplay(MiniSound.bindToThis(this.onCanPlay, this));
					this._sound.onError(MiniSound.bindToThis(this.onError, this));
				} else {
					this.event(Laya.Event.ERROR);
				}
			}
		}, {
			key: "onError",
			value: function onError(error) {
				try {
					console.log("-----1---------------minisound-----id:" + MiniSound._id);
					console.log(error);
				} catch (error) {
					console.log("-----2---------------minisound-----id:" + MiniSound._id);
					console.log(error);
				}
				this.event(Laya.Event.ERROR);
				this._sound.offError(null);
			}
		}, {
			key: "onCanPlay",
			value: function onCanPlay() {
				this.loaded = true;
				this.event(Laya.Event.COMPLETE);
				this._sound.offCanplay(null);
			}
		}, {
			key: "play",
			value: function play() {
				var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var loops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				var tSound;
				if (this.url == Laya.SoundManager._bgMusic) {
					if (!MiniSound._musicAudio) MiniSound._musicAudio = MiniSound._createSound();
					tSound = MiniSound._musicAudio;
				} else {
					if (MiniSound._audioCache[this.readyUrl]) {
						tSound = MiniSound._audioCache[this.readyUrl]._sound;
					} else {
						tSound = MiniSound._createSound();
					}
				}
				if (!tSound) return null;
				if (QQMiniAdapter.autoCacheFile && MiniFileMgr.getFileInfo(this.url)) {
					var fileObj = MiniFileMgr.getFileInfo(this.url);
					var fileMd5Name = fileObj.md5;
					tSound.src = this.url = MiniFileMgr.getFileNativePath(fileMd5Name);
				} else {
					tSound.src = encodeURI(this.url);
				}
				var channel = new MiniSoundChannel(tSound, this);
				channel.url = this.url;
				channel.loops = loops;
				channel.loop = loops === 0 ? true : false;
				channel.startTime = startTime;
				channel.play();
				Laya.SoundManager.addChannel(channel);
				return channel;
			}
		}, {
			key: "dispose",
			value: function dispose() {
				var ad = MiniSound._audioCache[this.readyUrl];
				if (ad) {
					ad.src = "";
					if (ad._sound) {
						ad._sound.destroy();
						ad._sound = null;
						ad = null;
					}
					delete MiniSound._audioCache[this.readyUrl];
				}
				if (this._sound) {
					this._sound.destroy();
					this._sound = null;
					this.readyUrl = this.url = null;
				}
			}
		}, {
			key: "duration",
			get: function get() {
				return this._sound.duration;
			}
		}], [{
			key: "_createSound",
			value: function _createSound() {
				MiniSound._id++;
				return QQMiniAdapter.window.qq.createInnerAudioContext();
			}
		}, {
			key: "bindToThis",
			value: function bindToThis(fun, scope) {
				var rst = fun;
				rst = fun.bind(scope);
				return rst;
			}
		}]);

		return MiniSound;
	}(Laya.EventDispatcher);

	MiniSound._id = 0;
	MiniSound._audioCache = {};

	var MiniInput = function () {
		function MiniInput() {
			_classCallCheck(this, MiniInput);
		}

		_createClass(MiniInput, null, [{
			key: "_createInputElement",
			value: function _createInputElement() {
				Laya.Input['_initInput'](Laya.Input['area'] = Laya.Browser.createElement("textarea"));
				Laya.Input['_initInput'](Laya.Input['input'] = Laya.Browser.createElement("input"));
				Laya.Input['inputContainer'] = Laya.Browser.createElement("div");
				Laya.Input['inputContainer'].style.position = "absolute";
				Laya.Input['inputContainer'].style.zIndex = 1E5;
				Laya.Browser.container.appendChild(Laya.Input['inputContainer']);
				Laya.Laya.stage.on("resize", null, MiniInput._onStageResize);
				QQMiniAdapter.window.qq.onWindowResize && QQMiniAdapter.window.qq.onWindowResize(function (res) {});
				Laya.SoundManager._soundClass = MiniSound;
				Laya.SoundManager._musicClass = MiniSound;
				var model = QQMiniAdapter.systemInfo.model;
				var system = QQMiniAdapter.systemInfo.system;
				if (model.indexOf("iPhone") != -1) {
					Laya.Browser.onIPhone = true;
					Laya.Browser.onIOS = true;
					Laya.Browser.onIPad = true;
					Laya.Browser.onAndroid = false;
				}
				if (system.indexOf("Android") != -1 || system.indexOf("Adr") != -1) {
					Laya.Browser.onAndroid = true;
					Laya.Browser.onIPhone = false;
					Laya.Browser.onIOS = false;
					Laya.Browser.onIPad = false;
				}
			}
		}, {
			key: "_onStageResize",
			value: function _onStageResize() {
				var ts = Laya.Laya.stage._canvasTransform.identity();
				ts.scale(Laya.Browser.width / Laya.Render.canvas.width / Laya.Browser.pixelRatio, Laya.Browser.height / Laya.Render.canvas.height / Laya.Browser.pixelRatio);
			}
		}, {
			key: "wxinputFocus",
			value: function wxinputFocus(e) {
				var _inputTarget = Laya.Input['inputElement'].target;
				if (_inputTarget && !_inputTarget.editable) {
					return;
				}
				QQMiniAdapter.window.qq.offKeyboardConfirm();
				QQMiniAdapter.window.qq.offKeyboardInput();
				QQMiniAdapter.window.qq.showKeyboard({ defaultValue: _inputTarget.text, maxLength: _inputTarget.maxChars, multiple: _inputTarget.multiline, confirmHold: true, confirmType: _inputTarget["confirmType"] || 'done', success: function success(res) {}, fail: function fail(res) {} });
				QQMiniAdapter.window.qq.onKeyboardConfirm(function (res) {
					var str = res ? res.value : "";
					if (_inputTarget._restrictPattern) {
						str = str.replace(/\u2006|\x27/g, "");
						if (_inputTarget._restrictPattern.test(str)) {
							str = str.replace(_inputTarget._restrictPattern, "");
						}
					}
					_inputTarget.text = str;
					_inputTarget.event(Laya.Event.INPUT);
					MiniInput.inputEnter();
					_inputTarget.event("confirm");
				});
				QQMiniAdapter.window.qq.onKeyboardInput(function (res) {
					var str = res ? res.value : "";
					if (!_inputTarget.multiline) {
						if (str.indexOf("\n") != -1) {
							MiniInput.inputEnter();
							return;
						}
					}
					if (_inputTarget._restrictPattern) {
						str = str.replace(/\u2006|\x27/g, "");
						if (_inputTarget._restrictPattern.test(str)) {
							str = str.replace(_inputTarget._restrictPattern, "");
						}
					}
					_inputTarget.text = str;
					_inputTarget.event(Laya.Event.INPUT);
				});
			}
		}, {
			key: "inputEnter",
			value: function inputEnter() {
				Laya.Input['inputElement'].target.focus = false;
			}
		}, {
			key: "wxinputblur",
			value: function wxinputblur() {
				MiniInput.hideKeyboard();
			}
		}, {
			key: "hideKeyboard",
			value: function hideKeyboard() {
				QQMiniAdapter.window.qq.offKeyboardConfirm();
				QQMiniAdapter.window.qq.offKeyboardInput();
				QQMiniAdapter.window.qq.hideKeyboard({ success: function success(res) {
						console.log('隐藏键盘');
					}, fail: function fail(res) {
						console.log("隐藏键盘出错:" + (res ? res.errMsg : ""));
					} });
			}
		}]);

		return MiniInput;
	}();

	var MiniLoader = function (_Laya$EventDispatcher2) {
		_inherits(MiniLoader, _Laya$EventDispatcher2);

		function MiniLoader() {
			_classCallCheck(this, MiniLoader);

			return _possibleConstructorReturn(this, (MiniLoader.__proto__ || Object.getPrototypeOf(MiniLoader)).call(this));
		}

		_createClass(MiniLoader, [{
			key: "_loadResourceFilter",
			value: function _loadResourceFilter(type, url) {
				var thisLoader = this;
				if (url.indexOf(QQMiniAdapter.window.qq.env.USER_DATA_PATH) == -1 && (url.indexOf("http://") != -1 || url.indexOf("https://") != -1)) {
					if (MiniFileMgr.loadPath != "") {
						url = url.split(MiniFileMgr.loadPath)[1];
					} else {
						var tempStr = Laya.URL.rootPath != "" ? Laya.URL.rootPath : Laya.URL._basePath;
						var tempUrl = url;
						if (tempStr != "") url = url.split(tempStr)[1];
						if (!url) {
							url = tempUrl;
						}
					}
				}
				if (QQMiniAdapter.subNativeFiles && QQMiniAdapter.subNativeheads.length == 0) {
					for (var key in QQMiniAdapter.subNativeFiles) {
						var tempArr = QQMiniAdapter.subNativeFiles[key];
						QQMiniAdapter.subNativeheads = QQMiniAdapter.subNativeheads.concat(tempArr);
						for (var aa = 0; aa < tempArr.length; aa++) {
							QQMiniAdapter.subMaps[tempArr[aa]] = key + "/" + tempArr[aa];
						}
					}
				}
				if (QQMiniAdapter.subNativeFiles && url.indexOf("/") != -1) {
					var curfileHead = url.split("/")[0] + "/";
					if (curfileHead && QQMiniAdapter.subNativeheads.indexOf(curfileHead) != -1) {
						var newfileHead = QQMiniAdapter.subMaps[curfileHead];
						url = url.replace(curfileHead, newfileHead);
					}
				}
				switch (type) {
					case Laya.Loader.IMAGE:
					case "htmlimage":
					case "nativeimage":
						MiniLoader._transformImgUrl(url, type, thisLoader);
						break;
					case Laya.Loader.SOUND:
						thisLoader._loadSound(url);
						break;
					default:
						thisLoader._loadResource(type, url);
				}
			}
		}, {
			key: "_loadSound",
			value: function _loadSound(url) {
				var thisLoader = this;
				var fileNativeUrl;
				if (MiniFileMgr.isLocalNativeFile(url)) {
					var tempStr = Laya.URL.rootPath != "" ? Laya.URL.rootPath : Laya.URL._basePath;
					var tempUrl = url;
					if (tempStr != "" && (url.indexOf("http://") != -1 || url.indexOf("https://") != -1)) fileNativeUrl = url.split(tempStr)[1];
					if (!fileNativeUrl) {
						fileNativeUrl = tempUrl;
					}
					MiniLoader.onDownLoadCallBack(url, thisLoader, 0);
				} else {
					var tempurl = Laya.URL.formatURL(url);
					if (!MiniFileMgr.isLocalNativeFile(url) && tempurl.indexOf("http://") == -1 && tempurl.indexOf("https://") == -1 || tempurl.indexOf(QQMiniAdapter.window.qq.env.USER_DATA_PATH) != -1) {
						MiniLoader.onDownLoadCallBack(url, thisLoader, 0);
					} else {
						MiniFileMgr.downOtherFiles(encodeURI(tempurl), Laya.Handler.create(MiniLoader, MiniLoader.onDownLoadCallBack, [tempurl, thisLoader]), tempurl);
					}
				}
			}
		}, {
			key: "_loadHttpRequestWhat",
			value: function _loadHttpRequestWhat(url, contentType) {
				var thisLoader = this;
				var encoding = QQMiniAdapter.getUrlEncode(url, contentType);
				if (Laya.Loader.preLoadedMap[url]) thisLoader.onLoaded(Laya.Loader.preLoadedMap[url]);else {
					var tempurl = Laya.URL.formatURL(url);
					if (!MiniFileMgr.isLocalNativeFile(url) && !MiniFileMgr.getFileInfo(tempurl) && url.indexOf(QQMiniAdapter.window.qq.env.USER_DATA_PATH) == -1 && (tempurl.indexOf("http://") != -1 || tempurl.indexOf("https://") != -1) && !QQMiniAdapter.AutoCacheDownFile) {
						thisLoader._loadHttpRequest(tempurl, contentType, thisLoader, thisLoader.onLoaded, thisLoader, thisLoader.onProgress, thisLoader, thisLoader.onError);
					} else {
						var fileObj = MiniFileMgr.getFileInfo(Laya.URL.formatURL(url));
						if (fileObj) {
							fileObj.encoding = fileObj.encoding == null ? "utf8" : fileObj.encoding;
							MiniFileMgr.readFile(MiniFileMgr.getFileNativePath(fileObj.md5), encoding, new Laya.Handler(MiniLoader, MiniLoader.onReadNativeCallBack, [url, contentType, thisLoader]), url);
						} else if (thisLoader.type == "image" || thisLoader.type == "htmlimage") {
							thisLoader._transformUrl(url, contentType);
						} else {
							if (contentType != Laya.Loader.IMAGE && (tempurl.indexOf("http://") == -1 && tempurl.indexOf("https://") == -1 || MiniFileMgr.isLocalNativeFile(url))) {
								MiniFileMgr.readFile(url, encoding, new Laya.Handler(MiniLoader, MiniLoader.onReadNativeCallBack, [url, contentType, thisLoader]), url);
							} else {
								MiniFileMgr.downFiles(encodeURI(tempurl), encoding, new Laya.Handler(MiniLoader, MiniLoader.onReadNativeCallBack, [url, contentType, thisLoader]), tempurl, true);
							}
						}
					}
				}
			}
		}], [{
			key: "onDownLoadCallBack",
			value: function onDownLoadCallBack(sourceUrl, thisLoader, errorCode) {
				var tempFilePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				if (!errorCode) {
					var fileNativeUrl;
					if (QQMiniAdapter.autoCacheFile) {
						if (!tempFilePath) {
							if (MiniFileMgr.isLocalNativeFile(sourceUrl)) {
								var tempStr = Laya.URL.rootPath != "" ? Laya.URL.rootPath : Laya.URL._basePath;
								var tempUrl = sourceUrl;
								if (tempStr != "" && (sourceUrl.indexOf("http://") != -1 || sourceUrl.indexOf("https://") != -1)) fileNativeUrl = sourceUrl.split(tempStr)[1];
								if (!fileNativeUrl) {
									fileNativeUrl = tempUrl;
								}
							} else {
								var fileObj = MiniFileMgr.getFileInfo(sourceUrl);
								if (fileObj && fileObj.md5) {
									var fileMd5Name = fileObj.md5;
									fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
								} else {
									fileNativeUrl = sourceUrl;
								}
							}
						} else {
							fileNativeUrl = tempFilePath;
						}
					}
					sourceUrl = fileNativeUrl;
					var sound = new Laya.SoundManager._soundClass();
					sound.load(encodeURI(sourceUrl));
					thisLoader.onLoaded(sound);
				} else {
					thisLoader.event(Laya.Event.ERROR, "Load sound failed");
				}
			}
		}, {
			key: "bindToThis",
			value: function bindToThis(fun, scope) {
				var rst = fun;
				rst = fun.bind(scope);
				return rst;
			}
		}, {
			key: "onReadNativeCallBack",
			value: function onReadNativeCallBack(url) {
				var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var thisLoader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var errorCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
				var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

				if (!errorCode) {
					var tempData;
					if (type == Laya.Loader.JSON || type == Laya.Loader.ATLAS || type == Laya.Loader.PREFAB || type == Laya.Loader.PLF) {
						tempData = QQMiniAdapter.getJson(data.data);
					} else if (type == Laya.Loader.XML) {
						tempData = Laya.Utils.parseXMLFromString(data.data);
					} else {
						tempData = data.data;
					}
					if (!QQMiniAdapter.isZiYu && QQMiniAdapter.isPosMsgYu && type != Laya.Loader.BUFFER) {
						QQMiniAdapter.window.qq.postMessage({ url: url, data: tempData, isLoad: "filedata" });
					}
					thisLoader.onLoaded(tempData);
				} else if (errorCode == 1) {
					thisLoader._loadHttpRequest(url, type, thisLoader, thisLoader.onLoaded, thisLoader, thisLoader.onProgress, thisLoader, thisLoader.onError);
				}
			}
		}, {
			key: "_transformImgUrl",
			value: function _transformImgUrl(url, type, thisLoader) {
				if (QQMiniAdapter.isZiYu) {
					thisLoader._loadImage(url, false);
					return;
				}
				if (MiniFileMgr.isLocalNativeFile(url)) {
					thisLoader._loadImage(url, false);
					return;
				}
				if (!MiniFileMgr.isLocalNativeFile(url) && !MiniFileMgr.getFileInfo(Laya.URL.formatURL(url))) {
					var tempUrl = Laya.URL.formatURL(url);
					if (url.indexOf(QQMiniAdapter.window.qq.env.USER_DATA_PATH) == -1 && (tempUrl.indexOf("http://") != -1 || tempUrl.indexOf("https://") != -1)) {
						if (QQMiniAdapter.isZiYu) {
							thisLoader._loadImage(url, false);
						} else {
							MiniFileMgr.downOtherFiles(encodeURI(tempUrl), new Laya.Handler(MiniLoader, MiniLoader.onDownImgCallBack, [url, thisLoader]), tempUrl);
						}
					} else thisLoader._loadImage(url, false);
				} else {
					thisLoader._loadImage(url);
				}
			}
		}, {
			key: "onDownImgCallBack",
			value: function onDownImgCallBack(sourceUrl, thisLoader, errorCode) {
				var tempFilePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

				if (!errorCode) MiniLoader.onCreateImage(sourceUrl, thisLoader, false, tempFilePath);else {
					thisLoader.onError(null);
				}
			}
		}, {
			key: "onCreateImage",
			value: function onCreateImage(sourceUrl, thisLoader) {
				var isLocal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
				var tempFilePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

				var fileNativeUrl;
				if (QQMiniAdapter.autoCacheFile) {
					if (!isLocal) {
						if (tempFilePath != "") {
							fileNativeUrl = tempFilePath;
						} else {
							var fileObj = MiniFileMgr.getFileInfo(sourceUrl);
							var fileMd5Name = fileObj.md5;
							fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
						}
					} else if (QQMiniAdapter.isZiYu) {
						var tempUrl = Laya.URL.formatURL(sourceUrl);
						if (MiniFileMgr.ziyuFileTextureData[tempUrl]) {
							fileNativeUrl = MiniFileMgr.ziyuFileTextureData[tempUrl];
						} else fileNativeUrl = sourceUrl;
					} else fileNativeUrl = sourceUrl;
				} else {
					if (!isLocal) fileNativeUrl = tempFilePath;else fileNativeUrl = sourceUrl;
				}
				thisLoader._loadImage(fileNativeUrl, false);
			}
		}]);

		return MiniLoader;
	}(Laya.EventDispatcher);

	var MiniLocalStorage = function () {
		function MiniLocalStorage() {
			_classCallCheck(this, MiniLocalStorage);
		}

		_createClass(MiniLocalStorage, null, [{
			key: "__init__",
			value: function __init__() {
				MiniLocalStorage.items = MiniLocalStorage;
			}
		}, {
			key: "setItem",
			value: function setItem(key, value) {
				try {
					QQMiniAdapter.window.qq.setStorageSync(key, value);
				} catch (error) {
					QQMiniAdapter.window.qq.setStorage({
						key: key,
						data: value
					});
				}
			}
		}, {
			key: "getItem",
			value: function getItem(key) {
				return QQMiniAdapter.window.qq.getStorageSync(key);
			}
		}, {
			key: "setJSON",
			value: function setJSON(key, value) {
				MiniLocalStorage.setItem(key, value);
			}
		}, {
			key: "getJSON",
			value: function getJSON(key) {
				return MiniLocalStorage.getItem(key);
			}
		}, {
			key: "removeItem",
			value: function removeItem(key) {
				QQMiniAdapter.window.qq.removeStorageSync(key);
			}
		}, {
			key: "clear",
			value: function clear() {
				QQMiniAdapter.window.qq.clearStorageSync();
			}
		}, {
			key: "getStorageInfoSync",
			value: function getStorageInfoSync() {
				try {
					var res = QQMiniAdapter.window.qq.getStorageInfoSync();
					console.log(res.keys);
					console.log(res.currentSize);
					console.log(res.limitSize);
					return res;
				} catch (e) {}
				return null;
			}
		}]);

		return MiniLocalStorage;
	}();

	MiniLocalStorage.support = true;

	var QQMiniAdapter = function () {
		function QQMiniAdapter() {
			_classCallCheck(this, QQMiniAdapter);
		}

		_createClass(QQMiniAdapter, null, [{
			key: "getJson",
			value: function getJson(data) {
				return JSON.parse(data);
			}
		}, {
			key: "enable",
			value: function enable() {
				QQMiniAdapter.init(Laya.Laya.isWXPosMsg, Laya.Laya.isWXOpenDataContext);
			}
		}, {
			key: "init",
			value: function init() {
				var isPosMsg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var isSon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (QQMiniAdapter._inited) return;
				QQMiniAdapter._inited = true;
				QQMiniAdapter.window = window;
				if (!QQMiniAdapter.window.hasOwnProperty("qq")) return;
				if (QQMiniAdapter.window.navigator.userAgent.indexOf('MiniGame') < 0) return;
				QQMiniAdapter.isZiYu = isSon;
				QQMiniAdapter.isPosMsgYu = isPosMsg;
				QQMiniAdapter.EnvConfig = {};
				if (!QQMiniAdapter.isZiYu) {
					MiniFileMgr.setNativeFileDir("/layaairGame");
					MiniFileMgr.existDir(MiniFileMgr.fileNativeDir, Laya.Handler.create(QQMiniAdapter, QQMiniAdapter.onMkdirCallBack));
				}
				QQMiniAdapter.systemInfo = QQMiniAdapter.window.qq.getSystemInfoSync();
				QQMiniAdapter.window.focus = function () {};
				Laya.Laya['_getUrlPath'] = function () {
					return "";
				};
				QQMiniAdapter.window.logtime = function (str) {};
				QQMiniAdapter.window.alertTimeLog = function (str) {};
				QQMiniAdapter.window.resetShareInfo = function () {};
				QQMiniAdapter.window.CanvasRenderingContext2D = function () {};
				QQMiniAdapter.window.CanvasRenderingContext2D.prototype = QQMiniAdapter.window.qq.createCanvas().getContext('2d').__proto__;
				QQMiniAdapter.window.document.body.appendChild = function () {};
				QQMiniAdapter.EnvConfig.pixelRatioInt = 0;
				Laya.Browser["_pixelRatio"] = QQMiniAdapter.pixelRatio();
				QQMiniAdapter._preCreateElement = Laya.Browser.createElement;
				Laya.Browser["createElement"] = QQMiniAdapter.createElement;
				Laya.RunDriver.createShaderCondition = QQMiniAdapter.createShaderCondition;
				Laya.Utils['parseXMLFromString'] = QQMiniAdapter.parseXMLFromString;
				Laya.Input['_createInputElement'] = MiniInput['_createInputElement'];
				Laya.Loader.prototype._loadResourceFilter = MiniLoader.prototype._loadResourceFilter;
				Laya.Loader.prototype._loadSound = MiniLoader.prototype._loadSound;
				Laya.Loader.prototype._loadHttpRequestWhat = MiniLoader.prototype._loadHttpRequestWhat;
				Laya.LocalStorage._baseClass = MiniLocalStorage;
				MiniLocalStorage.__init__();
				Laya.Config.useRetinalCanvas = true;
				QQMiniAdapter.window.qq.onMessage && QQMiniAdapter.window.qq.onMessage(QQMiniAdapter._onMessage);
			}
		}, {
			key: "_onMessage",
			value: function _onMessage(data) {
				switch (data.type) {
					case "changeMatrix":
						Laya.Laya.stage.transform.identity();
						Laya.Laya.stage._width = data.w;
						Laya.Laya.stage._height = data.h;
						Laya.Laya.stage._canvasTransform = new Laya.Matrix(data.a, data.b, data.c, data.d, data.tx, data.ty);
						break;
					case "display":
						Laya.Laya.stage.frameRate = data.rate || Laya.Stage.FRAME_FAST;
						break;
					case "undisplay":
						Laya.Laya.stage.frameRate = Laya.Stage.FRAME_SLEEP;
						break;
				}
				if (data['isLoad'] == "opendatacontext") {
					if (data.url) {
						MiniFileMgr.ziyuFileData[data.url] = data.atlasdata;
						MiniFileMgr.ziyuFileTextureData[data.imgReadyUrl] = data.imgNativeUrl;
					}
				} else if (data['isLoad'] == "openJsondatacontext") {
					if (data.url) {
						MiniFileMgr.ziyuFileData[data.url] = data.atlasdata;
					}
				} else if (data['isLoad'] == "openJsondatacontextPic") {
					MiniFileMgr.ziyuFileTextureData[data.imgReadyUrl] = data.imgNativeUrl;
				}
			}
		}, {
			key: "getUrlEncode",
			value: function getUrlEncode(url, type) {
				if (type == "arraybuffer") return "";
				return "utf8";
			}
		}, {
			key: "downLoadFile",
			value: function downLoadFile(fileUrl) {
				var fileType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
				var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "utf8";

				var fileObj = MiniFileMgr.getFileInfo(fileUrl);
				if (!fileObj) MiniFileMgr.downLoadFile(fileUrl, fileType, callBack, encoding);else {
					callBack != null && callBack.runWith([0]);
				}
			}
		}, {
			key: "remove",
			value: function remove(fileUrl) {
				var callBack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				MiniFileMgr.deleteFile("", fileUrl, callBack, "", 0);
			}
		}, {
			key: "removeAll",
			value: function removeAll() {
				MiniFileMgr.deleteAll();
			}
		}, {
			key: "hasNativeFile",
			value: function hasNativeFile(fileUrl) {
				return MiniFileMgr.isLocalNativeFile(fileUrl);
			}
		}, {
			key: "getFileInfo",
			value: function getFileInfo(fileUrl) {
				return MiniFileMgr.getFileInfo(fileUrl);
			}
		}, {
			key: "getFileList",
			value: function getFileList() {
				return MiniFileMgr.filesListObj;
			}
		}, {
			key: "exitMiniProgram",
			value: function exitMiniProgram() {
				QQMiniAdapter.window["wx"].exitMiniProgram();
			}
		}, {
			key: "onMkdirCallBack",
			value: function onMkdirCallBack(errorCode, data) {
				if (!errorCode) MiniFileMgr.filesListObj = JSON.parse(data.data);
				MiniFileMgr.fakeObj = MiniFileMgr.filesListObj;
			}
		}, {
			key: "pixelRatio",
			value: function pixelRatio() {
				if (!QQMiniAdapter.EnvConfig.pixelRatioInt) {
					try {
						QQMiniAdapter.EnvConfig.pixelRatioInt = QQMiniAdapter.systemInfo.pixelRatio;
						return QQMiniAdapter.systemInfo.pixelRatio;
					} catch (error) {}
				}
				return QQMiniAdapter.EnvConfig.pixelRatioInt;
			}
		}, {
			key: "createElement",
			value: function createElement(type) {
				if (type == "canvas") {
					var _source;
					if (QQMiniAdapter.idx == 1) {
						if (QQMiniAdapter.isZiYu) {
							_source = QQMiniAdapter.window.sharedCanvas;
							_source.style = {};
						} else {
							_source = QQMiniAdapter.window.canvas;
						}
					} else {
						_source = QQMiniAdapter.window.qq.createCanvas();
					}
					QQMiniAdapter.idx++;
					return _source;
				} else if (type == "textarea" || type == "input") {
					return QQMiniAdapter.onCreateInput(type);
				} else if (type == "div") {
					var node = QQMiniAdapter._preCreateElement(type);
					node.contains = function (value) {
						return null;
					};
					node.removeChild = function (value) {};
					return node;
				} else {
					return QQMiniAdapter._preCreateElement(type);
				}
			}
		}, {
			key: "onCreateInput",
			value: function onCreateInput(type) {
				var node = QQMiniAdapter._preCreateElement(type);
				node.focus = MiniInput.wxinputFocus;
				node.blur = MiniInput.wxinputblur;
				node.style = {};
				node.value = 0;
				node.parentElement = {};
				node.placeholder = {};
				node.type = {};
				node.setColor = function (value) {};
				node.setType = function (value) {};
				node.setFontFace = function (value) {};
				node.addEventListener = function (value) {};
				node.contains = function (value) {
					return null;
				};
				node.removeChild = function (value) {};
				return node;
			}
		}, {
			key: "createShaderCondition",
			value: function createShaderCondition(conditionScript) {
				var func = function func() {
					return this[conditionScript.replace("this.", "")];
				};
				return func;
			}
		}, {
			key: "sendAtlasToOpenDataContext",
			value: function sendAtlasToOpenDataContext(url) {
				if (!QQMiniAdapter.isZiYu) {
					var atlasJson = Laya.Loader.getRes(Laya.URL.formatURL(url));
					if (atlasJson) {
						var textureArr = atlasJson.meta.image.split(",");
						if (atlasJson.meta && atlasJson.meta.image) {
							var toloadPics = atlasJson.meta.image.split(",");
							var split = url.indexOf("/") >= 0 ? "/" : "\\";
							var idx = url.lastIndexOf(split);
							var folderPath = idx >= 0 ? url.substr(0, idx + 1) : "";
							for (var i = 0, len = toloadPics.length; i < len; i++) {
								toloadPics[i] = folderPath + toloadPics[i];
							}
						} else {
							toloadPics = [url.replace(".json", ".png")];
						}
						for (i = 0; i < toloadPics.length; i++) {
							var tempAtlasPngUrl = toloadPics[i];
							QQMiniAdapter.postInfoToContext(Laya.Laya.URL.formatURL(url), Laya.Laya.URL.formatURL(tempAtlasPngUrl), atlasJson);
						}
					} else {
						throw "传递的url没有获取到对应的图集数据信息，请确保图集已经过！";
					}
				}
			}
		}, {
			key: "postInfoToContext",
			value: function postInfoToContext(url, atlaspngUrl, atlasJson) {
				var postData = { "frames": atlasJson.frames, "meta": atlasJson.meta };
				var textureUrl = atlaspngUrl;
				var fileObj = MiniFileMgr.getFileInfo(Laya.URL.formatURL(atlaspngUrl));
				if (fileObj) {
					var fileMd5Name = fileObj.md5;
					var fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
				} else {
					fileNativeUrl = textureUrl;
				}
				if (fileNativeUrl) {
					QQMiniAdapter.window.qq.postMessage({ url: url, atlasdata: postData, imgNativeUrl: fileNativeUrl, imgReadyUrl: textureUrl, isLoad: "opendatacontext" });
				} else {
					throw "获取图集的磁盘url路径不存在！";
				}
			}
		}, {
			key: "sendSinglePicToOpenDataContext",
			value: function sendSinglePicToOpenDataContext(url) {
				var tempTextureUrl = Laya.URL.formatURL(url);
				var fileObj = MiniFileMgr.getFileInfo(tempTextureUrl);
				if (fileObj) {
					var fileMd5Name = fileObj.md5;
					var fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
					url = tempTextureUrl;
				} else {
					fileNativeUrl = url;
				}
				if (fileNativeUrl) {
					url = Laya.Laya.URL.formatURL(url);
					QQMiniAdapter.window.qq.postMessage({ url: url, imgNativeUrl: fileNativeUrl, imgReadyUrl: url, isLoad: "openJsondatacontextPic" });
				} else {
					throw "获取图集的磁盘url路径不存在！";
				}
			}
		}, {
			key: "sendJsonDataToDataContext",
			value: function sendJsonDataToDataContext(url) {
				if (!QQMiniAdapter.isZiYu) {
					url = Laya.Laya.URL.formatURL(url);
					var atlasJson = Laya.Loader.getRes(url);
					if (atlasJson) {
						QQMiniAdapter.window.qq.postMessage({ url: url, atlasdata: atlasJson, isLoad: "openJsondatacontext" });
					} else {
						throw "传递的url没有获取到对应的图集数据信息，请确保图集已经过！";
					}
				}
			}
		}]);

		return QQMiniAdapter;
	}();

	QQMiniAdapter._inited = false;
	QQMiniAdapter.autoCacheFile = true;
	QQMiniAdapter.minClearSize = 5 * 1024 * 1024;
	QQMiniAdapter.nativefiles = ["layaNativeDir", "wxlocal"];
	QQMiniAdapter.subNativeFiles = [];
	QQMiniAdapter.subNativeheads = [];
	QQMiniAdapter.subMaps = [];
	QQMiniAdapter.AutoCacheDownFile = false;
	QQMiniAdapter.parseXMLFromString = function (value) {
		var rst;
		value = value.replace(/>\s+</g, '><');
		try {
			rst = new QQMiniAdapter.window.Parser.DOMParser().parseFromString(value, 'text/xml');
		} catch (error) {
			throw "需要引入xml解析库文件";
		}
		return rst;
	};
	QQMiniAdapter.idx = 1;

	var MiniAccelerator = function (_Laya$EventDispatcher3) {
		_inherits(MiniAccelerator, _Laya$EventDispatcher3);

		function MiniAccelerator() {
			_classCallCheck(this, MiniAccelerator);

			return _possibleConstructorReturn(this, (MiniAccelerator.__proto__ || Object.getPrototypeOf(MiniAccelerator)).call(this));
		}

		_createClass(MiniAccelerator, [{
			key: "on",
			value: function on(type, caller, listener) {
				var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				_get(MiniAccelerator.prototype.__proto__ || Object.getPrototypeOf(MiniAccelerator.prototype), "on", this).call(this, type, caller, listener, args);
				MiniAccelerator.startListen(this["onDeviceOrientationChange"]);
				return this;
			}
		}, {
			key: "off",
			value: function off(type, caller, listener) {
				var onceOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

				if (!this.hasListener(type)) MiniAccelerator.stopListen();
				return _get(MiniAccelerator.prototype.__proto__ || Object.getPrototypeOf(MiniAccelerator.prototype), "off", this).call(this, type, caller, listener, onceOnly);
			}
		}], [{
			key: "__init__",
			value: function __init__() {
				try {
					var Acc;
					Acc = Laya.Accelerator;
					if (!Acc) return;
					Acc["prototype"]["on"] = MiniAccelerator["prototype"]["on"];
					Acc["prototype"]["off"] = MiniAccelerator["prototype"]["off"];
				} catch (e) {}
			}
		}, {
			key: "startListen",
			value: function startListen(callBack) {
				MiniAccelerator._callBack = callBack;
				if (MiniAccelerator._isListening) return;
				MiniAccelerator._isListening = true;
				try {
					QQMiniAdapter.window.qq.onAccelerometerChange(MiniAccelerator.onAccelerometerChange);
				} catch (e) {}
			}
		}, {
			key: "stopListen",
			value: function stopListen() {
				MiniAccelerator._isListening = false;
				try {
					QQMiniAdapter.window.qq.stopAccelerometer({});
				} catch (e) {}
			}
		}, {
			key: "onAccelerometerChange",
			value: function onAccelerometerChange(res) {
				var e;
				e = {};
				e.acceleration = res;
				e.accelerationIncludingGravity = res;
				e.rotationRate = {};
				if (MiniAccelerator._callBack != null) {
					MiniAccelerator._callBack(e);
				}
			}
		}]);

		return MiniAccelerator;
	}(Laya.EventDispatcher);

	MiniAccelerator._isListening = false;

	var MiniImage = function () {
		function MiniImage() {
			_classCallCheck(this, MiniImage);
		}

		_createClass(MiniImage, [{
			key: "_loadImage",
			value: function _loadImage(url) {
				var thisLoader = this;
				if (QQMiniAdapter.isZiYu) {
					MiniImage.onCreateImage(url, thisLoader, true);
					return;
				}
				var isTransformUrl;
				if (!MiniFileMgr.isLocalNativeFile(url)) {
					isTransformUrl = true;
					url = Laya.URL.formatURL(url);
				} else {
					if (url.indexOf(QQMiniAdapter.window.qq.env.USER_DATA_PATH) == -1 && (url.indexOf("http://") != -1 || url.indexOf("https://") != -1)) {
						if (MiniFileMgr.loadPath != "") {
							url = url.split(MiniFileMgr.loadPath)[1];
						} else {
							var tempStr = Laya.URL.rootPath != "" ? Laya.URL.rootPath : Laya.URL._basePath;
							var tempUrl = url;
							if (tempStr != "") url = url.split(tempStr)[1];
							if (!url) {
								url = tempUrl;
							}
						}
					}
					if (QQMiniAdapter.subNativeFiles && QQMiniAdapter.subNativeheads.length == 0) {
						for (var key in QQMiniAdapter.subNativeFiles) {
							var tempArr = QQMiniAdapter.subNativeFiles[key];
							QQMiniAdapter.subNativeheads = QQMiniAdapter.subNativeheads.concat(tempArr);
							for (var aa = 0; aa < tempArr.length; aa++) {
								QQMiniAdapter.subMaps[tempArr[aa]] = key + "/" + tempArr[aa];
							}
						}
					}
					if (QQMiniAdapter.subNativeFiles && url.indexOf("/") != -1) {
						var curfileHead = url.split("/")[0] + "/";
						if (curfileHead && QQMiniAdapter.subNativeheads.indexOf(curfileHead) != -1) {
							var newfileHead = QQMiniAdapter.subMaps[curfileHead];
							url = url.replace(curfileHead, newfileHead);
						}
					}
				}
				if (!MiniFileMgr.getFileInfo(url)) {
					if (url.indexOf(QQMiniAdapter.window.qq.env.USER_DATA_PATH) == -1 && (url.indexOf("http://") != -1 || url.indexOf("https://") != -1)) {
						if (QQMiniAdapter.isZiYu) {
							MiniImage.onCreateImage(url, thisLoader, true);
						} else {
							MiniFileMgr.downOtherFiles(encodeURI(url), new Laya.Handler(MiniImage, MiniImage.onDownImgCallBack, [url, thisLoader]), url);
						}
					} else MiniImage.onCreateImage(url, thisLoader, true);
				} else {
					MiniImage.onCreateImage(url, thisLoader, !isTransformUrl);
				}
			}
		}], [{
			key: "onDownImgCallBack",
			value: function onDownImgCallBack(sourceUrl, thisLoader, errorCode) {
				var tempFilePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

				if (!errorCode) MiniImage.onCreateImage(sourceUrl, thisLoader, false, tempFilePath);else {
					thisLoader.onError(null);
				}
			}
		}, {
			key: "onCreateImage",
			value: function onCreateImage(sourceUrl, thisLoader) {
				var isLocal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
				var tempFilePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

				var fileNativeUrl;
				if (QQMiniAdapter.autoCacheFile) {
					if (!isLocal) {
						if (tempFilePath != "") {
							fileNativeUrl = tempFilePath;
						} else {
							var fileObj = MiniFileMgr.getFileInfo(sourceUrl);
							var fileMd5Name = fileObj.md5;
							fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
						}
					} else if (QQMiniAdapter.isZiYu) {
						var tempUrl = Laya.URL.formatURL(sourceUrl);
						if (MiniFileMgr.ziyuFileTextureData[tempUrl]) {
							fileNativeUrl = MiniFileMgr.ziyuFileTextureData[tempUrl];
						} else fileNativeUrl = sourceUrl;
					} else fileNativeUrl = sourceUrl;
				} else {
					if (!isLocal) fileNativeUrl = tempFilePath;else fileNativeUrl = sourceUrl;
				}
				if (thisLoader._imgCache == null) thisLoader._imgCache = {};
				var image;
				function clear() {
					var img = thisLoader._imgCache[fileNativeUrl];
					if (img) {
						img.onload = null;
						img.onerror = null;
						delete thisLoader._imgCache[fileNativeUrl];
					}
				}
				var onerror = function onerror() {
					clear();
					delete MiniFileMgr.fakeObj[sourceUrl];
					delete MiniFileMgr.filesListObj[sourceUrl];
					thisLoader.event(Laya.Event.ERROR, "Load image failed");
				};
				if (thisLoader._type == "nativeimage") {
					var onload = function onload() {
						clear();
						thisLoader.onLoaded(image);
					};
					image = new Laya.Browser.window.Image();
					image.crossOrigin = "";
					image.onload = onload;
					image.onerror = onerror;
					image.src = fileNativeUrl;
					thisLoader._imgCache[fileNativeUrl] = image;
				} else {
					var imageSource = new Laya.Browser.window.Image();
					onload = function onload() {
						image = Laya.HTMLImage.create(imageSource.width, imageSource.height);
						image.loadImageSource(imageSource, true);
						image._setCreateURL(fileNativeUrl);
						clear();
						thisLoader.onLoaded(image);
					};
					imageSource.crossOrigin = "";
					imageSource.onload = onload;
					imageSource.onerror = onerror;
					imageSource.src = fileNativeUrl;
					thisLoader._imgCache[fileNativeUrl] = imageSource;
				}
			}
		}]);

		return MiniImage;
	}();

	var MiniLocation = function () {
		function MiniLocation() {
			_classCallCheck(this, MiniLocation);
		}

		_createClass(MiniLocation, null, [{
			key: "__init__",
			value: function __init__() {
				QQMiniAdapter.window.navigator.geolocation.getCurrentPosition = MiniLocation.getCurrentPosition;
				QQMiniAdapter.window.navigator.geolocation.watchPosition = MiniLocation.watchPosition;
				QQMiniAdapter.window.navigator.geolocation.clearWatch = MiniLocation.clearWatch;
			}
		}, {
			key: "getCurrentPosition",
			value: function getCurrentPosition() {
				var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				var paramO;
				paramO = {};
				paramO.success = getSuccess;
				paramO.fail = error;
				QQMiniAdapter.window.qq.getLocation(paramO);
				function getSuccess(res) {
					if (success != null) {
						success(res);
					}
				}
			}
		}, {
			key: "watchPosition",
			value: function watchPosition() {
				var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				MiniLocation._curID++;
				var curWatchO;
				curWatchO = {};
				curWatchO.success = success;
				curWatchO.error = error;
				MiniLocation._watchDic[MiniLocation._curID] = curWatchO;
				Laya.Laya.systemTimer.loop(1000, null, MiniLocation._myLoop);
				return MiniLocation._curID;
			}
		}, {
			key: "clearWatch",
			value: function clearWatch(id) {
				delete MiniLocation._watchDic[id];
				if (!MiniLocation._hasWatch()) {
					Laya.Laya.systemTimer.clear(null, MiniLocation._myLoop);
				}
			}
		}, {
			key: "_hasWatch",
			value: function _hasWatch() {
				var key;
				for (key in MiniLocation._watchDic) {
					if (MiniLocation._watchDic[key]) return true;
				}
				return false;
			}
		}, {
			key: "_myLoop",
			value: function _myLoop() {
				MiniLocation.getCurrentPosition(MiniLocation._mySuccess, MiniLocation._myError);
			}
		}, {
			key: "_mySuccess",
			value: function _mySuccess(res) {
				var rst = {};
				rst.coords = res;
				rst.timestamp = Laya.Browser.now();
				var key;
				for (key in MiniLocation._watchDic) {
					if (MiniLocation._watchDic[key].success) {
						MiniLocation._watchDic[key].success(rst);
					}
				}
			}
		}, {
			key: "_myError",
			value: function _myError(res) {
				var key;
				for (key in MiniLocation._watchDic) {
					if (MiniLocation._watchDic[key].error) {
						MiniLocation._watchDic[key].error(res);
					}
				}
			}
		}]);

		return MiniLocation;
	}();

	MiniLocation._watchDic = {};
	MiniLocation._curID = 0;

	var MiniVideo = function () {
		function MiniVideo() {
			var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 320;
			var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 240;

			_classCallCheck(this, MiniVideo);

			this.videoend = false;
			this.videourl = "";
			this.videoElement = QQMiniAdapter.window.qq.createVideo({ width: width, height: height, autoplay: true });
		}

		_createClass(MiniVideo, [{
			key: "on",
			value: function on(eventType, ths, callBack) {
				if (eventType == "loadedmetadata") {
					this.onPlayFunc = callBack.bind(ths);
					this.videoElement.onPlay = this.onPlayFunction.bind(this);
				} else if (eventType == "ended") {
					this.onEndedFunC = callBack.bind(ths);
					this.videoElement.onEnded = this.onEndedFunction.bind(this);
				}
				this.videoElement.onTimeUpdate = this.onTimeUpdateFunc.bind(this);
			}
		}, {
			key: "onTimeUpdateFunc",
			value: function onTimeUpdateFunc(data) {
				this.position = data.position;
				this._duration = data.duration;
			}
		}, {
			key: "onPlayFunction",
			value: function onPlayFunction() {
				if (this.videoElement) this.videoElement.readyState = 200;
				console.log("=====视频加载完成========");
				this.onPlayFunc != null && this.onPlayFunc();
			}
		}, {
			key: "onEndedFunction",
			value: function onEndedFunction() {
				if (!this.videoElement) return;
				this.videoend = true;
				console.log("=====视频播放完毕========");
				this.onEndedFunC != null && this.onEndedFunC();
			}
		}, {
			key: "off",
			value: function off(eventType, ths, callBack) {
				if (eventType == "loadedmetadata") {
					this.onPlayFunc = callBack.bind(ths);
					this.videoElement.offPlay = this.onPlayFunction.bind(this);
				} else if (eventType == "ended") {
					this.onEndedFunC = callBack.bind(ths);
					this.videoElement.offEnded = this.onEndedFunction.bind(this);
				}
			}
		}, {
			key: "load",
			value: function load(url) {
				if (!this.videoElement) return;
				this.videoElement.src = url;
			}
		}, {
			key: "play",
			value: function play() {
				if (!this.videoElement) return;
				this.videoend = false;
				this.videoElement.play();
			}
		}, {
			key: "pause",
			value: function pause() {
				if (!this.videoElement) return;
				this.videoend = true;
				this.videoElement.pause();
			}
		}, {
			key: "size",
			value: function size(width, height) {
				if (!this.videoElement) return;
				this.videoElement.width = width;
				this.videoElement.height = height;
			}
		}, {
			key: "destroy",
			value: function destroy() {
				if (this.videoElement) this.videoElement.destroy();
				this.videoElement = null;
				this.onEndedFunC = null;
				this.onPlayFunc = null;
				this.videoend = false;
				this.videourl = null;
			}
		}, {
			key: "reload",
			value: function reload() {
				if (!this.videoElement) return;
				this.videoElement.src = this.videourl;
			}
		}, {
			key: "duration",
			get: function get() {
				return this._duration;
			}
		}, {
			key: "currentTime",
			get: function get() {
				if (!this.videoElement) return 0;
				return this.videoElement.initialTime;
			},
			set: function set(value) {
				if (!this.videoElement) return;
				this.videoElement.initialTime = value;
			}
		}, {
			key: "videoWidth",
			get: function get() {
				if (!this.videoElement) return 0;
				return this.videoElement.width;
			}
		}, {
			key: "videoHeight",
			get: function get() {
				if (!this.videoElement) return 0;
				return this.videoElement.height;
			}
		}, {
			key: "ended",
			get: function get() {
				return this.videoend;
			}
		}, {
			key: "loop",
			get: function get() {
				if (!this.videoElement) return false;
				return this.videoElement.loop;
			},
			set: function set(value) {
				if (!this.videoElement) return;
				this.videoElement.loop = value;
			}
		}, {
			key: "playbackRate",
			get: function get() {
				if (!this.videoElement) return 0;
				return this.videoElement.playbackRate;
			},
			set: function set(value) {
				if (!this.videoElement) return;
				this.videoElement.playbackRate = value;
			}
		}, {
			key: "muted",
			get: function get() {
				if (!this.videoElement) return false;
				return this.videoElement.muted;
			},
			set: function set(value) {
				if (!this.videoElement) return;
				this.videoElement.muted = value;
			}
		}, {
			key: "paused",
			get: function get() {
				if (!this.videoElement) return false;
				return this.videoElement.paused;
			}
		}, {
			key: "x",
			get: function get() {
				if (!this.videoElement) return 0;
				return this.videoElement.x;
			},
			set: function set(value) {
				if (!this.videoElement) return;
				this.videoElement.x = value;
			}
		}, {
			key: "y",
			get: function get() {
				if (!this.videoElement) return 0;
				return this.videoElement.y;
			},
			set: function set(value) {
				if (!this.videoElement) return;
				this.videoElement.y = value;
			}
		}, {
			key: "currentSrc",
			get: function get() {
				return this.videoElement.src;
			}
		}], [{
			key: "__init__",
			value: function __init__() {}
		}]);

		return MiniVideo;
	}();

	exports.MiniAccelerator = MiniAccelerator;
	exports.MiniFileMgr = MiniFileMgr;
	exports.MiniImage = MiniImage;
	exports.MiniInput = MiniInput;
	exports.MiniLoader = MiniLoader;
	exports.MiniLocalStorage = MiniLocalStorage;
	exports.MiniLocation = MiniLocation;
	exports.MiniSound = MiniSound;
	exports.MiniSoundChannel = MiniSoundChannel;
	exports.MiniVideo = MiniVideo;
	exports.QQMiniAdapter = QQMiniAdapter;
};
