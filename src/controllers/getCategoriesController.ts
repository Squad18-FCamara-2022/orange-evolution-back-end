import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { GetCategoriesService } from "../services/getCategoriesService";

class GetCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // pegar o id da trilha dos route params
      const { id: trackId } = request.params;

      // instanciar a camada de serviço
      const service = new GetCategoriesService();

      // guardar na constante result o que o service retornar (um array de categorias)
      const result = await service.execute(trackId);

      // retornar para o front o array de categorias
      return response.json(result);
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

export { GetCategoriesController };
