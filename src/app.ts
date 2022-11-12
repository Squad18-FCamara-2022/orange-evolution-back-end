import express from "express";
import cors from "cors";
import { router } from "./routes";
import "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";

// o app é constante que vai representar o express, e nele estará contido as rotas
const app = express();

// usar o cors para aceitar requisições de diferentes domínios
app.use(cors());

// fazer com que o express interprete JSON
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

// usar as rotas que estão no arquigo routes.ts
app.use(router);

export { app };
