## Teste Prático StackX

Teste feito no Lambda utilizando no NODEJS, utilizando o dynamoDB para o banco de dados e utilizando o API Gateway para gerenciamento de rotas.


## Lambda
No Lambda foi criado um arquivo index.js onde o mesmo verifica qual o método a requisição(GET, POST, PUT, DELETE), dependendo do método ele chama uma função especifica para realizar a ação.


## API Gateway
O Api Gateway foi criado as rotas cada requisição e cada rota invoca o Lambda.


## DynamoDB

No DynamoDB foi criado um banco de dados onde o a chave primária é uma string.


## Execução do projeto na AWS

Faça o clone do projeto e rode o comando ``` npm install ```.


Com as depêndencias instaladas, crie um zip com os arquivos.

Crie uma nova função Lambda, na aba Código faça o upload do zip com o código que acabou de criar.

Crie um novo banco de dados no DynamoDB e defina sua chave primária como string

OBS: Por padrão o Lambda não tem acesso ao DynamoDB, necessário liberar o acesso.

Acesse o IAM, Acesse função e procure pela função lambda que acabou de criar.

Na aba permissões clique em Anexa politica e pesquise pela e pesquise pela politica AmazonDynamoDBFullAccess.
