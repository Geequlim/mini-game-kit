import { ADUnit } from "../ADManager";
import { FloadAdItem } from "../APIProvider";
import Game from "xengine/game/Game";
import CommerceModule from "../CommerceModule";
import { Vector2 } from "xengine/utils/math";
import UI_float_ad_item from "view/raw/Yunqu/UI_float_ad_item";
import UI_center_ad_item from "view/raw/Yunqu/UI_center_ad_item";
import UI_ZSelf_float_ad_item from "view/raw/ZSelf/UI_ZSelf_float_ad_item";
import UI_ZSelf_center_ad_item from "view/raw/ZSelf/UI_ZSelf_center_ad_item";
import SelfProvider from "./SelfProvider";
import UI_ZSelf_HotGamesAd from "view/raw/ZSelf/UI_ZSelf_HotGamesAd";
import UI_ZSelf_FloatAd from "view/raw/ZSelf/UI_ZSelf_FloatAd";
import UI_ZSelf_FloatAdBottom from "view/raw/ZSelf/UI_ZSelf_FloatAdBottom";
import XEngine from "xengine/XEngine";

export class SelfAdUnit extends ADUnit {

	parent_node: fairygui.GComponent = null;
	location: number = 0;
	flag: string = "";
	ads: Array<FloadAdItem> = [];

	get parent_container(): fairygui.GComponent {
		return this.parent_node || fairygui.GRoot.inst;
	}


	constructor(locationID: number, locationFlag: string, max_ad_count = 10) {
		super(locationFlag);
		this.location = locationID;
	}

	/** 创建广告 */
	async instance() {
		this.ads = Game.inst.get_module<CommerceModule>(CommerceModule).get_provider(SelfProvider).get_float_ads(this.flag, this.location);
	}

	protected render_item(index: number,item: UI_ZSelf_float_ad_item | UI_ZSelf_center_ad_item) {
		item.data = index;
		item.m_icon_item.m_icon.url = this.ads[index].icon;
		item.title = this.ads[index].title;
		item.m_red.visible = false;
		if (item instanceof UI_ZSelf_center_ad_item) {
			item.m_count.text = this.ads[index].data.ad_count + '人玩';
		}
	}

	async show(pos?: Vector2) {

	}

	protected on_item_click(item: UI_float_ad_item | UI_center_ad_item) {
		var ad = this.ads[item.data as number];
		this.on_ad_item_clicked(ad);
	}

	protected on_ad_item_clicked(item: FloadAdItem) {
		Game.inst.get_module<CommerceModule>(CommerceModule)['providers']['self'].click_float_ad_item(item);
	}
}

export class SelfHotGameFloatAd extends SelfAdUnit {
	showing_ad: FloadAdItem = null;
	native_ad: UI_ZSelf_HotGamesAd = null;

	async instance() {
		this.native_ad = UI_ZSelf_HotGamesAd.createInstance();
		this.native_ad.setXY(Laya.stage.width - this.native_ad.width - 20, 300);
		this.native_ad.onClick(null, ()=>{
			this.on_ad_item_clicked(this.showing_ad);
			// this.update_item();
		});
	}

	update_item() {
		const ads = this.ads;
		if (ads.length) {
			let idx = ads.indexOf(this.showing_ad) + 1;
			if (idx >= ads.length) idx = 0;
			this.showing_ad = ads[idx];
		}
		if (this.showing_ad) {
			this.native_ad.m_ic.m_icon.url = this.showing_ad.icon;
		}
	}

	async show(pos?: Vector2) {
		if (!this.ads || !this.ads.length) {
			this.ads = Game.inst.get_module<CommerceModule>(CommerceModule).get_provider(SelfProvider).get_float_ads(this.flag, this.location);
		}
		if (this.native_ad && this.ads.length) {
			this.native_ad.removeFromParent();
			this.parent_container.addChild(this.native_ad);
			this.update_item();
			Laya.timer.loop(30000, this, this.update_item);
		}
	}

