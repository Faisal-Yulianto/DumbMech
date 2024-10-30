"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controller/profileController");
const authentiacte_1 = require("../middleware/authentiacte");
const router = express_1.default.Router();
router.get("/:userId", authentiacte_1.authenticate, profileController_1.getProfile);
router.put("/:userId", authentiacte_1.authenticate, profileController_1.EditProfile);
exports.default = router;
