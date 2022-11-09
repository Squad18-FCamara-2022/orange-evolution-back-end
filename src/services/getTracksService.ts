import { Track } from "@prisma/client";
import { AppError } from "../utils/AppError";

class GetTracksService {
  async execute(): Promise<Track[]> {
    // buscar no banco de dados todas as trilhas
    const tracks = await prisma.track.findMany();

    return tracks;
  }
}
export { GetTracksService };
