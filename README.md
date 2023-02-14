<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" width="200" alt="node Logo" /></a>
</p>


<p align="center">
  <font size="50">
    Chega-logo API
  </font>
</p>

***
## Description
- Seu João é dono da empresa Chega Logo, uma pequena transportadora. onde fica o galpão dessa empresa, caminhões saem carregando suas entregas para outras localidades, onde deixam o carregamento e retornam. Faz isso com um preço muito competitivo e com excelente pontualidade. O segredo dessa eficiência, segundo Seu João, é o controle que faz das viagens, caminhões e localidades através de uma planilha, cada um em uma respectiva aba. Lá, ele registra tudo o que precisa para calcular o preço das entregas de forma que seja justo mas, também, lucrativo. Contudo, seu João vem enfrentando dificuldades em lidar com a quantidade de dados em sua planilha, que cresce cada vez mais. 
- Esta API é responsavel por organizar todo o esquema de transportes, através de um login de usuário e senha seu João pode gerenciar tudo de forma dinâmica e segura.

- [veja meu repositório front end desta aplicação aqui](https://github.com/marcojr73/chega-logo-front)

***
## Technologies and concepts
- Node.js
- Typescript
- Express
- JWT
- Jest
- Prisma
- Postgres
- layered architecture
- Docker
- Swagger

***
## Installation

- Install my project, its dependencies and configure the .env as in the examples

```bash
  $ git clone git@github.com:marcojr73/chega-logo-api.git

  $ npm install

  $ npx prisma migrate dev

  $ npx prisma db seed
```
***
## Running the app

- Local

```bash
  npm run dev
```

- Run with Docker

```bash
  npm run docker
```

***
## Api reference - Swagger

- Launch the application and access the **/docs** route in your browser

***
## Tests

```bash
# integration testing
$ npm run test:integration

# unit testing
$ npm run test:unit
```


***
## Contact

- Author - [Marco Júnior](https://github.com/marcojr73)
- linkedin - [https://www.linkedin.com/in/marcojr73/](https://www.linkedin.com/in/marcojr73/)
- website - [https://portfolio-marcojr73.vercel.app/](https://portfolio-marcojr73.vercel.app/)
