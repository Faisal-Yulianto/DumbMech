import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditProfileSchema from "../schemas/editProfileSchema";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux"; 
import { AppDispatch } from "../store/store";
import { UpdateProfile  , fetchProfile } from "../store/profileSlice"; 
import { useState } from "react";

type TokenPayload = {
  email: string;
  userId: number;
};

const useEditProfile = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>(); 
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(EditProfileSchema),
  });

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  let userId: number | null = null;
  let email: string | null = null;


  if (token) {
    const decoded = jwtDecode<TokenPayload>(token);
    console.log("Decoded Token:", decoded);
    userId = decoded.userId;
    email = decoded.email;
  }

  const emailFromRedux = email; 
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", emailFromRedux ?? ""); 
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("address", data.address);

    const files = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files;
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("image", file);
      });
    }

    if (!userId) {
      setErrorMessage("User ID tidak ditemukan dalam token.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/api/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      dispatch(UpdateProfile(response.data)); 
      dispatch(fetchProfile()); 
      
      setFileNames([]);
      reset();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Gagal memperbarui profil. Silakan coba lagi.";
      setErrorMessage(errorMsg);
      console.error("Error updating profile:", error);
    }
    finally {
      setIsLoading(false); 
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files).map((file) => file.name);
      setFileNames(fileList);
      console.log("Files uploaded:", fileList);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    fileNames,
    emailFromRedux,
    errorMessage,
    handleFileChange,
    setErrorMessage,
    isLoading,
  };
};

export default useEditProfile;
