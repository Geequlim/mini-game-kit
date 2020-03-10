import Module, { game_module } from "xengine/game/Module";
import { Handler } from "xengine/events/Handler";

@game_module('daily')
export default class DailyTask extends Module {

	protected last_run_task_time = 0;
	protected tasks: Handler[] = [];
	protected records: number[] = [];

	constructor(options?: any) {
		super(options);
	}

	protected daily_check() {
		let date  = new Date(this.last_run_task_time);
		let today = new Date(this.now);
		return date.getFullYear() != today.getFullYear() || date.getMonth() != today.getMonth() || date.getDay() != today.getDay();
	}

	start() {
		if (this.daily_check()) {
			for (const h of this.tasks) {
				h.run();
			}
			this.last_run_task_time = this.now;
			this.records.push(this.last_run_task_time);
		}
	}


	add_daily_task(handler: Handler) {
		this.tasks.push(handler);
	}

	/** 一共运行过多少天（累计启动游戏的天数） */
	get_total_run_count(): number {
		return this.records.length;
	}

	/** 最近连续运行多少天(连续进入游戏的天数) */
	get_continuous_run_count(): number {
		let ret = 1;
		if (this.records.length > 1) {
			let next_day = this.records[this.records.length - 1];
			for (let i = this.records.length - 2; i >= 0; i--) {
				let cur_day = this.records[i];
				const duration = next_day - cur_day;
				if (duration > 1000 * 60 * 60 * 24) {
					break;
				} else {
					ret += 1;
					next_day = cur_day;
				}
			}
		}
		return ret;
	}

	/** 现在时刻（s） */
	get now(): number {
		return new Date().getTime();
	}

	save() {
		return {
			records: this.records
		};
	}

	load(data) {
		this.records = data.records;
		if (this.records && this.records.length) {
			this.last_run_task_time = this.records[this.records.length - 1];
		}
	}

}
