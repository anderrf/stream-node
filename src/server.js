import http from 'http';

const users = [];
var userId = 0;

const server = http.createServer((request, response) => {
    const {method, url} = request;
    if(method === 'GET' && url === '/users'){
        return response
            .setHeader('Content-type', 'application/json')
            .writeHead(200)
            .end(JSON.stringify([...users]));
    }
    if(method === 'POST' && url === '/users'){
        users.push({
            id: ++userId,
            name: 'Anderson',
            email: 'anderson@test.com'
        });
        return response
            .setHeader('Content-type', 'application/json')
            .writeHead(201)
            .end();
    }
    return response
        .setHeader('Content-type', 'application/json')
        .writeHead(404)
        .end();
});
server.listen(3333);