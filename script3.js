const words = ["APPLE"];

let correctWord = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let triesRemaining = 5;
let score = 0;

const points = [50, 45, 40, 30, 30];

document.addEventListener("DOMContentLoaded", createBoard);

function createBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        board.appendChild(box);
    }
}

function submitWord() {
    let input = document.getElementById("word-input").value.toUpperCase();
    let boxes = document.querySelectorAll(".box");

    if (input.length !== 5) {
        alert("Enter a 5-letter word!");
        return;
    }

    let rowStart = currentRow * 5;
    let wordArray = correctWord.split("");
    let inputArray = input.split("");

    for (let i = 0; i < 5; i++) {
        let box = boxes[rowStart + i];
        box.textContent = inputArray[i];
        if (inputArray[i] === wordArray[i]) {
            box.classList.add("correct");
            wordArray[i] = null;
            inputArray[i] = "_";
        }
    }

    for (let i = 0; i < 5; i++) {
        let box = boxes[rowStart + i];
        if (!box.classList.contains("correct") && wordArray.includes(inputArray[i])) {
            box.classList.add("misplaced");
            wordArray[wordArray.indexOf(inputArray[i])] = null;
            inputArray[i] = "_";
        } else if (!box.classList.contains("correct")) {
            box.classList.add("incorrect");
        }
    }

    if (input === correctWord) {
        score += points[5 - triesRemaining];
        alert(`🎉 You Win! Score: ${score}`);
        updateScoreInDB(score);
        window.location.href = "sports-q3.html";
        return;
    }

    currentRow++;

    if (currentRow % 6 === 0) {
        triesRemaining--;
        if (triesRemaining === 0) {
            alert("Game Over! Try again!");
            window.location.href = "lose.html";
            return;
        }
        correctWord = words[Math.floor(Math.random() * words.length)];
        currentRow = 0;
        createBoard();
    }

    document.getElementById("word-input").value = "";
}

function updateScoreInDB(score) {
    fetch('/update-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamName: "YourTeamName", score: score })
    }).then(response => response.json())
    .then(data => console.log("Score updated: ", data))
    .catch(error => console.error("Error updating score: ", error));
}
