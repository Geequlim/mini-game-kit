import { path } from "../utils/path";
import { EventDispatcher } from "../events/EventDispatcher";
import {ResourceLoader, ResourceLoaderClass } from "./ResourceLoader";
import { Resource } from "./Resource";

/** 白鹭引擎 `RES` 适配器 */
interface EgreResManagerAdapter {
	getRes(filename: string): any;
}

/** 资源管理器错误类型 */
export class ResourceManagerError extends Error {};

/** 资源管理器 */
export class ResourceManager extends EventDispatcher implements EgreResManagerAdapter {

	/** 资源缓存池 */
	protected cache = new Map<string, Resource>();
	/** 资源加载器（通过文件拓展名查找） */
	protected loaders = new Map<string, ResourceLoader>();

	/** 基础资源路径 */
	private _base_url : string = "";
	public get base_url() : string {
		return this._base_url;
	}
	public set base_url(v : string) {
		if (v && !v.endsWith('/')) {
			this._base_url = v + '/';
		} else {
			this._base_url = v;
		}
	}

	/** 获取完整 URL*/
	public get_url(path: string): string {
		let prefix = this.base_url;
		return `${prefix}${path}`;
	}

	constructor() {
		super();
	}

	/**
	 * 注册资源加载器
	 * @param extensions 拓展名
	 * @param loader 资源加载器
	 */
	register_loader(extensions: Set<string>, loader: ResourceLoaderClass) {
		for (const ext of extensions) {
			this.loaders.set(ext, loader.prototype);
		}
	}

	/**
	 * 从缓存中获取资源，未加载到缓存中的资源返回 null
	 * @param file 资源路径
	 */
	get_resource(file: string): Resource {
		return this.cache.get(this.get_url(file));
	}

	/**
	 * 异步加载资源
	 * @param file 资源文件路径
	 * @param cache 是否缓存资源
	 * @param ignore_cache 是否忽略资源缓存执行强制加载
	 */
	async load(file: string, cache = true, ignore_cache = false) {

		let url = this.get_url(file);

		let data: Resource = this.cache.get(url);
		if (!ignore_cache && data) {
			return data;
		}

		const ext = path.extension(url).toLowerCase();
		const loader = this.loaders.get(ext);
		if (loader) {
			const data = await loader.load(url);
			if (data) {
				if (cache) this.cache.set(url, data);
				return data;
			} else {
				throw new ResourceManagerError("Invalid resouce data for file " + url);
			}
		} else {
			throw new ResourceManagerError("No loader found for file extension " + ext);
		}
	}

	/**
	 * 释放资源缓存池中的资源
	 * @param path 资源路径
	 */
	release(path_or_res: string | Resource) {
		let url = '';
		if (typeof(path_or_res) === 'string') {
			url = this.get_url(path_or_res);
		} else if (path_or_res instanceof Resource) {
			url = path_or_res.url;
		}
		if (this.cache.has(url)) {
			this.dispose(this.cache.get(url));
			this.cache.delete(url);
			return true;
		}
		return false;
	}

	/**
	 * 销毁资源
	 * @param res 要销毁的资源对象
	 */
	dispose(res: Resource) {
		if (res && res.loader) {
			res.loader.dispose(res);
		}
	}

	/** 通过资源名获取资源，实现 `EgreResManagerAdapter`
	 * 在资源缓存池中查找资源缓存不会进行任何加载操作，如果缓存池中不存在对应的资源则返回 `null`
	 */
	getRes(filename: string): any {
		for (const file of this.cache.keys()) {
			let ext = `.${path.extension(file)}`;
			let cur_file = path.basename(file).replace(ext, '');
			if (cur_file == filename) {
				return this.cache.get(file).native_data;
			}
		}
		return null;
	}
}
