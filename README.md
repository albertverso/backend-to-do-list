## Escopo do projeto

Para a implementação deste projeto vamo precisar usar as seguintes tecnologias:

- **Node.js** para fornecer a possibilidade de executar JS em um servidor
- **Express.js** para criar rotas de api
- **Dotenv** para criarmos configurações com mais facilidade e segurança
- **Nodemon** para termos mais produtividade em nosso ambiente de desenvolvimento
- **Supabase** para persistência de dados
- **Sequelize** para termos mais produtividade ao lidar com o banco de dados 
- **JWT** para adicionar segurança e limitar o acesso nas rotas de API
- **Cloundinary** para guardar imagem enviada pelo usuário e transforma em url para o banco
- **Bcryptjs** criptografa as senhas para o banco

## Estrutura de diretório
```
backend-to-do-list/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
├── .env
├── .gitignore
└── package.json
```

## Response status code
- [200 OK](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/200)
  - Indica que a API REST executou com êxito qualquer ação solicitada pelo cliente
  - Ao contrário do código de status 204, uma   200 deve incluir um corpo de resposta
- [201 CREATED](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/201)
  - Indica que a requisição foi bem sucedida e que um novo recurso foi criado
- [204 No content](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/204)
  - O código de status 204 geralmente é enviado em resposta a uma solicitação PUT ou DELETE quando a API se recusa a retornar qualquer corpo de mensagem no response
  - A resposta 204 NÃO DEVE incluir um corpo de mensagem
- [400 Bad Request](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/400)
  - Indica que o servidor não pode ou não irá processar a requisição devido a alguma coisa que foi entendida como um erro do cliente
- [401 Unauthorized](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/401)
  - Indica que a solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino
- [404 Not Found](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/404)
  - Indica que o servidor não conseguiu encontrar o recurso solicitado


## Seção 01 - Implementar o banco de dados da aplicação

<details>
  <summary><strong>Requisito 01 - Criar a tabela de User</strong></summary><br>

O objetivo deste requisito é criar a tabela de usuários no banco de dados utilizando o Sequelize ORM. A tabela deve conter as colunas a seguir:

- **id**: Coluna do tipo INTEGER que representa a chave primária da tabela. Seu valor deve ser incrementado automaticamente pelo banco de dados
- **firstName**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o primeiro nome do usuário
- **lastName**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o sobrenome do usuário.
- **email**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o endereço de email do usuário
- **password**: Coluna do tipo STRING e de preenchimento obrigatório que armazena a senha do usuário. O valor a ser armazenado deve ser o hash da senha gerado pelo pacote bcrypt.
- **profilePic**: Coluna do tipo String e de preenchimento opcional.

> Use a configuração `timestamps: true` do sequelize para gerar as colunas **created_at** e **updated_at**

</details>

<details>
  <summary><strong>Requisito 02 - Criar a tabela de Task</strong></summary><br>

O objetivo deste requisito é criar a tabela de Tarefas no banco de dados utilizando o Sequelize ORM. A tabela deve conter as colunas a seguir:

- **id**: Coluna do tipo INTEGER que representa a chave primária da tabela. Seu valor deve ser incrementado automaticamente pelo banco de dados
- **userId**: Coluna do tipo INTEGER que representa a chave estrangeira da tabela User. Referencia ao id do usuário
- **title**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o nome da tarefa.
- **description**: Coluna do tipo STRING, e de preenchimento obrigatório que armazena a descrição da tarefa.
- **favorite**: Coluna do tipo BOOLEAN e de preenchimento opcional que define se a tarefa é favorita. Valor padrão deve ser False.
- **progress**: Coluna do tipo FLOAT e de preenchimento opcional que define o progresso da tarefa. Valor padrão deve ser 0.
- **finishDate**: Coluna do tipo DATE e de preenchimento opcional que define a data que a tafera foi finalizada.

> Use a configuração `timestamps: true` do sequelize para gerar as colunas **created_at** e **updated_at**

</details>

