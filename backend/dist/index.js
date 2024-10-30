"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./src/router/authRoutes"));
const profileRoutes_1 = __importDefault(require("./src/router/profileRoutes"));
const cors_1 = __importDefault(require("./src/utils/cors"));
const cors_2 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use((0, cors_2.default)(cors_1.default));
app.use(body_parser_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/profile', profileRoutes_1.default);
app.listen(port, () => {
    cors_1.default;
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
