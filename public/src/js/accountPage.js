const 

function getAccountObject() {
    const fs = require('fs')

    fs.readFile('data/data.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
    })
}