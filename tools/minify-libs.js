const shell = require("shelljs");
const fs = require("fs");
const { filter_files } = require("./utils");

const minify = require('@node-minify/core');
const uglifyES = require('@node-minify/uglify-es');

async function minify_file(input, output) {
	console.log(`minify ${input} => ${output}`)
	minify({ compressor: uglifyES, input: input, output: output, callback: function(err, min) {
		if (err) console.error(err);
	}});
}

function show_minify_file(file) {
	let is_js = fs.statSync(file).isFile() && file.endsWith(".js") && !file.endsWith(".min.js");
	is_hot_js = file.endsWith(".hot-update.js");
	return is_js && !is_hot_js;
}

(async function(){
	const es5 = process.argv.indexOf("--es5") != -1;
	const use_origin_files = [
		/laya\.physics\.js/,
		/laya\.physics3D\.js/,
		/laya\.physics3D\.wasm\.js/,
	];
	const files = filter_files("libs", show_minify_file, true);
	for (const js of files) {
		const min = js.replace(".js", ".min.js");
		if (fs.existsSync(min))
			continue;
		let ignored = false;
		for (const pattern of use_origin_files) {
			ignored = js.match(pattern);
			if (ignored) break;
		}
		if (!ignored) {
			if (es5) {
				shell.exec(`yarn babel --presets es2015 ${js} -o ${js}`);
			}
			await minify_file(js, min);
		} else {
			shell.cp(js, min);
		}
	}
})();



