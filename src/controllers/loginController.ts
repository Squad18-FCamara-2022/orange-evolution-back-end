import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";
import { AppError } from "../utils/AppError";

class LoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      // instanciar a camada de serviço
      const service = new LoginService();

      // result guarda as informaçôes que o service vai retornar, por exemplo o Token
      const result = await service.execute({
        email,
        password,
      });

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

export { LoginController };
