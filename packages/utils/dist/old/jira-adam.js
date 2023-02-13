"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var pineconeObject = {
    vectors: []
};
var headers = {
    Authorization: "Basic ".concat(Buffer.from("brad@lastrev.com:".concat(process.env.JIRA_API)).toString("base64")),
    Accept: "application/json"
};
var mapJiraValues = function (jiraObject, prefix) {
    var _a;
    var mappedJiraObject = {};
    for (var key in jiraObject) {
        switch (key) {
            case "self":
                mappedJiraObject["".concat(prefix, "_url")] = jiraObject[key];
                break;
            case "statusCategory":
                mappedJiraObject.status_category_id = (_a = jiraObject[key]) === null || _a === void 0 ? void 0 : _a.id;
                break;
            default:
                mappedJiraObject["".concat(prefix, "_").concat(key.replace(/([A-Z])/g, "_$1").toLowerCase())] = jiraObject[key];
        }
    }
    return mappedJiraObject;
};
var getAllStatusCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, statusCategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("GETTING STATUS CATEGORIES");
                url = "https://lastrev.atlassian.net/rest/api/3/statuscategory";
                return [4 /*yield*/, fetchJiraData(url)];
            case 1:
                statusCategories = _a.sent();
                return [4 /*yield*/, Promise.all(statusCategories.map(function (statusCategory) { return __awaiter(void 0, void 0, void 0, function () {
                        var metadata, context, embeddingResponse, embeddings, obj;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    delete statusCategory.self;
                                    metadata = mapJiraValues(statusCategory, "status_category");
                                    context = "Status Category:".concat(statusCategory.name);
                                    return [4 /*yield*/, createEmbedding(context)];
                                case 1:
                                    embeddingResponse = _c.sent();
                                    embeddings = (_b = (_a = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.embedding;
                                    obj = {
                                        id: "status_category_id_".concat(statusCategory.id),
                                        metadata: metadata,
                                        values: embeddings
                                    };
                                    pineconeObject.vectors.push(obj);
                                    return [2 /*return*/, mapJiraValues(statusCategory, "status_category")];
                            }
                        });
                    }); }))];
            case 2:
                statusCategories = _a.sent();
                return [2 /*return*/, statusCategories];
        }
    });
}); };
var getAllStatuses = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, statuses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("GETTING STATUSES");
                url = "https://lastrev.atlassian.net/rest/api/3/status";
                return [4 /*yield*/, fetchJiraData(url)];
            case 1:
                statuses = _a.sent();
                return [4 /*yield*/, Promise.all(statuses.map(function (status) { return __awaiter(void 0, void 0, void 0, function () {
                        var metadata, context, embeddingResponse, embeddings, obj;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    delete status.untranslatedName;
                                    delete status.scope;
                                    delete status.iconUrl;
                                    delete status.self;
                                    metadata = mapJiraValues(status, "status");
                                    context = "Status:".concat(status.name);
                                    return [4 /*yield*/, createEmbedding(context)];
                                case 1:
                                    embeddingResponse = _c.sent();
                                    embeddings = (_b = (_a = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.embedding;
                                    obj = {
                                        id: "status_id_".concat(status.id),
                                        metadata: metadata,
                                        values: embeddings
                                    };
                                    pineconeObject.vectors.push(obj);
                                    return [2 /*return*/, metadata];
                            }
                        });
                    }); }))];
            case 2:
                statuses = _a.sent();
                return [2 /*return*/, statuses];
        }
    });
}); };
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
var getAllIssuesForProject = function (projectID, startAt) {
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
    });
}
function fetchJiraData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: "GET",
                        headers: headers
                    })];
                case 1:
                    response = _a.sent();
                    console.log("Fetching URL: ", response.status, url);
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
function getJiraTickets(projectId) {
    return __awaiter(this, void 0, void 0, function () {
        var allTickets, startAt, total, url, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allTickets = [];
                    startAt = 0;
                    total = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    url = "https://lastrev.atlassian.net/rest/api/3/search?jql=project=".concat(projectId, "&maxResults=1000&startAt=0");
                    return [4 /*yield*/, fetchJiraData(url)];
                case 3:
                    data = _a.sent();
                    if (!data || data.errors) {
                        return [3 /*break*/, 6];
                    }
                    allTickets = data.issues;
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 6];
                case 5: return [3 /*break*/, 1];
                case 6: return [2 /*return*/, allTickets];
            }
        });
    });
}
var jiraToMarkdown = function (node) {
    if (!node)
        return "";
    if (node.type === "text") {
        return node.text;
    }
    else if (node.type === "mention") {
        return "@".concat(node.attrs.username);
    }
    else if (node.type === "emoji") {
        return ":".concat(node.attrs.shortName, ":");
    }
    else if (node.type === "link") {
        return "[".concat(node.text, "](").concat(node.attrs.url, ")");
    }
    else if (node.type === "mediaGroup") {
        return node.content.map(jiraToMarkdown).join("");
    }
    else if (node.type === "paragraph") {
        return "".concat(node.content.map(jiraToMarkdown).join(""), "\n");
    }
    else if (node.type === "bulletList") {
        return node.content.map(function (item) { return "- ".concat(jiraToMarkdown(item)); }).join("\n");
    }
    else if (node.type === "orderedList") {
        return node.content
            .map(function (item, index) { return "".concat(index + 1, ". ").concat(jiraToMarkdown(item)); })
            .join("\n");
    }
    else if (node.type === "heading") {
        return "\n".concat("#".repeat(node.attrs.level), " ").concat(node.content
            .map(jiraToMarkdown)
            .join(""), "\n");
    }
    else if (node.type === "codeBlock") {
        return "```\n".concat(node.text, "\n```\n");
    }
    else if (node.type === "blockquote") {
        return "> ".concat(node.content.map(jiraToMarkdown).join(""), "\n");
    }
    else {
        return "";
    }
};
var extractText = function (content) {
    var text = "";
    content.forEach(function (element) {
        if (element.type === "text") {
            text += element.text;
        }
        else if (element.content) {
            text += extractText(element.content);
        }
    });
    return text;
};
var getComments = function (issueKey) { return __awaiter(void 0, void 0, void 0, function () {
    var url, comments;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://lastrev.atlassian.net/rest/api/3/issue/".concat(issueKey, "/comment");
                return [4 /*yield*/, fetchJiraData(url)];
            case 1:
                comments = _b.sent();
                if (!((_a = comments === null || comments === void 0 ? void 0 : comments.comments) === null || _a === void 0 ? void 0 : _a.length))
                    return [2 /*return*/, null];
                return [4 /*yield*/, Promise.all(comments.comments.map(function (comment) { return __awaiter(void 0, void 0, void 0, function () {
                        var context, metadata, embeddingResponse, embeddings, obj;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    comment.author = comment.author.displayName;
                                    delete comment.updateAuthor;
                                    delete comment.jsdPublic;
                                    delete comment.visibility;
                                    comment.body = jiraToMarkdown(comment.body.content);
                                    context = "Issue ID:".concat(issueKey, "\n\nAuthor:").concat(comment.author, "\n\nComment:").concat(comment.body);
                                    metadata = mapJiraValues(comment, "comment");
                                    return [4 /*yield*/, createEmbedding(context)];
                                case 1:
                                    embeddingResponse = _c.sent();
                                    embeddings = (_b = (_a = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.embedding;
                                    obj = {
                                        id: "comment_id_".concat(comment.id),
                                        metadata: __assign({ issue_id: issueKey }, metadata),
                                        values: embeddings
                                    };
                                    pineconeObject.vectors.push(obj);
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _b.sent();
                // if (comments) {
                //   // metadata fields can not be over 10000 bytes
                //   const encoder = new TextEncoder();
                //   const encodedString = encoder.encode(comments);
                //   const sizeInBytes = encodedString.byteLength;
                //   if (sizeInBytes > 9000) {
                //     console.log("comments too long", sizeInBytes);
                //     return comments.substring(0, 9000);
                //   } else {
                //     return comments;
                //   }
                // }
                return [2 /*return*/, null];
        }
    });
}); };
var getDescription = function (description) { return __awaiter(void 0, void 0, void 0, function () {
    var text;
    return __generator(this, function (_a) {
        text = "";
        description === null || description === void 0 ? void 0 : description.content.forEach(function (content) {
            if (content.type === "paragraph") {
                content.content.forEach(function (content) {
                    if (content.type === "text") {
                        text += content.text + " ";
                    }
                });
            }
        });
        return [2 /*return*/, text];
    });
}); };
function writeObjectToFile(obj) {
    var maxFileSize = 1.8 * 1024 * 1024; // 1.5MB in bytes
    var currentFileSize = 0;
    var currentFileIndex = 0;
    var currentFileArray = [];
    var outputFileName = "jira-issues-".concat(Date.now());
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
}
var createEmbedding = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openai.createEmbedding({
                    model: "text-embedding-ada-002",
                    input: input
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var getIssueDetail = function (issue) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, key, metadata, context, tokens, embeddingResponse, embeddings, obj;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    return __generator(this, function (_y) {
        switch (_y.label) {
            case 0:
                fields = issue.fields, key = issue.key;
                metadata = {
                    issue_description: fields.description
                        ? jiraToMarkdown(fields.description)
                        : "",
                    issue_summary: (_a = fields === null || fields === void 0 ? void 0 : fields.summary) !== null && _a !== void 0 ? _a : "",
                    issue_creator: (_c = (_b = fields.creator) === null || _b === void 0 ? void 0 : _b.displayName) !== null && _c !== void 0 ? _c : "",
                    status_id: (_e = parseInt((_d = fields.status) === null || _d === void 0 ? void 0 : _d.id, 10)) !== null && _e !== void 0 ? _e : "",
                    status_category_id: (_h = (_g = (_f = fields.status) === null || _f === void 0 ? void 0 : _f.statusCategory) === null || _g === void 0 ? void 0 : _g.id) !== null && _h !== void 0 ? _h : "",
                    issue_account: (_k = (_j = fields.customfield_10037) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : "",
                    issue_type: (_m = (_l = fields.issuetype) === null || _l === void 0 ? void 0 : _l.name) !== null && _m !== void 0 ? _m : "",
                    issue_reporter: (_p = (_o = fields.reporter) === null || _o === void 0 ? void 0 : _o.accountId) !== null && _p !== void 0 ? _p : "",
                    issue_assignee: (_r = (_q = fields.assignee) === null || _q === void 0 ? void 0 : _q.accountId) !== null && _r !== void 0 ? _r : "",
                    issue_parent_key: (_t = (_s = fields.parent) === null || _s === void 0 ? void 0 : _s.key) !== null && _t !== void 0 ? _t : "",
                    issue_project: (_v = (_u = fields.project) === null || _u === void 0 ? void 0 : _u.name) !== null && _v !== void 0 ? _v : ""
                };
                context = Object.entries(metadata)
                    .filter(function (_a) {
                    var value = _a[1];
                    return value !== "";
                })
                    .map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return "".concat(key.toUpperCase(), ":").concat(value);
                })
                    .join("\n\n");
                tokens = tokenizer.tokenize(context);
                if (tokens.length > 1900) {
                    console.log("".concat(key, " - TOO MANY TOKENS (").concat(tokens.length, ") - skipping"));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, createEmbedding(context)];
            case 1:
                embeddingResponse = _y.sent();
                embeddings = (_x = (_w = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _w === void 0 ? void 0 : _w.data[0]) === null || _x === void 0 ? void 0 : _x.embedding;
                obj = {
                    id: key,
                    metadata: metadata,
                    values: embeddings
                };
                console.log("Issue Detail: ".concat(key));
                pineconeObject.vectors.push(obj);
                return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var allStatusCategories, allStatuses, allIssues, promises, _i, allIssues_1, issue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllStatusCategories()];
            case 1:
                allStatusCategories = _a.sent();
                return [4 /*yield*/, getAllStatuses()];
            case 2:
                allStatuses = _a.sent();
                return [4 /*yield*/, getJiraTickets("PROJECT")];
            case 3:
                allIssues = _a.sent();
                promises = [];
                for (_i = 0, allIssues_1 = allIssues; _i < allIssues_1.length; _i++) {
                    issue = allIssues_1[_i];
                    promises.push(getIssueDetail(issue));
                    promises.push(getComments(issue.key));
                }
                console.log("BEFORE ALL");
                return [4 /*yield*/, Promise.all(promises)];
            case 4:
                _a.sent();
                console.log("AFTER ALL");
                writeObjectToFile(pineconeObject);
                console.log("AFTER WRITE");
                return [2 /*return*/];
        }
    });
}); })();
