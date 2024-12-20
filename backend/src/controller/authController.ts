import { Request, Response } from "express";
import { register, login, getUserById} from "../services/authServices";
import { RegiterDto, loginDto } from "../dto/auth-dto";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: RegiterDto = req.body;
        const token = await register(data);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message || "Registration failed" });
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: loginDto = req.body;
        const token = await login(data);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message || "Login failed. Please check your credentials." });
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await getUserById(userId); 

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: (error as Error).message || "User not found" });
    }
};
