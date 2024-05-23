const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'teste_pratico_multipedidos';

exports.handler = async (event) => {
    let response;
    console.log(JSON.parse(JSON.stringify(event)));
    switch (event.requestContext.http.method) {
        case 'GET':
            response = await getAllItems();
            break;
        case 'POST':
            response = await createItem(JSON.parse(event.body));
            break;
        case 'PUT':
            response = await updateItem(JSON.parse(event.body), event.pathParameters.id);
            break;
        case 'DELETE':
            response = await deleteItem(event.pathParameters.id);
            break;
        default:
            response = buildResponse(405, JSON.parse(JSON.stringify(event)));
            break;
    }
    return response;
};

/**
 * Retorna todos os itens
 * @returns object
 */
async function getAllItems() {
    const params = {
        TableName: TABLE_NAME
    };
    try {
        const data = await dynamo.scan(params).promise();
        return buildResponse(200, data.Items);
    } catch (error) {
        return buildResponse(500, error.message);
    }
}

/**
 * Cria o item no dynamo
 */
async function createItem(data) {

    /**
     * gerando uma primary key
     */
    data.id = 'item_'+generateRowId(4);


    if(!data.title)
        return  buildResponse(422, 'Título é obrigatório');


    const params = {
        TableName: TABLE_NAME,
        Item: data
    };

    try {
        await dynamo.put(params).promise();
        return buildResponse(201,params.Item);
    } catch (error) {
        return buildResponse(500, error.message);
    }
}

/**
 * Atualiza item no dynamo
 * @param {object} data 
 * @returns 
 */
async function updateItem(data, id) {

    if(!data.title || data.title == '')
        return  buildResponse(422, 'Título é obrigatório');

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        },
        UpdateExpression: "set title = :title, descricao = :descricao",
        ExpressionAttributeValues: {
            ":title": data.title,
            ":descricao": data.descricao,
        },
        ReturnValues: "UPDATED_NEW"
    };
    try {
        const result = await dynamo.update(params).promise();
        return buildResponse(200, result.Attributes);
    } catch (error) {
        return buildResponse(500, error.message);
    }
}

/**
 * Apaga o item do dynamo
 * @param {string} id 
 * @returns 
 */
async function deleteItem(id) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        }
    };
    try {
        await dynamo.delete(params).promise();
        return buildResponse(204, null);
    } catch (error) {
        return buildResponse(500, error.message);
    }
}

/**
 * Retorna os dados
 * @param {number} statusCode 
 * @param {string} body 
 * @returns 
 */
function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body)
    };
}

/**
 * Gera uma primery key de acordo com o tempo
 * @param shardId 
 * @returns 
 */
function generateRowId(shardId /* range 0-64 for shard/slot */) {
  var ts = new Date().getTime() -  1300000000000; // limit to recent
  var randid = Math.floor(Math.random() * 512);
  ts = (ts * 64);   // bit-shift << 6
  ts = ts + shardId;
  return (ts * 512) + randid;
}
