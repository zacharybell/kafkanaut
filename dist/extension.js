/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const commands_1 = __webpack_require__(2);
const cluster_reducer_1 = __webpack_require__(4);
const store_1 = __importDefault(__webpack_require__(411));
const clusters_treeview_1 = __webpack_require__(412);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const clusterTreeProvider = new clusters_treeview_1.ClusterTreeProvider();
    store_1.default.subscribe(() => {
        clusterTreeProvider.refresh();
    });
    const tree = vscode.window.createTreeView("clusters", {
        treeDataProvider: clusterTreeProvider,
    });
    tree.onDidChangeSelection(event => {
        if (event.selection.length === 1) {
            vscode.window.showInformationMessage(event.selection[0].label);
        }
    });
    tree.onDidExpandElement(event => {
        var _a;
        if (event.element.contextValue === 'cluster') {
            const clusterId = event.element.id;
            const topics = (_a = (0, cluster_reducer_1.selectById)(store_1.default.getState().cluster, clusterId)) === null || _a === void 0 ? void 0 : _a.topics;
            if (!topics) {
                store_1.default.dispatch((0, cluster_reducer_1.fetchTopics)(clusterId));
            }
        }
    });
    (0, commands_1.registerCommands)(context);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCommands = void 0;
const vscode = __importStar(__webpack_require__(1));
const cluster_setup_1 = __webpack_require__(3);
const registerCommands = (context) => {
    const addCluster = vscode.commands.registerCommand("kafkanaut.addCluster", () => (0, cluster_setup_1.clusterSetup)());
    // const deleteCluster = vscode.commands.registerCommand("kafkanaut.deleteCluster", (cluster: KafkaTreeItem) => {
    // });
    context.subscriptions.push(addCluster);
};
exports.registerCommands = registerCommands;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clusterSetup = void 0;
const vscode = __importStar(__webpack_require__(1));
const cluster_reducer_1 = __webpack_require__(4);
const store_1 = __importDefault(__webpack_require__(411));
function clusterSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        const clusterName = yield vscode.window.showInputBox({
            title: 'Cluster Name',
            placeHolder: 'My Cluster',
            prompt: 'Enter a name for your Kafka cluster...'
        });
        if (clusterName) {
            const brokerAddress = yield vscode.window.showInputBox({
                title: 'Broker Address',
                placeHolder: 'http://localhost:9092',
                prompt: 'Enter the broker address for your Kafka cluster...'
            });
            if (brokerAddress) {
                store_1.default.dispatch((0, cluster_reducer_1.addCluster)({
                    name: clusterName,
                    brokers: [brokerAddress]
                }));
            }
        }
    });
}
exports.clusterSetup = clusterSetup;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addCluster = exports.selectAll = exports.selectById = exports.clusterAdapter = exports.fetchTopics = void 0;
const toolkit_1 = __webpack_require__(5);
const kafkajs_1 = __webpack_require__(13);
const uuid_1 = __webpack_require__(396);
exports.fetchTopics = (0, toolkit_1.createAsyncThunk)('cluster/fetchTopics', (clusterId, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const cluster = (0, exports.selectById)(getState().cluster, clusterId);
    if (!cluster) {
        throw new Error(`No cluster matching ${clusterId} found`);
    }
    const kafka = new kafkajs_1.Kafka({ clientId: clusterId, brokers: cluster.brokers });
    const admin = kafka.admin();
    yield admin.connect();
    const topics = yield admin.listTopics();
    yield admin.disconnect();
    return { topics, clusterId };
}));
exports.clusterAdapter = (0, toolkit_1.createEntityAdapter)({
    selectId: (cluster) => cluster.id
});
const clusterSlice = (0, toolkit_1.createSlice)({
    name: 'cluster',
    initialState: exports.clusterAdapter.getInitialState(),
    reducers: {
        addCluster: (state, action) => {
            exports.clusterAdapter.addOne(state, { id: (0, uuid_1.v4)(), name: action.payload.name, brokers: action.payload.brokers });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(exports.fetchTopics.fulfilled, (state, { payload }) => {
            exports.clusterAdapter.updateOne(state, { id: payload.clusterId, changes: { topics: payload.topics } });
        });
    }
});
_a = exports.clusterAdapter.getSelectors(), exports.selectById = _a.selectById, exports.selectAll = _a.selectAll;
exports.addCluster = clusterSlice.actions.addCluster;
exports["default"] = clusterSlice.reducer;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__DO_NOT_USE__ActionTypes": () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.__DO_NOT_USE__ActionTypes),
/* harmony export */   "applyMiddleware": () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware),
/* harmony export */   "bindActionCreators": () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.bindActionCreators),
/* harmony export */   "combineReducers": () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers),
/* harmony export */   "compose": () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.compose),
/* harmony export */   "createStore": () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.createStore),
/* harmony export */   "MiddlewareArray": () => (/* binding */ MiddlewareArray),
/* harmony export */   "configureStore": () => (/* binding */ configureStore),
/* harmony export */   "createAction": () => (/* binding */ createAction),
/* harmony export */   "createAsyncThunk": () => (/* binding */ createAsyncThunk),
/* harmony export */   "createDraftSafeSelector": () => (/* binding */ createDraftSafeSelector),
/* harmony export */   "createEntityAdapter": () => (/* binding */ createEntityAdapter),
/* harmony export */   "createImmutableStateInvariantMiddleware": () => (/* binding */ createImmutableStateInvariantMiddleware),
/* harmony export */   "createNextState": () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "createReducer": () => (/* binding */ createReducer),
/* harmony export */   "createSelector": () => (/* reexport safe */ reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector),
/* harmony export */   "createSerializableStateInvariantMiddleware": () => (/* binding */ createSerializableStateInvariantMiddleware),
/* harmony export */   "createSlice": () => (/* binding */ createSlice),
/* harmony export */   "current": () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_2__.current),
/* harmony export */   "findNonSerializableValue": () => (/* binding */ findNonSerializableValue),
/* harmony export */   "freeze": () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_2__.freeze),
/* harmony export */   "getDefaultMiddleware": () => (/* binding */ getDefaultMiddleware),
/* harmony export */   "getType": () => (/* binding */ getType),
/* harmony export */   "isAllOf": () => (/* binding */ isAllOf),
/* harmony export */   "isAnyOf": () => (/* binding */ isAnyOf),
/* harmony export */   "isAsyncThunkAction": () => (/* binding */ isAsyncThunkAction),
/* harmony export */   "isDraft": () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_2__.isDraft),
/* harmony export */   "isFulfilled": () => (/* binding */ isFulfilled),
/* harmony export */   "isImmutableDefault": () => (/* binding */ isImmutableDefault),
/* harmony export */   "isPending": () => (/* binding */ isPending),
/* harmony export */   "isPlain": () => (/* binding */ isPlain),
/* harmony export */   "isPlainObject": () => (/* binding */ isPlainObject),
/* harmony export */   "isRejected": () => (/* binding */ isRejected),
/* harmony export */   "isRejectedWithValue": () => (/* binding */ isRejectedWithValue),
/* harmony export */   "miniSerializeError": () => (/* binding */ miniSerializeError),
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "original": () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_2__.original),
/* harmony export */   "unwrapResult": () => (/* binding */ unwrapResult)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
var __extends = (undefined && undefined.__extends) || (function () {
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
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function (obj, key, value) { return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value }) : obj[key] = value; };
var __spreadValues = function (a, b) {
    for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
        for (var _i = 0, _c = __getOwnPropSymbols(b); _i < _c.length; _i++) {
            var prop = _c[_i];
            if (__propIsEnum.call(b, prop))
                __defNormalProp(a, prop, b[prop]);
        }
    return a;
};
var __spreadProps = function (a, b) { return __defProps(a, __getOwnPropDescs(b)); };
var __async = function (__this, __arguments, generator) {
    return new Promise(function (resolve, reject) {
        var fulfilled = function (value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        };
        var rejected = function (value) {
            try {
                step(generator.throw(value));
            }
            catch (e) {
                reject(e);
            }
        };
        var step = function (x) { return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected); };
        step((generator = generator.apply(__this, __arguments)).next());
    });
};
// src/index.ts




// src/createDraftSafeSelector.ts


var createDraftSafeSelector = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var selector = reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector.apply(void 0, args);
    var wrappedSelector = function (value) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return selector.apply(void 0, __spreadArray([(0,immer__WEBPACK_IMPORTED_MODULE_2__.isDraft)(value) ? (0,immer__WEBPACK_IMPORTED_MODULE_2__.current)(value) : value], rest));
    };
    return wrappedSelector;
};
// src/configureStore.ts

// src/devtoolsExtension.ts

var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function () {
    if (arguments.length === 0)
        return void 0;
    if (typeof arguments[0] === "object")
        return redux__WEBPACK_IMPORTED_MODULE_0__.compose;
    return redux__WEBPACK_IMPORTED_MODULE_0__.compose.apply(null, arguments);
};
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function () {
    return function (noop) {
        return noop;
    };
};
// src/isPlainObject.ts
function isPlainObject(value) {
    if (typeof value !== "object" || value === null)
        return false;
    var proto = Object.getPrototypeOf(value);
    if (proto === null)
        return true;
    var baseProto = proto;
    while (Object.getPrototypeOf(baseProto) !== null) {
        baseProto = Object.getPrototypeOf(baseProto);
    }
    return proto === baseProto;
}
// src/getDefaultMiddleware.ts

// src/utils.ts
function getTimeMeasureUtils(maxDelay, fnName) {
    var elapsed = 0;
    return {
        measureTime: function (fn) {
            var started = Date.now();
            try {
                return fn();
            }
            finally {
                var finished = Date.now();
                elapsed += finished - started;
            }
        },
        warnIfExceeded: function () {
            if (elapsed > maxDelay) {
                console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
            }
        }
    };
}
var MiddlewareArray = /** @class */ (function (_super) {
    __extends(MiddlewareArray, _super);
    function MiddlewareArray() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        Object.setPrototypeOf(_this, MiddlewareArray.prototype);
        return _this;
    }
    Object.defineProperty(MiddlewareArray, Symbol.species, {
        get: function () {
            return MiddlewareArray;
        },
        enumerable: false,
        configurable: true
    });
    MiddlewareArray.prototype.concat = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray.prototype.prepend = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        if (arr.length === 1 && Array.isArray(arr[0])) {
            return new (MiddlewareArray.bind.apply(MiddlewareArray, __spreadArray([void 0], arr[0].concat(this))))();
        }
        return new (MiddlewareArray.bind.apply(MiddlewareArray, __spreadArray([void 0], arr.concat(this))))();
    };
    return MiddlewareArray;
}(Array));
// src/immutableStateInvariantMiddleware.ts
var isProduction = process.env.NODE_ENV === "production";
var prefix = "Invariant failed";
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    throw new Error(prefix + ": " + (message || ""));
}
function stringify(obj, serializer, indent, decycler) {
    return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
}
function getSerialize(serializer, decycler) {
    var stack = [], keys = [];
    if (!decycler)
        decycler = function (_, value) {
            if (stack[0] === value)
                return "[Circular ~]";
            return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
        };
    return function (key, value) {
        if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value))
                value = decycler.call(this, key, value);
        }
        else
            stack.push(value);
        return serializer == null ? value : serializer.call(this, key, value);
    };
}
function isImmutableDefault(value) {
    return typeof value !== "object" || value === null || typeof value === "undefined" || Object.isFrozen(value);
}
function trackForMutations(isImmutable, ignorePaths, obj) {
    var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
    return {
        detectMutations: function () {
            return detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
        }
    };
}
function trackProperties(isImmutable, ignorePaths, obj, path) {
    if (ignorePaths === void 0) { ignorePaths = []; }
    if (path === void 0) { path = ""; }
    var tracked = { value: obj };
    if (!isImmutable(obj)) {
        tracked.children = {};
        for (var key in obj) {
            var childPath = path ? path + "." + key : key;
            if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
                continue;
            }
            tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
        }
    }
    return tracked;
}
function detectMutations(isImmutable, ignorePaths, trackedProperty, obj, sameParentRef, path) {
    if (ignorePaths === void 0) { ignorePaths = []; }
    if (sameParentRef === void 0) { sameParentRef = false; }
    if (path === void 0) { path = ""; }
    var prevObj = trackedProperty ? trackedProperty.value : void 0;
    var sameRef = prevObj === obj;
    if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
        return { wasMutated: true, path: path };
    }
    if (isImmutable(prevObj) || isImmutable(obj)) {
        return { wasMutated: false };
    }
    var keysToDetect = {};
    for (var key in trackedProperty.children) {
        keysToDetect[key] = true;
    }
    for (var key in obj) {
        keysToDetect[key] = true;
    }
    for (var key in keysToDetect) {
        var childPath = path ? path + "." + key : key;
        if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
            continue;
        }
        var result = detectMutations(isImmutable, ignorePaths, trackedProperty.children[key], obj[key], sameRef, childPath);
        if (result.wasMutated) {
            return result;
        }
    }
    return { wasMutated: false };
}
function createImmutableStateInvariantMiddleware(options) {
    if (options === void 0) { options = {}; }
    if (process.env.NODE_ENV === "production") {
        return function () { return function (next) { return function (action) { return next(action); }; }; };
    }
    var _c = options.isImmutable, isImmutable = _c === void 0 ? isImmutableDefault : _c, ignoredPaths = options.ignoredPaths, _d = options.warnAfter, warnAfter = _d === void 0 ? 32 : _d, ignore = options.ignore;
    ignoredPaths = ignoredPaths || ignore;
    var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
    return function (_c) {
        var getState = _c.getState;
        var state = getState();
        var tracker = track(state);
        var result;
        return function (next) { return function (action) {
            var measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
            measureUtils.measureTime(function () {
                state = getState();
                result = tracker.detectMutations();
                tracker = track(state);
                invariant(!result.wasMutated, "A state mutation was detected between dispatches, in the path '" + (result.path || "") + "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
            });
            var dispatchedAction = next(action);
            measureUtils.measureTime(function () {
                state = getState();
                result = tracker.detectMutations();
                tracker = track(state);
                result.wasMutated && invariant(!result.wasMutated, "A state mutation was detected inside a dispatch, in the path: " + (result.path || "") + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
            });
            measureUtils.warnIfExceeded();
            return dispatchedAction;
        }; };
    };
}
// src/serializableStateInvariantMiddleware.ts
function isPlain(val) {
    var type = typeof val;
    return type === "undefined" || val === null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || isPlainObject(val);
}
function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths) {
    if (path === void 0) { path = ""; }
    if (isSerializable === void 0) { isSerializable = isPlain; }
    if (ignoredPaths === void 0) { ignoredPaths = []; }
    var foundNestedSerializable;
    if (!isSerializable(value)) {
        return {
            keyPath: path || "<root>",
            value: value
        };
    }
    if (typeof value !== "object" || value === null) {
        return false;
    }
    var entries = getEntries != null ? getEntries(value) : Object.entries(value);
    var hasIgnoredPaths = ignoredPaths.length > 0;
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _c = entries_1[_i], key = _c[0], nestedValue = _c[1];
        var nestedPath = path ? path + "." + key : key;
        if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath) >= 0) {
            continue;
        }
        if (!isSerializable(nestedValue)) {
            return {
                keyPath: nestedPath,
                value: nestedValue
            };
        }
        if (typeof nestedValue === "object") {
            foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths);
            if (foundNestedSerializable) {
                return foundNestedSerializable;
            }
        }
    }
    return false;
}
function createSerializableStateInvariantMiddleware(options) {
    if (options === void 0) { options = {}; }
    if (process.env.NODE_ENV === "production") {
        return function () { return function (next) { return function (action) { return next(action); }; }; };
    }
    var _c = options.isSerializable, isSerializable = _c === void 0 ? isPlain : _c, getEntries = options.getEntries, _d = options.ignoredActions, ignoredActions = _d === void 0 ? [] : _d, _e = options.ignoredActionPaths, ignoredActionPaths = _e === void 0 ? ["meta.arg", "meta.baseQueryMeta"] : _e, _f = options.ignoredPaths, ignoredPaths = _f === void 0 ? [] : _f, _g = options.warnAfter, warnAfter = _g === void 0 ? 32 : _g, _h = options.ignoreState, ignoreState = _h === void 0 ? false : _h, _j = options.ignoreActions, ignoreActions = _j === void 0 ? false : _j;
    return function (storeAPI) { return function (next) { return function (action) {
        if (ignoreActions || ignoredActions.length && ignoredActions.indexOf(action.type) !== -1) {
            return next(action);
        }
        var measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
        measureUtils.measureTime(function () {
            var foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths);
            if (foundActionNonSerializableValue) {
                var keyPath = foundActionNonSerializableValue.keyPath, value = foundActionNonSerializableValue.value;
                console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
            }
        });
        var result = next(action);
        if (!ignoreState) {
            measureUtils.measureTime(function () {
                var state = storeAPI.getState();
                var foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths);
                if (foundStateNonSerializableValue) {
                    var keyPath = foundStateNonSerializableValue.keyPath, value = foundStateNonSerializableValue.value;
                    console.error("A non-serializable value was detected in the state, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the reducer(s) handling this action type: " + action.type + ".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)");
                }
            });
            measureUtils.warnIfExceeded();
        }
        return result;
    }; }; };
}
// src/getDefaultMiddleware.ts
function isBoolean(x) {
    return typeof x === "boolean";
}
function curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
        return getDefaultMiddleware(options);
    };
}
function getDefaultMiddleware(options) {
    if (options === void 0) { options = {}; }
    var _c = options.thunk, thunk = _c === void 0 ? true : _c, _d = options.immutableCheck, immutableCheck = _d === void 0 ? true : _d, _e = options.serializableCheck, serializableCheck = _e === void 0 ? true : _e;
    var middlewareArray = new MiddlewareArray();
    if (thunk) {
        if (isBoolean(thunk)) {
            middlewareArray.push(redux_thunk__WEBPACK_IMPORTED_MODULE_3__["default"]);
        }
        else {
            middlewareArray.push(redux_thunk__WEBPACK_IMPORTED_MODULE_3__["default"].withExtraArgument(thunk.extraArgument));
        }
    }
    if (process.env.NODE_ENV !== "production") {
        if (immutableCheck) {
            var immutableOptions = {};
            if (!isBoolean(immutableCheck)) {
                immutableOptions = immutableCheck;
            }
            middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
        }
        if (serializableCheck) {
            var serializableOptions = {};
            if (!isBoolean(serializableCheck)) {
                serializableOptions = serializableCheck;
            }
            middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
        }
    }
    return middlewareArray;
}
// src/configureStore.ts
var IS_PRODUCTION = process.env.NODE_ENV === "production";
function configureStore(options) {
    var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    var _c = options || {}, _d = _c.reducer, reducer = _d === void 0 ? void 0 : _d, _e = _c.middleware, middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e, _f = _c.devTools, devTools = _f === void 0 ? true : _f, _g = _c.preloadedState, preloadedState = _g === void 0 ? void 0 : _g, _h = _c.enhancers, enhancers = _h === void 0 ? void 0 : _h;
    var rootReducer;
    if (typeof reducer === "function") {
        rootReducer = reducer;
    }
    else if (isPlainObject(reducer)) {
        rootReducer = (0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)(reducer);
    }
    else {
        throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    }
    var finalMiddleware = middleware;
    if (typeof finalMiddleware === "function") {
        finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
        if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
            throw new Error("when using a middleware builder function, an array of middleware must be returned");
        }
    }
    if (!IS_PRODUCTION && finalMiddleware.some(function (item) { return typeof item !== "function"; })) {
        throw new Error("each middleware provided to configureStore must be a function");
    }
    var middlewareEnhancer = redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware.apply(void 0, finalMiddleware);
    var finalCompose = redux__WEBPACK_IMPORTED_MODULE_0__.compose;
    if (devTools) {
        finalCompose = composeWithDevTools(__spreadValues({
            trace: !IS_PRODUCTION
        }, typeof devTools === "object" && devTools));
    }
    var storeEnhancers = [middlewareEnhancer];
    if (Array.isArray(enhancers)) {
        storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
    }
    else if (typeof enhancers === "function") {
        storeEnhancers = enhancers(storeEnhancers);
    }
    var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(rootReducer, preloadedState, composedEnhancer);
}
// src/createAction.ts
function createAction(type, prepareAction) {
    function actionCreator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (prepareAction) {
            var prepared = prepareAction.apply(void 0, args);
            if (!prepared) {
                throw new Error("prepareAction did not return an object");
            }
            return __spreadValues(__spreadValues({
                type: type,
                payload: prepared.payload
            }, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
        }
        return { type: type, payload: args[0] };
    }
    actionCreator.toString = function () { return "" + type; };
    actionCreator.type = type;
    actionCreator.match = function (action) { return action.type === type; };
    return actionCreator;
}
function isFSA(action) {
    return isPlainObject(action) && typeof action.type === "string" && Object.keys(action).every(isValidKey);
}
function isValidKey(key) {
    return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}
function getType(actionCreator) {
    return "" + actionCreator;
}
// src/createReducer.ts

// src/mapBuilders.ts
function executeReducerBuilderCallback(builderCallback) {
    var actionsMap = {};
    var actionMatchers = [];
    var defaultCaseReducer;
    var builder = {
        addCase: function (typeOrActionCreator, reducer) {
            if (process.env.NODE_ENV !== "production") {
                if (actionMatchers.length > 0) {
                    throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");
                }
                if (defaultCaseReducer) {
                    throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");
                }
            }
            var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
            if (type in actionsMap) {
                throw new Error("addCase cannot be called with two reducers for the same action type");
            }
            actionsMap[type] = reducer;
            return builder;
        },
        addMatcher: function (matcher, reducer) {
            if (process.env.NODE_ENV !== "production") {
                if (defaultCaseReducer) {
                    throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
                }
            }
            actionMatchers.push({ matcher: matcher, reducer: reducer });
            return builder;
        },
        addDefaultCase: function (reducer) {
            if (process.env.NODE_ENV !== "production") {
                if (defaultCaseReducer) {
                    throw new Error("`builder.addDefaultCase` can only be called once");
                }
            }
            defaultCaseReducer = reducer;
            return builder;
        }
    };
    builderCallback(builder);
    return [actionsMap, actionMatchers, defaultCaseReducer];
}
// src/createReducer.ts
function isStateFunction(x) {
    return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
    if (actionMatchers === void 0) { actionMatchers = []; }
    var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _c[0], finalActionMatchers = _c[1], finalDefaultCaseReducer = _c[2];
    var getInitialState;
    if (isStateFunction(initialState)) {
        getInitialState = function () { return (0,immer__WEBPACK_IMPORTED_MODULE_2__["default"])(initialState(), function () {
        }); };
    }
    else {
        var frozenInitialState_1 = (0,immer__WEBPACK_IMPORTED_MODULE_2__["default"])(initialState, function () {
        });
        getInitialState = function () { return frozenInitialState_1; };
    }
    function reducer(state, action) {
        if (state === void 0) { state = getInitialState(); }
        var caseReducers = __spreadArray([
            actionsMap[action.type]
        ], finalActionMatchers.filter(function (_c) {
            var matcher = _c.matcher;
            return matcher(action);
        }).map(function (_c) {
            var reducer2 = _c.reducer;
            return reducer2;
        }));
        if (caseReducers.filter(function (cr) { return !!cr; }).length === 0) {
            caseReducers = [finalDefaultCaseReducer];
        }
        return caseReducers.reduce(function (previousState, caseReducer) {
            if (caseReducer) {
                if ((0,immer__WEBPACK_IMPORTED_MODULE_2__.isDraft)(previousState)) {
                    var draft = previousState;
                    var result = caseReducer(draft, action);
                    if (typeof result === "undefined") {
                        return previousState;
                    }
                    return result;
                }
                else if (!(0,immer__WEBPACK_IMPORTED_MODULE_2__.isDraftable)(previousState)) {
                    var result = caseReducer(previousState, action);
                    if (typeof result === "undefined") {
                        if (previousState === null) {
                            return previousState;
                        }
                        throw Error("A case reducer on a non-draftable value must not return undefined");
                    }
                    return result;
                }
                else {
                    return (0,immer__WEBPACK_IMPORTED_MODULE_2__["default"])(previousState, function (draft) {
                        return caseReducer(draft, action);
                    });
                }
            }
            return previousState;
        }, state);
    }
    reducer.getInitialState = getInitialState;
    return reducer;
}
// src/createSlice.ts
function getType2(slice, actionKey) {
    return slice + "/" + actionKey;
}
function createSlice(options) {
    var name = options.name;
    if (!name) {
        throw new Error("`name` is a required option for createSlice");
    }
    var initialState = typeof options.initialState == "function" ? options.initialState : (0,immer__WEBPACK_IMPORTED_MODULE_2__["default"])(options.initialState, function () {
    });
    var reducers = options.reducers || {};
    var reducerNames = Object.keys(reducers);
    var sliceCaseReducersByName = {};
    var sliceCaseReducersByType = {};
    var actionCreators = {};
    reducerNames.forEach(function (reducerName) {
        var maybeReducerWithPrepare = reducers[reducerName];
        var type = getType2(name, reducerName);
        var caseReducer;
        var prepareCallback;
        if ("reducer" in maybeReducerWithPrepare) {
            caseReducer = maybeReducerWithPrepare.reducer;
            prepareCallback = maybeReducerWithPrepare.prepare;
        }
        else {
            caseReducer = maybeReducerWithPrepare;
        }
        sliceCaseReducersByName[reducerName] = caseReducer;
        sliceCaseReducersByType[type] = caseReducer;
        actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
    });
    function buildReducer() {
        var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _d = _c[0], extraReducers = _d === void 0 ? {} : _d, _e = _c[1], actionMatchers = _e === void 0 ? [] : _e, _f = _c[2], defaultCaseReducer = _f === void 0 ? void 0 : _f;
        var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
        return createReducer(initialState, finalCaseReducers, actionMatchers, defaultCaseReducer);
    }
    var _reducer;
    return {
        name: name,
        reducer: function (state, action) {
            if (!_reducer)
                _reducer = buildReducer();
            return _reducer(state, action);
        },
        actions: actionCreators,
        caseReducers: sliceCaseReducersByName,
        getInitialState: function () {
            if (!_reducer)
                _reducer = buildReducer();
            return _reducer.getInitialState();
        }
    };
}
// src/entities/entity_state.ts
function getInitialEntityState() {
    return {
        ids: [],
        entities: {}
    };
}
function createInitialStateFactory() {
    function getInitialState(additionalState) {
        if (additionalState === void 0) { additionalState = {}; }
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState: getInitialState };
}
// src/entities/state_selectors.ts
function createSelectorsFactory() {
    function getSelectors(selectState) {
        var selectIds = function (state) { return state.ids; };
        var selectEntities = function (state) { return state.entities; };
        var selectAll = createDraftSafeSelector(selectIds, selectEntities, function (ids, entities) { return ids.map(function (id) { return entities[id]; }); });
        var selectId = function (_, id) { return id; };
        var selectById = function (entities, id) { return entities[id]; };
        var selectTotal = createDraftSafeSelector(selectIds, function (ids) { return ids.length; });
        if (!selectState) {
            return {
                selectIds: selectIds,
                selectEntities: selectEntities,
                selectAll: selectAll,
                selectTotal: selectTotal,
                selectById: createDraftSafeSelector(selectEntities, selectId, selectById)
            };
        }
        var selectGlobalizedEntities = createDraftSafeSelector(selectState, selectEntities);
        return {
            selectIds: createDraftSafeSelector(selectState, selectIds),
            selectEntities: selectGlobalizedEntities,
            selectAll: createDraftSafeSelector(selectState, selectAll),
            selectTotal: createDraftSafeSelector(selectState, selectTotal),
            selectById: createDraftSafeSelector(selectGlobalizedEntities, selectId, selectById)
        };
    }
    return { getSelectors: getSelectors };
}
// src/entities/state_adapter.ts

function createSingleArgumentStateOperator(mutator) {
    var operator = createStateOperator(function (_, state) { return mutator(state); });
    return function operation(state) {
        return operator(state, void 0);
    };
}
function createStateOperator(mutator) {
    return function operation(state, arg) {
        function isPayloadActionArgument(arg2) {
            return isFSA(arg2);
        }
        var runMutator = function (draft) {
            if (isPayloadActionArgument(arg)) {
                mutator(arg.payload, draft);
            }
            else {
                mutator(arg, draft);
            }
        };
        if ((0,immer__WEBPACK_IMPORTED_MODULE_2__.isDraft)(state)) {
            runMutator(state);
            return state;
        }
        else {
            return (0,immer__WEBPACK_IMPORTED_MODULE_2__["default"])(state, runMutator);
        }
    };
}
// src/entities/utils.ts
function selectIdValue(entity, selectId) {
    var key = selectId(entity);
    if (process.env.NODE_ENV !== "production" && key === void 0) {
        console.warn("The entity passed to the `selectId` implementation returned undefined.", "You should probably provide your own `selectId` implementation.", "The entity that was passed:", entity, "The `selectId` implementation:", selectId.toString());
    }
    return key;
}
function ensureEntitiesArray(entities) {
    if (!Array.isArray(entities)) {
        entities = Object.values(entities);
    }
    return entities;
}
function splitAddedUpdatedEntities(newEntities, selectId, state) {
    newEntities = ensureEntitiesArray(newEntities);
    var added = [];
    var updated = [];
    for (var _i = 0, newEntities_1 = newEntities; _i < newEntities_1.length; _i++) {
        var entity = newEntities_1[_i];
        var id = selectIdValue(entity, selectId);
        if (id in state.entities) {
            updated.push({ id: id, changes: entity });
        }
        else {
            added.push(entity);
        }
    }
    return [added, updated];
}
// src/entities/unsorted_state_adapter.ts
function createUnsortedStateAdapter(selectId) {
    function addOneMutably(entity, state) {
        var key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            return;
        }
        state.ids.push(key);
        state.entities[key] = entity;
    }
    function addManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        for (var _i = 0, newEntities_2 = newEntities; _i < newEntities_2.length; _i++) {
            var entity = newEntities_2[_i];
            addOneMutably(entity, state);
        }
    }
    function setOneMutably(entity, state) {
        var key = selectIdValue(entity, selectId);
        if (!(key in state.entities)) {
            state.ids.push(key);
        }
        state.entities[key] = entity;
    }
    function setManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        for (var _i = 0, newEntities_3 = newEntities; _i < newEntities_3.length; _i++) {
            var entity = newEntities_3[_i];
            setOneMutably(entity, state);
        }
    }
    function setAllMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        state.ids = [];
        state.entities = {};
        addManyMutably(newEntities, state);
    }
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    function removeManyMutably(keys, state) {
        var didMutate = false;
        keys.forEach(function (key) {
            if (key in state.entities) {
                delete state.entities[key];
                didMutate = true;
            }
        });
        if (didMutate) {
            state.ids = state.ids.filter(function (id) { return id in state.entities; });
        }
    }
    function removeAllMutably(state) {
        Object.assign(state, {
            ids: [],
            entities: {}
        });
    }
    function takeNewKey(keys, update, state) {
        var original2 = state.entities[update.id];
        var updated = Object.assign({}, original2, update.changes);
        var newKey = selectIdValue(updated, selectId);
        var hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function updateManyMutably(updates, state) {
        var newKeys = {};
        var updatesPerEntity = {};
        updates.forEach(function (update) {
            if (update.id in state.entities) {
                updatesPerEntity[update.id] = {
                    id: update.id,
                    changes: __spreadValues(__spreadValues({}, updatesPerEntity[update.id] ? updatesPerEntity[update.id].changes : null), update.changes)
                };
            }
        });
        updates = Object.values(updatesPerEntity);
        var didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            var didMutateIds = updates.filter(function (update) { return takeNewKey(newKeys, update, state); }).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map(function (id) { return newKeys[id] || id; });
            }
        }
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(newEntities, state) {
        var _c = splitAddedUpdatedEntities(newEntities, selectId, state), added = _c[0], updated = _c[1];
        updateManyMutably(updated, state);
        addManyMutably(added, state);
    }
    return {
        removeAll: createSingleArgumentStateOperator(removeAllMutably),
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        setOne: createStateOperator(setOneMutably),
        setMany: createStateOperator(setManyMutably),
        setAll: createStateOperator(setAllMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably)
    };
}
// src/entities/sorted_state_adapter.ts
function createSortedStateAdapter(selectId, sort) {
    var _c = createUnsortedStateAdapter(selectId), removeOne = _c.removeOne, removeMany = _c.removeMany, removeAll = _c.removeAll;
    function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
    }
    function addManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        var models = newEntities.filter(function (model) { return !(selectIdValue(model, selectId) in state.entities); });
        if (models.length !== 0) {
            merge(models, state);
        }
    }
    function setOneMutably(entity, state) {
        return setManyMutably([entity], state);
    }
    function setManyMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        if (newEntities.length !== 0) {
            merge(newEntities, state);
        }
    }
    function setAllMutably(newEntities, state) {
        newEntities = ensureEntitiesArray(newEntities);
        state.entities = {};
        state.ids = [];
        addManyMutably(newEntities, state);
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        var original2 = state.entities[update.id];
        var updated = Object.assign({}, original2, update.changes);
        var newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    function updateManyMutably(updates, state) {
        var models = [];
        updates.forEach(function (update) { return takeUpdatedModel(models, update, state); });
        if (models.length !== 0) {
            merge(models, state);
        }
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(newEntities, state) {
        var _c = splitAddedUpdatedEntities(newEntities, selectId, state), added = _c[0], updated = _c[1];
        updateManyMutably(updated, state);
        addManyMutably(added, state);
    }
    function areArraysEqual(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length && i < b.length; i++) {
            if (a[i] === b[i]) {
                continue;
            }
            return false;
        }
        return true;
    }
    function merge(models, state) {
        models.forEach(function (model) {
            state.entities[selectId(model)] = model;
        });
        var allEntities = Object.values(state.entities);
        allEntities.sort(sort);
        var newSortedIds = allEntities.map(selectId);
        var ids = state.ids;
        if (!areArraysEqual(ids, newSortedIds)) {
            state.ids = newSortedIds;
        }
    }
    return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        setOne: createStateOperator(setOneMutably),
        setMany: createStateOperator(setManyMutably),
        setAll: createStateOperator(setAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably)
    };
}
// src/entities/create_adapter.ts
function createEntityAdapter(options) {
    if (options === void 0) { options = {}; }
    var _c = __spreadValues({
        sortComparer: false,
        selectId: function (instance) { return instance.id; }
    }, options), selectId = _c.selectId, sortComparer = _c.sortComparer;
    var stateFactory = createInitialStateFactory();
    var selectorsFactory = createSelectorsFactory();
    var stateAdapter = sortComparer ? createSortedStateAdapter(selectId, sortComparer) : createUnsortedStateAdapter(selectId);
    return __spreadValues(__spreadValues(__spreadValues({
        selectId: selectId,
        sortComparer: sortComparer
    }, stateFactory), selectorsFactory), stateAdapter);
}
// src/nanoid.ts
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function (size) {
    if (size === void 0) { size = 21; }
    var id = "";
    var i = size;
    while (i--) {
        id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
};
// src/createAsyncThunk.ts
var commonProperties = [
    "name",
    "message",
    "stack",
    "code"
];
var RejectWithValue = /** @class */ (function () {
    function RejectWithValue(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return RejectWithValue;
}());
var FulfillWithMeta = /** @class */ (function () {
    function FulfillWithMeta(payload, meta) {
        this.payload = payload;
        this.meta = meta;
    }
    return FulfillWithMeta;
}());
var miniSerializeError = function (value) {
    if (typeof value === "object" && value !== null) {
        var simpleError = {};
        for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
            var property = commonProperties_1[_i];
            if (typeof value[property] === "string") {
                simpleError[property] = value[property];
            }
        }
        return simpleError;
    }
    return { message: String(value) };
};
function createAsyncThunk(typePrefix, payloadCreator, options) {
    var fulfilled = createAction(typePrefix + "/fulfilled", function (payload, requestId, arg, meta) { return ({
        payload: payload,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
            arg: arg,
            requestId: requestId,
            requestStatus: "fulfilled"
        })
    }); });
    var pending = createAction(typePrefix + "/pending", function (requestId, arg, meta) { return ({
        payload: void 0,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
            arg: arg,
            requestId: requestId,
            requestStatus: "pending"
        })
    }); });
    var rejected = createAction(typePrefix + "/rejected", function (error, requestId, arg, payload, meta) { return ({
        payload: payload,
        error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
        meta: __spreadProps(__spreadValues({}, meta || {}), {
            arg: arg,
            requestId: requestId,
            rejectedWithValue: !!payload,
            requestStatus: "rejected",
            aborted: (error == null ? void 0 : error.name) === "AbortError",
            condition: (error == null ? void 0 : error.name) === "ConditionError"
        })
    }); });
    var displayedWarning = false;
    var AC = typeof AbortController !== "undefined" ? AbortController : /** @class */ (function () {
        function class_1() {
            this.signal = {
                aborted: false,
                addEventListener: function () {
                },
                dispatchEvent: function () {
                    return false;
                },
                onabort: function () {
                },
                removeEventListener: function () {
                }
            };
        }
        class_1.prototype.abort = function () {
            if (process.env.NODE_ENV !== "production") {
                if (!displayedWarning) {
                    displayedWarning = true;
                    console.info("This platform does not implement AbortController. \nIf you want to use the AbortController to react to `abort` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.");
                }
            }
        };
        return class_1;
    }());
    function actionCreator(arg) {
        return function (dispatch, getState, extra) {
            var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
            var abortController = new AC();
            var abortReason;
            var abortedPromise = new Promise(function (_, reject) { return abortController.signal.addEventListener("abort", function () { return reject({ name: "AbortError", message: abortReason || "Aborted" }); }); });
            var started = false;
            function abort(reason) {
                if (started) {
                    abortReason = reason;
                    abortController.abort();
                }
            }
            var promise = function () {
                return __async(this, null, function () {
                    var _a, _b, finalAction, conditionResult, err_1, skipDispatch;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 4, , 5]);
                                conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, { getState: getState, extra: extra });
                                if (!isThenable(conditionResult)) return [3 /*break*/, 2];
                                return [4 /*yield*/, conditionResult];
                            case 1:
                                conditionResult = _c.sent();
                                _c.label = 2;
                            case 2:
                                if (conditionResult === false) {
                                    throw {
                                        name: "ConditionError",
                                        message: "Aborted due to condition callback returning false."
                                    };
                                }
                                started = true;
                                dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, { requestId: requestId, arg: arg }, { getState: getState, extra: extra })));
                                return [4 /*yield*/, Promise.race([
                                        abortedPromise,
                                        Promise.resolve(payloadCreator(arg, {
                                            dispatch: dispatch,
                                            getState: getState,
                                            extra: extra,
                                            requestId: requestId,
                                            signal: abortController.signal,
                                            rejectWithValue: function (value, meta) {
                                                return new RejectWithValue(value, meta);
                                            },
                                            fulfillWithValue: function (value, meta) {
                                                return new FulfillWithMeta(value, meta);
                                            }
                                        })).then(function (result) {
                                            if (result instanceof RejectWithValue) {
                                                throw result;
                                            }
                                            if (result instanceof FulfillWithMeta) {
                                                return fulfilled(result.payload, requestId, arg, result.meta);
                                            }
                                            return fulfilled(result, requestId, arg);
                                        })
                                    ])];
                            case 3:
                                finalAction = _c.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                err_1 = _c.sent();
                                finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                                return [3 /*break*/, 5];
                            case 5:
                                skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                                if (!skipDispatch) {
                                    dispatch(finalAction);
                                }
                                return [2 /*return*/, finalAction];
                        }
                    });
                });
            }();
            return Object.assign(promise, {
                abort: abort,
                requestId: requestId,
                arg: arg,
                unwrap: function () {
                    return promise.then(unwrapResult);
                }
            });
        };
    }
    return Object.assign(actionCreator, {
        pending: pending,
        rejected: rejected,
        fulfilled: fulfilled,
        typePrefix: typePrefix
    });
}
function unwrapResult(action) {
    if (action.meta && action.meta.rejectedWithValue) {
        throw action.payload;
    }
    if (action.error) {
        throw action.error;
    }
    return action.payload;
}
function isThenable(value) {
    return value !== null && typeof value === "object" && typeof value.then === "function";
}
// src/tsHelpers.ts
var hasMatchFunction = function (v) {
    return v && typeof v.match === "function";
};
// src/matchers.ts
var matches = function (matcher, action) {
    if (hasMatchFunction(matcher)) {
        return matcher.match(action);
    }
    else {
        return matcher(action);
    }
};
function isAnyOf() {
    var matchers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        matchers[_i] = arguments[_i];
    }
    return function (action) {
        return matchers.some(function (matcher) { return matches(matcher, action); });
    };
}
function isAllOf() {
    var matchers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        matchers[_i] = arguments[_i];
    }
    return function (action) {
        return matchers.every(function (matcher) { return matches(matcher, action); });
    };
}
function hasExpectedRequestMetadata(action, validStatus) {
    if (!action || !action.meta)
        return false;
    var hasValidRequestId = typeof action.meta.requestId === "string";
    var hasValidRequestStatus = validStatus.indexOf(action.meta.requestStatus) > -1;
    return hasValidRequestId && hasValidRequestStatus;
}
function isAsyncThunkArray(a) {
    return typeof a[0] === "function" && "pending" in a[0] && "fulfilled" in a[0] && "rejected" in a[0];
}
function isPending() {
    var asyncThunks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        asyncThunks[_i] = arguments[_i];
    }
    if (asyncThunks.length === 0) {
        return function (action) { return hasExpectedRequestMetadata(action, ["pending"]); };
    }
    if (!isAsyncThunkArray(asyncThunks)) {
        return isPending()(asyncThunks[0]);
    }
    return function (action) {
        var matchers = asyncThunks.map(function (asyncThunk) { return asyncThunk.pending; });
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function isRejected() {
    var asyncThunks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        asyncThunks[_i] = arguments[_i];
    }
    if (asyncThunks.length === 0) {
        return function (action) { return hasExpectedRequestMetadata(action, ["rejected"]); };
    }
    if (!isAsyncThunkArray(asyncThunks)) {
        return isRejected()(asyncThunks[0]);
    }
    return function (action) {
        var matchers = asyncThunks.map(function (asyncThunk) { return asyncThunk.rejected; });
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function isRejectedWithValue() {
    var asyncThunks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        asyncThunks[_i] = arguments[_i];
    }
    var hasFlag = function (action) {
        return action && action.meta && action.meta.rejectedWithValue;
    };
    if (asyncThunks.length === 0) {
        return function (action) {
            var combinedMatcher = isAllOf(isRejected.apply(void 0, asyncThunks), hasFlag);
            return combinedMatcher(action);
        };
    }
    if (!isAsyncThunkArray(asyncThunks)) {
        return isRejectedWithValue()(asyncThunks[0]);
    }
    return function (action) {
        var combinedMatcher = isAllOf(isRejected.apply(void 0, asyncThunks), hasFlag);
        return combinedMatcher(action);
    };
}
function isFulfilled() {
    var asyncThunks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        asyncThunks[_i] = arguments[_i];
    }
    if (asyncThunks.length === 0) {
        return function (action) { return hasExpectedRequestMetadata(action, ["fulfilled"]); };
    }
    if (!isAsyncThunkArray(asyncThunks)) {
        return isFulfilled()(asyncThunks[0]);
    }
    return function (action) {
        var matchers = asyncThunks.map(function (asyncThunk) { return asyncThunk.fulfilled; });
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
function isAsyncThunkAction() {
    var asyncThunks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        asyncThunks[_i] = arguments[_i];
    }
    if (asyncThunks.length === 0) {
        return function (action) { return hasExpectedRequestMetadata(action, ["pending", "fulfilled", "rejected"]); };
    }
    if (!isAsyncThunkArray(asyncThunks)) {
        return isAsyncThunkAction()(asyncThunks[0]);
    }
    return function (action) {
        var matchers = [];
        for (var _i = 0, asyncThunks_1 = asyncThunks; _i < asyncThunks_1.length; _i++) {
            var asyncThunk = asyncThunks_1[_i];
            matchers.push(asyncThunk.pending, asyncThunk.rejected, asyncThunk.fulfilled);
        }
        var combinedMatcher = isAnyOf.apply(void 0, matchers);
        return combinedMatcher(action);
    };
}
// src/index.ts
(0,immer__WEBPACK_IMPORTED_MODULE_2__.enableES5)();

//# sourceMappingURL=redux-toolkit.esm.js.map

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__DO_NOT_USE__ActionTypes": () => (/* binding */ ActionTypes),
/* harmony export */   "applyMiddleware": () => (/* binding */ applyMiddleware),
/* harmony export */   "bindActionCreators": () => (/* binding */ bindActionCreators),
/* harmony export */   "combineReducers": () => (/* binding */ combineReducers),
/* harmony export */   "compose": () => (/* binding */ compose),
/* harmony export */   "createStore": () => (/* binding */ createStore)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (process.env.NODE_ENV !== 'production') {
    typeOfVal = miniKindOf(val);
  }

  return typeOfVal;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(0) : 'It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(3) : 'You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }

    if (isDispatching) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(5) : 'You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(6) : 'You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }

    if (typeof action.type === 'undefined') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }

    if (isDispatching) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(9) : 'Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(12) : "The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(13) : "The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(16) : "bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(15) : 'Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectSpread2)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultMemoize": () => (/* reexport safe */ _defaultMemoize__WEBPACK_IMPORTED_MODULE_0__.defaultMemoize),
/* harmony export */   "defaultEqualityCheck": () => (/* reexport safe */ _defaultMemoize__WEBPACK_IMPORTED_MODULE_0__.defaultEqualityCheck),
/* harmony export */   "createSelectorCreator": () => (/* binding */ createSelectorCreator),
/* harmony export */   "createSelector": () => (/* binding */ createSelector),
/* harmony export */   "createStructuredSelector": () => (/* binding */ createStructuredSelector)
/* harmony export */ });
/* harmony import */ var _defaultMemoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);



function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep === 'function' ? "function " + (dep.name || 'unnamed') + "()" : typeof dep;
    }).join(', ');
    throw new Error("createSelector expects all input-selectors to be functions, but received the following types: [" + dependencyTypes + "]");
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptionsFromArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptionsFromArgs[_key - 1] = arguments[_key];
  }

  var createSelector = function createSelector() {
    for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var _recomputations = 0;

    var _lastResult; // Due to the intricacies of rest params, we can't do an optional arg after `...funcs`.
    // So, start by declaring the default value here.
    // (And yes, the words 'memoize' and 'options' appear too many times in this next sequence.)


    var directlyPassedOptions = {
      memoizeOptions: undefined
    }; // Normally, the result func or "output selector" is the last arg

    var resultFunc = funcs.pop(); // If the result func is actually an _object_, assume it's our options object

    if (typeof resultFunc === 'object') {
      directlyPassedOptions = resultFunc; // and pop the real result func off

      resultFunc = funcs.pop();
    }

    if (typeof resultFunc !== 'function') {
      throw new Error("createSelector expects an output function after the inputs, but received: [" + typeof resultFunc + "]");
    } // Determine which set of options we're using. Prefer options passed directly,
    // but fall back to options given to createSelectorCreator.


    var _directlyPassedOption = directlyPassedOptions,
        _directlyPassedOption2 = _directlyPassedOption.memoizeOptions,
        memoizeOptions = _directlyPassedOption2 === void 0 ? memoizeOptionsFromArgs : _directlyPassedOption2; // Simplifying assumption: it's unlikely that the first options arg of the provided memoizer
    // is an array. In most libs I've looked at, it's an equality function or options object.
    // Based on that, if `memoizeOptions` _is_ an array, we assume it's a full
    // user-provided array of options. Otherwise, it must be just the _first_ arg, and so
    // we wrap it in an array so we can apply it.

    var finalMemoizeOptions = Array.isArray(memoizeOptions) ? memoizeOptions : [memoizeOptions];
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize.apply(void 0, [function () {
      _recomputations++; // apply arguments instead of spreading for performance.

      return resultFunc.apply(null, arguments);
    }].concat(finalMemoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.

    var selector = memoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        // @ts-ignore
        params.push(dependencies[i].apply(null, arguments));
      } // apply arguments instead of spreading for performance.


      _lastResult = memoizedResultFunc.apply(null, params);
      return _lastResult;
    });
    Object.assign(selector, {
      resultFunc: resultFunc,
      memoizedResultFunc: memoizedResultFunc,
      dependencies: dependencies,
      lastResult: function lastResult() {
        return _lastResult;
      },
      recomputations: function recomputations() {
        return _recomputations;
      },
      resetRecomputations: function resetRecomputations() {
        return _recomputations = 0;
      }
    });
    return selector;
  }; // @ts-ignore


  return createSelector;
}
var createSelector = /* #__PURE__ */createSelectorCreator(_defaultMemoize__WEBPACK_IMPORTED_MODULE_0__.defaultMemoize);
// Manual definition of state and output arguments
var createStructuredSelector = function createStructuredSelector(selectors, selectorCreator) {
  if (selectorCreator === void 0) {
    selectorCreator = createSelector;
  }

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ("where each property is a selector, instead received a " + typeof selectors));
  }

  var objectKeys = Object.keys(selectors);
  var resultSelector = selectorCreator( // @ts-ignore
  objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
  return resultSelector;
};

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultEqualityCheck": () => (/* binding */ defaultEqualityCheck),
/* harmony export */   "createCacheKeyComparator": () => (/* binding */ createCacheKeyComparator),
/* harmony export */   "defaultMemoize": () => (/* binding */ defaultMemoize)
/* harmony export */ });
// Cache implementation based on Erik Rasmussen's `lru-memoize`:
// https://github.com/erikras/lru-memoize
var NOT_FOUND = 'NOT_FOUND';

function createSingletonCache(equals) {
  var entry;
  return {
    get: function get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }

      return NOT_FOUND;
    },
    put: function put(key, value) {
      entry = {
        key: key,
        value: value
      };
    },
    getEntries: function getEntries() {
      return entry ? [entry] : [];
    },
    clear: function clear() {
      entry = undefined;
    }
  };
}

function createLruCache(maxSize, equals) {
  var entries = [];

  function get(key) {
    var cacheIndex = entries.findIndex(function (entry) {
      return equals(key, entry.key);
    }); // We found a cached entry

    if (cacheIndex > -1) {
      var entry = entries[cacheIndex]; // Cached entry not at top of cache, move it to the top

      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }

      return entry.value;
    } // No entry found in cache, return sentinel


    return NOT_FOUND;
  }

  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      // TODO Is unshift slow?
      entries.unshift({
        key: key,
        value: value
      });

      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }

  function getEntries() {
    return entries;
  }

  function clear() {
    entries = [];
  }

  return {
    get: get,
    put: put,
    getEntries: getEntries,
    clear: clear
  };
}

var defaultEqualityCheck = function defaultEqualityCheck(a, b) {
  return a === b;
};
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.


    var length = prev.length;

    for (var i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }

    return true;
  };
}
// defaultMemoize now supports a configurable cache size with LRU behavior,
// and optional comparison of the result value with existing values
function defaultMemoize(func, equalityCheckOrOptions) {
  var providedOptions = typeof equalityCheckOrOptions === 'object' ? equalityCheckOrOptions : {
    equalityCheck: equalityCheckOrOptions
  };
  var _providedOptions$equa = providedOptions.equalityCheck,
      equalityCheck = _providedOptions$equa === void 0 ? defaultEqualityCheck : _providedOptions$equa,
      _providedOptions$maxS = providedOptions.maxSize,
      maxSize = _providedOptions$maxS === void 0 ? 1 : _providedOptions$maxS,
      resultEqualityCheck = providedOptions.resultEqualityCheck;
  var comparator = createCacheKeyComparator(equalityCheck);
  var cache = maxSize === 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator); // we reference arguments instead of spreading them for performance reasons

  function memoized() {
    var value = cache.get(arguments);

    if (value === NOT_FOUND) {
      // @ts-ignore
      value = func.apply(null, arguments);

      if (resultEqualityCheck) {
        var entries = cache.getEntries();
        var matchingEntry = entries.find(function (entry) {
          return resultEqualityCheck(entry.value, value);
        });

        if (matchingEntry) {
          value = matchingEntry.value;
        }
      }

      cache.put(arguments, value);
    }

    return value;
  }

  memoized.clearCache = function () {
    return cache.clear();
  };

  return memoized;
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Immer": () => (/* binding */ un),
/* harmony export */   "applyPatches": () => (/* binding */ pn),
/* harmony export */   "castDraft": () => (/* binding */ K),
/* harmony export */   "castImmutable": () => (/* binding */ $),
/* harmony export */   "createDraft": () => (/* binding */ ln),
/* harmony export */   "current": () => (/* binding */ D),
/* harmony export */   "enableAllPlugins": () => (/* binding */ J),
/* harmony export */   "enableES5": () => (/* binding */ N),
/* harmony export */   "enableMapSet": () => (/* binding */ C),
/* harmony export */   "enablePatches": () => (/* binding */ T),
/* harmony export */   "finishDraft": () => (/* binding */ dn),
/* harmony export */   "freeze": () => (/* binding */ d),
/* harmony export */   "immerable": () => (/* binding */ L),
/* harmony export */   "isDraft": () => (/* binding */ r),
/* harmony export */   "isDraftable": () => (/* binding */ t),
/* harmony export */   "nothing": () => (/* binding */ H),
/* harmony export */   "original": () => (/* binding */ e),
/* harmony export */   "produce": () => (/* binding */ fn),
/* harmony export */   "produceWithPatches": () => (/* binding */ cn),
/* harmony export */   "setAutoFreeze": () => (/* binding */ sn),
/* harmony export */   "setUseProxies": () => (/* binding */ vn)
/* harmony export */ });
function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if("production"!==process.env.NODE_ENV){var i=Y[n],o=i?"function"==typeof i?i.apply(null,t):i:"unknown error nr: "+n;throw Error("[Immer] "+o)}throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return"'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return!!n&&!!n[Q]}function t(n){return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var r=Object.getPrototypeOf(n);if(null===r)return!0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!n.constructor[L]||s(n)||v(n))}function e(t){return r(t)||n(23,t),t[Q].t}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n)})):n.forEach((function(t,e){return r(e,t,n)}))}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?(n.delete(r),n.add(t)):n[r]=t}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)?n:(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0),n)}function h(){n(2)}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r)}function _(){return"production"===process.env.NODE_ENV||U||n(0),U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r)}function O(n){g(n),n.p.forEach(S),n.p=null}function g(n){n===U&&(U=n.l)}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.O=!0}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.g||b("ES5").S(e,r,o),o?(i[Q].P&&(O(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),O(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(3===e.i?new Set(o):o,(function(r,i){return A(n,e,o,r,i,t)})),x(n,o,!1),t&&n.u&&b("Patches").R(e,t,n.u,n.s)}return e.o}function A(e,i,o,a,c,s){if("production"!==process.env.NODE_ENV&&c===o&&n(5),r(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!r(v))return;e.m=!1}if(t(c)&&!y(c)){if(!e.h.F&&e._<1)return;M(e,c),i&&i.A.l||x(e,c)}}function x(n,r,t){void 0===t&&(t=!1),n.h.F&&n.m&&d(r,t)}function z(n,r){var t=n[Q];return(t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t)}}function k(n){n.P||(n.P=!0,n.l&&k(n.l))}function E(n){n.o||(n.o=l(n.t))}function R(n,r,t){var e=s(r)?b("MapSet").N(r,t):v(r)?b("MapSet").T(r,t):n.g?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return(t?t.A:_()).p.push(e),e}function D(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=F(r,c),u.I=!1}else e=F(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t))})),3===c?new Set(e):e}(e)}function F(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function N(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return"production"!==process.env.NODE_ENV&&f(r),en.get(r,n)},set:function(r){var t=this[Q];"production"!==process.env.NODE_ENV&&f(t),en.set(t,n,r)}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&k(t);break;case 4:o(t)&&k(t)}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!u(r,o))return!0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!c(f,a))return!0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return!0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return!0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return!0;return!1}function f(r){r.O&&n(3,JSON.stringify(p(r)))}var s={};m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:i,o:null,O:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.D,c=t.i;if(4===c)i(o,(function(r){r!==Q&&(void 0!==e[r]||u(e,r)?f[r]||n(o[r]):(f[r]=!0,k(t)))})),i(e,(function(n){void 0!==o[n]||u(o,n)||(f[n]=!1,k(t))}));else if(5===c){if(a(t)&&(k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l])}}}}(n.p[0]),e(n.p))},K:function(n){return 4===n.i?o(n):a(n)}})}function T(){function e(n){if(!t(n))return n;if(Array.isArray(n))return n.map(e);if(s(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],e(n[1])]})));if(v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return u(n,L)&&(r[L]=n[L]),r}function f(n){return r(n)?e(n):n}var c="add";m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=o(f),p=""+i[s];0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof f&&"prototype"===p&&n(24),"object"!=typeof(f=a(f,p))&&n(15,i.join("/"))}var l=o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:n(16);default:return f[h]=d}case c:switch(l){case 1:return"-"===h?f.push(d):f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:n(17,u)}})),r},R:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;i(n.D,(function(n,i){var v=a(o,n),p=a(s,n),l=i?u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)})}}))}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.D,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1]}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])})}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])})}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length})}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n})}u++})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n})}u++}))}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r===H?void 0:r}),e.push({op:"replace",path:[],value:n})}})}function C(){function r(n,r){function t(){this.constructor=n}a(n,r),n.prototype=(t.prototype=r.prototype,new t)}function e(n){n.o||(n.D=new Map,n.o=new Map(n.t))}function o(n){n.o||(n.o=new Set,n.t.forEach((function(r){if(t(r)){var e=R(n.A.h,r,n);n.p.set(r,e),n.o.add(e)}else n.o.add(r)})))}function u(r){r.O&&n(3,JSON.stringify(p(r)))}var a=function(n,r){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(n,r)},f=function(){function n(n,r){return this[Q]={i:2,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,D:void 0,t:n,k:this,C:!1,O:!1},this}r(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return p(this[Q]).size}}),o.has=function(n){return p(this[Q]).has(n)},o.set=function(n,r){var t=this[Q];return u(t),p(t).has(n)&&p(t).get(n)===r||(e(t),k(t),t.D.set(n,!0),t.o.set(n,r),t.D.set(n,!0)),this},o.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),e(r),k(r),r.t.has(n)?r.D.set(n,!1):r.D.delete(n),r.o.delete(n),!0},o.clear=function(){var n=this[Q];u(n),p(n).size&&(e(n),k(n),n.D=new Map,i(n.t,(function(r){n.D.set(r,!1)})),n.o.clear())},o.forEach=function(n,r){var t=this;p(this[Q]).forEach((function(e,i){n.call(r,t.get(i),i,t)}))},o.get=function(n){var r=this[Q];u(r);var i=p(r).get(n);if(r.I||!t(i))return i;if(i!==r.t.get(n))return i;var o=R(r.A.h,i,r);return e(r),r.o.set(n,o),o},o.keys=function(){return p(this[Q]).keys()},o.values=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.values()},n.next=function(){var n=t.next();return n.done?n:{done:!1,value:r.get(n.value)}},n},o.entries=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.entries()},n.next=function(){var n=t.next();if(n.done)return n;var e=r.get(n.value);return{done:!1,value:[n.value,e]}},n},o[V]=function(){return this.entries()},n}(),c=function(){function n(n,r){return this[Q]={i:3,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,O:!1,C:!1},this}r(n,Set);var t=n.prototype;return Object.defineProperty(t,"size",{get:function(){return p(this[Q]).size}}),t.has=function(n){var r=this[Q];return u(r),r.o?!!r.o.has(n)||!(!r.p.has(n)||!r.o.has(r.p.get(n))):r.t.has(n)},t.add=function(n){var r=this[Q];return u(r),this.has(n)||(o(r),k(r),r.o.add(n)),this},t.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),o(r),k(r),r.o.delete(n)||!!r.p.has(n)&&r.o.delete(r.p.get(n))},t.clear=function(){var n=this[Q];u(n),p(n).size&&(o(n),k(n),n.o.clear())},t.values=function(){var n=this[Q];return u(n),o(n),n.o.values()},t.entries=function(){var n=this[Q];return u(n),o(n),n.o.entries()},t.keys=function(){return this.values()},t[V]=function(){return this.values()},t.forEach=function(n,r){for(var t=this.values(),e=t.next();!e.done;)n.call(r,e.value,e.value,this),e=t.next()},n}();m("MapSet",{N:function(n,r){return new f(n,r)},T:function(n,r){return new c(n,r)}})}function J(){N(),C(),T()}function K(n){return n}function $(n){return n}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",V="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return"Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return"Unsupported patch operation: "+n},18:function(n){return"The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return"'current' expects a draft, got: "+n},23:function(n){return"'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t)})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=R(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.D[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return!0;E(n),k(n)}return n.o[r]===t&&"number"!=typeof t&&(void 0!==t||r in n.o)||(n.o[r]=t,n.D[r]=!0,!0)},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.D[r]=!1,E(n),k(n)):delete n.D[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12)}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)}})),on.deleteProperty=function(r,t){return"production"!==process.env.NODE_ENV&&isNaN(parseInt(t))&&n(13),on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return"production"!==process.env.NODE_ENV&&"length"!==t&&isNaN(parseInt(t))&&n(14),en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.g=B,this.F=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return(t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=R(e,r,void 0),v=!0;try{f=i(s),v=!1}finally{v?O(c):g(c)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw O(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.F&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l)}return f}n(21,r)},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return[n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=D(e));var i=w(this),o=R(this,e,void 0);return o[Q].C=!0,g(i),o},i.finishDraft=function(r,t){var e=r&&r[Q];"production"!==process.env.NODE_ENV&&(e&&e.C||n(9),e.I&&n(10));var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.F=n},i.setUseProxies=function(r){r&&!B&&n(20),this.g=r},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fn);
//# sourceMappingURL=immer.esm.js.map


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** A function that accepts a potential "extra argument" value to be injected later,
 * and returns an instance of the thunk middleware that uses that value
 */
function createThunkMiddleware(extraArgument) {
  // Standard Redux middleware definition pattern:
  // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
  var middleware = function middleware(_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        // The thunk middleware looks for any functions that were passed to `store.dispatch`.
        // If this "action" is really a function, call it and return the result.
        if (typeof action === 'function') {
          // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
          return action(dispatch, getState, extraArgument);
        } // Otherwise, pass the action down the middleware chain as usual


        return next(action);
      };
    };
  };

  return middleware;
}

var thunk = createThunkMiddleware(); // Attach the factory function so users can create a customized version
// with whatever "extra arg" they want to inject into their thunks

thunk.withExtraArgument = createThunkMiddleware;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thunk);

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Kafka = __webpack_require__(14)
const PartitionAssigners = __webpack_require__(382)
const AssignerProtocol = __webpack_require__(378)
const Partitioners = __webpack_require__(348)
const Compression = __webpack_require__(28)
const ResourceTypes = __webpack_require__(395)
const ConfigResourceTypes = __webpack_require__(283)
const ConfigSource = __webpack_require__(282)
const AclResourceTypes = __webpack_require__(388)
const AclOperationTypes = __webpack_require__(389)
const AclPermissionTypes = __webpack_require__(390)
const ResourcePatternTypes = __webpack_require__(391)
const Errors = __webpack_require__(19)
const { LEVELS } = __webpack_require__(15)

module.exports = {
  Kafka,
  PartitionAssigners,
  AssignerProtocol,
  Partitioners,
  logLevel: LEVELS,
  CompressionTypes: Compression.Types,
  CompressionCodecs: Compression.Codecs,
  /**
   * @deprecated
   * @see https://github.com/tulios/kafkajs/issues/649
   *
   * Use ConfigResourceTypes or AclResourceTypes instead.
   */
  ResourceTypes,
  ConfigResourceTypes,
  AclResourceTypes,
  AclOperationTypes,
  AclPermissionTypes,
  ResourcePatternTypes,
  ConfigSource,
  ...Errors,
}


/***/ }),
/* 14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  createLogger,
  LEVELS: { INFO },
} = __webpack_require__(15)

const InstrumentationEventEmitter = __webpack_require__(16)
const LoggerConsole = __webpack_require__(21)
const Cluster = __webpack_require__(22)
const createProducer = __webpack_require__(347)
const createConsumer = __webpack_require__(366)
const createAdmin = __webpack_require__(384)
const ISOLATION_LEVEL = __webpack_require__(66)
const defaultSocketFactory = __webpack_require__(392)

const PRIVATE = {
  CREATE_CLUSTER: Symbol('private:Kafka:createCluster'),
  CLUSTER_RETRY: Symbol('private:Kafka:clusterRetry'),
  LOGGER: Symbol('private:Kafka:logger'),
  OFFSETS: Symbol('private:Kafka:offsets'),
}

const DEFAULT_METADATA_MAX_AGE = 300000

module.exports = class Client {
  /**
   * @param {Object} options
   * @param {Array<string>} options.brokers example: ['127.0.0.1:9092', '127.0.0.1:9094']
   * @param {Object} options.ssl
   * @param {Object} options.sasl
   * @param {string} options.clientId
   * @param {number} options.connectionTimeout - in milliseconds
   * @param {number} options.authenticationTimeout - in milliseconds
   * @param {number} options.reauthenticationThreshold - in milliseconds
   * @param {number} [options.requestTimeout=30000] - in milliseconds
   * @param {boolean} [options.enforceRequestTimeout]
   * @param {import("../types").RetryOptions} [options.retry]
   * @param {import("../types").ISocketFactory} [options.socketFactory]
   */
  constructor({
    brokers,
    ssl,
    sasl,
    clientId,
    connectionTimeout,
    authenticationTimeout,
    reauthenticationThreshold,
    requestTimeout,
    enforceRequestTimeout = false,
    retry,
    socketFactory = defaultSocketFactory(),
    logLevel = INFO,
    logCreator = LoggerConsole,
  }) {
    this[PRIVATE.OFFSETS] = new Map()
    this[PRIVATE.LOGGER] = createLogger({ level: logLevel, logCreator })
    this[PRIVATE.CLUSTER_RETRY] = retry
    this[PRIVATE.CREATE_CLUSTER] = ({
      metadataMaxAge,
      allowAutoTopicCreation = true,
      maxInFlightRequests = null,
      instrumentationEmitter = null,
      isolationLevel,
    }) =>
      new Cluster({
        logger: this[PRIVATE.LOGGER],
        retry: this[PRIVATE.CLUSTER_RETRY],
        offsets: this[PRIVATE.OFFSETS],
        socketFactory,
        brokers,
        ssl,
        sasl,
        clientId,
        connectionTimeout,
        authenticationTimeout,
        reauthenticationThreshold,
        requestTimeout,
        enforceRequestTimeout,
        metadataMaxAge,
        instrumentationEmitter,
        allowAutoTopicCreation,
        maxInFlightRequests,
        isolationLevel,
      })
  }

  /**
   * @public
   */
  producer({
    createPartitioner,
    retry,
    metadataMaxAge = DEFAULT_METADATA_MAX_AGE,
    allowAutoTopicCreation,
    idempotent,
    transactionalId,
    transactionTimeout,
    maxInFlightRequests,
  } = {}) {
    const instrumentationEmitter = new InstrumentationEventEmitter()
    const cluster = this[PRIVATE.CREATE_CLUSTER]({
      metadataMaxAge,
      allowAutoTopicCreation,
      maxInFlightRequests,
      instrumentationEmitter,
    })

    return createProducer({
      retry: { ...this[PRIVATE.CLUSTER_RETRY], ...retry },
      logger: this[PRIVATE.LOGGER],
      cluster,
      createPartitioner,
      idempotent,
      transactionalId,
      transactionTimeout,
      instrumentationEmitter,
    })
  }

  /**
   * @public
   */
  consumer({
    groupId,
    partitionAssigners,
    metadataMaxAge = DEFAULT_METADATA_MAX_AGE,
    sessionTimeout,
    rebalanceTimeout,
    heartbeatInterval,
    maxBytesPerPartition,
    minBytes,
    maxBytes,
    maxWaitTimeInMs,
    retry = { retries: 5 },
    allowAutoTopicCreation,
    maxInFlightRequests,
    readUncommitted = false,
    rackId = '',
  } = {}) {
    const isolationLevel = readUncommitted
      ? ISOLATION_LEVEL.READ_UNCOMMITTED
      : ISOLATION_LEVEL.READ_COMMITTED

    const instrumentationEmitter = new InstrumentationEventEmitter()
    const cluster = this[PRIVATE.CREATE_CLUSTER]({
      metadataMaxAge,
      allowAutoTopicCreation,
      maxInFlightRequests,
      isolationLevel,
      instrumentationEmitter,
    })

    return createConsumer({
      retry: { ...this[PRIVATE.CLUSTER_RETRY], ...retry },
      logger: this[PRIVATE.LOGGER],
      cluster,
      groupId,
      partitionAssigners,
      sessionTimeout,
      rebalanceTimeout,
      heartbeatInterval,
      maxBytesPerPartition,
      minBytes,
      maxBytes,
      maxWaitTimeInMs,
      isolationLevel,
      instrumentationEmitter,
      rackId,
      metadataMaxAge,
    })
  }

  /**
   * @public
   */
  admin({ retry } = {}) {
    const instrumentationEmitter = new InstrumentationEventEmitter()
    const cluster = this[PRIVATE.CREATE_CLUSTER]({
      allowAutoTopicCreation: false,
      instrumentationEmitter,
    })

    return createAdmin({
      retry: { ...this[PRIVATE.CLUSTER_RETRY], ...retry },
      logger: this[PRIVATE.LOGGER],
      instrumentationEmitter,
      cluster,
    })
  }

  /**
   * @public
   */
  logger() {
    return this[PRIVATE.LOGGER]
  }
}


/***/ }),
/* 15 */
/***/ ((module) => {

const { assign } = Object

const LEVELS = {
  NOTHING: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 4,
  DEBUG: 5,
}

const createLevel = (label, level, currentLevel, namespace, logFunction) => (
  message,
  extra = {}
) => {
  if (level > currentLevel()) return
  logFunction({
    namespace,
    level,
    label,
    log: assign(
      {
        timestamp: new Date().toISOString(),
        logger: 'kafkajs',
        message,
      },
      extra
    ),
  })
}

const evaluateLogLevel = logLevel => {
  const envLogLevel = (process.env.KAFKAJS_LOG_LEVEL || '').toUpperCase()
  return LEVELS[envLogLevel] == null ? logLevel : LEVELS[envLogLevel]
}

const createLogger = ({ level = LEVELS.INFO, logCreator } = {}) => {
  let logLevel = evaluateLogLevel(level)
  const logFunction = logCreator(logLevel)

  const createNamespace = (namespace, logLevel = null) => {
    const namespaceLogLevel = evaluateLogLevel(logLevel)
    return createLogFunctions(namespace, namespaceLogLevel)
  }

  const createLogFunctions = (namespace, namespaceLogLevel = null) => {
    const currentLogLevel = () => (namespaceLogLevel == null ? logLevel : namespaceLogLevel)
    const logger = {
      info: createLevel('INFO', LEVELS.INFO, currentLogLevel, namespace, logFunction),
      error: createLevel('ERROR', LEVELS.ERROR, currentLogLevel, namespace, logFunction),
      warn: createLevel('WARN', LEVELS.WARN, currentLogLevel, namespace, logFunction),
      debug: createLevel('DEBUG', LEVELS.DEBUG, currentLogLevel, namespace, logFunction),
    }

    return assign(logger, {
      namespace: createNamespace,
      setLogLevel: newLevel => {
        logLevel = newLevel
      },
    })
  }

  return createLogFunctions()
}

module.exports = {
  LEVELS,
  createLogger,
}


/***/ }),
/* 16 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { EventEmitter } = __webpack_require__(17)
const InstrumentationEvent = __webpack_require__(18)
const { KafkaJSError } = __webpack_require__(19)

module.exports = class InstrumentationEventEmitter {
  constructor() {
    this.emitter = new EventEmitter()
  }

  /**
   * @param {string} eventName
   * @param {Object} payload
   */
  emit(eventName, payload) {
    if (!eventName) {
      throw new KafkaJSError('Invalid event name', { retriable: false })
    }

    if (this.emitter.listenerCount(eventName) > 0) {
      const event = new InstrumentationEvent(eventName, payload)
      this.emitter.emit(eventName, event)
    }
  }

  /**
   * @param {string} eventName
   * @param {(...args: any[]) => void} listener
   * @returns {import("../../types").RemoveInstrumentationEventListener<string>} removeListener
   */
  addListener(eventName, listener) {
    this.emitter.addListener(eventName, listener)
    return () => this.emitter.removeListener(eventName, listener)
  }
}


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),
/* 18 */
/***/ ((module) => {

let id = 0
const nextId = () => {
  if (id === Number.MAX_VALUE) {
    id = 0
  }

  return id++
}

class InstrumentationEvent {
  /**
   * @param {String} type
   * @param {Object} payload
   */
  constructor(type, payload) {
    this.id = nextId()
    this.type = type
    this.timestamp = Date.now()
    this.payload = payload
  }
}

module.exports = InstrumentationEvent


/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const pkgJson = __webpack_require__(20)
const { bugs } = pkgJson

class KafkaJSError extends Error {
  constructor(e, { retriable = true } = {}) {
    super(e)
    Error.captureStackTrace(this, this.constructor)
    this.message = e.message || e
    this.name = 'KafkaJSError'
    this.retriable = retriable
    this.helpUrl = e.helpUrl
  }
}

class KafkaJSNonRetriableError extends KafkaJSError {
  constructor(e) {
    super(e, { retriable: false })
    this.name = 'KafkaJSNonRetriableError'
    this.originalError = e
  }
}

class KafkaJSProtocolError extends KafkaJSError {
  constructor(e, { retriable = e.retriable } = {}) {
    super(e, { retriable })
    this.type = e.type
    this.code = e.code
    this.name = 'KafkaJSProtocolError'
  }
}

class KafkaJSOffsetOutOfRange extends KafkaJSProtocolError {
  constructor(e, { topic, partition }) {
    super(e)
    this.topic = topic
    this.partition = partition
    this.name = 'KafkaJSOffsetOutOfRange'
  }
}

class KafkaJSMemberIdRequired extends KafkaJSProtocolError {
  constructor(e, { memberId }) {
    super(e)
    this.memberId = memberId
    this.name = 'KafkaJSMemberIdRequired'
  }
}

class KafkaJSNumberOfRetriesExceeded extends KafkaJSNonRetriableError {
  constructor(e, { retryCount, retryTime }) {
    super(e)
    this.stack = `${this.name}\n  Caused by: ${e.stack}`
    this.originalError = e
    this.retryCount = retryCount
    this.retryTime = retryTime
    this.name = 'KafkaJSNumberOfRetriesExceeded'
  }
}

class KafkaJSConnectionError extends KafkaJSError {
  constructor(e, { broker, code } = {}) {
    super(e)
    this.broker = broker
    this.code = code
    this.name = 'KafkaJSConnectionError'
  }
}

class KafkaJSConnectionClosedError extends KafkaJSConnectionError {
  constructor(e, { host, port } = {}) {
    super(e, { broker: `${host}:${port}` })
    this.host = host
    this.port = port
    this.name = 'KafkaJSConnectionClosedError'
  }
}

class KafkaJSRequestTimeoutError extends KafkaJSError {
  constructor(e, { broker, correlationId, createdAt, sentAt, pendingDuration } = {}) {
    super(e)
    this.broker = broker
    this.correlationId = correlationId
    this.createdAt = createdAt
    this.sentAt = sentAt
    this.pendingDuration = pendingDuration
    this.name = 'KafkaJSRequestTimeoutError'
  }
}

class KafkaJSMetadataNotLoaded extends KafkaJSError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSMetadataNotLoaded'
  }
}
class KafkaJSTopicMetadataNotLoaded extends KafkaJSMetadataNotLoaded {
  constructor(e, { topic } = {}) {
    super(e)
    this.topic = topic
    this.name = 'KafkaJSTopicMetadataNotLoaded'
  }
}
class KafkaJSStaleTopicMetadataAssignment extends KafkaJSError {
  constructor(e, { topic, unknownPartitions } = {}) {
    super(e)
    this.topic = topic
    this.unknownPartitions = unknownPartitions
    this.name = 'KafkaJSStaleTopicMetadataAssignment'
  }
}

class KafkaJSDeleteGroupsError extends KafkaJSError {
  constructor(e, groups = []) {
    super(e)
    this.groups = groups
    this.name = 'KafkaJSDeleteGroupsError'
  }
}

class KafkaJSServerDoesNotSupportApiKey extends KafkaJSNonRetriableError {
  constructor(e, { apiKey, apiName } = {}) {
    super(e)
    this.apiKey = apiKey
    this.apiName = apiName
    this.name = 'KafkaJSServerDoesNotSupportApiKey'
  }
}

class KafkaJSBrokerNotFound extends KafkaJSError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSBrokerNotFound'
  }
}

class KafkaJSPartialMessageError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSPartialMessageError'
  }
}

class KafkaJSSASLAuthenticationError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSSASLAuthenticationError'
  }
}

class KafkaJSGroupCoordinatorNotFound extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSGroupCoordinatorNotFound'
  }
}

class KafkaJSNotImplemented extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSNotImplemented'
  }
}

class KafkaJSTimeout extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSTimeout'
  }
}

class KafkaJSLockTimeout extends KafkaJSTimeout {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSLockTimeout'
  }
}

class KafkaJSUnsupportedMagicByteInMessageSet extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSUnsupportedMagicByteInMessageSet'
  }
}

class KafkaJSDeleteTopicRecordsError extends KafkaJSError {
  constructor({ partitions }) {
    /*
     * This error is retriable if all the errors were retriable
     */
    const retriable = partitions
      .filter(({ error }) => error != null)
      .every(({ error }) => error.retriable === true)

    super('Error while deleting records', { retriable })
    this.name = 'KafkaJSDeleteTopicRecordsError'
    this.partitions = partitions
  }
}

const issueUrl = bugs ? bugs.url : null

class KafkaJSInvariantViolation extends KafkaJSNonRetriableError {
  constructor(e) {
    const message = e.message || e
    super(`Invariant violated: ${message}. This is likely a bug and should be reported.`)
    this.name = 'KafkaJSInvariantViolation'

    if (issueUrl !== null) {
      const issueTitle = encodeURIComponent(`Invariant violation: ${message}`)
      this.helpUrl = `${issueUrl}/new?assignees=&labels=bug&template=bug_report.md&title=${issueTitle}`
    }
  }
}

class KafkaJSInvalidVarIntError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSNonRetriableError'
  }
}

class KafkaJSInvalidLongError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSNonRetriableError'
  }
}

class KafkaJSCreateTopicError extends KafkaJSProtocolError {
  constructor(e, topicName) {
    super(e)
    this.topic = topicName
    this.name = 'KafkaJSCreateTopicError'
  }
}
class KafkaJSAggregateError extends Error {
  constructor(message, errors) {
    super(message)
    this.errors = errors
    this.name = 'KafkaJSAggregateError'
  }
}

module.exports = {
  KafkaJSError,
  KafkaJSNonRetriableError,
  KafkaJSPartialMessageError,
  KafkaJSBrokerNotFound,
  KafkaJSProtocolError,
  KafkaJSConnectionError,
  KafkaJSConnectionClosedError,
  KafkaJSRequestTimeoutError,
  KafkaJSSASLAuthenticationError,
  KafkaJSNumberOfRetriesExceeded,
  KafkaJSOffsetOutOfRange,
  KafkaJSMemberIdRequired,
  KafkaJSGroupCoordinatorNotFound,
  KafkaJSNotImplemented,
  KafkaJSMetadataNotLoaded,
  KafkaJSTopicMetadataNotLoaded,
  KafkaJSStaleTopicMetadataAssignment,
  KafkaJSDeleteGroupsError,
  KafkaJSTimeout,
  KafkaJSLockTimeout,
  KafkaJSServerDoesNotSupportApiKey,
  KafkaJSUnsupportedMagicByteInMessageSet,
  KafkaJSDeleteTopicRecordsError,
  KafkaJSInvariantViolation,
  KafkaJSInvalidVarIntError,
  KafkaJSInvalidLongError,
  KafkaJSCreateTopicError,
  KafkaJSAggregateError,
}


/***/ }),
/* 20 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"kafkajs","version":"1.16.0","description":"A modern Apache Kafka client for node.js","author":"Tulio Ornelas <ornelas.tulio@gmail.com>","main":"index.js","types":"types/index.d.ts","license":"MIT","keywords":["kafka","sasl","scram"],"engines":{"node":">=10.13.0"},"repository":{"type":"git","url":"https://github.com/tulios/kafkajs.git"},"bugs":{"url":"https://github.com/tulios/kafkajs/issues"},"homepage":"https://kafka.js.org","scripts":{"jest":"export KAFKA_VERSION=${KAFKA_VERSION:=\'2.4\'} && NODE_ENV=test echo \\"KAFKA_VERSION: ${KAFKA_VERSION}\\" && KAFKAJS_DEBUG_PROTOCOL_BUFFERS=1 jest","test:local":"yarn jest --detectOpenHandles","test:debug":"NODE_ENV=test KAFKAJS_DEBUG_PROTOCOL_BUFFERS=1 node --inspect-brk $(yarn bin 2>/dev/null)/jest --detectOpenHandles --runInBand --watch","test:local:watch":"yarn test:local --watch","test":"yarn lint && JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \'yarn jest --ci --maxWorkers=4 --no-watchman --forceExit\'","lint":"find . -path ./node_modules -prune -o -path ./coverage -prune -o -path ./website -prune -o -name \'*.js\' -print0 | xargs -0 eslint","format":"find . -path ./node_modules -prune -o -path ./coverage -prune -o -path ./website -prune -o -name \'*.js\' -print0 | xargs -0 prettier --write","precommit":"lint-staged","test:group:broker":"yarn jest --forceExit --testPathPattern \'src/broker/.*\'","test:group:admin":"yarn jest --forceExit --testPathPattern \'src/admin/.*\'","test:group:producer":"yarn jest --forceExit --testPathPattern \'src/producer/.*\'","test:group:consumer":"yarn jest --forceExit --testPathPattern \'src/consumer/.*.spec.js\'","test:group:others":"yarn jest --forceExit --testPathPattern \'src/(?!(broker|admin|producer|consumer)/).*\'","test:group:oauthbearer":"OAUTHBEARER_ENABLED=1 yarn jest --forceExit src/producer/index.spec.js src/broker/__tests__/connect.spec.js src/consumer/__tests__/connection.spec.js src/broker/__tests__/disconnect.spec.js src/admin/__tests__/connection.spec.js src/broker/__tests__/reauthenticate.spec.js","test:group:broker:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:broker --ci --maxWorkers=4 --no-watchman\\"","test:group:admin:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:admin --ci --maxWorkers=4 --no-watchman\\"","test:group:producer:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:producer --ci --maxWorkers=4 --no-watchman\\"","test:group:consumer:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:consumer --ci --maxWorkers=4 --no-watchman\\"","test:group:others:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:others --ci --maxWorkers=4 --no-watchman\\"","test:group:oauthbearer:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml COMPOSE_FILE=\'docker-compose.2_4_oauthbearer.yml\' ./scripts/testWithKafka.sh \\"yarn test:group:oauthbearer --ci --maxWorkers=4 --no-watchman\\"","test:types":"tsc -p types/"},"devDependencies":{"@types/node":"^12.0.8","@typescript-eslint/typescript-estree":"^1.10.2","eslint":"^6.8.0","eslint-config-prettier":"^6.0.0","eslint-config-standard":"^13.0.1","eslint-plugin-import":"^2.18.2","eslint-plugin-node":"^11.0.0","eslint-plugin-prettier":"^3.1.0","eslint-plugin-promise":"^4.2.1","eslint-plugin-standard":"^4.0.0","execa":"^2.0.3","glob":"^7.1.4","husky":"^3.0.1","ip":"^1.1.5","jest":"^25.1.0","jest-circus":"^25.1.0","jest-extended":"^0.11.2","jest-junit":"^10.0.0","jsonwebtoken":"^8.5.1","lint-staged":"^9.2.0","mockdate":"^2.0.5","prettier":"^1.18.2","semver":"^6.2.0","typescript":"^3.8.3","uuid":"^3.3.2"},"dependencies":{},"lint-staged":{"*.js":["prettier --write","git add"]}}');

/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { LEVELS: logLevel } = __webpack_require__(15)

module.exports = () => ({ namespace, level, label, log }) => {
  const prefix = namespace ? `[${namespace}] ` : ''
  const message = JSON.stringify(
    Object.assign({ level: label }, log, {
      message: `${prefix}${log.message}`,
    })
  )

  switch (level) {
    case logLevel.INFO:
      return console.info(message)
    case logLevel.ERROR:
      return console.error(message)
    case logLevel.WARN:
      return console.warn(message)
    case logLevel.DEBUG:
      return console.log(message)
  }
}


/***/ }),
/* 22 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const BrokerPool = __webpack_require__(23)
const Lock = __webpack_require__(26)
const createRetry = __webpack_require__(332)
const connectionBuilder = __webpack_require__(336)
const flatten = __webpack_require__(45)
const { EARLIEST_OFFSET, LATEST_OFFSET } = __webpack_require__(340)
const {
  KafkaJSError,
  KafkaJSBrokerNotFound,
  KafkaJSMetadataNotLoaded,
  KafkaJSTopicMetadataNotLoaded,
  KafkaJSGroupCoordinatorNotFound,
} = __webpack_require__(19)
const COORDINATOR_TYPES = __webpack_require__(147)

const { keys } = Object

const mergeTopics = (obj, { topic, partitions }) => ({
  ...obj,
  [topic]: [...(obj[topic] || []), ...partitions],
})

module.exports = class Cluster {
  /**
   * @param {Object} options
   * @param {Array<string>} options.brokers example: ['127.0.0.1:9092', '127.0.0.1:9094']
   * @param {Object} options.ssl
   * @param {Object} options.sasl
   * @param {string} options.clientId
   * @param {number} options.connectionTimeout - in milliseconds
   * @param {number} options.authenticationTimeout - in milliseconds
   * @param {number} options.reauthenticationThreshold - in milliseconds
   * @param {number} [options.requestTimeout=30000] - in milliseconds
   * @param {boolean} [options.enforceRequestTimeout]
   * @param {number} options.metadataMaxAge - in milliseconds
   * @param {boolean} options.allowAutoTopicCreation
   * @param {number} options.maxInFlightRequests
   * @param {number} options.isolationLevel
   * @param {import("../../types").RetryOptions} options.retry
   * @param {import("../../types").Logger} options.logger
   * @param {import("../../types").ISocketFactory} options.socketFactory
   * @param {Map} [options.offsets]
   * @param {import("../instrumentation/emitter")} [options.instrumentationEmitter=null]
   */
  constructor({
    logger: rootLogger,
    socketFactory,
    brokers,
    ssl,
    sasl,
    clientId,
    connectionTimeout,
    authenticationTimeout,
    reauthenticationThreshold,
    requestTimeout = 30000,
    enforceRequestTimeout,
    metadataMaxAge,
    retry,
    allowAutoTopicCreation,
    maxInFlightRequests,
    isolationLevel,
    instrumentationEmitter = null,
    offsets = new Map(),
  }) {
    this.rootLogger = rootLogger
    this.logger = rootLogger.namespace('Cluster')
    this.retrier = createRetry(retry)
    this.connectionBuilder = connectionBuilder({
      logger: rootLogger,
      instrumentationEmitter,
      socketFactory,
      brokers,
      ssl,
      sasl,
      clientId,
      connectionTimeout,
      requestTimeout,
      enforceRequestTimeout,
      maxInFlightRequests,
    })

    this.targetTopics = new Set()
    this.mutatingTargetTopics = new Lock({
      description: `updating target topics`,
      timeout: requestTimeout,
    })
    this.isolationLevel = isolationLevel
    this.brokerPool = new BrokerPool({
      connectionBuilder: this.connectionBuilder,
      logger: this.rootLogger,
      retry,
      allowAutoTopicCreation,
      authenticationTimeout,
      reauthenticationThreshold,
      metadataMaxAge,
    })
    this.committedOffsetsByGroup = offsets
  }

  isConnected() {
    return this.brokerPool.hasConnectedBrokers()
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async connect() {
    await this.brokerPool.connect()
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async disconnect() {
    await this.brokerPool.disconnect()
  }

  /**
   * @public
   * @param {object} destination
   * @param {String} destination.host
   * @param {Number} destination.port
   */
  removeBroker({ host, port }) {
    this.brokerPool.removeBroker({ host, port })
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async refreshMetadata() {
    await this.brokerPool.refreshMetadata(Array.from(this.targetTopics))
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async refreshMetadataIfNecessary() {
    await this.brokerPool.refreshMetadataIfNecessary(Array.from(this.targetTopics))
  }

  /**
   * @public
   * @returns {Promise<import("../../types").BrokerMetadata>}
   */
  async metadata({ topics = [] } = {}) {
    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await this.brokerPool.refreshMetadataIfNecessary(topics)
        return this.brokerPool.withBroker(async ({ broker }) => broker.metadata(topics))
      } catch (e) {
        if (e.type === 'LEADER_NOT_AVAILABLE') {
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @public
   * @param {string} topic
   * @return {Promise}
   */
  async addTargetTopic(topic) {
    return this.addMultipleTargetTopics([topic])
  }

  /**
   * @public
   * @param {string[]} topics
   * @return {Promise}
   */
  async addMultipleTargetTopics(topics) {
    await this.mutatingTargetTopics.acquire()

    try {
      const previousSize = this.targetTopics.size
      const previousTopics = new Set(this.targetTopics)
      for (const topic of topics) {
        this.targetTopics.add(topic)
      }

      const hasChanged = previousSize !== this.targetTopics.size || !this.brokerPool.metadata

      if (hasChanged) {
        try {
          await this.refreshMetadata()
        } catch (e) {
          if (e.type === 'INVALID_TOPIC_EXCEPTION' || e.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
            this.targetTopics = previousTopics
          }

          throw e
        }
      }
    } finally {
      await this.mutatingTargetTopics.release()
    }
  }

  /**
   * @public
   * @param {object} options
   * @param {string} options.nodeId
   * @returns {Promise<import("../../types").Broker>}
   */
  async findBroker({ nodeId }) {
    try {
      return await this.brokerPool.findBroker({ nodeId })
    } catch (e) {
      // The client probably has stale metadata
      if (
        e.name === 'KafkaJSBrokerNotFound' ||
        e.name === 'KafkaJSLockTimeout' ||
        e.name === 'KafkaJSConnectionError'
      ) {
        await this.refreshMetadata()
      }

      throw e
    }
  }

  /**
   * @public
   * @returns {Promise<import("../../types").Broker>}
   */
  async findControllerBroker() {
    const { metadata } = this.brokerPool

    if (!metadata || metadata.controllerId == null) {
      throw new KafkaJSMetadataNotLoaded('Topic metadata not loaded')
    }

    const broker = await this.findBroker({ nodeId: metadata.controllerId })

    if (!broker) {
      throw new KafkaJSBrokerNotFound(
        `Controller broker with id ${metadata.controllerId} not found in the cached metadata`
      )
    }

    return broker
  }

  /**
   * @public
   * @param {string} topic
   * @returns {import("../../types").PartitionMetadata[]} Example:
   *                   [{
   *                     isr: [2],
   *                     leader: 2,
   *                     partitionErrorCode: 0,
   *                     partitionId: 0,
   *                     replicas: [2],
   *                   }]
   */
  findTopicPartitionMetadata(topic) {
    const { metadata } = this.brokerPool
    if (!metadata || !metadata.topicMetadata) {
      throw new KafkaJSTopicMetadataNotLoaded('Topic metadata not loaded', { topic })
    }

    const topicMetadata = metadata.topicMetadata.find(t => t.topic === topic)
    return topicMetadata ? topicMetadata.partitionMetadata : []
  }

  /**
   * @public
   * @param {string} topic
   * @param {(number|string)[]} partitions
   * @returns {Object} Object with leader and partitions. For partitions 0 and 5
   *                   the result could be:
   *                     { '0': [0], '2': [5] }
   *
   *                   where the key is the nodeId.
   */
  findLeaderForPartitions(topic, partitions) {
    const partitionMetadata = this.findTopicPartitionMetadata(topic)
    return partitions.reduce((result, id) => {
      const partitionId = parseInt(id, 10)
      const metadata = partitionMetadata.find(p => p.partitionId === partitionId)

      if (!metadata) {
        return result
      }

      if (metadata.leader === null || metadata.leader === undefined) {
        throw new KafkaJSError('Invalid partition metadata', { topic, partitionId, metadata })
      }

      const { leader } = metadata
      const current = result[leader] || []
      return { ...result, [leader]: [...current, partitionId] }
    }, {})
  }

  /**
   * @public
   * @param {object} params
   * @param {string} params.groupId
   * @param {import("../protocol/coordinatorTypes").CoordinatorType} [params.coordinatorType=0]
   * @returns {Promise<import("../../types").Broker>}
   */
  async findGroupCoordinator({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) {
    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        const { coordinator } = await this.findGroupCoordinatorMetadata({
          groupId,
          coordinatorType,
        })
        return await this.findBroker({ nodeId: coordinator.nodeId })
      } catch (e) {
        // A new broker can join the cluster before we have the chance
        // to refresh metadata
        if (e.name === 'KafkaJSBrokerNotFound' || e.type === 'GROUP_COORDINATOR_NOT_AVAILABLE') {
          this.logger.debug(`${e.message}, refreshing metadata and trying again...`, {
            groupId,
            retryCount,
            retryTime,
          })

          await this.refreshMetadata()
          throw e
        }

        if (e.code === 'ECONNREFUSED') {
          // During maintenance the current coordinator can go down; findBroker will
          // refresh metadata and re-throw the error. findGroupCoordinator has to re-throw
          // the error to go through the retry cycle.
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @public
   * @param {object} params
   * @param {string} params.groupId
   * @param {import("../protocol/coordinatorTypes").CoordinatorType} [params.coordinatorType=0]
   * @returns {Promise<Object>}
   */
  async findGroupCoordinatorMetadata({ groupId, coordinatorType }) {
    const brokerMetadata = await this.brokerPool.withBroker(async ({ nodeId, broker }) => {
      return await this.retrier(async (bail, retryCount, retryTime) => {
        try {
          const brokerMetadata = await broker.findGroupCoordinator({ groupId, coordinatorType })
          this.logger.debug('Found group coordinator', {
            broker: brokerMetadata.host,
            nodeId: brokerMetadata.coordinator.nodeId,
          })
          return brokerMetadata
        } catch (e) {
          this.logger.debug('Tried to find group coordinator', {
            nodeId,
            error: e,
          })

          if (e.type === 'GROUP_COORDINATOR_NOT_AVAILABLE') {
            this.logger.debug('Group coordinator not available, retrying...', {
              nodeId,
              retryCount,
              retryTime,
            })

            throw e
          }

          bail(e)
        }
      })
    })

    if (brokerMetadata) {
      return brokerMetadata
    }

    throw new KafkaJSGroupCoordinatorNotFound('Failed to find group coordinator')
  }

  /**
   * @param {object} topicConfiguration
   * @returns {number}
   */
  defaultOffset({ fromBeginning }) {
    return fromBeginning ? EARLIEST_OFFSET : LATEST_OFFSET
  }

  /**
   * @public
   * @param {Array<Object>} topics
   *                          [
   *                            {
   *                              topic: 'my-topic-name',
   *                              partitions: [{ partition: 0 }],
   *                              fromBeginning: false
   *                            }
   *                          ]
   * @returns {Promise<import("../../types").TopicOffsets[]>} example:
   *                          [
   *                            {
   *                              topic: 'my-topic-name',
   *                              partitions: [
   *                                { partition: 0, offset: '1' },
   *                                { partition: 1, offset: '2' },
   *                                { partition: 2, offset: '1' },
   *                              ],
   *                            },
   *                          ]
   */
  async fetchTopicsOffset(topics) {
    const partitionsPerBroker = {}
    const topicConfigurations = {}

    const addDefaultOffset = topic => partition => {
      const { timestamp } = topicConfigurations[topic]
      return { ...partition, timestamp }
    }

    // Index all topics and partitions per leader (nodeId)
    for (const topicData of topics) {
      const { topic, partitions, fromBeginning, fromTimestamp } = topicData
      const partitionsPerLeader = this.findLeaderForPartitions(
        topic,
        partitions.map(p => p.partition)
      )
      const timestamp =
        fromTimestamp != null ? fromTimestamp : this.defaultOffset({ fromBeginning })

      topicConfigurations[topic] = { timestamp }

      keys(partitionsPerLeader).forEach(nodeId => {
        partitionsPerBroker[nodeId] = partitionsPerBroker[nodeId] || {}
        partitionsPerBroker[nodeId][topic] = partitions.filter(p =>
          partitionsPerLeader[nodeId].includes(p.partition)
        )
      })
    }

    // Create a list of requests to fetch the offset of all partitions
    const requests = keys(partitionsPerBroker).map(async nodeId => {
      const broker = await this.findBroker({ nodeId })
      const partitions = partitionsPerBroker[nodeId]

      const { responses: topicOffsets } = await broker.listOffsets({
        isolationLevel: this.isolationLevel,
        topics: keys(partitions).map(topic => ({
          topic,
          partitions: partitions[topic].map(addDefaultOffset(topic)),
        })),
      })

      return topicOffsets
    })

    // Execute all requests, merge and normalize the responses
    const responses = await Promise.all(requests)
    const partitionsPerTopic = flatten(responses).reduce(mergeTopics, {})

    return keys(partitionsPerTopic).map(topic => ({
      topic,
      partitions: partitionsPerTopic[topic].map(({ partition, offset }) => ({
        partition,
        offset,
      })),
    }))
  }

  /**
   * Retrieve the object mapping for committed offsets for a single consumer group
   * @param {object} options
   * @param {string} options.groupId
   * @returns {Object}
   */
  committedOffsets({ groupId }) {
    if (!this.committedOffsetsByGroup.has(groupId)) {
      this.committedOffsetsByGroup.set(groupId, {})
    }

    return this.committedOffsetsByGroup.get(groupId)
  }

  /**
   * Mark offset as committed for a single consumer group's topic-partition
   * @param {object} options
   * @param {string} options.groupId
   * @param {string} options.topic
   * @param {string|number} options.partition
   * @param {string} options.offset
   */
  markOffsetAsCommitted({ groupId, topic, partition, offset }) {
    const committedOffsets = this.committedOffsets({ groupId })

    committedOffsets[topic] = committedOffsets[topic] || {}
    committedOffsets[topic][partition] = offset
  }
}


/***/ }),
/* 23 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Broker = __webpack_require__(24)
const createRetry = __webpack_require__(332)
const shuffle = __webpack_require__(330)
const arrayDiff = __webpack_require__(335)
const { KafkaJSBrokerNotFound, KafkaJSProtocolError } = __webpack_require__(19)

const { keys, assign, values } = Object
const hasBrokerBeenReplaced = (broker, { host, port, rack }) =>
  broker.connection.host !== host ||
  broker.connection.port !== port ||
  broker.connection.rack !== rack

module.exports = class BrokerPool {
  /**
   * @param {object} options
   * @param {import("./connectionBuilder").ConnectionBuilder} options.connectionBuilder
   * @param {import("../../types").Logger} options.logger
   * @param {import("../../types").RetryOptions} [options.retry]
   * @param {boolean} [options.allowAutoTopicCreation]
   * @param {number} [options.authenticationTimeout]
   * @param {number} [options.reauthenticationThreshold]
   * @param {number} [options.metadataMaxAge]
   */
  constructor({
    connectionBuilder,
    logger,
    retry,
    allowAutoTopicCreation,
    authenticationTimeout,
    reauthenticationThreshold,
    metadataMaxAge,
  }) {
    this.rootLogger = logger
    this.connectionBuilder = connectionBuilder
    this.metadataMaxAge = metadataMaxAge || 0
    this.logger = logger.namespace('BrokerPool')
    this.retrier = createRetry(assign({}, retry))

    this.createBroker = options =>
      new Broker({
        allowAutoTopicCreation,
        authenticationTimeout,
        reauthenticationThreshold,
        ...options,
      })

    this.brokers = {}
    /** @type {Broker | undefined} */
    this.seedBroker = undefined
    /** @type {import("../../types").BrokerMetadata | null} */
    this.metadata = null
    this.metadataExpireAt = null
    this.versions = null
    this.supportAuthenticationProtocol = null
  }

  /**
   * @public
   * @returns {Boolean}
   */
  hasConnectedBrokers() {
    const brokers = values(this.brokers)
    return (
      !!brokers.find(broker => broker.isConnected()) ||
      (this.seedBroker ? this.seedBroker.isConnected() : false)
    )
  }

  async createSeedBroker() {
    if (this.seedBroker) {
      await this.seedBroker.disconnect()
    }

    this.seedBroker = this.createBroker({
      connection: await this.connectionBuilder.build(),
      logger: this.rootLogger,
    })
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async connect() {
    if (this.hasConnectedBrokers()) {
      return
    }

    if (!this.seedBroker) {
      await this.createSeedBroker()
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await this.seedBroker.connect()
        this.versions = this.seedBroker.versions
      } catch (e) {
        if (e.name === 'KafkaJSConnectionError' || e.type === 'ILLEGAL_SASL_STATE') {
          // Connection builder will always rotate the seed broker
          await this.createSeedBroker()
          this.logger.error(
            `Failed to connect to seed broker, trying another broker from the list: ${e.message}`,
            { retryCount, retryTime }
          )
        } else {
          this.logger.error(e.message, { retryCount, retryTime })
        }

        if (e.retriable) throw e
        bail(e)
      }
    })
  }

  /**
   * @public
   * @returns {Promise}
   */
  async disconnect() {
    this.seedBroker && (await this.seedBroker.disconnect())
    await Promise.all(values(this.brokers).map(broker => broker.disconnect()))

    this.brokers = {}
    this.metadata = null
    this.versions = null
    this.supportAuthenticationProtocol = null
  }

  /**
   * @public
   * @param {Object} destination
   * @param {string} destination.host
   * @param {number} destination.port
   */
  removeBroker({ host, port }) {
    const removedBroker = values(this.brokers).find(
      broker => broker.connection.host === host && broker.connection.port === port
    )

    if (removedBroker) {
      delete this.brokers[removedBroker.nodeId]
      this.metadataExpireAt = null

      if (this.seedBroker.nodeId === removedBroker.nodeId) {
        this.seedBroker = shuffle(values(this.brokers))[0]
      }
    }
  }

  /**
   * @public
   * @param {Array<String>} topics
   * @returns {Promise<null>}
   */
  async refreshMetadata(topics) {
    const broker = await this.findConnectedBroker()
    const { host: seedHost, port: seedPort } = this.seedBroker.connection

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        this.metadata = await broker.metadata(topics)
        this.metadataExpireAt = Date.now() + this.metadataMaxAge

        const replacedBrokers = []

        this.brokers = await this.metadata.brokers.reduce(
          async (resultPromise, { nodeId, host, port, rack }) => {
            const result = await resultPromise

            if (result[nodeId]) {
              if (!hasBrokerBeenReplaced(result[nodeId], { host, port, rack })) {
                return result
              }

              replacedBrokers.push(result[nodeId])
            }

            if (host === seedHost && port === seedPort) {
              this.seedBroker.nodeId = nodeId
              this.seedBroker.connection.rack = rack
              return assign(result, {
                [nodeId]: this.seedBroker,
              })
            }

            return assign(result, {
              [nodeId]: this.createBroker({
                logger: this.rootLogger,
                versions: this.versions,
                supportAuthenticationProtocol: this.supportAuthenticationProtocol,
                connection: await this.connectionBuilder.build({ host, port, rack }),
                nodeId,
              }),
            })
          },
          this.brokers
        )

        const freshBrokerIds = this.metadata.brokers.map(({ nodeId }) => `${nodeId}`).sort()
        const currentBrokerIds = keys(this.brokers).sort()
        const unusedBrokerIds = arrayDiff(currentBrokerIds, freshBrokerIds)

        const brokerDisconnects = unusedBrokerIds.map(nodeId => {
          const broker = this.brokers[nodeId]
          return broker.disconnect().then(() => {
            delete this.brokers[nodeId]
          })
        })

        const replacedBrokersDisconnects = replacedBrokers.map(broker => broker.disconnect())
        await Promise.all([...brokerDisconnects, ...replacedBrokersDisconnects])
      } catch (e) {
        if (e.type === 'LEADER_NOT_AVAILABLE') {
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * Only refreshes metadata if the data is stale according to the `metadataMaxAge` param or does not contain information about the provided topics
   *
   * @public
   * @param {Array<String>} topics
   * @returns {Promise<null>}
   */
  async refreshMetadataIfNecessary(topics) {
    const shouldRefresh =
      this.metadata == null ||
      this.metadataExpireAt == null ||
      Date.now() > this.metadataExpireAt ||
      !topics.every(topic =>
        this.metadata.topicMetadata.some(topicMetadata => topicMetadata.topic === topic)
      )

    if (shouldRefresh) {
      return this.refreshMetadata(topics)
    }
  }

  /**
   * @public
   * @param {object} options
   * @param {string} options.nodeId
   * @returns {Promise<Broker>}
   */
  async findBroker({ nodeId }) {
    const broker = this.brokers[nodeId]

    if (!broker) {
      throw new KafkaJSBrokerNotFound(`Broker ${nodeId} not found in the cached metadata`)
    }

    await this.connectBroker(broker)
    return broker
  }

  /**
   * @public
   * @param {(params: { nodeId: string, broker: Broker }) => Promise<T>} callback
   * @returns {Promise<T>}
   * @template T
   */
  async withBroker(callback) {
    const brokers = shuffle(keys(this.brokers))
    if (brokers.length === 0) {
      throw new KafkaJSBrokerNotFound('No brokers in the broker pool')
    }

    for (const nodeId of brokers) {
      const broker = await this.findBroker({ nodeId })
      try {
        return await callback({ nodeId, broker })
      } catch (e) {}
    }

    return null
  }

  /**
   * @public
   * @returns {Promise<Broker>}
   */
  async findConnectedBroker() {
    const nodeIds = shuffle(keys(this.brokers))
    const connectedBrokerId = nodeIds.find(nodeId => this.brokers[nodeId].isConnected())

    if (connectedBrokerId) {
      return await this.findBroker({ nodeId: connectedBrokerId })
    }

    // Cycle through the nodes until one connects
    for (const nodeId of nodeIds) {
      try {
        return await this.findBroker({ nodeId })
      } catch (e) {}
    }

    // Failed to connect to all known brokers, metadata might be old
    await this.connect()
    return this.seedBroker
  }

  /**
   * @private
   * @param {Broker} broker
   * @returns {Promise<null>}
   */
  async connectBroker(broker) {
    if (broker.isConnected()) {
      return
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await broker.connect()
      } catch (e) {
        if (e.name === 'KafkaJSConnectionError' || e.type === 'ILLEGAL_SASL_STATE') {
          await broker.disconnect()
        }

        // To avoid reconnecting to an unavailable host, we bail on connection errors
        // and refresh metadata on a higher level before reconnecting
        if (e.name === 'KafkaJSConnectionError') {
          return bail(e)
        }

        if (e.type === 'ILLEGAL_SASL_STATE') {
          // Rebuild the connection since it can't recover from illegal SASL state
          broker.connection = await this.connectionBuilder.build({
            host: broker.connection.host,
            port: broker.connection.port,
            rack: broker.connection.rack,
          })

          this.logger.error(`Failed to connect to broker, reconnecting`, { retryCount, retryTime })
          throw new KafkaJSProtocolError(e, { retriable: true })
        }

        if (e.retriable) throw e
        this.logger.error(e, { retryCount, retryTime, stack: e.stack })
        bail(e)
      }
    })
  }
}


/***/ }),
/* 24 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const Lock = __webpack_require__(26)
const { Types: Compression } = __webpack_require__(28)
const { requests, lookup } = __webpack_require__(31)
const { KafkaJSNonRetriableError } = __webpack_require__(19)
const apiKeys = __webpack_require__(32)
const SASLAuthenticator = __webpack_require__(308)
const shuffle = __webpack_require__(330)
const { ApiVersions: apiVersionsApiKey } = __webpack_require__(32)
const sharedPromiseTo = __webpack_require__(331)

const PRIVATE = {
  SHOULD_REAUTHENTICATE: Symbol('private:Broker:shouldReauthenticate'),
  SEND_REQUEST: Symbol('private:Broker:sendRequest'),
  AUTHENTICATE: Symbol('private:Broker:authenticate'),
}

/** @type {import("../protocol/requests").Lookup} */
const notInitializedLookup = () => {
  throw new Error('Broker not connected')
}

/**
 * @param request - request from protocol
 * @returns {boolean}
 */
const isAuthenticatedRequest = request => {
  return request.apiKey !== apiVersionsApiKey
}

/**
 * Each node in a Kafka cluster is called broker. This class contains
 * the high-level operations a node can perform.
 *
 * @type {import("../../types").Broker}
 */
module.exports = class Broker {
  /**
   * @param {Object} options
   * @param {import("../network/connection")} options.connection
   * @param {import("../../types").Logger} options.logger
   * @param {number} [options.nodeId]
   * @param {import("../../types").ApiVersions} [options.versions=null] The object with all available versions and APIs
   *                                 supported by this cluster. The output of broker#apiVersions
   * @param {number} [options.authenticationTimeout=1000]
   * @param {number} [options.reauthenticationThreshold=10000]
   * @param {boolean} [options.allowAutoTopicCreation=true] If this and the broker config 'auto.create.topics.enable'
   *                                                are true, topics that don't exist will be created when
   *                                                fetching metadata.
   * @param {boolean} [options.supportAuthenticationProtocol=null] If the server supports the SASLAuthenticate protocol
   */
  constructor({
    connection,
    logger,
    nodeId = null,
    versions = null,
    authenticationTimeout = 1000,
    reauthenticationThreshold = 10000,
    allowAutoTopicCreation = true,
    supportAuthenticationProtocol = null,
  }) {
    this.connection = connection
    this.nodeId = nodeId
    this.rootLogger = logger
    this.logger = logger.namespace('Broker')
    this.versions = versions
    this.authenticationTimeout = authenticationTimeout
    this.reauthenticationThreshold = reauthenticationThreshold
    this.allowAutoTopicCreation = allowAutoTopicCreation
    this.supportAuthenticationProtocol = supportAuthenticationProtocol

    this.authenticatedAt = null
    this.sessionLifetime = Long.ZERO

    // The lock timeout has twice the connectionTimeout because the same timeout is used
    // for the first apiVersions call
    const lockTimeout = 2 * this.connection.connectionTimeout + this.authenticationTimeout
    this.brokerAddress = `${this.connection.host}:${this.connection.port}`

    this.lock = new Lock({
      timeout: lockTimeout,
      description: `connect to broker ${this.brokerAddress}`,
    })

    this.lookupRequest = notInitializedLookup

    /**
     * @private
     * @returns {Promise}
     */
    this[PRIVATE.AUTHENTICATE] = sharedPromiseTo(async () => {
      if (this.connection.sasl && !this.isAuthenticated()) {
        const authenticator = new SASLAuthenticator(
          this.connection,
          this.rootLogger,
          this.versions,
          this.supportAuthenticationProtocol
        )

        await authenticator.authenticate()
        this.authenticatedAt = process.hrtime()
        this.sessionLifetime = Long.fromValue(authenticator.sessionLifetime)
      }
    })
  }

  /**
   * @public
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.authenticatedAt != null && !this[PRIVATE.SHOULD_REAUTHENTICATE]()
  }

  /**
   * @public
   * @returns {boolean}
   */
  isConnected() {
    const { connected, sasl } = this.connection
    return sasl ? connected && this.isAuthenticated() : connected
  }

  /**
   * @public
   * @returns {Promise}
   */
  async connect() {
    try {
      await this.lock.acquire()
      if (this.isConnected()) {
        return
      }

      this.authenticatedAt = null
      await this.connection.connect()

      if (!this.versions) {
        this.versions = await this.apiVersions()
      }

      this.lookupRequest = lookup(this.versions)

      if (this.supportAuthenticationProtocol === null) {
        try {
          this.lookupRequest(apiKeys.SaslAuthenticate, requests.SaslAuthenticate)
          this.supportAuthenticationProtocol = true
        } catch (_) {
          this.supportAuthenticationProtocol = false
        }

        this.logger.debug(`Verified support for SaslAuthenticate`, {
          broker: this.brokerAddress,
          supportAuthenticationProtocol: this.supportAuthenticationProtocol,
        })
      }

      await this[PRIVATE.AUTHENTICATE]()
    } finally {
      await this.lock.release()
    }
  }

  /**
   * @public
   * @returns {Promise}
   */
  async disconnect() {
    this.authenticatedAt = null
    await this.connection.disconnect()
  }

  /**
   * @public
   * @returns {Promise<import("../../types").ApiVersions>}
   */
  async apiVersions() {
    let response
    const availableVersions = requests.ApiVersions.versions
      .map(Number)
      .sort()
      .reverse()

    // Find the best version implemented by the server
    for (const candidateVersion of availableVersions) {
      try {
        const apiVersions = requests.ApiVersions.protocol({ version: candidateVersion })
        response = await this[PRIVATE.SEND_REQUEST]({
          ...apiVersions(),
          requestTimeout: this.connection.connectionTimeout,
        })
        break
      } catch (e) {
        if (e.type !== 'UNSUPPORTED_VERSION') {
          throw e
        }
      }
    }

    if (!response) {
      throw new KafkaJSNonRetriableError('API Versions not supported')
    }

    return response.apiVersions.reduce(
      (obj, version) =>
        Object.assign(obj, {
          [version.apiKey]: {
            minVersion: version.minVersion,
            maxVersion: version.maxVersion,
          },
        }),
      {}
    )
  }

  /**
   * @public
   * @type {import("../../types").Broker['metadata']}
   * @param {string[]} [topics=[]] An array of topics to fetch metadata for.
   *                            If no topics are specified fetch metadata for all topics
   */
  async metadata(topics = []) {
    const metadata = this.lookupRequest(apiKeys.Metadata, requests.Metadata)
    const shuffledTopics = shuffle(topics)
    return await this[PRIVATE.SEND_REQUEST](
      metadata({ topics: shuffledTopics, allowAutoTopicCreation: this.allowAutoTopicCreation })
    )
  }

  /**
   * @public
   * @param {Object} request
   * @param {Array} request.topicData An array of messages per topic and per partition, example:
   *                          [
   *                            {
   *                              topic: 'test-topic-1',
   *                              partitions: [
   *                                {
   *                                  partition: 0,
   *                                  firstSequence: 0,
   *                                  messages: [
   *                                    { key: '1', value: 'A' },
   *                                    { key: '2', value: 'B' },
   *                                  ]
   *                                },
   *                                {
   *                                  partition: 1,
   *                                  firstSequence: 0,
   *                                  messages: [
   *                                    { key: '3', value: 'C' },
   *                                  ]
   *                                }
   *                              ]
   *                            },
   *                            {
   *                              topic: 'test-topic-2',
   *                              partitions: [
   *                                {
   *                                  partition: 4,
   *                                  firstSequence: 0,
   *                                  messages: [
   *                                    { key: '32', value: 'E' },
   *                                  ]
   *                                },
   *                              ]
   *                            },
   *                          ]
   * @param {number} [request.acks=-1] Control the number of required acks.
   *                           -1 = all replicas must acknowledge
   *                            0 = no acknowledgments
   *                            1 = only waits for the leader to acknowledge
   * @param {number} [request.timeout=30000] The time to await a response in ms
   * @param {string} [request.transactionalId=null]
   * @param {number} [request.producerId=-1] Broker assigned producerId
   * @param {number} [request.producerEpoch=0] Broker assigned producerEpoch
   * @param {import("../../types").CompressionTypes} [request.compression=CompressionTypes.None] Compression codec
   * @returns {Promise}
   */
  async produce({
    topicData,
    transactionalId,
    producerId,
    producerEpoch,
    acks = -1,
    timeout = 30000,
    compression = Compression.None,
  }) {
    const produce = this.lookupRequest(apiKeys.Produce, requests.Produce)
    return await this[PRIVATE.SEND_REQUEST](
      produce({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      })
    )
  }

  /**
   * @public
   * @param {Object} request
   * @param {number} [request.replicaId=-1] Broker id of the follower. For normal consumers, use -1
   * @param {number} [request.isolationLevel=1] This setting controls the visibility of transactional records. Default READ_COMMITTED.
   * @param {number} [request.maxWaitTime=5000] Maximum time in ms to wait for the response
   * @param {number} [request.minBytes=1] Minimum bytes to accumulate in the response
   * @param {number} [request.maxBytes=10485760] Maximum bytes to accumulate in the response. Note that this is
   *                                   not an absolute maximum, if the first message in the first non-empty
   *                                   partition of the fetch is larger than this value, the message will still
   *                                   be returned to ensure that progress can be made. Default 10MB.
   * @param {Array} request.topics Topics to fetch
   *                        [
   *                          {
   *                            topic: 'topic-name',
   *                            partitions: [
   *                              {
   *                                partition: 0,
   *                                fetchOffset: '4124',
   *                                maxBytes: 2048
   *                              }
   *                            ]
   *                          }
   *                        ]
   * @param {string} [request.rackId=''] A rack identifier for this client. This can be any string value which indicates where this
   *                           client is physically located. It corresponds with the broker config `broker.rack`.
   * @returns {Promise}
   */
  async fetch({
    replicaId,
    isolationLevel,
    maxWaitTime = 5000,
    minBytes = 1,
    maxBytes = 10485760,
    topics,
    rackId = '',
  }) {
    // TODO: validate topics not null/empty
    const fetch = this.lookupRequest(apiKeys.Fetch, requests.Fetch)

    // Shuffle topic-partitions to ensure fair response allocation across partitions (KIP-74)
    const flattenedTopicPartitions = topics.reduce((topicPartitions, { topic, partitions }) => {
      partitions.forEach(partition => {
        topicPartitions.push({ topic, partition })
      })
      return topicPartitions
    }, [])

    const shuffledTopicPartitions = shuffle(flattenedTopicPartitions)

    // Consecutive partitions for the same topic can be combined into a single `topic` entry
    const consolidatedTopicPartitions = shuffledTopicPartitions.reduce(
      (topicPartitions, { topic, partition }) => {
        const last = topicPartitions[topicPartitions.length - 1]

        if (last != null && last.topic === topic) {
          topicPartitions[topicPartitions.length - 1].partitions.push(partition)
        } else {
          topicPartitions.push({ topic, partitions: [partition] })
        }

        return topicPartitions
      },
      []
    )

    return await this[PRIVATE.SEND_REQUEST](
      fetch({
        replicaId,
        isolationLevel,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics: consolidatedTopicPartitions,
        rackId,
      })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId The group id
   * @param {number} request.groupGenerationId The generation of the group
   * @param {string} request.memberId The member id assigned by the group coordinator
   * @returns {Promise}
   */
  async heartbeat({ groupId, groupGenerationId, memberId }) {
    const heartbeat = this.lookupRequest(apiKeys.Heartbeat, requests.Heartbeat)
    return await this[PRIVATE.SEND_REQUEST](heartbeat({ groupId, groupGenerationId, memberId }))
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId The unique group id
   * @param {import("../protocol/coordinatorTypes").CoordinatorType} request.coordinatorType The type of coordinator to find
   * @returns {Promise}
   */
  async findGroupCoordinator({ groupId, coordinatorType }) {
    // TODO: validate groupId, mandatory
    const findCoordinator = this.lookupRequest(apiKeys.GroupCoordinator, requests.GroupCoordinator)
    return await this[PRIVATE.SEND_REQUEST](findCoordinator({ groupId, coordinatorType }))
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId The unique group id
   * @param {number} request.sessionTimeout The coordinator considers the consumer dead if it receives
   *                                no heartbeat after this timeout in ms
   * @param {number} request.rebalanceTimeout The maximum time that the coordinator will wait for each member
   *                                  to rejoin when rebalancing the group
   * @param {string} [request.memberId=""] The assigned consumer id or an empty string for a new consumer
   * @param {string} [request.protocolType="consumer"] Unique name for class of protocols implemented by group
   * @param {Array} request.groupProtocols List of protocols that the member supports (assignment strategy)
   *                                [{ name: 'AssignerName', metadata: '{"version": 1, "topics": []}' }]
   * @returns {Promise}
   */
  async joinGroup({
    groupId,
    sessionTimeout,
    rebalanceTimeout,
    memberId = '',
    protocolType = 'consumer',
    groupProtocols,
  }) {
    const joinGroup = this.lookupRequest(apiKeys.JoinGroup, requests.JoinGroup)
    const makeRequest = (assignedMemberId = memberId) =>
      this[PRIVATE.SEND_REQUEST](
        joinGroup({
          groupId,
          sessionTimeout,
          rebalanceTimeout,
          memberId: assignedMemberId,
          protocolType,
          groupProtocols,
        })
      )

    try {
      return await makeRequest()
    } catch (error) {
      if (error.name === 'KafkaJSMemberIdRequired') {
        return makeRequest(error.memberId)
      }

      throw error
    }
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {string} request.memberId
   * @returns {Promise}
   */
  async leaveGroup({ groupId, memberId }) {
    const leaveGroup = this.lookupRequest(apiKeys.LeaveGroup, requests.LeaveGroup)
    return await this[PRIVATE.SEND_REQUEST](leaveGroup({ groupId, memberId }))
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {number} request.generationId
   * @param {string} request.memberId
   * @param {object} request.groupAssignment
   * @returns {Promise}
   */
  async syncGroup({ groupId, generationId, memberId, groupAssignment }) {
    const syncGroup = this.lookupRequest(apiKeys.SyncGroup, requests.SyncGroup)
    return await this[PRIVATE.SEND_REQUEST](
      syncGroup({
        groupId,
        generationId,
        memberId,
        groupAssignment,
      })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {number} request.replicaId=-1 Broker id of the follower. For normal consumers, use -1
   * @param {number} request.isolationLevel=1 This setting controls the visibility of transactional records (default READ_COMMITTED, Kafka >0.11 only)
   * @param {TopicPartitionOffset[]} request.topics e.g:
   *
   * @typedef {Object} TopicPartitionOffset
   * @property {string} topic
   * @property {PartitionOffset[]} partitions
   *
   * @typedef {Object} PartitionOffset
   * @property {number} partition
   * @property {number} [timestamp=-1]
   *
   *
   * @returns {Promise}
   */
  async listOffsets({ replicaId, isolationLevel, topics }) {
    const listOffsets = this.lookupRequest(apiKeys.ListOffsets, requests.ListOffsets)
    const result = await this[PRIVATE.SEND_REQUEST](
      listOffsets({ replicaId, isolationLevel, topics })
    )

    // ListOffsets >= v1 will return a single `offset` rather than an array of `offsets` (ListOffsets V0).
    // Normalize to just return `offset`.
    for (const response of result.responses) {
      response.partitions = response.partitions.map(({ offsets, ...partitionData }) => {
        return offsets ? { ...partitionData, offset: offsets.pop() } : partitionData
      })
    }

    return result
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {number} request.groupGenerationId
   * @param {string} request.memberId
   * @param {number} [request.retentionTime=-1] -1 signals to the broker that its default configuration
   *                                    should be used.
   * @param {object} request.topics Topics to commit offsets, e.g:
   *                  [
   *                    {
   *                      topic: 'topic-name',
   *                      partitions: [
   *                        { partition: 0, offset: '11' }
   *                      ]
   *                    }
   *                  ]
   * @returns {Promise}
   */
  async offsetCommit({ groupId, groupGenerationId, memberId, retentionTime, topics }) {
    const offsetCommit = this.lookupRequest(apiKeys.OffsetCommit, requests.OffsetCommit)
    return await this[PRIVATE.SEND_REQUEST](
      offsetCommit({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {object} request.topics - If the topic array is null fetch offsets for all topics. e.g:
   *                  [
   *                    {
   *                      topic: 'topic-name',
   *                      partitions: [
   *                        { partition: 0 }
   *                      ]
   *                    }
   *                  ]
   * @returns {Promise}
   */
  async offsetFetch({ groupId, topics }) {
    const offsetFetch = this.lookupRequest(apiKeys.OffsetFetch, requests.OffsetFetch)
    return await this[PRIVATE.SEND_REQUEST](offsetFetch({ groupId, topics }))
  }

  /**
   * @public
   * @param {object} request
   * @param {Array} request.groupIds
   * @returns {Promise}
   */
  async describeGroups({ groupIds }) {
    const describeGroups = this.lookupRequest(apiKeys.DescribeGroups, requests.DescribeGroups)
    return await this[PRIVATE.SEND_REQUEST](describeGroups({ groupIds }))
  }

  /**
   * @public
   * @param {object} request
   * @param {Array} request.topics e.g:
   *                 [
   *                   {
   *                     topic: 'topic-name',
   *                     numPartitions: 1,
   *                     replicationFactor: 1
   *                   }
   *                 ]
   * @param {boolean} [request.validateOnly=false] If this is true, the request will be validated, but the topic
   *                                       won't be created
   * @param {number} [request.timeout=5000] The time in ms to wait for a topic to be completely created
   *                                on the controller node
   * @returns {Promise}
   */
  async createTopics({ topics, validateOnly = false, timeout = 5000 }) {
    const createTopics = this.lookupRequest(apiKeys.CreateTopics, requests.CreateTopics)
    return await this[PRIVATE.SEND_REQUEST](createTopics({ topics, validateOnly, timeout }))
  }

  /**
   * @public
   * @param {object} request
   * @param {Array} request.topicPartitions e.g:
   *                 [
   *                   {
   *                     topic: 'topic-name',
   *                     count: 3,
   *                     assignments: []
   *                   }
   *                 ]
   * @param {boolean} [request.validateOnly=false] If this is true, the request will be validated, but the topic
   *                                       won't be created
   * @param {number} [request.timeout=5000] The time in ms to wait for a topic to be completely created
   *                                on the controller node
   * @returns {Promise<void>}
   */
  async createPartitions({ topicPartitions, validateOnly = false, timeout = 5000 }) {
    const createPartitions = this.lookupRequest(apiKeys.CreatePartitions, requests.CreatePartitions)
    return await this[PRIVATE.SEND_REQUEST](
      createPartitions({ topicPartitions, validateOnly, timeout })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {string[]} request.topics An array of topics to be deleted
   * @param {number} [request.timeout=5000] The time in ms to wait for a topic to be completely deleted on the
   *                                controller node. Values <= 0 will trigger topic deletion and return
   *                                immediately
   * @returns {Promise}
   */
  async deleteTopics({ topics, timeout = 5000 }) {
    const deleteTopics = this.lookupRequest(apiKeys.DeleteTopics, requests.DeleteTopics)
    return await this[PRIVATE.SEND_REQUEST](deleteTopics({ topics, timeout }))
  }

  /**
   * @public
   * @param {object} request
   * @param {import("../../types").ResourceConfigQuery[]} request.resources
   *                                 [{
   *                                   type: RESOURCE_TYPES.TOPIC,
   *                                   name: 'topic-name',
   *                                   configNames: ['compression.type', 'retention.ms']
   *                                 }]
   * @param {boolean} [request.includeSynonyms=false]
   * @returns {Promise}
   */
  async describeConfigs({ resources, includeSynonyms = false }) {
    const describeConfigs = this.lookupRequest(apiKeys.DescribeConfigs, requests.DescribeConfigs)
    return await this[PRIVATE.SEND_REQUEST](describeConfigs({ resources, includeSynonyms }))
  }

  /**
   * @public
   * @param {object} request
   * @param {import("../../types").IResourceConfig[]} request.resources
   *                                 [{
   *                                  type: RESOURCE_TYPES.TOPIC,
   *                                  name: 'topic-name',
   *                                  configEntries: [
   *                                    {
   *                                      name: 'cleanup.policy',
   *                                      value: 'compact'
   *                                    }
   *                                  ]
   *                                 }]
   * @param {boolean} [request.validateOnly=false]
   * @returns {Promise}
   */
  async alterConfigs({ resources, validateOnly = false }) {
    const alterConfigs = this.lookupRequest(apiKeys.AlterConfigs, requests.AlterConfigs)
    return await this[PRIVATE.SEND_REQUEST](alterConfigs({ resources, validateOnly }))
  }

  /**
   * Send an `InitProducerId` request to fetch a PID and bump the producer epoch.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {number} request.transactionTimeout The time in ms to wait for before aborting idle transactions
   * @param {number} [request.transactionalId] The transactional id or null if the producer is not transactional
   * @returns {Promise}
   */
  async initProducerId({ transactionalId, transactionTimeout }) {
    const initProducerId = this.lookupRequest(apiKeys.InitProducerId, requests.InitProducerId)
    return await this[PRIVATE.SEND_REQUEST](initProducerId({ transactionalId, transactionTimeout }))
  }

  /**
   * Send an `AddPartitionsToTxn` request to mark a TopicPartition as participating in the transaction.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {object[]} request.topics e.g:
   *                  [
   *                    {
   *                      topic: 'topic-name',
   *                      partitions: [ 0, 1]
   *                    }
   *                  ]
   * @returns {Promise}
   */
  async addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics }) {
    const addPartitionsToTxn = this.lookupRequest(
      apiKeys.AddPartitionsToTxn,
      requests.AddPartitionsToTxn
    )
    return await this[PRIVATE.SEND_REQUEST](
      addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics })
    )
  }

  /**
   * Send an `AddOffsetsToTxn` request.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {string} request.groupId The unique group identifier (for the consumer group)
   * @returns {Promise}
   */
  async addOffsetsToTxn({ transactionalId, producerId, producerEpoch, groupId }) {
    const addOffsetsToTxn = this.lookupRequest(apiKeys.AddOffsetsToTxn, requests.AddOffsetsToTxn)
    return await this[PRIVATE.SEND_REQUEST](
      addOffsetsToTxn({ transactionalId, producerId, producerEpoch, groupId })
    )
  }

  /**
   * Send a `TxnOffsetCommit` request to persist the offsets in the `__consumer_offsets` topics.
   *
   * Request should be made to the consumer coordinator.
   * @public
   * @param {object} request
   * @param {OffsetCommitTopic[]} request.topics
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {string} request.groupId The unique group identifier (for the consumer group)
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {OffsetCommitTopic[]} request.topics
   *
   * @typedef {Object} OffsetCommitTopic
   * @property {string} topic
   * @property {OffsetCommitTopicPartition[]} partitions
   *
   * @typedef {Object} OffsetCommitTopicPartition
   * @property {number} partition
   * @property {number} offset
   * @property {string} [metadata]
   *
   * @returns {Promise}
   */
  async txnOffsetCommit({ transactionalId, groupId, producerId, producerEpoch, topics }) {
    const txnOffsetCommit = this.lookupRequest(apiKeys.TxnOffsetCommit, requests.TxnOffsetCommit)
    return await this[PRIVATE.SEND_REQUEST](
      txnOffsetCommit({ transactionalId, groupId, producerId, producerEpoch, topics })
    )
  }

  /**
   * Send an `EndTxn` request to indicate transaction should be committed or aborted.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {boolean} request.transactionResult The result of the transaction (false = ABORT, true = COMMIT)
   * @returns {Promise}
   */
  async endTxn({ transactionalId, producerId, producerEpoch, transactionResult }) {
    const endTxn = this.lookupRequest(apiKeys.EndTxn, requests.EndTxn)
    return await this[PRIVATE.SEND_REQUEST](
      endTxn({ transactionalId, producerId, producerEpoch, transactionResult })
    )
  }

  /**
   * Send request for list of groups
   * @public
   * @returns {Promise}
   */
  async listGroups() {
    const listGroups = this.lookupRequest(apiKeys.ListGroups, requests.ListGroups)
    return await this[PRIVATE.SEND_REQUEST](listGroups())
  }

  /**
   * Send request to delete groups
   * @param {string[]} groupIds
   * @public
   * @returns {Promise}
   */
  async deleteGroups(groupIds) {
    const deleteGroups = this.lookupRequest(apiKeys.DeleteGroups, requests.DeleteGroups)
    return await this[PRIVATE.SEND_REQUEST](deleteGroups(groupIds))
  }

  /**
   * Send request to delete records
   * @public
   * @param {object} request
   * @param {TopicPartitionRecords[]} request.topics
   *                          [
   *                            {
   *                              topic: 'my-topic-name',
   *                              partitions: [
   *                                { partition: 0, offset 2 },
   *                                { partition: 1, offset 4 },
   *                              ],
   *                            }
   *                          ]
   * @returns {Promise<Array>} example:
   *                          {
   *                            throttleTime: 0
   *                           [
   *                              {
   *                                topic: 'my-topic-name',
   *                                partitions: [
   *                                 { partition: 0, lowWatermark: '2n', errorCode: 0 },
   *                                 { partition: 1, lowWatermark: '4n', errorCode: 0 },
   *                               ],
   *                             },
   *                           ]
   *                          }
   *
   * @typedef {object} TopicPartitionRecords
   * @property {string} topic
   * @property {PartitionRecord[]} partitions
   *
   * @typedef {object} PartitionRecord
   * @property {number} partition
   * @property {number} offset
   */
  async deleteRecords({ topics }) {
    const deleteRecords = this.lookupRequest(apiKeys.DeleteRecords, requests.DeleteRecords)
    return await this[PRIVATE.SEND_REQUEST](deleteRecords({ topics }))
  }

  /**
   * @public
   * @param {object} request
   * @param {import("../../types").AclEntry[]} request.acl e.g:
   *                 [
   *                   {
   *                     resourceType: AclResourceTypes.TOPIC,
   *                     resourceName: 'topic-name',
   *                     resourcePatternType: ResourcePatternTypes.LITERAL,
   *                     principal: 'User:bob',
   *                     host: '*',
   *                     operation: AclOperationTypes.ALL,
   *                     permissionType: AclPermissionTypes.DENY,
   *                   }
   *                 ]
   * @returns {Promise<void>}
   */
  async createAcls({ acl }) {
    const createAcls = this.lookupRequest(apiKeys.CreateAcls, requests.CreateAcls)
    return await this[PRIVATE.SEND_REQUEST](createAcls({ creations: acl }))
  }

  /**
   * @public
   * @param {import("../../types").AclEntry} aclEntry
   * @returns {Promise<void>}
   */
  async describeAcls({
    resourceType,
    resourceName,
    resourcePatternType,
    principal,
    host,
    operation,
    permissionType,
  }) {
    const describeAcls = this.lookupRequest(apiKeys.DescribeAcls, requests.DescribeAcls)
    return await this[PRIVATE.SEND_REQUEST](
      describeAcls({
        resourceType,
        resourceName,
        resourcePatternType,
        principal,
        host,
        operation,
        permissionType,
      })
    )
  }

  /**
   * @public
   * @param {Object} request
   * @param {import("../../types").AclEntry[]} request.filters
   * @returns {Promise<void>}
   */
  async deleteAcls({ filters }) {
    const deleteAcls = this.lookupRequest(apiKeys.DeleteAcls, requests.DeleteAcls)
    return await this[PRIVATE.SEND_REQUEST](deleteAcls({ filters }))
  }

  /***
   * @private
   */
  [PRIVATE.SHOULD_REAUTHENTICATE]() {
    if (this.sessionLifetime.equals(Long.ZERO)) {
      return false
    }

    if (this.authenticatedAt == null) {
      return true
    }

    const [secondsSince, remainingNanosSince] = process.hrtime(this.authenticatedAt)
    const millisSince = Long.fromValue(secondsSince)
      .multiply(1000)
      .add(Long.fromValue(remainingNanosSince).divide(1000000))

    const reauthenticateAt = millisSince.add(this.reauthenticationThreshold)
    return reauthenticateAt.greaterThanOrEqual(this.sessionLifetime)
  }

  /**
   * @private
   */
  async [PRIVATE.SEND_REQUEST](protocolRequest) {
    if (!this.isAuthenticated() && isAuthenticatedRequest(protocolRequest.request)) {
      await this[PRIVATE.AUTHENTICATE]()
    }
    try {
      return await this.connection.send(protocolRequest)
    } catch (e) {
      if (e.name === 'KafkaJSConnectionClosedError') {
        await this.disconnect()
      }

      throw e
    }
  }
}


/***/ }),
/* 25 */
/***/ ((module) => {

/**
 * @exports Long
 * @class A Long class for representing a 64 bit int (BigInt)
 * @param {bigint} value The value of the 64 bit int
 * @constructor
 */
class Long {
  constructor(value) {
    this.value = value
  }

  /**
   * @function isLong
   * @param {*} obj Object
   * @returns {boolean}
   * @inner
   */
  static isLong(obj) {
    return typeof obj.value === 'bigint'
  }

  /**
   * @param {number} value
   * @returns {!Long}
   * @inner
   */
  static fromBits(value) {
    return new Long(BigInt(value))
  }

  /**
   * @param {number} value
   * @returns {!Long}
   * @inner
   */
  static fromInt(value) {
    if (isNaN(value)) return Long.ZERO

    return new Long(BigInt.asIntN(64, BigInt(value)))
  }

  /**
   * @param {number} value
   * @returns {!Long}
   * @inner
   */
  static fromNumber(value) {
    if (isNaN(value)) return Long.ZERO

    return new Long(BigInt(value))
  }

  /**
   * @function
   * @param {bigint|number|string|Long} val
   * @returns {!Long}
   * @inner
   */
  static fromValue(val) {
    if (typeof val === 'number') return this.fromNumber(val)
    if (typeof val === 'string') return this.fromString(val)
    if (typeof val === 'bigint') return new Long(val)
    if (this.isLong(val)) return new Long(BigInt(val.value))

    return new Long(BigInt(val))
  }

  /**
   * @param {string} str
   * @returns {!Long}
   * @inner
   */
  static fromString(str) {
    if (str.length === 0) throw Error('empty string')
    if (str === 'NaN' || str === 'Infinity' || str === '+Infinity' || str === '-Infinity')
      return Long.ZERO
    return new Long(BigInt(str))
  }

  /**
   * Tests if this Long's value equals zero.
   * @returns {boolean}
   */
  isZero() {
    return this.value === BigInt(0)
  }

  /**
   * Tests if this Long's value is negative.
   * @returns {boolean}
   */
  isNegative() {
    return this.value < BigInt(0)
  }

  /**
   * Converts the Long to a string.
   * @returns {string}
   * @override
   */
  toString() {
    return String(this.value)
  }

  /**
   * Converts the Long to the nearest floating-point representation (double, 53-bit mantissa)
   * @returns {number}
   * @override
   */
  toNumber() {
    return Number(this.value)
  }

  /**
   * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
   * @returns {number}
   */
  toInt() {
    return Number(BigInt.asIntN(32, this.value))
  }

  /**
   * Converts the Long to JSON
   * @returns {string}
   * @override
   */
  toJSON() {
    return this.toString()
  }

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number|bigint} numBits Number of bits
   * @returns {!Long} Shifted bigint
   */
  shiftLeft(numBits) {
    return new Long(this.value << BigInt(numBits))
  }

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   * @param {number|bigint} numBits Number of bits
   * @returns {!Long} Shifted bigint
   */
  shiftRight(numBits) {
    return new Long(this.value >> BigInt(numBits))
  }

  /**
   * Returns the bitwise OR of this Long and the specified.
   * @param {bigint|number|string} other Other Long
   * @returns {!Long}
   */
  or(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return Long.fromBits(this.value | other.value)
  }

  /**
   * Returns the bitwise XOR of this Long and the given one.
   * @param {bigint|number|string} other Other Long
   * @returns {!Long}
   */
  xor(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return new Long(this.value ^ other.value)
  }

  /**
   * Returns the bitwise AND of this Long and the specified.
   * @param {bigint|number|string} other Other Long
   * @returns {!Long}
   */
  and(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return new Long(this.value & other.value)
  }

  /**
   * Returns the bitwise NOT of this Long.
   * @returns {!Long}
   */
  not() {
    return new Long(~this.value)
  }

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   * @param {number|bigint} numBits Number of bits
   * @returns {!Long} Shifted bigint
   */
  shiftRightUnsigned(numBits) {
    return new Long(this.value >> BigInt.asUintN(64, BigInt(numBits)))
  }

  /**
   * Tests if this Long's value equals the specified's.
   * @param {bigint|number|string} other Other value
   * @returns {boolean}
   */
  equals(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return this.value === other.value
  }

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  greaterThanOrEqual(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return this.value >= other.value
  }

  gte(other) {
    return this.greaterThanOrEqual(other)
  }

  notEquals(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return !this.equals(/* validates */ other)
  }

  /**
   * Returns the sum of this and the specified Long.
   * @param {!Long|number|string} addend Addend
   * @returns {!Long} Sum
   */
  add(addend) {
    if (!Long.isLong(addend)) addend = Long.fromValue(addend)
    return new Long(this.value + addend.value)
  }

  /**
   * Returns the difference of this and the specified Long.
   * @param {!Long|number|string} subtrahend Subtrahend
   * @returns {!Long} Difference
   */
  subtract(subtrahend) {
    if (!Long.isLong(subtrahend)) subtrahend = Long.fromValue(subtrahend)
    return this.add(subtrahend.negate())
  }

  /**
   * Returns the product of this and the specified Long.
   * @param {!Long|number|string} multiplier Multiplier
   * @returns {!Long} Product
   */
  multiply(multiplier) {
    if (this.isZero()) return Long.ZERO
    if (!Long.isLong(multiplier)) multiplier = Long.fromValue(multiplier)
    return new Long(this.value * multiplier.value)
  }

  /**
   * Returns this Long divided by the specified. The result is signed if this Long is signed or
   *  unsigned if this Long is unsigned.
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Quotient
   */
  divide(divisor) {
    if (!Long.isLong(divisor)) divisor = Long.fromValue(divisor)
    if (divisor.isZero()) throw Error('division by zero')
    return new Long(this.value / divisor.value)
  }

  /**
   * Compares this Long's value with the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   */
  compare(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    if (this.value === other.value) return 0
    if (this.value > other.value) return 1
    if (other.value > this.value) return -1
  }

  /**
   * Tests if this Long's value is less than the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  lessThan(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return this.value < other.value
  }

  /**
   * Negates this Long's value.
   * @returns {!Long} Negated Long
   */
  negate() {
    if (this.equals(Long.MIN_VALUE)) {
      return Long.MIN_VALUE
    }
    return this.not().add(Long.ONE)
  }

  /**
   * Gets the high 32 bits as a signed integer.
   * @returns {number} Signed high bits
   */
  getHighBits() {
    return Number(BigInt.asIntN(32, this.value >> BigInt(32)))
  }

  /**
   * Gets the low 32 bits as a signed integer.
   * @returns {number} Signed low bits
   */
  getLowBits() {
    return Number(BigInt.asIntN(32, this.value))
  }
}

/**
 * Minimum signed value.
 * @type {bigint}
 */
Long.MIN_VALUE = new Long(BigInt('-9223372036854775808'))

/**
 * Maximum signed value.
 * @type {bigint}
 */
Long.MAX_VALUE = new Long(BigInt('9223372036854775807'))

/**
 * Signed zero.
 * @type {Long}
 */
Long.ZERO = Long.fromInt(0)

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = Long.fromInt(1)

module.exports = Long


/***/ }),
/* 26 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { format } = __webpack_require__(27)
const { KafkaJSLockTimeout } = __webpack_require__(19)

const PRIVATE = {
  LOCKED: Symbol('private:Lock:locked'),
  TIMEOUT: Symbol('private:Lock:timeout'),
  WAITING: Symbol('private:Lock:waiting'),
  TIMEOUT_ERROR_MESSAGE: Symbol('private:Lock:timeoutErrorMessage'),
}

const TIMEOUT_MESSAGE = 'Timeout while acquiring lock (%d waiting locks)'

module.exports = class Lock {
  constructor({ timeout, description = null } = {}) {
    if (typeof timeout !== 'number') {
      throw new TypeError(`'timeout' is not a number, received '${typeof timeout}'`)
    }

    this[PRIVATE.LOCKED] = false
    this[PRIVATE.TIMEOUT] = timeout
    this[PRIVATE.WAITING] = new Set()
    this[PRIVATE.TIMEOUT_ERROR_MESSAGE] = () => {
      const timeoutMessage = format(TIMEOUT_MESSAGE, this[PRIVATE.WAITING].size)
      return description ? `${timeoutMessage}: "${description}"` : timeoutMessage
    }
  }

  async acquire() {
    return new Promise((resolve, reject) => {
      if (!this[PRIVATE.LOCKED]) {
        this[PRIVATE.LOCKED] = true
        return resolve()
      }

      let timeoutId = null
      const tryToAcquire = async () => {
        if (!this[PRIVATE.LOCKED]) {
          this[PRIVATE.LOCKED] = true
          clearTimeout(timeoutId)
          this[PRIVATE.WAITING].delete(tryToAcquire)
          return resolve()
        }
      }

      this[PRIVATE.WAITING].add(tryToAcquire)
      timeoutId = setTimeout(() => {
        // The message should contain the number of waiters _including_ this one
        const error = new KafkaJSLockTimeout(this[PRIVATE.TIMEOUT_ERROR_MESSAGE]())
        this[PRIVATE.WAITING].delete(tryToAcquire)
        reject(error)
      }, this[PRIVATE.TIMEOUT])
    })
  }

  async release() {
    this[PRIVATE.LOCKED] = false
    const waitingLock = this[PRIVATE.WAITING].values().next().value

    if (waitingLock) {
      return waitingLock()
    }
  }
}


/***/ }),
/* 27 */
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { KafkaJSNotImplemented } = __webpack_require__(19)

const COMPRESSION_CODEC_MASK = 0x07

const Types = {
  None: 0,
  GZIP: 1,
  Snappy: 2,
  LZ4: 3,
  ZSTD: 4,
}

const Codecs = {
  [Types.GZIP]: () => __webpack_require__(29),
  [Types.Snappy]: () => {
    throw new KafkaJSNotImplemented('Snappy compression not implemented')
  },
  [Types.LZ4]: () => {
    throw new KafkaJSNotImplemented('LZ4 compression not implemented')
  },
  [Types.ZSTD]: () => {
    throw new KafkaJSNotImplemented('ZSTD compression not implemented')
  },
}

const lookupCodec = type => (Codecs[type] ? Codecs[type]() : null)
const lookupCodecByAttributes = attributes => {
  const codec = Codecs[attributes & COMPRESSION_CODEC_MASK]
  return codec ? codec() : null
}

module.exports = {
  Types,
  Codecs,
  lookupCodec,
  lookupCodecByAttributes,
  COMPRESSION_CODEC_MASK,
}


/***/ }),
/* 29 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { promisify } = __webpack_require__(27)
const zlib = __webpack_require__(30)

const gzip = promisify(zlib.gzip)
const unzip = promisify(zlib.unzip)

module.exports = {
  /**
   * @param {Encoder} encoder
   * @returns {Promise}
   */
  async compress(encoder) {
    return await gzip(encoder.buffer)
  },

  /**
   * @param {Buffer} buffer
   * @returns {Promise}
   */
  async decompress(buffer) {
    return await unzip(buffer)
  },
}


/***/ }),
/* 30 */
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),
/* 31 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const apiKeys = __webpack_require__(32)
const { KafkaJSServerDoesNotSupportApiKey, KafkaJSNotImplemented } = __webpack_require__(19)

/**
 * @typedef {(options?: Object) => { request: any, response: any, logResponseErrors?: boolean }} Request
 */

/**
 * @typedef {Object} RequestDefinitions
 * @property {string[]} versions
 * @property {({ version: number }) => Request} protocol
 */

/**
 * @typedef {(apiKey: number, definitions: RequestDefinitions) => Request} Lookup
 */

/** @type {RequestDefinitions} */
const noImplementedRequestDefinitions = {
  versions: [],
  protocol: () => {
    throw new KafkaJSNotImplemented()
  },
}

/**
 * @type {{[apiName: string]: RequestDefinitions}}
 */
const requests = {
  Produce: __webpack_require__(33),
  Fetch: __webpack_require__(65),
  ListOffsets: __webpack_require__(100),
  Metadata: __webpack_require__(109),
  LeaderAndIsr: noImplementedRequestDefinitions,
  StopReplica: noImplementedRequestDefinitions,
  UpdateMetadata: noImplementedRequestDefinitions,
  ControlledShutdown: noImplementedRequestDefinitions,
  OffsetCommit: __webpack_require__(124),
  OffsetFetch: __webpack_require__(137),
  GroupCoordinator: __webpack_require__(146),
  JoinGroup: __webpack_require__(154),
  Heartbeat: __webpack_require__(167),
  LeaveGroup: __webpack_require__(176),
  SyncGroup: __webpack_require__(185),
  DescribeGroups: __webpack_require__(194),
  ListGroups: __webpack_require__(201),
  SaslHandshake: __webpack_require__(208),
  ApiVersions: __webpack_require__(213),
  CreateTopics: __webpack_require__(220),
  DeleteTopics: __webpack_require__(229),
  DeleteRecords: __webpack_require__(234),
  InitProducerId: __webpack_require__(239),
  OffsetForLeaderEpoch: noImplementedRequestDefinitions,
  AddPartitionsToTxn: __webpack_require__(244),
  AddOffsetsToTxn: __webpack_require__(249),
  EndTxn: __webpack_require__(254),
  WriteTxnMarkers: noImplementedRequestDefinitions,
  TxnOffsetCommit: __webpack_require__(259),
  DescribeAcls: __webpack_require__(264),
  CreateAcls: __webpack_require__(269),
  DeleteAcls: __webpack_require__(274),
  DescribeConfigs: __webpack_require__(279),
  AlterConfigs: __webpack_require__(288),
  AlterReplicaLogDirs: noImplementedRequestDefinitions,
  DescribeLogDirs: noImplementedRequestDefinitions,
  SaslAuthenticate: __webpack_require__(293),
  CreatePartitions: __webpack_require__(298),
  CreateDelegationToken: noImplementedRequestDefinitions,
  RenewDelegationToken: noImplementedRequestDefinitions,
  ExpireDelegationToken: noImplementedRequestDefinitions,
  DescribeDelegationToken: noImplementedRequestDefinitions,
  DeleteGroups: __webpack_require__(303),
}

const names = Object.keys(apiKeys)
const keys = Object.values(apiKeys)
const findApiName = apiKey => names[keys.indexOf(apiKey)]

/**
 * @param {import("../../../types").ApiVersions} versions
 * @returns {Lookup}
 */
const lookup = versions => (apiKey, definition) => {
  const version = versions[apiKey]
  const availableVersions = definition.versions.map(Number)
  const bestImplementedVersion = Math.max(...availableVersions)

  if (!version || version.maxVersion == null) {
    throw new KafkaJSServerDoesNotSupportApiKey(
      `The Kafka server does not support the requested API version`,
      { apiKey, apiName: findApiName(apiKey) }
    )
  }

  const bestSupportedVersion = Math.min(bestImplementedVersion, version.maxVersion)
  return definition.protocol({ version: bestSupportedVersion })
}

module.exports = {
  requests,
  lookup,
}


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = {
  Produce: 0,
  Fetch: 1,
  ListOffsets: 2,
  Metadata: 3,
  LeaderAndIsr: 4,
  StopReplica: 5,
  UpdateMetadata: 6,
  ControlledShutdown: 7,
  OffsetCommit: 8,
  OffsetFetch: 9,
  GroupCoordinator: 10,
  JoinGroup: 11,
  Heartbeat: 12,
  LeaveGroup: 13,
  SyncGroup: 14,
  DescribeGroups: 15,
  ListGroups: 16,
  SaslHandshake: 17,
  ApiVersions: 18, // ApiVersions v0 on Kafka 0.10
  CreateTopics: 19,
  DeleteTopics: 20,
  DeleteRecords: 21,
  InitProducerId: 22,
  OffsetForLeaderEpoch: 23,
  AddPartitionsToTxn: 24,
  AddOffsetsToTxn: 25,
  EndTxn: 26,
  WriteTxnMarkers: 27,
  TxnOffsetCommit: 28,
  DescribeAcls: 29,
  CreateAcls: 30,
  DeleteAcls: 31,
  DescribeConfigs: 32,
  AlterConfigs: 33, // ApiVersions v0 and v1 on Kafka 0.11
  AlterReplicaLogDirs: 34,
  DescribeLogDirs: 35,
  SaslAuthenticate: 36,
  CreatePartitions: 37,
  CreateDelegationToken: 38,
  RenewDelegationToken: 39,
  ExpireDelegationToken: 40,
  DescribeDelegationToken: 41,
  DeleteGroups: 42, // ApiVersions v2 on Kafka 1.0
  ElectPreferredLeaders: 43,
}


/***/ }),
/* 33 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ acks, timeout, topicData }) => {
    const request = __webpack_require__(34)
    const response = __webpack_require__(41)
    return { request: request({ acks, timeout, topicData }), response }
  },
  1: ({ acks, timeout, topicData }) => {
    const request = __webpack_require__(46)
    const response = __webpack_require__(47)
    return { request: request({ acks, timeout, topicData }), response }
  },
  2: ({ acks, timeout, topicData, compression }) => {
    const request = __webpack_require__(48)
    const response = __webpack_require__(49)
    return { request: request({ acks, timeout, compression, topicData }), response }
  },
  3: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __webpack_require__(50)
    const response = __webpack_require__(56)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  4: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __webpack_require__(57)
    const response = __webpack_require__(58)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  5: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __webpack_require__(59)
    const response = __webpack_require__(60)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  6: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __webpack_require__(61)
    const response = __webpack_require__(62)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  7: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __webpack_require__(63)
    const response = __webpack_require__(64)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 34 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Produce: apiKey } = __webpack_require__(32)
const MessageSet = __webpack_require__(36)

/**
 * Produce Request (Version: 0) => acks timeout [topic_data]
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set record_set_size
 *       partition => INT32
 *       record_set_size => INT32
 *       record_set => RECORDS
 */

/**
 * MessageV0:
 * {
 *   key: bytes,
 *   value: bytes
 * }
 *
 * MessageSet:
 * [
 *   { key: "<value>", value: "<value>" },
 *   { key: "<value>", value: "<value>" },
 * ]
 *
 * TopicData:
 * [
 *   {
 *     topic: 'name1',
 *     partitions: [
 *       {
 *         partition: 0,
 *         messages: [<MessageSet>]
 *       }
 *     ]
 *   }
 * ]
 */

/**
 * @param acks {Integer} This field indicates how many acknowledgements the servers should receive before
 *                       responding to the request. If it is 0 the server will not send any response
 *                       (this is the only case where the server will not reply to a request). If it is 1,
 *                       the server will wait the data is written to the local log before sending a response.
 *                       If it is -1 the server will block until the message is committed by all in sync replicas
 *                       before sending a response.
 *
 * @param timeout {Integer} This provides a maximum time in milliseconds the server can await the receipt of the number
 *                          of acknowledgements in RequiredAcks. The timeout is not an exact limit on the request time
 *                          for a few reasons:
 *                          (1) it does not include network latency,
 *                          (2) the timer begins at the beginning of the processing of this request so if many requests are
 *                              queued due to server overload that wait time will not be included,
 *                          (3) we will not terminate a local write so if the local write time exceeds this timeout it will not
 *                              be respected. To get a hard timeout of this type the client should use the socket timeout.
 *
 * @param topicData {Array}
 */
module.exports = ({ acks, timeout, topicData }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Produce',
  expectResponse: () => acks !== 0,
  encode: async () => {
    return new Encoder()
      .writeInt16(acks)
      .writeInt32(timeout)
      .writeArray(topicData.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartitions))
}

const encodePartitions = ({ partition, messages }) => {
  const messageSet = MessageSet({ messageVersion: 0, entries: messages })
  return new Encoder()
    .writeInt32(partition)
    .writeInt32(messageSet.size())
    .writeEncoder(messageSet)
}


/***/ }),
/* 35 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)

const INT8_SIZE = 1
const INT16_SIZE = 2
const INT32_SIZE = 4
const INT64_SIZE = 8
const DOUBLE_SIZE = 8

const MOST_SIGNIFICANT_BIT = 0x80 // 128
const OTHER_BITS = 0x7f // 127
const UNSIGNED_INT32_MAX_NUMBER = 0xffffff80
const UNSIGNED_INT64_MAX_NUMBER = 0xffffffffffffff80n

module.exports = class Encoder {
  static encodeZigZag(value) {
    return (value << 1) ^ (value >> 31)
  }

  static encodeZigZag64(value) {
    const longValue = Long.fromValue(value)
    return longValue.shiftLeft(1).xor(longValue.shiftRight(63))
  }

  static sizeOfVarInt(value) {
    let encodedValue = this.encodeZigZag(value)
    let bytes = 1

    while ((encodedValue & UNSIGNED_INT32_MAX_NUMBER) !== 0) {
      bytes += 1
      encodedValue >>>= 7
    }

    return bytes
  }

  static sizeOfVarLong(value) {
    let longValue = Encoder.encodeZigZag64(value)
    let bytes = 1

    while (longValue.and(UNSIGNED_INT64_MAX_NUMBER).notEquals(Long.fromInt(0))) {
      bytes += 1
      longValue = longValue.shiftRightUnsigned(7)
    }

    return bytes
  }

  static sizeOfVarIntBytes(value) {
    const size = value == null ? -1 : Buffer.byteLength(value)

    if (size < 0) {
      return Encoder.sizeOfVarInt(-1)
    }

    return Encoder.sizeOfVarInt(size) + size
  }

  static nextPowerOfTwo(value) {
    return 1 << (31 - Math.clz32(value) + 1)
  }

  /**
   * Construct a new encoder with the given initial size
   *
   * @param {number} [initialSize] initial size
   */
  constructor(initialSize = 511) {
    this.buf = Buffer.alloc(Encoder.nextPowerOfTwo(initialSize))
    this.offset = 0
  }

  /**
   * @param {Buffer} buffer
   */
  writeBufferInternal(buffer) {
    const bufferLength = buffer.length
    this.ensureAvailable(bufferLength)
    buffer.copy(this.buf, this.offset, 0)
    this.offset += bufferLength
  }

  ensureAvailable(length) {
    if (this.offset + length > this.buf.length) {
      const newLength = Encoder.nextPowerOfTwo(this.offset + length)
      const newBuffer = Buffer.alloc(newLength)
      this.buf.copy(newBuffer, 0, 0, this.offset)
      this.buf = newBuffer
    }
  }

  get buffer() {
    return this.buf.slice(0, this.offset)
  }

  writeInt8(value) {
    this.ensureAvailable(INT8_SIZE)
    this.buf.writeInt8(value, this.offset)
    this.offset += INT8_SIZE
    return this
  }

  writeInt16(value) {
    this.ensureAvailable(INT16_SIZE)
    this.buf.writeInt16BE(value, this.offset)
    this.offset += INT16_SIZE
    return this
  }

  writeInt32(value) {
    this.ensureAvailable(INT32_SIZE)
    this.buf.writeInt32BE(value, this.offset)
    this.offset += INT32_SIZE
    return this
  }

  writeUInt32(value) {
    this.ensureAvailable(INT32_SIZE)
    this.buf.writeUInt32BE(value, this.offset)
    this.offset += INT32_SIZE
    return this
  }

  writeInt64(value) {
    this.ensureAvailable(INT64_SIZE)
    const longValue = Long.fromValue(value)
    this.buf.writeInt32BE(longValue.getHighBits(), this.offset)
    this.buf.writeInt32BE(longValue.getLowBits(), this.offset + INT32_SIZE)
    this.offset += INT64_SIZE
    return this
  }

  writeDouble(value) {
    this.ensureAvailable(DOUBLE_SIZE)
    this.buf.writeDoubleBE(value, this.offset)
    this.offset += DOUBLE_SIZE
    return this
  }

  writeBoolean(value) {
    value ? this.writeInt8(1) : this.writeInt8(0)
    return this
  }

  writeString(value) {
    if (value == null) {
      this.writeInt16(-1)
      return this
    }

    const byteLength = Buffer.byteLength(value, 'utf8')
    this.ensureAvailable(INT16_SIZE + byteLength)
    this.writeInt16(byteLength)
    this.buf.write(value, this.offset, byteLength, 'utf8')
    this.offset += byteLength
    return this
  }

  writeVarIntString(value) {
    if (value == null) {
      this.writeVarInt(-1)
      return this
    }

    const byteLength = Buffer.byteLength(value, 'utf8')
    this.writeVarInt(byteLength)
    this.ensureAvailable(byteLength)
    this.buf.write(value, this.offset, byteLength, 'utf8')
    this.offset += byteLength
    return this
  }

  writeUVarIntString(value) {
    if (value == null) {
      this.writeUVarInt(0)
      return this
    }

    const byteLength = Buffer.byteLength(value, 'utf8')
    this.writeUVarInt(byteLength + 1)
    this.ensureAvailable(byteLength)
    this.buf.write(value, this.offset, byteLength, 'utf8')
    this.offset += byteLength
    return this
  }

  writeBytes(value) {
    if (value == null) {
      this.writeInt32(-1)
      return this
    }

    if (Buffer.isBuffer(value)) {
      // raw bytes
      this.ensureAvailable(INT32_SIZE + value.length)
      this.writeInt32(value.length)
      this.writeBufferInternal(value)
    } else {
      const valueToWrite = String(value)
      const byteLength = Buffer.byteLength(valueToWrite, 'utf8')
      this.ensureAvailable(INT32_SIZE + byteLength)
      this.writeInt32(byteLength)
      this.buf.write(valueToWrite, this.offset, byteLength, 'utf8')
      this.offset += byteLength
    }

    return this
  }

  writeVarIntBytes(value) {
    if (value == null) {
      this.writeVarInt(-1)
      return this
    }

    if (Buffer.isBuffer(value)) {
      // raw bytes
      this.writeVarInt(value.length)
      this.writeBufferInternal(value)
    } else {
      const valueToWrite = String(value)
      const byteLength = Buffer.byteLength(valueToWrite, 'utf8')
      this.writeVarInt(byteLength)
      this.ensureAvailable(byteLength)
      this.buf.write(valueToWrite, this.offset, byteLength, 'utf8')
      this.offset += byteLength
    }

    return this
  }

  writeUVarIntBytes(value) {
    if (value == null) {
      this.writeVarInt(0)
      return this
    }

    if (Buffer.isBuffer(value)) {
      // raw bytes
      this.writeUVarInt(value.length + 1)
      this.writeBufferInternal(value)
    } else {
      const valueToWrite = String(value)
      const byteLength = Buffer.byteLength(valueToWrite, 'utf8')
      this.writeUVarInt(byteLength + 1)
      this.ensureAvailable(byteLength)
      this.buf.write(valueToWrite, this.offset, byteLength, 'utf8')
      this.offset += byteLength
    }

    return this
  }

  writeEncoder(value) {
    if (value == null || !Buffer.isBuffer(value.buf)) {
      throw new Error('value should be an instance of Encoder')
    }

    this.writeBufferInternal(value.buffer)
    return this
  }

  writeEncoderArray(value) {
    if (!Array.isArray(value) || value.some(v => v == null || !Buffer.isBuffer(v.buf))) {
      throw new Error('all values should be an instance of Encoder[]')
    }

    value.forEach(v => {
      this.writeBufferInternal(v.buffer)
    })
    return this
  }

  writeBuffer(value) {
    if (!Buffer.isBuffer(value)) {
      throw new Error('value should be an instance of Buffer')
    }

    this.writeBufferInternal(value)
    return this
  }

  /**
   * @param {any[]} array
   * @param {'int32'|'number'|'string'|'object'} [type]
   */
  writeNullableArray(array, type) {
    // A null value is encoded with length of -1 and there are no following bytes
    // On the context of this library, empty array and null are the same thing
    const length = array.length !== 0 ? array.length : -1
    this.writeArray(array, type, length)
    return this
  }

  /**
   * @param {any[]} array
   * @param {'int32'|'number'|'string'|'object'} [type]
   * @param {number} [length]
   */
  writeArray(array, type, length) {
    const arrayLength = length == null ? array.length : length
    this.writeInt32(arrayLength)
    if (type !== undefined) {
      switch (type) {
        case 'int32':
        case 'number':
          array.forEach(value => this.writeInt32(value))
          break
        case 'string':
          array.forEach(value => this.writeString(value))
          break
        case 'object':
          this.writeEncoderArray(array)
          break
      }
    } else {
      array.forEach(value => {
        switch (typeof value) {
          case 'number':
            this.writeInt32(value)
            break
          case 'string':
            this.writeString(value)
            break
          case 'object':
            this.writeEncoder(value)
            break
        }
      })
    }
    return this
  }

  writeVarIntArray(array, type) {
    if (type === 'object') {
      this.writeVarInt(array.length)
      this.writeEncoderArray(array)
    } else {
      const objectArray = array.filter(v => typeof v === 'object')
      this.writeVarInt(objectArray.length)
      this.writeEncoderArray(objectArray)
    }
    return this
  }

  writeUVarIntArray(array, type) {
    if (type === 'object') {
      this.writeUVarInt(array.length + 1)
      this.writeEncoderArray(array)
    } else {
      const objectArray = array.filter(v => typeof v === 'object')
      this.writeUVarInt(objectArray.length + 1)
      this.writeEncoderArray(objectArray)
    }
    return this
  }

  // Based on:
  // https://en.wikipedia.org/wiki/LEB128 Using LEB128 format similar to VLQ.
  // https://github.com/addthis/stream-lib/blob/master/src/main/java/com/clearspring/analytics/util/Varint.java#L106
  writeVarInt(value) {
    return this.writeUVarInt(Encoder.encodeZigZag(value))
  }

  writeUVarInt(value) {
    const byteArray = []
    while ((value & UNSIGNED_INT32_MAX_NUMBER) !== 0) {
      byteArray.push((value & OTHER_BITS) | MOST_SIGNIFICANT_BIT)
      value >>>= 7
    }
    byteArray.push(value & OTHER_BITS)
    this.writeBufferInternal(Buffer.from(byteArray))
    return this
  }

  writeVarLong(value) {
    const byteArray = []
    let longValue = Encoder.encodeZigZag64(value)

    while (longValue.and(UNSIGNED_INT64_MAX_NUMBER).notEquals(Long.fromInt(0))) {
      byteArray.push(
        longValue
          .and(OTHER_BITS)
          .or(MOST_SIGNIFICANT_BIT)
          .toInt()
      )
      longValue = longValue.shiftRightUnsigned(7)
    }

    byteArray.push(longValue.toInt())

    this.writeBufferInternal(Buffer.from(byteArray))
    return this
  }

  size() {
    // We can use the offset here directly, because we anyways will not re-encode the buffer when writing
    return this.offset
  }

  toJSON() {
    return this.buffer.toJSON()
  }
}


/***/ }),
/* 36 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const MessageProtocol = __webpack_require__(37)
const { Types } = __webpack_require__(28)

/**
 * MessageSet => [Offset MessageSize Message]
 *  Offset => int64
 *  MessageSize => int32
 *  Message => Bytes
 */

/**
 * [
 *   { key: "<value>", value: "<value>" },
 *   { key: "<value>", value: "<value>" },
 * ]
 */
module.exports = ({ messageVersion = 0, compression, entries }) => {
  const isCompressed = compression !== Types.None
  const Message = MessageProtocol({ version: messageVersion })
  const encoder = new Encoder()

  // Messages in a message set are __not__ encoded as an array.
  // They are written in sequence.
  // https://cwiki.apache.org/confluence/display/KAFKA/A+Guide+To+The+Kafka+Protocol#AGuideToTheKafkaProtocol-Messagesets

  entries.forEach((entry, i) => {
    const message = Message(entry)

    // This is the offset used in kafka as the log sequence number.
    // When the producer is sending non compressed messages, it can set the offsets to anything
    // When the producer is sending compressed messages, to avoid server side recompression, each compressed message
    // should have offset starting from 0 and increasing by one for each inner message in the compressed message
    encoder.writeInt64(isCompressed ? i : -1)
    encoder.writeInt32(message.size())

    encoder.writeEncoder(message)
  })

  return encoder
}


/***/ }),
/* 37 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: __webpack_require__(38),
  1: __webpack_require__(40),
}

module.exports = ({ version = 0 }) => versions[version]


/***/ }),
/* 38 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const crc32 = __webpack_require__(39)
const { Types: Compression, COMPRESSION_CODEC_MASK } = __webpack_require__(28)

/**
 * v0
 * Message => Crc MagicByte Attributes Key Value
 *   Crc => int32
 *   MagicByte => int8
 *   Attributes => int8
 *   Key => bytes
 *   Value => bytes
 */

module.exports = ({ compression = Compression.None, key, value }) => {
  const content = new Encoder()
    .writeInt8(0) // magicByte
    .writeInt8(compression & COMPRESSION_CODEC_MASK)
    .writeBytes(key)
    .writeBytes(value)

  const crc = crc32(content)
  return new Encoder().writeInt32(crc).writeEncoder(content)
}


/***/ }),
/* 39 */
/***/ ((module) => {

// Based on https://github.com/brianloveswords/buffer-crc32/blob/master/index.js

var CRC_TABLE = new Int32Array([
  0x00000000,
  0x77073096,
  0xee0e612c,
  0x990951ba,
  0x076dc419,
  0x706af48f,
  0xe963a535,
  0x9e6495a3,
  0x0edb8832,
  0x79dcb8a4,
  0xe0d5e91e,
  0x97d2d988,
  0x09b64c2b,
  0x7eb17cbd,
  0xe7b82d07,
  0x90bf1d91,
  0x1db71064,
  0x6ab020f2,
  0xf3b97148,
  0x84be41de,
  0x1adad47d,
  0x6ddde4eb,
  0xf4d4b551,
  0x83d385c7,
  0x136c9856,
  0x646ba8c0,
  0xfd62f97a,
  0x8a65c9ec,
  0x14015c4f,
  0x63066cd9,
  0xfa0f3d63,
  0x8d080df5,
  0x3b6e20c8,
  0x4c69105e,
  0xd56041e4,
  0xa2677172,
  0x3c03e4d1,
  0x4b04d447,
  0xd20d85fd,
  0xa50ab56b,
  0x35b5a8fa,
  0x42b2986c,
  0xdbbbc9d6,
  0xacbcf940,
  0x32d86ce3,
  0x45df5c75,
  0xdcd60dcf,
  0xabd13d59,
  0x26d930ac,
  0x51de003a,
  0xc8d75180,
  0xbfd06116,
  0x21b4f4b5,
  0x56b3c423,
  0xcfba9599,
  0xb8bda50f,
  0x2802b89e,
  0x5f058808,
  0xc60cd9b2,
  0xb10be924,
  0x2f6f7c87,
  0x58684c11,
  0xc1611dab,
  0xb6662d3d,
  0x76dc4190,
  0x01db7106,
  0x98d220bc,
  0xefd5102a,
  0x71b18589,
  0x06b6b51f,
  0x9fbfe4a5,
  0xe8b8d433,
  0x7807c9a2,
  0x0f00f934,
  0x9609a88e,
  0xe10e9818,
  0x7f6a0dbb,
  0x086d3d2d,
  0x91646c97,
  0xe6635c01,
  0x6b6b51f4,
  0x1c6c6162,
  0x856530d8,
  0xf262004e,
  0x6c0695ed,
  0x1b01a57b,
  0x8208f4c1,
  0xf50fc457,
  0x65b0d9c6,
  0x12b7e950,
  0x8bbeb8ea,
  0xfcb9887c,
  0x62dd1ddf,
  0x15da2d49,
  0x8cd37cf3,
  0xfbd44c65,
  0x4db26158,
  0x3ab551ce,
  0xa3bc0074,
  0xd4bb30e2,
  0x4adfa541,
  0x3dd895d7,
  0xa4d1c46d,
  0xd3d6f4fb,
  0x4369e96a,
  0x346ed9fc,
  0xad678846,
  0xda60b8d0,
  0x44042d73,
  0x33031de5,
  0xaa0a4c5f,
  0xdd0d7cc9,
  0x5005713c,
  0x270241aa,
  0xbe0b1010,
  0xc90c2086,
  0x5768b525,
  0x206f85b3,
  0xb966d409,
  0xce61e49f,
  0x5edef90e,
  0x29d9c998,
  0xb0d09822,
  0xc7d7a8b4,
  0x59b33d17,
  0x2eb40d81,
  0xb7bd5c3b,
  0xc0ba6cad,
  0xedb88320,
  0x9abfb3b6,
  0x03b6e20c,
  0x74b1d29a,
  0xead54739,
  0x9dd277af,
  0x04db2615,
  0x73dc1683,
  0xe3630b12,
  0x94643b84,
  0x0d6d6a3e,
  0x7a6a5aa8,
  0xe40ecf0b,
  0x9309ff9d,
  0x0a00ae27,
  0x7d079eb1,
  0xf00f9344,
  0x8708a3d2,
  0x1e01f268,
  0x6906c2fe,
  0xf762575d,
  0x806567cb,
  0x196c3671,
  0x6e6b06e7,
  0xfed41b76,
  0x89d32be0,
  0x10da7a5a,
  0x67dd4acc,
  0xf9b9df6f,
  0x8ebeeff9,
  0x17b7be43,
  0x60b08ed5,
  0xd6d6a3e8,
  0xa1d1937e,
  0x38d8c2c4,
  0x4fdff252,
  0xd1bb67f1,
  0xa6bc5767,
  0x3fb506dd,
  0x48b2364b,
  0xd80d2bda,
  0xaf0a1b4c,
  0x36034af6,
  0x41047a60,
  0xdf60efc3,
  0xa867df55,
  0x316e8eef,
  0x4669be79,
  0xcb61b38c,
  0xbc66831a,
  0x256fd2a0,
  0x5268e236,
  0xcc0c7795,
  0xbb0b4703,
  0x220216b9,
  0x5505262f,
  0xc5ba3bbe,
  0xb2bd0b28,
  0x2bb45a92,
  0x5cb36a04,
  0xc2d7ffa7,
  0xb5d0cf31,
  0x2cd99e8b,
  0x5bdeae1d,
  0x9b64c2b0,
  0xec63f226,
  0x756aa39c,
  0x026d930a,
  0x9c0906a9,
  0xeb0e363f,
  0x72076785,
  0x05005713,
  0x95bf4a82,
  0xe2b87a14,
  0x7bb12bae,
  0x0cb61b38,
  0x92d28e9b,
  0xe5d5be0d,
  0x7cdcefb7,
  0x0bdbdf21,
  0x86d3d2d4,
  0xf1d4e242,
  0x68ddb3f8,
  0x1fda836e,
  0x81be16cd,
  0xf6b9265b,
  0x6fb077e1,
  0x18b74777,
  0x88085ae6,
  0xff0f6a70,
  0x66063bca,
  0x11010b5c,
  0x8f659eff,
  0xf862ae69,
  0x616bffd3,
  0x166ccf45,
  0xa00ae278,
  0xd70dd2ee,
  0x4e048354,
  0x3903b3c2,
  0xa7672661,
  0xd06016f7,
  0x4969474d,
  0x3e6e77db,
  0xaed16a4a,
  0xd9d65adc,
  0x40df0b66,
  0x37d83bf0,
  0xa9bcae53,
  0xdebb9ec5,
  0x47b2cf7f,
  0x30b5ffe9,
  0xbdbdf21c,
  0xcabac28a,
  0x53b39330,
  0x24b4a3a6,
  0xbad03605,
  0xcdd70693,
  0x54de5729,
  0x23d967bf,
  0xb3667a2e,
  0xc4614ab8,
  0x5d681b02,
  0x2a6f2b94,
  0xb40bbe37,
  0xc30c8ea1,
  0x5a05df1b,
  0x2d02ef8d,
])

module.exports = encoder => {
  const { buffer } = encoder
  const l = buffer.length
  let crc = -1
  for (let n = 0; n < l; n++) {
    crc = CRC_TABLE[(crc ^ buffer[n]) & 0xff] ^ (crc >>> 8)
  }
  return crc ^ -1
}


/***/ }),
/* 40 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const crc32 = __webpack_require__(39)
const { Types: Compression, COMPRESSION_CODEC_MASK } = __webpack_require__(28)

/**
 * v1 (supported since 0.10.0)
 * Message => Crc MagicByte Attributes Key Value
 *   Crc => int32
 *   MagicByte => int8
 *   Attributes => int8
 *   Timestamp => int64
 *   Key => bytes
 *   Value => bytes
 */

module.exports = ({ compression = Compression.None, timestamp = Date.now(), key, value }) => {
  const content = new Encoder()
    .writeInt8(1) // magicByte
    .writeInt8(compression & COMPRESSION_CODEC_MASK)
    .writeInt64(timestamp)
    .writeBytes(key)
    .writeBytes(value)

  const crc = crc32(content)
  return new Encoder().writeInt32(crc).writeEncoder(content)
}


/***/ }),
/* 41 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * v0
 * ProduceResponse => [TopicName [Partition ErrorCode Offset]]
 *   TopicName => string
 *   Partition => int32
 *   ErrorCode => int16
 *   Offset => int64
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offset: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  return {
    topics,
  }
}

const parse = async data => {
  const partitionsWithError = data.topics.map(topic => {
    return topic.partitions.filter(partition => failure(partition.errorCode))
  })

  const errors = flatten(partitionsWithError)
  if (errors.length > 0) {
    const { errorCode } = errors[0]
    throw createErrorFromCode(errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { KafkaJSInvalidVarIntError, KafkaJSInvalidLongError } = __webpack_require__(19)
const Long = __webpack_require__(25)

const INT8_SIZE = 1
const INT16_SIZE = 2
const INT32_SIZE = 4
const INT64_SIZE = 8
const DOUBLE_SIZE = 8

const MOST_SIGNIFICANT_BIT = 0x80 // 128
const OTHER_BITS = 0x7f // 127

module.exports = class Decoder {
  static int32Size() {
    return INT32_SIZE
  }

  static decodeZigZag(value) {
    return (value >>> 1) ^ -(value & 1)
  }

  static decodeZigZag64(longValue) {
    return longValue.shiftRightUnsigned(1).xor(longValue.and(Long.fromInt(1)).negate())
  }

  constructor(buffer) {
    this.buffer = buffer
    this.offset = 0
  }

  readInt8() {
    const value = this.buffer.readInt8(this.offset)
    this.offset += INT8_SIZE
    return value
  }

  canReadInt16() {
    return this.canReadBytes(INT16_SIZE)
  }

  readInt16() {
    const value = this.buffer.readInt16BE(this.offset)
    this.offset += INT16_SIZE
    return value
  }

  canReadInt32() {
    return this.canReadBytes(INT32_SIZE)
  }

  readInt32() {
    const value = this.buffer.readInt32BE(this.offset)
    this.offset += INT32_SIZE
    return value
  }

  canReadInt64() {
    return this.canReadBytes(INT64_SIZE)
  }

  readInt64() {
    const first = this.buffer[this.offset]
    const last = this.buffer[this.offset + 7]

    const low =
      (first << 24) + // Overflow
      this.buffer[this.offset + 1] * 2 ** 16 +
      this.buffer[this.offset + 2] * 2 ** 8 +
      this.buffer[this.offset + 3]
    const high =
      this.buffer[this.offset + 4] * 2 ** 24 +
      this.buffer[this.offset + 5] * 2 ** 16 +
      this.buffer[this.offset + 6] * 2 ** 8 +
      last
    this.offset += INT64_SIZE

    return (BigInt(low) << 32n) + BigInt(high)
  }

  readDouble() {
    const value = this.buffer.readDoubleBE(this.offset)
    this.offset += DOUBLE_SIZE
    return value
  }

  readString() {
    const byteLength = this.readInt16()

    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    const value = stringBuffer.toString('utf8')
    this.offset += byteLength
    return value
  }

  readVarIntString() {
    const byteLength = this.readVarInt()

    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    const value = stringBuffer.toString('utf8')
    this.offset += byteLength
    return value
  }

  readUVarIntString() {
    const byteLength = this.readUVarInt()

    if (byteLength === 0) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    const value = stringBuffer.toString('utf8')
    this.offset += byteLength
    return value
  }

  canReadBytes(length) {
    return Buffer.byteLength(this.buffer) - this.offset >= length
  }

  readBytes(byteLength = this.readInt32()) {
    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    this.offset += byteLength
    return stringBuffer
  }

  readVarIntBytes() {
    const byteLength = this.readVarInt()

    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    this.offset += byteLength
    return stringBuffer
  }

  readUVarIntBytes() {
    const byteLength = this.readUVarInt()

    if (byteLength === 0) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    this.offset += byteLength
    return stringBuffer
  }

  readBoolean() {
    return this.readInt8() === 1
  }

  readAll() {
    const result = this.buffer.slice(this.offset)
    this.offset += Buffer.byteLength(this.buffer)
    return result
  }

  readArray(reader) {
    const length = this.readInt32()

    if (length === -1) {
      return []
    }

    const array = new Array(length)
    for (let i = 0; i < length; i++) {
      array[i] = reader(this)
    }

    return array
  }

  readVarIntArray(reader) {
    const length = this.readVarInt()

    if (length === -1) {
      return []
    }

    const array = new Array(length)
    for (let i = 0; i < length; i++) {
      array[i] = reader(this)
    }

    return array
  }

  readUVarIntArray(reader) {
    const length = this.readUVarInt()

    if (length === 0) {
      return []
    }

    const array = new Array(length - 1)
    for (let i = 0; i < length - 1; i++) {
      array[i] = reader(this)
    }

    return array
  }

  async readArrayAsync(reader) {
    const length = this.readInt32()

    if (length === -1) {
      return []
    }

    const array = new Array(length)
    for (let i = 0; i < length; i++) {
      array[i] = await reader(this)
    }

    return array
  }

  readVarInt() {
    let currentByte
    let result = 0
    let i = 0

    do {
      currentByte = this.buffer[this.offset++]
      result += (currentByte & OTHER_BITS) << i
      i += 7
    } while (currentByte >= MOST_SIGNIFICANT_BIT)

    return Decoder.decodeZigZag(result)
  }

  // By default JavaScript's numbers are of type float64, performing bitwise operations converts the numbers to a signed 32-bit integer
  // Unsigned Right Shift Operator >>> ensures the returned value is an unsigned 32-bit integer
  readUVarInt() {
    let currentByte
    let result = 0
    let i = 0
    while (((currentByte = this.buffer[this.offset++]) & MOST_SIGNIFICANT_BIT) !== 0) {
      result |= (currentByte & OTHER_BITS) << i
      i += 7
      if (i > 28) {
        throw new KafkaJSInvalidVarIntError('Invalid VarInt, must contain 5 bytes or less')
      }
    }
    result |= currentByte << i
    return result >>> 0
  }

  readVarLong() {
    let currentByte
    let result = Long.fromInt(0)
    let i = 0

    do {
      if (i > 63) {
        throw new KafkaJSInvalidLongError('Invalid Long, must contain 9 bytes or less')
      }
      currentByte = this.buffer[this.offset++]
      result = result.add(Long.fromInt(currentByte & OTHER_BITS).shiftLeft(i))
      i += 7
    } while (currentByte >= MOST_SIGNIFICANT_BIT)

    return Decoder.decodeZigZag64(result)
  }

  slice(size) {
    return new Decoder(this.buffer.slice(this.offset, this.offset + size))
  }

  forward(size) {
    this.offset += size
  }
}


/***/ }),
/* 43 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { KafkaJSProtocolError } = __webpack_require__(19)
const websiteUrl = __webpack_require__(44)

const errorCodes = [
  {
    type: 'UNKNOWN',
    code: -1,
    retriable: false,
    message: 'The server experienced an unexpected error when processing the request',
  },
  {
    type: 'OFFSET_OUT_OF_RANGE',
    code: 1,
    retriable: false,
    message: 'The requested offset is not within the range of offsets maintained by the server',
  },
  {
    type: 'CORRUPT_MESSAGE',
    code: 2,
    retriable: true,
    message:
      'This message has failed its CRC checksum, exceeds the valid size, or is otherwise corrupt',
  },
  {
    type: 'UNKNOWN_TOPIC_OR_PARTITION',
    code: 3,
    retriable: true,
    message: 'This server does not host this topic-partition',
  },
  {
    type: 'INVALID_FETCH_SIZE',
    code: 4,
    retriable: false,
    message: 'The requested fetch size is invalid',
  },
  {
    type: 'LEADER_NOT_AVAILABLE',
    code: 5,
    retriable: true,
    message:
      'There is no leader for this topic-partition as we are in the middle of a leadership election',
  },
  {
    type: 'NOT_LEADER_FOR_PARTITION',
    code: 6,
    retriable: true,
    message: 'This server is not the leader for that topic-partition',
  },
  {
    type: 'REQUEST_TIMED_OUT',
    code: 7,
    retriable: true,
    message: 'The request timed out',
  },
  {
    type: 'BROKER_NOT_AVAILABLE',
    code: 8,
    retriable: false,
    message: 'The broker is not available',
  },
  {
    type: 'REPLICA_NOT_AVAILABLE',
    code: 9,
    retriable: false,
    message: 'The replica is not available for the requested topic-partition',
  },
  {
    type: 'MESSAGE_TOO_LARGE',
    code: 10,
    retriable: false,
    message:
      'The request included a message larger than the max message size the server will accept',
  },
  {
    type: 'STALE_CONTROLLER_EPOCH',
    code: 11,
    retriable: false,
    message: 'The controller moved to another broker',
  },
  {
    type: 'OFFSET_METADATA_TOO_LARGE',
    code: 12,
    retriable: false,
    message: 'The metadata field of the offset request was too large',
  },
  {
    type: 'NETWORK_EXCEPTION',
    code: 13,
    retriable: true,
    message: 'The server disconnected before a response was received',
  },
  {
    type: 'GROUP_LOAD_IN_PROGRESS',
    code: 14,
    retriable: true,
    message: "The coordinator is loading and hence can't process requests for this group",
  },
  {
    type: 'GROUP_COORDINATOR_NOT_AVAILABLE',
    code: 15,
    retriable: true,
    message: 'The group coordinator is not available',
  },
  {
    type: 'NOT_COORDINATOR_FOR_GROUP',
    code: 16,
    retriable: true,
    message: 'This is not the correct coordinator for this group',
  },
  {
    type: 'INVALID_TOPIC_EXCEPTION',
    code: 17,
    retriable: false,
    message: 'The request attempted to perform an operation on an invalid topic',
  },
  {
    type: 'RECORD_LIST_TOO_LARGE',
    code: 18,
    retriable: false,
    message:
      'The request included message batch larger than the configured segment size on the server',
  },
  {
    type: 'NOT_ENOUGH_REPLICAS',
    code: 19,
    retriable: true,
    message: 'Messages are rejected since there are fewer in-sync replicas than required',
  },
  {
    type: 'NOT_ENOUGH_REPLICAS_AFTER_APPEND',
    code: 20,
    retriable: true,
    message: 'Messages are written to the log, but to fewer in-sync replicas than required',
  },
  {
    type: 'INVALID_REQUIRED_ACKS',
    code: 21,
    retriable: false,
    message: 'Produce request specified an invalid value for required acks',
  },
  {
    type: 'ILLEGAL_GENERATION',
    code: 22,
    retriable: false,
    message: 'Specified group generation id is not valid',
  },
  {
    type: 'INCONSISTENT_GROUP_PROTOCOL',
    code: 23,
    retriable: false,
    message:
      "The group member's supported protocols are incompatible with those of existing members",
  },
  {
    type: 'INVALID_GROUP_ID',
    code: 24,
    retriable: false,
    message: 'The configured groupId is invalid',
  },
  {
    type: 'UNKNOWN_MEMBER_ID',
    code: 25,
    retriable: false,
    message: 'The coordinator is not aware of this member',
  },
  {
    type: 'INVALID_SESSION_TIMEOUT',
    code: 26,
    retriable: false,
    message:
      'The session timeout is not within the range allowed by the broker (as configured by group.min.session.timeout.ms and group.max.session.timeout.ms)',
  },
  {
    type: 'REBALANCE_IN_PROGRESS',
    code: 27,
    retriable: false,
    message: 'The group is rebalancing, so a rejoin is needed',
    helpUrl: websiteUrl('docs/faq', 'what-does-it-mean-to-get-rebalance-in-progress-errors'),
  },
  {
    type: 'INVALID_COMMIT_OFFSET_SIZE',
    code: 28,
    retriable: false,
    message: 'The committing offset data size is not valid',
  },
  {
    type: 'TOPIC_AUTHORIZATION_FAILED',
    code: 29,
    retriable: false,
    message: 'Not authorized to access topics: [Topic authorization failed]',
  },
  {
    type: 'GROUP_AUTHORIZATION_FAILED',
    code: 30,
    retriable: false,
    message: 'Not authorized to access group: Group authorization failed',
  },
  {
    type: 'CLUSTER_AUTHORIZATION_FAILED',
    code: 31,
    retriable: false,
    message: 'Cluster authorization failed',
  },
  {
    type: 'INVALID_TIMESTAMP',
    code: 32,
    retriable: false,
    message: 'The timestamp of the message is out of acceptable range',
  },
  {
    type: 'UNSUPPORTED_SASL_MECHANISM',
    code: 33,
    retriable: false,
    message: 'The broker does not support the requested SASL mechanism',
  },
  {
    type: 'ILLEGAL_SASL_STATE',
    code: 34,
    retriable: false,
    message: 'Request is not valid given the current SASL state',
  },
  {
    type: 'UNSUPPORTED_VERSION',
    code: 35,
    retriable: false,
    message: 'The version of API is not supported',
  },
  {
    type: 'TOPIC_ALREADY_EXISTS',
    code: 36,
    retriable: false,
    message: 'Topic with this name already exists',
  },
  {
    type: 'INVALID_PARTITIONS',
    code: 37,
    retriable: false,
    message: 'Number of partitions is invalid',
  },
  {
    type: 'INVALID_REPLICATION_FACTOR',
    code: 38,
    retriable: false,
    message: 'Replication-factor is invalid',
  },
  {
    type: 'INVALID_REPLICA_ASSIGNMENT',
    code: 39,
    retriable: false,
    message: 'Replica assignment is invalid',
  },
  {
    type: 'INVALID_CONFIG',
    code: 40,
    retriable: false,
    message: 'Configuration is invalid',
  },
  {
    type: 'NOT_CONTROLLER',
    code: 41,
    retriable: true,
    message: 'This is not the correct controller for this cluster',
  },
  {
    type: 'INVALID_REQUEST',
    code: 42,
    retriable: false,
    message:
      'This most likely occurs because of a request being malformed by the client library or the message was sent to an incompatible broker. See the broker logs for more details',
  },
  {
    type: 'UNSUPPORTED_FOR_MESSAGE_FORMAT',
    code: 43,
    retriable: false,
    message: 'The message format version on the broker does not support the request',
  },
  {
    type: 'POLICY_VIOLATION',
    code: 44,
    retriable: false,
    message: 'Request parameters do not satisfy the configured policy',
  },
  {
    type: 'OUT_OF_ORDER_SEQUENCE_NUMBER',
    code: 45,
    retriable: false,
    message: 'The broker received an out of order sequence number',
  },
  {
    type: 'DUPLICATE_SEQUENCE_NUMBER',
    code: 46,
    retriable: false,
    message: 'The broker received a duplicate sequence number',
  },
  {
    type: 'INVALID_PRODUCER_EPOCH',
    code: 47,
    retriable: false,
    message:
      "Producer attempted an operation with an old epoch. Either there is a newer producer with the same transactionalId, or the producer's transaction has been expired by the broker",
  },
  {
    type: 'INVALID_TXN_STATE',
    code: 48,
    retriable: false,
    message: 'The producer attempted a transactional operation in an invalid state',
  },
  {
    type: 'INVALID_PRODUCER_ID_MAPPING',
    code: 49,
    retriable: false,
    message:
      'The producer attempted to use a producer id which is not currently assigned to its transactional id',
  },
  {
    type: 'INVALID_TRANSACTION_TIMEOUT',
    code: 50,
    retriable: false,
    message:
      'The transaction timeout is larger than the maximum value allowed by the broker (as configured by max.transaction.timeout.ms)',
  },
  {
    type: 'CONCURRENT_TRANSACTIONS',
    code: 51,
    /**
     * The concurrent transactions error has "retriable" set to false on the protocol documentation (https://kafka.apache.org/protocol.html#protocol_error_codes)
     * but the server expects the clients to retry. PR #223
     * @see https://github.com/apache/kafka/blob/12f310d50e7f5b1c18c4f61a119a6cd830da3bc0/core/src/main/scala/kafka/coordinator/transaction/TransactionCoordinator.scala#L153
     */
    retriable: true,
    message:
      'The producer attempted to update a transaction while another concurrent operation on the same transaction was ongoing',
  },
  {
    type: 'TRANSACTION_COORDINATOR_FENCED',
    code: 52,
    retriable: false,
    message:
      'Indicates that the transaction coordinator sending a WriteTxnMarker is no longer the current coordinator for a given producer',
  },
  {
    type: 'TRANSACTIONAL_ID_AUTHORIZATION_FAILED',
    code: 53,
    retriable: false,
    message: 'Transactional Id authorization failed',
  },
  {
    type: 'SECURITY_DISABLED',
    code: 54,
    retriable: false,
    message: 'Security features are disabled',
  },
  {
    type: 'OPERATION_NOT_ATTEMPTED',
    code: 55,
    retriable: false,
    message:
      'The broker did not attempt to execute this operation. This may happen for batched RPCs where some operations in the batch failed, causing the broker to respond without trying the rest',
  },
  {
    type: 'KAFKA_STORAGE_ERROR',
    code: 56,
    retriable: true,
    message: 'Disk error when trying to access log file on the disk',
  },
  {
    type: 'LOG_DIR_NOT_FOUND',
    code: 57,
    retriable: false,
    message: 'The user-specified log directory is not found in the broker config',
  },
  {
    type: 'SASL_AUTHENTICATION_FAILED',
    code: 58,
    retriable: false,
    message: 'SASL Authentication failed',
    helpUrl: websiteUrl('docs/configuration', 'sasl'),
  },
  {
    type: 'UNKNOWN_PRODUCER_ID',
    code: 59,
    retriable: false,
    message:
      "This exception is raised by the broker if it could not locate the producer metadata associated with the producerId in question. This could happen if, for instance, the producer's records were deleted because their retention time had elapsed. Once the last records of the producerId are removed, the producer's metadata is removed from the broker, and future appends by the producer will return this exception",
  },
  {
    type: 'REASSIGNMENT_IN_PROGRESS',
    code: 60,
    retriable: false,
    message: 'A partition reassignment is in progress',
  },
  {
    type: 'DELEGATION_TOKEN_AUTH_DISABLED',
    code: 61,
    retriable: false,
    message: 'Delegation Token feature is not enabled',
  },
  {
    type: 'DELEGATION_TOKEN_NOT_FOUND',
    code: 62,
    retriable: false,
    message: 'Delegation Token is not found on server',
  },
  {
    type: 'DELEGATION_TOKEN_OWNER_MISMATCH',
    code: 63,
    retriable: false,
    message: 'Specified Principal is not valid Owner/Renewer',
  },
  {
    type: 'DELEGATION_TOKEN_REQUEST_NOT_ALLOWED',
    code: 64,
    retriable: false,
    message:
      'Delegation Token requests are not allowed on PLAINTEXT/1-way SSL channels and on delegation token authenticated channels',
  },
  {
    type: 'DELEGATION_TOKEN_AUTHORIZATION_FAILED',
    code: 65,
    retriable: false,
    message: 'Delegation Token authorization failed',
  },
  {
    type: 'DELEGATION_TOKEN_EXPIRED',
    code: 66,
    retriable: false,
    message: 'Delegation Token is expired',
  },
  {
    type: 'INVALID_PRINCIPAL_TYPE',
    code: 67,
    retriable: false,
    message: 'Supplied principalType is not supported',
  },
  {
    type: 'NON_EMPTY_GROUP',
    code: 68,
    retriable: false,
    message: 'The group is not empty',
  },
  {
    type: 'GROUP_ID_NOT_FOUND',
    code: 69,
    retriable: false,
    message: 'The group id was not found',
  },
  {
    type: 'FETCH_SESSION_ID_NOT_FOUND',
    code: 70,
    retriable: true,
    message: 'The fetch session ID was not found',
  },
  {
    type: 'INVALID_FETCH_SESSION_EPOCH',
    code: 71,
    retriable: true,
    message: 'The fetch session epoch is invalid',
  },
  {
    type: 'LISTENER_NOT_FOUND',
    code: 72,
    retriable: true,
    message:
      'There is no listener on the leader broker that matches the listener on which metadata request was processed',
  },
  {
    type: 'TOPIC_DELETION_DISABLED',
    code: 73,
    retriable: false,
    message: 'Topic deletion is disabled',
  },
  {
    type: 'FENCED_LEADER_EPOCH',
    code: 74,
    retriable: true,
    message: 'The leader epoch in the request is older than the epoch on the broker',
  },
  {
    type: 'UNKNOWN_LEADER_EPOCH',
    code: 75,
    retriable: true,
    message: 'The leader epoch in the request is newer than the epoch on the broker',
  },
  {
    type: 'UNSUPPORTED_COMPRESSION_TYPE',
    code: 76,
    retriable: false,
    message: 'The requesting client does not support the compression type of given partition',
  },
  {
    type: 'STALE_BROKER_EPOCH',
    code: 77,
    retriable: false,
    message: 'Broker epoch has changed',
  },
  {
    type: 'OFFSET_NOT_AVAILABLE',
    code: 78,
    retriable: true,
    message:
      'The leader high watermark has not caught up from a recent leader election so the offsets cannot be guaranteed to be monotonically increasing',
  },
  {
    type: 'MEMBER_ID_REQUIRED',
    code: 79,
    retriable: false,
    message:
      'The group member needs to have a valid member id before actually entering a consumer group',
  },
  {
    type: 'PREFERRED_LEADER_NOT_AVAILABLE',
    code: 80,
    retriable: true,
    message: 'The preferred leader was not available',
  },
  {
    type: 'GROUP_MAX_SIZE_REACHED',
    code: 81,
    retriable: false,
    message:
      'The consumer group has reached its max size. It already has the configured maximum number of members',
  },
  {
    type: 'FENCED_INSTANCE_ID',
    code: 82,
    retriable: false,
    message:
      'The broker rejected this static consumer since another consumer with the same group instance id has registered with a different member id',
  },
  {
    type: 'ELIGIBLE_LEADERS_NOT_AVAILABLE',
    code: 83,
    retriable: true,
    message: 'Eligible topic partition leaders are not available',
  },
  {
    type: 'ELECTION_NOT_NEEDED',
    code: 84,
    retriable: true,
    message: 'Leader election not needed for topic partition',
  },
  {
    type: 'NO_REASSIGNMENT_IN_PROGRESS',
    code: 85,
    retriable: false,
    message: 'No partition reassignment is in progress',
  },
  {
    type: 'GROUP_SUBSCRIBED_TO_TOPIC',
    code: 86,
    retriable: false,
    message:
      'Deleting offsets of a topic is forbidden while the consumer group is actively subscribed to it',
  },
  {
    type: 'INVALID_RECORD',
    code: 87,
    retriable: false,
    message: 'This record has failed the validation on broker and hence be rejected',
  },
  {
    type: 'UNSTABLE_OFFSET_COMMIT',
    code: 88,
    retriable: true,
    message: 'There are unstable offsets that need to be cleared',
  },
]

const unknownErrorCode = errorCode => ({
  type: 'KAFKAJS_UNKNOWN_ERROR_CODE',
  code: -99,
  retriable: false,
  message: `Unknown error code ${errorCode}`,
})

const SUCCESS_CODE = 0
const UNSUPPORTED_VERSION_CODE = 35

const failure = code => code !== SUCCESS_CODE
const createErrorFromCode = code => {
  return new KafkaJSProtocolError(errorCodes.find(e => e.code === code) || unknownErrorCode(code))
}

const failIfVersionNotSupported = code => {
  if (code === UNSUPPORTED_VERSION_CODE) {
    throw createErrorFromCode(UNSUPPORTED_VERSION_CODE)
  }
}

const staleMetadata = e =>
  ['UNKNOWN_TOPIC_OR_PARTITION', 'LEADER_NOT_AVAILABLE', 'NOT_LEADER_FOR_PARTITION'].includes(
    e.type
  )

module.exports = {
  failure,
  errorCodes,
  createErrorFromCode,
  failIfVersionNotSupported,
  staleMetadata,
}


/***/ }),
/* 44 */
/***/ ((module) => {

const BASE_URL = 'https://kafka.js.org'

module.exports = (path, hash) => `${BASE_URL}/${path}${hash ? '#' + hash : ''}`


/***/ }),
/* 45 */
/***/ ((module) => {

/**
 * Flatten the given arrays into a new array
 *
 * @param {Array<Array<T>>} arrays
 * @returns {Array<T>}
 * @template T
 */
function flatten(arrays) {
  return [].concat.apply([], arrays)
}

module.exports = flatten


/***/ }),
/* 46 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(34)

// Produce Request on or after v1 indicates the client can parse the quota throttle time
// in the Produce Response.

module.exports = ({ acks, timeout, topicData }) => {
  return Object.assign(requestV0({ acks, timeout, topicData }), { apiVersion: 1 })
}


/***/ }),
/* 47 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(41)

/**
 * v1 (supported in 0.9.0 or later)
 * ProduceResponse => [TopicName [Partition ErrorCode Offset]] ThrottleTime
 *   TopicName => string
 *   Partition => int32
 *   ErrorCode => int16
 *   Offset => int64
 *   ThrottleTime => int32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offset: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Produce: apiKey } = __webpack_require__(32)
const MessageSet = __webpack_require__(36)
const { Types, lookupCodec } = __webpack_require__(28)

// Produce Request on or after v2 indicates the client can parse the timestamp field
// in the produce Response.

module.exports = ({ acks, timeout, compression = Types.None, topicData }) => ({
  apiKey,
  apiVersion: 2,
  apiName: 'Produce',
  expectResponse: () => acks !== 0,
  encode: async () => {
    const encodeTopic = topicEncoder(compression)
    const encodedTopicData = []

    for (const data of topicData) {
      encodedTopicData.push(await encodeTopic(data))
    }

    return new Encoder()
      .writeInt16(acks)
      .writeInt32(timeout)
      .writeArray(encodedTopicData)
  },
})

const topicEncoder = compression => {
  const encodePartitions = partitionsEncoder(compression)

  return async ({ topic, partitions }) => {
    const encodedPartitions = []

    for (const data of partitions) {
      encodedPartitions.push(await encodePartitions(data))
    }

    return new Encoder().writeString(topic).writeArray(encodedPartitions)
  }
}

const partitionsEncoder = compression => async ({ partition, messages }) => {
  const messageSet = MessageSet({ messageVersion: 1, compression, entries: messages })

  if (compression === Types.None) {
    return new Encoder()
      .writeInt32(partition)
      .writeInt32(messageSet.size())
      .writeEncoder(messageSet)
  }

  const timestamp = messages[0].timestamp || Date.now()

  const codec = lookupCodec(compression)
  const compressedValue = await codec.compress(messageSet)
  const compressedMessageSet = MessageSet({
    messageVersion: 1,
    entries: [{ compression, timestamp, value: compressedValue }],
  })

  return new Encoder()
    .writeInt32(partition)
    .writeInt32(compressedMessageSet.size())
    .writeEncoder(compressedMessageSet)
}


/***/ }),
/* 49 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(41)

/**
 * v2 (supported in 0.10.0 or later)
 * ProduceResponse => [TopicName [Partition ErrorCode Offset Timestamp]] ThrottleTime
 *   TopicName => string
 *   Partition => int32
 *   ErrorCode => int16
 *   Offset => int64
 *   Timestamp => int64
 *   ThrottleTime => int32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offset: decoder.readInt64().toString(),
  timestamp: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 50 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const Encoder = __webpack_require__(35)
const { Produce: apiKey } = __webpack_require__(32)
const { Types } = __webpack_require__(28)
const Record = __webpack_require__(51)
const { RecordBatch } = __webpack_require__(53)

/**
 * Produce Request (Version: 3) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

/**
 * @param [transactionalId=null] {String} The transactional id or null if the producer is not transactional
 * @param acks {Integer} See producer request v0
 * @param timeout {Integer} See producer request v0
 * @param [compression=CompressionTypes.None] {CompressionTypes}
 * @param topicData {Array}
 */
module.exports = ({
  acks,
  timeout,
  transactionalId = null,
  producerId = Long.fromInt(-1),
  producerEpoch = 0,
  compression = Types.None,
  topicData,
}) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'Produce',
  expectResponse: () => acks !== 0,
  encode: async () => {
    const encodeTopic = topicEncoder(compression)
    const encodedTopicData = []

    for (const data of topicData) {
      encodedTopicData.push(
        await encodeTopic({ ...data, transactionalId, producerId, producerEpoch })
      )
    }

    return new Encoder()
      .writeString(transactionalId)
      .writeInt16(acks)
      .writeInt32(timeout)
      .writeArray(encodedTopicData)
  },
})

const topicEncoder = compression => async ({
  topic,
  partitions,
  transactionalId,
  producerId,
  producerEpoch,
}) => {
  const encodePartitions = partitionsEncoder(compression)
  const encodedPartitions = []

  for (const data of partitions) {
    encodedPartitions.push(
      await encodePartitions({ ...data, transactionalId, producerId, producerEpoch })
    )
  }

  return new Encoder().writeString(topic).writeArray(encodedPartitions)
}

const partitionsEncoder = compression => async ({
  partition,
  messages,
  transactionalId,
  firstSequence,
  producerId,
  producerEpoch,
}) => {
  const dateNow = Date.now()
  const messageTimestamps = messages
    .map(m => m.timestamp)
    .filter(timestamp => timestamp != null)
    .sort()

  const timestamps = messageTimestamps.length === 0 ? [dateNow] : messageTimestamps
  const firstTimestamp = timestamps[0]
  const maxTimestamp = timestamps[timestamps.length - 1]

  const records = messages.map((message, i) =>
    Record({
      ...message,
      offsetDelta: i,
      timestampDelta: (message.timestamp || dateNow) - firstTimestamp,
    })
  )

  const recordBatch = await RecordBatch({
    compression,
    records,
    firstTimestamp,
    maxTimestamp,
    producerId,
    producerEpoch,
    firstSequence,
    transactional: !!transactionalId,
    lastOffsetDelta: records.length - 1,
  })

  return new Encoder()
    .writeInt32(partition)
    .writeInt32(recordBatch.size())
    .writeEncoder(recordBatch)
}


/***/ }),
/* 51 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const Header = __webpack_require__(52)

/**
 * v0
 * Record =>
 *   Length => Varint
 *   Attributes => Int8
 *   TimestampDelta => Varlong
 *   OffsetDelta => Varint
 *   Key => varInt|Bytes
 *   Value => varInt|Bytes
 *   Headers => [HeaderKey HeaderValue]
 *     HeaderKey => VarInt|String
 *     HeaderValue => VarInt|Bytes
 */

/**
 * @param [offsetDelta=0] {Integer}
 * @param [timestampDelta=0] {Long}
 * @param key {Buffer}
 * @param value {Buffer}
 * @param [headers={}] {Object}
 */
module.exports = ({ offsetDelta = 0, timestampDelta = 0, key, value, headers = {} }) => {
  const headersArray = Object.keys(headers).map(headerKey => ({
    key: headerKey,
    value: headers[headerKey],
  }))

  const sizeOfBody =
    1 + // always one byte for attributes
    Encoder.sizeOfVarLong(timestampDelta) +
    Encoder.sizeOfVarInt(offsetDelta) +
    Encoder.sizeOfVarIntBytes(key) +
    Encoder.sizeOfVarIntBytes(value) +
    sizeOfHeaders(headersArray)

  return new Encoder()
    .writeVarInt(sizeOfBody)
    .writeInt8(0) // no used record attributes at the moment
    .writeVarLong(timestampDelta)
    .writeVarInt(offsetDelta)
    .writeVarIntBytes(key)
    .writeVarIntBytes(value)
    .writeVarIntArray(headersArray.map(Header))
}

const sizeOfHeaders = headersArray => {
  let size = Encoder.sizeOfVarInt(headersArray.length)

  for (const header of headersArray) {
    const keySize = Buffer.byteLength(header.key)
    const valueSize = Buffer.byteLength(header.value)

    size += Encoder.sizeOfVarInt(keySize) + keySize

    if (header.value === null) {
      size += Encoder.sizeOfVarInt(-1)
    } else {
      size += Encoder.sizeOfVarInt(valueSize) + valueSize
    }
  }

  return size
}


/***/ }),
/* 52 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)

/**
 * v0
 * Header => Key Value
 *   Key => varInt|string
 *   Value => varInt|bytes
 */

module.exports = ({ key, value }) => {
  return new Encoder().writeVarIntString(key).writeVarIntBytes(value)
}


/***/ }),
/* 53 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const Encoder = __webpack_require__(35)
const crc32C = __webpack_require__(54)
const {
  Types: Compression,
  lookupCodec,
  COMPRESSION_CODEC_MASK,
} = __webpack_require__(28)

const MAGIC_BYTE = 2
const TIMESTAMP_MASK = 0 // The fourth lowest bit, always set this bit to 0 (since 0.10.0)
const TRANSACTIONAL_MASK = 16 // The fifth lowest bit

/**
 * v0
 * RecordBatch =>
 *  FirstOffset => int64
 *  Length => int32
 *  PartitionLeaderEpoch => int32
 *  Magic => int8
 *  CRC => int32
 *  Attributes => int16
 *  LastOffsetDelta => int32
 *  FirstTimestamp => int64
 *  MaxTimestamp => int64
 *  ProducerId => int64
 *  ProducerEpoch => int16
 *  FirstSequence => int32
 *  Records => [Record]
 */

const RecordBatch = async ({
  compression = Compression.None,
  firstOffset = Long.fromInt(0),
  firstTimestamp = Date.now(),
  maxTimestamp = Date.now(),
  partitionLeaderEpoch = 0,
  lastOffsetDelta = 0,
  transactional = false,
  producerId = Long.fromValue(-1), // for idempotent messages
  producerEpoch = 0, // for idempotent messages
  firstSequence = 0, // for idempotent messages
  records = [],
}) => {
  const COMPRESSION_CODEC = compression & COMPRESSION_CODEC_MASK
  const IN_TRANSACTION = transactional ? TRANSACTIONAL_MASK : 0
  const attributes = COMPRESSION_CODEC | TIMESTAMP_MASK | IN_TRANSACTION

  const batchBody = new Encoder()
    .writeInt16(attributes)
    .writeInt32(lastOffsetDelta)
    .writeInt64(firstTimestamp)
    .writeInt64(maxTimestamp)
    .writeInt64(producerId)
    .writeInt16(producerEpoch)
    .writeInt32(firstSequence)

  if (compression === Compression.None) {
    if (records.every(v => typeof v === typeof records[0])) {
      batchBody.writeArray(records, typeof records[0])
    } else {
      batchBody.writeArray(records)
    }
  } else {
    const compressedRecords = await compressRecords(compression, records)
    batchBody.writeInt32(records.length).writeBuffer(compressedRecords)
  }

  // CRC32C validation is happening here:
  // https://github.com/apache/kafka/blob/0.11.0.1/clients/src/main/java/org/apache/kafka/common/record/DefaultRecordBatch.java#L148

  const batch = new Encoder()
    .writeInt32(partitionLeaderEpoch)
    .writeInt8(MAGIC_BYTE)
    .writeUInt32(crc32C(batchBody.buffer))
    .writeEncoder(batchBody)

  return new Encoder().writeInt64(firstOffset).writeBytes(batch.buffer)
}

const compressRecords = async (compression, records) => {
  const codec = lookupCodec(compression)
  const recordsEncoder = new Encoder()

  recordsEncoder.writeEncoderArray(records)

  return codec.compress(recordsEncoder)
}

module.exports = {
  RecordBatch,
  MAGIC_BYTE,
}


/***/ }),
/* 54 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const crc32C = __webpack_require__(55)
const unsigned = value => Uint32Array.from([value])[0]

module.exports = buffer => unsigned(crc32C(buffer))


/***/ }),
/* 55 */
/***/ ((module) => {

/**
 * A javascript implementation of the CRC32 checksum that uses
 * the CRC32-C polynomial, the same polynomial used by iSCSI
 *
 * also known as CRC32 Castagnoli
 * based on: https://github.com/ashi009/node-fast-crc32c/blob/master/impls/js_crc32c.js
 */
const crc32C = buffer => {
  let crc = 0 ^ -1
  for (let i = 0; i < buffer.length; i++) {
    crc = T[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8)
  }

  return (crc ^ -1) >>> 0
}

module.exports = crc32C

// prettier-ignore
var T = new Int32Array([
  0x00000000, 0xf26b8303, 0xe13b70f7, 0x1350f3f4,
  0xc79a971f, 0x35f1141c, 0x26a1e7e8, 0xd4ca64eb,
  0x8ad958cf, 0x78b2dbcc, 0x6be22838, 0x9989ab3b,
  0x4d43cfd0, 0xbf284cd3, 0xac78bf27, 0x5e133c24,
  0x105ec76f, 0xe235446c, 0xf165b798, 0x030e349b,
  0xd7c45070, 0x25afd373, 0x36ff2087, 0xc494a384,
  0x9a879fa0, 0x68ec1ca3, 0x7bbcef57, 0x89d76c54,
  0x5d1d08bf, 0xaf768bbc, 0xbc267848, 0x4e4dfb4b,
  0x20bd8ede, 0xd2d60ddd, 0xc186fe29, 0x33ed7d2a,
  0xe72719c1, 0x154c9ac2, 0x061c6936, 0xf477ea35,
  0xaa64d611, 0x580f5512, 0x4b5fa6e6, 0xb93425e5,
  0x6dfe410e, 0x9f95c20d, 0x8cc531f9, 0x7eaeb2fa,
  0x30e349b1, 0xc288cab2, 0xd1d83946, 0x23b3ba45,
  0xf779deae, 0x05125dad, 0x1642ae59, 0xe4292d5a,
  0xba3a117e, 0x4851927d, 0x5b016189, 0xa96ae28a,
  0x7da08661, 0x8fcb0562, 0x9c9bf696, 0x6ef07595,
  0x417b1dbc, 0xb3109ebf, 0xa0406d4b, 0x522bee48,
  0x86e18aa3, 0x748a09a0, 0x67dafa54, 0x95b17957,
  0xcba24573, 0x39c9c670, 0x2a993584, 0xd8f2b687,
  0x0c38d26c, 0xfe53516f, 0xed03a29b, 0x1f682198,
  0x5125dad3, 0xa34e59d0, 0xb01eaa24, 0x42752927,
  0x96bf4dcc, 0x64d4cecf, 0x77843d3b, 0x85efbe38,
  0xdbfc821c, 0x2997011f, 0x3ac7f2eb, 0xc8ac71e8,
  0x1c661503, 0xee0d9600, 0xfd5d65f4, 0x0f36e6f7,
  0x61c69362, 0x93ad1061, 0x80fde395, 0x72966096,
  0xa65c047d, 0x5437877e, 0x4767748a, 0xb50cf789,
  0xeb1fcbad, 0x197448ae, 0x0a24bb5a, 0xf84f3859,
  0x2c855cb2, 0xdeeedfb1, 0xcdbe2c45, 0x3fd5af46,
  0x7198540d, 0x83f3d70e, 0x90a324fa, 0x62c8a7f9,
  0xb602c312, 0x44694011, 0x5739b3e5, 0xa55230e6,
  0xfb410cc2, 0x092a8fc1, 0x1a7a7c35, 0xe811ff36,
  0x3cdb9bdd, 0xceb018de, 0xdde0eb2a, 0x2f8b6829,
  0x82f63b78, 0x709db87b, 0x63cd4b8f, 0x91a6c88c,
  0x456cac67, 0xb7072f64, 0xa457dc90, 0x563c5f93,
  0x082f63b7, 0xfa44e0b4, 0xe9141340, 0x1b7f9043,
  0xcfb5f4a8, 0x3dde77ab, 0x2e8e845f, 0xdce5075c,
  0x92a8fc17, 0x60c37f14, 0x73938ce0, 0x81f80fe3,
  0x55326b08, 0xa759e80b, 0xb4091bff, 0x466298fc,
  0x1871a4d8, 0xea1a27db, 0xf94ad42f, 0x0b21572c,
  0xdfeb33c7, 0x2d80b0c4, 0x3ed04330, 0xccbbc033,
  0xa24bb5a6, 0x502036a5, 0x4370c551, 0xb11b4652,
  0x65d122b9, 0x97baa1ba, 0x84ea524e, 0x7681d14d,
  0x2892ed69, 0xdaf96e6a, 0xc9a99d9e, 0x3bc21e9d,
  0xef087a76, 0x1d63f975, 0x0e330a81, 0xfc588982,
  0xb21572c9, 0x407ef1ca, 0x532e023e, 0xa145813d,
  0x758fe5d6, 0x87e466d5, 0x94b49521, 0x66df1622,
  0x38cc2a06, 0xcaa7a905, 0xd9f75af1, 0x2b9cd9f2,
  0xff56bd19, 0x0d3d3e1a, 0x1e6dcdee, 0xec064eed,
  0xc38d26c4, 0x31e6a5c7, 0x22b65633, 0xd0ddd530,
  0x0417b1db, 0xf67c32d8, 0xe52cc12c, 0x1747422f,
  0x49547e0b, 0xbb3ffd08, 0xa86f0efc, 0x5a048dff,
  0x8ecee914, 0x7ca56a17, 0x6ff599e3, 0x9d9e1ae0,
  0xd3d3e1ab, 0x21b862a8, 0x32e8915c, 0xc083125f,
  0x144976b4, 0xe622f5b7, 0xf5720643, 0x07198540,
  0x590ab964, 0xab613a67, 0xb831c993, 0x4a5a4a90,
  0x9e902e7b, 0x6cfbad78, 0x7fab5e8c, 0x8dc0dd8f,
  0xe330a81a, 0x115b2b19, 0x020bd8ed, 0xf0605bee,
  0x24aa3f05, 0xd6c1bc06, 0xc5914ff2, 0x37faccf1,
  0x69e9f0d5, 0x9b8273d6, 0x88d28022, 0x7ab90321,
  0xae7367ca, 0x5c18e4c9, 0x4f48173d, 0xbd23943e,
  0xf36e6f75, 0x0105ec76, 0x12551f82, 0xe03e9c81,
  0x34f4f86a, 0xc69f7b69, 0xd5cf889d, 0x27a40b9e,
  0x79b737ba, 0x8bdcb4b9, 0x988c474d, 0x6ae7c44e,
  0xbe2da0a5, 0x4c4623a6, 0x5f16d052, 0xad7d5351
]);


/***/ }),
/* 56 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * Produce Response (Version: 3) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *   throttle_time_ms => INT32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  baseOffset: decoder.readInt64().toString(),
  logAppendTime: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

const parse = async data => {
  const partitionsWithError = data.topics.map(response => {
    return response.partitions.filter(partition => failure(partition.errorCode))
  })

  const errors = flatten(partitionsWithError)
  if (errors.length > 0) {
    const { errorCode } = errors[0]
    throw createErrorFromCode(errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV3 = __webpack_require__(50)

/**
 * Produce Request (Version: 4) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV3({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 4 }
  )


/***/ }),
/* 58 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(56)

/**
 * Produce Response (Version: 4) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *   throttle_time_ms => INT32
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 59 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV3 = __webpack_require__(50)

/**
 * Produce Request (Version: 5) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV3({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 5 }
  )


/***/ }),
/* 60 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV3 } = __webpack_require__(56)

/**
 * Produce Response (Version: 5) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time log_start_offset
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *       log_start_offset => INT64
 *   throttle_time_ms => INT32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  baseOffset: decoder.readInt64().toString(),
  logAppendTime: decoder.readInt64().toString(),
  logStartOffset: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV3,
}


/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV5 = __webpack_require__(59)

/**
 * The version number is bumped to indicate that on quota violation brokers send out responses before throttling.
 * @see https://github.com/apache/kafka/blob/9c8f75c4b624084c954b4da69f092211a9ac4689/clients/src/main/java/org/apache/kafka/common/requests/ProduceRequest.java#L113-L117
 *
 * Produce Request (Version: 6) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV5({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 6 }
  )


/***/ }),
/* 62 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV5 } = __webpack_require__(60)

/**
 * The version number is bumped to indicate that on quota violation brokers send out responses before throttling.
 * @see https://github.com/apache/kafka/blob/9c8f75c4b624084c954b4da69f092211a9ac4689/clients/src/main/java/org/apache/kafka/common/requests/ProduceResponse.java#L152-L156
 *
 * Produce Response (Version: 6) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time log_start_offset
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *       log_start_offset => INT64
 *   throttle_time_ms => INT32
 */

const decode = async rawData => {
  const decoded = await decodeV5(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 63 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV6 = __webpack_require__(61)

/**
 * V7 indicates ZStandard capability (see KIP-110)
 * @see https://github.com/apache/kafka/blob/9c8f75c4b624084c954b4da69f092211a9ac4689/clients/src/main/java/org/apache/kafka/common/requests/ProduceRequest.java#L118-L121
 *
 * Produce Request (Version: 7) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV6({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 7 }
  )


/***/ }),
/* 64 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(62)

/**
 * Produce Response (Version: 7) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time log_start_offset
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *       log_start_offset => INT64
 *   throttle_time_ms => INT32
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 65 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ISOLATION_LEVEL = __webpack_require__(66)

// For normal consumers, use -1
const REPLICA_ID = -1
const NETWORK_DELAY = 100

/**
 * The FETCH request can block up to maxWaitTime, which can be bigger than the configured
 * request timeout. It's safer to always use the maxWaitTime
 **/
const requestTimeout = timeout =>
  Number.isSafeInteger(timeout + NETWORK_DELAY) ? timeout + NETWORK_DELAY : timeout

const versions = {
  0: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
    const request = __webpack_require__(67)
    const response = __webpack_require__(68)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  1: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
    const request = __webpack_require__(73)
    const response = __webpack_require__(74)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  2: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
    const request = __webpack_require__(75)
    const response = __webpack_require__(76)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  3: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, maxBytes, topics }) => {
    const request = __webpack_require__(77)
    const response = __webpack_require__(78)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  4: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __webpack_require__(79)
    const response = __webpack_require__(80)
    return {
      request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  5: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __webpack_require__(86)
    const response = __webpack_require__(87)
    return {
      request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  6: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __webpack_require__(88)
    const response = __webpack_require__(89)
    return {
      request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  7: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    sessionId = 0,
    sessionEpoch = -1,
    forgottenTopics = [],
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __webpack_require__(90)
    const response = __webpack_require__(91)
    return {
      request: request({
        replicaId,
        isolationLevel,
        sessionId,
        sessionEpoch,
        forgottenTopics,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics,
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  8: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    sessionId = 0,
    sessionEpoch = -1,
    forgottenTopics = [],
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __webpack_require__(92)
    const response = __webpack_require__(93)
    return {
      request: request({
        replicaId,
        isolationLevel,
        sessionId,
        sessionEpoch,
        forgottenTopics,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics,
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  9: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    sessionId = 0,
    sessionEpoch = -1,
    forgottenTopics = [],
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __webpack_require__(94)
    const response = __webpack_require__(95)
    return {
      request: request({
        replicaId,
        isolationLevel,
        sessionId,
        sessionEpoch,
        forgottenTopics,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics,
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  10: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    sessionId = 0,
    sessionEpoch = -1,
    forgottenTopics = [],
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __webpack_require__(96)
    const response = __webpack_require__(97)
    return {
      request: request({
        replicaId,
        isolationLevel,
        sessionId,
        sessionEpoch,
        forgottenTopics,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics,
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  11: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    sessionId = 0,
    sessionEpoch = -1,
    forgottenTopics = [],
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
    rackId,
  }) => {
    const request = __webpack_require__(98)
    const response = __webpack_require__(99)
    return {
      request: request({
        replicaId,
        isolationLevel,
        sessionId,
        sessionEpoch,
        forgottenTopics,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics,
        rackId,
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 66 */
/***/ ((module) => {

/**
 * Enum for isolation levels
 * @readonly
 * @enum {number}
 */
module.exports = {
  // Makes all records visible
  READ_UNCOMMITTED: 0,

  // non-transactional and COMMITTED transactional records are visible. It returns all data
  // from offsets smaller than the current LSO (last stable offset), and enables the inclusion of
  // the list of aborted transactions in the result, which allows consumers to discard ABORTED
  // transactional records
  READ_COMMITTED: 1,
}


/***/ }),
/* 67 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Fetch: apiKey } = __webpack_require__(32)

/**
 * Fetch Request (Version: 0) => replica_id max_wait_time min_bytes [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       max_bytes => INT32
 */

/**
 * @param {number} replicaId Broker id of the follower
 * @param {number} maxWaitTime Maximum time in ms to wait for the response
 * @param {number} minBytes Minimum bytes to accumulate in the response.
 * @param {Array} topics Topics to fetch
 *                        [
 *                          {
 *                            topic: 'topic-name',
 *                            partitions: [
 *                              {
 *                                partition: 0,
 *                                fetchOffset: '4124',
 *                                maxBytes: 2048
 *                              }
 *                            ]
 *                          }
 *                        ]
 */
module.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt32(maxBytes)
}


/***/ }),
/* 68 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { KafkaJSOffsetOutOfRange } = __webpack_require__(19)
const { failure, createErrorFromCode, errorCodes } = __webpack_require__(43)
const flatten = __webpack_require__(45)
const MessageSetDecoder = __webpack_require__(69)

/**
 * Fetch Response (Version: 0) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *       record_set => RECORDS
 */

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  messages: await MessageSetDecoder(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    responses,
  }
}

const { code: OFFSET_OUT_OF_RANGE_ERROR_CODE } = errorCodes.find(
  e => e.type === 'OFFSET_OUT_OF_RANGE'
)

const parse = async data => {
  const partitionsWithError = data.responses.map(({ topicName, partitions }) => {
    return partitions
      .filter(partition => failure(partition.errorCode))
      .map(partition => Object.assign({}, partition, { topic: topicName }))
  })

  const errors = flatten(partitionsWithError)
  if (errors.length > 0) {
    const { errorCode, topic, partition } = errors[0]
    if (errorCode === OFFSET_OUT_OF_RANGE_ERROR_CODE) {
      throw new KafkaJSOffsetOutOfRange(createErrorFromCode(errorCode), { topic, partition })
    }

    throw createErrorFromCode(errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 69 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const Decoder = __webpack_require__(42)
const MessageDecoder = __webpack_require__(70)
const { lookupCodecByAttributes } = __webpack_require__(28)
const { KafkaJSPartialMessageError } = __webpack_require__(19)

/**
 * MessageSet => [Offset MessageSize Message]
 *  Offset => int64
 *  MessageSize => int32
 *  Message => Bytes
 */

module.exports = async (primaryDecoder, size = null) => {
  const messages = []
  const messageSetSize = size || primaryDecoder.readInt32()
  const messageSetDecoder = primaryDecoder.slice(messageSetSize)

  while (messageSetDecoder.offset < messageSetSize) {
    try {
      const message = EntryDecoder(messageSetDecoder)
      const codec = lookupCodecByAttributes(message.attributes)

      if (codec) {
        const buffer = await codec.decompress(message.value)
        messages.push(...EntriesDecoder(new Decoder(buffer), message))
      } else {
        messages.push(message)
      }
    } catch (e) {
      if (e.name === 'KafkaJSPartialMessageError') {
        // We tried to decode a partial message, it means that minBytes
        // is probably too low
        break
      }

      if (e.name === 'KafkaJSUnsupportedMagicByteInMessageSet') {
        // Received a MessageSet and a RecordBatch on the same response, the cluster is probably
        // upgrading the message format from 0.10 to 0.11. Stop processing this message set to
        // receive the full record batch on the next request
        break
      }

      throw e
    }
  }

  primaryDecoder.forward(messageSetSize)
  return messages
}

const EntriesDecoder = (decoder, compressedMessage) => {
  const messages = []

  while (decoder.offset < decoder.buffer.length) {
    messages.push(EntryDecoder(decoder))
  }

  if (compressedMessage.magicByte > 0 && compressedMessage.offset >= 0) {
    const compressedOffset = Long.fromValue(compressedMessage.offset)
    const lastMessageOffset = Long.fromValue(messages[messages.length - 1].offset)
    const baseOffset = compressedOffset - lastMessageOffset

    for (const message of messages) {
      message.offset = Long.fromValue(message.offset)
        .add(baseOffset)
        .toString()
    }
  }

  return messages
}

const EntryDecoder = decoder => {
  if (!decoder.canReadInt64()) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial message: There isn't enough bytes to read the offset`
    )
  }

  const offset = decoder.readInt64().toString()

  if (!decoder.canReadInt32()) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial message: There isn't enough bytes to read the message size`
    )
  }

  const size = decoder.readInt32()
  return MessageDecoder(offset, size, decoder)
}


/***/ }),
/* 70 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  KafkaJSPartialMessageError,
  KafkaJSUnsupportedMagicByteInMessageSet,
} = __webpack_require__(19)

const V0Decoder = __webpack_require__(71)
const V1Decoder = __webpack_require__(72)

const decodeMessage = (decoder, magicByte) => {
  switch (magicByte) {
    case 0:
      return V0Decoder(decoder)
    case 1:
      return V1Decoder(decoder)
    default:
      throw new KafkaJSUnsupportedMagicByteInMessageSet(
        `Unsupported MessageSet message version, magic byte: ${magicByte}`
      )
  }
}

module.exports = (offset, size, decoder) => {
  // Don't decrement decoder.offset because slice is already considering the current
  // offset of the decoder
  const remainingBytes = Buffer.byteLength(decoder.slice(size).buffer)

  if (remainingBytes < size) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial message: remainingBytes(${remainingBytes}) < messageSize(${size})`
    )
  }

  const crc = decoder.readInt32()
  const magicByte = decoder.readInt8()
  const message = decodeMessage(decoder, magicByte)
  return Object.assign({ offset, size, crc, magicByte }, message)
}


/***/ }),
/* 71 */
/***/ ((module) => {

module.exports = decoder => ({
  attributes: decoder.readInt8(),
  key: decoder.readBytes(),
  value: decoder.readBytes(),
})


/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = decoder => ({
  attributes: decoder.readInt8(),
  timestamp: decoder.readInt64().toString(),
  key: decoder.readBytes(),
  value: decoder.readBytes(),
})


/***/ }),
/* 73 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(67)

module.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => {
  return Object.assign(requestV0({ replicaId, maxWaitTime, minBytes, topics }), { apiVersion: 1 })
}


/***/ }),
/* 74 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(68)
const MessageSetDecoder = __webpack_require__(69)

/**
 * Fetch Response (Version: 1) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *       record_set => RECORDS
 */

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  messages: await MessageSetDecoder(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 75 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(67)

module.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => {
  return Object.assign(requestV0({ replicaId, maxWaitTime, minBytes, topics }), { apiVersion: 2 })
}


/***/ }),
/* 76 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(74)

/**
 * Fetch Response (Version: 2) => throttle_time_ms [responses]
 *  throttle_time_ms => INT32
 *  responses => topic [partition_responses]
 *    topic => STRING
 *    partition_responses => partition_header record_set
 *      partition_header => partition error_code high_watermark
 *        partition => INT32
 *        error_code => INT16
 *        high_watermark => INT64
 *      record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 77 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Fetch: apiKey } = __webpack_require__(32)

/**
 * Fetch Request (Version: 3) => replica_id max_wait_time min_bytes max_bytes [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       max_bytes => INT32
 */

/**
 * @param {number} replicaId Broker id of the follower
 * @param {number} maxWaitTime Maximum time in ms to wait for the response
 * @param {number} minBytes Minimum bytes to accumulate in the response.
 * @param {number} maxBytes Maximum bytes to accumulate in the response. Note that this is not an absolute maximum,
 *                          if the first message in the first non-empty partition of the fetch is larger than this value,
 *                          the message will still be returned to ensure that progress can be made.
 * @param {Array} topics Topics to fetch
 *                        [
 *                          {
 *                            topic: 'topic-name',
 *                            partitions: [
 *                              {
 *                                partition: 0,
 *                                fetchOffset: '4124',
 *                                maxBytes: 2048
 *                              }
 *                            ]
 *                          }
 *                        ]
 */
module.exports = ({ replicaId, maxWaitTime, minBytes, maxBytes, topics }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt32(maxBytes)
}


/***/ }),
/* 78 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(74)

/**
 * Fetch Response (Version: 3) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 79 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Fetch: apiKey } = __webpack_require__(32)
const ISOLATION_LEVEL = __webpack_require__(66)

/**
 * Fetch Request (Version: 4) => replica_id max_wait_time min_bytes max_bytes isolation_level [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       max_bytes => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
}) => ({
  apiKey,
  apiVersion: 4,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt32(maxBytes)
}


/***/ }),
/* 80 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV1 } = __webpack_require__(74)
const decodeMessages = __webpack_require__(81)

/**
 * Fetch Response (Version: 4) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),
/* 81 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const MessageSetDecoder = __webpack_require__(69)
const RecordBatchDecoder = __webpack_require__(82)
const { MAGIC_BYTE } = __webpack_require__(53)

// the magic offset is at the same offset for all current message formats, but the 4 bytes
// between the size and the magic is dependent on the version.
const MAGIC_OFFSET = 16
const RECORD_BATCH_OVERHEAD = 49

const decodeMessages = async decoder => {
  const messagesSize = decoder.readInt32()

  if (messagesSize <= 0 || !decoder.canReadBytes(messagesSize)) {
    return []
  }

  const messagesBuffer = decoder.readBytes(messagesSize)
  const messagesDecoder = new Decoder(messagesBuffer)
  const magicByte = messagesBuffer.slice(MAGIC_OFFSET).readInt8(0)

  if (magicByte === MAGIC_BYTE) {
    const records = []

    while (messagesDecoder.canReadBytes(RECORD_BATCH_OVERHEAD)) {
      try {
        const recordBatch = await RecordBatchDecoder(messagesDecoder)
        records.push(...recordBatch.records)
      } catch (e) {
        // The tail of the record batches can have incomplete records
        // due to how maxBytes works. See https://cwiki.apache.org/confluence/display/KAFKA/A+Guide+To+The+Kafka+Protocol#AGuideToTheKafkaProtocol-FetchAPI
        if (e.name === 'KafkaJSPartialMessageError') {
          break
        }

        throw e
      }
    }

    return records
  }

  return MessageSetDecoder(messagesDecoder, messagesSize)
}

module.exports = decodeMessages


/***/ }),
/* 82 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { KafkaJSPartialMessageError } = __webpack_require__(19)
const { lookupCodecByAttributes } = __webpack_require__(28)
const RecordDecoder = __webpack_require__(83)
const TimestampTypes = __webpack_require__(85)

const TIMESTAMP_TYPE_FLAG_MASK = 0x8
const TRANSACTIONAL_FLAG_MASK = 0x10
const CONTROL_FLAG_MASK = 0x20

/**
 * v0
 * RecordBatch =>
 *  FirstOffset => int64
 *  Length => int32
 *  PartitionLeaderEpoch => int32
 *  Magic => int8
 *  CRC => int32
 *  Attributes => int16
 *  LastOffsetDelta => int32
 *  FirstTimestamp => int64
 *  MaxTimestamp => int64
 *  ProducerId => int64
 *  ProducerEpoch => int16
 *  FirstSequence => int32
 *  Records => [Record]
 */

module.exports = async fetchDecoder => {
  const firstOffset = fetchDecoder.readInt64().toString()
  const length = fetchDecoder.readInt32()
  const decoder = fetchDecoder.slice(length)
  fetchDecoder.forward(length)

  const remainingBytes = Buffer.byteLength(decoder.buffer)

  if (remainingBytes < length) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial record batch: remainingBytes(${remainingBytes}) < recordBatchLength(${length})`
    )
  }

  const partitionLeaderEpoch = decoder.readInt32()

  // The magic byte was read by the Fetch protocol to distinguish between
  // the record batch and the legacy message set. It's not used here but
  // it has to be read.
  const magicByte = decoder.readInt8() // eslint-disable-line no-unused-vars

  // The library is currently not performing CRC validations
  const crc = decoder.readInt32() // eslint-disable-line no-unused-vars

  const attributes = decoder.readInt16()
  const lastOffsetDelta = decoder.readInt32()
  const firstTimestamp = decoder.readInt64().toString()
  const maxTimestamp = decoder.readInt64().toString()
  const producerId = decoder.readInt64().toString()
  const producerEpoch = decoder.readInt16()
  const firstSequence = decoder.readInt32()

  const inTransaction = (attributes & TRANSACTIONAL_FLAG_MASK) > 0
  const isControlBatch = (attributes & CONTROL_FLAG_MASK) > 0
  const timestampType =
    (attributes & TIMESTAMP_TYPE_FLAG_MASK) > 0
      ? TimestampTypes.LOG_APPEND_TIME
      : TimestampTypes.CREATE_TIME

  const codec = lookupCodecByAttributes(attributes)

  const recordContext = {
    firstOffset,
    firstTimestamp,
    partitionLeaderEpoch,
    inTransaction,
    isControlBatch,
    lastOffsetDelta,
    producerId,
    producerEpoch,
    firstSequence,
    maxTimestamp,
    timestampType,
  }

  const records = await decodeRecords(codec, decoder, { ...recordContext, magicByte })

  return {
    ...recordContext,
    records,
  }
}

const decodeRecords = async (codec, recordsDecoder, recordContext) => {
  if (!codec) {
    return recordsDecoder.readArray(decoder => decodeRecord(decoder, recordContext))
  }

  const length = recordsDecoder.readInt32()

  if (length <= 0) {
    return []
  }

  const compressedRecordsBuffer = recordsDecoder.readAll()
  const decompressedRecordBuffer = await codec.decompress(compressedRecordsBuffer)
  const decompressedRecordDecoder = new Decoder(decompressedRecordBuffer)
  const records = new Array(length)

  for (let i = 0; i < length; i++) {
    records[i] = decodeRecord(decompressedRecordDecoder, recordContext)
  }

  return records
}

const decodeRecord = (decoder, recordContext) => {
  const recordBuffer = decoder.readVarIntBytes()
  return RecordDecoder(new Decoder(recordBuffer), recordContext)
}


/***/ }),
/* 83 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const HeaderDecoder = __webpack_require__(84)
const TimestampTypes = __webpack_require__(85)

/**
 * v0
 * Record =>
 *   Length => Varint
 *   Attributes => Int8
 *   TimestampDelta => Varlong
 *   OffsetDelta => Varint
 *   Key => varInt|Bytes
 *   Value => varInt|Bytes
 *   Headers => [HeaderKey HeaderValue]
 *     HeaderKey => VarInt|String
 *     HeaderValue => VarInt|Bytes
 */

module.exports = (decoder, batchContext = {}) => {
  const {
    firstOffset,
    firstTimestamp,
    magicByte,
    isControlBatch = false,
    timestampType,
    maxTimestamp,
  } = batchContext
  const attributes = decoder.readInt8()

  const timestampDelta = decoder.readVarLong()
  const timestamp =
    timestampType === TimestampTypes.LOG_APPEND_TIME && maxTimestamp
      ? maxTimestamp
      : Long.fromValue(firstTimestamp)
          .add(timestampDelta)
          .toString()

  const offsetDelta = decoder.readVarInt()
  const offset = Long.fromValue(firstOffset)
    .add(offsetDelta)
    .toString()

  const key = decoder.readVarIntBytes()
  const value = decoder.readVarIntBytes()
  const headers = decoder
    .readVarIntArray(HeaderDecoder)
    .reduce((obj, { key, value }) => ({ ...obj, [key]: value }), {})

  return {
    magicByte,
    attributes, // Record level attributes are presently unused
    timestamp,
    offset,
    key,
    value,
    headers,
    isControlRecord: isControlBatch,
    batchContext,
  }
}


/***/ }),
/* 84 */
/***/ ((module) => {

module.exports = decoder => ({
  key: decoder.readVarIntString(),
  value: decoder.readVarIntBytes(),
})


/***/ }),
/* 85 */
/***/ ((module) => {

/**
 * Enum for timestamp types
 * @readonly
 * @enum {TimestampType}
 */
module.exports = {
  // Timestamp type is unknown
  NO_TIMESTAMP: -1,

  // Timestamp relates to message creation time as set by a Kafka client
  CREATE_TIME: 0,

  // Timestamp relates to the time a message was appended to a Kafka log
  LOG_APPEND_TIME: 1,
}


/***/ }),
/* 86 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Fetch: apiKey } = __webpack_require__(32)
const ISOLATION_LEVEL = __webpack_require__(66)

/**
 * Fetch Request (Version: 5) => replica_id max_wait_time min_bytes max_bytes isolation_level [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
}) => ({
  apiKey,
  apiVersion: 5,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, logStartOffset = -1, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),
/* 87 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV1 } = __webpack_require__(74)
const decodeMessages = __webpack_require__(81)

/**
 * Fetch Response (Version: 5) => throttle_time_ms [responses]
 *  throttle_time_ms => INT32
 *  responses => topic [partition_responses]
 *    topic => STRING
 *    partition_responses => partition_header record_set
 *      partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *        partition => INT32
 *        error_code => INT16
 *        high_watermark => INT64
 *        last_stable_offset => INT64
 *        log_start_offset => INT64
 *        aborted_transactions => producer_id first_offset
 *          producer_id => INT64
 *          first_offset => INT64
 *      record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),
/* 88 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ISOLATION_LEVEL = __webpack_require__(66)
const requestV5 = __webpack_require__(86)

/**
 * Fetch Request (Version: 6) => replica_id max_wait_time min_bytes max_bytes isolation_level [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
}) =>
  Object.assign(
    requestV5({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
    }),
    { apiVersion: 6 }
  )


/***/ }),
/* 89 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(87)

/**
 * Fetch Response (Version: 6) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 90 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Fetch: apiKey } = __webpack_require__(32)
const ISOLATION_LEVEL = __webpack_require__(66)

/**
 * Sessions are only used by followers
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-227%3A+Introduce+Incremental+FetchRequests+to+Increase+Partition+Scalability
 */

/**
 * Fetch Request (Version: 7) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) => ({
  apiKey,
  apiVersion: 7,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeInt32(sessionId)
      .writeInt32(sessionEpoch)
      .writeArray(topics.map(encodeTopic))
      .writeArray(forgottenTopics.map(encodeForgottenTopics))
  },
})

const encodeForgottenTopics = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions)
}

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, logStartOffset = -1, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),
/* 91 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV1 } = __webpack_require__(74)
const decodeMessages = __webpack_require__(81)

/**
 * Fetch Response (Version: 7) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const sessionId = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    errorCode,
    sessionId,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),
/* 92 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ISOLATION_LEVEL = __webpack_require__(66)
const requestV7 = __webpack_require__(90)

/**
 * Quota violation brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 */

/**
 * Fetch Request (Version: 8) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) =>
  Object.assign(
    requestV7({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
      sessionId,
      sessionEpoch,
      forgottenTopics,
    }),
    { apiVersion: 8 }
  )


/***/ }),
/* 93 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV1 } = __webpack_require__(74)
const decodeMessages = __webpack_require__(81)

/**
 * Fetch Response (Version: 8) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const clientSideThrottleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const sessionId = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  // Report a `throttleTime` of 0: The broker will not have throttled
  // this request, but if the `clientSideThrottleTime` is >0 then it
  // expects us to do that -- and it will ignore requests.
  return {
    throttleTime: 0,
    clientSideThrottleTime,
    errorCode,
    sessionId,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),
/* 94 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Fetch: apiKey } = __webpack_require__(32)
const ISOLATION_LEVEL = __webpack_require__(66)

/**
 * Allow fetchers to detect and handle log truncation
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-320%3A+Allow+fetchers+to+detect+and+handle+log+truncation
 */

/**
 * Fetch Request (Version: 9) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition current_leader_epoch fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       current_leader_epoch => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) => ({
  apiKey,
  apiVersion: 9,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeInt32(sessionId)
      .writeInt32(sessionEpoch)
      .writeArray(topics.map(encodeTopic))
      .writeArray(forgottenTopics.map(encodeForgottenTopics))
  },
})

const encodeForgottenTopics = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions)
}

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({
  partition,
  currentLeaderEpoch = -1,
  fetchOffset,
  logStartOffset = -1,
  maxBytes,
}) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt32(currentLeaderEpoch)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),
/* 95 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(93)

/**
 * Fetch Response (Version: 9) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 96 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ISOLATION_LEVEL = __webpack_require__(66)
const requestV9 = __webpack_require__(94)

/**
 * ZStd Compression
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-110%3A+Add+Codec+for+ZStandard+Compression
 */

/**
 * Fetch Request (Version: 10) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition current_leader_epoch fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       current_leader_epoch => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) =>
  Object.assign(
    requestV9({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
      sessionId,
      sessionEpoch,
      forgottenTopics,
    }),
    { apiVersion: 10 }
  )


/***/ }),
/* 97 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(95)

/**
 * Fetch Response (Version: 10) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 98 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Fetch: apiKey } = __webpack_require__(32)
const ISOLATION_LEVEL = __webpack_require__(66)

/**
 * Allow consumers to fetch from closest replica
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-392%3A+Allow+consumers+to+fetch+from+closest+replica
 */

/**
 * Fetch Request (Version: 11) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition current_leader_epoch fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       current_leader_epoch => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 *   rack_id => STRING
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  rackId = '',
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) => ({
  apiKey,
  apiVersion: 11,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeInt32(sessionId)
      .writeInt32(sessionEpoch)
      .writeArray(topics.map(encodeTopic))
      .writeArray(forgottenTopics.map(encodeForgottenTopics))
      .writeString(rackId)
  },
})

const encodeForgottenTopics = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions)
}

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({
  partition,
  currentLeaderEpoch = -1,
  fetchOffset,
  logStartOffset = -1,
  maxBytes,
}) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt32(currentLeaderEpoch)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),
/* 99 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV1 } = __webpack_require__(74)
const decodeMessages = __webpack_require__(81)

/**
 * Fetch Response (Version: 11) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *         preferred_read_replica => INT32
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  preferredReadReplica: decoder.readInt32(),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const clientSideThrottleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const sessionId = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  // Report a `throttleTime` of 0: The broker will not have throttled
  // this request, but if the `clientSideThrottleTime` is >0 then it
  // expects us to do that -- and it will ignore requests.
  return {
    throttleTime: 0,
    clientSideThrottleTime,
    errorCode,
    sessionId,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),
/* 100 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ISOLATION_LEVEL = __webpack_require__(66)

// For normal consumers, use -1
const REPLICA_ID = -1

const versions = {
  0: ({ replicaId = REPLICA_ID, topics }) => {
    const request = __webpack_require__(101)
    const response = __webpack_require__(102)
    return { request: request({ replicaId, topics }), response }
  },
  1: ({ replicaId = REPLICA_ID, topics }) => {
    const request = __webpack_require__(103)
    const response = __webpack_require__(104)
    return { request: request({ replicaId, topics }), response }
  },
  2: ({ replicaId = REPLICA_ID, isolationLevel = ISOLATION_LEVEL.READ_COMMITTED, topics }) => {
    const request = __webpack_require__(105)
    const response = __webpack_require__(106)
    return { request: request({ replicaId, isolationLevel, topics }), response }
  },
  3: ({ replicaId = REPLICA_ID, isolationLevel = ISOLATION_LEVEL.READ_COMMITTED, topics }) => {
    const request = __webpack_require__(107)
    const response = __webpack_require__(108)
    return { request: request({ replicaId, isolationLevel, topics }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 101 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { ListOffsets: apiKey } = __webpack_require__(32)

/**
 * ListOffsets Request (Version: 0) => replica_id [topics]
 *   replica_id => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp max_num_offsets
 *       partition => INT32
 *       timestamp => INT64
 *       max_num_offsets => INT32
 */

/**
 * @param {number} replicaId
 * @param {object} topics use timestamp=-1 for latest offsets and timestamp=-2 for earliest.
 *                        Default timestamp=-1. Example:
 *                          {
 *                            topics: [
 *                              {
 *                                topic: 'topic-name',
 *                                partitions: [{ partition: 0, timestamp: -1 }]
 *                              }
 *                            ]
 *                          }
 */
module.exports = ({ replicaId, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'ListOffsets',
  encode: async () => {
    return new Encoder().writeInt32(replicaId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, timestamp = -1, maxNumOffsets = 1 }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(timestamp)
    .writeInt32(maxNumOffsets)
}


/***/ }),
/* 102 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * Offsets Response (Version: 0) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code [offsets]
 *       partition => INT32
 *       error_code => INT16
 *       offsets => INT64
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offsets: decoder.readArray(decodeOffsets),
})

const decodeOffsets = decoder => decoder.readInt64().toString()

const parse = async data => {
  const partitionsWithError = data.responses.map(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = flatten(partitionsWithError)[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 103 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { ListOffsets: apiKey } = __webpack_require__(32)

/**
 * ListOffsets Request (Version: 1) => replica_id [topics]
 *   replica_id => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp
 *       partition => INT32
 *       timestamp => INT64
 */
module.exports = ({ replicaId, topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'ListOffsets',
  encode: async () => {
    return new Encoder().writeInt32(replicaId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, timestamp = -1 }) => {
  return new Encoder().writeInt32(partition).writeInt64(timestamp)
}


/***/ }),
/* 104 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * ListOffsets Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code timestamp offset
 *       partition => INT32
 *       error_code => INT16
 *       timestamp => INT64
 *       offset => INT64
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)

  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  timestamp: decoder.readInt64().toString(),
  offset: decoder.readInt64().toString(),
})

const parse = async data => {
  const partitionsWithError = data.responses.map(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = flatten(partitionsWithError)[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 105 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { ListOffsets: apiKey } = __webpack_require__(32)

/**
 * ListOffsets Request (Version: 2) => replica_id isolation_level [topics]
 *   replica_id => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp
 *       partition => INT32
 *       timestamp => INT64
 */
module.exports = ({ replicaId, isolationLevel, topics }) => ({
  apiKey,
  apiVersion: 2,
  apiName: 'ListOffsets',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt8(isolationLevel)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, timestamp = -1 }) => {
  return new Encoder().writeInt32(partition).writeInt64(timestamp)
}


/***/ }),
/* 106 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * ListOffsets Response (Version: 2) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code timestamp offset
 *       partition => INT32
 *       error_code => INT16
 *       timestamp => INT64
 *       offset => INT64
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)

  return {
    throttleTime: decoder.readInt32(),
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  timestamp: decoder.readInt64().toString(),
  offset: decoder.readInt64().toString(),
})

const parse = async data => {
  const partitionsWithError = data.responses.map(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = flatten(partitionsWithError)[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 107 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV2 = __webpack_require__(105)

/**
 * ListOffsets Request (Version: 3) => replica_id isolation_level [topics]
 *   replica_id => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp
 *       partition => INT32
 *       timestamp => INT64
 */
module.exports = ({ replicaId, isolationLevel, topics }) =>
  Object.assign(requestV2({ replicaId, isolationLevel, topics }), { apiVersion: 3 })


/***/ }),
/* 108 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV2 } = __webpack_require__(106)

/**
 * In version 3 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * ListOffsets Response (Version: 3) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code timestamp offset
 *       partition => INT32
 *       error_code => INT16
 *       timestamp => INT64
 *       offset => INT64
 */
const decode = async rawData => {
  const decoded = await decodeV2(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 109 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ topics }) => {
    const request = __webpack_require__(110)
    const response = __webpack_require__(111)
    return { request: request({ topics }), response }
  },
  1: ({ topics }) => {
    const request = __webpack_require__(112)
    const response = __webpack_require__(113)
    return { request: request({ topics }), response }
  },
  2: ({ topics }) => {
    const request = __webpack_require__(114)
    const response = __webpack_require__(115)
    return { request: request({ topics }), response }
  },
  3: ({ topics }) => {
    const request = __webpack_require__(116)
    const response = __webpack_require__(117)
    return { request: request({ topics }), response }
  },
  4: ({ topics, allowAutoTopicCreation }) => {
    const request = __webpack_require__(118)
    const response = __webpack_require__(119)
    return { request: request({ topics, allowAutoTopicCreation }), response }
  },
  5: ({ topics, allowAutoTopicCreation }) => {
    const request = __webpack_require__(120)
    const response = __webpack_require__(121)
    return { request: request({ topics, allowAutoTopicCreation }), response }
  },
  6: ({ topics, allowAutoTopicCreation }) => {
    const request = __webpack_require__(122)
    const response = __webpack_require__(123)
    return { request: request({ topics, allowAutoTopicCreation }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 110 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Metadata: apiKey } = __webpack_require__(32)

/**
 * Metadata Request (Version: 0) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Metadata',
  encode: async () => {
    return new Encoder().writeArray(topics)
  },
})


/***/ }),
/* 111 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * Metadata Response (Version: 0) => [brokers] [topic_metadata]
 *   brokers => node_id host port
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *   topic_metadata => topic_error_code topic [partition_metadata]
 *     topic_error_code => INT16
 *     topic => STRING
 *     partition_metadata => partition_error_code partition_id leader [replicas] [isr]
 *       partition_error_code => INT16
 *       partition_id => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  // leader: The node id for the kafka broker currently acting as leader
  // for this partition
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    brokers: decoder.readArray(broker),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

const parse = async data => {
  const topicsWithErrors = data.topicMetadata.filter(topic => failure(topic.topicErrorCode))
  if (topicsWithErrors.length > 0) {
    const { topicErrorCode } = topicsWithErrors[0]
    throw createErrorFromCode(topicErrorCode)
  }

  const partitionsWithErrors = data.topicMetadata.map(topic => {
    return topic.partitionMetadata.filter(partition => failure(partition.partitionErrorCode))
  })

  const errors = flatten(partitionsWithErrors)
  if (errors.length > 0) {
    const { partitionErrorCode } = errors[0]
    throw createErrorFromCode(partitionErrorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 112 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Metadata: apiKey } = __webpack_require__(32)

/**
 * Metadata Request (Version: 1) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'Metadata',
  encode: async () => {
    return new Encoder().writeNullableArray(topics)
  },
})


/***/ }),
/* 113 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(111)

/**
 * Metadata Response (Version: 1) => [brokers] controller_id [topic_metadata]
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => topic_error_code topic is_internal [partition_metadata]
 *     topic_error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => partition_error_code partition_id leader [replicas] [isr]
 *       partition_error_code => INT16
 *       partition_id => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    brokers: decoder.readArray(broker),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 114 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(112)

/**
 * Metadata Request (Version: 2) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => Object.assign(requestV1({ topics }), { apiVersion: 2 })


/***/ }),
/* 115 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(111)

/**
 * Metadata Response (Version: 2) => [brokers] cluster_id controller_id [topic_metadata]
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => topic_error_code topic is_internal [partition_metadata]
 *     topic_error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => partition_error_code partition_id leader [replicas] [isr]
 *       partition_error_code => INT16
 *       partition_id => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    brokers: decoder.readArray(broker),
    clusterId: decoder.readString(),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 116 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(112)

/**
 * Metadata Request (Version: 3) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => Object.assign(requestV1({ topics }), { apiVersion: 3 })


/***/ }),
/* 117 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(111)

/**
 * Metadata Response (Version: 3) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    brokers: decoder.readArray(broker),
    clusterId: decoder.readString(),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 118 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Metadata: apiKey } = __webpack_require__(32)

/**
 * Metadata Request (Version: 4) => [topics] allow_auto_topic_creation
 *   topics => STRING
 *   allow_auto_topic_creation => BOOLEAN
 */

module.exports = ({ topics, allowAutoTopicCreation = true }) => ({
  apiKey,
  apiVersion: 4,
  apiName: 'Metadata',
  encode: async () => {
    return new Encoder().writeNullableArray(topics).writeBoolean(allowAutoTopicCreation)
  },
})


/***/ }),
/* 119 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse: parseV3, decode: decodeV3 } = __webpack_require__(117)

/**
 * Metadata Response (Version: 4) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

module.exports = {
  parse: parseV3,
  decode: decodeV3,
}


/***/ }),
/* 120 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV4 = __webpack_require__(118)

/**
 * Metadata Request (Version: 5) => [topics] allow_auto_topic_creation
 *   topics => STRING
 *   allow_auto_topic_creation => BOOLEAN
 */

module.exports = ({ topics, allowAutoTopicCreation = true }) =>
  Object.assign(requestV4({ topics, allowAutoTopicCreation }), { apiVersion: 5 })


/***/ }),
/* 121 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(111)

/**
 * Metadata Response (Version: 5) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr] [offline_replicas]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 *       offline_replicas => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
  offlineReplicas: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    brokers: decoder.readArray(broker),
    clusterId: decoder.readString(),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 122 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV5 = __webpack_require__(120)

/**
 * Metadata Request (Version: 6) => [topics] allow_auto_topic_creation
 *   topics => STRING
 *   allow_auto_topic_creation => BOOLEAN
 */

module.exports = ({ topics, allowAutoTopicCreation = true }) =>
  Object.assign(requestV5({ topics, allowAutoTopicCreation }), { apiVersion: 6 })


/***/ }),
/* 123 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(121)

/**
 * In version 6 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * Metadata Response (Version: 6) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr] [offline_replicas]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 *       offline_replicas => INT32
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 124 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// This value signals to the broker that its default configuration should be used.
const RETENTION_TIME = -1

const versions = {
  0: ({ groupId, topics }) => {
    const request = __webpack_require__(125)
    const response = __webpack_require__(126)
    return { request: request({ groupId, topics }), response }
  },
  1: ({ groupId, groupGenerationId, memberId, topics }) => {
    const request = __webpack_require__(127)
    const response = __webpack_require__(128)
    return { request: request({ groupId, groupGenerationId, memberId, topics }), response }
  },
  2: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
    const request = __webpack_require__(129)
    const response = __webpack_require__(130)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      }),
      response,
    }
  },
  3: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
    const request = __webpack_require__(131)
    const response = __webpack_require__(132)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      }),
      response,
    }
  },
  4: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
    const request = __webpack_require__(133)
    const response = __webpack_require__(134)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      }),
      response,
    }
  },
  5: ({ groupId, groupGenerationId, memberId, topics }) => {
    const request = __webpack_require__(135)
    const response = __webpack_require__(136)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        topics,
      }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 125 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { OffsetCommit: apiKey } = __webpack_require__(32)

/**
 * OffsetCommit Request (Version: 0) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder().writeString(groupId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),
/* 126 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * OffsetCommit Response (Version: 0) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const partitionsWithError = data.responses.map(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = flatten(partitionsWithError)[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 127 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { OffsetCommit: apiKey } = __webpack_require__(32)

/**
 * OffsetCommit Request (Version: 1) => group_id group_generation_id member_id [topics]
 *   group_id => STRING
 *   group_generation_id => INT32
 *   member_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset timestamp metadata
 *       partition => INT32
 *       offset => INT64
 *       timestamp => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, timestamp = Date.now(), metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeInt64(timestamp)
    .writeString(metadata)
}


/***/ }),
/* 128 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode } = __webpack_require__(126)

/**
 * OffsetCommit Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 129 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { OffsetCommit: apiKey } = __webpack_require__(32)

/**
 * OffsetCommit Request (Version: 2) => group_id group_generation_id member_id retention_time [topics]
 *   group_id => STRING
 *   group_generation_id => INT32
 *   member_id => STRING
 *   retention_time => INT64
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) => ({
  apiKey,
  apiVersion: 2,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeInt64(retentionTime)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),
/* 130 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode } = __webpack_require__(126)

/**
 * OffsetCommit Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 131 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV2 = __webpack_require__(129)

/**
 * OffsetCommit Request (Version: 3) => group_id generation_id member_id retention_time [topics]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   retention_time => INT64
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) =>
  Object.assign(requestV2({ groupId, groupGenerationId, memberId, retentionTime, topics }), {
    apiVersion: 3,
  })


/***/ }),
/* 132 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(126)

/**
 * OffsetCommit Response (Version: 3) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 133 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV3 = __webpack_require__(131)

/**
 * OffsetCommit Request (Version: 4) => group_id generation_id member_id retention_time [topics]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   retention_time => INT64
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) =>
  Object.assign(requestV3({ groupId, groupGenerationId, memberId, retentionTime, topics }), {
    apiVersion: 4,
  })


/***/ }),
/* 134 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV3 } = __webpack_require__(132)

/**
 * Starting in version 4, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * OffsetCommit Response (Version: 4) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV3(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 135 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { OffsetCommit: apiKey } = __webpack_require__(32)

/**
 * Version 5 removes retention_time, as this is controlled by a broker setting
 *
 * OffsetCommit Request (Version: 4) => group_id generation_id member_id [topics]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, topics }) => ({
  apiKey,
  apiVersion: 5,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),
/* 136 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode } = __webpack_require__(134)

/**
 * OffsetCommit Response (Version: 5) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
module.exports = {
  decode,
  parse,
}


/***/ }),
/* 137 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  1: ({ groupId, topics }) => {
    const request = __webpack_require__(138)
    const response = __webpack_require__(139)
    return { request: request({ groupId, topics }), response }
  },
  2: ({ groupId, topics }) => {
    const request = __webpack_require__(140)
    const response = __webpack_require__(141)
    return { request: request({ groupId, topics }), response }
  },
  3: ({ groupId, topics }) => {
    const request = __webpack_require__(142)
    const response = __webpack_require__(143)
    return { request: request({ groupId, topics }), response }
  },
  4: ({ groupId, topics }) => {
    const request = __webpack_require__(144)
    const response = __webpack_require__(145)
    return { request: request({ groupId, topics }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 138 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { OffsetFetch: apiKey } = __webpack_require__(32)

/**
 * OffsetFetch Request (Version: 1) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'OffsetFetch',
  encode: async () => {
    return new Encoder().writeString(groupId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition }) => {
  return new Encoder().writeInt32(partition)
}


/***/ }),
/* 139 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * OffsetFetch Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  offset: decoder.readInt64().toString(),
  metadata: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const partitionsWithError = data.responses.map(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = flatten(partitionsWithError)[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 140 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(138)

/**
 * OffsetFetch Request (Version: 2) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) =>
  Object.assign(requestV1({ groupId, topics }), { apiVersion: 2 })


/***/ }),
/* 141 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const flatten = __webpack_require__(45)

/**
 * OffsetFetch Response (Version: 2) => [responses] error_code
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
    errorCode: decoder.readInt16(),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  offset: decoder.readInt64().toString(),
  metadata: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  const partitionsWithError = data.responses.map(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = flatten(partitionsWithError)[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 142 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { OffsetFetch: apiKey } = __webpack_require__(32)

/**
 * OffsetFetch Request (Version: 3) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'OffsetFetch',
  encode: async () => {
    return new Encoder().writeString(groupId).writeNullableArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition }) => {
  return new Encoder().writeInt32(partition)
}


/***/ }),
/* 143 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV2 } = __webpack_require__(141)

/**
 * OffsetFetch Response (Version: 3) => throttle_time_ms [responses] error_code
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    responses: decoder.readArray(decodeResponses),
    errorCode: decoder.readInt16(),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  offset: decoder.readInt64().toString(),
  metadata: decoder.readString(),
  errorCode: decoder.readInt16(),
})

module.exports = {
  decode,
  parse: parseV2,
}


/***/ }),
/* 144 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV3 = __webpack_require__(142)

/**
 * OffsetFetch Request (Version: 4) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) =>
  Object.assign(requestV3({ groupId, topics }), { apiVersion: 4 })


/***/ }),
/* 145 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV3 } = __webpack_require__(143)

/**
 * Starting in version 4, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * OffsetFetch Response (Version: 4) => throttle_time_ms [responses] error_code
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV3(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 146 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const COORDINATOR_TYPES = __webpack_require__(147)

const versions = {
  0: ({ groupId }) => {
    const request = __webpack_require__(148)
    const response = __webpack_require__(149)
    return { request: request({ groupId }), response }
  },
  1: ({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) => {
    const request = __webpack_require__(150)
    const response = __webpack_require__(151)
    return { request: request({ coordinatorKey: groupId, coordinatorType }), response }
  },
  2: ({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) => {
    const request = __webpack_require__(152)
    const response = __webpack_require__(153)
    return { request: request({ coordinatorKey: groupId, coordinatorType }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 147 */
/***/ ((module) => {

// From: https://kafka.apache.org/protocol.html#The_Messages_FindCoordinator

/**
 * @typedef {number} CoordinatorType
 *
 * Enum for the types of coordinator to find.
 * @enum {CoordinatorType}
 */
module.exports = {
  GROUP: 0,
  TRANSACTION: 1,
}


/***/ }),
/* 148 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { GroupCoordinator: apiKey } = __webpack_require__(32)

/**
 * FindCoordinator Request (Version: 0) => group_id
 *   group_id => STRING
 */

module.exports = ({ groupId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'GroupCoordinator',
  encode: async () => {
    return new Encoder().writeString(groupId)
  },
})


/***/ }),
/* 149 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * FindCoordinator Response (Version: 0) => error_code coordinator
 *  error_code => INT16
 *  coordinator => node_id host port
 *    node_id => INT32
 *    host => STRING
 *    port => INT32
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  const coordinator = {
    nodeId: decoder.readInt32(),
    host: decoder.readString(),
    port: decoder.readInt32(),
  }

  return {
    errorCode,
    coordinator,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 150 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { GroupCoordinator: apiKey } = __webpack_require__(32)

/**
 * FindCoordinator Request (Version: 1) => coordinator_key coordinator_type
 *   coordinator_key => STRING
 *   coordinator_type => INT8
 */

module.exports = ({ coordinatorKey, coordinatorType }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'GroupCoordinator',
  encode: async () => {
    return new Encoder().writeString(coordinatorKey).writeInt8(coordinatorType)
  },
})


/***/ }),
/* 151 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * FindCoordinator Response (Version: 1) => throttle_time_ms error_code error_message coordinator
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   coordinator => node_id host port
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  const errorMessage = decoder.readString()
  const coordinator = {
    nodeId: decoder.readInt32(),
    host: decoder.readString(),
    port: decoder.readInt32(),
  }

  return {
    throttleTime,
    errorCode,
    errorMessage,
    coordinator,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 152 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(150)

/**
 * FindCoordinator Request (Version: 2) => coordinator_key coordinator_type
 *   coordinator_key => STRING
 *   coordinator_type => INT8
 */

module.exports = ({ coordinatorKey, coordinatorType }) =>
  Object.assign(requestV1({ coordinatorKey, coordinatorType }), { apiVersion: 2 })


/***/ }),
/* 153 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(151)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * FindCoordinator Response (Version: 1) => throttle_time_ms error_code error_message coordinator
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   coordinator => node_id host port
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 154 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const NETWORK_DELAY = 5000

/**
 * @see https://github.com/apache/kafka/pull/5203
 * The JOIN_GROUP request may block up to sessionTimeout (or rebalanceTimeout in JoinGroupV1),
 * so we should override the requestTimeout to be a bit more than the sessionTimeout
 * NOTE: the sessionTimeout can be configured as Number.MAX_SAFE_INTEGER and overflow when
 * increased, so we have to check for potential overflows
 **/
const requestTimeout = ({ rebalanceTimeout, sessionTimeout }) => {
  const timeout = rebalanceTimeout || sessionTimeout
  return Number.isSafeInteger(timeout + NETWORK_DELAY) ? timeout + NETWORK_DELAY : timeout
}

const logResponseError = memberId => memberId != null && memberId !== ''

const versions = {
  0: ({ groupId, sessionTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __webpack_require__(155)
    const response = __webpack_require__(156)

    return {
      request: request({
        groupId,
        sessionTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout: null, sessionTimeout }),
    }
  },
  1: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __webpack_require__(157)
    const response = __webpack_require__(158)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
    }
  },
  2: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __webpack_require__(159)
    const response = __webpack_require__(160)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
    }
  },
  3: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __webpack_require__(161)
    const response = __webpack_require__(162)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
    }
  },
  4: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __webpack_require__(163)
    const response = __webpack_require__(164)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
      logResponseError: logResponseError(memberId),
    }
  },
  5: ({
    groupId,
    sessionTimeout,
    rebalanceTimeout,
    memberId,
    groupInstanceId,
    protocolType,
    groupProtocols,
  }) => {
    const request = __webpack_require__(165)
    const response = __webpack_require__(166)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        groupInstanceId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
      logResponseError: logResponseError(memberId),
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 155 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { JoinGroup: apiKey } = __webpack_require__(32)

/**
 * JoinGroup Request (Version: 0) => group_id session_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({ groupId, sessionTimeout, memberId, protocolType, groupProtocols }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'JoinGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(sessionTimeout)
      .writeString(memberId)
      .writeString(protocolType)
      .writeArray(groupProtocols.map(encodeGroupProtocols))
  },
})

const encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
  return new Encoder().writeString(name).writeBytes(metadata)
}


/***/ }),
/* 156 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * JoinGroup Response (Version: 0) => error_code generation_id group_protocol leader_id member_id [members]
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    generationId: decoder.readInt32(),
    groupProtocol: decoder.readString(),
    leaderId: decoder.readString(),
    memberId: decoder.readString(),
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
    })),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 157 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { JoinGroup: apiKey } = __webpack_require__(32)

/**
 * JoinGroup Request (Version: 1) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'JoinGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(sessionTimeout)
      .writeInt32(rebalanceTimeout)
      .writeString(memberId)
      .writeString(protocolType)
      .writeArray(groupProtocols.map(encodeGroupProtocols))
  },
})

const encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
  return new Encoder().writeString(name).writeBytes(metadata)
}


/***/ }),
/* 158 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode } = __webpack_require__(156)

/**
 * JoinGroup Response (Version: 1) => error_code generation_id group_protocol leader_id member_id [members]
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 159 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(157)

/**
 * JoinGroup Request (Version: 2) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) =>
  Object.assign(
    requestV1({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols,
    }),
    { apiVersion: 2 }
  )


/***/ }),
/* 160 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failIfVersionNotSupported } = __webpack_require__(43)
const { parse: parseV0 } = __webpack_require__(156)

/**
 * JoinGroup Response (Version: 2) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
    generationId: decoder.readInt32(),
    groupProtocol: decoder.readString(),
    leaderId: decoder.readString(),
    memberId: decoder.readString(),
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
    })),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 161 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV2 = __webpack_require__(159)

/**
 * JoinGroup Request (Version: 3) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) =>
  Object.assign(
    requestV2({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols,
    }),
    { apiVersion: 3 }
  )


/***/ }),
/* 162 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV2 } = __webpack_require__(160)

/**
 * Starting in version 3, on quota violation, brokers send out responses
 * before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * JoinGroup Response (Version: 3) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */
const decode = async rawData => {
  const decoded = await decodeV2(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 163 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV3 = __webpack_require__(161)

/**
 * Starting in version 4, the client needs to issue a second request to join group
 * with assigned id.
 *
 * JoinGroup Request (Version: 4) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) =>
  Object.assign(
    requestV3({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols,
    }),
    { apiVersion: 4 }
  )


/***/ }),
/* 164 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode } = __webpack_require__(162)
const { KafkaJSMemberIdRequired } = __webpack_require__(19)
const { failure, createErrorFromCode, errorCodes } = __webpack_require__(43)

/**
 * JoinGroup Response (Version: 4) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

const { code: MEMBER_ID_REQUIRED_ERROR_CODE } = errorCodes.find(
  e => e.type === 'MEMBER_ID_REQUIRED'
)

const parse = async data => {
  if (failure(data.errorCode)) {
    if (data.errorCode === MEMBER_ID_REQUIRED_ERROR_CODE) {
      throw new KafkaJSMemberIdRequired(createErrorFromCode(data.errorCode), {
        memberId: data.memberId,
      })
    }

    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 165 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { JoinGroup: apiKey } = __webpack_require__(32)

/**
 * Version 5 adds group_instance_id to identify members across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * JoinGroup Request (Version: 5) => group_id session_timeout rebalance_timeout member_id group_instance_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   group_instance_id => NULLABLE_STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  groupInstanceId = null,
  protocolType,
  groupProtocols,
}) => ({
  apiKey,
  apiVersion: 5,
  apiName: 'JoinGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(sessionTimeout)
      .writeInt32(rebalanceTimeout)
      .writeString(memberId)
      .writeString(groupInstanceId)
      .writeString(protocolType)
      .writeArray(groupProtocols.map(encodeGroupProtocols))
  },
})

const encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
  return new Encoder().writeString(name).writeBytes(metadata)
}


/***/ }),
/* 166 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { KafkaJSMemberIdRequired } = __webpack_require__(19)
const {
  failure,
  createErrorFromCode,
  errorCodes,
  failIfVersionNotSupported,
} = __webpack_require__(43)

/**
 * JoinGroup Response (Version: 5) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id group_instance_id metadata
 *     member_id => STRING
 *     group_instance_id => NULLABLE_STRING
 *     member_metadata => BYTES
 */
const { code: MEMBER_ID_REQUIRED_ERROR_CODE } = errorCodes.find(
  e => e.type === 'MEMBER_ID_REQUIRED'
)

const parse = async data => {
  if (failure(data.errorCode)) {
    if (data.errorCode === MEMBER_ID_REQUIRED_ERROR_CODE) {
      throw new KafkaJSMemberIdRequired(createErrorFromCode(data.errorCode), {
        memberId: data.memberId,
      })
    }

    throw createErrorFromCode(data.errorCode)
  }

  return data
}

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    errorCode,
    generationId: decoder.readInt32(),
    groupProtocol: decoder.readString(),
    leaderId: decoder.readString(),
    memberId: decoder.readString(),
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      groupInstanceId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
    })),
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 167 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ groupId, groupGenerationId, memberId }) => {
    const request = __webpack_require__(168)
    const response = __webpack_require__(169)
    return {
      request: request({ groupId, groupGenerationId, memberId }),
      response,
    }
  },
  1: ({ groupId, groupGenerationId, memberId }) => {
    const request = __webpack_require__(170)
    const response = __webpack_require__(171)
    return {
      request: request({ groupId, groupGenerationId, memberId }),
      response,
    }
  },
  2: ({ groupId, groupGenerationId, memberId }) => {
    const request = __webpack_require__(172)
    const response = __webpack_require__(173)
    return {
      request: request({ groupId, groupGenerationId, memberId }),
      response,
    }
  },
  3: ({ groupId, groupGenerationId, memberId, groupInstanceId }) => {
    const request = __webpack_require__(174)
    const response = __webpack_require__(175)
    return {
      request: request({ groupId, groupGenerationId, memberId, groupInstanceId }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 168 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Heartbeat: apiKey } = __webpack_require__(32)

/**
 * Heartbeat Request (Version: 0) => group_id group_generation_id member_id
 *   group_id => STRING
 *   group_generation_id => INT32
 *   member_id => STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Heartbeat',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
  },
})


/***/ }),
/* 169 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * Heartbeat Response (Version: 0) => error_code
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { errorCode }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 170 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(168)

/**
 * Heartbeat Request (Version: 1) => group_id generation_id member_id
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId }) =>
  Object.assign(requestV0({ groupId, groupGenerationId, memberId }), { apiVersion: 1 })


/***/ }),
/* 171 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failIfVersionNotSupported } = __webpack_require__(43)
const { parse: parseV0 } = __webpack_require__(169)

/**
 * Heartbeat Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { throttleTime, errorCode }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 172 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(170)

/**
 * Heartbeat Request (Version: 2) => group_id generation_id member_id
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId }) =>
  Object.assign(requestV1({ groupId, groupGenerationId, memberId }), { apiVersion: 2 })


/***/ }),
/* 173 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(171)

/**
 * In version 2 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * Heartbeat Response (Version: 2) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 174 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { Heartbeat: apiKey } = __webpack_require__(32)

/**
 * Version 3 adds group_instance_id to indicate member identity across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * Heartbeat Request (Version: 3) => group_id generation_id member_id group_instance_id
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_instance_id => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, groupInstanceId }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'Heartbeat',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeString(groupInstanceId)
  },
})


/***/ }),
/* 175 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode } = __webpack_require__(173)

/**
 * Heartbeat Response (Version: 3) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
module.exports = {
  decode,
  parse,
}


/***/ }),
/* 176 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ groupId, memberId }) => {
    const request = __webpack_require__(177)
    const response = __webpack_require__(178)
    return {
      request: request({ groupId, memberId }),
      response,
    }
  },
  1: ({ groupId, memberId }) => {
    const request = __webpack_require__(179)
    const response = __webpack_require__(180)
    return {
      request: request({ groupId, memberId }),
      response,
    }
  },
  2: ({ groupId, memberId }) => {
    const request = __webpack_require__(181)
    const response = __webpack_require__(182)
    return {
      request: request({ groupId, memberId }),
      response,
    }
  },
  3: ({ groupId, memberId, groupInstanceId }) => {
    const request = __webpack_require__(183)
    const response = __webpack_require__(184)
    return {
      request: request({ groupId, members: [{ memberId, groupInstanceId }] }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 177 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { LeaveGroup: apiKey } = __webpack_require__(32)

/**
 * LeaveGroup Request (Version: 0) => group_id member_id
 *   group_id => STRING
 *   member_id => STRING
 */

module.exports = ({ groupId, memberId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'LeaveGroup',
  encode: async () => {
    return new Encoder().writeString(groupId).writeString(memberId)
  },
})


/***/ }),
/* 178 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * LeaveGroup Response (Version: 0) => error_code
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { errorCode }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 179 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(177)

/**
 * LeaveGroup Request (Version: 1) => group_id member_id
 *   group_id => STRING
 *   member_id => STRING
 */

module.exports = ({ groupId, memberId }) =>
  Object.assign(requestV0({ groupId, memberId }), { apiVersion: 1 })


/***/ }),
/* 180 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failIfVersionNotSupported } = __webpack_require__(43)
const { parse: parseV0 } = __webpack_require__(178)

/**
 * LeaveGroup Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { throttleTime, errorCode }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 181 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(179)

/**
 * LeaveGroup Request (Version: 2) => group_id member_id
 *   group_id => STRING
 *   member_id => STRING
 */

module.exports = ({ groupId, memberId }) =>
  Object.assign(requestV1({ groupId, memberId }), { apiVersion: 2 })


/***/ }),
/* 182 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(180)

/**
 * In version 2 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * LeaveGroup Response (Version: 2) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 183 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { LeaveGroup: apiKey } = __webpack_require__(32)

/**
 * Version 3 changes leavegroup to operate on a batch of members
 * and adds group_instance_id to identify members across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * LeaveGroup Request (Version: 3) => group_id [members]
 *   group_id => STRING
 *   members => member_id group_instance_id
 *     member_id => STRING
 *     group_instance_id => NULLABLE_STRING
 */

module.exports = ({ groupId, members }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'LeaveGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeArray(members.map(member => encodeMember(member)))
  },
})

const encodeMember = ({ memberId, groupInstanceId = null }) => {
  return new Encoder().writeString(memberId).writeString(groupInstanceId)
}


/***/ }),
/* 184 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failIfVersionNotSupported, failure, createErrorFromCode } = __webpack_require__(43)
const { parse: parseV2 } = __webpack_require__(182)

/**
 * LeaveGroup Response (Version: 3) => throttle_time_ms error_code [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   members => member_id group_instance_id error_code
 *     member_id => STRING
 *     group_instance_id => NULLABLE_STRING
 *     error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const members = decoder.readArray(decodeMembers)

  failIfVersionNotSupported(errorCode)

  return { throttleTime: 0, clientSideThrottleTime: throttleTime, errorCode, members }
}

const decodeMembers = decoder => ({
  memberId: decoder.readString(),
  groupInstanceId: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const parsed = parseV2(data)

  const memberWithError = data.members.find(member => failure(member.errorCode))
  if (memberWithError) {
    throw createErrorFromCode(memberWithError.errorCode)
  }

  return parsed
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 185 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = __webpack_require__(186)
    const response = __webpack_require__(187)
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  1: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = __webpack_require__(188)
    const response = __webpack_require__(189)
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  2: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = __webpack_require__(190)
    const response = __webpack_require__(191)
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  3: ({ groupId, generationId, memberId, groupInstanceId, groupAssignment }) => {
    const request = __webpack_require__(192)
    const response = __webpack_require__(193)
    return {
      request: request({ groupId, generationId, memberId, groupInstanceId, groupAssignment }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 186 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { SyncGroup: apiKey } = __webpack_require__(32)

/**
 * SyncGroup Request (Version: 0) => group_id generation_id member_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({ groupId, generationId, memberId, groupAssignment }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'SyncGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(generationId)
      .writeString(memberId)
      .writeArray(groupAssignment.map(encodeGroupAssignment))
  },
})

const encodeGroupAssignment = ({ memberId, memberAssignment }) => {
  return new Encoder().writeString(memberId).writeBytes(memberAssignment)
}


/***/ }),
/* 187 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * SyncGroup Response (Version: 0) => error_code member_assignment
 *   error_code => INT16
 *   member_assignment => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    memberAssignment: decoder.readBytes(),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 188 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(186)

/**
 * SyncGroup Request (Version: 1) => group_id generation_id member_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({ groupId, generationId, memberId, groupAssignment }) =>
  Object.assign(requestV0({ groupId, generationId, memberId, groupAssignment }), { apiVersion: 1 })


/***/ }),
/* 189 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failIfVersionNotSupported } = __webpack_require__(43)
const { parse: parseV0 } = __webpack_require__(187)

/**
 * SyncGroup Response (Version: 1) => throttle_time_ms error_code member_assignment
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   member_assignment => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
    memberAssignment: decoder.readBytes(),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 190 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(188)

/**
 * SyncGroup Request (Version: 2) => group_id generation_id member_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({ groupId, generationId, memberId, groupAssignment }) =>
  Object.assign(requestV1({ groupId, generationId, memberId, groupAssignment }), { apiVersion: 2 })


/***/ }),
/* 191 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(189)

/**
 * In version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * SyncGroup Response (Version: 2) => throttle_time_ms error_code member_assignment
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   member_assignment => BYTES
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 192 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { SyncGroup: apiKey } = __webpack_require__(32)

/**
 * Version 3 adds group_instance_id to indicate member identity across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * SyncGroup Request (Version: 3) => group_id generation_id member_id group_instance_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_instance_id => NULLABLE_STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({
  groupId,
  generationId,
  memberId,
  groupInstanceId = null,
  groupAssignment,
}) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'SyncGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(generationId)
      .writeString(memberId)
      .writeString(groupInstanceId)
      .writeArray(groupAssignment.map(encodeGroupAssignment))
  },
})

const encodeGroupAssignment = ({ memberId, memberAssignment }) => {
  return new Encoder().writeString(memberId).writeBytes(memberAssignment)
}


/***/ }),
/* 193 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode, parse } = __webpack_require__(191)

/**
 * SyncGroup Response (Version: 2) => throttle_time_ms error_code member_assignment
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   member_assignment => BYTES
 */
module.exports = {
  decode,
  parse,
}


/***/ }),
/* 194 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ groupIds }) => {
    const request = __webpack_require__(195)
    const response = __webpack_require__(196)
    return { request: request({ groupIds }), response }
  },
  1: ({ groupIds }) => {
    const request = __webpack_require__(197)
    const response = __webpack_require__(198)
    return { request: request({ groupIds }), response }
  },
  2: ({ groupIds }) => {
    const request = __webpack_require__(199)
    const response = __webpack_require__(200)
    return { request: request({ groupIds }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 195 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DescribeGroups: apiKey } = __webpack_require__(32)

/**
 * DescribeGroups Request (Version: 0) => [group_ids]
 *   group_ids => STRING
 */

/**
 * @param {Array} groupIds List of groupIds to request metadata for (an empty groupId array will return empty group metadata)
 */
module.exports = ({ groupIds }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DescribeGroups',
  encode: async () => {
    return new Encoder().writeArray(groupIds)
  },
})


/***/ }),
/* 196 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * DescribeGroups Response (Version: 0) => [groups]
 *   groups => error_code group_id state protocol_type protocol [members]
 *     error_code => INT16
 *     group_id => STRING
 *     state => STRING
 *     protocol_type => STRING
 *     protocol => STRING
 *     members => member_id client_id client_host member_metadata member_assignment
 *       member_id => STRING
 *       client_id => STRING
 *       client_host => STRING
 *       member_metadata => BYTES
 *       member_assignment => BYTES
 */

const decoderMember = decoder => ({
  memberId: decoder.readString(),
  clientId: decoder.readString(),
  clientHost: decoder.readString(),
  memberMetadata: decoder.readBytes(),
  memberAssignment: decoder.readBytes(),
})

const decodeGroup = decoder => ({
  errorCode: decoder.readInt16(),
  groupId: decoder.readString(),
  state: decoder.readString(),
  protocolType: decoder.readString(),
  protocol: decoder.readString(),
  members: decoder.readArray(decoderMember),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const groups = decoder.readArray(decodeGroup)

  return {
    groups,
  }
}

const parse = async data => {
  const groupsWithError = data.groups.filter(({ errorCode }) => failure(errorCode))
  if (groupsWithError.length > 0) {
    throw createErrorFromCode(groupsWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 197 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(195)

/**
 * DescribeGroups Request (Version: 1) => [group_ids]
 *   group_ids => STRING
 */

module.exports = ({ groupIds }) => Object.assign(requestV0({ groupIds }), { apiVersion: 1 })


/***/ }),
/* 198 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(196)

/**
 * DescribeGroups Response (Version: 1) => throttle_time_ms [groups]
 *   throttle_time_ms => INT32
 *   groups => error_code group_id state protocol_type protocol [members]
 *     error_code => INT16
 *     group_id => STRING
 *     state => STRING
 *     protocol_type => STRING
 *     protocol => STRING
 *     members => member_id client_id client_host member_metadata member_assignment
 *       member_id => STRING
 *       client_id => STRING
 *       client_host => STRING
 *       member_metadata => BYTES
 *       member_assignment => BYTES
 */

const decoderMember = decoder => ({
  memberId: decoder.readString(),
  clientId: decoder.readString(),
  clientHost: decoder.readString(),
  memberMetadata: decoder.readBytes(),
  memberAssignment: decoder.readBytes(),
})

const decodeGroup = decoder => ({
  errorCode: decoder.readInt16(),
  groupId: decoder.readString(),
  state: decoder.readString(),
  protocolType: decoder.readString(),
  protocol: decoder.readString(),
  members: decoder.readArray(decoderMember),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const groups = decoder.readArray(decodeGroup)

  return {
    throttleTime,
    groups,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 199 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(197)

/**
 * DescribeGroups Request (Version: 2) => [group_ids]
 *   group_ids => STRING
 */

module.exports = ({ groupIds }) => Object.assign(requestV1({ groupIds }), { apiVersion: 2 })


/***/ }),
/* 200 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(198)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DescribeGroups Response (Version: 2) => throttle_time_ms [groups]
 *   throttle_time_ms => INT32
 *   groups => error_code group_id state protocol_type protocol [members]
 *     error_code => INT16
 *     group_id => STRING
 *     state => STRING
 *     protocol_type => STRING
 *     protocol => STRING
 *     members => member_id client_id client_host member_metadata member_assignment
 *       member_id => STRING
 *       client_id => STRING
 *       client_host => STRING
 *       member_metadata => BYTES
 *       member_assignment => BYTES
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 201 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: () => {
    const request = __webpack_require__(202)
    const response = __webpack_require__(203)
    return { request: request(), response }
  },
  1: () => {
    const request = __webpack_require__(204)
    const response = __webpack_require__(205)
    return { request: request(), response }
  },
  2: () => {
    const request = __webpack_require__(206)
    const response = __webpack_require__(207)
    return { request: request(), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 202 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { ListGroups: apiKey } = __webpack_require__(32)

/**
 * ListGroups Request (Version: 0)
 */

/**
 */
module.exports = () => ({
  apiKey,
  apiVersion: 0,
  apiName: 'ListGroups',
  encode: async () => {
    return new Encoder()
  },
})


/***/ }),
/* 203 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * ListGroups Response (Version: 0) => error_code [groups]
 *   error_code => INT16
 *   groups => group_id protocol_type
 *     group_id => STRING
 *     protocol_type => STRING
 */

const decodeGroup = decoder => ({
  groupId: decoder.readString(),
  protocolType: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()
  const groups = decoder.readArray(decodeGroup)

  return {
    errorCode,
    groups,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decodeGroup,
  decode,
  parse,
}


/***/ }),
/* 204 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(202)

/**
 * ListGroups Request (Version: 1)
 */

module.exports = () => Object.assign(requestV0(), { apiVersion: 1 })


/***/ }),
/* 205 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const responseV0 = __webpack_require__(203)

const Decoder = __webpack_require__(42)

/**
 * ListGroups Response (Version: 1) => error_code [groups]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   groups => group_id protocol_type
 *     group_id => STRING
 *     protocol_type => STRING
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const groups = decoder.readArray(responseV0.decodeGroup)

  return {
    throttleTime,
    errorCode,
    groups,
  }
}

module.exports = {
  decode,
  parse: responseV0.parse,
}


/***/ }),
/* 206 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(204)

/**
 * ListGroups Request (Version: 2)
 */

module.exports = () => Object.assign(requestV1(), { apiVersion: 2 })


/***/ }),
/* 207 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(205)

/**
 * In version 2 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * ListGroups Response (Version: 2) => error_code [groups]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   groups => group_id protocol_type
 *     group_id => STRING
 *     protocol_type => STRING
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 208 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ mechanism }) => {
    const request = __webpack_require__(209)
    const response = __webpack_require__(210)
    return { request: request({ mechanism }), response }
  },
  1: ({ mechanism }) => {
    const request = __webpack_require__(211)
    const response = __webpack_require__(212)
    return { request: request({ mechanism }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 209 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { SaslHandshake: apiKey } = __webpack_require__(32)

/**
 * SaslHandshake Request (Version: 0) => mechanism
 *    mechanism => STRING
 */

/**
 * @param {string} mechanism - SASL Mechanism chosen by the client
 */
module.exports = ({ mechanism }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'SaslHandshake',
  encode: async () => new Encoder().writeString(mechanism),
})


/***/ }),
/* 210 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * SaslHandshake Response (Version: 0) => error_code [enabled_mechanisms]
 *    error_code => INT16
 *    enabled_mechanisms => STRING
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    enabledMechanisms: decoder.readArray(decoder => decoder.readString()),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 211 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(209)

module.exports = ({ mechanism }) => ({ ...requestV0({ mechanism }), apiVersion: 1 })


/***/ }),
/* 212 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { decode: decodeV0, parse: parseV0 } = __webpack_require__(210)

module.exports = {
  decode: decodeV0,
  parse: parseV0,
}


/***/ }),
/* 213 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const logResponseError = false

const versions = {
  0: () => {
    const request = __webpack_require__(214)
    const response = __webpack_require__(215)
    return { request: request(), response, logResponseError: true }
  },
  1: () => {
    const request = __webpack_require__(216)
    const response = __webpack_require__(217)
    return { request: request(), response, logResponseError }
  },
  2: () => {
    const request = __webpack_require__(218)
    const response = __webpack_require__(219)
    return { request: request(), response, logResponseError }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 214 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { ApiVersions: apiKey } = __webpack_require__(32)

/**
 * ApiVersionRequest => ApiKeys
 */

module.exports = () => ({
  apiKey,
  apiVersion: 0,
  apiName: 'ApiVersions',
  encode: async () => new Encoder(),
})


/***/ }),
/* 215 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * ApiVersionResponse => ApiVersions
 *   ErrorCode = INT16
 *   ApiVersions = [ApiVersion]
 *     ApiVersion = ApiKey MinVersion MaxVersion
 *       ApiKey = INT16
 *       MinVersion = INT16
 *       MaxVersion = INT16
 */

const apiVersion = decoder => ({
  apiKey: decoder.readInt16(),
  minVersion: decoder.readInt16(),
  maxVersion: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    apiVersions: decoder.readArray(apiVersion),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 216 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(214)

// ApiVersions Request after v1 indicates the client can parse throttle_time_ms

module.exports = () => ({ ...requestV0(), apiVersion: 1 })


/***/ }),
/* 217 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failIfVersionNotSupported } = __webpack_require__(43)
const { parse: parseV0 } = __webpack_require__(215)

/**
 * ApiVersions Response (Version: 1) => error_code [api_versions] throttle_time_ms
 *   error_code => INT16
 *   api_versions => api_key min_version max_version
 *     api_key => INT16
 *     min_version => INT16
 *     max_version => INT16
 *   throttle_time_ms => INT32
 */

const apiVersion = decoder => ({
  apiKey: decoder.readInt16(),
  minVersion: decoder.readInt16(),
  maxVersion: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  const apiVersions = decoder.readArray(apiVersion)

  /**
   * The Java client defaults this value to 0 if not present,
   * even though it is required in the protocol. This is to
   * work around https://github.com/tulios/kafkajs/issues/491
   *
   * See:
   * https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/protocol/CommonFields.java#L23-L25
   */
  const throttleTime = decoder.canReadInt32() ? decoder.readInt32() : 0

  return {
    errorCode,
    apiVersions,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 218 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(214)

// ApiVersions Request after v1 indicates the client can parse throttle_time_ms

module.exports = () => ({ ...requestV0(), apiVersion: 2 })


/***/ }),
/* 219 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(217)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * ApiVersions Response (Version: 2) => error_code [api_versions] throttle_time_ms
 *   error_code => INT16
 *   api_versions => api_key min_version max_version
 *     api_key => INT16
 *     min_version => INT16
 *     max_version => INT16
 *   throttle_time_ms => INT32
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 220 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ topics, timeout }) => {
    const request = __webpack_require__(221)
    const response = __webpack_require__(222)
    return { request: request({ topics, timeout }), response }
  },
  1: ({ topics, validateOnly, timeout }) => {
    const request = __webpack_require__(223)
    const response = __webpack_require__(224)
    return { request: request({ topics, validateOnly, timeout }), response }
  },
  2: ({ topics, validateOnly, timeout }) => {
    const request = __webpack_require__(225)
    const response = __webpack_require__(226)
    return { request: request({ topics, validateOnly, timeout }), response }
  },
  3: ({ topics, validateOnly, timeout }) => {
    const request = __webpack_require__(227)
    const response = __webpack_require__(228)
    return { request: request({ topics, validateOnly, timeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 221 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { CreateTopics: apiKey } = __webpack_require__(32)

/**
 * CreateTopics Request (Version: 0) => [create_topic_requests] timeout
 *   create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *     topic => STRING
 *     num_partitions => INT32
 *     replication_factor => INT16
 *     replica_assignment => partition [replicas]
 *       partition => INT32
 *       replicas => INT32
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   timeout => INT32
 */

module.exports = ({ topics, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'CreateTopics',
  encode: async () => {
    return new Encoder().writeArray(topics.map(encodeTopics)).writeInt32(timeout)
  },
})

const encodeTopics = ({
  topic,
  numPartitions = 1,
  replicationFactor = 1,
  replicaAssignment = [],
  configEntries = [],
}) => {
  return new Encoder()
    .writeString(topic)
    .writeInt32(numPartitions)
    .writeInt16(replicationFactor)
    .writeArray(replicaAssignment.map(encodeReplicaAssignment))
    .writeArray(configEntries.map(encodeConfigEntries))
}

const encodeReplicaAssignment = ({ partition, replicas }) => {
  return new Encoder().writeInt32(partition).writeArray(replicas)
}

const encodeConfigEntries = ({ name, value }) => {
  return new Encoder().writeString(name).writeString(value)
}


/***/ }),
/* 222 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const { KafkaJSAggregateError, KafkaJSCreateTopicError } = __webpack_require__(19)

/**
 * CreateTopics Response (Version: 0) => [topic_errors]
 *   topic_errors => topic error_code
 *     topic => STRING
 *     error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

const parse = async data => {
  const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode))
  if (topicsWithError.length > 0) {
    throw new KafkaJSAggregateError(
      'Topic creation errors',
      topicsWithError.map(
        error => new KafkaJSCreateTopicError(createErrorFromCode(error.errorCode), error.topic)
      )
    )
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 223 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { CreateTopics: apiKey } = __webpack_require__(32)

/**
 *CreateTopics Request (Version: 1) => [create_topic_requests] timeout validate_only
 *  create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *    topic => STRING
 *    num_partitions => INT32
 *    replication_factor => INT16
 *    replica_assignment => partition [replicas]
 *      partition => INT32
 *      replicas => INT32
 *    config_entries => config_name config_value
 *      config_name => STRING
 *      config_value => NULLABLE_STRING
 *  timeout => INT32
 *  validate_only => BOOLEAN
 */

module.exports = ({ topics, validateOnly = false, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'CreateTopics',
  encode: async () => {
    return new Encoder()
      .writeArray(topics.map(encodeTopics))
      .writeInt32(timeout)
      .writeBoolean(validateOnly)
  },
})

const encodeTopics = ({
  topic,
  numPartitions = 1,
  replicationFactor = 1,
  replicaAssignment = [],
  configEntries = [],
}) => {
  return new Encoder()
    .writeString(topic)
    .writeInt32(numPartitions)
    .writeInt16(replicationFactor)
    .writeArray(replicaAssignment.map(encodeReplicaAssignment))
    .writeArray(configEntries.map(encodeConfigEntries))
}

const encodeReplicaAssignment = ({ partition, replicas }) => {
  return new Encoder().writeInt32(partition).writeArray(replicas)
}

const encodeConfigEntries = ({ name, value }) => {
  return new Encoder().writeString(name).writeString(value)
}


/***/ }),
/* 224 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(222)

/**
 * CreateTopics Response (Version: 1) => [topic_errors]
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 225 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(223)

/**
 * CreateTopics Request (Version: 2) => [create_topic_requests] timeout validate_only
 *   create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *     topic => STRING
 *     num_partitions => INT32
 *     replication_factor => INT16
 *     replica_assignment => partition [replicas]
 *       partition => INT32
 *       replicas => INT32
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topics, validateOnly, timeout }) =>
  Object.assign(requestV1({ topics, validateOnly, timeout }), { apiVersion: 2 })


/***/ }),
/* 226 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV1 } = __webpack_require__(224)

/**
 * CreateTopics Response (Version: 2) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),
/* 227 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV2 = __webpack_require__(225)

/**
 * CreateTopics Request (Version: 3) => [create_topic_requests] timeout validate_only
 *   create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *     topic => STRING
 *     num_partitions => INT32
 *     replication_factor => INT16
 *     replica_assignment => partition [replicas]
 *       partition => INT32
 *       replicas => INT32
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topics, validateOnly, timeout }) =>
  Object.assign(requestV2({ topics, validateOnly, timeout }), { apiVersion: 3 })


/***/ }),
/* 228 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV2 } = __webpack_require__(226)

/**
 * Starting in version 3, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * CreateTopics Response (Version: 3) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decode = async rawData => {
  const decoded = await decodeV2(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 229 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ topics, timeout }) => {
    const request = __webpack_require__(230)
    const response = __webpack_require__(231)
    return { request: request({ topics, timeout }), response }
  },
  1: ({ topics, timeout }) => {
    const request = __webpack_require__(232)
    const response = __webpack_require__(233)
    return { request: request({ topics, timeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 230 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DeleteTopics: apiKey } = __webpack_require__(32)

/**
 * DeleteTopics Request (Version: 0) => [topics] timeout
 *   topics => STRING
 *   timeout => INT32
 */
module.exports = ({ topics, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteTopics',
  encode: async () => {
    return new Encoder().writeArray(topics).writeInt32(timeout)
  },
})


/***/ }),
/* 231 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * DeleteTopics Response (Version: 0) => [topic_error_codes]
 *   topic_error_codes => topic error_code
 *     topic => STRING
 *     error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

const parse = async data => {
  const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode))
  if (topicsWithError.length > 0) {
    throw createErrorFromCode(topicsWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 232 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(230)

/**
 * DeleteTopics Request (Version: 1) => [topics] timeout
 *   topics => STRING
 *   timeout => INT32
 */

module.exports = ({ topics, timeout }) =>
  Object.assign(requestV0({ topics, timeout }), { apiVersion: 1 })


/***/ }),
/* 233 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(231)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DeleteTopics Response (Version: 1) => throttle_time_ms [topic_error_codes]
 *   throttle_time_ms => INT32
 *   topic_error_codes => topic error_code
 *     topic => STRING
 *     error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 234 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ topics, timeout }) => {
    const request = __webpack_require__(235)
    const response = __webpack_require__(236)
    return { request: request({ topics, timeout }), response: response({ topics }) }
  },
  1: ({ topics, timeout }) => {
    const request = __webpack_require__(237)
    const response = __webpack_require__(238)
    return { request: request({ topics, timeout }), response: response({ topics }) }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 235 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DeleteRecords: apiKey } = __webpack_require__(32)

/**
 * DeleteRecords Request (Version: 0) => [topics] timeout_ms
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset
 *       partition => INT32
 *       offset => INT64
 *   timeout => INT32
 */
module.exports = ({ topics, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteRecords',
  encode: async () => {
    return new Encoder()
      .writeArray(
        topics.map(({ topic, partitions }) => {
          return new Encoder().writeString(topic).writeArray(
            partitions.map(({ partition, offset }) => {
              return new Encoder().writeInt32(partition).writeInt64(offset)
            })
          )
        })
      )
      .writeInt32(timeout)
  },
})


/***/ }),
/* 236 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { KafkaJSDeleteTopicRecordsError } = __webpack_require__(19)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * DeleteRecords Response (Version: 0) => throttle_time_ms [topics]
 *  throttle_time_ms => INT32
 *  topics => name [partitions]
 *    name => STRING
 *    partitions => partition low_watermark error_code
 *      partition => INT32
 *      low_watermark => INT64
 *      error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    topics: decoder
      .readArray(decoder => ({
        topic: decoder.readString(),
        partitions: decoder.readArray(decoder => ({
          partition: decoder.readInt32(),
          lowWatermark: decoder.readInt64(),
          errorCode: decoder.readInt16(),
        })),
      }))
      .sort(topicNameComparator),
  }
}

const parse = requestTopics => async data => {
  const topicsWithErrors = data.topics
    .map(({ partitions }) => ({
      partitionsWithErrors: partitions.filter(({ errorCode }) => failure(errorCode)),
    }))
    .filter(({ partitionsWithErrors }) => partitionsWithErrors.length)

  if (topicsWithErrors.length > 0) {
    // at present we only ever request one topic at a time, so can destructure the arrays
    const [{ topic }] = data.topics // topic name
    const [{ partitions: requestPartitions }] = requestTopics // requested offset(s)
    const [{ partitionsWithErrors }] = topicsWithErrors // partition(s) + error(s)

    throw new KafkaJSDeleteTopicRecordsError({
      topic,
      partitions: partitionsWithErrors.map(({ partition, errorCode }) => ({
        partition,
        error: createErrorFromCode(errorCode),
        // attach the original offset from the request, onto the error response
        offset: requestPartitions.find(p => p.partition === partition).offset,
      })),
    })
  }

  return data
}

module.exports = ({ topics }) => ({
  decode,
  parse: parse(topics),
})


/***/ }),
/* 237 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(235)

/**
 * DeleteRecords Request (Version: 1) => [topics] timeout_ms
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset
 *       partition => INT32
 *       offset => INT64
 *   timeout => INT32
 */
module.exports = ({ topics, timeout }) =>
  Object.assign(requestV0({ topics, timeout }), { apiVersion: 1 })


/***/ }),
/* 238 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const responseV0 = __webpack_require__(236)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DeleteRecords Response (Version: 1) => throttle_time_ms [topics]
 *  throttle_time_ms => INT32
 *  topics => name [partitions]
 *    name => STRING
 *    partitions => partition_index low_watermark error_code
 *      partition_index => INT32
 *      low_watermark => INT64
 *      error_code => INT16
 */

module.exports = ({ topics }) => {
  const { parse, decode: decodeV0 } = responseV0({ topics })

  const decode = async rawData => {
    const decoded = await decodeV0(rawData)

    return {
      ...decoded,
      throttleTime: 0,
      clientSideThrottleTime: decoded.throttleTime,
    }
  }

  return {
    decode,
    parse,
  }
}


/***/ }),
/* 239 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ transactionalId, transactionTimeout = 5000 }) => {
    const request = __webpack_require__(240)
    const response = __webpack_require__(241)
    return { request: request({ transactionalId, transactionTimeout }), response }
  },
  1: ({ transactionalId, transactionTimeout = 5000 }) => {
    const request = __webpack_require__(242)
    const response = __webpack_require__(243)
    return { request: request({ transactionalId, transactionTimeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 240 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { InitProducerId: apiKey } = __webpack_require__(32)

/**
 * InitProducerId Request (Version: 0) => transactional_id transaction_timeout_ms
 *   transactional_id => NULLABLE_STRING
 *   transaction_timeout_ms => INT32
 */

module.exports = ({ transactionalId, transactionTimeout }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'InitProducerId',
  encode: async () => {
    return new Encoder().writeString(transactionalId).writeInt32(transactionTimeout)
  },
})


/***/ }),
/* 241 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * InitProducerId Response (Version: 0) => throttle_time_ms error_code producer_id producer_epoch
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   producer_id => INT64
 *   producer_epoch => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
    producerId: decoder.readInt64().toString(),
    producerEpoch: decoder.readInt16(),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 242 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(240)

/**
 * InitProducerId Request (Version: 1) => transactional_id transaction_timeout_ms
 *   transactional_id => NULLABLE_STRING
 *   transaction_timeout_ms => INT32
 */

module.exports = ({ transactionalId, transactionTimeout }) =>
  Object.assign(requestV0({ transactionalId, transactionTimeout }), { apiVersion: 1 })


/***/ }),
/* 243 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(241)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * InitProducerId Response (Version: 0) => throttle_time_ms error_code producer_id producer_epoch
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   producer_id => INT64
 *   producer_epoch => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 244 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ transactionalId, producerId, producerEpoch, topics }) => {
    const request = __webpack_require__(245)
    const response = __webpack_require__(246)
    return { request: request({ transactionalId, producerId, producerEpoch, topics }), response }
  },
  1: ({ transactionalId, producerId, producerEpoch, topics }) => {
    const request = __webpack_require__(247)
    const response = __webpack_require__(248)
    return { request: request({ transactionalId, producerId, producerEpoch, topics }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 245 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { AddPartitionsToTxn: apiKey } = __webpack_require__(32)

/**
 * AddPartitionsToTxn Request (Version: 0) => transactional_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({ transactionalId, producerId, producerEpoch, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'AddPartitionsToTxn',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = partition => {
  return new Encoder().writeInt32(partition)
}


/***/ }),
/* 246 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * AddPartitionsToTxn Response (Version: 0) => throttle_time_ms [errors]
 *   throttle_time_ms => INT32
 *   errors => topic [partition_errors]
 *     topic => STRING
 *     partition_errors => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errors = await decoder.readArrayAsync(decodeError)

  return {
    throttleTime,
    errors,
  }
}

const decodeError = async decoder => ({
  topic: decoder.readString(),
  partitionErrors: await decoder.readArrayAsync(decodePartitionError),
})

const decodePartitionError = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const topicsWithErrors = data.errors
    .map(({ partitionErrors }) => ({
      partitionsWithErrors: partitionErrors.filter(({ errorCode }) => failure(errorCode)),
    }))
    .filter(({ partitionsWithErrors }) => partitionsWithErrors.length)

  if (topicsWithErrors.length > 0) {
    throw createErrorFromCode(topicsWithErrors[0].partitionsWithErrors[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 247 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(245)

/**
 * AddPartitionsToTxn Request (Version: 1) => transactional_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({ transactionalId, producerId, producerEpoch, topics }) =>
  Object.assign(
    requestV0({
      transactionalId,
      producerId,
      producerEpoch,
      topics,
    }),
    { apiVersion: 1 }
  )


/***/ }),
/* 248 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(246)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * AddPartitionsToTxn Response (Version: 1) => throttle_time_ms [errors]
 *   throttle_time_ms => INT32
 *   errors => topic [partition_errors]
 *     topic => STRING
 *     partition_errors => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 249 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ transactionalId, producerId, producerEpoch, groupId }) => {
    const request = __webpack_require__(250)
    const response = __webpack_require__(251)
    return { request: request({ transactionalId, producerId, producerEpoch, groupId }), response }
  },
  1: ({ transactionalId, producerId, producerEpoch, groupId }) => {
    const request = __webpack_require__(252)
    const response = __webpack_require__(253)
    return { request: request({ transactionalId, producerId, producerEpoch, groupId }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 250 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { AddOffsetsToTxn: apiKey } = __webpack_require__(32)

/**
 * AddOffsetsToTxn Request (Version: 0) => transactional_id producer_id producer_epoch group_id
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   group_id => STRING
 */

module.exports = ({ transactionalId, producerId, producerEpoch, groupId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'AddOffsetsToTxn',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeString(groupId)
  },
})


/***/ }),
/* 251 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * AddOffsetsToTxn Response (Version: 0) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 252 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(250)

/**
 * AddOffsetsToTxn Request (Version: 1) => transactional_id producer_id producer_epoch group_id
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   group_id => STRING
 */

module.exports = ({ transactionalId, producerId, producerEpoch, groupId }) =>
  Object.assign(
    requestV0({
      transactionalId,
      producerId,
      producerEpoch,
      groupId,
    }),
    { apiVersion: 1 }
  )


/***/ }),
/* 253 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(251)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * AddOffsetsToTxn Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 254 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ transactionalId, producerId, producerEpoch, transactionResult }) => {
    const request = __webpack_require__(255)
    const response = __webpack_require__(256)
    return {
      request: request({ transactionalId, producerId, producerEpoch, transactionResult }),
      response,
    }
  },
  1: ({ transactionalId, producerId, producerEpoch, transactionResult }) => {
    const request = __webpack_require__(257)
    const response = __webpack_require__(258)
    return {
      request: request({ transactionalId, producerId, producerEpoch, transactionResult }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 255 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { EndTxn: apiKey } = __webpack_require__(32)

/**
 * EndTxn Request (Version: 0) => transactional_id producer_id producer_epoch transaction_result
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   transaction_result => BOOLEAN
 */

module.exports = ({ transactionalId, producerId, producerEpoch, transactionResult }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'EndTxn',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeBoolean(transactionResult)
  },
})


/***/ }),
/* 256 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __webpack_require__(43)

/**
 * EndTxn Response (Version: 0) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 257 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(255)

/**
 * EndTxn Request (Version: 1) => transactional_id producer_id producer_epoch transaction_result
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   transaction_result => BOOLEAN
 */

module.exports = ({ transactionalId, producerId, producerEpoch, transactionResult }) =>
  Object.assign(requestV0({ transactionalId, producerId, producerEpoch, transactionResult }), {
    apiVersion: 1,
  })


/***/ }),
/* 258 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(256)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * EndTxn Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 259 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ transactionalId, groupId, producerId, producerEpoch, topics }) => {
    const request = __webpack_require__(260)
    const response = __webpack_require__(261)
    return {
      request: request({ transactionalId, groupId, producerId, producerEpoch, topics }),
      response,
    }
  },
  1: ({ transactionalId, groupId, producerId, producerEpoch, topics }) => {
    const request = __webpack_require__(262)
    const response = __webpack_require__(263)
    return {
      request: request({ transactionalId, groupId, producerId, producerEpoch, topics }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 260 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { TxnOffsetCommit: apiKey } = __webpack_require__(32)

/**
 * TxnOffsetCommit Request (Version: 0) => transactional_id group_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   group_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ transactionalId, groupId, producerId, producerEpoch, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'TxnOffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeString(groupId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),
/* 261 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * TxnOffsetCommit Response (Version: 0) => throttle_time_ms [topics]
 *   throttle_time_ms => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const topics = await decoder.readArrayAsync(decodeTopic)

  return {
    throttleTime,
    topics,
  }
}

const decodeTopic = async decoder => ({
  topic: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decodePartition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const topicsWithErrors = data.topics
    .map(({ partitions }) => ({
      partitionsWithErrors: partitions.filter(({ errorCode }) => failure(errorCode)),
    }))
    .filter(({ partitionsWithErrors }) => partitionsWithErrors.length)

  if (topicsWithErrors.length > 0) {
    throw createErrorFromCode(topicsWithErrors[0].partitionsWithErrors[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 262 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(260)

/**
 * TxnOffsetCommit Request (Version: 1) => transactional_id group_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   group_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ transactionalId, groupId, producerId, producerEpoch, topics }) =>
  Object.assign(requestV0({ transactionalId, groupId, producerId, producerEpoch, topics }), {
    apiVersion: 1,
  })


/***/ }),
/* 263 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(261)

/**
 * In version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * TxnOffsetCommit Response (Version: 1) => throttle_time_ms [topics]
 *   throttle_time_ms => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 264 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ resourceType, resourceName, principal, host, operation, permissionType }) => {
    const request = __webpack_require__(265)
    const response = __webpack_require__(266)
    return {
      request: request({ resourceType, resourceName, principal, host, operation, permissionType }),
      response,
    }
  },
  1: ({
    resourceType,
    resourceName,
    resourcePatternType,
    principal,
    host,
    operation,
    permissionType,
  }) => {
    const request = __webpack_require__(267)
    const response = __webpack_require__(268)
    return {
      request: request({
        resourceType,
        resourceName,
        resourcePatternType,
        principal,
        host,
        operation,
        permissionType,
      }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 265 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DescribeAcls: apiKey } = __webpack_require__(32)

/**
 * DescribeAcls Request (Version: 0) => resource_type resource_name principal host operation permission_type
 *   resource_type => INT8
 *   resource_name => NULLABLE_STRING
 *   principal => NULLABLE_STRING
 *   host => NULLABLE_STRING
 *   operation => INT8
 *   permission_type => INT8
 */

module.exports = ({ resourceType, resourceName, principal, host, operation, permissionType }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DescribeAcls',
  encode: async () => {
    return new Encoder()
      .writeInt8(resourceType)
      .writeString(resourceName)
      .writeString(principal)
      .writeString(host)
      .writeInt8(operation)
      .writeInt8(permissionType)
  },
})


/***/ }),
/* 266 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * DescribeAcls Response (Version: 0) => throttle_time_ms error_code error_message [resources]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   resources => resource_type resource_name [acls]
 *     resource_type => INT8
 *     resource_name => STRING
 *     acls => principal host operation permission_type
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */

const decodeAcls = decoder => ({
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeResources = decoder => ({
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  acls: decoder.readArray(decodeAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const errorMessage = decoder.readString()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    errorCode,
    errorMessage,
    resources,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 267 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DescribeAcls: apiKey } = __webpack_require__(32)

/**
 * DescribeAcls Request (Version: 1) => resource_type resource_name resource_pattern_type_filter principal host operation permission_type
 *   resource_type => INT8
 *   resource_name => NULLABLE_STRING
 *   resource_pattern_type_filter => INT8
 *   principal => NULLABLE_STRING
 *   host => NULLABLE_STRING
 *   operation => INT8
 *   permission_type => INT8
 */

module.exports = ({
  resourceType,
  resourceName,
  resourcePatternType,
  principal,
  host,
  operation,
  permissionType,
}) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'DescribeAcls',
  encode: async () => {
    return new Encoder()
      .writeInt8(resourceType)
      .writeString(resourceName)
      .writeInt8(resourcePatternType)
      .writeString(principal)
      .writeString(host)
      .writeInt8(operation)
      .writeInt8(permissionType)
  },
})


/***/ }),
/* 268 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse } = __webpack_require__(266)
const Decoder = __webpack_require__(42)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 * Version 1 also introduces a new resource pattern type field.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-290%3A+Support+for+Prefixed+ACLs
 *
 * DescribeAcls Response (Version: 1) => throttle_time_ms error_code error_message [resources]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   resources => resource_type resource_name resource_pattern_type [acls]
 *     resource_type => INT8
 *     resource_name => STRING
 *     resource_pattern_type => INT8
 *     acls => principal host operation permission_type
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */
const decodeAcls = decoder => ({
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeResources = decoder => ({
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  resourcePatternType: decoder.readInt8(),
  acls: decoder.readArray(decodeAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const errorMessage = decoder.readString()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    errorCode,
    errorMessage,
    resources,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 269 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ creations }) => {
    const request = __webpack_require__(270)
    const response = __webpack_require__(271)
    return { request: request({ creations }), response }
  },
  1: ({ creations }) => {
    const request = __webpack_require__(272)
    const response = __webpack_require__(273)
    return { request: request({ creations }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 270 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { CreateAcls: apiKey } = __webpack_require__(32)

/**
 * CreateAcls Request (Version: 0) => [creations]
 *   creations => resource_type resource_name principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => STRING
 *     principal => STRING
 *     host => STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeCreations = ({
  resourceType,
  resourceName,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ creations }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'CreateAcls',
  encode: async () => {
    return new Encoder().writeArray(creations.map(encodeCreations))
  },
})


/***/ }),
/* 271 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * CreateAcls Response (Version: 0) => throttle_time_ms [creation_responses]
 *   throttle_time_ms => INT32
 *   creation_responses => error_code error_message
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decodeCreationResponse = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const creationResponses = decoder.readArray(decodeCreationResponse)

  return {
    throttleTime,
    creationResponses,
  }
}

const parse = async data => {
  const creationResponsesWithError = data.creationResponses.filter(({ errorCode }) =>
    failure(errorCode)
  )

  if (creationResponsesWithError.length > 0) {
    throw createErrorFromCode(creationResponsesWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 272 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { CreateAcls: apiKey } = __webpack_require__(32)

/**
 * CreateAcls Request (Version: 1) => [creations]
 *   creations => resource_type resource_name resource_pattern_type principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => STRING
 *     resource_pattern_type => INT8
 *     principal => STRING
 *     host => STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeCreations = ({
  resourceType,
  resourceName,
  resourcePatternType,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeInt8(resourcePatternType)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ creations }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'CreateAcls',
  encode: async () => {
    return new Encoder().writeArray(creations.map(encodeCreations))
  },
})


/***/ }),
/* 273 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(271)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * CreateAcls Response (Version: 1) => throttle_time_ms [creation_responses]
 *   throttle_time_ms => INT32
 *   creation_responses => error_code error_message
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 274 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ filters }) => {
    const request = __webpack_require__(275)
    const response = __webpack_require__(276)
    return { request: request({ filters }), response }
  },
  1: ({ filters }) => {
    const request = __webpack_require__(277)
    const response = __webpack_require__(278)
    return { request: request({ filters }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 275 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DeleteAcls: apiKey } = __webpack_require__(32)

/**
 * DeleteAcls Request (Version: 0) => [filters]
 *   filters => resource_type resource_name principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => NULLABLE_STRING
 *     principal => NULLABLE_STRING
 *     host => NULLABLE_STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeFilters = ({
  resourceType,
  resourceName,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ filters }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteAcls',
  encode: async () => {
    return new Encoder().writeArray(filters.map(encodeFilters))
  },
})


/***/ }),
/* 276 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * DeleteAcls Response (Version: 0) => throttle_time_ms [filter_responses]
 *   throttle_time_ms => INT32
 *   filter_responses => error_code error_message [matching_acls]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     matching_acls => error_code error_message resource_type resource_name principal host operation permission_type
 *       error_code => INT16
 *       error_message => NULLABLE_STRING
 *       resource_type => INT8
 *       resource_name => STRING
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */

const decodeMatchingAcls = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeFilterResponse = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  matchingAcls: decoder.readArray(decodeMatchingAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const filterResponses = decoder.readArray(decodeFilterResponse)

  return {
    throttleTime,
    filterResponses,
  }
}

const parse = async data => {
  const filterResponsesWithError = data.filterResponses.filter(({ errorCode }) =>
    failure(errorCode)
  )

  if (filterResponsesWithError.length > 0) {
    throw createErrorFromCode(filterResponsesWithError[0].errorCode)
  }

  for (const filterResponse of data.filterResponses) {
    const matchingAcls = filterResponse.matchingAcls
    const matchingAclsWithError = matchingAcls.filter(({ errorCode }) => failure(errorCode))

    if (matchingAclsWithError.length > 0) {
      throw createErrorFromCode(matchingAclsWithError[0].errorCode)
    }
  }

  return data
}

module.exports = {
  decodeMatchingAcls,
  decodeFilterResponse,
  decode,
  parse,
}


/***/ }),
/* 277 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DeleteAcls: apiKey } = __webpack_require__(32)

/**
 * DeleteAcls Request (Version: 1) => [filters]
 *   filters => resource_type resource_name resource_pattern_type_filter principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => NULLABLE_STRING
 *     resource_pattern_type_filter => INT8
 *     principal => NULLABLE_STRING
 *     host => NULLABLE_STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeFilters = ({
  resourceType,
  resourceName,
  resourcePatternType,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeInt8(resourcePatternType)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ filters }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'DeleteAcls',
  encode: async () => {
    return new Encoder().writeArray(filters.map(encodeFilters))
  },
})


/***/ }),
/* 278 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(276)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 * Version 1 also introduces a new resource pattern type field.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-290%3A+Support+for+Prefixed+ACLs
 *
 * DeleteAcls Response (Version: 1) => throttle_time_ms [filter_responses]
 *   throttle_time_ms => INT32
 *   filter_responses => error_code error_message [matching_acls]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     matching_acls => error_code error_message resource_type resource_name resource_pattern_type principal host operation permission_type
 *       error_code => INT16
 *       error_message => NULLABLE_STRING
 *       resource_type => INT8
 *       resource_name => STRING
 *       resource_pattern_type => INT8
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */

const decodeMatchingAcls = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  resourcePatternType: decoder.readInt8(),
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeFilterResponse = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  matchingAcls: decoder.readArray(decodeMatchingAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const filterResponses = decoder.readArray(decodeFilterResponse)

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    filterResponses,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 279 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ resources }) => {
    const request = __webpack_require__(280)
    const response = __webpack_require__(281)
    return { request: request({ resources }), response }
  },
  1: ({ resources, includeSynonyms }) => {
    const request = __webpack_require__(284)
    const response = __webpack_require__(285)
    return { request: request({ resources, includeSynonyms }), response }
  },
  2: ({ resources, includeSynonyms }) => {
    const request = __webpack_require__(286)
    const response = __webpack_require__(287)
    return { request: request({ resources, includeSynonyms }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 280 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DescribeConfigs: apiKey } = __webpack_require__(32)

/**
 * DescribeConfigs Request (Version: 0) => [resources]
 *   resources => resource_type resource_name [config_names]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_names => STRING
 */

/**
 * @param {Array} resources An array of config resources to be returned
 */
module.exports = ({ resources }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DescribeConfigs',
  encode: async () => {
    return new Encoder().writeArray(resources.map(encodeResource))
  },
})

const encodeResource = ({ type, name, configNames = [] }) => {
  return new Encoder()
    .writeInt8(type)
    .writeString(name)
    .writeNullableArray(configNames)
}


/***/ }),
/* 281 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
const ConfigSource = __webpack_require__(282)
const ConfigResourceTypes = __webpack_require__(283)

/**
 * DescribeConfigs Response (Version: 0) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name [config_entries]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value read_only is_default is_sensitive
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *       read_only => BOOLEAN
 *       is_default => BOOLEAN
 *       is_sensitive => BOOLEAN
 */

const decodeConfigEntries = (decoder, resourceType) => {
  const configName = decoder.readString()
  const configValue = decoder.readString()
  const readOnly = decoder.readBoolean()
  const isDefault = decoder.readBoolean()
  const isSensitive = decoder.readBoolean()

  /**
   * Backporting ConfigSource value to v0
   * @see https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/requests/DescribeConfigsResponse.java#L232-L242
   */
  let configSource
  if (isDefault) {
    configSource = ConfigSource.DEFAULT_CONFIG
  } else {
    switch (resourceType) {
      case ConfigResourceTypes.BROKER:
        configSource = ConfigSource.STATIC_BROKER_CONFIG
        break
      case ConfigResourceTypes.TOPIC:
        configSource = ConfigSource.TOPIC_CONFIG
        break
      default:
        configSource = ConfigSource.UNKNOWN
    }
  }

  return {
    configName,
    configValue,
    readOnly,
    isDefault,
    configSource,
    isSensitive,
  }
}

const decodeResources = decoder => {
  const errorCode = decoder.readInt16()
  const errorMessage = decoder.readString()
  const resourceType = decoder.readInt8()
  const resourceName = decoder.readString()
  const configEntries = decoder.readArray(decoder => decodeConfigEntries(decoder, resourceType))

  return {
    errorCode,
    errorMessage,
    resourceType,
    resourceName,
    configEntries,
  }
}

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    resources,
  }
}

const parse = async data => {
  const resourcesWithError = data.resources.filter(({ errorCode }) => failure(errorCode))
  if (resourcesWithError.length > 0) {
    throw createErrorFromCode(resourcesWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 282 */
/***/ ((module) => {

/**
 * @see https://github.com/apache/kafka/blob/1f240ce1793cab09e1c4823e17436d2b030df2bc/clients/src/main/java/org/apache/kafka/common/requests/DescribeConfigsResponse.java#L115-L122
 */
module.exports = {
  UNKNOWN: 0,
  TOPIC_CONFIG: 1,
  DYNAMIC_BROKER_CONFIG: 2,
  DYNAMIC_DEFAULT_BROKER_CONFIG: 3,
  STATIC_BROKER_CONFIG: 4,
  DEFAULT_CONFIG: 5,
  DYNAMIC_BROKER_LOGGER_CONFIG: 6,
}


/***/ }),
/* 283 */
/***/ ((module) => {

/**
 * @see https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/config/ConfigResource.java
 */
module.exports = {
  UNKNOWN: 0,
  TOPIC: 2,
  BROKER: 4,
  BROKER_LOGGER: 8,
}


/***/ }),
/* 284 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DescribeConfigs: apiKey } = __webpack_require__(32)

/**
 * DescribeConfigs Request (Version: 1) => [resources] include_synonyms
 *   resources => resource_type resource_name [config_names]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_names => STRING
 *   include_synonyms => BOOLEAN
 */

/**
 * @param {Array} resources An array of config resources to be returned
 * @param [includeSynonyms=false]
 */
module.exports = ({ resources, includeSynonyms = false }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'DescribeConfigs',
  encode: async () => {
    return new Encoder().writeArray(resources.map(encodeResource)).writeBoolean(includeSynonyms)
  },
})

const encodeResource = ({ type, name, configNames = [] }) => {
  return new Encoder()
    .writeInt8(type)
    .writeString(name)
    .writeNullableArray(configNames)
}


/***/ }),
/* 285 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { parse: parseV0 } = __webpack_require__(281)
const { DEFAULT_CONFIG } = __webpack_require__(282)

/**
 * DescribeConfigs Response (Version: 1) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name [config_entries]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value read_only config_source is_sensitive [config_synonyms]
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *       read_only => BOOLEAN
 *       config_source => INT8
 *       is_sensitive => BOOLEAN
 *       config_synonyms => config_name config_value config_source
 *         config_name => STRING
 *         config_value => NULLABLE_STRING
 *         config_source => INT8
 */

const decodeSynonyms = decoder => ({
  configName: decoder.readString(),
  configValue: decoder.readString(),
  configSource: decoder.readInt8(),
})

const decodeConfigEntries = decoder => {
  const configName = decoder.readString()
  const configValue = decoder.readString()
  const readOnly = decoder.readBoolean()
  const configSource = decoder.readInt8()
  const isSensitive = decoder.readBoolean()
  const configSynonyms = decoder.readArray(decodeSynonyms)

  return {
    configName,
    configValue,
    readOnly,
    isDefault: configSource === DEFAULT_CONFIG,
    configSource,
    isSensitive,
    configSynonyms,
  }
}

const decodeResources = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  configEntries: decoder.readArray(decodeConfigEntries),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    resources,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 286 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV1 = __webpack_require__(284)

/**
 * DescribeConfigs Request (Version: 1) => [resources] include_synonyms
 *   resources => resource_type resource_name [config_names]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_names => STRING
 *   include_synonyms => BOOLEAN
 */

/**
 * @param {Array} resources An array of config resources to be returned
 * @param [includeSynonyms=false]
 */
module.exports = ({ resources, includeSynonyms }) =>
  Object.assign(requestV1({ resources, includeSynonyms }), { apiVersion: 2 })


/***/ }),
/* 287 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV1 } = __webpack_require__(285)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DescribeConfigs Response (Version: 2) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name [config_entries]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value read_only config_source is_sensitive [config_synonyms]
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *       read_only => BOOLEAN
 *       config_source => INT8
 *       is_sensitive => BOOLEAN
 *       config_synonyms => config_name config_value config_source
 *         config_name => STRING
 *         config_value => NULLABLE_STRING
 *         config_source => INT8
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 288 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ resources, validateOnly }) => {
    const request = __webpack_require__(289)
    const response = __webpack_require__(290)
    return { request: request({ resources, validateOnly }), response }
  },
  1: ({ resources, validateOnly }) => {
    const request = __webpack_require__(291)
    const response = __webpack_require__(292)
    return { request: request({ resources, validateOnly }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 289 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { AlterConfigs: apiKey } = __webpack_require__(32)

/**
 * AlterConfigs Request (Version: 0) => [resources] validate_only
 *   resources => resource_type resource_name [config_entries]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   validate_only => BOOLEAN
 */

/**
 * @param {Array} resources An array of resources to change
 * @param {boolean} [validateOnly=false]
 */
module.exports = ({ resources, validateOnly = false }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'AlterConfigs',
  encode: async () => {
    return new Encoder().writeArray(resources.map(encodeResource)).writeBoolean(validateOnly)
  },
})

const encodeResource = ({ type, name, configEntries }) => {
  return new Encoder()
    .writeInt8(type)
    .writeString(name)
    .writeArray(configEntries.map(encodeConfigEntries))
}

const encodeConfigEntries = ({ name, value }) => {
  return new Encoder().writeString(name).writeString(value)
}


/***/ }),
/* 290 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/**
 * AlterConfigs Response (Version: 0) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 */

const decodeResources = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    resources,
  }
}

const parse = async data => {
  const resourcesWithError = data.resources.filter(({ errorCode }) => failure(errorCode))
  if (resourcesWithError.length > 0) {
    throw createErrorFromCode(resourcesWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 291 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(289)

/**
 * AlterConfigs Request (Version: 1) => [resources] validate_only
 *   resources => resource_type resource_name [config_entries]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   validate_only => BOOLEAN
 */

/**
 * @param {Array} resources An array of resources to change
 * @param {boolean} [validateOnly=false]
 */
module.exports = ({ resources, validateOnly }) =>
  Object.assign(
    requestV0({
      resources,
      validateOnly,
    }),
    { apiVersion: 1 }
  )


/***/ }),
/* 292 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(290)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * AlterConfigs Response (Version: 1) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 293 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ authBytes }) => {
    const request = __webpack_require__(294)
    const response = __webpack_require__(295)
    return { request: request({ authBytes }), response }
  },
  1: ({ authBytes }) => {
    const request = __webpack_require__(296)
    const response = __webpack_require__(297)
    return { request: request({ authBytes }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 294 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { SaslAuthenticate: apiKey } = __webpack_require__(32)

/**
 * SaslAuthenticate Request (Version: 0) => sasl_auth_bytes
 *   sasl_auth_bytes => BYTES
 */

/**
 * @param {Buffer} authBytes - SASL authentication bytes from client as defined by the SASL mechanism
 */
module.exports = ({ authBytes }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'SaslAuthenticate',
  encode: async () => {
    return new Encoder().writeBuffer(authBytes)
  },
})


/***/ }),
/* 295 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const Encoder = __webpack_require__(35)
const {
  failure,
  createErrorFromCode,
  failIfVersionNotSupported,
  errorCodes,
} = __webpack_require__(43)

const { KafkaJSProtocolError } = __webpack_require__(19)
const SASL_AUTHENTICATION_FAILED = 58
const protocolAuthError = errorCodes.find(e => e.code === SASL_AUTHENTICATION_FAILED)

/**
 * SaslAuthenticate Response (Version: 0) => error_code error_message sasl_auth_bytes
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   sasl_auth_bytes => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)
  const errorMessage = decoder.readString()

  // This is necessary to make the response compatible with the original
  // mechanism protocols. They expect a byte response, which starts with
  // the size
  const authBytesEncoder = new Encoder().writeBytes(decoder.readBytes())
  const authBytes = authBytesEncoder.buffer

  return {
    errorCode,
    errorMessage,
    authBytes,
  }
}

const parse = async data => {
  if (data.errorCode === SASL_AUTHENTICATION_FAILED && data.errorMessage) {
    throw new KafkaJSProtocolError({
      ...protocolAuthError,
      message: data.errorMessage,
    })
  }

  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 296 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(294)

/**
 * SaslAuthenticate Request (Version: 1) => sasl_auth_bytes
 *   sasl_auth_bytes => BYTES
 */

/**
 * @param {Buffer} authBytes - SASL authentication bytes from client as defined by the SASL mechanism
 */
module.exports = ({ authBytes }) => Object.assign(requestV0({ authBytes }), { apiVersion: 1 })


/***/ }),
/* 297 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const Encoder = __webpack_require__(35)
const { parse: parseV0 } = __webpack_require__(295)
const { failIfVersionNotSupported } = __webpack_require__(43)

/**
 * SaslAuthenticate Response (Version: 1) => error_code error_message sasl_auth_bytes
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   sasl_auth_bytes => BYTES
 *   session_lifetime_ms => INT64
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)
  const errorMessage = decoder.readString()

  // This is necessary to make the response compatible with the original
  // mechanism protocols. They expect a byte response, which starts with
  // the size
  const authBytesEncoder = new Encoder().writeBytes(decoder.readBytes())
  const authBytes = authBytesEncoder.buffer
  const sessionLifetimeMs = decoder.readInt64().toString()

  return {
    errorCode,
    errorMessage,
    authBytes,
    sessionLifetimeMs,
  }
}
module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),
/* 298 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: ({ topicPartitions, timeout, validateOnly }) => {
    const request = __webpack_require__(299)
    const response = __webpack_require__(300)
    return { request: request({ topicPartitions, timeout, validateOnly }), response }
  },
  1: ({ topicPartitions, validateOnly, timeout }) => {
    const request = __webpack_require__(301)
    const response = __webpack_require__(302)
    return { request: request({ topicPartitions, validateOnly, timeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 299 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { CreatePartitions: apiKey } = __webpack_require__(32)

/**
 * CreatePartitions Request (Version: 0) => [topic_partitions] timeout validate_only
 *   topic_partitions => topic new_partitions
 *     topic => STRING
 *     new_partitions => count [assignment]
 *       count => INT32
 *       assignment => ARRAY(INT32)
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topicPartitions, validateOnly = false, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'CreatePartitions',
  encode: async () => {
    return new Encoder()
      .writeArray(topicPartitions.map(encodeTopicPartitions))
      .writeInt32(timeout)
      .writeBoolean(validateOnly)
  },
})

const encodeTopicPartitions = ({ topic, count, assignments = [] }) => {
  return new Encoder()
    .writeString(topic)
    .writeInt32(count)
    .writeNullableArray(assignments.map(encodeAssignments))
}

const encodeAssignments = brokerIds => {
  return new Encoder().writeNullableArray(brokerIds)
}


/***/ }),
/* 300 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)

/*
 * CreatePartitions Response (Version: 0) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  return {
    throttleTime,
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

const parse = async data => {
  const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode))
  if (topicsWithError.length > 0) {
    throw createErrorFromCode(topicsWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 301 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(299)

/**
 * CreatePartitions Request (Version: 1) => [topic_partitions] timeout validate_only
 *   topic_partitions => topic new_partitions
 *     topic => STRING
 *     new_partitions => count [assignment]
 *       count => INT32
 *       assignment => ARRAY(INT32)
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topicPartitions, validateOnly, timeout }) =>
  Object.assign(requestV0({ topicPartitions, validateOnly, timeout }), { apiVersion: 1 })


/***/ }),
/* 302 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(300)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * CreatePartitions Response (Version: 0) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 303 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versions = {
  0: groupIds => {
    const request = __webpack_require__(304)
    const response = __webpack_require__(305)
    return { request: request(groupIds), response }
  },
  1: groupIds => {
    const request = __webpack_require__(306)
    const response = __webpack_require__(307)
    return { request: request(groupIds), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),
/* 304 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const { DeleteGroups: apiKey } = __webpack_require__(32)

/**
 * DeleteGroups Request (Version: 0) => [groups_names]
 *   groups_names => STRING
 */

/**
 */
module.exports = groupIds => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteGroups',
  encode: async () => {
    return new Encoder().writeArray(groupIds.map(encodeGroups))
  },
})

const encodeGroups = group => {
  return new Encoder().writeString(group)
}


/***/ }),
/* 305 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Decoder = __webpack_require__(42)
const { failure, createErrorFromCode } = __webpack_require__(43)
/**
 * DeleteGroups Response (Version: 0) => throttle_time_ms [results]
 *  throttle_time_ms => INT32
 *  results => group_id error_code
 *    group_id => STRING
 *    error_code => INT16
 */

const decodeGroup = decoder => ({
  groupId: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTimeMs = decoder.readInt32()
  const results = decoder.readArray(decodeGroup)

  for (const result of results) {
    if (failure(result.errorCode)) {
      result.error = createErrorFromCode(result.errorCode)
    }
  }
  return {
    throttleTimeMs,
    results,
  }
}

const parse = async data => {
  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 306 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const requestV0 = __webpack_require__(304)

/**
 * DeleteGroups Request (Version: 1)
 */

module.exports = groupIds => Object.assign(requestV0(groupIds), { apiVersion: 1 })


/***/ }),
/* 307 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { parse, decode: decodeV0 } = __webpack_require__(305)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DeleteGroups Response (Version: 1) => throttle_time_ms [results]
 *  throttle_time_ms => INT32
 *  results => group_id error_code
 *    group_id => STRING
 *    error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),
/* 308 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { requests, lookup } = __webpack_require__(31)
const apiKeys = __webpack_require__(32)
const PlainAuthenticator = __webpack_require__(309)
const SCRAM256Authenticator = __webpack_require__(313)
const SCRAM512Authenticator = __webpack_require__(321)
const AWSIAMAuthenticator = __webpack_require__(322)
const OAuthBearerAuthenticator = __webpack_require__(326)
const { KafkaJSSASLAuthenticationError } = __webpack_require__(19)

const AUTHENTICATORS = {
  PLAIN: PlainAuthenticator,
  'SCRAM-SHA-256': SCRAM256Authenticator,
  'SCRAM-SHA-512': SCRAM512Authenticator,
  AWS: AWSIAMAuthenticator,
  OAUTHBEARER: OAuthBearerAuthenticator,
}

const SUPPORTED_MECHANISMS = Object.keys(AUTHENTICATORS)
const UNLIMITED_SESSION_LIFETIME = '0'

module.exports = class SASLAuthenticator {
  constructor(connection, logger, versions, supportAuthenticationProtocol) {
    this.connection = connection
    this.logger = logger
    this.sessionLifetime = UNLIMITED_SESSION_LIFETIME

    const lookupRequest = lookup(versions)
    this.saslHandshake = lookupRequest(apiKeys.SaslHandshake, requests.SaslHandshake)
    this.protocolAuthentication = supportAuthenticationProtocol
      ? lookupRequest(apiKeys.SaslAuthenticate, requests.SaslAuthenticate)
      : null
  }

  async authenticate() {
    const mechanism = this.connection.sasl.mechanism.toUpperCase()
    if (!SUPPORTED_MECHANISMS.includes(mechanism)) {
      throw new KafkaJSSASLAuthenticationError(
        `SASL ${mechanism} mechanism is not supported by the client`
      )
    }

    const handshake = await this.connection.send(this.saslHandshake({ mechanism }))
    if (!handshake.enabledMechanisms.includes(mechanism)) {
      throw new KafkaJSSASLAuthenticationError(
        `SASL ${mechanism} mechanism is not supported by the server`
      )
    }

    const saslAuthenticate = async ({ request, response, authExpectResponse }) => {
      if (this.protocolAuthentication) {
        const { buffer: requestAuthBytes } = await request.encode()
        const authResponse = await this.connection.send(
          this.protocolAuthentication({ authBytes: requestAuthBytes })
        )

        // `0` is a string because `sessionLifetimeMs` is an int64 encoded as string.
        // This is not present in SaslAuthenticateV0, so we default to `"0"`
        this.sessionLifetime = authResponse.sessionLifetimeMs || UNLIMITED_SESSION_LIFETIME

        if (!authExpectResponse) {
          return
        }

        const { authBytes: responseAuthBytes } = authResponse
        const payloadDecoded = await response.decode(responseAuthBytes)
        return response.parse(payloadDecoded)
      }

      return this.connection.authenticate({ request, response, authExpectResponse })
    }

    const Authenticator = AUTHENTICATORS[mechanism]
    await new Authenticator(this.connection, this.logger, saslAuthenticate).authenticate()
  }
}


/***/ }),
/* 309 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const plain = __webpack_require__(310)
const { KafkaJSSASLAuthenticationError } = __webpack_require__(19)

module.exports = class PlainAuthenticator {
  constructor(connection, logger, saslAuthenticate) {
    this.connection = connection
    this.logger = logger.namespace('SASLPlainAuthenticator')
    this.saslAuthenticate = saslAuthenticate
  }

  async authenticate() {
    const { sasl } = this.connection
    if (sasl.username == null || sasl.password == null) {
      throw new KafkaJSSASLAuthenticationError('SASL Plain: Invalid username or password')
    }

    const request = plain.request(sasl)
    const response = plain.response
    const { host, port } = this.connection
    const broker = `${host}:${port}`

    try {
      this.logger.debug('Authenticate with SASL PLAIN', { broker })
      await this.saslAuthenticate({ request, response })
      this.logger.debug('SASL PLAIN authentication successful', { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(
        `SASL PLAIN authentication failed: ${e.message}`
      )
      this.logger.error(error.message, { broker })
      throw error
    }
  }
}


/***/ }),
/* 310 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  request: __webpack_require__(311),
  response: __webpack_require__(312),
}


/***/ }),
/* 311 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * http://www.ietf.org/rfc/rfc2595.txt
 *
 * The mechanism consists of a single message from the client to the
 * server.  The client sends the authorization identity (identity to
 * login as), followed by a US-ASCII NUL character, followed by the
 * authentication identity (identity whose password will be used),
 * followed by a US-ASCII NUL character, followed by the clear-text
 * password.  The client may leave the authorization identity empty to
 * indicate that it is the same as the authentication identity.
 *
 * The server will verify the authentication identity and password with
 * the system authentication database and verify that the authentication
 * credentials permit the client to login as the authorization identity.
 * If both steps succeed, the user is logged in.
 */

const Encoder = __webpack_require__(35)

const US_ASCII_NULL_CHAR = '\u0000'

module.exports = ({ authorizationIdentity = null, username, password }) => ({
  encode: async () => {
    return new Encoder().writeBytes(
      [authorizationIdentity, username, password].join(US_ASCII_NULL_CHAR)
    )
  },
})


/***/ }),
/* 312 */
/***/ ((module) => {

module.exports = {
  decode: async () => true,
  parse: async () => true,
}


/***/ }),
/* 313 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { SCRAM, DIGESTS } = __webpack_require__(314)

module.exports = class SCRAM256Authenticator extends SCRAM {
  constructor(connection, logger, saslAuthenticate) {
    super(connection, logger.namespace('SCRAM256Authenticator'), saslAuthenticate, DIGESTS.SHA256)
  }
}


/***/ }),
/* 314 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const crypto = __webpack_require__(315)
const scram = __webpack_require__(316)
const { KafkaJSSASLAuthenticationError, KafkaJSNonRetriableError } = __webpack_require__(19)

const GS2_HEADER = 'n,,'

const EQUAL_SIGN_REGEX = /=/g
const COMMA_SIGN_REGEX = /,/g

const URLSAFE_BASE64_PLUS_REGEX = /\+/g
const URLSAFE_BASE64_SLASH_REGEX = /\//g
const URLSAFE_BASE64_TRAILING_EQUAL_REGEX = /=+$/

const HMAC_CLIENT_KEY = 'Client Key'
const HMAC_SERVER_KEY = 'Server Key'

const DIGESTS = {
  SHA256: {
    length: 32,
    type: 'sha256',
    minIterations: 4096,
  },
  SHA512: {
    length: 64,
    type: 'sha512',
    minIterations: 4096,
  },
}

const encode64 = str => Buffer.from(str).toString('base64')

class SCRAM {
  /**
   * From https://tools.ietf.org/html/rfc5802#section-5.1
   *
   * The characters ',' or '=' in usernames are sent as '=2C' and
   * '=3D' respectively.  If the server receives a username that
   * contains '=' not followed by either '2C' or '3D', then the
   * server MUST fail the authentication.
   *
   * @returns {String}
   */
  static sanitizeString(str) {
    return str.replace(EQUAL_SIGN_REGEX, '=3D').replace(COMMA_SIGN_REGEX, '=2C')
  }

  /**
   * In cryptography, a nonce is an arbitrary number that can be used just once.
   * It is similar in spirit to a nonce * word, hence the name. It is often a random or pseudo-random
   * number issued in an authentication protocol to * ensure that old communications cannot be reused
   * in replay attacks.
   *
   * @returns {String}
   */
  static nonce() {
    return crypto
      .randomBytes(16)
      .toString('base64')
      .replace(URLSAFE_BASE64_PLUS_REGEX, '-') // make it url safe
      .replace(URLSAFE_BASE64_SLASH_REGEX, '_')
      .replace(URLSAFE_BASE64_TRAILING_EQUAL_REGEX, '')
      .toString('ascii')
  }

  /**
   * Hi() is, essentially, PBKDF2 [RFC2898] with HMAC() as the
   * pseudorandom function (PRF) and with dkLen == output length of
   * HMAC() == output length of H()
   *
   * @returns {Promise<Buffer>}
   */
  static hi(password, salt, iterations, digestDefinition) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        digestDefinition.length,
        digestDefinition.type,
        (err, derivedKey) => (err ? reject(err) : resolve(derivedKey))
      )
    })
  }

  /**
   * Apply the exclusive-or operation to combine the octet string
   * on the left of this operator with the octet string on the right of
   * this operator.  The length of the output and each of the two
   * inputs will be the same for this use
   *
   * @returns {Buffer}
   */
  static xor(left, right) {
    const bufferA = Buffer.from(left)
    const bufferB = Buffer.from(right)
    const length = Buffer.byteLength(bufferA)

    if (length !== Buffer.byteLength(bufferB)) {
      throw new KafkaJSNonRetriableError('Buffers must be of the same length')
    }

    const result = []
    for (let i = 0; i < length; i++) {
      result.push(bufferA[i] ^ bufferB[i])
    }

    return Buffer.from(result)
  }

  /**
   * @param {Connection} connection
   * @param {Logger} logger
   * @param {Function} saslAuthenticate
   * @param {DigestDefinition} digestDefinition
   */
  constructor(connection, logger, saslAuthenticate, digestDefinition) {
    this.connection = connection
    this.logger = logger
    this.saslAuthenticate = saslAuthenticate
    this.digestDefinition = digestDefinition

    const digestType = digestDefinition.type.toUpperCase()
    this.PREFIX = `SASL SCRAM ${digestType} authentication`

    this.currentNonce = SCRAM.nonce()
  }

  async authenticate() {
    const { PREFIX } = this
    const { host, port, sasl } = this.connection
    const broker = `${host}:${port}`

    if (sasl.username == null || sasl.password == null) {
      throw new KafkaJSSASLAuthenticationError(`${this.PREFIX}: Invalid username or password`)
    }

    try {
      this.logger.debug('Exchanging first client message', { broker })
      const clientMessageResponse = await this.sendClientFirstMessage()

      this.logger.debug('Sending final message', { broker })
      const finalResponse = await this.sendClientFinalMessage(clientMessageResponse)

      if (finalResponse.e) {
        throw new Error(finalResponse.e)
      }

      const serverKey = await this.serverKey(clientMessageResponse)
      const serverSignature = this.serverSignature(serverKey, clientMessageResponse)

      if (finalResponse.v !== serverSignature) {
        throw new Error('Invalid server signature in server final message')
      }

      this.logger.debug(`${PREFIX} successful`, { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(`${PREFIX} failed: ${e.message}`)
      this.logger.error(error.message, { broker })
      throw error
    }
  }

  /**
   * @private
   */
  async sendClientFirstMessage() {
    const clientFirstMessage = `${GS2_HEADER}${this.firstMessageBare()}`
    const request = scram.firstMessage.request({ clientFirstMessage })
    const response = scram.firstMessage.response

    return this.saslAuthenticate({
      authExpectResponse: true,
      request,
      response,
    })
  }

  /**
   * @private
   */
  async sendClientFinalMessage(clientMessageResponse) {
    const { PREFIX } = this
    const iterations = parseInt(clientMessageResponse.i, 10)
    const { minIterations } = this.digestDefinition

    if (!clientMessageResponse.r.startsWith(this.currentNonce)) {
      throw new KafkaJSSASLAuthenticationError(
        `${PREFIX} failed: Invalid server nonce, it does not start with the client nonce`
      )
    }

    if (iterations < minIterations) {
      throw new KafkaJSSASLAuthenticationError(
        `${PREFIX} failed: Requested iterations ${iterations} is less than the minimum ${minIterations}`
      )
    }

    const finalMessageWithoutProof = this.finalMessageWithoutProof(clientMessageResponse)
    const clientProof = await this.clientProof(clientMessageResponse)
    const finalMessage = `${finalMessageWithoutProof},p=${clientProof}`
    const request = scram.finalMessage.request({ finalMessage })
    const response = scram.finalMessage.response

    return this.saslAuthenticate({
      authExpectResponse: true,
      request,
      response,
    })
  }

  /**
   * @private
   */
  async clientProof(clientMessageResponse) {
    const clientKey = await this.clientKey(clientMessageResponse)
    const storedKey = this.H(clientKey)
    const clientSignature = this.clientSignature(storedKey, clientMessageResponse)
    return encode64(SCRAM.xor(clientKey, clientSignature))
  }

  /**
   * @private
   */
  async clientKey(clientMessageResponse) {
    const saltedPassword = await this.saltPassword(clientMessageResponse)
    return this.HMAC(saltedPassword, HMAC_CLIENT_KEY)
  }

  /**
   * @private
   */
  async serverKey(clientMessageResponse) {
    const saltedPassword = await this.saltPassword(clientMessageResponse)
    return this.HMAC(saltedPassword, HMAC_SERVER_KEY)
  }

  /**
   * @private
   */
  clientSignature(storedKey, clientMessageResponse) {
    return this.HMAC(storedKey, this.authMessage(clientMessageResponse))
  }

  /**
   * @private
   */
  serverSignature(serverKey, clientMessageResponse) {
    return encode64(this.HMAC(serverKey, this.authMessage(clientMessageResponse)))
  }

  /**
   * @private
   */
  authMessage(clientMessageResponse) {
    return [
      this.firstMessageBare(),
      clientMessageResponse.original,
      this.finalMessageWithoutProof(clientMessageResponse),
    ].join(',')
  }

  /**
   * @private
   */
  async saltPassword(clientMessageResponse) {
    const salt = Buffer.from(clientMessageResponse.s, 'base64')
    const iterations = parseInt(clientMessageResponse.i, 10)
    return SCRAM.hi(this.encodedPassword(), salt, iterations, this.digestDefinition)
  }

  /**
   * @private
   */
  firstMessageBare() {
    return `n=${this.encodedUsername()},r=${this.currentNonce}`
  }

  /**
   * @private
   */
  finalMessageWithoutProof(clientMessageResponse) {
    const rnonce = clientMessageResponse.r
    return `c=${encode64(GS2_HEADER)},r=${rnonce}`
  }

  /**
   * @private
   */
  encodedUsername() {
    const { username } = this.connection.sasl
    return SCRAM.sanitizeString(username).toString('utf-8')
  }

  /**
   * @private
   */
  encodedPassword() {
    const { password } = this.connection.sasl
    return password.toString('utf-8')
  }

  /**
   * @private
   */
  H(data) {
    return crypto
      .createHash(this.digestDefinition.type)
      .update(data)
      .digest()
  }

  /**
   * @private
   */
  HMAC(key, data) {
    return crypto
      .createHmac(this.digestDefinition.type, key)
      .update(data)
      .digest()
  }
}

module.exports = {
  DIGESTS,
  SCRAM,
}


/***/ }),
/* 315 */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),
/* 316 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  firstMessage: {
    request: __webpack_require__(317),
    response: __webpack_require__(318),
  },
  finalMessage: {
    request: __webpack_require__(319),
    response: __webpack_require__(320),
  },
}


/***/ }),
/* 317 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * https://tools.ietf.org/html/rfc5802
 *
 * First, the client sends the "client-first-message" containing:
 *
 *  -> a GS2 header consisting of a flag indicating whether channel
 * binding is supported-but-not-used, not supported, or used, and an
 * optional SASL authorization identity;
 *
 *  -> SCRAM username and a random, unique nonce attributes.
 *
 * Note that the client's first message will always start with "n", "y",
 * or "p"; otherwise, the message is invalid and authentication MUST
 * fail.  This is important, as it allows for GS2 extensibility (e.g.,
 * to add support for security layers).
 */

const Encoder = __webpack_require__(35)

module.exports = ({ clientFirstMessage }) => ({
  encode: async () => new Encoder().writeBytes(clientFirstMessage),
})


/***/ }),
/* 318 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "_" }] */

const Decoder = __webpack_require__(42)

const ENTRY_REGEX = /^([rsiev])=(.*)$/

module.exports = {
  decode: async rawData => {
    return new Decoder(rawData).readBytes()
  },
  parse: async data => {
    const processed = data
      .toString()
      .split(',')
      .map(str => {
        const [_, key, value] = str.match(ENTRY_REGEX)
        return [key, value]
      })
      .reduce((obj, entry) => ({ ...obj, [entry[0]]: entry[1] }), {})

    return { original: data.toString(), ...processed }
  },
}


/***/ }),
/* 319 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)

module.exports = ({ finalMessage }) => ({
  encode: async () => new Encoder().writeBytes(finalMessage),
})


/***/ }),
/* 320 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(318)


/***/ }),
/* 321 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { SCRAM, DIGESTS } = __webpack_require__(314)

module.exports = class SCRAM512Authenticator extends SCRAM {
  constructor(connection, logger, saslAuthenticate) {
    super(connection, logger.namespace('SCRAM512Authenticator'), saslAuthenticate, DIGESTS.SHA512)
  }
}


/***/ }),
/* 322 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const awsIam = __webpack_require__(323)
const { KafkaJSSASLAuthenticationError } = __webpack_require__(19)

module.exports = class AWSIAMAuthenticator {
  constructor(connection, logger, saslAuthenticate) {
    this.connection = connection
    this.logger = logger.namespace('SASLAWSIAMAuthenticator')
    this.saslAuthenticate = saslAuthenticate
  }

  async authenticate() {
    const { sasl } = this.connection
    if (!sasl.authorizationIdentity) {
      throw new KafkaJSSASLAuthenticationError('SASL AWS-IAM: Missing authorizationIdentity')
    }
    if (!sasl.accessKeyId) {
      throw new KafkaJSSASLAuthenticationError('SASL AWS-IAM: Missing accessKeyId')
    }
    if (!sasl.secretAccessKey) {
      throw new KafkaJSSASLAuthenticationError('SASL AWS-IAM: Missing secretAccessKey')
    }
    if (!sasl.sessionToken) {
      sasl.sessionToken = ''
    }

    const request = awsIam.request(sasl)
    const response = awsIam.response
    const { host, port } = this.connection
    const broker = `${host}:${port}`

    try {
      this.logger.debug('Authenticate with SASL AWS-IAM', { broker })
      await this.saslAuthenticate({ request, response })
      this.logger.debug('SASL AWS-IAM authentication successful', { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(
        `SASL AWS-IAM authentication failed: ${e.message}`
      )
      this.logger.error(error.message, { broker })
      throw error
    }
  }
}


/***/ }),
/* 323 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  request: __webpack_require__(324),
  response: __webpack_require__(325),
}


/***/ }),
/* 324 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)

const US_ASCII_NULL_CHAR = '\u0000'

module.exports = ({ authorizationIdentity, accessKeyId, secretAccessKey, sessionToken = '' }) => ({
  encode: async () => {
    return new Encoder().writeBytes(
      [authorizationIdentity, accessKeyId, secretAccessKey, sessionToken].join(US_ASCII_NULL_CHAR)
    )
  },
})


/***/ }),
/* 325 */
/***/ ((module) => {

module.exports = {
  decode: async () => true,
  parse: async () => true,
}


/***/ }),
/* 326 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * The sasl object must include a property named oauthBearerProvider, an
 * async function that is used to return the OAuth bearer token.
 *
 * The OAuth bearer token must be an object with properties value and
 * (optionally) extensions, that will be sent during the SASL/OAUTHBEARER
 * request.
 *
 * The implementation of the oauthBearerProvider must take care that tokens are
 * reused and refreshed when appropriate.
 */

const oauthBearer = __webpack_require__(327)
const { KafkaJSSASLAuthenticationError } = __webpack_require__(19)

module.exports = class OAuthBearerAuthenticator {
  constructor(connection, logger, saslAuthenticate) {
    this.connection = connection
    this.logger = logger.namespace('SASLOAuthBearerAuthenticator')
    this.saslAuthenticate = saslAuthenticate
  }

  async authenticate() {
    const { sasl } = this.connection
    if (sasl.oauthBearerProvider == null) {
      throw new KafkaJSSASLAuthenticationError(
        'SASL OAUTHBEARER: Missing OAuth bearer token provider'
      )
    }

    const { oauthBearerProvider } = sasl

    const oauthBearerToken = await oauthBearerProvider()

    if (oauthBearerToken.value == null) {
      throw new KafkaJSSASLAuthenticationError('SASL OAUTHBEARER: Invalid OAuth bearer token')
    }

    const request = await oauthBearer.request(sasl, oauthBearerToken)
    const response = oauthBearer.response
    const { host, port } = this.connection
    const broker = `${host}:${port}`

    try {
      this.logger.debug('Authenticate with SASL OAUTHBEARER', { broker })
      await this.saslAuthenticate({ request, response })
      this.logger.debug('SASL OAUTHBEARER authentication successful', { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(
        `SASL OAUTHBEARER authentication failed: ${e.message}`
      )
      this.logger.error(error.message, { broker })
      throw error
    }
  }
}


/***/ }),
/* 327 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  request: __webpack_require__(328),
  response: __webpack_require__(329),
}


/***/ }),
/* 328 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * http://www.ietf.org/rfc/rfc5801.txt
 *
 * See org.apache.kafka.common.security.oauthbearer.internals.OAuthBearerClientInitialResponse
 * for official Java client implementation.
 *
 * The mechanism consists of a message from the client to the server.
 * The client sends the "n,"" GS header, followed by the authorizationIdentitty
 * prefixed by "a=" (if present), followed by ",", followed by a US-ASCII SOH
 * character, followed by "auth=Bearer ", followed by the token value, followed
 * by US-ASCII SOH character, followed by SASL extensions in OAuth "friendly"
 * format and then closed by two additionals US-ASCII SOH characters.
 *
 * SASL extensions are optional an must be expressed as key-value pairs in an
 * object. Each expression is converted as, the extension entry key, followed
 * by "=", followed by extension entry value. Each extension is separated by a
 * US-ASCII SOH character. If extensions are not present, their relative part
 * in the message, including the US-ASCII SOH character, is omitted.
 *
 * The client may leave the authorization identity empty to
 * indicate that it is the same as the authentication identity.
 *
 * The server will verify the authentication token and verify that the
 * authentication credentials permit the client to login as the authorization
 * identity. If both steps succeed, the user is logged in.
 */

const Encoder = __webpack_require__(35)

const SEPARATOR = '\u0001' // SOH - Start Of Header ASCII

function formatExtensions(extensions) {
  let msg = ''

  if (extensions == null) {
    return msg
  }

  let prefix = ''
  for (const k in extensions) {
    msg += `${prefix}${k}=${extensions[k]}`
    prefix = SEPARATOR
  }

  return msg
}

module.exports = async ({ authorizationIdentity = null }, oauthBearerToken) => {
  const authzid = authorizationIdentity == null ? '' : `"a=${authorizationIdentity}`
  let ext = formatExtensions(oauthBearerToken.extensions)
  if (ext.length > 0) {
    ext = `${SEPARATOR}${ext}`
  }

  const oauthMsg = `n,${authzid},${SEPARATOR}auth=Bearer ${oauthBearerToken.value}${ext}${SEPARATOR}${SEPARATOR}`

  return {
    encode: async () => {
      return new Encoder().writeBytes(Buffer.from(oauthMsg))
    },
  }
}


/***/ }),
/* 329 */
/***/ ((module) => {

module.exports = {
  decode: async () => true,
  parse: async () => true,
}


/***/ }),
/* 330 */
/***/ ((module) => {

/**
 * @param {T[]} array
 * @returns T[]
 * @template T
 */
module.exports = array => {
  if (!Array.isArray(array)) {
    throw new TypeError("'array' is not an array")
  }

  if (array.length < 2) {
    return array
  }

  const copy = array.slice()

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]
    copy[i] = copy[j]
    copy[j] = temp
  }

  return copy
}


/***/ }),
/* 331 */
/***/ ((module) => {

/**
 * @template T
 * @param { (...args: any) => Promise<T> } [asyncFunction]
 * Promise returning function that will only ever be invoked sequentially.
 * @returns { (...args: any) => Promise<T> }
 * Function that may invoke asyncFunction if there is not a currently executing invocation.
 * Returns promise from the currently executing invocation.
 */
module.exports = asyncFunction => {
  let promise = null

  return (...args) => {
    if (promise == null) {
      promise = asyncFunction(...args).finally(() => (promise = null))
    }
    return promise
  }
}


/***/ }),
/* 332 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { KafkaJSNumberOfRetriesExceeded, KafkaJSNonRetriableError } = __webpack_require__(19)

const isTestMode = process.env.NODE_ENV === 'test'
const RETRY_DEFAULT = isTestMode ? __webpack_require__(333) : __webpack_require__(334)

const random = (min, max) => {
  return Math.random() * (max - min) + min
}

const randomFromRetryTime = (factor, retryTime) => {
  const delta = factor * retryTime
  return Math.ceil(random(retryTime - delta, retryTime + delta))
}

const UNRECOVERABLE_ERRORS = ['RangeError', 'ReferenceError', 'SyntaxError', 'TypeError']
const isErrorUnrecoverable = e => UNRECOVERABLE_ERRORS.includes(e.name)
const isErrorRetriable = error =>
  (error.retriable || error.retriable !== false) && !isErrorUnrecoverable(error)

const createRetriable = (configs, resolve, reject, fn) => {
  let aborted = false
  const { factor, multiplier, maxRetryTime, retries } = configs

  const bail = error => {
    aborted = true
    reject(error || new Error('Aborted'))
  }

  const calculateExponentialRetryTime = retryTime => {
    return Math.min(randomFromRetryTime(factor, retryTime) * multiplier, maxRetryTime)
  }

  const retry = (retryTime, retryCount = 0) => {
    if (aborted) return

    const nextRetryTime = calculateExponentialRetryTime(retryTime)
    const shouldRetry = retryCount < retries

    const scheduleRetry = () => {
      setTimeout(() => retry(nextRetryTime, retryCount + 1), retryTime)
    }

    fn(bail, retryCount, retryTime)
      .then(resolve)
      .catch(e => {
        if (isErrorRetriable(e)) {
          if (shouldRetry) {
            scheduleRetry()
          } else {
            reject(new KafkaJSNumberOfRetriesExceeded(e, { retryCount, retryTime }))
          }
        } else {
          reject(new KafkaJSNonRetriableError(e))
        }
      })
  }

  return retry
}

/**
 * @typedef {(fn: (bail: (err: Error) => void, retryCount: number, retryTime: number) => any) => Promise<ReturnType<fn>>} Retrier
 */

/**
 * @param {import("../../types").RetryOptions} [opts]
 * @returns {Retrier}
 */
module.exports = (opts = {}) => fn => {
  return new Promise((resolve, reject) => {
    const configs = Object.assign({}, RETRY_DEFAULT, opts)
    const start = createRetriable(configs, resolve, reject, fn)
    start(randomFromRetryTime(configs.factor, configs.initialRetryTime))
  })
}


/***/ }),
/* 333 */
/***/ ((module) => {

module.exports = {
  maxRetryTime: 1000,
  initialRetryTime: 50,
  factor: 0.02, // randomization factor
  multiplier: 1.5, // exponential factor
  retries: 15, // max retries
}


/***/ }),
/* 334 */
/***/ ((module) => {

module.exports = {
  maxRetryTime: 30 * 1000,
  initialRetryTime: 300,
  factor: 0.2, // randomization factor
  multiplier: 2, // exponential factor
  retries: 5, // max retries
}


/***/ }),
/* 335 */
/***/ ((module) => {

module.exports = (a, b) => {
  const result = []
  const length = a.length
  let i = 0

  while (i < length) {
    if (b.indexOf(a[i]) === -1) {
      result.push(a[i])
    }
    i += 1
  }

  return result
}


/***/ }),
/* 336 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Connection = __webpack_require__(337)
const { KafkaJSConnectionError, KafkaJSNonRetriableError } = __webpack_require__(19)

/**
 * @typedef {Object} ConnectionBuilder
 * @property {(destination?: { host?: string, port?: number, rack?: string }) => Promise<Connection>} build
 */

/**
 * @param {Object} options
 * @param {import("../../types").ISocketFactory} [options.socketFactory]
 * @param {string[]|(() => string[])} options.brokers
 * @param {Object} [options.ssl]
 * @param {Object} [options.sasl]
 * @param {string} options.clientId
 * @param {number} options.requestTimeout
 * @param {boolean} [options.enforceRequestTimeout]
 * @param {number} [options.connectionTimeout]
 * @param {number} [options.maxInFlightRequests]
 * @param {import("../../types").RetryOptions} [options.retry]
 * @param {import("../../types").Logger} options.logger
 * @param {import("../instrumentation/emitter")} [options.instrumentationEmitter]
 * @returns {ConnectionBuilder}
 */
module.exports = ({
  socketFactory,
  brokers,
  ssl,
  sasl,
  clientId,
  requestTimeout,
  enforceRequestTimeout,
  connectionTimeout,
  maxInFlightRequests,
  logger,
  instrumentationEmitter = null,
}) => {
  let index = 0

  const isValidBroker = broker => {
    return broker && typeof broker === 'string' && broker.length > 0
  }

  const validateBrokers = brokers => {
    if (!brokers) {
      throw new KafkaJSNonRetriableError(`Failed to connect: brokers should not be null`)
    }

    if (Array.isArray(brokers)) {
      if (!brokers.length) {
        throw new KafkaJSNonRetriableError(`Failed to connect: brokers array is empty`)
      }

      brokers.forEach((broker, index) => {
        if (!isValidBroker(broker)) {
          throw new KafkaJSNonRetriableError(
            `Failed to connect: broker at index ${index} is invalid "${typeof broker}"`
          )
        }
      })
    }
  }

  const getBrokers = async () => {
    let list

    if (typeof brokers === 'function') {
      try {
        list = await brokers()
      } catch (e) {
        const wrappedError = new KafkaJSConnectionError(
          `Failed to connect: "config.brokers" threw: ${e.message}`
        )
        wrappedError.stack = `${wrappedError.name}\n  Caused by: ${e.stack}`
        throw wrappedError
      }
    } else {
      list = brokers
    }

    validateBrokers(list)

    return list
  }

  return {
    build: async ({ host, port, rack } = {}) => {
      if (!host) {
        const list = await getBrokers()

        const randomBroker = list[index++ % list.length]

        host = randomBroker.split(':')[0]
        port = Number(randomBroker.split(':')[1])
      }

      return new Connection({
        host,
        port,
        rack,
        sasl,
        ssl,
        clientId,
        socketFactory,
        connectionTimeout,
        requestTimeout,
        enforceRequestTimeout,
        maxInFlightRequests,
        instrumentationEmitter,
        logger,
      })
    },
  }
}


/***/ }),
/* 337 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createSocket = __webpack_require__(338)
const createRequest = __webpack_require__(339)
const Decoder = __webpack_require__(42)
const { KafkaJSConnectionError, KafkaJSConnectionClosedError } = __webpack_require__(19)
const { INT_32_MAX_VALUE } = __webpack_require__(340)
const getEnv = __webpack_require__(341)
const RequestQueue = __webpack_require__(342)
const { CONNECTION_STATUS, CONNECTED_STATUS } = __webpack_require__(346)

const requestInfo = ({ apiName, apiKey, apiVersion }) =>
  `${apiName}(key: ${apiKey}, version: ${apiVersion})`

module.exports = class Connection {
  /**
   * @param {Object} options
   * @param {string} options.host
   * @param {number} options.port
   * @param {import("../../types").Logger} options.logger
   * @param {import("../../types").ISocketFactory} options.socketFactory
   * @param {string} [options.clientId='kafkajs']
   * @param {number} options.requestTimeout The maximum amount of time the client will wait for the response of a request,
   *                                in milliseconds
   * @param {string} [options.rack=null]
   * @param {Object} [options.ssl=null] Options for the TLS Secure Context. It accepts all options,
   *                            usually "cert", "key" and "ca". More information at
   *                            https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
   * @param {Object} [options.sasl=null] Attributes used for SASL authentication. Options based on the
   *                             key "mechanism". Connection is not actively using the SASL attributes
   *                             but acting as a data object for this information
   * @param {number} [options.connectionTimeout=1000] The connection timeout, in milliseconds
   * @param {boolean} [options.enforceRequestTimeout]
   * @param {number} [options.maxInFlightRequests=null] The maximum number of unacknowledged requests on a connection before
   *                                            enqueuing
   * @param {import("../instrumentation/emitter")} [options.instrumentationEmitter=null]
   */
  constructor({
    host,
    port,
    logger,
    socketFactory,
    requestTimeout,
    rack = null,
    ssl = null,
    sasl = null,
    clientId = 'kafkajs',
    connectionTimeout = 1000,
    enforceRequestTimeout = false,
    maxInFlightRequests = null,
    instrumentationEmitter = null,
  }) {
    this.host = host
    this.port = port
    this.rack = rack
    this.clientId = clientId
    this.broker = `${this.host}:${this.port}`
    this.logger = logger.namespace('Connection')

    this.socketFactory = socketFactory
    this.ssl = ssl
    this.sasl = sasl

    this.requestTimeout = requestTimeout
    this.connectionTimeout = connectionTimeout

    this.bytesBuffered = 0
    this.bytesNeeded = Decoder.int32Size()
    this.chunks = []

    this.connectionStatus = CONNECTION_STATUS.DISCONNECTED
    this.correlationId = 0
    this.requestQueue = new RequestQueue({
      instrumentationEmitter,
      maxInFlightRequests,
      requestTimeout,
      enforceRequestTimeout,
      clientId,
      broker: this.broker,
      logger: logger.namespace('RequestQueue'),
      isConnected: () => this.connected,
    })

    this.authHandlers = null
    this.authExpectResponse = false

    const log = level => (message, extra = {}) => {
      const logFn = this.logger[level]
      logFn(message, { broker: this.broker, clientId, ...extra })
    }

    this.logDebug = log('debug')
    this.logError = log('error')

    const env = getEnv()
    this.shouldLogBuffers = env.KAFKAJS_DEBUG_PROTOCOL_BUFFERS === '1'
    this.shouldLogFetchBuffer =
      this.shouldLogBuffers && env.KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS === '1'
  }

  get connected() {
    return CONNECTED_STATUS.includes(this.connectionStatus)
  }

  /**
   * @public
   * @returns {Promise}
   */
  connect() {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        return resolve(true)
      }

      let timeoutId

      const onConnect = () => {
        clearTimeout(timeoutId)
        this.connectionStatus = CONNECTION_STATUS.CONNECTED
        this.requestQueue.scheduleRequestTimeoutCheck()
        resolve(true)
      }

      const onData = data => {
        this.processData(data)
      }

      const onEnd = async () => {
        clearTimeout(timeoutId)

        const wasConnected = this.connected

        if (this.authHandlers) {
          this.authHandlers.onError()
        } else if (wasConnected) {
          this.logDebug('Kafka server has closed connection')
          this.rejectRequests(
            new KafkaJSConnectionClosedError('Closed connection', {
              host: this.host,
              port: this.port,
            })
          )
        }

        await this.disconnect()
      }

      const onError = async e => {
        clearTimeout(timeoutId)

        const error = new KafkaJSConnectionError(`Connection error: ${e.message}`, {
          broker: `${this.host}:${this.port}`,
          code: e.code,
        })

        this.logError(error.message, { stack: e.stack })
        this.rejectRequests(error)
        await this.disconnect()

        reject(error)
      }

      const onTimeout = async () => {
        const error = new KafkaJSConnectionError('Connection timeout', {
          broker: `${this.host}:${this.port}`,
        })

        this.logError(error.message)
        this.rejectRequests(error)
        await this.disconnect()
        reject(error)
      }

      this.logDebug(`Connecting`, {
        ssl: !!this.ssl,
        sasl: !!this.sasl,
      })

      try {
        timeoutId = setTimeout(onTimeout, this.connectionTimeout)
        this.socket = createSocket({
          socketFactory: this.socketFactory,
          host: this.host,
          port: this.port,
          ssl: this.ssl,
          onConnect,
          onData,
          onEnd,
          onError,
          onTimeout,
        })
      } catch (e) {
        clearTimeout(timeoutId)
        reject(
          new KafkaJSConnectionError(`Failed to connect: ${e.message}`, {
            broker: `${this.host}:${this.port}`,
          })
        )
      }
    })
  }

  /**
   * @public
   * @returns {Promise}
   */
  async disconnect() {
    this.connectionStatus = CONNECTION_STATUS.DISCONNECTING
    this.logDebug('disconnecting...')

    await this.requestQueue.waitForPendingRequests()
    this.requestQueue.destroy()

    if (this.socket) {
      this.socket.end()
      this.socket.unref()
    }

    this.connectionStatus = CONNECTION_STATUS.DISCONNECTED
    this.logDebug('disconnected')
    return true
  }

  /**
   * @public
   * @returns {Promise}
   */
  authenticate({ authExpectResponse = false, request, response }) {
    this.authExpectResponse = authExpectResponse

    /**
     * TODO: rewrite removing the async promise executor
     */

    /* eslint-disable no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
      this.authHandlers = {
        onSuccess: rawData => {
          this.authHandlers = null
          this.authExpectResponse = false

          response
            .decode(rawData)
            .then(data => response.parse(data))
            .then(resolve)
            .catch(reject)
        },
        onError: () => {
          this.authHandlers = null
          this.authExpectResponse = false

          reject(
            new KafkaJSConnectionError('Connection closed by the server', {
              broker: `${this.host}:${this.port}`,
            })
          )
        },
      }

      try {
        const requestPayload = await request.encode()

        this.failIfNotConnected()
        this.socket.write(requestPayload.buffer, 'binary')
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * @public
   * @param {object} protocol
   * @param {object} protocol.request It is defined by the protocol and consists of an object with "apiKey",
   *                         "apiVersion", "apiName" and an "encode" function. The encode function
   *                         must return an instance of Encoder
   *
   * @param {object} protocol.response It is defined by the protocol and consists of an object with two functions:
   *                          "decode" and "parse"
   *
   * @param {number} [protocol.requestTimeout=null] Override for the default requestTimeout
   * @param {boolean} [protocol.logResponseError=true] Whether to log errors
   * @returns {Promise<data>} where data is the return of "response#parse"
   */
  async send({ request, response, requestTimeout = null, logResponseError = true }) {
    this.failIfNotConnected()

    const expectResponse = !request.expectResponse || request.expectResponse()
    const sendRequest = async () => {
      const { clientId } = this
      const correlationId = this.nextCorrelationId()

      const requestPayload = await createRequest({ request, correlationId, clientId })
      const { apiKey, apiName, apiVersion } = request
      this.logDebug(`Request ${requestInfo(request)}`, {
        correlationId,
        expectResponse,
        size: Buffer.byteLength(requestPayload.buffer),
      })

      return new Promise((resolve, reject) => {
        try {
          this.failIfNotConnected()
          const entry = { apiKey, apiName, apiVersion, correlationId, resolve, reject }

          this.requestQueue.push({
            entry,
            expectResponse,
            requestTimeout,
            sendRequest: () => {
              this.socket.write(requestPayload.buffer, 'binary')
            },
          })
        } catch (e) {
          reject(e)
        }
      })
    }

    const { correlationId, size, entry, payload } = await sendRequest()

    if (!expectResponse) {
      return
    }

    try {
      const payloadDecoded = await response.decode(payload)

      /**
       * @see KIP-219
       * If the response indicates that the client-side needs to throttle, do that.
       */
      this.requestQueue.maybeThrottle(payloadDecoded.clientSideThrottleTime)

      const data = await response.parse(payloadDecoded)
      const isFetchApi = entry.apiName === 'Fetch'
      this.logDebug(`Response ${requestInfo(entry)}`, {
        correlationId,
        size,
        data: isFetchApi && !this.shouldLogFetchBuffer ? '[filtered]' : data,
      })

      return data
    } catch (e) {
      if (logResponseError) {
        this.logError(`Response ${requestInfo(entry)}`, {
          error: e.message,
          correlationId,
          size,
        })
      }

      const isBuffer = Buffer.isBuffer(payload)
      this.logDebug(`Response ${requestInfo(entry)}`, {
        error: e.message,
        correlationId,
        payload:
          isBuffer && !this.shouldLogBuffers ? { type: 'Buffer', data: '[filtered]' } : payload,
      })

      throw e
    }
  }

  /**
   * @private
   */
  failIfNotConnected() {
    if (!this.connected) {
      throw new KafkaJSConnectionError('Not connected', {
        broker: `${this.host}:${this.port}`,
      })
    }
  }

  /**
   * @private
   */
  nextCorrelationId() {
    if (this.correlationId >= INT_32_MAX_VALUE) {
      this.correlationId = 0
    }

    return this.correlationId++
  }

  /**
   * @private
   */
  processData(rawData) {
    if (this.authHandlers && !this.authExpectResponse) {
      return this.authHandlers.onSuccess(rawData)
    }

    // Accumulate the new chunk
    this.chunks.push(rawData)
    this.bytesBuffered += Buffer.byteLength(rawData)

    // Process data if there are enough bytes to read the expected response size,
    // otherwise keep buffering
    while (this.bytesNeeded <= this.bytesBuffered) {
      const buffer = this.chunks.length > 1 ? Buffer.concat(this.chunks) : this.chunks[0]
      const decoder = new Decoder(buffer)
      const expectedResponseSize = decoder.readInt32()

      // Return early if not enough bytes to read the full response
      if (!decoder.canReadBytes(expectedResponseSize)) {
        this.chunks = [buffer]
        this.bytesBuffered = Buffer.byteLength(buffer)
        this.bytesNeeded = Decoder.int32Size() + expectedResponseSize
        return
      }

      const response = new Decoder(decoder.readBytes(expectedResponseSize))

      // Reset the buffered chunks as the rest of the bytes
      const remainderBuffer = decoder.readAll()
      this.chunks = [remainderBuffer]
      this.bytesBuffered = Buffer.byteLength(remainderBuffer)
      this.bytesNeeded = Decoder.int32Size()

      if (this.authHandlers) {
        const rawResponseSize = Decoder.int32Size() + expectedResponseSize
        const rawResponseBuffer = buffer.slice(0, rawResponseSize)
        return this.authHandlers.onSuccess(rawResponseBuffer)
      }

      const correlationId = response.readInt32()
      const payload = response.readAll()

      this.requestQueue.fulfillRequest({
        size: expectedResponseSize,
        correlationId,
        payload,
      })
    }
  }

  /**
   * @private
   */
  rejectRequests(error) {
    this.requestQueue.rejectAll(error)
  }
}


/***/ }),
/* 338 */
/***/ ((module) => {

/**
 * @param {Object} options
 * @param {import("../../types").ISocketFactory} options.socketFactory
 * @param {string} options.host
 * @param {number} options.port
 * @param {Object} options.ssl
 * @param {() => void} options.onConnect
 * @param {(data: Buffer) => void} options.onData
 * @param {() => void} options.onEnd
 * @param {(err: Error) => void} options.onError
 * @param {() => void} options.onTimeout
 */
module.exports = ({
  socketFactory,
  host,
  port,
  ssl,
  onConnect,
  onData,
  onEnd,
  onError,
  onTimeout,
}) => {
  const socket = socketFactory({ host, port, ssl, onConnect })

  socket.on('data', onData)
  socket.on('end', onEnd)
  socket.on('error', onError)
  socket.on('timeout', onTimeout)

  return socket
}


/***/ }),
/* 339 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)

module.exports = async ({ correlationId, clientId, request: { apiKey, apiVersion, encode } }) => {
  const payload = await encode()
  const requestPayload = new Encoder()
    .writeInt16(apiKey)
    .writeInt16(apiVersion)
    .writeInt32(correlationId)
    .writeString(clientId)
    .writeEncoder(payload)

  return new Encoder().writeInt32(requestPayload.size()).writeEncoder(requestPayload)
}


/***/ }),
/* 340 */
/***/ ((module) => {

const EARLIEST_OFFSET = -2
const LATEST_OFFSET = -1
const INT_32_MAX_VALUE = Math.pow(2, 32)

module.exports = {
  EARLIEST_OFFSET,
  LATEST_OFFSET,
  INT_32_MAX_VALUE,
}


/***/ }),
/* 341 */
/***/ ((module) => {

module.exports = () => ({
  KAFKAJS_DEBUG_PROTOCOL_BUFFERS: process.env.KAFKAJS_DEBUG_PROTOCOL_BUFFERS,
  KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS: process.env.KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS,
})


/***/ }),
/* 342 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { EventEmitter } = __webpack_require__(17)
const SocketRequest = __webpack_require__(343)
const events = __webpack_require__(344)
const { KafkaJSInvariantViolation } = __webpack_require__(19)

const PRIVATE = {
  EMIT_QUEUE_SIZE_EVENT: Symbol('private:RequestQueue:emitQueueSizeEvent'),
  EMIT_REQUEST_QUEUE_EMPTY: Symbol('private:RequestQueue:emitQueueEmpty'),
}

const REQUEST_QUEUE_EMPTY = 'requestQueueEmpty'

module.exports = class RequestQueue extends EventEmitter {
  /**
   * @param {Object} options
   * @param {number} options.maxInFlightRequests
   * @param {number} options.requestTimeout
   * @param {boolean} options.enforceRequestTimeout
   * @param {string} options.clientId
   * @param {string} options.broker
   * @param {import("../../../types").Logger} options.logger
   * @param {import("../../instrumentation/emitter")} [options.instrumentationEmitter=null]
   * @param {() => boolean} [options.isConnected]
   */
  constructor({
    instrumentationEmitter = null,
    maxInFlightRequests,
    requestTimeout,
    enforceRequestTimeout,
    clientId,
    broker,
    logger,
    isConnected = () => true,
  }) {
    super()
    this.instrumentationEmitter = instrumentationEmitter
    this.maxInFlightRequests = maxInFlightRequests
    this.requestTimeout = requestTimeout
    this.enforceRequestTimeout = enforceRequestTimeout
    this.clientId = clientId
    this.broker = broker
    this.logger = logger
    this.isConnected = isConnected

    this.inflight = new Map()
    this.pending = []

    /**
     * Until when this request queue is throttled and shouldn't send requests
     *
     * The value represents the timestamp of the end of the throttling in ms-since-epoch. If the value
     * is smaller than the current timestamp no throttling is active.
     *
     * @type {number}
     */
    this.throttledUntil = -1

    /**
     * Timeout id if we have scheduled a check for pending requests due to client-side throttling
     *
     * @type {null|NodeJS.Timeout}
     */
    this.throttleCheckTimeoutId = null

    this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY] = () => {
      if (this.pending.length === 0 && this.inflight.size === 0) {
        this.emit(REQUEST_QUEUE_EMPTY)
      }
    }

    this[PRIVATE.EMIT_QUEUE_SIZE_EVENT] = () => {
      instrumentationEmitter &&
        instrumentationEmitter.emit(events.NETWORK_REQUEST_QUEUE_SIZE, {
          broker: this.broker,
          clientId: this.clientId,
          queueSize: this.pending.length,
        })

      this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]()
    }
  }

  /**
   * @public
   */
  scheduleRequestTimeoutCheck() {
    if (this.enforceRequestTimeout) {
      this.destroy()

      this.requestTimeoutIntervalId = setInterval(() => {
        this.inflight.forEach(request => {
          if (Date.now() - request.sentAt > request.requestTimeout) {
            request.timeoutRequest()
          }
        })

        if (!this.isConnected()) {
          this.destroy()
        }
      }, Math.min(this.requestTimeout, 100))
    }
  }

  maybeThrottle(clientSideThrottleTime) {
    if (clientSideThrottleTime) {
      const minimumThrottledUntil = Date.now() + clientSideThrottleTime
      this.throttledUntil = Math.max(minimumThrottledUntil, this.throttledUntil)
    }
  }

  /**
   * @typedef {Object} PushedRequest
   * @property {import("./socketRequest").RequestEntry} entry
   * @property {boolean} expectResponse
   * @property {Function} sendRequest
   * @property {number} [requestTimeout]
   *
   * @public
   * @param {PushedRequest} pushedRequest
   */
  push(pushedRequest) {
    const { correlationId } = pushedRequest.entry
    const defaultRequestTimeout = this.requestTimeout
    const customRequestTimeout = pushedRequest.requestTimeout

    // Some protocol requests have custom request timeouts (e.g JoinGroup, Fetch, etc). The custom
    // timeouts are influenced by user configurations, which can be lower than the default requestTimeout
    const requestTimeout = Math.max(defaultRequestTimeout, customRequestTimeout || 0)

    const socketRequest = new SocketRequest({
      entry: pushedRequest.entry,
      expectResponse: pushedRequest.expectResponse,
      broker: this.broker,
      clientId: this.clientId,
      instrumentationEmitter: this.instrumentationEmitter,
      requestTimeout,
      send: () => {
        if (this.inflight.has(correlationId)) {
          throw new KafkaJSInvariantViolation('Correlation id already exists')
        }
        this.inflight.set(correlationId, socketRequest)
        pushedRequest.sendRequest()
      },
      timeout: () => {
        this.inflight.delete(correlationId)
        this.checkPendingRequests()
        // Try to emit REQUEST_QUEUE_EMPTY. Otherwise, waitForPendingRequests may stuck forever
        this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]()
      },
    })

    if (this.canSendSocketRequestImmediately()) {
      this.sendSocketRequest(socketRequest)
      return
    }

    this.pending.push(socketRequest)
    this.scheduleCheckPendingRequests()

    this.logger.debug(`Request enqueued`, {
      clientId: this.clientId,
      broker: this.broker,
      correlationId,
    })

    this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]()
  }

  /**
   * @param {SocketRequest} socketRequest
   */
  sendSocketRequest(socketRequest) {
    socketRequest.send()

    if (!socketRequest.expectResponse) {
      this.logger.debug(`Request does not expect a response, resolving immediately`, {
        clientId: this.clientId,
        broker: this.broker,
        correlationId: socketRequest.correlationId,
      })

      this.inflight.delete(socketRequest.correlationId)
      socketRequest.completed({ size: 0, payload: null })
    }
  }

  /**
   * @public
   * @param {object} response
   * @param {number} response.correlationId
   * @param {Buffer} response.payload
   * @param {number} response.size
   */
  fulfillRequest({ correlationId, payload, size }) {
    const socketRequest = this.inflight.get(correlationId)
    this.inflight.delete(correlationId)
    this.checkPendingRequests()

    if (socketRequest) {
      socketRequest.completed({ size, payload })
    } else {
      this.logger.warn(`Response without match`, {
        clientId: this.clientId,
        broker: this.broker,
        correlationId,
      })
    }

    this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]()
  }

  /**
   * @public
   * @param {Error} error
   */
  rejectAll(error) {
    const requests = [...this.inflight.values(), ...this.pending]

    for (const socketRequest of requests) {
      socketRequest.rejected(error)
      this.inflight.delete(socketRequest.correlationId)
    }

    this.pending = []
    this.inflight.clear()
    this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]()
  }

  /**
   * @public
   */
  waitForPendingRequests() {
    return new Promise(resolve => {
      if (this.pending.length === 0 && this.inflight.size === 0) {
        return resolve()
      }

      this.logger.debug('Waiting for pending requests', {
        clientId: this.clientId,
        broker: this.broker,
        currentInflightRequests: this.inflight.size,
        currentPendingQueueSize: this.pending.length,
      })

      this.once(REQUEST_QUEUE_EMPTY, () => resolve())
    })
  }

  /**
   * @public
   */
  destroy() {
    clearInterval(this.requestTimeoutIntervalId)
    clearTimeout(this.throttleCheckTimeoutId)
    this.throttleCheckTimeoutId = null
  }

  canSendSocketRequestImmediately() {
    const shouldEnqueue =
      (this.maxInFlightRequests != null && this.inflight.size >= this.maxInFlightRequests) ||
      this.throttledUntil > Date.now()

    return !shouldEnqueue
  }

  /**
   * Check and process pending requests either now or in the future
   *
   * This function will send out as many pending requests as possible taking throttling and
   * in-flight limits into account.
   */
  checkPendingRequests() {
    while (this.pending.length > 0 && this.canSendSocketRequestImmediately()) {
      const pendingRequest = this.pending.shift() // first in first out
      this.sendSocketRequest(pendingRequest)

      this.logger.debug(`Consumed pending request`, {
        clientId: this.clientId,
        broker: this.broker,
        correlationId: pendingRequest.correlationId,
        pendingDuration: pendingRequest.pendingDuration,
        currentPendingQueueSize: this.pending.length,
      })

      this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]()
    }

    this.scheduleCheckPendingRequests()
  }

  /**
   * Ensure that pending requests will be checked in the future
   *
   * If there is a client-side throttling in place this will ensure that we will check
   * the pending request queue eventually.
   */
  scheduleCheckPendingRequests() {
    // If we're throttled: Schedule checkPendingRequests when the throttle
    // should be resolved. If there is already something scheduled we assume that that
    // will be fine, and potentially fix up a new timeout if needed at that time.
    // Note that if we're merely "overloaded" by having too many inflight requests
    // we will anyways check the queue when one of them gets fulfilled.
    const timeUntilUnthrottled = this.throttledUntil - Date.now()
    if (timeUntilUnthrottled > 0 && !this.throttleCheckTimeoutId) {
      this.throttleCheckTimeoutId = setTimeout(() => {
        this.throttleCheckTimeoutId = null
        this.checkPendingRequests()
      }, timeUntilUnthrottled)
    }
  }
}


/***/ }),
/* 343 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { KafkaJSRequestTimeoutError, KafkaJSNonRetriableError } = __webpack_require__(19)
const events = __webpack_require__(344)

const PRIVATE = {
  STATE: Symbol('private:SocketRequest:state'),
  EMIT_EVENT: Symbol('private:SocketRequest:emitEvent'),
}

const REQUEST_STATE = {
  PENDING: Symbol('PENDING'),
  SENT: Symbol('SENT'),
  COMPLETED: Symbol('COMPLETED'),
  REJECTED: Symbol('REJECTED'),
}

/**
 * SocketRequest abstracts the life cycle of a socket request, making it easier to track
 * request durations and to have individual timeouts per request.
 *
 * @typedef {Object} SocketRequest
 * @property {number} createdAt
 * @property {number} sentAt
 * @property {number} pendingDuration
 * @property {number} duration
 * @property {number} requestTimeout
 * @property {string} broker
 * @property {string} clientId
 * @property {RequestEntry} entry
 * @property {boolean} expectResponse
 * @property {Function} send
 * @property {Function} timeout
 *
 * @typedef {Object} RequestEntry
 * @property {string} apiKey
 * @property {string} apiName
 * @property {number} apiVersion
 * @property {number} correlationId
 * @property {Function} resolve
 * @property {Function} reject
 */
module.exports = class SocketRequest {
  /**
   * @param {Object} options
   * @param {number} options.requestTimeout
   * @param {string} options.broker - e.g: 127.0.0.1:9092
   * @param {string} options.clientId
   * @param {RequestEntry} options.entry
   * @param {boolean} options.expectResponse
   * @param {Function} options.send
   * @param {() => void} options.timeout
   * @param {import("../../instrumentation/emitter")} [options.instrumentationEmitter=null]
   */
  constructor({
    requestTimeout,
    broker,
    clientId,
    entry,
    expectResponse,
    send,
    timeout,
    instrumentationEmitter = null,
  }) {
    this.createdAt = Date.now()
    this.requestTimeout = requestTimeout
    this.broker = broker
    this.clientId = clientId
    this.entry = entry
    this.correlationId = entry.correlationId
    this.expectResponse = expectResponse
    this.sendRequest = send
    this.timeoutHandler = timeout

    this.sentAt = null
    this.duration = null
    this.pendingDuration = null

    this[PRIVATE.STATE] = REQUEST_STATE.PENDING
    this[PRIVATE.EMIT_EVENT] = (eventName, payload) =>
      instrumentationEmitter && instrumentationEmitter.emit(eventName, payload)
  }

  send() {
    this.throwIfInvalidState({
      accepted: [REQUEST_STATE.PENDING],
      next: REQUEST_STATE.SENT,
    })

    this.sendRequest()
    this.sentAt = Date.now()
    this.pendingDuration = this.sentAt - this.createdAt
    this[PRIVATE.STATE] = REQUEST_STATE.SENT
  }

  timeoutRequest() {
    const { apiName, apiKey, apiVersion } = this.entry
    const requestInfo = `${apiName}(key: ${apiKey}, version: ${apiVersion})`
    const eventData = {
      broker: this.broker,
      clientId: this.clientId,
      correlationId: this.correlationId,
      createdAt: this.createdAt,
      sentAt: this.sentAt,
      pendingDuration: this.pendingDuration,
    }

    this.timeoutHandler()
    this.rejected(new KafkaJSRequestTimeoutError(`Request ${requestInfo} timed out`, eventData))
    this[PRIVATE.EMIT_EVENT](events.NETWORK_REQUEST_TIMEOUT, {
      ...eventData,
      apiName,
      apiKey,
      apiVersion,
    })
  }

  completed({ size, payload }) {
    this.throwIfInvalidState({
      accepted: [REQUEST_STATE.SENT],
      next: REQUEST_STATE.COMPLETED,
    })

    const { entry, correlationId, broker, clientId, createdAt, sentAt, pendingDuration } = this

    this[PRIVATE.STATE] = REQUEST_STATE.COMPLETED
    this.duration = Date.now() - this.sentAt
    entry.resolve({ correlationId, entry, size, payload })

    this[PRIVATE.EMIT_EVENT](events.NETWORK_REQUEST, {
      broker,
      clientId,
      correlationId,
      size,
      createdAt,
      sentAt,
      pendingDuration,
      duration: this.duration,
      apiName: entry.apiName,
      apiKey: entry.apiKey,
      apiVersion: entry.apiVersion,
    })
  }

  rejected(error) {
    this.throwIfInvalidState({
      accepted: [REQUEST_STATE.PENDING, REQUEST_STATE.SENT],
      next: REQUEST_STATE.REJECTED,
    })

    this[PRIVATE.STATE] = REQUEST_STATE.REJECTED
    this.duration = Date.now() - this.sentAt
    this.entry.reject(error)
  }

  /**
   * @private
   */
  throwIfInvalidState({ accepted, next }) {
    if (accepted.includes(this[PRIVATE.STATE])) {
      return
    }

    const current = this[PRIVATE.STATE].toString()

    throw new KafkaJSNonRetriableError(
      `Invalid state, can't transition from ${current} to ${next.toString()}`
    )
  }
}


/***/ }),
/* 344 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const InstrumentationEventType = __webpack_require__(345)
const eventType = InstrumentationEventType('network')

module.exports = {
  NETWORK_REQUEST: eventType('request'),
  NETWORK_REQUEST_TIMEOUT: eventType('request_timeout'),
  NETWORK_REQUEST_QUEUE_SIZE: eventType('request_queue_size'),
}


/***/ }),
/* 345 */
/***/ ((module) => {

module.exports = namespace => type => `${namespace}.${type}`


/***/ }),
/* 346 */
/***/ ((module) => {

const CONNECTION_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTING: 'disconnecting',
  DISCONNECTED: 'disconnected',
}

const CONNECTED_STATUS = [CONNECTION_STATUS.CONNECTED, CONNECTION_STATUS.DISCONNECTING]

module.exports = {
  CONNECTION_STATUS,
  CONNECTED_STATUS,
}


/***/ }),
/* 347 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createRetry = __webpack_require__(332)
const { CONNECTION_STATUS } = __webpack_require__(346)
const { DefaultPartitioner } = __webpack_require__(348)
const InstrumentationEventEmitter = __webpack_require__(16)
const createEosManager = __webpack_require__(355)
const createMessageProducer = __webpack_require__(359)
const { events, wrap: wrapEvent, unwrap: unwrapEvent } = __webpack_require__(364)
const { KafkaJSNonRetriableError } = __webpack_require__(19)

const { values, keys } = Object
const eventNames = values(events)
const eventKeys = keys(events)
  .map(key => `producer.events.${key}`)
  .join(', ')

const { CONNECT, DISCONNECT } = events

/**
 *
 * @param {Object} params
 * @param {import('../../types').Cluster} params.cluster
 * @param {import('../../types').Logger} params.logger
 * @param {import('../../types').ICustomPartitioner} [params.createPartitioner]
 * @param {import('../../types').RetryOptions} [params.retry]
 * @param {boolean} [params.idempotent]
 * @param {string} [params.transactionalId]
 * @param {number} [params.transactionTimeout]
 * @param {InstrumentationEventEmitter} [params.instrumentationEmitter]
 *
 * @returns {import('../../types').Producer}
 */
module.exports = ({
  cluster,
  logger: rootLogger,
  createPartitioner = DefaultPartitioner,
  retry,
  idempotent = false,
  transactionalId,
  transactionTimeout,
  instrumentationEmitter: rootInstrumentationEmitter,
}) => {
  let connectionStatus = CONNECTION_STATUS.DISCONNECTED
  retry = retry || { retries: idempotent ? Number.MAX_SAFE_INTEGER : 5 }

  if (idempotent && retry.retries < 1) {
    throw new KafkaJSNonRetriableError(
      'Idempotent producer must allow retries to protect against transient errors'
    )
  }

  const logger = rootLogger.namespace('Producer')

  if (idempotent && retry.retries < Number.MAX_SAFE_INTEGER) {
    logger.warn('Limiting retries for the idempotent producer may invalidate EoS guarantees')
  }

  const partitioner = createPartitioner()
  const retrier = createRetry(Object.assign({}, cluster.retry, retry))
  const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter()
  const idempotentEosManager = createEosManager({
    logger,
    cluster,
    transactionTimeout,
    transactional: false,
    transactionalId,
  })

  const { send, sendBatch } = createMessageProducer({
    logger,
    cluster,
    partitioner,
    eosManager: idempotentEosManager,
    idempotent,
    retrier,
    getConnectionStatus: () => connectionStatus,
  })

  let transactionalEosManager

  /** @type {import("../../types").Producer["on"]} */
  const on = (eventName, listener) => {
    if (!eventNames.includes(eventName)) {
      throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`)
    }

    return instrumentationEmitter.addListener(unwrapEvent(eventName), event => {
      event.type = wrapEvent(event.type)
      Promise.resolve(listener(event)).catch(e => {
        logger.error(`Failed to execute listener: ${e.message}`, {
          eventName,
          stack: e.stack,
        })
      })
    })
  }

  /**
   * Begin a transaction. The returned object contains methods to send messages
   * to the transaction and end the transaction by committing or aborting.
   *
   * Only messages sent on the transaction object will participate in the transaction.
   *
   * Calling any of the transactional methods after the transaction has ended
   * will raise an exception (use `isActive` to ascertain if ended).
   * @returns {Promise<Transaction>}
   *
   * @typedef {Object} Transaction
   * @property {Function} send  Identical to the producer "send" method
   * @property {Function} sendBatch Identical to the producer "sendBatch" method
   * @property {Function} abort Abort the transaction
   * @property {Function} commit  Commit the transaction
   * @property {Function} isActive  Whether the transaction is active
   */
  const transaction = async () => {
    if (!transactionalId) {
      throw new KafkaJSNonRetriableError('Must provide transactional id for transactional producer')
    }

    let transactionDidEnd = false
    transactionalEosManager =
      transactionalEosManager ||
      createEosManager({
        logger,
        cluster,
        transactionTimeout,
        transactional: true,
        transactionalId,
      })

    if (transactionalEosManager.isInTransaction()) {
      throw new KafkaJSNonRetriableError(
        'There is already an ongoing transaction for this producer. Please end the transaction before beginning another.'
      )
    }

    // We only initialize the producer id once
    if (!transactionalEosManager.isInitialized()) {
      await transactionalEosManager.initProducerId()
    }
    transactionalEosManager.beginTransaction()

    const { send: sendTxn, sendBatch: sendBatchTxn } = createMessageProducer({
      logger,
      cluster,
      partitioner,
      retrier,
      eosManager: transactionalEosManager,
      idempotent: true,
      getConnectionStatus: () => connectionStatus,
    })

    const isActive = () => transactionalEosManager.isInTransaction() && !transactionDidEnd

    const transactionGuard = fn => (...args) => {
      if (!isActive()) {
        return Promise.reject(
          new KafkaJSNonRetriableError('Cannot continue to use transaction once ended')
        )
      }

      return fn(...args)
    }

    return {
      sendBatch: transactionGuard(sendBatchTxn),
      send: transactionGuard(sendTxn),
      /**
       * Abort the ongoing transaction.
       *
       * @throws {KafkaJSNonRetriableError} If transaction has ended
       */
      abort: transactionGuard(async () => {
        await transactionalEosManager.abort()
        transactionDidEnd = true
      }),
      /**
       * Commit the ongoing transaction.
       *
       * @throws {KafkaJSNonRetriableError} If transaction has ended
       */
      commit: transactionGuard(async () => {
        await transactionalEosManager.commit()
        transactionDidEnd = true
      }),
      /**
       * Sends a list of specified offsets to the consumer group coordinator, and also marks those offsets as part of the current transaction.
       *
       * @throws {KafkaJSNonRetriableError} If transaction has ended
       */
      sendOffsets: transactionGuard(async ({ consumerGroupId, topics }) => {
        await transactionalEosManager.sendOffsets({ consumerGroupId, topics })

        for (const topicOffsets of topics) {
          const { topic, partitions } = topicOffsets
          for (const { partition, offset } of partitions) {
            cluster.markOffsetAsCommitted({
              groupId: consumerGroupId,
              topic,
              partition,
              offset,
            })
          }
        }
      }),
      isActive,
    }
  }

  /**
   * @returns {Object} logger
   */
  const getLogger = () => logger

  return {
    /**
     * @returns {Promise}
     */
    connect: async () => {
      await cluster.connect()
      connectionStatus = CONNECTION_STATUS.CONNECTED
      instrumentationEmitter.emit(CONNECT)

      if (idempotent && !idempotentEosManager.isInitialized()) {
        await idempotentEosManager.initProducerId()
      }
    },
    /**
     * @return {Promise}
     */
    disconnect: async () => {
      connectionStatus = CONNECTION_STATUS.DISCONNECTING
      await cluster.disconnect()
      connectionStatus = CONNECTION_STATUS.DISCONNECTED
      instrumentationEmitter.emit(DISCONNECT)
    },
    isIdempotent: () => {
      return idempotent
    },
    events,
    on,
    send,
    sendBatch,
    transaction,
    logger: getLogger,
  }
}


/***/ }),
/* 348 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const DefaultPartitioner = __webpack_require__(349)
const JavaCompatiblePartitioner = __webpack_require__(353)

module.exports = {
  DefaultPartitioner,
  JavaCompatiblePartitioner,
}


/***/ }),
/* 349 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const murmur2 = __webpack_require__(350)
const createDefaultPartitioner = __webpack_require__(351)

module.exports = createDefaultPartitioner(murmur2)


/***/ }),
/* 350 */
/***/ ((module) => {

/* eslint-disable */

// Based on the kafka client 0.10.2 murmur2 implementation
// https://github.com/apache/kafka/blob/0.10.2/clients/src/main/java/org/apache/kafka/common/utils/Utils.java#L364

const SEED = 0x9747b28c

// 'm' and 'r' are mixing constants generated offline.
// They're not really 'magic', they just happen to work well.
const M = 0x5bd1e995
const R = 24

module.exports = key => {
  const data = Buffer.isBuffer(key) ? key : Buffer.from(String(key))
  const length = data.length

  // Initialize the hash to a random value
  let h = SEED ^ length
  let length4 = length / 4

  for (let i = 0; i < length4; i++) {
    const i4 = i * 4
    let k =
      (data[i4 + 0] & 0xff) +
      ((data[i4 + 1] & 0xff) << 8) +
      ((data[i4 + 2] & 0xff) << 16) +
      ((data[i4 + 3] & 0xff) << 24)
    k *= M
    k ^= k >>> R
    k *= M
    h *= M
    h ^= k
  }

  // Handle the last few bytes of the input array
  switch (length % 4) {
    case 3:
      h ^= (data[(length & ~3) + 2] & 0xff) << 16
    case 2:
      h ^= (data[(length & ~3) + 1] & 0xff) << 8
    case 1:
      h ^= data[length & ~3] & 0xff
      h *= M
  }

  h ^= h >>> 13
  h *= M
  h ^= h >>> 15

  return h
}


/***/ }),
/* 351 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const randomBytes = __webpack_require__(352)

// Based on the java client 0.10.2
// https://github.com/apache/kafka/blob/0.10.2/clients/src/main/java/org/apache/kafka/clients/producer/internals/DefaultPartitioner.java

/**
 * A cheap way to deterministically convert a number to a positive value. When the input is
 * positive, the original value is returned. When the input number is negative, the returned
 * positive value is the original value bit AND against 0x7fffffff which is not its absolutely
 * value.
 */
const toPositive = x => x & 0x7fffffff

/**
 * The default partitioning strategy:
 *  - If a partition is specified in the message, use it
 *  - If no partition is specified but a key is present choose a partition based on a hash of the key
 *  - If no partition or key is present choose a partition in a round-robin fashion
 */
module.exports = murmur2 => () => {
  const counters = {}

  return ({ topic, partitionMetadata, message }) => {
    if (!(topic in counters)) {
      counters[topic] = randomBytes(32).readUInt32BE(0)
    }
    const numPartitions = partitionMetadata.length
    const availablePartitions = partitionMetadata.filter(p => p.leader >= 0)
    const numAvailablePartitions = availablePartitions.length

    if (message.partition !== null && message.partition !== undefined) {
      return message.partition
    }

    if (message.key !== null && message.key !== undefined) {
      return toPositive(murmur2(message.key)) % numPartitions
    }

    if (numAvailablePartitions > 0) {
      const i = toPositive(++counters[topic]) % numAvailablePartitions
      return availablePartitions[i].partitionId
    }

    // no partitions are available, give a non-available partition
    return toPositive(++counters[topic]) % numPartitions
  }
}


/***/ }),
/* 352 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { KafkaJSNonRetriableError } = __webpack_require__(19)

const toNodeCompatible = crypto => ({
  randomBytes: size => crypto.getRandomValues(Buffer.allocUnsafe(size)),
})

let cryptoImplementation = null
if (global && global.crypto) {
  cryptoImplementation =
    global.crypto.randomBytes === undefined ? toNodeCompatible(global.crypto) : global.crypto
} else if (global && global.msCrypto) {
  cryptoImplementation = toNodeCompatible(global.msCrypto)
} else if (global && !global.crypto) {
  cryptoImplementation = __webpack_require__(315)
}

const MAX_BYTES = 65536

module.exports = size => {
  if (size > MAX_BYTES) {
    throw new KafkaJSNonRetriableError(
      `Byte length (${size}) exceeds the max number of bytes of entropy available (${MAX_BYTES})`
    )
  }

  if (!cryptoImplementation) {
    throw new KafkaJSNonRetriableError('No available crypto implementation')
  }

  return cryptoImplementation.randomBytes(size)
}


/***/ }),
/* 353 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const murmur2 = __webpack_require__(354)
const createDefaultPartitioner = __webpack_require__(351)

module.exports = createDefaultPartitioner(murmur2)


/***/ }),
/* 354 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable */
const Long = __webpack_require__(25)

// Based on the kafka client 0.10.2 murmur2 implementation
// https://github.com/apache/kafka/blob/0.10.2/clients/src/main/java/org/apache/kafka/common/utils/Utils.java#L364

const SEED = Long.fromValue(0x9747b28c)

// 'm' and 'r' are mixing constants generated offline.
// They're not really 'magic', they just happen to work well.
const M = Long.fromValue(0x5bd1e995)
const R = Long.fromValue(24)

module.exports = key => {
  const data = Buffer.isBuffer(key) ? key : Buffer.from(String(key))
  const length = data.length

  // Initialize the hash to a random value
  let h = Long.fromValue(SEED.xor(length))
  let length4 = Math.floor(length / 4)

  for (let i = 0; i < length4; i++) {
    const i4 = i * 4
    let k =
      (data[i4 + 0] & 0xff) +
      ((data[i4 + 1] & 0xff) << 8) +
      ((data[i4 + 2] & 0xff) << 16) +
      ((data[i4 + 3] & 0xff) << 24)
    k = Long.fromValue(k)
    k = k.multiply(M)
    k = k.xor(k.toInt() >>> R)
    k = Long.fromValue(k).multiply(M)
    h = h.multiply(M)
    h = h.xor(k)
  }

  // Handle the last few bytes of the input array
  switch (length % 4) {
    case 3:
      h = h.xor((data[(length & ~3) + 2] & 0xff) << 16)
    case 2:
      h = h.xor((data[(length & ~3) + 1] & 0xff) << 8)
    case 1:
      h = h.xor(data[length & ~3] & 0xff)
      h = h.multiply(M)
  }

  h = h.xor(h.toInt() >>> 13)
  h = h.multiply(M)
  h = h.xor(h.toInt() >>> 15)

  return h.toInt()
}


/***/ }),
/* 355 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createRetry = __webpack_require__(332)
const { KafkaJSNonRetriableError } = __webpack_require__(19)
const COORDINATOR_TYPES = __webpack_require__(147)
const createStateMachine = __webpack_require__(356)
const assert = __webpack_require__(358)

const STATES = __webpack_require__(357)
const NO_PRODUCER_ID = -1
const SEQUENCE_START = 0
const INT_32_MAX_VALUE = Math.pow(2, 32)
const INIT_PRODUCER_RETRIABLE_PROTOCOL_ERRORS = [
  'NOT_COORDINATOR_FOR_GROUP',
  'GROUP_COORDINATOR_NOT_AVAILABLE',
  'GROUP_LOAD_IN_PROGRESS',
  /**
   * The producer might have crashed and never committed the transaction; retry the
   * request so Kafka can abort the current transaction
   * @see https://github.com/apache/kafka/blob/201da0542726472d954080d54bc585b111aaf86f/clients/src/main/java/org/apache/kafka/clients/producer/internals/TransactionManager.java#L1001-L1002
   */
  'CONCURRENT_TRANSACTIONS',
]
const COMMIT_RETRIABLE_PROTOCOL_ERRORS = [
  'UNKNOWN_TOPIC_OR_PARTITION',
  'COORDINATOR_LOAD_IN_PROGRESS',
]
const COMMIT_STALE_COORDINATOR_PROTOCOL_ERRORS = ['COORDINATOR_NOT_AVAILABLE', 'NOT_COORDINATOR']

/**
 * @typedef {Object} EosManager
 */

/**
 * Manage behavior for an idempotent producer and transactions.
 *
 * @returns {EosManager}
 */
module.exports = ({
  logger,
  cluster,
  transactionTimeout = 60000,
  transactional,
  transactionalId,
}) => {
  if (transactional && !transactionalId) {
    throw new KafkaJSNonRetriableError('Cannot manage transactions without a transactionalId')
  }

  const retrier = createRetry(cluster.retry)

  /**
   * Current producer ID
   */
  let producerId = NO_PRODUCER_ID

  /**
   * Current producer epoch
   */
  let producerEpoch = 0

  /**
   * Idempotent production requires that the producer track the sequence number of messages.
   *
   * Sequences are sent with every Record Batch and tracked per Topic-Partition
   */
  let producerSequence = {}

  /**
   * Topic partitions already participating in the transaction
   */
  let transactionTopicPartitions = {}

  const stateMachine = createStateMachine({ logger })
  stateMachine.on('transition', ({ to }) => {
    if (to === STATES.READY) {
      transactionTopicPartitions = {}
    }
  })

  const findTransactionCoordinator = () => {
    return cluster.findGroupCoordinator({
      groupId: transactionalId,
      coordinatorType: COORDINATOR_TYPES.TRANSACTION,
    })
  }

  const transactionalGuard = () => {
    if (!transactional) {
      throw new KafkaJSNonRetriableError('Method unavailable if non-transactional')
    }
  }

  const eosManager = stateMachine.createGuarded(
    {
      /**
       * Get the current producer id
       * @returns {number}
       */
      getProducerId() {
        return producerId
      },

      /**
       * Get the current producer epoch
       * @returns {number}
       */
      getProducerEpoch() {
        return producerEpoch
      },

      getTransactionalId() {
        return transactionalId
      },

      /**
       * Initialize the idempotent producer by making an `InitProducerId` request.
       * Overwrites any existing state in this transaction manager
       */
      async initProducerId() {
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadataIfNecessary()

            // If non-transactional we can request the PID from any broker
            const broker = await (transactional
              ? findTransactionCoordinator()
              : cluster.findControllerBroker())

            const result = await broker.initProducerId({
              transactionalId: transactional ? transactionalId : undefined,
              transactionTimeout,
            })

            stateMachine.transitionTo(STATES.READY)
            producerId = result.producerId
            producerEpoch = result.producerEpoch
            producerSequence = {}

            logger.debug('Initialized producer id & epoch', { producerId, producerEpoch })
          } catch (e) {
            if (INIT_PRODUCER_RETRIABLE_PROTOCOL_ERRORS.includes(e.type)) {
              if (e.type === 'CONCURRENT_TRANSACTIONS') {
                logger.debug('There is an ongoing transaction on this transactionId, retrying', {
                  error: e.message,
                  stack: e.stack,
                  transactionalId,
                  retryCount,
                  retryTime,
                })
              }

              throw e
            }

            bail(e)
          }
        })
      },

      /**
       * Get the current sequence for a given Topic-Partition. Defaults to 0.
       *
       * @param {string} topic
       * @param {string} partition
       * @returns {number}
       */
      getSequence(topic, partition) {
        if (!eosManager.isInitialized()) {
          return SEQUENCE_START
        }

        producerSequence[topic] = producerSequence[topic] || {}
        producerSequence[topic][partition] = producerSequence[topic][partition] || SEQUENCE_START

        return producerSequence[topic][partition]
      },

      /**
       * Update the sequence for a given Topic-Partition.
       *
       * Do nothing if not yet initialized (not idempotent)
       * @param {string} topic
       * @param {string} partition
       * @param {number} increment
       */
      updateSequence(topic, partition, increment) {
        if (!eosManager.isInitialized()) {
          return
        }

        const previous = eosManager.getSequence(topic, partition)
        let sequence = previous + increment

        // Sequence is defined as Int32 in the Record Batch,
        // so theoretically should need to rotate here
        if (sequence >= INT_32_MAX_VALUE) {
          logger.debug(
            `Sequence for ${topic} ${partition} exceeds max value (${sequence}). Rotating to 0.`
          )
          sequence = 0
        }

        producerSequence[topic][partition] = sequence
      },

      /**
       * Begin a transaction
       */
      beginTransaction() {
        transactionalGuard()
        stateMachine.transitionTo(STATES.TRANSACTING)
      },

      /**
       * Add partitions to a transaction if they are not already marked as participating.
       *
       * Should be called prior to sending any messages during a transaction
       * @param {TopicData[]} topicData
       *
       * @typedef {Object} TopicData
       * @property {string} topic
       * @property {object[]} partitions
       * @property {number} partitions[].partition
       */
      async addPartitionsToTransaction(topicData) {
        transactionalGuard()
        const newTopicPartitions = {}

        topicData.forEach(({ topic, partitions }) => {
          transactionTopicPartitions[topic] = transactionTopicPartitions[topic] || {}

          partitions.forEach(({ partition }) => {
            if (!transactionTopicPartitions[topic][partition]) {
              newTopicPartitions[topic] = newTopicPartitions[topic] || []
              newTopicPartitions[topic].push(partition)
            }
          })
        })

        const topics = Object.keys(newTopicPartitions).map(topic => ({
          topic,
          partitions: newTopicPartitions[topic],
        }))

        if (topics.length) {
          const broker = await findTransactionCoordinator()
          await broker.addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics })
        }

        topics.forEach(({ topic, partitions }) => {
          partitions.forEach(partition => {
            transactionTopicPartitions[topic][partition] = true
          })
        })
      },

      /**
       * Commit the ongoing transaction
       */
      async commit() {
        transactionalGuard()
        stateMachine.transitionTo(STATES.COMMITTING)

        const broker = await findTransactionCoordinator()
        await broker.endTxn({
          producerId,
          producerEpoch,
          transactionalId,
          transactionResult: true,
        })

        stateMachine.transitionTo(STATES.READY)
      },

      /**
       * Abort the ongoing transaction
       */
      async abort() {
        transactionalGuard()
        stateMachine.transitionTo(STATES.ABORTING)

        const broker = await findTransactionCoordinator()
        await broker.endTxn({
          producerId,
          producerEpoch,
          transactionalId,
          transactionResult: false,
        })

        stateMachine.transitionTo(STATES.READY)
      },

      /**
       * Whether the producer id has already been initialized
       */
      isInitialized() {
        return producerId !== NO_PRODUCER_ID
      },

      isTransactional() {
        return transactional
      },

      isInTransaction() {
        return stateMachine.state() === STATES.TRANSACTING
      },

      /**
       * Mark the provided offsets as participating in the transaction for the given consumer group.
       *
       * This allows us to commit an offset as consumed only if the transaction passes.
       * @param {string} consumerGroupId The unique group identifier
       * @param {OffsetCommitTopic[]} topics The unique group identifier
       * @returns {Promise}
       *
       * @typedef {Object} OffsetCommitTopic
       * @property {string} topic
       * @property {OffsetCommitTopicPartition[]} partitions
       *
       * @typedef {Object} OffsetCommitTopicPartition
       * @property {number} partition
       * @property {number} offset
       */
      async sendOffsets({ consumerGroupId, topics }) {
        assert(consumerGroupId, 'Missing consumerGroupId')
        assert(topics, 'Missing offset topics')

        const transactionCoordinator = await findTransactionCoordinator()

        // Do we need to add offsets if we've already done so for this consumer group?
        await transactionCoordinator.addOffsetsToTxn({
          transactionalId,
          producerId,
          producerEpoch,
          groupId: consumerGroupId,
        })

        let groupCoordinator = await cluster.findGroupCoordinator({
          groupId: consumerGroupId,
          coordinatorType: COORDINATOR_TYPES.GROUP,
        })

        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await groupCoordinator.txnOffsetCommit({
              transactionalId,
              producerId,
              producerEpoch,
              groupId: consumerGroupId,
              topics,
            })
          } catch (e) {
            if (COMMIT_RETRIABLE_PROTOCOL_ERRORS.includes(e.type)) {
              logger.debug('Group coordinator is not ready yet, retrying', {
                error: e.message,
                stack: e.stack,
                transactionalId,
                retryCount,
                retryTime,
              })

              throw e
            }

            if (
              COMMIT_STALE_COORDINATOR_PROTOCOL_ERRORS.includes(e.type) ||
              e.code === 'ECONNREFUSED'
            ) {
              logger.debug(
                'Invalid group coordinator, finding new group coordinator and retrying',
                {
                  error: e.message,
                  stack: e.stack,
                  transactionalId,
                  retryCount,
                  retryTime,
                }
              )

              groupCoordinator = await cluster.findGroupCoordinator({
                groupId: consumerGroupId,
                coordinatorType: COORDINATOR_TYPES.GROUP,
              })

              throw e
            }

            bail(e)
          }
        })
      },
    },

    /**
     * Transaction state guards
     */
    {
      initProducerId: { legalStates: [STATES.UNINITIALIZED, STATES.READY] },
      beginTransaction: { legalStates: [STATES.READY], async: false },
      addPartitionsToTransaction: { legalStates: [STATES.TRANSACTING] },
      sendOffsets: { legalStates: [STATES.TRANSACTING] },
      commit: { legalStates: [STATES.TRANSACTING] },
      abort: { legalStates: [STATES.TRANSACTING] },
    }
  )

  return eosManager
}


/***/ }),
/* 356 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { EventEmitter } = __webpack_require__(17)
const { KafkaJSNonRetriableError } = __webpack_require__(19)
const STATES = __webpack_require__(357)

const VALID_STATE_TRANSITIONS = {
  [STATES.UNINITIALIZED]: [STATES.READY],
  [STATES.READY]: [STATES.READY, STATES.TRANSACTING],
  [STATES.TRANSACTING]: [STATES.COMMITTING, STATES.ABORTING],
  [STATES.COMMITTING]: [STATES.READY],
  [STATES.ABORTING]: [STATES.READY],
}

module.exports = ({ logger, initialState = STATES.UNINITIALIZED }) => {
  let currentState = initialState

  const guard = (object, method, { legalStates, async: isAsync = true }) => {
    if (!object[method]) {
      throw new KafkaJSNonRetriableError(`Cannot add guard on missing method "${method}"`)
    }

    return (...args) => {
      const fn = object[method]

      if (!legalStates.includes(currentState)) {
        const error = new KafkaJSNonRetriableError(
          `Transaction state exception: Cannot call "${method}" in state "${currentState}"`
        )

        if (isAsync) {
          return Promise.reject(error)
        } else {
          throw error
        }
      }

      return fn.apply(object, args)
    }
  }

  const stateMachine = Object.assign(new EventEmitter(), {
    /**
     * Create a clone of "object" where we ensure state machine is in correct state
     * prior to calling any of the configured methods
     * @param {Object} object The object whose methods we will guard
     * @param {Object} methodStateMapping Keys are method names on "object"
     * @param {string[]} methodStateMapping.legalStates Legal states for this method
     * @param {boolean=true} methodStateMapping.async Whether this method is async (throw vs reject)
     */
    createGuarded(object, methodStateMapping) {
      const guardedMethods = Object.keys(methodStateMapping).reduce((guards, method) => {
        guards[method] = guard(object, method, methodStateMapping[method])
        return guards
      }, {})

      return { ...object, ...guardedMethods }
    },
    /**
     * Transition safely to a new state
     */
    transitionTo(state) {
      logger.debug(`Transaction state transition ${currentState} --> ${state}`)

      if (!VALID_STATE_TRANSITIONS[currentState].includes(state)) {
        throw new KafkaJSNonRetriableError(
          `Transaction state exception: Invalid transition ${currentState} --> ${state}`
        )
      }

      stateMachine.emit('transition', { to: state, from: currentState })
      currentState = state
    },

    state() {
      return currentState
    },
  })

  return stateMachine
}


/***/ }),
/* 357 */
/***/ ((module) => {

module.exports = {
  UNINITIALIZED: 'UNINITIALIZED',
  READY: 'READY',
  TRANSACTING: 'TRANSACTING',
  COMMITTING: 'COMMITTING',
  ABORTING: 'ABORTING',
}


/***/ }),
/* 358 */
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),
/* 359 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createSendMessages = __webpack_require__(360)
const { KafkaJSError, KafkaJSNonRetriableError } = __webpack_require__(19)
const { CONNECTION_STATUS } = __webpack_require__(346)

module.exports = ({
  logger,
  cluster,
  partitioner,
  eosManager,
  idempotent,
  retrier,
  getConnectionStatus,
}) => {
  const sendMessages = createSendMessages({
    logger,
    cluster,
    retrier,
    partitioner,
    eosManager,
  })

  const validateConnectionStatus = () => {
    const connectionStatus = getConnectionStatus()

    switch (connectionStatus) {
      case CONNECTION_STATUS.DISCONNECTING:
        throw new KafkaJSNonRetriableError(
          `The producer is disconnecting; therefore, it can't safely accept messages anymore`
        )
      case CONNECTION_STATUS.DISCONNECTED:
        throw new KafkaJSError('The producer is disconnected')
    }
  }

  /**
   * @typedef {Object} TopicMessages
   * @property {string} topic
   * @property {Array} messages An array of objects with "key" and "value", example:
   *                         [{ key: 'my-key', value: 'my-value'}]
   *
   * @typedef {Object} SendBatchRequest
   * @property {Array<TopicMessages>} topicMessages
   * @property {number} [acks=-1] Control the number of required acks.
   *                           -1 = all replicas must acknowledge
   *                            0 = no acknowledgments
   *                            1 = only waits for the leader to acknowledge
   *
   * @property {number} [timeout=30000] The time to await a response in ms
   * @property {Compression.Types} [compression=Compression.Types.None] Compression codec
   *
   * @param {SendBatchRequest}
   * @returns {Promise}
   */
  const sendBatch = async ({ acks = -1, timeout, compression, topicMessages = [] }) => {
    if (topicMessages.some(({ topic }) => !topic)) {
      throw new KafkaJSNonRetriableError(`Invalid topic`)
    }

    if (idempotent && acks !== -1) {
      throw new KafkaJSNonRetriableError(
        `Not requiring ack for all messages invalidates the idempotent producer's EoS guarantees`
      )
    }

    for (const { topic, messages } of topicMessages) {
      if (!messages) {
        throw new KafkaJSNonRetriableError(
          `Invalid messages array [${messages}] for topic "${topic}"`
        )
      }

      const messageWithoutValue = messages.find(message => message.value === undefined)
      if (messageWithoutValue) {
        throw new KafkaJSNonRetriableError(
          `Invalid message without value for topic "${topic}": ${JSON.stringify(
            messageWithoutValue
          )}`
        )
      }
    }

    validateConnectionStatus()
    const mergedTopicMessages = topicMessages.reduce((merged, { topic, messages }) => {
      const index = merged.findIndex(({ topic: mergedTopic }) => topic === mergedTopic)

      if (index === -1) {
        merged.push({ topic, messages })
      } else {
        merged[index].messages = [...merged[index].messages, ...messages]
      }

      return merged
    }, [])

    return await sendMessages({
      acks,
      timeout,
      compression,
      topicMessages: mergedTopicMessages,
    })
  }

  /**
   * @param {ProduceRequest} ProduceRequest
   * @returns {Promise}
   *
   * @typedef {Object} ProduceRequest
   * @property {string} topic
   * @property {Array} messages An array of objects with "key" and "value", example:
   *                         [{ key: 'my-key', value: 'my-value'}]
   * @property {number} [acks=-1] Control the number of required acks.
   *                           -1 = all replicas must acknowledge
   *                            0 = no acknowledgments
   *                            1 = only waits for the leader to acknowledge
   * @property {number} [timeout=30000] The time to await a response in ms
   * @property {Compression.Types} [compression=Compression.Types.None] Compression codec
   */
  const send = async ({ acks, timeout, compression, topic, messages }) => {
    const topicMessage = { topic, messages }
    return sendBatch({
      acks,
      timeout,
      compression,
      topicMessages: [topicMessage],
    })
  }

  return {
    send,
    sendBatch,
  }
}


/***/ }),
/* 360 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const flatten = __webpack_require__(45)
const { KafkaJSMetadataNotLoaded } = __webpack_require__(19)
const { staleMetadata } = __webpack_require__(43)
const groupMessagesPerPartition = __webpack_require__(361)
const createTopicData = __webpack_require__(362)
const responseSerializer = __webpack_require__(363)

const { keys } = Object

/**
 * @param {Object} options
 * @param {import("../../types").Logger} options.logger
 * @param {import("../../types").Cluster} options.cluster
 * @param {ReturnType<import("../../types").ICustomPartitioner>} options.partitioner
 * @param {import("./eosManager").EosManager} options.eosManager
 * @param {import("../retry").Retrier} options.retrier
 */
module.exports = ({ logger, cluster, partitioner, eosManager, retrier }) => {
  return async ({ acks, timeout, compression, topicMessages }) => {
    /** @type {Map<import("../../types").Broker, any[]>} */
    const responsePerBroker = new Map()

    /** @param {Map<import("../../types").Broker, any[]>} responsePerBroker */
    const createProducerRequests = async responsePerBroker => {
      const topicMetadata = new Map()

      await cluster.refreshMetadataIfNecessary()

      for (const { topic, messages } of topicMessages) {
        const partitionMetadata = cluster.findTopicPartitionMetadata(topic)

        if (partitionMetadata.length === 0) {
          logger.debug('Producing to topic without metadata', {
            topic,
            targetTopics: Array.from(cluster.targetTopics),
          })

          throw new KafkaJSMetadataNotLoaded('Producing to topic without metadata')
        }

        const messagesPerPartition = groupMessagesPerPartition({
          topic,
          partitionMetadata,
          messages,
          partitioner,
        })

        const partitions = keys(messagesPerPartition)
        const sequencePerPartition = partitions.reduce((result, partition) => {
          result[partition] = eosManager.getSequence(topic, partition)
          return result
        }, {})

        const partitionsPerLeader = cluster.findLeaderForPartitions(topic, partitions)
        const leaders = keys(partitionsPerLeader)

        topicMetadata.set(topic, {
          partitionsPerLeader,
          messagesPerPartition,
          sequencePerPartition,
        })

        for (const nodeId of leaders) {
          const broker = await cluster.findBroker({ nodeId })
          if (!responsePerBroker.has(broker)) {
            responsePerBroker.set(broker, null)
          }
        }
      }

      const brokers = Array.from(responsePerBroker.keys())
      const brokersWithoutResponse = brokers.filter(broker => !responsePerBroker.get(broker))

      return brokersWithoutResponse.map(async broker => {
        const entries = Array.from(topicMetadata.entries())
        const topicDataForBroker = entries
          .filter(([_, { partitionsPerLeader }]) => !!partitionsPerLeader[broker.nodeId])
          .map(([topic, { partitionsPerLeader, messagesPerPartition, sequencePerPartition }]) => ({
            topic,
            partitions: partitionsPerLeader[broker.nodeId],
            sequencePerPartition,
            messagesPerPartition,
          }))

        const topicData = createTopicData(topicDataForBroker)

        try {
          if (eosManager.isTransactional()) {
            await eosManager.addPartitionsToTransaction(topicData)
          }

          const response = await broker.produce({
            transactionalId: eosManager.isTransactional()
              ? eosManager.getTransactionalId()
              : undefined,
            producerId: eosManager.getProducerId(),
            producerEpoch: eosManager.getProducerEpoch(),
            acks,
            timeout,
            compression,
            topicData,
          })

          const expectResponse = acks !== 0
          const formattedResponse = expectResponse ? responseSerializer(response) : []

          formattedResponse.forEach(({ topicName, partition }) => {
            const increment = topicMetadata.get(topicName).messagesPerPartition[partition].length

            eosManager.updateSequence(topicName, partition, increment)
          })

          responsePerBroker.set(broker, formattedResponse)
        } catch (e) {
          responsePerBroker.delete(broker)
          throw e
        }
      })
    }

    return retrier(async (bail, retryCount, retryTime) => {
      const topics = topicMessages.map(({ topic }) => topic)
      await cluster.addMultipleTargetTopics(topics)

      try {
        const requests = await createProducerRequests(responsePerBroker)
        await Promise.all(requests)
        const responses = Array.from(responsePerBroker.values())
        return flatten(responses)
      } catch (e) {
        if (e.name === 'KafkaJSConnectionClosedError') {
          cluster.removeBroker({ host: e.host, port: e.port })
        }

        if (!cluster.isConnected()) {
          logger.debug(`Cluster has disconnected, reconnecting: ${e.message}`, {
            retryCount,
            retryTime,
          })
          await cluster.connect()
          await cluster.refreshMetadata()
          throw e
        }

        // This is necessary in case the metadata is stale and the number of partitions
        // for this topic has increased in the meantime
        if (
          staleMetadata(e) ||
          e.name === 'KafkaJSMetadataNotLoaded' ||
          e.name === 'KafkaJSConnectionError' ||
          e.name === 'KafkaJSConnectionClosedError' ||
          (e.name === 'KafkaJSProtocolError' && e.retriable)
        ) {
          logger.error(`Failed to send messages: ${e.message}`, { retryCount, retryTime })
          await cluster.refreshMetadata()
          throw e
        }

        logger.error(`${e.message}`, { retryCount, retryTime })
        if (e.retriable) throw e
        bail(e)
      }
    })
  }
}


/***/ }),
/* 361 */
/***/ ((module) => {

module.exports = ({ topic, partitionMetadata, messages, partitioner }) => {
  if (partitionMetadata.length === 0) {
    return {}
  }

  return messages.reduce((result, message) => {
    const partition = partitioner({ topic, partitionMetadata, message })
    const current = result[partition] || []
    return Object.assign(result, { [partition]: [...current, message] })
  }, {})
}


/***/ }),
/* 362 */
/***/ ((module) => {

module.exports = topicDataForBroker => {
  return topicDataForBroker.map(
    ({ topic, partitions, messagesPerPartition, sequencePerPartition }) => ({
      topic,
      partitions: partitions.map(partition => ({
        partition,
        firstSequence: sequencePerPartition[partition],
        messages: messagesPerPartition[partition],
      })),
    })
  )
}


/***/ }),
/* 363 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const flatten = __webpack_require__(45)

module.exports = ({ topics }) => {
  const partitions = topics.map(({ topicName, partitions }) =>
    partitions.map(partition => ({ topicName, ...partition }))
  )

  return flatten(partitions)
}


/***/ }),
/* 364 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const swapObject = __webpack_require__(365)
const networkEvents = __webpack_require__(344)
const InstrumentationEventType = __webpack_require__(345)
const producerType = InstrumentationEventType('producer')

const events = {
  CONNECT: producerType('connect'),
  DISCONNECT: producerType('disconnect'),
  REQUEST: producerType(networkEvents.NETWORK_REQUEST),
  REQUEST_TIMEOUT: producerType(networkEvents.NETWORK_REQUEST_TIMEOUT),
  REQUEST_QUEUE_SIZE: producerType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE),
}

const wrappedEvents = {
  [events.REQUEST]: networkEvents.NETWORK_REQUEST,
  [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
  [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE,
}

const reversedWrappedEvents = swapObject(wrappedEvents)
const unwrap = eventName => wrappedEvents[eventName] || eventName
const wrap = eventName => reversedWrappedEvents[eventName] || eventName

module.exports = {
  events,
  wrap,
  unwrap,
}


/***/ }),
/* 365 */
/***/ ((module) => {

const { keys } = Object
module.exports = object =>
  keys(object).reduce((result, key) => ({ ...result, [object[key]]: key }), {})


/***/ }),
/* 366 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const createRetry = __webpack_require__(332)
const { initialRetryTime } = __webpack_require__(334)
const ConsumerGroup = __webpack_require__(367)
const Runner = __webpack_require__(379)
const { events, wrap: wrapEvent, unwrap: unwrapEvent } = __webpack_require__(373)
const InstrumentationEventEmitter = __webpack_require__(16)
const { KafkaJSNonRetriableError } = __webpack_require__(19)
const { roundRobin } = __webpack_require__(382)
const { EARLIEST_OFFSET, LATEST_OFFSET } = __webpack_require__(340)
const ISOLATION_LEVEL = __webpack_require__(66)

const { keys, values } = Object
const { CONNECT, DISCONNECT, STOP, CRASH } = events

const eventNames = values(events)
const eventKeys = keys(events)
  .map(key => `consumer.events.${key}`)
  .join(', ')

const specialOffsets = [
  Long.fromValue(EARLIEST_OFFSET).toString(),
  Long.fromValue(LATEST_OFFSET).toString(),
]

/**
 * @param {Object} params
 * @param {import("../../types").Cluster} params.cluster
 * @param {String} params.groupId
 * @param {import('../../types').RetryOptions} [params.retry]
 * @param {import('../../types').Logger} params.logger
 * @param {import('../../types').PartitionAssigner[]} [params.partitionAssigners]
 * @param {number} [params.sessionTimeout]
 * @param {number} [params.rebalanceTimeout]
 * @param {number} [params.heartbeatInterval]
 * @param {number} [params.maxBytesPerPartition]
 * @param {number} [params.minBytes]
 * @param {number} [params.maxBytes]
 * @param {number} [params.maxWaitTimeInMs]
 * @param {number} [params.isolationLevel]
 * @param {string} [params.rackId]
 * @param {InstrumentationEventEmitter} [params.instrumentationEmitter]
 * @param {number} params.metadataMaxAge
 *
 * @returns {import("../../types").Consumer}
 */
module.exports = ({
  cluster,
  groupId,
  retry,
  logger: rootLogger,
  partitionAssigners = [roundRobin],
  sessionTimeout = 30000,
  rebalanceTimeout = 60000,
  heartbeatInterval = 3000,
  maxBytesPerPartition = 1048576, // 1MB
  minBytes = 1,
  maxBytes = 10485760, // 10MB
  maxWaitTimeInMs = 5000,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  rackId = '',
  instrumentationEmitter: rootInstrumentationEmitter,
  metadataMaxAge,
}) => {
  if (!groupId) {
    throw new KafkaJSNonRetriableError('Consumer groupId must be a non-empty string.')
  }

  const logger = rootLogger.namespace('Consumer')
  const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter()
  const assigners = partitionAssigners.map(createAssigner =>
    createAssigner({ groupId, logger, cluster })
  )

  const topics = {}
  let runner = null
  let consumerGroup = null

  if (heartbeatInterval >= sessionTimeout) {
    throw new KafkaJSNonRetriableError(
      `Consumer heartbeatInterval (${heartbeatInterval}) must be lower than sessionTimeout (${sessionTimeout}). It is recommended to set heartbeatInterval to approximately a third of the sessionTimeout.`
    )
  }

  const createConsumerGroup = ({ autoCommit, autoCommitInterval, autoCommitThreshold }) => {
    return new ConsumerGroup({
      logger: rootLogger,
      topics: keys(topics),
      topicConfigurations: topics,
      retry,
      cluster,
      groupId,
      assigners,
      sessionTimeout,
      rebalanceTimeout,
      maxBytesPerPartition,
      minBytes,
      maxBytes,
      maxWaitTimeInMs,
      instrumentationEmitter,
      autoCommit,
      autoCommitInterval,
      autoCommitThreshold,
      isolationLevel,
      rackId,
      metadataMaxAge,
    })
  }

  const createRunner = ({
    eachBatchAutoResolve,
    eachBatch,
    eachMessage,
    onCrash,
    autoCommit,
    partitionsConsumedConcurrently,
  }) => {
    return new Runner({
      autoCommit,
      logger: rootLogger,
      consumerGroup,
      instrumentationEmitter,
      eachBatchAutoResolve,
      eachBatch,
      eachMessage,
      heartbeatInterval,
      retry,
      onCrash,
      partitionsConsumedConcurrently,
    })
  }

  /** @type {import("../../types").Consumer["connect"]} */
  const connect = async () => {
    await cluster.connect()
    instrumentationEmitter.emit(CONNECT)
  }

  /** @type {import("../../types").Consumer["disconnect"]} */
  const disconnect = async () => {
    try {
      await stop()
      logger.debug('consumer has stopped, disconnecting', { groupId })
      await cluster.disconnect()
      instrumentationEmitter.emit(DISCONNECT)
    } catch (e) {
      logger.error(`Caught error when disconnecting the consumer: ${e.message}`, {
        stack: e.stack,
        groupId,
      })
      throw e
    }
  }

  /** @type {import("../../types").Consumer["stop"]} */
  const stop = async () => {
    try {
      if (runner) {
        await runner.stop()
        runner = null
        consumerGroup = null
        instrumentationEmitter.emit(STOP)
      }

      logger.info('Stopped', { groupId })
    } catch (e) {
      logger.error(`Caught error when stopping the consumer: ${e.message}`, {
        stack: e.stack,
        groupId,
      })

      throw e
    }
  }

  /** @type {import("../../types").Consumer["subscribe"]} */
  const subscribe = async ({ topic, fromBeginning = false }) => {
    if (consumerGroup) {
      throw new KafkaJSNonRetriableError('Cannot subscribe to topic while consumer is running')
    }

    if (!topic) {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    const isRegExp = topic instanceof RegExp
    if (typeof topic !== 'string' && !isRegExp) {
      throw new KafkaJSNonRetriableError(
        `Invalid topic ${topic} (${typeof topic}), the topic name has to be a String or a RegExp`
      )
    }

    const topicsToSubscribe = []
    if (isRegExp) {
      const topicRegExp = topic
      const metadata = await cluster.metadata()
      const matchedTopics = metadata.topicMetadata
        .map(({ topic: topicName }) => topicName)
        .filter(topicName => topicRegExp.test(topicName))

      logger.debug('Subscription based on RegExp', {
        groupId,
        topicRegExp: topicRegExp.toString(),
        matchedTopics,
      })

      topicsToSubscribe.push(...matchedTopics)
    } else {
      topicsToSubscribe.push(topic)
    }

    for (const t of topicsToSubscribe) {
      topics[t] = { fromBeginning }
    }

    await cluster.addMultipleTargetTopics(topicsToSubscribe)
  }

  /** @type {import("../../types").Consumer["run"]} */
  const run = async ({
    autoCommit = true,
    autoCommitInterval = null,
    autoCommitThreshold = null,
    eachBatchAutoResolve = true,
    partitionsConsumedConcurrently = 1,
    eachBatch = null,
    eachMessage = null,
  } = {}) => {
    if (consumerGroup) {
      logger.warn('consumer#run was called, but the consumer is already running', { groupId })
      return
    }

    consumerGroup = createConsumerGroup({
      autoCommit,
      autoCommitInterval,
      autoCommitThreshold,
    })

    const start = async onCrash => {
      logger.info('Starting', { groupId })
      runner = createRunner({
        autoCommit,
        eachBatchAutoResolve,
        eachBatch,
        eachMessage,
        onCrash,
        partitionsConsumedConcurrently,
      })

      await runner.start()
    }

    const restart = onCrash => {
      consumerGroup = createConsumerGroup({
        autoCommitInterval,
        autoCommitThreshold,
      })

      start(onCrash)
    }

    const onCrash = async e => {
      logger.error(`Crash: ${e.name}: ${e.message}`, {
        groupId,
        retryCount: e.retryCount,
        stack: e.stack,
      })

      if (e.name === 'KafkaJSConnectionClosedError') {
        cluster.removeBroker({ host: e.host, port: e.port })
      }

      await disconnect()

      const isErrorRetriable = e.name === 'KafkaJSNumberOfRetriesExceeded' || e.retriable === true
      const shouldRestart =
        isErrorRetriable &&
        (!retry ||
          !retry.restartOnFailure ||
          (await retry.restartOnFailure(e).catch(error => {
            logger.error(
              'Caught error when invoking user-provided "restartOnFailure" callback. Defaulting to restarting.',
              {
                error: error.message || error,
                originalError: e.message || e,
                groupId,
              }
            )

            return true
          })))

      instrumentationEmitter.emit(CRASH, {
        error: e,
        groupId,
        restart: shouldRestart,
      })

      if (shouldRestart) {
        const retryTime = e.retryTime || (retry && retry.initialRetryTime) || initialRetryTime
        logger.error(`Restarting the consumer in ${retryTime}ms`, {
          retryCount: e.retryCount,
          retryTime,
          groupId,
        })

        setTimeout(() => restart(onCrash), retryTime)
      }
    }

    await start(onCrash)
  }

  /** @type {import("../../types").Consumer["on"]} */
  const on = (eventName, listener) => {
    if (!eventNames.includes(eventName)) {
      throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`)
    }

    return instrumentationEmitter.addListener(unwrapEvent(eventName), event => {
      event.type = wrapEvent(event.type)
      Promise.resolve(listener(event)).catch(e => {
        logger.error(`Failed to execute listener: ${e.message}`, {
          eventName,
          stack: e.stack,
        })
      })
    })
  }

  /**
   * @type {import("../../types").Consumer["commitOffsets"]}
   * @param topicPartitions
   *   Example: [{ topic: 'topic-name', partition: 0, offset: '1', metadata: 'event-id-3' }]
   */
  const commitOffsets = async (topicPartitions = []) => {
    const commitsByTopic = topicPartitions.reduce(
      (payload, { topic, partition, offset, metadata = null }) => {
        if (!topic) {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
        }

        if (isNaN(partition)) {
          throw new KafkaJSNonRetriableError(
            `Invalid partition, expected a number received ${partition}`
          )
        }

        let commitOffset
        try {
          commitOffset = Long.fromValue(offset)
        } catch (_) {
          throw new KafkaJSNonRetriableError(`Invalid offset, expected a long received ${offset}`)
        }

        if (commitOffset.lessThan(0)) {
          throw new KafkaJSNonRetriableError('Offset must not be a negative number')
        }

        if (metadata !== null && typeof metadata !== 'string') {
          throw new KafkaJSNonRetriableError(
            `Invalid offset metadata, expected string or null, received ${metadata}`
          )
        }

        const topicCommits = payload[topic] || []

        topicCommits.push({ partition, offset: commitOffset, metadata })

        return { ...payload, [topic]: topicCommits }
      },
      {}
    )

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    const topics = Object.keys(commitsByTopic)

    return runner.commitOffsets({
      topics: topics.map(topic => {
        return {
          topic,
          partitions: commitsByTopic[topic],
        }
      }),
    })
  }

  /** @type {import("../../types").Consumer["seek"]} */
  const seek = ({ topic, partition, offset }) => {
    if (!topic) {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    if (isNaN(partition)) {
      throw new KafkaJSNonRetriableError(
        `Invalid partition, expected a number received ${partition}`
      )
    }

    let seekOffset
    try {
      seekOffset = Long.fromValue(offset)
    } catch (_) {
      throw new KafkaJSNonRetriableError(`Invalid offset, expected a long received ${offset}`)
    }

    if (seekOffset.lessThan(0) && !specialOffsets.includes(seekOffset.toString())) {
      throw new KafkaJSNonRetriableError('Offset must not be a negative number')
    }

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    consumerGroup.seek({ topic, partition, offset: seekOffset.toString() })
  }

  /** @type {import("../../types").Consumer["describeGroup"]} */
  const describeGroup = async () => {
    const coordinator = await cluster.findGroupCoordinator({ groupId })
    const retrier = createRetry(retry)
    return retrier(async () => {
      const { groups } = await coordinator.describeGroups({ groupIds: [groupId] })
      return groups.find(group => group.groupId === groupId)
    })
  }

  /**
   * @type {import("../../types").Consumer["pause"]}
   * @param topicPartitions
   *   Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  const pause = (topicPartitions = []) => {
    for (const topicPartition of topicPartitions) {
      if (!topicPartition || !topicPartition.topic) {
        throw new KafkaJSNonRetriableError(
          `Invalid topic ${(topicPartition && topicPartition.topic) || topicPartition}`
        )
      } else if (
        typeof topicPartition.partitions !== 'undefined' &&
        (!Array.isArray(topicPartition.partitions) || topicPartition.partitions.some(isNaN))
      ) {
        throw new KafkaJSNonRetriableError(
          `Array of valid partitions required to pause specific partitions instead of ${topicPartition.partitions}`
        )
      }
    }

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    consumerGroup.pause(topicPartitions)
  }

  /**
   * Returns the list of topic partitions paused on this consumer
   *
   * @type {import("../../types").Consumer["paused"]}
   */
  const paused = () => {
    if (!consumerGroup) {
      return []
    }

    return consumerGroup.paused()
  }

  /**
   * @type {import("../../types").Consumer["resume"]}
   * @param topicPartitions
   *  Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  const resume = (topicPartitions = []) => {
    for (const topicPartition of topicPartitions) {
      if (!topicPartition || !topicPartition.topic) {
        throw new KafkaJSNonRetriableError(
          `Invalid topic ${(topicPartition && topicPartition.topic) || topicPartition}`
        )
      } else if (
        typeof topicPartition.partitions !== 'undefined' &&
        (!Array.isArray(topicPartition.partitions) || topicPartition.partitions.some(isNaN))
      ) {
        throw new KafkaJSNonRetriableError(
          `Array of valid partitions required to resume specific partitions instead of ${topicPartition.partitions}`
        )
      }
    }

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    consumerGroup.resume(topicPartitions)
  }

  /**
   * @return {Object} logger
   */
  const getLogger = () => logger

  return {
    connect,
    disconnect,
    subscribe,
    stop,
    run,
    commitOffsets,
    seek,
    describeGroup,
    pause,
    paused,
    resume,
    on,
    events,
    logger: getLogger,
  }
}


/***/ }),
/* 367 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const flatten = __webpack_require__(45)
const sleep = __webpack_require__(368)
const BufferedAsyncIterator = __webpack_require__(369)
const websiteUrl = __webpack_require__(44)
const arrayDiff = __webpack_require__(335)
const createRetry = __webpack_require__(332)
const sharedPromiseTo = __webpack_require__(331)

const OffsetManager = __webpack_require__(370)
const Batch = __webpack_require__(374)
const SeekOffsets = __webpack_require__(376)
const SubscriptionState = __webpack_require__(377)
const {
  events: { GROUP_JOIN, HEARTBEAT, CONNECT, RECEIVED_UNSUBSCRIBED_TOPICS },
} = __webpack_require__(373)
const { MemberAssignment } = __webpack_require__(378)
const {
  KafkaJSError,
  KafkaJSNonRetriableError,
  KafkaJSStaleTopicMetadataAssignment,
} = __webpack_require__(19)

const { keys } = Object

const STALE_METADATA_ERRORS = [
  'LEADER_NOT_AVAILABLE',
  // Fetch before v9 uses NOT_LEADER_FOR_PARTITION
  'NOT_LEADER_FOR_PARTITION',
  // Fetch after v9 uses {FENCED,UNKNOWN}_LEADER_EPOCH
  'FENCED_LEADER_EPOCH',
  'UNKNOWN_LEADER_EPOCH',
  'UNKNOWN_TOPIC_OR_PARTITION',
]

const isRebalancing = e =>
  e.type === 'REBALANCE_IN_PROGRESS' || e.type === 'NOT_COORDINATOR_FOR_GROUP'

const PRIVATE = {
  JOIN: Symbol('private:ConsumerGroup:join'),
  SYNC: Symbol('private:ConsumerGroup:sync'),
  HEARTBEAT: Symbol('private:ConsumerGroup:heartbeat'),
  SHAREDHEARTBEAT: Symbol('private:ConsumerGroup:sharedHeartbeat'),
}

module.exports = class ConsumerGroup {
  constructor({
    retry,
    cluster,
    groupId,
    topics,
    topicConfigurations,
    logger,
    instrumentationEmitter,
    assigners,
    sessionTimeout,
    rebalanceTimeout,
    maxBytesPerPartition,
    minBytes,
    maxBytes,
    maxWaitTimeInMs,
    autoCommit,
    autoCommitInterval,
    autoCommitThreshold,
    isolationLevel,
    rackId,
    metadataMaxAge,
  }) {
    /** @type {import("../../types").Cluster} */
    this.cluster = cluster
    this.groupId = groupId
    this.topics = topics
    this.topicsSubscribed = topics
    this.topicConfigurations = topicConfigurations
    this.logger = logger.namespace('ConsumerGroup')
    this.instrumentationEmitter = instrumentationEmitter
    this.retrier = createRetry(Object.assign({}, retry))
    this.assigners = assigners
    this.sessionTimeout = sessionTimeout
    this.rebalanceTimeout = rebalanceTimeout
    this.maxBytesPerPartition = maxBytesPerPartition
    this.minBytes = minBytes
    this.maxBytes = maxBytes
    this.maxWaitTime = maxWaitTimeInMs
    this.autoCommit = autoCommit
    this.autoCommitInterval = autoCommitInterval
    this.autoCommitThreshold = autoCommitThreshold
    this.isolationLevel = isolationLevel
    this.rackId = rackId
    this.metadataMaxAge = metadataMaxAge

    this.seekOffset = new SeekOffsets()
    this.coordinator = null
    this.generationId = null
    this.leaderId = null
    this.memberId = null
    this.members = null
    this.groupProtocol = null

    this.partitionsPerSubscribedTopic = null
    /**
     * Preferred read replica per topic and partition
     *
     * Each of the partitions tracks the preferred read replica (`nodeId`) and a timestamp
     * until when that preference is valid.
     *
     * @type {{[topicName: string]: {[partition: number]: {nodeId: number, expireAt: number}}}}
     */
    this.preferredReadReplicasPerTopicPartition = {}
    this.offsetManager = null
    this.subscriptionState = new SubscriptionState()

    this.lastRequest = Date.now()

    this[PRIVATE.SHAREDHEARTBEAT] = sharedPromiseTo(async ({ interval }) => {
      const { groupId, generationId, memberId } = this
      const now = Date.now()

      if (memberId && now >= this.lastRequest + interval) {
        const payload = {
          groupId,
          memberId,
          groupGenerationId: generationId,
        }

        await this.coordinator.heartbeat(payload)
        this.instrumentationEmitter.emit(HEARTBEAT, payload)
        this.lastRequest = Date.now()
      }
    })
  }

  isLeader() {
    return this.leaderId && this.memberId === this.leaderId
  }

  async connect() {
    await this.cluster.connect()
    this.instrumentationEmitter.emit(CONNECT)
    await this.cluster.refreshMetadataIfNecessary()
  }

  async [PRIVATE.JOIN]() {
    const { groupId, sessionTimeout, rebalanceTimeout } = this

    this.coordinator = await this.cluster.findGroupCoordinator({ groupId })

    const groupData = await this.coordinator.joinGroup({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId: this.memberId || '',
      groupProtocols: this.assigners.map(assigner =>
        assigner.protocol({
          topics: this.topicsSubscribed,
        })
      ),
    })

    this.generationId = groupData.generationId
    this.leaderId = groupData.leaderId
    this.memberId = groupData.memberId
    this.members = groupData.members
    this.groupProtocol = groupData.groupProtocol
  }

  async leave() {
    const { groupId, memberId } = this
    if (memberId) {
      await this.coordinator.leaveGroup({ groupId, memberId })
      this.memberId = null
    }
  }

  async [PRIVATE.SYNC]() {
    let assignment = []
    const {
      groupId,
      generationId,
      memberId,
      members,
      groupProtocol,
      topics,
      topicsSubscribed,
      coordinator,
    } = this

    if (this.isLeader()) {
      this.logger.debug('Chosen as group leader', { groupId, generationId, memberId, topics })
      const assigner = this.assigners.find(({ name }) => name === groupProtocol)

      if (!assigner) {
        throw new KafkaJSNonRetriableError(
          `Unsupported partition assigner "${groupProtocol}", the assigner wasn't found in the assigners list`
        )
      }

      await this.cluster.refreshMetadata()
      assignment = await assigner.assign({ members, topics: topicsSubscribed })

      this.logger.debug('Group assignment', {
        groupId,
        generationId,
        groupProtocol,
        assignment,
        topics: topicsSubscribed,
      })
    }

    // Keep track of the partitions for the subscribed topics
    this.partitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic()
    const { memberAssignment } = await this.coordinator.syncGroup({
      groupId,
      generationId,
      memberId,
      groupAssignment: assignment,
    })

    const decodedMemberAssignment = MemberAssignment.decode(memberAssignment)
    const decodedAssignment =
      decodedMemberAssignment != null ? decodedMemberAssignment.assignment : {}

    this.logger.debug('Received assignment', {
      groupId,
      generationId,
      memberId,
      memberAssignment: decodedAssignment,
    })

    const assignedTopics = keys(decodedAssignment)
    const topicsNotSubscribed = arrayDiff(assignedTopics, topicsSubscribed)

    if (topicsNotSubscribed.length > 0) {
      const payload = {
        groupId,
        generationId,
        memberId,
        assignedTopics,
        topicsSubscribed,
        topicsNotSubscribed,
      }

      this.instrumentationEmitter.emit(RECEIVED_UNSUBSCRIBED_TOPICS, payload)
      this.logger.warn('Consumer group received unsubscribed topics', {
        ...payload,
        helpUrl: websiteUrl(
          'docs/faq',
          'why-am-i-receiving-messages-for-topics-i-m-not-subscribed-to'
        ),
      })
    }

    // Remove unsubscribed topics from the list
    const safeAssignment = arrayDiff(assignedTopics, topicsNotSubscribed)
    const currentMemberAssignment = safeAssignment.map(topic => ({
      topic,
      partitions: decodedAssignment[topic],
    }))

    // Check if the consumer is aware of all assigned partitions
    for (const assignment of currentMemberAssignment) {
      const { topic, partitions: assignedPartitions } = assignment
      const knownPartitions = this.partitionsPerSubscribedTopic.get(topic)
      const isAwareOfAllAssignedPartitions = assignedPartitions.every(partition =>
        knownPartitions.includes(partition)
      )

      if (!isAwareOfAllAssignedPartitions) {
        this.logger.warn('Consumer is not aware of all assigned partitions, refreshing metadata', {
          groupId,
          generationId,
          memberId,
          topic,
          knownPartitions,
          assignedPartitions,
        })

        // If the consumer is not aware of all assigned partitions, refresh metadata
        // and update the list of partitions per subscribed topic. It's enough to perform
        // this operation once since refresh metadata will update metadata for all topics
        await this.cluster.refreshMetadata()
        this.partitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic()
        break
      }
    }

    this.topics = currentMemberAssignment.map(({ topic }) => topic)
    this.subscriptionState.assign(currentMemberAssignment)
    this.offsetManager = new OffsetManager({
      cluster: this.cluster,
      topicConfigurations: this.topicConfigurations,
      instrumentationEmitter: this.instrumentationEmitter,
      memberAssignment: currentMemberAssignment.reduce(
        (partitionsByTopic, { topic, partitions }) => ({
          ...partitionsByTopic,
          [topic]: partitions,
        }),
        {}
      ),
      autoCommit: this.autoCommit,
      autoCommitInterval: this.autoCommitInterval,
      autoCommitThreshold: this.autoCommitThreshold,
      coordinator,
      groupId,
      generationId,
      memberId,
    })
  }

  joinAndSync() {
    const startJoin = Date.now()
    return this.retrier(async bail => {
      try {
        await this[PRIVATE.JOIN]()
        await this[PRIVATE.SYNC]()

        const memberAssignment = this.assigned().reduce(
          (result, { topic, partitions }) => ({ ...result, [topic]: partitions }),
          {}
        )

        const payload = {
          groupId: this.groupId,
          memberId: this.memberId,
          leaderId: this.leaderId,
          isLeader: this.isLeader(),
          memberAssignment,
          groupProtocol: this.groupProtocol,
          duration: Date.now() - startJoin,
        }

        this.instrumentationEmitter.emit(GROUP_JOIN, payload)
        this.logger.info('Consumer has joined the group', payload)
      } catch (e) {
        if (isRebalancing(e)) {
          // Rebalance in progress isn't a retriable protocol error since the consumer
          // has to go through find coordinator and join again before it can
          // actually retry the operation. We wrap the original error in a retriable error
          // here instead in order to restart the join + sync sequence using the retrier.
          throw new KafkaJSError(e)
        }

        bail(e)
      }
    })
  }

  /**
   * @param {import("../../types").TopicPartition} topicPartition
   */
  resetOffset({ topic, partition }) {
    this.offsetManager.resetOffset({ topic, partition })
  }

  /**
   * @param {import("../../types").TopicPartitionOffset} topicPartitionOffset
   */
  resolveOffset({ topic, partition, offset }) {
    this.offsetManager.resolveOffset({ topic, partition, offset })
  }

  /**
   * Update the consumer offset for the given topic/partition. This will be used
   * on the next fetch. If this API is invoked for the same topic/partition more
   * than once, the latest offset will be used on the next fetch.
   *
   * @param {import("../../types").TopicPartitionOffset} topicPartitionOffset
   */
  seek({ topic, partition, offset }) {
    this.seekOffset.set(topic, partition, offset)
  }

  pause(topicPartitions) {
    this.logger.info(`Pausing fetching from ${topicPartitions.length} topics`, {
      topicPartitions,
    })
    this.subscriptionState.pause(topicPartitions)
  }

  resume(topicPartitions) {
    this.logger.info(`Resuming fetching from ${topicPartitions.length} topics`, {
      topicPartitions,
    })
    this.subscriptionState.resume(topicPartitions)
  }

  assigned() {
    return this.subscriptionState.assigned()
  }

  paused() {
    return this.subscriptionState.paused()
  }

  async commitOffsetsIfNecessary() {
    await this.offsetManager.commitOffsetsIfNecessary()
  }

  async commitOffsets(offsets) {
    await this.offsetManager.commitOffsets(offsets)
  }

  uncommittedOffsets() {
    return this.offsetManager.uncommittedOffsets()
  }

  async heartbeat({ interval }) {
    return this[PRIVATE.SHAREDHEARTBEAT]({ interval })
  }

  async fetch() {
    try {
      const { topics, maxBytesPerPartition, maxWaitTime, minBytes, maxBytes } = this
      /** @type {{[nodeId: string]: {topic: string, partitions: { partition: number; fetchOffset: string; maxBytes: number }[]}[]}} */
      const requestsPerNode = {}

      await this.cluster.refreshMetadataIfNecessary()
      this.checkForStaleAssignment()

      while (this.seekOffset.size > 0) {
        const seekEntry = this.seekOffset.pop()
        this.logger.debug('Seek offset', {
          groupId: this.groupId,
          memberId: this.memberId,
          seek: seekEntry,
        })
        await this.offsetManager.seek(seekEntry)
      }

      const pausedTopicPartitions = this.subscriptionState.paused()
      const activeTopicPartitions = this.subscriptionState.active()

      const activePartitions = flatten(activeTopicPartitions.map(({ partitions }) => partitions))
      const activeTopics = activeTopicPartitions
        .filter(({ partitions }) => partitions.length > 0)
        .map(({ topic }) => topic)

      if (activePartitions.length === 0) {
        this.logger.debug(`No active topic partitions, sleeping for ${this.maxWaitTime}ms`, {
          topics,
          activeTopicPartitions,
          pausedTopicPartitions,
        })

        await sleep(this.maxWaitTime)
        return BufferedAsyncIterator([])
      }

      await this.offsetManager.resolveOffsets()

      this.logger.debug(
        `Fetching from ${activePartitions.length} partitions for ${activeTopics.length} out of ${topics.length} topics`,
        {
          topics,
          activeTopicPartitions,
          pausedTopicPartitions,
        }
      )

      for (const topicPartition of activeTopicPartitions) {
        const partitionsPerNode = this.findReadReplicaForPartitions(
          topicPartition.topic,
          topicPartition.partitions
        )

        const nodeIds = keys(partitionsPerNode)
        const committedOffsets = this.offsetManager.committedOffsets()

        for (const nodeId of nodeIds) {
          const partitions = partitionsPerNode[nodeId]
            .filter(partition => {
              /**
               * When recovering from OffsetOutOfRange, each partition can recover
               * concurrently, which invalidates resolved and committed offsets as part
               * of the recovery mechanism (see OffsetManager.clearOffsets). In concurrent
               * scenarios this can initiate a new fetch with invalid offsets.
               *
               * This was further highlighted by https://github.com/tulios/kafkajs/pull/570,
               * which increased concurrency, making this more likely to happen.
               *
               * This is solved by only making requests for partitions with initialized offsets.
               *
               * See the following pull request which explains the context of the problem:
               * @issue https://github.com/tulios/kafkajs/pull/578
               */
              return committedOffsets[topicPartition.topic][partition] != null
            })
            .map(partition => ({
              partition,
              fetchOffset: this.offsetManager
                .nextOffset(topicPartition.topic, partition)
                .toString(),
              maxBytes: maxBytesPerPartition,
            }))

          requestsPerNode[nodeId] = requestsPerNode[nodeId] || []
          requestsPerNode[nodeId].push({ topic: topicPartition.topic, partitions })
        }
      }

      const requests = keys(requestsPerNode).map(async nodeId => {
        const broker = await this.cluster.findBroker({ nodeId })
        const { responses } = await broker.fetch({
          maxWaitTime,
          minBytes,
          maxBytes,
          isolationLevel: this.isolationLevel,
          topics: requestsPerNode[nodeId],
          rackId: this.rackId,
        })

        const batchesPerPartition = responses.map(({ topicName, partitions }) => {
          const topicRequestData = requestsPerNode[nodeId].find(({ topic }) => topic === topicName)
          let preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[topicName]
          if (!preferredReadReplicas) {
            this.preferredReadReplicasPerTopicPartition[topicName] = preferredReadReplicas = {}
          }

          return partitions
            .filter(
              partitionData =>
                !this.seekOffset.has(topicName, partitionData.partition) &&
                !this.subscriptionState.isPaused(topicName, partitionData.partition)
            )
            .map(partitionData => {
              const { partition, preferredReadReplica } = partitionData
              if (preferredReadReplica != null && preferredReadReplica !== -1) {
                const { nodeId: currentPreferredReadReplica } =
                  preferredReadReplicas[partition] || {}
                if (currentPreferredReadReplica !== preferredReadReplica) {
                  this.logger.info(`Preferred read replica is now ${preferredReadReplica}`, {
                    groupId: this.groupId,
                    memberId: this.memberId,
                    topic: topicName,
                    partition,
                  })
                }
                preferredReadReplicas[partition] = {
                  nodeId: preferredReadReplica,
                  expireAt: Date.now() + this.metadataMaxAge,
                }
              }

              const partitionRequestData = topicRequestData.partitions.find(
                ({ partition }) => partition === partitionData.partition
              )

              const fetchedOffset = partitionRequestData.fetchOffset
              return new Batch(topicName, fetchedOffset, partitionData)
            })
        })

        return flatten(batchesPerPartition)
      })

      // fetch can generate empty requests when the consumer group receives an assignment
      // with more topics than the subscribed, so to prevent a busy loop we wait the
      // configured max wait time
      if (requests.length === 0) {
        await sleep(this.maxWaitTime)
        return BufferedAsyncIterator([])
      }

      return BufferedAsyncIterator(requests, e => this.recoverFromFetch(e))
    } catch (e) {
      await this.recoverFromFetch(e)
    }
  }

  async recoverFromFetch(e) {
    if (STALE_METADATA_ERRORS.includes(e.type) || e.name === 'KafkaJSTopicMetadataNotLoaded') {
      this.logger.debug('Stale cluster metadata, refreshing...', {
        groupId: this.groupId,
        memberId: this.memberId,
        error: e.message,
      })

      await this.cluster.refreshMetadata()
      await this.joinAndSync()
      throw new KafkaJSError(e.message)
    }

    if (e.name === 'KafkaJSStaleTopicMetadataAssignment') {
      this.logger.warn(`${e.message}, resync group`, {
        groupId: this.groupId,
        memberId: this.memberId,
        topic: e.topic,
        unknownPartitions: e.unknownPartitions,
      })

      await this.joinAndSync()
    }

    if (e.name === 'KafkaJSOffsetOutOfRange') {
      await this.recoverFromOffsetOutOfRange(e)
    }

    if (e.name === 'KafkaJSConnectionClosedError') {
      this.cluster.removeBroker({ host: e.host, port: e.port })
    }

    if (e.name === 'KafkaJSBrokerNotFound' || e.name === 'KafkaJSConnectionClosedError') {
      this.logger.debug(`${e.message}, refreshing metadata and retrying...`)
      await this.cluster.refreshMetadata()
    }

    throw e
  }

  async recoverFromOffsetOutOfRange(e) {
    // If we are fetching from a follower try with the leader before resetting offsets
    const preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[e.topic]
    if (preferredReadReplicas && typeof preferredReadReplicas[e.partition] === 'number') {
      this.logger.info('Offset out of range while fetching from follower, retrying with leader', {
        topic: e.topic,
        partition: e.partition,
        groupId: this.groupId,
        memberId: this.memberId,
      })
      delete preferredReadReplicas[e.partition]
    } else {
      this.logger.error('Offset out of range, resetting to default offset', {
        topic: e.topic,
        partition: e.partition,
        groupId: this.groupId,
        memberId: this.memberId,
      })

      await this.offsetManager.setDefaultOffset({
        topic: e.topic,
        partition: e.partition,
      })
    }
  }

  generatePartitionsPerSubscribedTopic() {
    const map = new Map()

    for (const topic of this.topicsSubscribed) {
      const partitions = this.cluster
        .findTopicPartitionMetadata(topic)
        .map(m => m.partitionId)
        .sort()

      map.set(topic, partitions)
    }

    return map
  }

  checkForStaleAssignment() {
    if (!this.partitionsPerSubscribedTopic) {
      return
    }

    const newPartitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic()

    for (const [topic, partitions] of newPartitionsPerSubscribedTopic) {
      const diff = arrayDiff(partitions, this.partitionsPerSubscribedTopic.get(topic))

      if (diff.length > 0) {
        throw new KafkaJSStaleTopicMetadataAssignment('Topic has been updated', {
          topic,
          unknownPartitions: diff,
        })
      }
    }
  }

  hasSeekOffset({ topic, partition }) {
    return this.seekOffset.has(topic, partition)
  }

  /**
   * For each of the partitions find the best nodeId to read it from
   *
   * @param {string} topic
   * @param {number[]} partitions
   * @returns {{[nodeId: number]: number[]}} per-node assignment of partitions
   * @see Cluster~findLeaderForPartitions
   */
  // Invariant: The resulting object has each partition referenced exactly once
  findReadReplicaForPartitions(topic, partitions) {
    const partitionMetadata = this.cluster.findTopicPartitionMetadata(topic)
    const preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[topic]
    return partitions.reduce((result, id) => {
      const partitionId = parseInt(id, 10)
      const metadata = partitionMetadata.find(p => p.partitionId === partitionId)
      if (!metadata) {
        return result
      }

      if (metadata.leader == null) {
        throw new KafkaJSError('Invalid partition metadata', { topic, partitionId, metadata })
      }

      // Pick the preferred replica if there is one, and it isn't known to be offline, otherwise the leader.
      let nodeId = metadata.leader
      if (preferredReadReplicas) {
        const { nodeId: preferredReadReplica, expireAt } = preferredReadReplicas[partitionId] || {}
        if (Date.now() >= expireAt) {
          this.logger.debug('Preferred read replica information has expired, using leader', {
            topic,
            partitionId,
            groupId: this.groupId,
            memberId: this.memberId,
            preferredReadReplica,
            leader: metadata.leader,
          })
          // Drop the entry
          delete preferredReadReplicas[partitionId]
        } else if (preferredReadReplica != null) {
          // Valid entry, check whether it is not offline
          // Note that we don't delete the preference here, and rather hope that eventually that replica comes online again
          const offlineReplicas = metadata.offlineReplicas
          if (Array.isArray(offlineReplicas) && offlineReplicas.includes(nodeId)) {
            this.logger.debug('Preferred read replica is offline, using leader', {
              topic,
              partitionId,
              groupId: this.groupId,
              memberId: this.memberId,
              preferredReadReplica,
              leader: metadata.leader,
            })
          } else {
            nodeId = preferredReadReplica
          }
        }
      }
      const current = result[nodeId] || []
      return { ...result, [nodeId]: [...current, partitionId] }
    }, {})
  }
}


/***/ }),
/* 368 */
/***/ ((module) => {

module.exports = timeInMs =>
  new Promise(resolve => {
    setTimeout(resolve, timeInMs)
  })


/***/ }),
/* 369 */
/***/ ((module) => {

const defaultErrorHandler = e => {
  throw e
}

/**
 * Generator that processes the given promises, and yields their result in the order of them resolving.
 *
 * @template T
 * @param {Promise<T>[]} promises promises to process
 * @param {(err: Error) => any} [handleError] optional error handler
 * @returns {Generator<Promise<T>>}
 */
function* BufferedAsyncIterator(promises, handleError = defaultErrorHandler) {
  /** Queue of promises in order of resolution */
  const promisesQueue = []
  /** Queue of {resolve, reject} in the same order as `promisesQueue` */
  const resolveRejectQueue = []

  promises.forEach(promise => {
    // Create a new promise into the promises queue, and keep the {resolve,reject}
    // in the resolveRejectQueue
    let resolvePromise
    let rejectPromise
    promisesQueue.push(
      new Promise((resolve, reject) => {
        resolvePromise = resolve
        rejectPromise = reject
      })
    )
    resolveRejectQueue.push({ resolve: resolvePromise, reject: rejectPromise })

    // When the promise resolves pick the next available {resolve, reject}, and
    // through that resolve the next promise in the queue
    promise.then(
      result => {
        const { resolve } = resolveRejectQueue.pop()
        resolve(result)
      },
      async err => {
        const { reject } = resolveRejectQueue.pop()
        try {
          await handleError(err)
          reject(err)
        } catch (newError) {
          reject(newError)
        }
      }
    )
  })

  // While there are promises left pick the next one to yield
  // The caller will then wait for the value to resolve.
  while (promisesQueue.length > 0) {
    const nextPromise = promisesQueue.pop()
    yield nextPromise
  }
}

module.exports = BufferedAsyncIterator


/***/ }),
/* 370 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const flatten = __webpack_require__(45)
const isInvalidOffset = __webpack_require__(371)
const initializeConsumerOffsets = __webpack_require__(372)
const {
  events: { COMMIT_OFFSETS },
} = __webpack_require__(373)

const { keys, assign } = Object
const indexTopics = topics => topics.reduce((obj, topic) => assign(obj, { [topic]: {} }), {})

const PRIVATE = {
  COMMITTED_OFFSETS: Symbol('private:OffsetManager:committedOffsets'),
}
module.exports = class OffsetManager {
  /**
   * @param {Object} options
   * @param {import("../../../types").Cluster} options.cluster
   * @param {import("../../../types").Broker} options.coordinator
   * @param {import("../../../types").IMemberAssignment} options.memberAssignment
   * @param {boolean} options.autoCommit
   * @param {number | null} options.autoCommitInterval
   * @param {number | null} options.autoCommitThreshold
   * @param {{[topic: string]: { fromBeginning: boolean }}} options.topicConfigurations
   * @param {import("../../instrumentation/emitter")} options.instrumentationEmitter
   * @param {string} options.groupId
   * @param {number} options.generationId
   * @param {string} options.memberId
   */
  constructor({
    cluster,
    coordinator,
    memberAssignment,
    autoCommit,
    autoCommitInterval,
    autoCommitThreshold,
    topicConfigurations,
    instrumentationEmitter,
    groupId,
    generationId,
    memberId,
  }) {
    this.cluster = cluster
    this.coordinator = coordinator

    // memberAssignment format:
    // {
    //   'topic1': [0, 1, 2, 3],
    //   'topic2': [0, 1, 2, 3, 4, 5],
    // }
    this.memberAssignment = memberAssignment

    this.topicConfigurations = topicConfigurations
    this.instrumentationEmitter = instrumentationEmitter
    this.groupId = groupId
    this.generationId = generationId
    this.memberId = memberId

    this.autoCommit = autoCommit
    this.autoCommitInterval = autoCommitInterval
    this.autoCommitThreshold = autoCommitThreshold
    this.lastCommit = Date.now()

    this.topics = keys(memberAssignment)
    this.clearAllOffsets()
  }

  /**
   * @param {string} topic
   * @param {number} partition
   * @returns {Long}
   */
  nextOffset(topic, partition) {
    if (!this.resolvedOffsets[topic][partition]) {
      this.resolvedOffsets[topic][partition] = this.committedOffsets()[topic][partition]
    }

    let offset = this.resolvedOffsets[topic][partition]
    if (isInvalidOffset(offset)) {
      offset = '0'
    }

    return Long.fromValue(offset)
  }

  /**
   * @returns {Promise<import("../../../types").Broker>}
   */
  async getCoordinator() {
    if (!this.coordinator.isConnected()) {
      this.coordinator = await this.cluster.findBroker(this.coordinator)
    }

    return this.coordinator
  }

  /**
   * @param {import("../../../types").TopicPartition} topicPartition
   */
  resetOffset({ topic, partition }) {
    this.resolvedOffsets[topic][partition] = this.committedOffsets()[topic][partition]
  }

  /**
   * @param {import("../../../types").TopicPartitionOffset} topicPartitionOffset
   */
  resolveOffset({ topic, partition, offset }) {
    this.resolvedOffsets[topic][partition] = Long.fromValue(offset)
      .add(1)
      .toString()
  }

  /**
   * @returns {Long}
   */
  countResolvedOffsets() {
    const committedOffsets = this.committedOffsets()

    const subtractOffsets = (resolvedOffset, committedOffset) => {
      const resolvedOffsetLong = Long.fromValue(resolvedOffset)
      return isInvalidOffset(committedOffset)
        ? resolvedOffsetLong
        : resolvedOffsetLong.subtract(Long.fromValue(committedOffset))
    }

    const subtractPartitionOffsets = (resolvedTopicOffsets, committedTopicOffsets) =>
      keys(resolvedTopicOffsets).map(partition =>
        subtractOffsets(resolvedTopicOffsets[partition], committedTopicOffsets[partition])
      )

    const subtractTopicOffsets = topic =>
      subtractPartitionOffsets(this.resolvedOffsets[topic], committedOffsets[topic])

    const offsetsDiff = this.topics.map(subtractTopicOffsets)
    return flatten(offsetsDiff).reduce((sum, offset) => sum.add(offset), Long.fromValue(0))
  }

  /**
   * @param {import("../../../types").TopicPartition} topicPartition
   */
  async setDefaultOffset({ topic, partition }) {
    const { groupId, generationId, memberId } = this
    const defaultOffset = this.cluster.defaultOffset(this.topicConfigurations[topic])
    const coordinator = await this.getCoordinator()

    await coordinator.offsetCommit({
      groupId,
      memberId,
      groupGenerationId: generationId,
      topics: [
        {
          topic,
          partitions: [{ partition, offset: defaultOffset }],
        },
      ],
    })

    this.clearOffsets({ topic, partition })
  }

  /**
   * Commit the given offset to the topic/partition. If the consumer isn't assigned to the given
   * topic/partition this method will be a NO-OP.
   *
   * @param {import("../../../types").TopicPartitionOffset} topicPartitionOffset
   */
  async seek({ topic, partition, offset }) {
    if (!this.memberAssignment[topic] || !this.memberAssignment[topic].includes(partition)) {
      return
    }

    if (!this.autoCommit) {
      this.resolveOffset({
        topic,
        partition,
        offset: Long.fromValue(offset)
          .subtract(1)
          .toString(),
      })
      return
    }

    const { groupId, generationId, memberId } = this
    const coordinator = await this.getCoordinator()

    await coordinator.offsetCommit({
      groupId,
      memberId,
      groupGenerationId: generationId,
      topics: [
        {
          topic,
          partitions: [{ partition, offset }],
        },
      ],
    })

    this.clearOffsets({ topic, partition })
  }

  async commitOffsetsIfNecessary() {
    const now = Date.now()

    const timeoutReached =
      this.autoCommitInterval != null && now >= this.lastCommit + this.autoCommitInterval

    const thresholdReached =
      this.autoCommitThreshold != null &&
      this.countResolvedOffsets().gte(Long.fromValue(this.autoCommitThreshold))

    if (timeoutReached || thresholdReached) {
      return this.commitOffsets()
    }
  }

  /**
   * Return all locally resolved offsets which are not marked as committed, by topic-partition.
   * @returns {OffsetsByTopicPartition}
   *
   * @typedef {Object} OffsetsByTopicPartition
   * @property {TopicOffsets[]} topics
   *
   * @typedef {Object} TopicOffsets
   * @property {PartitionOffset[]} partitions
   *
   * @typedef {Object} PartitionOffset
   * @property {string} partition
   * @property {string} offset
   */
  uncommittedOffsets() {
    const offsets = topic => keys(this.resolvedOffsets[topic])
    const emptyPartitions = ({ partitions }) => partitions.length > 0
    const toPartitions = topic => partition => ({
      partition,
      offset: this.resolvedOffsets[topic][partition],
    })
    const changedOffsets = topic => ({ partition, offset }) => {
      return (
        offset !== this.committedOffsets()[topic][partition] &&
        Long.fromValue(offset).greaterThanOrEqual(0)
      )
    }

    // Select and format updated partitions
    const topicsWithPartitionsToCommit = this.topics
      .map(topic => ({
        topic,
        partitions: offsets(topic)
          .map(toPartitions(topic))
          .filter(changedOffsets(topic)),
      }))
      .filter(emptyPartitions)

    return { topics: topicsWithPartitionsToCommit }
  }

  async commitOffsets(offsets = {}) {
    const { groupId, generationId, memberId } = this
    const { topics = this.uncommittedOffsets().topics } = offsets

    if (topics.length === 0) {
      this.lastCommit = Date.now()
      return
    }

    const payload = {
      groupId,
      memberId,
      groupGenerationId: generationId,
      topics,
    }

    try {
      const coordinator = await this.getCoordinator()
      await coordinator.offsetCommit(payload)
      this.instrumentationEmitter.emit(COMMIT_OFFSETS, payload)

      // Update local reference of committed offsets
      topics.forEach(({ topic, partitions }) => {
        const updatedOffsets = partitions.reduce(
          (obj, { partition, offset }) => assign(obj, { [partition]: offset }),
          {}
        )

        this[PRIVATE.COMMITTED_OFFSETS][topic] = assign(
          {},
          this.committedOffsets()[topic],
          updatedOffsets
        )
      })

      this.lastCommit = Date.now()
    } catch (e) {
      // metadata is stale, the coordinator has changed due to a restart or
      // broker reassignment
      if (e.type === 'NOT_COORDINATOR_FOR_GROUP') {
        await this.cluster.refreshMetadata()
      }

      throw e
    }
  }

  async resolveOffsets() {
    const { groupId } = this
    const invalidOffset = topic => partition => {
      return isInvalidOffset(this.committedOffsets()[topic][partition])
    }

    const pendingPartitions = this.topics
      .map(topic => ({
        topic,
        partitions: this.memberAssignment[topic]
          .filter(invalidOffset(topic))
          .map(partition => ({ partition })),
      }))
      .filter(t => t.partitions.length > 0)

    if (pendingPartitions.length === 0) {
      return
    }

    const coordinator = await this.getCoordinator()
    const { responses: consumerOffsets } = await coordinator.offsetFetch({
      groupId,
      topics: pendingPartitions,
    })

    const unresolvedPartitions = consumerOffsets.map(({ topic, partitions }) =>
      assign(
        {
          topic,
          partitions: partitions
            .filter(({ offset }) => isInvalidOffset(offset))
            .map(({ partition }) => assign({ partition })),
        },
        this.topicConfigurations[topic]
      )
    )

    const indexPartitions = (obj, { partition, offset }) => {
      return assign(obj, { [partition]: offset })
    }

    const hasUnresolvedPartitions = () => unresolvedPartitions.some(t => t.partitions.length > 0)

    let offsets = consumerOffsets
    if (hasUnresolvedPartitions()) {
      const topicOffsets = await this.cluster.fetchTopicsOffset(unresolvedPartitions)
      offsets = initializeConsumerOffsets(consumerOffsets, topicOffsets)
    }

    offsets.forEach(({ topic, partitions }) => {
      this.committedOffsets()[topic] = partitions.reduce(indexPartitions, {
        ...this.committedOffsets()[topic],
      })
    })
  }

  /**
   * @private
   * @param {import("../../../types").TopicPartition} topicPartition
   */
  clearOffsets({ topic, partition }) {
    delete this.committedOffsets()[topic][partition]
    delete this.resolvedOffsets[topic][partition]
  }

  /**
   * @private
   */
  clearAllOffsets() {
    const committedOffsets = this.committedOffsets()

    for (const topic in committedOffsets) {
      delete committedOffsets[topic]
    }

    for (const topic of this.topics) {
      committedOffsets[topic] = {}
    }

    this.resolvedOffsets = indexTopics(this.topics)
  }

  committedOffsets() {
    if (!this[PRIVATE.COMMITTED_OFFSETS]) {
      this[PRIVATE.COMMITTED_OFFSETS] = this.groupId
        ? this.cluster.committedOffsets({ groupId: this.groupId })
        : {}
    }

    return this[PRIVATE.COMMITTED_OFFSETS]
  }
}


/***/ }),
/* 371 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)

module.exports = offset => (!offset && offset !== 0) || Long.fromValue(offset).isNegative()


/***/ }),
/* 372 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const isInvalidOffset = __webpack_require__(371)
const { keys, assign } = Object

const indexPartitions = (obj, { partition, offset }) => assign(obj, { [partition]: offset })
const indexTopics = (obj, { topic, partitions }) =>
  assign(obj, { [topic]: partitions.reduce(indexPartitions, {}) })

module.exports = (consumerOffsets, topicOffsets) => {
  const indexedConsumerOffsets = consumerOffsets.reduce(indexTopics, {})
  const indexedTopicOffsets = topicOffsets.reduce(indexTopics, {})

  return keys(indexedConsumerOffsets).map(topic => {
    const partitions = indexedConsumerOffsets[topic]
    return {
      topic,
      partitions: keys(partitions).map(partition => {
        const offset = partitions[partition]
        const resolvedOffset = isInvalidOffset(offset)
          ? indexedTopicOffsets[topic][partition]
          : offset

        return { partition: Number(partition), offset: resolvedOffset }
      }),
    }
  })
}


/***/ }),
/* 373 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const swapObject = __webpack_require__(365)
const InstrumentationEventType = __webpack_require__(345)
const networkEvents = __webpack_require__(344)
const consumerType = InstrumentationEventType('consumer')

const events = {
  HEARTBEAT: consumerType('heartbeat'),
  COMMIT_OFFSETS: consumerType('commit_offsets'),
  GROUP_JOIN: consumerType('group_join'),
  FETCH: consumerType('fetch'),
  FETCH_START: consumerType('fetch_start'),
  START_BATCH_PROCESS: consumerType('start_batch_process'),
  END_BATCH_PROCESS: consumerType('end_batch_process'),
  CONNECT: consumerType('connect'),
  DISCONNECT: consumerType('disconnect'),
  STOP: consumerType('stop'),
  CRASH: consumerType('crash'),
  REBALANCING: consumerType('rebalancing'),
  RECEIVED_UNSUBSCRIBED_TOPICS: consumerType('received_unsubscribed_topics'),
  REQUEST: consumerType(networkEvents.NETWORK_REQUEST),
  REQUEST_TIMEOUT: consumerType(networkEvents.NETWORK_REQUEST_TIMEOUT),
  REQUEST_QUEUE_SIZE: consumerType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE),
}

const wrappedEvents = {
  [events.REQUEST]: networkEvents.NETWORK_REQUEST,
  [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
  [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE,
}

const reversedWrappedEvents = swapObject(wrappedEvents)
const unwrap = eventName => wrappedEvents[eventName] || eventName
const wrap = eventName => reversedWrappedEvents[eventName] || eventName

module.exports = {
  events,
  wrap,
  unwrap,
}


/***/ }),
/* 374 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const filterAbortedMessages = __webpack_require__(375)

/**
 * A batch collects messages returned from a single fetch call.
 *
 * A batch could contain _multiple_ Kafka RecordBatches.
 */
module.exports = class Batch {
  constructor(topic, fetchedOffset, partitionData) {
    this.fetchedOffset = fetchedOffset
    const longFetchedOffset = Long.fromValue(this.fetchedOffset)
    const { abortedTransactions, messages } = partitionData

    this.topic = topic
    this.partition = partitionData.partition
    this.highWatermark = partitionData.highWatermark

    this.rawMessages = messages
    // Apparently fetch can return different offsets than the target offset provided to the fetch API.
    // Discard messages that are not in the requested offset
    // https://github.com/apache/kafka/blob/bf237fa7c576bd141d78fdea9f17f65ea269c290/clients/src/main/java/org/apache/kafka/clients/consumer/internals/Fetcher.java#L912
    this.messagesWithinOffset = this.rawMessages.filter(message =>
      Long.fromValue(message.offset).gte(longFetchedOffset)
    )

    // 1. Don't expose aborted messages
    // 2. Don't expose control records
    // @see https://kafka.apache.org/documentation/#controlbatch
    this.messages = filterAbortedMessages({
      messages: this.messagesWithinOffset,
      abortedTransactions,
    }).filter(message => !message.isControlRecord)
  }

  isEmpty() {
    return this.messages.length === 0
  }

  isEmptyIncludingFiltered() {
    return this.messagesWithinOffset.length === 0
  }

  /**
   * If the batch contained raw messages (i.e was not truely empty) but all messages were filtered out due to
   * log compaction, control records or other reasons
   */
  isEmptyDueToFiltering() {
    return this.isEmpty() && this.rawMessages.length > 0
  }

  isEmptyControlRecord() {
    return (
      this.isEmpty() && this.messagesWithinOffset.some(({ isControlRecord }) => isControlRecord)
    )
  }

  /**
   * With compressed messages, it's possible for the returned messages to have offsets smaller than the starting offset.
   * These messages will be filtered out (i.e. they are not even included in this.messagesWithinOffset)
   * If these are the only messages, the batch will appear as an empty batch.
   *
   * isEmpty() and isEmptyIncludingFiltered() will always return true if the batch is empty,
   * but this method will only return true if the batch is empty due to log compacted messages.
   *
   * @returns boolean True if the batch is empty, because of log compacted messages in the partition.
   */
  isEmptyDueToLogCompactedMessages() {
    const hasMessages = this.rawMessages.length > 0
    return hasMessages && this.isEmptyIncludingFiltered()
  }

  firstOffset() {
    return this.isEmptyIncludingFiltered() ? null : this.messagesWithinOffset[0].offset
  }

  lastOffset() {
    if (this.isEmptyDueToLogCompactedMessages()) {
      return this.fetchedOffset
    }

    if (this.isEmptyIncludingFiltered()) {
      return Long.fromValue(this.highWatermark)
        .add(-1)
        .toString()
    }

    return this.messagesWithinOffset[this.messagesWithinOffset.length - 1].offset
  }

  /**
   * Returns the lag based on the last offset in the batch (also known as "high")
   */
  offsetLag() {
    const lastOffsetOfPartition = Long.fromValue(this.highWatermark).add(-1)
    const lastConsumedOffset = Long.fromValue(this.lastOffset())
    return lastOffsetOfPartition.add(lastConsumedOffset.multiply(-1)).toString()
  }

  /**
   * Returns the lag based on the first offset in the batch
   */
  offsetLagLow() {
    if (this.isEmptyIncludingFiltered()) {
      return '0'
    }

    const lastOffsetOfPartition = Long.fromValue(this.highWatermark).add(-1)
    const firstConsumedOffset = Long.fromValue(this.firstOffset())
    return lastOffsetOfPartition.add(firstConsumedOffset.multiply(-1)).toString()
  }
}


/***/ }),
/* 375 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Long = __webpack_require__(25)
const ABORTED_MESSAGE_KEY = Buffer.from([0, 0, 0, 0])

const isAbortMarker = ({ key }) => {
  // Handle null/undefined keys.
  if (!key) return false
  // Cast key to buffer defensively
  return Buffer.from(key).equals(ABORTED_MESSAGE_KEY)
}

/**
 * Remove messages marked as aborted according to the aborted transactions list.
 *
 * Start of an aborted transaction is determined by message offset.
 * End of an aborted transaction is determined by control messages.
 * @param {Message[]} messages
 * @param {Transaction[]} [abortedTransactions]
 * @returns {Message[]} Messages which did not participate in an aborted transaction
 *
 * @typedef {object} Message
 * @param {Buffer} key
 * @param {lastOffset} key  Int64
 * @param {RecordBatch}  batchContext
 *
 * @typedef {object} Transaction
 * @param {string} firstOffset  Int64
 * @param {string} producerId  Int64
 *
 * @typedef {object} RecordBatch
 * @param {string}  producerId  Int64
 * @param {boolean}  inTransaction
 */
module.exports = ({ messages, abortedTransactions }) => {
  const currentAbortedTransactions = new Map()

  if (!abortedTransactions || !abortedTransactions.length) {
    return messages
  }

  const remainingAbortedTransactions = [...abortedTransactions]

  return messages.filter(message => {
    // If the message offset is GTE the first offset of the next aborted transaction
    // then we have stepped into an aborted transaction.
    if (
      remainingAbortedTransactions.length &&
      Long.fromValue(message.offset).gte(remainingAbortedTransactions[0].firstOffset)
    ) {
      const { producerId } = remainingAbortedTransactions.shift()
      currentAbortedTransactions.set(producerId, true)
    }

    const { producerId, inTransaction } = message.batchContext

    if (isAbortMarker(message)) {
      // Transaction is over, we no longer need to ignore messages from this producer
      currentAbortedTransactions.delete(producerId)
    } else if (currentAbortedTransactions.has(producerId) && inTransaction) {
      return false
    }

    return true
  })
}


/***/ }),
/* 376 */
/***/ ((module) => {

module.exports = class SeekOffsets extends Map {
  set(topic, partition, offset) {
    super.set([topic, partition], offset)
  }

  has(topic, partition) {
    return Array.from(this.keys()).some(([t, p]) => t === topic && p === partition)
  }

  pop() {
    if (this.size === 0) {
      return
    }

    const [key, offset] = this.entries().next().value
    this.delete(key)
    const [topic, partition] = key
    return { topic, partition, offset }
  }
}


/***/ }),
/* 377 */
/***/ ((module) => {

const createState = topic => ({
  topic,
  paused: new Set(),
  pauseAll: false,
  resumed: new Set(),
})

module.exports = class SubscriptionState {
  constructor() {
    this.assignedPartitionsByTopic = {}
    this.subscriptionStatesByTopic = {}
  }

  /**
   * Replace the current assignment with a new set of assignments
   *
   * @param {Array<TopicPartitions>} topicPartitions Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  assign(topicPartitions = []) {
    this.assignedPartitionsByTopic = topicPartitions.reduce(
      (assigned, { topic, partitions = [] }) => {
        return { ...assigned, [topic]: { topic, partitions } }
      },
      {}
    )
  }

  /**
   * @param {Array<TopicPartitions>} topicPartitions Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  pause(topicPartitions = []) {
    topicPartitions.forEach(({ topic, partitions }) => {
      const state = this.subscriptionStatesByTopic[topic] || createState(topic)

      if (typeof partitions === 'undefined') {
        state.paused.clear()
        state.resumed.clear()
        state.pauseAll = true
      } else if (Array.isArray(partitions)) {
        partitions.forEach(partition => {
          state.paused.add(partition)
          state.resumed.delete(partition)
        })
        state.pauseAll = false
      }

      this.subscriptionStatesByTopic[topic] = state
    })
  }

  /**
   * @param {Array<TopicPartitions>} topicPartitions Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  resume(topicPartitions = []) {
    topicPartitions.forEach(({ topic, partitions }) => {
      const state = this.subscriptionStatesByTopic[topic] || createState(topic)

      if (typeof partitions === 'undefined') {
        state.paused.clear()
        state.resumed.clear()
        state.pauseAll = false
      } else if (Array.isArray(partitions)) {
        partitions.forEach(partition => {
          state.paused.delete(partition)

          if (state.pauseAll) {
            state.resumed.add(partition)
          }
        })
      }

      this.subscriptionStatesByTopic[topic] = state
    })
  }

  /**
   * @returns {Array<import("../../types").TopicPartitions>} topicPartitions
   * Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  assigned() {
    return Object.values(this.assignedPartitionsByTopic).map(({ topic, partitions }) => ({
      topic,
      partitions: partitions.sort(),
    }))
  }

  /**
   * @returns {Array<import("../../types").TopicPartitions>} topicPartitions
   * Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  active() {
    return Object.values(this.assignedPartitionsByTopic).map(({ topic, partitions }) => ({
      topic,
      partitions: partitions.filter(partition => !this.isPaused(topic, partition)).sort(),
    }))
  }

  /**
   * @returns {Array<import("../../types").TopicPartitions>} topicPartitions
   * Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  paused() {
    return Object.values(this.assignedPartitionsByTopic)
      .map(({ topic, partitions }) => ({
        topic,
        partitions: partitions.filter(partition => this.isPaused(topic, partition)).sort(),
      }))
      .filter(({ partitions }) => partitions.length !== 0)
  }

  isPaused(topic, partition) {
    const state = this.subscriptionStatesByTopic[topic]

    if (!state) {
      return false
    }

    const partitionResumed = state.resumed.has(partition)
    const partitionPaused = state.paused.has(partition)

    return (state.pauseAll && !partitionResumed) || partitionPaused
  }
}


/***/ }),
/* 378 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Encoder = __webpack_require__(35)
const Decoder = __webpack_require__(42)

const MemberMetadata = {
  /**
   * @param {Object} metadata
   * @param {number} metadata.version
   * @param {Array<string>} metadata.topics
   * @param {Buffer} [metadata.userData=Buffer.alloc(0)]
   *
   * @returns Buffer
   */
  encode({ version, topics, userData = Buffer.alloc(0) }) {
    return new Encoder()
      .writeInt16(version)
      .writeArray(topics)
      .writeBytes(userData).buffer
  },

  /**
   * @param {Buffer} buffer
   * @returns {Object}
   */
  decode(buffer) {
    const decoder = new Decoder(buffer)
    return {
      version: decoder.readInt16(),
      topics: decoder.readArray(d => d.readString()),
      userData: decoder.readBytes(),
    }
  },
}

const MemberAssignment = {
  /**
   * @param {number} version
   * @param {Object<String,Array>} assignment, example:
   *                               {
   *                                 'topic-A': [0, 2, 4, 6],
   *                                 'topic-B': [0, 2],
   *                               }
   * @param {Buffer} [userData=Buffer.alloc(0)]
   *
   * @returns Buffer
   */
  encode({ version, assignment, userData = Buffer.alloc(0) }) {
    return new Encoder()
      .writeInt16(version)
      .writeArray(
        Object.keys(assignment).map(topic =>
          new Encoder().writeString(topic).writeArray(assignment[topic])
        )
      )
      .writeBytes(userData).buffer
  },

  /**
   * @param {Buffer} buffer
   * @returns {Object|null}
   */
  decode(buffer) {
    const decoder = new Decoder(buffer)
    const decodePartitions = d => d.readInt32()
    const decodeAssignment = d => ({
      topic: d.readString(),
      partitions: d.readArray(decodePartitions),
    })
    const indexAssignment = (obj, { topic, partitions }) =>
      Object.assign(obj, { [topic]: partitions })

    if (!decoder.canReadInt16()) {
      return null
    }

    return {
      version: decoder.readInt16(),
      assignment: decoder.readArray(decodeAssignment).reduce(indexAssignment, {}),
      userData: decoder.readBytes(),
    }
  },
}

module.exports = {
  MemberMetadata,
  MemberAssignment,
}


/***/ }),
/* 379 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { EventEmitter } = __webpack_require__(17)
const Long = __webpack_require__(25)
const createRetry = __webpack_require__(332)
const limitConcurrency = __webpack_require__(380)
const { KafkaJSError } = __webpack_require__(19)
const barrier = __webpack_require__(381)

const {
  events: { FETCH, FETCH_START, START_BATCH_PROCESS, END_BATCH_PROCESS, REBALANCING },
} = __webpack_require__(373)

const isRebalancing = e =>
  e.type === 'REBALANCE_IN_PROGRESS' || e.type === 'NOT_COORDINATOR_FOR_GROUP'

const isKafkaJSError = e => e instanceof KafkaJSError
const isSameOffset = (offsetA, offsetB) => Long.fromValue(offsetA).equals(Long.fromValue(offsetB))
const CONSUMING_START = 'consuming-start'
const CONSUMING_STOP = 'consuming-stop'

module.exports = class Runner extends EventEmitter {
  /**
   * @param {object} options
   * @param {import("../../types").Logger} options.logger
   * @param {import("./consumerGroup")} options.consumerGroup
   * @param {import("../instrumentation/emitter")} options.instrumentationEmitter
   * @param {boolean} [options.eachBatchAutoResolve=true]
   * @param {number} [options.partitionsConsumedConcurrently]
   * @param {(payload: import("../../types").EachBatchPayload) => Promise<void>} options.eachBatch
   * @param {(payload: import("../../types").EachMessagePayload) => Promise<void>} options.eachMessage
   * @param {number} [options.heartbeatInterval]
   * @param {(reason: Error) => void} options.onCrash
   * @param {import("../../types").RetryOptions} [options.retry]
   * @param {boolean} [options.autoCommit=true]
   */
  constructor({
    logger,
    consumerGroup,
    instrumentationEmitter,
    eachBatchAutoResolve = true,
    partitionsConsumedConcurrently,
    eachBatch,
    eachMessage,
    heartbeatInterval,
    onCrash,
    retry,
    autoCommit = true,
  }) {
    super()
    this.logger = logger.namespace('Runner')
    this.consumerGroup = consumerGroup
    this.instrumentationEmitter = instrumentationEmitter
    this.eachBatchAutoResolve = eachBatchAutoResolve
    this.eachBatch = eachBatch
    this.eachMessage = eachMessage
    this.heartbeatInterval = heartbeatInterval
    this.retrier = createRetry(Object.assign({}, retry))
    this.onCrash = onCrash
    this.autoCommit = autoCommit
    this.partitionsConsumedConcurrently = partitionsConsumedConcurrently

    this.running = false
    this.consuming = false
  }

  get consuming() {
    return this._consuming
  }

  set consuming(value) {
    if (this._consuming !== value) {
      this._consuming = value
      this.emit(value ? CONSUMING_START : CONSUMING_STOP)
    }
  }

  async join() {
    await this.consumerGroup.joinAndSync()
    this.running = true
  }

  async scheduleJoin() {
    if (!this.running) {
      this.logger.debug('consumer not running, exiting', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
      })
      return
    }

    return this.join().catch(this.onCrash)
  }

  async start() {
    if (this.running) {
      return
    }

    try {
      await this.consumerGroup.connect()
      await this.join()

      this.running = true
      this.scheduleFetch()
    } catch (e) {
      this.onCrash(e)
    }
  }

  async stop() {
    if (!this.running) {
      return
    }

    this.logger.debug('stop consumer group', {
      groupId: this.consumerGroup.groupId,
      memberId: this.consumerGroup.memberId,
    })

    this.running = false

    try {
      await this.waitForConsumer()
      await this.consumerGroup.leave()
    } catch (e) {}
  }

  waitForConsumer() {
    return new Promise(resolve => {
      if (!this.consuming) {
        return resolve()
      }

      this.logger.debug('waiting for consumer to finish...', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
      })

      this.once(CONSUMING_STOP, () => resolve())
    })
  }

  async processEachMessage(batch) {
    const { topic, partition } = batch

    for (const message of batch.messages) {
      if (!this.running || this.consumerGroup.hasSeekOffset({ topic, partition })) {
        break
      }

      try {
        await this.eachMessage({
          topic,
          partition,
          message,
          heartbeat: async () => {
            await this.consumerGroup.heartbeat({ interval: this.heartbeatInterval })
          },
        })
      } catch (e) {
        if (!isKafkaJSError(e)) {
          this.logger.error(`Error when calling eachMessage`, {
            topic,
            partition,
            offset: message.offset,
            stack: e.stack,
            error: e,
          })
        }

        // In case of errors, commit the previously consumed offsets unless autoCommit is disabled
        await this.autoCommitOffsets()
        throw e
      }

      this.consumerGroup.resolveOffset({ topic, partition, offset: message.offset })
      await this.consumerGroup.heartbeat({ interval: this.heartbeatInterval })
      await this.autoCommitOffsetsIfNecessary()
    }
  }

  async processEachBatch(batch) {
    const { topic, partition } = batch
    const lastFilteredMessage = batch.messages[batch.messages.length - 1]

    try {
      await this.eachBatch({
        batch,
        resolveOffset: offset => {
          /**
           * The transactional producer generates a control record after committing the transaction.
           * The control record is the last record on the RecordBatch, and it is filtered before it
           * reaches the eachBatch callback. When disabling auto-resolve, the user-land code won't
           * be able to resolve the control record offset, since it never reaches the callback,
           * causing stuck consumers as the consumer will never move the offset marker.
           *
           * When the last offset of the batch is resolved, we should automatically resolve
           * the control record offset as this entry doesn't have any meaning to the user-land code,
           * and won't interfere with the stream processing.
           *
           * @see https://github.com/apache/kafka/blob/9aa660786e46c1efbf5605a6a69136a1dac6edb9/clients/src/main/java/org/apache/kafka/clients/consumer/internals/Fetcher.java#L1499-L1505
           */
          const offsetToResolve =
            lastFilteredMessage && isSameOffset(offset, lastFilteredMessage.offset)
              ? batch.lastOffset()
              : offset

          this.consumerGroup.resolveOffset({ topic, partition, offset: offsetToResolve })
        },
        heartbeat: async () => {
          await this.consumerGroup.heartbeat({ interval: this.heartbeatInterval })
        },
        /**
         * Commit offsets if provided. Otherwise commit most recent resolved offsets
         * if the autoCommit conditions are met.
         *
         * @param {OffsetsByTopicPartition} [offsets] Optional.
         */
        commitOffsetsIfNecessary: async offsets => {
          return offsets
            ? this.consumerGroup.commitOffsets(offsets)
            : this.consumerGroup.commitOffsetsIfNecessary()
        },
        uncommittedOffsets: () => this.consumerGroup.uncommittedOffsets(),
        isRunning: () => this.running,
        isStale: () => this.consumerGroup.hasSeekOffset({ topic, partition }),
      })
    } catch (e) {
      if (!isKafkaJSError(e)) {
        this.logger.error(`Error when calling eachBatch`, {
          topic,
          partition,
          offset: batch.firstOffset(),
          stack: e.stack,
          error: e,
        })
      }

      // eachBatch has a special resolveOffset which can be used
      // to keep track of the messages
      await this.autoCommitOffsets()
      throw e
    }

    // resolveOffset for the last offset can be disabled to allow the users of eachBatch to
    // stop their consumers without resolving unprocessed offsets (issues/18)
    if (this.eachBatchAutoResolve) {
      this.consumerGroup.resolveOffset({ topic, partition, offset: batch.lastOffset() })
    }
  }

  async fetch() {
    const startFetch = Date.now()

    this.instrumentationEmitter.emit(FETCH_START, {})

    const iterator = await this.consumerGroup.fetch()

    this.instrumentationEmitter.emit(FETCH, {
      /**
       * PR #570 removed support for the number of batches in this instrumentation event;
       * The new implementation uses an async generation to deliver the batches, which makes
       * this number impossible to get. The number is set to 0 to keep the event backward
       * compatible until we bump KafkaJS to version 2, following the end of node 8 LTS.
       *
       * @since 2019-11-29
       */
      numberOfBatches: 0,
      duration: Date.now() - startFetch,
    })

    const onBatch = async batch => {
      const startBatchProcess = Date.now()
      const payload = {
        topic: batch.topic,
        partition: batch.partition,
        highWatermark: batch.highWatermark,
        offsetLag: batch.offsetLag(),
        /**
         * @since 2019-06-24 (>= 1.8.0)
         *
         * offsetLag returns the lag based on the latest offset in the batch, to
         * keep the event backward compatible we just introduced "offsetLagLow"
         * which calculates the lag based on the first offset in the batch
         */
        offsetLagLow: batch.offsetLagLow(),
        batchSize: batch.messages.length,
        firstOffset: batch.firstOffset(),
        lastOffset: batch.lastOffset(),
      }

      /**
       * If the batch contained only control records or only aborted messages then we still
       * need to resolve and auto-commit to ensure the consumer can move forward.
       *
       * We also need to emit batch instrumentation events to allow any listeners keeping
       * track of offsets to know about the latest point of consumption.
       *
       * Added in #1256
       *
       * @see https://github.com/apache/kafka/blob/9aa660786e46c1efbf5605a6a69136a1dac6edb9/clients/src/main/java/org/apache/kafka/clients/consumer/internals/Fetcher.java#L1499-L1505
       */
      if (batch.isEmptyDueToFiltering()) {
        this.instrumentationEmitter.emit(START_BATCH_PROCESS, payload)

        this.consumerGroup.resolveOffset({
          topic: batch.topic,
          partition: batch.partition,
          offset: batch.lastOffset(),
        })
        await this.autoCommitOffsetsIfNecessary()

        this.instrumentationEmitter.emit(END_BATCH_PROCESS, {
          ...payload,
          duration: Date.now() - startBatchProcess,
        })
        return
      }

      if (batch.isEmpty()) {
        return
      }

      this.instrumentationEmitter.emit(START_BATCH_PROCESS, payload)

      if (this.eachMessage) {
        await this.processEachMessage(batch)
      } else if (this.eachBatch) {
        await this.processEachBatch(batch)
      }

      this.instrumentationEmitter.emit(END_BATCH_PROCESS, {
        ...payload,
        duration: Date.now() - startBatchProcess,
      })

      await this.consumerGroup.heartbeat({ interval: this.heartbeatInterval })
    }

    const { lock, unlock, unlockWithError } = barrier()
    const concurrently = limitConcurrency({ limit: this.partitionsConsumedConcurrently })

    let requestsCompleted = false
    let numberOfExecutions = 0
    let expectedNumberOfExecutions = 0
    const enqueuedTasks = []

    while (true) {
      const result = iterator.next()

      if (result.done) {
        break
      }

      if (!this.running) {
        result.value.catch(error => {
          this.logger.debug('Ignoring error in fetch request while stopping runner', {
            error: error.message || error,
            stack: error.stack,
          })
        })

        continue
      }

      enqueuedTasks.push(async () => {
        const batches = await result.value
        expectedNumberOfExecutions += batches.length

        batches.map(batch =>
          concurrently(async () => {
            try {
              if (!this.running) {
                return
              }

              await onBatch(batch)
            } catch (e) {
              unlockWithError(e)
            } finally {
              numberOfExecutions++
              if (requestsCompleted && numberOfExecutions === expectedNumberOfExecutions) {
                unlock()
              }
            }
          }).catch(unlockWithError)
        )
      })
    }

    await Promise.all(enqueuedTasks.map(fn => fn()))
    requestsCompleted = true

    if (expectedNumberOfExecutions === numberOfExecutions) {
      unlock()
    }

    const error = await lock
    if (error) {
      throw error
    }

    await this.autoCommitOffsets()
    await this.consumerGroup.heartbeat({ interval: this.heartbeatInterval })
  }

  async scheduleFetch() {
    if (!this.running) {
      this.logger.debug('consumer not running, exiting', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
      })

      return
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        this.consuming = true
        await this.fetch()
        this.consuming = false

        if (this.running) {
          setImmediate(() => this.scheduleFetch())
        }
      } catch (e) {
        if (!this.running) {
          this.logger.debug('consumer not running, exiting', {
            error: e.message,
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
          })
          return
        }

        if (isRebalancing(e)) {
          this.logger.warn('The group is rebalancing, re-joining', {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            error: e.message,
            retryCount,
            retryTime,
          })

          this.instrumentationEmitter.emit(REBALANCING, {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
          })

          await this.join()
          setImmediate(() => this.scheduleFetch())
          return
        }

        if (e.type === 'UNKNOWN_MEMBER_ID') {
          this.logger.error('The coordinator is not aware of this member, re-joining the group', {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            error: e.message,
            retryCount,
            retryTime,
          })

          this.consumerGroup.memberId = null
          await this.join()
          setImmediate(() => this.scheduleFetch())
          return
        }

        if (e.name === 'KafkaJSOffsetOutOfRange') {
          setImmediate(() => this.scheduleFetch())
          return
        }

        if (e.name === 'KafkaJSNotImplemented') {
          return bail(e)
        }

        this.logger.debug('Error while fetching data, trying again...', {
          groupId: this.consumerGroup.groupId,
          memberId: this.consumerGroup.memberId,
          error: e.message,
          stack: e.stack,
          retryCount,
          retryTime,
        })

        throw e
      } finally {
        this.consuming = false
      }
    }).catch(this.onCrash)
  }

  autoCommitOffsets() {
    if (this.autoCommit) {
      return this.consumerGroup.commitOffsets()
    }
  }

  autoCommitOffsetsIfNecessary() {
    if (this.autoCommit) {
      return this.consumerGroup.commitOffsetsIfNecessary()
    }
  }

  commitOffsets(offsets) {
    if (!this.running) {
      this.logger.debug('consumer not running, exiting', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
        offsets,
      })
      return
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await this.consumerGroup.commitOffsets(offsets)
      } catch (e) {
        if (!this.running) {
          this.logger.debug('consumer not running, exiting', {
            error: e.message,
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            offsets,
          })
          return
        }

        if (isRebalancing(e)) {
          this.logger.warn('The group is rebalancing, re-joining', {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            error: e.message,
            retryCount,
            retryTime,
          })

          this.instrumentationEmitter.emit(REBALANCING, {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
          })

          setImmediate(() => this.scheduleJoin())

          bail(new KafkaJSError(e))
        }

        if (e.type === 'UNKNOWN_MEMBER_ID') {
          this.logger.error('The coordinator is not aware of this member, re-joining the group', {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            error: e.message,
            retryCount,
            retryTime,
          })

          this.consumerGroup.memberId = null
          setImmediate(() => this.scheduleJoin())

          bail(new KafkaJSError(e))
        }

        if (e.name === 'KafkaJSNotImplemented') {
          return bail(e)
        }

        this.logger.debug('Error while committing offsets, trying again...', {
          groupId: this.consumerGroup.groupId,
          memberId: this.consumerGroup.memberId,
          error: e.message,
          stack: e.stack,
          retryCount,
          retryTime,
          offsets,
        })

        throw e
      }
    })
  }
}


/***/ }),
/* 380 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { KafkaJSNonRetriableError } = __webpack_require__(19)

const REJECTED_ERROR = new KafkaJSNonRetriableError(
  'Queued function aborted due to earlier promise rejection'
)
function NOOP() {}

const concurrency = ({ limit, onChange = NOOP } = {}) => {
  if (isNaN(limit) || typeof limit !== 'number' || limit < 1) {
    throw new KafkaJSNonRetriableError(`"limit" cannot be less than 1`)
  }

  let waiting = []
  let semaphore = 0

  const clear = () => {
    for (const lazyAction of waiting) {
      lazyAction((_1, _2, reject) => reject(REJECTED_ERROR))
    }
    waiting = []
    semaphore = 0
  }

  const next = () => {
    semaphore--
    onChange(semaphore)

    if (waiting.length > 0) {
      const lazyAction = waiting.shift()
      lazyAction()
    }
  }

  const invoke = (action, resolve, reject) => {
    semaphore++
    onChange(semaphore)

    action()
      .then(result => {
        resolve(result)
        next()
      })
      .catch(error => {
        reject(error)
        clear()
      })
  }

  const push = (action, resolve, reject) => {
    if (semaphore < limit) {
      invoke(action, resolve, reject)
    } else {
      waiting.push(override => {
        const execute = override || invoke
        execute(action, resolve, reject)
      })
    }
  }

  return action => new Promise((resolve, reject) => push(action, resolve, reject))
}

module.exports = concurrency


/***/ }),
/* 381 */
/***/ ((module) => {

/**
 * @template T
 * @return {{lock: Promise<T>, unlock: (v?: T) => void, unlockWithError: (e: Error) => void}}
 */
module.exports = () => {
  let unlock
  let unlockWithError
  const lock = new Promise(resolve => {
    unlock = resolve
    unlockWithError = resolve
  })

  return { lock, unlock, unlockWithError }
}


/***/ }),
/* 382 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const roundRobin = __webpack_require__(383)

module.exports = {
  roundRobin,
}


/***/ }),
/* 383 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { MemberMetadata, MemberAssignment } = __webpack_require__(378)
const flatten = __webpack_require__(45)

/**
 * RoundRobinAssigner
 * @param {Cluster} cluster
 * @returns {function}
 */
module.exports = ({ cluster }) => ({
  name: 'RoundRobinAssigner',
  version: 1,

  /**
   * Assign the topics to the provided members.
   *
   * The members array contains information about each member, `memberMetadata` is the result of the
   * `protocol` operation.
   *
   * @param {array} members array of members, e.g:
                              [{ memberId: 'test-5f93f5a3', memberMetadata: Buffer }]
   * @param {array} topics
   * @returns {array} object partitions per topic per member, e.g:
   *                   [
   *                     {
   *                       memberId: 'test-5f93f5a3',
   *                       memberAssignment: {
   *                         'topic-A': [0, 2, 4, 6],
   *                         'topic-B': [1],
   *                       },
   *                     },
   *                     {
   *                       memberId: 'test-3d3d5341',
   *                       memberAssignment: {
   *                         'topic-A': [1, 3, 5],
   *                         'topic-B': [0, 2],
   *                       },
   *                     }
   *                   ]
   */
  async assign({ members, topics }) {
    const membersCount = members.length
    const sortedMembers = members.map(({ memberId }) => memberId).sort()
    const assignment = {}

    const topicsPartionArrays = topics.map(topic => {
      const partitionMetadata = cluster.findTopicPartitionMetadata(topic)
      return partitionMetadata.map(m => ({ topic: topic, partitionId: m.partitionId }))
    })
    const topicsPartitions = flatten(topicsPartionArrays)

    topicsPartitions.forEach((topicPartition, i) => {
      const assignee = sortedMembers[i % membersCount]

      if (!assignment[assignee]) {
        assignment[assignee] = Object.create(null)
      }

      if (!assignment[assignee][topicPartition.topic]) {
        assignment[assignee][topicPartition.topic] = []
      }

      assignment[assignee][topicPartition.topic].push(topicPartition.partitionId)
    })

    return Object.keys(assignment).map(memberId => ({
      memberId,
      memberAssignment: MemberAssignment.encode({
        version: this.version,
        assignment: assignment[memberId],
      }),
    }))
  },

  protocol({ topics }) {
    return {
      name: this.name,
      metadata: MemberMetadata.encode({
        version: this.version,
        topics,
      }),
    }
  },
})


/***/ }),
/* 384 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createRetry = __webpack_require__(332)
const flatten = __webpack_require__(45)
const waitFor = __webpack_require__(385)
const groupBy = __webpack_require__(386)
const createConsumer = __webpack_require__(366)
const InstrumentationEventEmitter = __webpack_require__(16)
const { events, wrap: wrapEvent, unwrap: unwrapEvent } = __webpack_require__(387)
const { LEVELS } = __webpack_require__(15)
const {
  KafkaJSNonRetriableError,
  KafkaJSDeleteGroupsError,
  KafkaJSBrokerNotFound,
  KafkaJSDeleteTopicRecordsError,
  KafkaJSAggregateError,
} = __webpack_require__(19)
const { staleMetadata } = __webpack_require__(43)
const CONFIG_RESOURCE_TYPES = __webpack_require__(283)
const ACL_RESOURCE_TYPES = __webpack_require__(388)
const ACL_OPERATION_TYPES = __webpack_require__(389)
const ACL_PERMISSION_TYPES = __webpack_require__(390)
const RESOURCE_PATTERN_TYPES = __webpack_require__(391)
const { EARLIEST_OFFSET, LATEST_OFFSET } = __webpack_require__(340)

const { CONNECT, DISCONNECT } = events

const NO_CONTROLLER_ID = -1

const { values, keys, entries } = Object
const eventNames = values(events)
const eventKeys = keys(events)
  .map(key => `admin.events.${key}`)
  .join(', ')

const retryOnLeaderNotAvailable = (fn, opts = {}) => {
  const callback = async () => {
    try {
      return await fn()
    } catch (e) {
      if (e.type !== 'LEADER_NOT_AVAILABLE') {
        throw e
      }
      return false
    }
  }

  return waitFor(callback, opts)
}

const isConsumerGroupRunning = description => ['Empty', 'Dead'].includes(description.state)
const findTopicPartitions = async (cluster, topic) => {
  await cluster.addTargetTopic(topic)
  await cluster.refreshMetadataIfNecessary()

  return cluster
    .findTopicPartitionMetadata(topic)
    .map(({ partitionId }) => partitionId)
    .sort()
}
const indexByPartition = array =>
  array.reduce(
    (obj, { partition, ...props }) => Object.assign(obj, { [partition]: { ...props } }),
    {}
  )

/**
 *
 * @param {Object} params
 * @param {import("../../types").Logger} params.logger
 * @param {InstrumentationEventEmitter} [params.instrumentationEmitter]
 * @param {import('../../types').RetryOptions} params.retry
 * @param {import("../../types").Cluster} params.cluster
 *
 * @returns {import("../../types").Admin}
 */
module.exports = ({
  logger: rootLogger,
  instrumentationEmitter: rootInstrumentationEmitter,
  retry,
  cluster,
}) => {
  const logger = rootLogger.namespace('Admin')
  const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter()

  /**
   * @returns {Promise}
   */
  const connect = async () => {
    await cluster.connect()
    instrumentationEmitter.emit(CONNECT)
  }

  /**
   * @return {Promise}
   */
  const disconnect = async () => {
    await cluster.disconnect()
    instrumentationEmitter.emit(DISCONNECT)
  }

  /**
   * @return {Promise}
   */
  const listTopics = async () => {
    const { topicMetadata } = await cluster.metadata()
    const topics = topicMetadata.map(t => t.topic)
    return topics
  }

  /**
   * @param {Object} request
   * @param {array} request.topics
   * @param {boolean} [request.validateOnly=false]
   * @param {number} [request.timeout=5000]
   * @param {boolean} [request.waitForLeaders=true]
   * @return {Promise}
   */
  const createTopics = async ({ topics, validateOnly, timeout, waitForLeaders = true }) => {
    if (!topics || !Array.isArray(topics)) {
      throw new KafkaJSNonRetriableError(`Invalid topics array ${topics}`)
    }

    if (topics.filter(({ topic }) => typeof topic !== 'string').length > 0) {
      throw new KafkaJSNonRetriableError(
        'Invalid topics array, the topic names have to be a valid string'
      )
    }

    const topicNames = new Set(topics.map(({ topic }) => topic))
    if (topicNames.size < topics.length) {
      throw new KafkaJSNonRetriableError(
        'Invalid topics array, it cannot have multiple entries for the same topic'
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.createTopics({ topics, validateOnly, timeout })

        if (waitForLeaders) {
          const topicNamesArray = Array.from(topicNames.values())
          await retryOnLeaderNotAvailable(async () => await broker.metadata(topicNamesArray), {
            delay: 100,
            maxWait: timeout,
            timeoutMessage: 'Timed out while waiting for topic leaders',
          })
        }

        return true
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not create topics', { error: e.message, retryCount, retryTime })
          throw e
        }

        if (e instanceof KafkaJSAggregateError) {
          if (e.errors.every(error => error.type === 'TOPIC_ALREADY_EXISTS')) {
            return false
          }
        }

        bail(e)
      }
    })
  }
  /**
   * @param {array} topicPartitions
   * @param {boolean} [validateOnly=false]
   * @param {number} [timeout=5000]
   * @return {Promise<void>}
   */
  const createPartitions = async ({ topicPartitions, validateOnly, timeout }) => {
    if (!topicPartitions || !Array.isArray(topicPartitions)) {
      throw new KafkaJSNonRetriableError(`Invalid topic partitions array ${topicPartitions}`)
    }
    if (topicPartitions.length === 0) {
      throw new KafkaJSNonRetriableError(`Empty topic partitions array`)
    }

    if (topicPartitions.filter(({ topic }) => typeof topic !== 'string').length > 0) {
      throw new KafkaJSNonRetriableError(
        'Invalid topic partitions array, the topic names have to be a valid string'
      )
    }

    const topicNames = new Set(topicPartitions.map(({ topic }) => topic))
    if (topicNames.size < topicPartitions.length) {
      throw new KafkaJSNonRetriableError(
        'Invalid topic partitions array, it cannot have multiple entries for the same topic'
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.createPartitions({ topicPartitions, validateOnly, timeout })
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not create topics', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {string[]} topics
   * @param {number} [timeout=5000]
   * @return {Promise}
   */
  const deleteTopics = async ({ topics, timeout }) => {
    if (!topics || !Array.isArray(topics)) {
      throw new KafkaJSNonRetriableError(`Invalid topics array ${topics}`)
    }

    if (topics.filter(topic => typeof topic !== 'string').length > 0) {
      throw new KafkaJSNonRetriableError('Invalid topics array, the names must be a valid string')
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.deleteTopics({ topics, timeout })

        // Remove deleted topics
        for (const topic of topics) {
          cluster.targetTopics.delete(topic)
        }

        await cluster.refreshMetadata()
      } catch (e) {
        if (['NOT_CONTROLLER', 'UNKNOWN_TOPIC_OR_PARTITION'].includes(e.type)) {
          logger.warn('Could not delete topics', { error: e.message, retryCount, retryTime })
          throw e
        }

        if (e.type === 'REQUEST_TIMED_OUT') {
          logger.error(
            'Could not delete topics, check if "delete.topic.enable" is set to "true" (the default value is "false") or increase the timeout',
            {
              error: e.message,
              retryCount,
              retryTime,
            }
          )
        }

        bail(e)
      }
    })
  }

  /**
   * @param {string} topic
   */

  const fetchTopicOffsets = async topic => {
    if (!topic || typeof topic !== 'string') {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.addTargetTopic(topic)
        await cluster.refreshMetadataIfNecessary()

        const metadata = cluster.findTopicPartitionMetadata(topic)
        const high = await cluster.fetchTopicsOffset([
          {
            topic,
            fromBeginning: false,
            partitions: metadata.map(p => ({ partition: p.partitionId })),
          },
        ])

        const low = await cluster.fetchTopicsOffset([
          {
            topic,
            fromBeginning: true,
            partitions: metadata.map(p => ({ partition: p.partitionId })),
          },
        ])

        const { partitions: highPartitions } = high.pop()
        const { partitions: lowPartitions } = low.pop()
        return highPartitions.map(({ partition, offset }) => ({
          partition,
          offset,
          high: offset,
          low: lowPartitions.find(({ partition: lowPartition }) => lowPartition === partition)
            .offset,
        }))
      } catch (e) {
        if (e.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
          await cluster.refreshMetadata()
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {string} topic
   * @param {number} [timestamp]
   */

  const fetchTopicOffsetsByTimestamp = async (topic, timestamp) => {
    if (!topic || typeof topic !== 'string') {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.addTargetTopic(topic)
        await cluster.refreshMetadataIfNecessary()

        const metadata = cluster.findTopicPartitionMetadata(topic)
        const partitions = metadata.map(p => ({ partition: p.partitionId }))

        const high = await cluster.fetchTopicsOffset([
          {
            topic,
            fromBeginning: false,
            partitions,
          },
        ])
        const { partitions: highPartitions } = high.pop()

        const offsets = await cluster.fetchTopicsOffset([
          {
            topic,
            fromTimestamp: timestamp,
            partitions,
          },
        ])
        const { partitions: lowPartitions } = offsets.pop()

        return lowPartitions.map(({ partition, offset }) => ({
          partition,
          offset:
            parseInt(offset, 10) >= 0
              ? offset
              : highPartitions.find(({ partition: highPartition }) => highPartition === partition)
                  .offset,
        }))
      } catch (e) {
        if (e.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
          await cluster.refreshMetadata()
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * Fetch offsets for a topic or multiple topics
   *
   * Note: set either topic or topics but not both.
   *
   * @param {string} groupId
   * @param {string} topic - deprecated, use the `topics` parameter. Topic to fetch offsets for.
   * @param {string[]} topics - list of topics to fetch offsets for, defaults to `[]` which fetches all topics for `groupId`.
   * @param {boolean} [resolveOffsets=false]
   * @return {Promise}
   */
  const fetchOffsets = async ({ groupId, topic, topics, resolveOffsets = false }) => {
    if (!groupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`)
    }

    if (!topic && !topics) {
      topics = []
    }

    if (!topic && !Array.isArray(topics)) {
      throw new KafkaJSNonRetriableError(`Expected topic or topics array to be set`)
    }

    if (topic && topics) {
      throw new KafkaJSNonRetriableError(`Either topic or topics must be set, not both`)
    }

    if (topic) {
      topics = [topic]
    }

    const coordinator = await cluster.findGroupCoordinator({ groupId })
    const topicsToFetch = await Promise.all(
      topics.map(async topic => {
        const partitions = await findTopicPartitions(cluster, topic)
        const partitionsToFetch = partitions.map(partition => ({ partition }))
        return { topic, partitions: partitionsToFetch }
      })
    )
    let { responses: consumerOffsets } = await coordinator.offsetFetch({
      groupId,
      topics: topicsToFetch,
    })

    if (resolveOffsets) {
      consumerOffsets = await Promise.all(
        consumerOffsets.map(async ({ topic, partitions }) => {
          const indexedOffsets = indexByPartition(await fetchTopicOffsets(topic))
          const recalculatedPartitions = partitions.map(({ offset, partition, ...props }) => {
            let resolvedOffset = offset
            if (Number(offset) === EARLIEST_OFFSET) {
              resolvedOffset = indexedOffsets[partition].low
            }
            if (Number(offset) === LATEST_OFFSET) {
              resolvedOffset = indexedOffsets[partition].high
            }
            return {
              partition,
              offset: resolvedOffset,
              ...props,
            }
          })

          await setOffsets({ groupId, topic, partitions: recalculatedPartitions })

          return {
            topic,
            partitions: recalculatedPartitions,
          }
        })
      )
    }

    const result = consumerOffsets.map(({ topic, partitions }) => {
      const completePartitions = partitions.map(({ partition, offset, metadata }) => ({
        partition,
        offset,
        metadata: metadata || null,
      }))

      return { topic, partitions: completePartitions }
    })

    if (topic) {
      return result.pop().partitions
    } else {
      return result
    }
  }

  /**
   * @param {string} groupId
   * @param {string} topic
   * @param {boolean} [earliest=false]
   * @return {Promise}
   */
  const resetOffsets = async ({ groupId, topic, earliest = false }) => {
    if (!groupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`)
    }

    if (!topic) {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    const partitions = await findTopicPartitions(cluster, topic)
    const partitionsToSeek = partitions.map(partition => ({
      partition,
      offset: cluster.defaultOffset({ fromBeginning: earliest }),
    }))

    return setOffsets({ groupId, topic, partitions: partitionsToSeek })
  }

  /**
   * @param {string} groupId
   * @param {string} topic
   * @param {Array<SeekEntry>} partitions
   * @return {Promise}
   *
   * @typedef {Object} SeekEntry
   * @property {number} partition
   * @property {string} offset
   */
  const setOffsets = async ({ groupId, topic, partitions }) => {
    if (!groupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`)
    }

    if (!topic) {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    if (!partitions || partitions.length === 0) {
      throw new KafkaJSNonRetriableError(`Invalid partitions`)
    }

    const consumer = createConsumer({
      logger: rootLogger.namespace('Admin', LEVELS.NOTHING),
      cluster,
      groupId,
    })

    await consumer.subscribe({ topic, fromBeginning: true })
    const description = await consumer.describeGroup()

    if (!isConsumerGroupRunning(description)) {
      throw new KafkaJSNonRetriableError(
        `The consumer group must have no running instances, current state: ${description.state}`
      )
    }

    return new Promise((resolve, reject) => {
      consumer.on(consumer.events.FETCH, async () =>
        consumer
          .stop()
          .then(resolve)
          .catch(reject)
      )

      consumer
        .run({
          eachBatchAutoResolve: false,
          eachBatch: async () => true,
        })
        .catch(reject)

      // This consumer doesn't need to consume any data
      consumer.pause([{ topic }])

      for (const seekData of partitions) {
        consumer.seek({ topic, ...seekData })
      }
    })
  }

  const isBrokerConfig = type =>
    [CONFIG_RESOURCE_TYPES.BROKER, CONFIG_RESOURCE_TYPES.BROKER_LOGGER].includes(type)

  /**
   * Broker configs can only be returned by the target broker
   *
   * @see
   * https://github.com/apache/kafka/blob/821c1ac6641845aeca96a43bc2b946ecec5cba4f/clients/src/main/java/org/apache/kafka/clients/admin/KafkaAdminClient.java#L3783
   * https://github.com/apache/kafka/blob/821c1ac6641845aeca96a43bc2b946ecec5cba4f/clients/src/main/java/org/apache/kafka/clients/admin/KafkaAdminClient.java#L2027
   *
   * @param {Broker} defaultBroker. Broker used in case the configuration is not a broker config
   */
  const groupResourcesByBroker = ({ resources, defaultBroker }) =>
    groupBy(resources, async ({ type, name: nodeId }) => {
      return isBrokerConfig(type)
        ? await cluster.findBroker({ nodeId: String(nodeId) })
        : defaultBroker
    })

  /**
   * @param {Array<ResourceConfigQuery>} resources
   * @param {boolean} [includeSynonyms=false]
   * @return {Promise}
   *
   * @typedef {Object} ResourceConfigQuery
   * @property {ConfigResourceType} type
   * @property {string} name
   * @property {Array<String>} [configNames=[]]
   */
  const describeConfigs = async ({ resources, includeSynonyms }) => {
    if (!resources || !Array.isArray(resources)) {
      throw new KafkaJSNonRetriableError(`Invalid resources array ${resources}`)
    }

    if (resources.length === 0) {
      throw new KafkaJSNonRetriableError('Resources array cannot be empty')
    }

    const validResourceTypes = Object.values(CONFIG_RESOURCE_TYPES)
    const invalidType = resources.find(r => !validResourceTypes.includes(r.type))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.type}: ${JSON.stringify(invalidType)}`
      )
    }

    const invalidName = resources.find(r => !r.name || typeof r.name !== 'string')

    if (invalidName) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource name ${invalidName.name}: ${JSON.stringify(invalidName)}`
      )
    }

    const invalidConfigs = resources.find(
      r => !Array.isArray(r.configNames) && r.configNames != null
    )

    if (invalidConfigs) {
      const { configNames } = invalidConfigs
      throw new KafkaJSNonRetriableError(
        `Invalid resource configNames ${configNames}: ${JSON.stringify(invalidConfigs)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const controller = await cluster.findControllerBroker()
        const resourcerByBroker = await groupResourcesByBroker({
          resources,
          defaultBroker: controller,
        })

        const describeConfigsAction = async broker => {
          const targetBroker = broker || controller
          return targetBroker.describeConfigs({
            resources: resourcerByBroker.get(targetBroker),
            includeSynonyms,
          })
        }

        const brokers = Array.from(resourcerByBroker.keys())
        const responses = await Promise.all(brokers.map(describeConfigsAction))
        const responseResources = responses.reduce(
          (result, { resources }) => [...result, ...resources],
          []
        )

        return { resources: responseResources }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not describe configs', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {Array<ResourceConfig>} resources
   * @param {boolean} [validateOnly=false]
   * @return {Promise}
   *
   * @typedef {Object} ResourceConfig
   * @property {ConfigResourceType} type
   * @property {string} name
   * @property {Array<ResourceConfigEntry>} configEntries
   *
   * @typedef {Object} ResourceConfigEntry
   * @property {string} name
   * @property {string} value
   */
  const alterConfigs = async ({ resources, validateOnly }) => {
    if (!resources || !Array.isArray(resources)) {
      throw new KafkaJSNonRetriableError(`Invalid resources array ${resources}`)
    }

    if (resources.length === 0) {
      throw new KafkaJSNonRetriableError('Resources array cannot be empty')
    }

    const validResourceTypes = Object.values(CONFIG_RESOURCE_TYPES)
    const invalidType = resources.find(r => !validResourceTypes.includes(r.type))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.type}: ${JSON.stringify(invalidType)}`
      )
    }

    const invalidName = resources.find(r => !r.name || typeof r.name !== 'string')

    if (invalidName) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource name ${invalidName.name}: ${JSON.stringify(invalidName)}`
      )
    }

    const invalidConfigs = resources.find(r => !Array.isArray(r.configEntries))

    if (invalidConfigs) {
      const { configEntries } = invalidConfigs
      throw new KafkaJSNonRetriableError(
        `Invalid resource configEntries ${configEntries}: ${JSON.stringify(invalidConfigs)}`
      )
    }

    const invalidConfigValue = resources.find(r =>
      r.configEntries.some(e => typeof e.name !== 'string' || typeof e.value !== 'string')
    )

    if (invalidConfigValue) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource config value: ${JSON.stringify(invalidConfigValue)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const controller = await cluster.findControllerBroker()
        const resourcerByBroker = await groupResourcesByBroker({
          resources,
          defaultBroker: controller,
        })

        const alterConfigsAction = async broker => {
          const targetBroker = broker || controller
          return targetBroker.alterConfigs({
            resources: resourcerByBroker.get(targetBroker),
            validateOnly: !!validateOnly,
          })
        }

        const brokers = Array.from(resourcerByBroker.keys())
        const responses = await Promise.all(brokers.map(alterConfigsAction))
        const responseResources = responses.reduce(
          (result, { resources }) => [...result, ...resources],
          []
        )

        return { resources: responseResources }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not alter configs', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @deprecated - This method was replaced by `fetchTopicMetadata`. This implementation
   * is limited by the topics in the target group, so it can't fetch all topics when
   * necessary.
   *
   * Fetch metadata for provided topics.
   *
   * If no topics are provided fetch metadata for all topics of which we are aware.
   * @see https://kafka.apache.org/protocol#The_Messages_Metadata
   *
   * @param {Object} [options]
   * @param {string[]} [options.topics]
   * @return {Promise<TopicsMetadata>}
   *
   * @typedef {Object} TopicsMetadata
   * @property {Array<TopicMetadata>} topics
   *
   * @typedef {Object} TopicMetadata
   * @property {String} name
   * @property {Array<PartitionMetadata>} partitions
   *
   * @typedef {Object} PartitionMetadata
   * @property {number} partitionErrorCode Response error code
   * @property {number} partitionId Topic partition id
   * @property {number} leader  The id of the broker acting as leader for this partition.
   * @property {Array<number>} replicas The set of all nodes that host this partition.
   * @property {Array<number>} isr The set of nodes that are in sync with the leader for this partition.
   */
  const getTopicMetadata = async options => {
    const { topics } = options || {}

    if (topics) {
      await Promise.all(
        topics.map(async topic => {
          if (!topic) {
            throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
          }

          try {
            await cluster.addTargetTopic(topic)
          } catch (e) {
            e.message = `Failed to add target topic ${topic}: ${e.message}`
            throw e
          }
        })
      )
    }

    await cluster.refreshMetadataIfNecessary()
    const targetTopics = topics || [...cluster.targetTopics]

    return {
      topics: await Promise.all(
        targetTopics.map(async topic => ({
          name: topic,
          partitions: cluster.findTopicPartitionMetadata(topic),
        }))
      ),
    }
  }

  /**
   * Fetch metadata for provided topics.
   *
   * If no topics are provided fetch metadata for all topics.
   * @see https://kafka.apache.org/protocol#The_Messages_Metadata
   *
   * @param {Object} [options]
   * @param {string[]} [options.topics]
   * @return {Promise<TopicsMetadata>}
   *
   * @typedef {Object} TopicsMetadata
   * @property {Array<TopicMetadata>} topics
   *
   * @typedef {Object} TopicMetadata
   * @property {String} name
   * @property {Array<PartitionMetadata>} partitions
   *
   * @typedef {Object} PartitionMetadata
   * @property {number} partitionErrorCode Response error code
   * @property {number} partitionId Topic partition id
   * @property {number} leader  The id of the broker acting as leader for this partition.
   * @property {Array<number>} replicas The set of all nodes that host this partition.
   * @property {Array<number>} isr The set of nodes that are in sync with the leader for this partition.
   */
  const fetchTopicMetadata = async ({ topics = [] } = {}) => {
    if (topics) {
      topics.forEach(topic => {
        if (!topic || typeof topic !== 'string') {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
        }
      })
    }

    const metadata = await cluster.metadata({ topics })

    return {
      topics: metadata.topicMetadata.map(topicMetadata => ({
        name: topicMetadata.topic,
        partitions: topicMetadata.partitionMetadata,
      })),
    }
  }

  /**
   * Describe cluster
   *
   * @return {Promise<ClusterMetadata>}
   *
   * @typedef {Object} ClusterMetadata
   * @property {Array<Broker>} brokers
   * @property {Number} controller Current controller id. Returns null if unknown.
   * @property {String} clusterId
   *
   * @typedef {Object} Broker
   * @property {Number} nodeId
   * @property {String} host
   * @property {Number} port
   */
  const describeCluster = async () => {
    const { brokers: nodes, clusterId, controllerId } = await cluster.metadata({ topics: [] })
    const brokers = nodes.map(({ nodeId, host, port }) => ({
      nodeId,
      host,
      port,
    }))
    const controller =
      controllerId == null || controllerId === NO_CONTROLLER_ID ? null : controllerId

    return {
      brokers,
      controller,
      clusterId,
    }
  }

  /**
   * List groups in a broker
   *
   * @return {Promise<ListGroups>}
   *
   * @typedef {Object} ListGroups
   * @property {Array<ListGroup>} groups
   *
   * @typedef {Object} ListGroup
   * @property {string} groupId
   * @property {string} protocolType
   */
  const listGroups = async () => {
    await cluster.refreshMetadata()
    let groups = []
    for (var nodeId in cluster.brokerPool.brokers) {
      const broker = await cluster.findBroker({ nodeId })
      const response = await broker.listGroups()
      groups = groups.concat(response.groups)
    }

    return { groups }
  }

  /**
   * Describe groups by group ids
   * @param {Array<string>} groupIds
   *
   * @typedef {Object} GroupDescriptions
   * @property {Array<GroupDescription>} groups
   *
   * @return {Promise<GroupDescriptions>}
   */
  const describeGroups = async groupIds => {
    const coordinatorsForGroup = await Promise.all(
      groupIds.map(async groupId => {
        const coordinator = await cluster.findGroupCoordinator({ groupId })
        return {
          coordinator,
          groupId,
        }
      })
    )

    const groupsByCoordinator = Object.values(
      coordinatorsForGroup.reduce((coordinators, { coordinator, groupId }) => {
        const group = coordinators[coordinator.nodeId]

        if (group) {
          coordinators[coordinator.nodeId] = {
            ...group,
            groupIds: [...group.groupIds, groupId],
          }
        } else {
          coordinators[coordinator.nodeId] = { coordinator, groupIds: [groupId] }
        }
        return coordinators
      }, {})
    )

    const responses = await Promise.all(
      groupsByCoordinator.map(async ({ coordinator, groupIds }) => {
        const retrier = createRetry(retry)
        const { groups } = await retrier(() => coordinator.describeGroups({ groupIds }))
        return groups
      })
    )

    const groups = [].concat.apply([], responses)

    return { groups }
  }

  /**
   * Delete groups in a broker
   *
   * @param {string[]} [groupIds]
   * @return {Promise<DeleteGroups>}
   *
   * @typedef {Array} DeleteGroups
   * @property {string} groupId
   * @property {number} errorCode
   */
  const deleteGroups = async groupIds => {
    if (!groupIds || !Array.isArray(groupIds)) {
      throw new KafkaJSNonRetriableError(`Invalid groupIds array ${groupIds}`)
    }

    const invalidGroupId = groupIds.some(g => typeof g !== 'string')

    if (invalidGroupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId name: ${JSON.stringify(invalidGroupId)}`)
    }

    const retrier = createRetry(retry)

    let results = []

    let clonedGroupIds = groupIds.slice()

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        if (clonedGroupIds.length === 0) return []

        await cluster.refreshMetadata()

        const brokersPerGroups = {}
        const brokersPerNode = {}
        for (const groupId of clonedGroupIds) {
          const broker = await cluster.findGroupCoordinator({ groupId })
          if (brokersPerGroups[broker.nodeId] === undefined) brokersPerGroups[broker.nodeId] = []
          brokersPerGroups[broker.nodeId].push(groupId)
          brokersPerNode[broker.nodeId] = broker
        }

        const res = await Promise.all(
          Object.keys(brokersPerNode).map(
            async nodeId => await brokersPerNode[nodeId].deleteGroups(brokersPerGroups[nodeId])
          )
        )

        const errors = flatten(
          res.map(({ results }) =>
            results.map(({ groupId, errorCode, error }) => {
              return { groupId, errorCode, error }
            })
          )
        ).filter(({ errorCode }) => errorCode !== 0)

        clonedGroupIds = errors.map(({ groupId }) => groupId)

        if (errors.length > 0) throw new KafkaJSDeleteGroupsError('Error in DeleteGroups', errors)

        results = flatten(res.map(({ results }) => results))

        return results
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER' || e.type === 'COORDINATOR_NOT_AVAILABLE') {
          logger.warn('Could not delete groups', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * Delete topic records up to the selected partition offsets
   *
   * @param {string} topic
   * @param {Array<SeekEntry>} partitions
   * @return {Promise}
   *
   * @typedef {Object} SeekEntry
   * @property {number} partition
   * @property {string} offset
   */
  const deleteTopicRecords = async ({ topic, partitions }) => {
    if (!topic || typeof topic !== 'string') {
      throw new KafkaJSNonRetriableError(`Invalid topic "${topic}"`)
    }

    if (!partitions || partitions.length === 0) {
      throw new KafkaJSNonRetriableError(`Invalid partitions`)
    }

    const partitionsByBroker = cluster.findLeaderForPartitions(
      topic,
      partitions.map(p => p.partition)
    )

    const partitionsFound = flatten(values(partitionsByBroker))
    const topicOffsets = await fetchTopicOffsets(topic)

    const leaderNotFoundErrors = []
    partitions.forEach(({ partition, offset }) => {
      // throw if no leader found for partition
      if (!partitionsFound.includes(partition)) {
        leaderNotFoundErrors.push({
          partition,
          offset,
          error: new KafkaJSBrokerNotFound('Could not find the leader for the partition', {
            retriable: false,
          }),
        })
        return
      }
      const { low } = topicOffsets.find(p => p.partition === partition) || {
        high: undefined,
        low: undefined,
      }
      // warn in case of offset below low watermark
      if (parseInt(offset) < parseInt(low) && parseInt(offset) !== -1) {
        logger.warn(
          'The requested offset is before the earliest offset maintained on the partition - no records will be deleted from this partition',
          {
            topic,
            partition,
            offset,
          }
        )
      }
    })

    if (leaderNotFoundErrors.length > 0) {
      throw new KafkaJSDeleteTopicRecordsError({ topic, partitions: leaderNotFoundErrors })
    }

    const seekEntriesByBroker = entries(partitionsByBroker).reduce(
      (obj, [nodeId, nodePartitions]) => {
        obj[nodeId] = {
          topic,
          partitions: partitions.filter(p => nodePartitions.includes(p.partition)),
        }
        return obj
      },
      {}
    )

    const retrier = createRetry(retry)
    return retrier(async bail => {
      try {
        const partitionErrors = []

        const brokerRequests = entries(seekEntriesByBroker).map(
          ([nodeId, { topic, partitions }]) => async () => {
            const broker = await cluster.findBroker({ nodeId })
            await broker.deleteRecords({ topics: [{ topic, partitions }] })
            // remove successful entry so it's ignored on retry
            delete seekEntriesByBroker[nodeId]
          }
        )

        await Promise.all(
          brokerRequests.map(request =>
            request().catch(e => {
              if (e.name === 'KafkaJSDeleteTopicRecordsError') {
                e.partitions.forEach(({ partition, offset, error }) => {
                  partitionErrors.push({
                    partition,
                    offset,
                    error,
                  })
                })
              } else {
                // then it's an unknown error, not from the broker response
                throw e
              }
            })
          )
        )

        if (partitionErrors.length > 0) {
          throw new KafkaJSDeleteTopicRecordsError({
            topic,
            partitions: partitionErrors,
          })
        }
      } catch (e) {
        if (
          e.retriable &&
          e.partitions.some(
            ({ error }) => staleMetadata(error) || error.name === 'KafkaJSMetadataNotLoaded'
          )
        ) {
          await cluster.refreshMetadata()
        }
        throw e
      }
    })
  }

  /**
   * @param {Array<ACLEntry>} acl
   * @return {Promise<void>}
   *
   * @typedef {Object} ACLEntry
   */
  const createAcls = async ({ acl }) => {
    if (!acl || !Array.isArray(acl)) {
      throw new KafkaJSNonRetriableError(`Invalid ACL array ${acl}`)
    }
    if (acl.length === 0) {
      throw new KafkaJSNonRetriableError('Empty ACL array')
    }

    // Validate principal
    if (acl.some(({ principal }) => typeof principal !== 'string')) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL array, the principals have to be a valid string'
      )
    }

    // Validate host
    if (acl.some(({ host }) => typeof host !== 'string')) {
      throw new KafkaJSNonRetriableError('Invalid ACL array, the hosts have to be a valid string')
    }

    // Validate resourceName
    if (acl.some(({ resourceName }) => typeof resourceName !== 'string')) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL array, the resourceNames have to be a valid string'
      )
    }

    let invalidType
    // Validate operation
    const validOperationTypes = Object.values(ACL_OPERATION_TYPES)
    invalidType = acl.find(i => !validOperationTypes.includes(i.operation))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid operation type ${invalidType.operation}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourcePatternTypes
    const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES)
    invalidType = acl.find(i => !validResourcePatternTypes.includes(i.resourcePatternType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource pattern type ${invalidType.resourcePatternType}: ${JSON.stringify(
          invalidType
        )}`
      )
    }

    // Validate permissionTypes
    const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES)
    invalidType = acl.find(i => !validPermissionTypes.includes(i.permissionType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid permission type ${invalidType.permissionType}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourceTypes
    const validResourceTypes = Object.values(ACL_RESOURCE_TYPES)
    invalidType = acl.find(i => !validResourceTypes.includes(i.resourceType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.resourceType}: ${JSON.stringify(invalidType)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.createAcls({ acl })

        return true
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not create ACL', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {ACLResourceTypes} resourceType The type of resource
   * @param {string} resourceName The name of the resource
   * @param {ACLResourcePatternTypes} resourcePatternType The resource pattern type filter
   * @param {string} principal The principal name
   * @param {string} host The hostname
   * @param {ACLOperationTypes} operation The type of operation
   * @param {ACLPermissionTypes} permissionType The type of permission
   * @return {Promise<void>}
   *
   * @typedef {number} ACLResourceTypes
   * @typedef {number} ACLResourcePatternTypes
   * @typedef {number} ACLOperationTypes
   * @typedef {number} ACLPermissionTypes
   */
  const describeAcls = async ({
    resourceType,
    resourceName,
    resourcePatternType,
    principal,
    host,
    operation,
    permissionType,
  }) => {
    // Validate principal
    if (typeof principal !== 'string' && typeof principal !== 'undefined') {
      throw new KafkaJSNonRetriableError(
        'Invalid principal, the principal have to be a valid string'
      )
    }

    // Validate host
    if (typeof host !== 'string' && typeof host !== 'undefined') {
      throw new KafkaJSNonRetriableError('Invalid host, the host have to be a valid string')
    }

    // Validate resourceName
    if (typeof resourceName !== 'string' && typeof resourceName !== 'undefined') {
      throw new KafkaJSNonRetriableError(
        'Invalid resourceName, the resourceName have to be a valid string'
      )
    }

    // Validate operation
    const validOperationTypes = Object.values(ACL_OPERATION_TYPES)
    if (!validOperationTypes.includes(operation)) {
      throw new KafkaJSNonRetriableError(`Invalid operation type ${operation}`)
    }

    // Validate resourcePatternType
    const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES)
    if (!validResourcePatternTypes.includes(resourcePatternType)) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource pattern filter type ${resourcePatternType}`
      )
    }

    // Validate permissionType
    const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES)
    if (!validPermissionTypes.includes(permissionType)) {
      throw new KafkaJSNonRetriableError(`Invalid permission type ${permissionType}`)
    }

    // Validate resourceType
    const validResourceTypes = Object.values(ACL_RESOURCE_TYPES)
    if (!validResourceTypes.includes(resourceType)) {
      throw new KafkaJSNonRetriableError(`Invalid resource type ${resourceType}`)
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        const { resources } = await broker.describeAcls({
          resourceType,
          resourceName,
          resourcePatternType,
          principal,
          host,
          operation,
          permissionType,
        })
        return { resources }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not describe ACL', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {Array<ACLFilter>} filters
   * @return {Promise<void>}
   *
   * @typedef {Object} ACLFilter
   */
  const deleteAcls = async ({ filters }) => {
    if (!filters || !Array.isArray(filters)) {
      throw new KafkaJSNonRetriableError(`Invalid ACL Filter array ${filters}`)
    }

    if (filters.length === 0) {
      throw new KafkaJSNonRetriableError('Empty ACL Filter array')
    }

    // Validate principal
    if (
      filters.some(
        ({ principal }) => typeof principal !== 'string' && typeof principal !== 'undefined'
      )
    ) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL Filter array, the principals have to be a valid string'
      )
    }

    // Validate host
    if (filters.some(({ host }) => typeof host !== 'string' && typeof host !== 'undefined')) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL Filter array, the hosts have to be a valid string'
      )
    }

    // Validate resourceName
    if (
      filters.some(
        ({ resourceName }) =>
          typeof resourceName !== 'string' && typeof resourceName !== 'undefined'
      )
    ) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL Filter array, the resourceNames have to be a valid string'
      )
    }

    let invalidType
    // Validate operation
    const validOperationTypes = Object.values(ACL_OPERATION_TYPES)
    invalidType = filters.find(i => !validOperationTypes.includes(i.operation))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid operation type ${invalidType.operation}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourcePatternTypes
    const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES)
    invalidType = filters.find(i => !validResourcePatternTypes.includes(i.resourcePatternType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource pattern type ${invalidType.resourcePatternType}: ${JSON.stringify(
          invalidType
        )}`
      )
    }

    // Validate permissionTypes
    const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES)
    invalidType = filters.find(i => !validPermissionTypes.includes(i.permissionType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid permission type ${invalidType.permissionType}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourceTypes
    const validResourceTypes = Object.values(ACL_RESOURCE_TYPES)
    invalidType = filters.find(i => !validResourceTypes.includes(i.resourceType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.resourceType}: ${JSON.stringify(invalidType)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        const { filterResponses } = await broker.deleteAcls({ filters })
        return { filterResponses }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not delete ACL', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /** @type {import("../../types").Admin["on"]} */
  const on = (eventName, listener) => {
    if (!eventNames.includes(eventName)) {
      throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`)
    }

    return instrumentationEmitter.addListener(unwrapEvent(eventName), event => {
      event.type = wrapEvent(event.type)
      Promise.resolve(listener(event)).catch(e => {
        logger.error(`Failed to execute listener: ${e.message}`, {
          eventName,
          stack: e.stack,
        })
      })
    })
  }

  /**
   * @return {Object} logger
   */
  const getLogger = () => logger

  return {
    connect,
    disconnect,
    listTopics,
    createTopics,
    deleteTopics,
    createPartitions,
    getTopicMetadata,
    fetchTopicMetadata,
    describeCluster,
    events,
    fetchOffsets,
    fetchTopicOffsets,
    fetchTopicOffsetsByTimestamp,
    setOffsets,
    resetOffsets,
    describeConfigs,
    alterConfigs,
    on,
    logger: getLogger,
    listGroups,
    describeGroups,
    deleteGroups,
    describeAcls,
    deleteAcls,
    createAcls,
    deleteTopicRecords,
  }
}


/***/ }),
/* 385 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const sleep = __webpack_require__(368)
const { KafkaJSTimeout } = __webpack_require__(19)

module.exports = (
  fn,
  { delay = 50, maxWait = 10000, timeoutMessage = 'Timeout', ignoreTimeout = false } = {}
) => {
  let timeoutId
  let totalWait = 0
  let fulfilled = false

  const checkCondition = async (resolve, reject) => {
    totalWait += delay
    await sleep(delay)

    try {
      const result = await fn(totalWait)
      if (result) {
        fulfilled = true
        clearTimeout(timeoutId)
        return resolve(result)
      }

      checkCondition(resolve, reject)
    } catch (e) {
      fulfilled = true
      clearTimeout(timeoutId)
      reject(e)
    }
  }

  return new Promise((resolve, reject) => {
    checkCondition(resolve, reject)

    if (ignoreTimeout) {
      return
    }

    timeoutId = setTimeout(() => {
      if (!fulfilled) {
        return reject(new KafkaJSTimeout(timeoutMessage))
      }
    }, maxWait)
  })
}


/***/ }),
/* 386 */
/***/ ((module) => {

module.exports = async (array, groupFn) => {
  const result = new Map()

  for (const item of array) {
    const group = await Promise.resolve(groupFn(item))
    result.set(group, result.has(group) ? [...result.get(group), item] : [item])
  }

  return result
}


/***/ }),
/* 387 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const swapObject = __webpack_require__(365)
const networkEvents = __webpack_require__(344)
const InstrumentationEventType = __webpack_require__(345)
const adminType = InstrumentationEventType('admin')

const events = {
  CONNECT: adminType('connect'),
  DISCONNECT: adminType('disconnect'),
  REQUEST: adminType(networkEvents.NETWORK_REQUEST),
  REQUEST_TIMEOUT: adminType(networkEvents.NETWORK_REQUEST_TIMEOUT),
  REQUEST_QUEUE_SIZE: adminType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE),
}

const wrappedEvents = {
  [events.REQUEST]: networkEvents.NETWORK_REQUEST,
  [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
  [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE,
}

const reversedWrappedEvents = swapObject(wrappedEvents)
const unwrap = eventName => wrappedEvents[eventName] || eventName
const wrap = eventName => reversedWrappedEvents[eventName] || eventName

module.exports = {
  events,
  wrap,
  unwrap,
}


/***/ }),
/* 388 */
/***/ ((module) => {

/**
 * @see https://github.com/apache/kafka/blob/a15387f34d142684859c2a57fcbef25edcdce25a/clients/src/main/java/org/apache/kafka/common/resource/ResourceType.java#L25-L31
 * @typedef {number} ACLResourceTypes
 *
 * Enum for ACL Resource Types
 * @readonly
 * @enum {ACLResourceTypes}
 */

module.exports = {
  /**
   * Represents any ResourceType which this client cannot understand,
   * perhaps because this client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any ResourceType.
   */
  ANY: 1,
  /**
   * A Kafka topic.
   * @see http://kafka.apache.org/documentation/#topicconfigs
   */
  TOPIC: 2,
  /**
   * A consumer group.
   * @see http://kafka.apache.org/documentation/#consumerconfigs
   */
  GROUP: 3,
  /**
   * The cluster as a whole.
   */
  CLUSTER: 4,
  /**
   * A transactional ID.
   */
  TRANSACTIONAL_ID: 5,
  /**
   * A token ID.
   */
  DELEGATION_TOKEN: 6,
}


/***/ }),
/* 389 */
/***/ ((module) => {

// From:
// https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/acl/AclOperation.java#L44

/**
 * @typedef {number} ACLOperationTypes
 *
 * Enum for ACL Operations Types
 * @readonly
 * @enum {ACLOperationTypes}
 */
module.exports = {
  /**
   * Represents any AclOperation which this client cannot understand, perhaps because this
   * client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any AclOperation.
   */
  ANY: 1,
  /**
   * ALL operation.
   */
  ALL: 2,
  /**
   * READ operation.
   */
  READ: 3,
  /**
   * WRITE operation.
   */
  WRITE: 4,
  /**
   * CREATE operation.
   */
  CREATE: 5,
  /**
   * DELETE operation.
   */
  DELETE: 6,
  /**
   * ALTER operation.
   */
  ALTER: 7,
  /**
   * DESCRIBE operation.
   */
  DESCRIBE: 8,
  /**
   * CLUSTER_ACTION operation.
   */
  CLUSTER_ACTION: 9,
  /**
   * DESCRIBE_CONFIGS operation.
   */
  DESCRIBE_CONFIGS: 10,
  /**
   * ALTER_CONFIGS operation.
   */
  ALTER_CONFIGS: 11,
  /**
   * IDEMPOTENT_WRITE operation.
   */
  IDEMPOTENT_WRITE: 12,
}


/***/ }),
/* 390 */
/***/ ((module) => {

// From:
// https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/acl/AclPermissionType.java/#L31

/**
 * @typedef {number} ACLPermissionTypes
 *
 * Enum for Permission Types
 * @readonly
 * @enum {ACLPermissionTypes}
 */
module.exports = {
  /**
   * Represents any AclPermissionType which this client cannot understand,
   * perhaps because this client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any AclPermissionType.
   */
  ANY: 1,
  /**
   * Disallows access.
   */
  DENY: 2,
  /**
   * Grants access.
   */
  ALLOW: 3,
}


/***/ }),
/* 391 */
/***/ ((module) => {

// From:
// https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/resource/PatternType.java#L32

/**
 * @typedef {number} ACLResourcePatternTypes
 *
 * Enum for ACL Resource Pattern Type
 * @readonly
 * @enum {ACLResourcePatternTypes}
 */
module.exports = {
  /**
   * Represents any PatternType which this client cannot understand, perhaps because this client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any resource pattern type.
   */
  ANY: 1,
  /**
   * In a filter, will perform pattern matching.
   *
   * e.g. Given a filter of {@code ResourcePatternFilter(TOPIC, "payments.received", MATCH)`}, the filter match
   * any {@link ResourcePattern} that matches topic 'payments.received'. This might include:
   * <ul>
   *     <li>A Literal pattern with the same type and name, e.g. {@code ResourcePattern(TOPIC, "payments.received", LITERAL)}</li>
   *     <li>A Wildcard pattern with the same type, e.g. {@code ResourcePattern(TOPIC, "*", LITERAL)}</li>
   *     <li>A Prefixed pattern with the same type and where the name is a matching prefix, e.g. {@code ResourcePattern(TOPIC, "payments.", PREFIXED)}</li>
   * </ul>
   */
  MATCH: 2,
  /**
   * A literal resource name.
   *
   * A literal name defines the full name of a resource, e.g. topic with name 'foo', or group with name 'bob'.
   *
   * The special wildcard character {@code *} can be used to represent a resource with any name.
   */
  LITERAL: 3,
  /**
   * A prefixed resource name.
   *
   * A prefixed name defines a prefix for a resource, e.g. topics with names that start with 'foo'.
   */
  PREFIXED: 4,
}


/***/ }),
/* 392 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const KEEP_ALIVE_DELAY = 60000 // in ms

/**
 * @returns {import("../../types").ISocketFactory}
 */
module.exports = () => {
  const net = __webpack_require__(393)
  const tls = __webpack_require__(394)

  return ({ host, port, ssl, onConnect }) => {
    const socket = ssl
      ? tls.connect(Object.assign({ host, port, servername: host }, ssl), onConnect)
      : net.connect({ host, port }, onConnect)

    socket.setKeepAlive(true, KEEP_ALIVE_DELAY)

    return socket
  }
}


/***/ }),
/* 393 */
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),
/* 394 */
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),
/* 395 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ACLResourceTypes = __webpack_require__(388)

/**
 * @deprecated
 * @see https://github.com/tulios/kafkajs/issues/649
 *
 * Use ConfigResourceTypes or AclResourceTypes instead.
 */
module.exports = ACLResourceTypes


/***/ }),
/* 396 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v1": () => (/* reexport safe */ _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "v3": () => (/* reexport safe */ _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "v4": () => (/* reexport safe */ _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "v5": () => (/* reexport safe */ _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "NIL": () => (/* reexport safe */ _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "version": () => (/* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "validate": () => (/* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "stringify": () => (/* reexport safe */ _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "parse": () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(397);
/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(402);
/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(406);
/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(407);
/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(409);
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(410);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(400);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(399);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(404);










/***/ }),
/* 397 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(398);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(399);

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);

/***/ }),
/* 398 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(315);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),
/* 399 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(400);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),
/* 400 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),
/* 401 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),
/* 402 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(403);
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(405);


const v3 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v3);

/***/ }),
/* 403 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DNS": () => (/* binding */ DNS),
/* harmony export */   "URL": () => (/* binding */ URL),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(399);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(404);



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"])(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),
/* 404 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(400);


function parse(uuid) {
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);

/***/ }),
/* 405 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(315);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);


function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('md5').update(bytes).digest();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (md5);

/***/ }),
/* 406 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(398);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(399);



function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),
/* 407 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(403);
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(408);


const v5 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v5);

/***/ }),
/* 408 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(315);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);


function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('sha1').update(bytes).digest();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sha1);

/***/ }),
/* 409 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('00000000-0000-0000-0000-000000000000');

/***/ }),
/* 410 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(400);


function version(uuid) {
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (version);

/***/ }),
/* 411 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const toolkit_1 = __webpack_require__(5);
const redux_1 = __webpack_require__(6);
const cluster_reducer_1 = __importDefault(__webpack_require__(4));
const rootReducer = (0, redux_1.combineReducers)({
    cluster: cluster_reducer_1.default
});
const store = (0, toolkit_1.configureStore)({ reducer: rootReducer });
exports["default"] = store;


/***/ }),
/* 412 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClusterTreeProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const cluster_reducer_1 = __webpack_require__(4);
const store_1 = __importDefault(__webpack_require__(411));
class ClusterTreeProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element && element.contextValue === 'cluster') {
            const cluster = (0, cluster_reducer_1.selectById)(store_1.default.getState().cluster, element.id);
            const topics = cluster === null || cluster === void 0 ? void 0 : cluster.topics;
            return topics === null || topics === void 0 ? void 0 : topics.map(topic => new KafkaTreeItem(topic, 'topic', vscode.TreeItemCollapsibleState.None));
        }
        else {
            const clusters = (0, cluster_reducer_1.selectAll)(store_1.default.getState().cluster);
            return clusters.map(cluster => new KafkaTreeItem(cluster.name, 'cluster', vscode.TreeItemCollapsibleState.Collapsed, cluster.id));
        }
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}
exports.ClusterTreeProvider = ClusterTreeProvider;
class KafkaTreeItem extends vscode.TreeItem {
    constructor(label, contextValue, collapsibleState, id) {
        super(label, collapsibleState);
        this.label = label;
        this.contextValue = contextValue;
        this.id = id;
    }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map