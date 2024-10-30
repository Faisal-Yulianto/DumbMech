"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' });
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: 'invalid token' });
    }
};
exports.authenticate = authenticate;
