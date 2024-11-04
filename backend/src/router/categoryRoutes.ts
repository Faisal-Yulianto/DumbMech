import express from "express";
import {
  handldeUpdateCategory,
  handldeDeleteCategory,
  handleGetCategory,
  handldeCreateCategory
} from "../controller/categoryController";
import { authenticate } from "../middleware/authentiacte";

const router = express.Router();

router.get("/category", authenticate, handleGetCategory);
router.put("/category/edit/:id", authenticate, handldeUpdateCategory);
router.delete("/category/delete/:id", authenticate, handldeDeleteCategory);
router.post("/category", authenticate, handldeCreateCategory);

export default router;