<details>
  <summary><strong>Requisito 03 - Criar a tabela de TaskItem</strong></summary><br>

O objetivo deste requisito é criar a tabela de itens dentro da tabela de tarefas no banco de dados utilizando o Sequelize ORM. A tabela deve conter as colunas a seguir:

- **id**: Coluna do tipo INTEGER que representa a chave primária da tabela. Seu valor deve ser incrementado automaticamente pelo banco de dados
- **status**: Coluna do tipo BOOLEAN e de preenchimento opcional que define se o item foi concluido(true) ou não(false). Valor padrão deve ser False.
- **title**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o titulo do item.
- **taskId**: Coluna do tipo INTEGER que representa a chave estrangeira da tabela Task. Referencia ao id de task.

> Use a configuração `timestamps: true` do sequelize para gerar as colunas **created_at** e **updated_at**

</details>

## Seção 02 - Implementar endpoints para o CRUD de usuarios

<details>
  <summary><strong>Requisito 01 - Criar endpoint para obter informações do usuário pelo ID</strong></summary><br>
  
- GET /v1/user/:id

**Response body**
```json
{
	"id": 1,
	"firstName": "a",
	"lastName": "b",
	"email": "ab@gmail.com",
	"password": "$2a$10$mAgzk3Vd1Ucz50HzUEmTJu0UQOk.nLSmIh/LRBc010nmLmIKw8I92",
	"profilePic": "https://res.cloudinary.com/dajvgprkmf.jpg",
	"updatedAt": "2024-09-10T03:54:55.811Z",
	"createdAt": "2024-09-10T03:54:55.811Z"
}
```

**Response Status Code**
- 200 OK - Deve ser retornado quando a requisição foi bem sucedida
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>


<details>
  <summary><strong>Requisito 02 - Criar endpoint de cadastro de usuário</strong></summary><br>
  
- POST /v1/user

**Headers**
- Content-type: application/json

**Payload**

```json
{
	"firstName": "asd",
	"lastName": "asd",
	"email": "a@gmail.com",
	"password": "123456",
	"profilePic": "url da imagem",
}
```

**Response Status Code**
- 201 Created - Deve ser retornado quando o cadastro for bem sucedido
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
</details>


<details>
  <summary><strong>Requisito 03 - Criar endpoint atualizar usuário</strong></summary><br>

  - PUT /v1/user/:id

**Headers**
- Content-type: application/json

**Payload**
```json
{
	"firstName": "dc",
	"lastName": "cd",
	"email": "g@gmail.com",
	"password": "12",
	"profilePic": "https://res.cloudinary.com/dajvgprso/image/upload/v1725940495/profile_pics/xikpyjcnwawbbelhokmf.jpg",
} 
```

**Response Status Code**
- 204 No Content - Deve ser retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>


<details>
  <summary><strong>Requisito 04 - Criar endpoint de deletar usuário</strong></summary><br>

- DELETE /v1/user/:id

**Headers**
- Content-type: application/json

**Response Status Code**
- 204 No Content - Deve ser retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe

</details>

## Seção 03 - Implementar endpoints para o CRUD de task

<details>
  <summary><strong>Requisito 01 - Criar endpoint para obter uma lista de Tarefas referente ao usuário </strong></summary><br>

- GET /v1/task/all/:id

