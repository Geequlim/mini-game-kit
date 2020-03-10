import { HashObject, Nullable } from "xengine/events/HashObject";

interface TimerItem {
	interval: number;
	repeat: number;
	callback: Function;
	run_time?: number;
	run_count?: number;
}

/**
 * 定时器调度类
 */
export class Timer extends HashObject {

	private _time = 0;
	timers: TimerItem[] = [];

	/** 执行帧更新 */
	update(dt) {
		this._time += dt;

		let removal_items: TimerItem[] = [];
		for (const timer of this.timers) {
			if (this._time > timer.run_time) {
				timer.callback();
				timer.run_count = timer.run_count ? timer.run_count + 1 : 1;
				if (timer.repeat >= 0 && timer.run_count >= timer.repeat) {
					removal_items.push(timer);
				} else {
					timer.run_time = this.tick + timer.interval;
				}
			}
		}
		if (removal_items.length) {
			this.timers = this.timers.filter(t => removal_items.indexOf(t) == -1);
		}
	}

	/**
	 * 定时重复执行
	 *
	 * @param {number} interval 时间间隔
	 * @param {number} count 执行次数，小于`0`的值表示无限重复执行
	 * @param {Function} callback 执行的回调
	 * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
	 * @memberof Timer
	 */
	repeat(interval: number, count: number, callback: Function): Nullable<TimerItem> {
		if (callback) {
			const item = {
				interval,
				callback,
				repeat: count,
				run_time: this.tick + interval,
			};
			this.timers.push(item);
			return item;
		}
		return null;
	}

	/**
	 * 执行定时循环任务
	 *
	 * @param {number} interval 时间间隔
	 * @param {Function} callback 执行的回调
	 * @param {*} [time=-1] 执行次数，小于`0`的值表示无限重复执行
	 * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
	 * @memberof Timer
	 */
	loop(interval: number, callback: Function, time = -1): Nullable<TimerItem> {
		return this.repeat(interval, time, callback);
	}

	/**
	 * 定时执行一次
	 *
	 * @param {number} delay 延时
	 * @param {Function} callback 执行的回调
	 * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
	 * @memberof Timer
	 */
	once(delay: number, callback: Function): Nullable<TimerItem> {
		return this.repeat(delay, 0, callback);
	}

	/** 下一次定时器迭代时执行 */
	call_later(callback: Function) {
		this.once(0, callback);
	}

	/**
	 * 每帧执行一次
	 * @param callback 执行的回调
	 * @returns {Nullable<TimerItem>} 返回启动成功的定时器，可用于取消任务
	 */
	frame_loop(callback: Function): Nullable<TimerItem> {
		return this.repeat(0, -1, callback);
	}

	/** 移除定时器, 返回是否存在并成功移除该定时器 */
	cancel(timer: TimerItem) {
		const idx = this.timers.indexOf(timer);
		if (idx != -1) {
			this.timers.splice(idx, 1);
			return true;
		}
		return false;
	}

	/** 获取该定时器启动时长 */
	get tick(): number {
		return this._time;
	}

	/** 等待 */
	wait(delay: number): Promise<void> {
		return new Promise((resolve, reject) => {
			this.once(delay, ()=> resolve());
		});
	}

	/** 清空所有定时器 */
	clear() {
		this.timers = [];
	}
}
