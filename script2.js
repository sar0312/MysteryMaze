const words = ["apple", "grape", "bread", "stone", "chair"]; // List of possible words
const secretWord = words[Math.floor(Math.random() * words.length)]; // Pick a random word
let attempts = 0;

function createBoard() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < 6 * 5; i++) { // 6 attempts, 5 letters
        let box = document.createElement("div");
        box.classList.add("letter-box");
        board.appendChild(box);
    }
}

function checkGuess() {
    const input = document.getElementById("guess-input");
    let guess = input.value.toLowerCase();

    if (guess.length !== 5) {
        document.getElementById("message").textContent = "Enter a 5-letter word!";
        return;
    }

    const rowStart = attempts * 5;
    for (let i = 0; i < 5; i++) {
        let box = document.getElementsByClassName("letter-box")[rowStart + i];
        box.textContent = guess[i];

        if (guess[i] === secretWord[i]) {
            box.classList.add("correct"); // Correct position
        } else if (secretWord.includes(guess[i])) {
            box.classList.add("present"); // Right letter, wrong position
        } else {
            box.classList.add("absent"); // Wrong letter
        }
    }

    attempts++;

    if (guess === secretWord) {
        document.getElementById("message").textContent = "🎉 You guessed it!";
        document.getElementById("guess-input").disabled = true;
    } else if (attempts === 6) {
        document.getElementById("message").textContent = `😢 Game over! The word was "${secretWord}"`;
    }

    input.value = "";
}

createBoard();
