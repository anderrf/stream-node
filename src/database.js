import fs from 'node:fs/promises';

export class Database{
    #database = {};

    constructor(){
        const databasePath = new URL('../database-file/db.json', import.meta.url);
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            });
    }

    select(table){
        const data = this.#database[table] ?? [];
        return data;
    }
        
    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        }
        else{
            this.#database[table] = [data];
        }
        this.#persist();
        return data;
    }

    #persist(){
        const databasePath = new URL('../database-file/db.json', import.meta.url);
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }
}