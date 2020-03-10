const { filter_files } = require("./utils");
const shell = require("shelljs");
function test_func(f) {
	let is_generated = (
		f.endsWith(".js.map") ||
		f.endsWith(".min.js") ||
		f.endsWith(".hot-update.json") ||
		f.endsWith(".hot-update.js")
	);
	return is_generated;
}
for (const f of filter_files('libs', test_func, true)) {
	shell.rm('-f', f);
}
shell.rm("-rf", "assets/ui");
shell.rm("-rf", "release");
shell.rm("-rf", "src/view/raw");
shell.rm("-rf", "libs/modules/bundle/bundle.js");
