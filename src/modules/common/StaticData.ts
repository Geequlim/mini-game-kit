import Module, { game_module } from "xengine/game/Module";
/**
 * 配置表数据模块
 *
 * 可以快速加载 https://github.com/Geequlim/excel-tools 转出的配表数据
 */
@game_module('data')
export class StaticData extends Module {
	protected _data_depot = {};
	private _config_loaded = false;

	constructor() {
		super();
		const resList = Object.keys(this.get_res_member_map());
		if (resList.length) {
			this._config_loaded = false;
			Laya.loader.load(resList, Laya.Handler.create(this, this.on_config_loaded));
		} else {
			this._config_loaded = true;
		}
	}

	protected on_config_loaded(ret: boolean) {
		const resMemberMap = this.get_res_member_map();
		for (const path in resMemberMap) {
			const membeName = resMemberMap[path];
			const dataList: any[] = Laya.loader.getRes(path);
			this[membeName] = dataList;
			if (dataList && dataList.length) {
				for (const row of dataList) {
					if (row && row.id) this._data_depot[row.id] = row;
				}
			}
		}
		this._config_loaded = ret;
	}

	//* 获取配表文件与成员名对照表 */
	protected get_res_member_map(): Object {
		return {};
	}


	/** 通过ID查找配表数据  */
	public get_config_by_id(id: any) {
		return this._data_depot[id];
	}

	is_ready(): boolean {
		return this._config_loaded;
	}

}
