import Module, { game_module } from "xengine/game/Module";

export enum Events {
	POINT_CHANGED = 'POINT_CHANGED',
}

/**
 * 游戏点数，可用于如 体力 金币 等相关的数值记录
 */
@game_module('point')
export default class GamePoint extends Module {

	private _point : number = 0;
	/** 点数数目 */
	public get point() : number { return this._point; }
	public set point(v : number) {
		if (v != this._point) {
			this._point = v;
			const amount = v - this._point;
			this.event(Events.POINT_CHANGED, amount);
		}
	}

	/**
	 * 消耗点数
	 * @param amount 消耗数量
	 */
	cost(amount: number) {
		if (this._point >= amount) {
			this.point -= amount;
			return true;
		}
		return false
	}

	/** 充值点数 */
	charge(amount: number) {
		this.point += amount;
		return false
	}

	save() {
		return { point: this.point };
	}

	load(data) {
		this.point = data.point;
	}

}
