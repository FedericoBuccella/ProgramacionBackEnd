import __dirname from "../utils.js";

export const configSqlite = {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/db/db.sqlite`
    },
    useNullAsDefault: true
}

export const configMariaDB = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'ecommerce'
    }
  }
