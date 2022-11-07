import { Request, Response } from "express";
import { CreateUserAccountService } from "../services/createUserAccountService";
import { AppError } from "../utils/AppError";

class CreateUserAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, confirmPassword } = request.body;

      // instanciar camada de serviço
      const service = new CreateUserAccountService();

      const result = await service.execute({
        name,
        email,
        password,
        confirmPassword,
      });

      return response.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

export { CreateUserAccountController };