**Response body**
```json
[
	{
		"id": 2,
		"title": "Estudar",
		"description": "asdasdasd",
		"finishDate": "2024-12-31T00:00:00.000Z",
		"progress": 100,
		"userId": 3,
		"favorite": false,
		"createdAt": "2024-09-08T20:28:55.510Z",
		"updatedAt": "2024-09-09T18:07:32.386Z",
		"TaskItems": [
			{
				"id": 3,
				"title": "Assistir vídeo aula 1",
				"status": true,
				"taskId": 2,
				"createdAt": "2024-09-08T20:28:56.177Z",
				"updatedAt": "2024-09-08T20:28:56.177Z"
			},
			{
				"id": 4,
				"title": "Praticar exercícios",
				"status": true,
				"taskId": 2,
				"createdAt": "2024-09-08T20:28:56.177Z",
				"updatedAt": "2024-09-09T04:48:33.922Z"
			}
		]
	},
  {
		"id": 3,
		"title": "Programar",
		"description": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdasd",
		"finishDate": "2024-12-31T00:00:00.000Z",
		"progress": 100,
		"userId": 3,
		"favorite": false,
		"createdAt": "2024-09-08T20:29:30.257Z",
		"updatedAt": "2024-09-09T18:07:32.185Z",
		"TaskItems": [
			{
				"id": 12,
				"title": "kotlin",
				"status": true,
				"taskId": 3,
				"createdAt": "2024-09-09T05:11:09.677Z",
				"updatedAt": "2024-09-09T05:11:09.677Z"
			},
			{
				"id": 5,
				"title": "java",
				"status": true,
				"taskId": 3,
				"createdAt": "2024-09-08T20:29:30.915Z",
				"updatedAt": "2024-09-09T05:12:36.251Z"
			},
			{
				"id": 6,
				"title": "python",
				"status": true,
				"taskId": 3,
				"createdAt": "2024-09-08T20:29:30.915Z",
				"updatedAt": "2024-09-09T05:12:44.721Z"
			}
		]
	},
 ]
```

**Response Status Code**
- 200 OK - Deve ser retornado quando a requisição foi bem sucedida
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
</details>

<details>
  <summary><strong>Requisito 02 - Criar endpoint para obter informações de somente uma tarefa</strong></summary><br>

- GET /v1/task/:taskId

**Response body**
```json
{
	"id": 6,
	"title": "asdddddddd",
	"description": "dassssssssssssssssssssssss as dasdas  asdonaoisdn",
	"finishDate": null,
	"progress": 20,
	"userId": 3,
	"favorite": false,
	"createdAt": "2024-09-08T23:04:51.593Z",
	"updatedAt": "2024-09-09T18:07:32.096Z",
	"TaskItems": [
		{
			"id": 14,
			"title": "3",
			"status": false,
			"taskId": 6,
			"createdAt": "2024-09-09T05:30:54.898Z",
			"updatedAt": "2024-09-09T05:30:54.898Z"
		},
		{
			"id": 15,
			"title": "4",
			"status": false,
			"taskId": 6,
			"createdAt": "2024-09-09T05:30:55.044Z",
			"updatedAt": "2024-09-09T05:30:55.044Z"
		},
	]
} 
```

**Response Status Code**
- 200 OK - Deve ser retornado quando a requisição foi bem sucedida
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>


<details>
  <summary><strong>Requisito 03 - Criar endpoint de cadastro de tarefas</strong></summary><br>

- POST /v1/task

**Headers**
- Content-type: application/json

**Payload**

```json
{
  "title": "ar",
  "description": "aaaaaaaaaaaaaasdasd",
  "userId": 3,
  "taskItems": [
    {
      "title": "java"
    },
    {
      "title": "python"
    }
  ]
}

```

**Response Status Code**
- 201 Created - Deve ser retornado quando o cadastro for bem sucedido
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
</details>

<details>
  <summary><strong>Requisito 04 - Criar endpoint de atualização de tarefas</strong></summary><br>

- PUT /v1/task/:id

**Headers**
- Content-type: application/json

**Payload**
```json
 {
		"title": "ar",
		"description": "aaaaaaaaaaaaaasdasd",
		"finishDate": "2024-12-31T00:00:00.000Z",
		"progress": 20,
		"favorite": false,
    "taskItems": [
        {
          "title": "java"
        },]
	}
```

**Response Status Code**
- 204 No Content - Deve ser retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>

<details>
  <summary><strong>Requisito 05 - Criar endpoint de deletar tarefa</strong></summary><br>

- DELETE /v1/task/:id

**Headers**
- Content-type: application/json

**Response Status Code**
- 204 No Content - Deve ser retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>

<details>
  <summary><strong>Requisito 04 - Criar endpoint para obter tarefa favoritas</strong></summary><br>

