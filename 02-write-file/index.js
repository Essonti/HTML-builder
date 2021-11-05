
const process = require('process');
const fs = require('fs');
const {stdin, stdout, exit} = process;

stdout.write('Пожалуйста, напишите что-нибудь о себе:\n')
const output = fs.createWriteStream('./02-write-file/My_story.txt')
stdin.on('data', chunk => {    
    output.write(chunk);
    if (chunk.toString().trim() === 'exit') {
        process.exit();
    }
});
process.on('exit', () => console.log('До свидания!'));
process.on('SIGINT', function() {
        process.exit();
});