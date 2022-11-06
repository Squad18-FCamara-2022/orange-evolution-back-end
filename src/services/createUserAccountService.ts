import { AppError } from "../utils/AppError";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";

interface ICreateUserAccountService {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ICreateAccounResponse {
  token: string;
}

class CreateUserAccountService {
  async execute({
    confirmPassword,
    email,
    name,
    password,
  }: ICreateUserAccountService): Promise<ICreateAccounResponse> {
    // verificar se todos os parâmetos foram enviados
    if (!email) {
      throw new AppError("email not found on request body", 422);
    } else if (!password) {
      throw new AppError("password not found on request body", 422);
    } else if (!confirmPassword) {
      throw new AppError("confirmPassword not found on request body", 422);
    } else if (!name) {
      throw new AppError("name not found on request body", 422);
    }

    // verificar se password e confirmPassword são iguais
    if (password !== confirmPassword) {
      throw new AppError("confirmPassword different from password");
    }

    // verificar se o usuário já existe no banco (pelo email)
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // se existir retornar um erro
    if (userAlreadyExists) {
      throw new AppError("Email already in use", 409);
    }

    // criar usuário sem encriptar senha
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    // criar token JWT
    const token = sign(
      {
        user: {
          name: user.name,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token: token };
  }
}

export { CreateUserAccountService };