- GET /v1/task/favorite/:userId

**Response body**
```json
{
	"id": 6,
	"title": "asdddddddd",
	"description": "dassssssssssssssssssssssss as dasdas  asdonaoisdn",
	"finishDate": null,
	"progress": 20,
	"userId": 3,
	"favorite": true,
	"createdAt": "2024-09-08T23:04:51.593Z",
	"updatedAt": "2024-09-09T18:07:32.096Z",
	"TaskItems": [
		{
			"id": 14,
			"title": "3",
			"status": false,
			"taskId": 6,
			"createdAt": "2024-09-09T05:30:54.898Z",
			"updatedAt": "2024-09-09T05:30:54.898Z"
		},
		{
			"id": 15,
			"title": "4",
			"status": false,
			"taskId": 6,
			"createdAt": "2024-09-09T05:30:55.044Z",
			"updatedAt": "2024-09-09T05:30:55.044Z"
		},
	]
} 
```

**Response Status Code**
- 200 OK - Deve ser retornado quando a requisição foi bem sucedida
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>

## Seção 04 - Implementar endpoints para o CRUD de produtos

<details>
  <summary><strong>Requisito 01 - Criar endpoint para obter uma lista de produtos</strong></summary><br>

- GET /v1/product/search

**Query params**
  - `limit=30`
    - Query string para definir o limit de itens por página
    - Use `-1` como valor para buscar todos os itens
    - Padrão: 12
  - `page=2`
    - Query string para definir a paginação dos dados retornados
    - Quando `limit` receber `-1` a opção de `page` não tem nenhum efeito no resultado da busca e pode ser omitida da query string
    - Padrão: 1
  - `fields=name,images,price`
    - Query string para limitar quais campos serão retornados
  - `match=Tênis`
    - Query string usada para filtrar o resultado de produtos por um termo que combine com o nome ou descrição do produto
  - `category_ids=15,24`
    - Query string usada para filtrar o resultado de produtos pelo ID das categorias
  - `price-range=100-200`
    - Query string para filtrar o resultado de produtos por uma determinada "janela" de preços 
  - `option[45]=GG,PP`
    - Query string para filtrar o resultado de produtos pelo valor das opções disponíveis

**Response body**
```json
{
  "data": [
    {
      "id": 1,
      "enabled": true,
      "name": "Produto 01",
      "slug": "produto-01",
      "stock": 10,
      "description": "Descrição do produto 01",
      "price": 119.90,
      "price_with_discount": 99.90,
      "category_ids": [1, 15, 24, 68],
      "images": [
        {
          "id": 1,
          "content": "https://store.com/media/product-01/image-01.png"
        },
        {
          "id": 2,
          "content": "https://store.com/media/product-01/image-02.png"
        },
        {
          "id": 3,
          "content": "https://store.com/media/product-01/image-02.jpg"
        }
      ],
      "options": [
        { 
          "id": 1
          ... 
        },
        { 
          "id": 2
          ... 
        }
      ]
    }
  ],
  "total": 120,
  "limit": 12,
  "page": 1,
}  
```
**Response Status Code**
- 200 OK - Deve ser retornado quando a requisição foi bem sucedida
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
</details>

<details>
  <summary><strong>Requisito 02 - Criar endpoint para obter informações do produto pelo ID</strong></summary><br>

- GET /v1/product/:id

**Response body**
```json
{
  "id": 1,
  "enabled": true,
  "name": "Produto 01",
  "slug": "product-01",
  "stock": 10,
  "description": "Descrição do produto 01",
  "price": 119.90,
  "price_with_discount": 99.90,
  "category_ids": [1, 15, 24, 68],
  "images": [
    {
      "id": 1,
      "content": "https://store.com/media/product-01/image-01.png"
    },
    {
      "id": 2,
      "content": "https://store.com/media/product-01/image-02.png"
    },
    {
      "id": 3,
      "content": "https://store.com/media/product-01/image-02.jpg"
    }
  ],
  "options": [
    { 
      "id": 1
      ... 
    },
    { 
      "id": 2
      ... 
    }
  ]
}  
```

