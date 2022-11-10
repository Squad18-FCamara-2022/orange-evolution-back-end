import { Request, Response } from "express";
import { CreateUserClassService } from "../services/createUserClassService";
import { AppError } from "../utils/AppError";

interface ICreateUserClassRequest extends Request {
  userId: string;
}

class CreateUserClassController {
  async handle(request: ICreateUserClassRequest, response: Response) {
    try {
      // pegar o id do usuário adicionado no middleware
      const { userId } = request;

      // pegar o id da aula dos route params
      const { id: classId } = request.params;

      const service = new CreateUserClassService();

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

export { CreateUserClassController };
