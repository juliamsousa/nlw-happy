const dataBase = require ('sqlite-async');

function execute (db) {
    console.log("entrei na funcao execute")
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );
    `)
}

module.exports = dataBase.open(__dirname+'/database.sqlite').then(execute);