const fs = require('fs');
const path = require('path')

const dirCont = fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true},(err, files) => {
    if (err) {console.log(error)}
    else files.forEach(file => {
        //console.log(file)
        if(file.isFile()) {
            fs.stat(path.join('./03-files-in-folder/secret-folder', file.name), (err, stats) => {
                let result = (`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${stats.size} bytes`)
                console.log(result)
            })
        }}
    )  
})