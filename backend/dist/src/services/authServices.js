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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../utils/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = data;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield prisma_1.prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword
        }
    });
    return (0, jwt_1.genereateToken)(user.id, user.role);
});
exports.register = register;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const user = yield prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user)
        throw new Error("User not found");
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new Error("Invalid password");
    return (0, jwt_1.genereateToken)(user.id, user.role);
});
exports.login = login;
