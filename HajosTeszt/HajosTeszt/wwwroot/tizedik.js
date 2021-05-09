
var hosList = [];
var questionInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

function init() {
    for (let i = 0; i < questionInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }



    fetch("/questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("eloregomb").addEventListener("click", elore)
    document.getElementById("hatragomb").addEventListener("click", hatra)


    if (localStorage.getItem("hotList")) {
        hotList = JSON.pasre(localStorage.getItem("hotList"))
    }
    if (localStorage.getItem("displayedQuestion")) { displayedQuestion = parseInt(localStorage.getItem("displayedQuestion")) }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
    }
    if (hotList.length === 0) {


        for (let i = 0; i < questionInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    } else { kérdésMegjelenítés(); }
}


function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error{ `Hibás letöltés: ${result.status}` }
                return;
            }
            return result.json();
        })
        .then(q => {
            hotList[destination] = q;
            hotList[destination].goodAnswers = 0;
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();

            }
        })
}


function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("kép").src = ("https://szoft1.comeback.hu/hajo/" + kérdések[sorszam].image);
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }
    for (var i = 1; i <= 3; i++) {
        document.getElementById("válasz" + 1).classList.remove("jó", "rossz")
    }
    document.getElementById("válaszok").style.pointerEvents = "auto";
}

function elore() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function hatra() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionInHotList-1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;

    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++;
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswe).classList.add("jó")
        hotList[displayedQuestion].goodAnswers=0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(elore, 3000);

    localStorage.setItem("hotlist", JSON.stringify(hotlist));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}




window.onload = init;