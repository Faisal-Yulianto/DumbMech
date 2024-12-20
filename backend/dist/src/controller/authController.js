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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const authServices_1 = require("../services/authServices");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = yield (0, authServices_1.register)(data);
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message || "Registration failed" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = yield (0, authServices_1.login)(data);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message || "Login failed. Please check your credentials." });
    }
});
exports.loginUser = loginUser;
