import { Track, UsersOnClasses } from "@prisma/client";
import prisma from "../prisma";
import { AppError } from "../utils/AppError";

interface IGetUserTrackServiceResponse {
  trackDetails: Track;
  userTrackClasses: UsersOnClasses[];
}

class GetUserTrackService {
  async execute(
    trackId: string,
    userId: string
  ): Promise<IGetUserTrackServiceResponse> {
    // buscar no banco de dados todas as trilhas
    const trackDetails = await prisma.track.findFirst({
      where: {
        id: trackId,
      },
      include: {
        categories: {
          include: {
            classes: true,
          },
        },
      },
    });

    if (!trackDetails) {
      throw new AppError("Track does not exists", 404);
    }

    const userTrackClasses = await prisma.usersOnClasses.findMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            class: {
              Category: {
                trackId: trackId,
              },
            },
          },
        ],
      },
    });

    return { trackDetails, userTrackClasses };
  }
}
export { GetUserTrackService };
