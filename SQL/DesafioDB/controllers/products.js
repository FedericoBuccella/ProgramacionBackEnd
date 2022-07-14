import knex from 'knex' 
import {configMariaDB} from '../MariaDB-Sqlite3/config.js';

class products {
    constructor(config, table){
        this.table = table;
        this.config = config;

        knex(this.config).schema.hasTable(this.table).then(exists => {
            if (!exists) {
                return knex(this.config).schema.createTable(this.table, table => {
                    table.increments('id').notNullable().primary();
                    table.string('title', 100).notNullable();
                    table.string('thumbnail').notNullable();
                    table.float('price').notNullable();
                  });
            }
        }).catch(err => console.log("error en constructor", err))
    }

    async getAll (){
        try {
            const products = await knex(this.config).from(this.table).select('*');
            return {products};
        } catch (error) {
            console.log("error al obtener productos", error);
        } finally{
            knex(this.config).destroy();
        }
    }

    async add (product){
        try {
            await knex(this.config)(this.table).insert(product);
        } catch (error) {
            console.log("error al crear producto", error);
        } finally{
            knex(this.config).destroy();
        }
    }
}

export default new products(configMariaDB, 'product');
