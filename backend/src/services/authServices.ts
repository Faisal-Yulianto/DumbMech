import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import { genereateToken } from "../utils/jwt";
import { RegiterDto, loginDto } from "../dto/auth-dto"; 

export const register = async (data: RegiterDto) => {
  const { email, password, username } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    }
  });

  return genereateToken(user.id, user.role,user.email); 
};

export const login = async (data: loginDto) => {
  const { email, password } = data; 
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  return genereateToken(user.id, user.role,user.email);
};

export const getUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}


