import { Request, Response } from "express";
import { GetUserTrackService } from "../services/getTracksService";
import { AppError } from "../utils/AppError";

interface IGetUserTrackControllerRequest extends Request {
  userId: string;
}

class GetUserTrackController {
  // metodo hadle (uma função) que recebe a req e res
  async handle(
    request: IGetUserTrackControllerRequest,
    response: Response
  ): Promise<Response> {
    try {
      // id da trilha
      const { id: trackId } = request.params;
      const { userId } = request;

      // instanciar camada de serviço
      const service = new GetUserTrackService();

      // result guarda as informações que o service vai retornar, por exemplo o token
      const result = await service.execute(trackId, userId);

      // retornar para o front o resultado (um array de tracks)
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export { GetUserTrackController };
