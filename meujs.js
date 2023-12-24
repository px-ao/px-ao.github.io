function fmsg() {

    //var span = document.getElementsByClassName("close")[0];
    var txtmsg = document.querySelector("#boxmsg")
    // alert("aqui2 " + txtmsg.open.toString())
    /*  if (txtmsg.open) {
         txtmsg.close();
     } else {
         txtmsg.show()
     } */
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
/* window.addEventListener('load', function() {
    if (window.screen.width > 1000) {
        //alert(window.screen.width)
    let menuX = document.querySelector(".menuX");
    let menuO = document.querySelector("#idmO")
    menuX.style.display = 'none'
    menuO.style.display = 'none'
    } 
}); */

function openNav() {
    let valor = '\u2630'
    //alert(document.querySelector(".icon").innerText.charCodeAt(0))
    //alert(valor.charCodeAt(0))
    if (document.querySelector(".icon").innerText.charCodeAt(0) === valor.charCodeAt(0)){
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

window.addEventListener('click', function(event) {
    let meubox = document.getElementById('idboxmsg');
    // Verifica se o elemento clicado ou um de seus ancestrais tem a classe 'nota'
    if (!event.target.closest('.nota')) {
        // Se não, oculta 'meubox'
        meubox.style.display = 'none';
    }
});
