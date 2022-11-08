import { Router } from "express";
import { CreateUserAccountController } from "./controllers/createUserAccontController";
import { LoginController } from "./controllers/loginController";

// defino a variável router que vai representar o Router que vem do express
const router = Router();

// rota de cadastro
router.post("/signup", new CreateUserAccountController().handle);

// rota de login
router.post("/login", new LoginController().handle);

// a próxima rota amanda vai definir aqui

export { router };
