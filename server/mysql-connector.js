const mysql = require('mysql');
var config = require('./mysql-config.json');

const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this number based on your workload and MySQL server configuration
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.pass,
    multipleStatements: true,
    dateStrings: true,
});

module.exports = {
    getTable: async function(query) {
        return await runQuery(query);
    },
};


function runQuery(query) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                return reject(`Error getting database connection: ${err.message}`);
            }

            connection.query(query, [], (error, results) => {
                connection.release();

                if (error) {
                    console.log(error);
                    return reject(`Error executing query: ${error.message}`);
                }

                resolve(results);
            });
        });
    });
}
