const fsProm = require('fs/promises');
const fs = require('fs');
const path = require('path')

fs.readdir('./04-copy-directory/file-copy', (err, files) => {
    files.forEach(file => {
        fs.unlink(path.join('./04-copy-directory/file-copy', file), err => {
            if (err) throw err;
        })
    })
    });
try {
    function copyDir () {
    fsProm.mkdir('./04-copy-directory/file-copy', {recursive: true})
    
    fs.readdir('./04-copy-directory/files', (err, files) => {
        files.forEach(file => {
            fsProm.copyFile(path.join('./04-copy-directory/files', file), path.join('./04-copy-directory/file-copy', file))
        })
    })
}
} catch {
    console.log(`Can't be copied`)
}
copyDir()