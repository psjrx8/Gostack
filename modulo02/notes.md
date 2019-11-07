1. Inclusão da dependêcia EXPRESS

- Esta dependência vai mapear as rotas do projeto.
- É um framework para aplicações web com node.js que fornece vários recursos para aplicação web e mobile

2. Inclusão da dependência SUCRASE (Desenvolvimento)

- É um compilador
- A chamada depende do npm/yarn e deve ser feita utilizando a diretiva sucrase-node

3. Inclusão da dependência NODEMON (Desenvolvimento)

- É módulo utilitário que monitora as alterações nos arquivos da aplicação para reiniciar automáticamento o servidor quando necessáario.
- Para utilização do nodemon junto com o sucrase, deve criar o arquivo nodemon.json e editar incluído um objeto e "execMap" rodando o "node" e executando anteriormente "sucrase/register" ("node -r sucrase/register")
- Também é necessário alterar o método de debug quando incluindo o script no package.json ("dev:debug": "nodemon --inspect src/server.js")

4. Docker

- Ferramenta escrita em GO que facilita a criação e administração de ambientes isolados (container)
- O docker administra IMAGENS que são ferramentas/tecnologias.
- O CONTAINER é a INSTÂNCIA de uma IMAGEM.
- As IMAGENS estão no docker registry
- Dockerfile permite que possamos criar nossos próprias IMAGENS
- docker -v (Versão)
- docker help (command list)
- Para criar um container no docker devemos usar a diretiva "run" conforme abaixo:

* docker run --name NOME_DO_CONTAINER -e PARAMETRO=VALOR_DO_PARAMETRO -p XXXX:YYYY -d NOME_DA_IMAGEM (Redireciona porta XXXX da máquina para a porta YYYY do container)

- Utilizamos os comandos "start" e "stop" para incializar um container e o "ps" para identificar containers ativos. Também é possível verificar todos os containers criados com "ps -a". Os logs do container podem ser verificados com a diretiva "logs"

* docker start NOME_DO_CONTAINER
* docker stop NOME_DO_CONTAINER
* docker ps
* docker ps -a
* docker logs NOME_DO_CONTAINER

5. Dependência ESLINT (Desenvolvimento)

- Vai fazer o lint do código (estabelecer os padrões)
- Utilizar comando "yarn eslint --init

6. Dependências PRETTIER, ESLINT-CONFIG-PRETTIER e ESLINT-PLUGIN-PRETTIER (Desenvolvimento)

- "yarn eslint --fix PASTA --ext .EXTENSÃO"
