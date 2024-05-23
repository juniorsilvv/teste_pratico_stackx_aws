## Teste Prático StackX

Teste feito no Lambda utilizando no NODEJS, utilizando o dynamoDB para o banco de dados e utilizando o API Gateway para gerenciamento de rotas.


## Lambda
No Lambda foi criado um arquivo index.js onde o mesmo verifica qual o método a requisição(GET, POST, PUT, DELETE), dependendo do método ele chama uma função especifica para realizar a ação.


## API Gateway
O Api Gateway foi criado as rotas cada requisição e cada rota invoca o Lambda.


## DynamoDB

No DynamoDB foi criado um banco de dados onde o a chave primária é uma string.