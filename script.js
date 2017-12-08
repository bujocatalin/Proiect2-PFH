function preiaNume(){
    
    var nume = document.getElementById("nume").value;
    document.getElementById("nume").remove();
    document.getElementById("submit").remove();
    document.getElementById("intro").remove();
}

function alege(){
    var varianta = document.getElementById("select").value;

    if(varianta == "Piatra"){
        document.getElementById('profilPl').style.backgroundImage = "url('piatra.png')";
        document.getElementById('profilPl').style.backgroundRepeat = "no-repeat";
        document.getElementById('profilPl').style.zIndex = "100";
        document.getElementById('container').style.backgroundColor = "rgb(227,87,86)";}


    if(varianta == "Foarfeca"){
        document.getElementById('profilPl').style.backgroundImage = "url('foarfeca.png')";
        document.getElementById('profilPl').style.backgroundRepeat = "no-repeat";
        document.getElementById('container').style.backgroundColor = "rgb(231,174,59)";}


    if(varianta == "Hartie"){
        document.getElementById('profilPl').style.backgroundImage = "url('hartie.png')";
        document.getElementById('profilPl').style.backgroundRepeat = "no-repeat";
        document.getElementById('container').style.backgroundColor = "rgb(84,174,171)";}

    setTimeout(alegeCo(), 20000);

}

function alegeCo(){
    var rand = Math.floor(Math.random() * 3 + 1);
    console.log(rand);

    if(rand == 1){
        document.getElementById('profilCo').style.backgroundImage = "url('piatra.png')";
        document.getElementById('profilCo').style.backgroundRepeat = "no-repeat";
        document.getElementById('profilCo').style.zIndex = "100";
        document.getElementById('flex').style.backgroundColor = "rgb(227,87,86)";}


    if(rand == 2){
        document.getElementById('profilCo').style.backgroundImage = "url('foarfeca.png')";
        document.getElementById('profilCo').style.backgroundRepeat = "no-repeat";
        document.getElementById('flex').style.backgroundColor = "rgb(231,174,59)";}


    if(rand == 3){
        document.getElementById('profilCo').style.backgroundImage = "url('hartie.png')";
        document.getElementById('profilCo').style.backgroundRepeat = "no-repeat";
        document.getElementById('flex').style.backgroundColor = "rgb(84,174,171)";}

}

function goleste(){
    document.getElementById("nume").value = "";

}

//---------------------------------------------------------------------

var flex = document.createElement("div");
flex.id = "flex";
document.body.appendChild(flex);

var container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

var subCont1 = document.createElement("div");
subCont1.id = "subCont1";
subCont1.className = "subCont";
document.getElementById("container").appendChild(subCont1);

var subCont2 = document.createElement("div");
subCont2.id = "subCont2";
subCont2.className = "subCont";
document.getElementById("container").appendChild(subCont2);

//---------------------------------------------------------------------

var profilPlayer = document.createElement("div");
var profilComp = document.createElement("div");
profilPlayer.id = "profilPl";
profilComp.id = "profilCo";
profilPlayer.className = "profil";
profilComp.className = "profil";
s1= document.getElementById("subCont1");
s1.appendChild(profilPlayer);
s2 = document.getElementById("subCont2");
s2.appendChild(profilComp);


var selectPlayer = document.createElement("select");
selectPlayer.id = "select";
s1.appendChild(selectPlayer);

var variante = ["Piatra", "Foarfeca", "Hartie"];
for (var i = 0; i < variante.length; i++) {
    var varianta = document.createElement("option");
    varianta.value = variante[i];
    varianta.text = variante[i];
    selectPlayer.appendChild(varianta);
}

var butonPlayer = document.createElement("div");
butonPlayer.id = "buton";
var t = document.createTextNode("Alege");
butonPlayer.appendChild(t);                    
s1.appendChild(butonPlayer);

document.getElementById("buton").addEventListener("click", alege);



var intro = document.createElement("div");
intro.id = "intro";
document.body.appendChild(intro);

var h1 = document.createElement("h1");
var t = document.createTextNode("INTRODUCETI NUMELE");
h1.appendChild(t); 
document.getElementById("intro").appendChild(h1);

var input = document.createElement("input");
input.id = "nume";
input.value = "Numele tau..";
document.getElementById("intro").appendChild(input);

var submit = document.createElement("div");
submit.id = "submit";
var t = document.createTextNode("Submit");
submit.appendChild(t);                    
document.getElementById("intro").appendChild(submit);



document.getElementById("submit").addEventListener("click", preiaNume);
document.getElementById("nume").addEventListener("click", goleste);


