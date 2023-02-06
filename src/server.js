import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

const server = http.createServer(async(request, response) => {
    const {method, url} = request;
    await json(request, response);
    if(method === 'GET' && url === '/users'){
        return response
            .writeHead(200)
            .end(JSON.stringify([...database.select('users')]));
    }
    if(method === 'POST' && url === '/users'){
        const {name, email} = request.body;
        const user = {
            id: randomUUID(),
            name,
            email
        };
        let savedUser = database.insert('users', user);
        return response
            .writeHead(201)
            .end(JSON.stringify(savedUser));
    }
    return response
        .writeHead(404)
        .end();
});
server.listen(3333);