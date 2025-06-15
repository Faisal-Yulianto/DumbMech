import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCategory } from "../store/categorySlice";
import { AppDispatch } from "../store/store";

interface IFormInput {
  CategoryName: string;
}

export const useAddCategory = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await dispatch(createCategory({ categoryName: data.CategoryName })).unwrap();
      handleClose();
      window.location.reload();
    } catch {
      setErrorMessage("Failed to add category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    open,
    isLoading,
    errorMessage,
    errors,
    register,
    handleSubmit,
    handleOpen,
    handleClose,
    onSubmit,
  };
};
