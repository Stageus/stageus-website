const pg = require('pg');

// PostgreSQL Database Account Configuration
const dbUser = {
    user: "ubuntu",
    host: "localhost",
    database: "stageus",
    password: "stageus0104",
    prot: 5432
}

const dbControl = async (sql, values) => {

    const result = {
        "message": "",
        "success": false,
        "list": null
    }

    const client = new pg.Client(dbUser)

    try {
        await client.connect()
    } catch(err) {
        result.message = "DBServerConnectionError"
        console.log("DBServerConnectionError: ", err);
        return result
    }

    try {
        const res = await client.query(sql, values);
        result.message = "Query Okay"
        result.success = true
        result.list = res.rows
    } catch(err) {
        result.message = "SQLSyntaxError"
        console.log("SQLSyntaxError: ", err);
    }
    client.end()

    return result
}

module.exports = dbControl