const oracledb = require('oracledb');


async function runApp() {
    try {
        return await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.SID}`
        });
    } catch (err) {
        console.error(err);
    }
}
module.exports = { runApp };