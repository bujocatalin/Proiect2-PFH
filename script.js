var numel = "";
var varianta = "";
var rand = 0;
var scorEu = 0;
var scorCo = 0;

function preiaNume(){

    numel = document.getElementById("nume").value;

    if(numel == "") {alert("Trebuie sa introduci un nume"); return 0;}
        
    console.log(numel);
    document.getElementById("nume").remove();
    document.getElementById("submit").remove();
    document.getElementById("intro").remove();

}

function deznodamant(bilant, scorEu, scorCo){

    var decor = document.createElement("div");
    decor.id = "decor";
    document.body.appendChild(decor);
    document.getElementById("flex").style.filter = "blur(2px)";
    document.getElementById("subCont1").style.filter = "blur(2px)";
    document.getElementById("subCont2").style.filter = "blur(2px)";
    decor.innerHTML += bilant + "<br>" + scorEu + " - " + scorCo;

    var restart = document.createElement("div");
    restart.id = "restart";
    var t = document.createTextNode("Joaca din nou");
    restart.appendChild(t);                    
    decor.appendChild(restart);

    var gameOver = document.createElement("div");
    gameOver.id = "gameOver";
    var t2 = document.createTextNode("X");
    gameOver.appendChild(t2);                    
    decor.appendChild(gameOver);

    restart.onclick = function()
    {
        document.getElementById("decor").remove();
        document.getElementById("flex").style.filter = "blur(0px)";
        document.getElementById("subCont1").style.filter = "blur(0px)";
        document.getElementById("subCont2").style.filter = "blur(0px)";
        document.getElementById("buton").removeAttribute("disabled");

    }
    gameOver.onclick = function()
    {
        document.getElementById("decor").style.backgroundColor = "rgba(0,0,0,1)";
        document.getElementById("restart").remove();
        document.getElementById("gameOver").remove();
        document.getElementById("decor").innerHTML = "GAME OVER";

        let vector = [];
    
     fetch("http://localhost:3000/jucator", {
         method: 'POST',
         headers: {
             // 'Accept': 'application/json',
             'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
            
         },
         body: "id=" + numel + "&" + "nume=" + numel + "&" + "scorEu=" +  scorEu + "&" + "scorCo=" + scorCo
        })
         .then(function (data) {
             console.log('Postare reusita', data);
        })
         .catch(function (error) {
         console.log('Cerere esuata', error);
         });

         var scoruri = document.createElement("div");
         scoruri.id = "scoruri";
         document.getElementById("decor").appendChild(scoruri);

    fetch("http://localhost:3000/jucator", {
    method: 'GET'
    })
    .then((res) => res.json())
    .then(function(jucator) {
        vector = jucator;
        while(vector.length > 5) {
            console.log('Sunt aci'+ vector[0].id);
            fetch('http://localhost:3000/jucator/' + vector[0].id, {
                method: 'DELETE',
                headers: {
                 "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
            })
            .then(function (data) {
            console.log('Cerere reusita cu raspuns de tip JSON', data);
            })
            .catch(function (error) {
            console.log('Cerere esuata', error);});
            
            vector.splice(0,1);
        
            }
            let i=1;
        jucator.forEach(function(jucator) {
            let span = document.createElement('span');
            span.className = 'span' + i;
            span.style.fontSize = "20px";
            span.innerHTML+=jucator.nume + "<br>";
            span.innerHTML+=jucator.scorEu + " - " + jucator.scorCo + "<br>";

            document.getElementById("decor").appendChild(span);
            i++;
        });
        i=1;
      });

      var inputred = document.createElement('input');
      inputred.id = "inputred";
      inputred.type = "text";
      var rename = document.createElement('button');
      rename.id = "rename";
      var t = document.createTextNode("Redenumeste");
      rename.appendChild(t);
      document.getElementById('decor').appendChild(inputred);
      document.getElementById('decor').appendChild(rename);

     
      rename.onclick = function()
      { 
          vector[4].nume = document.getElementById('inputred').value;
        fetch('http://localhost:3000/jucator/' + vector[4].id, {
         method: 'PUT',
         headers: {
         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
         },
         body: 
         
         "id=" + vector[4].nume + '&' +
         'nume=' + vector[4].nume + '&' +
         'scorEu=' + vector[4].scorEu + '&' +
         'scorCo=' + vector[4].scorCo
        })
        .then(function (data) {
        console.log('Cerere reusita cu raspuns de tip JSON', data);
        })
        .catch(function (error) {
        console.log('Cerere nereusita', error);
        });

        setTimeout(function(){
            document.getElementsByClassName('span' + 5)[0].innerHTML = "";
            
                       fetch("http://localhost:3000/jucator", {
                        method: 'GET'
                        })
                    .then((res) => res.json())
                    .then(function(jucator){
                        let vector1 = jucator;
                        let x = document.getElementsByClassName('span' + 5)[0];
                        x.style.fontSize = "20px";
                        x.innerHTML+=vector1[4].nume + "<br>";
                        x.innerHTML+=vector1[4].scorEu + " - " + vector1[4].scorCo + "<br>";
                    })
        }, 500);
      }
    }
}

function castig(x,y){
        console.log("X sau varianta: " + x);
        console.log("Y sau rand: " + y);
        var bilant = "";

        //y,rand = 1 = Piatra
        //y,rand = 2 = Foarfeca
        //y,rand = 3 = Hartie

        switch(y) {
            case 1:
                if(x=='Piatra') { bilant = "Egal!";}
                else if(x=='Hartie') { bilant = "Ai castigat!"; scorEu = scorEu + 1;}
                else {bilant = "Ai pierdut!"; scorCo = scorCo + 1;}
                break;
            case 2:
                if(x=='Piatra') { bilant = "Ai castigat!"; scorEu = scorEu + 1;}
                else if(x=='Hartie') {bilant = "Ai pierdut!"; scorCo = scorCo + 1;}
                else {bilant = "Egal!";}
                break;
            case 3:
                if(x=='Piatra') { bilant = "Ai pierdut!"; scorCo = scorCo + 1;}
                else if(x=='Hartie') { bilant = "Egal!";}
                else { bilant = "Ai castigat!"; scorEu = scorEu + 1;}
                break;
            default: bilant = "Imposibil!";
        }

        
        setTimeout(deznodamant, 500, bilant, scorEu, scorCo);
}

function alegeCo(x){
    document.getElementById('buton').disabled = true;
    var rand = Math.floor(Math.random() * 3 + 1);
    console.log(rand);

    document.getElementById('profilCo').style.transform = "rotate(0deg)";
    document.getElementById('profilCo').style.transition = "0.7s";

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
    
    setTimeout(castig, 1000, x, rand);

}

function rotatie(x)
{
    document.getElementById('buton').setAttribute("disabled", true);
    document.getElementById('profilCo').style.backgroundImage = "url('none.png')";
    document.getElementById('profilCo').style.backgroundRepeat = "no-repeat";
    document.getElementById('profilCo').style.zIndex = "100";
    document.getElementById('profilCo').style.transform = "rotate(360deg)";
    document.getElementById('profilCo').style.transition = "2s";
    setTimeout(alegeCo, 1000, x);
    
}

function alege(){
    document.getElementById('buton').disabled = true;
    var varianta = document.getElementById("select").value;

    console.log(varianta);

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


    rotatie(varianta);

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

var butonPlayer = document.createElement("button");
butonPlayer.id = "buton";
var t = document.createTextNode("Alege");
butonPlayer.appendChild(t);                    
s1.appendChild(butonPlayer);


document.getElementById("buton").addEventListener("click", alege);



var intro = document.createElement("div");
intro.id = "intro";
document.body.appendChild(intro);

var h1 = document.createElement("h1");
var t = document.createTextNode("INTRODUCE-TI NUMELE DE JOC");
h1.appendChild(t); 
document.getElementById("intro").appendChild(h1);

var input = document.createElement("input");
input.id = "nume";
input.value = "numeJucator";
//document.getElementById("intro").appendChild(input);

var submit = document.createElement("div");
submit.id = "submit";
var t = document.createTextNode("Submit");
submit.appendChild(t);                    
//document.getElementById("intro").appendChild(submit);

var form = document.createElement('form');
form.id='form';
form.appendChild(input);
form.appendChild(submit);
document.getElementById("intro").appendChild(form);



document.getElementById("submit").addEventListener("click", preiaNume);

//var numePlayer = document.createElement("div");
//var numeCo = document.createElement("div");
//numePlayer.id = 'numePlayer';
//numeCo.id = 'numeCo';

//numePlayer.value = numel;
//console.log(numel);
//numePlayer.appendChild(z1);

//var z2 = document.createTextNode('Computer');
//z2.className= 'z2';
//numeCo.appendChild(z2);   

//document.getElementById('subCont1').appendChild(numePlayer);
//document.getElementById('subCont2').appendChild(numeCo);

document.getElementById("nume").addEventListener("click", goleste);