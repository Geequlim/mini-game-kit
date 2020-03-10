const fs = require("fs");
const path = require("path");
/**
 * 列出制定目录下符合条件的文件路径
 *
 * @param {string} root 查找路径
 * @param {(file: string)=>boolean} test_func 测试函数，将查找路径中的文件作为参数进行检查是否满足条件，如满足条件则返回 `true`
 * @param {boolean} [recursive=false] 是否递归查找子目录，默认为`false`
 * @returns {string[]} 返回该路径下符合条件的文件路径列表
 */
exports.filter_files = (function filter_files(root, test_func, re = false) {
    let ret = [];
    if (test_func && test_func(root)) {
        ret.push(root);
    }
    else if (fs.statSync(root).isDirectory()) {
        for (let f of fs.readdirSync(root)) {
            const file = path.join(root, f);
            if (test_func(file)) {
                ret.push(file);
            }
            else if (re && fs.statSync(file).isDirectory()) {
                ret = ret.concat(filter_files(file, test_func, re));
            }
        }
    }
    return ret;
});
