const { filter_files } = require("./utils");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");
const LayaX3DTypeMap = {
    "Scene3D": "Scene3D",
    "Sprite3D": "Sprite3D",
    "SkinnedMeshSprite3D": "Sprite3D",
    "TrailSprite3D": "Sprite3D",
    "MeshSprite3D": "Sprite3D",
    "ShuriKenParticle3D": "Sprite3D",
    "PixelLineSprite3D": "Sprite3D",
};
const files = filter_files('assets/unity_exported', (f) => f.endsWith(".ls") || f.endsWith(".lh"), true);
for (const f of files) {
    const text = fs.readFileSync(f, { encoding: 'utf8' });
    const json = JSON.parse(text);
    const root_item = process_item(json.data, null);
    for (const c of root_item.child) {
        process_item(c, null);
    }
    root_item.type = LayaX3DTypeMap[root_item.type] ? LayaX3DTypeMap[root_item.type] : root_item.type;
    const outfile = path.join('src/view/raw/3d', root_item.type + '_' + root_item.variable_name + ".ts");
    console.log(`${f} ==> ${outfile}`);
    const output = generate_code(root_item, f.replace(/\\/g, '/'));
    const otdir = path.dirname(outfile);
    if (!fs.existsSync(otdir)) {
        shell.mkdir('-p', otdir);
    }
    fs.writeFileSync(outfile, output, { encoding: "utf8" });
}
function process_item(item, parent) {
    if (parent) {
        item.variable_name = parent.variable_name + "_" + item.props.name;
    }
    else {
        item.variable_name = item.props.name;
    }
    item.variable_name = item.variable_name.replace(/[^A-z0-9]/g, '_');
    for (const i of item.child) {
        process_item(i, item);
    }
    return item;
}
function generate_code(data, url) {
    let output = "";
    const line = (indent, text) => {
        let line_text = "";
        for (let i = 0; i < indent; i++) {
            line_text += "\t";
        }
        line_text += text;
        output += line_text + "\n";
    };
    line(0, 'import X3D from "xengine/view/3d/X3D";');
    line(0, '');
    line(0, `export default class ${data.type == 'Scene3D' ? 'Scene' : 'Prefab'}_${data.variable_name} extends X3D.${data.type} {`);
    line(0, '');
    let declearations = (item, parent) => {
        if (parent) {
            line(1, `${item.variable_name}: Laya.${item.type};`);
        }
        if (item.components && item.components.length) {
            for (const c of item.components) {
                c.variable_name = `c${c.type}`;
                if (parent) {
                    c.variable_name += `_${item.variable_name}`;
                }
                line(1, `${c.variable_name}: Laya.${c.type};`);
            }
        }
        for (const c of item.child) {
            declearations(c, item);
        }
    };
    declearations(data, null);
    line(0, '');
    line(1, 'constructor() {');
    line(2, `super("${url}");`);
    line(1, '}');
    line(0, '');
    let initialize = (item, parent) => {
        let parent_var = parent ? 'this.' + parent.variable_name : 'node';
        if (parent) {
            if (parent == data) {
                parent_var = 'node';
            }
            line(2, `this.${item.variable_name} = ${parent_var}.getChildByName('${item.props.name}') as Laya.${item.type};`);
        }
        let components_owner = item == data ? 'node' : `this.${item.variable_name}`;
        if (item.components && item.components.length) {
            for (const c of item.components) {
                line(2, `this.${c.variable_name} = ${components_owner}.getComponent(Laya.${c.type}) as Laya.${c.type};`);
            }
        }
        for (const c of item.child) {
            initialize(c, item);
        }
    };
    line(0, '');
    line(1, 'async instance() {');
    line(2, 'const node = await super.instance();');
    initialize(data, null);
    line(2, 'return node;');
    line(1, '}');
    line(0, '');
    line(0, '}');
    line(0, '');
    return output;
}
