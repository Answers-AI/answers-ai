"use strict";
// Write a nodejs script that exports all comments from Jira in a single text field for each issue
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
var natural = require('natural');
var _a = require('openai'), Configuration = _a.Configuration, OpenAIApi = _a.OpenAIApi;
var _b = require('./utilities/jira'), fetchJiraData = _b.fetchJiraData, jiraAdfToMarkdown = _b.jiraAdfToMarkdown, createContextFromObject = _b.createContextFromObject, writeObjectToFile = _b.writeObjectToFile;
var configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
var openai = new OpenAIApi(configuration);
var tokenizer = new natural.WordTokenizer();
var pineconeObject = {
    vectors: []
};
var createEmbedding = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openai.createEmbedding({
                    model: 'text-embedding-ada-002',
                    input: input
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var getIssueFieldJsonLdContext = function () { return __awaiter(void 0, void 0, void 0, function () {
    var API_URL, data, fieldTypes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                API_URL = '/field';
                return [4 /*yield*/, fetchJiraData(API_URL)];
            case 1:
                data = _a.sent();
                fieldTypes = data.reduce(function (acc, _a) {
                    var id = _a.id, schema = _a.schema;
                    if (schema && schema.type) {
                        acc[id] = {
                            '@id': "jira:".concat(id),
                            '@type': "xsd:".concat(schema.type)
                        };
                    }
                    if (schema && schema.system) {
                        var jiraId = "jira:".concat(id.charAt(0).toUpperCase()).concat(id.slice(1), "/");
                        acc[id] = {
                            '@id': jiraId,
                            '@type': "xsd:".concat(schema.type)
                        };
                    }
                    return acc;
                }, {});
                return [2 /*return*/];
        }
    });
}); };
var getAllStatusCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var statusCategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('GETTING STATUS CATEGORIES');
                return [4 /*yield*/, fetchJiraData("/statuscategory")];
            case 1:
                statusCategories = _a.sent();
                return [4 /*yield*/, Promise.all(statusCategories.map(function (statusCategory) { return __awaiter(void 0, void 0, void 0, function () {
                        var context, embeddingResponse, embeddings, obj;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    statusCategory.objectType = 'JIRA Status Category';
                                    delete statusCategory.self;
                                    delete statusCategory.colorName;
                                    delete statusCategory.key;
                                    context = createContextFromObject(statusCategory);
                                    return [4 /*yield*/, createEmbedding(context)];
                                case 1:
                                    embeddingResponse = _c.sent();
                                    embeddings = (_b = (_a = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.embedding;
                                    obj = {
                                        id: "status_category_".concat(statusCategory.id),
                                        metadata: statusCategory,
                                        values: embeddings
                                    };
                                    // TODO: Upsert to pinecone through API;
                                    pineconeObject.vectors.push(obj);
                                    return [2 /*return*/, statusCategory];
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
    var statuses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('GETTING STATUSES');
                return [4 /*yield*/, fetchJiraData('/status')];
            case 1:
                statuses = _a.sent();
                return [4 /*yield*/, Promise.all(statuses.map(function (status) { return __awaiter(void 0, void 0, void 0, function () {
                        var context, embeddingResponse, embeddings, obj;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    status.statusCategoryId = status.statusCategory.id;
                                    status.objectType = 'JIRA Status';
                                    delete status.untranslatedName;
                                    delete status.scope;
                                    delete status.iconUrl;
                                    delete status.self;
                                    delete status.colorName;
                                    delete status.key;
                                    delete status.statusCategory;
                                    context = createContextFromObject(status);
                                    return [4 /*yield*/, createEmbedding(context)];
                                case 1:
                                    embeddingResponse = _c.sent();
                                    embeddings = (_b = (_a = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.embedding;
                                    obj = {
                                        id: "status_".concat(status.id),
                                        metadata: status,
                                        values: embeddings
                                    };
                                    // TODO: Upsert to pinecone through API;
                                    pineconeObject.vectors.push(obj);
                                    return [2 /*return*/, status];
                            }
                        });
                    }); }))];
            case 2:
                statuses = _a.sent();
                return [2 /*return*/, statuses];
        }
    });
}); };
function getJiraTickets(projectId, maxResults) {
    if (maxResults === void 0) { maxResults = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var allTickets, startAt, total, endpoint, data, error_1;
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
                    endpoint = "/search?jql=project=".concat(projectId, "&maxResults=").concat(maxResults, "&startAt=0");
                    return [4 /*yield*/, fetchJiraData(endpoint)];
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
var getComments = function (issueKey) { return __awaiter(void 0, void 0, void 0, function () {
    var comments;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, fetchJiraData("/issue/".concat(issueKey, "/comment"))];
            case 1:
                comments = _b.sent();
                if (!((_a = comments === null || comments === void 0 ? void 0 : comments.comments) === null || _a === void 0 ? void 0 : _a.length))
                    return [2 /*return*/, null];
                return [4 /*yield*/, Promise.all(comments.comments.map(function (comment) { return __awaiter(void 0, void 0, void 0, function () {
                        var context, embeddingResponse, embeddings, obj;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    comment.objectType = 'JIRA Comment';
                                    comment.author = comment.author.displayName;
                                    comment.body = jiraAdfToMarkdown(comment.body.content);
                                    comment.issueId = issueKey;
                                    delete comment.updateAuthor;
                                    delete comment.jsdPublic;
                                    delete comment.visibility;
                                    context = createContextFromObject(comment);
                                    return [4 /*yield*/, createEmbedding(context)];
                                case 1:
                                    embeddingResponse = _c.sent();
                                    embeddings = (_b = (_a = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.embedding;
                                    obj = {
                                        id: "comment_".concat(comment.id),
                                        metadata: comment,
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
var getIssueDetail = function (issue) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, key, metadata, context, tokens, embeddingResponse, embeddings, obj;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
    return __generator(this, function (_22) {
        switch (_22.label) {
            case 0:
                fields = issue.fields, key = issue.key;
                metadata = {
                    objectType: 'JIRA Issue',
                    issueTypeId: fields === null || fields === void 0 ? void 0 : fields.issuetype.id,
                    issueType: fields === null || fields === void 0 ? void 0 : fields.issuetype.name,
                    issueId: key,
                    description: fields.description ? jiraAdfToMarkdown(fields.description) : '',
                    summary: (_a = fields === null || fields === void 0 ? void 0 : fields.summary) !== null && _a !== void 0 ? _a : '',
                    creatorId: (_c = (_b = fields.creator) === null || _b === void 0 ? void 0 : _b.accountId) !== null && _c !== void 0 ? _c : '',
                    creator: (_e = (_d = fields.creator) === null || _d === void 0 ? void 0 : _d.displayName) !== null && _e !== void 0 ? _e : '',
                    statusId: (_g = parseInt((_f = fields.status) === null || _f === void 0 ? void 0 : _f.id, 10)) !== null && _g !== void 0 ? _g : '',
                    status: (_j = (_h = fields.status) === null || _h === void 0 ? void 0 : _h.name) !== null && _j !== void 0 ? _j : '',
                    statusCategoryId: (_m = (_l = (_k = fields.status) === null || _k === void 0 ? void 0 : _k.statusCategory) === null || _l === void 0 ? void 0 : _l.id) !== null && _m !== void 0 ? _m : '',
                    statusCategory: (_q = (_p = (_o = fields.status) === null || _o === void 0 ? void 0 : _o.statusCategory) === null || _p === void 0 ? void 0 : _p.name) !== null && _q !== void 0 ? _q : '',
                    account: (_s = (_r = fields.customfield_10037) === null || _r === void 0 ? void 0 : _r.value) !== null && _s !== void 0 ? _s : '',
                    type: (_u = (_t = fields.issuetype) === null || _t === void 0 ? void 0 : _t.name) !== null && _u !== void 0 ? _u : '',
                    reporterId: (_w = (_v = fields.reporter) === null || _v === void 0 ? void 0 : _v.accountId) !== null && _w !== void 0 ? _w : '',
                    reporter: (_y = (_x = fields.reporter) === null || _x === void 0 ? void 0 : _x.displayName) !== null && _y !== void 0 ? _y : '',
                    assigneeId: (_0 = (_z = fields.assignee) === null || _z === void 0 ? void 0 : _z.accountId) !== null && _0 !== void 0 ? _0 : '',
                    assignee: (_2 = (_1 = fields.reporter) === null || _1 === void 0 ? void 0 : _1.displayName) !== null && _2 !== void 0 ? _2 : '',
                    priorityId: (_4 = (_3 = fields.priority) === null || _3 === void 0 ? void 0 : _3.id) !== null && _4 !== void 0 ? _4 : '',
                    priority: (_6 = (_5 = fields.priority) === null || _5 === void 0 ? void 0 : _5.name) !== null && _6 !== void 0 ? _6 : '',
                    parentIssueId: (_8 = (_7 = fields.parent) === null || _7 === void 0 ? void 0 : _7.key) !== null && _8 !== void 0 ? _8 : '',
                    parentIssueSummary: (_11 = (_10 = (_9 = fields.parent) === null || _9 === void 0 ? void 0 : _9.fields) === null || _10 === void 0 ? void 0 : _10.summary) !== null && _11 !== void 0 ? _11 : '',
                    parentIssueTypeId: (_13 = (_12 = fields.parent) === null || _12 === void 0 ? void 0 : _12.issuetype) === null || _13 === void 0 ? void 0 : _13.id,
                    parentIssueType: (_15 = (_14 = fields.parent) === null || _14 === void 0 ? void 0 : _14.issuetype) === null || _15 === void 0 ? void 0 : _15.name,
                    project: (_17 = (_16 = fields.project) === null || _16 === void 0 ? void 0 : _16.name) !== null && _17 !== void 0 ? _17 : '',
                    projectId: (_19 = (_18 = fields.project) === null || _18 === void 0 ? void 0 : _18.key) !== null && _19 !== void 0 ? _19 : '',
                    projectObjectType: 'JIRA Issue'
                };
                context = createContextFromObject(metadata);
                tokens = tokenizer.tokenize(context);
                if (tokens.length > 1900) {
                    console.log("".concat(key, " - TOO MANY TOKENS (").concat(tokens.length, ") - skipping"));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, createEmbedding(context)];
            case 1:
                embeddingResponse = _22.sent();
                embeddings = (_21 = (_20 = embeddingResponse === null || embeddingResponse === void 0 ? void 0 : embeddingResponse.data) === null || _20 === void 0 ? void 0 : _20.data[0]) === null || _21 === void 0 ? void 0 : _21.embedding;
                obj = {
                    id: key,
                    metadata: metadata,
                    values: embeddings
                };
                pineconeObject.vectors.push(obj);
                return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var allIssues, promises, _a, _i, allIssues_1, issue;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getJiraTickets('PROJECT', 1000)];
            case 1:
                allIssues = _b.sent();
                // await getIssueFieldJsonLdContext(),
                return [4 /*yield*/, getAllStatusCategories()];
            case 2:
                _a = [
                    // await getIssueFieldJsonLdContext(),
                    _b.sent()
                ];
                return [4 /*yield*/, getAllStatuses()];
            case 3:
                promises = _a.concat([
                    _b.sent()
                ]);
                for (_i = 0, allIssues_1 = allIssues; _i < allIssues_1.length; _i++) {
                    issue = allIssues_1[_i];
                    promises.push(getIssueDetail(issue));
                    promises.push(getComments(issue.key));
                }
                return [4 /*yield*/, Promise.all(promises)];
            case 4:
                _b.sent();
                writeObjectToFile(pineconeObject);
                return [2 /*return*/];
        }
    });
}); })();
