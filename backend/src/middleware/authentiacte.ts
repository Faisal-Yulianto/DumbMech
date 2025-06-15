import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt"

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    if (typeof decoded === "string") {
      throw new Error("invalid token format");
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "invalid token" });
    return;
  }
};
const CheckRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user?.role !== role) {
      res.status(403).json({ message: "forbidden" });
      return
    }
    next();
    return
};

export {authenticate,CheckRole}