	async hide() {
		if (this.native_ad) {
			this.native_ad.removeFromParent();
			Laya.timer.clear(this, this.update_item);
		}
	}
}

export class SelfBigBannerAd extends SelfAdUnit {

	native_ads: UI_ZSelf_FloatAd = null;
	bg_style: 0 | 1 = 0;
	item_style: 0 | 1 | 2 = 2;
	start_index = 0;
	showing_ads: FloadAdItem[] = [];
	/** 最多同时展示数量 */
	max_item_count = 0;
	// 是否开启滚动
	scroll = false;
	// 滚动间隔
	scroll_interval = 1.2;

	async instance() {
		await super.instance();
		this.native_ads = UI_ZSelf_FloatAd.createInstance();
		this.native_ads.m_list.setVirtual();
		this.native_ads.m_list.itemRenderer = Laya.Handler.create(this, this.render_item, undefined, false);
		this.native_ads.m_list.on(fairygui.Events.CLICK_ITEM,this,this.on_item_click);
		this.native_ads.m_show_bg.selectedIndex = this.bg_style;
	}

	async show(pos?: Vector2) {
		if (this.native_ads) {

			if (!this.ads || !this.ads.length) {
				this.ads = Game.inst.get_module<CommerceModule>(CommerceModule).get_provider(SelfProvider).get_float_ads(this.flag, this.location);
			}

			const page_count = this.max_item_count || this.ads.length;
			if (page_count < this.ads.length) { // 开启轮换展示机制
				this.start_index += page_count;
				if (this.start_index >= this.ads.length) {
					this.start_index -= this.ads.length;
				}
			} else {
				this.start_index = 0;
			}

			this.native_ads.m_list.numItems = page_count;
			this.native_ads.m_list.refreshVirtualList();

			this.native_ads.removeFromParent();
			this.parent_container.addChild(this.native_ads);
			if (pos) {
				this.native_ads.setXY(pos.x, pos.y);
			}

			Laya.timer.clear(this, this.update_scroll);
			if (this.scroll) {
				Laya.timer.frameLoop(1, this, this.update_scroll);
			}
			super.show();
		}
	}

	async hide() {
		if (this.native_ads) {
			this.native_ads.removeFromParent();
			Laya.timer.clear(this, this.update_scroll);
		}
	}

	protected render_item(index: number,item: UI_ZSelf_float_ad_item | UI_ZSelf_center_ad_item) {
		let i = this.start_index + index;
		if (i >= this.ads.length) {
			i -=  this.ads.length;
		}
		super.render_item(i, item);
		if (item instanceof UI_ZSelf_float_ad_item) {
			(item as UI_ZSelf_float_ad_item).m_text_color.selectedIndex = this.item_style;
		}
	}

	// 广告滚动
	private _scroll_speed = 60 / 1000;
	private _ever_float_banner_updated = false;
	private _last_scroll_banner_duration = 0;
	private _scroll_dir: 'h' | 'v' = 'v';
	private update_scroll() {
		const dt = Laya.timer.delta;
		if (!this._ever_float_banner_updated) {
			this._last_scroll_banner_duration = 0;
			this.native_ads.m_list.on(Laya.Event.MOUSE_DOWN, this, ()=>{
				this._last_scroll_banner_duration = 0;
			});
			this._ever_float_banner_updated = true;
		}
		this._last_scroll_banner_duration += dt;
		if (this.scroll_interval * 1000 < this._last_scroll_banner_duration) {
			let scroll_panel = this.native_ads.m_list._scrollPane;
			let delta = this._scroll_speed * dt;
			if (!isNaN(delta)) {
				if (this._scroll_dir === 'h') scroll_panel.posX += delta;
				if (this._scroll_dir === 'v') scroll_panel.posY += delta;
			}
			let end_reached = Math.abs(this._scroll_speed) > 0;
			if (this._scroll_dir == 'h') {
				end_reached = end_reached && ((scroll_panel.isRightMost && this._scroll_speed > 0) || (scroll_panel.posX <= 0 && this._scroll_speed < 0));
			} else if (this._scroll_dir == 'v') {
				end_reached = end_reached && ((scroll_panel.isBottomMost && this._scroll_speed > 0) || (scroll_panel.posY <= 0 && this._scroll_speed < 0));
			}
			if (end_reached) {
				this._scroll_speed = -this._scroll_speed;
				this._last_scroll_banner_duration = 0;
				this.event('on_scroll_to_end');
			}
		}
	}
}


