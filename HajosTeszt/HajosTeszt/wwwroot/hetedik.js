window.onload = function () {
    letöltés();
   
}

var sorszam = 0;
var kérdések;


function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
    );
    válasz1.style.backgroundColor = "#248f98";
    válasz2.style.backgroundColor = "#248f98";
    válasz3.style.backgroundColor = "#248f98";
    válasz1.style.color = "#d8edf0";
    válasz2.style.color = "#d8edf0";
    válasz3.style.color = "#d8edf0";
    
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kerdesMegjelenites(0)
}

    function kerdesMegjelenites() {
        
        let kérdés_szöveg = document.getElementById("kérdés_szöveg");
        let elem = document.createElement("div");
        kérdés_szöveg.innerHTML = kérdések[sorszam].questionText
        kérdés_szöveg.appendChild(elem);
        

        let kép = document.getElementById("kép");
        let válasz1 = document.getElementById("válasz1");
        let válasz2 = document.getElementById("válasz2");
        let válasz3 = document.getElementById("válasz3");
        kép.src = "https://szoft1.comeback.hu/hajo/" + kérdések[sorszam].image
        válasz1.innerText = kérdések[sorszam].answer1;
        válasz2.innerText = kérdések[sorszam].answer2;
        válasz3.innerText = kérdések[sorszam].answer3;
}

function vissza() {
    if (sorszam == 0) {
        sorszam = 2;
        letöltés();
       
    }
    else {
        sorszam = sorszam - 1;
        letöltés();
    }
}

function elore() {
    if (sorszam == 2) {
        sorszam = 0;
        letöltés();
        
    }
    else {
        sorszam = sorszam + 1;
        letöltés();
    }
}

function ellenorzes() {
    let helyes = kérdések[sorszam].correctAnswer;
    console.log(helyes)

    if (helyes == 1) {
        válasz1.style.backgroundColor = "#b3ffc3";
        válasz1.style.color = "#287674";
        válasz2.style.backgroundColor = "#fdc6c6";
        válasz2.style.color = "#287674";
        válasz3.style.backgroundColor = "#fdc6c6";
        válasz3.style.color = "#287674";
    }


    if (helyes == 2) {
        válasz1.style.backgroundColor = "#fdc6c6";
        válasz1.style.color = "#287674";
        válasz2.style.backgroundColor = "#b3ffc3";
        válasz2.style.color = "#287674";
        válasz3.style.backgroundColor = "#fdc6c6";
        válasz3.style.color = "#287674";
    }


    if (helyes == 3) {
        válasz1.style.backgroundColor = "#fdc6c6";
        válasz1.style.color = "#287674";
        válasz2.style.backgroundColor = "#fdc6c6";
        válasz2.style.color = "#287674";
        válasz3.style.backgroundColor = "#b3ffc3";
        válasz3.style.color = "#287674";
    }

}