**Response Status Code**
- 200 OK - Deve ser retornado quando a requisição foi bem sucedida
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>

<details>
  <summary><strong>Requisito 03 - Criar endpoint de criação de produto</strong></summary><br>

- POST /v1/product

**Headers**
- Content-type: application/json

**Payload**

```json
  {
    "enabled": true,
    "name": "Produto 01",
    "slug": "produto-01",
    "stock": 10,
    "description": "Descrição do produto 01",
    "price": 119.90,
    "price_with_discount": 99.90,
    "category_ids": [1, 15, 24, 68],
    "images": [ 
      {
        "type": "image/png",
        "content": "base64 da imagem 1" 
      },
      {
        "type": "image/png",
        "content": "base64 da imagem 2" 
      },
      {
        "type": "image/jpg",
        "content": "base64 da imagem 3" 
      }
    ],
    "options": [
      {
        "title": "Cor",
        "shape": "square",
        "radius": "4px",
        "type": "text",
        "value": ["PP", "GG", "M"]
      },
      {
        "title": "Tamanho",
        "shape": "circle",
        "type": "color",
        "values": ["#000", "#333"]
      }
    ]
  }
  ```

**Response Status Code**
- 201 Created - Deve ser retornado quando o cadastro for bem sucedido
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
</details>

<details>
  <summary><strong>Requisito 04 - Criar endpoint de atualização de produto</strong></summary><br>

- PUT /v1/product/:id

**Headers**
- Content-type: application/json

**Payload**

```json
  {
    "enabled": true,
    "name": "Produto 01 atualizado",
    "slug": "produto-01-atualizado",
    "stock": 20,
    "description": "Descrição do produto 01 atualizado",
    "price": 49.9,
    "price_with_discount": 0,
    "category_ids": [1, 15, 24, 68],
    "images": [ 
      {
        "type": "image/png",
        "content": "base64 da imagem 1" 
      },
      {
        "id": 2,
        "deleted": true
      },
      {
        "id": 3,
        "content": "base64 da imagem 3" 
      },
      {
        "id": 1,
        "content": "https://store.com/media/product-01/image-01.jpg"
      }
    ],
    "options": [
      {
        "id": 1,
        "deleted": true,
      }
      {
        "id": 2,
        "radius": "10px",
        "value": ["42/43", "44/45"]
      },
      {
        "title": "Tipo",
        "shape": "square",
        "type": "text",
        "values": ["100% algodão", "65% algodão"]
      }
    ]
  }
  ```

**Response Status Code**
- 204 No Content - Deve ser retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>


<details>
  <summary><strong>Requisito 05 - Criar endpoint de atualização de produto</strong></summary><br>

- DELETE /v1/product/:id

**Headers**
- Content-type: application/json

**Response Status Code**
- 204 No Content - Deve ser retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 401 Unauthorized - Deve ser retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Deve ser retornado quando o recurso solicitado não existe
</details>


## Seção 05 - Implementar e validar token JWT
<details>
  <summary><strong>Requisito 01 - Criar endpoint de geração do token JWT</strong></summary><br>

- POST /v1/user/token

**Headers**
- Content-type: application/json

**Payload**

```json
{
  "email": "user@mail.com",
  "password": "123@123",
}  
```

**Response body**
```json
{
  "token": "<JWT>",
}  
```

**Response Status Code**
- 200 OK - Deve ser retornado quando a requisição foi bem sucedida
- 400 Bad Request - Deve ser retornado quando a os dados da requisição estiverem incorretos
</details>

<details>
  <summary><strong>Requisito 02 - Validar token nos métodos POST, PUT e DELETE</strong></summary><br>

  Todos os endpoints POST, PUT e DELETE devem conter o cabeçalho `Authorization: Bearer <jwt>`, caso contrario a requisição
  deve ser rejeitada com o status code **400 Bad Request**
<details>
