import express, { Request } from "express";

interface IRequestNomeCompleto extends Request {
  body: {
    name: string;
    lastName: string;
  };
}

// o app é constante que vai representar o express
const app = express();

app.use(express.json());

// rota do tipo GET que retorna uma mensagem Hello World
app.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World" });
});

// rota do tipo POST que recebe o nome e sobrenome separados e retorna eles juntos
app.post("/nomeCompleto", (request: IRequestNomeCompleto, response) => {
  const nomeCompleto = request.body.name + " " + request.body.lastName;

  return response.status(200).json(nomeCompleto);
});

app.listen(3333);

/*
{
  nome: Lucas
  sobrenome: Everest
}
*/
