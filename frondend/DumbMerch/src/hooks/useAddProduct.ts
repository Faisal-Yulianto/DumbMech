import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "../store/store";
import { createProduct } from "../store/productSlice";
import { fetchCategories } from "../store/categorySlice";
import {jwtDecode} from "jwt-decode";
import addProductSchema from "../schemas/addProductScema";

type TokenPayload = {
  userId: number;
};

export const useAddProduct = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const categories = useSelector((state: RootState) => state.Category.categories);
  const categoryLoading = useSelector((state: RootState) => state.Category.loading);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files).map((file) => file.name);
      setFileNames(fileList);
      console.log("Files uploaded:", fileList);
    }
  };

  const fetchAndSetCategories = () => {
    dispatch(fetchCategories());
  };

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
    setIsLoading(true);

    const token = localStorage.getItem("token");
    let userId: number | null = null;

    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      userId = decoded.userId;
    } else {
      setErrorMessage("User is not authenticated.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productDesc", data.productDesc);
    formData.append("price", data.price);
    formData.append("qty", data.qty);
    formData.append("categoryId", data.categoryId);

    if (userId !== null) {
      formData.append("userId", userId.toString());
    }

    const files = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files;
    if (files) {
      Array.from(files).forEach((file) => formData.append("image", file));
    }

    try {
      await dispatch(createProduct(formData));
      setFileNames([]);
      reset();
      window.location.reload();
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage("User is not authenticated. Please log in again.");
      } else {
        const errorMsg =
          error.response?.data?.message || "Failed to add product. Please try again.";
        setErrorMessage(errorMsg);
      }
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fileNames,
    errorMessage,
    isLoading,
    handleFileChange,
    handleSubmit,
    onSubmit,
    fetchAndSetCategories,
    register,
    errors,
    categories,
    categoryLoading,
  };
};
