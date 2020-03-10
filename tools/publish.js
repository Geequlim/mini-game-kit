const shell = require("shelljs");
const fs = require("fs");
const path = require("path");
function build_target(name) {
    console.log("构建目标:", name);
    shell.exec("yarn compile");
    shell.exec("yarn minify-libs");
    let options = JSON.parse(fs.readFileSync(path.join("tools/template", name, "build.json"), { encoding: 'utf8' }));
    let configs = JSON.parse(fs.readFileSync("tools/configs.json", { encoding: 'utf8' }));
    const dir = `release/${name}`;
    shell.rm("-rf", dir);
    for (const m of options.modules) {
        for (const s of m.scripts) {
            const scfile = path.join("libs/modules/", m.module, s + ".min.js");
            const otfile = path.join(dir, "libs/modules", m.module, s + ".min.js");
            const otdir = path.dirname(otfile);
            if (!fs.existsSync(otdir)) {
                shell.mkdir('-p', otdir);
            }
            shell.cp(scfile, otfile);
        }
    }
    for (const item of options.copy) {
        const scfile = item.src;
        const otfile = path.join(dir, item.target);
        const otdir = path.dirname(otfile);
        if (!fs.existsSync(otdir)) {
            shell.mkdir('-p', otdir);
        }
        shell.cp("-r", scfile, otfile);
    }
    const game_js_path = path.join(dir, 'game.js');
    let text = fs.readFileSync(game_js_path, { encoding: 'utf8' });
    text = text.replace("platform: 'web'", `platform: '${name}'`);

	const appid = configs.appid[name];
    text = text.replace("appid: 'APPID'", `appid: '${appid}'`);
	const appkey = configs.appkey[name];
	text = text.replace("appkey: 'APPKEY'", `appkey: '${appkey}'`);

    text = text.replace("debug: true", `debug: false`);
    fs.writeFileSync(game_js_path, text, { encoding: 'utf8' });
    for (const cmd of options.commands) {
        console.log("执行命令", cmd.name);
        if (shell.exec(cmd.command).code) {
            throw `命令 ${cmd.name} 执行失败, 中断发布流程`;
        }
    }
    console.log("构建完成：", name);
}
const target = process.argv[process.argv.length - 1];
build_target(target);
