"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
(0, mongo_1.runMongo)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000);
app.listen(port, () => { });
