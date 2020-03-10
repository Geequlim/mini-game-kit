import { EventDispatcher } from "./EventDispatcher";

interface SupportedEvents {
	ADDED: string,
	REMOVED: string,
	RESIZE: string,
}

export default (function(): SupportedEvents {
	let events: SupportedEvents = {
		ADDED: 'ADDED',
		REMOVED: 'REMOVED',
		RESIZE: 'RESIZE',
	};

	if (typeof(Laya) !== 'undefined') {
		events = {...events, ...(Laya.Event)}
	} else if (typeof(egret) !== 'undefined') {
		events = {...events, ...(egret.Event)}
	}

	return events;
}());


type XEventDsipatcher = EventListener | Laya.EventDispatcher | egret.EventDispatcher;

export function once(target: XEventDsipatcher, event: string, caller: object, listener: Function) {
	if (target instanceof EventDispatcher || typeof(Laya) !== 'undefined') {
		(target as any as EventDispatcher).once(event, caller, listener);
	} else if (typeof(egret) !== 'undefined') {
		(target as egret.EventDispatcher).once(event, listener, caller);
	}
}

export function on(target: XEventDsipatcher, event: string, caller: object, listener: Function) {
	if (target instanceof EventDispatcher || typeof(Laya) !== 'undefined') {
		(target as any as EventDispatcher).on(event, caller, listener);
	} else if (typeof(egret) !== 'undefined') {
		(target as egret.EventDispatcher).addEventListener(event, listener, caller);
	}
}


export function off(target: XEventDsipatcher, event: string, caller: object, listener: Function) {
	if (target instanceof EventDispatcher || typeof(Laya) !== 'undefined') {
		(target as any as EventDispatcher).off(event, caller, listener);
	} else if (typeof(egret) !== 'undefined') {
		(target as egret.EventDispatcher).removeEventListener(event, listener, caller);
	}
}
