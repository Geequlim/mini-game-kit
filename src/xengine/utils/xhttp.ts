import LayaHttp from "./xhttp.laya";

interface XHttp {
	timeout: number;
	get(url: string, headers?: string[]): Promise<any>;
	post(url: string, body?: object, headers?: string[]): Promise<any>;
}

export default (function(){
	let xhttp: XHttp = null;
	if (typeof(Laya) !== 'undefined') xhttp = new LayaHttp();
	return xhttp;
})();
