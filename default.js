// JavaScript Document
var urlatual = window.location.href;

//tenta localizar o se é teste local ou esta na internet
/*var res = urlatual.search('C:');
//alert ('URL: ' + urlatual + ' Local: ' + res.toString());
if (res.toString() == '-1' || res.toString() == '0') {
  res = 0;
  if (location.protocol !== 'https:') {
    window.location.replace('https://tiagoio.com.br/');
    document.title = "Saltério Cristão";
  }

}*/


if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  }
//-----Inicia a página com a versão Hebraica dos Salmos

//Identifica se a tecla Enter foi acionada no teclado e chama a leitura de //Salmo.
function Fsalmo(event) {

  var x = event.key;
  if (x == "Enter" || x == "enter") {
    LerSalmo();
  }
  
}

//Busca o Salmo inteiro com valor 0,0 no DicSalmos(val1,0,0);
function LerSalmo() {
  
  let valorsalmo = document.getElementById('nSalmo').value;
	
  DicSalmos(valorsalmo, 0, 0);
}
//Muda para o layaout do Catisma.
function lCatismas() { 

  let myElement1 = document.querySelector("#divpesquisa");
  myElement1.style.display = "none";
  let myElement = document.querySelector("#divtabcatisma");
  myElement.style.display = "block";
  let myElement2 = document.querySelector("#DivSalmo");
  myElement2.innerHTML = " ";
  	
	
}
//Muda para layaout dos Salmos
function lSalmos() {
  let myElement1 = document.querySelector("#divcatismas");
  myElement1.style.display = "none";
  let myElement = document.querySelector("#divtabcatisma");
  myElement.style.display = "none";
  let myElement3 = document.querySelector("#divpesquisa");
  myElement3.style.display = "block";
  let myElement2 = document.querySelector("#nSalmo");
  myElement2.value = "undefined";
}
//Define a versão dos Salmos a ser utiliza: G=grego e H=hebraico
function fsetver(val) {
  let cheque = '&#x2714;'; // defique que cheque = HTML code(hexa) de check
    
  //Quando clica em algumas das opções de versão ele seleciona
  // uma letra H=hebraco e G=grego e coloca no localStoralge do Navegador
  //localStorage.getItem('versao');
   localStorage.setItem('versao',val);
  
	

  //---onde foi escolhido põe o síbolo de check,um v de pena longa para
  //indicar a escolha visualmente
  if (val === 'H') {
	  let ah = document.getElementById("theb")
	  ah.innerHTML =  cheque;
   	  let ag = document.getElementById("tgeg");
	  ag.innerHTML= '';
	  

  } else if (val === 'G') {
    let ag = document.getElementById("tgeg");
	  ag.innerHTML =  cheque;
   	  let ah = document.getElementById("theb");
	  ah.innerHTML = '';
  
  }

    LerSalmo();
}
//Abre o Help para explicar as diferenças da versão dos Salmos.
function FhelpVer() {
  let ele1 = document.querySelector("#helpver");
  let ele2 = document.querySelector("#tabelahelp");
  ele1.style.display = "block";
  ele2.style.display = "block";

  document.getElementById("DivSalmo").style.display = "none";
}
//--Fecha o Help que explica a versão dos Salmos
function FhelpVerX() {
  let ele1 = document.querySelector("#helpver");
  let ele2 = document.querySelector("#tabelahelp");
  ele1.style.display = "none";
  ele2.style.display = "none";
  document.getElementById("DivSalmo").style.display = "block";
}
//--Faz seguir um Salmo à frente clicando nas seta ao lado direito do Salmo 
function Fsegue(valor) {

  valor = valor + 1
  if (valor == 151) { valor = 1; }
  document.getElementById("nSalmo").value = valor;
  LerSalmo();
}
//--Faz voltar um Salmo para trás clicando nas seta ao lado esquerdo do //Salmo
function Fvolta(valor) {

  valor = valor - 1
  if (valor == 0) { valor = 150; }
  document.getElementById("nSalmo").value = valor;
  LerSalmo();
}

