const board = document.querySelector(".board");
const gameResult = document.querySelector(".gameResult");
const alphabet = document.querySelector(".alphabet");

const alphabetLetters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];

const button = document.querySelector("button");
let entry = document.querySelector(".entry").value;
let entrySecond = "";
let arrayEntry = [];

const downloadEntry = () => {
    entry = document.querySelector(".entry").value;
    entry = entry.toUpperCase();

    for (let i = 0; i < entry.length; i++ ) {
        arrayEntry[i] = entry[i];
        if (entry[i] == " ") entrySecond = entrySecond + " ";
        else entrySecond = entrySecond + "_";
    }
    document.querySelector(".entry").remove();
    button.remove();
    board.innerHTML = entrySecond;
    activeLetters.forEach(letter => letter.addEventListener("click", onclickLetter));
}

button.addEventListener("click", downloadEntry);

const addAlphabet = () => {
    for (let i = 0; i <= 34; i++) {
        const div = document.createElement("div");
        div.classList.add(alphabetLetters[i]);
        div.classList.add("active");
        div.textContent = alphabetLetters[i];
        alphabet.appendChild(div);
    }
}

addAlphabet();

let activeLetters = document.querySelectorAll(".active");
activeLetters = Array.from(activeLetters);

let letter = "";

let image = document.querySelector(".image");
let filedTried = 0;

const onclickLetter = function () {
    letter = this;
    letter.classList.remove("active");
    letter.removeEventListener("click", onclickLetter);

    for (let i = 0; i < entry.length; i++) {
        if (letter.className == entry[i]) {
            entrySecond = entrySecond.substring(0, i) + entry[i] + entrySecond.substring(i + 1);
            board.innerHTML = entrySecond;
            if (board.textContent == entry) {
                setTimeout(() => {
                    board.innerHTML = `Wygrałeś! Hasło to: ${entry}`;
            }, 500)
            }
        }
    }
    if (entry.indexOf(letter.className) == -1) {
        filedTried++;
        image.src = `assets/s${filedTried}.jpg`;
        if (filedTried == 9) {
            activeLetters.forEach(letter => letter.removeEventListener("click", onclickLetter));
            board.innerHTML = `Przegrałeś! Hasło to: ${entry}`;
        }
    }
}