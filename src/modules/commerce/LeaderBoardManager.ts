import { EventDispatcher } from "xengine/events/EventDispatcher";

export default class LeaderBoardManager extends EventDispatcher {
	constructor() {
		super();
	}

	post_score(score: number): Promise<void> {
		return new Promise((resolve, reject) => { resolve(); });
	}

	show_leaderboard(): Promise<void> {
		return new Promise((resolve, reject) => { resolve(); });
	}

	next_page() {}
	previous_page() {}
}
