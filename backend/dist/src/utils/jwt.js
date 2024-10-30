"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genereateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || "your secret key";
const genereateToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId, role }, secretKey, { expiresIn: "1h" });
};
exports.genereateToken = genereateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, secretKey);
};
exports.verifyToken = verifyToken;