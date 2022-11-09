/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

interface IEnsureAuthRequest extends Request {
  userId: string;
}

// Middleware para garantir que o usuario está autenticado para acessar algumas rotas
export function ensureAuthenticated(
  request: IEnsureAuthRequest,
  response: Response,
  next: NextFunction
) {
  // recupera o token JWT no header da requisição
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  // tirar o [0] Baerer e deixar só o token
  const [, token] = authToken.split(" ");

  try {
    // verificar se o token que está no header do usuário possui o user id que foi colocado na autenticação
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    // adiciona o userId na request
    request.userId = sub;

    // função do express para dar seguimento para a rota solicitada inicialmente
    return next();
  } catch (error) {
    return response.status(401).json({ errorMessage: "token.expired" });
  }
}
