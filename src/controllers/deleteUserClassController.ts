import { Request, Response } from "express";
import { DeleteUserClassService } from "../services/deleteUserClassService";
import { AppError } from "../utils/AppError";

interface IDeleteUserClassRequest extends Request {
  userId: string;
}

class DeleteUserClassController {
  async handle(request: IDeleteUserClassRequest, response: Response) {
    try {
      // pegar o id do usuário adicionado no middleware
      const { userId } = request;

      // pegar o id da aula dos route params
      const { id: classId } = request.params;

      // instanciar camadade serviço
      const service = new DeleteUserClassService();

      const result = await service.execute(userId, classId);

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

export { DeleteUserClassController };
