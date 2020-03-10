'use strict';

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (exports, Laya) {
	'use strict';

	var AccelerationInfo = function AccelerationInfo() {
		_classCallCheck(this, AccelerationInfo);
	};

	var RotationInfo = function RotationInfo() {
		_classCallCheck(this, RotationInfo);
	};

	var Accelerator = function (_Laya$EventDispatcher) {
		_inherits(Accelerator, _Laya$EventDispatcher);

		function Accelerator(singleton) {
			_classCallCheck(this, Accelerator);

			var _this = _possibleConstructorReturn(this, (Accelerator.__proto__ || Object.getPrototypeOf(Accelerator)).call(this));

			_this.onDeviceOrientationChange = _this.onDeviceOrientationChange.bind(_this);
			return _this;
		}

		_createClass(Accelerator, [{
			key: 'on',
			value: function on(type, caller, listener) {
				var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				_get(Accelerator.prototype.__proto__ || Object.getPrototypeOf(Accelerator.prototype), 'on', this).call(this, type, caller, listener, args);
				Laya.ILaya.Browser.window.addEventListener('devicemotion', this.onDeviceOrientationChange);
				return this;
			}
		}, {
			key: 'off',
			value: function off(type, caller, listener) {
				var onceOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

				if (!this.hasListener(type)) Laya.ILaya.Browser.window.removeEventListener('devicemotion', this.onDeviceOrientationChange);
				return _get(Accelerator.prototype.__proto__ || Object.getPrototypeOf(Accelerator.prototype), 'off', this).call(this, type, caller, listener, onceOnly);
			}
		}, {
			key: 'onDeviceOrientationChange',
			value: function onDeviceOrientationChange(e) {
				var interval = e.interval;
				Accelerator.acceleration.x = e.acceleration.x;
				Accelerator.acceleration.y = e.acceleration.y;
				Accelerator.acceleration.z = e.acceleration.z;
				Accelerator.accelerationIncludingGravity.x = e.accelerationIncludingGravity.x;
				Accelerator.accelerationIncludingGravity.y = e.accelerationIncludingGravity.y;
				Accelerator.accelerationIncludingGravity.z = e.accelerationIncludingGravity.z;
				Accelerator.rotationRate.alpha = e.rotationRate.gamma * -1;
				Accelerator.rotationRate.beta = e.rotationRate.alpha * -1;
				Accelerator.rotationRate.gamma = e.rotationRate.beta;
				if (Laya.ILaya.Browser.onAndroid) {
					if (Laya.ILaya.Browser.userAgent.indexOf("Chrome") > -1) {
						Accelerator.rotationRate.alpha *= 180 / Math.PI;
						Accelerator.rotationRate.beta *= 180 / Math.PI;
						Accelerator.rotationRate.gamma *= 180 / Math.PI;
					}
					Accelerator.acceleration.x *= -1;
					Accelerator.accelerationIncludingGravity.x *= -1;
				} else if (Laya.ILaya.Browser.onIOS) {
					Accelerator.acceleration.y *= -1;
					Accelerator.acceleration.z *= -1;
					Accelerator.accelerationIncludingGravity.y *= -1;
					Accelerator.accelerationIncludingGravity.z *= -1;
					interval *= 1000;
				}
				this.event(Laya.Event.CHANGE, [Accelerator.acceleration, Accelerator.accelerationIncludingGravity, Accelerator.rotationRate, interval]);
			}
		}], [{
			key: 'getTransformedAcceleration',
			value: function getTransformedAcceleration(acceleration) {
				Accelerator.transformedAcceleration = Accelerator.transformedAcceleration || new AccelerationInfo();
				Accelerator.transformedAcceleration.z = acceleration.z;
				if (Laya.ILaya.Browser.window.orientation == 90) {
					Accelerator.transformedAcceleration.x = acceleration.y;
					Accelerator.transformedAcceleration.y = -acceleration.x;
				} else if (Laya.ILaya.Browser.window.orientation == -90) {
					Accelerator.transformedAcceleration.x = -acceleration.y;
					Accelerator.transformedAcceleration.y = acceleration.x;
				} else if (!Laya.ILaya.Browser.window.orientation) {
					Accelerator.transformedAcceleration.x = acceleration.x;
					Accelerator.transformedAcceleration.y = acceleration.y;
				} else if (Laya.ILaya.Browser.window.orientation == 180) {
					Accelerator.transformedAcceleration.x = -acceleration.x;
					Accelerator.transformedAcceleration.y = -acceleration.y;
				}
				var tx;
				if (Laya.ILaya.stage.canvasDegree == -90) {
					tx = Accelerator.transformedAcceleration.x;
					Accelerator.transformedAcceleration.x = -Accelerator.transformedAcceleration.y;
					Accelerator.transformedAcceleration.y = tx;
				} else if (Laya.ILaya.stage.canvasDegree == 90) {
					tx = Accelerator.transformedAcceleration.x;
					Accelerator.transformedAcceleration.x = Accelerator.transformedAcceleration.y;
					Accelerator.transformedAcceleration.y = -tx;
				}
				return Accelerator.transformedAcceleration;
			}
		}, {
			key: 'instance',
			get: function get() {
				Accelerator._instance = Accelerator._instance || new Accelerator(0);
				return Accelerator._instance;
			}
		}]);

		return Accelerator;
	}(Laya.EventDispatcher);

	Accelerator.acceleration = new AccelerationInfo();
	Accelerator.accelerationIncludingGravity = new AccelerationInfo();
	Accelerator.rotationRate = new RotationInfo();

	var Shake = function (_Laya$EventDispatcher2) {
		_inherits(Shake, _Laya$EventDispatcher2);

		function Shake() {
			_classCallCheck(this, Shake);

			return _possibleConstructorReturn(this, (Shake.__proto__ || Object.getPrototypeOf(Shake)).call(this));
		}

		_createClass(Shake, [{
			key: 'start',
			value: function start(throushold, interval) {
				this.throushold = throushold;
				this.shakeInterval = interval;
				this.lastX = this.lastY = this.lastZ = NaN;
				Accelerator.instance.on(Laya.Event.CHANGE, this, this.onShake);
			}
		}, {
			key: 'stop',
			value: function stop() {
				Accelerator.instance.off(Laya.Event.CHANGE, this, this.onShake);
			}
		}, {
			key: 'onShake',
			value: function onShake(acceleration, accelerationIncludingGravity, rotationRate, interval) {
				if (isNaN(this.lastX)) {
					this.lastX = accelerationIncludingGravity.x;
					this.lastY = accelerationIncludingGravity.y;
					this.lastZ = accelerationIncludingGravity.z;
					this.lastMillSecond = Laya.ILaya.Browser.now();
					return;
				}
				var deltaX = Math.abs(this.lastX - accelerationIncludingGravity.x);
				var deltaY = Math.abs(this.lastY - accelerationIncludingGravity.y);
				var deltaZ = Math.abs(this.lastZ - accelerationIncludingGravity.z);
				if (this.isShaked(deltaX, deltaY, deltaZ)) {
					var deltaMillSecond = Laya.ILaya.Browser.now() - this.lastMillSecond;
					if (deltaMillSecond > this.shakeInterval) {
						this.event(Laya.Event.CHANGE);
						this.lastMillSecond = Laya.ILaya.Browser.now();
					}
				}
				this.lastX = accelerationIncludingGravity.x;
				this.lastY = accelerationIncludingGravity.y;
				this.lastZ = accelerationIncludingGravity.z;
			}
		}, {
			key: 'isShaked',
			value: function isShaked(deltaX, deltaY, deltaZ) {
				return deltaX > this.throushold && deltaY > this.throushold || deltaX > this.throushold && deltaZ > this.throushold || deltaY > this.throushold && deltaZ > this.throushold;
			}
		}], [{
			key: 'instance',
			get: function get() {
				Shake._instance = Shake._instance || new Shake();
				return Shake._instance;
			}
		}]);

		return Shake;
	}(Laya.EventDispatcher);

	var GeolocationInfo = function () {
		function GeolocationInfo() {
			_classCallCheck(this, GeolocationInfo);
		}

		_createClass(GeolocationInfo, [{
			key: 'setPosition',
			value: function setPosition(pos) {
				this.pos = pos;
				this.coords = pos.coords;
			}
		}, {
			key: 'latitude',
			get: function get() {
				return this.coords.latitude;
			}
		}, {
			key: 'longitude',
			get: function get() {
				return this.coords.longitude;
			}
		}, {
			key: 'altitude',
			get: function get() {
				return this.coords.altitude;
			}
		}, {
			key: 'accuracy',
			get: function get() {
				return this.coords.accuracy;
			}
		}, {
			key: 'altitudeAccuracy',
			get: function get() {
				return this.coords.altitudeAccuracy;
			}
		}, {
			key: 'heading',
			get: function get() {
				return this.coords.heading;
			}
		}, {
			key: 'speed',
			get: function get() {
				return this.coords.speed;
			}
		}, {
			key: 'timestamp',
			get: function get() {
				return this.pos.timestamp;
			}
		}]);

		return GeolocationInfo;
	}();

	var Geolocation = function () {
		function Geolocation() {
			_classCallCheck(this, Geolocation);
		}

		_createClass(Geolocation, null, [{
			key: 'getCurrentPosition',
			value: function getCurrentPosition(onSuccess) {
				var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				Geolocation.navigator.geolocation.getCurrentPosition(function (pos) {
					Geolocation.position.setPosition(pos);
					onSuccess.runWith(Geolocation.position);
				}, function (error) {
					onError.runWith(error);
				}, {
					enableHighAccuracy: Geolocation.enableHighAccuracy,
					timeout: Geolocation.timeout,
					maximumAge: Geolocation.maximumAge
				});
			}
		}, {
			key: 'watchPosition',
			value: function watchPosition(onSuccess, onError) {
				return Geolocation.navigator.geolocation.watchPosition(function (pos) {
					Geolocation.position.setPosition(pos);
					onSuccess.runWith(Geolocation.position);
				}, function (error) {
					onError.runWith(error);
				}, {
					enableHighAccuracy: Geolocation.enableHighAccuracy,
					timeout: Geolocation.timeout,
					maximumAge: Geolocation.maximumAge
				});
			}
		}, {
			key: 'clearWatch',
			value: function clearWatch(id) {
				Geolocation.navigator.geolocation.clearWatch(id);
			}
		}]);

		return Geolocation;
	}();

	Geolocation.navigator = Laya.ILaya.Browser.window.navigator;
	Geolocation.position = new GeolocationInfo();
	Geolocation.PERMISSION_DENIED = 1;
	Geolocation.POSITION_UNAVAILABLE = 2;
	Geolocation.TIMEOUT = 3;
	Geolocation.supported = !!Geolocation.navigator.geolocation;
	Geolocation.enableHighAccuracy = false;
	Geolocation.timeout = 1E10;
	Geolocation.maximumAge = 0;

	var HtmlVideo = function (_Laya$Bitmap) {
		_inherits(HtmlVideo, _Laya$Bitmap);

		function HtmlVideo() {
			_classCallCheck(this, HtmlVideo);

			var _this3 = _possibleConstructorReturn(this, (HtmlVideo.__proto__ || Object.getPrototypeOf(HtmlVideo)).call(this));

			_this3._w = 0;
			_this3._h = 0;
			_this3._width = 1;
			_this3._height = 1;
			_this3.createDomElement();
			return _this3;
		}

		_createClass(HtmlVideo, [{
			key: 'createDomElement',
			value: function createDomElement() {
				var _this4 = this;

				this._source = this.video = Laya.ILaya.Browser.createElement("video");
				var style = this.video.style;
				style.position = 'absolute';
				style.top = '0px';
				style.left = '0px';
				this.video.addEventListener("loadedmetadata", function () {
					_this4._w = _this4.video.videoWidth;
					_this4._h = _this4.video.videoHeight;
				});
			}
		}, {
			key: 'setSource',
			value: function setSource(url, extension) {
				while (this.video.childElementCount) {
					this.video.firstChild.remove();
				}if (extension & 1) this.appendSource(url, "video/mp4");
				if (extension & 2) this.appendSource(url + ".ogg", "video/ogg");
			}
		}, {
			key: 'appendSource',
			value: function appendSource(source, type) {
				var sourceElement = Laya.ILaya.Browser.createElement("source");
				sourceElement.src = source;
				sourceElement.type = type;
				this.video.appendChild(sourceElement);
			}
		}, {
			key: 'getVideo',
			value: function getVideo() {
				return this.video;
			}
		}, {
			key: '_getSource',
			value: function _getSource() {
				return this._source;
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				_get(HtmlVideo.prototype.__proto__ || Object.getPrototypeOf(HtmlVideo.prototype), 'destroy', this).call(this);
				var isConchApp = Laya.ILaya.Render.isConchApp;
				if (isConchApp) {
					this.video._destroy();
				}
			}
		}]);

		return HtmlVideo;
	}(Laya.Bitmap);

	HtmlVideo.create = function () {
		return new HtmlVideo();
	};

	var Media = function () {
		function Media() {
			_classCallCheck(this, Media);
		}

		_createClass(Media, null, [{
			key: 'supported',
			value: function supported() {
				return !!Laya.ILaya.Browser.window.navigator.getUserMedia;
			}
		}, {
			key: 'getMedia',
			value: function getMedia(options, onSuccess, onError) {
				if (Laya.ILaya.Browser.window.navigator.getUserMedia) {
					Laya.ILaya.Browser.window.navigator.getUserMedia(options, function (stream) {
						onSuccess.runWith(Laya.ILaya.Browser.window.URL.createObjectURL(stream));
					}, function (err) {
						onError.runWith(err);
					});
				}
			}
		}]);

		return Media;
	}();

	var WebGLVideo = function (_HtmlVideo) {
		_inherits(WebGLVideo, _HtmlVideo);

		function WebGLVideo() {
			_classCallCheck(this, WebGLVideo);

			var _this5 = _possibleConstructorReturn(this, (WebGLVideo.__proto__ || Object.getPrototypeOf(WebGLVideo)).call(this));

			var gl = Laya.LayaGL.instance;
			if (!Laya.ILaya.Render.isConchApp && Laya.ILaya.Browser.onIPhone) return _possibleConstructorReturn(_this5);
			_this5.gl = Laya.ILaya.Render.isConchApp ? window.LayaGLContext.instance : Laya.WebGLContext.mainContext;
			_this5._source = _this5.gl.createTexture();
			Laya.WebGLContext.bindTexture(_this5.gl, gl.TEXTURE_2D, _this5._source);
			_this5.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			_this5.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			_this5.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			_this5.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			Laya.WebGLContext.bindTexture(_this5.gl, gl.TEXTURE_2D, null);
			return _this5;
		}

		_createClass(WebGLVideo, [{
			key: 'updateTexture',
			value: function updateTexture() {
				if (!Laya.ILaya.Render.isConchApp && Laya.ILaya.Browser.onIPhone) return;
				var gl = Laya.LayaGL.instance;
				Laya.WebGLContext.bindTexture(this.gl, gl.TEXTURE_2D, this._source);
				this.gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.video);
				WebGLVideo.curBindSource = this._source;
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				if (this._source) {
					this.gl = Laya.ILaya.Render.isConchApp ? window.LayaGLContext.instance : Laya.WebGLContext.mainContext;
					if (WebGLVideo.curBindSource == this._source) {
						Laya.WebGLContext.bindTexture(this.gl, this.gl.TEXTURE_2D, null);
						WebGLVideo.curBindSource = null;
					}
					this.gl.deleteTexture(this._source);
				}
				_get(WebGLVideo.prototype.__proto__ || Object.getPrototypeOf(WebGLVideo.prototype), 'destroy', this).call(this);
			}
		}, {
			key: '_glTexture',
			get: function get() {
				return this._source;
			}
		}]);

		return WebGLVideo;
	}(HtmlVideo);

	var Video = function (_Laya$Sprite) {
		_inherits(Video, _Laya$Sprite);

		function Video() {
			var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 320;
			var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 240;

			_classCallCheck(this, Video);

			var _this6 = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this));

			_this6.htmlVideo = new WebGLVideo();
			_this6.videoElement = _this6.htmlVideo.getVideo();
			_this6.videoElement.layaTarget = _this6;
			_this6.internalTexture = new Laya.Texture(_this6.htmlVideo);
			_this6.videoElement.addEventListener("abort", Video.onAbort);
			_this6.videoElement.addEventListener("canplay", Video.onCanplay);
			_this6.videoElement.addEventListener("canplaythrough", Video.onCanplaythrough);
			_this6.videoElement.addEventListener("durationchange", Video.onDurationchange);
			_this6.videoElement.addEventListener("emptied", Video.onEmptied);
			_this6.videoElement.addEventListener("error", Video.onError);
			_this6.videoElement.addEventListener("loadeddata", Video.onLoadeddata);
			_this6.videoElement.addEventListener("loadedmetadata", Video.onLoadedmetadata);
			_this6.videoElement.addEventListener("loadstart", Video.onLoadstart);
			_this6.videoElement.addEventListener("pause", Video.onPause);
			_this6.videoElement.addEventListener("play", Video.onPlay);
			_this6.videoElement.addEventListener("playing", Video.onPlaying);
			_this6.videoElement.addEventListener("progress", Video.onProgress);
			_this6.videoElement.addEventListener("ratechange", Video.onRatechange);
			_this6.videoElement.addEventListener("seeked", Video.onSeeked);
			_this6.videoElement.addEventListener("seeking", Video.onSeeking);
			_this6.videoElement.addEventListener("stalled", Video.onStalled);
			_this6.videoElement.addEventListener("suspend", Video.onSuspend);
			_this6.videoElement.addEventListener("timeupdate", Video.onTimeupdate);
			_this6.videoElement.addEventListener("volumechange", Video.onVolumechange);
			_this6.videoElement.addEventListener("waiting", Video.onWaiting);
			_this6.videoElement.addEventListener("ended", _this6.onPlayComplete['bind'](_this6));
			_this6.size(width, height);
			if (Laya.ILaya.Browser.onMobile) {
				_this6.onDocumentClick = _this6.onDocumentClick.bind(_this6);
				Laya.ILaya.Browser.document.addEventListener("touchend", _this6.onDocumentClick);
			}
			return _this6;
		}

		_createClass(Video, [{
			key: 'onPlayComplete',
			value: function onPlayComplete(e) {
				if (!Laya.ILaya.Render.isConchApp || !this.videoElement || !this.videoElement.loop) Laya.ILaya.timer.clear(this, this.renderCanvas);
				this.event("ended");
			}
		}, {
			key: 'load',
			value: function load(url) {
				if (url.indexOf("blob:") == 0) this.videoElement.src = url;else this.htmlVideo.setSource(url, 1);
			}
		}, {
			key: 'play',
			value: function play() {
				this.videoElement.play();
				Laya.ILaya.timer.frameLoop(1, this, this.renderCanvas);
			}
		}, {
			key: 'pause',
			value: function pause() {
				this.videoElement.pause();
				Laya.ILaya.timer.clear(this, this.renderCanvas);
			}
		}, {
			key: 'reload',
			value: function reload() {
				this.videoElement.load();
			}
		}, {
			key: 'canPlayType',
			value: function canPlayType(type) {
				var typeString;
				switch (type) {
					case 1:
						typeString = "video/mp4";
						break;
					case 2:
						typeString = "video/ogg";
						break;
					case 8:
						typeString = "video/webm";
						break;
				}
				return this.videoElement.canPlayType(typeString);
			}
		}, {
			key: 'renderCanvas',
			value: function renderCanvas() {
				if (this.readyState === 0) return;
				this.htmlVideo['updateTexture']();
				this.graphics.clear();
				this.graphics.drawTexture(this.internalTexture, 0, 0, this.width, this.height);
			}
		}, {
			key: 'onDocumentClick',
			value: function onDocumentClick() {
				this.videoElement.play();
				this.videoElement.pause();
				Laya.ILaya.Browser.document.removeEventListener("touchend", this.onDocumentClick);
			}
		}, {
			key: 'size',
			value: function size(width, height) {
				_get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'size', this).call(this, width, height);
				if (Laya.ILaya.Render.isConchApp) {
					var transform = Laya.ILaya.Utils.getTransformRelativeToWindow(this, 0, 0);
					this.videoElement.width = width * transform.scaleX;
				} else {
					this.videoElement.width = width / Laya.ILaya.Browser.pixelRatio;
				}
				if (this.paused) this.renderCanvas();
				return this;
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				var detroyChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				_get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'destroy', this).call(this, detroyChildren);
				this.videoElement.removeEventListener("abort", Video.onAbort);
				this.videoElement.removeEventListener("canplay", Video.onCanplay);
				this.videoElement.removeEventListener("canplaythrough", Video.onCanplaythrough);
				this.videoElement.removeEventListener("durationchange", Video.onDurationchange);
				this.videoElement.removeEventListener("emptied", Video.onEmptied);
				this.videoElement.removeEventListener("error", Video.onError);
				this.videoElement.removeEventListener("loadeddata", Video.onLoadeddata);
				this.videoElement.removeEventListener("loadedmetadata", Video.onLoadedmetadata);
				this.videoElement.removeEventListener("loadstart", Video.onLoadstart);
				this.videoElement.removeEventListener("pause", Video.onPause);
				this.videoElement.removeEventListener("play", Video.onPlay);
				this.videoElement.removeEventListener("playing", Video.onPlaying);
				this.videoElement.removeEventListener("progress", Video.onProgress);
				this.videoElement.removeEventListener("ratechange", Video.onRatechange);
				this.videoElement.removeEventListener("seeked", Video.onSeeked);
				this.videoElement.removeEventListener("seeking", Video.onSeeking);
				this.videoElement.removeEventListener("stalled", Video.onStalled);
				this.videoElement.removeEventListener("suspend", Video.onSuspend);
				this.videoElement.removeEventListener("timeupdate", Video.onTimeupdate);
				this.videoElement.removeEventListener("volumechange", Video.onVolumechange);
				this.videoElement.removeEventListener("waiting", Video.onWaiting);
				this.videoElement.removeEventListener("ended", this.onPlayComplete);
				this.pause();
				this.videoElement.layaTarget = null;
				this.videoElement = null;
				this.htmlVideo.destroy();
			}
		}, {
			key: 'syncVideoPosition',
			value: function syncVideoPosition() {
				var stage = Laya.ILaya.stage;
				var rec;
				rec = Laya.ILaya.Utils.getGlobalPosAndScale(this);
				var a = stage._canvasTransform.a,
				    d = stage._canvasTransform.d;
				var x = rec.x * stage.clientScaleX * a + stage.offset.x;
				var y = rec.y * stage.clientScaleY * d + stage.offset.y;
				this.videoElement.style.left = x + 'px';
				this.videoElement.style.top = y + 'px';
				this.videoElement.width = this.width / Laya.ILaya.Browser.pixelRatio;
				this.videoElement.height = this.height / Laya.ILaya.Browser.pixelRatio;
			}
		}, {
			key: 'buffered',
			get: function get() {
				return this.videoElement.buffered;
			}
		}, {
			key: 'currentSrc',
			get: function get() {
				return this.videoElement.currentSrc;
			}
		}, {
			key: 'currentTime',
			get: function get() {
				return this.videoElement.currentTime;
			},
			set: function set(value) {
				this.videoElement.currentTime = value;
				this.renderCanvas();
			}
		}, {
			key: 'volume',
			set: function set(value) {
				this.videoElement.volume = value;
			},
			get: function get() {
				return this.videoElement.volume;
			}
		}, {
			key: 'readyState',
			get: function get() {
				return this.videoElement.readyState;
			}
		}, {
			key: 'videoWidth',
			get: function get() {
				return this.videoElement.videoWidth;
			}
		}, {
			key: 'videoHeight',
			get: function get() {
				return this.videoElement.videoHeight;
			}
		}, {
			key: 'duration',
			get: function get() {
				return this.videoElement.duration;
			}
		}, {
			key: 'ended',
			get: function get() {
				return this.videoElement.ended;
			}
		}, {
			key: 'error',
			get: function get() {
				return this.videoElement.error;
			}
		}, {
			key: 'loop',
			get: function get() {
				return this.videoElement.loop;
			},
			set: function set(value) {
				this.videoElement.loop = value;
			}
		}, {
			key: 'x',
			set: function set(val) {
				_set(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'x', val, this);
				if (Laya.ILaya.Render.isConchApp) {
					var transform = Laya.ILaya.Utils.getTransformRelativeToWindow(this, 0, 0);
					this.videoElement.style.left = transform.x;
				}
			},
			get: function get() {
				return _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'x', this);
			}
		}, {
			key: 'y',
			set: function set(val) {
				_set(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'y', val, this);
				if (Laya.ILaya.Render.isConchApp) {
					var transform = Laya.ILaya.Utils.getTransformRelativeToWindow(this, 0, 0);
					this.videoElement.style.top = transform.y;
				}
			},
			get: function get() {
				return _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'y', this);
			}
		}, {
			key: 'playbackRate',
			get: function get() {
				return this.videoElement.playbackRate;
			},
			set: function set(value) {
				this.videoElement.playbackRate = value;
			}
		}, {
			key: 'muted',
			get: function get() {
				return this.videoElement.muted;
			},
			set: function set(value) {
				this.videoElement.muted = value;
			}
		}, {
			key: 'paused',
			get: function get() {
				return this.videoElement.paused;
			}
		}, {
			key: 'preload',
			get: function get() {
				return this.videoElement.preload;
			},
			set: function set(value) {
				this.videoElement.preload = value;
			}
		}, {
			key: 'seekable',
			get: function get() {
				return this.videoElement.seekable;
			}
		}, {
			key: 'seeking',
			get: function get() {
				return this.videoElement.seeking;
			}
		}, {
			key: 'width',
			set: function set(value) {
				if (Laya.ILaya.Render.isConchApp) {
					var transform = Laya.ILaya.Utils.getTransformRelativeToWindow(this, 0, 0);
					this.videoElement.width = value * transform.scaleX;
				} else {
					this.videoElement.width = this.width / Laya.ILaya.Browser.pixelRatio;
				}
				_set(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'width', value, this);
				if (this.paused) this.renderCanvas();
			},
			get: function get() {
				return _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'width', this);
			}
		}, {
			key: 'height',
			set: function set(value) {
				if (Laya.ILaya.Render.isConchApp) {
					var transform = Laya.ILaya.Utils.getTransformRelativeToWindow(this, 0, 0);
					this.videoElement.height = value * transform.scaleY;
				} else {
					this.videoElement.height = this.height / Laya.ILaya.Browser.pixelRatio;
				}
				_set(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'height', value, this);
			},
			get: function get() {
				return _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'height', this);
			}
		}], [{
			key: 'onAbort',
			value: function onAbort(e) {
				e.target.layaTarget.event("abort");
			}
		}, {
			key: 'onCanplay',
			value: function onCanplay(e) {
				e.target.layaTarget.event("canplay");
			}
		}, {
			key: 'onCanplaythrough',
			value: function onCanplaythrough(e) {
				e.target.layaTarget.event("canplaythrough");
			}
		}, {
			key: 'onDurationchange',
			value: function onDurationchange(e) {
				e.target.layaTarget.event("durationchange");
			}
		}, {
			key: 'onEmptied',
			value: function onEmptied(e) {
				e.target.layaTarget.event("emptied");
			}
		}, {
			key: 'onError',
			value: function onError(e) {
				e.target.layaTarget.event("error");
			}
		}, {
			key: 'onLoadeddata',
			value: function onLoadeddata(e) {
				e.target.layaTarget.event("loadeddata");
			}
		}, {
			key: 'onLoadedmetadata',
			value: function onLoadedmetadata(e) {
				e.target.layaTarget.event("loadedmetadata");
			}
		}, {
			key: 'onLoadstart',
			value: function onLoadstart(e) {
				e.target.layaTarget.event("loadstart");
			}
		}, {
			key: 'onPause',
			value: function onPause(e) {
				e.target.layaTarget.event("pause");
			}
		}, {
			key: 'onPlay',
			value: function onPlay(e) {
				e.target.layaTarget.event("play");
			}
		}, {
			key: 'onPlaying',
			value: function onPlaying(e) {
				e.target.layaTarget.event("playing");
			}
		}, {
			key: 'onProgress',
			value: function onProgress(e) {
				e.target.layaTarget.event("progress");
			}
		}, {
			key: 'onRatechange',
			value: function onRatechange(e) {
				e.target.layaTarget.event("ratechange");
			}
		}, {
			key: 'onSeeked',
			value: function onSeeked(e) {
				e.target.layaTarget.event("seeked");
			}
		}, {
			key: 'onSeeking',
			value: function onSeeking(e) {
				e.target.layaTarget.event("seeking");
			}
		}, {
			key: 'onStalled',
			value: function onStalled(e) {
				e.target.layaTarget.event("stalled");
			}
		}, {
			key: 'onSuspend',
			value: function onSuspend(e) {
				e.target.layaTarget.event("suspend");
			}
		}, {
			key: 'onTimeupdate',
			value: function onTimeupdate(e) {
				e.target.layaTarget.event("timeupdate");
			}
		}, {
			key: 'onVolumechange',
			value: function onVolumechange(e) {
				e.target.layaTarget.event("volumechange");
			}
		}, {
			key: 'onWaiting',
			value: function onWaiting(e) {
				e.target.layaTarget.event("waiting");
			}
		}]);

		return Video;
	}(Laya.Sprite);

	Video.MP4 = 1;
	Video.OGG = 2;
	Video.CAMERA = 4;
	Video.WEBM = 8;
	Video.SUPPORT_PROBABLY = "probably";
	Video.SUPPORT_MAYBY = "maybe";
	Video.SUPPORT_NO = "";

	var Gyroscope = function (_Laya$EventDispatcher3) {
		_inherits(Gyroscope, _Laya$EventDispatcher3);

		function Gyroscope(singleton) {
			_classCallCheck(this, Gyroscope);

			var _this7 = _possibleConstructorReturn(this, (Gyroscope.__proto__ || Object.getPrototypeOf(Gyroscope)).call(this));

			_this7.onDeviceOrientationChange = _this7.onDeviceOrientationChange.bind(_this7);
			return _this7;
		}

		_createClass(Gyroscope, [{
			key: 'on',
			value: function on(type, caller, listener) {
				var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				_get(Gyroscope.prototype.__proto__ || Object.getPrototypeOf(Gyroscope.prototype), 'on', this).call(this, type, caller, listener, args);
				Laya.ILaya.Browser.window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
				return this;
			}
		}, {
			key: 'off',
			value: function off(type, caller, listener) {
				var onceOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

				if (!this.hasListener(type)) Laya.ILaya.Browser.window.removeEventListener('deviceorientation', this.onDeviceOrientationChange);
				return _get(Gyroscope.prototype.__proto__ || Object.getPrototypeOf(Gyroscope.prototype), 'off', this).call(this, type, caller, listener, onceOnly);
			}
		}, {
			key: 'onDeviceOrientationChange',
			value: function onDeviceOrientationChange(e) {
				Gyroscope.info.alpha = e.alpha;
				Gyroscope.info.beta = e.beta;
				Gyroscope.info.gamma = e.gamma;
				if (e.webkitCompassHeading) {
					Gyroscope.info.alpha = e.webkitCompassHeading * -1;
					Gyroscope.info.compassAccuracy = e.webkitCompassAccuracy;
				}
				this.event(Laya.Event.CHANGE, [e.absolute, Gyroscope.info]);
			}
		}], [{
			key: 'instance',
			get: function get() {
				Gyroscope._instance = Gyroscope._instance || new Gyroscope(0);
				return Gyroscope._instance;
			}
		}]);

		return Gyroscope;
	}(Laya.EventDispatcher);

	Gyroscope.info = new RotationInfo();

	exports.AccelerationInfo = AccelerationInfo;
	exports.Accelerator = Accelerator;
	exports.Geolocation = Geolocation;
	exports.GeolocationInfo = GeolocationInfo;
	exports.Gyroscope = Gyroscope;
	exports.HtmlVideo = HtmlVideo;
	exports.Media = Media;
	exports.RotationInfo = RotationInfo;
	exports.Shake = Shake;
	exports.Video = Video;
	exports.WebGLVideo = WebGLVideo;
})(window.Laya = window.Laya || {}, Laya);
