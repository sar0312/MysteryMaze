let userScore = 0;
let computerScore = 0;
const maxScore = 10;

const choices = document.querySelectorAll(".choice");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultDiv = document.querySelector(".result p");

choices.forEach(choice => {
    choice.addEventListener("click", function () {
        if (userScore < maxScore && computerScore < maxScore) {
            const userChoice = this.id;
            playGame(userChoice);
        }
    });
});

function playGame(userChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    if (userChoice === computerChoice) {
        resultDiv.textContent = `⚡ Draw! Both chose ${userChoice.toUpperCase()}`;
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        userScore++;
        userScoreSpan.textContent = userScore;
        resultDiv.textContent = `🔥 You win! ${userChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}!`;
    } else {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        resultDiv.textContent = `💀 You lose! ${computerChoice.toUpperCase()} beats ${userChoice.toUpperCase()}!`;
    }

    checkWinner();
}

function checkWinner() {
    if (userScore === maxScore) {
        resultDiv.textContent = "🏆 You won the game! Advance to your next challenge!";
	window.location.href = "C:/Users/sarth/OneDrive/Desktop/cu shit/Techleons/sports questions and riddles/sports-q7.html";
        disableGame();
    } else if (computerScore === maxScore) {
        resultDiv.textContent = "💀 Computer won the game! Play again to beat your opponent.";
        disableGame();
    }
}

function disableGame() {
    choices.forEach(choice => choice.removeEventListener("click", playGame));
}
