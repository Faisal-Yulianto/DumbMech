import express from "express";
import {
  handldeUpdateCategory,
  handldeDeleteCategory,
  handleGetCategory,
  handldeCreateCategory,
} from "../controller/categoryController";
import { authenticate, CheckRole } from "../middleware/authentiacte";

const router = express.Router();

router.get("/category", authenticate, CheckRole("ADMIN"), handleGetCategory);
router.put(
  "/category/edit/:id",
  authenticate,
  CheckRole("ADMIN"),
  handldeUpdateCategory
);
router.delete(
  "/category/delete/:id",
  authenticate,
  CheckRole("ADMIN"),
  handldeDeleteCategory
);
router.post(
  "/category",
  authenticate,
  CheckRole("ADMIN"),
  handldeCreateCategory
);

export default router;
