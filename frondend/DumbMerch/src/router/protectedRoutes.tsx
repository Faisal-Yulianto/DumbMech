import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Fungsi untuk memeriksa apakah token masih valid
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  // Cek apakah token sudah kadaluarsa (contoh: memeriksa waktu kadaluarsa dari payload JWT)
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
  const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik
  if (payload.exp < currentTime) {
    localStorage.removeItem("token"); // Hapus token jika sudah kadaluarsa
    return false;
  }

  return true;
};

// ProtectedRoute untuk membatasi akses halaman jika tidak terautentikasi
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
