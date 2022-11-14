# Projeto - Blogs API
---
## O que foi desenvolvido:

Este projeto foi desenvolvido de forma individual durante o programa de formação da Trybe.
Neste projeto desenvolvi uma API node nos padrões REST para produção de conteúdo de um blog, e um banco de dados MySQL através do ORM Sequelize. A API possui endpoints para registrar novo usuários, realizar o login de usuários já registrados, buscar outros usuários, registrar um post, buscar por posts, atualizar ou remover um post próprio, registrar ou buscar categorias além de remover o próprio registro de usuário, tudo através de autenticação JWT.

As stacks utilizadas para o desenvolvimento desta aplicação foram:
![Node](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express.js-grey?style=flat-square&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/-Sequelize-357bbe?style=flat-square&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat-square&logo=docker&logoColor=white)

## Executando o projeto
---
### Com Docker
❗Para rodar o projeto com o docker será necessário que além do [docker](https://www.docker.com/), o  [docker-compose](https://github.com/docker/compose) também esteja instalado em sua máquina.

Na raiz do projeto digite o seguinte comando
```
docker-compose up -d
```
Os containers para execução do projeto irão ser inicados, agora precisamos instalar as depêndencias e botar a API no ar.
Acesse o terminal do container node com o comando abaixo:
```
docker exec -it blogs_api bash
```
Instale as depêndencias do projeto:
```
npm install
```
Em outro terminal da sua maquina execute o comando abaixo para ver os logs do container mysql:
```
docker logs -f blogs_api_db
```
Após o container mysql liberar a porta 3306 para conexões, no terminal Node execute o comando abaixo para botar a API no ar:
```
npm start
```
O comando acima irá iniciar a API, porém antes ele roda um script de prestart, no qual irá criar o banco e executar as migrations do Sequelize.
Agora precisamos popular o banco com alguns dados, para isso acesse um novo container node e execute no terminal o comando a seguir:
```
npm run seed
```

---
### Localmente
❗Para rodar o projeto localmente será necessário ter instalado o  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v16+ e um servidor MySQL já ativo  em sua máquina.

Na raiz do projeto há um arquivo chamado `.env.example`, renomeie o arquivo para `.env` e ajuste o valor das variáveis de acordo com a configuração do seu servidor MySQL. 

Acesse o terminal e instale as depêndencias na raiz do projeto:
```
npm install
```
Em seguida dê start na aplicação:
```
npm start
```
O comando acima irá iniciar a API, porém antes ele roda um script de prestart, no qual irá criar o banco e executar as migrations do Sequelize.
Agora precisamos popular o banco com alguns dados, para isso acesse um novo terminal e execute o comando a seguir:
```
npm run seed
```


## Endpoints
---
Os endpoints de verbo http `GET` podem ser executados através do navegador, porém, para poder explorar o funcionamento dos demais enpoints será necessário utilizar alguma ferramenta dedicada a fazer requisições, como por exemplo: [Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com/) ou a extensão do VScode [Thunder Client](https://www.thunderclient.com/).

Na raiz do projeto existe um arquivo chamado `Insomnia_endpoints.json`, este arquivo contém todos os endpoints da aplicação, sendo necessário apenas importa-lo dentro de uma collection do seu Insomnia.

Abaixo estão os endpoints da aplicação:
Caso não haja mudado a porta de exposição da API, ela estará exposta na porta `3000`. Seguindo a seguinte URL `http://localhost:3000/<endpoint>`

#### Endpoint de login
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| POST | /login | { "email": "email@email.com",	"password": "123456" } | - |

#### Endpoints de user
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| POST | /user | { "displayName": "xablau", "email": "email@email.com", "password": "123456", "image": http://image.com/image_url } | - |
| GET | /user | - | authorization: <TOKEN> |
| GET | /user/:id | - | authorization: <TOKEN> |
| DELETE | /user/me | - | authorization: <TOKEN> |

#### Endpoints de categories
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| GET | /categories | - | authorization: <TOKEN> |
| POST | /categories | { "name": "TypeScript" } | authorization: <TOKEN> |

#### Endpoints de posts
| Método HTTP | Endpoint | Body JSON | Request Header |
| ----------- | -------- | --------- | -------------- |
| GET | /post | - | authorization: <TOKEN> |
| GET | /post/:id | - | authorization: <TOKEN> |
| GET | /post/search?q=<busca> | - | authorization: <TOKEN> |
| POST | /post | { "title": "TP é o melhor", "content": "conteúdo", "categoryIds": [] } | authorization: <TOKEN> |
| PUT | /post/:id | { "title": "titulo", "content": "conteúdo" } | authorization: <TOKEN> |
| DELETE | /post/:id | - | authorization: <TOKEN> |

## Executando os testes
---
⚠️ Em desenvolvimento ⚠️