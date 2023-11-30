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
    document.getElementById("myNavbar").style.width = "250px";
    document.querySelector(".content").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("myNavbar").style.width = "0";
    document.querySelector(".content").style.marginLeft= "0";
  }