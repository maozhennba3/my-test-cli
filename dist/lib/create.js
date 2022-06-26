"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path = require("path");
var chalk_1 = __importDefault(require("chalk"));
var validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
var index_1 = __importDefault(require("./utils/common/index"));
var inquirer_1 = __importDefault(require("inquirer"));
var Creator_1 = __importDefault(require("./Creator"));
var spinner = index_1.default.spinner, exit = index_1.default.exit, error = index_1.default.error;
var create = function (projectName, options) { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, inCurrent, name, targetDir, result, ok, action, creator;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cwd = options.cwd || process.cwd();
                inCurrent = projectName === '.';
                name = inCurrent ? path.relative('../', cwd) : projectName;
                targetDir = path.resolve(cwd, projectName);
                result = (0, validate_npm_package_name_1.default)(name);
                if (!result.validForNewPackages) {
                    result.errors && result.errors.forEach(function (err) {
                        console.error(chalk_1.default.red.dim('❌ ' + err));
                    });
                    result.warnings && result.warnings.forEach(function (warn) {
                        console.error(chalk_1.default.red.dim('⚠️ ' + warn));
                    });
                    exit(1);
                }
                if (!fs_extra_1.default.existsSync(targetDir)) return [3, 6];
                if (!options.force) return [3, 2];
                return [4, fs_extra_1.default.remove(targetDir)];
            case 1:
                _a.sent();
                return [3, 6];
            case 2:
                if (!inCurrent) return [3, 4];
                return [4, inquirer_1.default.prompt({
                        name: 'ok',
                        type: 'confirm',
                        message: '是否在当前目录生成项目?'
                    })];
            case 3:
                ok = (_a.sent()).ok;
                if (!ok) {
                    return [2];
                }
                return [3, 6];
            case 4: return [4, inquirer_1.default.prompt({
                    name: 'action',
                    type: 'list',
                    choices: [
                        {
                            name: '覆盖', value: 'overwrite',
                        },
                        {
                            name: '取消', value: 'cancel',
                        }
                    ],
                    message: "\u76EE\u6807\u6587\u4EF6\u5939".concat(chalk_1.default.cyan(targetDir), "\u5DF2\u5B58\u5728,\u8BF7\u9009\u62E9:")
                })];
            case 5:
                action = (_a.sent()).action;
                if (action === 'cancel') {
                    return [2];
                }
                else {
                    console.log("\nRemoving ".concat(chalk_1.default.cyan(targetDir), "..."));
                    fs_extra_1.default.remove(targetDir);
                }
                _a.label = 6;
            case 6:
                creator = new Creator_1.default(name, targetDir);
                return [4, creator.create(options)];
            case 7:
                _a.sent();
                return [2];
        }
    });
}); };
var func = function (projectName, options) {
    create(projectName, options).catch(function (err) {
        spinner.stopSpinner(false);
        error(err);
    });
};
exports.default = func;
//# sourceMappingURL=create.js.map