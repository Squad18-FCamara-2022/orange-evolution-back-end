import { Request, Response } from "express";
import { DeleteClassAdminService } from "../../services/admins/deleteClassAdminService";
import { AppError } from "../../utils/AppError";

interface IDeleteClassAdminRequest extends Request {
  userId: string;
}

class DeleteClassAdminController {
  async handle(request: IDeleteClassAdminRequest, response: Response) {
    try {
      const { userId } = request;
      const { id: classId } = request.params;

      const service = new DeleteClassAdminService();

      const result = await service.execute(classId, userId);

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

export { DeleteClassAdminController };
