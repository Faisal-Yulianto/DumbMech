import { Request,Response } from "express";
import { GetProfile,UpdateProfiles } from "../services/profileServices";
import { ProfileUpdateDto } from "../dto/profile-dto";

export const getProfile = async ( req: Request,res: Response) => {
    const userId = parseInt(req.params.userId)
    try {
        const profileData = await GetProfile(userId)
        res.status(200).json(profileData)
    } catch (error) {
        res.status(500).json({ message: "failed to get profile data"})
    }
}

export const EditProfile = async(req : Request,res: Response)=>{
    const userId = parseInt(req.params.userId)
    const profileData: ProfileUpdateDto = req.body
    try {
        const profileUpdate = await UpdateProfiles(userId,profileData,req.file?.buffer)
        res.status(200).json(profileUpdate)
    } catch (error) {
        res.status(500).json({ message : "failed to update profile data"})
        console.error("Failed to update profile data:", error)
    }
}