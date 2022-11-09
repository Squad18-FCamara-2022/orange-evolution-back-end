import { Request, Response } from "express";
import { CreateUserAccountService } from "../services/createUserAccountService";
import { AppError } from "../utils/AppError";

class CreateUserAccountController {
  // método handle (uma função) que recebe a req e res
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // definir as contantes por desestruturação
      const { name, email, password, confirmPassword } = request.body;
      /* daria no mesmo fazer o seguinte:
      const name = request.body.name
      const email = request.body.email
      ...
      */

      // instanciar camada de serviço
      const service = new CreateUserAccountService();

      // result guarda as informaçôes que o service vai retornar, por exemplo o Token
      const result = await service.execute({
        name,
        email,
        password,
        confirmPassword,
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

export { CreateUserAccountController };
