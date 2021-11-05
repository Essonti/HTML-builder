const fs = require('fs');
const fsProm = require('fs/promises')
const path = require('path')

fs.unlink ('./05-merge-styles/project-dist/bundle.css', (err) => {if(err) throw err;})
fs.readdir('./05-merge-styles/styles/', {withFileTypes: true}, (err, files) => {

    files.forEach(file => {
        if(file.isFile() && path.extname(file.name) === '.css') {
            const input = fs.createReadStream(path.join('./05-merge-styles/styles/', file.name), 'utf-8')
            input.on('data', chunk => {
                fs.writeFile('./05-merge-styles/project-dist/bundle.css', chunk, {flag: 'a'}, (err) => {if(err) throw err;})
            })
        }
    })
})