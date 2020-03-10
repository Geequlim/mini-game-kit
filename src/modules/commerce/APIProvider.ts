import { EventDispatcher } from "xengine/events/EventDispatcher";
import * as queryString from "query-string";
import xhttp from "xengine/utils/xhttp";
import { UserInfo, ShareConfig } from "modules/platform/platform";
export type RequetMethod = 'get' | 'post';

export interface FloadAdItem {
	id: any;
	title: string;
	icon: string;
	url: string;
	location_id:number;
	location_flg:string;
	data?: any;
}

export default class APIProvider extends EventDispatcher {
	readonly gameid: string;
	readonly base_url: string;

	protected user_info: UserInfo = null;
	protected float_ads: FloadAdItem[] = [];
	protected share_info: ShareConfig = null;

	/** 在线配置项 */
	online_config : any = null;

	constructor(gameid: string) {
		super();
		this.gameid = gameid;
	}

	async initialize() {

	}

	async login(token: string): Promise<UserInfo> {
		return null;
	}

	get_user_info() {
		return this.user_info;
	}

	/** 执行网络请求 */
	async request(method: RequetMethod, api: string, body?: object) {
		let url = api.startsWith("http://") || api.startsWith("https://") ? api : this.base_url + api;
		let response = undefined;
		switch (method) {
			case 'post':
				response = await xhttp.post(url, body);
				break;
			default:
			case 'get': {
				const query = queryString.stringify(body);
				url += query ? `?${query}`: '';
				response = await xhttp.get(url);
			}
		}
		return this.parse_request_response(method, api, url, response);
	}

	/** 解析请求的相应结果 */
	protected parse_request_response(method: RequetMethod, api: string, url: string, response: any) {
		return response;
	}

	/** 广告配置列表 */
	get_float_ads(flg:string,id:number): FloadAdItem[] {
		return this.float_ads.filter(item=> item.location_flg == flg && item.location_id == id);
	}

	/** 点击广告回调 */
	async click_float_ad_item(item: FloadAdItem) {}
	/** 分享回调 */
	async share_callback(data: ShareConfig) {}
}

export type ProviderCls = new(gameid: string) => APIProvider;

/** 定义对话框 */
export function provider(uid: string) {
	return function(target: ProviderCls) {
		target.prototype.uid = uid;
	}
}
