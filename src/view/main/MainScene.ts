import UI_Main from "view/raw/Main/UI_Main";
import XEngine from "xengine/XEngine";
import { FairyGUIBinder } from "view";
import TestDialog from "view/dialogs/TestDialog";
import Platform from "modules/platform/platform";
import Game from "xengine/game/Game";
import CommerceModule from "modules/commerce/CommerceModule";
import { PayPoint } from "modules/commerce/payment";
import { AudioModule } from "modules/audio";
import Scene_SampleScene from "view/raw/3d/Scene3D_SampleScene";

export default class MainScene extends UI_Main {

	show_banner = false;
	scene = new Scene_SampleScene()

	constructFromResource() {
		super.constructFromResource();
		FairyGUIBinder.onClick(this.m_bt_dialog, XEngine.inst.fairygui_helper, XEngine.inst.fairygui_helper.show_dialog, TestDialog, 'Dialog from MainScene');
		FairyGUIBinder.onClick(this.m_bt_toast, XEngine.inst.fairygui_helper.toast, XEngine.inst.fairygui_helper.toast.popup, 'Toast from MainScene');
		FairyGUIBinder.onClick(this.m_bt_banner, null, ()=>{
			this.show_banner = !this.show_banner;
			if (this.show_banner) {
				Game.inst.get_module<Platform>(Platform).admanager.show_banner();
			} else {
				Game.inst.get_module<Platform>(Platform).admanager.hide_banner();
			}
		});
		FairyGUIBinder.onClick(this.m_bt_pay, null, async ()=>{
			try {
				await Game.inst.get_module<CommerceModule>(CommerceModule).pay(PayPoint.DOUBLE_REWARD)
				XEngine.inst.fairygui_helper.toast.popup('恭喜获得双倍奖励');
			} catch (error) {
				XEngine.inst.fairygui_helper.toast.popup('观看完整视频可以领取双倍奖励');
			}
		});

		FairyGUIBinder.onClick(this.m_bt_pay, null, ()=>{
			Game.inst.get_module<AudioModule>(AudioModule).play_effect('测试音效');
		});

		const update_sound_switch = ()=>{
			this.m_bt_sound_switch.text = `音效${Game.inst.get_module<AudioModule>(AudioModule).sound_enabled ? '开' : '关'}`;
		};
		update_sound_switch();
		FairyGUIBinder.onClick(this.m_bt_sound_switch, null, ()=>{
			Game.inst.get_module<AudioModule>(AudioModule).sound_enabled = !Game.inst.get_module<AudioModule>(AudioModule).sound_enabled;
			update_sound_switch();
		});

		FairyGUIBinder.onClick(this.m_bt_scene, null, ()=>{
			if (this.scene.displayObject) {
				this.m_scene_slot.visible = true;
			}
		});
		this.m_scene_slot.visible = false;
		this.load_scene();

		FairyGUIBinder.onClick(this.m_scene_slot.m_bt_close, null, ()=>{
			if (this.scene.displayObject) {
				this.m_scene_slot.visible = false;
			}
		});
		FairyGUIBinder.onClick(this.m_scene_slot.m_bt_rot, null, ()=>{
			if (this.scene.displayObject) {
				this.scene.cAnimator_Cube.play('anim_rot', 0, 0);
			}
		});
	}

	async load_scene() {
		if (!this.scene.displayObject) {
			await this.scene.instance();
			this.m_scene_slot.displayObject.addChildAt(this.scene.displayObject, 0);
		}
	}
}
