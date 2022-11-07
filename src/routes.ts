import { Router } from "express";
import { CreateUserAccountController } from "./controllers/createUserAccontController";

const router = Router();

router.post("/signup", new CreateUserAccountController().handle);

export { router };
