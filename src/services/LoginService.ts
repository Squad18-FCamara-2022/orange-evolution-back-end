import { sign } from "jsonwebtoken";
import prisma from "../prisma";
import { AppError } from "../utils/AppError";

class LoginService {
  async execute({ email, password }) {
    if (!email) {
      throw new AppError("email not found on request body", 422);
    } else if (!password) {
      throw new AppError("password not found on request body", 422);
    }

    // verificar se o usuário existe no banco de dados
    // prisma, por gentileza, verifique se o primeiro usuário com TAL email existe no banco e salve ele na constante "user"
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // se não existir retorne um erro
    if (!user) {
      throw new AppError("Wrong credentials", 403);
    }

    // verificar se a senha está correta, se não estiver retornar um erro
    if (password !== user.password) {
      throw new AppError("Wrong credentials", 403);
    }

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

export { LoginService };
