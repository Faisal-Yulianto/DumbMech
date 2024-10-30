import express from "express";
import { getProfile, EditProfile } from "../controller/profileController";
import { authenticate } from "../middleware/authentiacte";
import upload from "../middleware/multer";

const router = express.Router();


router.get("/:userId", authenticate,getProfile);
router.put("/:userId", authenticate,upload.single('image'),EditProfile);

export default router;
