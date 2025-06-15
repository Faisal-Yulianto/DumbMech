import express from "express";
import {
  handldeCreateProduct,
  handldeUpdateProduct,
  handleDeleteProduct,
  handleGetProduct,
} from "../controller/productController";
import { authenticate,CheckRole } from "../middleware/authentiacte";
import upload from "../middleware/multer";

const router = express.Router();

router.post(
  "/product",
  authenticate,CheckRole("ADMIN"),
  upload.single("image"),
  handldeCreateProduct
);
router.put(
  "/product/edit/:id",
  authenticate,CheckRole("ADMIN"),
  upload.single("image"),
  handldeUpdateProduct
);
router.delete("/product/delete/:id", authenticate,CheckRole("ADMIN"), handleDeleteProduct);
router.get("/product", authenticate, handleGetProduct);

export default router;
