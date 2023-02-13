"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var fetch = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Promise.resolve().then(function () { return __importStar(require("node-fetch")); }).then(function (_a) {
        var fetch = _a["default"];
        return fetch.apply(void 0, args);
    });
};
var fs = require("fs");
require("dotenv").config();
var headers = {
    Authorization: "Basic ".concat(Buffer.from("brad@lastrev.com:".concat(process.env.JIRA_API)).toString("base64")),
    Accept: "application/json"
};
var handleRateLimit = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var retryAfter, resetTime, timeToWait_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                retryAfter = response.headers.get("Retry-After");
                resetTime = response.headers.get("X-RateLimit-Reset");
                if (!retryAfter) return [3 /*break*/, 2];
                console.log("Too many requests, retrying after ".concat(retryAfter, " seconds."));
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, retryAfter * 1000); })];
            case 1:
                _a.sent();
                return [3 /*break*/, 5];
            case 2:
                if (!resetTime) return [3 /*break*/, 4];
                console.log("Too many requests, retrying after ".concat(resetTime, "."));
                timeToWait_1 = new Date(resetTime) - new Date();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, timeToWait_1); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                console.log("no wait", Object.keys(response));
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var fetchJiraData = function (endpoint) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://lastrev.atlassian.net/rest/api/3".concat(endpoint);
                return [4 /*yield*/, fetch(url, {
                        method: "GET",
                        headers: headers
                    })];
            case 1:
                response = _a.sent();
                console.log("Fetched Endpoint: ", response.status, endpoint);
                if (!(response.status === 429)) return [3 /*break*/, 3];
                return [4 /*yield*/, handleRateLimit(response)];
            case 2:
                _a.sent();
                return [2 /*return*/, null];
            case 3: return [4 /*yield*/, response.json()];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var jiraAdfToMarkdown = function (node) {
    if (!node)
        return "";
    if (node.type === "doc") {
        return node.content.map(function (item) { return "".concat(jiraAdfToMarkdown(item)); }).join("");
    }
    else if (node.type === "text") {
        return node.text;
    }
    else if (node.type === "hardBreak") {
        return "\n";
    }
    else if (node.type === "mention") {
        return "@".concat(node.attrs.username);
    }
    else if (node.type === "emoji") {
        return ""; //`:${node.attrs.shortName}:`;
    }
    else if (node.type === "link") {
        return "[".concat(node.text, "](").concat(node.attrs.url, ")");
    }
    else if (node.type === "mediaGroup") {
        return node.content.map(jiraAdfToMarkdown).join("");
    }
    else if (node.type === "paragraph") {
        return "".concat(node.content.map(jiraAdfToMarkdown).join(""), "\n");
    }
    else if (node.type === "bulletList") {
        return node.content.map(function (item) { return "".concat(jiraAdfToMarkdown(item)); }).join("");
    }
    else if (node.type === "listItem") {
        return node.content.map(function (item) { return "- ".concat(jiraAdfToMarkdown(item)); }).join("");
    }
    else if (node.type === "orderedList") {
        return node.content
            .map(function (item, index) { return "".concat(index + 1, ". ").concat(jiraAdfToMarkdown(item)); })
            .join("");
    }
    else if (node.type === "heading") {
        return "\n".concat("#".repeat(node.attrs.level), " ").concat(node.content
            .map(jiraAdfToMarkdown)
            .join(""), "\n");
    }
    else if (node.type === "codeBlock") {
        return "```\n".concat(node.text, "\n```\n");
    }
    else if (node.type === "blockquote") {
        return "> ".concat(node.content.map(jiraAdfToMarkdown).join(""), "\n");
    }
    else {
        return "";
    }
};
var createContextFromObject = function (obj) {
    var trimValues = ["", undefined, null, "indeterminate"];
    var context = Object.entries(obj)
        .filter(function (_a) {
        var value = _a[1];
        return !trimValues.includes(value) && typeof value !== "object";
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key.replace(/([A-Z_])/g, " $1").toUpperCase(), ":").concat(value);
    })
        .join("\n\n");
    return context;
};
var writeObjectToFile = function (obj) {
    var maxFileSize = 1.8 * 1024 * 1024; // 1.5MB in bytes
    var currentFileSize = 0;
    var currentFileIndex = 0;
    var currentFileArray = [];
    var currentDate = new Date().toISOString().slice(0, 19).replace(/T/, " ");
    var folderPath = "output/jira/".concat(currentDate);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    var outputFileName = "".concat(folderPath, "/").concat(Date.now());
    obj.vectors.forEach(function (element) {
        var jsonString = JSON.stringify(element);
        var jsonStringSize = Buffer.byteLength(jsonString, "utf8");
        if (currentFileSize + jsonStringSize > maxFileSize) {
            fs.writeFileSync("".concat(outputFileName, "-").concat(currentFileIndex, ".json"), JSON.stringify({ namespace: "jira", vectors: currentFileArray }));
            currentFileIndex++;
            currentFileArray = [];
            currentFileSize = 0;
        }
        currentFileArray.push(element);
        currentFileSize += jsonStringSize;
    });
    fs.writeFileSync("".concat(outputFileName, "-").concat(currentFileIndex, ".json"), JSON.stringify({ namespace: "jira", vectors: currentFileArray }));
};
module.exports = {
    writeObjectToFile: writeObjectToFile,
    createContextFromObject: createContextFromObject,
    jiraAdfToMarkdown: jiraAdfToMarkdown,
    fetchJiraData: fetchJiraData
};
