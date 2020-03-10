import { ResourceLoader } from "./ResourceLoader";
import { Resource } from "./Resource";

export class TextureLoader extends ResourceLoader {
	load(url: string): Promise<Resource>{
		let loader = new egret.ImageLoader();
		let promise: Promise<Resource> = new Promise((resolve, reject) => {
			loader.once(egret.Event.COMPLETE, ()=> {
				let texture = new egret.Texture();
				texture.bitmapData = loader.data;
				resolve(new Resource(url, texture, this));
			}, null);
			loader.once(egret.IOErrorEvent.IO_ERROR, ()=> reject(), null);
		});
		loader.load(url);
		return promise;
	}
}

export class BinaryLoader extends ResourceLoader {
	load(url: string): Promise<Resource>{
		let loader = new egret.URLLoader();
		loader.dataFormat = egret.URLLoaderDataFormat.BINARY;

		let promise: Promise<Resource> = new Promise((resolve, reject) => {
			loader.once(egret.Event.COMPLETE, ()=> resolve(new Resource(url, loader.data, this)), null);
			loader.once(egret.IOErrorEvent.IO_ERROR, ()=> reject(), null);
		});
		loader.load(new egret.URLRequest(url));
		return promise;
	}
}

export class DefaultResourceLoader extends ResourceLoader {
	// TODO
}

export class SoundLoader extends ResourceLoader {
	// TODO
}

export class JSONLoader extends ResourceLoader {
	// TODO
}
