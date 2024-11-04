import { prisma } from "../utils/prisma";
import { categoryDto } from "../dto/category-dto";

export const GetCategory = async () => {
    try {
        const CategoryData = await prisma.category.findMany()
        return CategoryData
    } catch (error) {
        throw new Error("failed to get category")
    }
}    

export const CreateCategory = async (categoryData: categoryDto) => {
  try {
    const NewCategory = await prisma.category.create({
      data: {
        categoryName: categoryData.categoryName,
      },
    });
    return NewCategory;
  } catch (error) {
    console.error("error to create data category", error);
    throw new Error("failed to create category");
  }
};

export const UpdateCategory = async (
  categoryId: number,
  categoryData: categoryDto
) => {
  try {
    const categoryUpdate = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        categoryName: categoryData.categoryName,
      },
    });
    return categoryUpdate;
  } catch (error) {
    console.error("error updating category");
    throw new Error("failed to updating category");
  }
};

export const DeleteCategory = async ( categoryId : number) => {
    try {
        await prisma.category.delete({
            where: { id: categoryId}
        })
    } catch (error) {
        console.error("eror deleting category")
        throw new Error("failed delete category")
    }
}


