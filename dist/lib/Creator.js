"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var chalk_1 = __importDefault(require("chalk"));
var execa_1 = __importDefault(require("execa"));
var inquirer_1 = __importDefault(require("inquirer"));
var events_1 = __importDefault(require("events"));
var index_1 = __importDefault(require("./utils/common/index"));
var loadRemotePreset_1 = __importDefault(require("./utils/loadRemotePreset"));
var constants_1 = __importDefault(require("./utils/constants"));
var copyFile_1 = __importDefault(require("./utils/copyFile"));
var wirteFileTree_1 = __importDefault(require("./utils/wirteFileTree"));
var spinner = index_1.default.spinner, exit = index_1.default.exit, error = index_1.default.error, log = index_1.default.log;
var Creator = (function (_super) {
    __extends(Creator, _super);
    function Creator(name, context) {
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.name = name;
        _this.context = context;
        _this.run = _this.run.bind(_this);
        return _this;
    }
    Object.defineProperty(Creator.prototype, "create", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cliOptions, preset) {
            if (preset === void 0) { preset = null; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, run, context, name, _b, pkgVersion, pkgDescription, pkgJson, pkg;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this, run = _a.run, context = _a.context, name = _a.name;
                            if (!cliOptions.preset) return [3, 2];
                            return [4, this.resolvePreset(cliOptions.preset, cliOptions.clone)];
                        case 1:
                            preset = _c.sent();
                            return [3, 4];
                        case 2: return [4, this.resolvePreset(constants_1.default.preset.default, cliOptions.clone)];
                        case 3:
                            preset = _c.sent();
                            _c.label = 4;
                        case 4:
                            log(chalk_1.default.blue.bold("mz CLI v".concat(require('../../package.json').version)));
                            spinner.logWithSpinner("\u2728", "\u6B63\u5728\u521B\u5EFA\u9879\u76EE ".concat(chalk_1.default.yellow(context), "."));
                            this.emit('creation', { event: 'creating' });
                            spinner.stopSpinner();
                            return [4, inquirer_1.default.prompt([{
                                        name: 'pkgVersion',
                                        type: 'input',
                                        message: '请输入版本号',
                                        default: '1.0.0'
                                    }, {
                                        name: 'pkgDescription',
                                        type: 'input',
                                        message: '请输入项目简介',
                                        default: 'project created by never-test-cli'
                                    }])];
                        case 5:
                            _b = _c.sent(), pkgVersion = _b.pkgVersion, pkgDescription = _b.pkgDescription;
                            return [4, (0, copyFile_1.default)(preset.tmpdir, preset.targetDir)];
                        case 6:
                            pkgJson = _c.sent();
                            pkg = Object.assign(pkgJson, {
                                version: pkgVersion,
                                description: pkgDescription
                            });
                            log();
                            spinner.logWithSpinner('📄', "\u751F\u6210 ".concat(chalk_1.default.yellow('package.json'), " \u7B49\u6A21\u677F\u6587\u4EF6"));
                            return [4, (0, wirteFileTree_1.default)(context, {
                                    'package.json': JSON.stringify(pkg, null, 2)
                                })];
                        case 7:
                            _c.sent();
                            spinner.stopSpinner();
                            log();
                            log("\uD83C\uDF89  \u9879\u76EE\u521B\u5EFA\u6210\u529F ".concat(chalk_1.default.yellow(name), "."));
                            this.emit('creation', { event: 'done' });
                            return [2];
                    }
                });
            });
        }
    });
    Object.defineProperty(Creator.prototype, "run", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (command, args) {
            var _a;
            if (!args) {
                _a = command.split(/\s+/), command = _a[0], args = _a.slice(1);
            }
            return (0, execa_1.default)(command, args, { cwd: this.context });
        }
    });
    Object.defineProperty(Creator.prototype, "resolvePreset", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (name, clone) {
            return __awaiter(this, void 0, void 0, function () {
                var preset, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            spinner.logWithSpinner("\u6B63\u5728\u62C9\u53D6\u8FDC\u7A0B preset  ".concat(chalk_1.default.cyan(name), " "));
                            this.emit('creation', { event: 'fetch-remote-preset' });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, (0, loadRemotePreset_1.default)(name, this.context, clone)];
                        case 2:
                            preset = _a.sent();
                            spinner.stopSpinner();
                            return [3, 4];
                        case 3:
                            err_1 = _a.sent();
                            spinner.stopSpinner();
                            error("\u83B7\u53D6\u8FDC\u7A0B preset ".concat(chalk_1.default.cyan(name), " \u5931\u8D25"));
                            throw err_1;
                        case 4: return [2, preset];
                    }
                });
            });
        }
    });
    return Creator;
}(events_1.default));
exports.default = Creator;
//# sourceMappingURL=Creator.js.map