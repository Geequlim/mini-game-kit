import { EventDispatcher } from "../events/EventDispatcher";
import { Resource } from "./Resource";


/** 资源管理器错误类型 */
export class ResourceLoaderError extends Error {};

/** 资源加载器类 */
export type ResourceLoaderClass = new() => ResourceLoader;

/** 资源加载器 */
export class ResourceLoader extends EventDispatcher {

	/** 执行加载 */
	load(url: string): Promise<Resource> {
		return new Promise((resolve, reject) => {
			reject(new ResourceLoaderError("Undefined loader for " + url));
		});
	}

	/** 销毁资源 */
	dispose(res: Resource) {
		console.warn("Undefined dispose method for resource type", this);
	}
}
