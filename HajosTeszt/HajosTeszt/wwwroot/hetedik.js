window.onload = function () {
    letöltés();
   
}

var sorszam = 0;
var kérdések;
var hotList = [];          
var questionsInHotList = 3;
var displayedQuestion;     
var numberOfQuestions;     
var nextQuestion = 1;
var timeoutHandler;


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
    timeoutHandler = setTimeout(előre, 3000);
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

    function kerdesMegjelenites() {
        let kérdés = hotList[displayedQuestion].question;            

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

function előre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}


function ellenorzes() {
    document.getElementById(`válasz1`).style.pointerEvents = "none"

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