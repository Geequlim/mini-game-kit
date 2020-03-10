import { EventDispatcher } from "xengine/events/EventDispatcher";

export default class LayaHttp extends EventDispatcher {
	/** 超时时间（秒） */
	timeout: number = 10;

	constructor() {
		super();
	}

	get(url: string, headers?: string[]) {
		return new Promise((resolve, reject) => {
			let xhr: Laya.HttpRequest = new Laya.HttpRequest();
			xhr.http.timeout = this.timeout * 1000;

			const callbacks = {
				completeHandler: (res)=>{
					if (typeof(res) === 'string' && (res.startsWith('{') || res.startsWith("["))) {
						resolve(JSON.parse(res));
					} else {
						resolve(res);
					}
				},
				errorHandler: (err)=> {
					reject(err);
				}
			};
			xhr.once(Laya.Event.COMPLETE, callbacks, callbacks.completeHandler);
			xhr.once(Laya.Event.ERROR, callbacks, callbacks.errorHandler);
			xhr.send(url);
		});
	}

	async post(url: string, body?: object, headers: string[] = ["Content-Type", "application/json"]) {
		return new Promise((resolve, reject) => {
			let xhr: Laya.HttpRequest = new Laya.HttpRequest();
			xhr.http.timeout = this.timeout * 1000;
			const callbacks = {
				completeHandler: (res)=>{
					resolve(res);
				},
				errorHandler: (err)=> {
					reject(err);
				}
			};
			xhr.once(Laya.Event.COMPLETE, callbacks, callbacks.completeHandler);
			xhr.once(Laya.Event.ERROR, callbacks, callbacks.errorHandler);
			let raw_body = typeof(body) === 'object' ? JSON.stringify(body) : body;
			xhr.send(url, raw_body, 'post', 'json', headers);
		});
	}
};
