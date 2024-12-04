var fs = require('fs');
var dados = 'Hello, world!';
var caminho = './helloworld.txt';
fs.writeFile(caminho, dados, 'utf8', function (erro) {
  if (erro) {
    console.error('Erro ao escrever o arquivo:', erro);
  } else {
    console.log('Arquivo salvo com sucesso!');
  }
});