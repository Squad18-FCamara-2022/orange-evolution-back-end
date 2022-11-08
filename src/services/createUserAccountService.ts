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
  user: {
    id: string;
    name: string;
    role: string;
  };
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
      throw new AppError("confirmPassword different from password", 422);
    }

    // verificar se o usuário já existe no banco de dados (pelo email)
    // prisma, na tabela usuário encontre o primeiro usuário onde o email seja igual ao email recebido na request
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // se existir um usuáo retornar um erro
    // se userAlreadyExists diferente de falso, retornar um erro
    if (userAlreadyExists) {
      throw new AppError("Email already in use", 409);
    }

    // criar usuário sem encriptar senha
    // prisma, por gentileza, na tabela usuário crie um novo usuário com os seguinte dados...
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    // gerar um token JWT com o método sign() do jsonwebtoken
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

    // retornar para o controller as informaçõs do usuário com o token
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }
}

export { CreateUserAccountService };
