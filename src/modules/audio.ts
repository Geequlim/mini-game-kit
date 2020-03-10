import Module, { game_module } from "xengine/game/Module";
import XEngine from "xengine/XEngine";
import Game, {Events as GameEvents} from "xengine/game/Game";
const DEFAULT_BGM_NAME = "背景音乐";

@game_module('audio')
export class AudioModule extends Module {



	private _sound_enabled : boolean = true;
	public get sound_enabled() : boolean { return this._sound_enabled; }
	public set sound_enabled(v : boolean) {
		this._sound_enabled = v;
		if (v) {
			this.play_background_music(DEFAULT_BGM_NAME);
		} else {
			this.stop_background_music();
		}
	}

	vibrate_enabled = true;

	private frame_audio_count = 0;
	private frame_vibrate_count = 0;

	protected loaded = false;
	protected audio_cache = new Map<string, any>();
	protected audio_urls = new Map<string, string>();
	protected sound_index = {};

	constructor() {
		super();
		window['audio'] = this;
		this.preload();
	}

	initialize() {
		Game.inst.on(GameEvents.APP_ENTER_FOREGROUND, this, ()=>{
			this.play_background_music(DEFAULT_BGM_NAME);
		});
		Game.inst.on(GameEvents.APP_ENTER_BACKGROUND, this, ()=>{
			this.stop_background_music();
		});
	}

	async preload() {
		const res = await XEngine.inst.res.load('assets/sounds/index.json');
		if (res.native_data) {
			this.loaded = true;
			this.sound_index = res.native_data;
			for (const key in res.native_data) {
				const file = res.native_data[key];
				if (file) {
					this.audio_urls.set(key, `assets/sounds/${file}`);
					const sound = await XEngine.inst.res.load(`assets/sounds/${file}`);
					this.audio_cache.set(key, sound.native_data);
					if (key === DEFAULT_BGM_NAME) {
						this.play_background_music(key);
					}
				}
			}
		}

	}

	is_ready() {
		return this.loaded;
	}

	play_effect(id: string) {
		let ret = undefined;
		const sound = this.audio_cache.get(id);
		if (sound) {
			if (this.frame_audio_count) return;
			if (this.sound_enabled) {
				if (sound && sound.url) {
					ret = Laya.SoundManager.playSound(sound.url, 1);
				} else if (typeof sound === 'string' && sound.length < 128) {
					ret = Laya.SoundManager.playSound(sound, 1);
				} else if (this.audio_urls.get(id)){
					ret = Laya.SoundManager.playSound(this.audio_urls.get(id), 1);
				} else {
					console.error("不存在音效", id);
				}
			}
		} else if (this.audio_urls.get(id)){
			ret = Laya.SoundManager.playSound(this.audio_urls.get(id), 1);
		} else {
			console.error("不存在音效", id);
		}
		this.frame_audio_count += 1;
		return ret;
	}

	play_random_one(effect_id: string[]) {
		if (effect_id && effect_id.length) {
			this.play_effect(effect_id[Math.floor(Math.random() * effect_id.length)]);
		}
	}

	vibrate() {
		if (this.vibrate_enabled) {
			if (this.frame_vibrate_count) return;
			if (typeof wx !== 'undefined') {
				wx.vibrateShort({} as any);
			} else if (typeof qg !== 'undefined') {
				qg.vibrateShort({} as any);
			}
		}
		this.frame_vibrate_count += 1;
	}

	save() {
		return {
			sound_enabled: this.sound_enabled,
			vibrate_enabled: this.vibrate_enabled,
		}
	}

	load(data) {
		this.sound_enabled = data.sound_enabled;
		this.vibrate_enabled = data.vibrate_enabled;
	}

	always_update(dt: number) {
		this.frame_audio_count = 0;
		this.frame_vibrate_count = 0;
	}

	public play_background_music(name: string) {
		if (this.sound_enabled) {
			Laya.SoundManager.stopMusic();
			let sound = this.audio_cache.get(name);
			if (sound && sound.url) {
				Laya.SoundManager.playMusic(sound.url, 0);
			} else {
				Laya.SoundManager.playMusic(this.audio_urls.get(name), 0);
			}
		}
	}

	public stop_background_music() {
		Laya.SoundManager.stopMusic();
	}

}
