import { Request, Response } from "express";
import {
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  GetCategory
} from "../services/categoryServices";
import { categoryDto } from "../dto/category-dto";

export const handldeCreateCategory = async (req: Request, res: Response) => {
  try {
    const data: categoryDto = req.body;
    const category = await CreateCategory(data);
    res.status(200).json({ message: "category created succesfully", category });
  } catch (error) {
    res
      .status(400)
      .json({ error: (error as Error).message || "created category failed" });
  }
};

export const handleGetCategory = async (req: Request, res: Response) => {
  try {
    const data = await GetCategory();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "failed to get category" });
  }
}

export const handldeUpdateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  const UpdateData: categoryDto = req.body;
  try {
    const updateCategory = await UpdateCategory(categoryId, UpdateData);
    res.status(200).json({ message: "category update succesfully", updateCategory });
  } catch (error) {
    res.status(400).json({ message: "category failed to update" });
  }
}

export const handldeDeleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  try {
    await DeleteCategory(categoryId);
    res.status(200).json({ message: "succesfully delete category" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message || "deleted category failed" });
  }
}