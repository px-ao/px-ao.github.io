function fnavega() {

    let strnav = `<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
<a class="active" href="index.html">Início</a>
<a href="mensagem.html" >Mensagens</a>
<a href="oracoes.html" >Preces</a>
<a href="salmos.html" >Salmos</a>`

    let strdatas = `         <div id="navmens">
    <span id="idvoltarm" onclick="fmensagens(-1)" >&#x25C0;</span>
    <span id="idindicem" onclick="document.location.href='mensagem.html'">Índice</span>
    <span id="idseguirm" onclick="fmensagens(1)">&#x25B6;</span>
 </div>`


    document.getElementById("myNavbar").innerHTML = strnav


    let path = window.location.pathname; // Pega o caminho da URL
    let page = path.split("/").pop(); // Remove tudo antes da última barra
    let partes = page.split("_"); // Isso retorna um array ["0001", "15112023.html"]

    if (document.getElementById("nvmens")) {
        return
    }

    if (Number(partes[0]) >= 1) {
        let local1 = document.querySelector(".imagemjesus")
        local1.insertAdjacentHTML('afterend', strdatas)
    }

    const caminho = window.location.pathname;
    const partesDoCaminho = caminho.split('/'); // Divide o caminho em partes

    // O último elemento do array é o nome do arquivo
    const nomeDoArquivo = partesDoCaminho[partesDoCaminho.length - 1];

}


function openPage(pageName, elmnt) {
    var i, tabcontent, tablinks;
    if (document.getElementById("idladanhinhas")) {
        document.getElementById("idladanhinhas").innerHTML = " "
    }

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remova a cor de fundo de todos os botões
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    // apaga conteúdo

    // Mostre o conteúdo específico da aba
    document.getElementById(pageName).style.display = "block";

    // Adicione a classe "active" ao botão clicado
    elmnt.style.backgroundColor = "#fad379";
}

function fmensagens(valsoma) {

    let path = window.location.pathname; // Pega o caminho da URL
    let page = path.split("/").pop(); // Remove tudo antes da última barra
    //let partes = page.split("_"); // Isso retorna um array ["0001", "15112023.html"]
    //alert("Página atual:" + page)
    let numeropage = 0 //Number(partes[0]); // Isso pega a primeira parte da string, exemplo '0001_01012020' retorna "0001"
    let vmens = ["0008_15012024.html", "0009_28012024.html", "0012_21022024.html",
        "0013_26022024.html","0014_01032024.html", "0015_04032024.html", "0016_28032024.html", "0017_03052024.html",
        "0018_11052024.html","0019_15052024.html", "0020_18052024.html", "0021_24052024.html", "0022_03062024.html",
        "0023_24062024.html","0025_27082024.html", "0026_19092024.html", "0027_25092024.html", "0028_04102024.html", "0029_30102024.html",
        "0030_02112024.html","0032_13122024.html", "0033_16122024.html", "0034_06012025.html", "0035_17012025.html",
        "0036_25012025.html","0037_10022025.html","0038_05032025.html","0039_09032025.html","0040_24032025.html","0041_06042025.html",
        "0043_01052025.html","0044_06062025.html","0045_13062025.html","0046_17062025.html","0047_28062025.html","0048_19072025.html","0049_20072025.html",
        "0050_24072025.html","0051_25072025.html","0052_26072025.html","0053_27072025.html","0054_30072025.html","0055_08082025.html","0056_12082025.html",
        "0057_30082025.html" ]
    let pos = vmens.indexOf(page);
    //alert("posição:" + pos)

    if (valsoma == 1 && pos == vmens.length - 1) {

        numeropage = 0

    } else if (pos == 0 && valsoma == -1) {

        numeropage = vmens.length - 1;
    } else {
        numeropage = pos + (Number(valsoma))
    }

    path = path.replace(page, vmens[numeropage])
    //alert("Path: " + path + " Page: " + page + " numero: " + numeropage)
    window.location.href = path
}
function fmsg() {

    //var span = document.getElementsByClassName("close")[0];
    var txtmsg = document.querySelector("#boxmsg")
    alert("Esta parte está em construção.")
}
function fmenuX() {


    let menuX = document.querySelector(".menuX");
    let menu = document.querySelector("#menu")
    let menuO = document.querySelector("#idmO")

    if (menu.style.display == "block") {
        menu.style.display = "none"
        menuX.style.display = "none"
        menuO.style.display = 'block'

    }
}
function fmenu(elem) {
    console.log('fmenu')

    let vmenu = document.querySelector("#menu")
    let menuX = document.querySelector(".menuX");
    console.log(vmenu);
    vmenu.style.display = 'block'
    menuX.style.display = 'block'
    elem.style.display = 'none'
    console.log(vmenu.style.display);

}


function openNav() {
    let valor = '\u2630'
    //alert(document.querySelector(".icon").innerText.charCodeAt(0))
    //alert(valor.charCodeAt(0))
    if (document.querySelector(".icon").innerText.charCodeAt(0) === valor.charCodeAt(0)) {
        document.getElementById("myNavbar").style.width = "250px";
        document.querySelector(".content").style.marginLeft = "250px";
        document.querySelector(".icon").innerHTML = "&#x2716;"
        let objicon = document.querySelector(".icon")
        objicon.style.backgroundColor = '#c1272d'
        return
    }
    closeNav()
}

function closeNav() {
    let valor = '\u2716'
    document.getElementById("myNavbar").style.width = "0";
    document.querySelector(".content").style.marginLeft = "0";
    document.querySelector(".icon").innerHTML = "&#9776;"
    let objicon = document.querySelector(".icon")
    objicon.style.backgroundColor = '#ecad19'
}
function closeBoxMsg(elemento) {
    elemento.style.display = 'none'
}
function fmostraMsg(frase) {
    let meubox = document.getElementById('idboxmsg')
    if (meubox.style.display == 'block') {
        meubox.style.display = 'none'
        return
    }

    meubox.style.display = 'block'
    document.getElementById('idMsg').innerHTML = frase;
}




window.addEventListener('click', function (event) {
    let meubox = document.getElementById('idboxmsg');
    // Verifica se o elemento clicado ou um de seus ancestrais tem a classe 'nota'
    if (!event.target.closest('.nota')) {
        // Se não, oculta 'meubox'
        if (meubox) {
            meubox.style.display = 'none';
        }

    }
});
function fbiblia() {
    document.location.href = "/bibliajerusalem/";

}