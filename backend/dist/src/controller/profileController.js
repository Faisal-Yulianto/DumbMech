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
exports.EditProfile = exports.getProfile = void 0;
const profileServices_1 = require("../services/profileServices");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const profileData = yield (0, profileServices_1.GetProfile)(userId);
        res.status(200).json(profileData);
    }
    catch (error) {
        res.status(500).json({ message: "failed to get profile data" });
    }
});
exports.getProfile = getProfile;
const EditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const profileData = req.body;
    try {
        const profileUpdate = yield (0, profileServices_1.UpdateProfiles)(userId, profileData);
        res.status(200).json(profileUpdate);
    }
    catch (error) {
        res.status(500).json({ message: "failed to update profile data" });
        console.error("Failed to update profile data:", error);
    }
});
exports.EditProfile = EditProfile;