export class SelfBottomBanner extends SelfAdUnit {
	native_ads: UI_ZSelf_FloatAdBottom = null;
	scroll = true;
	show_dark_bg = true;

	async instance() {
		await super.instance();
		this.native_ads = UI_ZSelf_FloatAdBottom.createInstance();
		this.native_ads.m_list.setVirtual();
		this.native_ads.m_list.itemRenderer = Laya.Handler.create(this, this.render_item, undefined, false);
		this.native_ads.m_list.on(fairygui.Events.CLICK_ITEM,this,this.on_item_click);
	}

	async show(pos?: Vector2) {
		if (this.native_ads) {
			this.native_ads.removeFromParent();
			this.parent_container.addChild(this.native_ads);
			if (pos) {
				this.native_ads.setXY(pos.x, pos.y);
			} else {
				this.native_ads.setXY(0, XEngine.inst.stage.height - this.native_ads.height);
			}
			this.native_ads.m_list.numItems = this.ads.length;
			this.native_ads.m_list.refreshVirtualList();
			Laya.timer.clear(this, this.update_scroll);
			if (this.scroll) {
				Laya.timer.frameLoop(1, this, this.update_scroll);
			}
		}
	}

	async hide() {
		if (this.native_ads) {
			this.native_ads.removeFromParent();
			Laya.timer.clear(this, this.update_scroll);
		}
	}

	protected render_item(index: number,item: UI_ZSelf_float_ad_item) {
		super.render_item(index, item);
		(item as UI_ZSelf_float_ad_item).m_text_color.selectedIndex = this.show_dark_bg ? 1 : 2;
	}

	// 广告滚动
	scroll_interval = 1.2;
	private _scroll_speed = 60 / 1000;
	private _ever_float_banner_updated = false;
	private _last_scroll_banner_duration = 0;
	private _scroll_dir: 'h' | 'v' = 'h';
	private update_scroll() {
		const dt = Laya.timer.delta;
		if (!this._ever_float_banner_updated) {
			this._last_scroll_banner_duration = 0;
			this.native_ads.m_list.on(Laya.Event.MOUSE_DOWN, this, ()=>{
				this._last_scroll_banner_duration = 0;
			});
			this._ever_float_banner_updated = true;
		}
		this._last_scroll_banner_duration += dt;
		if (this.scroll_interval * 1000 < this._last_scroll_banner_duration) {
			let scroll_panel = this.native_ads.m_list._scrollPane;
			let delta = this._scroll_speed * dt;
			if (!isNaN(delta)) {
				if (this._scroll_dir === 'h') scroll_panel.posX += delta;
				if (this._scroll_dir === 'v') scroll_panel.posY += delta;
			}
			let end_reached = Math.abs(this._scroll_speed) > 0;
			if (this._scroll_dir == 'h') {
				end_reached = end_reached && ((scroll_panel.isRightMost && this._scroll_speed > 0) || (scroll_panel.posX <= 0 && this._scroll_speed < 0));
			} else if (this._scroll_dir == 'v') {
				end_reached = end_reached && ((scroll_panel.isBottomMost && this._scroll_speed > 0) || (scroll_panel.posY <= 0 && this._scroll_speed < 0));
			}
			if (end_reached) {
				this._scroll_speed = -this._scroll_speed;
				this._last_scroll_banner_duration = 0;
				this.event('on_scroll_to_end');
			}
		}
	}
}
