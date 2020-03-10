import LeaderBoardManager from "modules/commerce/LeaderBoardManager";
import Game from "xengine/game/Game";
import CommerceModule from "modules/commerce/CommerceModule";

export default class WechatLeaderBoardManager extends LeaderBoardManager {

	private ctx: any = null;

	constructor() {
		super();
		this.ctx = wx['getOpenDataContext']();
	}

	private post_message(msg): Promise<void> {
		return new Promise((resolve, reject) => {
			this.ctx.postMessage(msg);
			resolve();
		});
	}

	show_leaderboard(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.post_message({
				method: "showFriendRank",
				pageNum: 6,
				userId: Game.inst.get_module<CommerceModule>(CommerceModule).provider.get_user_info().uuid,
				index: 1
			});
			resolve();
		});
	}

	next_page() {
		this.post_message({method: "changePage",userId: Game.inst.get_module<CommerceModule>(CommerceModule).provider.get_user_info().uuid,page:-1,pageNum:6});
	}
	previous_page() {
		this.post_message({method: "changePage",userId: Game.inst.get_module<CommerceModule>(CommerceModule).provider.get_user_info().uuid,page:1,pageNum:6});
	}

}
