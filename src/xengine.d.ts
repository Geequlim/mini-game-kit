declare module engine {
	const fairygui_helper: any;
	const stage: any;
	const res: any;
	const scene_manager: any;
	const timer: any;
}

declare module game {
	const paused: boolean;
	const logic_run_time: number;
	const initialized: boolean;
	const timer: any;
	const modules: {[key: string]: any};
	const messenger: any;
	function is_ready(): boolean;
	function query_save();
	function save();
}
