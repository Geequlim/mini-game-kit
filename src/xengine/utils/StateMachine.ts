import { EventDispatcher } from "xengine/events/EventDispatcher";

export type STATE_ID = any;

export enum Events {
	STATE_CHANGED = 'STATE_CHANGED'
}

/**
 * 队列化有限状态机
 *
 * @export
 * @class StateMachine
 */
export default class StateMachine extends EventDispatcher {

	protected current_state: STATE_ID = null;

	constructor() {
		super();
	}

	public get state() : STATE_ID {
		return this.current_state;
	}

	public set state(state: STATE_ID) {
		if (state == this.current_state) return;
		if (this.current_state) this.on_stop_state(this.current_state);
		this.on_start_state(state);
		if (this.current_state != state) {
			this.event(Events.STATE_CHANGED, state);
		}
		this.current_state = state;
	}
	/**
	 *	开始状态
	 * @param state
	 */
	protected on_start_state(state: STATE_ID) {}
	protected on_stop_state(state: STATE_ID) {}
}
