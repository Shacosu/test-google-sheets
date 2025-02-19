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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDataInSheet = exports.clearDataInSheet = exports.updateDataInSheet = exports.getDataFromSheet = exports.AuthGoogleSheet = void 0;
var googleapis_1 = require("googleapis");
var node_path_1 = require("node:path");
var sheets = googleapis_1.google.sheets({ version: "v4" });
var SPREAD_ID = "1puVUuEYnx5Z7BteTStVvGmhNfmO595L6SC8eiQADIwY";
var auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: node_path_1.default.join(process.cwd(), "src", "utils", "credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
function AuthGoogleSheet() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth.getClient()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.AuthGoogleSheet = AuthGoogleSheet;
function getDataFromSheet() {
    return __awaiter(this, void 0, void 0, function () {
        var authClient, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, AuthGoogleSheet()];
                case 1:
                    authClient = _a.sent();
                    return [4 /*yield*/, sheets.spreadsheets.values.get({
                            auth: authClient,
                            spreadsheetId: SPREAD_ID,
                            range: "A:E"
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status !== 200) {
                        throw new Error("Error fetching data from sheet");
                    }
                    return [2 /*return*/, response.data.values];
            }
        });
    });
}
exports.getDataFromSheet = getDataFromSheet;
function updateDataInSheet() {
    return __awaiter(this, void 0, void 0, function () {
        var authClient, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, AuthGoogleSheet()];
                case 1:
                    authClient = _a.sent();
                    return [4 /*yield*/, sheets.spreadsheets.values.append({
                            auth: authClient,
                            spreadsheetId: SPREAD_ID,
                            range: "A:E",
                            valueInputOption: "RAW",
                            requestBody: {
                                values: [
                                    ["Hello", "World", "From", "Google"],
                                    ["Hello", "World", "From", "Google"],
                                ],
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status !== 200) {
                        throw new Error("Error writing data to sheet");
                    }
                    return [2 /*return*/, "Data updated successfully"];
            }
        });
    });
}
exports.updateDataInSheet = updateDataInSheet;
function clearDataInSheet(cellRange) {
    return __awaiter(this, void 0, void 0, function () {
        var authClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, AuthGoogleSheet()];
                case 1:
                    authClient = _a.sent();
                    // Clear the sheet before writing new data
                    return [4 /*yield*/, sheets.spreadsheets.values.clear({
                            auth: authClient,
                            spreadsheetId: SPREAD_ID,
                            range: cellRange
                        })];
                case 2:
                    // Clear the sheet before writing new data
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearDataInSheet = clearDataInSheet;
function writeDataInSheet(data) {
    return __awaiter(this, void 0, void 0, function () {
        var authClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, AuthGoogleSheet()];
                case 1:
                    authClient = _a.sent();
                    // Clear the sheet before writing new data
                    return [4 /*yield*/, clearDataInSheet("A:J")];
                case 2:
                    // Clear the sheet before writing new data
                    _a.sent();
                    // Write data to the sheet
                    return [4 /*yield*/, sheets.spreadsheets.values.append({
                            auth: authClient,
                            spreadsheetId: SPREAD_ID,
                            range: "A:J",
                            valueInputOption: "RAW",
                            requestBody: {
                                values: __spreadArray([
                                    ["SKU", "Titulo", "Hora", "Actualizado", "Stock", "Enlace"]
                                ], data.map(function (book) {
                                    var sku = book.sku;
                                    var _a = book.BookDetail, title = _a.title, link = _a.link, updatedAt = _a.updatedAt, stock = _a.stock;
                                    var currentStock = stock === 0 ? "Fuera de stock" : "Disponible";
                                    var currentTime = new Date(updatedAt).toLocaleTimeString("es-CL");
                                    var updatedAtDate = new Date(updatedAt).toISOString().split("T")[0].replace(/'/g, "");
                                    console.log(updatedAtDate);
                                    return [
                                        sku,
                                        title,
                                        currentTime,
                                        updatedAtDate,
                                        currentStock,
                                        link
                                    ];
                                }), true),
                            }
                        })];
                case 3:
                    // Write data to the sheet
                    _a.sent();
                    return [2 /*return*/, "Data written successfully"];
            }
        });
    });
}
exports.writeDataInSheet = writeDataInSheet;
