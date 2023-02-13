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
// Write a nodejs script that exports all comments from Jira in a single text field for each issue
require("dotenv").config();
var fs = require("fs");
var fetch = require("node-fetch");
var natural = require("natural");
var _a = require("openai"), Configuration = _a.Configuration, OpenAIApi = _a.OpenAIApi;
var start = require("repl").start;
var configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
var openai = new OpenAIApi(configuration);
var tokenizer = new natural.WordTokenizer();
var allJiraIssues = [];
function handleRateLimit(response) {
    return __awaiter(this, void 0, void 0, function () {
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
                    return [3 /*break*/, 4];
                case 2:
                    if (!resetTime) return [3 /*break*/, 4];
                    console.log("Too many requests, retrying after ".concat(resetTime, "."));
                    timeToWait_1 = new Date(resetTime) - new Date();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, timeToWait_1); })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var getIssuesPagination = function (projectID, startAt) {
    if (startAt === void 0) { startAt = 150; }
    return __awaiter(void 0, void 0, void 0, function () {
        var allJiraIssues, response, results, isLast;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allJiraIssues = [];
                    console.log("GETTING PROJECT", projectID, startAt);
                    console.log("Jira Issues Array", allJiraIssues.length);
                    return [4 /*yield*/, fetch("https://lastrev.atlassian.net/rest/api/3/search?jql=project%20%3D%20".concat(projectID, "&startAt=").concat(startAt, "&validateQuery=strict"), {
                            method: "GET",
                            headers: headers
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    results = _a.sent();
                    results = JSON.parse(results);
                    allJiraIssues.push.apply(allJiraIssues, results.issues);
                    isLast = startAt + 50 > results.total;
                    if (!isLast) return [3 /*break*/, 3];
                    console.log("DONE GETTING JIRA TICKETS: ", allJiraIssues.length);
                    return [2 /*return*/, allJiraIssues];
                case 3:
                    console.log(isLast, results.total, startAt + 400);
                    return [4 /*yield*/, getAllIssuesForProject(projectID, startAt + 400)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
function fetchJiraData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: "GET",
                        headers: {
                            Authorization: "Basic ".concat(Buffer.from("brad@lastrev.com:".concat(process.env.JIRA_API)).toString("base64")),
                            Accept: "application/json"
                        }
                    })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 429)) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleRateLimit(response)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, null];
                case 3: return [4 /*yield*/, response.json()];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getJiraUSers() {
    return __awaiter(this, void 0, void 0, function () {
        var allTickets, startAt, total, url, data, batchSize, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allTickets = [];
                    startAt = 0;
                    total = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    url = "https://lastrev.atlassian.net/rest/api/3/users";
                    return [4 /*yield*/, fetchJiraData(url)];
                case 3:
                    data = _a.sent();
                    if (!data) {
                        return [3 /*break*/, 1];
                    }
                    allTickets = allTickets.concat(data.issues);
                    total = data.total;
                    if (allTickets.length >= total) {
                        return [3 /*break*/, 7];
                    }
                    batchSize = Math.min(total - allTickets.length, 100);
                    url = "https://lastrev.atlassian.net/rest/api/3/search?jql=project=".concat(projectId, "&startAt=").concat(startAt, "&maxResults=").concat(batchSize);
                    return [4 /*yield*/, fetchJiraData(url)];
                case 4:
                    data = _a.sent();
                    if (!data) {
                        return [3 /*break*/, 1];
                    }
                    allTickets = allTickets.concat(data.issues);
                    if (allTickets.length >= total) {
                        return [3 /*break*/, 7];
                    }
                    startAt = allTickets.length;
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 7];
                case 6: return [3 /*break*/, 1];
                case 7: return [2 /*return*/, allTickets];
            }
        });
    });
}
function getJiraTickets(projectId) {
    return __awaiter(this, void 0, void 0, function () {
        var allTickets, startAt, total, url, data, batchSize, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allTickets = [];
                    startAt = 0;
                    total = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    url = "https://lastrev.atlassian.net/rest/api/3/comment/search?query=\"\"&maxResults=1000&startAt=0";
                    return [4 /*yield*/, fetchJiraData(url)];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    if (!data || data.errors) {
                        return [3 /*break*/, 1];
                    }
                    allTickets = allTickets.concat(data);
                    total = 100; //data.length;
                    if (allTickets.length >= total) {
                        return [3 /*break*/, 7];
                    }
                    batchSize = Math.min(total - allTickets.length, 100);
                    url = "https://lastrev.atlassian.net/rest/api/3/comment/search?query=\"\"&maxResults=1000&startAt=0";
                    return [4 /*yield*/, fetchJiraData(url)];
                case 4:
                    // url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project=${projectId}&startAt=${startAt}&maxResults=${batchSize}`;
                    data = _a.sent();
                    if (!data || data.errors) {
                        return [3 /*break*/, 1];
                    }
                    allTickets = allTickets.concat(data);
                    if (allTickets.length >= total) {
                        return [3 /*break*/, 7];
                    }
                    startAt = allTickets.length;
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 7];
                case 6: return [3 /*break*/, 1];
                case 7: return [2 /*return*/, allTickets];
            }
        });
    });
}
function removeNullKeys(array) {
    return array.map(function (item) {
        if (typeof item === "object" && item !== null) {
            var obj = Object.entries(item).reduce(function (obj, _a) {
                var key = _a[0], value = _a[1];
                if (value !== null &&
                    !(typeof value === "object" && Object.keys(value).length === 0)) {
                    if (typeof value === "object" && value !== null) {
                        obj[key] = removeNullKeys([value])[0];
                    }
                    else {
                        obj[key] = value;
                    }
                }
                return obj;
            }, {});
            return Object.keys(obj).length ? obj : null;
        }
        return item;
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var tickets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getJiraTickets()];
            case 1:
                tickets = _a.sent();
                console.log(JSON.stringify(tickets, null, 2));
                return [2 /*return*/];
        }
    });
}); })();
