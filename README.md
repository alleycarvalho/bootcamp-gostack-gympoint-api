<h1 align="center">
  <img src=".github/logo.png" title="Gympoint" width="200px" alt="Gympoint" />
</h1>

<h3 align="center">
  Projeto: Gympoint
</h3>

<blockquote align="center">
  “Não espere para plantar, apenas tenha paciência para colher!”
</blockquote>

<p align="center">
  <img src="https://img.shields.io/github/languages/count/alleycarvalho/gympoint?color=%2304D361" alt="GitHub language count">

  <img src="https://img.shields.io/badge/license-MIT-%2304D361" alt="License">

  <a href="https://github.com/alleycarvalho/gympoint/stargazers">
    <img src="https://img.shields.io/github/stars/alleycarvalho/gympoint?style=social" alt="Stargazers">
  </a>
</p>

## :rocket: Sobre o projeto

O **Gympoint** é uma aplicação de gerenciamento de academia.

## :mortar_board: Bootcamp - Desafio 2

### Ferramentas

- [x] Aplicação utilizando [Express](https://expressjs.com/pt-br/)
- [x] Configuração do [Sucrase](https://github.com/alangpierce/sucrase/) + [Nodemon](https://github.com/remy/nodemon/)
- [x] Configuração do [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) + [EditorConfig](https://editorconfig.org/)
- [x] Configuração do [Sequelize](https://github.com/alangpierce/sucrase/) (Utilizando [PostgreSQL](https://www.postgresql.org/))

### Funcionalidades

###### Autenticação

- [x] Autenticação utilizando **e-mail** e **senha**
- [x] Autenticação utilizando [JWT: Json Web Token](https://jwt.io/)
- [x] Validação dos dados de entrada com [YUP](https://github.com/jquense/yup)
- [x] Criação de usuário administrador via [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed)

###### Cadastro de alunos (students)

- [x] Criação de tabela `students` no banco de dados
- [x] Cadastrar/Editar alunos utilizando **nome**, **email**, **idade**, **peso** e **altura**
- [x] Somente administradores autenticados podem cadastrar alunos
- [x] O aluno não pode se autenticar no sistema

## :mortar_board: Bootcamp - Desafio 3

### Funcionalidades do administrador

###### Gestão de planos (plans)

- [x] Criação de tabela `plans` no banco de dados com os campos:
  - **title** (Nome do plano)
  - **duration** (Duração em número de meses)
  - **price** (Preço mensal do plano)
  - **created_at**
  - **updated_at**
- [x] Criação dos planos:
  - **Start**: Plano de **1 mês** por **R\$ 129,00**
  - **Gold**: Plano de **3 meses** por **R\$ 109,00/mês**
  - **Diamond**: Plano de **6 meses** por **R\$ 89,00/mês**
- [x] Criação de rotas para **listar**, **cadastrar**, **atualizar** e **remover** planos
- [x] Esse recurso é apenas para admnistradores autenticados na aplicação

###### Gestão de matrículas (enrollments)

Apesar do aluno estar cadastrado na plataforma, isso não significa que o mesmo tem uma matrícula ativa e que pode acessar a academia.

- [ ] Criação de tabela `enrollments` no banco de dados com os campos:
  - **student_id** (Referência ao aluno)
  - **plan_id** (Referência ao plano)
  - **start_date** (Data de início da matrícula)
  - **end_date** (Data de término da matrícula)
  - **price** (Preço total calculado na data da matrícula)
  - **created_at**
  - **updated_at**
- [ ] A **data de início** da matrícula deve ser escolhida pelo usuário
- [ ] A **data de término** e **preço total** da matrícula deve ser calculada com base no plano selecionado
- [ ] O aluno que **realiza uma matrícula** deve receber um e-mail com **mensagem de boas-vindas** e **detalhes da sua inscrição** na academia, tais como: **plano**, **data de término** e **valor**
- [ ] Criação de rotas para **listar**, **cadastrar**, **atualizar** e **remover** matrículas
- [ ] Esse recurso é apenas para admnistradores autenticados na aplicação

### Funcionalidades do aluno

###### Checkins

- [ ] O aluno chega na academia e realiza um **check-in** informando apenas seu **ID de cadastro** (ID do banco de dados)
- [ ] Criação de tabela `checkins` no banco de dados com os campos:
  - **student_id** (Referência ao aluno)
  - **created_at**
  - **updated_at**
- [ ] O aluno só pode fazer **5 checkins** dentro de um período de **7 dias** corridos.
- [ ] Criação de rota para **listar** todos os checkins realizados por um usuário com base em seu **ID de cadastro**

###### Pedidos de auxílio

O aluno pode criar pedidos de auxílio para a academia em relação a algum exercício, alimentação ou instrução qualquer.

- [ ] Criação de tabela `help_orders` no banco de dados com os campos:
  - **student_id** (Referência ao aluno)
  - **question** (Pergunta do aluno em texto)
  - **answer** (Resposta da academia em texto)
  - **answer_at** (Data da resposta da academia)
  - **created_at**
  - **updated_at**
- [ ] Criação de rota para o aluno **cadastrar** pedidos de auxílio informando apenas seu **ID de cadastro** (ID do banco de dados)
- [ ] Criação de rota para **listar** todos os pedidos de auxílio de um aluno com base em seu **ID de cadastro**
- [ ] Criação de rota para **listar** todos os **pedidos de auxílio sem resposta**
- [ ] Criação de rota para a academia **cadastrar** a resposta de um pedido de auxílio
- [ ] Quando um pedido de auxílio for respondido, o aluno deve receber um **e-mail** da plataforma com a **pergunta** e **resposta** da academia

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Projeto prático desenvolvido por <b>Alley M. Carvalho</b>
