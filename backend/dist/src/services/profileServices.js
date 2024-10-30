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
exports.UpdateProfiles = exports.GetProfile = void 0;
const prisma_1 = require("../utils/prisma");
const GetProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileData = yield prisma_1.prisma.profile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        email: true,
                        username: true,
                    },
                },
            },
        });
        return profileData;
    }
    catch (error) {
        throw new Error("failed to catch profile data");
    }
});
exports.GetProfile = GetProfile;
const UpdateProfiles = (userId, profileData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingProfile = yield prisma_1.prisma.profile.findUnique({
            where: { userId },
        });
        if (!existingProfile) {
            const newProfile = yield prisma_1.prisma.profile.create({
                data: {
                    phone: profileData.phone,
                    gender: profileData.gender,
                    address: profileData.address,
                    image: profileData.image,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
            return newProfile;
        }
        const UpdateProfile = yield prisma_1.prisma.profile.update({
            where: { userId },
            data: {
                phone: profileData.phone,
                gender: profileData.gender,
                address: profileData.address,
                image: profileData.image,
                user: {
                    update: {
                        email: profileData.email,
                        username: profileData.username,
                    },
                },
            },
            include: {
                user: {
                    select: {
                        email: true,
                        username: true,
                    },
                },
            },
        });
        return UpdateProfile;
    }
    catch (error) {
        console.error("Error updating profile in database:", error);
        throw new Error("failed to update data profile");
    }
});
exports.UpdateProfiles = UpdateProfiles;
