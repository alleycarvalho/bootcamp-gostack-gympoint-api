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

- [ ] Criação de tabela `students` no banco de dados
- [ ] Cadastrar/Editar alunos utilizando **nome**, **email**, **idade**, **peso** e **altura**
- [ ] Somente administradores autenticados podem cadastrar alunos
- [ ] O aluno não pode se autenticar no sistema

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Projeto prático desenvolvido por <b>Alley M. Carvalho</b>
