import { Request, Response } from "express";
import { CreateNewClassAdminService } from "../../services/admins/createNewClassAdminService";
import { AppError } from "../../utils/AppError";

interface ICreateNewClassAdminRequest extends Request {
  userId: string;
}

class CreateNewClassAdminController {
  async handle(request: ICreateNewClassAdminRequest, response: Response) {
    try {
      const { title, contentType, author, duration, link } = request.body;

      const { id: categoryId } = request.params;

      const { userId } = request;

      const service = new CreateNewClassAdminService();

      const result = await service.execute({
        title,
        contentType,
        author,
        duration,
        link,
        categoryId,
        userId,
      });

      return response.status(201).json(result);
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

export { CreateNewClassAdminController };
