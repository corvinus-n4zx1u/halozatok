window.onload = function () {
    console.log("start")
    let hova = document.getElementById("szorzó");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor")
        hova.appendChild(sor);

        for (var o = 0; o < 10; o++) {
            let szám = document.createElement("div");
            szám.classList.add("elem")
            szám.innerText = (s + 1) * (o + 1)
            szám.style.backgroundColor = `rgb(0, ${255 / 10 * s}, 0)`
            sor.appendChild(szám);


        }
    }

    /*pascal*/


    var faktoriálisR = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktoriálisR(n - 1)
        }
    }

    let ide = document.getElementById("pascal")
    console.log("betöltődött")

    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        ide.appendChild(sor);
        for (var o = 0; o <= s; o++) {

            let újSzám = document.createElement("div")
            újSzám.classList.add("elem")
            újSzám.innerText = faktoriálisR(s) / (faktoriálisR(o) * (faktoriálisR(s - o)));
            sor.appendChild(újSzám);
            
            
        }
    }


}
