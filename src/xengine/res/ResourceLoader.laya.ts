import { ResourceLoader } from "./ResourceLoader";
import { Resource } from "./Resource";

class LayaResourceLoader extends ResourceLoader {

	protected load_res(url: string, type: string): Promise<Resource> {
		return new Promise((resolve, reject) => {
			Laya.loader.load(url, Laya.Handler.create(null, ()=>{
				resolve(new Resource(url, Laya.loader.getRes(url), this));
			}), undefined, type);
		});
	}

	/** 销毁资源 */
	dispose(res: Resource) {
		Laya.loader.clearRes(res.url);
	}
}

export class DefaultResourceLoader extends LayaResourceLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, undefined);
	}
}

export class BinaryLoader extends LayaResourceLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, Laya.Loader.BUFFER);
	}
}

export class TextureLoader extends LayaResourceLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, undefined);
	}
}

export class SoundLoader extends LayaResourceLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, Laya.Loader.SOUND);
	}
}

export class JSONLoader extends LayaResourceLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, Laya.Loader.JSON);
	}
}


interface ILayaNodeLoader extends Function {
	load(url: string, complete: Laya.Handler)
}

export class LayaSpatialLoader extends ResourceLoader {
	protected load_res(url: string, type: ILayaNodeLoader): Promise<Resource> {
		return new Promise((resolve, reject) => {
			type.load(url, Laya.Handler.create(null, (ret)=> {
				resolve(new Resource(url, ret, this));
			}));
		});
	}

	/** 销毁资源 */
	dispose(res: Resource) {
		Laya.loader.clearRes(res.url);
	}
}


export class LayaScene3DLoader extends LayaSpatialLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, Laya.Scene3D);
	}
}

export class LayaSprite3DLoader extends LayaSpatialLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, Laya.Sprite3D);
	}
}

export class LayaTexture2DLoader extends LayaSpatialLoader {
	load(url: string): Promise<Resource> {
		return this.load_res(url, Laya.Texture2D);
	}
}
