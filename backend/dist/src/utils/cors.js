"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};
exports.default = corsOptions;
