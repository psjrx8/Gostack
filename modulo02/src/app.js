import express from "express";
import routes from "./routes";

class App {
  //Método construtor que é chamado automaticamente quando a classe é chamada
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }
  middlewares() {
    //Aplicação recebe requisições no formato json
    this.server.use(express.json());
  }

  routes() {
    //Importa as rotas do arquivo de rotas
    //As rotas tambéms não middlewares
    this.server.use(routes);
  }
}

export default new App().server;
