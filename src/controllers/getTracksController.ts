import { Request, Response } from "express";
import { GetTracksService } from "../services/getTracksService";
import { AppError } from "../utils/AppError";

class GetTracksController {
  // metodo hadle (uma função) que recebe a req e res
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // instanciar camada de serviço
      const service = new GetTracksService();

      // result guarda as informações que o service vai retornar, por exemplo o token
      const result = await service.execute();

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

export { GetTracksController };
