import { AppError } from "../../utils/AppError";
import prisma from "../../prisma";
import { Track } from "@prisma/client";

class GetTracksAdminService {
  async execute(userId: string): Promise<Track[]> {
    if (!userId) {
      throw new AppError("userId not found on request", 422);
    }

    // verificar se o user é um admin
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            role: "admin",
          },
        ],
      },
    });

    // se não for retornar um erro
    if (!user) {
      throw new AppError(
        "only admin users can access the tracks informations",
        401
      );
    }

    const tracks = await prisma.track.findMany({
      include: {
        categories: {
          include: {
            classes: {
              include: {
                _count: {
                  select: {
                    UsersOnClasses: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return tracks;
  }
}

export { GetTracksAdminService };
