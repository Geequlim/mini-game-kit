/** 支付方式 */
export enum PayType {
	/** 游戏币 */
	FREE = 0,
	/** 分享 */
	SHARE = 1,
	/** 激励视频 */
	REWARD_VIDEO = 2,
	/** 充值计费 */
	PURCHURS = 3.
};


export enum PayPoint {
	RELIVE = "RELIVE",
	DOUBLE_REWARD = "DOUBLE_REWARD",
}
const pay_types: {[key: string]: PayType} = {};

/** 获取计费方式 */
export function get_pay_type(point: PayPoint) {
	return pay_types[point] || PayType.FREE;
}

/** 设置计费方式 */
export function load_pay_types(configs: {[key: string]: PayType}) {
	for (const key in configs) {
		pay_types[key] = configs[key];
	}
}
