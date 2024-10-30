import { prisma } from "../utils/prisma";
import { ProfileUpdateDto } from "../dto/profile-dto";
import uploadImageToCloudinary  from "../utils/cloudinary";

export const GetProfile = async (userId: number) => {
  try {
    const profileData = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            username: true,
          },
        },
      },
    });
    return profileData;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};

export const UpdateProfiles = async (
  userId: number,
  profileData: ProfileUpdateDto,
  imageBuffer?: Buffer
) => {
  let imageUrl: string | null = null;

  if (imageBuffer) {
    try {
      const imageResult = await uploadImageToCloudinary(imageBuffer);
      if (!imageResult) {
        throw new Error("Failed to upload image");
      }
      imageUrl = imageResult.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  }

  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      const newProfile = await prisma.profile.create({
        data: {
          phone: profileData.phone,
          gender: profileData.gender,
          address: profileData.address,
          image: (imageUrl) as string,
          user: {
            connect: { id: userId },
          },
        },
      });
      return newProfile;
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        phone: profileData.phone,
        gender: profileData.gender,
        address: profileData.address,
        image: (imageUrl ?? profileData.image) as string,
        user: {
          update: {
            email: profileData.email,
            username: profileData.username,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
            username: true,
          },
        },
      },
    });
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile in database:", error);
    throw new Error("Failed to update profile data");
  }
};
