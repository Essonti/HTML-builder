const fs = require('fs')
const path = require('path')
const fsProm = require('fs/promises')


fs.access('./06-build-page/project-dist/index.html', (err) => {
    if(!err) {
        fs.unlink('./06-build-page/project-dist/index.html', (err) => {if(err) throw err})
    }
})
fs.access('./06-build-page/project-dist/style.css', (err) => {
    if(!err) {
        fs.unlink('./06-build-page/project-dist/style.css', (err) => {if(err) throw err})
    }
})

fsProm.mkdir('./06-build-page/project-dist/', {recursive: true})
const input = fs.createReadStream('./06-build-page/template.html', 'utf-8')
let tagArr = [], chunkMod, chunkInput, replacer, result 

input.on('data', chunk => {
    chunkMod = chunk.slice(0);
    chunkInput = chunk.slice(0);
    while (chunkMod.indexOf('}}') !== -1) {
        tagArr.push(chunkMod.slice(chunkMod.indexOf('{{'), chunkMod.indexOf('}}') + 2))
        chunkMod = chunkMod.slice(chunkMod.indexOf('}}') + 2)
    }
    for(let i = 0; i < tagArr.length; i++) {
        replacer = fs.createReadStream(`./06-build-page/components/${tagArr[i].slice(2, tagArr[i].length - 2)}.html`, 'utf-8')
            replacer.on('data', chunk2 => {
           function tagReplacer(match) {
               return chunk2;
           }
            if(i === 0) {
                result = chunkInput.replace(/{{(\w+)}}/, tagReplacer) 
                fs.writeFile('./06-build-page/project-dist/index.html', result, /*{flag: 'a'},*/ err => {if(err) throw err})
            } else {
                result = result.replace(/{{(\w+)}}/, tagReplacer) 
                fs.writeFile('./06-build-page/project-dist/index.html', result, /*{flag: 'a'},*/ err => {if(err) throw err})
            }
            }).on('exit', () => {})
    }  
})

fs.readdir('./06-build-page/styles/', {withFileTypes: true}, (err, files) => {
    files.forEach(el => {
        if (el.name === 'header.css') {
            let firstPart = files.slice(0, files.indexOf(el))
            files = files.slice(files.indexOf(el))
            files.push(firstPart);
            files = files.flat()
        }
    })
    //Alternative
    // let firstElem = files[0]
    // files.shift();
    // files.push(firstElem);
    files.forEach(file => {
        if(file.isFile() && path.extname(file.name) === '.css') {
            const input = fs.createReadStream(path.join('./06-build-page/styles/', file.name), 'utf-8')
            input.on('data', chunk => {
                fs.writeFile('./06-build-page/project-dist/style.css', chunk /*+ '\n'*/, {flag: 'a'}, (err) => {if(err) throw err;})
            })
        }
    })
})

try {
function copyAssets () {
    fsProm.mkdir('./06-build-page/project-dist/assets/', {recursive: true})
    fsProm.mkdir('./06-build-page/project-dist/assets/fonts/', {recursive: true})
    fsProm.mkdir('./06-build-page/project-dist/assets/img/', {recursive: true})
    fsProm.mkdir('./06-build-page/project-dist/assets/svg/', {recursive: true})
    fsProm.readdir('./06-build-page/assets/fonts', (err, files) => {
        files.forEach(file => {
            fsProm.copyFile(path.join('./06-build-page/assets/fonts', file), path.join('./06-build-page/project-dist/assets/fonts', file))
        })
    })
    fs.readdir('./06-build-page/assets/img', (err, files) => {
        files.forEach(file => {
            fsProm.copyFile(path.join('./06-build-page/assets/img', file), path.join('./06-build-page/project-dist/assets/img', file))
        })
    })
    fs.readdir('./06-build-page/assets/svg', (err, files) => {
        files.forEach(file => {
            fsProm.copyFile(path.join('./06-build-page/assets/svg', file), path.join('./06-build-page/project-dist/assets/svg', file))
        })
    })
    }
    } catch {
        console.log(`Can't be copied!`)
}
copyAssets()