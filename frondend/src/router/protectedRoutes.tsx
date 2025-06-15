  import { ReactNode } from "react";
  import { Navigate } from "react-router-dom";

  // ProtectedRoute untuk membatasi akses halaman jika tidak terautentikasi
  interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string
  }
  // Fungsi untuk memeriksa apakah token masih valid
  const isAuthenticated = (requiredRole?:string) => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    // Cek apakah token sudah kadaluarsa (contoh: memeriksa waktu kadaluarsa dari payload JWT)
    try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
    const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik
    if (payload.exp < currentTime) {
      localStorage.removeItem("token"); // Hapus token jika sudah kadaluarsa
      return false;
    }
    if (requiredRole && payload.role !== requiredRole){
      return "unauthorized"
    }
    return true
  }
  catch (err) {
    return false
  }
}

  const ProtectedRoute = ({ children,requiredRole }: ProtectedRouteProps) => {
   const authStatus = isAuthenticated(requiredRole);

   if(authStatus === "unauthorized"){
    return <Navigate to ="/Unauthorized"/>
   }
   if (!authStatus) {
    return <Navigate to = "/login"/>
   }
   return <>{children}</>
  };

  export default ProtectedRoute;
