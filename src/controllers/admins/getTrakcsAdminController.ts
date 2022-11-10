import { Request, Response } from "express";
import { GetTracksAdminService } from "../../services/admins/getTracksAdminService";
import { AppError } from "../../utils/AppError";

interface IGetTracksAdminRequest extends Request {
  userId: string;
}

class GetTracksAdminController {
  async handle(request: IGetTracksAdminRequest, response: Response) {
    try {
      // pegar user id adicionado na request no middleware
      const { userId } = request;

      // instanciar camada de serviço
      const service = new GetTracksAdminService();

      const result = await service.execute(userId);

      // retornar resultado da requisição
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

export { GetTracksAdminController };
