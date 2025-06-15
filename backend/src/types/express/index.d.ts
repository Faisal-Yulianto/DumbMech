import { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    role: string;
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?:JwtPayload;
  }
}